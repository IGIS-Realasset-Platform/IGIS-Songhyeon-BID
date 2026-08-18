import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

const inputClass = 'h-9 w-full rounded-[8px] border border-[#444] bg-[#292929] px-3 text-[13px] text-white outline-none focus:border-[#2997ff]';

export default function SonghyeonScheduleTaskLinkModal({
  item,
  tasks,
  links,
  busy,
  errorMessage,
  canManageLinks = false,
  readOnly = false,
  onClose,
  onLink,
  onUnlink,
  onOpenTask,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const itemStartDate = item.startDate || '';
  const itemEndDate = item.endDate || '';
  const formatDate = (value) => value ? value.replaceAll('-', '.') : '미정';
  const explicitLinkKeys = new Set(links
    .filter((link) => link.scheduleSourceKey === item.sourceKey)
    .map((link) => link.taskSourceKey));
  const linkedTasks = tasks.filter((task) => explicitLinkKeys.has(task.sourceKey));
  const filteredTasks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return tasks.filter((task) => !query || `${task.displayId} ${task.taskName} ${task.categoryMain} ${task.leadDept} ${task.assignee}`.toLowerCase().includes(query));
  }, [searchTerm, tasks]);

  const linkedList = (
    <section data-linked-task-list>
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-[12px] font-bold text-white">연결된 통합업무</h4>
        <span className="text-[13px] font-bold text-[#4ade80]">{linkedTasks.length}건</span>
      </div>
      <div className="space-y-2">
        {linkedTasks.map((task) => {
          const link = links.find((entry) => entry.scheduleSourceKey === item.sourceKey && entry.taskSourceKey === task.sourceKey);
          return (
            <div key={task.sourceKey} className="flex items-center gap-3 rounded-[12px] border border-[#30d158]/25 bg-[#30d158]/5 px-3 py-3">
              <button type="button" onClick={() => onOpenTask(task.sourceKey)} className="min-w-0 flex-1 cursor-pointer text-left">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[13px] font-black text-[#60a5fa]">{task.displayId}</span>
                  <span className="truncate text-[15px] font-bold text-white">{task.taskName}</span>
                  <span className="ml-auto text-[12px] font-bold text-[#60a5fa]">상세보기 →</span>
                </div>
                <div className="mt-1 text-[12px] text-[#86868B]">{task.categoryMain} · {task.leadDept || '실행주관 미정'}</div>
              </button>
              {link && canManageLinks && <button type="button" disabled={busy} onClick={() => onUnlink(link.id)} className="h-8 cursor-pointer rounded-[7px] border border-[#555] px-2.5 text-[12px] font-bold text-[#a1a1aa] hover:text-[#ff7169] disabled:cursor-not-allowed disabled:opacity-45">연결 해제</button>}
            </div>
          );
        })}
      </div>
    </section>
  );

  const overview = (
    <div className="timeline-scrollbar min-h-0 flex-1 overflow-y-auto p-5">
      {linkedList}
      {readOnly ? (
        <div className="mt-5 rounded-[12px] border border-[#6f9fc7]/20 bg-[#6f9fc7]/[0.05] px-4 py-3 text-[12px] text-[#9cc4e6]">게스트는 연결 업무와 일정을 읽을 수 있습니다. 변경은 로그인 후 이용해 주세요.</div>
      ) : (
        <section className="mt-5">
          <h4 className="mb-1 text-[12px] font-bold text-white">관리 메뉴</h4>
          <p className="mb-3 text-[13px] text-[#86868B]">필요한 작업 하나를 선택하세요.</p>
          {canManageLinks ? <button type="button" onClick={() => setActiveTab('existing')} className="w-full cursor-pointer rounded-[13px] border border-[#36658d] bg-[#2997ff]/10 p-4 text-left"><b className="block text-[13px] text-[#7cc0ff]">기존 통합업무 연결</b><span className="mt-1.5 block text-[13px] text-[#8e8e93]">추천 또는 검색으로 통합업무를 찾습니다.</span></button> : null}
        </section>
      )}
    </div>
  );

  const management = (
    <div className="timeline-scrollbar min-h-0 flex-1 overflow-y-auto p-5">
      <button type="button" onClick={() => setActiveTab('overview')} className="mb-4 cursor-pointer rounded-[7px] border border-[#444] px-3 py-2 text-[12px] font-bold text-[#a1a1aa]">← 요약으로</button>
      {activeTab === 'existing' && (
        <>
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="업무명·담당자·실행주관·분류 검색" className={inputClass} />
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {filteredTasks.map((task) => {
              const linked = linkedTasks.some((entry) => entry.sourceKey === task.sourceKey);
              return <div key={task.sourceKey} className="rounded-[13px] border border-[#40454b] bg-[#282b2f] p-3.5"><b className="text-[14px] text-white">{task.taskName}</b><p className="mt-1 text-[12px] text-[#86868B]">{task.displayId} · {task.categoryMain}</p><button type="button" disabled={linked || busy} onClick={() => onLink(task.sourceKey)} className="mt-3 h-8 cursor-pointer rounded-[7px] border border-[#296da8] bg-[#2997ff]/15 px-3 text-[12px] font-bold text-[#7cc0ff] disabled:cursor-not-allowed disabled:opacity-45">{linked ? '연결됨' : '연결'}</button></div>;
            })}
          </div>
        </>
      )}
    </div>
  );

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-5 py-6" role="dialog" aria-modal="true" data-schedule-task-link-modal>
      <button type="button" className="absolute inset-0" aria-label="닫기" onClick={onClose} />
      <div className="relative flex max-h-[90vh] w-full max-w-[900px] flex-col overflow-hidden rounded-[20px] border border-[#454545] bg-[#20201f] shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
        <header className="flex items-start justify-between border-b border-[#393939] px-5 py-4">
          <div>
            <span className="font-mono text-[14px] font-bold text-[#60a5fa]">{item.sourceKey}</span>
            <div className="mt-2 flex items-center gap-4"><h3 className="min-w-0 flex-1 text-[22px] font-bold text-white">{item.displayName}</h3><div className="inline-flex shrink-0 items-center rounded-[7px] border border-[#454545] bg-white/[0.03] px-2.5 py-1.5 text-[12px] font-bold text-[#bdbba7]"><span className="mr-2 text-[#86868B]">기간</span>{formatDate(itemStartDate)} ~ {formatDate(itemEndDate)}</div></div>
            <p className="mt-1.5 text-[13px] text-[#86868B]">{item.leadLabel} · {item.categoryMain}</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#444] text-[18px] text-[#a1a1aa]">×</button>
        </header>
        {errorMessage && <div className="mx-5 mt-4 rounded-[8px] border border-[#ff5f57]/40 bg-[#ff5f57]/10 px-3 py-2 text-[13px] text-[#ff7b74]">{errorMessage}</div>}
        {activeTab === 'overview' || readOnly ? overview : management}
      </div>
    </div>,
    document.body,
  );
}
