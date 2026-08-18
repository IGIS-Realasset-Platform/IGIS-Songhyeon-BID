import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { songhyeonDetailedScheduleItems } from '../src/data/songhyeonDetailedSchedule.js';
import { milestoneWeeks } from '../src/data/songhyeonMilestones.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const migrationPath = path.join(root, 'supabase/migrations/202608180012_songhyeon_schedule_timeline_restore.sql');
const migration = fs.readFileSync(migrationPath, 'utf8');

test('기존 76개 마일스톤 상세 일정은 검토된 G0→G6 시간 흐름을 복구한다', () => {
  const tasks = songhyeonDetailedScheduleItems.filter((item) => item.itemType === 'task');
  assert.equal(tasks.length, 76);

  for (const item of tasks) {
    const startDate = milestoneWeeks[item.startIndex].startDate;
    const endDate = milestoneWeeks[item.endIndex].endDate;
    assert.match(migration, new RegExp(`\\('${item.sourceKey}', date '${startDate}', date '${endDate}'\\)`));
  }
});

test('G5 실행준비와 G6 현장 실증은 현재 8월이 아니라 11월 순서로 배치된다', () => {
  assert.match(migration, /\('G5-WS01-T01', date '2026-11-01', date '2026-11-07'\)/);
  assert.match(migration, /\('G6-WS01-T01', date '2026-11-15', date '2026-11-21'\)/);
  assert.match(migration, /\('G6-WS01-T08', date '2026-11-22', date '2026-11-30'\)/);
});

test('복구는 마일스톤 일정 원장만 수정하고 통합업무 및 수동 추가 일정은 건드리지 않는다', () => {
  const executableSql = migration.replace(/^--.*$/gm, '');
  assert.match(migration, /update public\.songhyeon_schedule_rows/);
  assert.doesNotMatch(executableSql, /update public\.songhyeon_tasks/);
  assert.doesNotMatch(executableSql, /SCHEDULE-/);
});
