import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import {
  SONGHYEON_TASK_BOARD_BUILD_SOURCE_KEY,
  createInitialSonghyeonTasks,
} from '../src/data/songhyeonTaskBoard.js';
import { songhyeonDetailedScheduleItems } from '../src/data/songhyeonDetailedSchedule.js';
import { songhyeonTaskCategories } from '../src/data/songhyeonTaskCategories.js';
import {
  normalizeSonghyeonTaskImportance,
  SONGHYEON_TASK_IMPORTANCE_LEVELS,
} from '../src/data/songhyeonTaskImportance.js';
import { activeSonghyeonTaskLeads, normalizeSonghyeonTaskLead } from '../src/data/songhyeonTaskLeads.js';
import { normalizeSonghyeonTaskStatus, SONGHYEON_TASK_STATUSES } from '../src/data/songhyeonTaskStatuses.js';
import {
  normalizeSonghyeonAssignee,
  storedSonghyeonTaskValue,
  visibleSonghyeonTaskChanges,
} from '../src/lib/songhyeonTaskFields.js';

const scheduleTasks = songhyeonDetailedScheduleItems.filter((item) => item.itemType === 'task');
const boardTasks = createInitialSonghyeonTasks();

test('기존 마일스톤 Task 75개와 구축 Task 1개를 sourceKey 손실 없이 통합업무 원장으로 변환한다', () => {
  assert.equal(scheduleTasks.length, 76);
  assert.equal(boardTasks.filter((task) => task.sourceType === 'milestone').length, 75);
  assert.deepEqual(
    boardTasks.map((task) => task.sourceKey),
    scheduleTasks.map((task) => task.sourceKey),
  );
  assert.ok(boardTasks.every((task) => task.taskName && task.sourceText && task.stage));
});

test('통합업무보드는 지정된 G0~G6 상세 단계명을 사용하고 기존 저장값도 새 이름으로 복원한다', async () => {
  const { normalizeSonghyeonGateStage, SONGHYEON_GATE_STAGES } = await import('../src/data/songhyeonGateStages.js');
  assert.deepEqual(SONGHYEON_GATE_STAGES, [
    'G0 기준선',
    'G1 기회·인터뷰',
    'G2 서비스 가설',
    'G3 실행조건',
    'G4 MVP·협력',
    'G5 실행준비',
    'G6 실증·학습',
  ]);
  assert.equal(normalizeSonghyeonGateStage('', 'G0-WS01-T01'), 'G0 기준선');
  assert.equal(normalizeSonghyeonGateStage('G1 현장기회 정의', 'G1-WS01-T01'), 'G1 기회·인터뷰');
  assert.equal(normalizeSonghyeonGateStage(null, 'G6-WS03-T02'), 'G6 실증·학습');
});

test('모든 초기 업무는 회의상정·Blocker·결정필요를 비활성 기본값으로 갖는다', () => {
  assert.ok(boardTasks.every((task) => task.meetingAgenda === false));
  assert.ok(boardTasks.every((task) => task.isBlocker === false));
  assert.ok(boardTasks.every((task) => task.needsDecision === false));
  assert.ok(boardTasks.every((task) => task.status && task.importanceLevel));
});

test('초기계획 76개 업무는 중복·장문 분류를 제거한 15개 직관 분류에 빠짐없이 재배치된다', () => {
  assert.equal(songhyeonTaskCategories.length, 15);
  assert.equal(new Set(boardTasks.map((task) => task.categoryMain)).size, 15);
  assert.ok(boardTasks.every((task) => songhyeonTaskCategories.includes(task.categoryMain)));
  for (const removed of ['공통 기준선 결합', '우선 실증 가설 결정', '자산 실행성 검증']) {
    assert.ok(!boardTasks.some((task) => task.categoryMain === removed), `삭제 분류 잔존: ${removed}`);
  }
});

test('업무분류 필터는 Supabase 과거 분류를 합치지 않고 정식 15개 분류만 제공한다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');

  assert.match(board, /categories: songhyeonTaskCategories/);
  assert.doesNotMatch(board, /categories: mergeOptions\(songhyeonTaskCategories/);
  assert.match(board, /!songhyeonTaskCategories\.includes\(selectedCategoryMain\)/);
  assert.match(repository, /categoryMain: payload\.sourceType === 'manual' \? payload\.categoryMain : categoryForSonghyeonTask/);
});

test('통합업무보드는 분류를 임의로 고정하지 않고 저장된 displayOrder 순서를 그대로 보존한다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  assert.doesNotMatch(board, /PINNED_TASK_CATEGORY|categoryMain === ['"]자료전수조사['"]/);
  assert.match(board, /const sortTasksByDisplayOrder = \(rows\) => rows\.toSorted/);

  const start = board.indexOf('const sortedAndFilteredTasks = useMemo(() => {');
  const end = board.indexOf('  const totalPages =', start);
  assert.ok(start >= 0 && end > start, '필터·검색·정렬 useMemo 블록을 찾을 수 없습니다.');
  const orderingBlock = board.slice(start, end);
  const filterIndex = orderingBlock.indexOf('const rows = tasksForCurrentView.filter((task) => {');
  const searchIndex = orderingBlock.indexOf("if (!query) return true;");
  assert.ok(filterIndex >= 0, '현재 active/archived view를 filter한 새 결과 배열을 만들어야 합니다.');
  assert.ok(searchIndex > filterIndex, '검색 조건은 rows 생성 과정에 포함돼야 합니다.');
  assert.match(orderingBlock, /return rows;/);
  assert.doesNotMatch(orderingBlock, /\b(?:tasks|rows)\.sort\s*\(/, '원본 tasks나 필터 결과를 제자리 정렬하면 안 됩니다.');
});

test('중요도는 송현 전용 핵심·중간·낮음만 사용하고 과거값을 일괄 정규화한다', async () => {
  assert.deepEqual(SONGHYEON_TASK_IMPORTANCE_LEVELS, ['핵심', '중간', '낮음']);
  assert.equal(normalizeSonghyeonTaskImportance('핵심'), '핵심');
  assert.equal(normalizeSonghyeonTaskImportance('주요'), '중간');
  assert.equal(normalizeSonghyeonTaskImportance('중간'), '중간');
  assert.equal(normalizeSonghyeonTaskImportance('일반'), '낮음');
  assert.equal(normalizeSonghyeonTaskImportance('낮음'), '낮음');

  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');
  const migration = await readFile('supabase/migrations/202608130008_songhyeon_task_importance_levels.sql', 'utf8');
  assert.match(board, /importance: TASK_IMPORTANCE/);
  assert.doesNotMatch(board, /importance: mergeOptions/);
  assert.match(repository, /normalizeSonghyeonTaskImportance/);
  assert.match(migration, /update public\.songhyeon_tasks/);
  assert.doesNotMatch(migration, /(?:insert into|update|delete from)\s+(?:public\.)?iota_/i);
});

test('실행주관은 폐기 조직을 흡수하고 실제 업무가 있는 이름만 필터에 표시한다', async () => {
  assert.equal(normalizeSonghyeonTaskLead('기획추진실'), '기획추진센터');
  assert.equal(normalizeSonghyeonTaskLead('자산·현장 지원조직'), '자산·운영 담당조직');
  assert.deepEqual(activeSonghyeonTaskLeads([
    { leadDept: '기획추진실' },
    { leadDept: '기획추진센터' },
    { leadDept: '자산·현장 지원조직' },
    { leadDept: '' },
  ]), ['기획추진센터', '자산·운영 담당조직']);

  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');
  const migration = await readFile('supabase/migrations/202608130009_songhyeon_task_lead_cleanup.sql', 'utf8');
  assert.match(board, /leads: activeSonghyeonTaskLeads\(tasksForCurrentView\)/);
  assert.doesNotMatch(board, /TASK_LEADS|mergeOptions\(TASK_LEADS/);
  assert.match(repository, /leadDept: normalizeSonghyeonTaskLead\(payload\.leadDept\)/);
  assert.match(migration, /update public\.songhyeon_tasks/);
  assert.doesNotMatch(migration, /(?:insert into|update|delete from)\s+(?:public\.)?iota_/i);
});

test('업무 상태에서 보류를 삭제하고 legacy 보류·on_hold는 중단으로 정규화한다', async () => {
  assert.deepEqual(SONGHYEON_TASK_STATUSES, ['미착수', '진행중', '완료', '중단']);
  assert.equal(normalizeSonghyeonTaskStatus('지연'), '진행중');
  assert.equal(normalizeSonghyeonTaskStatus('보류'), '중단');
  assert.equal(normalizeSonghyeonTaskStatus('on_hold'), '중단');

  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const editor = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskEditorModal.jsx', 'utf8');
  const scheduleMigration = await readFile('supabase/migrations/202608180004_songhyeon_schedule_rows.sql', 'utf8');
  const migration = await readFile('supabase/migrations/202608130010_songhyeon_task_status_cleanup.sql', 'utf8');
  assert.match(board, /statuses: canViewArchived \? \[\.\.\.TASK_STATUSES, ARCHIVED_TASKS\] : TASK_STATUSES/);
  assert.doesNotMatch(board, /statuses: mergeOptions/);
  assert.doesNotMatch(board, /['"]보류['"]/, '보류가 필터나 상태 배지에 남으면 안 됩니다.');
  assert.match(editor, /status: '미착수'/);
  assert.doesNotMatch(editor, /<select\s+value=\{form\.status\}/, '업무 수정이 상태를 일반 update payload로 우회 저장하면 안 됩니다.');
  assert.match(editor, /SonghyeonTaskWorkflowModal/, '업무 수정의 상태 변경도 정식 workflow modal을 사용해야 합니다.');
  assert.doesNotMatch(editor, /<option[^>]*>보류<\/option>/, '업무 수정 상태 선택지에 보류가 다시 생기면 안 됩니다.');
  assert.match(scheduleMigration, /when 'on_hold' then 'cancelled'/, 'legacy 일정 상태 on_hold도 중단으로 정규화해야 합니다.');
  assert.match(scheduleMigration, /when '보류' then 'cancelled'/, 'legacy 일정 상태 보류도 중단으로 정규화해야 합니다.');
  assert.match(migration, /update public\.songhyeon_tasks/);
  assert.doesNotMatch(migration, /(?:insert into|update|delete from)\s+(?:public\.)?iota_/i);
});

test('상태·중요도·실행주관 네임택은 정식 값마다 서로 다른 정적 색상 클래스를 사용한다', async () => {
  const boardPath = 'src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx';
  const drawerPath = 'src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx';
  const [board, drawer] = await Promise.all([readFile(boardPath, 'utf8'), readFile(drawerPath, 'utf8')]);
  const officialLeads = activeSonghyeonTaskLeads(boardTasks);
  const fallbackClass = 'border border-[#636366]/[0.22] bg-[#636366]/[0.055] text-[#97979c]';
  const expectedClasses = {
    statusBadgeClass: {
      '미착수': 'border border-[#636366]/[0.22] bg-[#636366]/[0.055] text-[#9c9ca1]',
      '진행중': 'border border-[#2997ff]/50 bg-[#147dcc]/20 text-[#8fc7ff]',
      '완료': 'border border-[#4da566]/[0.22] bg-[#4da566]/[0.055] text-[#73bc84]',
      '중단': 'border border-[#bd5f5a]/[0.22] bg-[#bd5f5a]/[0.055] text-[#d47670]',
    },
    importanceBadgeClass: {
      '핵심': 'border border-[#bd5f5a]/[0.22] bg-[#bd5f5a]/[0.055] text-[#d47670]',
      '중간': 'border border-[#bd8b42]/[0.22] bg-[#bd8b42]/[0.055] text-[#cba267]',
      '낮음': 'border border-[#636366]/[0.22] bg-[#636366]/[0.055] text-[#939398]',
    },
    leadBadgeClass: {
      '공간솔루션센터': 'border border-[#4f8fca]/[0.22] bg-[#4f8fca]/[0.055] text-[#73a8d6]',
      '기획추진센터': 'border border-[#9270a6]/[0.22] bg-[#9270a6]/[0.055] text-[#ae87c3]',
      '이지스 AM': 'border border-[#5793a6]/[0.22] bg-[#5793a6]/[0.055] text-[#78b3c5]',
      '자산·운영 담당조직': 'border border-[#568f62]/[0.22] bg-[#568f62]/[0.055] text-[#78b284]',
      'TF 공동': 'border border-[#a97d47]/[0.22] bg-[#a97d47]/[0.055] text-[#c59b60]',
      'TF 리드': 'border border-[#a95e6e]/[0.22] bg-[#a95e6e]/[0.055] text-[#c57484]',
    },
  };

  assert.deepEqual(officialLeads, [
    '공간솔루션센터',
    '기획추진센터',
    'TF 리드',
    '자산·운영 담당조직',
    '이지스 AM',
    'TF 공동',
  ]);

  const importanceImport = (source) => source.match(/import\s*\{[^}]*\bimportanceBadgeClass\b[^}]*\}\s*from\s*['"]([^'"]+)['"]/s)?.[1] || '';
  const boardImportanceImport = importanceImport(board);
  const drawerImportanceImport = importanceImport(drawer);
  assert.ok(boardImportanceImport, '통합업무보드는 importanceBadgeClass를 공통 helper에서 가져와야 합니다.');
  assert.equal(drawerImportanceImport, boardImportanceImport, '상세 중요도 네임택은 통합업무보드와 정확히 같은 helper를 사용해야 합니다.');
  const importanceModulePath = resolve(dirname(boardPath), boardImportanceImport.endsWith('.js') ? boardImportanceImport : `${boardImportanceImport}.js`);
  const importanceSource = await readFile(importanceModulePath, 'utf8');

  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const staticClassFor = (source, value) => {
    const escaped = escapeRegExp(value);
    const match = source.match(new RegExp(`(?:["']${escaped}["']|${escaped})\\s*:\\s*(["'\u0060])([^"'\u0060\\n]+)\\1`));
    assert.ok(match, `${value}의 정적 네임택 클래스 매핑이 필요합니다.`);
    assert.match(match[2], /(?:^|\s)border-/u, `${value}의 테두리 색상 클래스가 필요합니다.`);
    assert.match(match[2], /(?:^|\s)bg-/u, `${value}의 배경 색상 클래스가 필요합니다.`);
    assert.match(match[2], /(?:^|\s)text-/u, `${value}의 글자 색상 클래스가 필요합니다.`);
    assert.doesNotMatch(match[2], /\$\{/u, `${value}는 Tailwind가 감지할 수 있는 정적 클래스여야 합니다.`);
    return match[2];
  };

  const groups = [
    { helper: 'statusBadgeClass', field: 'status', values: SONGHYEON_TASK_STATUSES, source: board },
    { helper: 'importanceBadgeClass', field: 'importanceLevel', values: SONGHYEON_TASK_IMPORTANCE_LEVELS, source: importanceSource },
    { helper: 'leadBadgeClass', field: 'leadDept', values: officialLeads, source: board },
  ];

  for (const { helper, field, values, source } of groups) {
    const declaration = source.match(new RegExp(`(?:export\\s+)?(?:function\\s+${helper}\\s*\\(|const\\s+${helper}\\s*=)`));
    assert.ok(declaration, `${helper} 색상 helper가 필요합니다.`);
    assert.match(board, new RegExp(`${helper}\\(task\\.${field}\\)`), `${field} 네임택 렌더는 ${helper}를 사용해야 합니다.`);
    if (helper === 'importanceBadgeClass') {
      assert.match(drawer, /importanceBadgeClass\(task\.importanceLevel\)/, '상세 중요도 네임택도 공통 importanceBadgeClass를 사용해야 합니다.');
      assert.doesNotMatch(drawer, /border-white\/10 bg-white\/5[^"\n]*>중요도:/, '상세 중요도를 회색 고정 네임택으로 되돌리면 안 됩니다.');
    }

    const helperSource = source.slice(declaration.index, declaration.index + 360);
    const fallback = helperSource.match(/(?:\?\?|\|\|)\s*(["'\u0060])([^"'\u0060\n]+)\1/u);
    assert.ok(fallback, `${helper}는 알 수 없는 저장값을 위한 정적 fallback 클래스를 제공해야 합니다.`);
    assert.match(fallback[2], /(?:^|\s)border-/u, `${helper} fallback의 테두리 색상 클래스가 필요합니다.`);
    assert.match(fallback[2], /(?:^|\s)bg-/u, `${helper} fallback의 배경 색상 클래스가 필요합니다.`);
    assert.match(fallback[2], /(?:^|\s)text-/u, `${helper} fallback의 글자 색상 클래스가 필요합니다.`);
    assert.doesNotMatch(fallback[2], /\$\{/u, `${helper} fallback도 정적 Tailwind 클래스여야 합니다.`);
    assert.equal(fallback[2], fallbackClass, `${helper} fallback은 톤다운된 중립 네임택이어야 합니다.`);

    const classes = values.map((value) => staticClassFor(source, value));
    for (const [index, value] of values.entries()) {
      assert.equal(classes[index], expectedClasses[helper][value], `${value} 네임택의 톤다운 색상 계약이 달라졌습니다.`);
    }
    assert.equal(new Set(classes).size, values.length, `${field} 정식 값은 각각 다른 색상 조합이어야 합니다.`);
  }

  assert.doesNotMatch(board, /(?:border|bg|text)-\$\{/u, '동적으로 조립한 Tailwind 색상 클래스는 사용할 수 없습니다.');
});

test('관리열 수정·보관은 기본 원색 대신 muted 정적 색상과 hover 색상을 사용한다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const managementCell = board.match(/<td data-task-management-cell[\s\S]*?<\/td>/)?.[0] || '';
  assert.ok(managementCell, '관리열 셀을 찾을 수 없습니다.');

  const editButton = managementCell.match(/if \(archived \|\| isReadOnly\) openTask\(task\); else setEditingTask\(task\); \}\} className="([^"]+)">\{archived \|\| isReadOnly \? '상세' : '수정'\}<\/button>/)?.[1] || '';
  const archiveButton = managementCell.match(/requestArchive\(task\); \}\} className="([^"]+)">보관<\/button>/)?.[1] || '';
  assert.ok(editButton, '관리열 수정 버튼의 정적 className이 필요합니다.');
  assert.ok(archiveButton, '관리열 보관 버튼의 정적 className이 필요합니다.');
  assert.equal(editButton, 'cursor-pointer text-[11px] font-bold text-[#6f9fc7] hover:text-[#82add0]');
  assert.equal(archiveButton, 'cursor-pointer text-[11px] font-bold text-[#a78661] hover:text-[#b89a78]');
  assert.match(managementCell, /<span className="mx-\[2px\] select-none text-\[#555\]">\|<\/span>/, '수정·보관 구분선 좌우에 2px 여백이 필요합니다.');
  assert.doesNotMatch(managementCell, /(?:text|hover:text)-(?:blue|red)-(?:300|400)/u, '관리열에 기본 blue/red 원색을 사용하면 안 됩니다.');
  assert.doesNotMatch(managementCell, /\$\{/u, '관리열 액션 색상은 Tailwind가 감지 가능한 정적 클래스여야 합니다.');
});

test('변경 이력은 전기영에게만 항목별 삭제 UI와 RLS 권한을 제공한다', async () => {
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');
  const migration = await readFile('supabase/migrations/202608130011_songhyeon_activity_delete_jeon_giyoung.sql', 'utf8');

  assert.match(repository, /actorId: row\.actor_id/);
  assert.match(repository, /export async function deleteActivity/);
  assert.match(repository, /actor\.name === '전기영'/);
  assert.match(repository, /actor\.email\?\.toLowerCase\(\) === 'jk\.jeon@igisam\.com'/);
  assert.doesNotMatch(repository, /delete\(\)\.eq\('id', activityId\)[^\n]*\.eq\('actor_id'/);
  assert.match(drawer, /canDeleteActivity = !detailReadOnly && member\?\.staff_name === '전기영' && user\?\.email\?\.toLowerCase\(\) === 'jk\.jeon@igisam\.com'/);
  assert.match(drawer, /aria-label="변경 이력 개별 삭제"/);
  assert.match(drawer, /removeActivity\(item\.id\)/);
  assert.match(drawer, /\{visibleActivity\.length > 0 && \(/);
  assert.doesNotMatch(drawer, /변경 이력이 없습니다\./);
  assert.match(migration, /m\.staff_name = '전기영'/);
  assert.match(migration, /m\.email = 'jk\.jeon@igisam\.com'/);
  assert.match(migration, /can_jeon_giyoung_delete_songhyeon_activity/);
  assert.match(migration, /grant delete on public\.songhyeon_task_activity to authenticated/);
  assert.doesNotMatch(migration, /actor_id = auth\.uid\(\)|is_songhyeon_admin/);
  assert.doesNotMatch(migration, /(?:insert into|update|delete from)\s+(?:public\.)?iota_/i);
});

test('통합업무보드 구축 자체가 마일스톤 연결 업무로 등록된다', () => {
  const buildTask = boardTasks.find((task) => task.sourceKey === SONGHYEON_TASK_BOARD_BUILD_SOURCE_KEY);
  assert.ok(buildTask);
  assert.equal(buildTask.sourceType, 'platform-build');
  assert.equal(buildTask.parentSourceKey, 'G4-WS02');
  assert.match(buildTask.taskName, /통합업무보드/);
});

test('독립 통합업무보드는 IOTA 원본의 행 클릭·550px 상세 drawer와 송현 댓글 연결을 제공한다', async () => {
  const dashboard = await readFile('src/pages/Dashboard.jsx', 'utf8');
  const taskBoardPage = await readFile('src/pages/TaskBoard.jsx', 'utf8');
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');

  assert.doesNotMatch(dashboard, /id="task-board"|<SonghyeonTaskBoard/);
  assert.match(taskBoardPage, /<SonghyeonTaskBoard/);
  assert.match(board, /data-task-board-row/);
  assert.match(board, /onClick=\{\(\) => openTask\(task\)\}/);
  assert.match(drawer, /w-\[550px\]|max-w-\[550px\]/);
  assert.match(drawer, /data-task-detail-drawer/);
  assert.match(drawer, /업무 수정하기/);
  assert.match(drawer, /addComment/);
  assert.match(drawer, /commentText/);
});

test('상세 drawer가 열린 동안 다른 업무 행은 상세를 즉시 교체하고 일반 backdrop은 기존처럼 닫는다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');

  const openTaskStart = board.indexOf('const openTask =');
  const openTaskEnd = board.indexOf('\n  const closeTask =', openTaskStart);
  assert.ok(openTaskStart >= 0 && openTaskEnd > openTaskStart, '업무 상세 열기 handler를 찾을 수 없습니다.');
  const openTaskBlock = board.slice(openTaskStart, openTaskEnd);
  assert.match(openTaskBlock, /setSelectedTask\(task\)/, '다른 행을 클릭하면 selectedTask를 해당 업무로 즉시 교체해야 합니다.');

  const backdropHandlerStart = board.indexOf('const handleTaskDetailBackdropClick =');
  const backdropHandlerEnd = board.indexOf('\n  }, [closeTask, openTask, tasksForCurrentView]);', backdropHandlerStart);
  assert.ok(backdropHandlerStart >= 0 && backdropHandlerEnd > backdropHandlerStart, '상세 backdrop 클릭 handler를 찾을 수 없습니다.');
  const backdropHandler = board.slice(backdropHandlerStart, backdropHandlerEnd);

  assert.match(backdropHandler, /document\.elementsFromPoint\(event\.clientX,\s*event\.clientY\)/, 'backdrop 뒤의 실제 클릭 위치를 조회해야 합니다.');
  assert.match(backdropHandler, /\.closest\??\.\(\s*['"]\[data-task-board-row\]['"]\s*\)/, '클릭 좌표 아래의 통합업무 행을 찾아야 합니다.');
  assert.match(backdropHandler, /\.dataset\.taskKey/, '행의 data-task-key로 교체할 업무를 식별해야 합니다.');
  assert.match(backdropHandler, /tasksForCurrentView\.find\(\(task\) => task\.sourceKey === (?:taskKey|row\.dataset\.taskKey)\)/, 'data-task-key와 일치하는 업무를 현재 active/archived view에서 찾아야 합니다.');
  assert.match(backdropHandler, /if \(nextTask\) \{[\s\S]*?openTask\(nextTask\);[\s\S]*?return;[\s\S]*?\}[\s\S]*?closeTask\(\)/, '업무 행이면 drawer를 닫지 않고 해당 상세로 교체하며, 일반 backdrop일 때만 닫아야 합니다.');

  assert.match(board, /data-task-board-row[^\n]*data-task-key=\{task\.sourceKey\}[^\n]*onClick=\{\(\) => openTask\(task\)\}/, '기본 행 클릭도 openTask 경로를 유지해야 합니다.');
  const drawerMount = board.match(/\{selectedTask && <SonghyeonTaskDetailDrawer\b[^>]*\/>\}/)?.[0] || '';
  assert.ok(drawerMount, '선택된 업무 상세 drawer 렌더를 찾을 수 없습니다.');
  assert.match(drawerMount, /\btask=\{selectedTask\}/, '교체된 selectedTask를 drawer에 바로 렌더해야 합니다.');
  assert.match(drawerMount, /\bkey=\{selectedTask\.sourceKey\}/, '교체된 sourceKey로 drawer를 재생성해 이전 업무의 비동기 상태가 새 상세를 덮지 않게 해야 합니다.');
  assert.match(drawerMount, /\bonBackdropClick=\{handleTaskDetailBackdropClick\}/, '보드의 backdrop 분기를 drawer에 연결해야 합니다.');
  assert.match(drawer, /onBackdropClick/);
  assert.match(drawer, /aria-label="업무 상세 닫기"[^>]*onClick=\{onBackdropClick \|\| onClose\}/, '일반 backdrop 클릭은 기존 onClose를 fallback으로 유지해야 합니다.');
});

test('상세 댓글은 IOTA WorkspaceActivityLog 카드·작성창 UI를 이식하고 데이터는 송현 원장만 사용한다', async () => {
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');

  for (const token of [
    'rounded-[16px]', 'bg-[#1c1c1e]', 'border-[#2c2c2e]',
    'w-[32px] h-[32px]', 'text-[#82afb9] bg-[#82afb9]/10',
    'pl-[42px]', 'pr-[10px]',
    'rounded-[16px] bg-[#5d5d5d] p-[1px]',
    'bg-[#262626] rounded-[15px]',
    'leading-relaxed text-[13px] text-[#E5E5E5]',
  ]) assert.ok(drawer.includes(token), `IOTA 댓글 UI 토큰 누락: ${token}`);

  assert.match(drawer, /M20\.84 4\.61a5\.5 5\.5/);
  assert.match(drawer, /M22 11\.08V12a10 10 0 1 1-5\.93-9\.14/);
  assert.match(drawer, /M21 15a2 2 0 0 1-2 2H7l-4 4V5/);
  assert.doesNotMatch(drawer, />업무 협업 게시판<\/h3>/);
  assert.doesNotMatch(drawer, /mt-3 h-20 w-full resize-y rounded-\[8px\]/);
  assert.match(drawer, /timeline-scrollbar flex-1 space-y-\[10px\]/);
  assert.doesNotMatch(drawer, /rounded-\[16px\] bg-\[#5d5d5d\] p-\[1px\] mb-\[11px\]/);

  for (const token of ['songhyeon_task_comments', "from('songhyeon_members')", 'group_name', 'photo_path', 'authorGroup', 'authorPhoto']) {
    assert.ok(repository.includes(token), `송현 댓글 작성자 연결 누락: ${token}`);
  }
  assert.doesNotMatch(`${drawer}\n${repository}`, /iota_seoul_logs|iota_pmo_tasks/i);
});

test('댓글·대댓글의 좋아요·확인은 사용자별로 토글되고 반응자 프로필을 우측에 표시한다', async () => {
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');
  const avatarStack = await readFile('src/components/iota-songhyeon/task-board/SonghyeonReactionAvatarStack.jsx', 'utf8');
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');
  const migration = await readFile('supabase/migrations/202608130012_songhyeon_task_discussion.sql', 'utf8');

  for (const table of [
    'songhyeon_task_comment_replies',
    'songhyeon_task_comment_reactions',
    'songhyeon_task_reply_reactions',
  ]) {
    assert.match(migration, new RegExp(`create table if not exists public\\.${table}`));
    assert.match(migration, new RegExp(`alter table public\\.${table} enable row level security`));
  }
  assert.match(migration, /grant select, insert, delete on (?:table )?public\.songhyeon_task_comment_replies to authenticated/i);
  for (const table of ['songhyeon_task_comment_reactions', 'songhyeon_task_reply_reactions']) {
    assert.match(migration, new RegExp(`grant select on (?:table )?public\\.${table} to authenticated`, 'i'));
    assert.match(migration, new RegExp(`revoke all on table public\\.${table} from public, anon, authenticated`, 'i'));
  }
  assert.match(migration, /foreign key \(comment_id,\s*task_source_key\)[\s\S]*?references public\.songhyeon_task_comments\(id,\s*task_source_key\)[\s\S]*?on update cascade on delete cascade/i);
  assert.match(migration, /foreign key \(reply_id,\s*task_source_key\)[\s\S]*?references public\.songhyeon_task_comment_replies\(id,\s*task_source_key\)[\s\S]*?on update cascade on delete cascade/i);
  assert.match(migration, /reaction_type text not null[^;]*'like'[^;]*'check'/i);
  assert.match(migration, /(?:primary key|unique)\s*\(comment_id,\s*reaction_type,\s*reactor_id\)/i);
  assert.match(migration, /(?:primary key|unique)\s*\(reply_id,\s*reaction_type,\s*reactor_id\)/i);
  assert.match(migration, /author_id\s*=\s*auth\.uid\(\)/i);
  assert.match(migration, /current_reactor_id uuid\s*:=\s*auth\.uid\(\)/i);
  assert.match(migration, /reaction\.reactor_id\s*=\s*current_reactor_id/i);
  assert.match(migration, /is_songhyeon_member\(\)/i);

  const commentToggle = migration.match(/create or replace function public\.(toggle_songhyeon_[a-z_]*comment_reaction)\b[\s\S]*?\$\$;/i);
  const replyToggle = migration.match(/create or replace function public\.(toggle_songhyeon_[a-z_]*reply_reaction)\b[\s\S]*?\$\$;/i);
  assert.ok(commentToggle, '댓글 반응은 DB 함수에서 원자적으로 토글되어야 합니다.');
  assert.ok(replyToggle, '대댓글 반응은 DB 함수에서 원자적으로 토글되어야 합니다.');
  for (const sqlFunction of [commentToggle[0], replyToggle[0]]) {
    assert.match(sqlFunction, /language plpgsql/i);
    assert.match(sqlFunction, /delete from public\.songhyeon_task_(?:comment|reply)_reactions/i);
    assert.match(sqlFunction, /insert into public\.songhyeon_task_(?:comment|reply)_reactions/i);
    assert.match(sqlFunction, /auth\.uid\(\)/i);
  }
  assert.ok(repository.includes(`rpc('${commentToggle[1]}'`), '댓글 반응 repository가 원자적 토글 RPC를 사용해야 합니다.');
  assert.ok(repository.includes(`rpc('${replyToggle[1]}'`), '대댓글 반응 repository가 원자적 토글 RPC를 사용해야 합니다.');
  assert.match(migration, new RegExp(`grant execute on function public\\.${commentToggle[1]}\\(text, text\\) to authenticated`, 'i'));
  assert.match(migration, new RegExp(`grant execute on function public\\.${replyToggle[1]}\\(text, text\\) to authenticated`, 'i'));
  assert.match(migration, /supabase_realtime/i);
  for (const table of ['songhyeon_task_comment_replies', 'songhyeon_task_comment_reactions', 'songhyeon_task_reply_reactions']) {
    const realtimeSection = migration.slice(migration.search(/supabase_realtime/i));
    assert.ok(realtimeSection.includes(table), `실시간 publication 누락: ${table}`);
  }
  assert.doesNotMatch(migration, /\biota_(?:seoul|pmo|workspace|logs?|task)[a-z_]*/i);

  for (const exportedFunction of [
    'addReply',
    'deleteReply',
    'toggleCommentReaction',
    'toggleReplyReaction',
    'subscribeToTaskDiscussion',
  ]) assert.match(repository, new RegExp(`export (?:async )?function ${exportedFunction}\\b`));
  for (const table of [
    'songhyeon_task_comment_replies',
    'songhyeon_task_comment_reactions',
    'songhyeon_task_reply_reactions',
  ]) assert.ok(repository.includes(`'${table}'`), `repository 연결 누락: ${table}`);
  for (const profileField of ['reactor_id', 'staff_name', 'group_name', 'photo_path']) {
    assert.ok(repository.includes(profileField), `반응자 프로필 매핑 누락: ${profileField}`);
  }
  assert.match(repository, /const commentPayload = \(row, member = \{\}, replies = \[\], reactions =/);
  assert.match(repository, /\n\s+replies,\n\s+reactions,/);
  assert.match(repository, /\.channel\(/);
  assert.match(repository, /postgres_changes/);
  assert.match(repository, /removeChannel|unsubscribe/);

  for (const importedFunction of ['addReply', 'deleteReply', 'toggleCommentReaction', 'toggleReplyReaction', 'subscribeToTaskDiscussion']) {
    assert.ok(drawer.includes(importedFunction), `drawer 토론 기능 연결 누락: ${importedFunction}`);
  }
  assert.doesNotMatch(drawer, /type="button" disabled aria-label="공감 0"/);
  assert.doesNotMatch(drawer, /type="button" disabled aria-label="확인 0"/);
  assert.match(drawer, /toggleReaction\(['"]comment['"],\s*comment\.id,\s*['"]like['"]/);
  assert.match(drawer, /toggleReaction\(['"]comment['"],\s*comment\.id,\s*['"]check['"]/);
  assert.match(drawer, /toggleReaction\(['"]reply['"],\s*reply\.id,\s*['"]like['"]/);
  assert.match(drawer, /toggleReaction\(['"]reply['"],\s*reply\.id,\s*['"]check['"]/);
  assert.match(drawer, /aria-pressed=/);
  assert.match(drawer, /reaction\.userId\s*===\s*actor\.userId|hasCurrentUserReaction/);
  assert.match(drawer, /#(?:ff3b30|FF453A|FF375F)/);
  assert.match(drawer, /#2997ff/i);
  assert.match(drawer, /reactions\??\.like\??\.length|reactionCount\([^,]+,\s*['"]like['"]\)/);
  assert.match(drawer, /reactions\??\.check\??\.length|reactionCount\([^,]+,\s*['"]check['"]\)/);

  assert.match(drawer, /SonghyeonReactionAvatarStack/);
  assert.match(drawer, /ml-auto/);
  assert.match(avatarStack, /reactor\?\.photoPath/);
  assert.match(avatarStack, /reactors\.slice\(0, maxVisible\)/);
  assert.match(avatarStack, /extraCount/);
  assert.match(avatarStack, /role="list"/);
  assert.match(avatarStack, /aria-label=\{`\$\{name\}, \$\{group\}`\}/);
  assert.match(avatarStack, /default_avatar\.svg/);
  assert.match(drawer, /aria-expanded=/);
  assert.match(drawer, /comment\.replies(?:\?\.|\.)map/);
  assert.match(drawer, /addReply\(/);
  assert.match(drawer, /deleteReply\(/);
  assert.match(drawer, /subscribeToTaskDiscussion\(task\.sourceKey/);
  assert.doesNotMatch(`${drawer}\n${avatarStack}\n${repository}\n${migration}`, /iota_seoul_logs|iota_pmo_tasks/i);
});

test('다른 사용자의 새 댓글·대댓글만 업무명 N으로 표시하고 상세 열람 시 사용자별로 읽음 처리한다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');
  const readsMigration = await readFile('supabase/migrations/202608130013_songhyeon_task_discussion_reads.sql', 'utf8');
  const discussionMigration = await readFile('supabase/migrations/202608130012_songhyeon_task_discussion.sql', 'utf8');

  assert.match(readsMigration, /create table if not exists public\.songhyeon_task_discussion_reads/);
  assert.match(readsMigration, /task_source_key text not null[\s\S]*references public\.songhyeon_tasks\(source_key\)[\s\S]*on update cascade on delete cascade/i);
  assert.match(readsMigration, /viewer_id uuid not null[\s\S]*references auth\.users\(id\)[\s\S]*on delete cascade/i);
  assert.match(readsMigration, /last_read_at timestamptz not null/i);
  assert.match(readsMigration, /primary key \(task_source_key, viewer_id\)/i);
  assert.match(readsMigration, /alter table public\.songhyeon_task_discussion_reads enable row level security/i);
  assert.match(readsMigration, /for select[\s\S]*viewer_id = auth\.uid\(\)[\s\S]*is_songhyeon_member\(\)/i);
  assert.match(readsMigration, /revoke all on table public\.songhyeon_task_discussion_reads[\s\S]*from public, anon, authenticated/i);
  assert.match(readsMigration, /grant select on table public\.songhyeon_task_discussion_reads[\s\S]*to authenticated/i);
  const markerPolicies = readsMigration.slice(
    readsMigration.indexOf('drop policy if exists "songhyeon members read own discussion markers"'),
    readsMigration.indexOf('-- The client may read only its own marker.'),
  );
  assert.doesNotMatch(markerPolicies, /for (?:insert|update|delete)/i, '읽음 시각을 클라이언트가 직접 조작하면 안 됩니다.');

  const baseline = readsMigration.slice(
    readsMigration.indexOf('insert into public.songhyeon_task_discussion_reads'),
    readsMigration.indexOf('create or replace function public.mark_songhyeon_task_discussion_read'),
  );
  assert.match(baseline, /from public\.songhyeon_tasks task/i);
  assert.match(baseline, /cross join public\.songhyeon_members member/i);
  assert.match(baseline, /member\.is_active/i);
  assert.match(baseline, /member\.auth_id is not null/i);
  assert.match(baseline, /statement_timestamp\(\)/i);
  assert.match(baseline, /on conflict \(task_source_key, viewer_id\) do nothing/i, '배포 이전 토론은 모든 활성 멤버에게 읽음 기준선으로 초기화돼야 합니다.');

  const markReadFunction = readsMigration.match(/create or replace function public\.mark_songhyeon_task_discussion_read\([\s\S]*?\n\$\$;/i)?.[0] || '';
  assert.ok(markReadFunction, '송현 전용 읽음 RPC가 필요합니다.');
  assert.match(markReadFunction, /security definer/i);
  assert.match(markReadFunction, /current_viewer_id uuid := auth\.uid\(\)/i);
  assert.match(markReadFunction, /if not public\.is_songhyeon_member\(\) then/i);
  assert.doesNotMatch(markReadFunction, /is_songhyeon_member\([^)]/i, '실 DB의 송현 멤버십 함수는 no-arg 시그니처를 사용합니다.');
  assert.match(markReadFunction, /clock_timestamp\(\)/i, '읽음 시각은 클라이언트가 아닌 DB 서버 시각을 사용해야 합니다.');
  assert.match(markReadFunction, /on conflict \(task_source_key, viewer_id\)[\s\S]*do update set[\s\S]*greatest\(/i);

  const unreadFunction = readsMigration.match(/create or replace function public\.get_songhyeon_task_discussion_unread_counts\(\)[\s\S]*?\n\$\$;/i)?.[0] || '';
  assert.ok(unreadFunction, '송현 전용 미읽 업무 조회 RPC가 필요합니다.');
  assert.match(unreadFunction, /if not public\.is_songhyeon_member\(\) then/i);
  assert.doesNotMatch(unreadFunction, /is_songhyeon_member\([^)]/i, '미읽 조회도 실 DB의 no-arg 송현 멤버십 함수를 사용해야 합니다.');
  assert.match(unreadFunction, /from public\.songhyeon_task_comments comment/i);
  assert.match(unreadFunction, /from public\.songhyeon_task_comment_replies reply/i);
  assert.equal((unreadFunction.match(/author_id <> current_viewer_id/gi) || []).length, 2, '본인이 작성한 댓글·대댓글은 N 대상이 아닙니다.');
  assert.equal((unreadFunction.match(/created_at > coalesce\(marker\.last_read_at/gi) || []).length, 2);
  assert.match(readsMigration, /grant execute on function public\.mark_songhyeon_task_discussion_read\(text\)[\s\S]*to authenticated/i);
  assert.match(readsMigration, /grant execute on function public\.get_songhyeon_task_discussion_unread_counts\(\)[\s\S]*to authenticated/i);

  for (const api of ['loadTaskDiscussionUnreadSourceKeys', 'markTaskDiscussionRead', 'subscribeToTaskDiscussionUnread']) {
    assert.match(repository, new RegExp(`export (?:async )?function ${api}\\b`));
    assert.ok(board.includes(api), `업무보드 미읽 연결 누락: ${api}`);
  }
  assert.match(repository, /rpc\('get_songhyeon_task_discussion_unread_counts'\)/);
  assert.match(repository, /return new Set\(\(rows \|\| \[\]\)\.map\(\(row\) => row\.task_source_key\)/);
  assert.match(repository, /rpc\('mark_songhyeon_task_discussion_read', \{ target_task_source_key: sourceKey \}\)/);
  assert.match(repository, /\['songhyeon_task_comments', 'songhyeon_task_comment_replies'\]/);
  assert.match(repository, /event: 'INSERT'/);
  assert.match(repository, /authorId: entry\.author_id/);
  assert.match(repository, /entryType: table === 'songhyeon_task_comments' \? 'comment' : 'reply'/);
  assert.match(repository, /removeChannel\(channel\)/);
  for (const table of ['songhyeon_task_comments', 'songhyeon_task_comment_replies']) {
    assert.match(discussionMigration, new RegExp(`alter publication supabase_realtime add table public\\.${table}`));
  }

  assert.match(board, /const \[unreadTaskSourceKeys, setUnreadTaskSourceKeys\] = useState\(\(\) => new Set\(\)\)/);
  assert.match(board, /loadTaskDiscussionUnreadSourceKeys\(user\?\.id\)/);
  assert.match(board, /subscribeToTaskDiscussionUnread\(user\?\.id, \(\{ sourceKey, authorId \}\) => \{/);
  assert.match(board, /if \(authorId === user\?\.id\) return;/, '본인 댓글·대댓글은 실시간 N을 만들지 않아야 합니다.');
  assert.match(board, /if \(selectedTask\?\.sourceKey === sourceKey\)[\s\S]*markTaskDiscussionRead\(sourceKey, actor\)[\s\S]*return;/);
  assert.match(board, /setUnreadTaskSourceKeys\(\(current\) => new Set\(current\)\.add\(sourceKey\)\)/);
  const openTask = board.match(/const openTask = useCallback\(\(task\) => \{[\s\S]*?\n\s*\}, \[[^\]]*\]\);/)?.[0] || '';
  assert.ok(openTask, '업무 상세 열기 함수를 찾을 수 없습니다.');
  assert.match(openTask, /setSelectedTask\(task\)/);
  assert.match(openTask, /next\.delete\(task\.sourceKey\)/, '상세 열람 즉시 N을 제거해야 합니다.');
  assert.match(openTask, /markTaskDiscussionRead\(task\.sourceKey, actor\)/);
  assert.match(openTask, /loadTaskDiscussionUnreadSourceKeys\(user\?\.id\)/, '읽음 저장 실패 시 DB 상태로 복구해야 합니다.');

  const taskNameCell = board.match(/<td className=\{`sticky z-10 pl-4 \$\{isNotStarted \? 'font-normal' : 'font-bold'\}[\s\S]*?<span className="min-w-0 truncate" style=\{\{ color: isNotStarted \? '#686868' : '#bdbba7' \}\}>[\s\S]*?<\/td>/)?.[0] || '';
  assert.ok(taskNameCell, '업무명 셀을 찾을 수 없습니다.');
  assert.match(taskNameCell, /<span className="min-w-0 truncate" style=\{\{ color: isNotStarted \? '#686868' : '#bdbba7' \}\}>\{task\.taskName\}<\/span>/);
  assert.match(taskNameCell, /unreadTaskSourceKeys\.has\(task\.sourceKey\)/);
  assert.match(taskNameCell, /aria-label="새 댓글"/);
  assert.match(taskNameCell, /bg-\[#ff3b30\]/);
  assert.match(taskNameCell, />N<\/span>/);
  assert.doesNotMatch(board, /48 \* 60 \* 60 \* 1000|fetchRecentPmoActiveTaskIds/, 'N은 48시간 추정이 아닌 사용자별 읽음 원장을 따라야 합니다.');
  assert.doesNotMatch(`${board}\n${repository}\n${readsMigration}`, /iota_seoul_logs|iota_pmo_tasks|iota_notifications/i);
});

test('새 업무 추가 버튼은 IOTA 원본 850px 편집 모달과 송현 Supabase createTask를 연결한다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const modal = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskEditorModal.jsx', 'utf8');
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');

  assert.match(board, /setIsEditorOpen\(true\)/);
  assert.match(board, /<SonghyeonTaskEditorModal/);
  assert.match(modal, /max-w-\[850px\]/);
  assert.match(modal, /통합 업무 추가/);
  assert.match(modal, /붉은 박스는 필수입력/);
  assert.match(modal, /createTask/);
  assert.match(repository, /export async function createTask/);
});

test('통합업무보드는 IOTA SEOUL 원본 표의 폭·고정열·행·헤더·필터 구조를 그대로 이식한다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');

  for (const token of [
    "w-[2432px] min-w-[2432px] max-w-[2432px]",
    "w-[1200px] min-w-[1200px] max-w-[1200px]",
    "h-[46px]",
    "h-[50px]",
    "sticky left-[50px]",
    "w-[102px] min-w-[102px] max-w-[102px]",
    "sticky left-[152px]",
    "left-[258px]",
    "w-[325px] min-w-[325px] max-w-[325px]",
    "mx-auto w-[1200px] max-w-full",
    "w-full max-w-full",
  ]) assert.ok(board.includes(token), `IOTA 원본 토큰 누락: ${token}`);

  const gateIndex = board.indexOf('HeaderFilter label="GATE 단계"');
  const categoryIndex = board.indexOf('HeaderFilter label="업무분류"');
  const taskNameIndex = board.indexOf('>업무명</th>');
  assert.ok(gateIndex < categoryIndex && categoryIndex < taskNameIndex, '열 순서는 ID → GATE → 업무분류 → 업무명이어야 한다.');
  assert.doesNotMatch(board, /gateLabel|formatOption/);
  assert.match(board, /title=\{task\.gateStage \|\| task\.stage\}>\{task\.gateStage \|\| task\.stage\}<\/td>/);
  assert.match(board, /w-\[102px\] min-w-\[102px\] max-w-\[102px\]/);

  const dueDateIndex = board.indexOf('>마감기한</th>');
  const leadIndex = board.indexOf('HeaderFilter label="실행주관"');
  assert.ok(dueDateIndex > taskNameIndex && dueDateIndex < leadIndex, '마감기한은 실행주관 바로 왼쪽에 있어야 한다.');
  assert.match(board, /formatTaskDueDate\(task\.dueDate\)/);
  assert.match(board, /return `\$\{match\[1\]\.slice\(-2\)\}\.\$\{match\[2\]\.padStart\(2, '0'\)\}\.\$\{match\[3\]\.padStart\(2, '0'\)\}`/);
  assert.match(board, /w-\[74px\] min-w-\[74px\] max-w-\[74px\][^\n]*>마감기한<\/th>/);
  assert.match(board, /w-\[71px\] min-w-\[71px\] max-w-\[71px\][^\n]*>관리<\/th>/);

  for (const label of [
    '업무분류', '세부섹터', '업무명',
    '업무목적 / PF·준공 영향', '필요 산출물', 'GATE',
    '실행주관', '담당자', '외부상대방', '지원필요',
    'Block', '결정필요', '다음 액션', '상태', '중요도', '마감기한', '관리',
  ]) assert.ok(board.includes(label), `IOTA 원본 열 누락: ${label}`);

  assert.doesNotMatch(board, /prioritySortOrder/);
  assert.match(board, /currentPage/);
  assert.match(board, /pageSize/);
  assert.match(board, /opacity-0 cursor-pointer/);
  assert.doesNotMatch(board, /HeaderFilter label="협업부서"|selectedCoopDept|options\.coops/);
  assert.match(board, /\.\.\.asList\(task\.coopDepts\)/);
});

test('업무 행 hover·상세 선택 배경은 sticky 열을 포함한 전체 셀에 동일하게 적용된다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const rowStart = board.indexOf('{paginatedTasks.map((task, index) => {');
  const rowEnd = board.indexOf('</tr>;', rowStart);
  assert.ok(rowStart >= 0 && rowEnd > rowStart, '업무 행 렌더링 블록을 찾을 수 없습니다.');

  const rowBlock = board.slice(rowStart, rowEnd + '</tr>;'.length);
  assert.match(rowBlock, /const selected = selectedTask\?\.sourceKey === task\.sourceKey;/);
  assert.match(rowBlock, /data-task-key=\{task\.sourceKey\}/);
  assert.match(rowBlock, /aria-selected=\{selected\}/);
  const trStart = rowBlock.indexOf('return <tr');
  const trEnd = rowBlock.indexOf('>\n', trStart);
  const rowOpening = rowBlock.slice(trStart, trEnd + 1);
  assert.match(rowOpening, /className=\{`[^`]*\bgroup\b/);
  assert.match(rowOpening, /\[&>td\]:bg-inherit/, '일반·sticky td가 tr의 표면을 동일하게 상속해야 합니다.');
  assert.match(rowOpening, /\$\{selected \? 'bg-\[[^\]]+\] hover:bg-\[[^\]]+\]' : 'bg-\[[^\]]+\] hover:bg-\[[^\]]+\]'\}/);
  assert.match(rowOpening, /selected \? 'bg-\[([^\]]+)\] hover:bg-\[\1\]'/, '선택된 행은 hover 중에도 active 배경을 유지해야 합니다.');

  const cellOpenings = rowBlock.match(/<td\b[\s\S]*?>/g) || [];
  assert.equal(cellOpenings.length, 18, '업무표의 18개 셀 전체가 행 표면 상태를 공유해야 합니다.');
  for (const [index, cell] of cellOpenings.entries()) {
    assert.doesNotMatch(
      cell,
      /(?:^|\s)(?:bg-\[[^\]]+\]|hover:bg-\[[^\]]+\]|group-hover:bg-\[[^\]]+\]|group-data-\[[^\]]+\]:bg-\[[^\]]+\])/,
      `${index + 1}번 셀에 독자 배경이 남아 교차·깍두기 패턴을 만듭니다.`,
    );
  }

  const stickyCells = cellOpenings.filter((cell) => /\bsticky\b/.test(cell));
  assert.ok(stickyCells.length >= 4, '고정열 검증 대상이 부족합니다.');
  assert.ok(stickyCells.every((cell) => !/\bbg-|group-hover:bg-/.test(cell)), 'sticky 셀에 독자 배경을 두면 전체 행 hover·selected 표면이 가려집니다.');
});

test('전용 업무보드 헤더는 제목·검색·우측 추가버튼만 표시하고 자동 행수 표시는 숨긴다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const page = await readFile('src/pages/TaskBoard.jsx', 'utf8');
  const hypotheses = await readFile('src/pages/ServiceHypotheses.jsx', 'utf8');
  const workspaceLayout = await readFile('src/components/workspace/WorkspacePageLayout.jsx', 'utf8');

  for (const token of [
    'w-[280px]', '+ 새 업무 추가',
    'actions={canCreateAndArchive ? <button', 'px-[60px]',
  ]) assert.ok(`${board}\n${page}`.includes(token), `업무보드 헤더 토큰 누락: ${token}`);
  assert.match(workspaceLayout, /WorkspacePageHeader[\s\S]*text-\[32px\]/);
  assert.match(workspaceLayout, /WorkspacePageFrame[\s\S]*pt-\[28px\]/);
  assert.match(page, /<WorkspacePageFrame fluidContent\b/);
  assert.doesNotMatch(board, /화면 맞춤|화면 높이에 맞춰|\{pageSize\}개/, '자동 행수는 계산만 하고 헤더에 표시하지 않습니다.');
  assert.doesNotMatch(board, /2026\.08 현재|truncate whitespace-nowrap text-\[11px\]/);
  assert.doesNotMatch(board, /간추려보기|자세히보기|viewMode|setViewMode/);
  assert.doesNotMatch(board, /10개씩 보기|20개씩 보기|value=\{pageSize\}[^>]*onChange=\{\(size\)/);
  assert.doesNotMatch(page, /mx-auto w-\[1200px\]/);
  assert.match(hypotheses, /<WorkspacePageHeader\b/);
  assert.match(board, /<WorkspacePageHeader\s+data-task-board-header\s+title="통합업무보드"/);
});

test('업무 행수는 노트북 가용 높이와 큰 화면 60% 기준 중 큰 값을 사용해 단조 증가하고 페이지 위치를 보존한다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');

  for (const [name, value] of [
    ['LARGE_SCREEN_TABLE_RATIO', '0.6'],
    ['LAPTOP_REFERENCE_VIEWPORT_HEIGHT', '900'],
    ['TABLE_BOTTOM_GUTTER', '24'],
    ['DEFAULT_TABLE_TOP', '78'],
    ['TABLE_HEADER_HEIGHT', '46'],
    ['TABLE_ROW_HEIGHT', '50'],
    ['TABLE_PAGINATION_HEIGHT', '46'],
    ['MIN_AUTO_PAGE_SIZE', '8'],
  ]) assert.match(board, new RegExp(`const ${name} = ${value.replace('.', '\\.')}\\s*;`), `${name} 자동 행수 상수가 달라졌습니다.`);
  assert.doesNotMatch(board, /TABLE_VIEWPORT_RATIO|MAX_AUTO_PAGE_SIZE/, '과거 70% 고정 비율이나 18개 상한이 남아 있으면 큰 화면에서 행수가 역전·정체될 수 있습니다.');

  const calculator = board.match(/const autoPageSizeForViewport = \(viewportHeight, tableTop, fillLaptopViewport\) => \{[\s\S]*?\n\};/)?.[0] || '';
  assert.ok(calculator, '브라우저 높이 기반 자동 행수 계산 함수가 필요합니다.');
  assert.match(calculator, /const largeScreenTargetHeight = viewportHeight \* LARGE_SCREEN_TABLE_RATIO/);
  assert.match(calculator, /const laptopViewportHeight = Math\.min\(viewportHeight, LAPTOP_REFERENCE_VIEWPORT_HEIGHT\)/);
  assert.match(calculator, /fillLaptopViewport\s*\? Math\.max\(0, laptopViewportHeight - tableTop - TABLE_BOTTOM_GUTTER\)\s*: 0/);
  assert.match(calculator, /const targetTableHeight = Math\.max\(largeScreenTargetHeight, laptopFillTargetHeight\)/, '큰 화면으로 갈수록 더 작은 기준을 선택하면 행수가 역으로 감소할 수 있습니다.');
  assert.match(calculator, /targetTableHeight - TABLE_HEADER_HEIGHT - TABLE_PAGINATION_HEIGHT/);
  assert.match(calculator, /Math\.floor\(availableRowsHeight \/ TABLE_ROW_HEIGHT\)/);
  assert.match(calculator, /return Math\.max\(MIN_AUTO_PAGE_SIZE, calculatedRows\)/);

  const calculatedPageSize = (viewportHeight, tableTop, fillLaptopViewport) => {
    const largeScreenTargetHeight = viewportHeight * 0.6;
    const laptopFillTargetHeight = fillLaptopViewport ? Math.max(0, Math.min(viewportHeight, 900) - tableTop - 24) : 0;
    return Math.max(8, Math.floor((Math.max(largeScreenTargetHeight, laptopFillTargetHeight) - 46 - 46) / 50));
  };
  for (const viewportHeight of [768, 900]) {
    const availableFromTableTop = viewportHeight - 78 - 24;
    const rows = calculatedPageSize(viewportHeight, 78, true);
    const renderedTableHeight = 46 + rows * 50 + 46;
    assert.ok(renderedTableHeight <= availableFromTableTop, `${viewportHeight}px 노트북에서 테이블이 viewport 하단을 넘으면 안 됩니다.`);
    assert.ok(availableFromTableTop - renderedTableHeight < 50, `${viewportHeight}px 노트북에서 한 행 이상 빈 공간을 남기면 안 됩니다.`);
  }
  const growingViewportRows = [900, 1000, 1200, 1400, 1600, 2000].map((height) => calculatedPageSize(height, 78, true));
  for (let index = 1; index < growingViewportRows.length; index += 1) {
    assert.ok(growingViewportRows[index] >= growingViewportRows[index - 1], '화면 높이가 커질 때 자동 행수가 역으로 감소하면 안 됩니다.');
  }
  assert.ok(growingViewportRows.at(-1) > 18, '큰 화면에서는 과거 18행 상한 없이 60% 기준으로 확장돼야 합니다.');
  assert.equal(calculatedPageSize(1200, 78, false), 12, '헤더 없는 embedded 보드는 노트북 floor 없이 60% viewport 기준을 사용해야 합니다.');

  assert.match(board, /const currentViewportHeight = \(\) => typeof window === 'undefined' \? 900 : window\.innerHeight/);
  assert.match(board, /const \[viewportHeight, setViewportHeight\] = useState\(currentViewportHeight\)/);
  assert.match(board, /const \[tableTop, setTableTop\] = useState\(DEFAULT_TABLE_TOP\)/);
  assert.match(board, /const tableViewportRef = useRef\(null\)/);
  assert.match(board, /const pageSize = autoPageSizeForViewport\(viewportHeight, tableTop, showWorkspaceHeader\)/);
  assert.match(board, /<div ref=\{tableViewportRef\} className=\{`mb-\[10px\]/, '실제 테이블 외곽 시작 위치를 측정할 ref가 필요합니다.');
  assert.doesNotMatch(board, /const \[pageSize, setPageSize\] = useState\((?:10|20)\)/, '10/20 고정 행수 상태가 남아 있으면 안 됩니다.');

  const resizeEffect = board.match(/useEffect\(\(\) => \{\s*const updateViewportMetrics[\s\S]*?\n\s*\}, \[repositoryError, showWorkspaceHeader\]\);/)?.[0] || '';
  assert.ok(resizeEffect, 'viewport와 실제 테이블 시작 위치를 함께 측정하는 resize effect가 필요합니다.');
  assert.match(resizeEffect, /setViewportHeight\(window\.innerHeight\)/);
  assert.match(resizeEffect, /if \(showWorkspaceHeader && tableViewportRef\.current\)/);
  assert.match(resizeEffect, /setTableTop\(Math\.max\(0, Math\.round\(tableViewportRef\.current\.getBoundingClientRect\(\)\.top\)\)\)/);
  assert.match(resizeEffect, /updateViewportMetrics\(\);[\s\S]*window\.addEventListener\('resize', updateViewportMetrics\)/, '첫 렌더에서도 실제 top을 즉시 측정해야 합니다.');
  assert.match(resizeEffect, /return \(\) => window\.removeEventListener\('resize', updateViewportMetrics\)/, 'resize listener cleanup이 필요합니다.');

  assert.match(board, /const previousPageSizeRef = useRef\(pageSize\)/);
  const pageSizeEffect = board.match(/useEffect\(\(\) => \{\s*const previousPageSize = previousPageSizeRef\.current;[\s\S]*?\n\s*\}, \[pageSize\]\);/)?.[0] || '';
  assert.ok(pageSizeEffect, '행수 변경 시 페이지 위치를 보정하는 effect가 필요합니다.');
  assert.match(pageSizeEffect, /setCurrentPage\(\(page\) => Math\.floor\(\(\(page - 1\) \* previousPageSize\) \/ pageSize\) \+ 1\)/, '기존 첫 노출 업무의 index를 새 페이지에서도 보존해야 합니다.');
  assert.match(pageSizeEffect, /previousPageSizeRef\.current = pageSize/);

  assert.match(board, /const totalPages = Math\.max\(1, Math\.ceil\(sortedAndFilteredTasks\.length \/ pageSize\)\)/);
  assert.match(board, /const visiblePage = Math\.min\(currentPage, totalPages\)/);
  assert.match(board, /sortedAndFilteredTasks\.slice\(\(visiblePage - 1\) \* pageSize, visiblePage \* pageSize\)/);
  assert.match(board, /setCurrentPage\(\(page\) => Math\.min\(Math\.max\(page, 1\), totalPages\)\)/, '필터·삭제 후 currentPage를 유효 범위로 clamp해야 합니다.');
  assert.match(board, /\}, \[totalPages\]\);/);
  assert.doesNotMatch(board, /화면 맞춤|화면 높이에 맞춰|\{pageSize\}개/, '자동 행수 표시 문구는 화면에 노출하지 않습니다.');
});

test('통합업무보드 사용자 교정사항은 보관·상단여백·열재배분·중앙정렬·분리선을 함께 적용한다', async () => {
  const page = await readFile('src/pages/TaskBoard.jsx', 'utf8');
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const plan = await readFile('src/components/iota-songhyeon/task-board/SonghyeonIntegratedExecutionPlan.jsx', 'utf8');
  const workspaceLayout = await readFile('src/components/workspace/WorkspacePageLayout.jsx', 'utf8');

  assert.match(page, /<WorkspacePageFrame fluidContent\b/);
  assert.match(workspaceLayout, /WorkspacePageFrame[\s\S]*pt-\[28px\]/);
  assert.doesNotMatch(board, /<HeaderFilter label="프로젝트"/);
  assert.doesNotMatch(board, /\{projectLabel\(task\)\}/);
  assert.match(board, /w-\[325px\] min-w-\[325px\] max-w-\[325px\]/);
  assert.doesNotMatch(board, /shadow-\[inset_-1px_0_0_0_#3c3c3c\]/);
  assert.match(board, /left-\[152px\][^\n]*w-\[106px\][^\n]*text-center font-bold/);
  assert.match(board, /<WorkspacePageHeader\s+data-task-board-header\s+title="통합업무보드"/);
  assert.match(workspaceLayout, /WorkspacePageHeader[\s\S]*mx-auto mb-\[12px\][^'"`]*w-\[1200px\] max-w-full/);
  assert.doesNotMatch(board, /HeaderFilter label="협업부서"|selectedCoopDept|options\.coops/);
  assert.match(board, /\{archived \|\| isReadOnly \? '상세' : '수정'\}<\/button>[\s\S]*\{!archived && canCreateAndArchive && <><span[\s\S]*>\|<\/span>[\s\S]*>보관<\/button>/);
  assert.match(board, /requestArchive\(task\)/);
  assert.match(board, /archiveTask\(archiveTarget\.sourceKey/);
  assert.doesNotMatch(board, /setDeleteTarget\(task\)|deleteTask\(/);
  assert.match(plan, /className="[^"]*mx-auto[^"]*w-\[1200px\][^"]*"/);
  assert.doesNotMatch(plan, /업무 수행 참고/);
  assert.match(plan, /id="execution-framework"[^\n]*pt-\[38px\]/);
  assert.match(plan, /function SectionHeading\(\{ title, description \}\)/);
  assert.match(plan, /className="mb-\[10px\] flex items-end justify-between gap-8"/);
  assert.doesNotMatch(plan, /SectionHeading number=/);
  assert.doesNotMatch(plan, /\{number\}/);
  assert.doesNotMatch(plan, /font-mono text-\[12px\] font-bold text-\[#686868\]">\{number\}/);
  assert.doesNotMatch(plan, /SectionHeading[\s\S]{0,260}border-t border-\[#3c3c3c\]/);
  assert.doesNotMatch(page, /data-execution-divider/);
});

test('통합업무보드 하단은 원문을 보존한 시각적 종합실행계획을 제공한다', async () => {
  const page = await readFile('src/pages/TaskBoard.jsx', 'utf8');
  const plan = await readFile('src/components/iota-songhyeon/task-board/SonghyeonIntegratedExecutionPlan.jsx', 'utf8');

  assert.match(page, /<SonghyeonIntegratedExecutionPlan \/>/);
  for (const dependency of ['projectContext', 'stages', 'organizationRoles', 'workPlanPhases', 'decisionBoundaries', 'stageZeroExitCriteria']) {
    assert.ok(plan.includes(dependency), `종합실행계획 데이터 연결 누락: ${dependency}`);
  }
  for (const section of [
    '송현 BID 종합실행계획', '현재 위치와 공동 목표', '전체 실행 흐름',
    '단계별 상세 실행계획', '조직별 역할 연결', '기획추진 전담 지원축',
    '단계전환 및 의사결정 기준',
  ]) assert.ok(plan.includes(section), `종합실행계획 구간 누락: ${section}`);
  for (const visual of ['data-execution-flow', 'data-stage-detail', 'data-role-map', 'data-gate-map']) {
    assert.ok(plan.includes(visual), `시각 구조 누락: ${visual}`);
  }
  assert.match(plan, /bg-\[#1F1F1E\]/);
  assert.match(plan, /bg-\[#272726\]/);
  assert.match(plan, /border-\[#3c3c3c\]/);
  assert.match(plan, /어떤 목적과 순서 안에서 움직이는지 설명합니다\.<br \/>/);
  assert.match(plan, /위에서 업무를 수행하고, 아래에서 현재 단계의 질문·수행업무·결과물·단계전환 기준을 함께 확인합니다\./);
  assert.match(plan, /whitespace-pre-line text-\[22px\] font-bold[^>]*>\{projectContext\.coreValue\}<\/h3>/);
  assert.doesNotMatch(plan, /projectContext\.operatingPrinciples\.map/);
  assert.equal((plan.match(/bg-\[#202a36\]/g) || []).length, 5);
  assert.doesNotMatch(plan, /bg-\[#263b52\]/);
  assert.doesNotMatch(plan, /bg-\[#2c3440\]/);
  assert.doesNotMatch(plan, /bg-white|text-slate|shadow-/);
});

test('종합실행계획은 상단 단계 요약을 제거하고 현재·다음·공동목표를 하단 한 줄에서 안내한다', async () => {
  const plan = await readFile('src/components/iota-songhyeon/task-board/SonghyeonIntegratedExecutionPlan.jsx', 'utf8');
  const headingEnd = plan.indexOf('<section className="mb-[44px]">');
  const heading = plan.slice(plan.indexOf('<div className="mb-[32px]">'), headingEnd);

  assert.doesNotMatch(heading, /현재 위치|다음 단계|projectContext\.currentStage|projectContext\.nextGate/);
  assert.doesNotMatch(plan, /data-stage-summary/);

  assert.match(plan, /data-current-goal-row[^>]*grid[^>]*grid-cols-\[[^\]]+\]/);
  assert.doesNotMatch(plan, /data-current-goal-row[^>]*grid-cols-\[0\.82fr_64px_1\.18fr\]/);
  assert.match(
    plan,
    /data-current-stage[\s\S]*?projectContext\.currentStage\.code[\s\S]*?projectContext\.currentStage\.name[\s\S]*?projectContext\.currentStage\.objective[\s\S]*?currentStage\.gate/,
  );
  assert.match(
    plan,
    /data-next-stage[\s\S]*?nextStage\.id[\s\S]*?nextStage\.title[\s\S]*?nextStage\.short[\s\S]*?nextStage\.gate/,
  );
  assert.doesNotMatch(plan, /data-next-stage[\s\S]*?projectContext\.nextGate/);
  assert.match(
    plan,
    /data-common-goal[\s\S]*?projectContext\.coreValue[\s\S]*?projectContext\.definition/,
  );
  assert.match(plan, /data-current-stage[\s\S]*data-next-stage[\s\S]*data-common-goal/);
});

test('종합실행계획 현재·다음·공동목표 패널은 동일한 5행 레이아웃과 줄맞춤을 공유한다', async () => {
  const plan = await readFile('src/components/iota-songhyeon/task-board/SonghyeonIntegratedExecutionPlan.jsx', 'utf8');
  const sharedLayout = plan.match(/const summaryPanelLayout = '([^']+)'/)?.[1] || '';

  for (const token of ['row-span-5', 'grid', 'grid-rows-subgrid']) {
    assert.ok(sharedLayout.split(/\s+/).includes(token), `요약 패널 공통 레이아웃에 ${token}가 필요합니다.`);
  }
  assert.match(
    plan,
    /data-current-goal-row[^>]*grid-rows-\[auto_auto_auto_auto_auto\]/,
    '세 패널을 관통하는 5개 공통 행을 정의해야 합니다.',
  );

  const currentStart = plan.indexOf('<div data-current-stage');
  const nextStart = plan.indexOf('<div data-next-stage');
  const goalStart = plan.indexOf('<div data-common-goal');
  const goalEnd = plan.indexOf('<section className="mb-[44px]" data-execution-flow', goalStart);
  assert.ok(currentStart >= 0 && nextStart > currentStart && goalStart > nextStart && goalEnd > goalStart);

  const panels = {
    current: plan.slice(currentStart, nextStart),
    next: plan.slice(nextStart, goalStart),
    goal: plan.slice(goalStart, goalEnd),
  };
  for (const [name, source] of Object.entries(panels)) {
    const openingTag = source.slice(0, source.indexOf('>') + 1);
    assert.match(openingTag, /summaryPanelLayout/, `${name} 패널이 공통 레이아웃을 사용해야 합니다.`);
  }

  const assertRowOrder = (source, markers, panelName) => {
    let previousIndex = -1;
    for (const marker of markers) {
      const markerIndex = source.indexOf(marker, previousIndex + 1);
      assert.ok(markerIndex > previousIndex, `${panelName} 패널의 ${marker} 행 순서가 동일해야 합니다.`);
      previousIndex = markerIndex;
    }
  };
  const stageRows = [
    'data-summary-label',
    'data-summary-step',
    'data-summary-title',
    'data-summary-description',
    'data-summary-gate',
  ];
  assertRowOrder(panels.current, stageRows, '현재');
  assertRowOrder(panels.next, stageRows, '다음');
  assertRowOrder(
    panels.goal,
    ['data-summary-label', 'data-summary-spacer', 'data-summary-title', 'data-summary-description', 'data-summary-spacer'],
    '공동 목표',
  );

  assert.equal((panels.goal.match(/data-summary-spacer/g) || []).length, 2, '공동 목표의 단계·전환기준 자리에는 명시적 여백 행을 둡니다.');
  assert.doesNotMatch(panels.goal, /data-summary-step|data-summary-gate|currentStage|nextStage|nextGate|단계전환 기준/);
});

test('신규 업무 모달은 IOTA 원본 등록 구조와 실제 선택·다중선택 기능을 보존한다', async () => {
  const modal = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskEditorModal.jsx', 'utf8');
  for (const token of [
    'max-w-[850px]', '업무 ID:', '프로젝트:', '업무분류:',
    'h-16 resize-y', '상태:', '중요도:', '병목(Blocker) 상황 설정',
    '협조 부서 (다중 선택 가능)', 'handleCoopDeptToggle', '담당자명 검색/입력',
    '회사명 검색/입력', '회의 상정 사유',
  ]) assert.ok(modal.includes(token), `IOTA 신규 업무 등록 기능 누락: ${token}`);
  assert.doesNotMatch(modal, /taskTypes|form\.taskType|유형:|세부섹터:|sectorDetail|showSubsectorSuggestions/);
  assert.doesNotMatch(modal, /<input value=\{form\.coopDepts\.join/);
  assert.match(modal, /createTask\(payload, actor\)/);
  assert.match(modal, /loadTaskEditorOptions/);
  for (const token of ['showAssigneeSuggestions', 'showSupportSuggestions', 'showStakeholderSuggestions', "onBlur={() => setTimeout(", 'data-autocomplete-option']) {
    assert.ok(modal.includes(token), `IOTA 자동완성 기능 누락: ${token}`);
  }
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');
  assert.match(repository, /export async function loadTaskEditorOptions/);
  assert.match(repository, /from\('songhyeon_members'\)/);
  assert.doesNotMatch(repository, /subsectors|normalizeSectorDetail|sectorStageLabels/);
  assert.match(repository, /assignees/);
  assert.match(repository, /supportOptions/);
  assert.match(repository, /stakeholders/);
});

test('상세 drawer는 IOTA 원본 550px 계층과 metadata·narrative·협업로그 순서를 이식한다', async () => {
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');

  for (const token of [
    'pl-10', 'max-w-[550px]', 'data-pmo-task-detail-overlay',
    'data-pmo-task-detail-drawer', 'px-[10px] py-[7px]',
    'grid grid-cols-4 gap-4', '지원필요', 'GATE 단계', '외부 상대방',
    '마감 기한', '의사결정필요',
    '업무 목적', '필요 산출물', '다음 액션', '회의 상정 사유',
    '등록된 글이 없습니다.', '업무 수정하기',
  ]) assert.ok(drawer.includes(token), `IOTA 원본 drawer 토큰 누락: ${token}`);
  const metadataIndex = drawer.indexOf('grid grid-cols-4 gap-4');
  const narrativeIndex = drawer.indexOf('<Field label="업무 목적">');
  const activityIndex = drawer.indexOf('comments.length === 0');
  assert.ok(metadataIndex < narrativeIndex && narrativeIndex < activityIndex);
});

test('업무 수정은 간이 인라인 폼 없이 신규 등록과 동일한 850px 공통 폼을 사용한다', async () => {
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');
  const modal = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskEditorModal.jsx', 'utf8');
  assert.match(drawer, /<SonghyeonTaskEditorModal task=\{task\}/);
  assert.match(drawer, /setEditorOpen\(true\)/);
  assert.doesNotMatch(drawer, /\{editing \?|setEditing|const Toggle|onClick=\{save\}/);
  assert.match(modal, /max-w-\[850px\]/);
  assert.match(modal, /const isEditing = Boolean\(task\)/);
  assert.match(modal, /updateTask\(task\.sourceKey, payload, actor\)/);
  assert.match(modal, /통합 업무 수정/);
  assert.match(modal, /수정 완료/);
});

test('업무 수정값은 초기 산출물보다 우선하며 미정 담당자는 허위 변경이력에서 제외한다', async () => {
  const saved = { deliverables: '사용자가 수정한 필요 산출물' };
  assert.equal(storedSonghyeonTaskValue(saved, 'deliverables', '공식 초기 산출물'), saved.deliverables);
  assert.equal(storedSonghyeonTaskValue({}, 'deliverables', '공식 초기 산출물'), '공식 초기 산출물');
  assert.equal(normalizeSonghyeonAssignee(''), '미정');
  assert.deepEqual(visibleSonghyeonTaskChanges([
    { field: 'deliverables', oldValue: '기존', newValue: '수정' },
    { field: 'assignee', oldValue: '미정', newValue: '' },
  ]).map((change) => change.field), ['deliverables']);

  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');
  assert.match(repository, /storedSonghyeonTaskValue\(payload, 'deliverables'/);
  assert.match(drawer, /deliverables: '필요 산출물'/);
  assert.match(drawer, /visibleSonghyeonTaskChanges/);
});

test('좌측 주요 메뉴와 독립 /tasks 라우트에서 통합업무보드를 직접 연다', async () => {
  const layout = await readFile('src/components/Layout.jsx', 'utf8');
  const app = await readFile('src/App.jsx', 'utf8');
  const page = await readFile('src/pages/TaskBoard.jsx', 'utf8');

  assert.match(layout, /name: '통합업무보드', path: '\/tasks'/);
  assert.ok(layout.indexOf("path: '/tasks'") < layout.indexOf("path: '/milestones'"));
  assert.doesNotMatch(layout, /name: '서비스·운영 가설'/);
  assert.ok(layout.indexOf("path: '/milestones'") < layout.indexOf("path: '/feed'"));
  assert.doesNotMatch(layout, /path: '\/execution'/);
  assert.match(app, /import TaskBoard from '\.\/pages\/TaskBoard'/);
  assert.match(app, /<Route path="tasks" element=\{<TaskBoard \/>\}/);
  assert.doesNotMatch(app, /path="execution"/);
  assert.match(page, /<SonghyeonTaskBoard/);
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  assert.match(board, /통합업무보드/);
  assert.doesNotMatch(await readFile('src/pages/Dashboard.jsx', 'utf8'), /SonghyeonTaskBoard|showWorkspaceHeader/);
});

test('마일스톤 일정은 canonical row CRUD·explicit Task 연결을 제공하고 Task 원장과 독립적이다', async () => {
  const schedule = await readFile('src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx', 'utf8');
  const modal = await readFile('src/components/iota-songhyeon/pmo/SonghyeonScheduleTaskLinkModal.jsx', 'utf8');
  const rowEditor = await readFile('src/components/iota-songhyeon/pmo/SonghyeonScheduleRowEditorModal.jsx', 'utf8');
  const repository = await readFile('src/lib/songhyeonScheduleRepository.js', 'utf8');
  const migration = await readFile('supabase/migrations/202608130005_songhyeon_schedule_task_links.sql', 'utf8');
  const rowMigration = await readFile('supabase/migrations/202608180004_songhyeon_schedule_rows.sql', 'utf8');
  for (const token of ['SonghyeonScheduleTaskLinkModal', 'SonghyeonScheduleRowEditorModal', 'loadScheduleWorkspace', 'linkScheduleTask', 'createScheduleRow', 'updateScheduleRow', 'deleteScheduleRow']) assert.match(schedule, new RegExp(token));
  for (const token of ['연결된 통합업무', '기존 통합업무 연결']) assert.ok(modal.includes(token));
  for (const token of ['loadScheduleWorkspace', 'linkScheduleTask', 'unlinkScheduleTask', 'createScheduleRow', 'updateScheduleRow', 'deleteScheduleRow']) assert.match(repository, new RegExp(`export async function ${token}`));
  assert.doesNotMatch(`${schedule}\n${modal}\n${repository}`, /createAndLinkScheduleTask|onCreateTask|canCreateTask|새 통합업무 등록|등록 후 연결/);
  assert.doesNotMatch(repository, /sourceKey === scheduleSourceKey|implicit:\s*true/);
  assert.match(migration, /songhyeon_schedule_task_links/);
  assert.match(migration, /songhyeon_schedule_overrides/);
  assert.match(rowMigration, /songhyeon_schedule_rows/);
  assert.doesNotMatch(schedule, /task-link concerns are intentionally excluded/);
  assert.match(schedule, /SonghyeonTaskDetailDrawer/);
  assert.match(schedule, /setEmbeddedTask/);
  assert.doesNotMatch(schedule, /window\.location\.href = `\/tasks\?task=/);
  assert.doesNotMatch(modal, /onEditSchedule|scheduleForm|마일스톤 및 일정 수정/);
  assert.match(rowEditor, /type="date"/);
  assert.match(rowEditor, /시작일/);
  assert.match(rowEditor, /종료일/);
  assert.doesNotMatch(rowEditor, /시작주|종료주/);
  assert.doesNotMatch(repository, /updateTask\(scheduleSourceKey|primaryTask/,
    '일정 row 수정은 동일 sourceKey의 Task 납기·상태를 암묵적으로 변경하면 안 됩니다.');
  assert.doesNotMatch(repository, /updateTask\(scheduleSourceKey, \{[^}]*status:/);
  assert.doesNotMatch(modal, /빠른 상태처리/, '제거된 본문 박스를 안내 문구가 다시 지칭하면 안 됩니다.');
  assert.match(rowEditor, /<select value=\{form\.status\}/);
  assert.match(schedule, /getScheduleBarGeometry/);
  assert.doesNotMatch(schedule, /taskStatusToScheduleStatus\(savedTask\.status\)/,
    '연결된 Task workflow 변경은 독립 일정 row의 상태를 덮어쓰면 안 됩니다.');
});

test('업무·댓글·대댓글·반응·변경이력은 localStorage 없이 송현 Supabase 원장으로만 작동한다', async () => {
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');
  assert.match(repository, /songhyeon_tasks/);
  assert.match(repository, /songhyeon_task_comments/);
  assert.match(repository, /songhyeon_task_comment_replies/);
  assert.match(repository, /songhyeon_task_comment_reactions/);
  assert.match(repository, /songhyeon_task_reply_reactions/);
  assert.match(repository, /songhyeon_task_activity/);
  assert.match(repository, /requireSupabase/);
  assert.match(repository, /seedMissingTasks/);
  assert.doesNotMatch(repository, /localStorage|readLocal|writeLocal|fallback/i);
  assert.match(repository, /updateTask/);
  assert.match(repository, /createTask/);
  assert.match(repository, /addComment/);
  assert.match(repository, /deleteComment/);
  assert.match(repository, /addReply/);
  assert.match(repository, /deleteReply/);
  assert.match(repository, /toggleCommentReaction/);
  assert.match(repository, /toggleReplyReaction/);
});

test('업무 원장 SQL은 3개 테이블·멤버십 RLS·초기 upsert 함수를 제공한다', async () => {
  const sql = await readFile('supabase/migrations/202608120002_songhyeon_task_board.sql', 'utf8');
  for (const token of [
    'songhyeon_tasks', 'songhyeon_task_comments', 'songhyeon_task_activity',
    'enable row level security', 'is_songhyeon_member()', 'seed_songhyeon_task',
  ]) assert.match(sql.toLowerCase(), new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.doesNotMatch(sql, /iota_pmo_tasks|iota_seoul_logs/);
});

test('초기 76개 업무 문구도 Supabase seed migration으로 원장에 적재한다', async () => {
  const seed = await readFile('supabase/migrations/202608120003_songhyeon_task_board_seed.sql', 'utf8');
  assert.match(seed, /insert into public\.songhyeon_tasks/);
  assert.equal((seed.match(/'songhyeon-g[0-6]-ws\d{2}-t\d{2}'/g) || []).length, 76);
  assert.match(seed, /G4-WS02-T04/);
  assert.match(seed, /통합업무보드·상세·댓글·이슈관리 체계/);
  assert.match(seed, /on conflict \(source_key\) do nothing/);
});

test('필터 결과 0건이어도 20개 열 골격과 고정 표 너비를 유지한다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  assert.match(board, /function EmptyBoardRow/);
  assert.match(board, /data-task-board-empty-row/);
  assert.match(board, /조건에 맞는 통합 업무가 없습니다\./);
  assert.doesNotMatch(board, /<td colSpan="20"/);
  assert.match(board, /w-\[1200px\] min-w-\[1200px\] max-w-\[1200px\]/);
  assert.match(board, /w-\[2432px\] min-w-\[2432px\] max-w-\[2432px\]/);
});

test('송현 업무 목록·상세·편집에서 우선순위와 A~D 회의등급을 폐기한다', async () => {
  const [board, drawer, editor, repository] = await Promise.all([
    readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8'),
    readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8'),
    readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskEditorModal.jsx', 'utf8'),
    readFile('src/lib/songhyeonTaskRepository.js', 'utf8'),
  ]);
  for (const source of [board, drawer, editor]) assert.doesNotMatch(source, /priorityScore|meetingGrade|우선순위|회의상정등급|A_즉시상정|B_회의점검|C_주간관리|D_대기/);
  assert.doesNotMatch(repository, /withSonghyeonPriority/);
});

test('마일스톤 Task 상세은 같은 페이지 안에서 통합업무 상세 drawer를 제공한다', async () => {
  const schedule = await readFile('src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx', 'utf8');
  assert.match(schedule, /SonghyeonTaskDetailDrawer/);
  assert.match(schedule, /setEmbeddedTask\(task\)/);
  assert.doesNotMatch(schedule, /window\.location\.href = `\/tasks\?task=/);
});

test('완료 업무의 재개 action은 편집 workflow용으로 유지하되 목록·상세 빠른 처리에서는 숨긴다', async () => {
  const { taskWorkflowActions } = await import('../src/components/iota-songhyeon/task-board/songhyeonTaskWorkflowActions.js');
  const statuses = (status) => taskWorkflowActions(status).map((action) => action.status);

  assert.deepEqual(statuses('미착수'), ['진행중']);
  assert.deepEqual(statuses('진행중'), ['완료', '중단']);
  assert.deepEqual(statuses('완료'), ['진행중'], '완료 업무는 업무 수정 내부 workflow modal에서만 재개할 수 있어야 합니다.');
  assert.deepEqual(statuses('중단'), ['진행중']);
  assert.ok(statuses('보류').every((status) => status !== '보류'), 'legacy 입력에서도 보류 action을 다시 만들면 안 됩니다.');
  assert.deepEqual(statuses('지연'), ['완료', '중단'], 'legacy 지연은 진행중으로 정규화한 뒤 현재 action을 제공해야 합니다.');
  assert.ok(taskWorkflowActions('중단').find((action) => action.status === '진행중')?.requiresReason);

  const actions = await readFile('src/components/iota-songhyeon/task-board/songhyeonTaskWorkflowActions.js', 'utf8');
  assert.doesNotMatch(actions, /보류|\bhold\b/i, '빠른 상태처리 정의에 보류 action이 남으면 안 됩니다.');
});

test('상세 drawer는 본문 빠른 상태처리 박스를 제거하고 footer·편집 workflow를 유지한다', async () => {
  const [board, drawer, editor, modal, repository, actionSource] = await Promise.all([
    readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8'),
    readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8'),
    readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskEditorModal.jsx', 'utf8'),
    readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskWorkflowModal.jsx', 'utf8'),
    readFile('src/lib/songhyeonTaskRepository.js', 'utf8'),
    readFile('src/components/iota-songhyeon/task-board/songhyeonTaskWorkflowActions.js', 'utf8'),
  ]);
  const { taskWorkflowActions } = await import('../src/components/iota-songhyeon/task-board/songhyeonTaskWorkflowActions.js');

  const drawerHeaderClass = drawer.match(/<aside\s+data-task-detail-drawer[\s\S]{0,700}?<header\s+className="([^"]+)"/)?.[1] || '';
  assert.ok(drawerHeaderClass, '상세 drawer 최상단 header를 찾을 수 없습니다.');
  assert.match(drawerHeaderClass, /(?:^|\s)py-\[7px\](?:\s|$)/, '기존 py-3(상하 12px)를 7px로 줄여 전체 높이를 10px 줄여야 합니다.');
  assert.doesNotMatch(drawerHeaderClass, /(?:^|\s)py-3(?:\s|$)/);
  assert.doesNotMatch(drawerHeaderClass, /(?:^|\s)h-\[(?:50|60)px\](?:\s|$)/, '여러 네임택이 wrap될 수 있으므로 header를 고정 높이로 제한하면 안 됩니다.');

  const progressingActions = taskWorkflowActions('진행중');
  const completionAction = progressingActions.find((action) => action.status === '완료');
  assert.ok(completionAction, '진행중 업무의 완료 action이 유지돼야 합니다.');
  assert.equal(completionAction.label, '완료 처리', '진행중 업무에서 누르는 action과 완료 상태 안내 문구를 혼동하면 안 됩니다.');
  assert.deepEqual(progressingActions.map((action) => action.status), ['완료', '중단'], 'label 변경이 workflow 순서·목표 상태를 바꾸면 안 됩니다.');
  assert.deepEqual(taskWorkflowActions('완료').map((action) => action.status), ['진행중'], '업무 수정 내부의 안전한 재개 경로는 유지해야 합니다.');
  assert.match(actionSource, /\{\s*status:\s*'완료',\s*label:\s*'완료 처리'/);
  assert.doesNotMatch(actionSource, /Task가 완료\s+되었습니다/);
  assert.match(drawer, /task\.status\s*===\s*'완료'\s*\?[\s\S]{0,450}?Task가 완료되었습니다[\s\S]{0,250}?:[\s\S]{0,250}?\{task\.status\}/, '완료 상태 네임택은 정확한 문구로 더 명확하게 보여야 합니다.');
  assert.doesNotMatch(drawer, /Task가 완료 되었습니다/, '완료되었습니다는 띄어 쓰지 않습니다.');
  assert.doesNotMatch(drawer, /<section\s+aria-label=["']빠른 상태처리["']/, '미완료·완료 상태와 무관하게 상세 본문의 빠른 상태처리 박스는 노출하지 않아야 합니다.');
  assert.doesNotMatch(drawer, /workflowActions\.map\s*\(/, '본문에 workflow action 버튼 목록을 다시 추가하면 안 됩니다.');
  const drawerFooter = drawer.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] || '';
  assert.ok(drawerFooter, '상세 drawer footer를 찾을 수 없습니다.');
  assert.match(drawerFooter, /\{task\.status\s*!==\s*'완료'\s*&&\s*<button[\s\S]{0,350}?onClick=\{\(\) => setWorkflowTargetStatus\(workflowActions\[0\]\?\.status \|\| ''\)\}[\s\S]*?>상태 처리<\/button>\}/, '미완료 업무의 footer 상태 처리 경로는 유지해야 합니다.');
  assert.match(drawerFooter, /onClick=\{\(\) => setEditorOpen\(true\)\}[\s\S]{0,260}?>업무 수정하기<\/button>/, '상세 footer의 업무 수정 진입은 유지해야 합니다.');
  assert.match(editor, /isEditing\s*\?\s*<button[^>]*onClick=\{\(\) => setWorkflowOpen\(true\)\}[\s\S]{0,350}?>상태 변경<\/button>/, '본문 박스 제거 후에도 업무 수정 내부에서 상태를 변경할 수 있어야 합니다.');
  assert.match(drawer, /\{workflowTargetStatus\s*&&\s*!detailReadOnly\s*&&\s*<SonghyeonTaskWorkflowModal/, 'footer 상태 처리는 active 업무에서 기존 workflow modal을 계속 열어야 합니다.');
  assert.match(board, /archived\s*\|\|\s*isReadOnly\s*\|\|\s*task\.status\s*===\s*'완료'\s*\?\s*<span[\s\S]{0,450}?\{task\.status\}<\/span>\s*:\s*<button/, '보드의 완료·보관 상태는 클릭 가능한 빠른 처리 버튼이 아니라 정적 네임택이어야 합니다.');
  assert.match(modal, /const isCompletion = targetStatus === '완료'/);
  assert.match(modal, /completeTask\(task\.sourceKey, \{ summary, evidenceUrl \}, actor\)/);
  assert.match(repository, /export const completeTask[\s\S]{0,800}?transitionTaskWorkflow\(sourceKey, 'complete'/, '완료 API action은 complete로 유지돼야 합니다.');
});

test('완료 상세의 상태·중요도·회의상정 네임택은 모두 같은 높이로 정렬된다', async () => {
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');

  const sharedClass = drawer.match(/const\s+taskDetailBadgeClass\s*=\s*(['"`])([^'"`\n]+)\1/)?.[2] || '';
  assert.ok(sharedClass, '상세 상태 네임택의 공통 크기 클래스를 찾을 수 없습니다.');
  assert.match(sharedClass, /(?:^|\s)inline-flex(?:\s|$)/, '공통 네임택 크기는 inline-flex로 적용해야 합니다.');
  assert.match(sharedClass, /(?:^|\s)items-center(?:\s|$)/, '공통 네임택 내용은 수직 중앙 정렬돼야 합니다.');
  const sharedHeight = sharedClass.split(/\s+/).find((token) => /^h-(?:\[[^\]]+\]|\d+(?:\.\d+)?)$/.test(token));
  assert.ok(sharedHeight, '공통 네임택에 명시적인 높이 클래스가 필요합니다.');

  const completedClass = drawer.match(/task\.status\s*===\s*'완료'\s*\?\s*\(?\s*<span\s+className=\{`([^`]*)`\}/)?.[1] || '';
  const importanceClass = drawer.match(/<span\s+className=\{`([^`]*?)\$\{importanceBadgeClass\(task\.importanceLevel\)\}`\}>/)?.[1] || '';
  const agendaClass = drawer.match(/<span\s+className=\{`([^`]*)`\}[^>]*>\{task\.meetingAgenda\s*\?\s*'회의상정'\s*:\s*'미상정'\}/)?.[1] || '';
  const badges = [
    ['완료', completedClass],
    ['중요도', importanceClass],
    ['회의상정', agendaClass],
  ];

  for (const [name, className] of badges) {
    assert.ok(className, `${name} 네임택 클래스를 찾을 수 없습니다.`);
    assert.match(className, /\$\{taskDetailBadgeClass\}/, `${name} 네임택은 공통 높이 클래스를 사용해야 합니다.`);
    const localHeight = className.split(/\s+/).find((token) => /^h-(?:\[[^\]]+\]|\d+(?:\.\d+)?)$/.test(token));
    assert.equal(localHeight, undefined, `${name} 네임택이 공통 높이 ${sharedHeight}를 별도 높이로 덮어쓰면 안 됩니다.`);
  }
});

test('완료는 내용을 필수로, 증빙 URL을 선택으로 받고 중단·재개는 사유를 필수로 받는다', async () => {
  const modal = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskWorkflowModal.jsx', 'utf8');
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');

  for (const api of ['startTask', 'completeTask', 'stopTask', 'resumeTask']) {
    assert.match(modal, new RegExp(`\\b${api}\\b`), `상태 처리 API 연결 누락: ${api}`);
  }
  assert.doesNotMatch(modal, /holdTask|isHold|보류/, '상태 처리 modal에 보류 분기나 문구가 남으면 안 됩니다.');
  assert.match(modal, /if \(isCompletion && !summary\)/);
  assert.match(modal, /완료한 내용을 입력해 주세요/);
  assert.match(modal, /완료 내용 <span[^>]*>필수<\/span>/);
  assert.match(modal, /완료 증빙 URL <span[^>]*>선택<\/span>/);
  assert.match(modal, /if \(evidenceUrl && !\/\^https:/, '입력한 URL만 검증해야 합니다.');
  assert.doesNotMatch(modal, /isCompletion && !evidenceUrl|!summary \|\| !evidenceUrl/, '완료 증빙 URL을 필수로 강제하면 안 됩니다.');
  assert.match(modal, /const requiresReason = isStop \|\| selectedAction\?\.requiresReason/);
  assert.match(modal, /if \(requiresReason && !reason\)/);
  assert.match(modal, /completeTask\(task\.sourceKey, \{ summary, evidenceUrl \}, actor\)/);
  assert.match(modal, /stopTask\(task\.sourceKey, \{ reason \}, actor\)/);
  assert.match(modal, /resumeTask\(task\.sourceKey, \{ reason \}, actor\)/);
  for (const action of ['task_started', 'task_completed', 'task_held', 'task_stopped', 'task_resumed', 'task_archived']) {
    assert.match(drawer, new RegExp(`item\\.action === '${action}'`), `상태 처리 이력 표시 누락: ${action}`);
  }
  assert.doesNotMatch(drawer, /업무 보류|action\.status === '보류'/, 'legacy 보류 이력도 현재 UI에서는 중단으로 설명해야 합니다.');
});

test('전기영만 신규 등록·보관 UI를 보고 다른 활성 멤버도 업무 수정 안의 workflow로 상태를 변경한다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');
  const editor = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskEditorModal.jsx', 'utf8');

  assert.match(board, /const canCreateAndArchive = !isReadOnly && member\?\.staff_name === '전기영' && user\?\.email\?\.toLowerCase\(\) === 'jk\.jeon@igisam\.com'/);
  assert.match(board, /actions=\{canCreateAndArchive \? <button[\s\S]{0,700}>\+ 새 업무 추가<\/button> : null\}/);
  assert.match(board, /\{isEditorOpen && canCreateAndArchive && <SonghyeonTaskEditorModal/);
  assert.match(board, /\{archiveTarget && canCreateAndArchive && \(/);
  assert.match(board, /\{!archived && canCreateAndArchive && <><span[^>]*>\|<\/span><button[\s\S]{0,400}>보관<\/button><\/>\}/);
  assert.match(board, /archived\s*\|\|\s*isReadOnly\s*\|\|\s*task\.status\s*===\s*'완료'\s*\?\s*<span[\s\S]{0,500}:\s*<button[\s\S]{0,350}setWorkflowTask\(task\)[\s\S]{0,350}aria-label=\{`\$\{task\.taskName\} 상태 처리/, '일반 멤버는 active 미완료 업무만 표에서 빠른 상태처리를 사용할 수 있어야 합니다.');
  assert.match(board, /<button[\s\S]{0,350}if \(archived \|\| isReadOnly\) openTask\(task\); else setEditingTask\(task\);[\s\S]{0,250}>\{archived \|\| isReadOnly \? '상세' : '수정'\}<\/button>/);
  assert.doesNotMatch(board, /canCreateAndArchive && <button[\s\S]{0,300}setWorkflowTask\(task\)/, '일반 멤버의 상태 처리를 숨기면 안 됩니다.');
  assert.match(drawer, /<SonghyeonTaskWorkflowModal/);
  assert.match(drawer, />업무 수정하기<\/button>/);
  assert.match(drawer, /\{canArchive && !detailReadOnly \? <button[\s\S]{0,500}>업무 보관<\/button>/);

  assert.match(editor, /import SonghyeonTaskWorkflowModal from ['"]\.\/SonghyeonTaskWorkflowModal\.jsx['"]/);
  assert.match(editor, /const \[workflowOpen,\s*setWorkflowOpen\] = useState\(false\)/);
  assert.match(editor, /isEditing\s*\?\s*<button[^>]*onClick=\{\(\) => setWorkflowOpen\(true\)\}[\s\S]{0,350}?>상태 변경<\/button>/, '기존 업무의 상태 변경은 편집 화면 안의 명시적 버튼으로 시작해야 합니다.');
  assert.match(editor, /신규 업무는 미착수로 등록됩니다\./, '신규 업무의 최초 상태는 미착수로 고정해야 합니다.');
  assert.doesNotMatch(editor, /<select\s+value=\{form\.status\}/, '일반 편집 select로 workflow RPC를 우회하면 안 됩니다.');
  assert.match(editor, /\{workflowOpen\s*&&\s*isEditing\s*&&\s*<SonghyeonTaskWorkflowModal[\s\S]{0,350}?onSaved=\{saveWorkflowResult\}/);
});

test('업무 수정에서 바꾼 상태는 직접 DML 없이 RPC로 저장되고 변경 이력에 남는다', async () => {
  const [editor, drawer, modal, repository, migration] = await Promise.all([
    readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskEditorModal.jsx', 'utf8'),
    readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8'),
    readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskWorkflowModal.jsx', 'utf8'),
    readFile('src/lib/songhyeonTaskRepository.js', 'utf8'),
    readFile('supabase/migrations/202608140002_songhyeon_task_remove_hold.sql', 'utf8'),
  ]);
  const updateBlock = repository.match(/export async function updateTask[\s\S]*?(?=\nexport async function)/)?.[0] || '';
  const transitionFunction = migration.match(/create or replace function public\.transition_songhyeon_task_workflow[\s\S]*?\n\$\$;/i)?.[0] || '';

  assert.ok(updateBlock, 'updateTask repository 구현을 찾을 수 없습니다.');
  assert.doesNotMatch(updateBlock, /from\('songhyeon_tasks'\)\.update\(|addActivity\(/, '상태와 이력을 클라이언트의 분리된 직접 요청으로 저장하면 안 됩니다.');
  assert.match(updateBlock, /rpc\('update_songhyeon_task_atomic'/, '일반 수정도 DB RPC를 통과해야 합니다.');
  assert.match(updateBlock, /normalizedPatch\.status\s*!==\s*undefined\s*&&\s*normalizedPatch\.status\s*!==\s*current\.status[\s\S]{0,180}?상태는 전용 상태 변경 기능에서 변경해 주세요\./, '일반 updateTask의 status 우회 차단을 유지해야 합니다.');
  assert.match(modal, /completeTask\(|resumeTask\(|startTask\(|stopTask\(/, '편집 상태 변경 modal은 기존 workflow repository API를 재사용해야 합니다.');
  assert.match(repository, /rpc\('transition_songhyeon_task_workflow'/);
  assert.ok(transitionFunction, '최종 workflow RPC SQL을 찾을 수 없습니다.');
  assert.match(transitionFunction, /expected_version/i, '상태 변경은 version 충돌을 검사해야 합니다.');
  assert.match(transitionFunction, /insert into public\.songhyeon_task_activity/i, '상태와 변경 이력은 같은 RPC 트랜잭션에서 기록해야 합니다.');

  const saveResult = editor.match(/const saveWorkflowResult = async[\s\S]*?\n\s*};/)?.[0] || '';
  assert.ok(saveResult, '편집 modal의 workflow 완료 handler를 찾을 수 없습니다.');
  assert.match(saveResult, /status:\s*updated\.status/);
  assert.match(saveResult, /version:\s*updated\.version/, 'workflow 저장 뒤 최신 version을 form에 합쳐 후속 일반 수정의 충돌을 막아야 합니다.');
  assert.match(saveResult, /setWorkflowOpen\(false\)/);
  assert.match(saveResult, /await onWorkflowSaved\?\.\(updated\)/, '상위 상세·보드에도 최신 상태를 전달해야 합니다.');
  assert.match(drawer, /onWorkflowSaved=\{async \(updated\) => \{ setActivity\(await loadActivity\(task\.sourceKey\)\); onSaved\(updated\); \}\}/, '상태 변경 뒤 변경 이력을 다시 읽고 상세 원장을 갱신해야 합니다.');
});

test('업무 workflow repository는 RPC 트랜잭션만 사용하고 보관 업무를 기본 목록에서 제외한다', async () => {
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');

  assert.match(repository, /from\('songhyeon_tasks'\)\.select\('\*'\)\.is\('archived_at', null\)\.order\('display_order'\)/);
  for (const api of ['startTask', 'completeTask', 'stopTask', 'resumeTask', 'archiveTask']) {
    assert.match(repository, new RegExp(`export (?:async function|const) ${api}\\b`), `repository wrapper 누락: ${api}`);
  }
  assert.doesNotMatch(repository, /export (?:async function|const) holdTask\b|transitionWithReason\([^\n]*['"]hold['"]/, 'repository가 보류 workflow를 노출하면 안 됩니다.');
  assert.match(repository, /export async function transitionTaskWorkflow\b/);
  assert.match(repository, /rpc\('transition_songhyeon_task_workflow'/);
  assert.match(repository, /rpc\('create_songhyeon_task_atomic'/);
  assert.match(repository, /rpc\('update_songhyeon_task_atomic'/);
  assert.match(repository, /rpc\('archive_songhyeon_task'/);
  assert.match(repository, /version: row\.version/);
  assert.match(repository, /expected_version: patch\.version \?\? currentRow\.version \?\? 1/);
  assert.match(repository, /expected_version: currentRow\.version \?\? 1/);
  assert.match(repository, /completeTask[\s\S]*summary: String\(summary\)\.trim\(\), evidenceUrl: String\(evidenceUrl\)\.trim\(\)/);
  assert.match(repository, /transitionWithReason[\s\S]*reason: cleanReason/);

  const updateBlock = repository.match(/export async function updateTask[\s\S]*?(?=\nexport async function)/)?.[0] || '';
  assert.ok(updateBlock, 'updateTask 구현을 찾을 수 없습니다.');
  assert.doesNotMatch(updateBlock, /\.update\(|addActivity\(/, '업무 수정과 이력을 클라이언트의 두 번의 요청으로 분리하면 안 됩니다.');
  const transitionBlock = repository.match(/export async function transitionTaskWorkflow[\s\S]*?(?=\nexport async function)/)?.[0] || '';
  assert.ok(transitionBlock);
  assert.doesNotMatch(transitionBlock, /\.update\(|addActivity\(/, '상태변경과 이력은 하나의 DB RPC 트랜잭션이어야 합니다.');
  assert.doesNotMatch(repository, /from\('songhyeon_tasks'\)\.delete\(/, '보관은 물리 삭제가 아니어야 합니다.');
});

test('최초 workflow SQL은 전기영 등록·보관, 활성 멤버 수정·상태변경을 DB에서 강제한다', async () => {
  const migration = await readFile('supabase/migrations/202608130014_songhyeon_task_workflow.sql', 'utf8');

  assert.match(migration, /alter table public\.songhyeon_tasks[\s\S]*add column if not exists archived_at timestamptz/i);
  assert.match(migration, /add column if not exists archived_by uuid/i);
  assert.match(migration, /add column if not exists archive_reason text/i);
  assert.match(migration, /add column if not exists version integer/i);
  assert.match(migration, /m\.auth_id = auth\.uid\(\)[\s\S]*m\.is_active[\s\S]*m\.staff_name = '전기영'[\s\S]*(?:lower\()?m\.email\)? = 'jk\.jeon@igisam\.com'/i);

  for (const fn of [
    'create_songhyeon_task_atomic',
    'update_songhyeon_task_atomic',
    'transition_songhyeon_task_workflow',
    'archive_songhyeon_task',
  ]) {
    assert.match(migration, new RegExp(`create or replace function public\\.${fn}\\b`, 'i'), `RPC 누락: ${fn}`);
    assert.match(migration, new RegExp(`revoke all on function public\\.${fn}\\([^;]+\\) from public`, 'i'));
    assert.match(migration, new RegExp(`grant execute on function public\\.${fn}[\\s\\S]*to authenticated`, 'i'));
  }

  const createFunction = migration.match(/create or replace function public\.create_songhyeon_task_atomic[\s\S]*?\n\$\$;/i)?.[0] || '';
  const updateFunction = migration.match(/create or replace function public\.update_songhyeon_task_atomic[\s\S]*?\n\$\$;/i)?.[0] || '';
  const transitionFunction = migration.match(/create or replace function public\.transition_songhyeon_task_workflow[\s\S]*?\n\$\$;/i)?.[0] || '';
  const archiveFunction = migration.match(/create or replace function public\.archive_songhyeon_task[\s\S]*?\n\$\$;/i)?.[0] || '';
  for (const [name, sql] of Object.entries({ createFunction, updateFunction, transitionFunction, archiveFunction })) {
    assert.ok(sql, `${name} SQL 바디를 찾을 수 없습니다.`);
    assert.match(sql, /security definer/i);
  }
  assert.match(createFunction, /is_jeon_giyoung_songhyeon_task_owner|staff_name = '전기영'/i);
  assert.match(createFunction, /canonical_payload[\s\S]*jsonb_build_object[\s\S]*'status'\s*,\s*'미착수'/i, '신규 업무는 DB에서 미착수로 강제해야 합니다.');
  assert.match(createFunction, /insert into public\.songhyeon_task_activity[\s\S]*'task_seeded'/i);
  assert.match(updateFunction, /from public\.songhyeon_members[\s\S]*m\.auth_id = auth\.uid\(\)[\s\S]*m\.is_active/i);
  assert.match(updateFunction, /SONGHYEON_MEMBERSHIP_REQUIRED/i);
  assert.match(updateFunction, /current_task\.archived_at is not null[\s\S]*SONGHYEON_TASK_NOT_FOUND/i);
  assert.match(updateFunction, /expected_version/i);
  assert.match(updateFunction, /version\s*=\s*current_task\.version\s*\+\s*1/i);
  assert.match(updateFunction, /requested_status <> current_status[\s\S]*SONGHYEON_TASK_WORKFLOW_REQUIRED/i, '일반 수정 RPC로 상태를 우회 변경하면 안 됩니다.');
  assert.match(updateFunction, /clean_patch[\s\S]*- 'status'/i);
  assert.match(updateFunction, /- 'archiveReason' - 'version'\s*- 'displayOrder'/i, '파생 displayOrder가 허위 변경 이력에 들어가면 안 됩니다.');
  assert.match(updateFunction, /insert into public\.songhyeon_task_activity/i);

  const seedFunction = migration.match(/create or replace function public\.seed_songhyeon_task[\s\S]*?\n\$\$;/i)?.[0] || '';
  assert.match(seedFunction, /when seed_payload ->> 'status' in \('미착수', '진행중'\)/i);
  assert.match(seedFunction, /else '미착수'/i, '초기 적재도 완료·종료 상태를 우회 생성하면 안 됩니다.');

  assert.match(transitionFunction, /from public\.songhyeon_members[\s\S]*m\.auth_id = auth\.uid\(\)[\s\S]*m\.is_active/i);
  assert.match(transitionFunction, /SONGHYEON_MEMBERSHIP_REQUIRED/i);
  assert.match(transitionFunction, /current_task\.archived_at is not null[\s\S]*SONGHYEON_TASK_NOT_FOUND/i);
  for (const status of ['미착수', '진행중', '완료', '중단']) assert.match(transitionFunction, new RegExp(status));
  assert.match(transitionFunction, /summary_text text := trim[\s\S]*summary/i);
  assert.match(transitionFunction, /summary_text = ''[\s\S]*SONGHYEON_TASK_COMPLETION_SUMMARY_REQUIRED/i);
  assert.doesNotMatch(transitionFunction, /(?:evidence|url)[\s\S]{0,100}(?:is null|= '')[\s\S]{0,100}raise exception/i, '증빙 URL을 완료 필수값으로 강제하면 안 됩니다.');
  assert.match(transitionFunction, /reason_text text := trim[\s\S]*reason/i);
  for (const action of ['stop', 'resume']) {
    assert.match(transitionFunction, new RegExp(`when '${action}'[\\s\\S]*?reason_text = ''[\\s\\S]*?SONGHYEON_TASK_REASON_REQUIRED`, 'i'));
  }
  assert.match(transitionFunction, /insert into public\.songhyeon_task_activity/i);

  assert.match(archiveFunction, /is_jeon_giyoung_songhyeon_task_owner|staff_name = '전기영'/i);
  assert.match(archiveFunction, /update public\.songhyeon_tasks[\s\S]*archived_at\s*=/i);
  assert.match(archiveFunction, /insert into public\.songhyeon_task_activity[\s\S]*'task_archived'/i);
  assert.doesNotMatch(archiveFunction, /delete from public\.songhyeon_tasks/i);
  for (const policy of ['songhyeon members seed tasks', 'songhyeon members update tasks', 'songhyeon members delete tasks']) {
    assert.match(migration, new RegExp(`drop policy if exists "${policy}" on public\\.songhyeon_tasks`, 'i'), `기존 direct DML RLS policy 제거 누락: ${policy}`);
  }
  assert.match(migration, /revoke (?:insert, update, delete|all) on (?:table )?public\.songhyeon_tasks from authenticated/i);
  assert.match(migration, /revoke all on function public\.seed_songhyeon_task\(text\s*,\s*text\s*,\s*integer\s*,\s*jsonb\) from public/i);
  assert.match(migration, /grant execute on function public\.seed_songhyeon_task\(text\s*,\s*text\s*,\s*integer\s*,\s*jsonb\) to authenticated/i);
  assert.match(migration, /drop policy if exists "songhyeon members add own discussion activity"/i, 'workflow migration은 재실행 가능해야 합니다.');
  assert.match(migration, /create policy "songhyeon members add own discussion activity"[\s\S]*action in \('comment_added', 'comment_deleted'\)/i);
  for (const action of ['task_started', 'task_completed', 'task_stopped', 'task_resumed', 'task_archived']) {
    assert.match(migration, new RegExp(action), `업무 이력 action constraint 누락: ${action}`);
  }
  assert.doesNotMatch(migration, /(?:insert into|update|delete from|alter table|create (?:or replace )?function)[\s\S]{0,80}(?:public\.)?iota_/i);
});

test('보류 제거 migration은 legacy 원장을 중단으로 이관하고 RPC 허용 상태·action을 4개로 제한한다', async () => {
  const migration = await readFile('supabase/migrations/202608140002_songhyeon_task_remove_hold.sql', 'utf8');
  const updateStatements = [...migration.matchAll(/update\s+public\.[a-z0-9_]+[\s\S]*?;/gi)].map((match) => match[0]);
  const taskCleanup = updateStatements.find((statement) => /public\.songhyeon_tasks\b/i.test(statement)) || '';
  const scheduleCleanup = updateStatements.find((statement) => /public\.songhyeon_schedule_overrides\b/i.test(statement)) || '';

  assert.ok(taskCleanup, '기존 업무 payload 정리 UPDATE가 필요합니다.');
  assert.match(taskCleanup, /보류/);
  assert.match(taskCleanup, /중단/);
  assert.match(taskCleanup, /where[\s\S]*?status[\s\S]{0,80}?\bin\s*\(\s*'보류'\s*,\s*'on_hold'\s*\)/i, '업무 원장의 두 legacy 표기를 정확히 골라야 합니다.');
  assert.match(taskCleanup, /version\s*=\s*(?:coalesce\s*\([^)]*\)|[a-z0-9_.]+)\s*\+\s*1/i, 'legacy 이관도 version을 올려 동시성 토큰을 갱신해야 합니다.');
  assert.doesNotMatch(taskCleanup, /archived_at\s+is\s+null/i, '보관된 legacy 업무도 빠짐없이 중단으로 이관해야 합니다.');
  assert.ok(scheduleCleanup, '기존 일정 override 정리 UPDATE가 필요합니다.');
  assert.match(scheduleCleanup, /where[\s\S]*?status[\s\S]{0,80}?\bin\s*\(\s*'보류'\s*,\s*'on_hold'\s*\)/i);
  assert.match(scheduleCleanup, /cancelled/i);

  const statusConstraint = migration.match(/add\s+constraint\s+[^;]*?status[^;]*?check\s*\([\s\S]*?\)\s*;/i)?.[0] || '';
  assert.ok(statusConstraint, 'songhyeon_tasks payload의 정식 상태 CHECK constraint가 필요합니다.');
  for (const status of ['미착수', '진행중', '완료', '중단']) assert.match(statusConstraint, new RegExp(`'${status}'`));
  assert.doesNotMatch(statusConstraint, /'보류'/, 'DB 허용 상태에 보류를 포함하면 안 됩니다.');
  const scheduleStatusConstraint = migration.match(/add\s+constraint\s+songhyeon_schedule_overrides_status_check[\s\S]*?check\s*\([\s\S]*?\)\s*;/i)?.[0] || '';
  assert.ok(scheduleStatusConstraint, '일정 override도 허용 상태 CHECK constraint가 필요합니다.');
  assert.match(scheduleStatusConstraint, /'cancelled'/);
  assert.doesNotMatch(scheduleStatusConstraint, /'on_hold'|'보류'/, '일정 원장이 legacy 보류 상태를 다시 저장하면 안 됩니다.');

  const transitionFunction = migration.match(/create or replace function public\.transition_songhyeon_task_workflow[\s\S]*?\n\$\$;/i)?.[0] || '';
  assert.ok(transitionFunction, '보류를 제거한 transition RPC 재정의가 필요합니다.');
  assert.match(transitionFunction, /security definer/i);
  assert.match(transitionFunction, /from public\.songhyeon_members[\s\S]*m\.auth_id = auth\.uid\(\)[\s\S]*m\.is_active/i);
  assert.match(transitionFunction, /expected_version/i, '상태 전환의 optimistic concurrency를 유지해야 합니다.');
  for (const action of ['start', 'complete', 'stop', 'resume']) {
    assert.match(transitionFunction, new RegExp(`when\\s+'${action}'`, 'i'), `허용 workflow action 누락: ${action}`);
  }
  assert.doesNotMatch(transitionFunction, /when\s+'hold'|to_status\s*:?=\s*'보류'/i, '보류 action이나 목표 상태를 RPC가 생성하면 안 됩니다.');
  assert.match(transitionFunction, /when\s+'stop'[\s\S]*?(?:from|current)_status\s*<>\s*'진행중'/i, '중단은 진행중 업무에서만 허용해야 합니다.');
  assert.match(transitionFunction, /when\s+'resume'[\s\S]*?(?:from|current)_status\s+not\s+in\s*\(\s*'완료'\s*,\s*'중단'\s*\)/i, '재개는 완료·중단 상태에서만 허용해야 합니다.');
  assert.match(transitionFunction, /when\s+'stop'[\s\S]*?reason_text\s*=\s*''[\s\S]*?SONGHYEON_TASK_REASON_REQUIRED/i);
  assert.match(transitionFunction, /when\s+'resume'[\s\S]*?reason_text\s*=\s*''[\s\S]*?SONGHYEON_TASK_REASON_REQUIRED/i);
  assert.match(transitionFunction, /insert into public\.songhyeon_task_activity/i, '상태와 이력은 같은 RPC 트랜잭션에서 기록해야 합니다.');

  assert.doesNotMatch(migration, /\biota_[a-z0-9_]+\b/i, '송현 보류 정리는 IOTA 원장과 격리돼야 합니다.');
});

test('업무 workflow 강화는 송현 댓글·대댓글·반응 경로를 변경하지 않는다', async () => {
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');
  const migration = await readFile('supabase/migrations/202608130014_songhyeon_task_workflow.sql', 'utf8');

  for (const api of ['loadComments', 'addComment', 'deleteComment', 'addReply', 'deleteReply', 'toggleCommentReaction', 'toggleReplyReaction']) {
    assert.match(repository, new RegExp(`export async function ${api}\\b`), `기존 협업 API 누락: ${api}`);
  }
  for (const table of [
    'songhyeon_task_comments',
    'songhyeon_task_comment_replies',
    'songhyeon_task_comment_reactions',
    'songhyeon_task_reply_reactions',
  ]) assert.doesNotMatch(migration, new RegExp(`(?:drop table|truncate|delete from|alter table)\\s+(?:public\\.)?${table}`, 'i'), `기존 협업 원장 변경 금지: ${table}`);
  assert.doesNotMatch(`${repository}\n${migration}`, /(?:from\('|rpc\('|insert into|update|delete from|alter table)\s*(?:public\.)?iota_/i);
});

test('댓글·대댓글 수정 RPC는 활성 작성자 본인만 서버 시각으로 내용을 바꿀 수 있다', async () => {
  const migration = await readFile('supabase/migrations/202608140001_songhyeon_task_comment_edit.sql', 'utf8');
  const rpcNames = [
    ['update_songhyeon_task_comment', 'songhyeon_task_comments'],
    ['update_songhyeon_task_reply', 'songhyeon_task_comment_replies'],
  ];

  for (const table of ['songhyeon_task_comments', 'songhyeon_task_comment_replies']) {
    assert.match(
      migration,
      new RegExp(`alter table public\\.${table}[\\s\\S]*?add column if not exists edited_at\\s+timestamptz`, 'i'),
      `${table}.edited_at 누락`,
    );
    assert.ok(
      new RegExp(`revoke\\s+(?:update|all)\\s+on\\s+(?:table\\s+)?public\\.${table}\\s+from\\s+(?:public\\s*,\\s*anon\\s*,\\s*)?authenticated`, 'i').test(migration),
      `${table} direct UPDATE 권한을 명시적으로 차단해야 합니다.`,
    );
    assert.doesNotMatch(
      migration,
      new RegExp(`grant\\s+[^;]*\\bupdate\\b[^;]*\\bon\\s+(?:table\\s+)?public\\.${table}\\s+to\\s+authenticated`, 'i'),
      `${table}에 authenticated direct UPDATE를 부여하면 안 됩니다.`,
    );
  }

  for (const [rpcName, table] of rpcNames) {
    const match = migration.match(new RegExp(
      `create or replace function public\\.${rpcName}\\s*\\(([^)]*)\\)([\\s\\S]*?)\\$\\$\\s*;`,
      'i',
    ));
    assert.ok(match, `작성자 전용 RPC 누락: ${rpcName}`);
    const signature = match[1].replace(/\s+/g, ' ').trim();
    const sqlFunction = match[0];
    assert.match(signature, /^(?:[a-z_][a-z0-9_]*\s+)?text\s*,\s*(?:[a-z_][a-z0-9_]*\s+)?text$/i, `${rpcName}는 정확히 text 인자 2개여야 합니다.`);
    assert.match(sqlFunction, /language\s+plpgsql/i);
    assert.match(sqlFunction, /security\s+definer/i);
    assert.match(sqlFunction, /set\s+search_path\s*=\s*public/i);
    assert.ok(
      /public\.is_songhyeon_member\s*\(/i.test(sqlFunction)
        || /from\s+public\.songhyeon_members[\s\S]{0,240}?auth_id\s*=\s*(?:auth\.uid\s*\(\s*\)|current_[a-z0-9_]+)[\s\S]{0,160}?is_active/i.test(sqlFunction),
      `${rpcName}는 활성 송현 멤버를 확인해야 합니다.`,
    );
    assert.match(sqlFunction, /auth\.uid\s*\(\s*\)/i);
    assert.match(sqlFunction, /(?:btrim|trim)\s*\(/i, `${rpcName}는 저장 전 입력을 trim해야 합니다.`);
    assert.match(
      sqlFunction,
      /if\s+[\s\S]{0,220}?(?:=\s*''|is\s+null)[\s\S]{0,220}?raise\s+exception/i,
      `${rpcName}는 trim한 빈 문자열을 거부해야 합니다.`,
    );
    assert.match(sqlFunction, new RegExp(`update\\s+public\\.${table}\\b`, 'i'));
    assert.match(sqlFunction, /\bbody\s*=/i);
    assert.match(
      sqlFunction,
      /\bupdated_at\s*=\s*(?:now|statement_timestamp|transaction_timestamp|clock_timestamp)\s*\(\s*\)/i,
      `${rpcName} updated_at은 서버 시각이어야 합니다.`,
    );
    assert.ok(
      /author_id[\s\S]{0,140}?(?:=|<>|!=)[\s\S]{0,140}?(?:auth\.uid\s*\(\s*\)|(?:current|viewer|actor|requester)_[a-z0-9_]+)/i.test(sqlFunction)
        || /(?:auth\.uid\s*\(\s*\)|(?:current|viewer|actor|requester)_[a-z0-9_]+)[\s\S]{0,140}?(?:=|<>|!=)[\s\S]{0,140}?author_id/i.test(sqlFunction),
      `${rpcName}는 auth.uid()와 원문 author_id를 서버에서 비교해야 합니다.`,
    );
    assert.match(
      migration,
      new RegExp(`revoke all on function public\\.${rpcName}\\(text\\s*,\\s*text\\) from (?:public(?:\\s*,\\s*anon)?|anon)`, 'i'),
    );
    assert.match(
      migration,
      new RegExp(`grant execute on function public\\.${rpcName}\\(text\\s*,\\s*text\\) to authenticated`, 'i'),
    );
  }

  assert.doesNotMatch(migration, /\biota_[a-z0-9_]+\b/i);
});

test('댓글 수정 운영 호환 fix는 no-arg 멤버십과 null-safe 작성자 검사·단일 서버 시각을 사용한다', async () => {
  const baseMigration = await readFile('supabase/migrations/202608140001_songhyeon_task_comment_edit.sql', 'utf8');
  const fixMigration = await readFile('supabase/migrations/202608140003_songhyeon_task_comment_edit_member_check_fix.sql', 'utf8');
  const rpcNames = [
    ['update_songhyeon_task_comment', 'songhyeon_task_comments', 'current_comment'],
    ['update_songhyeon_task_reply', 'songhyeon_task_comment_replies', 'current_reply'],
  ];

  for (const [rpcName, table, rowVariable] of rpcNames) {
    const match = fixMigration.match(new RegExp(
      `create or replace function public\\.${rpcName}\\s*\\(([^)]*)\\)([\\s\\S]*?)\\$\\$\\s*;`,
      'i',
    ));
    assert.ok(match, `운영 호환 RPC 재정의 누락: ${rpcName}`);
    const signature = match[1].replace(/\s+/g, ' ').trim();
    const sqlFunction = match[0];
    assert.match(signature, /^(?:[a-z_][a-z0-9_]*\s+)?text\s*,\s*(?:[a-z_][a-z0-9_]*\s+)?text$/i);

    const membershipCalls = [...sqlFunction.matchAll(/public\.is_songhyeon_member\s*\(([^)]*)\)/gi)];
    assert.equal(membershipCalls.length, 1, `${rpcName}는 운영 helper를 정확히 한 번 호출해야 합니다.`);
    assert.equal(membershipCalls[0][1].trim(), '', `${rpcName}는 운영 DB의 no-arg helper만 호출해야 합니다.`);
    assert.doesNotMatch(sqlFunction, /is_songhyeon_member\s*\(\s*(?:current_actor_id|auth\.uid\s*\(\s*\)|[^)\s][^)]*)\s*\)/i, 'UUID 인자를 넘기면 remote에서 PostgreSQL 42883이 재발합니다.');

    assert.match(
      sqlFunction,
      new RegExp(`${rowVariable}\\.author_id\\s+is\\s+distinct\\s+from\\s+current_actor_id`, 'i'),
      `${rpcName} 작성자 검사는 NULL에도 안전한 IS DISTINCT FROM이어야 합니다.`,
    );
    assert.doesNotMatch(sqlFunction, new RegExp(`${rowVariable}\\.author_id\\s*(?:<>|!=)\\s*current_actor_id`, 'i'));

    const timestampDeclaration = sqlFunction.match(/\b([a-z_][a-z0-9_]*)\s+timestamptz\s*:=\s*statement_timestamp\s*\(\s*\)/i);
    assert.ok(timestampDeclaration, `${rpcName}는 DB 서버 시각을 변수에 한 번 고정해야 합니다.`);
    const timestampVariable = timestampDeclaration[1];
    assert.equal((sqlFunction.match(/\bstatement_timestamp\s*\(\s*\)/gi) || []).length, 1, `${rpcName}는 서버 시각을 두 번 계산하면 안 됩니다.`);
    assert.match(sqlFunction, new RegExp(`updated_at\\s*=\\s*${timestampVariable}\\b`, 'i'));
    assert.match(sqlFunction, new RegExp(`edited_at\\s*=\\s*${timestampVariable}\\b`, 'i'));
    assert.match(sqlFunction, new RegExp(`update\\s+public\\.${table}\\b`, 'i'));
    assert.match(sqlFunction, /returning\s+(?:comment|reply)\.\*\s+into\s+current_(?:comment|reply)/i);

    assert.match(
      fixMigration,
      new RegExp(`revoke all on function public\\.${rpcName}\\(text\\s*,\\s*text\\) from public\\s*,\\s*anon\\s*,\\s*authenticated`, 'i'),
    );
    assert.match(
      fixMigration,
      new RegExp(`grant execute on function public\\.${rpcName}\\(text\\s*,\\s*text\\) to authenticated`, 'i'),
    );
  }

  for (const table of ['songhyeon_task_comments', 'songhyeon_task_comment_replies']) {
    assert.match(baseMigration, new RegExp(`revoke update on table public\\.${table} from authenticated`, 'i'));
    assert.doesNotMatch(fixMigration, new RegExp(`grant\\s+[^;]*\\bupdate\\b[^;]*on\\s+(?:table\\s+)?public\\.${table}`, 'i'), 'fix가 direct UPDATE 차단을 되돌리면 안 됩니다.');
  }
  assert.doesNotMatch(fixMigration, /\biota_[a-z0-9_]+\b/i);
});

test('댓글 repository 수정 API는 빈 입력을 막고 author 전용 RPC 결과의 수정시각을 매핑한다', async () => {
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');

  for (const [apiName, rpcName] of [
    ['updateComment', 'update_songhyeon_task_comment'],
    ['updateReply', 'update_songhyeon_task_reply'],
  ]) {
    assert.match(repository, new RegExp(`export async function ${apiName}\\b`), `repository API 누락: ${apiName}`);
    assert.match(repository, new RegExp(`${apiName}[\\s\\S]{0,1800}?rpc\\(\\s*['"]${rpcName}['"]`, 'i'), `${apiName}는 ${rpcName} RPC를 사용해야 합니다.`);
  }
  assert.match(repository, /(?:btrim|trim)\s*\(/i);
  assert.match(repository, /if\s*\(\s*!\s*(?:body|cleanBody|cleanText|trimmedText)\s*\)/i, 'repository도 trim한 빈 수정문을 거부해야 합니다.');
  assert.match(repository, /const replyPayload[\s\S]*?updatedAt:\s*row\.updated_at[\s\S]*?editedAt:/i);
  assert.match(repository, /const commentPayload[\s\S]*?updatedAt:\s*row\.updated_at[\s\S]*?editedAt:/i);
  assert.match(repository, /editedAt:\s*row\.edited_at/i, '수정됨 표시는 서버가 기록한 edited_at에서 파생해야 합니다.');
  assert.doesNotMatch(repository, /from\(\s*['"]songhyeon_task_comments['"]\s*\)\.update\s*\(/i);
  assert.doesNotMatch(repository, /from\(\s*['"]songhyeon_task_comment_replies['"]\s*\)\.update\s*\(/i);
  assert.doesNotMatch(repository, /\biota_[a-z0-9_]+\b/i);
});

test('상세 drawer는 본인 댓글·대댓글만 인라인 수정하고 저장 후 서버 원장을 다시 읽는다', async () => {
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');

  for (const api of ['updateComment', 'updateReply']) assert.match(drawer, new RegExp(`\\b${api}\\b`), `drawer 연결 누락: ${api}`);
  for (const state of ['discussionEdit', 'editText', 'pendingEdit']) {
    assert.match(drawer, new RegExp(`\\b${state}\\b`), `인라인 수정 상태 누락: ${state}`);
  }
  for (const handler of ['beginEdit', 'cancelEdit', 'saveEdit']) {
    assert.match(drawer, new RegExp(`(?:const|function)\\s+${handler}\\b`), `인라인 수정 handler 누락: ${handler}`);
  }

  assert.match(drawer, /comment\.authorId\s*===\s*actor\.userId[\s\S]{0,1400}?(?:beginEdit\s*\(|댓글 수정|>\s*수정\s*<)/i, '댓글 수정 UI는 auth user id가 작성자와 같은 경우에만 보여야 합니다.');
  assert.match(drawer, /reply\.authorId\s*===\s*actor\.userId[\s\S]{0,1400}?(?:beginEdit\s*\(|대댓글 수정|>\s*수정\s*<)/i, '대댓글 수정 UI는 auth user id가 작성자와 같은 경우에만 보여야 합니다.');
  assert.match(drawer, /function InlineDiscussionEditor[\s\S]*?<textarea\b/i, '수정문은 카드 안 textarea에서 편집해야 합니다.');
  assert.match(drawer, /<InlineDiscussionEditor[\s\S]{0,360}?value=\{editText\}/i);
  assert.match(drawer, /onCancel=\{cancelEdit\}/i);
  assert.match(drawer, /onSave=\{saveEdit\}/i);
  assert.match(drawer, /isSaving=\{pendingEdit\s*===/i, '저장 중 중복 제출을 막아야 합니다.');
  assert.match(drawer, /저장 중\.\.\.|저장 중…/);

  const saveStart = drawer.search(/(?:const|function)\s+saveEdit\b/);
  const saveEnd = drawer.indexOf('\n  };', saveStart);
  assert.ok(saveStart >= 0 && saveEnd > saveStart, 'saveEdit 구현 블록을 찾을 수 없습니다.');
  const saveBlock = drawer.slice(saveStart, saveEnd + 5);
  assert.match(saveBlock, /await\s+updateComment\s*\(/);
  assert.match(saveBlock, /await\s+updateReply\s*\(/);
  const updateIndex = Math.max(saveBlock.indexOf('await updateComment'), saveBlock.indexOf('await updateReply'));
  const reloadIndex = saveBlock.indexOf('setComments(await loadComments(task.sourceKey))');
  assert.ok(reloadIndex > updateIndex, '저장 성공 뒤 loadComments로 서버 원장을 다시 읽어야 합니다.');

  assert.match(drawer, /comment\.editedAt[\s\S]{0,240}\(수정됨\)/i);
  assert.match(drawer, /reply\.editedAt[\s\S]{0,240}\(수정됨\)/i);
  assert.doesNotMatch(drawer, /(?:comment|reply)\.updatedAt[\s\S]{0,120}\(수정됨\)/i, '수정됨 표시는 editedAt을 기준으로 해야 합니다.');
});
