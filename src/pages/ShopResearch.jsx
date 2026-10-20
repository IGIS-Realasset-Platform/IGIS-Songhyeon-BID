import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSonghyeonAuth } from '../context/SonghyeonAuthContext';
import { songhyeonSupabase } from '../lib/songhyeonSupabase';
import { createShopResearchAdapter } from '../lib/shop-research/supabaseAdapter';
import { mountResearchInHost } from '../lib/shop-research/mountResearch';
import './ShopResearch.css';

function ResearchContent({ userId }) {
  const host = useRef(null);
  const [status, setStatus] = useState({ loading: true, error: '' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let view;
    const adapter = createShopResearchAdapter(songhyeonSupabase, userId, { signal: controller.signal });
    async function connect() {
      try {
        const { seed, seedHash } = await adapter.bootstrap();
        if (controller.signal.aborted) return;
        window.L = L;
        view = await mountResearchInHost(host.current, {
          assetBase: `${import.meta.env.BASE_URL}shop-research/r8/`,
          seed,
          config: { seedHash, mode: 'shared', pollMs: 8000 },
          adapter,
          includeVendorStyles: false,
          signal: controller.signal,
        });
        if (controller.signal.aborted) view.destroy();
        else setStatus({ loading: false, error: '' });
      } catch (error) {
        if (!controller.signal.aborted) setStatus({ loading: false, error: error.message });
      }
    }
    connect();
    return () => { controller.abort(); view?.destroy(); };
  }, [userId, attempt]);

  return (
    <section className="songhyeon-shop-research flex h-full min-h-0 min-w-0 flex-col" aria-label="상점 조사·TOP 10">
      <header className="flex h-[58px] shrink-0 items-center border-b border-[#303235] bg-[#222325] px-5">
        <div className="flex min-w-0 items-center gap-2">
          <h1 className="text-[22px] font-bold text-white">Map &amp; Activities</h1>
          <span className="text-[16px] text-[#606165]">/</span>
          <span className="text-[17px] font-bold text-[#B8C3CB]">상점 조사·TOP 10</span>
        </div>
      </header>
      <div className="min-h-0 min-w-0 flex-1 overflow-auto p-5">
      {status.loading && <p role="status" className="px-1 py-6 text-[15px] text-[#A1A1AA]">상점 조사자료를 불러오는 중입니다.</p>}
      {status.error && (
        <div role="alert" className="rounded-xl border border-[#444] bg-[#252524] p-6 text-[15px] text-[#d0d0d2]">
          <p>{status.error}</p>
          <button type="button" className="mt-4 cursor-pointer rounded-lg border border-[#555] px-4 py-2 hover:bg-[#333]"
            onClick={() => { setStatus({ loading: true, error: '' }); setAttempt(value => value + 1); }}>다시 연결</button>
        </div>
      )}
      <div ref={host} />
      </div>
    </section>
  );
}

export default function ShopResearch() {
  const { user } = useSonghyeonAuth();
  return user ? <ResearchContent key={user.id} userId={user.id} /> : null;
}
