import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const BOARD_PATH = new URL('../src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', import.meta.url);
const readBoard = () => readFile(BOARD_PATH, 'utf8');

test('관리 열의 수정은 row 상세 클릭과 분리해 해당 업무 editor를 직접 연다', async () => {
  const board = await readBoard();
  assert.match(board, /const \[editingTask, setEditingTask\] = useState\(null\)/,
    '관리 열 수정은 상세 selectedTask와 분리된 대상 상태를 사용해야 합니다.');

  const rowsStart = board.indexOf('{paginatedTasks.map((task, index) => {');
  const rowsEnd = board.indexOf('</tr>;', rowsStart);
  assert.ok(rowsStart >= 0 && rowsEnd > rowsStart, '업무 row 렌더링 구간을 찾을 수 없습니다.');
  const rows = board.slice(rowsStart, rowsEnd);
  assert.match(rows, /<tr\b[^>]*data-task-board-row[^>]*onClick=\{\(\) => openTask\(task\)\}/,
    '관리 버튼 외 row 클릭은 기존 상세 drawer를 열어야 합니다.');

  const managementLabel = rows.indexOf("{isReadOnly ? '상세' : '수정'}");
  const managementButtonStart = rows.lastIndexOf('<button type="button"', managementLabel);
  const managementButtonEnd = rows.indexOf('</button>', managementLabel);
  assert.ok(managementButtonStart >= 0 && managementButtonEnd > managementButtonStart,
    '관리 열 상세·수정 버튼을 찾을 수 없습니다.');
  const managementButton = rows.slice(managementButtonStart, managementButtonEnd);
  assert.match(managementButton, /onClick=\{\(event\) => \{\s*event\.stopPropagation\(\);/,
    '수정 버튼이 row openTask까지 bubbling되면 안 됩니다.');
  assert.match(managementButton, /if \(isReadOnly\) openTask\(task\); else setEditingTask\(task\);/,
    '편집 가능 사용자는 상세 drawer를 거치지 않고 해당 task editor를 열어야 합니다.');
  assert.match(managementButton, /\{isReadOnly \? ['"]상세['"] : ['"]수정['"]\}/);
});

test('읽기 전용 관리 버튼은 상세를 열고 editor는 렌더하지 않는다', async () => {
  const board = await readBoard();
  assert.match(board, /if \(isReadOnly\) openTask\(task\); else setEditingTask\(task\);/,
    '읽기 전용에서는 관리 열도 상세 openTask 경로를 사용해야 합니다.');
  assert.match(board, /\{editingTask && !isReadOnly && <SonghyeonTaskEditorModal\b/,
    '읽기 전용 사용자에게 수정 editor를 노출하면 안 됩니다.');
  assert.match(board, /\{selectedTask && <SonghyeonTaskDetailDrawer\b[^>]*\btask=\{selectedTask\}/,
    '읽기 전용을 포함한 기존 상세 drawer 경로는 유지해야 합니다.');
});

test('직접 수정 성공은 목록·열린 상세를 교체하고 editor 대상을 닫는다', async () => {
  const board = await readBoard();
  const replaceStart = board.indexOf('const replaceTask =');
  const replaceEnd = board.indexOf('\n  const requestArchive', replaceStart);
  assert.ok(replaceStart >= 0 && replaceEnd > replaceStart, 'replaceTask 갱신 구간을 찾을 수 없습니다.');
  const replace = board.slice(replaceStart, replaceEnd);
  assert.match(replace, /setTasks\(\(current\) => current\.map\(\(task\) => task\.sourceKey === updated\.sourceKey \? updated : task\)\)/,
    '수정 결과를 목록 원장에 교체해야 합니다.');
  assert.match(replace, /setSelectedTask\(\(current\) => current\?\.sourceKey === updated\.sourceKey \? updated : current\)/,
    '같은 업무 상세가 열려 있으면 수정 결과로 재로드해야 합니다.');

  const editorStart = board.indexOf('{editingTask && !isReadOnly');
  const editorEnd = board.indexOf('/>}', editorStart);
  assert.ok(editorStart >= 0 && editorEnd > editorStart, '관리 열 직접 editor mount를 찾을 수 없습니다.');
  const editor = board.slice(editorStart, editorEnd);
  assert.match(editor, /key=\{editingTask\.sourceKey\}/,
    '다른 row로 전환하면 editor 내부 상태를 새 task로 재생성해야 합니다.');
  assert.match(editor, /\btask=\{editingTask\}/);
  assert.match(editor, /onClose=\{\(\) => setEditingTask\(null\)\}/);
  assert.match(editor, /onSaved=\{\(updated\) => \{\s*replaceTask\(updated\);\s*setEditingTask\(null\);\s*\}\}/,
    '저장 성공 후 원장을 교체하고 직접 editor를 닫아야 합니다.');
  assert.match(editor, /onWorkflowSaved=\{replaceTask\}/,
    'editor 내 status workflow 결과도 같은 목록·상세 교체 경로를 사용해야 합니다.');
});

test('전기영 전용 새 업무 추가 경로는 관리 열 직접 수정과 분리해 유지한다', async () => {
  const board = await readBoard();
  assert.match(board, /const \[isEditorOpen, setIsEditorOpen\] = useState\(false\)/);
  assert.match(board, /actions=\{canCreateAndArchive \? <button type="button" onClick=\{\(\) => setIsEditorOpen\(true\)\}[^>]*>\+ 새 업무 추가<\/button> : null\}/,
    '새 업무 추가 버튼의 기존 admin 가드를 유지해야 합니다.');

  const createStart = board.indexOf('{isEditorOpen && canCreateAndArchive');
  const createEnd = board.indexOf('/>}', createStart);
  assert.ok(createStart >= 0 && createEnd > createStart, '새 업무 editor mount를 찾을 수 없습니다.');
  const createEditor = board.slice(createStart, createEnd);
  assert.doesNotMatch(createEditor, /\btask=|editingTask/,
    '신규 editor에 수정 대상을 전달하면 안 됩니다.');
  assert.match(createEditor, /onClose=\{\(\) => setIsEditorOpen\(false\)\}/);
  assert.match(createEditor, /onCreated=\{\(created\) => \{[\s\S]*?setTasks\(\(current\) => \[\.\.\.current, created\]\);[\s\S]*?setIsEditorOpen\(false\);[\s\S]*?openTask\(created\);[\s\S]*?\}\}/,
    '새 업무는 목록에 추가한 뒤 신규 editor를 닫고 생성된 상세를 열어야 합니다.');
});
