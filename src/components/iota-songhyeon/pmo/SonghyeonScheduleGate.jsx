import React, { useMemo, useState } from 'react';
import { milestoneStages, milestoneWeeks, responsibilityMatrix } from '../../../data/songhyeonMilestones';
import { WorkspacePageFrame, WorkspacePageHeader } from '../../workspace/WorkspacePageLayout';
import SonghyeonDetailedSchedule from './SonghyeonDetailedSchedule';

// Adapted from the exact vendored IOTA PmoScheduleGate DOM and Tailwind contract.
const COLUMNS = milestoneWeeks.map((week) => ({
    key: `w${week.week}`,
    labelTop: `W${week.week}`,
    labelBottom: week.stage,
    highlight: week.isGateWeek,
}));

const TIMELINE_DATA = milestoneStages.map((stage) => ({
    category: 'Gate',
    name: `${stage.code} ${stage.shortTitle}`,
    desc: stage.objective,
    lead: stage.responsible[0],
    coop: stage.responsible.slice(1).join(';') || stage.accountable,
    schedule: Object.fromEntries(milestoneWeeks.filter((week) => week.stage === stage.code).map((week) => [`w${week.week}`, week.isGateWeek ? '◆' : '●'])),
}));

const RR_DATA = responsibilityMatrix.map((item) => ({
    ...item,
    subsector: item.stage,
    lead: item.responsible,
    coop: item.consulted,
    partner: item.external,
    need: item.output,
    point: item.gatePoint,
}));

const Filter = ({ value, onChange, options, label }) => (
    <div className="relative inline-flex cursor-pointer items-center justify-center rounded-[6px] border border-[#3c3c3c] bg-[#2c2c2b] px-2 py-1 transition-colors hover:border-[#464646] hover:bg-[#30302f]">
        <span className={`whitespace-nowrap text-[12px] font-bold ${value === '전체보기' ? 'text-[#86868B]' : 'text-[#2997ff]'}`}>{value === '전체보기' ? label : value}</span>
        <span className="pointer-events-none ml-1 translate-y-[0.5px] select-none text-[8px] text-[#86868B]/70">▼</span>
        <select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0">
            {options.map((option) => <option key={option} value={option} className="bg-[#222] text-white">{option}</option>)}
        </select>
    </div>
);

export default function SonghyeonScheduleGate() {
    const [timelineView, setTimelineView] = useState('detail');
    const [category, setCategory] = useState('전체보기');
    const [lead, setLead] = useState('전체보기');
    const [coop, setCoop] = useState('전체보기');

    const categories = ['전체보기', ...new Set(RR_DATA.map((item) => item.category))];
    const leads = ['전체보기', ...new Set(RR_DATA.map((item) => item.lead))];
    const coops = ['전체보기', ...new Set(RR_DATA.flatMap((item) => item.coop))];
    const filteredRr = useMemo(() => RR_DATA.filter((item) =>
        (category === '전체보기' || item.category === category)
        && (lead === '전체보기' || item.lead === lead)
        && (coop === '전체보기' || item.coop.includes(coop))
    ), [category, coop, lead]);

    const renderCategoryName = (name) => {
        const [code, ...rest] = name.split(' ');
        return <div className="text-center leading-[1.2]"><div className="text-[11px] font-bold">{code}</div><div className="mt-0.5 text-[11px] font-bold opacity-90">{rest.join(' ')}</div></div>;
    };

    return (
        <WorkspacePageFrame className="select-text bg-transparent text-left">
            <style>{`
                .timeline-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
                .timeline-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,.02); border-radius: 10px; }
                .timeline-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border: 2px solid transparent; border-radius: 10px; background-clip: padding-box; }
                .timeline-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.25); border: 2px solid transparent; background-clip: padding-box; }
                .timeline-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.12) rgba(255,255,255,.02); }
            `}</style>

            <WorkspacePageHeader
                title="마일스톤"
                controls={(
                    <div className="flex h-[30px] items-center rounded-[9px] border border-[#343e4d] bg-[#2A2A2A]">
                        {[['detail', '상세 일정'], ['summary', 'Gate 요약']].map(([value, label]) => (
                            <button type="button" key={value} onClick={() => setTimelineView(value)} className={`h-[28px] cursor-pointer rounded-[7px] border px-3 text-[11px] font-bold transition-colors ${timelineView === value ? 'border-[#263b52] bg-[#3b4f68] text-[#E5E5E5] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.035)]' : 'border-transparent text-[#86868B] hover:text-[#E5E5E5]'}`}>{label}</button>
                        ))}
                    </div>
                )}
                actions={<div className="text-right"><p className="text-[12px] font-bold text-[#bdbba7]">표준 실행기간 16주 · 4개월</p><p className="mt-1 text-[10px] text-[#86868B]">TF 착수 승인 후 실제 날짜 확정</p></div>}
            />

            {timelineView === 'detail' ? <SonghyeonDetailedSchedule /> : (
                <div className="timeline-scrollbar w-full overflow-x-auto pb-1">
                    <div className="relative w-[1200px] overflow-hidden rounded-[32px] border border-[#3c3c3c] bg-[#272726]">
                        <div className="w-full rounded-[32px] select-text">
                            <table className="pointer-events-auto w-[1198px] min-w-[1198px] max-w-[1198px] table-fixed text-left">
                                <thead><tr className="h-12 border-b border-[#3c3c3c] bg-transparent text-[13px] font-bold text-[#86868B]">
                                    <th className="w-[80px] min-w-[80px] max-w-[80px] rounded-tl-[31px] bg-[#272726] pl-[10px] pr-1 text-center">구분</th>
                                    <th className="w-[190px] min-w-[190px] max-w-[190px] bg-[#272726] pl-3">세부업무</th>
                                    <th className="w-[80px] min-w-[80px] max-w-[80px] bg-[#272726] px-1 text-center">실행주관</th>
                                    <th className="w-[80px] min-w-[80px] max-w-[80px] border-r border-[#3c3c3c] bg-[#272726] px-1 text-center">협업</th>
                                    {COLUMNS.map((column, index) => <th key={column.key} className={`w-[48px] min-w-[48px] max-w-[48px] px-1 text-center text-[10px] font-bold leading-tight ${column.highlight ? 'bg-white/[0.03] text-[#60a5fa]' : 'text-[#86868B]'} ${index < COLUMNS.length - 1 ? 'border-r border-[#464646]/50' : 'rounded-tr-[31px]'}`}><div>{column.labelTop}</div><div className="mt-0.5 text-[9px] opacity-75">{column.labelBottom}</div></th>)}
                                </tr></thead>
                                <tbody className="divide-y divide-[#3c3c3c] text-[13px]">
                                    {TIMELINE_DATA.map((item, rowIndex) => <tr key={item.name} className="group h-[50px] transition-colors hover:bg-[#333]">
                                        <td className={`w-[80px] min-w-[80px] max-w-[80px] bg-[#272726] pl-[10px] pr-1 text-center transition-colors group-hover:bg-[#333] ${rowIndex === TIMELINE_DATA.length - 1 ? 'rounded-bl-[31px]' : ''}`}><span className="block rounded-md border border-[#2997ff]/20 bg-[#2997ff]/10 px-1.5 py-1 font-bold text-[#60a5fa]">{renderCategoryName(item.name)}</span></td>
                                        <td className="w-[190px] min-w-[190px] max-w-[190px] whitespace-normal break-words bg-[#272726] pl-3 pr-2 text-left text-[13px] font-medium leading-snug tracking-tight text-[#bdbba7] transition-colors group-hover:bg-[#333]">{item.desc}</td>
                                        <td className="w-[80px] min-w-[80px] max-w-[80px] whitespace-normal break-words bg-[#272726] px-1 text-center text-[11px] font-semibold leading-tight text-[#E5E5E5] group-hover:bg-[#333]">{item.lead}</td>
                                        <td className="w-[80px] min-w-[80px] max-w-[80px] whitespace-normal break-words border-r border-[#3c3c3c] bg-[#272726] px-1 text-center text-[10px] leading-tight text-[#bdbba7] group-hover:bg-[#333]">{item.coop.split(';').map((value) => <div key={value}>{value}</div>)}</td>
                                        {COLUMNS.map((column, columnIndex) => { const mark = item.schedule[column.key]; return <td key={column.key} className={`relative w-[48px] min-w-[48px] max-w-[48px] text-center ${column.highlight ? 'bg-white/[0.015]' : ''} ${columnIndex < COLUMNS.length - 1 ? 'border-r border-[#464646]/40' : ''}`}>{mark === '●' && <span className="inline-block h-3.5 w-3.5 rounded-full bg-[#2997ff]" />}{mark === '◆' && <span className="block -translate-y-[1px] font-mono text-[24px] font-extrabold text-[#F59E0B]">◆</span>}</td>; })}
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <div id="rnr" className="mt-[41px] mb-[16px] flex w-full items-end justify-between"><div className="flex items-baseline gap-[16px]"><h2 className="text-left text-[32px] font-bold leading-none tracking-tight text-[#E5E5E5]">R&R 및 필요산출물</h2><p className="text-[15px] leading-none text-[#86868B]">협업 주체·산출물·Gate 관리 포인트를 조회합니다.</p></div><span className="text-[11px] font-bold text-[#86868B]">총 {filteredRr.length}개 업무</span></div>

            <div className="timeline-scrollbar relative mb-[40px] h-auto w-full overflow-x-auto rounded-[32px] border border-[#3c3c3c] bg-[#272726]">
                <table className="w-[1198px] min-w-[1198px] max-w-[1198px] table-fixed border-collapse bg-[#272726] text-left">
                    <thead><tr className="h-[56px] border-b border-[#3c3c3c] bg-[#272726] text-[12px] font-bold text-[#86868B]">
                        <th className="w-[100px] min-w-[100px] max-w-[100px] rounded-tl-[31px] bg-[#272726] px-1 text-center"><Filter value={category} onChange={setCategory} options={categories} label="업무분류" /></th>
                        <th className="w-[60px] min-w-[60px] max-w-[60px] bg-[#272726] px-1 text-center">Gate</th>
                        <th className="w-[230px] min-w-[230px] max-w-[230px] border-r border-[#3c3c3c] bg-[#272726] pl-3">대표 업무</th>
                        <th className="w-[95px] min-w-[95px] max-w-[95px] bg-[#272726] text-center"><Filter value={lead} onChange={setLead} options={leads} label="실행주관" /></th>
                        <th className="w-[210px] min-w-[210px] max-w-[210px] border-r border-[#3c3c3c] bg-[#272726] pl-3 text-left"><Filter value={coop} onChange={setCoop} options={coops} label="협업 부서" /></th>
                        <th className="w-[105px] min-w-[105px] max-w-[105px] bg-[#272726] px-1 text-center">외부 상대방</th>
                        <th className="w-[170px] min-w-[170px] max-w-[170px] bg-[#272726] px-2 text-left">필요산출물</th>
                        <th className="w-[228px] min-w-[228px] max-w-[228px] rounded-tr-[31px] bg-[#272726] px-3 text-left">Gate 관리 포인트</th>
                    </tr></thead>
                    <tbody className="divide-y divide-[#3c3c3c]/60 text-[12px]">
                        {filteredRr.map((item, index) => <tr key={item.id} className="group h-12 bg-[#272726] transition-colors hover:bg-[#333]">
                            <td className={`w-[100px] min-w-[100px] max-w-[100px] bg-[#272726] px-2 text-center text-[12px] font-bold text-[#E5E5E5] group-hover:bg-[#333] ${index === filteredRr.length - 1 ? 'rounded-bl-[31px]' : ''}`}>{item.category}</td>
                            <td className="w-[60px] min-w-[60px] max-w-[60px] bg-[#272726] px-1 text-center text-[12px] font-bold text-[#E5E5E5] group-hover:bg-[#333]">{item.stage}</td>
                            <td className="w-[230px] min-w-[230px] max-w-[230px] whitespace-normal break-words border-r border-[#3c3c3c] bg-[#272726] pl-3 pr-2 text-left text-[13px] font-bold leading-snug text-[#bdbba7] group-hover:bg-[#333]">{item.task}</td>
                            <td className="w-[95px] min-w-[95px] max-w-[95px] bg-[#272726] text-center group-hover:bg-[#333]"><span className="inline-block whitespace-nowrap rounded border border-[#2997ff]/20 bg-[#2997ff]/10 px-2 py-0.5 text-[11px] font-bold text-[#E5E5E5]">{item.lead}</span></td>
                            <td className="w-[210px] min-w-[210px] max-w-[210px] border-r border-[#3c3c3c] bg-[#272726] pl-3 pr-2 text-left leading-tight text-[#E5E5E5] group-hover:bg-[#333]"><div className="flex flex-wrap items-center gap-1.5">{item.coop.map((value) => <span key={value} className="whitespace-nowrap rounded border border-[#3c3c3c] bg-[#1F1F1E] px-2 py-0.5 text-[11px] text-[#bdbba7]">{value}</span>)}</div></td>
                            <td className="w-[105px] min-w-[105px] max-w-[105px] whitespace-normal break-words bg-[#272726] px-1 text-center font-semibold text-[#86868B] group-hover:bg-[#333]">{item.partner}</td>
                            <td className="w-[170px] min-w-[170px] max-w-[170px] whitespace-normal break-words bg-[#272726] px-2 text-left font-semibold text-[#F59E0B] group-hover:bg-[#333]">{item.need}</td>
                            <td className={`w-[228px] min-w-[228px] max-w-[228px] whitespace-normal break-words bg-[#272726] px-3 text-left font-normal text-[#86868B] group-hover:bg-[#333] ${index === filteredRr.length - 1 ? 'rounded-br-[31px]' : ''}`}>{item.point}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </WorkspacePageFrame>
    );
}
