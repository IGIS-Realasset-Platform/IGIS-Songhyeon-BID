import { useEffect, useRef, useState } from 'react';
import { useSonghyeonAuth } from '../../../context/SonghyeonAuthContext';
import {
  addComment,
  addReply,
  deleteActivity,
  deleteComment,
  deleteReply,
  loadActivity,
  loadComments,
  subscribeToTaskDiscussion,
  toggleCommentReaction,
  toggleReplyReaction,
  updateComment,
  updateReply,
} from '../../../lib/songhyeonTaskRepository';
import SonghyeonTaskEditorModal from './SonghyeonTaskEditorModal';
import SonghyeonReactionAvatarStack from './SonghyeonReactionAvatarStack';
import SonghyeonTaskWorkflowModal from './SonghyeonTaskWorkflowModal';
import { taskWorkflowActions } from './songhyeonTaskWorkflowActions.js';
import { visibleSonghyeonTaskChanges } from '../../../lib/songhyeonTaskFields.js';
import { importanceBadgeClass } from './songhyeonTaskBadgeClasses.js';

const fieldLabels = {
  status: '상태', importanceLevel: '중요도', meetingAgenda: '회의상정', isBlocker: 'Blocker',
  needsDecision: '결정필요', assignee: '담당자', dueDate: '마감기한', nextAction: '다음 액션',
  deliverables: '필요 산출물', taskPurpose: '업무 목적', taskName: '업무명', categoryMain: '업무분류',
  leadDept: '실행주관', coopDepts: '협조 부서', externalParty: '외부 상대방', supportNeeded: '지원필요',
  gateStage: 'GATE 단계', stage: 'GATE 단계', agendaReason: '회의 상정 사유',
};

const activityChanges = (item) => item.action === 'task_updated' ? visibleSonghyeonTaskChanges(item.payload?.changes) : [];
const taskDetailBadgeClass = 'inline-flex h-[26px] items-center whitespace-nowrap rounded-[6px] px-2 text-[11px] font-bold leading-none';
const activityDescription = (item) => {
  if (item.action === 'task_updated') return `${activityChanges(item).map((change) => fieldLabels[change.field] || change.field).join(', ')} 변경`;
  if (item.action === 'comment_added') return '댓글 등록';
  if (item.action === 'comment_deleted') return '댓글 삭제';
  if (item.action === 'task_started') return '업무 진행 시작';
  if (item.action === 'task_completed') return `업무 완료${item.payload?.summary ? ` · ${item.payload.summary}` : ''}`;
  if (item.action === 'task_held') return `업무 중단${item.payload?.reason ? ` · ${item.payload.reason}` : ''}`;
  if (item.action === 'task_resumed') return `업무 재개${item.payload?.reason ? ` · ${item.payload.reason}` : ''}`;
  if (item.action === 'task_stopped') return `업무 중단${item.payload?.reason ? ` · ${item.payload.reason}` : ''}`;
  if (item.action === 'task_archived') return `업무 보관${item.payload?.reason ? ` · ${item.payload.reason}` : ''}`;
  return '업무 기록 변경';
};

const Field = ({ label, children, className = '' }) => <div className={className}><span className="block text-[11px] text-[#86868B]">{label}</span><div className="mt-[3px] text-[13px] font-bold text-[#E5E5E5]">{children}</div></div>;
const formatCommentDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (part) => String(part).padStart(2, '0');
  return `${String(date.getFullYear()).slice(2)}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
const commentAvatarSource = (comment) => {
  const base = import.meta.env.BASE_URL;
  if (comment.authorPhoto) return `${base}${comment.authorPhoto.replace(/^\/+/, '')}`;
  return `${base}songhyeon-members/${encodeURIComponent(comment.author || '')}.webp`;
};
const CommentAvatar = ({ comment, small = false }) => (
  <div className={`${small ? 'w-[24px] h-[24px]' : 'w-[32px] h-[32px]'} rounded-full bg-[#2c2c2e] flex items-center justify-center border border-[#3c3c3c] shrink-0 overflow-hidden mt-[2px]`}>
    <img
      src={commentAvatarSource(comment)}
      alt={comment.author}
      className="w-full h-full object-cover rounded-full"
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = `${import.meta.env.BASE_URL}default_avatar.svg`;
      }}
    />
  </div>
);
const hasCurrentUserReaction = (item, reactionType, userId) => (item.reactions?.[reactionType] || [])
  .some((reaction) => reaction.userId === userId);
const reactionCount = (item, reactionType) => item.reactions?.[reactionType]?.length || 0;

function InlineDiscussionEditor({ label, value, originalValue, onChange, onSave, onCancel, isSaving }) {
  const cleanValue = value.trim();
  const isUnchanged = cleanValue === originalValue.trim();
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSave(); }} className="w-full">
      <label className="sr-only" htmlFor={`discussion-edit-${label}`}>{label}</label>
      <textarea
        id={`discussion-edit-${label}`}
        autoFocus
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={isSaving}
        className="min-h-[76px] w-full resize-y rounded-[8px] border border-[#3c3c3c] bg-[#242426] px-3 py-2 text-[13px] leading-relaxed text-[#E5E5E5] outline-none transition-colors focus:border-[#4f8fca] disabled:cursor-wait disabled:opacity-60"
      />
      <div className="mt-2 flex justify-end gap-2">
        <button type="button" onClick={onCancel} disabled={isSaving} className="cursor-pointer rounded-[6px] border border-[#444] px-3 py-1.5 text-[11px] font-bold text-[#A1A1AA] transition-colors hover:bg-white/5 hover:text-[#E5E5E5] disabled:cursor-wait disabled:opacity-50">취소</button>
        <button type="submit" disabled={!cleanValue || isUnchanged || isSaving} className="cursor-pointer rounded-[6px] border border-[#4f8fca]/35 bg-[#4f8fca]/15 px-3 py-1.5 text-[11px] font-bold text-[#9cc4e6] transition-colors hover:bg-[#4f8fca]/20 disabled:cursor-not-allowed disabled:opacity-40">{isSaving ? '저장 중...' : '저장'}</button>
      </div>
    </form>
  );
}

export default function SonghyeonTaskDetailDrawer({ task, onClose, onBackdropClick, onSaved, canArchive = false, onArchiveRequest }) {
  const { user, member, isReadOnly } = useSonghyeonAuth();
  const [editorOpen, setEditorOpen] = useState(false);
  const [workflowTargetStatus, setWorkflowTargetStatus] = useState('');
  const [comments, setComments] = useState([]);
  const [activity, setActivity] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [replyText, setReplyText] = useState({});
  const [pendingReply, setPendingReply] = useState('');
  const [pendingReaction, setPendingReaction] = useState('');
  const [discussionEdit, setDiscussionEdit] = useState(null);
  const [editText, setEditText] = useState('');
  const [pendingEdit, setPendingEdit] = useState('');
  const contentRef = useRef(null);
  const taskSourceKey = task?.sourceKey;

  const [repositoryError, setRepositoryError] = useState('');
  const actor = { userId: user?.id, email: user?.email, name: member?.staff_name || user?.email || '송현 BID TF' };
  const canDeleteActivity = !isReadOnly && member?.staff_name === '전기영' && user?.email?.toLowerCase() === 'jk.jeon@igisam.com';


  useEffect(() => {
    if (!taskSourceKey) return undefined;
    let active = true;
    setComments([]);
    setActivity([]);
    setCommentText('');
    setExpandedComments({});
    setReplyText({});
    setRepositoryError('');
    setDiscussionEdit(null);
    setEditText('');
    setPendingEdit('');
    contentRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    Promise.all([loadComments(taskSourceKey), loadActivity(taskSourceKey)])
      .then(([nextComments, nextActivity]) => {
        if (!active) return;
        setComments(nextComments);
        setActivity(nextActivity);
      })
      .catch((error) => {
        if (active) setRepositoryError(error.message || '협업 기록을 불러오지 못했습니다.');
      });
    return () => { active = false; };
  }, [taskSourceKey]);
  useEffect(() => {
    if (!task || isReadOnly) return undefined;
    let refreshTimer;
    const refresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        loadComments(task.sourceKey).then(setComments).catch(() => {});
      }, 80);
    };
    const unsubscribe = subscribeToTaskDiscussion(task.sourceKey, refresh);
    return () => { window.clearTimeout(refreshTimer); unsubscribe(); };
  }, [isReadOnly, task]);
  useEffect(() => {
    const close = (event) => {
      if (event.key !== 'Escape') return;
      if (discussionEdit && !pendingEdit) {
        setDiscussionEdit(null);
        setEditText('');
        return;
      }
      if (!pendingEdit) onClose();
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [discussionEdit, onClose, pendingEdit]);

  if (!task) return null;
  const visibleActivity = activity.filter((item) => item.action !== 'task_updated' || activityChanges(item).length);
  const workflowActions = isReadOnly ? [] : taskWorkflowActions(task.status);

  const submitComment = async () => {
    if (!commentText.trim() || isSubmittingComment) return;
    setRepositoryError('');
    setIsSubmittingComment(true);
    try {
      await addComment(task.sourceKey, commentText, actor);
      setCommentText('');
      setComments(await loadComments(task.sourceKey));
      setActivity(await loadActivity(task.sourceKey));
    } catch (error) {
      setRepositoryError(error.message || '댓글을 등록하지 못했습니다.');
    } finally {
      setIsSubmittingComment(false);
    }
  };
  const removeComment = async (commentId) => {
    setRepositoryError('');
    try {
      await deleteComment(task.sourceKey, commentId, actor);
      setComments(await loadComments(task.sourceKey));
      setActivity(await loadActivity(task.sourceKey));
    } catch (error) {
      setRepositoryError(error.message || '댓글을 삭제하지 못했습니다.');
    }
  };
  const submitReply = async (commentId) => {
    const text = replyText[commentId]?.trim();
    if (!text || pendingReply === commentId) return;
    setRepositoryError('');
    setPendingReply(commentId);
    try {
      await addReply(task.sourceKey, commentId, text, actor);
      setReplyText((current) => ({ ...current, [commentId]: '' }));
      setComments(await loadComments(task.sourceKey));
    } catch (error) {
      setRepositoryError(error.message || '대댓글을 등록하지 못했습니다.');
    } finally {
      setPendingReply('');
    }
  };
  const removeReply = async (commentId, replyId) => {
    setRepositoryError('');
    try {
      await deleteReply(task.sourceKey, commentId, replyId, actor);
      setComments(await loadComments(task.sourceKey));
    } catch (error) {
      setRepositoryError(error.message || '대댓글을 삭제하지 못했습니다.');
    }
  };
  const beginEdit = (type, commentId, entry, replyId = '') => {
    if (pendingEdit) return;
    setRepositoryError('');
    setDiscussionEdit({ type, commentId, replyId, originalText: entry.text });
    setEditText(entry.text);
  };
  const cancelEdit = () => {
    if (pendingEdit) return;
    setDiscussionEdit(null);
    setEditText('');
  };
  const saveEdit = async () => {
    const cleanText = editText.trim();
    if (!discussionEdit || pendingEdit || !cleanText || cleanText === discussionEdit.originalText.trim()) return;
    const pendingKey = discussionEdit.type === 'comment'
      ? `comment:${discussionEdit.commentId}`
      : `reply:${discussionEdit.replyId}`;
    setRepositoryError('');
    setPendingEdit(pendingKey);
    try {
      if (discussionEdit.type === 'comment') {
        await updateComment(task.sourceKey, discussionEdit.commentId, cleanText, actor);
      } else {
        await updateReply(task.sourceKey, discussionEdit.commentId, discussionEdit.replyId, cleanText, actor);
      }
      setComments(await loadComments(task.sourceKey));
      setDiscussionEdit(null);
      setEditText('');
    } catch (error) {
      setRepositoryError(error.message || `${discussionEdit.type === 'comment' ? '댓글' : '대댓글'}을 수정하지 못했습니다.`);
    } finally {
      setPendingEdit('');
    }
  };
  const toggleReaction = async (targetType, targetId, reactionType) => {
    const pendingKey = `${targetType}:${targetId}:${reactionType}`;
    if (pendingReaction === pendingKey) return;
    setRepositoryError('');
    setPendingReaction(pendingKey);
    try {
      if (targetType === 'comment') await toggleCommentReaction(targetId, reactionType, actor);
      else await toggleReplyReaction(targetId, reactionType, actor);
      setComments(await loadComments(task.sourceKey));
    } catch (error) {
      setRepositoryError(error.message || '반응을 저장하지 못했습니다.');
    } finally {
      setPendingReaction('');
    }
  };
  const removeActivity = async (activityId) => {
    setRepositoryError('');
    try {
      await deleteActivity(task.sourceKey, activityId, actor);
      setActivity(await loadActivity(task.sourceKey));
    } catch (error) {
      setRepositoryError(error.message || '변경 이력을 삭제하지 못했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100000] overflow-hidden pointer-events-none" data-task-detail-overlay data-pmo-task-detail-overlay>
      <button type="button" aria-label="업무 상세 닫기" onClick={onBackdropClick || onClose} className="absolute inset-0 bg-black/10 pointer-events-auto" />
      <aside data-task-detail-drawer data-pmo-task-detail-drawer className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-auto">
        <div className="w-screen max-w-[550px] transform transition-transform duration-300 ease-in-out flex h-full flex-col border-l border-[#3c3c3c]/80 bg-[#1c1c1e]/95 text-white shadow-2xl backdrop-blur-xl">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#3c3c3c]/80 bg-[#1c1c1e]/90 px-[10px] py-[7px]">
            <div className="flex flex-wrap items-center gap-2"><span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[12px] font-bold text-[#86868B]">{task.displayId}</span><span className="rounded border border-[#3c3c3c] bg-[#3A3A3C] px-2 py-0.5 text-[12px] font-bold">송현 BID</span><span className="rounded border border-[#3c3c3c] bg-white/5 px-2 py-0.5 text-[12px] font-bold">{task.stage}</span></div>
            <button type="button" onClick={onClose} aria-label="업무 상세 닫기" className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-[20px] font-bold text-[#86868B] hover:bg-white/5 hover:text-white">✕</button>
          </header>

          <div ref={contentRef} className="timeline-scrollbar flex-1 space-y-[10px] overflow-y-auto px-[10px] py-6">
            {repositoryError && <div role="alert" className="rounded-[10px] border border-[#ff453a]/25 bg-[#ff453a]/10 px-3 py-2 text-[12px] text-[#ff8a82]">{repositoryError}</div>}
            <div className="relative top-[-6px] space-y-1 pl-[16px]">
              <h2 className="text-[22px] font-bold leading-snug text-[#bdbba7]">{task.taskName}</h2>
              <div className="flex flex-wrap items-center gap-2 pt-[2px]">
                {task.status === '완료' ? (
                  <span className={`${taskDetailBadgeClass} gap-1 border border-[#4da566]/40 bg-[#4da566]/15 font-black text-[#8fd19d] shadow-[0_0_18px_rgba(77,165,102,0.10)]`}><span aria-hidden="true">✓</span>Task가 완료되었습니다</span>
                ) : (
                  <span className={`${taskDetailBadgeClass} border border-[#2997ff]/25 bg-[#2997ff]/10 text-[#60a5fa]`}>{task.status}</span>
                )}
                <span className={`${taskDetailBadgeClass} ${importanceBadgeClass(task.importanceLevel)}`}>중요도: {task.importanceLevel}</span>
                <span className={`${taskDetailBadgeClass} border border-white/10 bg-white/5 text-[#86868B]`}>{task.meetingAgenda ? '회의상정' : '미상정'}</span>
              </div>
            </div>

            {task.status === '완료' && task.completionSummary && <section aria-label="완료 정보" className="rounded-[12px] border border-[#4da566]/20 bg-[#4da566]/[0.04] p-4"><div className="flex items-center justify-between gap-3"><h3 className="text-[12px] font-bold text-[#7fc18e]">완료 정보</h3>{task.completedAt && <time className="text-[10px] text-[#748077]" dateTime={task.completedAt}>{new Date(task.completedAt).toLocaleString('ko-KR')}</time>}</div><p className="mt-2 whitespace-pre-wrap text-[12px] leading-5 text-[#b8c2ba]">{task.completionSummary}</p>{task.completionEvidenceUrl && <a href={task.completionEvidenceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 rounded-[7px] border border-[#4da566]/25 px-2.5 py-1.5 text-[11px] font-bold text-[#7fc18e] hover:bg-[#4da566]/10">완료 증빙 열기 <span aria-hidden="true">↗</span></a>}</section>}

            {task.isBlocker && <div className="rounded-[12px] border border-[#ff453a]/20 bg-[#ff453a]/10 p-4"><h4 className="text-[13px] font-bold text-[#ff453a]">현재 진행 병목(Blocker) 상황</h4><p className="mt-1 text-[12px] leading-relaxed text-gray-300">이 업무는 병목 해소가 필요한 주요 모니터링 대상으로 설정되어 있습니다.</p></div>}

            <div className="space-y-[14px] rounded-[16px] border border-[#2c2c2e] bg-white/[0.02] p-5 text-[13px]">
              <div className="grid grid-cols-4 gap-4"><Field label="실행주관">{task.leadDept || '-'}</Field><Field label="담당자">{task.assignee || '미정'}</Field><Field label="협조 부서" className="col-span-2">{Array.isArray(task.coopDepts) ? task.coopDepts.join('; ') || '-' : task.coopDepts || '-'}</Field></div>
              <div className="grid grid-cols-4 gap-4"><Field label="지원필요">{task.supportNeeded || '-'}</Field><Field label="GATE 단계">{task.gateStage || task.stage || '-'}</Field><Field label="외부 상대방" className="col-span-2">{task.externalParty || '-'}</Field></div>
              <div className="grid grid-cols-4 gap-4"><Field label="회의상정">{task.meetingAgenda ? '상정' : '미상정'}</Field><Field label="마감 기한">{task.dueDate || '-'}</Field><Field label="의사결정필요" className="col-span-2">{task.needsDecision ? '필요' : '불필요'}</Field></div>
            </div>
            <div className="flex flex-col rounded-[16px] border border-[#2c2c2e] bg-white/[0.02] p-5"><Field label="업무 목적"><p className={`font-normal leading-relaxed ${task.taskPurpose || task.sourceText ? 'text-[#bdbba7]' : 'text-[#686868]'}`}>{task.taskPurpose || task.sourceText || '등록된 내용이 없습니다.'}</p></Field><div className="my-[12px] h-px bg-[#3c3c3c]/30" /><Field label="필요 산출물"><p className={`font-normal leading-relaxed ${task.deliverables ? 'text-[#bdbba7]' : 'text-[#686868]'}`}>{task.deliverables || '등록된 내용이 없습니다.'}</p></Field><div className="my-[12px] h-px bg-[#3c3c3c]/30" /><Field label="다음 액션"><p className={`font-normal leading-relaxed ${task.nextAction ? 'text-[#bdbba7]' : 'text-[#686868]'}`}>{task.nextAction || '등록된 내용이 없습니다.'}</p></Field>{task.agendaReason && <><div className="my-[12px] h-px bg-[#3c3c3c]/30" /><Field label="회의 상정 사유 (Agenda Context)"><p className="font-normal leading-relaxed text-[#bdbba7]">{task.agendaReason}</p></Field></>}</div>

            <section aria-label="업무 협업 게시판" className="w-full flex flex-col bg-transparent border-0 rounded-none shadow-none">
              <div className="w-full flex flex-col gap-4">
                {comments.map((comment) => (
                <article key={comment.id} className="w-full flex flex-col bg-[#1c1c1e] border border-[#2c2c2e] rounded-[16px] transition-all hover:border-[#444] relative group gap-[12px] p-[20px]">
                  <div className="w-full flex items-start gap-[10px] ml-[-4px]">
                    <CommentAvatar comment={comment} />
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="w-full flex items-center justify-between">
                        <div className="flex min-w-0 items-center gap-1.5">
                          <span className="truncate text-[14px] font-bold text-white leading-tight">{comment.author}</span>
                          <span className="shrink-0 text-[11px] font-bold px-1.5 py-0.5 rounded text-[#82afb9] bg-[#82afb9]/10">{comment.authorGroup}</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          {!isReadOnly && comment.authorId === actor.userId && (
                            <button
                              type="button"
                              onClick={() => beginEdit('comment', comment.id, comment)}
                              disabled={Boolean(pendingEdit)}
                              className="h-[24px] cursor-pointer rounded-[6px] border border-white/10 bg-white/5 px-2 text-[10px] font-bold text-[#86868B] transition-all hover:border-[#4f8fca]/30 hover:bg-[#4f8fca]/10 hover:text-[#9cc4e6] disabled:cursor-wait disabled:opacity-50"
                              aria-label={`${comment.author} 댓글 수정`}
                            >
                              수정
                            </button>
                          )}
                          {!isReadOnly && comment.authorEmail?.toLowerCase() === actor.email?.toLowerCase() && (
                            <button
                              type="button"
                              onClick={(event) => { event.stopPropagation(); removeComment(comment.id); }}
                              className="w-[24px] h-[24px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#86868B] hover:text-[#FF453A] hover:bg-[#FF453A]/10 hover:border-[#FF453A]/30 transition-all cursor-pointer shrink-0"
                              title="삭제"
                              aria-label={`${comment.author} 게시글 삭제`}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                          )}
                        </div>
                      </div>
                      <span className="mt-0.5 flex items-center gap-1.5 font-['Inter'] text-[11px] text-[#86868B]">
                        {formatCommentDate(comment.createdAt)}
                        {comment.editedAt && <span title={`수정 ${formatCommentDate(comment.editedAt)}`} className="text-[#686868]">(수정됨)</span>}
                      </span>
                    </div>
                  </div>

                  <div className="pl-[42px] pr-[10px]">
                    {discussionEdit?.type === 'comment' && discussionEdit.commentId === comment.id ? (
                      <InlineDiscussionEditor
                        label={`comment-${comment.id}`}
                        value={editText}
                        originalValue={discussionEdit.originalText}
                        onChange={setEditText}
                        onSave={saveEdit}
                        onCancel={cancelEdit}
                        isSaving={pendingEdit === `comment:${comment.id}`}
                      />
                    ) : (
                      <div className="whitespace-pre-wrap break-words text-[14px] leading-relaxed text-[#E5E5E5]">{comment.text}</div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-[-2px] pt-2 border-t border-[#333]/20 pl-[42px] gap-3">
                    <div className="flex items-center gap-[12px]">
                      {!isReadOnly && <button
                        type="button"
                        onClick={() => toggleReaction('comment', comment.id, 'like')}
                        disabled={pendingReaction === `comment:${comment.id}:like`}
                        aria-pressed={hasCurrentUserReaction(comment, 'like', actor.userId)}
                        aria-label={`${hasCurrentUserReaction(comment, 'like', actor.userId) ? '좋아요 취소' : '좋아요'}, 현재 ${reactionCount(comment, 'like')}명`}
                        className={`flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] transition-colors border cursor-pointer text-[12px] disabled:cursor-wait disabled:opacity-60 ${hasCurrentUserReaction(comment, 'like', actor.userId) ? 'bg-[#ff3b30]/10 border-[#ff3b30]/30 text-[#ff3b30]' : 'bg-transparent border-[#333] hover:border-[#444] text-[#86868B] hover:text-[#E5E5E5]'}`}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill={hasCurrentUserReaction(comment, 'like', actor.userId) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                        <span className="font-semibold">{reactionCount(comment, 'like')}</span>
                      </button>}
                      {!isReadOnly && <button
                        type="button"
                        onClick={() => toggleReaction('comment', comment.id, 'check')}
                        disabled={pendingReaction === `comment:${comment.id}:check`}
                        aria-pressed={hasCurrentUserReaction(comment, 'check', actor.userId)}
                        aria-label={`${hasCurrentUserReaction(comment, 'check', actor.userId) ? '확인 취소' : '확인'}, 현재 ${reactionCount(comment, 'check')}명`}
                        className={`flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] transition-colors border cursor-pointer text-[12px] disabled:cursor-wait disabled:opacity-60 ${hasCurrentUserReaction(comment, 'check', actor.userId) ? 'bg-[#2997ff]/10 border-[#2997ff]/30 text-[#2997ff]' : 'bg-transparent border-[#333] hover:border-[#444] text-[#86868B] hover:text-[#E5E5E5]'}`}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        <span className="font-semibold">{reactionCount(comment, 'check')}</span>
                      </button>}
                      <button
                        type="button"
                        onClick={() => setExpandedComments((current) => ({ ...current, [comment.id]: !current[comment.id] }))}
                        aria-expanded={Boolean(expandedComments[comment.id])}
                        aria-controls={`replies-${comment.id}`}
                        className={`flex items-center gap-[6px] px-[10px] py-[4px] rounded-[6px] border text-[12px] font-medium transition-all cursor-pointer ${expandedComments[comment.id] ? 'bg-[#2997ff]/10 border-[#2997ff]/30 text-[#2997ff]' : 'bg-transparent border-[#333] hover:border-[#444] text-[#86868B] hover:text-white'}`}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        <span>댓글 {comment.replies?.length || 0}</span>
                      </button>
                    </div>
                    <div data-reaction-profiles className="ml-auto flex min-w-0 items-center gap-[8px] pr-[2px]" aria-live="polite">
                      {reactionCount(comment, 'like') > 0 && <div className="flex items-center gap-[4px] text-[#ff3b30]"><svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg><SonghyeonReactionAvatarStack reactors={comment.reactions.like} label="좋아요" /></div>}
                      {reactionCount(comment, 'check') > 0 && <div className="flex items-center gap-[4px] text-[#2997ff]"><svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg><SonghyeonReactionAvatarStack reactors={comment.reactions.check} label="확인" /></div>}
                    </div>
                  </div>

                  {expandedComments[comment.id] && (
                    <div id={`replies-${comment.id}`} className="mt-3 border-t border-[#333]/20 pt-3 w-full flex flex-col gap-3 pl-[42px]">
                      {comment.replies?.map((reply) => (
                        <div key={reply.id} className="bg-white/[0.02] border border-[#2c2c2e] rounded-[8px] p-[10px] flex gap-[8px] group/reply">
                          <CommentAvatar comment={reply} small />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="flex items-center gap-[6px]"><span className="truncate text-[12px] font-bold text-white">{reply.author}</span><span className="shrink-0 text-[10px] font-bold text-[#82afb9] bg-[#82afb9]/10 px-1.5 py-0.5 rounded">{reply.authorGroup}</span></div>
                                <span className="flex items-center gap-1 text-[10px] text-[#86868B]">
                                  {formatCommentDate(reply.createdAt)}
                                  {reply.editedAt && <span title={`수정 ${formatCommentDate(reply.editedAt)}`} className="text-[#686868]">(수정됨)</span>}
                                </span>
                              </div>
                              <div className="flex shrink-0 items-center gap-2">
                                {!isReadOnly && reply.authorId === actor.userId && <button type="button" onClick={() => beginEdit('reply', comment.id, reply, reply.id)} disabled={Boolean(pendingEdit)} className="cursor-pointer text-[11px] text-[#86868B] transition-colors hover:text-[#9cc4e6] disabled:cursor-wait disabled:opacity-50" aria-label={`${reply.author} 대댓글 수정`}>수정</button>}
                                {!isReadOnly && reply.authorEmail?.toLowerCase() === actor.email?.toLowerCase() && <button type="button" onClick={() => removeReply(comment.id, reply.id)} className="text-[11px] text-[#86868B] hover:text-[#FF453A] transition-colors cursor-pointer" aria-label={`${reply.author} 대댓글 삭제`}>삭제</button>}
                              </div>
                            </div>
                            <div className="mt-2">
                              {discussionEdit?.type === 'reply' && discussionEdit.replyId === reply.id ? (
                                <InlineDiscussionEditor
                                  label={`reply-${reply.id}`}
                                  value={editText}
                                  originalValue={discussionEdit.originalText}
                                  onChange={setEditText}
                                  onSave={saveEdit}
                                  onCancel={cancelEdit}
                                  isSaving={pendingEdit === `reply:${reply.id}`}
                                />
                              ) : (
                                <div className="whitespace-pre-wrap break-words text-[13px] leading-relaxed text-[#A1A1AA]">{reply.text}</div>
                              )}
                            </div>
                            <div className="mt-2 flex items-center gap-[8px]">
                              {!isReadOnly && <button type="button" onClick={() => toggleReaction('reply', reply.id, 'like')} disabled={pendingReaction === `reply:${reply.id}:like`} aria-pressed={hasCurrentUserReaction(reply, 'like', actor.userId)} aria-label={`대댓글 좋아요, 현재 ${reactionCount(reply, 'like')}명`} className={`flex items-center gap-[4px] text-[10px] transition-colors cursor-pointer disabled:cursor-wait ${hasCurrentUserReaction(reply, 'like', actor.userId) ? 'text-[#ff3b30]' : 'text-[#86868B] hover:text-[#A1A1AA]'}`}><svg width="10" height="10" viewBox="0 0 24 24" fill={hasCurrentUserReaction(reply, 'like', actor.userId) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>{reactionCount(reply, 'like')}</button>}
                              {!isReadOnly && <button type="button" onClick={() => toggleReaction('reply', reply.id, 'check')} disabled={pendingReaction === `reply:${reply.id}:check`} aria-pressed={hasCurrentUserReaction(reply, 'check', actor.userId)} aria-label={`대댓글 확인, 현재 ${reactionCount(reply, 'check')}명`} className={`flex items-center gap-[4px] text-[10px] transition-colors cursor-pointer disabled:cursor-wait ${hasCurrentUserReaction(reply, 'check', actor.userId) ? 'text-[#2997ff]' : 'text-[#86868B] hover:text-[#A1A1AA]'}`}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>{reactionCount(reply, 'check')}</button>}
                              <div className="ml-auto flex items-center gap-[6px]"><SonghyeonReactionAvatarStack reactors={reply.reactions?.like || []} label="대댓글 좋아요" sizeClass="w-[18px] h-[18px]" /><SonghyeonReactionAvatarStack reactors={reply.reactions?.check || []} label="대댓글 확인" sizeClass="w-[18px] h-[18px]" /></div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {!isReadOnly && <form onSubmit={(event) => { event.preventDefault(); submitReply(comment.id); }} className="w-full relative mt-1">
                        <textarea value={replyText[comment.id] || ''} onChange={(event) => setReplyText((current) => ({ ...current, [comment.id]: event.target.value }))} placeholder="대댓글을 입력하세요..." className="w-full bg-[#2a2a2c]/50 border border-[#333] rounded-[8px] p-[10px] text-[13px] text-[#E5E5E5] leading-relaxed resize-y focus:outline-none focus:border-[#2997ff] min-h-[60px]" />
                        <div className="flex justify-end gap-[8px] mt-[6px]"><button type="button" onClick={() => { setExpandedComments((current) => ({ ...current, [comment.id]: false })); setReplyText((current) => ({ ...current, [comment.id]: '' })); }} className="px-[10px] py-[4px] bg-transparent border border-[#444] rounded-[6px] text-[11px] text-[#A1A1AA] hover:text-[#E5E5E5] transition-colors cursor-pointer">취소</button><button type="submit" disabled={!replyText[comment.id]?.trim() || pendingReply === comment.id} className="px-[12px] py-[4px] bg-[#2997ff] hover:bg-[#0071e3] border border-transparent rounded-[6px] text-[11px] text-white font-bold transition-colors disabled:opacity-50 cursor-pointer">{pendingReply === comment.id ? '등록 중...' : '댓글 등록'}</button></div>
                      </form>}
                    </div>
                  )}
                </article>
                ))}

                {comments.length === 0 && (
                  <div className="py-[40px] text-center text-[14px] text-[#86868B] bg-[#1c1c1e] border border-[#2c2c2e] rounded-[16px] w-full">등록된 글이 없습니다.</div>
                )}
              </div>

              {!isReadOnly ? <form className="mt-[10px] w-full rounded-[16px] bg-[#5d5d5d] p-[1px]" onSubmit={(event) => { event.preventDefault(); submitComment(); }}>
                <div className="w-full h-full bg-[#262626] rounded-[15px] overflow-hidden">
                  <div className="w-full px-[20px] pt-[16px] pb-[18px] bg-transparent">
                    <textarea
                      value={commentText}
                      onChange={(event) => setCommentText(event.target.value)}
                      placeholder="진행 이력, 협업 요청, 리스크 판단 필요사항, 의사결정 필요항목을 입력하세요."
                      className="w-full bg-transparent caret-white outline-none resize-y h-[80px] leading-relaxed text-[13px] text-[#E5E5E5] placeholder:text-[#bbb9af] relative z-10 font-sans p-0 border-0 m-0 box-border"
                      spellCheck={false}
                    />
                  </div>
                  <div className="w-full pl-[20px] pr-[12px] gap-4 py-[6px] border-t border-[#333] flex justify-between items-center">
                    <div className="flex-1" />
                    <button
                      type="submit"
                      disabled={!commentText.trim() || isSubmittingComment}
                      className="px-[32px] py-[6px] rounded-[8px] border border-[#444] text-[#E5E5E5] font-bold text-[13px] transition-all duration-200 whitespace-nowrap relative left-[2px] top-[-1px] hover:bg-[#333] hover:border-[#555] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmittingComment ? '저장 중...' : '작성하기'}
                    </button>
                  </div>
                </div>
              </form> : <div className="mt-[10px] rounded-[12px] border border-[#6f9fc7]/20 bg-[#6f9fc7]/[0.05] px-4 py-3 text-[11px] text-[#9cc4e6]">게스트는 협업 기록을 읽을 수 있습니다. 작성·반응은 로그인 후 이용해 주세요.</div>}
            </section>

            {visibleActivity.length > 0 && (
              <section className="rounded-[16px] border border-[#2c2c2e] bg-white/[0.02] p-5">
                <h3 className="text-[13px] font-bold text-[#E5E5E5]">변경 이력</h3>
                <div className="mt-3 space-y-2">
                  {visibleActivity.map((item) => <div key={item.id} className="border-l border-[#3c3c3c] pl-3 text-[11px]"><div className="flex items-center justify-between gap-3"><span className="text-[#86868B]">{item.actor} · {new Date(item.createdAt).toLocaleString('ko-KR')}</span>{canDeleteActivity && <button type="button" aria-label="변경 이력 개별 삭제" onClick={() => removeActivity(item.id)} className="shrink-0 cursor-pointer text-[10px] text-[#686868] hover:text-[#ff453a]">삭제</button>}</div><div className="mt-1 text-[#A1A1AA]">{activityDescription(item)}</div></div>)}
                </div>
              </section>
            )}
          </div>

          <footer className="flex items-center justify-between gap-3 border-t border-[#3c3c3c]/80 bg-[#1c1c1e]/90 px-[10px] py-4">{canArchive && !isReadOnly ? <button type="button" onClick={() => onArchiveRequest?.(task)} className="cursor-pointer rounded-[8px] border border-[#a78661]/25 bg-[#a78661]/[0.06] px-3 py-2 text-[11px] font-bold text-[#a98d70] hover:bg-[#a78661]/10 hover:text-[#bca080]">업무 보관</button> : <span className="text-[11px] font-bold text-[#6f9fc7]">{isReadOnly ? '읽기 전용' : ''}</span>}<div className="flex items-center gap-2"><button type="button" onClick={onClose} className="rounded-[8px] border border-[#3c3c3c] bg-white/5 px-4 py-2 text-[13px] font-bold text-white hover:bg-white/10">닫기</button>{!isReadOnly && <>{task.status !== '완료' && <button type="button" onClick={() => setWorkflowTargetStatus(workflowActions[0]?.status || '')} className="rounded-[8px] border border-[#4f8fca]/30 bg-[#4f8fca]/10 px-4 py-2 text-[13px] font-bold text-[#82add0] hover:bg-[#4f8fca]/15">상태 처리</button>}<button type="button" onClick={() => setEditorOpen(true)} className="rounded-[8px] bg-[#2997ff] px-5 py-2 text-[13px] font-bold text-white">업무 수정하기</button></>}</div></footer>
        </div>
      </aside>
      {editorOpen && !isReadOnly && <SonghyeonTaskEditorModal task={task} onClose={() => setEditorOpen(false)} onWorkflowSaved={async (updated) => { setActivity(await loadActivity(task.sourceKey)); onSaved(updated); }} onSaved={async (updated) => { setActivity(await loadActivity(task.sourceKey)); onSaved(updated); setEditorOpen(false); }} />}
      {workflowTargetStatus && !isReadOnly && <SonghyeonTaskWorkflowModal task={task} initialTargetStatus={workflowTargetStatus} onClose={() => setWorkflowTargetStatus('')} onSaved={async (updated) => { setActivity(await loadActivity(task.sourceKey)); onSaved(updated); setWorkflowTargetStatus(''); }} />}
    </div>
  );
}
