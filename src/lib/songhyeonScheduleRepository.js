import { songhyeonSupabase } from './songhyeonSupabase';
import { loadTasks } from './songhyeonTaskRepository';
import { milestoneWeeks } from '../data/songhyeonMilestones';
import { hasAuthenticatedSonghyeonSession } from './songhyeonReadSession.js';

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
const cleanText = (value) => String(value || '').trim();
const schedulePeriodIndex = (value, fallback) => {
  const date = cleanText(value);
  const index = milestoneWeeks.findIndex((week) => date >= week.startDate && date <= week.endDate);
  return index >= 0 ? index : fallback;
};
const scheduleRowPayload = (row = {}) => {
  const startDate = row.start_date || row.startDate || '';
  const endDate = row.end_date || row.endDate || '';
  return {
    id: row.id,
    sourceKey: row.source_key || row.sourceKey,
    parentSourceKey: row.parent_source_key || row.parentSourceKey,
    itemType: 'task',
    displayName: row.display_name || row.displayName,
    sourceText: row.source_text ?? row.sourceText ?? '',
    leadLabel: row.lead_label || row.leadLabel,
    categoryMain: row.category_main || row.categoryMain,
    stage: row.stage,
    status: row.status || 'not_started',
    startDate,
    endDate,
    startIndex: schedulePeriodIndex(startDate, 0),
    endIndex: schedulePeriodIndex(endDate, milestoneWeeks.length - 1),
    sortOrder: row.sort_order ?? row.sortOrder ?? 0,
    createdAt: row.created_at || row.createdAt || null,
    updatedAt: row.updated_at || row.updatedAt || null,
  };
};
const scheduleLinkPayload = (row = {}) => ({
  id: row.id,
  scheduleSourceKey: row.schedule_source_key,
  taskSourceKey: row.task_source_key,
});
const mergeCanonicalScheduleRows = (scheduleItems, rows) => {
  const groups = scheduleItems.filter((item) => item.itemType !== 'task');
  const rowsByParent = new Map();
  for (const row of rows) {
    const siblings = rowsByParent.get(row.parentSourceKey) || [];
    siblings.push(row);
    rowsByParent.set(row.parentSourceKey, siblings);
  }
  for (const siblings of rowsByParent.values()) {
    siblings.sort((left, right) => left.sortOrder - right.sortOrder || left.sourceKey.localeCompare(right.sourceKey, 'ko'));
  }
  const merged = [];
  const placed = new Set();
  for (const group of groups) {
    merged.push(group);
    if (group.itemType !== 'lv2') continue;
    for (const row of rowsByParent.get(group.sourceKey) || []) {
      merged.push(row);
      placed.add(row.sourceKey);
    }
  }
  for (const row of rows) {
    if (!placed.has(row.sourceKey)) merged.push(row);
  }
  return merged;
};

export async function loadScheduleRows() {
  const client = requireClient();
  const authenticated = await hasAuthenticatedSonghyeonSession(client);
  const table = authenticated ? 'songhyeon_schedule_rows' : 'songhyeon_public_schedule_rows';
  const rows = await run(
    client.from(table).select('*').order('sort_order', { ascending: true }).order('source_key', { ascending: true }),
    '마일스톤 상세 일정을 불러오지 못했습니다.',
  );
  return (rows || []).map(scheduleRowPayload);
}

export async function loadScheduleWorkspace(scheduleItems) {
  const client = requireClient();
  const authenticated = await hasAuthenticatedSonghyeonSession(client);
  const linksTable = authenticated ? 'songhyeon_schedule_task_links' : 'songhyeon_public_schedule_task_links';
  const rowsTable = authenticated ? 'songhyeon_schedule_rows' : 'songhyeon_public_schedule_rows';
  const [tasks, links, scheduleRows] = await Promise.all([
    loadTasks(),
    run(client.from(linksTable).select('*'), '업무 연결정보를 불러오지 못했습니다.'),
    run(client.from(rowsTable).select('*').order('sort_order', { ascending: true }).order('source_key', { ascending: true }), '마일스톤 상세 일정을 불러오지 못했습니다.'),
  ]);
  const rows = (scheduleRows || []).map(scheduleRowPayload);
  return {
    tasks,
    links: links.map(scheduleLinkPayload),
    rows,
    items: mergeCanonicalScheduleRows(scheduleItems, rows),
  };
}

export function linkedTasksForSchedule(scheduleSourceKey, tasks, links) {
  const explicitKeys = new Set(links.filter((link) => link.scheduleSourceKey === scheduleSourceKey).map((link) => link.taskSourceKey));
  return tasks.filter((task) => explicitKeys.has(task.sourceKey));
}

export async function linkScheduleTask(scheduleSourceKey, taskSourceKey, actor) {
  assertActor(actor);
  const client = requireClient();
  const payload = { schedule_source_key: scheduleSourceKey, task_source_key: taskSourceKey, created_by: actor.userId };
  const inserted = await run(
    client.from('songhyeon_schedule_task_links')
      .upsert(payload, { onConflict: 'schedule_source_key,task_source_key', ignoreDuplicates: true })
      .select('*')
      .maybeSingle(),
    '통합업무를 연결하지 못했습니다.',
  );
  if (inserted) return scheduleLinkPayload(inserted);
  const existing = await run(
    client.from('songhyeon_schedule_task_links')
      .select('*')
      .eq('schedule_source_key', scheduleSourceKey)
      .eq('task_source_key', taskSourceKey)
      .single(),
    '기존 통합업무 연결을 확인하지 못했습니다.',
  );
  return scheduleLinkPayload(existing);
}

export async function unlinkScheduleTask(linkId, actor) {
  assertActor(actor);
  await run(requireClient().from('songhyeon_schedule_task_links').delete().eq('id', linkId), '통합업무 연결을 해제하지 못했습니다.');
  return linkId;
}

export async function createScheduleRow(input, actor) {
  assertActor(actor);
  const parentSourceKey = cleanText(input?.parentSourceKey);
  const displayName = cleanText(input?.displayName);
  const leadLabel = cleanText(input?.leadLabel);
  const categoryMain = cleanText(input?.categoryMain);
  const stage = cleanText(input?.stage);
  const status = cleanText(input?.status) || 'not_started';
  const startDate = cleanText(input?.startDate);
  const endDate = cleanText(input?.endDate);
  if (!parentSourceKey || !displayName || !leadLabel || !categoryMain || !stage) throw new Error('상세 일정의 필수 정보를 입력해 주세요.');
  if (!startDate || !endDate || startDate > endDate) throw new Error('상세 일정의 시작일과 종료일을 확인해 주세요.');
  const row = await run(requireClient().rpc('create_songhyeon_schedule_row', {
    row_parent_source_key: parentSourceKey,
    row_display_name: displayName,
    row_source_text: cleanText(input?.sourceText),
    row_lead_label: leadLabel,
    row_category_main: categoryMain,
    row_stage: stage,
    row_status: status,
    row_start_date: startDate,
    row_end_date: endDate,
  }), '상세 일정을 추가하지 못했습니다.');
  return scheduleRowPayload(Array.isArray(row) ? row[0] : row);
}

export async function updateScheduleRow(scheduleSourceKey, patch, actor) {
  assertActor(actor);
  const cleanSourceKey = cleanText(scheduleSourceKey);
  if (!cleanSourceKey) throw new Error('수정할 상세 일정을 확인해 주세요.');
  const allowedFields = new Set(['displayName', 'sourceText', 'leadLabel', 'categoryMain', 'status', 'startDate', 'endDate']);
  const schedulePatch = Object.fromEntries(Object.entries(patch || {}).filter(([key, value]) => allowedFields.has(key) && value !== undefined));
  if (schedulePatch.startDate && schedulePatch.endDate && schedulePatch.startDate > schedulePatch.endDate) throw new Error('종료일은 시작일보다 빠를 수 없습니다.');
  const row = await run(requireClient().rpc('update_songhyeon_schedule_row', {
    target_source_key: cleanSourceKey,
    schedule_patch: schedulePatch,
  }), '상세 일정을 저장하지 못했습니다.');
  return scheduleRowPayload(Array.isArray(row) ? row[0] : row);
}

export async function deleteScheduleRow(scheduleSourceKey, actor) {
  assertActor(actor);
  const cleanSourceKey = cleanText(scheduleSourceKey);
  if (!cleanSourceKey) throw new Error('삭제할 상세 일정을 확인해 주세요.');
  const deletedKey = await run(requireClient().rpc('delete_songhyeon_schedule_row', {
    target_source_key: cleanSourceKey,
  }), '상세 일정을 삭제하지 못했습니다.');
  return cleanText(Array.isArray(deletedKey) ? deletedKey[0] : deletedKey) || cleanSourceKey;
}

export const updateScheduleItem = updateScheduleRow;
