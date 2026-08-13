import { ArrowRight, Database, Network, ScanSearch } from 'lucide-react';
import ProjectContext from '../components/tf/ProjectContext';
import EvidenceStatus from '../components/tf/EvidenceStatus';
import ImmediateBacklog from '../components/tf/ImmediateBacklog';
import StageRoadmap from '../components/tf/StageRoadmap';
import EcosystemPreview from '../components/tf/EcosystemPreview';
import OrganizationRoles from '../components/tf/OrganizationRoles';
import DecisionBoundary from '../components/tf/DecisionBoundary';
import AssetBaseline from '../components/tf/AssetBaseline';
import GlobalCaseInsights from '../components/tf/GlobalCaseInsights';
import StageExitCriteria from '../components/tf/StageExitCriteria';
import SonghyeonTaskBoard from '../components/iota-songhyeon/task-board/SonghyeonTaskBoard';
import {
  projectContext,
  stages,
  evidenceCategories,
  assetBaseline,
  immediateBacklog,
  ecosystemGroups,
  organizationRoles,
  caseInsights,
  decisionBoundaries,
  stageZeroExitCriteria,
} from '../data/songhyeonTfData';

const sectionLinks = [
  { href: '#evidence', label: '근거 현황' },
  { href: '#assets', label: '자산 기준선' },
  { href: '#backlog', label: '즉시 실행업무' },
  { href: '#ecosystem', label: '참여·운영 생태계' },
  { href: '#roles', label: '조직별 기여' },
  { href: '#roadmap', label: '실행순서' },
  { href: '#boundary', label: '결정 경계' },
  { href: '#task-board', label: '통합업무보드' },
];

const axisIcons = [Database, Network];

const Dashboard = () => (
  <div className="tf-dashboard pb-12 tracking-normal text-slate-900">
    <header className="mb-6 border-b-2 border-slate-950 pb-5">
      <div className="flex items-end justify-between gap-10">
        <div>
          <h1 className="text-3xl font-black text-slate-950">송현 BID 프로젝트</h1>
          <p className="mt-2 max-w-4xl text-base font-semibold leading-7 text-slate-600">
            자산·공간·입주사·파트너를 연결해 플레이스메이킹과 에리어매니지먼트가 작동할 환경 구축
          </p>
        </div>

        <dl className="grid min-w-[400px] grid-cols-2 border border-slate-300 bg-white">
          <div className="border-r border-slate-300 p-3">
            <dt className="text-[9px] font-black text-slate-400">현재 단계</dt>
            <dd className="mt-1 text-xs font-black text-[#0057b8]">0단계 · 근거기반 구축</dd>
          </div>
          <div className="p-3">
            <dt className="text-[9px] font-black text-slate-400">다음 단계</dt>
            <dd className="mt-1 text-xs font-black text-slate-900">현장기회 정의</dd>
          </div>
        </dl>
      </div>
    </header>

    <nav className="sticky top-0 z-40 mb-6 overflow-x-auto border-y border-slate-300 bg-white" aria-label="홈 섹션 바로가기">
      <div className="flex w-max min-w-full">
        {sectionLinks.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 px-4 py-3 text-[11px] font-black text-slate-600 hover:bg-white hover:text-[#0057b8] ${index < sectionLinks.length - 1 ? 'border-r border-slate-300' : ''}`}
          >
            {link.label}
            <ArrowRight size={12} />
          </a>
        ))}
      </div>
    </nav>

    <div className="space-y-6">
      <ProjectContext context={projectContext} />

      <section className="grid grid-cols-2 border-l border-t border-slate-300">
        {projectContext.axes.map((axis, index) => {
          const Icon = axisIcons[index] || ScanSearch;
          return (
            <article key={axis.id} className="border-b border-r border-slate-300 bg-white p-5">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-slate-300 bg-slate-50 text-[#0057b8]">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-[10px] font-black text-[#0057b8]">{axis.label}</p>
                  <h2 className="mt-1 text-base font-black text-slate-950">{axis.title}</h2>
                  <p className="mt-2 text-xs font-medium leading-6 text-slate-600">{axis.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <div id="evidence" className="scroll-mt-4">
        <EvidenceStatus categories={evidenceCategories} />
      </div>

      <div id="assets" className="scroll-mt-4">
        <AssetBaseline assets={assetBaseline} />
      </div>

      <div id="backlog" className="scroll-mt-4">
        <ImmediateBacklog groups={immediateBacklog} />
      </div>

      <div id="ecosystem" className="scroll-mt-4">
        <EcosystemPreview groups={ecosystemGroups} />
      </div>

      <div id="roles" className="scroll-mt-4">
        <OrganizationRoles roles={organizationRoles} cityCollaboration={projectContext.cityCollaboration} />
      </div>

      <div id="roadmap" className="scroll-mt-4">
        <StageRoadmap stages={stages} />
      </div>

      <GlobalCaseInsights insights={caseInsights} />

      <div id="boundary" className="scroll-mt-4">
        <DecisionBoundary items={decisionBoundaries} />
      </div>

      <StageExitCriteria criteria={stageZeroExitCriteria} />

      <div id="task-board" className="scroll-mt-4 pt-6">
        <SonghyeonTaskBoard showWorkspaceHeader={false} />
      </div>
    </div>
  </div>
);

export default Dashboard;
