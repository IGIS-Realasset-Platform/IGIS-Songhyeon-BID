import { writeFileSync } from 'node:fs';
import { initialSonghyeonTasks } from '../src/data/songhyeonTaskBoard.js';

const quote = (value) => `'${String(value).replaceAll("'", "''")}'`;
const values = initialSonghyeonTasks.map((task, index) => {
  const payload = JSON.stringify(task);
  return `  (${quote(task.id)}, ${quote(task.sourceKey)}, ${index}, ${quote(payload)}::jsonb)`;
});

const sql = `-- Initial Songhyeon BID task-board ledger. Generated from the reviewed milestone source.
-- All text and initial status live in Supabase; existing edited rows are never overwritten.

insert into public.songhyeon_tasks(id, source_key, display_order, payload)
values
${values.join(',\n')}
on conflict (source_key) do nothing;
`;

writeFileSync(new URL('../supabase/migrations/202608120003_songhyeon_task_board_seed.sql', import.meta.url), sql);
console.log(JSON.stringify({
  taskCount: initialSonghyeonTasks.length,
  uniqueKeys: new Set(initialSonghyeonTasks.map((task) => task.sourceKey)).size,
  buildTask: initialSonghyeonTasks.find((task) => task.sourceText.includes('통합업무보드'))?.sourceKey,
  sqlChars: sql.length,
}));
