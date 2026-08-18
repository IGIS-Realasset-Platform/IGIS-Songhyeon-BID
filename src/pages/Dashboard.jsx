import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  Activity,
  Building2,
  CalendarDays,
  Database,
  FileText,
  Hotel,
  Landmark,
  Layers3,
  ListChecks,
  MapPinned,
  MessageSquareText,
  ScanSearch,
  Store,
  Target,
} from 'lucide-react';
import { getSonghyeonTodayMarker, milestoneStages, milestoneWeeks } from '../data/songhyeonMilestones';
import { hypothesisPipeline } from '../data/songhyeonServiceHypotheses';
import { loadScheduleRows } from '../lib/songhyeonScheduleRepository';
import { loadTasks } from '../lib/songhyeonTaskRepository';
import { loadSonghyeonMapActivitiesOverview } from '../lib/songhyeonMapActivitiesRepository';
import { loadRecentTaskFeedPosts } from '../lib/songhyeonTaskFeedRepository';
import { loadRecentDataRoomDocuments } from '../lib/songhyeonDataRoomRepository';

const EMPTY_HOME_DATA = Object.freeze({
  scheduleRows: [],
  tasks: [],
  mapOverview: null,
  posts: [],
  documents: [],
});

const WORK_STAGE_LINKS = ['G0', 'G1', 'G2', 'G3', 'G6'];
const STATUS_LABELS = {
  completed: '완료',
  in_progress: '진행 중',
  not_started: '미착수',
  cancelled: '중단',
};

const clamp = (value, minimum = 0, maximum = 100) => Math.min(maximum, Math.max(minimum, value));
const percentage = (count, total) => total ? Math.round((count / total) * 100) : 0;
const formatDate = (value) => {
  if (!value) return '-';
  const match = String(value).match(/^(\d{4})[-.](\d{2})[-.](\d{2})/);
  return match ? `${match[2]}.${match[3]}` : value;
};

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-[1120px]">
      <p className="text-[13px] font-bold uppercase text-[#7eb5e4]">{eyebrow}</p>
      <h2 className="mt-4 whitespace-nowrap text-[42px] font-semibold leading-[1.08] text-white">{title}</h2>
      {description && <p className="mt-5 max-w-[1080px] text-[17px] leading-[1.75] text-[#96969c]">{description}</p>}
    </div>
  );
}

function Metric({ label, value, note, accent = false }) {
  return (
    <div className="min-w-0 border-l border-white/[0.12] pl-5">
      <p className="whitespace-nowrap text-[13px] font-semibold text-[#85858b]">{label}</p>
      <p className={`mt-2 whitespace-nowrap text-[27px] font-semibold ${accent ? 'text-[#7eb5e4]' : 'text-white'}`}>{value}</p>
      <p className="mt-1 whitespace-nowrap text-[12px] text-[#747479]">{note}</p>
    </div>
  );
}

function LoadingLine() {
  return <span className="inline-block h-4 w-24 animate-pulse rounded bg-white/10" />;
}

export default function Dashboard() {
  const { hash } = useLocation();
  const [data, setData] = useState(EMPTY_HOME_DATA);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(new Set());

  useEffect(() => {
    let active = true;
    Promise.allSettled([
      loadScheduleRows(),
      loadTasks(),
      loadSonghyeonMapActivitiesOverview(),
      loadRecentTaskFeedPosts(4),
      loadRecentDataRoomDocuments(4),
    ]).then((results) => {
      if (!active) return;
      const failed = new Set();
      const value = (index, key, fallback) => {
        if (results[index].status === 'fulfilled') return results[index].value;
        failed.add(key);
        return fallback;
      };
      setData({
        scheduleRows: value(0, 'schedule', []),
        tasks: value(1, 'tasks', []),
        mapOverview: value(2, 'map', null),
        posts: value(3, 'feed', []),
        documents: value(4, 'data', []),
      });
      setUnavailable(failed);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!hash) return undefined;
    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [hash]);

  const overview = useMemo(() => {
    const marker = getSonghyeonTodayMarker();
    const firstDate = milestoneWeeks[0]?.startDate || '';
    const lastDate = milestoneWeeks.at(-1)?.endDate || '';
    const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });
    const schedulePosition = marker
      ? ((marker.periodIndex + marker.periodProgress) / milestoneWeeks.length) * 100
      : today < firstDate ? 0 : today > lastDate ? 100 : 0;
    const currentWeek = marker ? milestoneWeeks[marker.periodIndex] : null;
    const currentStage = milestoneStages.find((stage) => stage.code === currentWeek?.stage) || milestoneStages[0];
    const scheduleCounts = Object.fromEntries(Object.keys(STATUS_LABELS).map((status) => [
      status,
      data.scheduleRows.filter((row) => row.status === status).length,
    ]));
    const taskCounts = ['미착수', '진행중', '완료', '중단'].reduce((counts, status) => ({
      ...counts,
      [status]: data.tasks.filter((task) => task.status === status).length,
    }), {});
    return {
      marker,
      currentWeek,
      currentStage,
      schedulePosition: clamp(schedulePosition),
      scheduleCounts,
      taskCounts,
      completionRate: percentage(scheduleCounts.completed, data.scheduleRows.length),
    };
  }, [data.scheduleRows, data.tasks]);

  const stageHref = `/milestones?stage=${overview.currentStage.code}&focus=current`;
  const mapCatalog = data.mapOverview?.catalog || {};
  const mapViews = [
    {
      path: '/map-activities/integrated-map',
      label: '통합지도',
      title: '송현을 한 장의 지도에서',
      description: '운영구역·자산·점포·기관을 겹쳐 보며 장소의 조건과 관계를 함께 읽습니다.',
      meta: '21개 데이터셋 · 공간 통합 탐색',
      icon: <Layers3 size={19} />,
      className: 'col-span-6 bg-gradient-to-br from-[#263640] to-[#222625]',
    },
    {
      path: '/map-activities/boundary',
      label: '운영구역',
      title: '운영 범위를 비교',
      description: '도로와 필지, 보행 흐름을 기준으로 BID 운영 범위의 대안을 비교합니다.',
      meta: unavailable.has('map') ? '운영 범위 비교' : `${data.mapOverview?.boundaries?.length || 0}개 운영 대안`,
      icon: <ScanSearch size={19} />,
      className: 'col-span-3 bg-[#242625]',
    },
    {
      path: '/map-activities/assets-leases',
      label: '자산·임차',
      title: '자산·임차 관계',
      description: '주요 자산의 위치와 운영 관계, 임대차 현황을 공간 위에서 확인합니다.',
      meta: unavailable.has('map') ? '자산 관계 탐색' : `${mapCatalog.assets?.length || 0}개 주요 자산`,
      icon: <Building2 size={19} />,
      className: 'col-span-3 bg-[#262526]',
    },
    {
      path: '/map-activities/igis-retail',
      label: '이지스 리테일',
      title: '운영 자산 연결',
      description: '이지스 자산과 주변 상권을 함께 보며 협업 가능한 운영 네트워크를 찾습니다.',
      meta: '자산 포트폴리오 · 운영 접점',
      icon: <Store size={19} />,
      className: 'col-span-3 bg-[#252524]',
    },
    {
      path: '/map-activities/market-activities',
      label: '상권·활동',
      title: '상권과 활동 밀도',
      description: '점포 구성과 유동, 시간대별 활동을 통해 실제 도시 경험의 패턴을 봅니다.',
      meta: '10,571개 점포 · 상권 활동',
      icon: <Activity size={19} />,
      className: 'col-span-3 bg-[#232526]',
    },
    {
      path: '/map-activities/hotel',
      label: '호텔',
      title: '도심 체류 수요',
      description: '숙박시설의 등급과 분포, 객실 공급을 비교해 방문객 체류 조건을 읽습니다.',
      meta: '266개 숙박시설 · 공급 구성',
      icon: <Hotel size={19} />,
      className: 'col-span-3 bg-[#252425]',
    },
    {
      path: '/map-activities/institutions-community',
      label: '제도·공동체',
      title: '제도와 관계자',
      description: '관련 계획·정책과 기관·공동체를 연결해 협의 순서와 실행 조건을 확인합니다.',
      meta: unavailable.has('map') ? '제도와 관계자 탐색' : `${mapCatalog.plans?.length || 0}개 계획 · ${mapCatalog.organizations?.length || 0}개 기관`,
      icon: <Landmark size={19} />,
      className: 'col-span-3 bg-[#242624]',
    },
  ];

  return (
    <main data-songhyeon-home className="overflow-hidden bg-[#1F1F1E] text-[#E5E5E5]">
      <section className="relative isolate min-h-[720px] border-b border-white/[0.08]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/songhyeon-home-insadong-hero.jpg"
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,20,20,.96)_0%,rgba(20,20,20,.84)_38%,rgba(20,20,20,.42)_72%,rgba(20,20,20,.28)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,.28)_0%,rgba(20,20,20,.2)_48%,rgba(20,20,20,.94)_100%)]" />
          <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
        </div>

        <div className="mx-auto flex min-h-[720px] w-[1200px] max-w-full flex-col px-6 pb-12 pt-[92px]">
          <div className="text-[14px] font-bold text-[#8fc7ff]">Songhyeon BID Project</div>
          <h1 className="mt-8 max-w-[990px] text-[70px] font-semibold leading-[1.02] text-white">
            송현을 하나의 장소가 아니라,<br />함께 운영되는 <span className="bg-gradient-to-r from-[#badaf5] via-[#9bc9ef] to-[#7ca9d3] bg-clip-text text-transparent">도시 경험</span>으로.
          </h1>
          <a
            href="/songhyeon-bid-direction-execution-plan-260813.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-white/[0.14] bg-black/20 px-4 py-2.5 text-[14px] font-semibold text-[#badaf5] transition-colors hover:border-[#8fc7ff]/60 hover:bg-[#8fc7ff]/10 hover:text-white"
          >
            <FileText size={16} />
            송현 BID 프로젝트 방향 &amp; 실행계획_260813.pdf
            <ArrowUpRight size={15} />
          </a>
          <p className="mt-8 max-w-[1080px] text-[19px] leading-[1.7] text-[#b0b0b5]">
            <span className="whitespace-nowrap">자산·공간·이용자·기업·지역·공공의 근거를 연결해 실행 가능한 서비스 가설을 만들고, 현장 검증을 거쳐</span><br />
            반복 가능한 BID 운영모델로 전환합니다.
          </p>
          <div className="mb-8 mt-10 flex items-center gap-3">
            <Link to={stageHref} className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-white px-6 text-[14px] font-bold text-[#171717] transition-transform hover:scale-[1.02]">
              현재 마일스톤 <ArrowUpRight size={16} />
            </Link>
            <Link to="/tasks" className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.055] px-6 text-[14px] font-bold text-white transition-colors hover:bg-white/[0.1]">
              진행 중 업무 <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-auto divide-y divide-white/[0.08] border-t border-white/[0.12] pt-2">
            {[
              ['WHAT', '장소를 운영체계로 전환', '공간·서비스·관계를 하나의 BID 운영모델로 연결합니다.'],
              ['WHY', '결정 가능한 근거 구축', '데이터와 현장 관찰을 검증 가능한 결정 기준으로 바꿉니다.'],
              ['OUTCOME', '검증된 실행체계 축적', 'MVP·운영 SOP·성과지표와 다음 확산 조건을 남깁니다.'],
            ].map(([label, title, description]) => (
              <article key={label} className="grid grid-cols-[74px_250px_minmax(0,1fr)] items-center gap-6 py-3.5">
                <p className="text-[11px] font-bold text-[#747479]">{label}</p>
                <h2 className="whitespace-nowrap text-[17px] font-semibold text-white">{title}</h2>
                <p className="whitespace-nowrap text-[13px] text-[#919196]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="where-we-are" className="mx-auto w-[1200px] max-w-full px-6 py-[112px]">
        <SectionHeading
          eyebrow="Where we are"
          title="전체 프로젝트 여정 속에서, 지금의 위치를 정확히 봅니다."
          description="시간이 얼마나 흘렀는지와 실제 상세 일정이 얼마나 완료됐는지를 분리해 보여줍니다. 일정의 속도와 업무의 진척을 같은 숫자로 포장하지 않습니다."
        />

        <Link to={stageHref} className="group mt-12 block cursor-pointer overflow-hidden rounded-[28px] border border-white/[0.1] bg-[#252524] transition-colors hover:border-white/[0.18] hover:bg-[#282827]">
          <div className="grid grid-cols-[.9fr_1.1fr] gap-12 p-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[#5c88ae]/50 bg-[#365775]/30 px-3 py-1.5 text-[11px] font-bold text-[#9bc9ef]">현재</span>
                <span className="text-[13px] font-semibold text-[#85858a]">{overview.marker?.dateLabel || '프로젝트 일정'}</span>
              </div>
              <p className="mt-6 text-[15px] font-semibold text-[#8fc7ff]">{overview.currentStage.code}</p>
              <h3 className="mt-2 whitespace-nowrap text-[38px] font-semibold text-white">{overview.currentStage.title}</h3>
              <p className="mt-4 whitespace-nowrap text-[15px] leading-[1.65] text-[#99999f]">{overview.currentStage.objective}</p>
              <div className="mt-7 flex items-center gap-2 text-[13px] font-bold text-white/80">
                마일스톤에서 현재 단계 보기 <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
            <div className="grid grid-cols-2 content-end gap-x-10 gap-y-9">
              <Metric label="일정상 위치" value={`${Math.round(overview.schedulePosition)}%`} note={`${milestoneWeeks.length}주 전체 일정`} accent />
              <Metric label="상세 일정 완료" value={`${overview.completionRate}%`} note={`${overview.scheduleCounts.completed || 0} / ${data.scheduleRows.length || 0}건`} />
              <Metric label="진행 중 일정" value={loading ? <LoadingLine /> : `${overview.scheduleCounts.in_progress || 0}건`} note="마일스톤 원장 기준" />
              <Metric label="다음 결정" value={overview.currentStage.gate} note={overview.currentStage.gateDecision} />
            </div>
          </div>
          <div className="border-t border-white/[0.08] px-10 py-9">
            <div className="relative h-2 overflow-hidden rounded-full bg-white/[0.16] shadow-[inset_0_0_0_1px_rgba(255,255,255,.04)]">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#4f8fc6] to-[#a9d7ff] shadow-[0_0_16px_rgba(126,181,228,.45)]" style={{ width: `${overview.schedulePosition}%` }} />
            </div>
            <div className="mt-6 grid grid-cols-7 gap-4">
              {milestoneStages.map((stage) => {
                const isCurrent = stage.code === overview.currentStage.code;
                return (
                  <div key={stage.code} className={`rounded-[10px] py-2 ${isCurrent ? 'bg-[#315474]/35 px-3 text-white' : 'text-[#85858a]'}`}>
                    <p className={`text-[15px] font-bold ${isCurrent ? 'text-[#9fd2ff]' : ''}`}>{stage.code}</p>
                    <p className="mt-1 whitespace-nowrap text-[13px] font-semibold">{stage.shortTitle}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Link>
      </section>

      <section id="how-we-work" className="border-y border-white/[0.08] bg-[#181818]">
        <div className="mx-auto w-[1200px] max-w-full px-6 py-[112px]">
          <SectionHeading
            eyebrow="How we work"
            title="가정으로 시작하지 않고, 근거에서 앞으로 나아갑니다."
            description="기존 서비스·운영 가설의 핵심을 다섯 단계로 압축했습니다. 각 단계는 다음 단계로 넘어가기 위한 명확한 완료조건을 가집니다."
          />
          <div className="mt-14 grid grid-cols-5 overflow-hidden rounded-[26px] border border-white/[0.12] bg-[#222221]">
            {hypothesisPipeline.map((stage, index) => {
              const isCurrentStage = WORK_STAGE_LINKS[index] === overview.currentStage.code;
              return <Link
                key={stage.id}
                to={`/milestones?stage=${WORK_STAGE_LINKS[index]}`}
                className={`${index < hypothesisPipeline.length - 1 ? 'border-r border-white/[0.11]' : ''} ${isCurrentStage ? 'bg-[#24394b] shadow-[inset_0_3px_0_#8fc7ff]' : ''} group flex min-h-[360px] cursor-pointer flex-col p-6 transition-colors hover:bg-[#2b3d4c]`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[#91c8f5]">{stage.step}</span>
                  <ArrowUpRight size={15} className="text-[#56565b] transition-colors group-hover:text-white" />
                </div>
                {isCurrentStage && <span className="mt-5 w-fit rounded-full border border-[#8fc7ff]/40 bg-[#8fc7ff]/10 px-2.5 py-1 text-[12px] font-bold text-[#a8d7ff]">현재 단계</span>}
                <h3 className={`${isCurrentStage ? 'mt-4' : 'mt-10'} whitespace-nowrap text-[23px] font-semibold text-white`}>{stage.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.65] text-[#a1a1a6]">{stage.description}</p>
                <div className="mt-auto border-t border-white/[0.09] pt-4">
                  <p className="text-[12px] font-bold uppercase text-[#737379]">Gate</p>
                  <p className="mt-2 text-[14px] font-semibold leading-[1.55] text-[#c0c0c4]">{stage.gate}</p>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-[1200px] max-w-full px-6 py-[112px]">
        <SectionHeading
          eyebrow="One project, connected views"
          title="계획과 실행, 장소의 근거를 하나의 흐름으로 봅니다."
          description="홈은 결과를 복제하지 않습니다. 각 원장의 현재 상태를 요약하고, 클릭하면 실제 업무가 이루어지는 화면으로 바로 이어집니다."
        />

        <div className="mt-14 grid grid-cols-12 gap-4">
          <Link to={stageHref} className="group col-span-7 flex min-h-[390px] cursor-pointer flex-col overflow-hidden rounded-[28px] border border-white/[0.1] bg-[#252524] p-8 transition-transform hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#315474]/40 text-[#9bc9ef]"><CalendarDays size={21} /></span>
              <ArrowUpRight size={19} className="text-[#66666b] transition-colors group-hover:text-white" />
            </div>
            <div className="mt-auto">
              <p className="text-[12px] font-bold uppercase text-[#77777c]">Milestone</p>
              <h3 className="mt-3 whitespace-nowrap text-[31px] font-semibold text-white">{overview.currentStage.code} · {overview.currentStage.shortTitle}</h3>
              <p className="mt-3 max-w-[560px] text-[14px] leading-[1.65] text-[#8d8d92]">전체 계획에서 현재 위치와 Gate별 상세 일정, 실행주관 및 연결 업무를 확인합니다.</p>
              <div className="mt-7 grid grid-cols-4 gap-3">
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <div key={key} className="rounded-[13px] bg-black/20 px-4 py-3">
                    <p className="text-[10px] font-semibold text-[#69696e]">{label}</p>
                    <p className="mt-1 text-[20px] font-semibold text-white">{overview.scheduleCounts[key] || 0}</p>
                  </div>
                ))}
              </div>
            </div>
          </Link>

          <Link to="/tasks?status=진행중" className="group col-span-5 flex min-h-[390px] cursor-pointer flex-col rounded-[28px] border border-white/[0.1] bg-gradient-to-br from-[#26313a] to-[#222222] p-8 transition-transform hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#3c6b91]/35 text-[#9bc9ef]"><ListChecks size={21} /></span>
              <ArrowUpRight size={19} className="text-[#6f7780] transition-colors group-hover:text-white" />
            </div>
            <div className="mt-auto">
              <p className="text-[12px] font-bold uppercase text-[#7d858c]">Integrated task board</p>
              <h3 className="mt-3 whitespace-nowrap text-[31px] font-semibold text-white">실행은 업무 단위로.</h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-[#979da2]">담당·기한·상태·결정사항을 하나의 원장에서 관리합니다.</p>
              <div className="mt-7 flex gap-6 border-t border-white/[0.1] pt-5">
                <Metric label="진행 중" value={loading ? <LoadingLine /> : `${overview.taskCounts['진행중'] || 0}`} note="실행 업무" accent />
                <Metric label="완료" value={loading ? <LoadingLine /> : `${overview.taskCounts['완료'] || 0}`} note="누적 업무" />
              </div>
            </div>
          </Link>

          <div className="col-span-12 mt-2 overflow-hidden rounded-[28px] border border-white/[0.11] bg-[#202120]">
            <div className="flex items-end justify-between gap-10 border-b border-white/[0.09] px-8 py-7">
              <div>
                <div className="flex items-center gap-3 text-[#8fc5bc]"><MapPinned size={20} /><p className="text-[12px] font-bold uppercase">Map & Activities</p></div>
                <h3 className="mt-4 text-[30px] font-semibold text-white">장소를 이해하는 일곱 개의 관점</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-[#929297]">숫자만 요약하지 않고, 각 공간 화면에서 실제로 확인할 수 있는 핵심 콘텐츠를 바로 소개합니다.</p>
              </div>
              <Link to="/map-activities/integrated-map" className="inline-flex shrink-0 cursor-pointer items-center gap-2 text-[13px] font-bold text-[#9ccfca] hover:text-white">전체 지도에서 시작 <ArrowUpRight size={15} /></Link>
            </div>

            <div className="grid grid-cols-12 gap-px bg-white/[0.09]">
              {mapViews.map(({ path, label, title, description, meta, icon, className }) => (
                <Link key={path} to={path} className={`${className} group flex min-h-[230px] cursor-pointer flex-col p-7 transition-colors hover:bg-[#2c3435]`}>
                  <div className="flex items-start justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-[12px] border border-white/[0.08] bg-white/[0.055] text-[#91c9c1]">{icon}</span>
                    <ArrowUpRight size={17} className="text-[#62676a] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  <div className="mt-7">
                    <p className="text-[11px] font-bold text-[#80aaa4]">{label}</p>
                    <h4 className="mt-2 whitespace-nowrap text-[20px] font-semibold text-white">{title}</h4>
                    <p className="mt-3 text-[13px] leading-[1.6] text-[#929297]">{description}</p>
                  </div>
                  <p className="mt-auto border-t border-white/[0.08] pt-4 text-[11px] font-semibold text-[#73777a]">{meta}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-[#181818]">
        <div className="mx-auto w-[1200px] max-w-full px-6 py-[112px]">
          <SectionHeading
            eyebrow="Latest signals"
            title="최근의 기록이 다음 결정을 만듭니다."
            description="업무 메시지와 문서가 각자의 원장에 쌓이고, 홈에서는 가장 최근의 흐름만 빠르게 확인합니다."
          />
          <div className="mt-14 grid grid-cols-2 gap-5">
            <div className="overflow-hidden rounded-[26px] border border-white/[0.1] bg-[#232322]">
              <div className="flex items-center justify-between border-b border-white/[0.09] px-6 py-5">
                <div className="flex items-center gap-3"><MessageSquareText size={19} className="text-[#7eb5e4]" /><h3 className="text-[18px] font-semibold text-white">업무 피드</h3></div>
                <Link to="/feed" className="cursor-pointer text-[12px] font-bold text-[#8fc7ff] hover:text-white">전체보기</Link>
              </div>
              <div>
                {data.posts.length ? data.posts.map((post) => (
                  <Link key={post.id} to={`/feed/${encodeURIComponent(post.id)}`} className="group grid min-h-[76px] cursor-pointer grid-cols-[1fr_auto] items-center gap-5 border-b border-white/[0.07] px-6 py-4 last:border-b-0 hover:bg-white/[0.035]">
                    <div className="min-w-0">
                      <p className="truncate text-[17px] font-semibold text-[#dedee1] group-hover:text-white">{post.title || '제목 없음'}</p>
                      <p className="mt-1.5 truncate text-[12px] text-[#7f7f84]">{post.author?.name || '송현 BID TF'} · {post.status}</p>
                    </div>
                    <span className="text-[11px] text-[#69696e]">{formatDate(post.workDate)}</span>
                  </Link>
                )) : (
                  <div className="grid h-[180px] place-items-center px-6 text-[13px] text-[#66666b]">{loading ? '최근 기록을 불러오는 중입니다.' : '표시할 업무 피드가 없습니다.'}</div>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-[26px] border border-white/[0.1] bg-[#232322]">
              <div className="flex items-center justify-between border-b border-white/[0.09] px-6 py-5">
                <div className="flex items-center gap-3"><Database size={19} className="text-[#b19ad0]" /><h3 className="text-[18px] font-semibold text-white">Data Room</h3></div>
                <Link to="/data" className="cursor-pointer text-[12px] font-bold text-[#bda6db] hover:text-white">전체보기</Link>
              </div>
              <div>
                {data.documents.length ? data.documents.map((document) => (
                  <Link key={document.id} to={`/data/${encodeURIComponent(document.id)}`} className="group grid min-h-[76px] cursor-pointer grid-cols-[1fr_auto] items-center gap-5 border-b border-white/[0.07] px-6 py-4 last:border-b-0 hover:bg-white/[0.035]">
                    <div className="min-w-0">
                      <p className="truncate text-[17px] font-semibold text-[#dedee1] group-hover:text-white">{document.title}</p>
                      <p className="mt-1.5 truncate text-[12px] text-[#7f7f84]">{document.authorName} · {document.category}</p>
                    </div>
                    <span className="text-[11px] text-[#69696e]">{formatDate(document.date)}</span>
                  </Link>
                )) : (
                  <div className="grid h-[180px] place-items-center px-6 text-[13px] text-[#66666b]">{loading ? '최근 문서를 불러오는 중입니다.' : '표시할 Data Room 문서가 없습니다.'}</div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-[110px] flex flex-col items-center border-t border-white/[0.08] pt-[90px] text-center">
            <Target size={25} className="text-[#7eb5e4]" />
            <p className="mt-6 max-w-[820px] text-[34px] font-semibold leading-[1.25] text-white">근거를 연결하고, 함께 결정하고,<br />실행의 결과를 다시 다음 기준으로.</p>
            <Link
              to="/tasks?status=진행중"
              className="mt-8 inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-[#2c78b8] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#3888ca]"
            >
              현재 상세 업무 보기 <ArrowUpRight size={16} />
            </Link>
            <Link
              to={stageHref}
              className="mt-3 inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-[#47769e] bg-[#172431] px-5 text-[14px] font-bold text-[#9ccfff] transition-colors hover:border-[#79b4e7] hover:bg-[#203447] hover:text-white"
            >
              현재 마일스톤 보기 <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
