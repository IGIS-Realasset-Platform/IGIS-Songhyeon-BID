import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSonghyeonAuth } from '../../../context/SonghyeonAuthContext';
import { deleteTask, loadTasks } from '../../../lib/songhyeonTaskRepository';
import SonghyeonTaskDetailDrawer from './SonghyeonTaskDetailDrawer';
import SonghyeonTaskEditorModal from './SonghyeonTaskEditorModal';
import { songhyeonTaskCategories } from '../../../data/songhyeonTaskCategories';
import { SONGHYEON_GATE_STAGES } from '../../../data/songhyeonGateStages.js';

const ALL = '전체보기';

const asList = (value) => Array.isArray(value) ? value : String(value || '').split(/[;,]/).map((item) => item.trim()).filter(Boolean);
const unique = (rows, getter) => [...new Set(rows.flatMap((row) => asList(getter(row))).filter(Boolean))];

const TASK_GATES = SONGHYEON_GATE_STAGES;
const TASK_LEADS = ['기획추진실', '기획추진센터', '공간솔루션센터', '기업마케팅센터', '자산·운영 담당조직', '자산·현장 지원조직', '송현 BID TF', '총괄 운영파트너'];
const TASK_STATUSES = ['미착수', '진행중', '지연', '완료', '보류', '중단'];
const TASK_IMPORTANCE = ['핵심', '주요', '일반'];

const mergeOptions = (...groups) => [...new Set(groups.flat().filter(Boolean))];

function HeaderFilter({ label, value, onChange, options, width = 'max-w-[74px]', disabledLabel }) {
  return (
    <div className={`relative mx-auto inline-flex h-[22px] w-full ${width} cursor-pointer items-center justify-center overflow-visible rounded-[6px] border border-[#3c3c3c] bg-[#2c2c2b] px-1 align-middle transition-colors hover:border-[#4c4c4b] hover:bg-[#323231]`}>
      <span className={`shrink-0 whitespace-nowrap text-[10px] font-bold ${value === ALL ? 'text-[#86868B]' : 'text-[#2997ff]'}`}>{value === ALL ? label : value}</span>
      <span className="pointer-events-none ml-0.5 shrink-0 translate-y-[0.5px] select-none text-[8px] text-[#86868B]/70">▼</span>
      <select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className="absolute inset-0 h-full w-full opacity-0 cursor-pointer">
        {disabledLabel && <option disabled value="">[ {disabledLabel} ]</option>}
        <option value={ALL}>전체보기</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}

function EmptyBoardRow({ isAll, children, pulse = false }) {
  const hidden = isAll ? '' : 'hidden w-0 p-0';
  return <tr data-task-board-empty-row className="relative h-[160px]">
    <td className="relative w-[50px] min-w-[50px] max-w-[50px] bg-[#272726]"><div className={`pointer-events-none absolute left-0 top-0 z-10 flex h-[160px] items-center justify-center whitespace-nowrap text-[#86868B] ${pulse ? 'animate-pulse' : ''} ${isAll ? 'w-[2432px]' : 'w-[1200px]'}`}>{children}</div></td>
    <td className="w-[140px] min-w-[140px] max-w-[140px]" />
    <td className="w-[106px] min-w-[106px] max-w-[106px]" />
    <td className={`${hidden} ${isAll ? 'w-[90px] min-w-[90px] max-w-[90px]' : ''}`} />
    <td className={isAll ? 'w-[319px] min-w-[319px] max-w-[319px]' : 'w-[297px] min-w-[297px] max-w-[297px]'} />
    <td className={`${hidden} ${isAll ? 'w-[220px] min-w-[220px] max-w-[220px]' : ''}`} /><td className={`${hidden} ${isAll ? 'w-[220px] min-w-[220px] max-w-[220px]' : ''}`} /><td className={`${hidden} ${isAll ? 'w-[90px] min-w-[90px] max-w-[100px]' : ''}`} />
    <td className={`${hidden} ${isAll ? 'w-[70px] min-w-[70px] max-w-[70px]' : ''}`} /><td className="w-[70px] min-w-[70px] max-w-[70px]" /><td className={`${hidden} ${isAll ? 'w-[80px] min-w-[80px] max-w-[80px]' : ''}`} />
    <td className="w-[46px] min-w-[46px] max-w-[46px]" /><td className="w-[48px] min-w-[48px] max-w-[48px]" /><td className={`${hidden} ${isAll ? 'w-[200px] min-w-[200px] max-w-[200px]' : ''}`} />
    <td className="w-[56px] min-w-[56px] max-w-[56px]" /><td className="w-[56px] min-w-[56px] max-w-[56px]" /><td className={`${hidden} ${isAll ? 'w-[100px] min-w-[100px] max-w-[100px]' : ''}`} /><td className="w-[85px] min-w-[85px] max-w-[85px] border-l border-r border-[#3c3c3c]" />
  </tr>;
}

function ToggleGroup({ value, onChange, items, className = '' }) {
  return (
    <div className={`${className} flex shrink-0 self-center rounded-[10px] border border-[#3c3c3c] bg-[#1c1c1e]/60 p-0.5`}>
      {items.map(([itemValue, label]) => (
        <button key={itemValue} type="button" onClick={() => onChange(itemValue)} className={`cursor-pointer rounded-[8px] px-3 py-1.5 text-[12px] font-bold transition-all ${value === itemValue ? 'bg-[#3a3a3c] text-white shadow-sm' : 'bg-transparent text-[#86868B] hover:text-[#f5f5f7]'}`}>{label}</button>
      ))}
    </div>
  );
}

export default function SonghyeonTaskBoard({ showWorkspaceHeader = true }) {
  const { user, member } = useSonghyeonAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategoryMain, setSelectedCategoryMain] = useState(ALL);
  const [selectedGateStage, setSelectedGateStage] = useState(ALL);
  const [selectedLeadDept, setSelectedLeadDept] = useState(ALL);

  const [selectedIsBlocker, setSelectedIsBlocker] = useState(ALL);
  const [selectedNeedsDecision, setSelectedNeedsDecision] = useState(ALL);
  const [selectedStatus, setSelectedStatus] = useState(ALL);
  const [selectedImportanceLevel, setSelectedImportanceLevel] = useState(ALL);

  const [loading, setLoading] = useState(true);
  const [repositoryError, setRepositoryError] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const isAll = false;
  const actor = { userId: user?.id, email: user?.email, name: member?.staff_name || user?.email || '송현 BID TF' };

  const openTask = useCallback((task) => {
    setSelectedTask(task);
    const url = new URL(window.location.href);
    url.searchParams.set('task', task.sourceKey);
    window.history.replaceState({}, '', url);
  }, []);
  const closeTask = useCallback(() => {
    setSelectedTask(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('task');
    window.history.replaceState({}, '', `${url.pathname}${url.search}`);
  }, []);

  useEffect(() => {
    loadTasks().then((rows) => {
      setTasks(rows);
      const sourceKey = new URLSearchParams(window.location.search).get('task');
      const linked = rows.find((task) => task.sourceKey === sourceKey);
      if (linked) setSelectedTask(linked);
    }).catch((error) => setRepositoryError(error.message || '송현 Supabase 업무 원장을 불러오지 못했습니다.')).finally(() => setLoading(false));
  }, []);

  const options = useMemo(() => ({
    categories: mergeOptions(songhyeonTaskCategories, unique(tasks, (task) => task.categoryMain)),
    gates: mergeOptions(TASK_GATES, unique(tasks, (task) => task.gateStage || task.stage)),
    leads: mergeOptions(TASK_LEADS, unique(tasks, (task) => task.leadDept)),
    statuses: mergeOptions(TASK_STATUSES, unique(tasks, (task) => task.status)),
    importance: mergeOptions(TASK_IMPORTANCE, unique(tasks, (task) => task.importanceLevel)),

  }), [tasks]);

  const sortedAndFilteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const rows = tasks.filter((task) => {
      if (selectedCategoryMain !== ALL && task.categoryMain !== selectedCategoryMain) return false;
      if (selectedGateStage !== ALL && (task.gateStage || task.stage) !== selectedGateStage) return false;
      if (selectedLeadDept !== ALL && task.leadDept !== selectedLeadDept) return false;

      if (selectedIsBlocker !== ALL && task.isBlocker !== (selectedIsBlocker === 'Y (예)')) return false;
      if (selectedNeedsDecision !== ALL && task.needsDecision !== (selectedNeedsDecision === 'Y (예)')) return false;
      if (selectedStatus !== ALL && task.status !== selectedStatus) return false;
      if (selectedImportanceLevel !== ALL && task.importanceLevel !== selectedImportanceLevel) return false;

      if (!query) return true;
      return [task.taskName, task.assignee, task.leadDept, task.deliverables, task.sourceText, task.externalParty, ...asList(task.coopDepts)].join(' ').toLowerCase().includes(query);
    });
    return rows;
  }, [searchQuery, selectedCategoryMain, selectedGateStage, selectedImportanceLevel, selectedIsBlocker, selectedLeadDept, selectedNeedsDecision, selectedStatus, tasks]);

  const totalPages = Math.max(1, Math.ceil(sortedAndFilteredTasks.length / pageSize));
  const visiblePage = Math.min(currentPage, totalPages);
  const paginatedTasks = sortedAndFilteredTasks.slice((visiblePage - 1) * pageSize, visiblePage * pageSize);
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setRepositoryError('');
    try {
      await deleteTask(deleteTarget.sourceKey, actor);
      setTasks((current) => current.filter((task) => task.sourceKey !== deleteTarget.sourceKey));
      if (selectedTask?.sourceKey === deleteTarget.sourceKey) closeTask();
      setDeleteTarget(null);
    } catch (error) {
      setRepositoryError(error.message || '업무를 삭제하지 못했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full text-left text-white">
      {showWorkspaceHeader && (
        <header data-task-board-header className="mx-auto mb-[12px] flex h-[37px] w-[1200px] max-w-full items-end">
          <div className="flex w-full items-center gap-[16px]">
            <h1 className="font-['Inter'] text-[32px] font-bold leading-none tracking-tight text-white">통합업무보드</h1>
            <div className="relative ml-[10px] w-[280px] self-center">
              <input type="text" placeholder="업무명, 담당자, 부서, 산출물 검색..." value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1); }} className="w-full rounded-[10px] border border-[#3c3c3c] bg-[#1c1c1e]/60 py-1.5 pl-9 pr-8 text-[13px] text-white outline-none transition-all placeholder:text-[#86868B] focus:border-[#2997ff] focus:ring-1 focus:ring-[#2997ff]" />
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              {searchQuery && <button type="button" onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 flex h-[18px] w-[18px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/5 text-[11px] font-bold text-[#86868B] hover:bg-white/10 hover:text-white">✕</button>}
            </div>
            <ToggleGroup className="ml-auto" value={pageSize} onChange={(size) => { setPageSize(size); setCurrentPage(1); }} items={[[10, '10개씩 보기'], [20, '20개씩 보기']]} />
            <button type="button" onClick={() => setIsEditorOpen(true)} className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-[10px] border border-[#bdbba7]/30 bg-[#bdbba7]/10 px-4 py-1.5 text-[12px] font-bold text-[#bdbba7] transition-all hover:border-[#bdbba7] hover:bg-[#bdbba7]/20">+ 새 업무 추가</button>

          </div>
        </header>
      )}

      {repositoryError && <div role="alert" className="mb-3 rounded-[12px] border border-[#ff453a]/25 bg-[#ff453a]/10 px-4 py-3 text-[12px] leading-5 text-[#ff8a82]"><strong className="block text-[13px] text-[#ff453a]">Supabase 업무 원장 연결 필요</strong>{repositoryError}</div>}
      <div className={`mb-[10px] select-text overflow-hidden rounded-[24px] border border-[#3c3c3c] bg-[#272726] transition-[width,max-width] duration-300 ease-out ${isAll ? 'w-full max-w-full' : 'mx-auto w-[1200px] max-w-full'}`}>
        <div className="timeline-scrollbar w-full overflow-x-auto pb-1 pr-0">
          <div className="flex w-fit items-start transition-all duration-300 ease-out">
            <table className={`table-fixed border-collapse bg-[#272726] text-left transition-all duration-300 ease-out ${isAll ? 'w-[2432px] min-w-[2432px] max-w-[2432px]' : 'w-[1200px] min-w-[1200px] max-w-[1200px]'}`}>
              <thead><tr className="h-[46px] border-b border-[#3c3c3c] bg-transparent text-[13px] font-bold text-[#86868B]">
                <th className="sticky left-0 z-30 w-[50px] min-w-[50px] max-w-[50px] rounded-tl-[24px] bg-[#272726] pl-[10px] text-center">ID</th>
                <th className="sticky left-[50px] z-30 w-[140px] min-w-[140px] max-w-[140px] bg-[#272726] text-center"><HeaderFilter label="GATE 단계" value={selectedGateStage} onChange={setSelectedGateStage} options={options.gates} width="max-w-[132px]" /></th>
                <th className="sticky left-[190px] z-30 w-[106px] min-w-[106px] max-w-[106px] bg-[#272726] text-center"><HeaderFilter label="업무분류" value={selectedCategoryMain} onChange={setSelectedCategoryMain} options={options.categories} width="max-w-[96px]" /></th>
                <th className={`sticky left-[296px] z-30 bg-[#272726] transition-all duration-300 ease-out ${isAll ? 'w-[90px] min-w-[90px] max-w-[90px] pl-4 opacity-100' : 'hidden w-0 min-w-0 max-w-0 overflow-hidden p-0 opacity-0'}`}>세부섹터</th>
                <th className={`sticky z-30 bg-[#272726] pl-4 transition-all duration-300 ease-out ${isAll ? 'left-[386px] w-[319px] min-w-[319px] max-w-[319px]' : 'left-[296px] w-[297px] min-w-[297px] max-w-[297px]'}`}>업무명</th>
                <th className={`${isAll ? 'w-[220px] min-w-[220px] max-w-[220px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'}`}>업무목적 / PF·준공 영향</th>
                <th className={`${isAll ? 'w-[220px] min-w-[220px] max-w-[220px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'}`}>필요 산출물</th>
                <th className="w-[70px] min-w-[70px] max-w-[70px] text-center"><HeaderFilter label="실행주관" value={selectedLeadDept} onChange={setSelectedLeadDept} options={options.leads} width="max-w-[62px]" /></th>

                <th className={`${isAll ? 'w-[70px] min-w-[70px] max-w-[70px] opacity-100' : 'hidden w-0 p-0 opacity-0'} text-center`}>담당자</th>
                <th className="w-[70px] min-w-[70px] max-w-[70px] pl-2 text-center text-[11px]">외부상대방</th>
                <th className={`${isAll ? 'w-[80px] min-w-[80px] max-w-[80px] opacity-100' : 'hidden w-0 p-0 opacity-0'} text-center`}>지원필요</th>
                <th className="w-[46px] min-w-[46px] max-w-[46px] text-center"><HeaderFilter label="Block" value={selectedIsBlocker} onChange={setSelectedIsBlocker} options={['Y (예)', 'N (아니오)']} width="max-w-[42px]" /></th>
                <th className="w-[48px] min-w-[48px] max-w-[48px] text-center"><HeaderFilter label="결정필요" value={selectedNeedsDecision} onChange={setSelectedNeedsDecision} options={['Y (예)', 'N (아니오)']} width="max-w-[50px]" /></th>
                <th className={`${isAll ? 'w-[200px] min-w-[200px] max-w-[200px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'}`}>다음 액션</th>
                <th className="w-[56px] min-w-[56px] max-w-[56px] text-center"><HeaderFilter label="상태" value={selectedStatus} onChange={setSelectedStatus} options={options.statuses} width="max-w-[52px]" /></th>
                <th className="w-[56px] min-w-[56px] max-w-[56px] text-center"><HeaderFilter label="중요도" value={selectedImportanceLevel} onChange={setSelectedImportanceLevel} options={options.importance} width="max-w-[52px]" /></th>
                <th className={`${isAll ? 'w-[100px] min-w-[100px] max-w-[100px] opacity-100' : 'hidden w-0 p-0 opacity-0'} text-center`}>기한</th>
                <th className="w-[85px] min-w-[85px] max-w-[85px] border-l border-r border-[#3c3c3c] px-2 text-center">관리</th>
              </tr></thead>
              <tbody className="divide-y divide-[#3c3c3c] text-[13px] text-white">
                {!loading && !paginatedTasks.length && <EmptyBoardRow isAll={isAll}>조건에 맞는 통합 업무가 없습니다.</EmptyBoardRow>}
                {loading && <EmptyBoardRow isAll={isAll} pulse>원장 정보를 불러오는 중입니다...</EmptyBoardRow>}
                {paginatedTasks.map((task, index) => {
                  const selected = selectedTask?.sourceKey === task.sourceKey;
                  return <tr key={task.sourceKey} data-task-board-row data-task-key={task.sourceKey} onClick={() => openTask(task)} className={`group h-[50px] cursor-pointer transition-colors hover:bg-[#333]/50 ${selected ? 'bg-[#3c3c3a] hover:bg-[#3c3c3a]' : ''}`}>
                    <td className={`sticky left-0 z-10 w-[50px] min-w-[50px] max-w-[50px] truncate bg-[#272726] pl-[10px] text-center font-mono text-[11px] text-[#86868B] transition-colors group-hover:bg-[#2d2d2c] ${index === paginatedTasks.length - 1 ? 'rounded-bl-[24px]' : ''}`}>{task.displayId}</td>
                    <td className="sticky left-[50px] z-10 w-[140px] min-w-[140px] max-w-[140px] truncate bg-[#272726] px-2 text-center font-bold text-[#A1A1AA] group-hover:bg-[#2d2d2c]" title={task.gateStage || task.stage}>{task.gateStage || task.stage}</td>
                    <td className="sticky left-[190px] z-10 w-[106px] min-w-[106px] max-w-[106px] truncate bg-[#272726] text-center font-bold text-[#E5E5E5] group-hover:bg-[#2d2d2c]">{task.categoryMain}</td>
                    <td className={`sticky left-[296px] z-10 truncate bg-[#272726] text-[#A1A1AA] group-hover:bg-[#2d2d2c] ${isAll ? 'w-[90px] min-w-[90px] max-w-[90px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'}`}>{task.sectorDetail || task.stage}</td>
                    <td className={`sticky z-10 bg-[#272726] pl-4 font-bold text-[#bdbba7] group-hover:bg-[#2d2d2c] ${isAll ? 'left-[386px] w-[319px] min-w-[319px] max-w-[319px]' : 'left-[296px] w-[297px] min-w-[297px] max-w-[297px]'}`}><div className="truncate">{task.taskName}</div></td>
                    <td className={`${isAll ? 'w-[220px] min-w-[220px] max-w-[220px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'} truncate text-[#A1A1AA]`}>{task.taskPurpose || task.sourceText || '-'}</td>
                    <td className={`${isAll ? 'w-[220px] min-w-[220px] max-w-[220px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'} truncate text-[#A1A1AA]`}>{task.deliverables || '-'}</td>
                    <td className="w-[70px] min-w-[70px] max-w-[70px] overflow-hidden text-center"><span className="inline-flex h-[22px] max-w-full items-center justify-center truncate rounded-[6px] border border-[#3f3f46] bg-[#27272a] px-2 text-[11px] text-[#d4d4d8]">{task.leadDept || '-'}</span></td>

                    <td className={`${isAll ? 'w-[70px] min-w-[70px] max-w-[70px] opacity-100' : 'hidden w-0 p-0 opacity-0'} truncate text-center text-[#A1A1AA]`}>{task.assignee || '미정'}</td>
                    <td className="w-[70px] min-w-[70px] max-w-[70px] truncate px-2 text-center text-[#A1A1AA]">{task.externalParty || '-'}</td>
                    <td className={`${isAll ? 'w-[80px] min-w-[80px] max-w-[80px] opacity-100' : 'hidden w-0 p-0 opacity-0'} truncate text-center text-[#86868B]`}>{task.supportNeeded || '-'}</td>
                    <td className="w-[46px] min-w-[46px] max-w-[46px] text-center"><span className={`rounded px-2 py-0.5 text-[11px] font-bold ${task.isBlocker ? 'border border-red-500/20 bg-red-500/10 text-red-400' : 'text-gray-500'}`}>{task.isBlocker ? 'Y' : 'N'}</span></td>
                    <td className="w-[48px] min-w-[48px] max-w-[48px] text-center"><span className={`rounded px-2 py-0.5 text-[11px] font-bold ${task.needsDecision ? 'border border-amber-500/20 bg-amber-500/10 text-amber-400' : 'text-gray-500'}`}>{task.needsDecision ? 'Y' : 'N'}</span></td>
                    <td className={`${isAll ? 'w-[200px] min-w-[200px] max-w-[200px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'} truncate text-[#A1A1AA]`}>{task.nextAction || '-'}</td>
                    <td className="w-[56px] min-w-[56px] max-w-[56px] text-center"><span className={`rounded border px-2 py-0.5 text-[11px] font-bold ${task.status === '지연' ? 'border-red-500/20 bg-red-500/10 text-red-400' : 'border-gray-500/20 bg-gray-500/10 text-gray-400'}`}>{task.status}</span></td>
                    <td className="w-[56px] min-w-[56px] max-w-[56px] truncate text-center"><span className="rounded border border-[#86868B]/25 bg-[#86868B]/15 px-2 py-0.5 text-[11px] font-bold text-[#86868B]">{task.importanceLevel}</span></td>
                    <td className={`${isAll ? 'w-[100px] min-w-[100px] max-w-[100px] opacity-100' : 'hidden w-0 p-0 opacity-0'} truncate text-center font-mono text-[#A1A1AA]`}>{task.dueDate || '-'}</td>
                    <td className="w-[85px] min-w-[85px] max-w-[85px] border-l border-r border-[#3c3c3c] px-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button type="button" onClick={(event) => { event.stopPropagation(); openTask(task); }} className="cursor-pointer text-[11px] font-bold text-blue-400 hover:text-blue-300">수정</button>
                        <span className="select-none text-[#555]">|</span>
                        <button type="button" onClick={(event) => { event.stopPropagation(); setDeleteTarget(task); }} className="cursor-pointer text-[11px] font-bold text-red-400 hover:text-red-300">삭제</button>
                      </div>
                    </td>
                  </tr>;
                })}
              </tbody>
            </table>
            <div className="box-border flex w-[800px] shrink-0 self-stretch items-center justify-start px-8 pl-20"><div className="pointer-events-none w-full select-none whitespace-nowrap font-bold leading-[0.9] tracking-tighter text-white opacity-[0.04]" style={{ fontSize: 'clamp(45px, 8.5vw, 135px)' }}>Songhyeon BID<br />Execution<br />Team</div></div>
          </div>
        </div>
        {totalPages > 1 && <div className="flex h-[46px] w-full select-none items-center justify-center rounded-b-[24px] border-t border-[#3c3c3c]/50 bg-[#272726]"><div className="flex items-center gap-1"><button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] border border-[#3c3c3c] text-[#86868B] hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30">‹</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" key={page} onClick={() => setCurrentPage(page)} className={`h-7 w-7 cursor-pointer rounded-[6px] text-[12px] font-bold ${page === currentPage ? 'bg-[#bdbba7] text-black shadow-sm' : 'border border-transparent text-[#86868B] hover:border-[#3c3c3c] hover:bg-white/5 hover:text-white'}`}>{page}</button>)}<button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] border border-[#3c3c3c] text-[#86868B] hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30">›</button></div></div>}
      </div>
      {selectedTask && <SonghyeonTaskDetailDrawer task={selectedTask} onClose={closeTask} onSaved={(updated) => { setTasks((current) => current.map((task) => task.sourceKey === updated.sourceKey ? updated : task)); setSelectedTask(updated); }} />}
      {isEditorOpen && <SonghyeonTaskEditorModal onClose={() => setIsEditorOpen(false)} onCreated={(created) => { setTasks((current) => [...current, created]); setIsEditorOpen(false); openTask(created); }} />}
      {deleteTarget && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70" onMouseDown={(event) => { if (event.target === event.currentTarget && !deleting) setDeleteTarget(null); }}>
          <div role="alertdialog" aria-modal="true" aria-labelledby="task-delete-title" className="w-[420px] overflow-hidden rounded-[16px] border border-[#3c3c3c] bg-[#272726] text-left">
            <div className="border-b border-[#3c3c3c] px-5 py-4">
              <h2 id="task-delete-title" className="text-[16px] font-bold text-[#E5E5E5]">정말 삭제하시겠습니까?</h2>
              <p className="mt-2 text-[12px] leading-5 text-[#86868B]">연결된 댓글과 변경이력도 함께 삭제되며 되돌릴 수 없습니다.</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[11px] font-bold text-[#686868]">삭제 대상</p>
              <p className="mt-2 text-[14px] font-bold leading-6 text-[#E5E5E5]">{deleteTarget.taskName}</p>
            </div>
            <div className="flex justify-end gap-2 border-t border-[#3c3c3c] px-5 py-3">
              <button type="button" disabled={deleting} onClick={() => setDeleteTarget(null)} className="cursor-pointer rounded-[8px] border border-[#3c3c3c] px-4 py-2 text-[12px] font-bold text-[#bbb9af] hover:bg-[#30302F] disabled:cursor-not-allowed disabled:opacity-50">취소</button>
              <button type="button" disabled={deleting} onClick={confirmDelete} className="cursor-pointer rounded-[8px] border border-red-500/35 bg-red-500/10 px-4 py-2 text-[12px] font-bold text-red-400 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50">{deleting ? '삭제 중...' : '삭제'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
