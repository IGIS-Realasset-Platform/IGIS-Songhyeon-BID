import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');

test('신규 업무는 DB와 화면 모두 활성 업무 목록 최상단에 배치된다', async () => {
  const [migration, board] = await Promise.all([
    read('supabase/migrations/202608270001_songhyeon_task_ordering.sql'),
    read('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx'),
  ]);

  const createFunction = migration.match(/create or replace function public\.create_songhyeon_task_atomic[\s\S]*?\n\$\$;/i)?.[0] || '';
  assert.match(createFunction, /pg_advisory_xact_lock[\s\S]*coalesce\(min\(task\.display_order\), 0\) - 1/i);
  assert.match(createFunction, /where task\.archived_at is null/i);
  assert.match(board, /setTasks\(\(current\) => sortTasksByDisplayOrder\(\[\.\.\.current, created\]\)\)/);
  assert.match(board, /setCurrentPage\(1\)/);
  assert.doesNotMatch(board, /PINNED_TASK_CATEGORY/);
});

test('업무 위아래 이동은 전기영 전용 원자적 RPC로 두 행의 순서를 교환한다', async () => {
  const [migration, repository, board] = await Promise.all([
    read('supabase/migrations/202608270001_songhyeon_task_ordering.sql'),
    read('src/lib/songhyeonTaskRepository.js'),
    read('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx'),
  ]);

  const reorderFunction = migration.match(/create or replace function public\.reorder_songhyeon_tasks[\s\S]*?\n\$\$;/i)?.[0] || '';
  assert.match(reorderFunction, /is_jeon_giyoung_songhyeon_task_owner\(\)/);
  assert.match(reorderFunction, /SONGHYEON_TASK_REORDER_FORBIDDEN[\s\S]*42501/);
  assert.match(reorderFunction, /pg_advisory_xact_lock/);
  assert.equal((reorderFunction.match(/archived_at is null/g) || []).length, 2);
  assert.match(reorderFunction, /display_order = case[\s\S]*target_task\.id[\s\S]*adjacent_task\.display_order[\s\S]*target_task\.display_order/i);
  assert.match(reorderFunction, /version = task\.version \+ 1/);
  assert.match(migration, /grant execute on function public\.reorder_songhyeon_tasks\(text, text\) to authenticated/);

  assert.match(repository, /export async function reorderTask\(sourceKey, adjacentSourceKey, actor = \{\}\)/);
  assert.match(repository, /assertTaskOwner\(actor, '순서 변경'\)/);
  assert.match(repository, /rpc\('reorder_songhyeon_tasks'/);

  assert.match(board, /aria-label=\{task\.taskName \+ ' 위로 이동'\}/);
  assert.match(board, /aria-label=\{task\.taskName \+ ' 아래로 이동'\}/);
  assert.match(board, /const adjacentTask = sortedAndFilteredTasks\[targetIndex\]/);
  assert.match(board, /reorderTask\(task\.sourceKey, adjacentTask\.sourceKey, actor\)/);
  assert.match(board, /!archived && canCreateAndArchive/);
});
