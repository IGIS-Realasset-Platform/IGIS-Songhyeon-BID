import { useMemo, useState } from 'react';
import {
  milestoneStages,
  milestoneWeeks,
  responsibilityMatrix,
} from '../data/songhyeonMilestones';

const stageColors = {
  G0: '#5279a5', G1: '#4f7fa8', G2: '#3f81b7', G3: '#2997ff',
  G4: '#5686ad', G5: '#6c7f99', G6: '#4679a5',
};

const getStageRange = (stageCode) => {
  const weeks = milestoneWeeks.filter((item) => item.stage === stageCode).map((item) => item.week);
  return { start: Math.min(...weeks), end: Math.max(...weeks) };
};

function PageTabs({ view, setView }) {
  return (
    <div className="flex h-[30px] items-center rounded-[9px] border border-[#3c3c3c] bg-[#252524]">
      {[
        ['detail', '상세 일정'],
        ['summary', 'Gate 요약'],
      ].map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => setView(value)}
          className={`h-[28px] rounded-[7px] border px-3 text-[11px] font-bold transition-colors ${
            view === value
              ? 'border-[#263b52] bg-[#3b4f68] text-white'
              : 'border-transparent text-[#86868B] hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function DetailSchedule() {
  const stageRows = useMemo(() => milestoneStages.map((stage) => ({
    ...stage,
    ...getStageRange(stage.code),
  })), []);

  return (
    <section className="overflow-hidden rounded-[32px] border border-[#3c3c3c] bg-[#272726] shadow-sm">
      <div className="border-b border-[#3c3c3c] bg-[#242423] px-5 py-4">
        <div className="flex items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <h2 className="shrink-0 text-[17px] font-bold text-white">송현 BID 16주 통합 일정</h2>
            <span className="rounded-full border border-[#555]/60 bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-[#a1a1aa]">표준 실행안</span>
            <p className="truncate text-[12px] text-[#86868B]">TF 착수 승인일을 기준으로 단계별 실제 일정을 확정합니다.</p>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-bold text-[#bdbba7]">
            <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#2997ff]" /> 수행기간</span>
            <span className="flex items-center gap-1.5"><b className="text-[16px] text-[#F59E0B]">◆</b> Gate 결정</span>
          </div>
        </div>
        <div className="mt-[10px] grid grid-cols-4 gap-2">
          {[
            ['전체 기간', '16주'], ['Gate', '7개'], ['현재 단계', 'G0'], ['최종 결과', '실증 평가·학습'],
          ].map(([label, value]) => (
            <div key={label} className="flex h-[46px] items-center justify-between rounded-[10px] border border-[#363636] bg-[#2b2b2a] px-3">
              <span className="text-[11px] font-bold text-[#86868B]">{label}</span>
              <strong className="text-[16px] text-white">{value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="timeline-scrollbar max-h-[calc(100vh-250px)] overflow-auto">
        <div className="min-w-[1420px]">
          <div className="sticky top-0 z-30 grid grid-cols-[430px_repeat(16,62px)] border-b border-[#464646] bg-[#242423]">
            <div className="sticky left-0 z-40 flex h-[58px] items-center bg-[#242423] px-4 text-[12px] font-bold text-[#86868B] shadow-[inset_-1px_0_0_#464646]">단계 / 목적 / 실행주관</div>
            {milestoneWeeks.map((item) => (
              <div key={item.week} className={`flex h-[58px] flex-col items-center justify-center border-r border-[#3a3a3a] ${item.isGateWeek ? 'bg-white/[0.025]' : ''}`}>
                <span className="text-[10px] font-bold text-[#86868B]">W{item.week}</span>
                <span className="mt-1 text-[9px] font-bold text-[#60a5fa]">{item.stage}</span>
              </div>
            ))}
          </div>

          {stageRows.map((stage) => (
            <div key={stage.code} className="group grid min-h-[76px] grid-cols-[430px_repeat(16,62px)] border-b border-[#393939] bg-[#272726] hover:bg-[#30302f]">
              <div className="sticky left-0 z-20 flex items-center gap-3 bg-[#272726] px-4 shadow-[inset_-1px_0_0_#464646] group-hover:bg-[#30302f]">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-[8px] border text-[11px] font-black ${stage.id === 0 ? 'border-[#2997ff]/40 bg-[#2997ff]/15 text-[#60a5fa]' : 'border-[#4c4c4c] bg-[#30302f] text-[#bdbba7]'}`}>{stage.code}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <strong className="truncate text-[13px] text-white">{stage.title}</strong>
                    <span className="shrink-0 text-[9px] font-bold text-[#86868B]">{stage.durationWeeks}주</span>
                  </div>
                  <p className="mt-1 truncate text-[10px] text-[#86868B]">{stage.objective}</p>
                  <p className="mt-1 text-[9px] font-bold text-[#bdbba7]">A · {stage.accountable}</p>
                </div>
              </div>
              {milestoneWeeks.map((week) => {
                const inRange = week.week >= stage.start && week.week <= stage.end;
                const isStart = week.week === stage.start;
                const isEnd = week.week === stage.end;
                return (
                  <div key={week.week} className={`relative min-h-[76px] border-r border-[#383838] ${week.isGateWeek ? 'bg-white/[0.012]' : ''}`}>
                    {inRange && <div className={`absolute left-0 right-0 top-1/2 h-[12px] -translate-y-1/2 ${isStart ? 'rounded-l-full' : ''} ${isEnd ? 'rounded-r-full' : ''}`} style={{ backgroundColor: stageColors[stage.code] }} />}
                    {isEnd && <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[22px] font-black leading-none text-[#F59E0B] drop-shadow-[0_0_5px_rgba(245,158,11,0.45)]">◆</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GateSummary() {
  return (
    <section className="overflow-x-auto rounded-[32px] border border-[#3c3c3c] bg-[#272726] timeline-scrollbar">
      <table className="w-[1460px] table-fixed text-left">
        <thead>
          <tr className="h-[58px] border-b border-[#3c3c3c] text-[11px] font-bold text-[#86868B]">
            <th className="w-[88px] px-4 text-center">Gate</th>
            <th className="w-[215px] px-4">단계</th>
            <th className="w-[285px] px-4">핵심 질문</th>
            <th className="w-[265px] px-4">필수 산출물</th>
            <th className="w-[150px] px-4">실행주관</th>
            <th className="w-[165px] px-4">최종책임</th>
            <th className="w-[290px] px-4">Gate 판단</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#3c3c3c]">
          {milestoneStages.map((stage) => (
            <tr key={stage.code} className="h-[88px] text-[12px] hover:bg-[#333]">
              <td className="px-4 text-center"><span className="inline-flex h-9 w-9 items-center justify-center rounded-[9px] border border-[#2997ff]/30 bg-[#2997ff]/10 font-black text-[#60a5fa]">{stage.code}</span></td>
              <td className="px-4"><strong className="text-white">{stage.title}</strong><p className="mt-1 text-[10px] text-[#86868B]">표준 {stage.durationWeeks}주</p></td>
              <td className="px-4 leading-5 text-[#c7c7c2]">{stage.keyQuestion}</td>
              <td className="px-4 leading-5 text-[#bdbba7]">{stage.outputs.join(' · ')}</td>
              <td className="px-4 font-semibold leading-5 text-white">{stage.responsible.join(' · ')}</td>
              <td className="px-4 font-bold text-[#F59E0B]">{stage.accountable}</td>
              <td className="px-4"><strong className="text-white">{stage.gate}</strong><p className="mt-1 text-[10px] text-[#86868B]">{stage.gateDecision}</p></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function TableFilter({ value, setValue, options, label }) {
  return (
    <label className="relative inline-flex items-center rounded-[6px] border border-[#3c3c3c] bg-[#2c2c2b] px-2.5 py-1">
      <span className={`text-[11px] font-bold ${value === '전체' ? 'text-[#86868B]' : 'text-[#2997ff]'}`}>
        {value === '전체' ? label : value}
      </span>
      <span className="ml-1 text-[8px] text-[#86868B]">▼</span>
      <select aria-label={label} value={value} onChange={(event) => setValue(event.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function ResponsibilityTable() {
  const [stage, setStage] = useState('전체');
  const [category, setCategory] = useState('전체');
  const [responsible, setResponsible] = useState('전체');
  const categories = ['전체', ...new Set(responsibilityMatrix.map((item) => item.majorCategory))];
  const owners = ['전체', ...new Set(responsibilityMatrix.map((item) => item.responsible))];
  const rows = responsibilityMatrix.filter((item) =>
    (stage === '전체' || item.stage === stage) &&
    (category === '전체' || item.majorCategory === category) &&
    (responsible === '전체' || item.responsible === responsible)
  );

  return (
    <>
      <div className="mt-[41px] mb-[16px] flex items-end justify-between">
        <div className="flex items-baseline gap-[16px]">
          <h2 className="text-[32px] font-bold tracking-tight text-white">R&R 및 필요산출물</h2>
          <p className="text-[15px] text-[#86868B]">실행주관·협의주체·외부 상대방·산출물·Gate 조건을 조회합니다.</p>
        </div>
        <span className="text-[11px] font-bold text-[#86868B]">총 {rows.length}개 업무</span>
      </div>

      <section className="timeline-scrollbar mb-10 overflow-x-auto rounded-[32px] border border-[#3c3c3c] bg-[#272726]">
        <table className="w-[1690px] table-fixed text-left">
          <thead>
            <tr className="h-[58px] border-b border-[#3c3c3c] text-[11px] font-bold text-[#86868B]">
              <th className="w-[78px] px-3 text-center"><TableFilter value={stage} setValue={setStage} options={['전체', ...milestoneStages.map((item) => item.code)]} label="Gate" /></th>
              <th className="w-[105px] px-3"><TableFilter value={category} setValue={setCategory} options={categories} label="대분류" /></th>
              <th className="w-[135px] px-3">업무분류</th>
              <th className="w-[270px] px-3">대표 업무</th>
              <th className="w-[160px] px-3"><TableFilter value={responsible} setValue={setResponsible} options={owners} label="실행주관" /></th>
              <th className="w-[145px] px-3">최종책임</th>
              <th className="w-[240px] px-3">협의</th>
              <th className="w-[180px] px-3">외부 상대방</th>
              <th className="w-[220px] px-3">필요산출물</th>
              <th className="w-[250px] px-3">Gate 관리포인트</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3c3c3c]/70 text-[11px]">
            {rows.map((item) => (
              <tr key={item.id} className="h-[66px] bg-[#272726] hover:bg-[#333]">
                <td className="px-3 text-center"><span className="rounded-[6px] border border-[#2997ff]/25 bg-[#2997ff]/10 px-2 py-1 font-black text-[#60a5fa]">{item.stage}</span></td>
                <td className="px-3 font-bold text-[#60a5fa]">{item.majorCategory}</td>
                <td className="px-3 font-bold text-white">{item.category}</td>
                <td className="px-3 font-medium leading-5 text-[#bdbba7]">{item.task}</td>
                <td className="px-3 font-bold leading-5 text-white">{item.responsible}</td>
                <td className="px-3 font-bold text-[#F59E0B]">{item.accountable}</td>
                <td className="px-3 leading-5 text-[#c2c2c6]">{item.consulted.join(' · ')}</td>
                <td className="px-3 leading-5 text-[#c2c2c6]">{item.external}</td>
                <td className="px-3 leading-5 text-[#bdbba7]">{item.output}</td>
                <td className="px-3 font-medium leading-5 text-[#e5e5e5]">{item.gatePoint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default function Milestones() {
  const [view, setView] = useState('detail');

  return (
    <div className="w-full min-w-[1180px] flex-1 select-text bg-transparent px-[60px] pt-[28px] pb-[160px] text-left text-white">
      <div className="mb-[12px] flex items-end justify-between">
        <div className="flex items-center gap-[16px]">
          <h1 className="text-[32px] font-bold leading-none tracking-tight text-white">마일스톤</h1>
          <PageTabs view={view} setView={setView} />
        </div>
        <div className="text-right">
          <p className="text-[12px] font-bold text-[#bdbba7]">표준 실행기간 16주 · 4개월</p>
          <p className="mt-1 text-[10px] text-[#68686d]">TF 착수 승인 후 실제 날짜 확정</p>
        </div>
      </div>

      {view === 'detail' ? <DetailSchedule /> : <GateSummary />}
      <ResponsibilityTable />

      <div className="border-t border-[#3c3c3c] pt-4 text-[11px] leading-5 text-[#86868B]">
        본 화면은 송현 실증을 위한 목표 실행구조입니다. 총괄 운영파트너 선정과 세부 계약구조는 G3 실행조건 검증 후 G4에서 확정합니다.
      </div>
    </div>
  );
}
