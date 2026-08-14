import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useSonghyeonAuth } from '../../../context/SonghyeonAuthContext';
import {
  completeTask,
  resumeTask,
  startTask,
  stopTask,
} from '../../../lib/songhyeonTaskRepository';
import { taskWorkflowActions } from './songhyeonTaskWorkflowActions.js';

const ACTION_TONES = {
  blue: 'border-[#4f8fca]/35 bg-[#4f8fca]/10 text-[#82add0] hover:bg-[#4f8fca]/15 hover:border-[#4f8fca]/50',
  green: 'border-[#4da566]/35 bg-[#4da566]/10 text-[#7fc18e] hover:bg-[#4da566]/15 hover:border-[#4da566]/50',
  red: 'border-[#bd5f5a]/35 bg-[#bd5f5a]/10 text-[#d98a85] hover:bg-[#bd5f5a]/15 hover:border-[#bd5f5a]/50',
};

const inputClassName = 'w-full rounded-[9px] border border-[#3c3c3c] bg-[#242426] px-3 py-2.5 text-[13px] leading-5 text-[#E5E5E5] outline-none transition-colors placeholder:text-[#686868] focus:border-[#6f9fc7] focus:ring-1 focus:ring-[#6f9fc7]/30';

export default function SonghyeonTaskWorkflowModal({ task, initialTargetStatus = '', onClose, onSaved }) {
  const { user, member, isReadOnly } = useSonghyeonAuth();
  const titleId = useId();
  const descriptionId = useId();
  const initialFocusRef = useRef(null);
  const dialogRef = useRef(null);
  const actions = useMemo(() => taskWorkflowActions(task?.status), [task?.status]);
  const [targetStatus, setTargetStatus] = useState(() => actions.some((action) => action.status === initialTargetStatus) ? initialTargetStatus : (actions[0]?.status || ''));
  const [completionSummary, setCompletionSummary] = useState('');
  const [completionEvidenceUrl, setCompletionEvidenceUrl] = useState('');
  const [transitionReason, setTransitionReason] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const selectedAction = actions.find((action) => action.status === targetStatus) || actions[0];
  const isCompletion = targetStatus === '완료';
  const isStop = targetStatus === '중단';
  const requiresReason = isStop || selectedAction?.requiresReason;
  const reasonLabel = isStop ? '중단 사유' : '재개 사유';

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    initialFocusRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape' || saving) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      onClose();
    };
    window.addEventListener('keydown', closeOnEscape, true);
    return () => window.removeEventListener('keydown', closeOnEscape, true);
  }, [onClose, saving]);

  if (!task || !actions.length || isReadOnly) return null;

  const keepFocusInside = (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialogRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href]')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    const summary = completionSummary.trim();
    const evidenceUrl = completionEvidenceUrl.trim();
    const reason = transitionReason.trim();
    if (isCompletion && !summary) {
      setError('완료한 내용을 입력해 주세요.');
      return;
    }
    if (requiresReason && !reason) {
      setError(`${reasonLabel}를 입력해 주세요.`);
      return;
    }
    if (evidenceUrl && !/^https:\/\//i.test(evidenceUrl)) {
      setError('완료 증빙 URL은 https:// 주소로 입력해 주세요.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const actor = { userId: user?.id, email: user?.email, name: member?.staff_name || user?.email || '송현 BID TF' };
      let updated;
      if (isCompletion) updated = await completeTask(task.sourceKey, { summary, evidenceUrl }, actor);
      else if (isStop) updated = await stopTask(task.sourceKey, { reason }, actor);
      else if (task.status === '미착수') updated = await startTask(task.sourceKey, actor);
      else updated = await resumeTask(task.sourceKey, { reason }, actor);
      await onSaved?.(updated);
    } catch (cause) {
      setError(cause.message || '업무 상태를 변경하지 못했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-task-workflow-modal className="pointer-events-auto fixed inset-0 z-[210000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) onClose(); }}>
      <section ref={dialogRef} onKeyDown={keepFocusInside} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId} className="w-full max-w-[510px] overflow-hidden rounded-[18px] border border-[#3c3c3c] bg-[#1c1c1e] text-left text-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-[#343436] px-5 py-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-bold text-[#686868]">{task.displayId}</p>
            <h2 id={titleId} className="mt-1 text-[17px] font-bold text-[#E5E5E5]">업무 상태 처리</h2>
            <p id={descriptionId} className="mt-1 truncate text-[12px] text-[#86868B]">{task.taskName}</p>
          </div>
          <button type="button" onClick={onClose} disabled={saving} aria-label="상태 처리 창 닫기" className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full text-[18px] text-[#86868B] hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40">✕</button>
        </header>

        <form onSubmit={submit}>
          <div className="space-y-4 px-5 py-5">
            {error && <div role="alert" className="rounded-[9px] border border-[#bd5f5a]/30 bg-[#bd5f5a]/10 px-3 py-2 text-[12px] text-[#d98a85]">{error}</div>}

            <fieldset>
              <legend className="mb-2 text-[11px] font-bold text-[#86868B]">다음 상태 선택</legend>
              <div className={`grid gap-2 ${actions.length === 3 ? 'grid-cols-3' : actions.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {actions.map((action, index) => {
                  const selected = targetStatus === action.status;
                  return (
                    <label key={action.status} className={`cursor-pointer rounded-[11px] border p-3 transition-colors focus-within:ring-1 focus-within:ring-[#82add0]/60 ${selected ? ACTION_TONES[action.tone] : 'border-[#343436] bg-white/[0.02] text-[#86868B] hover:border-[#4a4a4c] hover:bg-white/[0.04]'}`}>
                      <input ref={index === 0 ? initialFocusRef : undefined} type="radio" name="target-status" value={action.status} checked={selected} onChange={() => { setTargetStatus(action.status); setError(''); }} className="sr-only" />
                      <span className="flex items-center justify-between gap-3 text-[13px] font-bold"><span>{action.label}</span><span aria-hidden="true" className={`h-2 w-2 rounded-full ${selected ? 'bg-current' : 'bg-[#555]'}`} /></span>
                      <span className="mt-1.5 block text-[11px] font-normal leading-4 opacity-80">{action.description}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {isCompletion && (
              <div className="space-y-3 rounded-[12px] border border-[#4da566]/20 bg-[#4da566]/[0.04] p-4">
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold text-[#9ca89f]">완료 내용 <span className="text-[#d98a85]">필수</span></span>
                  <textarea value={completionSummary} onChange={(event) => setCompletionSummary(event.target.value)} rows={4} placeholder="완료한 결과와 확인사항을 간단히 기록하세요." className={`${inputClassName} resize-y`} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold text-[#9ca89f]">완료 증빙 URL <span className="font-normal text-[#686868]">선택</span></span>
                  <input type="url" inputMode="url" value={completionEvidenceUrl} onChange={(event) => setCompletionEvidenceUrl(event.target.value)} placeholder="https://" className={inputClassName} />
                </label>
              </div>
            )}

            {requiresReason && (
              <label className="block rounded-[12px] border border-[#3c3c3c] bg-white/[0.02] p-4">
                <span className="mb-1.5 block text-[11px] font-bold text-[#9c9ca1]">{reasonLabel} <span className="text-[#d98a85]">필수</span></span>
                <textarea value={transitionReason} onChange={(event) => setTransitionReason(event.target.value)} rows={3} placeholder={isStop ? '업무를 중단하는 이유를 입력하세요.' : '업무를 다시 진행하는 이유를 입력하세요.'} className={`${inputClassName} resize-y`} />
              </label>
            )}

            {!isCompletion && !requiresReason && <p className="rounded-[10px] border border-[#343436] bg-white/[0.02] px-3 py-2.5 text-[11px] leading-5 text-[#86868B]">상태 변경 시 처리자와 변경 시각이 변경 이력에 기록됩니다.</p>}
          </div>

          <footer className="flex justify-end gap-2 border-t border-[#343436] bg-[#202022] px-5 py-3.5">
            <button type="button" onClick={onClose} disabled={saving} className="cursor-pointer rounded-[8px] border border-[#3c3c3c] px-4 py-2 text-[12px] font-bold text-[#A1A1AA] hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40">취소</button>
            <button type="submit" disabled={saving} className={`cursor-pointer rounded-[8px] border px-4 py-2 text-[12px] font-bold disabled:cursor-wait disabled:opacity-50 ${ACTION_TONES[selectedAction?.tone || 'blue']}`}>{saving ? '처리 중…' : selectedAction?.label}</button>
          </footer>
        </form>
      </section>
    </div>
  );
}
