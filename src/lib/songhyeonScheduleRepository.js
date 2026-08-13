import { songhyeonSupabase } from './songhyeonSupabase';
import { createTask, loadTasks, updateTask } from './songhyeonTaskRepository';
import { milestoneWeeks } from '../data/songhyeonMilestones';

const requireClient = () => {
  if (!songhyeonSupabase) throw new Error('송현 Supabase 연결이 설정되지 않았습니다.');
  return songhyeonSupabase;
};
const assertActor = (actor) => {
  if (!actor?.userId) throw new Error('인증된 송현 BID 멤버만 일정을 변경할 수 있습니다.');
};
const run = async (promise, message) => {
  const { data, error } = await promise;
  if (error) throw new Error(`${message}: ${error.message}`);
  return data;
};

export const taskStatusToScheduleStatus = (status) => ({ 미착수: 'not_started', 진행중: 'in_progress', 완료: 'completed', 보류: 'on_hold', 지연: 'delayed', 중단: 'cancelled' }[status] || status || 'not_started');
export const scheduleStatusToTaskStatus = (status) => ({ not_started: '미착수', in_progress: '진행중', completed: '완료', on_hold: '보류', delayed: '지연', cancelled: '중단' }[status] || status || '미착수');

export async function loadScheduleWorkspace(scheduleItems) {
  const client = requireClient();
  const [tasks, links, overrides] = await Promise.all([
    loadTasks(),
    run(client.from('songhyeon_schedule_task_links').select('*'), '업무 연결정보를 불러오지 못했습니다.'),
    run(client.from('songhyeon_schedule_overrides').select('*'), '일정 수정정보를 불러오지 못했습니다.'),
  ]);
  const overrideMap = new Map(overrides.map((row) => [row.schedule_source_key, row.payload || {}]));
  return {
    tasks,
    links: links.map((row) => ({ id: row.id, scheduleSourceKey: row.schedule_source_key, taskSourceKey: row.task_source_key })),
    items: scheduleItems.map((item) => {
      const override = overrideMap.get(item.sourceKey) || {};
      const primaryTask = tasks.find((task) => task.sourceKey === item.sourceKey);
      return {
        ...item,
        ...override,
        startDate: override.startDate || item.startDate || milestoneWeeks[item.startIndex]?.startDate,
        endDate: primaryTask?.dueDate || override.endDate || item.endDate || milestoneWeeks[item.endIndex]?.endDate,
        status: primaryTask ? taskStatusToScheduleStatus(primaryTask?.status) : (override.status || item.status),
      };
    }),
  };
}

export function linkedTasksForSchedule(scheduleSourceKey, tasks, links) {
  const explicitKeys = new Set(links.filter((link) => link.scheduleSourceKey === scheduleSourceKey).map((link) => link.taskSourceKey));
  return tasks.filter((task) => task.sourceKey === scheduleSourceKey || explicitKeys.has(task.sourceKey));
}

export async function linkScheduleTask(scheduleSourceKey, taskSourceKey, actor) {
  assertActor(actor);
  if (scheduleSourceKey === taskSourceKey) return { scheduleSourceKey, taskSourceKey, implicit: true };
  const row = await run(requireClient().from('songhyeon_schedule_task_links').upsert({ schedule_source_key: scheduleSourceKey, task_source_key: taskSourceKey, created_by: actor.userId }, { onConflict: 'schedule_source_key,task_source_key' }).select('*').single(), '통합업무를 연결하지 못했습니다.');
  return { id: row.id, scheduleSourceKey: row.schedule_source_key, taskSourceKey: row.task_source_key };
}

export async function unlinkScheduleTask(linkId, actor) {
  assertActor(actor);
  await run(requireClient().from('songhyeon_schedule_task_links').delete().eq('id', linkId), '통합업무 연결을 해제하지 못했습니다.');
}

export async function createAndLinkScheduleTask(scheduleSourceKey, task, actor) {
  const created = await createTask({ ...task, sourceType: 'manual' }, actor);
  await linkScheduleTask(scheduleSourceKey, created.sourceKey, actor);
  return created;
}

export async function updateScheduleItem(scheduleSourceKey, patch, actor) {
  assertActor(actor);
  if (!patch.startDate || !patch.endDate) throw new Error('시작일과 종료일을 모두 입력해 주세요.');
  if (patch.startDate > patch.endDate) throw new Error('종료일은 시작일보다 빠를 수 없습니다.');
  await updateTask(scheduleSourceKey, { dueDate: patch.endDate, status: scheduleStatusToTaskStatus(patch.status) }, actor);
  const row = await run(requireClient().from('songhyeon_schedule_overrides').upsert({ schedule_source_key: scheduleSourceKey, payload: patch, updated_by: actor.userId, updated_at: new Date().toISOString() }, { onConflict: 'schedule_source_key' }).select('*').single(), '마일스톤 일정을 저장하지 못했습니다.');
  return { scheduleSourceKey: row.schedule_source_key, ...(row.payload || {}) };
}
