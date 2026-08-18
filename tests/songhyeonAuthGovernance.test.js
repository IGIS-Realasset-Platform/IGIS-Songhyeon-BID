import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { songhyeonMemberFallback } from '../src/data/songhyeonMembers.js';

const read = (path) => readFile(path, 'utf8');

test('송현 Supabase 클라이언트는 전용 환경변수로 승인된 공통 인증 프로젝트만 허용한다', async () => {
  const source = await read('src/lib/songhyeonSupabase.js');
  assert.match(source, /VITE_SONGHYEON_SUPABASE_URL/);
  assert.match(source, /VITE_SONGHYEON_SUPABASE_ANON_KEY/);
  assert.doesNotMatch(source, /import\.meta\.env\.VITE_SUPABASE_URL/);
  assert.match(source, /qgrszltduzblpvpqvkqr/);
  assert.match(source, /APPROVED_SHARED_PROJECT_REF/);
  assert.match(source, /throw new Error/);
});

test('송현 앱은 로그인 라우트와 인증 보호 경계를 가진다', async () => {
  const app = await read('src/App.jsx');
  const main = await read('src/main.jsx');
  assert.match(app, /path="\/login"/);
  assert.match(app, /ProtectedRoute/);
  assert.match(main, /SonghyeonAuthProvider/);
});

test('송현 로그인·재로그인·게스트·인증된 login 재진입은 이전 경로를 복원하지 않고 항상 통합업무보드로 간다', async () => {
  const login = await read('src/pages/Login.jsx');

  assert.doesNotMatch(
    login,
    /location\.state\??\.?(?:from|returnTo)|(?:local|session)Storage[\s\S]{0,160}(?:last|path|route|redirect)/iu,
    '로그인 화면은 location.state.from이나 저장된 마지막 경로를 로그인 목적지로 복원하면 안 됩니다.',
  );
  assert.match(
    login,
    /const\s+postLoginPath\s*=\s*['"]\/tasks['"]/u,
    '모든 로그인 흐름의 공통 목적지는 /tasks로 고정해야 합니다.',
  );
  assert.match(
    login,
    /useEffect\([\s\S]{0,240}if \(user && member\) navigate\(postLoginPath,\s*\{ replace: true \}\)/u,
    '이미 인증된 멤버가 /login에 진입하면 항상 /tasks로 이동해야 합니다.',
  );
  assert.match(
    login,
    /if \(user && member\) return <Navigate\s+to=\{postLoginPath\}\s+replace\s*\/>/u,
    '인증 상태의 즉시 redirect도 항상 /tasks를 써야 합니다.',
  );
  assert.match(
    login,
    /const proceedLogin[\s\S]{0,640}window\.location\.assign\(postLoginPath\)/u,
    '로그인과 로그아웃 후 재로그인 성공 목적지는 항상 /tasks여야 합니다.',
  );
  assert.match(
    login,
    /const browseAsGuest[\s\S]{0,320}await enterGuestMode\(\)[\s\S]{0,120}navigate\(postLoginPath,\s*\{ replace: true \}\)/u,
    '게스트 진입도 이전 경로와 무관하게 항상 /tasks로 이동해야 합니다.',
  );
  assert.match(
    login,
    /const handleChangePasswordSubmit[\s\S]{0,960}window\.location\.assign\(['"]\/tasks['"]\)/u,
    '패스워드 변경 후 재접속도 항상 /tasks로 이동해야 합니다.',
  );
  assert.match(
    login,
    /const handleRecoveryPasswordSubmit[\s\S]{0,640}window\.location\.assign\(['"]\/tasks['"]\)/u,
    '패스워드 복구 후 재접속도 항상 /tasks로 이동해야 합니다.',
  );
});

test('로그인 첫 화면은 IOTA AuthSetup 원문과 단계형 UI를 그대로 사용한다', async () => {
  const login = await read('src/pages/Login.jsx');
  assert.match(login, /IFPDP 소개/);
  assert.match(login, /https:\/\/iotaseoul\.cloud\/home#page-1/);
  assert.match(login, /target="_blank"/);
  assert.match(login, />Songhyeon BID<\/h1>/);
  assert.doesNotMatch(login, />IFPDP Songhyeon BID<\/h1>/);
  assert.match(login, /이지스 이메일을 입력해주세요\./);
  assert.match(login, /placeholder="이메일을 입력하세요\."/);
  assert.match(login, /'다음'/);
  assert.match(login, /패스워드를 입력해주세요\./);
  assert.match(login, /placeholder="패스워드를 입력하세요\."/);
  assert.doesNotMatch(login, /승인된 송현 BID TF 계정으로 접속하세요/);
  assert.doesNotMatch(login, /송현 전용 Supabase 연결 대기 중/);
  assert.doesNotMatch(login, />이메일<|>비밀번호</);
});

test('송현 파비콘은 사용자 제공 SO 아이콘으로 연결된다', async () => {
  const html = await read('index.html');
  assert.match(html, /href="\/favicon\.png\?v=songhyeon-so"/);
  await access('public/favicon.png');
  await access('public/favicon-original-d.png');
});

test('송현 기존 멤버 로그인은 IOTA 공통계정의 로그인·변경·분실·복구 단계를 유지한다', async () => {
  const login = await read('src/pages/Login.jsx');
  const context = await read('src/context/SonghyeonAuthContext.jsx');
  for (const text of [
    '패스워드를 입력하세요.', '패스워드 변경', '비밀번호를 잊으셨나요?',
    '비밀번호 재설정 링크 발송', '새로운 패스워드 설정', '패스워드 저장 및 접속하기',
  ]) assert.match(login, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(login, /updatePassword/);
  assert.match(context, /PASSWORD_RECOVERY/);

  assert.doesNotMatch(login, /IOTA2026|SONGHYEON2026/);
});

test('좌측 하단 계정 카드는 프로필 사진·이름·이메일과 비밀번호 변경·문의·로그아웃을 제공한다', async () => {
  const [layout, context, memberAvatar] = await Promise.all([
    read('src/components/Layout.jsx'),
    read('src/context/SonghyeonAuthContext.jsx'),
    read('src/components/iota-songhyeon/SonghyeonMemberAvatar.jsx'),
  ]);

  assert.match(layout, /import\s+SonghyeonMemberAvatar\s+from\s+['"][^'"]*SonghyeonMemberAvatar(?:\.jsx)?['"]/);
  assert.match(layout, /<SonghyeonMemberAvatar\b/);
  assert.match(layout, /member\?\.staff_name/);
  assert.match(layout, /user\?\.email/);
  assert.match(layout, /member\?\.photo_path|member=\{member\}|profile=\{member\}/,
    '로그인 멤버의 DB photo_path가 공용 아바타에 전달되어야 합니다.');
  assert.match(memberAvatar, /songhyeonMemberPhotoSource/);
  assert.match(memberAvatar, /photoPath|photo_path/);

  for (const label of ['비밀번호 변경', '플랫폼 이용 문의', '로그아웃']) {
    assert.match(layout, new RegExp(label), `계정 카드 액션 누락: ${label}`);
  }
  assert.match(layout, /showProfileMenu|profileMenuOpen/);
  assert.match(layout, /setShowPasswordModal\(true\)|setPasswordModalOpen\(true\)/);
  assert.match(layout, /setShowContactModal\(true\)|setContactModalOpen\(true\)/);
  assert.match(layout, /setShowLogoutModal\(true\)|setLogoutModalOpen\(true\)/);
  assert.match(layout, /updatePassword/);
  assert.match(context, /updatePassword:\s*\(password\)\s*=>\s*songhyeonSupabase\.auth\.updateUser\(\{\s*password\s*\}\)/);
  assert.match(layout, /await\s+updatePassword\(/);
  assert.match(layout, /정말 로그아웃 하시겠습니까\?/);
  assert.match(layout, /await\s+signOut\(\)/);
  assert.match(layout, /jk\.jeon@igisam\.com/);
  assert.match(layout, /010-9076-5369/);
  assert.match(layout, /\{isGuest\s*\?\s*\(/);
  assert.match(layout, /onClick=\{leaveGuestMode\}/);
  assert.match(layout, />로그인<\/button>/);
});

test('송현 11명 전체 이메일이 승인 roster로 seed된다', async () => {
  const seed = await read('supabase/seed.sql');
  const emails = ['sjlee@igisam.com', 'kylee@igisam.com', 'jk.jeon@igisam.com', 'minjik@igisam.com', 'argoh@igisam.com', 'hyunsoo.kim@igisam.com', 'ghlee@igisam.com', 'smchung@igisam.com', 'subin.yim@igisam.com', 'chaemi.bang@igisam.com', 'jiwon.lee@igisam.com'];
  for (const email of emails) assert.match(seed, new RegExp(email.replace('.', '\\.')));
});

test('거버넌스 하위 송현 멤버 라우트와 메뉴가 연결된다', async () => {
  const app = await read('src/App.jsx');
  const layout = await read('src/components/Layout.jsx');
  assert.match(app, /governance\/internal/);
  assert.match(layout, /송현 BID Member/);
  assert.match(layout, /\/governance\/internal/);
});

test('송현 전용 스키마는 멤버십·로그인이력·감사로그와 RLS를 포함한다', async () => {
  const sql = await read('supabase/songhyeon_bid/001_auth_governance.sql');
  for (const token of ['songhyeon_members', 'songhyeon_login_history', 'songhyeon_audit_log', 'enable row level security', 'auth.uid()']) assert.match(sql.toLowerCase(), new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.doesNotMatch(sql, /iota_seoul_/);
});

test('송현 멤버 화면은 DB 연결과 송현 TF fallback을 제공한다', async () => {
  const page = await read('src/pages/governance/SonghyeonInternal.jsx');
  assert.match(page, /songhyeon_public_profiles/);
  assert.doesNotMatch(page, /\.select\([^\n]*email/);
  assert.match(page, /송현 BID Member/);
  assert.match(page, /송현 BID TF/);
  assert.doesNotMatch(page, /송현 전용 DB/);
  assert.doesNotMatch(page, /기준 조직안/);
});

test('송현 조직도는 IOTA 상단 여백·표 동작과 11명 통합 명단을 유지한다', async () => {
  const page = await read('src/pages/governance/SonghyeonInternal.jsx');
  const layout = await read('src/components/Layout.jsx');
  assert.match(layout, /workspace-content px-\[60px\] pt-\[8px\]/);
  assert.match(layout, /<main ref=\{mainRef\} className=\{`min-w-0 flex-1/);
  assert.match(layout, /useLayoutEffect/);
  assert.match(layout, /mainRef\.current\.scrollTop = 0/);
  assert.match(layout, /mainRef\.current\.scrollLeft = 0/);
  assert.match(page, /pt-\[28px\]/);
  assert.match(page, /mb-\[8px\]/);
  assert.match(page, /mb-\[24px\]/);
  assert.match(page, /mb-\[12px\]/);
  assert.match(page, /const GROUP_ORDER = \['공간솔루션센터', '기업마케팅', '기획추진센터'\]/);
  assert.match(page, />부문 내 소속</);
  assert.doesNotMatch(page, />담당 Gate</);
  assert.match(page, />인력</);
  assert.doesNotMatch(page, />책임인력</);
  assert.doesNotMatch(page, />실무인력</);
  assert.match(page, /GROUP_META/);
  assert.match(page, /row\.members\.map/);
  assert.match(page, /row\.responsibilities\.map/);
  assert.doesNotMatch(page, /row\.responsibilities\[member\.name\]/);
  for (const responsibility of ['서비스 오너', '성과관리', '기업 발굴', '관계 인계', '전략·우선순위', '단계게이트']) assert.match(page, new RegExp(responsibility));
  assert.match(page, /bg-white\/5/);
  assert.match(page, /group-hover:text-\[#fbf167\]/);
  assert.match(page, /h-\[128px\] w-\[128px\]/);
  assert.match(page, /border border-white\/10/);
  assert.doesNotMatch(page, /border-\[#3b4f68\]/);
  assert.doesNotMatch(page, /<article/);
  assert.doesNotMatch(page, />Gate 범위</);
  assert.match(page, /last:border-b-0/);
  for (const [name, title] of [['김현수', '센터장'], ['이시정', '센터장'], ['김민지', '리더'], ['정수명', '매니저'], ['임수빈', '매니저'], ['방채미', '매니저'], ['이지원', '매니저']]) {
    assert.match(page, new RegExp(`${name}: '${title}'`));
  }
  assert.equal((page.match(/align-middle/g) || []).length, 4);
  assert.doesNotMatch(page, /align-top/);
  assert.match(page, /row\.group !== '공간솔루션센터' \? 'h-\[220px\]'/);
});

test('송현 멤버는 지정된 3개 조직 11명으로 구성된다', () => {
  const expected = ['이시정', '이관용', '전기영', '김민지', '고아라', '김현수', '이가현', '정수명', '임수빈', '방채미', '이지원'];
  assert.deepEqual(songhyeonMemberFallback.map((member) => member.name), expected);
  assert.deepEqual(
    Object.fromEntries(['기획추진센터', '기업마케팅', '공간솔루션센터'].map((group) => [group, songhyeonMemberFallback.filter((member) => member.group === group).length])),
    { 기획추진센터: 3, 기업마케팅: 2, 공간솔루션센터: 6 },
  );
  assert.equal(songhyeonMemberFallback.some((member) => member.name.includes('예정')), false);
});

test('9명의 IOTA 원본 프로필 이미지가 송현 저장소에 독립 복사된다', async () => {
  for (const name of ['이시정', '이관용', '전기영', '김민지', '고아라', '김현수', '이가현', '정수명', '임수빈']) {
    await access(`public/songhyeon-members/${name}.webp`);
  }
  const page = await read('src/pages/governance/SonghyeonInternal.jsx');
  assert.match(page, /songhyeonMemberPhotoSource/);
});

test('송현 거버넌스는 중복된 단계·R&R 메뉴 대신 최소 운영체계로 구성된다', async () => {
  const layout = await read('src/components/Layout.jsx');
  const app = await read('src/App.jsx');
  const principles = await read('src/pages/governance/SonghyeonPrinciples.jsx');
  const interfaces = await read('src/pages/governance/SonghyeonInterfaces.jsx');
  const operations = await read('src/pages/governance/SonghyeonOperations.jsx');

  assert.doesNotMatch(layout, /단계별 의사결정/);
  assert.doesNotMatch(layout, /조직별 R&R/);
  for (const label of ['운영 원칙', '협의 창구', '회의·이슈관리']) assert.match(layout, new RegExp(label));
  for (const route of ['governance/principles', 'governance/interfaces', 'governance/operations']) assert.match(app, new RegExp(route));
  assert.match(principles, /하지 않을 것/);
  assert.match(principles, /MVP 투입 전 확인/);
  assert.match(interfaces, /서울시·공공기관/);
  assert.match(interfaces, /기업마케팅센터 → 공간솔루션센터/);
  assert.match(operations, /주간 TF 실무회의/);
  assert.match(operations, /TF 판단으로 올릴 사안/);
  assert.doesNotMatch(principles + interfaces + operations, /5 Tier|PFV|IPR 워킹그룹|LP 정기보고/);
});

test('송현 멤버와 운영 원칙은 동일한 페이지 헤더·첫 콘텐츠 간격 계약을 사용한다', async () => {
  const pages = await Promise.all([
    'SonghyeonInternal.jsx', 'SonghyeonPrinciples.jsx', 'SonghyeonInterfaces.jsx', 'SonghyeonOperations.jsx',
  ].map((name) => read(`src/pages/governance/${name}`)));
  const sharedTokens = ['flex min-w-0 w-full max-w-[1112px]', 'pb-[100px]', 'pt-[28px]', 'mb-[8px] flex h-[36px] items-center justify-between', 'text-[32px]', 'leading-none', 'mb-[24px] text-[16px] leading-[26px]', 'mb-[12px] flex items-center justify-between', 'text-[18px] font-bold tracking-tight text-white'];
  for (const token of sharedTokens) {
    for (const page of pages) assert.ok(page.includes(token), `거버넌스 페이지에 공통 레이아웃 토큰 누락: ${token}`);
  }
});
