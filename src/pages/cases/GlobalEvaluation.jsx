import React, { useMemo, useState } from 'react';
import { ChevronDown, ExternalLink, Search, X } from 'lucide-react';
import { Navigate, useSearchParams } from 'react-router-dom';
import CaseReportFrame from '../../components/cases/CaseReportFrame';
import {
  GLOBAL_EVALUATION_CASES,
  GLOBAL_EVALUATION_DEEP_DIVE_IDS,
  GLOBAL_EVALUATION_METHOD,
  GLOBAL_EVALUATION_VERDICTS,
} from '../../data/globalEvaluationCases';

const VERDICT_STYLES = {
  2: { badge: 'border-[#5183A8] bg-[#203342] text-[#9CCCF2]', bar: 'bg-[#72A8D3]' },
  1: { badge: 'border-[#436E58] bg-[#21342A] text-[#9FD2B1]', bar: 'bg-[#74A987]' },
  0: { badge: 'border-[#665D3D] bg-[#332F22] text-[#D2C38B]', bar: 'bg-[#A89553]' },
  '-1': { badge: 'border-[#7A5945] bg-[#3A2A22] text-[#D6A081]', bar: 'bg-[#B87D5C]' },
  '-2': { badge: 'border-[#7C4646] bg-[#3A2323] text-[#E2A0A0]', bar: 'bg-[#C56F6F]' },
};

const FIELD_LABELS = [
  ['why', 'Why · 추진 배경'],
  ['what', 'What · 주요 실행'],
  ['who', 'Who · 참여주체'],
  ['where', 'Where · 공간 범위'],
  ['when', 'When · 추진 시기'],
  ['how', 'How · 운영구조'],
  ['cost', 'How much · 재원'],
  ['howWell', 'How well · 확인 성과'],
];

const REGIONS = [...new Set(GLOBAL_EVALUATION_CASES.map((item) => item.region))];

const scoreValue = (verdict) => Number.parseInt(String(verdict).match(/[+-]?\d+/)?.[0] || '0', 10);
const cleanValue = (value) => value || '공개 확인 자료 없음';

function VerdictBadge({ verdict }) {
  const value = scoreValue(verdict);
  return <span className={`inline-flex rounded-full border px-3 py-1 text-[13px] font-semibold ${VERDICT_STYLES[value].badge}`}>{verdict}</span>;
}

function MetricCard({ label, value, note }) {
  return (
    <article className="border-l border-white/10 px-6 first:border-l-0 first:pl-0">
      <p className="text-[14px] font-semibold text-[#86868B]">{label}</p>
      <strong className="mt-3 block text-[34px] font-semibold tracking-[-0.03em] text-white">{value}</strong>
      <p className="mt-1 text-[13px] text-[#68686E]">{note}</p>
    </article>
  );
}

function MethodSection() {
  return (
    <section className="border-y border-white/10 py-12">
      <div className="grid grid-cols-[0.8fr_1.2fr] gap-16 max-lg:grid-cols-1 max-lg:gap-9">
        <div>
          <p className="text-[15px] font-semibold text-[#8FC7FF]">평가의 기준과 순서</p>
          <h2 className="mt-5 text-[38px] font-semibold leading-[1.25] tracking-[-0.035em] text-white">성과의 크기가 아니라<br />근거의 선명도를 기준으로 판정</h2>
          <p className="mt-6 text-[17px] leading-[1.85] text-[#B7B7BC]">{GLOBAL_EVALUATION_METHOD.criterion}</p>
        </div>
        <div>
          <div className="grid grid-cols-3 overflow-hidden rounded-[20px] border border-white/10 max-md:grid-cols-1">
            {GLOBAL_EVALUATION_METHOD.sequence.map((step, index) => (
              <article key={step} className="border-l border-white/10 bg-[#252524] p-6 first:border-l-0 max-md:border-l-0 max-md:border-t max-md:first:border-t-0">
                <span className="text-[13px] font-semibold text-[#6FADE0]">0{index + 1}</span>
                <p className="mt-7 text-[17px] font-semibold leading-[1.55] text-[#E5E5E5]">{step}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            {GLOBAL_EVALUATION_METHOD.cautions.map((caution) => (
              <p key={caution} className="flex gap-3 text-[14px] leading-[1.7] text-[#85858B]"><span className="text-[#6FADE0]">•</span>{caution}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DistributionSection({ verdictCounts, regionCounts }) {
  return (
    <section className="py-12">
      <div className="grid grid-cols-[1.05fr_0.95fr] gap-12 max-lg:grid-cols-1">
        <div>
          <p className="text-[15px] font-semibold text-[#8FC7FF]">단일기준 판정 결과</p>
          <h2 className="mt-4 text-[34px] font-semibold tracking-[-0.03em] text-white">75개 사례의 판정·지역 분포</h2>
          <div className="mt-9 space-y-4">
            {GLOBAL_EVALUATION_VERDICTS.map((item) => {
              const count = verdictCounts[item.value] || 0;
              const percent = Math.round((count / GLOBAL_EVALUATION_CASES.length) * 100);
              return (
                <div key={item.value} className="grid grid-cols-[128px_minmax(0,1fr)_42px] items-center gap-4">
                  <span className="text-[14px] font-semibold text-[#C8C8CC]">{item.label}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]"><div className={`h-full rounded-full ${VERDICT_STYLES[item.value].bar}`} style={{ width: `${percent}%` }} /></div>
                  <span className="text-right text-[15px] font-semibold text-white">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-[22px] border border-white/10 bg-[#252524] p-7">
          <p className="text-[15px] font-semibold text-[#8FC7FF]">지역별 구성</p>
          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5">
            {regionCounts.map(([region, count]) => (
              <div key={region} className="flex items-end justify-between border-b border-white/10 pb-3">
                <span className="text-[15px] text-[#B7B7BC]">{region}</span>
                <strong className="text-[20px] font-semibold text-white">{count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DeepDiveCard({ item, onOpen }) {
  const value = scoreValue(item.verdict);
  return (
    <button type="button" onClick={() => onOpen(item.id)} className="group flex min-h-[240px] flex-col border-l border-white/10 bg-[#252524] p-7 text-left transition-colors first:border-l-0 hover:bg-[#2D2D2C] max-lg:border-l-0 max-lg:border-t max-lg:first:border-t-0">
      <div className="flex items-start justify-between gap-4">
        <VerdictBadge verdict={item.verdict} />
        <span className="text-[15px] text-[#626268] transition-colors group-hover:text-white">↗</span>
      </div>
      <p className="mt-8 text-[13px] font-semibold text-[#77777D]">{item.region} · {item.id}</p>
      <h3 className="mt-2 text-[20px] font-semibold leading-[1.45] text-white">{item.name}</h3>
      <p className="mt-4 line-clamp-3 text-[15px] leading-[1.75] text-[#A7A7AC]">{item.judgment}</p>
      <span className={`mt-auto pt-6 text-[13px] font-semibold ${value > 0 ? 'text-[#8FC7FF]' : 'text-[#E2A0A0]'}`}>상세 근거 보기</span>
    </button>
  );
}

function DeepDiveSection({ onOpen }) {
  const items = GLOBAL_EVALUATION_DEEP_DIVE_IDS.map((id) => GLOBAL_EVALUATION_CASES.find((item) => item.id === id)).filter(Boolean);
  return (
    <section className="border-y border-white/10 py-12">
      <div className="flex items-end justify-between gap-8 max-md:block">
        <div>
          <p className="text-[15px] font-semibold text-[#8FC7FF]">후속 심층조사</p>
          <h2 className="mt-4 text-[34px] font-semibold tracking-[-0.03em] text-white">명확한 성공 3개와 학습 가능한 부진 3개</h2>
        </div>
        <p className="max-w-[470px] text-[15px] leading-[1.75] text-[#85858B] max-md:mt-5">체감성과와 공개검증이 선명한 성공 사례 3개와 운영구조의 한계가 분명한 부진 사례 3개를 심층 비교한다.</p>
      </div>
      <div className="mt-9 grid grid-cols-3 overflow-hidden rounded-[22px] border border-white/10 max-lg:grid-cols-1">
        {items.map((item) => <DeepDiveCard key={item.id} item={item} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

function SourceList({ sources }) {
  return (
    <div className="space-y-2">
      {sources.map((source, index) => {
        let host = source;
        try { host = new URL(source).hostname.replace(/^www\./, ''); } catch { /* 원문 URL을 그대로 표시한다. */ }
        return (
          <a key={`${source}-${index}`} href={source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[14px] text-[#8FC7FF] underline decoration-white/20 underline-offset-4 hover:text-white">
            <ExternalLink size={13} aria-hidden="true" /> {host}
          </a>
        );
      })}
    </div>
  );
}

function CaseDetail({ item }) {
  return (
    <div className="border-t border-white/10 bg-[#20201F] px-7 py-8 max-md:px-5">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-white/10 bg-white/10 max-md:grid-cols-1">
        {FIELD_LABELS.map(([key, label]) => (
          <article key={key} className="bg-[#252524] p-5">
            <h4 className="text-[13px] font-semibold text-[#8FC7FF]">{label}</h4>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.75] text-[#C1C1C5]">{cleanValue(item[key])}</p>
          </article>
        ))}
      </div>

      <div className="mt-7 grid grid-cols-3 overflow-hidden rounded-[16px] border border-white/10 max-lg:grid-cols-1">
        {[['Context', item.context], ['Mechanism', item.mechanism], ['Outcome', item.outcome]].map(([label, text]) => (
          <article key={label} className="border-l border-white/10 bg-[#242423] p-6 first:border-l-0 max-lg:border-l-0 max-lg:border-t max-lg:first:border-t-0">
            <h4 className="text-[14px] font-semibold text-[#8FC7FF]">{label}</h4>
            <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.8] text-[#B9B9BE]">{cleanValue(text)}</p>
          </article>
        ))}
      </div>

      <div className="mt-7 grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        <article className="rounded-[16px] border border-[#385268] bg-[#202A33] p-6">
          <h4 className="text-[14px] font-semibold text-[#9CCCF2]">이용자·이해관계자 체감근거</h4>
          <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.8] text-[#C7D3DD]">{cleanValue(item.experienceEvidence)}</p>
        </article>
        <article className="rounded-[16px] border border-white/10 bg-[#272726] p-6">
          <h4 className="text-[14px] font-semibold text-[#C7C7CB]">공개검증·인지도 근거</h4>
          <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.8] text-[#B9B9BE]">{cleanValue(item.publicEvidence)}</p>
        </article>
      </div>

      <div className="mt-7 grid grid-cols-[1.15fr_0.85fr] gap-5 max-lg:grid-cols-1">
        <article className="rounded-[16px] border border-white/10 bg-[#272726] p-6">
          <h4 className="text-[14px] font-semibold text-[#D2C38B]">근거 공백</h4>
          <p className="mt-4 text-[15px] leading-[1.8] text-[#B9B9BE]">{item.evidenceGap || '별도로 기록된 추가 근거 공백 없음'}</p>
        </article>
        <article className="rounded-[16px] border border-white/10 bg-[#272726] p-6">
          <h4 className="text-[14px] font-semibold text-[#C7C7CB]">확인 출처 {item.sources.length}개</h4>
          <div className="mt-4"><SourceList sources={item.sources} /></div>
        </article>
      </div>
    </div>
  );
}

function CaseRow({ item, expanded, onToggle }) {
  return (
    <article id={`case-${item.id}`} data-global-evaluation-case={item.id} className="scroll-mt-6 border-b border-white/10 last:border-b-0">
      <button type="button" aria-expanded={expanded} onClick={onToggle} className="grid w-full grid-cols-[72px_150px_minmax(0,1fr)_190px_34px] items-center gap-5 px-7 py-5 text-left transition-colors hover:bg-[#292928] max-lg:grid-cols-[60px_120px_minmax(0,1fr)_34px] max-lg:[&>*:nth-child(4)]:hidden max-md:grid-cols-[56px_minmax(0,1fr)_30px] max-md:[&>*:nth-child(2)]:hidden">
        <span className="text-[14px] font-semibold text-[#6F9FC7]">{item.id}</span>
        <span className="text-[14px] text-[#8D8D93]">{item.region}</span>
        <span className="min-w-0">
          <strong className="block truncate text-[16px] font-semibold text-[#E5E5E5]">{item.name}</strong>
          <span className="mt-2 block line-clamp-1 text-[14px] text-[#828288]">{item.judgment}</span>
        </span>
        <span><VerdictBadge verdict={item.verdict} /></span>
        <ChevronDown size={18} className={`text-[#6D6D72] transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {expanded && <CaseDetail item={item} />}
    </article>
  );
}

function ExplorerSection({ openedCaseId, onOpenCase }) {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('전체');
  const [verdict, setVerdict] = useState('전체');
  const [expandedId, setExpandedId] = useState(openedCaseId || '');

  React.useEffect(() => {
    if (openedCaseId) setExpandedId(openedCaseId);
  }, [openedCaseId]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('ko');
    return GLOBAL_EVALUATION_CASES.filter((item) => {
      const matchesQuery = !normalized || [item.id, item.name, item.region, item.judgment, item.who, item.where]
        .some((value) => String(value).toLocaleLowerCase('ko').includes(normalized));
      const matchesRegion = region === '전체' || item.region === region;
      const matchesVerdict = verdict === '전체' || scoreValue(item.verdict) === Number(verdict);
      return matchesQuery && matchesRegion && matchesVerdict;
    });
  }, [query, region, verdict]);

  const clearFilters = () => {
    setQuery('');
    setRegion('전체');
    setVerdict('전체');
  };

  return (
    <section id="case-explorer" className="py-12">
      <div className="flex items-end justify-between gap-8 max-md:block">
        <div>
          <p className="text-[15px] font-semibold text-[#8FC7FF]">전체 분석자료</p>
          <h2 className="mt-4 text-[34px] font-semibold tracking-[-0.03em] text-white">75개 사례별 평가근거</h2>
        </div>
        <p className="text-[15px] text-[#85858B] max-md:mt-4">현재 {filtered.length}개 사례</p>
      </div>

      <div className="mt-8 rounded-[22px] border border-white/10 bg-[#252524] p-5">
        <label className="flex h-[50px] items-center gap-3 rounded-[12px] border border-white/10 bg-[#1F1F1E] px-4 focus-within:border-[#5183A8]">
          <Search size={18} className="text-[#717177]" aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="사례명·지역·참여주체·판단 검색" className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-[#66666B]" />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="검색어 지우기"><X size={16} className="text-[#77777D]" /></button>}
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          {['전체', ...REGIONS].map((item) => (
            <button key={item} type="button" onClick={() => setRegion(item)} className={`rounded-full border px-3 py-2 text-[13px] font-semibold ${region === item ? 'border-[#5C91BB] bg-[#203342] text-[#A9D6F8]' : 'border-white/10 text-[#929298] hover:border-white/20 hover:text-white'}`}>{item}</button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => setVerdict('전체')} className={`rounded-full border px-3 py-2 text-[13px] font-semibold ${verdict === '전체' ? 'border-[#5C91BB] bg-[#203342] text-[#A9D6F8]' : 'border-white/10 text-[#929298]'}`}>판정 전체</button>
          {GLOBAL_EVALUATION_VERDICTS.map((item) => (
            <button key={item.value} type="button" onClick={() => setVerdict(String(item.value))} className={`rounded-full border px-3 py-2 text-[13px] font-semibold ${verdict === String(item.value) ? VERDICT_STYLES[item.value].badge : 'border-white/10 text-[#929298] hover:border-white/20 hover:text-white'}`}>{item.label}</button>
          ))}
          {(query || region !== '전체' || verdict !== '전체') && <button type="button" onClick={clearFilters} className="ml-auto px-2 text-[13px] font-semibold text-[#8FC7FF] hover:text-white">필터 초기화</button>}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[22px] border border-white/10 bg-[#252524]">
        <div className="grid grid-cols-[72px_150px_minmax(0,1fr)_190px_34px] gap-5 border-b border-white/10 bg-[#2A2A29] px-7 py-4 text-[13px] font-semibold text-[#77777D] max-lg:grid-cols-[60px_120px_minmax(0,1fr)_34px] max-lg:[&>*:nth-child(4)]:hidden max-md:grid-cols-[56px_minmax(0,1fr)_30px] max-md:[&>*:nth-child(2)]:hidden">
          <span>ID</span><span>지역</span><span>사례와 판단</span><span>최종 판정</span><span />
        </div>
        {filtered.length > 0 ? filtered.map((item) => (
          <CaseRow key={item.id} item={item} expanded={expandedId === item.id} onToggle={() => {
            const next = expandedId === item.id ? '' : item.id;
            setExpandedId(next);
            if (next) onOpenCase(next, false);
          }} />
        )) : (
          <div className="px-7 py-16 text-center text-[15px] text-[#77777D]">조건에 맞는 사례 없음</div>
        )}
      </div>
    </section>
  );
}

export default function GlobalEvaluation() {
  const [searchParams] = useSearchParams();
  const [openedCaseId, setOpenedCaseId] = useState('');
  const verdictCounts = useMemo(() => GLOBAL_EVALUATION_CASES.reduce((acc, item) => {
    const value = scoreValue(item.verdict);
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {}), []);
  const regionCounts = useMemo(() => REGIONS.map((region) => [region, GLOBAL_EVALUATION_CASES.filter((item) => item.region === region).length]).sort((a, b) => b[1] - a[1]), []);

  const openCase = (id, shouldScroll = true) => {
    setOpenedCaseId(id);
    if (shouldScroll) requestAnimationFrame(() => document.getElementById(`case-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  if (searchParams.get('view') === 'insights') return <Navigate replace to="/cases/operating-insights" />;

  return (
    <CaseReportFrame current="evidence">
      <section data-global-evaluation-report>
        <header className="pb-12 pt-12">
          <p className="text-[15px] font-semibold text-[#8FC7FF]">원자료 탐색 · 사례별 평가근거</p>
          <h1 className="mt-7 max-w-[930px] text-[54px] font-semibold leading-[1.12] tracking-[-0.04em] text-white max-md:text-[42px]">국내외 민관협력 75개 사례</h1>
          <p className="mt-7 max-w-[920px] text-[18px] leading-[1.8] text-[#B7B7BC]">국가와 제도, 사업 유형이 서로 다른 75개 사례를 5W3H와 CMO로 정리한 원자료다. 사례의 사실관계와 운영구조, 체감성과, 공개 근거를 동일한 기준으로 검색하고 비교한다.</p>
          <div className="mt-9 grid grid-cols-4 border-t border-white/10 pt-6 max-md:grid-cols-2 max-md:gap-y-8">
            <MetricCard label="전체 사례" value="75" note="동일 기준 재평가" />
            <MetricCard label="지역군" value="7" note="한국부터 호주까지" />
            <MetricCard label="평가 필드" value="20" note="5W3H·CMO·근거" />
            <MetricCard label="심층조사" value="6" note="성공 3 · 부진 3" />
          </div>
        </header>

        <MethodSection />
        <DistributionSection verdictCounts={verdictCounts} regionCounts={regionCounts} />
        <DeepDiveSection onOpen={openCase} />
        <ExplorerSection openedCaseId={openedCaseId} onOpenCase={openCase} />
      </section>
    </CaseReportFrame>
  );
}
