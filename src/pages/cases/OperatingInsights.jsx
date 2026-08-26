import { ArrowRight } from 'lucide-react';
import CaseReportFrame from '../../components/cases/CaseReportFrame';
import {
  BREAKDOWN_PATTERNS,
  DECISION_CHECKPOINTS,
  FIELD_TEST_CHECKS,
  FUNDING_LAYERS,
  OPERATING_MECHANISMS,
  PERFORMANCE_STAGES,
  REPEATED_PROBLEMS,
  RESULT_DISTRIBUTION,
  ROLE_SPLIT,
  SUCCESS_CONDITIONS,
  WEAKENING_OPERATION_FLOW,
  WORKING_OPERATION_FLOW,
} from '../../data/operatingInsightsReport';

function SectionHeading({ eyebrow, title, description }) {
  return (
    <header>
      <p className="text-[14px] font-bold text-[#8FC7FF]">{eyebrow}</p>
      <h2 className="mt-3 whitespace-nowrap text-[30px] font-semibold leading-[1.35] text-white">{title}</h2>
      {description && <p className="mt-3 whitespace-nowrap text-[16px] leading-[1.75] text-[#B7B7BC]">{description}</p>}
    </header>
  );
}

function InsightRows({ items, tone = 'blue' }) {
  const accent = tone === 'red' ? 'text-[#E2988D]' : 'text-[#8FC7FF]';
  return (
    <div className="mt-7 space-y-3">
      {items.map((item) => (
        <article key={item.number} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 rounded-[14px] bg-black/15 px-5 py-5">
          <span className={`pt-1 text-[13px] font-bold ${accent}`}>{item.number}</span>
          <div className="min-w-0">
            <h3 className="whitespace-nowrap text-[19px] font-semibold leading-[1.5] text-white">{item.title}</h3>
            <p className="mt-2 whitespace-nowrap text-[15px] leading-[1.75] text-[#B7B7BC]">{item.description}</p>
            <p className={`mt-2 whitespace-nowrap text-[14px] font-semibold leading-[1.65] ${accent}`}>{item.evidence}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function Flow({ title, items, danger = false }) {
  return (
    <article className={`rounded-[16px] border px-5 py-5 ${danger ? 'border-[#704847] bg-[#302424]' : 'border-[#49789E]/70 bg-[#202A36]'}`}>
      <h3 className={`text-[16px] font-semibold ${danger ? 'text-[#E5A09A]' : 'text-[#8FC7FF]'}`}>{title}</h3>
      <div className="mt-4 flex flex-nowrap items-center gap-x-3 whitespace-nowrap">
        {items.map((item, index) => (
          <span key={item} className="inline-flex items-center gap-3 text-[15px] text-[#D0D0D4]">
            {item}{index < items.length - 1 && <ArrowRight size={14} className="text-[#67676C]" aria-hidden="true" />}
          </span>
        ))}
      </div>
    </article>
  );
}

function CompactRows({ items, numbered = false }) {
  return (
    <div className="space-y-3">
      {items.map(([label, detail], index) => (
        <div key={label} className="rounded-[14px] bg-black/15 px-5 py-4">
          <div className="flex items-start gap-3">
            {numbered && <span className="pt-0.5 text-[13px] font-bold text-[#8FC7FF]">{String(index + 1).padStart(2, '0')}</span>}
            <div>
              <strong className="text-[16px] font-semibold text-white">{label}</strong>
              <p className="mt-1.5 text-[14px] leading-[1.7] text-[#B7B7BC]">{detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OperatingInsights() {
  return (
    <CaseReportFrame current="insights">
      <main data-operating-insights-page className="mx-auto w-[1020px] max-w-full pb-8 pt-10">
        <header className="pb-10">
          <p className="text-[14px] font-bold text-[#8FC7FF]">SUMMARY &amp; INSIGHT</p>
          <h1 className="mt-5 whitespace-nowrap text-[40px] font-semibold leading-[1.2] text-white">75개 사례에서 도출한 민관협력 공통 인사이트</h1>
          <p className="mt-5 max-w-[930px] text-[17px] leading-[1.8] text-[#B7B7BC]">국내외 에리어매니지먼트·BID·플레이스메이킹·공공공간 운영 사례 75개를 149개 공개자료로 확인했다. 유명한 조직이나 시설의 외형이 아니라, 어떤 문제를 풀었고 누가 운영했으며 이용자와 비용부담자가 어떤 결과를 확인했는지를 비교했다.</p>
        </header>

        <section className="mb-5 rounded-[18px] bg-[#252524] px-7 py-8">
          <SectionHeading eyebrow="01 조사에서 확인한 문제" title="도심의 공간은 나뉘어 관리되지만, 이용자는 하나의 장소로 경험한다." description="민관협력은 시설을 하나 더 만드는 방식보다 여러 소유자와 기관 사이에 남은 운영 공백을 해결하기 위해 형성됐다. 사례에서 반복된 문제는 다음 일곱 가지다." />
          <div className="mt-7 space-y-3">
            {REPEATED_PROBLEMS.map((problem, index) => (
              <div key={problem} className="flex gap-3 rounded-[14px] bg-black/15 px-5 py-4">
                <span className="text-[13px] font-bold text-[#8FC7FF]">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-[15px] leading-[1.65] text-[#D0D0D4]">{problem}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-[14px] border border-[#49789E]/60 bg-[#202A36] px-5 py-4 text-[16px] font-semibold leading-[1.75] text-[#C9DDED]">건물·상점·도로·광장·문화시설의 관리자는 달라도 보행, 청결, 안전, 안내, 상점, 프로그램과 야간 분위기는 하나의 경험으로 이어진다. 핵심 문제는 이 전체 경험을 끝까지 책임지는 주체가 없다는 점이다.</p>
        </section>

        <section className="mb-5 rounded-[18px] bg-[#252524] px-7 py-8">
          <SectionHeading eyebrow="02 공개자료가 보여준 한계" title="사업 시행보다 운영 이후의 결과가 훨씬 적게 공개됐다." description="75개 사례에 같은 기준을 적용했다. 판정은 사업 규모나 유명세가 아니라 만족·반복이용·참여자 잔존·민원·재승인 같은 체감성과가 공개자료로 확인되는지를 기준으로 했다." />
          <div className="mt-7 grid grid-cols-4 gap-3 max-lg:grid-cols-2">
            {RESULT_DISTRIBUTION.map(([label, count, color]) => (
              <article key={label} className="rounded-[14px] bg-black/15 px-5 py-5">
                <p className="text-[14px] font-semibold" style={{ color }}>{label}</p>
                <strong className="mt-2 block text-[30px] font-semibold text-white">{count}</strong>
              </article>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            <p className="rounded-[14px] bg-black/15 px-5 py-4 text-[15px] leading-[1.7] text-[#B7B7BC]"><strong className="text-white">53개는 실패 사례가 아니다.</strong> 조직·시설·투입은 공개됐지만, 운영 이후 이용자 만족·반복이용·참여자 잔존·민원·재승인을 판정할 자료가 부족했다.</p>
            <p className="rounded-[14px] bg-black/15 px-5 py-4 text-[15px] leading-[1.7] text-[#B7B7BC]"><strong className="text-white">유명세와 투자 규모도 성과를 보장하지 않았다.</strong> 문제와 운영주체 사이의 거리가 짧고 현장 책임이 명확할수록 체감성과가 분명했다.</p>
          </div>
        </section>

        <section className="mb-5 rounded-[18px] bg-[#252524] px-7 py-8">
          <SectionHeading eyebrow="03 성과가 확인된 운영방식" title="성과가 축적된 사례는 여섯 가지 운영조건을 갖췄다." description="문제와 이용자를 구체적으로 정하고, 권한·책임·재원·실증·일상서비스·피드백을 하나의 운영체계로 연결했다." />
          <InsightRows items={OPERATING_MECHANISMS} />
        </section>

        <section className="mb-5 rounded-[18px] bg-[#252524] px-7 py-8">
          <SectionHeading eyebrow="04 시간이 지나며 약화된 원인" title="방문객이 늘어도 운영주체와 참여자가 남지 않으면 지속되지 않는다." description="초기 화제성과 시설 완성도를 장기성과로 오인하거나, 수익과 본래 목적이 충돌하고 책임이 분산된 사례에서 같은 문제가 반복됐다." />
          <InsightRows items={BREAKDOWN_PATTERNS} tone="red" />
        </section>

        <section className="mb-5 rounded-[18px] bg-[#252524] px-7 py-8">
          <SectionHeading eyebrow="05 송현에서 먼저 정할 것" title="조직도를 만들기 전에 누구에게 어떤 변화가 필요한지 정한다." description="같은 방문객 증가도 시민·주민·상인·자산소유자·공공기관에게는 다른 결과일 수 있다. 성공조건은 이해관계자별로 구분해 확인한다." />
          <div className="mt-7"><CompactRows items={SUCCESS_CONDITIONS} /></div>

          <h3 className="mt-8 text-[21px] font-semibold text-white">실증은 행사 동원력이 아니라 일상 운영의 지속성을 확인한다.</h3>
          <div className="mt-4 space-y-3">
            {FIELD_TEST_CHECKS.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-[14px] bg-black/15 px-5 py-4">
                <span className="text-[13px] font-bold text-[#8FC7FF]">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-[15px] leading-[1.65] text-[#D0D0D4]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5 rounded-[18px] bg-[#252524] px-7 py-8">
          <SectionHeading eyebrow="06 역할과 재원" title="결정·실행·감독을 구분하고, 비용의 목적과 부담주체를 명확히 한다." description="큰 협의체보다 누가 결정하고, 누가 매일 운영하며, 누가 감독하는지를 먼저 정한다. 재원도 공공의 기본책임과 수혜자 부담, 현장 운영수익으로 구분한다." />
          <div className="mt-7"><CompactRows items={ROLE_SPLIT} numbered /></div>
          <h3 className="mt-8 text-[21px] font-semibold text-white">재원은 세 층으로 분리한다.</h3>
          <div className="mt-4 space-y-3">
            {FUNDING_LAYERS.map(([label, detail], index) => (
              <article key={label} className="grid grid-cols-[42px_170px_minmax(0,1fr)] items-center gap-3 rounded-[14px] border border-white/8 bg-black/15 px-5 py-4">
                <p className="text-[13px] font-bold text-[#8FC7FF]">0{index + 1}</p>
                <h3 className="text-[17px] font-semibold text-white">{label}</h3>
                <p className="whitespace-nowrap text-[14px] leading-[1.7] text-[#B7B7BC]">{detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 rounded-[14px] border border-[#49789E]/60 bg-[#202A36] px-5 py-4 text-[15px] leading-[1.7] text-[#C9DDED]">운영수익은 운영조직의 매출 확대보다 장소의 관리와 서비스 개선에 우선 환류한다. 상업활동의 범위, 무료 프로그램, 비소비 이용공간과 파트너 선정 기준도 사전에 정한다.</p>
        </section>

        <section className="mb-5 rounded-[18px] bg-[#252524] px-7 py-8">
          <SectionHeading eyebrow="07 성과 확인과 단계전환" title="방문객 수만 보지 않고 네 단계의 결과를 순서대로 확인한다." description="개장 직후의 반응, 실제 이용경험, 운영을 떠받치는 참여자의 지속성, 제도화 가능성을 구분해야 다음 단계의 확대·수정·중단을 판단할 수 있다." />
          <div className="mt-7 space-y-3">
            {PERFORMANCE_STAGES.map(([stage, indicator, question]) => (
              <article key={stage} className="grid grid-cols-[160px_minmax(0,1fr)_280px] gap-5 rounded-[14px] bg-black/15 px-5 py-4 max-lg:grid-cols-1 max-lg:gap-2">
                <strong className="text-[16px] text-[#8FC7FF]">{stage}</strong>
                <p className="text-[14px] leading-[1.7] text-[#B7B7BC]">{indicator}</p>
                <p className="text-[15px] font-semibold leading-[1.7] text-white">{question}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[18px] bg-[#252524] px-7 py-8">
          <SectionHeading eyebrow="08 종합 결론" title="송현이 가져올 것은 특정 BID의 외형이 아니라 검증 가능한 운영방식이다." description="실제 문제를 해결하고 그 결과를 이용자와 파트너가 확인한 뒤, 다음 단계의 권한·재원·참여를 다시 결정하는 구조가 핵심이다." />
          <div className="mt-7 space-y-3">
            <Flow title="성과가 축적되는 흐름" items={WORKING_OPERATION_FLOW} />
            <Flow title="시간이 지나며 약화되는 흐름" items={WEAKENING_OPERATION_FLOW} danger />
          </div>
          <h3 className="mt-8 text-[21px] font-semibold text-white">송현 의사결정 체크포인트</h3>
          <div className="mt-4 space-y-3">
            {DECISION_CHECKPOINTS.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-[14px] border border-white/8 bg-black/15 px-5 py-4">
                <span className="text-[13px] font-bold text-[#8FC7FF]">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-[15px] leading-[1.65] text-[#D0D0D4]">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </CaseReportFrame>
  );
}
