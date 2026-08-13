import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  SONGHYEON_TASK_BOARD_BUILD_SOURCE_KEY,
  createInitialSonghyeonTasks,
} from '../src/data/songhyeonTaskBoard.js';
import { songhyeonDetailedScheduleItems } from '../src/data/songhyeonDetailedSchedule.js';
import { songhyeonTaskCategories } from '../src/data/songhyeonTaskCategories.js';

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

test('Supabase 단계값이 비어 있어도 sourceKey로 정식 GATE 단계를 복원한다', async () => {
  const { normalizeSonghyeonGateStage } = await import('../src/data/songhyeonGateStages.js');
  assert.equal(normalizeSonghyeonGateStage('', 'G0-WS01-T01'), 'G0 근거기반 구축');
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

test('통합업무보드 구축 자체가 마일스톤 연결 업무로 등록된다', () => {
  const buildTask = boardTasks.find((task) => task.sourceKey === SONGHYEON_TASK_BOARD_BUILD_SOURCE_KEY);
  assert.ok(buildTask);
  assert.equal(buildTask.sourceType, 'platform-build');
  assert.equal(buildTask.parentSourceKey, 'G4-WS02');
  assert.match(buildTask.taskName, /통합업무보드/);
});

test('홈 하단 업무보드는 IOTA 원본의 행 클릭·550px 상세 drawer·댓글 계약을 제공한다', async () => {
  const dashboard = await readFile('src/pages/Dashboard.jsx', 'utf8');
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const drawer = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', 'utf8');

  assert.match(dashboard, /id="task-board"/);
  assert.match(dashboard, /<SonghyeonTaskBoard/);
  assert.match(board, /data-task-board-row/);
  assert.match(board, /onClick=\{\(\) => openTask\(task\)\}/);
  assert.match(drawer, /w-\[550px\]|max-w-\[550px\]/);
  assert.match(drawer, /data-task-detail-drawer/);
  assert.match(drawer, /업무 수정하기/);
  assert.match(drawer, /댓글을 입력하세요/);
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
    "sticky left-[190px]",
    "left-[296px]",
    "w-[297px] min-w-[297px] max-w-[297px]",
    "mx-auto w-[1200px] max-w-full",
    "w-full max-w-full",
  ]) assert.ok(board.includes(token), `IOTA 원본 토큰 누락: ${token}`);

  const gateIndex = board.indexOf('HeaderFilter label="GATE 단계"');
  const categoryIndex = board.indexOf('HeaderFilter label="업무분류"');
  const taskNameIndex = board.indexOf('>업무명</th>');
  assert.ok(gateIndex < categoryIndex && categoryIndex < taskNameIndex, '열 순서는 ID → GATE → 업무분류 → 업무명이어야 한다.');
  assert.doesNotMatch(board, /gateLabel|formatOption/);
  assert.match(board, /title=\{task\.gateStage \|\| task\.stage\}>\{task\.gateStage \|\| task\.stage\}<\/td>/);
  assert.match(board, /w-\[140px\] min-w-\[140px\] max-w-\[140px\]/);

  for (const label of [
    '업무분류', '세부섹터', '업무명',
    '업무목적 / PF·준공 영향', '필요 산출물', 'GATE',
    '실행주관', '담당자', '외부상대방', '지원필요',
    'Block', '결정필요', '다음 액션', '상태', '중요도', '기한', '관리',
  ]) assert.ok(board.includes(label), `IOTA 원본 열 누락: ${label}`);

  assert.doesNotMatch(board, /prioritySortOrder/);
  assert.match(board, /currentPage/);
  assert.match(board, /pageSize/);
  assert.match(board, /opacity-0 cursor-pointer/);
  assert.doesNotMatch(board, /HeaderFilter label="협업부서"|selectedCoopDept|options\.coops/);
  assert.match(board, /\.\.\.asList\(task\.coopDepts\)/);
});

test('전용 업무보드 헤더는 IOTA 원본의 제목·검색·보기모드·페이지크기·추가버튼 구조를 이식한다', async () => {
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const page = await readFile('src/pages/TaskBoard.jsx', 'utf8');
  const hypotheses = await readFile('src/pages/ServiceHypotheses.jsx', 'utf8');

  for (const token of [
    'text-[32px]', 'w-[280px]',
    '10개씩 보기', '20개씩 보기', '+ 새 업무 추가',
    'pt-[29px]', 'px-[60px]',
  ]) assert.ok(`${board}\n${page}`.includes(token), `IOTA 원본 헤더 토큰 누락: ${token}`);
  assert.doesNotMatch(board, /2026\.08 현재|truncate whitespace-nowrap text-\[11px\]/);
  assert.doesNotMatch(board, /간추려보기|자세히보기|viewMode|setViewMode/);
  assert.match(board, /className="ml-auto" value=\{pageSize\}/);
  assert.doesNotMatch(page, /mx-auto w-\[1200px\]/);
  assert.match(hypotheses, /<header className="mb-\[12px\] flex h-\[37px\] w-full items-end justify-between">/);
  assert.match(board, /data-task-board-header className="mx-auto mb-\[12px\] flex h-\[37px\] w-\[1200px\] max-w-full items-end"/);
});

test('통합업무보드 사용자 교정사항은 삭제·상단여백·열재배분·중앙정렬·분리선을 함께 적용한다', async () => {
  const page = await readFile('src/pages/TaskBoard.jsx', 'utf8');
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  const plan = await readFile('src/components/iota-songhyeon/task-board/SonghyeonIntegratedExecutionPlan.jsx', 'utf8');
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');
  const migration = await readFile('supabase/migrations/202608130001_songhyeon_task_delete.sql', 'utf8');

  assert.match(page, /pt-\[29px\]/);
  assert.doesNotMatch(board, /<HeaderFilter label="프로젝트"/);
  assert.doesNotMatch(board, /\{projectLabel\(task\)\}/);
  assert.match(board, /w-\[297px\] min-w-\[297px\] max-w-\[297px\]/);
  assert.doesNotMatch(board, /shadow-\[inset_-1px_0_0_0_#3c3c3c\]/);
  assert.match(board, /left-\[190px\][^\n]*w-\[106px\][^\n]*text-center font-bold/);
  assert.match(board, /data-task-board-header className="mx-auto mb-\[12px\][^"]*w-\[1200px\] max-w-full/);
  assert.doesNotMatch(board, /HeaderFilter label="협업부서"|selectedCoopDept|options\.coops/);
  assert.match(board, />수정<\/button>[\s\S]*>\|<\/span>[\s\S]*>삭제<\/button>/);
  assert.match(board, /setDeleteTarget\(task\)/);
  assert.match(board, /deleteTask\(deleteTarget\.sourceKey/);
  assert.match(repository, /export async function deleteTask/);
  assert.doesNotMatch(repository, /export async function loadTasks\(\)[\s\S]{0,140}seedMissingTasks\(\)/);
  assert.match(migration, /for delete to authenticated/);
  assert.match(migration, /grant delete on public\.songhyeon_tasks to authenticated/);
  assert.match(plan, /className="[^"]*mx-auto[^"]*w-\[1200px\][^"]*"/);
  assert.doesNotMatch(plan, /업무 수행 참고/);
  assert.match(plan, /id="execution-framework"[^\n]*pt-\[38px\]/);
  assert.match(plan, /function SectionHeading\(\{ title, description \}\)/);
  assert.match(plan, /className="mb-\[12px\] flex items-end justify-between gap-8"/);
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
  assert.doesNotMatch(plan, /bg-white|text-slate|shadow-/);
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
    'data-pmo-task-detail-drawer', 'px-[10px] py-3',
    'grid grid-cols-4 gap-4', '지원필요', 'GATE 단계', '외부 상대방',
    '마감 기한', '의사결정필요',
    '업무 목적', '필요 산출물', '다음 액션', '회의 상정 사유',
    '업무 협업 게시판', '업무 수정하기',
  ]) assert.ok(drawer.includes(token), `IOTA 원본 drawer 토큰 누락: ${token}`);
  const metadataIndex = drawer.indexOf('grid grid-cols-4 gap-4');
  const narrativeIndex = drawer.indexOf('업무 목적');
  const activityIndex = drawer.indexOf('업무 협업 게시판');
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

test('좌측 주요 메뉴와 독립 /tasks 라우트에서 통합업무보드를 직접 연다', async () => {
  const layout = await readFile('src/components/Layout.jsx', 'utf8');
  const app = await readFile('src/App.jsx', 'utf8');
  const page = await readFile('src/pages/TaskBoard.jsx', 'utf8');

  assert.match(layout, /name: '통합업무보드', path: '\/tasks'/);
  assert.ok(layout.indexOf("path: '/tasks'") < layout.indexOf("path: '/milestones'"));
  assert.ok(layout.indexOf("path: '/milestones'") < layout.indexOf("path: '/execution'"));
  assert.match(app, /import TaskBoard from '\.\/pages\/TaskBoard'/);
  assert.match(app, /<Route path="tasks" element=\{<TaskBoard \/>\}/);
  assert.match(page, /<SonghyeonTaskBoard/);
  const board = await readFile('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', 'utf8');
  assert.match(board, /통합업무보드/);
  assert.match(await readFile('src/pages/Dashboard.jsx', 'utf8'), /showWorkspaceHeader=\{false\}/);
});

test('마일스톤 Task는 통합업무 기본연결·추가연결·신규등록·일정수정 계약을 제공한다', async () => {
  const schedule = await readFile('src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx', 'utf8');
  const modal = await readFile('src/components/iota-songhyeon/pmo/SonghyeonScheduleTaskLinkModal.jsx', 'utf8');
  const repository = await readFile('src/lib/songhyeonScheduleRepository.js', 'utf8');
  const migration = await readFile('supabase/migrations/202608130005_songhyeon_schedule_task_links.sql', 'utf8');
  for (const token of ['SonghyeonScheduleTaskLinkModal', 'loadScheduleWorkspace', 'linkScheduleTask', 'createAndLinkScheduleTask', 'updateScheduleItem']) assert.match(schedule, new RegExp(token));
  for (const token of ['연결된 통합업무', '기존 통합업무 연결', '새 통합업무 등록', '마일스톤 및 일정 수정']) assert.ok(modal.includes(token));
  for (const token of ['loadScheduleWorkspace', 'linkScheduleTask', 'unlinkScheduleTask', 'createAndLinkScheduleTask', 'updateScheduleItem']) assert.match(repository, new RegExp(`export async function ${token}`));
  assert.match(repository, /sourceKey === scheduleSourceKey/);
  assert.match(migration, /songhyeon_schedule_task_links/);
  assert.match(migration, /songhyeon_schedule_overrides/);
  assert.doesNotMatch(schedule, /task-link concerns are intentionally excluded/);
  assert.match(schedule, /SonghyeonTaskDetailDrawer/);
  assert.match(schedule, /setEmbeddedTask/);
  assert.doesNotMatch(schedule, /window\.location\.href = `\/tasks\?task=/);
  assert.match(modal, /type="date"/);
  assert.match(modal, /시작일/);
  assert.match(modal, /종료일/);
  assert.doesNotMatch(modal, /시작주|종료주/);
  assert.match(repository, /updateTask\(scheduleSourceKey, \{ dueDate: patch\.endDate, status: scheduleStatusToTaskStatus\(patch\.status\) \}/);
  assert.match(repository, /primaryTask\?\.dueDate/);
  assert.match(repository, /taskStatusToScheduleStatus\(primaryTask\?\.status\)/);
  assert.match(schedule, /getScheduleBarGeometry/);
  assert.match(schedule, /taskStatusToScheduleStatus\(savedTask\.status\)/);
});

test('업무·댓글·변경이력은 localStorage 없이 송현 Supabase 원장으로만 작동한다', async () => {
  const repository = await readFile('src/lib/songhyeonTaskRepository.js', 'utf8');
  assert.match(repository, /songhyeon_tasks/);
  assert.match(repository, /songhyeon_task_comments/);
  assert.match(repository, /songhyeon_task_activity/);
  assert.match(repository, /requireSupabase/);
  assert.match(repository, /seedMissingTasks/);
  assert.doesNotMatch(repository, /localStorage|readLocal|writeLocal|fallback/i);
  assert.match(repository, /updateTask/);
  assert.match(repository, /createTask/);
  assert.match(repository, /addComment/);
  assert.match(repository, /deleteComment/);
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
