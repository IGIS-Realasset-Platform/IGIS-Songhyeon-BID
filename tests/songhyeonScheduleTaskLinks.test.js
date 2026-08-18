import assert from 'node:assert/strict';
import test from 'node:test';
import { readdir, readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const paths = {
  schedule: 'src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx',
  modal: 'src/components/iota-songhyeon/pmo/SonghyeonScheduleTaskLinkModal.jsx',
  rowEditor: 'src/components/iota-songhyeon/pmo/SonghyeonScheduleRowEditorModal.jsx',
  board: 'src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx',
  editor: 'src/components/iota-songhyeon/task-board/SonghyeonTaskEditorModal.jsx',
  scheduleRepository: 'src/lib/songhyeonScheduleRepository.js',
  linkMigration: 'supabase/migrations/202608130005_songhyeon_schedule_task_links.sql',
  guestMigration: 'supabase/migrations/202608140004_songhyeon_guest_readonly_analytics.sql',
  rowMigration: 'supabase/migrations/202608180004_songhyeon_schedule_rows.sql',
};

test('일정 row는 songhyeon_tasks 원장 업무를 explicit link row 1:N으로만 연결한다', async () => {
  const [repository, migration, guestMigration, rowMigration] = await Promise.all([
    read(paths.scheduleRepository),
    read(paths.linkMigration),
    read(paths.guestMigration),
    read(paths.rowMigration),
  ]);

  assert.match(migration, /schedule_source_key text not null/);
  assert.match(migration, /task_source_key text not null references public\.songhyeon_tasks\(source_key\)/,
    '일정 연결 대상은 별도 상세 원장이 아니라 통합업무 원장이어야 합니다.');
  assert.match(migration, /unique\(schedule_source_key, task_source_key\)/,
    '같은 업무의 중복 연결만 막는 composite unique가 필요합니다.');
  assert.doesNotMatch(migration, /unique\s*\(\s*schedule_source_key\s*\)/,
    '일정 row 하나에 여러 통합업무를 연결할 수 있어야 합니다.');

  assert.match(repository, /export function linkedTasksForSchedule\(scheduleSourceKey, tasks, links\)/);
  assert.match(repository, /links\.filter\(\(link\) => link\.scheduleSourceKey === scheduleSourceKey\)/);
  assert.match(repository, /return tasks\.filter\(\(task\) => explicitKeys\.has\(task\.sourceKey\)\)/,
    '연결 원장에 명시적으로 저장된 통합업무만 projection해야 합니다.');
  assert.doesNotMatch(repository, /task\.sourceKey === scheduleSourceKey|implicit:\s*true/,
    '동일 sourceKey를 숨은 연결로 간주하면 수동 연결 해제가 불가능해집니다.');
  assert.match(repository, /onConflict: 'schedule_source_key,task_source_key'/);
  assert.match(repository, /ignoreDuplicates: true/,
    '중복 연결 재요청이 UPDATE 권한을 요구하지 않아야 합니다.');
  assert.match(repository, /if \(inserted\) return scheduleLinkPayload\(inserted\)[\s\S]*?\.eq\('schedule_source_key', scheduleSourceKey\)[\s\S]*?\.eq\('task_source_key', taskSourceKey\)/,
    '중복 시 기존 explicit link row를 다시 읽어야 합니다.');

  const backfill = rowMigration.match(/insert into public\.songhyeon_schedule_task_links[\s\S]*?on conflict \(schedule_source_key, task_source_key\) do nothing;/i)?.[0] || '';
  assert.ok(backfill, '기존 동일 sourceKey 관계를 explicit link row로 이관해야 합니다.');
  assert.match(backfill, /select schedule\.source_key, task\.source_key/);
  assert.match(backfill, /join public\.songhyeon_tasks task[\s\S]*?task\.source_key = schedule\.source_key/);
  assert.match(rowMigration, /foreign key \(schedule_source_key\)[\s\S]*?references public\.songhyeon_schedule_rows\(source_key\)[\s\S]*?on delete cascade[\s\S]*?not valid/,
    '일정 row 삭제는 link row만 cascade하고 기존 orphan link 이관은 막지 않아야 합니다.');

  assert.match(rowMigration, /create policy "songhyeon members add schedule links"[\s\S]*?public\.is_songhyeon_member\(\)[\s\S]*?created_by = auth\.uid\(\)/);
  assert.match(migration, /create policy "songhyeon members delete schedule links"[\s\S]*?using \(public\.is_songhyeon_member\(\)\)/);
  assert.match(guestMigration, /'songhyeon_schedule_task_links'/);
  assert.match(guestMigration, /'revoke all on table public\.%I from public, anon'/);
  assert.match(guestMigration, /grant select on public\.songhyeon_public_schedule_task_links to anon, authenticated/);
});

test('신규 Task는 통합업무보드에서만 생성하고 일정은 기존 실제 통합업무만 연결한다', async () => {
  const [schedule, modal, board, editor, repository] = await Promise.all([
    read(paths.schedule),
    read(paths.modal),
    read(paths.board),
    read(paths.editor),
    read(paths.scheduleRepository),
  ]);

  assert.match(editor, /import \{ createTask, loadTaskEditorOptions, updateTask \} from ['"]\.\.\/\.\.\/\.\.\/lib\/songhyeonTaskRepository['"]/);
  assert.match(editor, /const created = await createTask\(payload, actor\);\s*onCreated\(created\)/);
  assert.match(board, /\+ 새 업무 추가/);
  assert.match(board, /onCreated=\{\(created\) => \{ setTasks\(\(current\) => \[\.\.\.current, created\]\)/);

  assert.match(repository, /import \{ loadTasks \} from ['"]\.\/songhyeonTaskRepository['"]/);
  assert.doesNotMatch(repository, /\b(?:createTask|updateTask|archiveTask|deleteTask)\b|createAndLinkScheduleTask/,
    '일정 repository는 연결된 Task의 생성·내용·납기·보관을 변경하면 안 됩니다.');
  assert.doesNotMatch(repository, /primaryTask|taskStatusToScheduleStatus\(primaryTask/,
    '일정 row의 납기·상태는 동일 sourceKey Task에서 암묵적으로 덮어쓰면 안 됩니다.');
  assert.doesNotMatch(schedule, /createAndLinkScheduleTask|onCreateTask=|canCreateTask/);
  assert.doesNotMatch(modal, /onCreateTask|canCreateTask|새 통합업무 등록|등록 후 연결|activeTab === 'new'/);
  assert.match(modal, /기존 통합업무 연결/);
});

test('기존 통합업무는 일정 row에서 검색·복수 연결하고 연결 해제로 Task를 삭제하지 않는다', async () => {
  const [schedule, modal, repository] = await Promise.all([
    read(paths.schedule),
    read(paths.modal),
    read(paths.scheduleRepository),
  ]);

  assert.match(modal, /const filteredTasks = useMemo\(\(\) => \{[\s\S]*?return tasks\.filter/);
  assert.match(modal, /filteredTasks\.map\(\(task\) =>/);
  assert.match(modal, /onClick=\{\(\) => onLink\(task\.sourceKey\)\}/);
  assert.match(modal, /\{linked \? '연결됨' : '연결'\}/);
  assert.match(modal, /const link = links\.find\(\(entry\) => entry\.scheduleSourceKey === item\.sourceKey && entry\.taskSourceKey === task\.sourceKey\)/);
  assert.match(modal, /\{link && canManageLinks && <button[\s\S]*?onUnlink\(link\.id\)[\s\S]*?>연결 해제<\/button>\}/,
    '활성 멤버는 explicit link row를 해제할 수 있어야 합니다.');
  assert.match(repository, /from\('songhyeon_schedule_task_links'\)\.delete\(\)\.eq\('id', linkId\)/);
  const unlinkBlock = repository.match(/export async function unlinkScheduleTask[\s\S]*?(?=\nexport async function)/)?.[0] || '';
  assert.ok(unlinkBlock, '연결 해제 repository 구현을 찾을 수 없습니다.');
  assert.doesNotMatch(unlinkBlock, /songhyeon_tasks|archiveTask|deleteTask/,
    '연결 해제는 연결 row만 지우고 통합업무 원장을 건드리면 안 됩니다.');
  assert.match(schedule, /onLink=\{\(taskSourceKey\) => runMutation/);
  assert.match(schedule, /onUnlink=\{\(linkId\) => runMutation/);
  assert.match(schedule, /onUnlink=\{\(linkId\) => runMutation\(async \(\) => \{ await unlinkScheduleTask\(linkId, actor\); setLinks/);
});

test('일정 Task 기능은 별도 schedule detail task 원장을 다시 만들지 않는다', async () => {
  const [schedule, modal, repository, pmoFiles, migrations] = await Promise.all([
    read(paths.schedule),
    read(paths.modal),
    read(paths.scheduleRepository),
    readdir(new URL('../src/components/iota-songhyeon/pmo/', import.meta.url)),
    readdir(new URL('../supabase/migrations/', import.meta.url)),
  ]);
  const product = `${schedule}\n${modal}\n${repository}`;

  assert.doesNotMatch(product, /ScheduleDetailTasks|scheduleDetailTask|ScheduleDetailTask/);
  assert.doesNotMatch(product, /songhyeon_(?:public_)?schedule_detail_tasks/);
  assert.doesNotMatch(product, /(?:create|delete)_songhyeon_schedule_detail_task/);
  assert.ok(!pmoFiles.includes('SonghyeonScheduleDetailTasks.jsx'),
    '별도 제목형 상세 Task 컴포넌트를 유지하면 안 됩니다.');
  assert.ok(!migrations.some((file) => file.includes('songhyeon_schedule_detail_tasks')),
    '통합업무 외 별도 Task 원장 migration을 유지하면 안 됩니다.');
});

test('canonical schedule row SQL은 leaf 일정만 저장하고 guest에게 read-only view만 연다', async () => {
  const migration = await read(paths.rowMigration);

  assert.match(migration, /create table if not exists public\.songhyeon_schedule_rows/);
  for (const column of [
    'source_key text not null unique',
    'parent_source_key text not null',
    'display_name text not null',
    'lead_label text not null',
    'category_main text not null',
    'stage text not null',
    'status text not null',
    'start_date date not null',
    'end_date date not null',
    'sort_order integer not null',
  ]) assert.match(migration, new RegExp(column.replaceAll(' ', '\\s+')));
  assert.match(migration, /check \(start_date <= end_date\)/);
  assert.match(migration, /alter table public\.songhyeon_schedule_rows enable row level security/);
  assert.match(migration, /create policy "songhyeon members read schedule rows"[\s\S]*?for select to authenticated[\s\S]*?public\.is_songhyeon_member\(\)/);
  assert.match(migration, /revoke all on table public\.songhyeon_schedule_rows from public, anon, authenticated/);
  assert.match(migration, /grant select on table public\.songhyeon_schedule_rows to authenticated/);
  assert.doesNotMatch(migration, /grant (?:insert|update|delete|all)[^;]*songhyeon_schedule_rows/i,
    '원본 row table의 쓰기는 RPC로만 허용해야 합니다.');

  const publicView = migration.match(/create or replace view public\.songhyeon_public_schedule_rows[\s\S]*?from public\.songhyeon_schedule_rows schedule;/i)?.[0] || '';
  assert.ok(publicView, 'guest-safe schedule row view가 필요합니다.');
  assert.match(publicView, /security_barrier = true, security_invoker = false/);
  assert.doesNotMatch(publicView, /created_by|updated_by|auth\.users/,
    '게스트 view에는 Auth 식별자를 노출하면 안 됩니다.');
  assert.match(migration, /revoke all on table public\.songhyeon_public_schedule_rows\s+from public, anon, authenticated/);
  assert.match(migration, /grant select on table public\.songhyeon_public_schedule_rows\s+to anon, authenticated/);
});

test('schedule row RPC는 추가·수정·삭제를 exact 전기영에게만 허용한다', async () => {
  const migration = await read(paths.rowMigration);
  const createFunction = migration.match(/create or replace function public\.create_songhyeon_schedule_row[\s\S]*?\n\$\$;/i)?.[0] || '';
  const updateFunction = migration.match(/create or replace function public\.update_songhyeon_schedule_row[\s\S]*?\n\$\$;/i)?.[0] || '';
  const deleteFunction = migration.match(/create or replace function public\.delete_songhyeon_schedule_row[\s\S]*?\n\$\$;/i)?.[0] || '';

  for (const [name, sql] of Object.entries({ createFunction, updateFunction, deleteFunction })) {
    assert.ok(sql, `${name} SQL 바디를 찾을 수 없습니다.`);
    assert.match(sql, /security definer/i);
    assert.match(sql, /errcode = '42501'/i);
  }
  assert.match(createFunction, /if not public\.is_jeon_giyoung_songhyeon_task_owner\(\)/);
  assert.match(createFunction, /SONGHYEON_SCHEDULE_ROW_CREATE_FORBIDDEN/);
  assert.match(deleteFunction, /if not public\.is_jeon_giyoung_songhyeon_task_owner\(\)/);
  assert.match(deleteFunction, /SONGHYEON_SCHEDULE_ROW_DELETE_FORBIDDEN/);
  assert.match(updateFunction, /if not public\.is_jeon_giyoung_songhyeon_task_owner\(\)/);
  assert.match(updateFunction, /SONGHYEON_SCHEDULE_ROW_UPDATE_FORBIDDEN/);
  const allowedParents = new Set([...createFunction.matchAll(/'(G[0-6]-WS\d{2})'/g)].map((match) => match[1]));
  assert.equal(allowedParents.size, 21, '신규 leaf row는 검토된 21개 lv2 부모 아래에만 생성되어야 합니다.');

  for (const signature of [
    /create_songhyeon_schedule_row\([\s\S]*?\) from public, anon, authenticated/,
    /update_songhyeon_schedule_row\(text, jsonb\)\s+from public, anon, authenticated/,
    /delete_songhyeon_schedule_row\(text\)\s+from public, anon, authenticated/,
  ]) assert.match(migration, new RegExp(`revoke all on function public\\.${signature.source}`, 'i'));
  for (const rpc of ['create_songhyeon_schedule_row', 'update_songhyeon_schedule_row', 'delete_songhyeon_schedule_row']) {
    assert.match(migration, new RegExp(`grant execute on function public\\.${rpc}[\\s\\S]*?to authenticated`, 'i'));
  }
});

test('schedule row 삭제 SQL은 row·link·override만 지우고 통합업무 원장을 절대 변경하지 않는다', async () => {
  const migration = await read(paths.rowMigration);
  const deleteFunction = migration.match(/create or replace function public\.delete_songhyeon_schedule_row[\s\S]*?\n\$\$;/i)?.[0] || '';

  assert.match(deleteFunction, /delete from public\.songhyeon_schedule_task_links[\s\S]*?schedule_source_key = target_source_key/);
  assert.match(deleteFunction, /delete from public\.songhyeon_schedule_overrides[\s\S]*?schedule_source_key = target_source_key/);
  assert.match(deleteFunction, /delete from public\.songhyeon_schedule_rows[\s\S]*?source_key = target_source_key/);
  assert.doesNotMatch(deleteFunction, /(?:delete from|update|insert into) public\.songhyeon_tasks/i,
    '일정 row 삭제는 통합업무 삭제·보관·수정으로 cascade되면 안 됩니다.');
});

test('schedule repository는 canonical row/view를 로드하고 CRUD RPC만 호출한다', async () => {
  const repository = await read(paths.scheduleRepository);

  assert.match(repository, /const table = authenticated \? 'songhyeon_schedule_rows' : 'songhyeon_public_schedule_rows'/);
  assert.match(repository, /const rowsTable = authenticated \? 'songhyeon_schedule_rows' : 'songhyeon_public_schedule_rows'/);
  assert.match(repository, /const mergeCanonicalScheduleRows = \(scheduleItems, rows\) => \{[\s\S]*?scheduleItems\.filter\(\(item\) => item\.itemType !== 'task'\)/,
    '기존 static leaf를 다시 덮지 않고 canonical row가 행 추가·삭제의 기준이어야 합니다.');
  assert.match(repository, /itemType: 'task'/);
  for (const api of ['loadScheduleRows', 'createScheduleRow', 'updateScheduleRow', 'deleteScheduleRow']) {
    assert.match(repository, new RegExp(`export async function ${api}\\b`), `repository export 누락: ${api}`);
  }
  assert.match(repository, /rpc\('create_songhyeon_schedule_row'/);
  assert.match(repository, /rpc\('update_songhyeon_schedule_row'/);
  assert.match(repository, /rpc\('delete_songhyeon_schedule_row'/);
  assert.match(repository, /export const updateScheduleItem = updateScheduleRow/);
  assert.doesNotMatch(repository, /\b(?:createTask|updateTask|archiveTask|deleteTask)\b|primaryTask|implicit:\s*true/);
});

test('상세 일정 row CRUD는 table 밖 전기영 전용 관리 rail, Task 연결은 활성 멤버 기능으로 분리한다', async () => {
  const [schedule, modal] = await Promise.all([
    read(paths.schedule),
    read(paths.modal),
  ]);

  assert.match(schedule, /const canManageScheduleLinks = !isReadOnly && Boolean\(user\?\.id && member\)/);
  assert.match(schedule, /const canManageScheduleRows = canManageScheduleLinks && member\?\.staff_name === '전기영' && user\?\.email\?\.toLowerCase\(\) === 'jk\.jeon@igisam\.com'/);
  assert.match(schedule, /canManageScheduleRows \? \(\s*<aside\s*data-schedule-admin-rail/);
  assert.match(schedule, /const SCHEDULE_TABLE_WIDTH = 1198/);
  assert.doesNotMatch(schedule, /SCHEDULE_MANAGEMENT_COLUMN_WIDTH/,
    '중앙 일정 content 폭 계산에 외부 관리 rail 폭을 포함하면 안 됩니다.');
  const centerContentTag = schedule.match(/<div data-schedule-center-content[^>]*>/)?.[0] || '';
  assert.ok(centerContentTag, '중앙 일정 content wrapper를 찾을 수 없습니다.');
  assert.match(centerContentTag, /style=\{\{ width: `\$\{SCHEDULE_TABLE_WIDTH\}px` \}\}/,
    '중앙 일정 content 폭은 관리 rail과 무관하게 정확히 1198px여야 합니다.');
  assert.doesNotMatch(centerContentTag, /112|canManageScheduleRows|MANAGEMENT/,
    '중앙 일정 content wrapper에 관리 rail 폭이나 권한 조건을 섞으면 안 됩니다.');
  assert.match(schedule, /<table[^>]*style=\{\{ width: `\$\{SCHEDULE_TABLE_WIDTH\}px` \}\}/,
    '일정 table도 중앙 content와 같은 1198px 폭을 유지해야 합니다.');
  assert.match(schedule, /<\/div>\s*<\/div>\s*\{canManageScheduleRows \? \(\s*<aside\s*data-schedule-admin-rail/,
    '관리 rail은 중앙 content와 scroll wrapper를 모두 닫은 뒤의 완전한 sibling이어야 합니다.');
  assert.match(schedule, /data-schedule-admin-rail[\s\S]*?data-outside-centered-content="true"[\s\S]*?className="[^"]*absolute[^"]*left-full[^"]*ml-3[^"]*w-\[112px\][^"]*"/,
    '관리 rail은 중앙 1198px content 바깥 오른쪽에 left-full로 배치되어야 합니다.');
  assert.match(schedule, /const adminRailRowsRef = useRef\(null\)/);
  assert.match(schedule, /const syncAdminRailRows = useCallback\(\(\) => \{[\s\S]*?querySelectorAll\('\[data-schedule-row-source\]'\)[\s\S]*?querySelectorAll\('\[data-schedule-admin-source\]'\)[\s\S]*?getBoundingClientRect\(\)[\s\S]*?adminRow\.style\.height = `\$\{rowBounds\.height\}px`[\s\S]*?adminRow\.style\.transform = `translateY\(\$\{rowBounds\.top - railTop\}px\)`/,
    '관리 rail의 각 행은 고정 간격이 아니라 대응 table 행의 실제 top과 height를 사용해야 합니다.');
  assert.match(schedule, /data-schedule-scroll[\s\S]*?onScroll=\{syncAdminRailRows\}/,
    '중앙 table 스크롤 시 실제 행 위치를 다시 측정해 관리 rail을 동기화해야 합니다.');
  assert.match(schedule, /new ResizeObserver\(syncAdminRailRows\)[\s\S]*?querySelectorAll\('\[data-schedule-row-source\]'\)[\s\S]*?resizeObserver\.observe\(row\)/,
    '행의 실제 높이가 바뀌어도 관리 rail을 다시 정렬해야 합니다.');
  assert.match(schedule, /<div ref=\{adminRailRowsRef\} data-schedule-admin-rows className="relative h-full">/,
    '개별 absolute 관리행의 좌표 기준 wrapper가 필요합니다.');
  assert.match(schedule, /visibleItems\.map\(\(item\) =>[\s\S]*?data-schedule-admin-source=\{item\.sourceKey\}/);
  assert.match(schedule, /data-schedule-admin-source=\{item\.sourceKey\}[\s\S]*?className=\{`absolute left-0 right-0 top-0 flex items-center/,
    '외부 관리 rail 각 행은 table 행의 실측 좌표를 적용할 수 있는 absolute 행이어야 합니다.');
  assert.match(schedule, /isWorkstream \? <button[^>]*data-schedule-row-add[\s\S]*?openRowEditor\('create', item, event\)[\s\S]*?>\+ 추가<\/button>/);
  assert.match(schedule, /item\.itemType === 'task' \? <button[^>]*data-schedule-row-edit[\s\S]*?openRowEditor\('edit', item, event\)[\s\S]*?>수정<\/button>/);
  assert.match(schedule, /item\.itemType === 'task' \? <button[^>]*data-schedule-row-delete[\s\S]*?openRowEditor\('delete', item, event\)[\s\S]*?>삭제<\/button>/);
  const table = schedule.match(/<table[\s\S]*?<\/table>/)?.[0] || '';
  assert.ok(table, '일정 table markup을 찾을 수 없습니다.');
  assert.match(table, /visibleItems\.map\(\(item\) => \{[\s\S]*?<tr[\s\S]*?className=\{`group h-\[48px\]/,
    '중앙 table의 모든 visible item row는 관리 rail과 같은 48px 높이여야 합니다.');
  assert.doesNotMatch(table, /data-schedule-admin|data-schedule-row-(?:add|edit|delete)|openRowEditor/,
    'row 제목·타임라인 th/td 안에 관리 열이나 CRUD 버튼을 다시 배치하면 안 됩니다.');
  assert.doesNotMatch(schedule, /data-schedule-admin-column/,
    'table 안 sticky 관리 column 계약을 유지하면 안 됩니다.');
  assert.match(table, /className="flex min-w-0 flex-1 items-center gap-2"/,
    '제목·설명 묶음과 상태 badge는 행 안에서 수직 중앙 정렬을 공유해야 합니다.');
  assert.match(table, /className="flex min-w-0 items-center gap-2 [^"]*pl-7"/,
    '설명은 제목 정렬선을 유지해야 합니다.');
  assert.match(table, /inline-flex h-\[22px\][^"`]*text-\[11px\][^"`]*leading-none/,
    '모든 일정 상태 badge는 22px 높이와 11px 텍스트를 공유해야 합니다.');
  assert.doesNotMatch(table, /mt-\[2px\][^"`]*pl-7/,
    '제목과 설명 사이에 임의 상단 간격을 다시 넣으면 안 됩니다.');
  assert.match(schedule, /const openRowEditor = \(mode, item, event\) => \{\s*event\?\.stopPropagation\(\)/,
    '행 CRUD 버튼은 행 상세 열기로 event가 전파되면 안 됩니다.');
  assert.match(schedule, /if \(!rowEditor \|\| !canManageScheduleRows\) return/,
    '추가·수정·삭제 handler 모두 exact owner guard를 거쳐야 합니다.');

  assert.match(schedule, /canManageLinks=\{canManageScheduleLinks\}/,
    '활성 멤버는 row CRUD 권한과 무관하게 기존 Task를 연결·해제할 수 있어야 합니다.');
  assert.match(schedule, /readOnly=\{!canManageScheduleLinks\}/);
  assert.match(modal, /const linkedTasks = tasks\.filter\(\(task\) => explicitLinkKeys\.has\(task\.sourceKey\)\)/);
  assert.match(modal, /\{link && canManageLinks && <button[\s\S]*?onUnlink\(link\.id\)[\s\S]*?>연결 해제<\/button>\}/);
  assert.match(modal, /\{canManageLinks \? <button[\s\S]*?기존 통합업무 연결[\s\S]*?<\/button> : null\}/);
  assert.doesNotMatch(modal, /onEditSchedule|scheduleForm|마일스톤 및 일정 수정|activeTab === 'schedule'/,
    '활성 멤버의 Task 연결 modal에 exact-owner row 수정 form이 노출되면 안 됩니다.');
  assert.match(modal, /readOnly \? \([\s\S]*?게스트는 연결 업무와 일정을 읽을 수 있습니다/);
});

test('상세 일정 편집기는 trim·필수값·기간 검증과 2단계 삭제 확인을 제공한다', async () => {
  const editor = await read(paths.rowEditor);

  assert.match(editor, /data-schedule-row-editor-modal=\{mode\}/);
  assert.match(editor, /const validationError = !form\.displayName\.trim\(\)[\s\S]*?!form\.startDate \|\| !form\.endDate[\s\S]*?form\.startDate > form\.endDate/);
  for (const field of ['displayName', 'sourceText', 'leadLabel', 'categoryMain']) {
    assert.match(editor, new RegExp(`${field}: form\\.${field}\\.trim\\(\\)`));
  }
  assert.match(editor, /onSave\(isCreate \? \{[\s\S]*?parentSourceKey: parentItem\.sourceKey,[\s\S]*?stage: parentItem\.stage/,
    '신규 row는 선택한 lv2 부모와 단계 범위에 속해야 합니다.');
  assert.match(editor, /data-schedule-row-delete-confirm/);
  assert.match(editor, /이 상세 일정 행과 연결 정보만 삭제됩니다/);
  assert.match(editor, /연결된 통합업무는 통합업무보드에 그대로 남으며 삭제되지 않습니다/);
  assert.match(editor, /onClick=\{onDelete\}[\s\S]*?상세 일정 삭제/);
  assert.match(editor, /errorMessage \? <p[^>]*role="alert"/,
    '서버 실패는 modal을 닫지 않고 inline 오류로 보존해야 합니다.');
});

test('일정 row CRUD는 서버 성공 후에만 행·연결 state를 바꾸고 Task state는 보존한다', async () => {
  const schedule = await read(paths.schedule);
  const createFlow = schedule.match(/if \(rowEditor\.mode === 'create'\)[\s\S]*?\} else \{/)?.[0] || '';
  const updateFlow = schedule.match(/\} else \{\s*const updated = await updateScheduleRow[\s\S]*?\n\s*\}/)?.[0] || '';
  const deleteFlow = schedule.match(/const handleDeleteScheduleRow = async \(\) => \{[\s\S]*?\n\s*\};/)?.[0] || '';

  assert.match(createFlow, /const created = await createScheduleRow\(input, actor\)[\s\S]*?setScheduleItems/);
  assert.match(updateFlow, /const updated = await updateScheduleRow\(rowEditor\.item\.sourceKey, input, actor\)[\s\S]*?setScheduleItems/);
  assert.match(schedule, /catch \(error\) \{\s*setWorkspaceError\(error\.message \|\| '상세 일정을 저장하지 못했습니다\.'\);\s*\} finally \{\s*setBusy\(false\)/);

  assert.match(deleteFlow, /await deleteScheduleRow\(sourceKey, actor\)[\s\S]*?setScheduleItems[\s\S]*?setLinks[\s\S]*?setRowEditor\(null\)/);
  assert.doesNotMatch(deleteFlow, /setTasks|deleteTask|archiveTask/,
    '일정 row 삭제는 연결된 통합업무의 클라이언트 state도 변경하면 안 됩니다.');
  assert.match(deleteFlow, /catch \(error\)[\s\S]*?setWorkspaceError[\s\S]*?finally[\s\S]*?setBusy\(false\)/,
    '삭제 실패 시 행을 미리 제거하지 않고 오류를 보존해야 합니다.');
});
