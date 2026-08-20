import { songhyeonSupabase } from './songhyeonSupabase';
import { hasAuthenticatedSonghyeonSession } from './songhyeonReadSession.js';

export class SonghyeonDataRoomRepositoryError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'SonghyeonDataRoomRepositoryError';
    this.cause = cause;
  }
}

const requireSupabase = () => {
  if (!songhyeonSupabase) throw new SonghyeonDataRoomRepositoryError('송현 Supabase 연결이 설정되지 않았습니다.');
  return songhyeonSupabase;
};

const assertActor = (actor) => {
  if (!actor?.userId) throw new SonghyeonDataRoomRepositoryError('인증된 송현 BID 멤버만 Data Room을 변경할 수 있습니다.');
};

const run = async (promise, message) => {
  const { data, error } = await promise;
  if (error) throw new SonghyeonDataRoomRepositoryError(message, error);
  return data;
};

const toDocument = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description,
  category: row.category,
  type: row.document_type,
  date: row.reference_date?.replaceAll('-', '.') || '',
  href: row.url,
  viewCount: row.view_count || 0,
  authorName: row.created_by_name || '작성자 미확인',
});

const toReferenceDate = (value) => {
  const normalized = String(value || '').trim().replaceAll('.', '-');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized) || Number.isNaN(Date.parse(`${normalized}T00:00:00Z`))) {
    throw new SonghyeonDataRoomRepositoryError('기준일은 YYYY.MM.DD 형식으로 입력해 주세요.');
  }
  return normalized;
};

const toHttpsUrl = (value) => {
  const normalized = String(value || '').trim();
  let parsed;
  try { parsed = new URL(normalized); } catch { throw new SonghyeonDataRoomRepositoryError('원본 URL 형식이 올바르지 않습니다.'); }
  if (parsed.protocol !== 'https:') throw new SonghyeonDataRoomRepositoryError('원본 URL은 https:// 주소만 사용할 수 있습니다.');
  return normalized;
};

const documentPayload = (document, actor) => ({
  title: document.title.trim(),
  description: document.description.trim(),
  category: document.category.trim(),
  document_type: document.type.trim(),
  reference_date: toReferenceDate(document.date),
  url: toHttpsUrl(document.href),
  updated_by: actor.userId,
  updated_at: new Date().toISOString(),
});

export async function loadDataRoomDocuments() {
  const client = requireSupabase();
  const authenticated = await hasAuthenticatedSonghyeonSession(client);
  const table = authenticated ? 'songhyeon_data_room_documents' : 'songhyeon_public_data_room_documents';
  const rows = await run(
    client.from(table).select('*').order('display_order').order('created_at', { ascending: false }),
    'Data Room 문서를 불러오지 못했습니다.',
  );
  return rows.map(toDocument);
}

export async function loadRecentDataRoomDocuments(limit = 4) {
  const client = requireSupabase();
  const authenticated = await hasAuthenticatedSonghyeonSession(client);
  const table = authenticated ? 'songhyeon_data_room_documents' : 'songhyeon_public_data_room_documents';
  const rows = await run(
    client.from(table).select('*').order('reference_date', { ascending: false }).order('created_at', { ascending: false }).limit(Math.max(1, Math.min(Number(limit) || 4, 8))),
    '최근 Data Room 문서를 불러오지 못했습니다.',
  );
  return rows.map(toDocument);
}

export async function loadDataRoomDocument(documentId) {
  const client = requireSupabase();
  const authenticated = await hasAuthenticatedSonghyeonSession(client);
  const table = authenticated ? 'songhyeon_data_room_documents' : 'songhyeon_public_data_room_documents';
  const row = await run(
    client.from(table).select('*').eq('id', documentId).maybeSingle(),
    'Data Room 문서를 불러오지 못했습니다.',
  );
  return row ? toDocument(row) : null;
}

export async function createDataRoomDocument(document, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const firstRows = await run(
    client.from('songhyeon_data_room_documents').select('display_order').order('display_order').limit(1),
    'Data Room 문서 순서를 확인하지 못했습니다.',
  );
  const row = await run(
    client.from('songhyeon_data_room_documents').insert({
      id: `SH-DATA-${crypto.randomUUID().toUpperCase()}`,
      ...documentPayload(document, actor),
      display_order: (firstRows[0]?.display_order ?? 0) - 1,
      created_by: actor.userId,
    }).select('*').single(),
    'Data Room 문서를 추가하지 못했습니다.',
  );
  return toDocument(row);
}

export async function updateDataRoomDocument(document, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const row = await run(
    client.from('songhyeon_data_room_documents').update(documentPayload(document, actor)).eq('id', document.id).select('*').single(),
    'Data Room 문서를 수정하지 못했습니다.',
  );
  return toDocument(row);
}

export async function deleteDataRoomDocument(documentId, actor = {}) {
  assertActor(actor);
  const client = requireSupabase();
  const row = await run(
    client.from('songhyeon_data_room_documents').delete().eq('id', documentId).select('id').maybeSingle(),
    'Data Room 문서를 삭제하지 못했습니다.',
  );
  if (!row) throw new SonghyeonDataRoomRepositoryError('삭제할 Data Room 문서를 찾을 수 없습니다.');
  return row.id;
}

export async function recordDataRoomView(documentId) {
  const client = requireSupabase();
  return run(client.rpc('record_songhyeon_data_room_view', { document_id: documentId }), 'Data Room 조회수를 기록하지 못했습니다.');
}
