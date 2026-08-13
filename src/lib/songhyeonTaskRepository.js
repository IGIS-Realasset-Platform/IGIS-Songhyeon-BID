import { songhyeonSupabase } from './songhyeonSupabase';
import { initialSonghyeonTasks } from '../data/songhyeonTaskBoard';
import { categoryForSonghyeonTask, songhyeonTaskCategories } from '../data/songhyeonTaskCategories.js';
import { deliverableForSonghyeonTask } from '../data/songhyeonTaskDeliverables.js';

import { nextActionForSonghyeonTask } from '../data/songhyeonTaskNextActions.js';
import { normalizeSonghyeonGateStage } from '../data/songhyeonGateStages.js';

export class SonghyeonTaskRepositoryError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'SonghyeonTaskRepositoryError';
    this.cause = cause;
  }
}

const requireSupabase = () => {
  if (!songhyeonSupabase) throw new SonghyeonTaskRepositoryError('송현 Supabase 연결이 설정되지 않았습니다.');
  return songhyeonSupabase;
};
const assertActor = (actor) => {
  if (!actor?.userId) throw new SonghyeonTaskRepositoryError('인증된 송현 BID 멤버만 업무를 변경할 수 있습니다.');
};
const run = async (promise, message) => {
  const { data, error } = await promise;
  if (error) throw new SonghyeonTaskRepositoryError(message, error);
  return data;
};
const taskPayload = (row) => {
  const payload = row.payload || {};
  const canonicalGateStage = normalizeSonghyeonGateStage(payload.gateStage || payload.stage, row.source_key);
  return {
    ...payload,
    stage: canonicalGateStage,
    gateStage: canonicalGateStage,
    categoryMain: payload.sourceType === 'manual' ? payload.categoryMain : categoryForSonghyeonTask(row.source_key, payload.categoryMain),
    deliverables: payload.sourceType === 'manual' ? payload.deliverables : deliverableForSonghyeonTask(row.source_key),
    nextAction: payload.sourceType === 'manual' ? payload.nextAction : nextActionForSonghyeonTask(row.source_key),
    id: row.id,
    sourceKey: row.source_key,
    updatedAt: row.updated_at,
  };
};
const commentPayload = (row) => ({ id: row.id, sourceKey: row.task_source_key, text: row.body, author: row.author_name, authorEmail: row.author_email, createdAt: row.created_at });
const activityPayload = (row) => ({ id: row.id, sourceKey: row.task_source_key, action: row.action, payload: row.payload, actor: row.actor_name, createdAt: row.created_at });
const now = () => new Date().toISOString();
const uid = (prefix) => `${prefix}-${crypto.randomUUID()}`;

export async function seedMissingTasks() {
  const client = requireSupabase();
  const existing = await run(client.from('songhyeon_tasks').select('source_key'), '송현 업무 원장을 확인하지 못했습니다.');
  const keys = new Set(existing.map((row) => row.source_key));
  const missing = initialSonghyeonTasks.filter((task) => !keys.has(task.sourceKey));
  if (!missing.length) return;
  for (const task of missing) {
    await run(client.rpc('seed_songhyeon_task', {
      seed_id: task.id,
      seed_source_key: task.sourceKey,
      seed_display_order: initialSonghyeonTasks.findIndex((item) => item.sourceKey === task.sourceKey),
      seed_payload: task,
    }), `초기 업무를 등록하지 못했습니다: ${task.sourceKey}`);
  }
}

export async function loadTasks() {
  const client = requireSupabase();
  const rows = await run(client.from('songhyeon_tasks').select('*').order('display_order'), '송현 통합업무를 불러오지 못했습니다.');
  return rows.map(taskPayload);
}

const uniqueText = (values) => [...new Set(values.map((value) => String(value || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'ko'));
export async function loadTaskEditorOptions() {
  const client = requireSupabase();
  const [taskRows, members, sharedStakeholders] = await Promise.all([
    run(client.from('songhyeon_tasks').select('payload').order('display_order'), '업무 자동완성 후보를 불러오지 못했습니다.'),
    run(client.from('songhyeon_members').select('staff_name, group_name').eq('is_active', true).order('display_order'), '담당자 자동완성 후보를 불러오지 못했습니다.'),
    run(client.from('songhyeon_shared_stakeholders').select('stakeholder_name').limit(5000), '공통 외부상대방 후보를 불러오지 못했습니다.'),
  ]);
  const tasks = taskRows.map((row) => row.payload || {});
  return {
    categories: songhyeonTaskCategories,
    assignees: uniqueText(members.map((member) => member.staff_name)),
    supportOptions: uniqueText(tasks.map((task) => task.supportNeeded)),
    stakeholders: uniqueText([
      ...sharedStakeholders.map((item) => item.stakeholder_name),
      ...tasks.map((task) => task.externalParty),
    ]),
    departments: uniqueText(members.map((member) => member.group_name)),
  };
}

export async function createTask(task, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const sourceKey = task.sourceKey || `MANUAL-${crypto.randomUUID().toUpperCase()}`;
  const id = task.id || `songhyeon-${sourceKey.toLowerCase()}`;
  const lastRows = await run(client.from('songhyeon_tasks').select('display_order').order('display_order', { ascending: false }).limit(1), '업무 표시 순서를 확인하지 못했습니다.');
  const displayOrder = (lastRows[0]?.display_order ?? -1) + 1;
  const timestamp = now();
  const payload = { ...task, id, sourceKey, sourceType: task.sourceType || 'manual', createdAt: timestamp, updatedAt: timestamp };
  const row = await run(client.from('songhyeon_tasks').insert({ id, source_key: sourceKey, display_order: displayOrder, payload, updated_by: actor.userId }).select('*').single(), '새 업무를 등록하지 못했습니다.');
  await addActivity(sourceKey, 'task_seeded', { source: 'manual' }, actor);
  return taskPayload(row);
}

export async function updateTask(sourceKey, patch, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const currentRow = await run(client.from('songhyeon_tasks').select('*').eq('source_key', sourceKey).maybeSingle(), '업무 원문을 확인하지 못했습니다.');
  if (!currentRow) throw new SonghyeonTaskRepositoryError(`업무를 찾을 수 없습니다: ${sourceKey}`);
  const current = taskPayload(currentRow);
  const updated = { ...current, ...patch, sourceKey, updatedAt: now() };
  const row = await run(client.from('songhyeon_tasks').update({ payload: updated, updated_by: actor.userId, updated_at: updated.updatedAt }).eq('source_key', sourceKey).select('*').single(), '업무를 저장하지 못했습니다.');
  const changes = Object.entries(patch).filter(([key, value]) => JSON.stringify(current[key]) !== JSON.stringify(value)).map(([field, value]) => ({ field, oldValue: current[field], newValue: value }));
  if (changes.length) await addActivity(sourceKey, 'task_updated', { changes }, actor);
  return taskPayload(row);
}

export async function deleteTask(sourceKey, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const row = await run(
    client.from('songhyeon_tasks').delete().eq('source_key', sourceKey).select('source_key').maybeSingle(),
    '업무를 삭제하지 못했습니다.',
  );
  if (!row) throw new SonghyeonTaskRepositoryError(`삭제할 업무를 찾을 수 없습니다: ${sourceKey}`);
  return sourceKey;
}

export async function loadComments(sourceKey) {
  const client = requireSupabase();
  const rows = await run(client.from('songhyeon_task_comments').select('*').eq('task_source_key', sourceKey).order('created_at'), '댓글을 불러오지 못했습니다.');
  return rows.map(commentPayload);
}

export async function addComment(sourceKey, text, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const body = text.trim();
  if (!body) throw new SonghyeonTaskRepositoryError('댓글 내용을 입력해 주세요.');
  const row = await run(client.from('songhyeon_task_comments').insert({ id: uid('comment'), task_source_key: sourceKey, body, author_id: actor.userId, author_name: actor.name, author_email: actor.email || '' }).select('*').single(), '댓글을 등록하지 못했습니다.');
  await addActivity(sourceKey, 'comment_added', { commentId: row.id }, actor);
  return commentPayload(row);
}

export async function deleteComment(sourceKey, commentId, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  await run(client.from('songhyeon_task_comments').delete().eq('id', commentId).eq('task_source_key', sourceKey), '댓글을 삭제하지 못했습니다.');
  await addActivity(sourceKey, 'comment_deleted', { commentId }, actor);
}

export async function loadActivity(sourceKey) {
  const client = requireSupabase();
  const rows = await run(client.from('songhyeon_task_activity').select('*').eq('task_source_key', sourceKey).order('created_at', { ascending: false }), '변경 이력을 불러오지 못했습니다.');
  return rows.map(activityPayload);
}

export async function addActivity(sourceKey, action, payload, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const row = await run(client.from('songhyeon_task_activity').insert({ id: uid('activity'), task_source_key: sourceKey, action, payload, actor_id: actor.userId, actor_name: actor.name }).select('*').single(), '업무 변경 이력을 기록하지 못했습니다.');
  return activityPayload(row);
}
