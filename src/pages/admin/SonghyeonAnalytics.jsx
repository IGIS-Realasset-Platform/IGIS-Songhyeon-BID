import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  loadSonghyeonAnalytics,
  loadSonghyeonTfMemberAnalytics,
  loadSonghyeonTfMemberDetail,
} from '../../lib/songhyeonAnalyticsRepository';
import { WorkspacePageFrame, WorkspacePageHeader } from '../../components/workspace/WorkspacePageLayout';
import SonghyeonMemberAvatar from '../../components/iota-songhyeon/SonghyeonMemberAvatar';

const PERIODS = [7, 30, 90];
const PAGE_LABELS = {
  '/': '홈',
  '/feed': '업무 피드',
  '/tasks': '통합업무보드',
  '/map-activities': 'Map & Activities',
  '/map-activities/integrated-map': '통합지도',
  '/map-activities/boundary': '운영구역',
  '/map-activities/assets-leases': '자산·임차',
  '/map-activities/igis-retail': '이지스 리테일',
  '/map-activities/market-activities': '상권·활동',
  '/map-activities/hotel': '호텔',
  '/map-activities/institutions-community': '제도·공동체',
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
  if (!value) return '-';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? '-' : parsed.toLocaleString('ko-KR', { dateStyle: 'short', timeStyle: 'short' });
};
const shortDate = (value) => {
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? value : `${parsed.getMonth() + 1}.${parsed.getDate()}`;
};

const memberName = (member) => member?.staffName || member?.name || '이름 없음';
const memberGroup = (member) => member?.groupName || member?.group || '';

function SummaryCard({ label, value, note, displayValue, compact = false }) {
  return (
    <div className="rounded-[16px] border border-[#3c3c3c] bg-[#272726] px-5 py-4">
      <div className="text-[13px] font-bold text-[#86868B]">{label}</div>
      <div className={`mt-2 font-bold leading-none tabular-nums text-white ${compact ? 'text-[15px]' : 'text-[28px]'}`}>{displayValue ?? number(value)}</div>
      {note && <div className="mt-2 text-[12px] text-[#686868]">{note}</div>}
    </div>
  );
}

export default function SonghyeonAnalytics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMemberView = searchParams.get('view') === 'members';
  const selectedMemberId = searchParams.get('member') || '';
  const [days, setDays] = useState(30);
  const [analytics, setAnalytics] = useState({ summary: {}, daily: [], pages: [], recent: [] });
  const [memberAnalytics, setMemberAnalytics] = useState({ trackingStartedAt: null, unattributedMemberViews: 0, members: [] });
  const [memberDetail, setMemberDetail] = useState({ member: null, summary: {}, daily: [], pages: [], recent: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    let redirected = false;

    const load = async () => {
      if (!isMemberView) {
        const result = await loadSonghyeonAnalytics(days);
        if (active) setAnalytics(result);
        return;
      }

      const result = await loadSonghyeonTfMemberAnalytics(days);
      if (!active) return;
      setMemberAnalytics(result);
      const members = result.members || [];
      const selectedExists = members.some((member) => String(member.id) === selectedMemberId);
      const nextMemberId = selectedExists ? selectedMemberId : String(members[0]?.id || '');
      if (nextMemberId !== selectedMemberId) {
        redirected = true;
        setSearchParams((current) => {
          const next = new URLSearchParams(current);
          next.set('view', 'members');
          if (nextMemberId) next.set('member', nextMemberId);
          else next.delete('member');
          return next;
        }, { replace: true });
        return;
      }
      if (!nextMemberId) {
        setMemberDetail({ member: null, summary: {}, daily: [], pages: [], recent: [] });
        return;
      }
      const detail = await loadSonghyeonTfMemberDetail(nextMemberId, days);
      if (active) setMemberDetail(detail);
    };

    load()
      .catch((loadError) => { if (active) setError(loadError.message || '이용 현황을 불러오지 못했습니다.'); })
      .finally(() => { if (active && !redirected) setLoading(false); });
    return () => { active = false; };
  }, [days, isMemberView, reloadKey, selectedMemberId, setSearchParams]);

  const maximumDailyActivity = useMemo(() => Math.max(1, ...analytics.daily.flatMap((item) => [Number(item.views) || 0, Number(item.visitors) || 0])), [analytics.daily]);
  const maximumMemberDailyViews = useMemo(() => Math.max(1, ...memberDetail.daily.map((item) => Number(item.views) || 0)), [memberDetail.daily]);
  const summary = analytics.summary || {};
  const memberSummary = memberDetail.summary || {};
  const members = memberAnalytics.members || [];
  const selectedMember = memberDetail.member || members.find((member) => String(member.id) === selectedMemberId);
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
  const changeView = (nextView) => {
    if ((nextView === 'members') === isMemberView) return;
    const next = new URLSearchParams(searchParams);
    if (nextView === 'members') next.set('view', 'members');
    else {
      next.delete('view');
      next.delete('member');
    }
    setLoading(true);
    setError('');
    setSearchParams(next);
  };
  const setSelectedMemberId = (memberId) => {
    if (String(memberId) === selectedMemberId) return;
    const next = new URLSearchParams(searchParams);
    next.set('view', 'members');
    next.set('member', String(memberId));
    setLoading(true);
    setError('');
    setMemberDetail({ member: null, summary: {}, daily: [], pages: [], recent: [] });
    setSearchParams(next);
  };

  return (
    <WorkspacePageFrame>
      <WorkspacePageHeader
        title="이용 현황"
        description={isMemberView ? '로그인한 송현 BID TF 인원의 이용 흐름을 선택한 기간 기준으로 확인합니다.' : '게스트는 익명 브라우저, 로그인 TF 회원은 계정 프로필 기준으로 사이트 이용 흐름을 집계합니다.'}
        descriptionClassName="!text-[16px]"
        actions={(
          <div className="flex items-center gap-2">
            <div className="flex h-[36px] items-center rounded-[9px] border border-[#3c3c3c] bg-[#272726] p-1" aria-label="이용 현황 보기">
              <button type="button" onClick={() => changeView('all')} aria-pressed={!isMemberView} className={`h-[26px] cursor-pointer rounded-[6px] px-3 text-[13px] font-bold transition-colors ${!isMemberView ? 'bg-[#6f9fc7]/20 text-[#9cc4e6]' : 'text-[#86868B] hover:text-white'}`}>전체 이용</button>
              <button type="button" onClick={() => changeView('members')} aria-pressed={isMemberView} className={`h-[26px] cursor-pointer rounded-[6px] px-3 text-[13px] font-bold transition-colors ${isMemberView ? 'bg-[#6f9fc7]/20 text-[#9cc4e6]' : 'text-[#86868B] hover:text-white'}`}>TF 인원별</button>
            </div>
            <div className="flex h-[36px] items-center rounded-[9px] border border-[#3c3c3c] bg-[#272726] p-1" aria-label="조회 기간">
              {PERIODS.map((period) => <button key={period} type="button" onClick={() => changePeriod(period)} aria-pressed={days === period} className={`h-[26px] cursor-pointer rounded-[6px] px-3 text-[13px] font-bold transition-colors ${days === period ? 'bg-[#6f9fc7]/20 text-[#9cc4e6]' : 'text-[#86868B] hover:text-white'}`}>{period}일</button>)}
            </div>
          </div>
        )}
      />

      {error && <div role="alert" className="mb-3 flex items-center justify-between rounded-[12px] border border-[#ff453a]/25 bg-[#ff453a]/10 px-4 py-3 text-[14px] text-[#ff8a82]"><span>{error}</span><button type="button" onClick={retry} className="cursor-pointer rounded-[6px] border border-[#ff8a82]/25 px-2.5 py-1 text-[13px] font-bold hover:bg-[#ff453a]/10">다시 불러오기</button></div>}

      {!isMemberView ? <>
      <section aria-label="요약 지표" className="grid grid-cols-7 gap-3">
        <SummaryCard label="전체 페이지뷰" value={summary.totalViews} note={`최근 ${summary.periodDays || days}일`} />
        <SummaryCard label="오늘 페이지뷰" value={summary.todayViews} />
        <SummaryCard label="오늘 이용자" value={summary.todayVisitors} note="중복 제외" />
        <SummaryCard label="기간 방문자" value={summary.uniqueVisitors} note="게스트 기기·TF 계정" />
        <SummaryCard label="세션" value={summary.uniqueSessions} note="브라우저 세션 기준" />
        <SummaryCard label="게스트 조회" value={summary.guestViews} />
        <SummaryCard label="회원 조회" value={summary.memberViews} />
      </section>

      <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-3">
        <section className="rounded-[20px] border border-[#3c3c3c] bg-[#272726] p-5" aria-labelledby="analytics-daily-title">
          <div className="flex items-center justify-between"><h2 id="analytics-daily-title" className="text-[16px] font-bold text-white">일별 방문자·페이지뷰</h2><div className="flex items-center gap-3 text-[12px] text-[#86868B]"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-[2px] bg-[#6f9fc7]" />페이지뷰</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-[2px] bg-[#65b97a]" />방문자</span></div></div>
          <div className="mt-5 flex h-[176px] items-end gap-1" role="img" aria-label={`최근 ${days}일의 일별 방문자와 페이지뷰 막대 그래프`}>
            {analytics.daily.map((item, index) => {
              const viewHeight = Math.max(3, ((Number(item.views) || 0) / maximumDailyActivity) * 138);
              const visitorHeight = Math.max(3, ((Number(item.visitors) || 0) / maximumDailyActivity) * 138);
              const showLabel = analytics.daily.length <= 14 || index % Math.ceil(analytics.daily.length / 8) === 0 || index === analytics.daily.length - 1;
              return <div key={item.date} className="group relative flex min-w-0 flex-1 flex-col items-center justify-end" title={`${item.date} · 페이지뷰 ${number(item.views)} · 방문자 ${number(item.visitors)}`}><span className="pointer-events-none absolute bottom-[calc(100%+6px)] z-10 hidden whitespace-nowrap rounded-[6px] border border-[#454545] bg-[#1c1c1e] px-2 py-1 text-[12px] text-[#C7C7CC] shadow-lg group-hover:block">페이지뷰 {number(item.views)} · 방문자 {number(item.visitors)}</span><div className="flex h-[138px] w-full items-end justify-center gap-[2px]"><div className="w-[40%] max-w-[8px] rounded-t-[3px] bg-[#6f9fc7]/80 transition-colors group-hover:bg-[#82add0]" style={{ height: viewHeight }} /><div className="w-[40%] max-w-[8px] rounded-t-[3px] bg-[#65b97a]/75 transition-colors group-hover:bg-[#7fc18e]" style={{ height: visitorHeight }} /></div><span className="mt-2 h-3 truncate text-[10px] text-[#686868]">{showLabel ? shortDate(item.date) : ''}</span></div>;
            })}
            {!loading && analytics.daily.length === 0 && <div className="grid h-full w-full place-items-center text-[14px] text-[#686868]">아직 집계된 이용 기록이 없습니다.</div>}
          </div>
        </section>

        <section className="overflow-hidden rounded-[20px] border border-[#3c3c3c] bg-[#272726]" aria-labelledby="analytics-pages-title">
          <div className="flex h-[52px] items-center justify-between border-b border-[#3c3c3c] px-5"><h2 id="analytics-pages-title" className="text-[16px] font-bold text-white">페이지 순위</h2><span className="text-[12px] text-[#686868]">상위 {Math.min(analytics.pages.length, 8)}개</span></div>
          <div className="divide-y divide-[#3c3c3c]/70">
            {analytics.pages.slice(0, 8).map((page, index) => <div key={page.path} className="grid grid-cols-[24px_1fr_auto] items-center gap-2 px-5 py-2.5"><span className="font-mono text-[12px] font-bold text-[#686868]">{String(index + 1).padStart(2, '0')}</span><div className="min-w-0"><div className="truncate text-[14px] font-bold text-[#E5E5E5]">{PAGE_LABELS[page.path] || page.path}</div><div className="mt-0.5 truncate font-mono text-[11px] text-[#686868]">{page.path}</div></div><div className="text-right"><div className="text-[15px] font-bold tabular-nums text-[#9cc4e6]">{number(page.views)}</div><div className="text-[11px] text-[#686868]">방문자 {number(page.visitors)}</div></div></div>)}
            {!loading && analytics.pages.length === 0 && <div className="px-5 py-12 text-center text-[14px] text-[#686868]">집계된 페이지가 없습니다.</div>}
          </div>
        </section>
      </div>

      <section className="mt-3 overflow-hidden rounded-[20px] border border-[#3c3c3c] bg-[#272726]" aria-labelledby="analytics-recent-title">
        <div className="flex h-[52px] items-center justify-between border-b border-[#3c3c3c] px-5"><h2 id="analytics-recent-title" className="text-[16px] font-bold text-white">최근 이용</h2><span className="text-[12px] text-[#686868]">게스트 익명 · TF 회원 프로필 기준 · 최대 400일 보관</span></div>
        <div className="grid grid-cols-2 divide-x divide-[#3c3c3c]/70">
          {analytics.recent.slice(0, 10).map((entry, index) => <div key={`${entry.path}-${entry.viewedAt}-${index}`} className="flex items-center justify-between gap-4 border-b border-[#3c3c3c]/60 px-5 py-3 last:border-b-0"><div className="min-w-0"><div className="truncate text-[14px] font-bold text-[#E5E5E5]">{PAGE_LABELS[entry.path] || entry.path}</div><div className="mt-0.5 font-mono text-[11px] text-[#686868]">{entry.path}</div></div><div className="shrink-0 text-right"><span className={`rounded-[5px] border px-1.5 py-0.5 text-[11px] font-bold ${entry.viewerType === 'guest' ? 'border-[#6f9fc7]/25 bg-[#6f9fc7]/10 text-[#9cc4e6]' : 'border-[#4da566]/25 bg-[#4da566]/10 text-[#7fc18e]'}`}>{entry.viewerType === 'guest' ? '게스트' : '회원'}</span><time className="mt-1 block text-[11px] text-[#686868]">{dateTime(entry.viewedAt)}</time></div></div>)}
          {!loading && analytics.recent.length === 0 && <div className="col-span-2 px-5 py-10 text-center text-[14px] text-[#686868]">최근 이용 기록이 없습니다.</div>}
        </div>
      </section>
      </> : (
        <div className="grid grid-cols-[360px_minmax(0,1fr)] items-start gap-3">
          <section className="overflow-hidden rounded-[20px] border border-[#3c3c3c] bg-[#272726]" aria-labelledby="member-analytics-list-title">
            <div className="flex h-[56px] items-center justify-between border-b border-[#3c3c3c] px-5">
              <div><h2 id="member-analytics-list-title" className="text-[16px] font-bold text-white">TF 인원별 이용</h2><p className="mt-0.5 text-[11px] text-[#686868]">선택 기간 내 로그인 활동</p></div>
              <span className="text-[12px] font-bold text-[#9cc4e6]">{number(members.length)}명</span>
            </div>
            <div className="divide-y divide-[#3c3c3c]/70">
              {members.map((member) => {
                const selected = String(member.id) === selectedMemberId;
                return (
                  <button key={member.id} type="button" onClick={() => setSelectedMemberId(member.id)} aria-pressed={selected} className={`w-full cursor-pointer px-4 py-3 text-left transition-colors ${selected ? 'bg-[#6f9fc7]/12' : 'hover:bg-white/[0.025]'}`}>
                    <div className="flex items-center gap-3">
                      <SonghyeonMemberAvatar name={memberName(member)} photoPath={member.photoPath} className={`h-10 w-10 border ${selected ? 'border-[#82add0]/60' : 'border-white/10'}`} />
                      <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><strong className={`truncate text-[15px] ${selected ? 'text-[#b7d5ee]' : 'text-[#E5E5E5]'}`}>{memberName(member)}</strong><span className="shrink-0 text-[15px] font-bold tabular-nums text-[#9cc4e6]">{number(member.views)} <small className="text-[11px] font-normal text-[#686868]">조회</small></span></div><p className="mt-0.5 truncate text-[12px] text-[#86868B]">{[memberGroup(member), member.title].filter(Boolean).join(' · ') || '-'}</p></div>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2 pl-[52px] text-[11px] text-[#686868]"><span>세션 <b className="text-[#A1A1AA]">{number(member.sessions)}</b></span><span>활동일 <b className="text-[#A1A1AA]">{number(member.activeDays)}</b></span><span className="truncate text-right" title={dateTime(member.lastViewedAt)}>{member.lastViewedAt ? dateTime(member.lastViewedAt) : '최근 이용 없음'}</span></div>
                  </button>
                );
              })}
              {!loading && members.length === 0 && <div className="px-5 py-12 text-center text-[14px] text-[#686868]">표시할 TF 인원이 없습니다.</div>}
            </div>
            <div className="border-t border-[#3c3c3c] bg-[#222]/70 px-4 py-3 text-[11px] leading-4 text-[#777]">
              <p>인원별 트래킹 적용 이후의 회원 이용부터 집계합니다.</p>
              {memberAnalytics.trackingStartedAt && <p className="mt-1">집계 시작 {dateTime(memberAnalytics.trackingStartedAt)}</p>}
              {memberAnalytics.unattributedMemberViews > 0 && <p className="mt-1 text-[#a98b70]">적용 전 미귀속 회원 조회 {number(memberAnalytics.unattributedMemberViews)}건은 상세에 포함되지 않습니다.</p>}
            </div>
          </section>

          <div className="min-w-0 space-y-3">
            <section className="rounded-[20px] border border-[#3c3c3c] bg-[#272726] p-5" aria-labelledby="member-detail-title">
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-3"><SonghyeonMemberAvatar name={memberName(selectedMember)} photoPath={selectedMember?.photoPath} className="h-12 w-12 border border-white/10" /><div className="min-w-0"><h2 id="member-detail-title" className="text-[16px] font-bold text-white">TF 인원 상세 트래킹</h2><p className="mt-1 truncate text-[14px] text-[#A1A1AA]"><b className="text-[#E5E5E5]">{memberName(selectedMember)}</b>{memberGroup(selectedMember) ? ` · ${memberGroup(selectedMember)}` : ''}</p></div></div>
                <span className="text-[12px] text-[#686868]">최근 이용 {dateTime(memberSummary.lastViewedAt)}</span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3" aria-label="TF 인원 요약 지표">
                <SummaryCard label="조회" value={memberSummary.views} note={`최근 ${memberDetail.periodDays || days}일`} />
                <SummaryCard label="세션" value={memberSummary.sessions} />
                <SummaryCard label="활동일" value={memberSummary.activeDays} />
                <SummaryCard label="최근 이용" displayValue={dateTime(memberSummary.lastViewedAt)} compact note={memberSummary.firstViewedAt ? `최초 ${dateTime(memberSummary.firstViewedAt)}` : ''} />
              </div>
            </section>

            <div className="grid grid-cols-[1.25fr_1fr] gap-3">
              <section className="rounded-[20px] border border-[#3c3c3c] bg-[#272726] p-5" aria-labelledby="member-daily-title">
                <div className="flex items-center justify-between"><h3 id="member-daily-title" className="text-[16px] font-bold text-white">일별 이용 추이</h3><span className="text-[12px] text-[#686868]">조회·세션</span></div>
                <div className="mt-5 flex h-[176px] items-end gap-1" role="img" aria-label={`${memberName(selectedMember)}의 최근 ${days}일 조회수`}>
                  {memberDetail.daily.map((item, index) => {
                    const height = Math.max(3, ((Number(item.views) || 0) / maximumMemberDailyViews) * 138);
                    const showLabel = memberDetail.daily.length <= 14 || index % Math.ceil(memberDetail.daily.length / 7) === 0 || index === memberDetail.daily.length - 1;
                    return <div key={item.date} className="group relative flex min-w-0 flex-1 flex-col items-center justify-end" title={`${item.date} · 조회 ${number(item.views)} · 세션 ${number(item.sessions)}`}><span className="pointer-events-none absolute bottom-[calc(100%+6px)] z-10 hidden whitespace-nowrap rounded-[6px] border border-[#454545] bg-[#1c1c1e] px-2 py-1 text-[12px] text-[#C7C7CC] shadow-lg group-hover:block">조회 {number(item.views)} · 세션 {number(item.sessions)}</span><div className="w-full max-w-[16px] rounded-t-[4px] bg-[#6f9fc7]/70" style={{ height }} /><span className="mt-2 h-3 truncate text-[10px] text-[#686868]">{showLabel ? shortDate(item.date) : ''}</span></div>;
                  })}
                  {!loading && memberDetail.daily.length === 0 && <div className="grid h-full w-full place-items-center text-[14px] text-[#686868]">이용 기록이 없습니다.</div>}
                </div>
              </section>

              <section className="overflow-hidden rounded-[20px] border border-[#3c3c3c] bg-[#272726]" aria-labelledby="member-pages-title">
                <div className="flex h-[52px] items-center justify-between border-b border-[#3c3c3c] px-4"><h3 id="member-pages-title" className="text-[16px] font-bold text-white">페이지별 이용</h3><span className="text-[12px] text-[#686868]">상위 {Math.min(memberDetail.pages.length, 7)}개</span></div>
                <div className="divide-y divide-[#3c3c3c]/70">{memberDetail.pages.slice(0, 7).map((page, index) => <div key={page.path} className="grid grid-cols-[20px_1fr_auto] items-center gap-2 px-4 py-2.5"><span className="font-mono text-[11px] text-[#686868]">{String(index + 1).padStart(2, '0')}</span><div className="min-w-0"><div className="truncate text-[13px] font-bold text-[#E5E5E5]">{PAGE_LABELS[page.path] || page.path}</div><div className="mt-0.5 truncate text-[10px] text-[#686868]">세션 {number(page.sessions)}</div></div><span className="text-[14px] font-bold tabular-nums text-[#9cc4e6]">{number(page.views)}</span></div>)}{!loading && memberDetail.pages.length === 0 && <div className="px-4 py-12 text-center text-[13px] text-[#686868]">집계된 페이지가 없습니다.</div>}</div>
              </section>
            </div>

            <section className="overflow-hidden rounded-[20px] border border-[#3c3c3c] bg-[#272726]" aria-labelledby="member-recent-title">
              <div className="flex h-[52px] items-center justify-between border-b border-[#3c3c3c] px-5"><h3 id="member-recent-title" className="text-[16px] font-bold text-white">최근 활동</h3><span className="text-[12px] text-[#686868]">최근 {Math.min(memberDetail.recent.length, 10)}건</span></div>
              <div className="grid grid-cols-2 divide-x divide-[#3c3c3c]/70">{memberDetail.recent.slice(0, 10).map((entry, index) => <div key={`${entry.path}-${entry.viewedAt}-${index}`} className="flex items-center justify-between gap-3 border-b border-[#3c3c3c]/60 px-5 py-3"><div className="min-w-0"><div className="truncate text-[13px] font-bold text-[#E5E5E5]">{PAGE_LABELS[entry.path] || entry.path}</div><div className="mt-0.5 truncate font-mono text-[10px] text-[#686868]">{entry.path}</div></div><time className="shrink-0 text-[11px] text-[#86868B]">{dateTime(entry.viewedAt)}</time></div>)}{!loading && memberDetail.recent.length === 0 && <div className="col-span-2 px-5 py-10 text-center text-[14px] text-[#686868]">최근 활동 기록이 없습니다.</div>}</div>
            </section>
          </div>
        </div>
      )}

      {loading && <div role="status" className="pointer-events-none fixed bottom-6 right-6 rounded-[10px] border border-[#3c3c3c] bg-[#272726] px-4 py-2 text-[13px] text-[#A1A1AA] shadow-xl">이용 현황을 불러오는 중…</div>}
    </WorkspacePageFrame>
  );
}
