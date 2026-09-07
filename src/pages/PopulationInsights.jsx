import { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Clock3,
  Database,
  MapPinned,
  UsersRound,
} from 'lucide-react';

const FINDINGS = [
  {
    number: '01',
    title: '인사동 핵심부의 단기체류 외국인은 정오에 더 집중된다.',
    description: '안녕인사동·쌈지길 격자의 12–15시 평균은 224.2명으로, 03–06시 169.6명보다 32.2% 높다.',
    note: '인사동 전체 수치는 숙박시설이 포함된 격자의 영향을 받으므로 핵심부와 분리해 해석',
  },
  {
    number: '02',
    title: '일요일 정오에는 송현이 인사동보다 외국인을 더 많이 모은다.',
    description: '단기체류 외국인은 송현 209.0명/격자, 인사동 142.3명/격자로 송현이 1.47배 높다.',
    note: '송현의 주말 집객을 인사동의 체류·소비로 연결할 운영 장치가 필요한 지점',
  },
  {
    number: '03',
    title: '야간개장은 인사동의 늦은 시간 외국인 체류를 실제로 늘렸다.',
    description: '2025년 가을 야간개장 기간 21–23시 단기체류 외국인은 123.0명으로, 비교 기준 101.2명보다 21.6% 증가했다.',
    note: '행사 효과를 권역 연결 효과로 전환하려면 늦은 시간의 안내·이동·소비 콘텐츠가 필요',
  },
  {
    number: '04',
    title: '2026년 봄, 외국인 흐름은 낮에는 송현에, 저녁에는 인사동에 강하다.',
    description: '정오에는 송현 245.2명, 인사동 143.3명이지만 저녁에는 송현 92.8명, 인사동 119.0명으로 흐름이 역전된다.',
    note: '낮의 송현 방문을 오후 체험과 저녁 인사동 체류로 연결할 시간대별 동선 설계가 필요',
  },
];

const ACTIONS = [
  {
    title: '낮의 집객을 권역 체류로 전환',
    description: '송현 방문이 집중되는 12–15시 이후, 15–17시에 인사동 체험·상점·문화시설로 이어지는 프로그램과 안내 동선을 검증한다.',
  },
  {
    title: '야간개장 효과를 주변 운영으로 확장',
    description: '21–23시 증가하는 외국인 수요에 맞춰 다국어 안내, 야간 이동, 늦은 시간 이용 가능한 콘텐츠와 상점 참여를 함께 실증한다.',
  },
  {
    title: '방문자 수가 아닌 이동과 전환을 확인',
    description: '송현과 인사동의 개별 인구 규모를 넘어 실제 이동 경로, 체류시간, 재방문, 소비·프로그램 참여를 현장조사로 확인한다.',
  },
];

const LIMITS = [
  '분석 권역은 통계 격자 기준이며 법정동·행정동·향후 BID 운영구역과 일치하지 않는다.',
  '생활인구는 시점별 추정 인구, 체류인구는 체류 시작 건수로 고유 방문자나 개인별 이동 경로를 의미하지 않는다.',
  '비공개 처리된 값은 하한값으로 유지했고 결측 행은 0으로 간주하지 않았다.',
  '숙박시설과 인구의 관계는 공간적 맥락이며, 호텔이 인구 변화를 만들었다는 인과관계는 확인되지 않았다.',
  '2025.01.01–2026.08.29의 606일 자료를 사용했으며 공식 결측일 3일과 생성 결과의 추가 검증 필요 상태를 함께 관리한다.',
];

function Metric({ icon, label, value, note }) {
  return (
    <div className="rounded-[18px] border border-white/[0.09] bg-[#252524] px-5 py-5">
      <div className="flex items-center gap-2 text-[#87b9df]">{icon}<span className="text-[14px] font-semibold">{label}</span></div>
      <p className="mt-4 text-[30px] font-semibold tabular-nums text-white">{value}</p>
      <p className="mt-1 text-[14px] text-[#89898e]">{note}</p>
    </div>
  );
}

function FullAnalysis() {
  const hostRef = useRef(null);
  const frameRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [frameHeight, setFrameHeight] = useState(1080);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldLoad(true);
      observer.disconnect();
    }, { rootMargin: '700px 0px' });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => resizeObserverRef.current?.disconnect(), []);

  const syncHeight = () => {
    try {
      const frameDocument = frameRef.current?.contentDocument;
      if (!frameDocument) return;
      const nextHeight = Math.max(
        frameDocument.documentElement?.scrollHeight || 0,
        frameDocument.body?.scrollHeight || 0,
        1080,
      );
      setFrameHeight(Math.min(nextHeight, 16000));
      resizeObserverRef.current?.disconnect();
      if ('ResizeObserver' in window && frameDocument.body) {
        const observer = new ResizeObserver(() => {
          const height = Math.max(frameDocument.documentElement?.scrollHeight || 0, frameDocument.body?.scrollHeight || 0, 1080);
          setFrameHeight(Math.min(height, 16000));
        });
        observer.observe(frameDocument.body);
        resizeObserverRef.current = observer;
      }
    } catch {
      setFrameHeight(1080);
    }
  };

  return (
    <section ref={hostRef} className="mt-10 overflow-hidden rounded-[22px] border border-white/[0.1] bg-[#242423]">
      <div className="flex items-end justify-between gap-8 border-b border-white/[0.09] px-7 py-6">
        <div>
          <p className="text-[14px] font-bold text-[#87b9df]">전체 분석</p>
          <h2 className="mt-2 text-[24px] font-semibold text-white">지역·월·요일·시간대별 원자료를 직접 비교합니다.</h2>
          <p className="mt-2 text-[15px] leading-[1.65] text-[#99999e]">지도와 차트는 이 영역에 도달할 때만 불러와 다른 페이지와 초기 화면의 속도에 영향을 주지 않습니다.</p>
        </div>
        <a
          href="/map-activities/songhyeon-population-analysis.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-[10px] border border-white/[0.12] px-4 py-2.5 text-[14px] font-semibold text-[#a9cbe6] transition-colors hover:border-[#87b9df]/60 hover:bg-[#87b9df]/10 hover:text-white"
        >
          새 창에서 보기 <ArrowUpRight size={15} />
        </a>
      </div>
      {shouldLoad ? (
        <iframe
          ref={frameRef}
          title="경복궁 동측 생활·체류인구 전체 분석"
          src="/map-activities/songhyeon-population-analysis.html"
          loading="lazy"
          onLoad={syncHeight}
          className="block w-full border-0 bg-white"
          style={{ height: `${frameHeight}px` }}
        />
      ) : (
        <div className="grid h-[360px] place-items-center px-8 text-center">
          <div>
            <BarChart3 size={28} className="mx-auto text-[#87b9df]" />
            <p className="mt-4 text-[16px] font-semibold text-white">상세 분석을 준비하고 있습니다.</p>
            <p className="mt-2 text-[14px] text-[#85858a]">아래로 이동하면 전체 분석이 자동으로 열립니다.</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default function PopulationInsights() {
  return (
    <div data-population-insights className="h-full min-h-0 overflow-y-auto bg-[#1F1F1E] text-[#e5e5e5]">
      <header className="sticky top-0 z-20 flex h-[58px] items-center border-b border-[#303235] bg-[#222325] px-5">
        <div className="flex min-w-0 items-center gap-2">
          <h1 className="text-[22px] font-bold tracking-tight text-white">Map &amp; Activities</h1>
          <span className="text-[16px] text-[#606165]">/</span>
          <span className="text-[17px] font-bold text-[#B8C3CB]">인구·이용패턴</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-10 pb-16 pt-10">
        <section>
          <div className="flex items-center gap-2 text-[#87b9df]"><MapPinned size={20} /><p className="text-[15px] font-bold">인구·이용패턴</p></div>
          <h1 className="mt-4 text-[42px] font-semibold leading-[1.15] text-white">경복궁 동측의 이용은 지역과 시간에 따라 다르게 움직입니다.</h1>
          <p className="mt-5 max-w-[1120px] text-[17px] leading-[1.8] text-[#a0a0a5]">
            인사동·송현동·삼청동·가회동의 생활·체류인구를 비교해, 송현에 사람이 모이는 시간과 주변 권역으로 이어질 가능성을 확인합니다.
            방문 규모 자체보다 송현의 집객이 인사동의 체류와 이용으로 전환되는 조건을 찾는 데 초점을 둡니다.
          </p>
        </section>

        <section aria-label="분석 범위" className="mt-8 grid grid-cols-4 gap-3">
          <Metric icon={<MapPinned size={17} />} label="비교 권역" value="4개" note="인사동·송현동·삼청동·가회동" />
          <Metric icon={<Database size={17} />} label="분석 격자" value="40개" note="권역별 통계 격자" />
          <Metric icon={<CalendarDays size={17} />} label="분석 기간" value="606일" note="2025.01.01–2026.08.29" />
          <Metric icon={<UsersRound size={17} />} label="인구 구분" value="3개" note="내국인·단기체류·장기체류 외국인" />
        </section>

        <section className="mt-14">
          <div>
            <p className="text-[15px] font-bold text-[#87b9df]">확인된 핵심 사실</p>
            <h2 className="mt-3 text-[30px] font-semibold text-white">송현의 집객과 인사동의 체류는 서로 다른 시간대에 나타납니다.</h2>
          </div>
          <div className="mt-6 space-y-3">
            {FINDINGS.map((finding) => (
              <article key={finding.number} className="grid grid-cols-[58px_minmax(300px,0.78fr)_minmax(420px,1.22fr)] gap-6 rounded-[18px] border border-white/[0.08] bg-[#252524] px-6 py-5">
                <span className="text-[16px] font-bold text-[#87b9df]">{finding.number}</span>
                <h3 className="text-[20px] font-semibold leading-[1.45] text-white">{finding.title}</h3>
                <div>
                  <p className="text-[16px] leading-[1.65] text-[#b1b1b6]">{finding.description}</p>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[#7f9eb8]">{finding.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[24px] border border-[#497ba3]/40 bg-[#21303b] px-7 py-7">
          <div className="flex items-center gap-2 text-[#9ecbed]"><Clock3 size={19} /><p className="text-[15px] font-bold">송현 BID 적용 과제</p></div>
          <h2 className="mt-3 text-[29px] font-semibold text-white">시간대별 인구 차이를 실제 이동과 참여로 전환하는 조건을 검증합니다.</h2>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {ACTIONS.map((action, index) => (
              <article key={action.title} className="rounded-[16px] border border-white/[0.1] bg-[#1c2730] p-5">
                <span className="text-[14px] font-bold text-[#8fc7ef]">0{index + 1}</span>
                <h3 className="mt-3 text-[19px] font-semibold text-white">{action.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#b0bdc7]">{action.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[22px] border border-[#8f7440]/35 bg-[#292720] px-7 py-6">
          <div className="flex items-center gap-2 text-[#d3b578]"><AlertTriangle size={18} /><p className="text-[15px] font-bold">해석 시 확인할 기준</p></div>
          <div className="mt-5 space-y-3">
            {LIMITS.map((limit, index) => (
              <div key={limit} className="grid grid-cols-[38px_1fr] gap-3 text-[15px] leading-[1.65] text-[#b6b1a7]">
                <span className="font-semibold text-[#c9a96b]">0{index + 1}</span>
                <p>{limit}</p>
              </div>
            ))}
          </div>
        </section>

        <FullAnalysis />
      </main>
    </div>
  );
}
