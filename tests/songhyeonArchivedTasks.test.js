import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const paths = {
  board: 'src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx',
  drawer: 'src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx',
  repository: 'src/lib/songhyeonTaskRepository.js',
};

test('repository는 active 기본 목록과 인증 멤버 전용 archived 목록을 별도 query로 로드한다', async () => {
  const repository = await read(paths.repository);
  const activeLoader = repository.match(/export async function loadTasks\(\) \{[\s\S]*?\n\}/)?.[0] || '';
  const archivedLoader = repository.match(/export async function loadArchivedTasks\(\) \{[\s\S]*?\n\}/)?.[0] || '';

  assert.ok(activeLoader, 'active 업무 loader를 찾을 수 없습니다.');
  assert.ok(archivedLoader, 'archived 업무 전용 loader를 찾을 수 없습니다.');
  assert.match(activeLoader, /from\('songhyeon_tasks'\)\.select\('\*'\)\.is\('archived_at', null\)/,
    '기본 업무 목록에는 active row만 포함되어야 합니다.');
  assert.match(activeLoader, /from\('songhyeon_public_tasks'\)/,
    '게스트 기본 목록은 기존 public active view를 유지해야 합니다.');
  assert.doesNotMatch(activeLoader, /loadArchivedTasks|\.not\('archived_at'/,
    '초기 active 목록 query가 archived row를 함께 읽으면 안 됩니다.');

  assert.match(archivedLoader, /const authenticated = await hasAuthenticatedSonghyeonSession\(client\)/);
  assert.match(archivedLoader, /if \(!authenticated\)[\s\S]*?throw new SonghyeonTaskRepositoryError\('보관된 업무는 인증된 송현 BID 멤버만 확인할 수 있습니다\.'\)/,
    '게스트·무세션 호출은 archived 원장 query 전에 차단되어야 합니다.');
  assert.match(archivedLoader, /from\('songhyeon_tasks'\)[\s\S]*?\.not\('archived_at', 'is', null\)/);
  assert.match(archivedLoader, /\.order\('archived_at', \{ ascending: false \}\)/,
    '보관 목록은 최근 보관 순서로 보여야 합니다.');
  assert.match(archivedLoader, /return rows\.map\(taskPayload\)/,
    '상세 조회에 필요한 archive metadata를 기존 canonical mapper로 보존해야 합니다.');
  assert.doesNotMatch(archivedLoader, /songhyeon_public_tasks|(?:insert|update|delete|rpc)\(/,
    'archived loader는 guest view나 복원·수정 mutation을 사용하면 안 됩니다.');
});

test('보관된 업무는 별도 버튼 없이 인증 멤버의 기존 상태 필터에만 노출된다', async () => {
  const board = await read(paths.board);

  assert.match(board, /const ARCHIVED_TASKS = '보관된 업무'/);
  assert.match(board, /const canViewArchived = !isReadOnly && Boolean\(actor\.userId && member\)/,
    '게스트에게 archived 상태 옵션을 노출하면 안 됩니다.');
  assert.match(board, /statuses: canViewArchived \? \[\.\.\.TASK_STATUSES, ARCHIVED_TASKS\] : TASK_STATUSES/);
  assert.match(board, /<HeaderFilter label="상태" value=\{selectedStatus\} onChange=\{setSelectedStatus\} options=\{options\.statuses\}/,
    '보관 목록은 기존 상태 filter를 통해서만 진입해야 합니다.');
  assert.match(board, /if \(selectedStatus !== ALL && !options\.statuses\.includes\(selectedStatus\)\) setSelectedStatus\(ALL\)/,
    'guest 전환 시 선택되어 있던 archived 상태도 active 전체보기로 복귀해야 합니다.');

  const buttons = board.match(/<button\b[\s\S]*?<\/button>/g) || [];
  assert.equal(buttons.some((button) => /보관된 업무|ARCHIVED_TASKS/.test(button)), false,
    '보관 목록으로 가는 별도 button을 추가하면 안 됩니다.');
});

test('archived 목록은 상태 선택 시에만 로드하고 active state·선택과 섞지 않는다', async () => {
  const board = await read(paths.board);
  const initialLoad = board.match(/useEffect\(\(\) => \{\s*let active = true;[\s\S]*?Promise\.all\(\[loadTasks\(\), unreadSourceKeysRequest\]\)[\s\S]*?\n\s*\}, \[actor\.userId, openTask, user\?\.id\]\);/)?.[0] || '';
  assert.ok(initialLoad, 'active 업무 초기 load effect를 찾을 수 없습니다.');
  assert.doesNotMatch(initialLoad, /loadArchivedTasks/,
    'archived 업무는 화면 진입 때 active 업무와 함께 선조회하면 안 됩니다.');

  assert.match(board, /const \[tasks, setTasks\] = useState\(\[\]\)[\s\S]*?const \[archivedTasks, setArchivedTasks\] = useState\(\[\]\)/);
  assert.match(board, /const showingArchived = selectedStatus === ARCHIVED_TASKS/);
  assert.match(board, /const tasksForCurrentView = showingArchived \? archivedTasks : tasks/,
    'active와 archived 목록은 별도 state에서 현재 view만 선택해야 합니다.');

  const archivedEffect = board.match(/useEffect\(\(\) => \{\s*if \(!showingArchived\) return undefined;[\s\S]*?\n\s*\}, \[canViewArchived, showingArchived\]\);/)?.[0] || '';
  assert.ok(archivedEffect, 'archived 상태 선택용 on-demand effect를 찾을 수 없습니다.');
  assert.match(archivedEffect, /if \(!canViewArchived\) \{\s*setSelectedStatus\(ALL\);\s*return undefined/);
  assert.match(archivedEffect, /setArchivedLoading\(true\)[\s\S]*?loadArchivedTasks\(\)[\s\S]*?setArchivedTasks\(rows\)[\s\S]*?setArchivedLoading\(false\)/);
  assert.match(archivedEffect, /let active = true[\s\S]*?return \(\) => \{ active = false; \}/,
    '빠른 filter 전환 뒤 늦은 archived 응답이 active view를 덮으면 안 됩니다.');

  assert.match(board, /if \(!selectedTask \|\| Boolean\(selectedTask\.archivedAt\) === showingArchived\) return;\s*closeTask\(\)/,
    'active/archived view를 전환하면 반대 목록의 상세 선택을 닫아야 합니다.');
  assert.match(board, /tasksForCurrentView\.find\(\(task\) => task\.sourceKey === row\.dataset\.taskKey\)/,
    'drawer backdrop 행 전환도 현재 active 또는 archived view 안에서만 찾아야 합니다.');
  assert.match(board, /const rows = tasksForCurrentView\.filter/);
  assert.match(board, /if \(!showingArchived && selectedStatus !== ALL && task\.status !== selectedStatus\) return false/,
    'archived pseudo-status를 실제 task.status와 비교해 목록을 비우면 안 됩니다.');
});

test('보관된 행은 상세만 열고 수정·상태처리·재보관 UI를 만들지 않는다', async () => {
  const [board, drawer] = await Promise.all([read(paths.board), read(paths.drawer)]);
  const taskRow = board.match(/paginatedTasks\.map\(\(task, index\) => \{[\s\S]*?<\/tr>;/)?.[0] || '';
  assert.ok(taskRow, '통합업무 row renderer를 찾을 수 없습니다.');

  assert.match(taskRow, /const archived = Boolean\(task\.archivedAt\)/);
  assert.match(taskRow, /archived \|\| isReadOnly \|\| task\.status === '완료' \? <span[\s\S]*?: <button[\s\S]*?setWorkflowTask\(task\)/,
    'archived row의 상태는 badge로만 표시하고 빠른 상태처리 button을 숨겨야 합니다.');
  assert.match(taskRow, /if \(archived \|\| isReadOnly\) openTask\(task\); else setEditingTask\(task\)/,
    'archived row 관리 action은 editor가 아니라 상세 drawer를 열어야 합니다.');
  assert.match(taskRow, /\{archived \|\| isReadOnly \? '상세' : '수정'\}/);
  assert.match(taskRow, /\{!archived && canCreateAndArchive && <><span[\s\S]*?requestArchive\(task\)[\s\S]*?>보관<\/button><\/>\}/,
    'exact owner라도 archived row를 다시 보관할 수 없어야 합니다.');

  assert.match(board, /onClick=\{\(\) => openTask\(task\)\}/,
    'archived row도 상세 조회는 가능해야 합니다.');
  assert.match(board, /<SonghyeonTaskDetailDrawer[\s\S]*?forceReadOnly=\{Boolean\(selectedTask\.archivedAt\)\}[\s\S]*?canArchive=\{canCreateAndArchive && !selectedTask\.archivedAt\}/,
    'archived 상세 drawer는 active member에게도 강제 read-only여야 합니다.');
  assert.match(board, /\{editingTask && !isReadOnly && !editingTask\.archivedAt && <SonghyeonTaskEditorModal/);
  assert.match(board, /\{workflowTask && !isReadOnly && !workflowTask\.archivedAt && <SonghyeonTaskWorkflowModal/);

  assert.match(drawer, /forceReadOnly = false[\s\S]*?const detailReadOnly = isReadOnly \|\| forceReadOnly/);
  assert.match(drawer, /const workflowActions = detailReadOnly \? \[\] : taskWorkflowActions\(task\.status\)/);
  assert.match(drawer, /canArchive && !detailReadOnly[\s\S]*?\{forceReadOnly \? '보관된 업무 · 읽기 전용' : detailReadOnly \? '읽기 전용' : ''\}/,
    'forced read-only drawer footer는 보관 action 없이 읽기 전용임을 표시해야 합니다.');
  assert.match(drawer, /\{!detailReadOnly && <>\{task\.status !== '완료'[\s\S]*?업무 수정하기/,
    'forced read-only drawer footer에 상태처리·수정 action이 없어야 합니다.');
  assert.match(drawer, /\{editorOpen && !detailReadOnly && <SonghyeonTaskEditorModal/);
  assert.match(drawer, /\{workflowTargetStatus && !detailReadOnly && <SonghyeonTaskWorkflowModal/);
  assert.match(drawer, /\{task\.archivedAt && <section data-task-archive-info aria-label="보관 정보"[\s\S]*?task\.archiveReason \|\| '보관 사유가 기록되지 않았습니다\.'[\s\S]*?<\/section>\}/,
    'archived 상세에는 보관 시각과 사유를 읽을 수 있는 정보 section이 있어야 합니다.');
  assert.match(drawer, /Promise\.all\(\[loadComments\(taskSourceKey\), loadActivity\(taskSourceKey\)\]\)/,
    'read-only archived 상세도 댓글과 변경 이력은 조회할 수 있어야 합니다.');
});
