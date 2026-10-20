export const SHOP_RESEARCH_SEED_HASH = '57dea8e8e5a177e9d6a2e572f5b0d43ce545b6e3638e50e70e78f5fb4cdf4177';

function failure(error) {
  if (['PGRST202', '42P01'].includes(error?.code)) {
    return new Error('상점 조사 공동 저장 DB가 아직 준비되지 않았습니다. 관리자에게 DB 적용 상태를 확인해 주세요.');
  }
  if (error?.code === '42501') return new Error('상점 조사 내용을 확인하려면 활성 멤버 계정으로 로그인해 주세요.');
  return new Error(error?.message || '상점 조사 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.');
}

// Every request uses the host's existing Auth session. Neither names nor actor IDs
// sent by the browser are trusted by the database.
export function createShopResearchAdapter(client, expectedUserId, { signal } = {}) {
  if (!client || !expectedUserId) throw new Error('로그인 연결을 확인해 주세요.');
  let firstState = null;

  async function rpc(name, args) {
    if (signal?.aborted) throw new DOMException('화면 연결 취소', 'AbortError');
    const { data: auth, error: authError } = await client.auth.getSession();
    if (authError || auth?.session?.user?.id !== expectedUserId) {
      throw new Error('로그인 계정이 변경되었습니다. 화면을 다시 열어 주세요.');
    }
    let query = client.rpc(name, args);
    if (signal) query = query.abortSignal(signal);
    const { data, error } = await query;
    if (error) throw failure(error);
    if (signal?.aborted) throw new DOMException('화면 연결 취소', 'AbortError');
    return data;
  }

  function checkState(data) {
    if (data?.session?.id !== expectedUserId || !Array.isArray(data?.events)) {
      throw new Error('공동 조사 계정과 저장 응답을 확인하지 못했습니다.');
    }
    if (data.seedHash !== SHOP_RESEARCH_SEED_HASH) {
      throw new Error('상점 조사자료의 버전이 다릅니다. 화면을 새로고침한 뒤 관리자에게 확인해 주세요.');
    }
    return data;
  }

  return {
    async bootstrap() {
      const data = checkState(await rpc('songhyeon_shop_research_state', { include_seed: true }));
      if (!Array.isArray(data.seed?.entities) || !data.seed.entities.length) {
        throw new Error('최초 상점 조사자료가 아직 등록되지 않았습니다.');
      }
      const { seed, ...state } = data;
      firstState = state;
      return { seed, seedHash: data.seedHash };
    },
    async getState() {
      if (firstState) {
        const state = firstState;
        firstState = null;
        return state;
      }
      return checkState(await rpc('songhyeon_shop_research_state', { include_seed: false }));
    },
    async saveEvent(event) {
      const result = await rpc('songhyeon_shop_research_save', {
        request: event, expected_seed_hash: SHOP_RESEARCH_SEED_HASH,
      });
      if (!result?.event?.id || result.event.actor?.id !== expectedUserId) {
        throw new Error('서버의 저장 확인을 받지 못했습니다. 다시 저장해 주세요.');
      }
      return result;
    },
    async geocode() {
      // ResearchCore checks exact matches in the verified source dataset first.
      // Do not send internal addresses to an unapproved external geocoder.
      return { results: [], message: '새 주소의 자동 좌표 검색은 아직 연결되지 않았습니다. 기존 조사자료에서 일치하는 위치를 찾으며, 확인되지 않은 주소는 지도에 표시되지 않습니다.' };
    },
  };
}
