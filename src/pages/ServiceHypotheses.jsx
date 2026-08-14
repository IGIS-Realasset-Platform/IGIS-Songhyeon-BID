import { ArrowRight, CheckCircle2, CircleDashed, FileSearch2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WorkspacePageFrame, WorkspacePageHeader } from '../components/workspace/WorkspacePageLayout';
import {
  hypothesisDecisionBoundaries,
  hypothesisInputs,
  hypothesisPipeline,
  hypothesisRegistrationCriteria,
  participationTracks,
  serviceHypotheses,
} from '../data/songhyeonServiceHypotheses';

const metricCards = [
  { label: '현재 단계', value: '0단계', detail: '근거기반 구축', accent: true },
  { label: '가설 입력근거', value: String(hypothesisInputs.length), detail: '수집·정리 중' },
  { label: '승인 가설', value: String(serviceHypotheses.length), detail: '2단계 Gate 이후 등록' },
  { label: '실증 후보', value: '0', detail: '실행성 검증 전' },
];

const SectionTitle = ({ title, description, action }) => (
  <div className="mb-[12px] flex items-end justify-between">
    <div className="flex items-baseline gap-[16px]">
      <h2 className="text-[20px] font-bold leading-none text-[#E5E5E5]">{title}</h2>
      {description && <p className="text-[14px] leading-none text-[#86868B]">{description}</p>}
    </div>
    {action}
  </div>
);

export default function ServiceHypotheses() {
  return (
    <WorkspacePageFrame>
      <WorkspacePageHeader
        title="서비스·운영 가설"
        description="장소 문제와 참여수요를 실행 가능한 가설로 전환하고 검증합니다."
      />

      <section className="grid grid-cols-4 overflow-hidden rounded-[24px] border border-[#3c3c3c] bg-[#272726]">
        {metricCards.map((metric, index) => (
          <article key={metric.label} className={`${index < metricCards.length - 1 ? 'border-r border-[#3c3c3c]' : ''} ${metric.accent ? 'bg-[#202a36]' : 'bg-[#272726]'} px-[20px] py-[18px]`}>
            <p className={`text-[11px] font-bold ${metric.accent ? 'text-[#8fc7ff]' : 'text-[#86868B]'}`}>{metric.label}</p>
            <p className="mt-[8px] text-[26px] font-bold leading-none text-[#E5E5E5]">{metric.value}</p>
            <p className={`mt-[8px] text-[12px] font-semibold ${metric.accent ? 'text-[#b8d8f7]' : 'text-[#86868B]'}`}>{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-[36px] mb-[36px]">
        <SectionTitle title="가설 전환 흐름" description="근거 → 기회 → 가설 → 실행성 → 실증" />
        <div className="grid grid-cols-5 overflow-hidden rounded-[24px] border border-[#3c3c3c] bg-[#272726]">
          {hypothesisPipeline.map((stage, index) => (
            <article key={stage.id} className={`${index < hypothesisPipeline.length - 1 ? 'border-r border-[#3c3c3c]' : ''} ${stage.status === '현재' ? 'bg-[#202a36]' : 'bg-[#272726]'} flex min-h-[238px] flex-col p-[18px] transition-colors hover:bg-[#30302F]`}>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#2997FF]">{stage.step}</span>
                <span className={`${stage.status === '현재' ? 'border-[#3b4f68] bg-[#3b4f68] text-[#E5E5E5]' : 'border-[#3c3c3c] bg-[#1F1F1E] text-[#86868B]'} rounded-[7px] border px-[8px] py-[4px] text-[10px] font-bold`}>
                  {stage.status}
                </span>
              </div>
              <h3 className="mt-[14px] text-[16px] font-bold text-[#E5E5E5]">{stage.title}</h3>
              <p className="mt-[9px] text-[13px] leading-[21px] text-[#bbb9af]">{stage.description}</p>
              <div className="mt-auto border-t border-[#3c3c3c] pt-[13px]">
                <p className="text-[10px] font-bold text-[#686868]">단계 완료기준</p>
                <p className="mt-[6px] text-[12px] font-semibold leading-[19px] text-[#A1A1A6]">{stage.gate}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-[36px]">
        <SectionTitle
          title="가설 입력근거"
          description="현재 마일스톤 Task에서 생성 중인 입력자료"
          action={(
            <Link to="/milestones" className="flex cursor-pointer items-center gap-[6px] text-[12px] font-bold text-[#2997FF] transition-colors hover:text-[#72b8ff]">
              마일스톤 열기 <ArrowRight size={14} />
            </Link>
          )}
        />
        <div className="grid grid-cols-[1fr_360px] overflow-hidden rounded-[24px] border border-[#3c3c3c] bg-[#272726]">
          <div className="border-r border-[#3c3c3c]">
            {hypothesisInputs.map((input, index) => (
              <Link
                key={input.id}
                to="/milestones"
                data-task-key={input.sourceKey}
                className={`${index < hypothesisInputs.length - 1 ? 'border-b border-[#3c3c3c]' : ''} grid cursor-pointer grid-cols-[112px_1fr_144px] bg-[#272726] transition-colors hover:bg-[#30302F]`}
              >
                <div className="border-r border-[#3c3c3c] px-[16px] py-[17px]">
                  <p className="text-[11px] font-bold text-[#2997FF]">{input.id}</p>
                  <p className="mt-[7px] text-[11px] font-semibold text-[#686868]">{input.sourceKey}</p>
                </div>
                <div className="border-r border-[#3c3c3c] px-[18px] py-[17px]">
                  <h3 className="text-[14px] font-bold text-[#E5E5E5]">{input.title}</h3>
                  <p className="mt-[6px] text-[12px] leading-[19px] text-[#bbb9af]">{input.evidence}</p>
                  <p className="mt-[8px] text-[12px] font-semibold leading-[19px] text-[#2997FF]">다음 확인 · {input.nextAction}</p>
                </div>
                <div className="px-[15px] py-[17px]">
                  <p className="text-[10px] font-bold text-[#686868]">업무 상태</p>
                  <p className="mt-[5px] text-[12px] font-semibold text-[#E5E5E5]">{input.status}</p>
                  <p className="mt-[11px] text-[10px] font-bold text-[#686868]">사실 상태</p>
                  <p className="mt-[5px] text-[12px] font-semibold text-[#FF9F0A]">{input.factStatus}</p>
                </div>
              </Link>
            ))}
          </div>

          <aside className="bg-[#232322] p-[20px]">
            <h3 className="text-[16px] font-bold text-[#E5E5E5]">가설 등록 기준</h3>
            <p className="mt-[7px] text-[12px] leading-[19px] text-[#86868B]">필수 기준을 모두 충족한 항목만 레지스터로 전환합니다.</p>
            <ul className="mt-[15px] overflow-hidden rounded-[14px] border border-[#3c3c3c]">
              {hypothesisRegistrationCriteria.map((criterion, index) => (
                <li key={criterion.id} className={`${index < hypothesisRegistrationCriteria.length - 1 ? 'border-b border-[#3c3c3c]' : ''} flex gap-[10px] bg-[#272726] px-[12px] py-[10px]`}>
                  <CheckCircle2 size={14} className="mt-[2px] shrink-0 text-[#2997FF]" />
                  <div>
                    <p className="text-[12px] font-bold text-[#E5E5E5]">{criterion.label}</p>
                    <p className="mt-[3px] text-[11px] leading-[17px] text-[#86868B]">{criterion.requirement}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="mb-[36px]">
        <SectionTitle
          title="가설 레지스터"
          description="Stage 2 Gate를 통과한 서비스·운영 가설을 관리합니다."
          action={<span className="rounded-[7px] border border-[#3c3c3c] bg-[#272726] px-[10px] py-[5px] text-[11px] font-bold text-[#86868B]">승인 {serviceHypotheses.length}</span>}
        />
        {serviceHypotheses.length === 0 ? (
          <div className="grid min-h-[190px] place-items-center rounded-[24px] border border-[#3c3c3c] bg-[#272726] text-center">
            <div className="max-w-[620px] p-[28px]">
              <CircleDashed size={26} className="mx-auto text-[#686868]" />
              <h3 className="mt-[13px] text-[17px] font-bold text-[#E5E5E5]">승인된 가설이 없습니다</h3>
              <p className="mt-[9px] text-[13px] leading-[21px] text-[#86868B]">
                현재는 자산·공간·이용자·참여관계의 근거를 구축하는 단계입니다. 현장기회가 직접 근거와 연결되고 등록 기준을 충족하면 가설 카드를 생성합니다.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[24px] border border-[#3c3c3c] bg-[#272726]">
            {serviceHypotheses.map((hypothesis, index) => (
              <article key={hypothesis.id} data-task-key={hypothesis.sourceKey} className={`${index < serviceHypotheses.length - 1 ? 'border-b border-[#3c3c3c]' : ''} p-[18px] transition-colors hover:bg-[#30302F]`}>
                <h3 className="text-[14px] font-bold text-[#E5E5E5]">{hypothesis.title}</h3>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mb-[36px]">
        <SectionTitle title="참여모델 검증" description="참여주체를 확정하지 않고 현재 사실상태와 다음 확인사항을 관리합니다." />
        <div className="grid grid-cols-4 gap-[12px]">
          {participationTracks.map((track) => (
            <article key={track.id} className="flex min-h-[250px] flex-col rounded-[18px] border border-[#3c3c3c] bg-[#272726] p-[18px] transition-colors hover:bg-[#30302F]">
              <h3 className="text-[15px] font-bold text-[#E5E5E5]">{track.participant}</h3>
              <p className="mt-[8px] text-[13px] leading-[21px] text-[#bbb9af]">{track.possibleRole}</p>
              <div className="mt-[16px] border-t border-[#3c3c3c] pt-[13px]">
                <p className="text-[10px] font-bold text-[#686868]">사실 상태</p>
                <p className="mt-[5px] text-[12px] font-semibold text-[#FF9F0A]">{track.factStatus}</p>
              </div>
              <div className="mt-auto border-t border-[#3c3c3c] pt-[13px]">
                <p className="text-[10px] font-bold text-[#686868]">다음 확인</p>
                <p className="mt-[5px] text-[12px] font-semibold leading-[19px] text-[#2997FF]">{track.nextCheck}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[24px] border border-[#3c3c3c] bg-[#272726]">
        <div className="grid grid-cols-[250px_1fr]">
          <div className="border-r border-[#3c3c3c] bg-[#1B1B1A] p-[20px]">
            <FileSearch2 size={20} className="text-[#2997FF]" />
            <h2 className="mt-[13px] text-[17px] font-bold text-[#E5E5E5]">현재 결정하지 않는 것</h2>
            <p className="mt-[8px] text-[12px] leading-[19px] text-[#86868B]">실행 객체와 근거가 준비되는 단계에 맞춰 순차적으로 결정합니다.</p>
          </div>
          <div className="grid grid-cols-5">
            {hypothesisDecisionBoundaries.map((boundary, index) => (
              <article key={boundary.item} className={`${index < hypothesisDecisionBoundaries.length - 1 ? 'border-r border-[#3c3c3c]' : ''} p-[15px] transition-colors hover:bg-[#30302F]`}>
                <h3 className="text-[12px] font-bold leading-[19px] text-[#E5E5E5]">{boundary.item}</h3>
                <p className="mt-[9px] text-[11px] font-bold text-[#2997FF]">{boundary.stage}</p>
                <p className="mt-[8px] text-[11px] leading-[18px] text-[#86868B]">{boundary.reason}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </WorkspacePageFrame>
  );
}
