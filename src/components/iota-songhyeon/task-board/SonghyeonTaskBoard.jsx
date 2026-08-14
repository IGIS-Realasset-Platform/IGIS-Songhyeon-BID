import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSonghyeonAuth } from '../../../context/SonghyeonAuthContext';
import {
  archiveTask,
  loadTaskDiscussionUnreadSourceKeys,
  loadTasks,
  markTaskDiscussionRead,
  subscribeToTaskDiscussionUnread,
  subscribeToTasks,
} from '../../../lib/songhyeonTaskRepository';
import SonghyeonTaskDetailDrawer from './SonghyeonTaskDetailDrawer';
import SonghyeonTaskEditorModal from './SonghyeonTaskEditorModal';
import SonghyeonTaskWorkflowModal from './SonghyeonTaskWorkflowModal';
import { songhyeonTaskCategories } from '../../../data/songhyeonTaskCategories';
import { SONGHYEON_GATE_STAGES } from '../../../data/songhyeonGateStages.js';
import { SONGHYEON_TASK_IMPORTANCE_LEVELS } from '../../../data/songhyeonTaskImportance.js';
import { activeSonghyeonTaskLeads } from '../../../data/songhyeonTaskLeads.js';
import { SONGHYEON_TASK_STATUSES } from '../../../data/songhyeonTaskStatuses.js';
import { WorkspacePageHeader } from '../../workspace/WorkspacePageLayout.jsx';
import { importanceBadgeClass } from './songhyeonTaskBadgeClasses.js';

const ALL = '전체보기';

const asList = (value) => Array.isArray(value) ? value : String(value || '').split(/[;,]/).map((item) => item.trim()).filter(Boolean);
const unique = (rows, getter) => [...new Set(rows.flatMap((row) => asList(getter(row))).filter(Boolean))];

const TASK_GATES = SONGHYEON_GATE_STAGES;
const TASK_STATUSES = SONGHYEON_TASK_STATUSES;
const TASK_IMPORTANCE = SONGHYEON_TASK_IMPORTANCE_LEVELS;
const PINNED_TASK_CATEGORY = '자료전수조사';
const LARGE_SCREEN_TABLE_RATIO = 0.6;
const LAPTOP_REFERENCE_VIEWPORT_HEIGHT = 900;
const TABLE_BOTTOM_GUTTER = 24;
const DEFAULT_TABLE_TOP = 78;
const TABLE_HEADER_HEIGHT = 46;
const TABLE_ROW_HEIGHT = 50;
const TABLE_PAGINATION_HEIGHT = 46;
const MIN_AUTO_PAGE_SIZE = 8;

const autoPageSizeForViewport = (viewportHeight, tableTop, fillLaptopViewport) => {
  const largeScreenTargetHeight = viewportHeight * LARGE_SCREEN_TABLE_RATIO;
  const laptopViewportHeight = Math.min(viewportHeight, LAPTOP_REFERENCE_VIEWPORT_HEIGHT);
  const laptopFillTargetHeight = fillLaptopViewport
    ? Math.max(0, laptopViewportHeight - tableTop - TABLE_BOTTOM_GUTTER)
    : 0;
  const targetTableHeight = Math.max(largeScreenTargetHeight, laptopFillTargetHeight);
  const availableRowsHeight = Math.max(0, targetTableHeight - TABLE_HEADER_HEIGHT - TABLE_PAGINATION_HEIGHT);
  const calculatedRows = Math.floor(availableRowsHeight / TABLE_ROW_HEIGHT);
  return Math.max(MIN_AUTO_PAGE_SIZE, calculatedRows);
};
const currentViewportHeight = () => typeof window === 'undefined' ? 900 : window.innerHeight;

const mergeOptions = (...groups) => [...new Set(groups.flat().filter(Boolean))];
const STATUS_BADGE_CLASSES = {
  '미착수': 'border border-[#636366]/[0.22] bg-[#636366]/[0.055] text-[#9c9ca1]',
  '진행중': 'border border-[#4f8fca]/[0.22] bg-[#4f8fca]/[0.055] text-[#71a8d6]',
  '완료': 'border border-[#4da566]/[0.22] bg-[#4da566]/[0.055] text-[#73bc84]',
  '중단': 'border border-[#bd5f5a]/[0.22] bg-[#bd5f5a]/[0.055] text-[#d47670]',
};
const LEAD_BADGE_CLASSES = {
  '공간솔루션센터': 'border border-[#4f8fca]/[0.22] bg-[#4f8fca]/[0.055] text-[#73a8d6]',
  '기획추진센터': 'border border-[#9270a6]/[0.22] bg-[#9270a6]/[0.055] text-[#ae87c3]',
  '이지스 AM': 'border border-[#5793a6]/[0.22] bg-[#5793a6]/[0.055] text-[#78b3c5]',
  '자산·운영 담당조직': 'border border-[#568f62]/[0.22] bg-[#568f62]/[0.055] text-[#78b284]',
  'TF 공동': 'border border-[#a97d47]/[0.22] bg-[#a97d47]/[0.055] text-[#c59b60]',
  'TF 리드': 'border border-[#a95e6e]/[0.22] bg-[#a95e6e]/[0.055] text-[#c57484]',
};
const statusBadgeClass = (value) => STATUS_BADGE_CLASSES[value] || 'border border-[#636366]/[0.22] bg-[#636366]/[0.055] text-[#97979c]';
const leadBadgeClass = (value) => LEAD_BADGE_CLASSES[value] || 'border border-[#636366]/[0.22] bg-[#636366]/[0.055] text-[#97979c]';

const formatTaskDueDate = (value) => {
  const raw = String(value || '').trim();
  const match = raw.match(/^(\d{4})[-./](\d{1,2})[-./](\d{1,2})/);
  if (!match) return raw || '-';
  return `${match[1].slice(-2)}.${match[2].padStart(2, '0')}.${match[3].padStart(2, '0')}`;
};

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
    <td className="w-[102px] min-w-[102px] max-w-[102px]" />
    <td className="w-[106px] min-w-[106px] max-w-[106px]" />
    <td className={`${hidden} ${isAll ? 'w-[90px] min-w-[90px] max-w-[90px]' : ''}`} />
    <td className={isAll ? 'w-[347px] min-w-[347px] max-w-[347px]' : 'w-[325px] min-w-[325px] max-w-[325px]'} />
    <td className={`${hidden} ${isAll ? 'w-[220px] min-w-[220px] max-w-[220px]' : ''}`} /><td className={`${hidden} ${isAll ? 'w-[220px] min-w-[220px] max-w-[220px]' : ''}`} />
    <td className="w-[74px] min-w-[74px] max-w-[74px]" /><td className="w-[70px] min-w-[70px] max-w-[70px]" /><td className={`${hidden} ${isAll ? 'w-[70px] min-w-[70px] max-w-[70px]' : ''}`} /><td className="w-[70px] min-w-[70px] max-w-[70px]" /><td className={`${hidden} ${isAll ? 'w-[80px] min-w-[80px] max-w-[80px]' : ''}`} />
    <td className="w-[46px] min-w-[46px] max-w-[46px]" /><td className="w-[48px] min-w-[48px] max-w-[48px]" /><td className={`${hidden} ${isAll ? 'w-[200px] min-w-[200px] max-w-[200px]' : ''}`} />
    <td className="w-[56px] min-w-[56px] max-w-[56px]" /><td className="w-[56px] min-w-[56px] max-w-[56px]" /><td className="w-[71px] min-w-[71px] max-w-[71px] border-l border-r border-[#3c3c3c]" />
  </tr>;
}

export default function SonghyeonTaskBoard({ showWorkspaceHeader = true }) {
  const { user, member, isReadOnly } = useSonghyeonAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [unreadTaskSourceKeys, setUnreadTaskSourceKeys] = useState(() => new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const [viewportHeight, setViewportHeight] = useState(currentViewportHeight);
  const [tableTop, setTableTop] = useState(DEFAULT_TABLE_TOP);
  const [currentPage, setCurrentPage] = useState(1);
  const tableViewportRef = useRef(null);
  const pageSize = autoPageSizeForViewport(viewportHeight, tableTop, showWorkspaceHeader);
  const previousPageSizeRef = useRef(pageSize);

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
  const [workflowTask, setWorkflowTask] = useState(null);
  const [archiveTarget, setArchiveTarget] = useState(null);
  const [archiveReason, setArchiveReason] = useState('');
  const [archiving, setArchiving] = useState(false);
  const isAll = false;
  const actor = useMemo(() => ({
    userId: user?.id,
    email: user?.email,
    name: member?.staff_name || user?.email || '송현 BID TF',
  }), [member?.staff_name, user?.email, user?.id]);
  const canCreateAndArchive = !isReadOnly && member?.staff_name === '전기영' && user?.email?.toLowerCase() === 'jk.jeon@igisam.com';

  const openTask = useCallback((task) => {
    setSelectedTask(task);
    setUnreadTaskSourceKeys((current) => {
      if (!current.has(task.sourceKey)) return current;
      const next = new Set(current);
      next.delete(task.sourceKey);
      return next;
    });
    if (actor.userId) {
      void markTaskDiscussionRead(task.sourceKey, actor).catch((error) => {
        setRepositoryError(error.message || '새 댓글 읽음 상태를 저장하지 못했습니다.');
        void loadTaskDiscussionUnreadSourceKeys(user?.id).then(setUnreadTaskSourceKeys).catch(() => {});
      });
    }
    const url = new URL(window.location.href);
    url.searchParams.set('task', task.sourceKey);
    window.history.replaceState({}, '', url);
  }, [actor, user?.id]);
  const closeTask = useCallback(() => {
    setSelectedTask(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('task');
    window.history.replaceState({}, '', `${url.pathname}${url.search}`);
  }, []);

  useEffect(() => {
    let active = true;
    const unreadSourceKeysRequest = actor.userId ? loadTaskDiscussionUnreadSourceKeys(user?.id).catch((error) => {
      if (active) setRepositoryError(error.message || '새 업무 댓글을 확인하지 못했습니다.');
      return new Set();
    }) : Promise.resolve(new Set());
    Promise.all([loadTasks(), unreadSourceKeysRequest]).then(([rows, unreadSourceKeys]) => {
      if (!active) return;
      setTasks(rows);
      setUnreadTaskSourceKeys(unreadSourceKeys);
      const sourceKey = new URLSearchParams(window.location.search).get('task');
      const linked = rows.find((task) => task.sourceKey === sourceKey);
      if (linked) openTask(linked);
    }).catch((error) => {
      if (active) setRepositoryError(error.message || '송현 Supabase 업무 원장을 불러오지 못했습니다.');
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [actor.userId, openTask, user?.id]);

  useEffect(() => {
    if (!actor.userId) return undefined;
    return subscribeToTaskDiscussionUnread(user?.id, ({ sourceKey, authorId }) => {
      if (authorId === user?.id) return;
      if (selectedTask?.sourceKey === sourceKey) {
        void markTaskDiscussionRead(sourceKey, actor).catch(() => {});
        return;
      }
      setUnreadTaskSourceKeys((current) => new Set(current).add(sourceKey));
    });
  }, [actor, selectedTask?.sourceKey, user?.id]);

  useEffect(() => {
    if (!actor.userId) return undefined;
    return subscribeToTasks(user?.id, (change) => {
      if (change.type === 'remove') {
        setTasks((current) => current.filter((task) => task.sourceKey !== change.sourceKey));
        setSelectedTask((current) => current?.sourceKey === change.sourceKey ? null : current);
        return;
      }
      setTasks((current) => {
        const exists = current.some((task) => task.sourceKey === change.task.sourceKey);
        const next = exists
          ? current.map((task) => task.sourceKey === change.task.sourceKey ? change.task : task)
          : [...current, change.task];
        return next.toSorted((a, b) => (a.displayOrder ?? Number.MAX_SAFE_INTEGER) - (b.displayOrder ?? Number.MAX_SAFE_INTEGER));
      });
      setSelectedTask((current) => current?.sourceKey === change.task.sourceKey ? change.task : current);
    });
  }, [actor.userId, user?.id]);

  useEffect(() => {
    if (!archiveTarget) return undefined;
    const closeArchiveOnEscape = (event) => {
      if (event.key !== 'Escape' || archiving) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      setArchiveTarget(null);
      setArchiveReason('');
    };
    window.addEventListener('keydown', closeArchiveOnEscape, true);
    return () => window.removeEventListener('keydown', closeArchiveOnEscape, true);
  }, [archiveTarget, archiving]);

  useEffect(() => {
    const updateViewportMetrics = () => {
      setViewportHeight(window.innerHeight);
      if (showWorkspaceHeader && tableViewportRef.current) {
        setTableTop(Math.max(0, Math.round(tableViewportRef.current.getBoundingClientRect().top)));
      }
    };
    updateViewportMetrics();
    window.addEventListener('resize', updateViewportMetrics);
    return () => window.removeEventListener('resize', updateViewportMetrics);
  }, [repositoryError, showWorkspaceHeader]);

  useEffect(() => {
    const previousPageSize = previousPageSizeRef.current;
    if (previousPageSize === pageSize) return;
    setCurrentPage((page) => Math.floor(((page - 1) * previousPageSize) / pageSize) + 1);
    previousPageSizeRef.current = pageSize;
  }, [pageSize]);

  const options = useMemo(() => ({
    categories: songhyeonTaskCategories,
    gates: mergeOptions(TASK_GATES, unique(tasks, (task) => task.gateStage || task.stage)),
    leads: activeSonghyeonTaskLeads(tasks),
    statuses: TASK_STATUSES,
    importance: TASK_IMPORTANCE,

  }), [tasks]);

  useEffect(() => {
    if (selectedCategoryMain !== ALL && !songhyeonTaskCategories.includes(selectedCategoryMain)) setSelectedCategoryMain(ALL);
  }, [selectedCategoryMain]);

  useEffect(() => {
    if (selectedImportanceLevel !== ALL && !TASK_IMPORTANCE.includes(selectedImportanceLevel)) setSelectedImportanceLevel(ALL);
  }, [selectedImportanceLevel]);

  useEffect(() => {
    if (selectedLeadDept !== ALL && !options.leads.includes(selectedLeadDept)) setSelectedLeadDept(ALL);
  }, [options.leads, selectedLeadDept]);

  useEffect(() => {
    if (selectedStatus !== ALL && !TASK_STATUSES.includes(selectedStatus)) setSelectedStatus(ALL);
  }, [selectedStatus]);

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
    return [
      ...rows.filter((task) => task.categoryMain === PINNED_TASK_CATEGORY),
      ...rows.filter((task) => task.categoryMain !== PINNED_TASK_CATEGORY),
    ];
  }, [searchQuery, selectedCategoryMain, selectedGateStage, selectedImportanceLevel, selectedIsBlocker, selectedLeadDept, selectedNeedsDecision, selectedStatus, tasks]);

  const totalPages = Math.max(1, Math.ceil(sortedAndFilteredTasks.length / pageSize));
  const visiblePage = Math.min(currentPage, totalPages);
  const paginatedTasks = sortedAndFilteredTasks.slice((visiblePage - 1) * pageSize, visiblePage * pageSize);
  useEffect(() => {
    setCurrentPage((page) => Math.min(Math.max(page, 1), totalPages));
  }, [totalPages]);
  const replaceTask = useCallback((updated) => {
    setTasks((current) => current.map((task) => task.sourceKey === updated.sourceKey ? updated : task));
    setSelectedTask((current) => current?.sourceKey === updated.sourceKey ? updated : current);
  }, []);
  const requestArchive = useCallback((task) => {
    setArchiveTarget(task);
    setArchiveReason('');
  }, []);
  const confirmArchive = async () => {
    const reason = archiveReason.trim();
    if (!archiveTarget || !reason || !canCreateAndArchive) return;
    setArchiving(true);
    setRepositoryError('');
    try {
      await archiveTask(archiveTarget.sourceKey, { reason }, actor);
      setTasks((current) => current.filter((task) => task.sourceKey !== archiveTarget.sourceKey));
      if (selectedTask?.sourceKey === archiveTarget.sourceKey) closeTask();
      setArchiveTarget(null);
      setArchiveReason('');
    } catch (error) {
      setRepositoryError(error.message || '업무를 보관하지 못했습니다.');
    } finally {
      setArchiving(false);
    }
  };

  return (
    <div className="w-full text-left text-white">
      {showWorkspaceHeader && (
        <WorkspacePageHeader
          data-task-board-header
          title="통합업무보드"
          controls={(
            <div className="relative ml-[10px] w-[280px] self-center">
              <input type="text" placeholder="업무명, 담당자, 부서, 산출물 검색..." value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1); }} className="w-full rounded-[10px] border border-[#3c3c3c] bg-[#1c1c1e]/60 py-1.5 pl-9 pr-8 text-[13px] text-white outline-none transition-all placeholder:text-[#86868B] focus:border-[#2997ff] focus:ring-1 focus:ring-[#2997ff]" />
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              {searchQuery && <button type="button" onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 flex h-[18px] w-[18px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/5 text-[11px] font-bold text-[#86868B] hover:bg-white/10 hover:text-white">✕</button>}
            </div>
          )}
          actions={canCreateAndArchive ? <button type="button" onClick={() => setIsEditorOpen(true)} className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-[10px] border border-[#bdbba7]/30 bg-[#bdbba7]/10 px-4 py-1.5 text-[12px] font-bold text-[#bdbba7] transition-all hover:border-[#bdbba7] hover:bg-[#bdbba7]/20">+ 새 업무 추가</button> : null}
        />
      )}

      {repositoryError && <div role="alert" className="mb-3 rounded-[12px] border border-[#ff453a]/25 bg-[#ff453a]/10 px-4 py-3 text-[12px] leading-5 text-[#ff8a82]"><strong className="block text-[13px] text-[#ff453a]">Supabase 업무 원장 연결 필요</strong>{repositoryError}</div>}
      <div ref={tableViewportRef} className={`mb-[10px] select-text overflow-hidden rounded-[24px] border border-[#3c3c3c] bg-[#272726] transition-[width,max-width] duration-300 ease-out ${isAll ? 'w-full max-w-full' : 'mx-auto w-[1200px] max-w-full'}`}>
        <div className="timeline-scrollbar w-full overflow-x-auto pb-1 pr-0">
          <div className="flex w-fit items-start transition-all duration-300 ease-out">
            <table className={`table-fixed border-collapse bg-[#272726] text-left transition-all duration-300 ease-out ${isAll ? 'w-[2432px] min-w-[2432px] max-w-[2432px]' : 'w-[1200px] min-w-[1200px] max-w-[1200px]'}`}>
              <thead><tr className="h-[46px] border-b border-[#3c3c3c] bg-transparent text-[13px] font-bold text-[#86868B]">
                <th className="sticky left-0 z-30 w-[50px] min-w-[50px] max-w-[50px] rounded-tl-[24px] bg-[#272726] pl-[10px] text-center">ID</th>
                <th className="sticky left-[50px] z-30 w-[102px] min-w-[102px] max-w-[102px] bg-[#272726] text-center"><HeaderFilter label="GATE 단계" value={selectedGateStage} onChange={setSelectedGateStage} options={options.gates} width="max-w-[94px]" /></th>
                <th className="sticky left-[152px] z-30 w-[106px] min-w-[106px] max-w-[106px] bg-[#272726] text-center"><HeaderFilter label="업무분류" value={selectedCategoryMain} onChange={setSelectedCategoryMain} options={options.categories} width="max-w-[96px]" /></th>
                <th className={`sticky left-[258px] z-30 bg-[#272726] transition-all duration-300 ease-out ${isAll ? 'w-[90px] min-w-[90px] max-w-[90px] pl-4 opacity-100' : 'hidden w-0 min-w-0 max-w-0 overflow-hidden p-0 opacity-0'}`}>세부섹터</th>
                <th className={`sticky z-30 bg-[#272726] pl-4 transition-all duration-300 ease-out ${isAll ? 'left-[348px] w-[347px] min-w-[347px] max-w-[347px]' : 'left-[258px] w-[325px] min-w-[325px] max-w-[325px]'}`}>업무명</th>
                <th className={`${isAll ? 'w-[220px] min-w-[220px] max-w-[220px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'}`}>업무목적 / PF·준공 영향</th>
                <th className={`${isAll ? 'w-[220px] min-w-[220px] max-w-[220px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'}`}>필요 산출물</th>
                <th className="w-[74px] min-w-[74px] max-w-[74px] text-center text-[11px]">마감기한</th>
                <th className="w-[70px] min-w-[70px] max-w-[70px] text-center"><HeaderFilter label="실행주관" value={selectedLeadDept} onChange={setSelectedLeadDept} options={options.leads} width="max-w-[62px]" /></th>

                <th className={`${isAll ? 'w-[70px] min-w-[70px] max-w-[70px] opacity-100' : 'hidden w-0 p-0 opacity-0'} text-center`}>담당자</th>
                <th className="w-[70px] min-w-[70px] max-w-[70px] pl-2 text-center text-[11px]">외부상대방</th>
                <th className={`${isAll ? 'w-[80px] min-w-[80px] max-w-[80px] opacity-100' : 'hidden w-0 p-0 opacity-0'} text-center`}>지원필요</th>
                <th className="w-[46px] min-w-[46px] max-w-[46px] text-center"><HeaderFilter label="Block" value={selectedIsBlocker} onChange={setSelectedIsBlocker} options={['Y (예)', 'N (아니오)']} width="max-w-[42px]" /></th>
                <th className="w-[48px] min-w-[48px] max-w-[48px] text-center"><HeaderFilter label="결정필요" value={selectedNeedsDecision} onChange={setSelectedNeedsDecision} options={['Y (예)', 'N (아니오)']} width="max-w-[50px]" /></th>
                <th className={`${isAll ? 'w-[200px] min-w-[200px] max-w-[200px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'}`}>다음 액션</th>
                <th className="w-[56px] min-w-[56px] max-w-[56px] text-center"><HeaderFilter label="상태" value={selectedStatus} onChange={setSelectedStatus} options={options.statuses} width="max-w-[52px]" /></th>
                <th className="w-[56px] min-w-[56px] max-w-[56px] text-center"><HeaderFilter label="중요도" value={selectedImportanceLevel} onChange={setSelectedImportanceLevel} options={options.importance} width="max-w-[52px]" /></th>
                <th className="w-[71px] min-w-[71px] max-w-[71px] border-l border-r border-[#3c3c3c] px-1 text-center">관리</th>
              </tr></thead>
              <tbody className="divide-y divide-[#3c3c3c] text-[13px] text-white">
                {!loading && !paginatedTasks.length && <EmptyBoardRow isAll={isAll}>조건에 맞는 통합 업무가 없습니다.</EmptyBoardRow>}
                {loading && <EmptyBoardRow isAll={isAll} pulse>원장 정보를 불러오는 중입니다...</EmptyBoardRow>}
                {paginatedTasks.map((task, index) => {
                  const selected = selectedTask?.sourceKey === task.sourceKey;
                  return <tr key={task.sourceKey} data-task-board-row data-task-key={task.sourceKey} aria-selected={selected} onClick={() => openTask(task)} className={`group h-[50px] cursor-pointer transition-colors [&>td]:bg-inherit ${selected ? 'bg-[#3c3c3a] hover:bg-[#3c3c3a]' : 'bg-[#272726] hover:bg-[#2d2d2c]'}`}>
                    <td className={`sticky left-0 z-10 w-[50px] min-w-[50px] max-w-[50px] truncate pl-[10px] text-center font-mono text-[11px] text-[#86868B] ${index === paginatedTasks.length - 1 ? 'rounded-bl-[24px]' : ''}`}>{task.displayId}</td>
                    <td className="sticky left-[50px] z-10 w-[102px] min-w-[102px] max-w-[102px] truncate px-2 text-center font-bold text-[#A1A1AA]" title={task.gateStage || task.stage}>{task.gateStage || task.stage}</td>
                    <td className="sticky left-[152px] z-10 w-[106px] min-w-[106px] max-w-[106px] truncate text-center font-bold text-[#E5E5E5]">{task.categoryMain}</td>
                    <td className={`sticky left-[258px] z-10 truncate text-[#A1A1AA] ${isAll ? 'w-[90px] min-w-[90px] max-w-[90px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'}`}>{task.sectorDetail || task.stage}</td>
                    <td className={`sticky z-10 pl-4 font-bold text-[#bdbba7] ${isAll ? 'left-[348px] w-[347px] min-w-[347px] max-w-[347px]' : 'left-[258px] w-[325px] min-w-[325px] max-w-[325px]'}`}><div className="flex w-full min-w-0 items-center gap-[6px]"><span className="min-w-0 truncate">{task.taskName}</span>{unreadTaskSourceKeys.has(task.sourceKey) && <span aria-label="새 댓글" title="새 댓글이 있습니다" className="shrink-0 inline-flex items-center justify-center px-[4px] py-[2px] rounded-[3px] text-[10px] font-black bg-[#ff3b30] text-white leading-none tracking-wider relative top-[1px]">N</span>}</div></td>
                    <td className={`${isAll ? 'w-[220px] min-w-[220px] max-w-[220px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'} truncate text-[#A1A1AA]`}>{task.taskPurpose || task.sourceText || '-'}</td>
                    <td className={`${isAll ? 'w-[220px] min-w-[220px] max-w-[220px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'} truncate text-[#A1A1AA]`}>{task.deliverables || '-'}</td>
                    <td className="w-[74px] min-w-[74px] max-w-[74px] truncate text-center font-mono text-[11px] text-[#A1A1AA]" title={task.dueDate || ''}>{formatTaskDueDate(task.dueDate)}</td>
                    <td className="w-[70px] min-w-[70px] max-w-[70px] overflow-hidden text-center"><span className={`inline-flex h-[22px] max-w-full items-center justify-center truncate rounded-[6px] px-2 text-[11px] ${leadBadgeClass(task.leadDept)}`}>{task.leadDept || '-'}</span></td>

                    <td className={`${isAll ? 'w-[70px] min-w-[70px] max-w-[70px] opacity-100' : 'hidden w-0 p-0 opacity-0'} truncate text-center text-[#A1A1AA]`}>{task.assignee || '미정'}</td>
                    <td className="w-[70px] min-w-[70px] max-w-[70px] truncate px-2 text-center text-[#A1A1AA]">{task.externalParty || '-'}</td>
                    <td className={`${isAll ? 'w-[80px] min-w-[80px] max-w-[80px] opacity-100' : 'hidden w-0 p-0 opacity-0'} truncate text-center text-[#86868B]`}>{task.supportNeeded || '-'}</td>
                    <td className="w-[46px] min-w-[46px] max-w-[46px] text-center"><span className={`rounded px-2 py-0.5 text-[11px] font-bold ${task.isBlocker ? 'border border-red-500/20 bg-red-500/10 text-red-400' : 'text-gray-500'}`}>{task.isBlocker ? 'Y' : 'N'}</span></td>
                    <td className="w-[48px] min-w-[48px] max-w-[48px] text-center"><span className={`rounded px-2 py-0.5 text-[11px] font-bold ${task.needsDecision ? 'border border-amber-500/20 bg-amber-500/10 text-amber-400' : 'text-gray-500'}`}>{task.needsDecision ? 'Y' : 'N'}</span></td>
                    <td className={`${isAll ? 'w-[200px] min-w-[200px] max-w-[200px] pl-4 opacity-100' : 'hidden w-0 p-0 opacity-0'} truncate text-[#A1A1AA]`}>{task.nextAction || '-'}</td>
                    <td className="w-[56px] min-w-[56px] max-w-[56px] text-center">{isReadOnly || task.status === '완료' ? <span className={`inline-flex rounded px-2 py-0.5 text-[11px] font-bold ${statusBadgeClass(task.status)}`}>{task.status}</span> : <button type="button" onClick={(event) => { event.stopPropagation(); setWorkflowTask(task); }} aria-label={`${task.taskName} 상태 처리, 현재 ${task.status}`} title="상태 빠른 처리" className={`cursor-pointer rounded px-2 py-0.5 text-[11px] font-bold transition-[filter] hover:brightness-125 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#82add0] ${statusBadgeClass(task.status)}`}>{task.status}</button>}</td>
                    <td className="w-[56px] min-w-[56px] max-w-[56px] truncate text-center"><span className={`rounded px-2 py-0.5 text-[11px] font-bold ${importanceBadgeClass(task.importanceLevel)}`}>{task.importanceLevel}</span></td>
                    <td className="w-[71px] min-w-[71px] max-w-[71px] border-l border-r border-[#3c3c3c] px-1 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button type="button" onClick={(event) => { event.stopPropagation(); openTask(task); }} className="cursor-pointer text-[11px] font-bold text-[#6f9fc7] hover:text-[#82add0]">{isReadOnly ? '상세' : '수정'}</button>
                        {canCreateAndArchive && <><span className="mx-[2px] select-none text-[#555]">|</span><button type="button" onClick={(event) => { event.stopPropagation(); requestArchive(task); }} className="cursor-pointer text-[11px] font-bold text-[#a78661] hover:text-[#b89a78]">보관</button></>}
                      </div>
                    </td>
                  </tr>;
                })}
              </tbody>
            </table>
            <div className="box-border flex w-[800px] shrink-0 self-stretch items-center justify-start px-8 pl-20"><div className="pointer-events-none w-full select-none whitespace-nowrap font-bold leading-[0.9] tracking-tighter text-white opacity-[0.04]" style={{ fontSize: 'clamp(45px, 8.5vw, 135px)' }}>Songhyeon BID<br />Execution<br />Team</div></div>
          </div>
        </div>
        {totalPages > 1 && <div className="flex h-[46px] w-full select-none items-center justify-center rounded-b-[24px] border-t border-[#3c3c3c]/50 bg-[#272726]"><div className="flex items-center gap-1"><button type="button" disabled={visiblePage === 1} onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] border border-[#3c3c3c] text-[#86868B] hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30">‹</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" key={page} onClick={() => setCurrentPage(page)} className={`h-7 w-7 cursor-pointer rounded-[6px] text-[12px] font-bold ${page === visiblePage ? 'bg-[#bdbba7] text-black shadow-sm' : 'border border-transparent text-[#86868B] hover:border-[#3c3c3c] hover:bg-white/5 hover:text-white'}`}>{page}</button>)}<button type="button" disabled={visiblePage === totalPages} onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] border border-[#3c3c3c] text-[#86868B] hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30">›</button></div></div>}
      </div>
      {selectedTask && <SonghyeonTaskDetailDrawer task={selectedTask} onClose={closeTask} onSaved={replaceTask} canArchive={canCreateAndArchive} onArchiveRequest={requestArchive} />}
      {isEditorOpen && canCreateAndArchive && <SonghyeonTaskEditorModal onClose={() => setIsEditorOpen(false)} onCreated={(created) => { setTasks((current) => [...current, created]); setIsEditorOpen(false); openTask(created); }} />}
      {workflowTask && !isReadOnly && <SonghyeonTaskWorkflowModal task={workflowTask} onClose={() => setWorkflowTask(null)} onSaved={async (updated) => { replaceTask(updated); setWorkflowTask(null); }} />}
      {archiveTarget && canCreateAndArchive && (
        <div className="fixed inset-0 z-[210000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget && !archiving) { setArchiveTarget(null); setArchiveReason(''); } }}>
          <div role="alertdialog" aria-modal="true" aria-labelledby="task-archive-title" aria-describedby="task-archive-description" className="w-full max-w-[440px] overflow-hidden rounded-[16px] border border-[#3c3c3c] bg-[#272726] text-left shadow-2xl">
            <div className="border-b border-[#3c3c3c] px-5 py-4">
              <h2 id="task-archive-title" className="text-[16px] font-bold text-[#E5E5E5]">업무를 보관하시겠습니까?</h2>
              <p id="task-archive-description" className="mt-2 text-[12px] leading-5 text-[#86868B]">업무는 목록에서 숨겨지지만 댓글·변경이력과 연결정보는 유지됩니다.</p>
            </div>
            <div className="space-y-4 px-5 py-4">
              <div><p className="text-[11px] font-bold text-[#686868]">보관 대상</p><p className="mt-2 text-[14px] font-bold leading-6 text-[#E5E5E5]">{archiveTarget.taskName}</p></div>
              <label className="block"><span className="mb-1.5 block text-[11px] font-bold text-[#86868B]">보관 사유 <span className="text-[#d98a85]">필수</span></span><textarea autoFocus value={archiveReason} onChange={(event) => setArchiveReason(event.target.value)} rows={3} placeholder="보관하는 이유를 입력하세요." className="w-full resize-y rounded-[9px] border border-[#3c3c3c] bg-[#202022] px-3 py-2.5 text-[13px] leading-5 text-[#E5E5E5] outline-none placeholder:text-[#686868] focus:border-[#a78661] focus:ring-1 focus:ring-[#a78661]/30" /></label>
            </div>
            <div className="flex justify-end gap-2 border-t border-[#3c3c3c] px-5 py-3">
              <button type="button" disabled={archiving} onClick={() => { setArchiveTarget(null); setArchiveReason(''); }} className="cursor-pointer rounded-[8px] border border-[#3c3c3c] px-4 py-2 text-[12px] font-bold text-[#bbb9af] hover:bg-[#30302F] disabled:cursor-not-allowed disabled:opacity-50">취소</button>
              <button type="button" disabled={archiving || !archiveReason.trim()} onClick={confirmArchive} className="cursor-pointer rounded-[8px] border border-[#a78661]/35 bg-[#a78661]/10 px-4 py-2 text-[12px] font-bold text-[#b89a78] hover:bg-[#a78661]/15 disabled:cursor-not-allowed disabled:opacity-40">{archiving ? '보관 중…' : '보관'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
