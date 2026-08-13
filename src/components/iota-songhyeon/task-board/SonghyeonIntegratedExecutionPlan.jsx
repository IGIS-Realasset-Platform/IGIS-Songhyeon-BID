import { ArrowDown, ArrowRight, Check, CircleDot, Route, Users } from 'lucide-react';
import {
  decisionBoundaries,
  organizationRoles,
  projectContext,
  stageZeroExitCriteria,
  stages,
  workPlanPhases,
} from '../../../data/songhyeonTfData';

const sharedPhases = workPlanPhases.filter((phase) => phase.track !== '기획추진 전담');
const planningTrack = workPlanPhases.find((phase) => phase.track === '기획추진 전담');

const stageQuestions = {
  'WP-00': '무엇이 사실이며, 다음 판단에 필요한 어떤 근거가 아직 비어 있는가?',
  'WP-01': '현장에서 반복되는 문제와 수요를 어떤 기회영역으로 정의할 것인가?',
  'WP-02': '누구에게 어떤 장소경험을 제공하고, 현장에서 무엇을 검증할 것인가?',
  'WP-03': '가설이 실제 공간·원가·운영·참여 조건 안에서 지속될 수 있는가?',
  'WP-04A': '누가, 언제, 어떤 자원으로 실행하며 무엇을 성공으로 판단할 것인가?',
  'WP-05': '실증에서 무엇을 유지·보완·중단하고, 다음 적용에 무엇을 남길 것인가?',
};

const roleStageMatrix = [
  ['근거기반 구축', '공동', '지원', '공동', '공동'],
  ['현장기회 정의', '주도', '공동', '조정', '지원'],
  ['플레이스메이킹 가설', '주도', '공동', '조정', '검토'],
  ['서비스·운영 실행성', '주도', '공동', '검토', '공동'],
  ['에리어매니지먼트 환경', '공동', '공동', '공동', '검토'],
  ['실증 준비·정합화', '공동', '지원', '공동', '공동'],
  ['실증·학습', '공동', '공동', '종합', '공동'],
];

const roleColumnOrder = ['공간솔루션센터', '기업마케팅센터', '기획추진실', '자산·운영 담당조직'];
const roleTone = {
  주도: 'border-[#2997FF]/35 bg-[#2997FF]/12 text-[#67b7ff]',
  공동: 'border-[#bdbba7]/25 bg-[#bdbba7]/10 text-[#d4d2c3]',
  조정: 'border-[#8e8e93]/30 bg-[#8e8e93]/10 text-[#b9b9bd]',
  지원: 'border-[#686868] bg-[#30302F] text-[#9a9a9f]',
  검토: 'border-[#686868] bg-transparent text-[#86868B]',
  종합: 'border-[#FF9F0A]/30 bg-[#FF9F0A]/10 text-[#ffb340]',
};

function SectionHeading({ title, description }) {
  return (
    <div className="mb-[12px] flex items-end justify-between gap-8">
      <h2 className="text-[20px] font-bold text-[#E5E5E5]">{title}</h2>
      {description && <p className="max-w-[660px] text-right text-[12px] leading-5 text-[#86868B]">{description}</p>}
    </div>
  );
}

export default function SonghyeonIntegratedExecutionPlan() {
  return (
    <section id="execution-framework" className="mx-auto w-[1200px] max-w-full bg-[#1F1F1E] pb-[20px] pt-[38px] text-[#E5E5E5]">
      <div className="mb-[32px]">
        <div className="flex items-end justify-between gap-10">
          <div>
            <h1 className="text-[28px] font-bold leading-tight">송현 BID 종합실행계획</h1>
            <p className="mt-3 max-w-[780px] text-[14px] leading-6 text-[#bbb9af]">
              통합업무보드의 개별 업무가 어떤 목적과 순서 안에서 움직이는지 설명합니다. 위에서 업무를 수행하고,
              아래에서 현재 단계의 질문·수행업무·결과물·단계전환 기준을 함께 확인합니다.
            </p>
          </div>
          <div className="grid min-w-[330px] grid-cols-2 overflow-hidden rounded-[12px] border border-[#3c3c3c] bg-[#272726]">
            <div className="border-r border-[#3c3c3c] px-4 py-3">
              <p className="text-[11px] font-bold text-[#686868]">현재 위치</p>
              <p className="mt-1 text-[14px] font-bold text-[#2997FF]">{projectContext.currentStage.code}</p>
              <p className="mt-0.5 text-[12px] text-[#bbb9af]">{projectContext.currentStage.name}</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-[11px] font-bold text-[#686868]">다음 단계</p>
              <p className="mt-1 text-[14px] font-bold text-[#E5E5E5]">{projectContext.nextGate}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-[44px]">
        <SectionHeading title="현재 위치와 공동 목표" description="현재의 근거 구축이 궁극적인 장소·운영환경과 어떻게 연결되는지 먼저 확인합니다." />
        <div className="grid grid-cols-[0.82fr_64px_1.18fr] items-stretch overflow-hidden rounded-[18px] border border-[#3c3c3c] bg-[#272726]">
          <div className="p-6">
            <div className="mb-5 flex items-center gap-2 text-[#2997FF]"><CircleDot size={16} /><span className="text-[12px] font-bold">현재</span></div>
            <p className="text-[13px] font-bold text-[#86868B]">{projectContext.currentStage.code}</p>
            <h3 className="mt-2 text-[22px] font-bold">{projectContext.currentStage.name}</h3>
            <p className="mt-4 text-[14px] leading-6 text-[#bbb9af]">{projectContext.currentStage.objective}</p>
          </div>
          <div className="flex items-center justify-center border-x border-[#3c3c3c] bg-[#242423] text-[#686868]"><ArrowRight size={24} /></div>
          <div className="p-6">
            <div className="mb-5 flex items-center gap-2 text-[#bdbba7]"><Route size={16} /><span className="text-[12px] font-bold">공동 목표</span></div>
            <h3 className="max-w-[620px] text-[22px] font-bold leading-8">{projectContext.coreValue}</h3>
            <p className="mt-4 text-[14px] leading-6 text-[#bbb9af]">{projectContext.definition}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {projectContext.operatingPrinciples.map((principle, index) => (
            <div key={principle} className="flex min-h-[84px] gap-3 rounded-[12px] border border-[#3c3c3c] bg-[#272726] p-4">
              <span className="font-mono text-[11px] font-bold text-[#686868]">0{index + 1}</span>
              <p className="text-[13px] leading-6 text-[#bbb9af]">{principle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-[44px]" data-execution-flow>
        <SectionHeading title="전체 실행 흐름" description="근거에서 시작해 현장기회·가설·운영환경을 거쳐 실증과 학습으로 이어지는 7단계입니다." />
        <div className="grid grid-cols-7 overflow-hidden rounded-[18px] border border-[#3c3c3c] bg-[#272726]">
          {stages.map((stage, index) => (
            <article key={stage.id} className={`relative min-h-[190px] p-4 ${index < stages.length - 1 ? 'border-r border-[#3c3c3c]' : ''} ${stage.status === '현재' ? 'bg-[#263b52]' : ''}`}>
              <div className="flex items-start justify-between">
                <span className={`font-mono text-[11px] font-bold ${stage.status === '현재' ? 'text-[#67b7ff]' : 'text-[#686868]'}`}>0{stage.id + 1}</span>
                {stage.status === '현재' && <span className="rounded-[6px] border border-[#2997FF]/35 bg-[#2997FF]/10 px-2 py-0.5 text-[10px] font-bold text-[#67b7ff]">현재</span>}
              </div>
              <h3 className="mt-5 break-keep text-[15px] font-bold leading-6">{stage.title}</h3>
              <p className="mt-3 break-keep text-[12px] leading-5 text-[#86868B]">{stage.short}</p>
              <div className="absolute bottom-4 left-4 right-4 border-t border-[#3c3c3c] pt-3">
                <p className="text-[10px] font-bold text-[#686868]">GATE</p>
                <p className="mt-1 text-[11px] leading-4 text-[#bbb9af]">{stage.gate}</p>
              </div>
              {index < stages.length - 1 && <ArrowRight size={14} className="absolute -right-[7px] top-[28px] z-10 text-[#86868B]" />}
            </article>
          ))}
        </div>
      </section>

      <section className="mb-[44px]" data-stage-detail>
        <SectionHeading title="단계별 상세 실행계획" description="각 단계에서 답할 질문, 수행할 일, 책임주체, 완료기준을 같은 순서로 읽습니다." />
        <div className="space-y-3">
          {sharedPhases.map((phase, index) => (
            <article key={phase.id} className="grid grid-cols-[156px_1fr_280px] overflow-hidden rounded-[16px] border border-[#3c3c3c] bg-[#272726]">
              <div className={`relative p-5 ${phase.status === '진행' ? 'bg-[#263b52]' : 'bg-[#242423]'}`}>
                <p className={`font-mono text-[11px] font-bold ${phase.status === '진행' ? 'text-[#67b7ff]' : 'text-[#686868]'}`}>{phase.id}</p>
                <p className="mt-3 text-[13px] font-bold text-[#bbb9af]">{phase.stage}</p>
                <h3 className="mt-2 break-keep text-[17px] font-bold leading-6">{phase.title}</h3>
                <span className={`absolute bottom-5 left-5 rounded-[6px] border px-2 py-1 text-[10px] font-bold ${phase.status === '진행' ? 'border-[#2997FF]/35 text-[#67b7ff]' : 'border-[#3c3c3c] text-[#86868B]'}`}>{phase.status}</span>
              </div>
              <div className="border-x border-[#3c3c3c] p-5">
                <p className="text-[11px] font-bold text-[#686868]">이 단계에서 답할 질문</p>
                <p className="mt-2 text-[15px] font-bold leading-6 text-[#E5E5E5]">{stageQuestions[phase.id]}</p>
                <p className="mt-4 text-[13px] leading-6 text-[#bbb9af]">{phase.objective}</p>
                <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-[10px] border border-[#3c3c3c]">
                  {phase.tasks.map((task, taskIndex) => (
                    <div key={task} className={`min-h-[104px] bg-[#2c2c2b] p-3 ${taskIndex < phase.tasks.length - 1 ? 'border-r border-[#3c3c3c]' : ''}`}>
                      <p className="font-mono text-[10px] font-bold text-[#686868]">TASK {taskIndex + 1}</p>
                      <p className="mt-2 text-[12px] leading-5 text-[#bbb9af]">{task}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between p-5">
                <div>
                  <p className="text-[11px] font-bold text-[#686868]">실행 책임</p>
                  <p className="mt-2 text-[13px] font-bold leading-5 text-[#bdbba7]">{phase.owner}</p>
                  <p className="mt-6 text-[11px] font-bold text-[#686868]">단계전환 기준</p>
                  <p className="mt-2 text-[14px] font-bold leading-6 text-[#E5E5E5]">{phase.gate}</p>
                </div>
                {index < sharedPhases.length - 1 && <div className="mt-6 flex items-center gap-2 border-t border-[#3c3c3c] pt-4 text-[11px] font-bold text-[#86868B]">다음 단계로 연결 <ArrowDown size={14} /></div>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-[44px]" data-role-map>
        <SectionHeading title="조직별 역할 연결" description="조직별 고유 역량과 단계별 참여방식을 함께 보아 업무의 주도·공동·지원 경계를 이해합니다." />
        <div className="grid grid-cols-4 overflow-hidden rounded-t-[16px] border border-[#3c3c3c] bg-[#272726]">
          {roleColumnOrder.map((organization, index) => {
            const role = organizationRoles.find((item) => item.organization === organization);
            return (
              <article key={organization} className={`p-5 ${index < roleColumnOrder.length - 1 ? 'border-r border-[#3c3c3c]' : ''}`}>
                <div className="mb-4 flex items-center gap-2"><Users size={14} className="text-[#86868B]" /><h3 className="text-[15px] font-bold">{role.organization}</h3></div>
                <p className="min-h-[44px] border-l-2 border-[#2997FF] pl-3 text-[12px] font-bold leading-5 text-[#67b7ff]">{role.sharedContribution}</p>
                <ul className="mt-4 space-y-2.5">
                  {role.responsibilities.map((responsibility) => <li key={responsibility} className="flex gap-2 text-[12px] leading-5 text-[#bbb9af]"><Check size={13} className="mt-1 shrink-0 text-[#686868]" />{responsibility}</li>)}
                </ul>
              </article>
            );
          })}
        </div>
        <div className="overflow-hidden rounded-b-[16px] border-x border-b border-[#3c3c3c] bg-[#272726]">
          <div className="grid grid-cols-[210px_repeat(4,1fr)] border-b border-[#3c3c3c] bg-[#242423] text-[11px] font-bold text-[#86868B]">
            <div className="p-3">실행 단계</div>{roleColumnOrder.map((role) => <div key={role} className="border-l border-[#3c3c3c] p-3 text-center">{role.replace(' 담당조직', '')}</div>)}
          </div>
          {roleStageMatrix.map(([stage, ...roles], rowIndex) => (
            <div key={stage} className={`grid grid-cols-[210px_repeat(4,1fr)] ${rowIndex < roleStageMatrix.length - 1 ? 'border-b border-[#3c3c3c]' : ''}`}>
              <div className="px-3 py-2.5 text-[12px] font-bold text-[#bbb9af]">{stage}</div>
              {roles.map((role, roleIndex) => <div key={`${stage}-${roleIndex}`} className="flex items-center justify-center border-l border-[#3c3c3c] px-3 py-2"><span className={`min-w-[52px] rounded-[6px] border px-2 py-1 text-center text-[10px] font-bold ${roleTone[role]}`}>{role}</span></div>)}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-[44px]">
        <SectionHeading title="기획추진 전담 지원축" description="공동 실행과 병렬로 움직이며, 장소·운영 실증에 필요한 BID·서울시·대외조건을 정합화합니다." />
        <div className="grid grid-cols-[230px_1fr_300px] overflow-hidden rounded-[16px] border border-[#3c3c3c] bg-[#272726]">
          <div className="bg-[#2c3440] p-5">
            <p className="font-mono text-[11px] font-bold text-[#86868B]">{planningTrack.id} · {planningTrack.stage}</p>
            <h3 className="mt-3 text-[19px] font-bold leading-7">{planningTrack.title}</h3>
            <p className="mt-4 text-[12px] font-bold text-[#bdbba7]">{planningTrack.owner}</p>
          </div>
          <div className="border-x border-[#3c3c3c] p-5">
            <p className="text-[14px] leading-6 text-[#bbb9af]">{planningTrack.objective}</p>
            <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-[10px] border border-[#3c3c3c]">
              {planningTrack.tasks.map((task, index) => <div key={task} className={`bg-[#272726] p-3 text-[12px] leading-5 text-[#bbb9af] ${index < planningTrack.tasks.length - 1 ? 'border-r border-[#3c3c3c]' : ''}`}>{task}</div>)}
            </div>
          </div>
          <div className="p-5">
            <p className="text-[11px] font-bold text-[#686868]">공동 실행 안에서의 역할</p>
            <p className="mt-3 text-[14px] font-bold leading-6">TF가 설계한 장소·운영 실증의 실행조건을 정합화하며, TF의 공동 실행순서를 대신하지 않습니다.</p>
            <div className="mt-5 border-t border-[#3c3c3c] pt-4">
              <p className="text-[11px] font-bold text-[#686868]">완료기준</p>
              <p className="mt-2 text-[12px] leading-5 text-[#bdbba7]">{planningTrack.gate}</p>
            </div>
          </div>
        </div>
      </section>

      <section data-gate-map>
        <SectionHeading title="단계전환 및 의사결정 기준" description="현재 확정할 수 있는 판단과 근거가 쌓인 뒤 결정할 항목을 분리합니다." />
        <div className="grid grid-cols-[1fr_0.82fr] gap-3">
          <div className="overflow-hidden rounded-[16px] border border-[#3c3c3c] bg-[#272726]">
            <div className="grid grid-cols-[180px_150px_1fr] border-b border-[#3c3c3c] bg-[#242423] text-[11px] font-bold text-[#86868B]"><div className="p-3">의사결정 항목</div><div className="border-l border-[#3c3c3c] p-3">판단 가능 단계</div><div className="border-l border-[#3c3c3c] p-3">판단 근거</div></div>
            {decisionBoundaries.map((boundary, index) => (
              <div key={boundary.item} className={`grid grid-cols-[180px_150px_1fr] text-[12px] ${index < decisionBoundaries.length - 1 ? 'border-b border-[#3c3c3c]' : ''}`}>
                <div className="p-3 font-bold leading-5 text-[#E5E5E5]">{boundary.item}</div>
                <div className="border-l border-[#3c3c3c] p-3 font-bold leading-5 text-[#bdbba7]">{boundary.availableStage}</div>
                <div className="border-l border-[#3c3c3c] p-3 leading-5 text-[#86868B]">{boundary.reason}</div>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-[16px] border border-[#2997FF]/30 bg-[#263b52]">
            <div className="border-b border-[#2997FF]/25 p-4">
              <p className="text-[11px] font-bold text-[#67b7ff]">현재 GATE</p>
              <h3 className="mt-2 text-[17px] font-bold">0단계 종료 판단</h3>
              <p className="mt-2 text-[12px] leading-5 text-[#a9c8e5]">아래 네 조건을 모두 확인한 뒤 1단계 현장기회 정의로 이동합니다.</p>
            </div>
            <div className="p-4">
              {stageZeroExitCriteria.map((criterion, index) => (
                <div key={criterion} className={`flex gap-3 py-3 ${index < stageZeroExitCriteria.length - 1 ? 'border-b border-[#45617b]' : ''}`}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#67b7ff]/40 text-[10px] font-bold text-[#67b7ff]">{index + 1}</span>
                  <p className="text-[12px] leading-5 text-[#d2dfeb]">{criterion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
