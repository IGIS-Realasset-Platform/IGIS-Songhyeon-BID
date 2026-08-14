import { songhyeonSupabase } from './songhyeonSupabase';

const VISITOR_STORAGE_KEY = 'songhyeon-anonymous-visitor-id';
const SESSION_STORAGE_KEY = 'songhyeon-anonymous-session-id';

let fallbackVisitorId = '';
let fallbackSessionId = '';

export class SonghyeonAnalyticsRepositoryError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'SonghyeonAnalyticsRepositoryError';
    this.cause = cause;
  }
}

const randomId = () => {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  throw new SonghyeonAnalyticsRepositoryError('익명 방문 식별자를 생성할 수 없습니다.');
};

const storedId = (storage, key, fallbackKey) => {
  if (!storage) {
    if (fallbackKey === 'visitor') {
      fallbackVisitorId ||= randomId();
      return fallbackVisitorId;
    }
    fallbackSessionId ||= randomId();
    return fallbackSessionId;
  }
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;
    const created = randomId();
    storage.setItem(key, created);
    return created;
  } catch {
    if (fallbackKey === 'visitor') {
      fallbackVisitorId ||= randomId();
      return fallbackVisitorId;
    }
    fallbackSessionId ||= randomId();
    return fallbackSessionId;
  }
};

const anonymousIdentifiers = () => {
  if (typeof window === 'undefined') return null;
  let localStorage;
  let sessionStorage;
  try {
    localStorage = window.localStorage;
    sessionStorage = window.sessionStorage;
  } catch {
    // Some privacy modes expose window but deny access to browser storage.
  }
  return {
    visitorId: storedId(localStorage, VISITOR_STORAGE_KEY, 'visitor'),
    sessionId: storedId(sessionStorage, SESSION_STORAGE_KEY, 'session'),
  };
};

const cleanPath = (value) => {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const withoutFragment = raw.split('#', 1)[0];
  const withoutQuery = withoutFragment.split('?', 1)[0];
  const hasControlCharacter = [...withoutQuery].some((character) => {
    const code = character.charCodeAt(0);
    return code <= 31 || code === 127;
  });
  if (!withoutQuery.startsWith('/') || withoutQuery.length > 300 || hasControlCharacter) return '';
  return withoutQuery;
};

export async function recordSonghyeonPageView(path) {
  if (!songhyeonSupabase) return false;
  try {
    const identifiers = anonymousIdentifiers();
    const pagePath = cleanPath(path ?? (typeof window !== 'undefined' ? window.location.pathname : ''));
    if (!identifiers || !pagePath) return false;
    const { error } = await songhyeonSupabase.rpc('track_songhyeon_page_view', {
      anonymous_visitor_id: identifiers.visitorId,
      anonymous_session_id: identifiers.sessionId,
      page_path: pagePath,
    });
    return !error;
  } catch {
    // Analytics must never interrupt navigation or the guest read experience.
    return false;
  }
}

const EMPTY_ANALYTICS = Object.freeze({
  summary: Object.freeze({}),
  daily: Object.freeze([]),
  pages: Object.freeze([]),
  recent: Object.freeze([]),
});

export async function loadSonghyeonAnalytics(days = 30) {
  if (!songhyeonSupabase) {
    throw new SonghyeonAnalyticsRepositoryError('송현 Supabase 연결이 설정되지 않았습니다.');
  }
  const lookbackDays = Math.max(1, Math.min(Number.parseInt(days, 10) || 30, 365));
  const { data, error } = await songhyeonSupabase.rpc('get_songhyeon_page_view_analytics', {
    lookback_days: lookbackDays,
  });
  if (error) throw new SonghyeonAnalyticsRepositoryError('페이지뷰 통계를 불러오지 못했습니다.', error);

  const payload = (Array.isArray(data) ? data[0] : data) || EMPTY_ANALYTICS;
  return {
    summary: payload.summary || {},
    daily: Array.isArray(payload.daily) ? payload.daily : [],
    pages: Array.isArray(payload.pages) ? payload.pages : [],
    recent: Array.isArray(payload.recent) ? payload.recent : [],
  };
}
