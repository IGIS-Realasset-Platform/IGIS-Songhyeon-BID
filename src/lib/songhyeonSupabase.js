import { createClient } from '@supabase/supabase-js';

// Auth and approved reference data are intentionally shared with IOTA.
// All Songhyeon operational writes must still target songhyeon_* objects only.
const APPROVED_SHARED_PROJECT_REF = 'qgrszltduzblpvpqvkqr';

export function validateSonghyeonConfig(url, anonKey) {
  if (!url || !anonKey) throw new Error('송현/IOTA 공통 인증 Supabase 환경변수가 설정되지 않았습니다.');
  let host;
  try { host = new URL(url).hostname; } catch { throw new Error('송현 Supabase URL 형식이 올바르지 않습니다.'); }
  if (host !== `${APPROVED_SHARED_PROJECT_REF}.supabase.co` && !['127.0.0.1', 'localhost'].includes(host)) {
    throw new Error('승인된 공통 인증 프로젝트 또는 송현 로컬 Supabase만 사용할 수 있습니다.');
  }
  return { url, anonKey };
}

const url = import.meta.env.VITE_SONGHYEON_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SONGHYEON_SUPABASE_ANON_KEY;

let client = null;
let configurationError = null;
try {
  const config = validateSonghyeonConfig(url, anonKey);
  client = createClient(config.url, config.anonKey, {
    auth: { storageKey: 'sb-songhyeon-bid-auth-token', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
} catch (error) {
  configurationError = error;
}

export const songhyeonSupabase = client;
export const songhyeonSupabaseError = configurationError;
export const isSonghyeonSupabaseConfigured = Boolean(client);
