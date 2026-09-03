import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Data Room은 문서 추가·수정·삭제와 Supabase 공동 저장을 제공한다', async () => {
  const page = await readFile('src/pages/DataRoom.jsx', 'utf8');
  const layout = await readFile('src/components/Layout.jsx', 'utf8');
  const repository = await readFile('src/lib/songhyeonDataRoomRepository.js', 'utf8');
  const migration = await readFile('supabase/migrations/202608130007_songhyeon_data_room.sql', 'utf8');

  assert.match(page, /import \{ WorkspacePageFrame, WorkspacePageHeader \} from ['"]\.\.\/components\/workspace\/WorkspacePageLayout['"]/);
  assert.match(page, /<WorkspacePageHeader[\s\S]{0,180}?title="Data Room"/);
  assert.match(layout, /name: 'Data Room', path: '\/data'/);
  assert.match(page, /문서 추가/);
  assert.match(page, /문서 수정/);
  assert.match(page, /deleteDocument/);
  assert.doesNotMatch(page, /localStorage|documentStorageKey|defaultDocuments/);
  for (const method of ['loadDataRoomDocuments', 'createDataRoomDocument', 'updateDataRoomDocument', 'deleteDataRoomDocument', 'recordDataRoomView']) {
    assert.match(page, new RegExp(method));
    assert.match(repository, new RegExp(`export async function ${method}`));
  }
  assert.match(repository, /from\('songhyeon_data_room_documents'\)/);
  assert.match(migration, /create table if not exists public\.songhyeon_data_room_documents/);
  assert.match(migration, /enable row level security/);
  assert.match(migration, /public\.is_songhyeon_member\(\)/);
  assert.doesNotMatch(migration, /iota_v2|iota_/);
  assert.match(page, /원본 URL/);
  assert.match(page, /type="url"/);
  assert.doesNotMatch(page, /option value="download"|원본 유형|파일명 \(선택\)|download:/);
  assert.doesNotMatch(page, /크기\/표시|document\.size|draft\.size/);
  assert.match(page, /label="문서명" className="col-span-2"[\s\S]*?label="기준일"[\s\S]*?label="설명" className="col-span-3"/);
});

test('Data Room 목록과 상세는 서버가 확정한 작성자를 프로필 사진·이름으로 표시한다', async () => {
  const [page, repository] = await Promise.all([
    readFile('src/pages/DataRoom.jsx', 'utf8'),
    readFile('src/lib/songhyeonDataRoomRepository.js', 'utf8'),
  ]);

  assert.match(repository, /authorName:\s*row\.created_by_name/,
    'DB가 반환한 created_by_name을 목록 모델에 매핑해야 합니다.');
  assert.match(repository, /row\.created_by_name\s*\|\|\s*['"]작성자 미확인['"]/,
    '작성자가 없는 문서를 팀 이름으로 위장하지 않아야 합니다.');
  assert.doesNotMatch(repository, /created_by_name:\s*actor\.(?:name|staffName)/,
    '클라이언트가 전달한 이름을 원장 작성자로 신뢰하면 안 됩니다.');
  assert.match(page, /<th[^>]*>작성자<\/th>/,
    '문서 목록 헤더에 작성자 열이 있어야 합니다.');
  assert.match(page, /import SonghyeonMemberAvatar from ['"]\.\.\/components\/iota-songhyeon\/SonghyeonMemberAvatar['"]/,
    '업무피드와 같은 공용 멤버 프로필 사진을 사용해야 합니다.');
  assert.match(page, /function DataRoomAuthor\(\{ document, detail = false \}\)[\s\S]*?<SonghyeonMemberAvatar[\s\S]*?\{authorName\}/,
    '작성자 사진과 이름을 함께 표시하는 공용 표현을 사용해야 합니다.');
  assert.match(page, /data-data-room-author=\{detail \? ['"]detail['"] : ['"]list['"]\}/,
    '목록과 상세의 작성자 표현을 구분해 확인할 수 있어야 합니다.');
  assert.match(page, /<DataRoomAuthor document=\{document\} \/>/,
    '각 문서 목록 행에 작성자 사진과 이름을 표시해야 합니다.');
  assert.match(page, />작성자<\/span>\s*<DataRoomAuthor document=\{document\} detail \/>/,
    '펼쳐진 상세에도 작성자 란과 프로필 사진·이름을 표시해야 합니다.');
  assert.match(page, /\[document\.title,\s*document\.description,\s*document\.category,\s*document\.type,\s*document\.date,\s*document\.authorName\]/,
    '표시된 작성자도 Data Room 검색 대상이어야 합니다.');
  assert.match(page, /colSpan=\{8\}/,
    '작성자 열 추가 후 로딩·빈 결과 행이 전체 8열을 사용해야 합니다.');
});

test('Data Room 게스트는 목록만 보고 상세 클릭 시 로그인 안내를 받는다', async () => {
  const [app, page] = await Promise.all([
    readFile('src/App.jsx', 'utf8'),
    readFile('src/pages/DataRoom.jsx', 'utf8'),
  ]);

  assert.match(app, /path="data"\s+element=\{<DataRoom\s*\/>\}/,
    '게스트도 Data Room 목록은 볼 수 있어야 합니다.');
  assert.match(app, /path="data\/:documentId"[^\n]*<MemberRoute\s+guestRedirect="\/data"><DataRoom\s*\/><\/MemberRoute>/,
    '게스트가 상세 URL로 직접 진입하면 목록으로 돌아가야 합니다.');
  assert.match(page, /const openDocument = \(document\) => \{\s*if \(isReadOnly\) \{\s*setShowMemberLoginPrompt\(true\);\s*return;/,
    '게스트가 목록 행을 눌렀을 때 상세 URL로 이동하지 않아야 합니다.');
  assert.match(page, /aria-haspopup=\{isReadOnly \? 'dialog' : undefined\}/);
  assert.match(page, /<MemberLoginPrompt[\s\S]*?description="Data Room의 문서 상세 내용은 송현 BID 멤버 로그인 후 확인할 수 있습니다\."/,
    '무반응 대신 로그인 안내 팝업을 표시해야 합니다.');
});

test('초기 Data Room 문서 두 건은 실제 등록자인 전기영으로 보정한다', async () => {
  const migration = await readFile('supabase/migrations/202608200004_songhyeon_data_room_seed_authors.sql', 'utf8');
  const lower = migration.toLowerCase();

  assert.match(migration, /SH-BID-PREREAD-260728/);
  assert.match(migration, /SH-BID-STRATEGY-260811/);
  assert.match(lower, /lower\(author\.email\)\s*=\s*'jk\.jeon@igisam\.com'/);
  assert.match(migration, /author\.staff_name\s*=\s*'전기영'/);
  assert.match(lower, /created_by_name\s*=\s*author\.staff_name/);
  assert.match(lower, /created_by\s*=\s*coalesce\(document\.created_by,\s*author\.auth_id\)/);
  assert.match(lower, /disable trigger set_songhyeon_data_room_author[\s\S]*enable trigger set_songhyeon_data_room_author/,
    '기존 작성자 보존 trigger를 우회하는 보정 범위는 migration 안에서 다시 원상복구해야 합니다.');
});

test('Data Room 목록은 문서명과 설명을 한 줄 말줄임하고 각 문서 행 높이를 6px 줄인다', async () => {
  const page = await readFile('src/pages/DataRoom.jsx', 'utf8');
  const mapStart = page.indexOf('{filteredDocuments.map((document) => {');
  const relativeRowStart = page.slice(mapStart).search(/<tr\s+ref=\{isExpanded \? expandedRowRef : null\}/);
  const rowStart = relativeRowStart >= 0 ? mapStart + relativeRowStart : -1;
  const rowEnd = page.indexOf('</tr>', rowStart);
  const documentRow = mapStart >= 0 && rowStart > mapStart && rowEnd > rowStart
    ? page.slice(rowStart, rowEnd)
    : '';

  assert.ok(documentRow, 'Data Room 문서 목록 행을 찾을 수 있어야 합니다.');
  assert.match(documentRow, /<div className="[^"]*\bmin-w-0\b[^"]*">\s*<div\b[^>]*className="[^"]*\btruncate\b[^"]*"[^>]*>\{document\.title\}<\/div>/,
    '문서명은 너비가 제한된 컨테이너 안에서 한 줄 말줄임되어야 합니다.');
  assert.match(documentRow, /<div\b[^>]*className="[^"]*\btruncate\b[^"]*"[^>]*>\{document\.description\}<\/div>/,
    '문서 설명도 너비가 제한된 컨테이너 안에서 한 줄 말줄임되어야 합니다.');

  const dataCellClasses = [...documentRow.matchAll(/<td className="([^"]+)"/g)]
    .map((match) => match[1]);
  assert.equal(dataCellClasses.length, 8, '문서 행의 8개 셀을 모두 검사해야 합니다.');
  for (const className of dataCellClasses) {
    assert.match(className, /(?:^|\s)py-\[15px\](?:\s|$)/,
      '기존 py-[18px]에서 상하 3px씩 줄여 문서 행 전체 높이를 6px 축소해야 합니다.');
  }
});

test('Data Room 작성자 원장은 auth uid에 연결된 활성 멤버 이름을 서버 trigger로 확정한다', async () => {
  const migration = await readFile('supabase/migrations/202608180010_songhyeon_data_room_authors.sql', 'utf8');
  const lower = migration.toLowerCase();
  const triggerFunctions = [...migration.matchAll(
    /create\s+or\s+replace\s+function\s+public\.[a-z0-9_]+\s*\([^)]*\)[\s\S]*?returns\s+trigger[\s\S]*?\$\$[\s\S]*?\$\$\s*;/gi,
  )].map((match) => match[0]).join('\n');

  assert.match(lower, /alter table public\.songhyeon_data_room_documents[\s\S]*add column(?: if not exists)? created_by_name text/);
  assert.ok(triggerFunctions, 'Data Room 작성자를 확정하는 trigger function이 있어야 합니다.');
  assert.match(triggerFunctions, /auth\.uid\(\)/i);
  assert.match(triggerFunctions, /from\s+public\.songhyeon_members/i);
  assert.match(triggerFunctions, /auth_id\s*=\s*auth\.uid\(\)/i);
  assert.match(triggerFunctions, /is_active/i);
  assert.match(triggerFunctions, /staff_name/i);
  assert.match(triggerFunctions, /new\.created_by\s*:=\s*auth\.uid\(\)/i,
    'INSERT의 created_by는 요청 payload가 아니라 인증 세션으로 덮어써야 합니다.');
  assert.match(triggerFunctions, /new\.created_by_name\s*:=/i,
    'INSERT의 created_by_name은 활성 멤버 staff_name으로 확정해야 합니다.');
  assert.match(triggerFunctions, /new\.created_by\s*:=\s*old\.created_by/i,
    'UPDATE가 최초 작성자의 auth id를 바꿀 수 없어야 합니다.');
  assert.match(triggerFunctions, /new\.created_by_name\s*:=\s*old\.created_by_name/i,
    'UPDATE가 최초 작성자 이름을 바꿀 수 없어야 합니다.');

  assert.match(lower, /update public\.songhyeon_data_room_documents[\s\S]*created_by_name\s*=[\s\S]*staff_name/,
    '기존 문서에도 작성자 이름을 backfill해야 합니다.');
  assert.match(lower, /created_by_name\s+text\s+not null|alter column created_by_name set not null/,
    'backfill 이후 모든 문서에 작성자 이름이 존재해야 합니다.');
  assert.match(lower, /create trigger[\s\S]*on public\.songhyeon_data_room_documents/);
});

test('활성 송현 멤버는 Data Room 전체 읽기·쓰기를 공유하고 게스트는 작성자명을 포함한 공개뷰만 읽는다', async () => {
  const [baseMigration, authorMigration, guestMigration, page] = await Promise.all([
    readFile('supabase/migrations/202608130007_songhyeon_data_room.sql', 'utf8'),
    readFile('supabase/migrations/202608180010_songhyeon_data_room_authors.sql', 'utf8'),
    readFile('supabase/migrations/202608140004_songhyeon_guest_readonly_analytics.sql', 'utf8'),
    readFile('src/pages/DataRoom.jsx', 'utf8'),
  ]);
  const base = baseMigration.toLowerCase();
  const guestView = authorMigration.match(
    /create\s+or\s+replace\s+view\s+public\.songhyeon_public_data_room_documents[\s\S]*?from\s+public\.songhyeon_data_room_documents\s+(?:as\s+)?document\s*;/i,
  )?.[0] || '';

  const policies = [...base.matchAll(/create policy[\s\S]*?;/gi)].map((match) => match[0]);
  for (const operation of ['select', 'insert', 'update', 'delete']) {
    const policy = policies.find((statement) => new RegExp(`for ${operation} to authenticated`, 'i').test(statement)) || '';
    assert.ok(policy, `authenticated ${operation} 정책이 있어야 합니다.`);
    assert.match(policy, /public\.is_songhyeon_member\(\)/i,
      `${operation}는 활성 송현 멤버 전체가 사용할 수 있어야 합니다.`);
  }
  assert.match(base, /grant select, insert, update, delete on public\.songhyeon_data_room_documents to authenticated/);
  assert.match(base, /revoke all on table public\.songhyeon_data_room_documents from anon/);

  assert.ok(guestView, '작성자 migration이 게스트 공개뷰를 새 projection으로 교체해야 합니다.');
  assert.match(guestView, /document\.created_by_name/i);
  for (const privateField of ['created_by', 'updated_by', 'auth_id', 'email']) {
    assert.doesNotMatch(guestView, new RegExp(`\\b${privateField}\\b`, 'i'));
  }
  assert.match(authorMigration, /grant select on public\.songhyeon_public_data_room_documents to anon, authenticated/i);
  assert.doesNotMatch(authorMigration, /grant (?:insert|update|delete|all) on public\.songhyeon_public_data_room_documents to anon/i);
  assert.match(guestMigration, /grant select on public\.songhyeon_public_data_room_documents to anon, authenticated/i);

  assert.match(page, /!isReadOnly && <button[\s\S]*문서 추가/);
  assert.match(page, /!isReadOnly \? <div[\s\S]*<Pencil[\s\S]*<Trash2/);
  assert.doesNotMatch(page, /isAdmin|platform_role/,
    'Data Room 쓰기 UI를 특정 역할로 제한하면 안 됩니다.');
});
