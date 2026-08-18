/*
 * Faithful Songhyeon adaptation of IOTA main@4373fc1
 * WorkspaceActivityLog.jsx. The interaction model is intentionally kept:
 * table rows, in-place detail, flat comments, like/check reactions, 5/20 view,
 * explicit refresh, post attachments, permissions, mentions and linked tasks.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2, ChevronDown, ChevronUp, Download, FileText, Heart,
  LockKeyhole, MessageSquare, Pencil, Search, Trash2, Users, X,
} from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSonghyeonAuth } from '../../../context/SonghyeonAuthContext';
import {
  addTaskFeedComment,
  deleteTaskFeedComment,
  deleteTaskFeedPost,
  downloadTaskFeedAttachment,
  loadTaskFeedOptions,
  loadTaskFeedPosts,
  toggleTaskFeedReaction,
} from '../../../lib/songhyeonTaskFeedRepository';
import SonghyeonReactionAvatarStack from '../task-board/SonghyeonReactionAvatarStack';
import SonghyeonTaskDetailDrawer from '../task-board/SonghyeonTaskDetailDrawer';
import SonghyeonMemberAvatar from '../SonghyeonMemberAvatar';
import SonghyeonTaskFeedWriteBox from './SonghyeonTaskFeedWriteBox';

const SUMMARY_PAGE_SIZE = 5;
const FULL_PAGE_SIZE = 20;
const NEW_MARKER_EPOCH = new Date('2026-07-13T09:02:39Z').getTime();
const NEW_MARKER_WINDOW = 48 * 60 * 60 * 1000;

const valueOf = (value, fallback = '') => value ?? fallback;
const postIdOf = (post) => post?.id || post?.postId || post?.post_id || '';
const commentIdOf = (comment) => comment?.id || comment?.commentId || comment?.comment_id || '';
const taskKeyOf = (task) => task?.sourceKey || task?.source_key || task?.id || '';
const stakeholderText = (stakeholder) => {
  if (!stakeholder) return '';
  if (typeof stakeholder === 'string') return stakeholder;
  return [stakeholder.companyName || stakeholder.company_name || stakeholder.name, stakeholder.contactName || stakeholder.contact_name]
    .map((value) => String(value || '').trim()).filter(Boolean).join(' - ') || stakeholder.category || '';
};

const normalizePost = (post) => ({
  ...post,
  id: postIdOf(post),
  project: valueOf(post.projectName, valueOf(post.projectLabel, valueOf(post.project_label, valueOf(post.project, '송현 BID')))),
  cell: valueOf(post.cell, valueOf(post.functionCell, valueOf(post.function_cell, valueOf(post.author?.group, valueOf(post.authorGroup, post.author_group))))),
  authorId: valueOf(post.author?.userId, valueOf(post.authorId, post.author_id)),
  authorName: valueOf(post.author?.name, valueOf(post.authorName, valueOf(post.author_name, valueOf(post.writerName, post.writer_name)))),
  authorEmail: valueOf(post.author?.email, valueOf(post.authorEmail, valueOf(post.author_email, valueOf(post.writerEmail, post.writer_email)))),
  authorGroup: valueOf(post.author?.group, valueOf(post.authorGroup, post.author_group)),
  authorPhotoPath: valueOf(post.author?.photoPath, valueOf(post.authorPhotoPath, post.author_photo_path)),
  title: valueOf(post.title),
  content: valueOf(post.content, valueOf(post.body, valueOf(post.rawText, post.raw_text))),
  stakeholder: valueOf(post.stakeholder),
  stakeholderLabel: valueOf(post.stakeholderLabel, stakeholderText(post.stakeholder)),
  purpose: valueOf(post.purpose),
  status: valueOf(post.status),
  priority: valueOf(post.priority),
  workDate: valueOf(post.workDate, valueOf(post.work_date, valueOf(post.createdAt, post.created_at))),
  createdAt: valueOf(post.createdAt, post.created_at),
  updatedAt: valueOf(post.updatedAt, post.updated_at),
  permissions: post.permissions || { groups: [], individuals: [] },
  mentions: post.mentions || [],
  tasks: post.tasks || post.linkedTasks || post.linked_tasks || [],
  attachments: post.attachments || [],
  comments: post.comments || [],
  reactions: post.reactions || { like: [], check: [] },
});

const normalizeProfile = (entry) => {
  if (typeof entry === 'string') return { email: entry, name: entry.split('@')[0] };
  return {
    userId: entry?.userId || entry?.user_id || entry?.reactorId || entry?.reactor_id,
    email: entry?.email || entry?.reactorEmail || entry?.reactor_email || '',
    name: entry?.name || entry?.staffName || entry?.staff_name || entry?.reactorName || entry?.reactor_name || '',
    group: entry?.group || entry?.staffGroup || entry?.staff_group || '',
    photoPath: entry?.photoPath || entry?.photo_path || '',
  };
};

const reactionEntries = (reactions, type) => {
  if (Array.isArray(reactions?.[type])) return reactions[type].map(normalizeProfile);
  if (Array.isArray(reactions)) {
    return reactions.filter((reaction) => reaction.type === type || reaction.reactionType === type || reaction.reaction_type === type).map(normalizeProfile);
  }
  return [];
};

const isRecent = (...dateValues) => {
  const now = Date.now();
  return dateValues.some((value) => {
    const time = value ? new Date(value).getTime() : Number.NaN;
    return Number.isFinite(time) && time >= NEW_MARKER_EPOCH && now - time < NEW_MARKER_WINDOW;
  });
};

const shortDate = (value) => {
  if (!value) return '-';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);
  return parsed.toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' }).replace(/\.\s?/g, '.').replace(/\.$/, '');
};

const displayDateTime = (value) => {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
};

const statusClass = (status) => ({
  '신규': 'text-[#9cc4e6]', '검토중': 'text-[#c7b4d7]', '진행중': 'text-[#7fb3d5]', '중단': 'text-[#bd716d]', '완료': 'text-[#79b88a]',
}[status] || 'text-[#A1A1AA]');

const priorityClass = (priority) => ({
  '높음': 'text-[#cc8580]', '중간': 'text-[#c9a568]', '낮음': 'text-[#A1A1AA]',
}[priority] || 'text-[#A1A1AA]');

function Avatar({ profile, size = 'h-8 w-8' }) {
  const name = profile?.name || profile?.authorName || '사용자';
  const photo = profile?.photoPath || profile?.authorPhotoPath;
  return (
    <SonghyeonMemberAvatar
      name={name}
      photoPath={photo}
      className={`${size} border border-[#444]`}
    />
  );
}

function ReactionButton({ type, reactions, actorEmail, disabled, onToggle, compact = false }) {
  const entries = reactionEntries(reactions, type);
  const active = entries.some((entry) => entry.email && entry.email.toLowerCase() === actorEmail?.toLowerCase());
  const isLike = type === 'like';
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        aria-label={isLike ? '좋아요' : '확인'}
        className={`${compact ? 'h-7 px-2' : 'h-8 px-2.5'} flex cursor-pointer items-center gap-1 rounded-[7px] border text-[12px] font-semibold transition-colors disabled:cursor-default disabled:opacity-60 ${active ? (isLike ? 'border-[#cc8580]/45 bg-[#cc8580]/10 text-[#cc8580]' : 'border-[#6f9fc7]/45 bg-[#6f9fc7]/10 text-[#82add0]') : 'border-[#3A3A3C] text-[#86868B] hover:border-[#555] hover:text-white'}`}
      >
        {isLike ? <Heart size={13} fill={active ? 'currentColor' : 'none'} /> : <CheckCircle2 size={13} />}
        {entries.length}
      </button>
      <SonghyeonReactionAvatarStack reactors={entries} label={isLike ? '좋아요' : '확인'} />
    </div>
  );
}

function ConfirmDialog({ title, description, pending, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-[120000] grid place-items-center bg-black/65 p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="w-[420px] max-w-full rounded-[16px] border border-[#454545] bg-[#252525] p-6 shadow-2xl">
        <h3 className="text-[18px] font-bold text-white">{title}</h3>
        <p className="mt-3 text-[14px] leading-6 text-[#A1A1AA]">{description}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} disabled={pending} className="h-9 rounded-[8px] border border-[#444] px-4 text-[13px] text-[#A1A1AA] hover:text-white">취소</button>
          <button type="button" onClick={onConfirm} disabled={pending} className="h-9 rounded-[8px] border border-[#bd716d]/50 bg-[#bd716d]/10 px-4 text-[13px] font-bold text-[#cc8580] disabled:opacity-50">{pending ? '처리 중...' : '삭제'}</button>
        </div>
      </div>
    </div>
  );
}

function LinkedTaskCard({ task, onOpen }) {
  return (
    <button type="button" onClick={() => onOpen(task)} className="min-w-[220px] flex-1 rounded-[10px] border border-[#3A3A3C] bg-[#202020] p-3 text-left transition-colors hover:border-[#5A5A5C]">
      <span className="text-[11px] font-bold text-[#7fa6c8]">{taskKeyOf(task)}</span>
      <strong className="mt-1 block line-clamp-2 text-[13px] leading-5 text-[#E5E5E5]">{task.taskName || task.task_name || task.title || '연결 업무'}</strong>
      <span className="mt-1 block text-[11px] text-[#86868B]">{task.lead || task.status || ''}</span>
    </button>
  );
}

export default function SonghyeonTaskFeed({ renderHeader }) {
  const { user, member, isReadOnly } = useSonghyeonAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { postId: routePostId = '' } = useParams();
  const isDetailView = Boolean(routePostId);
  const actor = useMemo(() => ({
    userId: user?.id || '', email: user?.email || '', name: member?.staff_name || '', group: member?.staff_group || member?.group_name || '', photoPath: member?.photo_path || '',
  }), [member, user]);
  const [posts, setPosts] = useState([]);
  const [options, setOptions] = useState({ projects: [], cells: [], stakeholders: [], members: [], groups: [], tasks: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('summary');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ stakeholder: '', cell: '', purpose: '', status: '', priority: '' });
  const [editingPost, setEditingPost] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [commentDrafts, setCommentDrafts] = useState({});
  const [commentPendingId, setCommentPendingId] = useState('');
  const [mentionPostId, setMentionPostId] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const restoredListLocationKey = useRef('');
  const postRefs = useRef(new Map());
  const scrolledDetailLocationKey = useRef('');

  const refresh = useCallback(async () => {
    setError('');
    try {
      const [postRows, optionRows] = await Promise.all([loadTaskFeedPosts({}), loadTaskFeedOptions()]);
      setPosts((postRows || []).map(normalizePost));
      setOptions((current) => ({ ...current, ...(optionRows || {}) }));
    } catch (loadError) {
      setError(loadError?.message || '업무 피드를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  useEffect(() => {
    if (routePostId || !posts.length || typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const targetPostId = params.get('postId');
    if (!targetPostId) return;
    setSearchQuery('');
    setFilters({ stakeholder: '', cell: '', purpose: '', status: '', priority: '' });
    setViewMode('full');
    const targetIndex = posts.findIndex((post) => String(post.id) === String(targetPostId));
    const targetPage = targetIndex < 0 ? 1 : Math.floor(targetIndex / FULL_PAGE_SIZE) + 1;
    setCurrentPage(targetPage);
    params.delete('postId');
    const query = params.toString();
    navigate(`/feed/${encodeURIComponent(targetPostId)}${query ? `?${query}` : ''}`, {
      replace: true,
      state: {
        from: '/feed',
        feedListState: { searchQuery: '', filters: { stakeholder: '', cell: '', purpose: '', status: '', priority: '' }, viewMode: 'full', currentPage: targetPage },
      },
    });
  }, [navigate, posts, routePostId]);

  useEffect(() => {
    if (restoredListLocationKey.current === location.key) return;
    const saved = location.state?.feedListState;
    if (!saved) return;
    restoredListLocationKey.current = location.key;
    setSearchQuery(saved.searchQuery || '');
    setFilters({ stakeholder: '', cell: '', purpose: '', status: '', priority: '', ...(saved.filters || {}) });
    setViewMode(saved.viewMode === 'full' ? 'full' : 'summary');
    setCurrentPage(Math.max(1, Number(saved.currentPage) || 1));
  }, [location.key, location.state, routePostId]);

  const closeDetailRoute = useCallback(() => {
    if (routePostId) navigate('/feed', { replace: true });
  }, [navigate, routePostId]);

  const updateFilter = (key, value) => {
    closeDetailRoute();
    setFilters((current) => ({ ...current, [key]: value }));
    setCurrentPage(1);
  };

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const taskSearchText = (post.tasks || []).map((task) => `${taskKeyOf(task)} ${task.taskName || task.task_name || task.title || ''}`).join(' ');
      const searchable = `${post.content} ${post.title} ${post.authorName} ${post.project} ${post.cell} ${taskSearchText}`.toLowerCase();
      const content = post.content;
      const author = post.authorName;
      const project = post.project;
      const task = taskSearchText;
      void content; void author; void project; void task;
      return (!query || searchable.includes(query))
        && (!filters.stakeholder || post.stakeholderLabel === filters.stakeholder)
        && (!filters.cell || post.cell === filters.cell)
        && (!filters.purpose || post.purpose === filters.purpose)
        && (!filters.status || post.status === filters.status)
        && (!filters.priority || post.priority === filters.priority);
    });
  }, [filters, posts, searchQuery]);

  const pageSize = viewMode === 'summary' ? SUMMARY_PAGE_SIZE : FULL_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const normalizedPage = Math.min(currentPage, totalPages);
  const detailPost = useMemo(
    () => routePostId ? posts.find((post) => String(post.id) === String(routePostId)) || null : null,
    [posts, routePostId],
  );
  const displayedPosts = filteredPosts.slice((normalizedPage - 1) * pageSize, normalizedPage * pageSize);

  useEffect(() => {
    if (!routePostId || !posts.length) return;
    const filteredTargetIndex = filteredPosts.findIndex((post) => String(post.id) === String(routePostId));
    if (filteredTargetIndex >= 0) {
      const targetPage = Math.floor(filteredTargetIndex / pageSize) + 1;
      if (currentPage !== targetPage) setCurrentPage(targetPage);
      return;
    }

    const targetIndex = posts.findIndex((post) => String(post.id) === String(routePostId));
    if (targetIndex < 0) return;
    setSearchQuery('');
    setFilters({ stakeholder: '', cell: '', purpose: '', status: '', priority: '' });
    setCurrentPage(Math.floor(targetIndex / pageSize) + 1);
  }, [currentPage, filteredPosts, pageSize, posts, routePostId]);

  useEffect(() => {
    if (!routePostId || !detailPost) return undefined;
    const targetIsVisible = displayedPosts.some((post) => String(post.id) === String(routePostId));
    if (!targetIsVisible) return undefined;
    const scrollKey = `${location.key}:${routePostId}`;
    if (scrolledDetailLocationKey.current === scrollKey) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const target = postRefs.current.get(String(routePostId));
      if (!target) return;
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
      scrolledDetailLocationKey.current = scrollKey;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [detailPost, displayedPosts, location.key, routePostId]);

  const feedListState = useMemo(() => ({
    searchQuery,
    filters,
    viewMode,
    currentPage: normalizedPage,
  }), [filters, normalizedPage, searchQuery, viewMode]);

  const openPostDetail = useCallback((postId) => {
    navigate(`/feed/${encodeURIComponent(postId)}`, {
      state: {
        from: `${location.pathname}${location.search}`,
        feedListState,
      },
    });
  }, [feedListState, location.pathname, location.search, navigate]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const handleToggleReaction = async (postId, type, commentId = null) => {
    if (isReadOnly) return;
    setError('');
    try {
      await toggleTaskFeedReaction({ postId, commentId, type }, actor);
      await refresh();
    } catch (mutationError) { setError(mutationError?.message || '반응을 저장하지 못했습니다.'); }
  };

  const handleAddComment = async (postId) => {
    const content = (commentDrafts[postId] || '').trim();
    if (!content || isReadOnly) return;
    setCommentPendingId(postId);
    setError('');
    try {
      const mentionNames = [...content.matchAll(/@([^\s@]+)/g)].map((match) => match[1]);
      await addTaskFeedComment(postId, content, { ...actor, mentions: mentionNames });
      setCommentDrafts((current) => ({ ...current, [postId]: '' }));
      setMentionPostId('');
      await refresh();
    } catch (mutationError) { setError(mutationError?.message || '댓글을 등록하지 못했습니다.'); }
    finally { setCommentPendingId(''); }
  };

  const handleDeleteComment = async (postId, commentId) => {
    setIsDeleting(true);
    try {
      await deleteTaskFeedComment(postId, commentId, actor);
      setDeleteTarget(null);
      await refresh();
    } catch (mutationError) { setError(mutationError?.message || '댓글을 삭제하지 못했습니다.'); }
    finally { setIsDeleting(false); }
  };

  const handleDeletePost = async (postId) => {
    setIsDeleting(true);
    try {
      await deleteTaskFeedPost(postId, actor);
      setDeleteTarget(null);
      await refresh();
      if (String(routePostId) === String(postId)) navigate('/feed', { replace: true });
    } catch (mutationError) { setError(mutationError?.message || '게시글을 삭제하지 못했습니다.'); }
    finally { setIsDeleting(false); }
  };

  const handleDownloadAttachment = async (attachment) => {
    setError('');
    try {
      const signedUrl = await downloadTaskFeedAttachment(attachment);
      if (signedUrl) window.open(signedUrl, '_blank', 'noopener,noreferrer');
    } catch (downloadError) {
      setError(downloadError?.message || '첨부파일을 다운로드하지 못했습니다.');
    }
  };

  const mentionOptions = useMemo(() => [
    ...(options.groups || []).map((group) => typeof group === 'string' ? group : group.label || group.name),
    ...(options.members || []).map((person) => person.name || person.staffName || person.staff_name),
  ].filter(Boolean), [options.groups, options.members]);

  const headerActions = (
    <div className="flex items-center gap-3">
      <label className="relative block">
        <span className="sr-only">업무 피드 검색</span>
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" />
        <input value={searchQuery} onChange={(event) => { closeDetailRoute(); setSearchQuery(event.target.value); setCurrentPage(1); }} placeholder="검색어 입력..." className="h-[37px] w-[230px] rounded-[10px] border border-[#3A3A3C] bg-[#222] pl-9 pr-3 text-[13px] text-white outline-none transition-colors focus:border-[#6f9fc7]" />
      </label>
      <button type="button" onClick={() => { closeDetailRoute(); setViewMode((mode) => mode === 'summary' ? 'full' : 'summary'); setCurrentPage(1); }} className="h-[37px] rounded-[10px] border border-[#3A3A3C] bg-[#222] px-4 text-[13px] font-semibold text-[#A1A1AA] hover:border-[#555] hover:text-white">{viewMode === 'summary' ? '전체보기' : '간략히 보기'}</button>
    </div>
  );

  return (
    <>
      {renderHeader?.(headerActions)}
      <section className="w-full" aria-label="업무 피드 게시판">
      <div className="rounded-[30px] border border-[#333] p-[6px]">
        <SonghyeonTaskFeedWriteBox actor={actor} options={options} tasks={options.tasks || []} isReadOnly={isReadOnly} onSaved={refresh} />

        <div className="overflow-hidden rounded-[24px] border border-[#3c3c3c] bg-[#252525]">
          <div className="grid min-w-[1080px] grid-cols-[116px_90px_126px_minmax(260px,1fr)_100px_118px_72px_82px_68px_76px] items-center border-b border-[#3c3c3c] px-5 py-3 text-center text-[13px] font-bold text-[#86868B]">
            <span>프로젝트</span><FilterSelect label="기능셀" value={filters.cell} options={options.cells || []} onChange={(value) => updateFilter('cell', value)} /><span>등록자</span><span className="text-left">내용</span><span aria-label="반응자" />
            <FilterSelect label="이해관계자" value={filters.stakeholder} options={options.stakeholders || []} onChange={(value) => updateFilter('stakeholder', value)} />
            <FilterSelect label="목적" value={filters.purpose} options={['공유', '협업', '리스크 판단', '의사결정']} onChange={(value) => updateFilter('purpose', value)} />
            <FilterSelect label="진행상태" value={filters.status} options={['신규', '검토중', '진행중', '중단', '완료']} onChange={(value) => updateFilter('status', value)} />
            <FilterSelect label="중요도" value={filters.priority} options={['높음', '중간', '낮음']} onChange={(value) => updateFilter('priority', value)} />
            <span>등록일</span>
          </div>

          {isLoading ? <div className="p-12 text-center text-[14px] text-[#86868B]">업무 피드를 불러오는 중...</div> : null}
          {!isLoading && isDetailView && !detailPost ? <div role="alert" className="border-b border-[#4a4030] bg-[#332d24] px-5 py-3 text-[13px] text-[#d6b47b]">요청한 게시글을 찾을 수 없어 업무 피드 목록을 표시합니다.</div> : null}
          {!isLoading && !displayedPosts.length ? <div className="p-12 text-center text-[14px] text-[#86868B]">조건에 맞는 업무 메시지가 없습니다.</div> : null}
          {error ? <div role="alert" className="border-b border-[#513332] bg-[#3a2423] px-5 py-3 text-[13px] text-[#e09a96]">{error}</div> : null}

          {displayedPosts.map((post, index) => {
            const isExpanded = Boolean(routePostId && String(post.id) === String(routePostId));
            const isAuthor = Boolean(actor.userId && post.authorId === actor.userId);
            const restricted = Boolean(post.permissions?.groups?.length || post.permissions?.individuals?.length);
            const postLike = reactionEntries(post.reactions, 'like');
            const postCheck = reactionEntries(post.reactions, 'check');
            return (
              <article
                key={post.id}
                id={`feed-post-${post.id}`}
                ref={(node) => {
                  const key = String(post.id);
                  if (node) postRefs.current.set(key, node);
                  else postRefs.current.delete(key);
                }}
                className={`transition-colors ${index ? 'border-t border-[#3c3c3c]' : ''} hover:bg-white/[0.025]`}
              >
                <button type="button" aria-expanded={isExpanded} onClick={() => { if (isExpanded) closeDetailRoute(); else openPostDetail(post.id); }} data-feed-row-link className="grid w-full min-w-[1080px] cursor-pointer grid-cols-[116px_90px_126px_minmax(260px,1fr)_100px_118px_72px_82px_68px_76px] items-center px-5 py-4 text-[13px] text-[#A1A1AA]">
                  <span className="mx-auto rounded-[8px] border border-[#444] px-3 py-2 font-bold text-[#D1D1D6]">{post.project}</span>
                  <span className="truncate px-1 text-center">{post.cell || '-'}</span>
                  <span className="flex min-w-0 items-center justify-center gap-2 text-left"><Avatar profile={{ name: post.authorName, photoPath: post.authorPhotoPath }} /><span className="min-w-0 truncate font-bold text-[#E5E5E5]">{post.authorName || '-'}</span></span>
                  <span className="min-w-0 pr-4 text-left"><span className="flex items-center gap-1.5"><strong className="truncate text-[14px] font-medium text-[#E5E5E5]">{post.title || '제목 없음'}</strong>{isRecent(post.createdAt, post.updatedAt) ? <b className="rounded-[3px] bg-[#ff3b30] px-1 py-0.5 text-[10px] leading-none text-white">N</b> : null}{restricted ? <LockKeyhole size={12} className="shrink-0 text-[#bd716d]" /> : null}</span></span>
                  <span className="flex items-center justify-center"><SonghyeonReactionAvatarStack reactors={[...postLike, ...postCheck].filter((entry, itemIndex, array) => array.findIndex((candidate) => (candidate.userId || candidate.email) === (entry.userId || entry.email)) === itemIndex)} label="게시글" /></span>
                  <span className="truncate text-center">{post.stakeholderLabel || '-'}</span><span>{post.purpose || '-'}</span><span className={statusClass(post.status)}>{post.status || '-'}</span><span className={`font-bold ${priorityClass(post.priority)}`}>{post.priority || '-'}</span><span>{shortDate(post.workDate)}</span>
                </button>

                {isExpanded ? (
                  <div className="border-t border-[#38383A] bg-[#202020] px-8 py-6">
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2"><Avatar profile={{ name: post.authorName, photoPath: post.authorPhotoPath }} /><div><div className="flex items-center gap-2"><strong className="text-[14px] text-white">{post.authorName}</strong>{isRecent(post.createdAt, post.updatedAt) ? <b className="rounded-[3px] bg-[#ff3b30] px-1 py-0.5 text-[10px] leading-none text-white">N</b> : null}<span className="rounded-[4px] bg-[#82afb9]/10 px-2 py-0.5 text-[11px] font-bold text-[#82afb9]">{post.cell || post.authorGroup || '송현 BID'}</span></div><span className="text-[11px] text-[#86868B]">{displayDateTime(post.createdAt)}</span></div></div>
                        <h3 className="mt-5 text-[18px] font-bold leading-7 text-white">{post.title || '업무 메시지'}</h3>
                        <div className="mt-3 whitespace-pre-wrap break-words text-[14px] leading-7 text-[#D1D1D6]">{post.content}</div>
                        {post.mentions?.length ? <div className="mt-4 flex flex-wrap gap-1.5" aria-label="멘션"><Users size={14} className="mt-1 text-[#7fa6c8]" />{post.mentions.map((mention) => <span key={mention.id || mention.memberId || mention.member_id || mention.name || mention} className="rounded-[6px] bg-[#6f9fc7]/10 px-2 py-1 text-[12px] text-[#9cc4e6]">@{mention.name || mention.label || mention}</span>)}</div> : null}
                      </div>
                      {isAuthor && !isReadOnly ? <div className="flex shrink-0 gap-2"><button type="button" onClick={() => setEditingPost(post)} className="flex h-8 items-center gap-1 rounded-[7px] border border-[#444] px-3 text-[12px] text-[#A1A1AA] hover:text-white"><Pencil size={12} />수정하기</button><button type="button" onClick={() => setDeleteTarget({ type: 'post', post })} className="flex h-8 items-center gap-1 rounded-[7px] border border-[#5a3937] px-3 text-[12px] text-[#cc8580]"><Trash2 size={12} />삭제</button></div> : null}
                    </div>

                    {post.attachments.length ? <div className="mt-5 flex flex-wrap gap-2 border-t border-[#333] pt-4">{post.attachments.map((file) => <button key={file.id || file.path || file.name} type="button" onClick={() => handleDownloadAttachment(file)} className="flex items-center gap-2 rounded-[8px] border border-[#444] bg-[#272727] px-3 py-2 text-[12px] text-[#D1D1D6] hover:border-[#666]"><FileText size={14} />{file.name}<Download size={13} className="text-[#86868B]" /></button>)}</div> : null}

                    {post.tasks.length ? <div className="mt-5 border-t border-[#333] pt-4"><div className="mb-2 text-[12px] font-bold text-[#86868B]">연결된 통합업무 {post.tasks.length}건</div><div className="flex flex-wrap gap-2">{post.tasks.map((task) => <LinkedTaskCard key={taskKeyOf(task)} task={task} onOpen={setSelectedTask} />)}</div></div> : null}

                    <div className="mt-5 flex items-center gap-4 border-y border-[#333] py-3">
                      <ReactionButton type="like" reactions={post.reactions} actorEmail={actor.email} disabled={isReadOnly} onToggle={() => handleToggleReaction(post.id, 'like')} />
                      <ReactionButton type="check" reactions={post.reactions} actorEmail={actor.email} disabled={isReadOnly} onToggle={() => handleToggleReaction(post.id, 'check')} />
                      <span className="ml-auto flex items-center gap-1.5 text-[12px] text-[#86868B]"><MessageSquare size={13} />댓글 {post.comments.length}</span>
                    </div>

                    <div className="mt-4 space-y-2">
                      {post.comments.map((comment) => {
                        const commentId = commentIdOf(comment);
                        const commentAuthorId = comment.author?.userId || comment.authorId || comment.author_id;
                        const commentAuthorName = comment.author?.name || comment.authorName || comment.author_name || (typeof comment.author === 'string' ? comment.author : '') || '사용자';
                        const commentContent = comment.content || comment.body || comment.text || '';
                        const isCommentAuthor = Boolean(actor.userId && actor.userId === commentAuthorId);
                        return <div key={commentId} className="rounded-[10px] border border-[#333] bg-white/[0.02] p-3"><div className="flex items-start gap-3"><Avatar profile={{ name: commentAuthorName, photoPath: comment.author?.photoPath || comment.authorPhotoPath || comment.author_photo_path }} size="h-7 w-7" /><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><strong className="text-[12px] text-white">{commentAuthorName}</strong>{isRecent(comment.createdAt || comment.created_at, comment.updatedAt || comment.updated_at) ? <b className="rounded-[3px] bg-[#ff3b30] px-1 py-0.5 text-[10px] leading-none text-white">N</b> : null}<span className="text-[11px] text-[#86868B]">{displayDateTime(comment.createdAt || comment.created_at)}</span>{isCommentAuthor && !isReadOnly ? <button type="button" onClick={() => setDeleteTarget({ type: 'comment', postId: post.id, commentId })} className="ml-auto text-[11px] text-[#bd716d] hover:text-[#dd8b86]">삭제</button> : null}</div><p className="mt-1 whitespace-pre-wrap break-words text-[13px] leading-6 text-[#B8B8BD]">{commentContent}</p><div className="mt-2 flex gap-3"><ReactionButton compact type="like" reactions={comment.reactions} actorEmail={actor.email} disabled={isReadOnly} onToggle={() => handleToggleReaction(post.id, 'like', commentId)} /><ReactionButton compact type="check" reactions={comment.reactions} actorEmail={actor.email} disabled={isReadOnly} onToggle={() => handleToggleReaction(post.id, 'check', commentId)} /></div></div></div></div>;
                      })}
                    </div>

                    {!isReadOnly ? <div className="relative mt-4"><textarea value={commentDrafts[post.id] || ''} onFocus={() => setMentionPostId(post.id)} onChange={(event) => { setCommentDrafts((current) => ({ ...current, [post.id]: event.target.value })); setMentionPostId(event.target.value.includes('@') ? post.id : ''); }} placeholder="댓글을 입력하세요... (@를 입력하여 담당자를 멘션할 수 있습니다)" className="min-h-[76px] w-full resize-y rounded-[10px] border border-[#3A3A3C] bg-[#29292B] p-3 pr-24 text-[13px] leading-6 text-white outline-none focus:border-[#6f9fc7]" /><button type="button" disabled={commentPendingId === post.id || !commentDrafts[post.id]?.trim()} onClick={() => handleAddComment(post.id)} className="absolute bottom-3 right-3 h-8 rounded-[7px] bg-[#3279b4] px-4 text-[12px] font-bold text-white disabled:opacity-40">댓글 등록</button>{mentionPostId === post.id && commentDrafts[post.id]?.match(/@[^\s@]*$/) ? <div className="absolute bottom-[82px] left-3 z-20 max-h-[180px] w-[220px] overflow-y-auto rounded-[9px] border border-[#444] bg-[#252525] py-1 shadow-2xl">{mentionOptions.filter((name) => name.toLowerCase().includes((commentDrafts[post.id].match(/@([^\s@]*)$/)?.[1] || '').toLowerCase())).slice(0, 8).map((name) => <button key={name} type="button" onClick={() => { setCommentDrafts((current) => ({ ...current, [post.id]: current[post.id].replace(/@[^\s@]*$/, `@${name} `) })); setMentionPostId(''); }} className="block w-full px-3 py-2 text-left text-[12px] text-[#D1D1D6] hover:bg-[#333]"><span className="text-[#7fa6c8]">@</span>{name}</button>)}</div> : null}</div> : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>

      {viewMode === 'full' && totalPages > 1 ? <nav className="mt-4 flex items-center justify-center gap-1" aria-label="업무 피드 페이지">{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" key={page} onClick={() => { closeDetailRoute(); setCurrentPage(page); }} className={`h-8 min-w-8 rounded-[7px] px-2 text-[12px] ${page === normalizedPage ? 'bg-[#3279b4] font-bold text-white' : 'border border-[#3A3A3C] text-[#86868B] hover:text-white'}`}>{page}</button>)}</nav> : null}

      {editingPost ? <div className="fixed inset-0 z-[110000] grid place-items-center bg-black/70 p-6" role="dialog" aria-modal="true" aria-label="업무 메시지 수정"><div className="max-h-[calc(100vh-48px)] w-[940px] max-w-full overflow-y-auto rounded-[20px] border border-[#444] bg-[#202020] p-2 shadow-2xl"><div className="flex justify-end p-2"><button type="button" aria-label="닫기" onClick={() => setEditingPost(null)} className="grid h-9 w-9 cursor-pointer place-items-center rounded-[8px] text-[#86868B] hover:bg-[#333] hover:text-white"><X size={18} /></button></div><SonghyeonTaskFeedWriteBox actor={actor} options={options} tasks={options.tasks || []} isReadOnly={isReadOnly} initialPost={editingPost} onSaved={() => { setEditingPost(null); void refresh(); }} onCancel={() => setEditingPost(null)} /></div></div> : null}

      {deleteTarget ? <ConfirmDialog title={deleteTarget.type === 'post' ? '게시글을 삭제할까요?' : '댓글을 삭제할까요?'} description="삭제한 내용은 되돌릴 수 없습니다." pending={isDeleting} onClose={() => setDeleteTarget(null)} onConfirm={() => deleteTarget.type === 'post' ? handleDeletePost(deleteTarget.post.id) : handleDeleteComment(deleteTarget.postId, deleteTarget.commentId)} /> : null}

        {selectedTask ? <SonghyeonTaskDetailDrawer key={taskKeyOf(selectedTask)} task={selectedTask} onClose={() => setSelectedTask(null)} onSaved={(updated) => setSelectedTask(updated)} /> : null}
      </section>
    </>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} className={`mx-auto max-w-full cursor-pointer appearance-none rounded-[7px] border border-transparent bg-white/5 px-1.5 py-1 text-center text-[12px] font-bold outline-none hover:bg-white/10 ${value ? 'text-[#fbf167]' : 'text-[#A1A1AA]'}`}>
      <option value="" className="bg-[#222] text-[#E5E5E5]">{label}</option>
      {options.map((option) => { const valueOption = typeof option === 'string' ? option : option.value || option.label || option.name; const labelOption = typeof option === 'string' ? option : option.label || option.name || option.value; return <option key={valueOption} value={valueOption} className="bg-[#222] text-[#E5E5E5]">{labelOption}</option>; })}
    </select>
  );
}
