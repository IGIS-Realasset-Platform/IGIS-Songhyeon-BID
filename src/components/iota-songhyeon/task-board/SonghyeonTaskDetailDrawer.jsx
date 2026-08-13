import { useEffect, useState } from 'react';
import { useSonghyeonAuth } from '../../../context/SonghyeonAuthContext';
import { addComment, deleteComment, loadActivity, loadComments } from '../../../lib/songhyeonTaskRepository';
import SonghyeonTaskEditorModal from './SonghyeonTaskEditorModal';

const fieldLabels = {
  status: '상태', importanceLevel: '중요도', meetingAgenda: '회의상정', isBlocker: 'Blocker',
  needsDecision: '결정필요', assignee: '담당자', dueDate: '마감기한', nextAction: '다음 액션',
};

const Field = ({ label, children, className = '' }) => <div className={className}><span className="block text-[11px] text-[#86868B]">{label}</span><div className="mt-[3px] text-[13px] font-bold text-[#E5E5E5]">{children}</div></div>;
export default function SonghyeonTaskDetailDrawer({ task, onClose, onSaved }) {
  const { user, member } = useSonghyeonAuth();
  const [editorOpen, setEditorOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [activity, setActivity] = useState([]);
  const [commentText, setCommentText] = useState('');

  const [repositoryError, setRepositoryError] = useState('');
  const actor = { userId: user?.id, email: user?.email, name: member?.staff_name || user?.email || '송현 BID TF' };


  useEffect(() => {
    if (!task) return;
    Promise.all([loadComments(task.sourceKey), loadActivity(task.sourceKey)])
      .then(([nextComments, nextActivity]) => { setComments(nextComments); setActivity(nextActivity); })
      .catch((error) => setRepositoryError(error.message || '협업 기록을 불러오지 못했습니다.'));
  }, [task]);
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [onClose]);

  if (!task) return null;

  const submitComment = async () => {
    if (!commentText.trim()) return;
    setRepositoryError('');
    try {
      await addComment(task.sourceKey, commentText, actor);
      setCommentText('');
      setComments(await loadComments(task.sourceKey));
      setActivity(await loadActivity(task.sourceKey));
    } catch (error) {
      setRepositoryError(error.message || '댓글을 등록하지 못했습니다.');
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

  return (
    <div className="fixed inset-0 z-[100000] overflow-hidden pointer-events-none" data-task-detail-overlay data-pmo-task-detail-overlay>
      <button type="button" aria-label="업무 상세 닫기" onClick={onClose} className="absolute inset-0 bg-black/10 pointer-events-auto" />
      <aside data-task-detail-drawer data-pmo-task-detail-drawer className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-auto">
        <div className="w-screen max-w-[550px] transform transition-transform duration-300 ease-in-out flex h-full flex-col border-l border-[#3c3c3c]/80 bg-[#1c1c1e]/95 text-white shadow-2xl backdrop-blur-xl">
          <header className="px-[10px] py-3 sticky top-0 z-20 flex items-center justify-between border-b border-[#3c3c3c]/80 bg-[#1c1c1e]/90">
            <div className="flex flex-wrap items-center gap-2"><span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[12px] font-bold text-[#86868B]">{task.displayId}</span><span className="rounded border border-[#3c3c3c] bg-[#3A3A3C] px-2 py-0.5 text-[12px] font-bold">송현 BID</span><span className="rounded border border-[#3c3c3c] bg-white/5 px-2 py-0.5 text-[12px] font-bold">{task.stage}</span></div>
            <button type="button" onClick={onClose} aria-label="업무 상세 닫기" className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-[20px] font-bold text-[#86868B] hover:bg-white/5 hover:text-white">✕</button>
          </header>

          <div className="timeline-scrollbar flex-1 space-y-[10px] overflow-y-auto px-[10px] py-6">
            {repositoryError && <div role="alert" className="rounded-[10px] border border-[#ff453a]/25 bg-[#ff453a]/10 px-3 py-2 text-[12px] text-[#ff8a82]">{repositoryError}</div>}
            <div className="relative top-[-6px] space-y-1 pl-[16px]"><h2 className="text-[22px] font-bold leading-snug text-[#bdbba7]">{task.taskName}</h2><div className="flex flex-wrap gap-2 pt-[2px]"><span className="rounded border border-[#2997ff]/25 bg-[#2997ff]/10 px-2 py-0.5 text-[11px] font-bold text-[#60a5fa]">{task.status}</span><span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-bold text-[#86868B]">중요도: {task.importanceLevel}</span><span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-bold text-[#86868B]">{task.meetingAgenda ? '회의상정' : '미상정'}</span></div></div>

            {task.isBlocker && <div className="rounded-[12px] border border-[#ff453a]/20 bg-[#ff453a]/10 p-4"><h4 className="text-[13px] font-bold text-[#ff453a]">현재 진행 병목(Blocker) 상황</h4><p className="mt-1 text-[12px] leading-relaxed text-gray-300">이 업무는 병목 해소가 필요한 주요 모니터링 대상으로 설정되어 있습니다.</p></div>}

            <div className="space-y-[14px] rounded-[16px] border border-[#2c2c2e] bg-white/[0.02] p-5 text-[13px]">
              <div className="grid grid-cols-4 gap-4"><Field label="실행주관">{task.leadDept || '-'}</Field><Field label="담당자">{task.assignee || '미정'}</Field><Field label="협조 부서" className="col-span-2">{Array.isArray(task.coopDepts) ? task.coopDepts.join('; ') || '-' : task.coopDepts || '-'}</Field></div>
              <div className="grid grid-cols-4 gap-4"><Field label="지원필요">{task.supportNeeded || '-'}</Field><Field label="GATE 단계">{task.gateStage || task.stage || '-'}</Field><Field label="외부 상대방" className="col-span-2">{task.externalParty || '-'}</Field></div>
              <div className="grid grid-cols-4 gap-4"><Field label="회의상정">{task.meetingAgenda ? '상정' : '미상정'}</Field><Field label="마감 기한">{task.dueDate || '-'}</Field><Field label="의사결정필요" className="col-span-2">{task.needsDecision ? '필요' : '불필요'}</Field></div>
            </div>
            <div className="flex flex-col rounded-[16px] border border-[#2c2c2e] bg-white/[0.02] p-5"><Field label="업무 목적"><p className={`font-normal leading-relaxed ${task.taskPurpose || task.sourceText ? 'text-[#bdbba7]' : 'text-[#686868]'}`}>{task.taskPurpose || task.sourceText || '등록된 내용이 없습니다.'}</p></Field><div className="my-[12px] h-px bg-[#3c3c3c]/30" /><Field label="필요 산출물"><p className={`font-normal leading-relaxed ${task.deliverables ? 'text-[#bdbba7]' : 'text-[#686868]'}`}>{task.deliverables || '등록된 내용이 없습니다.'}</p></Field><div className="my-[12px] h-px bg-[#3c3c3c]/30" /><Field label="다음 액션"><p className={`font-normal leading-relaxed ${task.nextAction ? 'text-[#bdbba7]' : 'text-[#686868]'}`}>{task.nextAction || '등록된 내용이 없습니다.'}</p></Field>{task.agendaReason && <><div className="my-[12px] h-px bg-[#3c3c3c]/30" /><Field label="회의 상정 사유 (Agenda Context)"><p className="font-normal leading-relaxed text-[#bdbba7]">{task.agendaReason}</p></Field></>}</div>

            <section className="rounded-[16px] border border-[#2c2c2e] bg-white/[0.02] p-5"><div className="flex items-center justify-between"><h3 className="text-[13px] font-bold text-[#E5E5E5]">업무 협업 게시판</h3><span className="text-[11px] text-[#86868B]">댓글 {comments.length}</span></div><div className="mt-3 space-y-2">{comments.map((comment) => <article key={comment.id} className="group rounded-[8px] border border-[#2c2c2e] bg-white/[0.02] p-[10px]"><div className="flex items-center justify-between"><span className="text-[12px] font-bold text-white">{comment.author}</span><span className="text-[10px] text-[#686868]">{new Date(comment.createdAt).toLocaleString('ko-KR')}</span></div><p className="mt-2 whitespace-pre-wrap break-words text-[13px] text-[#A1A1AA]">{comment.text}</p>{comment.authorEmail === actor.email && <button type="button" onClick={() => removeComment(comment.id)} className="mt-2 text-[10px] text-[#686868] hover:text-[#ff453a]">삭제</button>}</article>)}</div><textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="댓글을 입력하세요..." className="mt-3 h-20 w-full resize-y rounded-[8px] border border-[#3c3c3c] bg-[#2c2c2b] p-3 text-[13px] text-white outline-none focus:border-[#2997ff]" /><div className="mt-2 flex justify-end"><button type="button" onClick={submitComment} disabled={!commentText.trim()} className="rounded-[8px] bg-[#2997ff] px-4 py-2 text-[12px] font-bold text-white disabled:opacity-40">댓글 등록</button></div></section>

            <section className="rounded-[16px] border border-[#2c2c2e] bg-white/[0.02] p-5"><h3 className="text-[13px] font-bold text-[#E5E5E5]">변경 이력</h3><div className="mt-3 space-y-2">{activity.length ? activity.map((item) => <div key={item.id} className="border-l border-[#3c3c3c] pl-3 text-[11px]"><div className="text-[#86868B]">{item.actor} · {new Date(item.createdAt).toLocaleString('ko-KR')}</div><div className="mt-1 text-[#A1A1AA]">{item.action === 'task_updated' ? item.payload.changes.map((change) => fieldLabels[change.field] || change.field).join(', ') + ' 변경' : item.action === 'comment_added' ? '댓글 등록' : '댓글 삭제'}</div></div>) : <p className="text-[12px] text-[#686868]">변경 이력이 없습니다.</p>}</div></section>
          </div>

          <footer className="flex justify-end gap-3 border-t border-[#3c3c3c]/80 bg-[#1c1c1e]/90 px-[10px] py-4"><button type="button" onClick={onClose} className="rounded-[8px] border border-[#3c3c3c] bg-white/5 px-4 py-2 text-[13px] font-bold text-white hover:bg-white/10">닫기</button><button type="button" onClick={() => setEditorOpen(true)} className="rounded-[8px] bg-[#2997ff] px-5 py-2 text-[13px] font-bold text-white">업무 수정하기</button></footer>
        </div>
      </aside>
      {editorOpen && <SonghyeonTaskEditorModal task={task} onClose={() => setEditorOpen(false)} onSaved={async (updated) => { setActivity(await loadActivity(task.sourceKey)); onSaved(updated); setEditorOpen(false); }} />}
    </div>
  );
}
