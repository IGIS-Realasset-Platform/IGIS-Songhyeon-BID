import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const readBoard = () => readFile(new URL('../src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', import.meta.url), 'utf8');

test('미착수 행은 업무분류와 업무명만 낮은 밝기로 표시하고 다른 상태의 기본색을 보존한다', async () => {
  const board = await readBoard();
  const taskRow = board.match(/return <tr key=\{task\.sourceKey\}[\s\S]*?<\/tr>/)?.[0] || '';
  assert.ok(taskRow, '통합업무 table row를 찾을 수 없습니다.');

  assert.match(board, /const isNotStarted = task\.status === '미착수'/);

  const categoryCell = taskRow.match(/<td className=\{`[^`]*\$\{isNotStarted \? 'text-\[#A8A9AD\]' : 'text-\[#E5E5E5\]'\}[^`]*`\}>\{task\.categoryMain\}<\/td>/)?.[0] || '';
  assert.ok(categoryCell,
    '업무분류는 미착수일 때만 낮은 밝기이고 다른 상태는 기존 #E5E5E5 색이어야 합니다.');

  const taskNameCell = taskRow.match(/<td className=\{`sticky z-10 pl-4 \$\{isNotStarted \? 'font-normal' : 'font-bold'\}[\s\S]*?<span className="min-w-0 truncate" style=\{\{ color: isNotStarted \? '#686868' : '#bdbba7' \}\}>\{task\.taskName\}<\/span>[\s\S]*?<\/td>/)?.[0] || '';
  assert.ok(taskNameCell,
    '업무명은 미착수일 때만 낮은 밝기이고 다른 상태는 기존 #bdbba7 색이어야 합니다.');

  assert.equal((board.match(/\bisNotStarted\b/g) || []).length, 4,
    '미착수 분기는 선언 1회와 업무분류 색상·업무명 색상·업무명 굵기 3곳에만 있어야 합니다.');
  const otherCells = taskRow.replace(categoryCell, '').replace(taskNameCell, '');
  assert.doesNotMatch(otherCells, /isNotStarted|text-\[#A8A9AD\]|#686868/,
    '미착수 전용 색상이 다른 열로 번지면 안 됩니다.');

  assert.match(taskNameCell, /unreadTaskSourceKeys\.has\(task\.sourceKey\)/);
  assert.match(taskNameCell, /aria-label="새 댓글"[\s\S]*?bg-\[#ff3b30\][\s\S]*?text-white[\s\S]*?>N<\/span>/,
    '업무명 셀의 새 댓글 N badge 색과 동작은 그대로 유지해야 합니다.');
  assert.match(otherCells, /text-\[#A1A1AA\][\s\S]*?\{task\.taskPurpose \|\| task\.sourceText \|\| '-'\}/,
    '업무 목적 등 다른 열의 기존 색상과 내용은 유지해야 합니다.');
  assert.match(otherCells, /statusBadgeClass\(task\.status\)/,
    '상태 badge는 기존 상태별 색상 helper를 계속 사용해야 합니다.');
  assert.match(otherCells, /importanceBadgeClass\(task\.importanceLevel\)/,
    '중요도 badge 색상도 미착수 텍스트 분기와 무관하게 유지해야 합니다.');
});
