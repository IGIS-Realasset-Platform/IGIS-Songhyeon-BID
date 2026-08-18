import { useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  CalendarDays,
  Check,
  ChevronDown,
  FileText,
  Link2,
  LockKeyhole,
  Paperclip,
  Search,
  ShieldAlert,
  Users,
  X,
} from 'lucide-react';

import {
  createTaskFeedPost,
  downloadTaskFeedAttachment,
  updateTaskFeedPost,
  uploadTaskFeedAttachment,
} from '../../../lib/songhyeonTaskFeedRepository.js';
import {
  SONGHYEON_FEED_ATTACHMENT_LIMIT_BYTES,
  SONGHYEON_FEED_PRIORITIES,
  SONGHYEON_FEED_PROJECTS,
  SONGHYEON_FEED_PURPOSES,
  SONGHYEON_FEED_STATUSES,
} from '../../../data/songhyeonTaskFeedOptions.js';

// IOTA WorkspaceActivityLog/LogWriteBox를 송현 데이터 계약에 맞춰 이식한 작성 폼입니다.
// 댓글·반응은 목록 상세에서 다루며, 첨부파일은 게시글에만 연결합니다.

const today = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};

const text = (value) => String(value || '').trim();
const unique = (values) => [...new Set(values.map(text).filter(Boolean))];
const asArray = (value) => (Array.isArray(value) ? value : []);
const mentionType = (value) => (value === 'group' || value === 'department' ? 'department' : 'person');

const projectOption = (project) => ({
  value: text(project?.value || project?.code || project?.projectCode || project),
  label: text(project?.label || project?.name || project?.projectLabel || project),
});

const memberOption = (member) => ({
  id: text(member?.id || member?.profileId || member?.profile_id || member?.authId || member?.auth_id || member?.userId || member?.email || member?.staffName || member?.staff_name || member?.name),
  name: text(member?.name || member?.staffName || member?.staff_name || member?.authorName || member?.email),
  email: text(member?.email),
  group: text(member?.group || member?.groupName || member?.group_name || member?.organization || member?.cell),
  photoPath: text(member?.photoPath || member?.photo_path || member?.avatarUrl || member?.avatar_url),
});

const stakeholderOption = (stakeholder) => {
  if (typeof stakeholder === 'string') {
    const [companyName = '', contactName = ''] = stakeholder.split(' - ');
    return { companyName: text(companyName), contactName: text(contactName), category: '' };
  }
  return {
    companyName: text(stakeholder?.companyName || stakeholder?.company_name || stakeholder?.name || stakeholder?.stakeholderName || stakeholder?.stakeholder_name),
    contactName: text(stakeholder?.contactName || stakeholder?.contact_name),
    category: text(stakeholder?.category || stakeholder?.roleCategory || stakeholder?.role_category),
  };
};
const stakeholderKey = (stakeholder) => [stakeholder?.companyName, stakeholder?.contactName, stakeholder?.category].map(text).join('|');

const taskOption = (task) => ({
  raw: task,
  id: text(task?.sourceKey || task?.source_key || task?.id),
  displayId: text(task?.displayId || task?.display_id || task?.sourceKey || task?.source_key || task?.id),
  name: text(task?.taskName || task?.task_name || task?.name || task?.title || task?.payload?.taskName),
  category: text(task?.category || task?.categoryMain || task?.category_main || task?.payload?.categoryMain),
  lead: text(task?.lead || task?.leadDept || task?.leadDeptName || task?.lead_dept || task?.payload?.leadDept),
  assignee: text(task?.assignee || task?.owner || task?.payload?.assignee),
  status: text(task?.status || task?.payload?.status || '미착수'),
  importance: text(task?.importance || task?.importanceLevel || task?.priority || task?.payload?.importanceLevel),
  purpose: text(task?.purpose || task?.taskPurpose || task?.task_purpose || task?.payload?.purpose),
  deliverables: text(task?.deliverables || task?.payload?.deliverables),
});

const permissionValues = (permissions, key) => unique(asArray(permissions?.[key]).map((entry) => (
  typeof entry === 'string'
    ? entry
    : entry?.id || entry?.profileId || entry?.profile_id || entry?.name || entry?.staffName || entry?.staff_name
)));

const attachmentName = (attachment) => text(
  attachment?.name || attachment?.fileName || attachment?.file_name || attachment?.originalName || attachment?.original_name,
);

const attachmentId = (attachment) => text(attachment?.id || attachment?.attachmentId || attachment?.attachment_id || attachment?.path || attachment?.storagePath);

const normalizeWords = (value) => text(value)
  .toLowerCase()
  .replace(/[^0-9a-z가-힣]+/g, ' ')
  .split(/\s+/)
  .filter((word) => word.length > 1 && !['업무', '관련', '진행', '공유', '검토', '송현'].includes(word));

const priorityColor = (priority) => {
  if (priority === '높음') return 'text-[#ff7b73]';
  if (priority === '낮음') return 'text-[#72cfa0]';
  return 'text-[#80b9e8]';
};

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(date);
};

function Avatar({ actor }) {
  const initials = text(actor?.name || actor?.email || '송현').slice(-2);
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-white/10 bg-[#353535] text-[12px] font-black text-white">
      {actor?.photoPath ? (
        <img
          src={actor.photoPath}
          alt=""
          className="h-full w-full object-cover"
          onError={(event) => { event.currentTarget.style.display = 'none'; }}
        />
      ) : initials}
    </span>
  );
}

function ModalShell({ title, description, onClose, width = 'max-w-[560px]', children, footer }) {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div className="fixed inset-0 z-[180] flex items-center justify-center p-5">
      <button type="button" aria-label={`${title} 닫기`} className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" onClick={onClose} />
      <section className={`relative flex max-h-[88vh] w-full ${width} flex-col overflow-hidden rounded-[22px] border border-[#414141] bg-[#232323] shadow-2xl`}>
        <header className="flex items-start gap-4 border-b border-[#393939] px-6 py-5">
          <div className="min-w-0">
            <h3 className="text-[20px] font-black text-white">{title}</h3>
            {description && <p className="mt-1 text-[13px] leading-5 text-[#939398]">{description}</p>}
          </div>
          <button type="button" onClick={onClose} className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#454545] text-[#aaa] hover:text-white" aria-label="닫기">
            <X size={17} />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-6">{children}</div>
        {footer && <footer className="border-t border-[#393939] px-6 py-4">{footer}</footer>}
      </section>
    </div>,
    document.body,
  );
}

function VisibilityModal({ groups, members, selectedGroups, selectedIndividuals, onApply, onClose }) {
  const [draftGroups, setDraftGroups] = useState(selectedGroups);
  const [draftIndividuals, setDraftIndividuals] = useState(selectedIndividuals);
  const [query, setQuery] = useState('');
  const filteredMembers = members.filter((member) => (
    !query || `${member.name} ${member.group} ${member.email}`.toLowerCase().includes(query.toLowerCase())
  ));

  const toggle = (list, value) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  const publicPost = draftGroups.length === 0 && draftIndividuals.length === 0;

  return (
    <ModalShell
      title="열람 권한 설정"
      description="이 게시물을 볼 수 있는 그룹과 특정 인원을 지정합니다."
      onClose={onClose}
      footer={(
        <div className="flex items-center gap-3">
          <p className={`mr-auto text-[12px] font-bold ${publicPost ? 'text-[#e2aa29]' : 'text-[#79b7e8]'}`}>
            {publicPost ? '설정하지 않으면 전체 공개로 게시됩니다.' : '선택한 그룹과 인원만 열람합니다.'}
          </p>
          <button type="button" onClick={onClose} className="h-10 rounded-[9px] border border-[#484848] px-4 text-[13px] font-bold text-[#bbb]">취소</button>
          <button type="button" onClick={() => onApply(draftGroups, draftIndividuals)} className="h-10 rounded-[9px] bg-[#2b8de4] px-5 text-[13px] font-black text-white">확인</button>
        </div>
      )}
    >
      <div>
        <h4 className="mb-3 text-[14px] font-black text-[#d5d5d7]">1. 그룹 선택 (다중 선택 가능)</h4>
        <div className="flex flex-wrap gap-2">
          {groups.map((group) => {
            const selected = draftGroups.includes(group);
            return (
              <button
                key={group}
                type="button"
                onClick={() => setDraftGroups((current) => toggle(current, group))}
                className={`rounded-[9px] border px-3 py-2 text-[12px] font-bold ${selected ? 'border-[#418dcc] bg-[#2b8de4]/20 text-[#9fd2ff]' : 'border-[#444] bg-[#1c1c1c] text-[#999]'}`}
              >
                {group}
              </button>
            );
          })}
          {groups.length === 0 && <p className="text-[13px] text-[#777]">등록된 그룹이 없습니다.</p>}
        </div>
      </div>
      <div className="mt-7">
        <h4 className="mb-3 text-[14px] font-black text-[#d5d5d7]">2. 특정 인원 추가</h4>
        <label className="relative block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="이름·소속 검색" className="h-10 w-full rounded-[9px] border border-[#444] bg-[#1b1b1b] pl-9 pr-3 text-[13px] text-white outline-none focus:border-[#4c8bbd]" />
        </label>
        <div className="mt-2 max-h-[220px] overflow-y-auto rounded-[10px] border border-[#3d3d3d]">
          {filteredMembers.map((member) => {
            const selected = draftIndividuals.includes(member.id);
            return (
              <button
                key={member.id}
                type="button"
                onClick={() => setDraftIndividuals((current) => toggle(current, member.id))}
                className="flex w-full items-center gap-3 border-b border-[#343434] px-3 py-2.5 text-left last:border-0 hover:bg-white/[0.04]"
              >
                <span className={`grid h-5 w-5 place-items-center rounded-[5px] border ${selected ? 'border-[#4b9bd9] bg-[#4b9bd9] text-white' : 'border-[#555] text-transparent'}`}><Check size={13} /></span>
                <span className="text-[13px] font-bold text-[#ddd]">{member.name}</span>
                <span className="ml-auto text-[12px] text-[#85858b]">{member.group || member.email}</span>
              </button>
            );
          })}
        </div>
      </div>
    </ModalShell>
  );
}

const taskSearchText = (task) => [
  task.displayId,
  task.name,
  task.category,
  task.lead,
  task.assignee,
  task.status,
  task.purpose,
  task.deliverables,
].join(' ').toLowerCase();

const recommendationFor = (task, reference) => {
  const referenceWords = new Set(normalizeWords(`${reference.title} ${reference.content} ${reference.cell}`));
  const taskWords = new Set(normalizeWords(taskSearchText(task)));
  const shared = [...referenceWords].filter((word) => taskWords.has(word));
  let score = shared.length * 10;
  const reasons = [];
  if (reference.cell && task.lead && (reference.cell.includes(task.lead) || task.lead.includes(reference.cell))) {
    score += 30;
    reasons.push('실행주관 일치');
  }
  if (shared.length) reasons.push(`핵심어 일치: ${shared.slice(0, 3).join(', ')}`);
  if (!['완료', '중단'].includes(task.status)) score += 3;
  return { score, reasons };
};

function TaskCard({ task, selected, reasons, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(task.id)}
      className={`w-full rounded-[13px] border p-4 text-left ${selected ? 'border-[#3ca969]/50 bg-[#30d158]/10' : 'border-[#414141] bg-[#292929] hover:border-[#5a5a5a]'}`}
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-[12px] font-black text-[#75b6e8]">{task.displayId}</span>
        <span className="rounded-[5px] border border-[#4b4b4b] px-2 py-0.5 text-[12px] font-bold text-[#aaa]">{task.status}</span>
        {task.importance && <span className="ml-auto text-[12px] font-bold text-[#df9d86]">{task.importance}</span>}
      </div>
      <div className="mt-2 text-[15px] font-black leading-6 text-white">{task.name || '업무명 미등록'}</div>
      <div className="mt-1 flex flex-wrap gap-x-2 text-[12px] text-[#8d8d93]">
        <span>{task.category || '업무분류 미정'}</span><span>·</span><span>{task.lead || '실행주관 미정'}</span>
      </div>
      {reasons?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {reasons.map((reason) => <span key={reason} className="rounded-[5px] bg-[#3678ad]/15 px-2 py-1 text-[12px] font-bold text-[#91c8ef]">{reason}</span>)}
        </div>
      )}
      <div className={`mt-3 text-right text-[12px] font-black ${selected ? 'text-[#6edb98]' : 'text-[#87bfe9]'}`}>{selected ? '선택됨' : '선택'}</div>
    </button>
  );
}

function TaskPickerModal({ tasks, selectedTaskIds, reference, onApply, onClose }) {
  const [draftIds, setDraftIds] = useState(selectedTaskIds);
  const [query, setQuery] = useState('');
  const selectedSet = useMemo(() => new Set(draftIds.map(String)), [draftIds]);
  const toggle = (id) => setDraftIds((current) => (current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]));
  const selectedTasks = tasks.filter((task) => selectedSet.has(task.id));
  const recommendations = tasks
    .filter((task) => !selectedSet.has(task.id))
    .map((task) => ({ task, ...recommendationFor(task, reference) }))
    .filter((entry) => entry.score >= 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  const filteredTasks = tasks.filter((task) => !query || taskSearchText(task).includes(query.toLowerCase()));

  return (
    <ModalShell
      title="통합업무 연결"
      description="게시글과 관련된 기존 통합업무를 선택합니다."
      onClose={onClose}
      width="max-w-[1080px]"
      footer={(
        <div className="flex items-center justify-end gap-3">
          <span className="mr-auto text-[13px] font-bold text-[#6edb98]">{draftIds.length}건 선택</span>
          <button type="button" onClick={onClose} className="h-10 rounded-[9px] border border-[#484848] px-5 text-[13px] font-bold text-[#bbb]">취소</button>
          <button type="button" onClick={() => onApply(draftIds)} className="h-10 rounded-[9px] bg-[#2b8de4] px-6 text-[13px] font-black text-white">선택 적용</button>
        </div>
      )}
    >
      <div className="space-y-7">
        {selectedTasks.length > 0 && (
          <section>
            <h4 className="mb-3 text-[14px] font-black text-white">선택한 통합업무</h4>
            <div className="grid gap-3 md:grid-cols-2">{selectedTasks.map((task) => <TaskCard key={task.id} task={task} selected onToggle={toggle} />)}</div>
          </section>
        )}
        {recommendations.length > 0 && (
          <section>
            <h4 className="text-[14px] font-black text-white">추천 업무</h4>
            <p className="mb-3 mt-1 text-[12px] text-[#7f7f85]">게시글 제목·내용·기능셀과의 연관성을 기준으로 제안합니다.</p>
            <div className="grid gap-3 md:grid-cols-2">{recommendations.map(({ task, reasons }) => <TaskCard key={task.id} task={task} reasons={reasons} selected={false} onToggle={toggle} />)}</div>
          </section>
        )}
        <section>
          <div className="mb-3 flex flex-wrap items-end gap-3">
            <div>
              <h4 className="text-[14px] font-black text-white">전체 통합업무</h4>
              <p className="mt-1 text-[12px] text-[#7f7f85]">업무명·담당자·실행주관으로 찾을 수 있습니다.</p>
            </div>
            <label className="relative ml-auto w-full max-w-[360px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="업무명·담당자·실행주관 검색" className="h-10 w-full rounded-[9px] border border-[#454545] bg-[#282828] pl-9 pr-3 text-[13px] text-white outline-none focus:border-[#4c8bbd]" />
            </label>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {filteredTasks.map((task) => <TaskCard key={task.id} task={task} selected={selectedSet.has(task.id)} onToggle={toggle} />)}
          </div>
          {filteredTasks.length === 0 && <div className="rounded-[12px] border border-dashed border-[#444] py-12 text-center text-[13px] text-[#777]">검색 결과가 없습니다.</div>}
        </section>
      </div>
    </ModalShell>
  );
}

function SelectField({ label, value, onChange, children, valueClassName = 'text-[#e5e5e5]' }) {
  return (
    <label className="relative flex min-w-0 items-center gap-2">
      <span className="shrink-0 text-[12px] font-bold text-[#85858b]">{label}</span>
      <select value={value} onChange={onChange} className={`h-9 min-w-0 appearance-none rounded-[8px] border border-[#3e3e3e] bg-[#222] py-1 pl-3 pr-8 text-[13px] font-bold outline-none focus:border-[#4f89b7] ${valueClassName}`}>
        {children}
      </select>
      <ChevronDown size={13} className="pointer-events-none absolute right-3 text-[#777]" />
    </label>
  );
}

function TaskFeedWriteBoxForm({ actor, options = {}, tasks = [], initialPost = null, onSaved, onCancel }) {
  const editMode = Boolean(initialPost);
  const formId = useId().replace(/:/g, '');
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const projects = useMemo(() => {
    const normalized = asArray(options.projects).map(projectOption).filter((project) => project.value);
    return normalized.length ? normalized : SONGHYEON_FEED_PROJECTS.map(projectOption);
  }, [options.projects]);
  const members = useMemo(() => asArray(options.members).map(memberOption).filter((member) => member.id && member.name), [options.members]);
  const groups = useMemo(() => unique([
    ...asArray(options.groups).map((group) => group?.label || group?.name || group?.groupName || group?.group_name || group),
    ...members.map((member) => member.group),
  ]), [members, options.groups]);
  const cells = useMemo(() => unique(asArray(options.cells).map((cell) => cell?.label || cell?.name || cell)), [options.cells]);
  const stakeholders = useMemo(() => {
    const seen = new Set();
    return asArray(options.stakeholders).map(stakeholderOption).filter((entry) => {
      const key = stakeholderKey(entry);
      if (!entry.companyName || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [options.stakeholders]);
  const taskOptions = useMemo(() => {
    const source = asArray(tasks).length ? tasks : asArray(options.tasks);
    return source.map(taskOption).filter((task) => task.id);
  }, [options.tasks, tasks]);

  const initialProjectName = text(initialPost?.projectName || initialPost?.project_name || initialPost?.projectLabel);
  const initialProject = text(
    initialPost?.projectCode
    || initialPost?.project_code
    || projects.find((entry) => entry.label === initialProjectName)?.value
    || projects[0]?.value
    || 'SONGHYEON_BID',
  );
  const purposes = asArray(options.purposes).length ? options.purposes : SONGHYEON_FEED_PURPOSES;
  const statuses = asArray(options.statuses).length ? options.statuses : SONGHYEON_FEED_STATUSES;
  const priorities = asArray(options.priorities).length ? options.priorities : SONGHYEON_FEED_PRIORITIES;
  const initialPermissions = initialPost?.permissions || {};
  const initialStakeholder = stakeholderOption(initialPost?.stakeholderDetail || initialPost?.stakeholder_detail || initialPost?.stakeholder);
  const initialIndividualValues = permissionValues(initialPermissions, 'individuals');
  const matchedInitialIndividuals = unique(initialIndividualValues.map((value) => (
    members.find((member) => member.id === value || member.name === value || member.email === value)?.id || value
  )));

  const [expanded, setExpanded] = useState(editMode);
  const [projectCode, setProjectCode] = useState(initialProject);
  const cell = text(initialPost?.cell || actor?.group || cells[0]);
  const [purpose, setPurpose] = useState(text(initialPost?.purpose || '공유'));
  const [status, setStatus] = useState(text(initialPost?.status || '검토중'));
  const [priority, setPriority] = useState(text(initialPost?.priority || '중간'));
  const [workDate, setWorkDate] = useState(text(initialPost?.workDate || initialPost?.work_date || today()));
  const [title, setTitle] = useState(text(initialPost?.title || initialPost?.summary));
  const [content, setContent] = useState(text(initialPost?.content || initialPost?.body || initialPost?.rawText || initialPost?.raw_text));
  const [stakeholderCompany, setStakeholderCompany] = useState(initialStakeholder.companyName);
  const [stakeholderContact, setStakeholderContact] = useState(initialStakeholder.contactName);
  const [stakeholderCategory, setStakeholderCategory] = useState(initialStakeholder.category);
  const [visibilityGroups, setVisibilityGroups] = useState(permissionValues(initialPermissions, 'groups'));
  const [visibilityIndividuals, setVisibilityIndividuals] = useState(matchedInitialIndividuals);
  const [mentionedEntities, setMentionedEntities] = useState(asArray(initialPost?.mentions));
  const [linkedTaskIds, setLinkedTaskIds] = useState(unique(asArray(initialPost?.linkedTaskIds || initialPost?.linked_task_ids || initialPost?.taskIds || initialPost?.task_ids)));
  const [existingAttachments, setExistingAttachments] = useState(asArray(initialPost?.attachments));
  const [pendingFiles, setPendingFiles] = useState([]);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionStart, setMentionStart] = useState(-1);
  const [showMentions, setShowMentions] = useState(false);
  const [showVisibility, setShowVisibility] = useState(false);
  const [showTaskPicker, setShowTaskPicker] = useState(false);
  const [showFileWarning, setShowFileWarning] = useState(false);
  const [showPublicWarning, setShowPublicWarning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const mentionCandidates = useMemo(() => [
    ...groups.map((group) => ({ id: `group:${group}`, type: 'department', label: group, groupName: group, organization: '부서' })),
    ...members.map((member) => ({ id: member.id, type: 'person', label: member.name, memberId: member.id, groupName: member.group, organization: member.group })),
  ], [groups, members]);
  const filteredMentions = mentionCandidates.filter((candidate) => (
    !mentionQuery || `${candidate.label} ${candidate.organization}`.toLowerCase().includes(mentionQuery.toLowerCase())
  )).slice(0, 8);
  const selectedTasks = taskOptions.filter((task) => linkedTaskIds.includes(task.id));
  const selectedIndividualMembers = members.filter((member) => visibilityIndividuals.includes(member.id));
  const project = projects.find((entry) => entry.value === projectCode) || projects[0];
  const stakeholderCompanies = unique(stakeholders.map((entry) => entry.companyName));
  const stakeholderContacts = unique(stakeholders
    .filter((entry) => !stakeholderCompany || entry.companyName === stakeholderCompany)
    .map((entry) => entry.contactName));
  const stakeholderCategories = unique(stakeholders.map((entry) => entry.category));

  const updateMentionQuery = (event) => {
    const nextContent = event.target.value;
    const cursor = event.target.selectionStart;
    const beforeCursor = nextContent.slice(0, cursor);
    const match = beforeCursor.match(/@([^\s@]*)$/);
    setContent(nextContent);
    if (match) {
      setMentionStart(match.index);
      setMentionQuery(match[1]);
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  };

  const selectMention = (candidate) => {
    const cursor = textareaRef.current?.selectionStart ?? content.length;
    const nextContent = `${content.slice(0, mentionStart)}@${candidate.label} ${content.slice(cursor)}`;
    setContent(nextContent);
    setMentionedEntities((current) => (
      current.some((mention) => mentionType(mention?.type) === candidate.type && text(mention?.label) === candidate.label)
        ? current
        : [...current, candidate]
    ));
    setShowMentions(false);
    requestAnimationFrame(() => {
      const nextCursor = mentionStart + candidate.label.length + 2;
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(nextCursor, nextCursor);
    });
  };

  const chooseFiles = (event) => {
    const files = Array.from(event.target.files || []);
    const validFiles = [];
    const tooLarge = [];
    files.forEach((file) => {
      if (file.size > SONGHYEON_FEED_ATTACHMENT_LIMIT_BYTES) tooLarge.push(file.name);
      else validFiles.push(file);
    });
    setPendingFiles((current) => [...current, ...validFiles]);
    if (tooLarge.length) setError(`50MB를 초과한 파일은 첨부할 수 없습니다: ${tooLarge.join(', ')}`);
    event.target.value = '';
  };

  const downloadAttachment = async (attachment) => {
    setError('');
    try {
      const result = await downloadTaskFeedAttachment(attachment);
      const url = typeof result === 'string' ? result : result?.signedUrl || result?.signed_url || result?.url;
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    } catch (downloadError) {
      setError(downloadError?.message || '첨부파일을 열지 못했습니다.');
    }
  };

  const save = async () => {
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 입력해 주세요.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const activeMentions = mentionedEntities.filter((mention) => content.includes(`@${mention.label}`));
      const uploadedAttachments = [];
      for (const file of pendingFiles) {
        uploadedAttachments.push(await uploadTaskFeedAttachment(file, actor));
      }
      const payload = {
        projectCode,
        projectLabel: project?.label || '송현 BID',
        purpose,
        status,
        priority,
        workDate,
        title: title.trim(),
        content: content.trim(),
        stakeholder: stakeholderCompany || stakeholderContact || stakeholderCategory
          ? { companyName: stakeholderCompany, contactName: stakeholderContact, category: stakeholderCategory }
          : null,
        permissions: { groups: visibilityGroups, individuals: visibilityIndividuals },
        mentions: activeMentions,
        linkedTaskIds,
        attachments: [...existingAttachments, ...uploadedAttachments],
      };
      const savedPost = editMode
        ? await updateTaskFeedPost(initialPost.id, payload, actor)
        : await createTaskFeedPost(payload, actor);
      if (!editMode) {
        setTitle('');
        setContent('');
        setStakeholderCompany('');
        setStakeholderContact('');
        setStakeholderCategory('');
        setVisibilityGroups([]);
        setVisibilityIndividuals([]);
        setMentionedEntities([]);
        setLinkedTaskIds([]);
        setPendingFiles([]);
        setExpanded(false);
      }
      onSaved?.(savedPost);
    } catch (saveError) {
      setError(saveError?.message || '게시글을 저장하지 못했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const requestSave = () => {
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 입력해 주세요.');
      return;
    }
    if (!stakeholderCompany && stakeholderContact) {
      setError('담당자를 기록하려면 회사·기관명을 먼저 입력해 주세요.');
      return;
    }
    if (visibilityGroups.length === 0 && visibilityIndividuals.length === 0) setShowPublicWarning(true);
    else void save();
  };

  if (!expanded && !editMode) {
    return (
      <div className="mb-[11px] w-full rounded-[24px] bg-gradient-to-br from-[#d6efe9] via-[#82afb9] to-[#4c6e86] p-px">
        <button type="button" onClick={() => setExpanded(true)} className="flex w-full items-center gap-4 rounded-[23px] bg-[#262626] px-5 py-4 text-left hover:bg-[#2a2a2a]">
          <Avatar actor={actor} />
          <span className="min-w-0 flex-1 text-[16px] font-bold text-[#bcdbdb]">업무 메시지, 협업 사항 또는 공유할 내용을 등록하세요.</span>
          <span className="shrink-0 rounded-[8px] border border-[#83adb5] bg-[#222] px-4 py-2 text-[13px] font-black text-[#e5e5e5]">글작성하기</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`mb-[11px] w-full rounded-[24px] bg-gradient-to-br from-[#d6efe9] via-[#82afb9] to-[#4c6e86] p-px ${editMode ? 'shadow-2xl' : ''}`}>
      <section className="overflow-hidden rounded-[23px] bg-[#262626]">
        <header className="flex flex-wrap items-center gap-3 border-b border-[#383838] px-5 py-3">
          <Avatar actor={actor} />
          <SelectField label="프로젝트" value={projectCode} onChange={(event) => setProjectCode(event.target.value)}>
            {projects.map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>)}
          </SelectField>
          <SelectField label="활용목적" value={purpose} onChange={(event) => setPurpose(event.target.value)}>
            {purposes.map((entry) => <option key={entry} value={entry}>{entry}</option>)}
          </SelectField>
          <SelectField label="진행상태" value={status} onChange={(event) => setStatus(event.target.value)}>
            {statuses.map((entry) => <option key={entry} value={entry}>{entry}</option>)}
          </SelectField>
          <SelectField label="중요도" value={priority} onChange={(event) => setPriority(event.target.value)} valueClassName={priorityColor(priority)}>
            {priorities.map((entry) => <option key={entry} value={entry}>{entry}</option>)}
          </SelectField>
          <label className="relative ml-auto inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#3e3e3e] bg-[#222] px-3 text-[12px] font-bold text-[#ddd]">
            <CalendarDays size={14} className="text-[#85858b]" />
            {formatDate(workDate)}
            <input type="date" value={workDate} onChange={(event) => setWorkDate(event.target.value)} className="absolute inset-0 cursor-pointer opacity-0" />
          </label>
          {!editMode && <button type="button" onClick={() => setExpanded(false)} className="rounded-[8px] border border-[#454545] px-3 py-2 text-[12px] font-bold text-[#bbb]">접기</button>}
          {editMode && <button type="button" onClick={onCancel} className="grid h-9 w-9 place-items-center rounded-[8px] border border-[#454545] text-[#aaa]" aria-label="수정 닫기"><X size={16} /></button>}
        </header>

        <div className="px-5 pb-5 pt-5">
          <input
            id={`${formId}-title`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full border-b border-[#3a3a3a] bg-transparent pb-3 text-[17px] font-black text-[#ededed] outline-none placeholder:text-[#777]"
          />
          <div className="relative mt-4">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={updateMentionQuery}
              onKeyDown={(event) => { if (event.key === 'Escape') setShowMentions(false); }}
              placeholder={'진행 이력, 협업 요청, 리스크 판단 필요사항, 의사결정 필요항목을 입력하세요.\n(@로 담당부서 또는 담당자를 멘션할 수 있습니다)'}
              className="min-h-[150px] w-full resize-y bg-transparent text-[15px] leading-7 text-[#e5e5e5] outline-none placeholder:text-[#8f8d87]"
            />
            {showMentions && filteredMentions.length > 0 && (
              <div className="absolute left-0 top-[70px] z-40 max-h-[240px] w-[300px] overflow-y-auto rounded-[10px] border border-[#444] bg-[#202020] py-1.5 shadow-2xl">
                {filteredMentions.map((candidate) => (
                  <button key={`${candidate.type}:${candidate.id}`} type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => selectMention(candidate)} className="flex w-full items-center gap-2 px-3 py-2.5 text-left hover:bg-[#333]">
                    <span className={`rounded-[5px] px-2 py-1 text-[12px] font-black ${candidate.type === 'department' ? 'bg-[#2c7eb6]/15 text-[#7fc5ee]' : 'bg-white/[0.07] text-[#bbb]'}`}>{candidate.type === 'department' ? '부서' : '담당자'}</span>
                    <span className="truncate text-[13px] font-bold text-[#eee]">@{candidate.label}</span>
                    <span className="ml-auto truncate text-[12px] text-[#777]">{candidate.organization}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {(existingAttachments.length > 0 || pendingFiles.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2 border-t border-[#363636] pt-4">
              {existingAttachments.map((attachment, index) => (
                <span key={attachmentId(attachment) || attachmentName(attachment)} className="flex items-center gap-1 rounded-[8px] border border-[#444] bg-[#222] px-2 py-1 text-[12px] font-bold text-[#ccc]">
                  <button type="button" onClick={() => void downloadAttachment(attachment)} className="flex min-w-0 items-center gap-2 rounded-[6px] px-1 py-1 hover:text-[#91c8ef]">
                    <FileText size={14} /><span className="max-w-[240px] truncate">{attachmentName(attachment) || '첨부파일'}</span>
                  </button>
                  <button type="button" aria-label={`${attachmentName(attachment) || '첨부파일'} 첨부 제거`} onClick={() => setExistingAttachments((current) => current.filter((_, attachmentIndex) => attachmentIndex !== index))} className="p-1 text-[#888] hover:text-[#ff8179]"><X size={13} /></button>
                </span>
              ))}
              {pendingFiles.map((file, index) => (
                <span key={`${file.name}:${file.size}:${index}`} className="flex items-center gap-2 rounded-[8px] border border-[#45634f] bg-[#2d6139]/10 px-3 py-2 text-[12px] font-bold text-[#a4d8b5]">
                  <FileText size={14} />
                  <span className="max-w-[240px] truncate">{file.name}</span>
                  <button type="button" aria-label={`${file.name} 첨부 제거`} onClick={() => setPendingFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} className="text-[#89a18f] hover:text-[#ff8179]"><X size={13} /></button>
                </span>
              ))}
            </div>
          )}

          {selectedTasks.length > 0 && (
            <div className="mt-4 border-t border-[#363636] pt-4">
              <div className="mb-2 flex items-center justify-between"><span className="text-[12px] font-black text-[#aaa]">연결할 통합업무</span><span className="text-[12px] font-black text-[#67cf90]">{selectedTasks.length}건</span></div>
              <div className="flex flex-wrap gap-2">
                {selectedTasks.map((task) => (
                  <span key={task.id} className="flex max-w-full items-center gap-2 rounded-[8px] border border-[#356748] bg-[#30d158]/5 px-3 py-2">
                    <span className="font-mono text-[12px] font-black text-[#75b6e8]">{task.displayId}</span>
                    <span className="max-w-[320px] truncate text-[13px] font-bold text-[#ddd]">{task.name}</span>
                    <button type="button" aria-label={`${task.name} 연결 해제`} onClick={() => setLinkedTaskIds((current) => current.filter((id) => id !== task.id))} className="text-[#888] hover:text-[#ff8179]"><X size={13} /></button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer className="flex flex-wrap items-center gap-2 border-t border-[#383838] px-5 py-3">
          <span className="shrink-0 text-[12px] font-black text-[#8f8f94]">이해관계자</span>
          <label className="relative min-w-[150px] flex-1">
            <span className="sr-only">회사·기관명</span>
            <input list={`${formId}-stakeholder-companies`} value={stakeholderCompany} onChange={(event) => { setStakeholderCompany(event.target.value); setStakeholderContact(''); }} placeholder="회사·기관명" className="h-10 w-full rounded-[9px] border border-[#414141] bg-[#222] px-3 text-[13px] text-white outline-none focus:border-[#4f89b7]" />
            <datalist id={`${formId}-stakeholder-companies`}>{stakeholderCompanies.map((entry) => <option key={entry} value={entry} />)}</datalist>
          </label>
          <label className="relative min-w-[130px] flex-1">
            <span className="sr-only">담당자명</span>
            <input list={`${formId}-stakeholder-contacts`} value={stakeholderContact} onChange={(event) => setStakeholderContact(event.target.value)} placeholder="담당자명" className="h-10 w-full rounded-[9px] border border-[#414141] bg-[#222] px-3 text-[13px] text-white outline-none focus:border-[#4f89b7]" />
            <datalist id={`${formId}-stakeholder-contacts`}>{stakeholderContacts.map((entry) => <option key={entry} value={entry} />)}</datalist>
          </label>
          <label className="relative min-w-[140px] flex-1">
            <span className="sr-only">이해관계자 분류</span>
            <input list={`${formId}-stakeholder-categories`} value={stakeholderCategory} onChange={(event) => setStakeholderCategory(event.target.value)} placeholder="분류" className="h-10 w-full rounded-[9px] border border-[#414141] bg-[#222] px-3 text-[13px] text-white outline-none focus:border-[#4f89b7]" />
            <datalist id={`${formId}-stakeholder-categories`}>{stakeholderCategories.map((entry) => <option key={entry} value={entry} />)}</datalist>
          </label>

          {(visibilityGroups.length > 0 || visibilityIndividuals.length > 0) && (
            <span className="max-w-[260px] truncate px-2 text-[12px] font-black text-[#df7f7a]" title={[...visibilityGroups, ...selectedIndividualMembers.map((member) => member.name)].join(', ')}>
              {[...visibilityGroups, ...selectedIndividualMembers.map((member) => member.name)].join(', ')}
            </span>
          )}
          <input type="file" ref={fileInputRef} onChange={chooseFiles} className="hidden" multiple />
          <button type="button" onClick={() => setShowTaskPicker(true)} className={`flex h-10 items-center gap-2 rounded-[9px] border px-4 text-[13px] font-black ${linkedTaskIds.length ? 'border-[#356748] bg-[#30d158]/10 text-[#73d99a]' : 'border-[#3c6685] bg-[#2997ff]/10 text-[#8dc8ef]'}`}><Link2 size={15} />통합업무 연결{linkedTaskIds.length > 0 && ` ${linkedTaskIds.length}`}</button>
          <button type="button" onClick={() => setShowFileWarning(true)} className="flex h-10 items-center gap-2 rounded-[9px] border border-[#464646] px-4 text-[13px] font-black text-[#bbb] hover:bg-white/[0.04]"><Paperclip size={15} />파일 첨부</button>
          <button type="button" onClick={() => setShowVisibility(true)} className="flex h-10 items-center gap-2 rounded-[9px] border border-[#914743] px-4 text-[13px] font-black text-[#e17f79] hover:bg-[#ff453a]/5"><LockKeyhole size={15} />열람권한</button>
          {editMode && <button type="button" onClick={onCancel} className="h-10 rounded-[9px] border border-[#494949] px-5 text-[13px] font-black text-[#bbb]">취소</button>}
          <button type="button" onClick={requestSave} disabled={submitting} className="h-10 rounded-[9px] bg-[#2b8de4] px-7 text-[13px] font-black text-white disabled:cursor-not-allowed disabled:opacity-50">{submitting ? '저장 중...' : editMode ? '수정 완료' : '작성하기'}</button>
          {error && <p role="alert" className="w-full pt-1 text-[12px] font-bold text-[#ff8179]">{error}</p>}
        </footer>
      </section>

      {showVisibility && (
        <VisibilityModal
          groups={groups}
          members={members}
          selectedGroups={visibilityGroups}
          selectedIndividuals={visibilityIndividuals}
          onClose={() => setShowVisibility(false)}
          onApply={(nextGroups, nextIndividuals) => {
            setVisibilityGroups(nextGroups);
            setVisibilityIndividuals(nextIndividuals);
            setShowVisibility(false);
          }}
        />
      )}
      {showTaskPicker && (
        <TaskPickerModal
          tasks={taskOptions}
          selectedTaskIds={linkedTaskIds}
          reference={{ title, content, cell }}
          onClose={() => setShowTaskPicker(false)}
          onApply={(nextIds) => { setLinkedTaskIds(nextIds); setShowTaskPicker(false); }}
        />
      )}
      {showFileWarning && (
        <ModalShell title="파일 첨부 보안 안내" description="첨부파일은 게시글의 열람 권한을 따르며 비공개 저장소에 보관됩니다." onClose={() => setShowFileWarning(false)}>
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e2aa29]/10 text-[#e2aa29]"><ShieldAlert size={25} /></span>
            <p className="mx-auto mt-4 max-w-[390px] text-[13px] leading-6 text-[#aaa]">민감한 개인정보·계약 원문 등이 포함되지 않았는지 확인한 후 첨부해 주세요. 파일당 최대 용량은 50MB입니다.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" onClick={() => setShowFileWarning(false)} className="h-10 rounded-[9px] border border-[#484848] px-5 text-[13px] font-bold text-[#bbb]">취소</button>
              <button type="button" onClick={() => { setShowFileWarning(false); fileInputRef.current?.click(); }} className="h-10 rounded-[9px] bg-[#2b8de4] px-5 text-[13px] font-black text-white">확인 후 파일 선택</button>
            </div>
          </div>
        </ModalShell>
      )}
      {showPublicWarning && (
        <ModalShell title="전체 공개 게시물" description="열람 권한이 설정되지 않았습니다." onClose={() => setShowPublicWarning(false)}>
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#5e9ac7]/10 text-[#8ec4e8]"><Users size={25} /></span>
            <p className="mt-4 text-[13px] leading-6 text-[#aaa]">이 게시물은 게스트를 포함한 모든 방문자가 열람할 수 있는 <strong className="text-[#75d49a]">전체 공개글</strong>로 게시됩니다.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" onClick={() => setShowPublicWarning(false)} className="h-10 rounded-[9px] border border-[#484848] px-5 text-[13px] font-bold text-[#bbb]">취소</button>
              <button type="button" onClick={() => { setShowPublicWarning(false); void save(); }} className="h-10 rounded-[9px] bg-[#2b8de4] px-5 text-[13px] font-black text-white">네, 작성할게요</button>
            </div>
          </div>
        </ModalShell>
      )}
    </div>
  );
}

export default function SonghyeonTaskFeedWriteBox({
  actor,
  options = {},
  tasks = [],
  isReadOnly = false,
  initialPost = null,
  onSaved,
  onCancel,
}) {
  if (isReadOnly) return null;
  return (
    <TaskFeedWriteBoxForm
      key={initialPost?.id || 'new-post'}
      actor={actor}
      options={options}
      tasks={tasks}
      initialPost={initialPost}
      onSaved={onSaved}
      onCancel={onCancel}
    />
  );
}
