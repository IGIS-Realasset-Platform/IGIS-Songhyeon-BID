import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('업무 상세가 열린 동안에도 좌측 업무 행 위 커서는 pointer를 유지한다', async () => {
  const [board, drawer] = await Promise.all([
    read('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx'),
    read('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx'),
  ]);

  const rowStart = board.indexOf('<tr key={task.sourceKey} data-task-board-row');
  const rowEnd = board.indexOf('}>', rowStart);
  assert.ok(rowStart >= 0 && rowEnd > rowStart, '좌측 업무 행을 찾을 수 없습니다.');
  const row = board.slice(rowStart, rowEnd);
  assert.match(row, /data-task-key=\{task\.sourceKey\}/);
  assert.match(row, /\bcursor-pointer\b/, '좌측 업무 행 자체가 pointer cursor를 제공해야 합니다.');
  assert.match(board, /document\.elementsFromPoint\(event\.clientX,\s*event\.clientY\)[\s\S]*?closest\?\.\(['"]\[data-task-board-row\]['"]\)[\s\S]*?row\?\.dataset\.taskKey/,
    '상세 backdrop 클릭은 아래 업무 행을 찾아 즉시 전환해야 합니다.');

  const backdrop = drawer.match(/<button type="button" aria-label="업무 상세 닫기"[^>]*>/)?.[0] || '';
  assert.ok(backdrop, '업무 상세 backdrop을 찾을 수 없습니다.');
  assert.match(backdrop, /onClick=\{onBackdropClick \|\| onClose\}/);
  assert.match(backdrop, /className="[^"]*\bcursor-pointer\b[^"]*\bpointer-events-auto\b/,
    '상세가 열린 상태에서도 좌측 표 위 hit target은 pointer cursor여야 합니다.');
});
