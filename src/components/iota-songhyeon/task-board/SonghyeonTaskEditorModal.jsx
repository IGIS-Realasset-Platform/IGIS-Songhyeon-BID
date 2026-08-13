import { useEffect, useState } from 'react';
import { useSonghyeonAuth } from '../../../context/SonghyeonAuthContext';
import { createTask, loadTaskEditorOptions, updateTask } from '../../../lib/songhyeonTaskRepository';
import { SONGHYEON_GATE_STAGES } from '../../../data/songhyeonGateStages.js';


const departments = ['기획추진실', '공간솔루션센터', '기업마케팅센터', '자산·운영 담당조직', '송현 BID TF'];
const gates = SONGHYEON_GATE_STAGES;
const statuses = ['미착수', '진행중', '지연', '완료', '보류', '중단'];
const importanceLevels = ['핵심', '주요', '일반'];

const initialForm = {
  projectCode: 'SONGHYEON_BID', projectName: '송현 BID', categoryMain: '', taskName: '',
  taskPurpose: '', sourceText: '', deliverables: '', gateStage: 'G0 근거기반 구축', stage: 'G0 근거기반 구축',
  leadDept: '', coopDepts: [], assignee: '', externalParty: '', supportNeeded: '', isBlocker: false,
  needsDecision: false, dueDate: '', status: '미착수', importanceLevel: '일반',
  nextAction: '', meetingAgenda: false, agendaReason: '',
};

const selectClass = 'bg-[#2a2a2c] border border-red-500/30 focus:border-red-500 rounded px-2.5 py-1 text-[12px] text-white outline-none cursor-pointer font-bold';
const inputClass = 'w-full bg-[#2c2c2b] border border-[#3c3c3c] rounded-[6px] px-3 py-1.5 text-[13px] text-white outline-none focus:border-[#2997ff]';
const requiredClass = `${inputClass} border-red-500/30 focus:border-red-500 font-bold`;
const FieldLabel = ({ children }) => <span className="text-[#86868B] text-[11px] block">{children}</span>;

export default function SonghyeonTaskEditorModal({ task = null, onClose, onCreated, onSaved }) {
  const { user, member } = useSonghyeonAuth();
  const isEditing = Boolean(task);
  const [form, setForm] = useState(() => task ? {
    ...initialForm,
    ...task,
    assignee: task.assignee === '미정' ? '' : (task.assignee || ''),
    coopDepts: Array.isArray(task.coopDepts) ? task.coopDepts : [],
  } : initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState({ categories: [], assignees: [], supportOptions: [], stakeholders: [], departments: [] });
  const [showAssigneeSuggestions, setShowAssigneeSuggestions] = useState(false);
  const [showSupportSuggestions, setShowSupportSuggestions] = useState(false);
  const [showStakeholderSuggestions, setShowStakeholderSuggestions] = useState(false);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const handleCoopDeptToggle = (dept) => set('coopDepts', form.coopDepts.includes(dept) ? form.coopDepts.filter((item) => item !== dept) : [...form.coopDepts, dept]);


  useEffect(() => {
    let active = true;
    loadTaskEditorOptions().then((loaded) => active && setOptions(loaded)).catch((cause) => active && setError(cause.message || '자동완성 후보를 불러오지 못했습니다.'));
    return () => { active = false; };
  }, []);

  const filtered = (items, query) => items.filter((item) => !query || item.toLowerCase().includes(query.toLowerCase()));
  const suggestionList = (items, field, close) => (
    <div className="absolute top-[58px] left-0 w-full bg-[#222] border border-[#3c3c3c] rounded-[8px] py-1 max-h-[160px] overflow-y-auto z-[200005] shadow-xl">
      {filtered(items, form[field]).map((item) => (
        <button data-autocomplete-option key={item} type="button" className="block w-full px-3 py-2 text-left text-[12px] text-[#E5E5E5] hover:bg-[#333] cursor-pointer truncate" onMouseDown={(event) => event.preventDefault()} onClick={() => { set(field, item); close(false); }}>{item}</button>
      ))}
      {!filtered(items, form[field]).length && <p className="px-3 py-2 text-[11px] text-[#686868]">일치하는 기존 항목 없음 · 직접 입력 가능</p>}
    </div>
  );

  const submit = async (event) => {
    event.preventDefault();
    if (!form.taskName.trim() || !form.categoryMain || !form.leadDept || !form.dueDate || !form.taskPurpose.trim()) {
      setError('붉은 박스의 필수 항목을 입력해 주세요.');
      return;
    }
    setSaving(true); setError('');
    try {
      const actor = { userId: user?.id, email: user?.email, name: member?.staff_name || user?.email || '송현 BID TF' };
      const payload = { ...form, sourceText: form.taskPurpose };
      if (isEditing) {
        const updated = await updateTask(task.sourceKey, payload, actor);
        onSaved(updated);
      } else {
        const created = await createTask(payload, actor);
        onCreated(created);
      }
    } catch (cause) {
      setError(cause.message || (isEditing ? '업무를 수정하지 못했습니다.' : '새 업무를 등록하지 못했습니다.'));
    } finally { setSaving(false); }
  };

  return (
    <div className="pointer-events-auto fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200000] p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-[16px] w-full max-w-[850px] shadow-2xl p-6 relative text-left text-white">
        <h3 className="text-[18px] font-bold text-white mb-5 text-left border-b border-[#2C2C2E] pb-3">{isEditing ? '통합 업무 수정' : '통합 업무 추가'}</h3>
        {error && <div role="alert" className="mb-3 rounded-[8px] border border-red-500/30 bg-red-500/10 px-3 py-2 text-[12px] text-red-400">{error}</div>}
        <form onSubmit={submit} className="space-y-5">
          <div className="max-h-[68vh] overflow-y-auto pr-2 space-y-5 text-left timeline-scrollbar">
            <div className="flex items-center gap-4 flex-wrap text-[12px] font-bold bg-white/5 p-3 rounded-[12px] border border-[#3c3c3c]/50">
              <div className="flex items-center gap-1.5"><span className="text-[#86868B]">업무 ID:</span><span className="font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300">{isEditing ? task.displayId : '신규'}</span></div>
              <div className="flex items-center gap-1.5"><span className="text-[#86868B]">프로젝트:</span><span className="rounded bg-[#2a2a2c] border border-[#3c3c3c] px-2.5 py-1">송현 BID</span></div>
              <div className="flex items-center gap-1.5"><span className="text-[#86868B]">업무분류:</span><select value={form.categoryMain} onChange={(e) => set('categoryMain', e.target.value)} className={selectClass} required><option value="">업무분류 선택</option>{options.categories.map((item) => <option key={item}>{item}</option>)}</select></div>
            </div>

            <div className="space-y-1"><FieldLabel>업무명</FieldLabel><textarea value={form.taskName} onChange={(e) => set('taskName', e.target.value)} className="w-full bg-[#2c2c2b] border border-red-500/30 focus:border-red-500 rounded-[6px] px-3 py-2 text-[15px] text-[#bdbba7] font-bold outline-none h-16 resize-y" required /></div>

            <div className="flex flex-wrap gap-4 text-[12px] font-bold">
              <div className="flex items-center gap-1.5"><span className="text-gray-400">상태:</span><select value={form.status} onChange={(e) => set('status', e.target.value)} className={selectClass}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></div>
              <div className="flex items-center gap-1.5"><span className="text-gray-400">중요도:</span><select value={form.importanceLevel} onChange={(e) => set('importanceLevel', e.target.value)} className={selectClass}>{importanceLevels.map((item) => <option key={item}>{item}</option>)}</select></div>

              <label className="flex items-center gap-1.5 text-[11px] font-bold text-red-400 border border-[#3c3c3c] bg-red-500/10 rounded px-2.5 py-0.5 cursor-pointer"><input type="checkbox" checked={form.isBlocker} onChange={(e) => set('isBlocker', e.target.checked)} />병목(Blocker) 상황 설정하기</label>
            </div>

            <div className="p-5 rounded-[16px] bg-white/[0.02] border border-[#2c2c2e] space-y-4 text-[13px]">
              <div className="grid grid-cols-4 gap-4 items-start">
                <div className="space-y-1"><FieldLabel>실행주관</FieldLabel><select value={form.leadDept} onChange={(e) => set('leadDept', e.target.value)} className={`${requiredClass} cursor-pointer`} required><option value="">실행주관 선택</option>{departments.map((item) => <option key={item}>{item}</option>)}</select></div>
                <div className="space-y-1 relative"><FieldLabel>담당자</FieldLabel><input value={form.assignee} onChange={(e) => { set('assignee', e.target.value); setShowAssigneeSuggestions(true); }} onFocus={() => setShowAssigneeSuggestions(true)} onBlur={() => setTimeout(() => setShowAssigneeSuggestions(false), 200)} placeholder="담당자명 검색/입력" className={inputClass} />{showAssigneeSuggestions && suggestionList(options.assignees, 'assignee', setShowAssigneeSuggestions)}</div>
                <div className="space-y-1 col-span-2"><FieldLabel>협조 부서 (다중 선택 가능)</FieldLabel><div className="flex flex-wrap gap-1.5 bg-[#2c2c2b] p-3 rounded-[8px] border border-red-500/30 max-h-[120px] overflow-y-auto">{departments.map((dept) => { const selected = form.coopDepts.includes(dept); return <button key={dept} type="button" onClick={() => handleCoopDeptToggle(dept)} className={`px-2 py-1 rounded-[4px] text-[10px] font-bold cursor-pointer border ${selected ? 'bg-[#2997ff] text-white border-[#2997ff]' : 'bg-[#1a1a1a] text-[#86868B] border-[#444] hover:border-[#666] hover:text-white'}`}>{dept}</button>; })}</div></div>
              </div>
              <div className="grid grid-cols-4 gap-4 items-end">
                <div className="space-y-1 relative"><FieldLabel>지원필요</FieldLabel><input value={form.supportNeeded} onChange={(e) => { set('supportNeeded', e.target.value); setShowSupportSuggestions(true); }} onFocus={() => setShowSupportSuggestions(true)} onBlur={() => setTimeout(() => setShowSupportSuggestions(false), 200)} className={inputClass} placeholder="검색/입력" />{showSupportSuggestions && suggestionList(options.supportOptions, 'supportNeeded', setShowSupportSuggestions)}</div>
                <div className="space-y-1"><FieldLabel>GATE 단계</FieldLabel><select value={form.gateStage} onChange={(e) => { set('gateStage', e.target.value); set('stage', e.target.value); }} className={`${requiredClass} cursor-pointer`}>{gates.map((item) => <option key={item}>{item}</option>)}</select></div>
                <div className="space-y-1 col-span-2 relative"><FieldLabel>외부 상대방</FieldLabel><input value={form.externalParty} onChange={(e) => { set('externalParty', e.target.value); setShowStakeholderSuggestions(true); }} onFocus={() => setShowStakeholderSuggestions(true)} onBlur={() => setTimeout(() => setShowStakeholderSuggestions(false), 200)} placeholder="회사명 검색/입력" className={inputClass} />{showStakeholderSuggestions && suggestionList(options.stakeholders, 'externalParty', setShowStakeholderSuggestions)}</div>
              </div>
              <div className="grid grid-cols-4 gap-4 items-end">
                <div className="space-y-1"><FieldLabel>회의상정</FieldLabel><select value={form.meetingAgenda ? '상정' : '미상정'} onChange={(e) => set('meetingAgenda', e.target.value === '상정')} className={`${inputClass} cursor-pointer`}><option>미상정</option><option>상정</option></select></div>
                <div className="space-y-1"><FieldLabel>마감 기한</FieldLabel><input type="date" value={form.dueDate} onChange={(e) => set('dueDate', e.target.value)} className={`${requiredClass} cursor-pointer`} required /></div>
                <div className="space-y-1 col-span-2"><FieldLabel>의사결정필요</FieldLabel><select value={form.needsDecision ? '필요' : '불필요'} onChange={(e) => set('needsDecision', e.target.value === '필요')} className={`${requiredClass} cursor-pointer`}><option>필요</option><option>불필요</option></select></div>
              </div>
            </div>

            <div className="p-5 rounded-[16px] bg-white/[0.02] border border-[#2c2c2e] space-y-4">
              <div className="space-y-1"><h4 className="text-[11px] font-bold text-[#86868B]">업무 목적</h4><textarea value={form.taskPurpose} onChange={(e) => set('taskPurpose', e.target.value)} className={`${requiredClass} h-20 resize-y`} required /></div>
              <div className="h-[1px] bg-[#3c3c3c]/30" />
              <div className="space-y-1"><h4 className="text-[11px] font-bold text-[#86868B]">필요 산출물</h4><textarea value={form.deliverables} onChange={(e) => set('deliverables', e.target.value)} className={`${inputClass} h-20 resize-y font-bold`} /></div>
              <div className="h-[1px] bg-[#3c3c3c]/30" />
              <div className="space-y-1"><h4 className="text-[11px] font-bold text-[#86868B]">다음 액션</h4><textarea value={form.nextAction} onChange={(e) => set('nextAction', e.target.value)} className={`${inputClass} h-20 resize-y font-bold`} /></div>
              <div className="h-[1px] bg-[#3c3c3c]/30" />
              <div className="space-y-1"><h4 className="text-[#86868B] text-[11px] font-bold">회의 상정 사유</h4><textarea value={form.agendaReason || ''} onChange={(e) => set('agendaReason', e.target.value)} disabled={!form.meetingAgenda} className={`${inputClass} h-20 resize-y disabled:opacity-40`} placeholder={form.meetingAgenda ? '회의에서 다룰 판단·조율 사유 입력' : '회의상정 선택 시 입력'} /></div>
            </div>
          </div>
          <div className="pt-4 border-t border-[#3c3c3c] flex items-center justify-between mt-4"><span className="text-red-400 text-[11.5px] font-bold">* 붉은 박스는 필수입력</span><div className="flex gap-3"><button type="button" onClick={onClose} className="px-4 py-2 rounded-[8px] bg-white/5 hover:bg-white/10 text-white border border-[#3c3c3c] text-[13px] font-bold cursor-pointer">취소</button><button type="submit" disabled={saving} className="px-5 py-2 rounded-[8px] bg-[#2997ff] text-[13px] font-bold text-white cursor-pointer disabled:opacity-50">{saving ? '저장 중...' : isEditing ? '수정 완료' : '저장'}</button></div></div>
        </form>
      </div>
    </div>
  );
}
