import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getSonghyeonTodayMarker, milestoneStages, milestoneWeeks } from '../../../data/songhyeonMilestones';
import { songhyeonDetailedScheduleItems } from '../../../data/songhyeonDetailedSchedule';
import { useSonghyeonAuth } from '../../../context/SonghyeonAuthContext';
import { createScheduleRow, deleteScheduleRow, linkScheduleTask, loadScheduleWorkspace, unlinkScheduleTask, updateScheduleRow } from '../../../lib/songhyeonScheduleRepository';
import SonghyeonScheduleRowEditorModal from './SonghyeonScheduleRowEditorModal';
import SonghyeonScheduleTaskLinkModal from './SonghyeonScheduleTaskLinkModal';
import SonghyeonTaskDetailDrawer from '../task-board/SonghyeonTaskDetailDrawer';

// Adapted from the exact vendored IOTA PmoDetailedSchedule render contract.

const SCHEDULE_LABEL_COLUMN_WIDTH = 430;
const SCHEDULE_PERIOD_WIDTH = 48;
const SCHEDULE_TABLE_WIDTH = 1198;

const SelectControl = ({ value, onChange, options, label }) => {
    const isActive = value !== options[0]?.value;
    return <label className="relative h-[34px] min-w-[126px] cursor-pointer" data-filter-active={isActive ? 'true' : undefined}>
        <span className="sr-only">{label}</span>
        <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={`h-full w-full cursor-pointer appearance-none rounded-[8px] border pl-3 pr-8 text-[12px] font-bold text-[#E5E5E5] outline-none transition-colors focus:border-[#2997ff] ${isActive ? 'border-[#2997ff] bg-[#334155] shadow-[0_0_0_1px_rgba(41,151,255,.12)]' : 'border-[#3c3c3c] bg-[#2c2c2b] hover:border-[#505050]'}`}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#222] text-white">
                    {option.label}
                </option>
            ))}
        </select>
        <span className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] ${isActive ? 'text-[#8fc7ff]' : 'text-[#86868B]'}`}>▼</span>
    </label>;
};


const scheduleMonthGroups = milestoneWeeks.reduce((groups, week) => {
    const last = groups.at(-1);
    if (last?.month === week.month) last.count += 1;
    else groups.push({ month: week.month, count: 1 });
    return groups;
}, []);
const isMonthEnd = (index) => milestoneWeeks[index + 1]?.month !== milestoneWeeks[index].month;
const toUtcDay = (value) => Date.parse(`${value}T00:00:00Z`);
const getScheduleBarGeometry = (item) => {
    const startDate = item.startDate || milestoneWeeks[item.startIndex]?.startDate;
    const endDate = item.endDate || milestoneWeeks[item.endIndex]?.endDate;
    const startIndex = Math.max(0, milestoneWeeks.findIndex((week) => startDate >= week.startDate && startDate <= week.endDate));
    const rawEndIndex = milestoneWeeks.findIndex((week) => endDate >= week.startDate && endDate <= week.endDate);
    const endIndex = rawEndIndex < 0 ? milestoneWeeks.length - 1 : rawEndIndex;
    const startWeek = milestoneWeeks[startIndex];
    const endWeek = milestoneWeeks[endIndex];
    const startFraction = Math.max(0, Math.min(1, (toUtcDay(startDate) - toUtcDay(startWeek.startDate)) / (toUtcDay(startWeek.endDate) - toUtcDay(startWeek.startDate) + 86400000)));
    const endFraction = Math.max(0, Math.min(1, (toUtcDay(endDate) - toUtcDay(endWeek.startDate) + 86400000) / (toUtcDay(endWeek.endDate) - toUtcDay(endWeek.startDate) + 86400000)));
    return { startIndex, endIndex, startOffset: startFraction * SCHEDULE_PERIOD_WIDTH, endInset: (1 - endFraction) * SCHEDULE_PERIOD_WIDTH };
};

const getAncestors = (item, itemMap) => {
    const ancestors = [];
    let parentKey = item.parentSourceKey;
    while (parentKey) {
        ancestors.push(parentKey);
        parentKey = itemMap.get(parentKey)?.parentSourceKey;
    }
    return ancestors;
};

const statusStyles = {
    not_started: 'border-[#505050]/60 bg-white/[0.04] text-[#86868B]',
    in_progress: 'border-[#2997ff]/35 bg-[#2997ff]/10 text-[#60a5fa]',
    completed: 'border-[#30d158]/35 bg-[#30d158]/10 text-[#4ade80]',
    delayed: 'border-[#ff453a]/35 bg-[#ff453a]/10 text-[#ff7169]',
    cancelled: 'border-[#8e8e93]/35 bg-[#8e8e93]/10 text-[#a1a1aa]',
};
const statusLabels = { not_started: '미착수', in_progress: '진행중', completed: '완료', delayed: '지연', cancelled: '중단' };
const initialMilestoneStage = () => {
    if (typeof window === 'undefined') return '전체';
    const candidate = new URLSearchParams(window.location.search).get('stage');
    return milestoneStages.some((stage) => stage.code === candidate) ? candidate : '전체';
};

const insertScheduleRow = (items, row) => {
    const normalizedRow = { ...row, itemType: 'task' };
    const siblingIndexes = items.reduce((indexes, item, index) => (
        item.parentSourceKey === normalizedRow.parentSourceKey ? [...indexes, index] : indexes
    ), []);
    const parentIndex = items.findIndex((item) => item.sourceKey === normalizedRow.parentSourceKey);
    const insertAt = siblingIndexes.length ? siblingIndexes.at(-1) + 1 : Math.max(0, parentIndex + 1);
    return [...items.slice(0, insertAt), normalizedRow, ...items.slice(insertAt)];
};

export default function SonghyeonDetailedSchedule() {
    const { user, member, isReadOnly } = useSonghyeonAuth();
    const actor = { userId: user?.id, email: user?.email, name: member?.staff_name || user?.email || '송현 BID TF' };
    const canManageScheduleLinks = !isReadOnly && Boolean(user?.id && member);
    const canManageScheduleRows = canManageScheduleLinks && member?.staff_name === '전기영' && user?.email?.toLowerCase() === 'jk.jeon@igisam.com';
    const [scheduleItems, setScheduleItems] = useState(songhyeonDetailedScheduleItems);
    const [tasks, setTasks] = useState([]);
    const [links, setLinks] = useState([]);
    const [busy, setBusy] = useState(false);
    const [workspaceError, setWorkspaceError] = useState('');
    const [selectedStage, setSelectedStage] = useState(initialMilestoneStage);
    const [selectedLead, setSelectedLead] = useState('전체');
    const [selectedState, setSelectedState] = useState('전체');
    const [metricFilter, setMetricFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [todayMarker, setTodayMarker] = useState(getSonghyeonTodayMarker);
    const [selectedItem, setSelectedItem] = useState(null);
    const [embeddedTask, setEmbeddedTask] = useState(null);
    const [rowEditor, setRowEditor] = useState(null);
    const scheduleScrollRef = useRef(null);
    const adminRailViewportRef = useRef(null);
    const adminRailRowsRef = useRef(null);
    const [expandedGroups, setExpandedGroups] = useState(new Set(scheduleItems.filter((item) => item.itemType !== 'task').map((item) => item.sourceKey)));
    const scheduleItemMap = useMemo(() => new Map(scheduleItems.map((item) => [item.sourceKey, item])), [scheduleItems]);

    const leads = useMemo(() => [...new Set(scheduleItems.map((item) => item.leadLabel))], [scheduleItems]);
    useEffect(() => {
        let active = true;
        loadScheduleWorkspace(songhyeonDetailedScheduleItems).then((workspace) => {
            if (!active) return;
            setScheduleItems(workspace.items);
            setTasks(workspace.tasks);
            setLinks(workspace.links);
        }).catch((error) => active && setWorkspaceError(error.message || '마일스톤 업무 원장을 불러오지 못했습니다.'));
        return () => { active = false; };
    }, []);
    useEffect(() => {
        const timerId = window.setInterval(() => setTodayMarker(getSonghyeonTodayMarker()), 60 * 60 * 1000);
        return () => window.clearInterval(timerId);
    }, []);
    useEffect(() => {
        if (!selectedItem) return undefined;
        const handleKeyDown = (event) => { if (event.key === 'Escape') setSelectedItem(null); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItem]);
    const matchedKeys = useMemo(() => {
        const keys = new Set();
        const query = searchTerm.trim().toLowerCase();
        scheduleItems.forEach((item) => {
            if (selectedStage !== '전체' && item.stage !== selectedStage) return;
            if (selectedLead !== '전체' && item.leadLabel !== selectedLead) return;
            if (selectedState !== '전체' && item.status !== selectedState) return;
            if (metricFilter === 'scheduled' && (item.itemType !== 'task' || !Number.isInteger(item.startIndex) || !Number.isInteger(item.endIndex))) return;
            if (metricFilter === 'delayed') return;
            if (metricFilter === 'in_progress' && (item.itemType !== 'task' || item.status !== 'in_progress')) return;
            if (metricFilter === 'milestones' && item.itemType !== 'lv1') return;
            if (query && !`${item.displayName} ${item.sourceText || ''} ${item.leadLabel} ${item.categoryMain}`.toLowerCase().includes(query)) return;
            keys.add(item.sourceKey);
            getAncestors(item, scheduleItemMap).forEach((ancestorKey) => keys.add(ancestorKey));
        });
        return keys;
    }, [metricFilter, scheduleItemMap, scheduleItems, searchTerm, selectedLead, selectedStage, selectedState]);

    const visibleItems = useMemo(() => scheduleItems.filter((item) => {
        if (!matchedKeys.has(item.sourceKey)) return false;
        const parent = item.parentSourceKey && scheduleItemMap.get(item.parentSourceKey);
        if (parent && !expandedGroups.has(parent.sourceKey)) return false;
        if (parent?.parentSourceKey && !expandedGroups.has(parent.parentSourceKey)) return false;
        return true;
    }), [expandedGroups, matchedKeys, scheduleItemMap, scheduleItems]);

    const syncAdminRailRows = useCallback(() => {
        const scrollElement = scheduleScrollRef.current;
        const railViewport = adminRailViewportRef.current;
        const railRows = adminRailRowsRef.current;
        if (!scrollElement || !railViewport || !railRows) return;

        const scheduleRows = new Map(Array.from(scrollElement.querySelectorAll('[data-schedule-row-source]')).map((row) => (
            [row.dataset.scheduleRowSource, row]
        )));
        const railTop = railViewport.getBoundingClientRect().top;

        railRows.querySelectorAll('[data-schedule-admin-source]').forEach((adminRow) => {
            const scheduleRow = scheduleRows.get(adminRow.dataset.scheduleAdminSource);
            if (!scheduleRow) {
                adminRow.style.visibility = 'hidden';
                return;
            }

            const rowBounds = scheduleRow.getBoundingClientRect();
            adminRow.style.visibility = 'visible';
            adminRow.style.height = `${rowBounds.height}px`;
            adminRow.style.transform = `translateY(${rowBounds.top - railTop}px)`;
        });
    }, []);

    useLayoutEffect(() => {
        const frameId = window.requestAnimationFrame(syncAdminRailRows);
        const scrollElement = scheduleScrollRef.current;
        const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(syncAdminRailRows);
        if (scrollElement && resizeObserver) {
            resizeObserver.observe(scrollElement);
            scrollElement.querySelectorAll('[data-schedule-row-source]').forEach((row) => resizeObserver.observe(row));
        }
        window.addEventListener('resize', syncAdminRailRows);
        return () => {
            window.cancelAnimationFrame(frameId);
            resizeObserver?.disconnect();
            window.removeEventListener('resize', syncAdminRailRows);
        };
    }, [canManageScheduleRows, syncAdminRailRows, visibleItems]);

    const toggleGroup = (sourceKey) => setExpandedGroups((current) => {
        const next = new Set(current);
        if (next.has(sourceKey)) next.delete(sourceKey);
        else next.add(sourceKey);
        return next;
    });

    const taskItems = scheduleItems.filter((item) => item.itemType === 'task');
    const statistics = {
        total: taskItems.length,
        scheduled: taskItems.filter((item) => Number.isInteger(item.startIndex) && Number.isInteger(item.endIndex)).length,
        inProgress: taskItems.filter((item) => item.status === 'in_progress').length,
        delayed: 0,
        milestones: scheduleItems.filter((item) => item.itemType === 'lv1').length,
    };
    const runMutation = async (operation) => {
        if (isReadOnly) return;
        setBusy(true);
        setWorkspaceError('');
        try { await operation(); }
        catch (error) { setWorkspaceError(error.message || '요청을 처리하지 못했습니다.'); }
        finally { setBusy(false); }
    };
    const openRowEditor = (mode, item, event) => {
        event?.stopPropagation();
        setWorkspaceError('');
        setRowEditor({ mode, item });
    };
    const handleSaveScheduleRow = async (input) => {
        if (!rowEditor || !canManageScheduleRows) return;
        setBusy(true);
        setWorkspaceError('');
        try {
            if (rowEditor.mode === 'create') {
                const created = await createScheduleRow(input, actor);
                setScheduleItems((current) => insertScheduleRow(current, created));
            } else {
                const updated = await updateScheduleRow(rowEditor.item.sourceKey, input, actor);
                setScheduleItems((current) => current.map((item) => item.sourceKey === updated.sourceKey ? { ...item, ...updated } : item));
                setSelectedItem((current) => current?.sourceKey === updated.sourceKey ? { ...current, ...updated } : current);
            }
            setRowEditor(null);
        } catch (error) {
            setWorkspaceError(error.message || '상세 일정을 저장하지 못했습니다.');
        } finally {
            setBusy(false);
        }
    };
    const handleDeleteScheduleRow = async () => {
        if (!canManageScheduleRows || rowEditor?.mode !== 'delete') return;
        const sourceKey = rowEditor.item.sourceKey;
        setBusy(true);
        setWorkspaceError('');
        try {
            await deleteScheduleRow(sourceKey, actor);
            setScheduleItems((current) => current.filter((item) => item.sourceKey !== sourceKey));
            setLinks((current) => current.filter((link) => link.scheduleSourceKey !== sourceKey));
            setSelectedItem((current) => current?.sourceKey === sourceKey ? null : current);
            setRowEditor(null);
        } catch (error) {
            setWorkspaceError(error.message || '상세 일정을 삭제하지 못했습니다.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <section className="relative w-[1200px] overflow-visible rounded-[32px] border border-[#3c3c3c] bg-[#272726]">
            <div className="rounded-t-[31px] border-b border-[#3c3c3c] bg-[#272726] px-5 py-4">
                <div className="flex items-center justify-between gap-5">
                    <div className="flex min-w-0 items-center gap-2.5">
                        <h2 className="shrink-0 text-[17px] font-bold text-[#E5E5E5]">송현 BID 통합 상세 일정</h2>
                        <span className="shrink-0 rounded-full border border-[#505050]/60 bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-[#86868B]">15주 기준 일정</span>
                        <p className="truncate text-[12px] text-[#86868B]">단계를 펼쳐 수행기간·산출물·Gate를 확인합니다.</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <SelectControl label="단계" value={selectedStage} onChange={setSelectedStage} options={[{ value: '전체', label: '단계 전체' }, ...milestoneStages.map((stage) => ({ value: stage.code, label: `${stage.code} ${stage.shortTitle}` }))]} />
                        <SelectControl label="실행주관" value={selectedLead} onChange={setSelectedLead} options={[{ value: '전체', label: '실행주관 전체' }, ...leads.map((value) => ({ value, label: value }))]} />
                        <SelectControl label="진행상태" value={selectedState} onChange={(value) => { setSelectedState(value); setMetricFilter(value === 'in_progress' ? 'in_progress' : 'all'); }} options={[{ value: '전체', label: '상태 전체' }, ...Object.entries(statusLabels).map(([value, label]) => ({ value, label }))]} />
                    </div>
                </div>

                <div className="mt-[10px] flex items-stretch gap-2">
                    {[
                        ['전체업무', statistics.total, '#E5E5E5', 'all'],
                        ['일정 지연', statistics.delayed, '#FF453A', 'delayed'],
                        ['진행중', statistics.inProgress, '#30d158', 'in_progress'],
                        ['마일스톤', statistics.milestones, '#F59E0B', 'milestones'],
                    ].map(([label, value, color, metricValue]) => (
                        <button
                            type="button"
                            key={label}
                            onClick={() => { setMetricFilter(metricValue); setSelectedState('전체'); }}
                            aria-pressed={metricFilter === metricValue}
                            className={`flex h-[46px] shrink-0 cursor-pointer items-center justify-between gap-1.5 rounded-[10px] border px-2.5 text-left transition-colors ${metricFilter === metricValue ? 'border-[#2997ff] bg-[#334155]' : 'border-[#333] bg-[#2c2c2b] hover:border-[#505050] hover:bg-[#30302f]'}`}
                            style={{ width: '112px' }}
                        >
                            <div className="text-[12px] font-bold text-[#86868B]">{label}</div>
                            <div className="text-[22px] font-bold" style={{ color }}>{value}</div>
                        </button>
                    ))}
                    <div className="relative h-[46px] min-w-[280px] flex-1">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[22px] font-bold text-[#86868B]">⌕</span>
                        <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} data-filter-active={searchTerm ? 'true' : undefined} placeholder="일정·업무·실행주관 검색" className={`h-full w-full rounded-[8px] border pl-10 pr-3 text-[13px] text-[#E5E5E5] outline-none placeholder:text-[#86868B] focus:border-[#2997ff] ${searchTerm ? 'border-[#2997ff] bg-[#334155] shadow-[0_0_0_1px_rgba(41,151,255,.12)]' : 'border-[#3c3c3c] bg-[#2c2c2b]'}`} />
                    </div>
                </div>
            </div>

            <div className="relative">
                <div
                    ref={scheduleScrollRef}
                    data-schedule-scroll
                    className="timeline-scrollbar max-h-[calc(100vh-250px)] w-full overflow-auto rounded-b-[31px]"
                    onScroll={syncAdminRailRows}
                >
                    <div data-schedule-center-content className="relative min-w-[1198px]" style={{ width: `${SCHEDULE_TABLE_WIDTH}px` }}>
                    {todayMarker && (
                        <div className="pointer-events-none sticky top-0 z-[40] -mb-[58px] h-[58px]">
                            <div className="absolute top-[4px] flex h-[22px] -translate-x-1/2 items-center whitespace-nowrap rounded-[5px] border border-[#fbbf24]/70 bg-[#F59E0B] px-2 text-[11px] font-black tracking-[-0.02em] text-[#1c1c1e]" style={{ left: `${todayMarker.left}px` }}>
                                {todayMarker.dateLabel}
                            </div>
                            <div aria-hidden="true" className="absolute top-[25px] h-[33px] -translate-x-1/2" style={{ left: `${todayMarker.left}px` }}>
                                <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#F59E0B]/80" />
                            </div>
                        </div>
                    )}
                    <table className="table-fixed border-collapse text-left" style={{ width: `${SCHEDULE_TABLE_WIDTH}px` }}>
                        <thead className="sticky top-0 z-20 bg-[#272726] shadow-[0_1px_0_#464646]">
                            <tr className="h-[30px] border-b border-[#3c3c3c] bg-[#272726]">
                                <th rowSpan={2} className="sticky left-0 z-30 w-[430px] min-w-[430px] bg-[#272726] px-4 text-[12px] font-bold text-[#86868B] shadow-[inset_-1px_0_0_#464646]">업무명 / 실행주관 / 기간</th>
                                {scheduleMonthGroups.map(({ month, count }) => <th key={month} colSpan={count} className="bg-[#272726] text-center text-[11px] font-bold text-[#bdbba7] shadow-[inset_-1px_0_0_#505050]">{month}월</th>)}
                            </tr>
                            <tr className="h-[28px] border-b border-[#3c3c3c] bg-[#272726]">
                                {milestoneWeeks.map((period, index) => (
                                    <th key={period.week} title={`${period.startDate} ~ ${period.endDate}`} className={`w-[48px] min-w-[48px] bg-[#272726] text-center text-[10px] font-bold text-[#86868B] ${isMonthEnd(index) ? 'shadow-[inset_-1px_0_0_#505050]' : 'shadow-[inset_-1px_0_0_#333]'}`}>{period.weekOfMonth}주</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {visibleItems.map((item) => {
                                const isMilestone = item.itemType === 'lv1';
                                const isWorkstream = item.itemType === 'lv2';
                                const isGroup = isMilestone || isWorkstream;
                                const isExpanded = expandedGroups.has(item.sourceKey);
                                const depth = isMilestone ? 0 : isWorkstream ? 1 : 2;
                                const bar = getScheduleBarGeometry(item);
                                return (
                                    <tr
                                        key={item.sourceKey}
                                        data-schedule-row-source={item.sourceKey}
                                        onClick={() => { if (item.itemType === 'task') setSelectedItem(item); }}
                                        data-task-link-source={item.itemType === 'task' ? item.sourceKey : undefined}
                                        data-task-key={item.itemType === 'task' ? item.sourceKey : undefined}
                                        className={`group h-[48px] border-b border-[#393939] ${item.itemType === 'task' ? 'cursor-pointer' : ''} ${isMilestone ? 'bg-[#2c3440] hover:bg-[#343e4d]' : isWorkstream ? 'bg-[#2d2d2c] hover:bg-[#363635]' : 'bg-[#272726] hover:bg-[#30302f]'}`}
                                    >
                                        <td className={`sticky left-0 z-10 h-[48px] w-[430px] min-w-[430px] px-3 shadow-[inset_-1px_0_0_#464646] ${isMilestone ? 'bg-[#2c3440] group-hover:bg-[#343e4d]' : isWorkstream ? 'bg-[#2d2d2c] group-hover:bg-[#363635]' : 'bg-[#272726] group-hover:bg-[#30302f]'}`}>
                                            <div className="flex h-[48px] items-center">
                                                <div className="flex min-w-0 flex-1 items-center gap-2" style={{ paddingLeft: `${depth * 18}px` }}>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex min-w-0 items-center gap-2">
                                                            {isGroup ? <button type="button" onClick={(event) => { event.stopPropagation(); toggleGroup(item.sourceKey); }} className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded text-[10px] text-[#86868B] hover:bg-white/10 hover:text-[#E5E5E5]">{isExpanded ? '▼' : '▶'}</button> : <span className="w-5 shrink-0 text-center font-mono text-[8px] text-[#86868B]">•</span>}
                                                            <span title={item.sourceText || item.displayName} className={`min-w-0 flex-1 truncate whitespace-nowrap pr-1 leading-[18px] ${isMilestone ? 'text-[14px] font-bold text-[#E5E5E5]' : isWorkstream ? 'text-[13px] font-bold text-[#d1d1cc]' : 'text-[13px] font-medium text-[#bdbba7] group-hover:text-white'}`}>{item.displayName}</span>
                                                        </div>
                                                        <div className="flex min-w-0 items-center gap-2 overflow-hidden pl-7">
                                                        <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-x-2 overflow-hidden whitespace-nowrap text-[10px] leading-[15px] text-[#86868B]"><span className="truncate">{item.leadLabel}</span><span className="truncate">{item.categoryMain}</span></div>
                                                        </div>
                                                    </div>
                                                    <span className={`inline-flex h-[22px] shrink-0 items-center justify-center rounded-full border px-2 text-[11px] font-bold leading-none ${statusStyles[item.status] || statusStyles.not_started}`}>{statusLabels[item.status] || '미착수'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        {milestoneWeeks.map((period, periodIndex) => {
                                            const inRange = periodIndex >= bar.startIndex && periodIndex <= bar.endIndex;
                                            const isStart = periodIndex === bar.startIndex;
                                            const isEnd = periodIndex === bar.endIndex;
                                            const isMilestoneMarker = item.itemType === 'lv1' && item.milestoneIndex === periodIndex;
                                            return (
                                                <td key={period.week} className={`relative h-[48px] w-[48px] min-w-[48px] ${isMonthEnd(periodIndex) ? 'shadow-[inset_-1px_0_0_#505050]' : 'shadow-[inset_-1px_0_0_#333]'}`}>
                                                    {inRange && <div className={`absolute top-1/2 h-[12px] -translate-y-1/2 ${isMilestone ? 'bg-[#5279a5]/55' : isWorkstream ? 'bg-[#5279a5]/35' : 'bg-[#2997ff]/70'} ${isStart ? 'rounded-l-full' : ''} ${isEnd ? 'rounded-r-full' : ''}`} style={{ left: isStart ? `${bar.startOffset}px` : 0, right: isEnd ? `${bar.endInset}px` : 0 }} />}
                                                    {isMilestoneMarker && <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[20px] font-black leading-none text-[#F59E0B]">◆</span>}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {todayMarker && (
                        <div aria-hidden="true" data-current-date={todayMarker.isoDate} className="pointer-events-none absolute bottom-0 top-[58px] z-[5] -translate-x-1/2" style={{ left: `${todayMarker.left}px` }}>
                            <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#F59E0B]/80" />
                        </div>
                    )}
                    </div>
                </div>
                {canManageScheduleRows ? (
                    <aside
                        data-schedule-admin-rail
                        data-outside-centered-content="true"
                        aria-label="상세 일정 관리"
                        className="absolute bottom-0 left-full top-0 ml-3 w-[112px] overflow-hidden rounded-[12px] border border-[#464646] bg-[#242423] shadow-[0_12px_30px_rgba(0,0,0,0.28)]"
                    >
                        <div className="relative z-20 flex h-[58px] items-center justify-center border-b border-[#464646] bg-[#272726] text-[12px] font-bold text-[#86868B]">관리</div>
                        <div ref={adminRailViewportRef} className="absolute bottom-0 left-0 right-0 top-[58px] overflow-hidden">
                            <div ref={adminRailRowsRef} data-schedule-admin-rows className="relative h-full">
                                {visibleItems.map((item) => {
                                    const isMilestone = item.itemType === 'lv1';
                                    const isWorkstream = item.itemType === 'lv2';
                                    return (
                                        <div
                                            key={`admin-${item.sourceKey}`}
                                            data-schedule-admin-source={item.sourceKey}
                                            className={`absolute left-0 right-0 top-0 flex items-center justify-center gap-1 border-b border-[#393939] px-2 ${isMilestone ? 'bg-[#2c3440]' : isWorkstream ? 'bg-[#2d2d2c]' : 'bg-[#272726]'}`}
                                        >
                                            {isWorkstream ? <button type="button" data-schedule-row-add onClick={(event) => openRowEditor('create', item, event)} className="h-7 cursor-pointer rounded-[6px] border border-[#36658d] bg-[#2997ff]/10 px-2 text-[12px] font-bold text-[#7cc0ff] hover:bg-[#2997ff]/20">+ 추가</button> : null}
                                            {item.itemType === 'task' ? <button type="button" data-schedule-row-edit onClick={(event) => openRowEditor('edit', item, event)} className="h-7 cursor-pointer rounded-[6px] border border-[#4a4a4a] px-2 text-[12px] font-bold text-[#a1a1aa] hover:border-[#6f9fc7] hover:text-[#b7d2e8]">수정</button> : null}
                                            {item.itemType === 'task' ? <button type="button" data-schedule-row-delete onClick={(event) => openRowEditor('delete', item, event)} className="h-7 cursor-pointer rounded-[6px] border border-[#5b4240] px-2 text-[12px] font-bold text-[#c99591] hover:border-[#8b4a45] hover:bg-[#ff453a]/10 hover:text-[#e4817b]">삭제</button> : null}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>
                ) : null}
            </div>
            {!visibleItems.length && <div className="flex h-[120px] items-center justify-center text-[13px] text-[#86868B]">조건에 맞는 일정이 없습니다.</div>}
            {selectedItem && <SonghyeonScheduleTaskLinkModal
                item={selectedItem}
                tasks={tasks}
                links={links}
                busy={busy}
                errorMessage={workspaceError}
                canManageLinks={canManageScheduleLinks}
                readOnly={!canManageScheduleLinks}
                onClose={() => setSelectedItem(null)}
                onOpenTask={(sourceKey) => { const task = tasks.find((entry) => entry.sourceKey === sourceKey); if (task) { setSelectedItem(null); setEmbeddedTask(task); } }}
                onLink={(taskSourceKey) => runMutation(async () => { const link = await linkScheduleTask(selectedItem.sourceKey, taskSourceKey, actor); setLinks((current) => [...current, link]); })}
                onUnlink={(linkId) => runMutation(async () => { await unlinkScheduleTask(linkId, actor); setLinks((current) => current.filter((entry) => entry.id !== linkId)); })}
            />}
            {rowEditor && <SonghyeonScheduleRowEditorModal
                key={`${rowEditor.mode}-${rowEditor.item.sourceKey}`}
                mode={rowEditor.mode}
                item={rowEditor.mode === 'create' ? null : rowEditor.item}
                parentItem={rowEditor.mode === 'create' ? rowEditor.item : scheduleItemMap.get(rowEditor.item.parentSourceKey)}
                busy={busy}
                errorMessage={workspaceError}
                onClose={() => { if (!busy) setRowEditor(null); }}
                onSave={handleSaveScheduleRow}
                onDelete={handleDeleteScheduleRow}
            />}
            {embeddedTask && <SonghyeonTaskDetailDrawer
                task={embeddedTask}
                onClose={() => setEmbeddedTask(null)}
                onSaved={(savedTask) => {
                    setTasks((current) => current.map((task) => task.sourceKey === savedTask.sourceKey ? savedTask : task));
                    setEmbeddedTask(savedTask);
                }}
            />}
        </section>
    );
}
