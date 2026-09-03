import { songhyeonSupabase } from './songhyeonSupabase';
import { hasAuthenticatedSonghyeonSession } from './songhyeonReadSession.js';
import { loadTasks } from './songhyeonTaskRepository.js';
import {
  SONGHYEON_FEED_PRIORITIES,
  SONGHYEON_FEED_PROJECTS,
  SONGHYEON_FEED_PURPOSES,
  SONGHYEON_FEED_STATUSES,
} from '../data/songhyeonTaskFeedOptions.js';

export class SonghyeonTaskFeedRepositoryError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'SonghyeonTaskFeedRepositoryError';
    this.cause = cause;
    this.code = cause?.code;
    this.details = cause?.details;
    this.hint = cause?.hint;
  }
}

const requireSupabase = () => {
  if (!songhyeonSupabase) throw new SonghyeonTaskFeedRepositoryError('송현 Supabase 연결이 설정되지 않았습니다.');
  return songhyeonSupabase;
};

const assertActor = (actor) => {
  if (!actor?.userId) throw new SonghyeonTaskFeedRepositoryError('인증된 송현 BID 멤버만 업무 피드를 변경할 수 있습니다.');
};

const text = (value) => String(value || '').trim();

const mutationErrorMessage = (message, error) => {
  const code = text(error?.code);
  const diagnostic = [error?.message, error?.details, error?.hint].map(text).filter(Boolean).join(' ');
  if (code === '42883' && /is_songhyeon_member/i.test(diagnostic)) {
    return '이해관계자 정보를 동기화하지 못했습니다. 페이지를 새로고침한 뒤 다시 시도해 주세요.';
  }
  if (code === '23503') {
    return '연결한 통합업무가 변경되었습니다. 연결 업무를 다시 선택한 뒤 저장해 주세요.';
  }
  if (code === '42501' || /SONGHYEON_MEMBERSHIP_REQUIRED|AUTH_REQUIRED/i.test(diagnostic)) {
    return '송현 BID 멤버 로그인 상태를 확인한 뒤 다시 시도해 주세요.';
  }
  if (/fetch failed|failed to fetch|network/i.test(diagnostic)) {
    return '네트워크 연결을 확인한 뒤 다시 시도해 주세요.';
  }
  return message;
};

const run = async (promise, message) => {
  const { data, error } = await promise;
  if (error) throw new SonghyeonTaskFeedRepositoryError(mutationErrorMessage(message, error), error);
  return data;
};

const array = (value) => Array.isArray(value) ? value : [];
const unique = (values) => [...new Set(values.map(text).filter(Boolean))];
const isUuid = (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
const uid = (prefix) => `${prefix}-${crypto.randomUUID()}`;

// The feed rows and the write/filter options both need the active task list.
// Share only the in-flight request so concurrent initial loads use one query,
// while later refreshes still receive current task data.
let taskFeedTasksInFlight = null;
const loadTaskFeedTasks = () => {
  if (!taskFeedTasksInFlight) {
    taskFeedTasksInFlight = loadTasks().finally(() => {
      taskFeedTasksInFlight = null;
    });
  }
  return taskFeedTasksInFlight;
};

const toProfile = (row, prefix) => ({
  userId: row[`${prefix}_id`] || null,
  memberId: row[`${prefix}_member_id`] || row[`${prefix}_profile_id`] || null,
  name: row[`${prefix}_name`] || '',
  email: row[`${prefix}_email`] || '',
  group: row[`${prefix}_group_name`] || '',
  photoPath: row[`${prefix}_photo_path`] || '',
});

const toReactionProfile = (row) => ({
  ...toProfile(row, 'reactor'),
  createdAt: row.created_at,
});

const blankReactions = () => ({ like: [], check: [] });
const reactionsFor = (rows, postId, commentId = null) => rows
  .filter((row) => row.post_id === postId && (row.comment_id || null) === commentId);
const groupedReactions = (rows) => rows.reduce((result, row) => {
  if (row.reaction_type === 'like' || row.reaction_type === 'check') result[row.reaction_type].push(toReactionProfile(row));
  return result;
}, blankReactions());

const toAttachment = (row) => ({
  id: row.id,
  postId: row.post_id,
  name: row.file_name,
  path: row.object_path,
  mimeType: row.mime_type,
  size: Number(row.size_bytes || 0),
  createdAt: row.created_at,
});

const toComment = (row, reactionRows) => ({
  id: row.id,
  postId: row.post_id,
  content: row.body,
  author: toProfile(row, 'author'),
  reactions: groupedReactions(reactionsFor(reactionRows, row.post_id, row.id)),
  createdAt: row.created_at,
  updatedAt: row.updated_at || row.created_at,
});

const stakeholderFor = (rows, postId) => {
  const row = rows.find((item) => item.post_id === postId);
  return row ? {
    companyName: text(row.company_name) || text(row.category),
    contactName: text(row.contact_name),
  } : null;
};

const stakeholderLabel = (stakeholder) => stakeholder
  ? [stakeholder.companyName, stakeholder.contactName].map(text).filter(Boolean).join(' - ') || stakeholder.category
  : '';

const permissionsFor = (rows, postId) => ({
  groups: rows.filter((row) => row.post_id === postId && row.grantee_type === 'group').map((row) => row.group_name),
  individuals: rows.filter((row) => row.post_id === postId && row.grantee_type === 'member').map((row) => row.member_id),
});

const mentionsFor = (rows, postId) => rows.filter((row) => row.post_id === postId).map((row) => ({
  id: row.id,
  type: row.mention_type === 'department' ? 'group' : 'person',
  label: row.label,
  memberId: row.member_id || row.mentioned_profile_id || null,
  groupName: row.group_name || '',
}));

const postFromRow = (row, related) => {
  const linkedKeys = related.taskLinks.filter((link) => link.post_id === row.id).map((link) => link.task_source_key);
  const stakeholder = stakeholderFor(related.stakeholders, row.id);
  return {
    id: row.id,
    workDate: row.work_date,
    title: row.title,
    content: row.body || '',
    projectCode: row.project_code,
    projectName: SONGHYEON_FEED_PROJECTS.find((project) => project.value === row.project_code)?.label || row.project_code,
    purpose: row.purpose,
    status: row.status,
    priority: row.priority,
    author: toProfile(row, 'author'),
    cell: row.author_group_name,
    stakeholder,
    stakeholderLabel: stakeholderLabel(stakeholder),
    permissions: permissionsFor(related.permissions, row.id),
    mentions: mentionsFor(related.mentions, row.id),
    attachments: related.attachments.filter((item) => item.post_id === row.id).map(toAttachment),
    linkedTaskIds: linkedKeys,
    linkedTasks: linkedKeys.map((key) => related.tasksByKey.get(key)).filter(Boolean),
    comments: related.comments.filter((comment) => comment.post_id === row.id).map((comment) => toComment(comment, related.reactions)),
    reactions: groupedReactions(reactionsFor(related.reactions, row.id, null)),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const filteredPostQuery = (client, table, filters) => {
  let query = client.from(table).select('*').order('work_date', { ascending: false }).order('created_at', { ascending: false });
  if (filters.purpose) query = query.eq('purpose', filters.purpose);
  if (filters.status) query = query.eq('status', filters.status);
  if (filters.priority) query = query.eq('priority', filters.priority);
  return query;
};

const authenticatedFeedBundle = async (client, filters) => {
  const { data, error } = await client.rpc('get_songhyeon_task_feed_bundle', {
    filter_purpose: text(filters.purpose) || null,
    filter_status: text(filters.status) || null,
    filter_priority: text(filters.priority) || null,
  });
  // Keep a deployment-order fallback: an older API node may briefly retain
  // its schema cache while the additive migration is being rolled out.
  if (error?.code === 'PGRST202') return null;
  if (error) throw new SonghyeonTaskFeedRepositoryError('업무 피드를 불러오지 못했습니다.', error);
  return {
    posts: array(data?.posts),
    taskLinks: array(data?.taskLinks),
    stakeholders: array(data?.stakeholders),
    permissions: array(data?.permissions),
    mentions: array(data?.mentions),
    attachments: array(data?.attachments),
    comments: array(data?.comments),
    reactions: array(data?.reactions),
  };
};

const legacyFeedRelations = async (client, table, filters, authenticated) => {
  const queries = [
    filteredPostQuery(client, table('posts'), filters),
    authenticated ? client.from(table('post_tasks')).select('*') : Promise.resolve({ data: [], error: null }),
    client.from(table('post_stakeholders')).select('*'),
    authenticated ? client.from('songhyeon_feed_post_permissions').select('*') : Promise.resolve({ data: [], error: null }),
    authenticated ? client.from(table('post_mentions')).select('*') : Promise.resolve({ data: [], error: null }),
    authenticated ? client.from(table('attachments')).select('*') : Promise.resolve({ data: [], error: null }),
    client.from(table('comments')).select('*').order('created_at'),
    client.from(table('reactions')).select('*').order('created_at'),
  ];
  const results = await Promise.all(queries);
  const labels = ['게시글', '연결 업무', '이해관계자', '열람 권한', '멘션', '첨부파일', '댓글', '반응'];
  for (let index = 0; index < results.length; index += 1) {
    if (results[index].error) throw new SonghyeonTaskFeedRepositoryError(`업무 피드 ${labels[index]}을(를) 불러오지 못했습니다.`, results[index].error);
  }
  return {
    posts: results[0].data || [],
    taskLinks: results[1].data || [],
    stakeholders: results[2].data || [],
    permissions: results[3].data || [],
    mentions: results[4].data || [],
    attachments: results[5].data || [],
    comments: results[6].data || [],
    reactions: results[7].data || [],
  };
};

export async function loadTaskFeedPosts(filters = {}) {
  const client = requireSupabase();
  const authenticated = await hasAuthenticatedSonghyeonSession(client);
  const table = (name) => authenticated ? `songhyeon_feed_${name}` : `songhyeon_public_feed_${name}`;
  const [bundle, tasks] = await Promise.all([
    authenticated ? authenticatedFeedBundle(client, filters) : Promise.resolve(null),
    authenticated ? loadTaskFeedTasks() : Promise.resolve([]),
  ]);
  const relatedRows = bundle || await legacyFeedRelations(client, table, filters, authenticated);
  const tasksByKey = new Map(tasks.map((task) => [task.sourceKey, task]));
  const related = {
    taskLinks: relatedRows.taskLinks, stakeholders: relatedRows.stakeholders, permissions: relatedRows.permissions,
    mentions: relatedRows.mentions, attachments: relatedRows.attachments, comments: relatedRows.comments, reactions: relatedRows.reactions, tasksByKey,
  };
  let posts = relatedRows.posts.map((row) => postFromRow(row, related));
  if (filters.stakeholder) posts = posts.filter((post) => post.stakeholderLabel === filters.stakeholder);
  if (filters.cell) posts = posts.filter((post) => post.cell === filters.cell);
  if (filters.search) {
    const search = text(filters.search).toLowerCase();
    posts = posts.filter((post) => `${post.title} ${post.content} ${post.author.name} ${post.projectName} ${post.linkedTasks.map((task) => task.taskName).join(' ')}`.toLowerCase().includes(search));
  }
  return posts;
}

export async function loadRecentTaskFeedPosts(limit = 4) {
  const client = requireSupabase();
  const authenticated = await hasAuthenticatedSonghyeonSession(client);
  const table = authenticated ? 'songhyeon_feed_posts' : 'songhyeon_public_feed_posts';
  const { data, error } = await client
    .from(table)
    .select('*')
    .order('work_date', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(Math.max(1, Math.min(Number(limit) || 4, 8)));
  if (error) throw new SonghyeonTaskFeedRepositoryError('최근 업무 피드를 불러오지 못했습니다.', error);
  const emptyRelated = {
    taskLinks: [],
    stakeholders: [],
    permissions: [],
    mentions: [],
    attachments: [],
    comments: [],
    reactions: [],
    tasksByKey: new Map(),
  };
  return (data || []).map((row) => postFromRow(row, emptyRelated));
}

const normalizeMember = (row, authenticated) => ({
  id: row.id || row.profile_id,
  userId: authenticated ? row.auth_id : null,
  name: row.staff_name,
  email: authenticated ? row.email : '',
  group: row.group_name,
  title: row.title,
  photoPath: row.photo_path,
  displayOrder: row.display_order,
});

const loadSharedStakeholderContacts = async (client, authenticated) => {
  if (!authenticated) return { data: [], error: null };

  const detailed = await client
    .from('songhyeon_shared_stakeholder_contacts')
    .select('company_name,contact_name')
    .limit(5000);
  if (!detailed.error) return detailed;

  const legacy = await client
    .from('songhyeon_shared_stakeholders')
    .select('stakeholder_name')
    .limit(5000);
  if (legacy.error) return legacy;
  return {
    data: (legacy.data || []).map((row) => ({ company_name: row.stakeholder_name, contact_name: '' })),
    error: null,
  };
};

export async function loadTaskFeedOptions() {
  const client = requireSupabase();
  const authenticated = await hasAuthenticatedSonghyeonSession(client);
  const [memberResult, tasks, stakeholderResult] = await Promise.all([
    authenticated
      ? client.from('songhyeon_members').select('id,auth_id,email,staff_name,group_name,title,photo_path,display_order').eq('is_active', true).order('display_order')
      : client.from('songhyeon_public_profiles').select('*').order('display_order'),
    authenticated ? loadTaskFeedTasks() : Promise.resolve([]),
    loadSharedStakeholderContacts(client, authenticated),
  ]);
  if (memberResult.error) throw new SonghyeonTaskFeedRepositoryError('송현 멤버 목록을 불러오지 못했습니다.', memberResult.error);
  if (stakeholderResult.error) throw new SonghyeonTaskFeedRepositoryError('이해관계자 목록을 불러오지 못했습니다.', stakeholderResult.error);
  const members = (memberResult.data || []).map((row) => normalizeMember(row, authenticated));
  const groups = unique(members.map((member) => member.group));
  const stakeholderOptions = (stakeholderResult.data || []).map((row) => ({
    companyName: text(row.company_name || row.stakeholder_name || row.category),
    contactName: text(row.contact_name),
  })).filter((row) => row.companyName || row.contactName);
  const stakeholderKey = (row) => `${row.companyName.toLocaleLowerCase()}|${row.contactName.toLocaleLowerCase()}`;
  const stakeholderKeys = new Set();
  const stakeholders = stakeholderOptions.filter((row) => {
    const key = stakeholderKey(row);
    if (stakeholderKeys.has(key)) return false;
    stakeholderKeys.add(key);
    return true;
  });
  return {
    projects: SONGHYEON_FEED_PROJECTS,
    purposes: SONGHYEON_FEED_PURPOSES,
    statuses: SONGHYEON_FEED_STATUSES,
    priorities: SONGHYEON_FEED_PRIORITIES,
    cells: groups,
    groups,
    members,
    tasks,
    stakeholders,
  };
}

const normalizeStakeholder = (value) => {
  if (!value) return {};
  if (typeof value === 'string') return { companyName: text(value), contactName: '', category: '' };
  return {
    companyName: text(value.companyName || value.company_name || value.name),
    contactName: text(value.contactName || value.contact_name),
    category: text(value.category),
  };
};

const normalizePermissions = (value) => ({
  groups: unique(array(value?.groups)),
  memberIds: unique(array(value?.individuals || value?.memberIds).map((entry) => typeof entry === 'string' ? entry : entry?.id)).filter(isUuid),
});

const normalizeMentions = (value) => array(value).map((mention) => {
  const memberId = text(mention.memberId || mention.member_id);
  return {
    type: mention.type === 'group' || mention.type === 'department' ? 'department' : 'person',
    label: text(mention.label || mention.name),
    memberId: isUuid(memberId) ? memberId : '',
    groupName: text(mention.groupName || mention.group_name || mention.organization),
  };
}).filter((mention) => mention.label);

const normalizeAttachments = (value) => array(value).map((attachment) => ({
  id: text(attachment.id) || uid('feed-attachment'),
  name: text(attachment.name || attachment.fileName || attachment.file_name),
  path: text(attachment.path || attachment.objectPath || attachment.object_path),
  mimeType: text(attachment.mimeType || attachment.mime_type) || 'application/octet-stream',
  size: Number(attachment.size || attachment.sizeBytes || attachment.size_bytes || 0),
})).filter((attachment) => attachment.name && attachment.path);

const validatePostInput = (input) => {
  const title = text(input?.title);
  const content = text(input?.content || input?.body);
  if (!title || !content) throw new SonghyeonTaskFeedRepositoryError('제목과 내용을 입력해 주세요.');
  const purpose = SONGHYEON_FEED_PURPOSES.includes(input.purpose) ? input.purpose : '공유';
  const status = SONGHYEON_FEED_STATUSES.includes(input.status) ? input.status : '검토중';
  const priority = SONGHYEON_FEED_PRIORITIES.includes(input.priority) ? input.priority : '중간';
  return { title, content, purpose, status, priority };
};

const postRpcPayload = (input) => {
  const valid = validatePostInput(input);
  return {
    post_work_date: text(input.workDate || input.work_date) || new Date().toISOString().slice(0, 10),
    post_title: valid.title,
    post_body: valid.content,
    post_project_code: text(input.projectCode || input.project_code) || 'SONGHYEON_BID',
    post_purpose: valid.purpose,
    post_status: valid.status,
    post_priority: valid.priority,
    post_task_source_keys: unique(array(input.linkedTaskIds || input.taskIds)),
    post_stakeholder: normalizeStakeholder(input.stakeholder),
    post_permissions: normalizePermissions(input.permissions),
    post_mentions: normalizeMentions(input.mentions),
    post_attachments: normalizeAttachments(input.attachments),
  };
};

export async function createTaskFeedPost(input, actor = {}) {
  assertActor(actor);
  const postId = uid('feed-post');
  await run(requireSupabase().rpc('create_songhyeon_feed_post', { post_id: postId, ...postRpcPayload(input) }), '업무 메시지를 등록하지 못했습니다.');
  return postId;
}

export async function updateTaskFeedPost(id, input, actor = {}) {
  assertActor(actor);
  const postId = text(id);
  if (!postId) throw new SonghyeonTaskFeedRepositoryError('수정할 게시글을 확인해 주세요.');
  await run(requireSupabase().rpc('update_songhyeon_feed_post', { target_post_id: postId, ...postRpcPayload(input) }), '업무 메시지를 수정하지 못했습니다.');
  return postId;
}

export async function updateTaskFeedPostStatus(id, status, actor = {}) {
  assertActor(actor);
  const postId = text(id);
  const normalizedStatus = text(status);
  if (!postId) throw new SonghyeonTaskFeedRepositoryError('상태를 변경할 게시글을 확인해 주세요.');
  if (!SONGHYEON_FEED_STATUSES.includes(normalizedStatus)) throw new SonghyeonTaskFeedRepositoryError('올바른 진행상태를 선택해 주세요.');
  await run(requireSupabase().rpc('update_songhyeon_feed_post_status', {
    target_post_id: postId,
    post_status: normalizedStatus,
  }), '진행상태를 변경하지 못했습니다.');
  return postId;
}

export async function deleteTaskFeedPost(id, actor = {}) {
  assertActor(actor);
  return run(requireSupabase().rpc('delete_songhyeon_feed_post', { target_post_id: text(id) }), '업무 메시지를 삭제하지 못했습니다.');
}

export async function addTaskFeedComment(postId, body, actor = {}) {
  assertActor(actor);
  if (!text(body)) throw new SonghyeonTaskFeedRepositoryError('댓글 내용을 입력해 주세요.');
  return run(requireSupabase().rpc('add_songhyeon_feed_comment', { target_post_id: text(postId), comment_body: text(body) }), '댓글을 등록하지 못했습니다.');
}

export async function updateTaskFeedComment(postId, commentId, body, actor = {}) {
  assertActor(actor);
  if (!text(postId) || !text(commentId)) throw new SonghyeonTaskFeedRepositoryError('수정할 댓글을 확인해 주세요.');
  if (!text(body)) throw new SonghyeonTaskFeedRepositoryError('댓글 내용을 입력해 주세요.');
  return run(requireSupabase().rpc('update_songhyeon_feed_comment', {
    target_comment_id: text(commentId),
    comment_body: text(body),
  }), '댓글을 수정하지 못했습니다.');
}

export async function deleteTaskFeedComment(postId, commentId, actor = {}) {
  assertActor(actor);
  if (!text(postId) || !text(commentId)) throw new SonghyeonTaskFeedRepositoryError('삭제할 댓글을 확인해 주세요.');
  return run(requireSupabase().rpc('delete_songhyeon_feed_comment', { target_comment_id: text(commentId) }), '댓글을 삭제하지 못했습니다.');
}

export async function toggleTaskFeedReaction({ postId, commentId = null, type }, actor = {}) {
  assertActor(actor);
  if (!['like', 'check'].includes(type)) throw new SonghyeonTaskFeedRepositoryError('지원하지 않는 반응입니다.');
  return run(requireSupabase().rpc('toggle_songhyeon_feed_reaction', {
    target_post_id: text(postId), target_comment_id: text(commentId) || null, target_reaction_type: type,
  }), '반응을 저장하지 못했습니다.');
}

const safeFileName = (name) => text(name).replace(/[^0-9A-Za-zㄱ-힣._-]+/g, '-').slice(-160) || 'attachment';

export async function uploadTaskFeedAttachment(file, actor = {}) {
  assertActor(actor);
  if (!(file instanceof File)) throw new SonghyeonTaskFeedRepositoryError('첨부할 파일을 확인해 주세요.');
  const client = requireSupabase();
  const path = `${actor.userId}/${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.name)}`;
  await run(client.storage.from('songhyeon-feed-attachments').upload(path, file, { contentType: file.type || 'application/octet-stream', upsert: false }), '첨부파일을 업로드하지 못했습니다.');
  return { id: uid('feed-attachment'), name: file.name, path, mimeType: file.type || 'application/octet-stream', size: file.size };
}

export async function removeTaskFeedUploadedAttachments(attachments, actor = {}) {
  assertActor(actor);
  const ownerPrefix = `${actor.userId}/`;
  const paths = unique(array(attachments).map((attachment) => (
    attachment?.path || attachment?.objectPath || attachment?.object_path
  ))).filter((path) => path.startsWith(ownerPrefix));
  if (!paths.length) return [];
  await run(
    requireSupabase().storage.from('songhyeon-feed-attachments').remove(paths),
    '업로드된 첨부파일을 정리하지 못했습니다.',
  );
  return paths;
}

export async function downloadTaskFeedAttachment(attachment) {
  const path = text(attachment?.path || attachment?.objectPath || attachment?.object_path);
  if (!path) throw new SonghyeonTaskFeedRepositoryError('첨부파일 경로를 확인해 주세요.');
  const data = await run(
    requireSupabase().storage.from('songhyeon-feed-attachments').createSignedUrl(path, 60),
    '첨부파일 다운로드 주소를 만들지 못했습니다.',
  );
  return data?.signedUrl || '';
}
