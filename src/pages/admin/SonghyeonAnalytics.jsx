import { useEffect, useMemo, useState } from 'react';
import { loadSonghyeonAnalytics } from '../../lib/songhyeonAnalyticsRepository';
import { WorkspacePageFrame, WorkspacePageHeader } from '../../components/workspace/WorkspacePageLayout';

const PERIODS = [7, 30, 90];
const PAGE_LABELS = {
  '/': '홈',
  '/tasks': '통합업무보드',
  '/map-activities': 'Map & Activities',
  '/milestones': '마일스톤 및 R&R',
  '/hypotheses': '서비스·운영 가설',
  '/data': 'Data Room',
  '/governance/internal': '송현 BID Member',
  '/governance/principles': '운영 원칙',
  '/governance/interfaces': '협의 창구',
  '/governance/operations': '회의·이슈관리',
  '/admin/analytics': '이용 현황',
};

const number = (value) => new Intl.NumberFormat('ko-KR').format(Number(value) || 0);
const dateTime = (value) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? '-' : parsed.toLocaleString('ko-KR', { dateStyle: 'short', timeStyle: 'short' });
};
const shortDate = (value) => {
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? value : `${parsed.getMonth() + 1}.${parsed.getDate()}`;
};

function SummaryCard({ label, value, note }) {
  return (
    <div className="rounded-[16px] border border-[#3c3c3c] bg-[#272726] px-5 py-4">
      <div className="text-[11px] font-bold text-[#86868B]">{label}</div>
      <div className="mt-2 text-[28px] font-bold leading-none tabular-nums text-white">{number(value)}</div>
      {note && <div className="mt-2 text-[10px] text-[#686868]">{note}</div>}
    </div>
  );
}

export default function SonghyeonAnalytics() {
  const [days, setDays] = useState(30);
  const [analytics, setAnalytics] = useState({ summary: {}, daily: [], pages: [], recent: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    loadSonghyeonAnalytics(days)
      .then((result) => { if (active) setAnalytics(result); })
      .catch((loadError) => { if (active) setError(loadError.message || '이용 현황을 불러오지 못했습니다.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [days, reloadKey]);

  const maximumDailyViews = useMemo(() => Math.max(1, ...analytics.daily.map((item) => Number(item.views) || 0)), [analytics.daily]);
  const summary = analytics.summary || {};
  const changePeriod = (period) => {
    if (period === days) return;
    setLoading(true);
    setError('');
    setDays(period);
  };
  const retry = () => {
    setLoading(true);
    setError('');
    setReloadKey((current) => current + 1);
  };

  return (
    <WorkspacePageFrame>
      <WorkspacePageHeader
        title="이용 현황"
        description="이름·이메일 없이 익명 브라우저 식별자로 송현 BID TF 사이트의 이용 흐름을 대략 집계합니다."
        actions={(
          <div className="flex h-[36px] items-center rounded-[9px] border border-[#3c3c3c] bg-[#272726] p-1" aria-label="조회 기간">
            {PERIODS.map((period) => <button key={period} type="button" onClick={() => changePeriod(period)} aria-pressed={days === period} className={`h-[26px] cursor-pointer rounded-[6px] px-3 text-[11px] font-bold transition-colors ${days === period ? 'bg-[#6f9fc7]/20 text-[#9cc4e6]' : 'text-[#86868B] hover:text-white'}`}>{period}일</button>)}
          </div>
        )}
      />

      {error && <div role="alert" className="mb-3 flex items-center justify-between rounded-[12px] border border-[#ff453a]/25 bg-[#ff453a]/10 px-4 py-3 text-[12px] text-[#ff8a82]"><span>{error}</span><button type="button" onClick={retry} className="cursor-pointer rounded-[6px] border border-[#ff8a82]/25 px-2.5 py-1 text-[11px] font-bold hover:bg-[#ff453a]/10">다시 불러오기</button></div>}

      <section aria-label="요약 지표" className="grid grid-cols-6 gap-3">
        <SummaryCard label="전체 조회" value={summary.totalViews} note={`최근 ${summary.periodDays || days}일`} />
        <SummaryCard label="오늘 조회" value={summary.todayViews} />
        <SummaryCard label="방문자" value={summary.uniqueVisitors} note="익명 기기 기준" />
        <SummaryCard label="세션" value={summary.uniqueSessions} note="브라우저 세션 기준" />
        <SummaryCard label="게스트 조회" value={summary.guestViews} />
        <SummaryCard label="회원 조회" value={summary.memberViews} />
      </section>

      <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-3">
        <section className="rounded-[20px] border border-[#3c3c3c] bg-[#272726] p-5" aria-labelledby="analytics-daily-title">
          <div className="flex items-center justify-between"><h2 id="analytics-daily-title" className="text-[14px] font-bold text-white">일별 이용 추이</h2><span className="text-[10px] text-[#686868]">조회수 기준</span></div>
          <div className="mt-5 flex h-[176px] items-end gap-1" role="img" aria-label={`최근 ${days}일의 일별 페이지 조회수 막대 그래프`}>
            {analytics.daily.map((item, index) => {
              const height = Math.max(3, ((Number(item.views) || 0) / maximumDailyViews) * 138);
              const showLabel = analytics.daily.length <= 14 || index % Math.ceil(analytics.daily.length / 8) === 0 || index === analytics.daily.length - 1;
              return <div key={item.date} className="group relative flex min-w-0 flex-1 flex-col items-center justify-end" title={`${item.date} · 조회 ${number(item.views)} · 방문자 ${number(item.visitors)}`}><span className="pointer-events-none absolute bottom-[calc(100%+6px)] z-10 hidden whitespace-nowrap rounded-[6px] border border-[#454545] bg-[#1c1c1e] px-2 py-1 text-[10px] text-[#C7C7CC] shadow-lg group-hover:block">조회 {number(item.views)} · 방문자 {number(item.visitors)}</span><div className="w-full max-w-[18px] rounded-t-[4px] bg-[#6f9fc7]/70 transition-colors group-hover:bg-[#82add0]" style={{ height }} /><span className="mt-2 h-3 truncate text-[8px] text-[#686868]">{showLabel ? shortDate(item.date) : ''}</span></div>;
            })}
            {!loading && analytics.daily.length === 0 && <div className="grid h-full w-full place-items-center text-[12px] text-[#686868]">아직 집계된 이용 기록이 없습니다.</div>}
          </div>
        </section>

        <section className="overflow-hidden rounded-[20px] border border-[#3c3c3c] bg-[#272726]" aria-labelledby="analytics-pages-title">
          <div className="flex h-[52px] items-center justify-between border-b border-[#3c3c3c] px-5"><h2 id="analytics-pages-title" className="text-[14px] font-bold text-white">페이지 순위</h2><span className="text-[10px] text-[#686868]">상위 {Math.min(analytics.pages.length, 8)}개</span></div>
          <div className="divide-y divide-[#3c3c3c]/70">
            {analytics.pages.slice(0, 8).map((page, index) => <div key={page.path} className="grid grid-cols-[24px_1fr_auto] items-center gap-2 px-5 py-2.5"><span className="font-mono text-[10px] font-bold text-[#686868]">{String(index + 1).padStart(2, '0')}</span><div className="min-w-0"><div className="truncate text-[12px] font-bold text-[#E5E5E5]">{PAGE_LABELS[page.path] || page.path}</div><div className="mt-0.5 truncate font-mono text-[9px] text-[#686868]">{page.path}</div></div><div className="text-right"><div className="text-[13px] font-bold tabular-nums text-[#9cc4e6]">{number(page.views)}</div><div className="text-[9px] text-[#686868]">방문자 {number(page.visitors)}</div></div></div>)}
            {!loading && analytics.pages.length === 0 && <div className="px-5 py-12 text-center text-[12px] text-[#686868]">집계된 페이지가 없습니다.</div>}
          </div>
        </section>
      </div>

      <section className="mt-3 overflow-hidden rounded-[20px] border border-[#3c3c3c] bg-[#272726]" aria-labelledby="analytics-recent-title">
        <div className="flex h-[52px] items-center justify-between border-b border-[#3c3c3c] px-5"><h2 id="analytics-recent-title" className="text-[14px] font-bold text-white">최근 이용</h2><span className="text-[10px] text-[#686868]">이름·이메일 미수집 · 최대 400일 보관</span></div>
        <div className="grid grid-cols-2 divide-x divide-[#3c3c3c]/70">
          {analytics.recent.slice(0, 10).map((entry, index) => <div key={`${entry.path}-${entry.viewedAt}-${index}`} className="flex items-center justify-between gap-4 border-b border-[#3c3c3c]/60 px-5 py-3 last:border-b-0"><div className="min-w-0"><div className="truncate text-[12px] font-bold text-[#E5E5E5]">{PAGE_LABELS[entry.path] || entry.path}</div><div className="mt-0.5 font-mono text-[9px] text-[#686868]">{entry.path}</div></div><div className="shrink-0 text-right"><span className={`rounded-[5px] border px-1.5 py-0.5 text-[9px] font-bold ${entry.viewerType === 'guest' ? 'border-[#6f9fc7]/25 bg-[#6f9fc7]/10 text-[#9cc4e6]' : 'border-[#4da566]/25 bg-[#4da566]/10 text-[#7fc18e]'}`}>{entry.viewerType === 'guest' ? '게스트' : '회원'}</span><time className="mt-1 block text-[9px] text-[#686868]">{dateTime(entry.viewedAt)}</time></div></div>)}
          {!loading && analytics.recent.length === 0 && <div className="col-span-2 px-5 py-10 text-center text-[12px] text-[#686868]">최근 이용 기록이 없습니다.</div>}
        </div>
      </section>

      {loading && <div role="status" className="pointer-events-none fixed bottom-6 right-6 rounded-[10px] border border-[#3c3c3c] bg-[#272726] px-4 py-2 text-[11px] text-[#A1A1AA] shadow-xl">이용 현황을 불러오는 중…</div>}
    </WorkspacePageFrame>
  );
}
