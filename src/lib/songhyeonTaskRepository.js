import { songhyeonSupabase } from './songhyeonSupabase';
import { initialSonghyeonTasks } from '../data/songhyeonTaskBoard';
import { categoryForSonghyeonTask, songhyeonTaskCategories } from '../data/songhyeonTaskCategories.js';
import { deliverableForSonghyeonTask } from '../data/songhyeonTaskDeliverables.js';

import { nextActionForSonghyeonTask } from '../data/songhyeonTaskNextActions.js';
import { normalizeSonghyeonGateStage } from '../data/songhyeonGateStages.js';
import { normalizeSonghyeonTaskImportance } from '../data/songhyeonTaskImportance.js';
import { activeSonghyeonTaskLeads, normalizeSonghyeonTaskLead } from '../data/songhyeonTaskLeads.js';
import { normalizeSonghyeonTaskStatus } from '../data/songhyeonTaskStatuses.js';
import {
  normalizeSonghyeonAssignee,
  storedSonghyeonTaskValue,
} from './songhyeonTaskFields.js';
import { hasAuthenticatedSonghyeonSession } from './songhyeonReadSession.js';

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
const isJeonGiyoungTaskOwner = (actor) => actor?.name === '전기영'
  && normalizedEmail(actor?.email) === 'jk.jeon@igisam.com';
const assertTaskOwner = (actor, action) => {
  assertActor(actor);
  if (!isJeonGiyoungTaskOwner(actor)) {
    throw new SonghyeonTaskRepositoryError(`업무 ${action}은 전기영 계정만 할 수 있습니다.`);
  }
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
    deliverables: storedSonghyeonTaskValue(payload, 'deliverables', payload.sourceType === 'manual' ? '' : deliverableForSonghyeonTask(row.source_key)),
    nextAction: storedSonghyeonTaskValue(payload, 'nextAction', payload.sourceType === 'manual' ? '' : nextActionForSonghyeonTask(row.source_key)),
    importanceLevel: normalizeSonghyeonTaskImportance(payload.importanceLevel),
    leadDept: normalizeSonghyeonTaskLead(payload.leadDept),
    status: normalizeSonghyeonTaskStatus(payload.status),
    id: row.id,
    sourceKey: row.source_key,
    displayOrder: row.display_order,
    version: row.version ?? 1,
    startedAt: row.started_at || payload.startedAt || null,
    startedBy: row.started_by || payload.startedBy || null,
    completedAt: row.completed_at || payload.completedAt || null,
    completedBy: row.completed_by || payload.completedBy || null,
    completionSummary: row.completion_summary ?? payload.completionSummary ?? '',
    completionEvidenceUrl: row.completion_evidence_url ?? payload.completionEvidenceUrl ?? '',
    archivedAt: row.archived_at || null,
    archivedBy: row.archived_by || null,
    archiveReason: row.archive_reason || '',
    updatedAt: row.updated_at,
  };
};
const normalizedEmail = (value) => String(value || '').trim().toLowerCase();
const emptyReactions = () => ({ like: [], check: [] });
const reactionPayload = (row, member = {}) => ({
  userId: row.reactor_id || row.reactor_profile_id,
  name: member.staff_name || row.reactor_name || normalizedEmail(row.reactor_email).split('@')[0] || '송현 BID TF',
  email: member.email || row.reactor_email || '',
  group: member.group_name || row.reactor_group_name || '송현 BID TF',
  photoPath: member.photo_path || row.reactor_photo_path || '',
  createdAt: row.created_at,
});
const replyPayload = (row, member = {}, reactions = emptyReactions()) => ({
  id: row.id,
  sourceKey: row.task_source_key,
  commentId: row.comment_id,
  text: row.body,
  authorId: row.author_id || row.author_profile_id,
  author: row.author_name,
  authorEmail: row.author_email,
  authorGroup: member.group_name || row.author_group_name || '송현 BID TF',
  authorPhoto: member.photo_path || row.author_photo_path || '',
  reactions,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  editedAt: row.edited_at || null,
});
const commentPayload = (row, member = {}, replies = [], reactions = emptyReactions()) => ({
  id: row.id,
  sourceKey: row.task_source_key,
  text: row.body,
  authorId: row.author_id || row.author_profile_id,
  author: row.author_name,
  authorEmail: row.author_email,
  authorGroup: member.group_name || row.author_group_name || '송현 BID TF',
  authorPhoto: member.photo_path || row.author_photo_path || '',
  replies,
  reactions,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  editedAt: row.edited_at || null,
});
const activityPayload = (row) => ({ id: row.id, sourceKey: row.task_source_key, action: row.action, payload: row.payload, actorId: row.actor_id, actor: row.actor_name, createdAt: row.created_at });
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
  const authenticated = await hasAuthenticatedSonghyeonSession(client);
  const query = authenticated
    ? client.from('songhyeon_tasks').select('*').is('archived_at', null).order('display_order')
    : client.from('songhyeon_public_tasks').select('*').order('display_order');
  const rows = await run(query, '송현 통합업무를 불러오지 못했습니다.');
  return rows.map(taskPayload);
}

export async function loadArchivedTasks() {
  const client = requireSupabase();
  const authenticated = await hasAuthenticatedSonghyeonSession(client);
  if (!authenticated) {
    throw new SonghyeonTaskRepositoryError('보관된 업무는 인증된 송현 BID 멤버만 확인할 수 있습니다.');
  }
  const rows = await run(
    client.from('songhyeon_tasks')
      .select('*')
      .not('archived_at', 'is', null)
      .order('archived_at', { ascending: false })
      .order('display_order', { ascending: true }),
    '보관된 송현 통합업무를 불러오지 못했습니다.',
  );
  return rows.map(taskPayload);
}

export function subscribeToTasks(userId, onChange) {
  if (!userId) throw new SonghyeonTaskRepositoryError('인증된 송현 BID 멤버만 업무 변경을 확인할 수 있습니다.');
  const client = requireSupabase();
  const channel = client.channel(`songhyeon-tasks:${userId}:${crypto.randomUUID()}`);
  channel.on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'songhyeon_tasks',
  }, (event) => {
    const row = event.new && Object.keys(event.new).length ? event.new : event.old;
    if (!row?.source_key) return;
    if (event.eventType === 'DELETE' || row.archived_at) {
      onChange?.({ type: 'remove', sourceKey: row.source_key });
      return;
    }
    onChange?.({ type: 'upsert', task: taskPayload(row) });
  });
  channel.subscribe();
  return () => { void client.removeChannel(channel); };
}

export async function loadTaskDiscussionUnreadSourceKeys(userId) {
  if (!userId) throw new SonghyeonTaskRepositoryError('인증된 송현 BID 멤버만 새 댓글을 확인할 수 있습니다.');
  const rows = await run(
    requireSupabase().rpc('get_songhyeon_task_discussion_unread_counts'),
    '새 업무 댓글을 확인하지 못했습니다.',
  );
  return new Set((rows || []).map((row) => row.task_source_key).filter(Boolean));
}

export async function markTaskDiscussionRead(sourceKey, actor = {}) {
  assertActor(actor);
  if (!String(sourceKey || '').trim()) throw new SonghyeonTaskRepositoryError('읽음 처리할 업무를 확인해 주세요.');
  return run(
    requireSupabase().rpc('mark_songhyeon_task_discussion_read', { target_task_source_key: sourceKey }),
    '새 댓글 읽음 상태를 저장하지 못했습니다.',
  );
}

export function subscribeToTaskDiscussionUnread(userId, onChange) {
  if (!userId) throw new SonghyeonTaskRepositoryError('인증된 송현 BID 멤버만 새 댓글을 확인할 수 있습니다.');
  const client = requireSupabase();
  const channel = client.channel(`songhyeon-task-discussion-unread:${userId}:${crypto.randomUUID()}`);
  for (const table of ['songhyeon_task_comments', 'songhyeon_task_comment_replies']) {
    channel.on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table,
    }, (event) => {
      const entry = event.new || {};
      if (!entry.task_source_key) return;
      onChange?.({
        sourceKey: entry.task_source_key,
        authorId: entry.author_id,
        createdAt: entry.created_at,
        entryType: table === 'songhyeon_task_comments' ? 'comment' : 'reply',
      });
    });
  }
  channel.subscribe();
  return () => { void client.removeChannel(channel); };
}

const uniqueText = (values) => [...new Set(values.map((value) => String(value || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'ko'));
export async function loadTaskEditorOptions() {
  const client = requireSupabase();
  const [taskRows, members, sharedStakeholders] = await Promise.all([
    run(client.from('songhyeon_tasks').select('payload').is('archived_at', null).order('display_order'), '업무 자동완성 후보를 불러오지 못했습니다.'),
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
    leadDepartments: activeSonghyeonTaskLeads(tasks),
    departments: uniqueText(members.map((member) => normalizeSonghyeonTaskLead(member.group_name))),
  };
}

export async function createTask(task, actor = {}) {
  assertTaskOwner(actor, '등록');
  const client = requireSupabase();
  const sourceKey = task.sourceKey || `MANUAL-${crypto.randomUUID().toUpperCase()}`;
  const id = task.id || `songhyeon-${sourceKey.toLowerCase()}`;
  const timestamp = now();
  const payload = { ...task, id, sourceKey, sourceType: task.sourceType || 'manual', leadDept: normalizeSonghyeonTaskLead(task.leadDept), importanceLevel: normalizeSonghyeonTaskImportance(task.importanceLevel), status: '미착수', createdAt: timestamp, updatedAt: timestamp };
  const row = await run(client.rpc('create_songhyeon_task_atomic', {
    task_id: id,
    task_source_key: sourceKey,
    task_payload: payload,
  }), '새 업무를 등록하지 못했습니다.');
  return taskPayload(Array.isArray(row) ? row[0] : row);
}

export async function reorderTask(sourceKey, adjacentSourceKey, actor = {}) {
  assertTaskOwner(actor, '순서 변경');
  if (!String(sourceKey || '').trim() || !String(adjacentSourceKey || '').trim()) {
    throw new SonghyeonTaskRepositoryError('순서를 바꿀 업무를 확인해 주세요.');
  }
  const rows = await run(requireSupabase().rpc('reorder_songhyeon_tasks', {
    target_source_key: sourceKey,
    adjacent_source_key: adjacentSourceKey,
  }), '업무 순서를 변경하지 못했습니다.');
  return (rows || []).map(taskPayload);
}

export async function updateTask(sourceKey, patch, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const currentRow = await run(client.from('songhyeon_tasks').select('*').eq('source_key', sourceKey).maybeSingle(), '업무 원문을 확인하지 못했습니다.');
  if (!currentRow) throw new SonghyeonTaskRepositoryError(`업무를 찾을 수 없습니다: ${sourceKey}`);
  const current = taskPayload(currentRow);
  const normalizedPatch = {
    ...patch,
    ...(Object.prototype.hasOwnProperty.call(patch, 'assignee') ? { assignee: normalizeSonghyeonAssignee(patch.assignee) } : {}),
    ...(Object.prototype.hasOwnProperty.call(patch, 'leadDept') ? { leadDept: normalizeSonghyeonTaskLead(patch.leadDept) } : {}),
    ...(Object.prototype.hasOwnProperty.call(patch, 'importanceLevel') ? { importanceLevel: normalizeSonghyeonTaskImportance(patch.importanceLevel) } : {}),
    ...(Object.prototype.hasOwnProperty.call(patch, 'status') ? { status: normalizeSonghyeonTaskStatus(patch.status) } : {}),
  };
  if (normalizedPatch.status !== undefined && normalizedPatch.status !== current.status) {
    throw new SonghyeonTaskRepositoryError('상태는 전용 상태 변경 기능에서 변경해 주세요.');
  }
  const row = await run(client.rpc('update_songhyeon_task_atomic', {
    target_source_key: sourceKey,
    task_patch: normalizedPatch,
    expected_version: patch.version ?? currentRow.version ?? 1,
  }), '업무를 저장하지 못했습니다.');
  return taskPayload(Array.isArray(row) ? row[0] : row);
}

export async function transitionTaskWorkflow(sourceKey, action, details = {}, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const currentRow = await run(
    client.from('songhyeon_tasks').select('source_key, version, archived_at').eq('source_key', sourceKey).maybeSingle(),
    '업무 상태를 확인하지 못했습니다.',
  );
  if (!currentRow || currentRow.archived_at) throw new SonghyeonTaskRepositoryError(`업무를 찾을 수 없습니다: ${sourceKey}`);
  const row = await run(client.rpc('transition_songhyeon_task_workflow', {
    target_source_key: sourceKey,
    workflow_action: action,
    workflow_details: details || {},
    expected_version: currentRow.version ?? 1,
  }), '업무 상태를 변경하지 못했습니다.');
  return taskPayload(Array.isArray(row) ? row[0] : row);
}

export const startTask = (sourceKey, actor = {}) => transitionTaskWorkflow(sourceKey, 'start', {}, actor);
export const completeTask = (sourceKey, { summary = '', evidenceUrl = '' } = {}, actor = {}) => {
  if (!String(summary).trim()) throw new SonghyeonTaskRepositoryError('완료한 내용을 입력해 주세요.');
  if (evidenceUrl && !/^https:\/\//i.test(String(evidenceUrl).trim())) throw new SonghyeonTaskRepositoryError('완료 증빙 URL은 https:// 주소로 입력해 주세요.');
  return transitionTaskWorkflow(sourceKey, 'complete', { summary: String(summary).trim(), evidenceUrl: String(evidenceUrl).trim() }, actor);
};
const transitionWithReason = (sourceKey, action, reason, actor) => {
  const cleanReason = String(reason || '').trim();
  if (!cleanReason) throw new SonghyeonTaskRepositoryError('처리 사유를 입력해 주세요.');
  return transitionTaskWorkflow(sourceKey, action, { reason: cleanReason }, actor);
};
export const stopTask = (sourceKey, { reason = '' } = {}, actor = {}) => transitionWithReason(sourceKey, 'stop', reason, actor);
export const resumeTask = (sourceKey, { reason = '' } = {}, actor = {}) => transitionWithReason(sourceKey, 'resume', reason, actor);
export const resetTask = (sourceKey, { reason = '' } = {}, actor = {}) => transitionWithReason(sourceKey, 'reset', reason, actor);

export async function archiveTask(sourceKey, { reason = '' } = {}, actor = {}) {
  assertTaskOwner(actor, '보관');
  const cleanReason = String(reason || '').trim();
  if (!cleanReason) throw new SonghyeonTaskRepositoryError('보관 사유를 입력해 주세요.');
  const client = requireSupabase();
  const currentRow = await run(
    client.from('songhyeon_tasks').select('source_key, version, archived_at').eq('source_key', sourceKey).maybeSingle(),
    '보관할 업무를 확인하지 못했습니다.',
  );
  if (!currentRow || currentRow.archived_at) throw new SonghyeonTaskRepositoryError(`보관할 업무를 찾을 수 없습니다: ${sourceKey}`);
  const row = await run(client.rpc('archive_songhyeon_task', {
    target_source_key: sourceKey,
    archive_reason_text: cleanReason,
    expected_version: currentRow.version ?? 1,
  }), '업무를 보관하지 못했습니다.');
  return taskPayload(Array.isArray(row) ? row[0] : row);
}

export async function deleteTask(sourceKey, actor = {}) {
  await archiveTask(sourceKey, { reason: '관리자 보관 처리' }, actor);
  return sourceKey;
}

export async function loadComments(sourceKey) {
  const client = requireSupabase();
  const authenticated = await hasAuthenticatedSonghyeonSession(client);
  const tables = authenticated ? {
    comments: 'songhyeon_task_comments',
    replies: 'songhyeon_task_comment_replies',
    commentReactions: 'songhyeon_task_comment_reactions',
    replyReactions: 'songhyeon_task_reply_reactions',
  } : {
    comments: 'songhyeon_public_task_comments',
    replies: 'songhyeon_public_task_comment_replies',
    commentReactions: 'songhyeon_public_task_comment_reactions',
    replyReactions: 'songhyeon_public_task_reply_reactions',
  };
  const [rows, members, replyRows, commentReactionRows, replyReactionRows] = await Promise.all([
    run(client.from(tables.comments).select('*').eq('task_source_key', sourceKey).order('created_at'), '댓글을 불러오지 못했습니다.'),
    authenticated
      ? run(client.from('songhyeon_members').select('auth_id, email, staff_name, group_name, photo_path').eq('is_active', true), '댓글 작성자 정보를 불러오지 못했습니다.')
      : Promise.resolve([]),
    run(client.from(tables.replies).select('*').eq('task_source_key', sourceKey).order('created_at'), '대댓글을 불러오지 못했습니다.'),
    run(client.from(tables.commentReactions).select('*').eq('task_source_key', sourceKey).order('created_at'), '댓글 반응을 불러오지 못했습니다.'),
    run(client.from(tables.replyReactions).select('*').eq('task_source_key', sourceKey).order('created_at'), '대댓글 반응을 불러오지 못했습니다.'),
  ]);
  const membersByAuthId = new Map(members.filter((member) => member.auth_id).map((member) => [member.auth_id, member]));
  const membersByEmail = new Map(members.map((member) => [normalizedEmail(member.email), member]));
  const memberFor = (row, idField, emailField) => membersByAuthId.get(row[idField]) || membersByEmail.get(normalizedEmail(row[emailField])) || {};
  const reactionsFor = (reactionRows, idField, targetId) => reactionRows
    .filter((reaction) => reaction[idField] === targetId)
    .reduce((reactions, reaction) => {
      reactions[reaction.reaction_type].push(reactionPayload(reaction, memberFor(reaction, 'reactor_id', 'reactor_email')));
      return reactions;
    }, emptyReactions());
  const repliesFor = (commentId) => replyRows
    .filter((reply) => reply.comment_id === commentId)
    .map((reply) => replyPayload(
      reply,
      memberFor(reply, 'author_id', 'author_email'),
      reactionsFor(replyReactionRows, 'reply_id', reply.id),
    ));
  return rows.map((row) => commentPayload(
    row,
    memberFor(row, 'author_id', 'author_email'),
    repliesFor(row.id),
    reactionsFor(commentReactionRows, 'comment_id', row.id),
  ));
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

export async function updateComment(sourceKey, commentId, text, actor = {}) {
  assertActor(actor);
  if (!String(sourceKey || '').trim() || !String(commentId || '').trim()) {
    throw new SonghyeonTaskRepositoryError('수정할 댓글을 확인해 주세요.');
  }
  const body = String(text || '').trim();
  if (!body) throw new SonghyeonTaskRepositoryError('댓글 내용을 입력해 주세요.');
  const row = await run(requireSupabase().rpc('update_songhyeon_task_comment', {
    target_comment_id: commentId,
    target_body: body,
  }), '댓글을 수정하지 못했습니다.');
  return commentPayload(Array.isArray(row) ? row[0] : row);
}

export async function addReply(sourceKey, commentId, text, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const body = text.trim();
  if (!body) throw new SonghyeonTaskRepositoryError('대댓글 내용을 입력해 주세요.');
  const row = await run(client.from('songhyeon_task_comment_replies').insert({
    id: uid('reply'),
    task_source_key: sourceKey,
    comment_id: commentId,
    body,
    author_id: actor.userId,
    author_name: actor.name,
    author_email: actor.email || '',
  }).select('*').single(), '대댓글을 등록하지 못했습니다.');
  return replyPayload(row);
}

export async function deleteReply(sourceKey, commentId, replyId, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const row = await run(
    client.from('songhyeon_task_comment_replies').delete()
      .eq('id', replyId).eq('comment_id', commentId).eq('task_source_key', sourceKey)
      .select('id').maybeSingle(),
    '대댓글을 삭제하지 못했습니다.',
  );
  if (!row) throw new SonghyeonTaskRepositoryError('삭제할 대댓글을 찾을 수 없거나 삭제 권한이 없습니다.');
  return replyId;
}

export async function updateReply(sourceKey, commentId, replyId, text, actor = {}) {
  assertActor(actor);
  if (!String(sourceKey || '').trim() || !String(commentId || '').trim() || !String(replyId || '').trim()) {
    throw new SonghyeonTaskRepositoryError('수정할 대댓글을 확인해 주세요.');
  }
  const body = String(text || '').trim();
  if (!body) throw new SonghyeonTaskRepositoryError('대댓글 내용을 입력해 주세요.');
  const row = await run(requireSupabase().rpc('update_songhyeon_task_reply', {
    target_reply_id: replyId,
    target_body: body,
  }), '대댓글을 수정하지 못했습니다.');
  return replyPayload(Array.isArray(row) ? row[0] : row);
}

const assertReactionType = (reactionType) => {
  if (!['like', 'check'].includes(reactionType)) throw new SonghyeonTaskRepositoryError('지원하지 않는 반응입니다.');
};

export async function toggleCommentReaction(commentId, reactionType, actor = {}) {
  assertActor(actor);
  assertReactionType(reactionType);
  return run(requireSupabase().rpc('toggle_songhyeon_task_comment_reaction', {
    target_comment_id: commentId,
    target_reaction_type: reactionType,
  }), '댓글 반응을 저장하지 못했습니다.');
}

export async function toggleReplyReaction(replyId, reactionType, actor = {}) {
  assertActor(actor);
  assertReactionType(reactionType);
  return run(requireSupabase().rpc('toggle_songhyeon_task_reply_reaction', {
    target_reply_id: replyId,
    target_reaction_type: reactionType,
  }), '대댓글 반응을 저장하지 못했습니다.');
}

export function subscribeToTaskDiscussion(sourceKey, onChange) {
  const client = requireSupabase();
  const channel = client.channel(`songhyeon-task-discussion:${sourceKey}:${crypto.randomUUID()}`);
  for (const table of [
    'songhyeon_task_comments',
    'songhyeon_task_comment_replies',
    'songhyeon_task_comment_reactions',
    'songhyeon_task_reply_reactions',
  ]) {
    channel.on('postgres_changes', {
      event: '*',
      schema: 'public',
      table,
      filter: `task_source_key=eq.${sourceKey}`,
    }, onChange);
  }
  channel.subscribe();
  return () => { void client.removeChannel(channel); };
}

export async function loadActivity(sourceKey) {
  const client = requireSupabase();
  const authenticated = await hasAuthenticatedSonghyeonSession(client);
  const table = authenticated ? 'songhyeon_task_activity' : 'songhyeon_public_task_activity';
  const rows = await run(client.from(table).select('*').eq('task_source_key', sourceKey).order('created_at', { ascending: false }), '변경 이력을 불러오지 못했습니다.');
  return rows.map(activityPayload);
}

export async function deleteActivity(sourceKey, activityId, actor = {}) {
  assertActor(actor);
  const isJeonGiyoung = actor.name === '전기영' && actor.email?.toLowerCase() === 'jk.jeon@igisam.com';
  if (!isJeonGiyoung) throw new SonghyeonTaskRepositoryError('변경 이력은 전기영 계정만 삭제할 수 있습니다.');
  const client = requireSupabase();
  const row = await run(
    client.from('songhyeon_task_activity').delete().eq('id', activityId).eq('task_source_key', sourceKey).select('id').maybeSingle(),
    '변경 이력을 삭제하지 못했습니다.',
  );
  if (!row) throw new SonghyeonTaskRepositoryError('삭제할 변경 이력을 찾을 수 없거나 삭제 권한이 없습니다.');
  return activityId;
}

export async function addActivity(sourceKey, action, payload, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const row = await run(client.from('songhyeon_task_activity').insert({ id: uid('activity'), task_source_key: sourceKey, action, payload, actor_id: actor.userId, actor_name: actor.name }).select('*').single(), '업무 변경 이력을 기록하지 못했습니다.');
  return activityPayload(row);
}
