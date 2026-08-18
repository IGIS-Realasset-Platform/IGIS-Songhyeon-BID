import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { milestoneWeeks } from '../../../data/songhyeonMilestones';

const statusOptions = [
  ['not_started', '미착수'],
  ['in_progress', '진행중'],
  ['completed', '완료'],
  ['delayed', '지연'],
  ['cancelled', '중단'],
];

const fieldClass = 'mt-1 h-10 w-full rounded-[8px] border border-[#474747] bg-[#292929] px-3 text-[13px] text-[#E5E5E5] outline-none placeholder:text-[#686868] focus:border-[#2997ff] disabled:cursor-not-allowed disabled:opacity-50';

const itemDate = (item, key, indexKey) => item?.[key] || milestoneWeeks[item?.[indexKey]]?.[key] || '';

const initialForm = (item, parentItem) => ({
  displayName: item?.displayName || '',
  sourceText: item?.sourceText || '',
  leadLabel: item?.leadLabel || parentItem?.leadLabel || '',
  categoryMain: item?.categoryMain || parentItem?.categoryMain || '',
  status: item?.status || 'not_started',
  startDate: itemDate(item, 'startDate', 'startIndex') || itemDate(parentItem, 'startDate', 'startIndex'),
  endDate: itemDate(item, 'endDate', 'endIndex') || itemDate(parentItem, 'endDate', 'endIndex'),
});

export default function SonghyeonScheduleRowEditorModal({
  mode,
  item,
  parentItem,
  busy = false,
  errorMessage = '',
  onClose,
  onSave,
  onDelete,
}) {
  const [form, setForm] = useState(() => initialForm(item, parentItem));
  const isCreate = mode === 'create';
  const isDelete = mode === 'delete';
  const title = isCreate ? '상세 일정 추가' : isDelete ? '상세 일정 삭제' : '상세 일정 수정';
  const validationError = !form.displayName.trim()
    ? '업무명을 입력해 주세요.'
    : !form.leadLabel.trim() || !form.categoryMain.trim()
      ? '실행주관과 업무분류를 모두 입력해 주세요.'
    : !form.startDate || !form.endDate
      ? '시작일과 종료일을 모두 입력해 주세요.'
      : form.startDate > form.endDate
        ? '종료일은 시작일보다 빠를 수 없습니다.'
        : '';

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !busy) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [busy, onClose]);

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    if (busy || validationError) return;
    const values = {
      displayName: form.displayName.trim(),
      sourceText: form.sourceText.trim() || form.displayName.trim(),
      leadLabel: form.leadLabel.trim(),
      categoryMain: form.categoryMain.trim(),
      status: form.status,
      startDate: form.startDate,
      endDate: form.endDate,
    };
    onSave(isCreate ? {
      ...values,
      parentSourceKey: parentItem.sourceKey,
      stage: parentItem.stage,
    } : values);
  };

  return createPortal(
    <div className="fixed inset-0 z-[10020] flex items-center justify-center bg-black/75 px-5 py-6" role="dialog" aria-modal="true" aria-labelledby="schedule-row-editor-title" data-schedule-row-editor-modal={mode}>
      <button type="button" className="absolute inset-0 cursor-default" aria-label="닫기" disabled={busy} onClick={onClose} />
      <section className="relative w-full max-w-[620px] overflow-hidden rounded-[20px] border border-[#454545] bg-[#20201f] shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
        <header className="flex items-start justify-between border-b border-[#393939] px-5 py-4">
          <div className="min-w-0">
            <h3 id="schedule-row-editor-title" className="text-[20px] font-bold text-[#E5E5E5]">{title}</h3>
            <p className="mt-1 truncate text-[12px] text-[#86868B]">{parentItem?.displayName || item?.displayName}</p>
          </div>
          <button type="button" disabled={busy} onClick={onClose} className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-[#444] text-[20px] text-[#a1a1aa] hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-45">×</button>
        </header>

        {isDelete ? (
          <div className="p-5" data-schedule-row-delete-confirm>
            <div className="rounded-[12px] border border-[#71413d] bg-[#ff453a]/[0.07] p-4">
              <p className="text-[15px] font-bold text-[#E5E5E5]">{item.displayName}</p>
              <p className="mt-3 text-[13px] leading-6 text-[#d4aaa6]">이 상세 일정 행과 연결 정보만 삭제됩니다. 연결된 통합업무는 통합업무보드에 그대로 남으며 삭제되지 않습니다.</p>
            </div>
            {errorMessage ? <p className="mt-3 text-[12px] leading-5 text-[#e4817b]" role="alert">{errorMessage}</p> : null}
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" disabled={busy} onClick={onClose} className="h-10 cursor-pointer rounded-[8px] border border-[#4a4a4a] px-4 text-[13px] font-bold text-[#a1a1aa] hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-45">취소</button>
              <button type="button" disabled={busy} onClick={onDelete} className="h-10 cursor-pointer rounded-[8px] border border-[#8b4a45] bg-[#ff453a]/15 px-4 text-[13px] font-bold text-[#e4817b] hover:bg-[#ff453a]/25 disabled:cursor-not-allowed disabled:opacity-45">{busy ? '삭제 중…' : '상세 일정 삭제'}</button>
            </div>
          </div>
        ) : (
          <form className="grid grid-cols-2 gap-4 p-5" onSubmit={handleSubmit}>
            <label className="col-span-2 text-[12px] font-bold text-[#a1a1aa]">업무명
              <input autoFocus value={form.displayName} maxLength={200} disabled={busy} onChange={(event) => setField('displayName', event.target.value)} className={fieldClass} required />
            </label>
            <label className="col-span-2 text-[12px] font-bold text-[#a1a1aa]">상세 설명
              <textarea value={form.sourceText} maxLength={1000} disabled={busy} onChange={(event) => setField('sourceText', event.target.value)} className="mt-1 h-20 w-full resize-none rounded-[8px] border border-[#474747] bg-[#292929] p-3 text-[13px] leading-5 text-[#E5E5E5] outline-none placeholder:text-[#686868] focus:border-[#2997ff] disabled:cursor-not-allowed disabled:opacity-50" placeholder="필요한 경우 상세 내용을 입력하세요." />
            </label>
            <label className="text-[12px] font-bold text-[#a1a1aa]">실행주관
              <input value={form.leadLabel} maxLength={100} disabled={busy} onChange={(event) => setField('leadLabel', event.target.value)} className={fieldClass} required />
            </label>
            <label className="text-[12px] font-bold text-[#a1a1aa]">업무분류
              <input value={form.categoryMain} maxLength={100} disabled={busy} onChange={(event) => setField('categoryMain', event.target.value)} className={fieldClass} required />
            </label>
            <label className="col-span-2 text-[12px] font-bold text-[#a1a1aa]">진행상태
              <select value={form.status} disabled={busy} onChange={(event) => setField('status', event.target.value)} className={`${fieldClass} cursor-pointer disabled:cursor-not-allowed`}>
                {statusOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label className="text-[12px] font-bold text-[#a1a1aa]">시작일
              <input type="date" value={form.startDate} disabled={busy} onChange={(event) => setField('startDate', event.target.value)} className={`${fieldClass} [color-scheme:dark]`} required />
            </label>
            <label className="text-[12px] font-bold text-[#a1a1aa]">종료일
              <input type="date" min={form.startDate || undefined} value={form.endDate} disabled={busy} onChange={(event) => setField('endDate', event.target.value)} className={`${fieldClass} [color-scheme:dark]`} required />
            </label>
            {errorMessage ? <p className="col-span-2 text-[12px] leading-5 text-[#e4817b]" role="alert">{errorMessage}</p> : null}
            {validationError && form.displayName ? <p className="col-span-2 text-[12px] leading-5 text-[#e4817b]">{validationError}</p> : null}
            <div className="col-span-2 mt-1 flex justify-end gap-2 border-t border-[#393939] pt-4">
              <button type="button" disabled={busy} onClick={onClose} className="h-10 cursor-pointer rounded-[8px] border border-[#4a4a4a] px-4 text-[13px] font-bold text-[#a1a1aa] hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-45">취소</button>
              <button type="submit" disabled={busy || Boolean(validationError)} className="h-10 cursor-pointer rounded-[8px] bg-[#2997ff] px-5 text-[13px] font-bold text-white hover:bg-[#3aa0ff] disabled:cursor-not-allowed disabled:opacity-45">{busy ? '저장 중…' : isCreate ? '상세 일정 추가' : '수정 저장'}</button>
            </div>
          </form>
        )}
      </section>
    </div>,
    document.body,
  );
}
