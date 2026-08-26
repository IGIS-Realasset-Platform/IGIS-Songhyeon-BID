import { thoughtsRaw } from '../../data/cityPartnershipNotionContent';
import CaseReportFrame from '../../components/cases/CaseReportFrame';
import { sectionNarratives } from '../../data/cityPartnershipNarrative';
import { sectionImages } from '../../data/cityPartnershipReportImages';
import {
  countryComparisonRows,
  evidenceNote,
  scaleCaution,
  scaleComparison,
  seoulCaseRows,
  timelineLanes,
} from '../../data/cityPartnershipComparison';

const SOURCE_URL = 'https://fir-echinacea-3ca.notion.site/2016-2022-3c28ced43c4780488417ce1894cbb559?source=copy_link';

const chapters = [
  {
    number: '01',
    title: '지역매니지먼트 시스템의 개념과 구조',
    description: '지역매니지먼트 시스템은 일정 구역의 공공공간과 민간자산을 개별적으로 관리하는 방식에서 벗어나, 지역의 이해관계자가 공동의 목표·재원·실행조직을 구성해 장소를 지속적으로 관리하는 체계이다. 서울에서는 도시성숙기 진입과 상권 변화, 장소 간 경쟁 심화가 제도 도입의 배경이 됐다.',
    sections: ['연구 배경', '개요 및 서울시의 이유', '지역관리시스템의 개념과 여러가지 정의', '민간(이지스)의 목적 : 자산가치 상승', '시스템의 구조'],
  },
  {
    number: '02',
    title: '미국·영국·일본의 지역매니지먼트 시스템',
    description: '미국·영국·일본은 중심시가지 쇠퇴라는 공통 문제에 대응했지만 제도의 형성 경로는 달랐다. 미국은 부동산소유주 부담금에 기반한 BID, 영국은 자발적 TCM에서 법정 부담금 방식으로 발전한 BID, 일본은 상가회와 마을만들기 조직에서 발전한 TMO·에리어매니지먼트를 운용했다. 국가별 차이는 운영주체, 재원, 구역설정, 공공의 권한 부여 방식에서 확인된다.',
    sections: ['미국/영국/일본', '미국의 BID', '영국의 TCM & BID', '일본의 TMO & AM', '미국 영국 일본 지역관리시스템의 차이', '성공의 조건'],
  },
  {
    number: '03',
    title: '한국의 지역매니지먼트 시스템: 서울형 타운매니지먼트',
    description: '서울시는 2016년 추진계획을 수립한 뒤 다동·무교동을 시작으로 명동, 서초 음악문화지구, 여의도 금융지구, 구로 G밸리에서 사업을 추진했다. 민간 주도의 지역관리체계를 목표로 했으나 실제 구조는 서울시가 사업비를 지원하고 자치구가 용역을 발주하며 전문조직이 실행하는 공공사업 방식에 가까웠다.',
    sections: ['서울시는 대상지 다각화가 필요하다', '서울시의 행보', '서울형 타운매니지먼트 특징', '서울시 평가 기준과 예산 계획', '연도별 운영계획과 예산안', '서울형 타운매니지먼트 사업 운영 실태'],
  },
  {
    number: '04',
    title: '서울형 타운매니지먼트의 문제점과 개선방향',
    description: '서울형 사업은 지역관리의 필요성을 공론화하고 다섯 지역에서 실행 경험을 축적했다. 반면 지역주체의 자발적 참여, 상설 운영조직, 반복재원, 공공공간 사용권한이 충분히 마련되지 않아 단년도 용역사업을 지속 가능한 지역관리체계로 전환하는 데 한계가 있었다. 개선방향은 지역주체 간 공감대 형성부터 목표·역할·이익의 합의, 실행조직과 모니터링 체계의 구축까지 단계적으로 검토해야 한다.',
    sections: ['페인포인트', '현황상 문제점', '공공공간 활용 관련 법제도', '실제 사업 이해관계자 설문을 통한 문제점 도출', '서울형 타운매니지먼트 사업의 개선방향'],
  },
];

const summaryFindings = [
  ['01', '참여와 제도 기반의 동시 설계', '민간의 참여의사와 공동편익을 확인하는 동시에, 공공의 운영협약·공간사용 권한·초기 지원을 함께 설계해야 한다.'],
  ['02', '결정·협의·실행의 역할 구분', '위원회가 방향을 결정하고, 권역별 협의체가 현안을 발굴하며, 상설 TMO가 데이터·민원·현장사업을 실행하는 구조를 검토한다.'],
  ['03', '작은 실행에서 단계적 제도화로', '초기 공동사업으로 관리의 효능감을 증명하고, 참여와 재원을 확대해 성과가 확인된 범위부터 제도화한다.'],
  ['04', '운영성과와 지속가능성의 검증', '방문객과 행사 수뿐 아니라 참여율·체감도·신뢰도·자체재원·조직 지속성을 함께 측정해 송현에 맞는 모델인지 검증한다.'],
];

const stages = [
  ['01', '공감대 형성', '지역의 문제, 대상구역, 참여주체, 공동편익을 정의한다.'],
  ['02', '협의와 공식화', '공동목표, 역할, 참여조건, 공간사용 원칙을 합의한다.'],
  ['03', '운영과 관리', '실행조직, 반복재원, 인허가 절차, 지역서비스를 작동시킨다.'],
  ['04', '성과검증과 제도화', '성과와 부작용을 검증하고 지속 가능한 범위부터 제도화한다.'],
];

function ReportImage({ item }) {
  return (
    <figure className="my-9 overflow-hidden rounded-[18px] bg-white p-3">
      <img src={item.src} alt={item.caption} loading="lazy" className="h-auto w-full rounded-[10px]" />
      <figcaption className="px-2 pb-1 pt-3 text-[13px] leading-[1.6] text-[#646970]">{item.caption}</figcaption>
    </figure>
  );
}

function SystemTimeline() {
  return (
    <section data-system-timeline className="relative left-1/2 mb-16 w-[1100px] max-w-[calc(100vw-360px)] -translate-x-1/2 max-md:left-0 max-md:w-full max-md:max-w-full max-md:translate-x-0">
      <h3 className="text-[29px] font-semibold text-white">4개국 지역매니지먼트 제도 시계열</h3>
      <p className="mt-5 text-[17px] leading-[1.8] text-[#B7B7BC]">제도 도입의 계기, 법제화, 운영확대 시점을 동일한 시간축이 아니라 국가별 발전경로로 비교했다.</p>
      <div className="mt-8 space-y-5">
        {timelineLanes.map((lane) => (
          <div key={lane.country} className="rounded-[18px] border border-white/10 bg-[#252524] p-5">
            <div className="mb-5 flex items-baseline gap-3"><strong className="text-[20px] text-white">{lane.country}</strong><span className="text-[13px] font-semibold" style={{ color: lane.color }}>{lane.system}</span></div>
            <div className="overflow-x-auto pb-2">
              <div className="flex min-w-max gap-3">
                {lane.events.map((event) => (
                  <article key={`${lane.country}-${event.year}-${event.title}`} className="w-[195px] border-l-2 bg-black/20 px-4 py-4" style={{ borderColor: lane.color }}>
                    <p className="text-[13px] font-bold" style={{ color: lane.color }}>{event.year}</p>
                    <h4 className="mt-2 text-[16px] font-semibold leading-[1.4] text-white">{event.title}</h4>
                    <p className="mt-2 text-[13px] leading-[1.65] text-[#9999A0]">{event.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] leading-[1.7] text-[#77777D]">{evidenceNote}</p>
    </section>
  );
}

function CountryComparisonTable() {
  const headers = ['국가·제도', '등장 배경', '주요 운영주체', '재원', '구역·동의', '공공 역할', '핵심 이슈'];
  return (
    <section data-country-comparison className="relative left-1/2 mb-16 w-[1200px] max-w-[calc(100vw-360px)] -translate-x-1/2 max-md:left-0 max-md:w-full max-md:max-w-full max-md:translate-x-0">
      <h3 className="text-[29px] font-semibold text-white">국가별 제도구조 비교</h3>
      <div className="mt-7 overflow-x-auto rounded-[18px] border border-white/10">
        <table className="w-full table-fixed border-collapse text-left max-md:w-[1100px]">
          <thead><tr className="bg-[#30302F]">{headers.map((header) => <th key={header} className="border-r border-white/10 px-4 py-4 text-[13px] font-semibold text-[#D6D6DA] last:border-r-0">{header}</th>)}</tr></thead>
          <tbody>{countryComparisonRows.map((row) => (
            <tr key={row.country} className="border-t border-white/10 bg-[#242423] align-top">
              {[`${row.country}\n${row.system}`, row.trigger, row.operator, row.funding, row.district, row.publicRole, row.issue].map((cell, index) => <td key={`${row.country}-${index}`} className={`${index === 0 ? 'whitespace-pre-line font-semibold text-white' : 'text-[#B4B4B9]'} border-r border-white/10 px-4 py-4 text-[13px] leading-[1.65] last:border-r-0`}>{cell}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
    </section>
  );
}

function ScaleComparison() {
  return (
    <section className="mb-16">
      <h3 className="text-[29px] font-semibold text-white">보고서 기준 운영규모</h3>
      <div className="mt-7 grid grid-cols-2 gap-4">
        {scaleComparison.map((row) => (
          <article key={row.country} className="rounded-[16px] border border-white/10 bg-[#252524] p-6">
            <div className="flex items-center justify-between"><strong className="text-[16px] text-white">{row.country}</strong><span className="text-[12px] text-[#7E7E84]">기준연도 {row.기준연도}</span></div>
            <p className="mt-5 text-[30px] font-semibold text-[#8FC7FF]">{row.value}</p>
            <p className="mt-2 text-[14px] text-[#B1B1B6]">{row.basis}</p><p className="mt-1 text-[12px] text-[#77777D]">{row.note}</p>
          </article>
        ))}
      </div>
      <p className="mt-4 rounded-[10px] bg-[#302B21] px-4 py-3 text-[13px] leading-[1.7] text-[#C6B78E]">{scaleCaution}</p>
    </section>
  );
}

function SeoulCaseMatrix() {
  return (
    <section className="mb-16">
      <h3 className="text-[29px] font-semibold text-white">서울형 타운매니지먼트 5개 사업지 비교</h3>
      <p className="mt-5 text-[17px] leading-[1.8] text-[#B7B7BC]">선정연도·사업면적·지역목표·참여주체·주요 실행내용을 동일한 항목으로 정리했다.</p>
      <div className="mt-7 overflow-x-auto rounded-[18px] border border-white/10">
        <table className="w-[1180px] border-collapse text-left">
          <thead><tr className="bg-[#30302F]">{['연도', '사업지', '면적', '지역목표', '주요 참여주체', '확인된 실행내용'].map((header) => <th key={header} className="border-r border-white/10 px-4 py-4 text-[13px] font-semibold text-[#D6D6DA] last:border-r-0">{header}</th>)}</tr></thead>
          <tbody>{seoulCaseRows.map((row) => (
            <tr key={row.district} className="border-t border-white/10 bg-[#242423] align-top">
              {[row.year, row.district, row.area, row.focus, row.actors, row.output].map((cell, index) => <td key={`${row.district}-${index}`} className={`${index === 1 ? 'font-semibold text-white' : 'text-[#B4B4B9]'} border-r border-white/10 px-4 py-4 text-[13px] leading-[1.65] last:border-r-0`}>{cell}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p className="mt-4 text-[12px] leading-[1.7] text-[#77777D]">{evidenceNote}</p>
    </section>
  );
}

function DetailSection({ title }) {
  const narrative = sectionNarratives[title];
  if (!narrative) return null;
  const images = sectionImages[title] || [];
  const placedImageIndexes = new Set(narrative.blocks.flatMap((block) => block.images || []));

  return (
    <section className="mb-20 last:mb-0">
      <h3 className="text-[29px] font-semibold leading-[1.35] text-white">{narrative.title}</h3>
      <p className="mt-5 text-[18px] leading-[1.85] text-[#D0D0D4]">{narrative.intro}</p>
      <div className="mt-7 overflow-hidden rounded-[18px] border border-white/10 bg-black/20">
        {narrative.blocks.map((block) => (
          <article key={block.label} className="border-b border-white/10 px-7 py-6 last:border-b-0">
            <div className="grid grid-cols-[160px_minmax(0,1fr)] gap-6">
              <h4 className="text-[15px] font-semibold leading-[1.75] text-[#8FC7FF]">{block.label}</h4>
              <p className="text-[17px] leading-[1.9] text-[#BEBEC3]">{block.text}</p>
            </div>
            {(block.images || []).map((index) => images[index] && <ReportImage key={images[index].src} item={images[index]} />)}
          </article>
        ))}
      </div>
      {images.filter((_, index) => !placedImageIndexes.has(index)).map((item) => <ReportImage key={item.src} item={item} />)}
    </section>
  );
}

function buildThoughtItems(rawText) {
  const items = [];
  let current = null;
  let breakBefore = false;

  rawText.split('\n').slice(1).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      breakBefore = true;
      return;
    }
    if (line.startsWith('- ')) {
      current = { text: line.slice(2).trim(), children: [], breakBefore };
      items.push(current);
      breakBefore = false;
      return;
    }
    if (line.startsWith('ㄴ ')) {
      current?.children.push({ kind: 'diagnosis', text: line.slice(2).trim() });
      return;
    }
    if (line.startsWith('→ ')) {
      current?.children.push({ kind: 'action', text: line.slice(2).trim() });
      return;
    }
    if (current) current.text = `${current.text} ${line}`;
  });
  return items;
}

const THOUGHT_HIGHLIGHTS = [
  { text: '최초 플레이스메이킹이 시도된 인사동', tone: 'red' },
  { text: '브랜드 리포지셔닝의 주기로써 기회', tone: 'blue' },
  { text: '복합단지 시행 초기 개발 계획 시에 지방정부 협력해서 법적 구도를 미리 구축', tone: 'red' },
  { text: '현 송현 BID와 SBD BID와의 큰 차이', tone: 'red' },
  { text: '현 시점에서 우리가 지방정부와 협력해야 할 과제', tone: 'blue' },
  { text: '처음부터 세금을 강제하는 BID 형태는 장기간 사회적 합의가 필요한', tone: 'red' },
  { text: '랜드마크성 대표장소인데 그게 사업지에 속해있지 않았다.', tone: 'red' },
  { text: '주변의 1류 랜드마크 공간(경복궁)과 어떤 차별성을 가져야 하나, 또는 끌어들여야 하나?', tone: 'red' },
  { text: '서울시의 제도와 규칙은 대응하되 실질적인 자생 생태계에 대한 예비가 되어있어야 할 것이다.', tone: 'blue' },
  { text: '공공주체는 거점시설 조성, 이벤트 개최 등 단순 시각 성과만 요구한다', tone: 'red' },
  { text: '그 요구조건에대 대응할 수 있어야.', tone: 'blue' },
  { text: '공공주체는 지속적 인사이동, 구체적 사업추진 방향 논의보다 타운매니지먼트가 뭔지 원론적 이야기만 한다', tone: 'red' },
  { text: '타운매니지먼트가 뭔지 단번 이해시킬수 있는 사전 정의를 구축해 놓아야.', tone: 'blue' },
  { text: '민간참여 높이는 트랜드를 그대로 끌어가야.', tone: 'blue' },
  { text: '지역특성에 따라 차별화된 목표가 필요하다', tone: 'blue' },
  { text: '송현동에 필요한 것을 제대로 정의해야.', tone: 'blue' },
  { text: '아직 시스템이 도는 단계는 아니다. 민간의 참여를 설득하고 회원을 확보하는 단계다', tone: 'red' },
  { text: '우리는 최초부터 확실한 민간참여 파트너십을 구축하여 빠르게 시스템 정착할 수 있게 해야.', tone: 'blue' },
  { text: '공공는 국장급 이상, 기업은 임원급 이상의 의사결정자의 큰틀의 합의가 이루어져야 협의체 형성이 빠를것', tone: 'red' },
  { text: '우리는 서울시 부시장 이상, 이지스 대표이사 이상, 파트너십 C라인 이상급과 협의를 끝마쳐야.', tone: 'blue' },
  { text: '글로벌 도시의 성공적인 사례 작동 구조는 지역주체의 자발적 움직임의 선행이며 이에따른 참여주체들간 협정이다. 이 움직임을 만들어놓은 상태 또는 만들어놓은 상태를 가정한 것을 기반으로 서울시와 협력해야 시스템의 실질적이고 지속적인 운영이 가능해질 것이다.', tone: 'blue' },
  { text: '상세 운영 데이터를 실시간 집계할수 있는 시스템을 구축하고 투명하게 공개한다. 데이터기반 AI를 활용한 운영의 효율화와 개선방향을 지속 도출하고 개선한다.', tone: 'blue' },
];

const thoughtHighlightPattern = new RegExp(`(${THOUGHT_HIGHLIGHTS
  .map(({ text }) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .join('|')})`, 'g');

function renderThoughtHighlights(value) {
  return value.split(thoughtHighlightPattern).filter(Boolean).map((part, index) => {
    const highlight = THOUGHT_HIGHLIGHTS.find((candidate) => candidate.text === part);
    if (!highlight) return part;
    const colorClass = highlight.tone === 'red' ? 'text-[#FF7B72]' : 'text-[#8FC7FF]';
    return <span key={`${part}-${index}`} className={`${colorClass} font-semibold`}>{part}</span>;
  });
}

function ThoughtText({ text }) {
  const segments = text.split('→').map((segment) => segment.trim()).filter(Boolean);
  return (
    <>
      <span>{renderThoughtHighlights(segments[0])}</span>
      {segments.slice(1).map((segment) => (
        <span key={segment} className="mt-3 block">
          <span className="mr-2 text-[#77777D]">→</span>{renderThoughtHighlights(segment)}
        </span>
      ))}
    </>
  );
}

function ThoughtsSection() {
  const items = buildThoughtItems(thoughtsRaw);
  return (
    <section data-thoughts-verbatim className="relative mb-[144px] overflow-hidden rounded-[30px] border border-[#49789E]/70 bg-[#202A36] px-10 py-12 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[4px] bg-[#78B8E8]" />
      <p className="text-[13px] font-bold text-[#8FC7FF]">송현 적용을 위한 TF 검토 메모</p>
      <h2 className="mt-3 text-[36px] font-semibold text-white">생각해볼것</h2>
      <div className="mt-10 rounded-[22px] border border-white/10 bg-black/15 px-7 py-8">
        {items.map((item, index) => (
          <article
            data-thoughts-item
            key={`${index}-${item.text.slice(0, 24)}`}
            className={`${item.breakBefore && index > 0 ? 'mt-10 border-t border-[#6EA7D0]/25 pt-10' : index > 0 ? 'mt-7' : ''} grid grid-cols-[28px_minmax(0,1fr)] gap-4`}
          >
            <span className="pt-[3px] text-[15px] font-semibold text-[#6E9CC3]">—</span>
            <div>
              <p className="text-[18px] leading-[1.95] text-[#D2D2D6]"><ThoughtText text={item.text} /></p>
              {item.children.length > 0 && (
                <div className="mt-5 space-y-3 border-l border-white/10 pl-5">
                  {item.children.map((child, childIndex) => (
                    <div key={`${child.kind}-${childIndex}`} className="grid grid-cols-[44px_minmax(0,1fr)] gap-3">
                      <span className={`${child.kind === 'action' ? 'text-[#8FC7FF]' : 'text-[#888890]'} pt-[2px] text-[12px] font-semibold`}>
                        {child.kind === 'action' ? '과제' : '진단'}
                      </span>
                      <p className="text-[16px] leading-[1.85] text-[#B5B5BA]"><ThoughtText text={child.text} /></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Chapter({ chapter, isLast }) {
  return (
    <>
      <section className={isLast ? 'mb-[112px]' : 'mb-20'}>
        <p className="text-[14px] font-bold tracking-[0.08em] text-[#7EB5E4]">CHAPTER {chapter.number}</p>
        <h2 className="mt-5 text-[42px] font-semibold leading-[1.2] tracking-[-0.025em] text-white">{chapter.title}</h2>
        <p className="mt-7 text-[19px] leading-[1.85] text-[#B7B7BC]">{chapter.description}</p>
        {chapter.number === '02' && (
          <div className="mt-16">
            <SystemTimeline />
            <CountryComparisonTable />
            <ScaleComparison />
          </div>
        )}
        {chapter.number === '03' && <div className="mt-16"><SeoulCaseMatrix /></div>}
        <div className="mt-16 rounded-[28px] bg-[#252524] px-9 py-12">
          {chapter.sections.map((title) => <DetailSection key={title} title={title} />)}
        </div>
      </section>
      {!isLast && (
        <div data-chapter-divider aria-hidden="true" className="mx-auto mb-[112px] h-px w-[180px] bg-white/25" />
      )}
    </>
  );
}

export default function CityPartnership() {
  return (
    <CaseReportFrame current="context">
    <article data-city-partnership-story className="mx-auto w-[920px] max-w-full px-6 pb-28">
      <header className="pb-[128px] pt-16">
        <p className="text-[15px] font-bold text-[#7EB5E4]">국가별 제도 비교 · 서울형 사업 운영진단</p>
        <h1 className="mt-8 text-[54px] font-semibold leading-[1.12] tracking-[-0.035em] text-white">
          미국·영국·일본, 그리고 한국의<br />지역매니지먼트 시스템
        </h1>
        <p className="mt-9 text-[20px] leading-[1.85] text-[#B5B5BA]">
          미국·영국·일본의 지역매니지먼트 제도가 형성된 배경과 운영구조를 비교하고, 2016~2022년 서울형 타운매니지먼트의 추진방식·성과·한계를 검토했다. 이를 통해 국내 지역관리사업을 지속 가능한 운영체계로 전환하기 위한 조건을 정리했다.
        </p>
        <div className="mt-12 rounded-[22px] bg-[#252524] px-8 py-7">
          <p className="text-[14px] font-bold text-[#8FC7FF]">출처</p>
          <p className="mt-3 text-[17px] leading-[1.7] text-white">윤서연·정상혁·이슬이(2022), 「서울형 타운매니지먼트사업 현황 진단과 개선방향」</p>
          <p className="mt-2 text-[14px] leading-[1.7] text-[#8B8B91]">서울연구원 · 과제코드 2021-PR-25 · 연구대상 2016~2022년</p>
          <a href={SOURCE_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-[15px] font-semibold text-[#8FC7FF] hover:text-white">정리 원문 열기 ↗</a>
        </div>
      </header>

      <div data-notion-full-content>
        {chapters.map((chapter, index) => (
          <Chapter key={chapter.number} chapter={chapter} isLast={index === chapters.length - 1} />
        ))}
      </div>

      <ThoughtsSection />

      <section data-editorial-summary className="relative mb-[112px] overflow-hidden rounded-[30px] border border-[#49789E]/70 bg-[#202A36] px-10 py-12 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[4px] bg-[#78B8E8]" />
        <p className="text-[14px] font-bold tracking-[0.08em] text-[#8FC7FF]">CONCLUSION</p>
        <h2 className="mt-5 text-[42px] font-semibold leading-[1.2] tracking-[-0.025em] text-white">송현 적용을 위한 핵심 검토사항</h2>
        <p className="mt-7 text-[18px] leading-[1.85] text-[#B7B7BC]">국내외 사례와 성수동 운영모델을 바탕으로, 송현에서 직접 검증해야 할 네 가지 조건을 정리했다.</p>
        <div className="mt-14 space-y-12 rounded-[22px] border border-white/10 bg-black/15 px-7 py-8">
          {summaryFindings.map(([number, title, body]) => (
            <article key={number} className="grid grid-cols-[56px_minmax(0,1fr)] gap-6">
              <span className="pt-1 text-[14px] font-bold text-[#7EB5E4]">{number}</span>
              <div><h3 className="text-[26px] font-semibold leading-[1.4] text-white">{title}</h3><p className="mt-4 text-[18px] leading-[1.85] text-[#B0B0B5]">{body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-10 pt-4">
        <p className="text-[14px] font-bold tracking-[0.08em] text-[#7EB5E4]">IMPLEMENTATION PROCESS</p>
        <h2 className="mt-5 text-[42px] font-semibold leading-[1.2] tracking-[-0.025em] text-white">지역공감에서 제도화까지의 단계</h2>
        <p className="mt-7 text-[18px] leading-[1.85] text-[#B7B7BC]">지역주체의 합의와 운영경험을 먼저 축적하고, 성과가 확인된 범위부터 재원과 권한을 제도화하는 접근이다.</p>
        <div className="mt-12 grid gap-5">
          {stages.map(([number, title, body]) => (
            <article key={number} className="grid grid-cols-[52px_minmax(0,1fr)] gap-5 rounded-[18px] bg-[#252524] px-7 py-6">
              <span className="text-[13px] font-bold text-[#7EB5E4]">{number}</span>
              <div><h3 className="text-[24px] font-semibold text-white">{title}</h3><p className="mt-3 text-[17px] leading-[1.8] text-[#AFAFB4]">{body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <footer className="mt-24 pb-8 text-[13px] leading-[1.8] text-[#747479]">출처: 윤서연·정상혁·이슬이(2022), 「서울형 타운매니지먼트사업 현황 진단과 개선방향」, 서울연구원, 과제코드 2021-PR-25.</footer>
    </article>
    </CaseReportFrame>
  );
}
