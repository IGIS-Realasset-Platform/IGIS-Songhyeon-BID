import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

const read = (path) => readFile(path, 'utf8');
const firstAccessMigrationPath = 'supabase/migrations/202608180006_songhyeon_first_access_restore.sql';

const namedHandler = (source, name) => {
  const start = source.search(new RegExp(`const\\s+${name}\\s*=`, 'u'));
  assert.notEqual(start, -1, `${name} handler가 필요합니다.`);
  const remainder = source.slice(start + 1);
  const nextDeclarationOffset = remainder.search(/\n {2}const\s+\w+/u);
  const end = nextDeclarationOffset === -1 ? source.length : start + 1 + nextDeclarationOffset;
  return source.slice(start, end);
};

const firstAccessHandler = (source) => namedHandler(source, 'handleFirstAccessSubmit');

const clientTextExtensions = new Set(['.css', '.html', '.js', '.jsx', '.json', '.mjs', '.svg', '.ts', '.tsx']);

async function collectClientTextFiles(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = join(path, entry.name);
    if (entry.isDirectory()) return collectClientTextFiles(entryPath);
    return clientTextExtensions.has(extname(entry.name)) ? [entryPath] : [];
  }));
  return files.flat();
}

test('006 최초 접속 복구 migration은 설정 미구성과 NULL 입력을 안전하게 구분한다', async () => {
  const migration = await read(firstAccessMigrationPath);

  for (const contract of [
    /create\s+table\s+if\s+not\s+exists\s+public\.songhyeon_auth_settings/iu,
    /access_code_hash\s+text\s+not\s+null/iu,
    /alter\s+table\s+public\.songhyeon_auth_settings\s+enable\s+row\s+level\s+security/iu,
    /revoke\s+all\s+on\s+table\s+public\.songhyeon_auth_settings\s+from\s+public\s*,\s*anon\s*,\s*authenticated/iu,
    /stored_hash\s+is\s+null[\s\S]{0,160}?ACCESS_CODE_NOT_CONFIGURED[\s\S]{0,100}?errcode\s*=\s*['"]55000['"]/iu,
    /candidate_access_code\s+is\s+null[\s\S]{0,240}?INVALID_ACCESS_CODE[\s\S]{0,100}?errcode\s*=\s*['"]22023['"]/iu,
    /stored_hash\s+is\s+distinct\s+from\s+extensions\.crypt\(\s*btrim\(\s*candidate_access_code\s*\)\s*,\s*stored_hash\s*\)/iu,
    /revoke\s+all\s+on\s+function\s+public\.claim_songhyeon_membership\(text\)\s+from\s+public/iu,
    /grant\s+execute\s+on\s+function\s+public\.claim_songhyeon_membership\(text\)\s+to\s+authenticated/iu,
  ]) assert.match(migration, contract);

  assert.doesNotMatch(migration, /insert\s+into\s+public\.songhyeon_auth_settings|update\s+public\.songhyeon_auth_settings/iu,
    '공유 접속코드나 hash provisioning은 migration에 넣지 않아야 합니다.');
  assert.doesNotMatch(migration, /extensions\.crypt\(\s*['"`]/iu,
    '접속코드 literal을 migration 안에서 hash하면 안 됩니다.');
  assert.doesNotMatch(migration, /SH-[A-Za-z0-9_-]{8,}/u,
    '실제 접속코드처럼 보이는 literal을 migration에 포함하면 안 됩니다.');
});

test('승인 roster 이메일 확인 결과의 is_first_time이 최초 접속과 기존 로그인 단계를 나눈다', async () => {
  const [login, migration] = await Promise.all([
    read('src/pages/Login.jsx'),
    read(firstAccessMigrationPath),
  ]);

  assert.match(
    migration,
    /returns\s+table\s*\(\s*staff_name\s+text\s*,\s*is_first_time\s+boolean\s*\)/iu,
    '이메일 확인 RPC는 멤버 이름과 최초 접속 여부를 반환해야 합니다.',
  );
  assert.match(
    migration,
    /select\s+m\.staff_name\s*,\s*\(\s*m\.auth_id\s+is\s+null\s*\)/iu,
    'auth_id가 없는 roster member만 최초 접속으로 판정해야 합니다.',
  );
  assert.match(login, /matchedMember\.is_first_time/u, '로그인 화면이 RPC의 is_first_time 값을 사용해야 합니다.');

  const directTernaryBranch = /setStep\(\s*matchedMember\.is_first_time\s*\?\s*(?!2\b)[^:]+:\s*2\s*\)/u;
  const normalizedTernaryBranch = /const\s+(\w+)\s*=\s*Boolean\(\s*matchedMember\.is_first_time\s*\)[\s\S]{0,160}?setStep\(\s*\1\s*\?\s*(?!2\b)[^:]+:\s*2\s*\)/u;
  const ifElseBranch = /if\s*\(\s*matchedMember\.is_first_time\s*\)[\s\S]{0,180}?setStep\(\s*(?!2\b)[^)]+\)[\s\S]{0,120}?else[\s\S]{0,120}?setStep\(\s*2\s*\)/u;
  assert.ok(
    directTernaryBranch.test(login) || normalizedTernaryBranch.test(login) || ifElseBranch.test(login),
    'is_first_time=true은 최초 접속 단계로, false는 기존 비밀번호 단계(2)로 보내야 합니다.',
  );
});

test('최초 접속 화면은 접속코드·새 패스워드·확인을 받고 불일치를 제출 전에 차단한다', async () => {
  const login = await read('src/pages/Login.jsx');

  assert.match(login, /const\s+\[accessCode\s*,\s*setAccessCode\]\s*=\s*useState\(['"]['"]\)/u);
  assert.match(login, /<form\s+onSubmit=\{handleFirstAccessSubmit\}>/u);
  assert.match(login, /최초 접속 코드/u);
  assert.match(login, /value=\{accessCode\}/u);
  assert.match(login, /type="password"[^>]*(?:새 패스워드|사용할 패스워드)|(?:새 패스워드|사용할 패스워드)[\s\S]{0,180}?type="password"/u);
  assert.match(login, /(?:패스워드|비밀번호)[^<"']*(?:확인|다시)|(?:확인|다시)[^<"']*(?:패스워드|비밀번호)/u);

  const handler = firstAccessHandler(login);
  assert.match(
    handler,
    /(?:password|newPassword)\s*!==\s*(?:confirmPassword|confirmNewPassword)|(?:confirmPassword|confirmNewPassword)\s*!==\s*(?:password|newPassword)/u,
    '패스워드와 확인값이 다르면 signUp 전에 중단해야 합니다.',
  );
  assert.ok(
    handler.search(/!==/u) < handler.search(/await\s+(?:completeFirstAccess|signUp)\s*\(/u),
    '패스워드 확인 검증은 최초 계정 생성 요청보다 먼저 실행되어야 합니다.',
  );
});

test('최초 접속은 emailRedirectTo가 있는 signUp과 독립 claimMembership을 순서대로 사용한다', async () => {
  const [login, context, migration] = await Promise.all([
    read('src/pages/Login.jsx'),
    read('src/context/SonghyeonAuthContext.jsx'),
    read(firstAccessMigrationPath),
  ]);
  const loginHandler = firstAccessHandler(login);
  const authFlow = namedHandler(context, 'completeFirstAccess');
  const claimFlow = namedHandler(context, 'claimMembership');

  assert.match(authFlow, /songhyeonSupabase\.auth\.signUp\s*\(\s*\{[\s\S]{0,480}?email:\s*(?:email\.trim\(\)\.toLowerCase\(\)|normalizedEmail)[\s\S]{0,240}?password[\s\S]{0,320}?options\s*:\s*\{[\s\S]{0,160}?emailRedirectTo\b/u,
    'signUp 확인 메일은 /login callback으로 돌아오도록 emailRedirectTo를 지정해야 합니다.');
  assert.match(authFlow, /emailRedirectTo[\s\S]{0,160}?(?:window\.location\.origin|\/login)|(?:window\.location\.origin|\/login)[\s\S]{0,160}?emailRedirectTo/u);
  assert.match(claimFlow, /rpc\(\s*['"]claim_songhyeon_membership['"]\s*,\s*\{\s*candidate_access_code:\s*accessCode(?:\.trim\(\))?\s*,?\s*\}\s*\)/u);
  assert.doesNotMatch(authFlow, /\.rpc\(\s*['"]claim_songhyeon_membership['"]/u,
    'membership RPC는 completeFirstAccess에 중복하지 않고 claimMembership 한 곳에서만 소유해야 합니다.');
  assert.match(authFlow, /await\s+claimMembership\s*\(\s*accessCode\s*\)/u);
  assert.match(context, /\bcompleteFirstAccess\b[\s\S]{0,240}?\bvalue\b|\bvalue\b[\s\S]{0,480}?\bcompleteFirstAccess\b/u,
    'Auth context가 완결된 최초 접속 함수를 로그인 화면에 제공해야 합니다.');
  assert.match(context, /\bclaimMembership\b[\s\S]{0,240}?\bvalue\b|\bvalue\b[\s\S]{0,480}?\bclaimMembership\b/u,
    'Auth context가 이메일 확인 callback에서 재사용할 claimMembership을 독립 제공해야 합니다.');
  assert.match(loginHandler, /await\s+completeFirstAccess\s*\(\s*email\s*,\s*(?:password|newPassword)\s*,\s*accessCode\s*\)/u);
  assert.match(authFlow, /\.session\b/u, 'signUp 뒤 authenticated session 확보 여부를 확인해야 합니다.');
  assert.match(authFlow, /if\s*\(\s*![^)]*session[^)]*\)[\s\S]{0,480}?return\s*\{[\s\S]{0,220}?confirmationRequired\s*:\s*true/iu,
    'session이 없으면 claim 전에 confirmationRequired 결과로 반환해야 합니다.');
  assert.match(loginHandler, /window\.location\.assign\(\s*postLoginPath\s*\)|navigate\(\s*postLoginPath\s*,\s*\{\s*replace:\s*true\s*\}\s*\)/u);

  const signUpAt = authFlow.search(/\.auth\.signUp\s*\(/u);
  const sessionAt = authFlow.search(/\.session\b/u);
  const confirmationAt = authFlow.search(/confirmationRequired\s*:\s*true/u);
  const claimAt = authFlow.search(/await\s+claimMembership\s*\(/u);
  assert.ok(signUpAt < sessionAt && sessionAt < confirmationAt && confirmationAt < claimAt,
    '인증 함수 내부 순서는 signUp → session 확인 → membership claim이어야 합니다.');
  assert.ok(
    loginHandler.search(/await\s+completeFirstAccess\s*\(/u) < loginHandler.search(/(?:window\.location\.assign|navigate)\s*\(/u),
    'membership claim이 포함된 최초 접속 함수가 끝난 뒤 홈페이지 루트로 이동해야 합니다.',
  );

  for (const contract of [
    /if\s+auth\.uid\(\)\s+is\s+null\s+then\s+raise\s+exception\s+'AUTH_REQUIRED'/iu,
    /extensions\.crypt\(\s*btrim\(\s*candidate_access_code\s*\)\s*,\s*stored_hash\s*\)/iu,
    /m\.email\s*=\s*lower\(\s*btrim\(\s*auth\.jwt\(\)->>'email'\s*\)\s*\)/iu,
    /grant\s+execute\s+on\s+function\s+public\.claim_songhyeon_membership\(text\)\s+to\s+authenticated/iu,
  ]) assert.match(migration, contract);
});

test('이메일 확인 callback의 user && !member 상태는 가입을 반복하지 않고 접속코드 claim 화면을 연다', async () => {
  const login = await read('src/pages/Login.jsx');
  const handler = firstAccessHandler(login);

  assert.match(login, /\buser\s*&&\s*!member\b/u,
    '인증됐지만 membership이 없는 이메일 확인 callback 상태를 감지해야 합니다.');
  assert.match(login, /\bclaimMembership\b/u,
    'Login은 Auth context의 독립 claimMembership을 사용해야 합니다.');
  assert.match(login, /if\s*\(\s*!user\s*\|\|\s*member[\s\S]{0,1000}?setIsFirstTime\(\s*true\s*\)[\s\S]{0,120}?setStep\(\s*6\s*\)/u,
    'callback session을 확인하면 최초 접속 claim 단계로 복원해야 합니다.');
  assert.match(handler, /const\s+isConfirmedFirstAccess\s*=\s*Boolean\(\s*user\s*&&\s*!member\s*\)/u);
  assert.match(handler, /isConfirmedFirstAccess[\s\S]{0,100}?await\s+claimMembership\s*\(\s*accessCode\s*\)[\s\S]{0,100}?:\s*await\s+completeFirstAccess\s*\(/u,
    'callback session은 claimMembership만 호출하고 신규 사용자는 completeFirstAccess를 호출해야 합니다.');
  assert.match(handler, /if\s*\(\s*!isConfirmedFirstAccess\s*&&\s*newPassword\.length/u);
  assert.match(handler, /if\s*\(\s*!isConfirmedFirstAccess\s*&&\s*newPassword\s*!==\s*confirmNewPassword/u);
  assert.match(handler, /(?:window\.location\.assign|navigate)\s*\(\s*postLoginPath/u);
  assert.match(login, /<form\s+onSubmit=\{handleFirstAccessSubmit\}>/u);
  assert.match(login, /\{!isConfirmedFirstAccess\s*&&\s*<>[\s\S]{0,900}?value=\{newPassword\}[\s\S]{0,900}?value=\{confirmNewPassword\}/u,
    'callback claim 화면에서는 새 패스워드와 확인 입력을 숨겨야 합니다.');
});

test('claim 오류는 SQLSTATE와 sentinel을 함께 확인하며 P0001 전체를 잘못된 코드로 분류하지 않는다', async () => {
  const login = await read('src/pages/Login.jsx');

  assert.doesNotMatch(login, /(?:error|claimError)\??\.code\s*===?\s*['"]P0001['"]/u,
    'P0001은 일반 PL/pgSQL 예외이므로 모두 잘못된 접속코드로 취급하면 안 됩니다.');
  for (const [code, sentinel] of [
    ['22023', 'INVALID_ACCESS_CODE'],
    ['55000', 'ACCESS_CODE_NOT_CONFIGURED'],
    ['42501', 'AUTH_REQUIRED'],
    ['P0002', 'MEMBERSHIP_NOT_FOUND'],
  ]) {
    const codeThenSentinel = new RegExp(`${code}[\\s\\S]{0,180}?${sentinel}`, 'u');
    const sentinelThenCode = new RegExp(`${sentinel}[\\s\\S]{0,180}?${code}`, 'u');
    assert.ok(codeThenSentinel.test(login) || sentinelThenCode.test(login),
      `${code}/${sentinel} 조합을 독립적으로 분류해야 합니다.`);
  }
  assert.match(login, /22023[\s\S]{0,220}?INVALID_ACCESS_CODE[\s\S]{0,260}?최초 접속 코드가 올바르지 않습니다\.|INVALID_ACCESS_CODE[\s\S]{0,220}?22023[\s\S]{0,260}?최초 접속 코드가 올바르지 않습니다\./u,
    '잘못된 코드 안내는 22023/INVALID_ACCESS_CODE 조합에만 연결해야 합니다.');
});

test('이미 auth_id가 있는 기존 멤버는 비밀번호 로그인과 홈페이지 루트 목적지가 유지된다', async () => {
  const login = await read('src/pages/Login.jsx');

  assert.match(login, /const\s+proceedLogin\s*=\s*async/u);
  assert.match(login, /const\s+proceedLogin[\s\S]{0,420}?await\s+signIn\(\s*email\s*,\s*password\s*\)/u);
  assert.match(login, /const\s+handlePasswordSubmit[\s\S]{0,360}?await\s+proceedLogin\(\)/u);
  assert.match(login, /const\s+postLoginPath\s*=\s*['"]\/['"]/u);
  assert.match(login, /const\s+proceedLogin[\s\S]{0,700}?window\.location\.assign\(\s*postLoginPath\s*\)/u);
});

test('최초 접속 코드 literal과 VITE 공개 환경변수는 클라이언트 배포 입력에 포함되지 않는다', async () => {
  const clientFiles = [
    ...(await collectClientTextFiles('src')),
    ...(await collectClientTextFiles('public')),
    'index.html',
    'vite.config.js',
  ];
  const clientSource = (await Promise.all(clientFiles.map(read))).join('\n');
  const migration = await read(firstAccessMigrationPath);

  assert.doesNotMatch(clientSource, /SH-[A-Za-z0-9_-]{8,}/u,
    '실제 최초 접속 코드처럼 보이는 literal을 클라이언트 파일에 넣으면 안 됩니다.');
  assert.doesNotMatch(clientSource, /VITE_[A-Z0-9_]*(?:ACCESS|FIRST|INITIAL)[A-Z0-9_]*CODE/u,
    'VITE_* 값은 브라우저 bundle에 노출되므로 접속코드 저장에 사용할 수 없습니다.');
  assert.doesNotMatch(clientSource, /candidate_access_code\s*:\s*['"`]/u,
    'claim RPC에는 UI에서 받은 값을 전달해야 하며 literal을 전달하면 안 됩니다.');
  assert.doesNotMatch(migration, /^grant\s+(?:all|select)\b[^;]*\bsonghyeon_auth_settings\b/imu,
    '접속코드 hash 설정 테이블도 anon/authenticated에 직접 공개하면 안 됩니다.');
  assert.match(migration, /access_code_hash\s+text\s+not\s+null/iu);
  assert.doesNotMatch(migration, /insert\s+into\s+public\.songhyeon_auth_settings|extensions\.crypt\(\s*['"`]/iu);
});
