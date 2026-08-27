import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink, FileText, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useSonghyeonAuth } from '../context/SonghyeonAuthContext';
import { WorkspacePageFrame, WorkspacePageHeader } from '../components/workspace/WorkspacePageLayout';
import {
  createDataRoomDocument,
  deleteDataRoomDocument,
  loadDataRoomDocuments,
  recordDataRoomView,
  updateDataRoomDocument,
} from '../lib/songhyeonDataRoomRepository';

const todayLabel = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' }).replaceAll('-', '.');

const emptyDocument = () => ({
  title: '',
  description: '',
  category: '',
  type: 'Link',
  date: todayLabel(),
  href: '',
});

const fieldClassName = 'h-[40px] w-full rounded-[9px] border border-[#484848] bg-[#202020] px-3 text-[13px] text-white outline-none transition-colors placeholder:text-[#686868] focus:border-[#777]';

function EditorField({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[12px] font-semibold text-[#A1A1A6]">{label}</span>
      {children}
    </label>
  );
}

function DocumentEditor({ document, onClose, onSave }) {
  const [draft, setDraft] = useState(document);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const isEditing = Boolean(document.id);
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave({
        ...draft,
        title: draft.title.trim(),
        description: draft.description.trim(),
        category: draft.category.trim(),
        type: draft.type.trim(),
        date: draft.date.trim(),
        href: draft.href.trim(),
      });
    } catch (saveError) {
      setError(saveError.message || '문서를 저장하지 못했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-6" role="dialog" aria-modal="true" aria-labelledby="data-room-editor-title">
      <form onSubmit={submit} className="w-full max-w-[720px] overflow-hidden rounded-[24px] border border-[#464646] bg-[#2A2A29] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#3C3C3C] px-6 py-5">
          <div>
            <h2 id="data-room-editor-title" className="text-[20px] font-bold text-white">{isEditing ? '문서 수정' : '문서 추가'}</h2>
            <p className="mt-1 text-[12px] text-[#86868B]">Data Room에서 공유할 문서 정보와 원본 위치를 입력하세요.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="편집창 닫기" className="grid h-9 w-9 cursor-pointer place-items-center rounded-[9px] text-[#86868B] hover:bg-[#3A3A39] hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 px-6 py-5">
          {error && <div role="alert" className="col-span-3 rounded-[9px] border border-[#FF453A]/30 bg-[#FF453A]/10 px-3 py-2 text-[12px] text-[#FF8A82]">{error}</div>}
          <EditorField label="문서명" className="col-span-2">
            <input autoFocus required value={draft.title} onChange={(event) => update('title', event.target.value)} placeholder="문서 제목" className={fieldClassName} />
          </EditorField>
          <EditorField label="기준일">
            <input required value={draft.date} onChange={(event) => update('date', event.target.value)} placeholder="YYYY.MM.DD" className={fieldClassName} />
          </EditorField>
          <EditorField label="설명" className="col-span-3">
            <textarea value={draft.description} onChange={(event) => update('description', event.target.value)} placeholder="문서의 목적과 주요 내용을 입력하세요." rows={3} className={`${fieldClassName} h-[78px] resize-none py-2.5 leading-5`} />
          </EditorField>
          <EditorField label="분류" className="col-span-2">
            <input required value={draft.category} onChange={(event) => update('category', event.target.value)} placeholder="예: 전략·실행계획" className={fieldClassName} />
          </EditorField>
          <EditorField label="형식">
            <input required value={draft.type} onChange={(event) => update('type', event.target.value)} placeholder="예: PDF, Notion" className={fieldClassName} />
          </EditorField>
          <EditorField label="원본 URL" className="col-span-3">
            <input required type="url" value={draft.href} onChange={(event) => update('href', event.target.value)} placeholder="https://…" className={fieldClassName} />
          </EditorField>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#3C3C3C] px-6 py-4">
          <button type="button" disabled={saving} onClick={onClose} className="h-10 cursor-pointer rounded-[9px] border border-[#484848] px-5 text-[13px] font-semibold text-[#C7C7CC] hover:bg-[#343433] disabled:cursor-not-allowed disabled:opacity-50">취소</button>
          <button type="submit" disabled={saving} className="h-10 cursor-pointer rounded-[9px] bg-white px-5 text-[13px] font-bold text-[#1F1F1E] hover:bg-[#E5E5E5] disabled:cursor-wait disabled:opacity-60">{saving ? '저장 중…' : isEditing ? '수정 저장' : '문서 추가'}</button>
        </div>
      </form>
    </div>
  );
}

function DataRoomInlineDetail({ document, isReadOnly, onOpenOriginal }) {
  return (
    <div data-data-room-inline-detail className="bg-[#202020] px-[28px] py-[24px]">
      <div className="flex items-start gap-[16px]">
        <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[11px] border border-[#3c3c3c] bg-[#1A1A1A] text-[#86868B]">
          <FileText size={20} strokeWidth={1.6} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[20px] font-bold leading-[28px] text-white">{document.title}</h2>
          {document.description && (
            <p className="mt-[8px] whitespace-pre-wrap text-[14px] leading-[23px] text-[#A1A1A6]">
              {document.description}
            </p>
          )}
        </div>
      </div>

      <dl className="mt-[20px] grid grid-cols-4 overflow-hidden rounded-[12px] border border-[#383838] bg-[#242424]">
        {[
          ['분류', document.category],
          ['형식', document.type],
          ['기준일', document.date],
          ['조회수', document.viewCount || 0],
        ].map(([label, value], index) => (
          <div key={label} className={`px-[18px] py-[15px] ${index > 0 ? 'border-l border-[#383838]' : ''}`}>
            <dt className="text-[12px] font-bold text-[#86868B]">{label}</dt>
            <dd className="mt-[6px] text-[13px] font-semibold text-[#D1D1D6]">{value}</dd>
          </div>
        ))}
      </dl>

      <div
        data-data-room-source-actions
        className="mt-[18px] flex min-w-0 items-center gap-[16px]"
      >
        <a
          data-data-room-source-url
          href={document.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { if (!isReadOnly) onOpenOriginal(document.id); }}
          title={document.href}
          className="min-w-0 flex-1 cursor-pointer truncate text-[13px] font-medium text-[#8FC7FF] underline decoration-[#8FC7FF]/40 underline-offset-[3px] transition-colors hover:text-[#B9DCFA]"
        >
          {document.href}
        </a>
        <a
          href={document.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { if (!isReadOnly) onOpenOriginal(document.id); }}
          className="inline-flex h-[40px] shrink-0 cursor-pointer items-center justify-center gap-[7px] whitespace-nowrap rounded-[9px] border border-[#555] bg-white/[0.06] px-5 text-[13px] font-bold text-white transition-colors hover:border-[#666] hover:bg-white/[0.10]"
        >
          <ExternalLink size={15} strokeWidth={1.7} /> 원문 열기
        </a>
      </div>
    </div>
  );
}

export default function DataRoom() {
  const { user, member, isReadOnly } = useSonghyeonAuth();
  const navigate = useNavigate();
  const { documentId: routeDocumentId = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [documents, setDocuments] = useState([]);
  const [editingDocument, setEditingDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [repositoryError, setRepositoryError] = useState('');
  const [deletingId, setDeletingId] = useState('');
  const expandedRowRef = useRef(null);
  const actor = useMemo(() => ({ userId: user?.id, name: member?.staff_name || '', email: user?.email || '' }), [member?.staff_name, user?.email, user?.id]);

  useEffect(() => {
    let active = true;
    loadDataRoomDocuments()
      .then((loadedDocuments) => { if (active) setDocuments(loadedDocuments); })
      .catch((error) => { if (active) setRepositoryError(error.message || 'Data Room 문서를 불러오지 못했습니다.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const saveDocument = async (document) => {
    const saved = document.id
      ? await updateDataRoomDocument(document, actor)
      : await createDataRoomDocument(document, actor);
    setDocuments((current) => document.id
      ? current.map((item) => (item.id === saved.id ? saved : item))
      : [saved, ...current]);
    setEditingDocument(null);
  };

  const deleteDocument = async (document) => {
    if (!window.confirm(`“${document.title}” 문서를 삭제할까요?`)) return;
    setDeletingId(document.id);
    setRepositoryError('');
    try {
      await deleteDataRoomDocument(document.id, actor);
      setDocuments((current) => current.filter((item) => item.id !== document.id));
    } catch (error) {
      setRepositoryError(error.message || 'Data Room 문서를 삭제하지 못했습니다.');
    } finally {
      setDeletingId('');
    }
  };

  const recordView = (documentId) => {
    setDocuments((current) => current.map((document) => (
      document.id === documentId ? { ...document, viewCount: document.viewCount + 1 } : document
    )));
    recordDataRoomView(documentId).then((viewCount) => {
      setDocuments((current) => current.map((document) => (
        document.id === documentId ? { ...document, viewCount } : document
      )));
    }).catch(() => {});
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredDocuments = documents.filter((document) => (
    !normalizedQuery
    || [document.title, document.description, document.category, document.type, document.date, document.authorName]
      .some((value) => String(value || '').toLowerCase().includes(normalizedQuery))
  ));
  const updateQuery = (value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) nextParams.set('q', value);
    else nextParams.delete('q');
    if (routeDocumentId) {
      navigate(`/data${nextParams.toString() ? `?${nextParams.toString()}` : ''}`, { replace: true });
      return;
    }
    setSearchParams(nextParams, { replace: true });
  };
  const openDocument = (document) => {
    const listSearch = searchParams.toString();
    if (String(routeDocumentId) === String(document.id)) {
      navigate(`/data${listSearch ? `?${listSearch}` : ''}`, { replace: true });
      return;
    }
    navigate(`/data/${encodeURIComponent(document.id)}${listSearch ? `?${listSearch}` : ''}`);
  };
  const routeDocumentMissing = Boolean(
    !loading && routeDocumentId && !documents.some((document) => String(document.id) === String(routeDocumentId)),
  );

  useEffect(() => {
    if (!routeDocumentId || !expandedRowRef.current) return;
    expandedRowRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, [loading, routeDocumentId]);

  return (
    <>
      <WorkspacePageFrame>
        <WorkspacePageHeader
          title="Data Room"
          actions={(
          <div className="flex items-center gap-2">
            <label className="relative block w-[260px]">
              <Search className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#86868B]" size={14} strokeWidth={1.8} />
              <input
                type="search"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="문서 검색"
                aria-label="Data Room 문서 검색"
                className="h-[36px] w-full rounded-[8px] border border-[#3c3c3c] bg-[#262626] py-[8px] pl-[38px] pr-[12px] text-[13px] text-white outline-none transition-colors placeholder:text-[#686868] focus:border-[#666]"
              />
            </label>
            {!isReadOnly && <button type="button" onClick={() => setEditingDocument(emptyDocument())} className="inline-flex h-[36px] cursor-pointer items-center gap-1.5 rounded-[8px] border border-[#484848] bg-[#30302F] px-4 text-[12px] font-bold text-[#C7C7CC] transition-colors hover:border-[#5A5A5A] hover:bg-[#393938] hover:text-white">
              <Plus size={14} strokeWidth={2} /> 문서 추가
            </button>}
          </div>
          )}
        />

        <div className="overflow-hidden rounded-[32px] border border-[#3c3c3c] bg-[#272726]">
          {repositoryError && <div role="alert" className="border-b border-[#FF453A]/25 bg-[#FF453A]/10 px-5 py-3 text-[12px] text-[#FF8A82]">{repositoryError}</div>}
          {routeDocumentMissing && <div role="alert" className="border-b border-[#FF453A]/25 bg-[#FF453A]/10 px-5 py-3 text-[12px] text-[#FF8A82]">선택한 문서를 찾을 수 없습니다.</div>}
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="border-b border-[#3c3c3c] bg-[#272726]">
                <th className="px-[20px] py-[14px] text-[13px] font-bold text-[#86868B]">문서명</th>
                <th className="w-[96px] px-[8px] py-[14px] text-[13px] font-bold text-[#86868B]">작성자</th>
                <th className="w-[112px] px-[8px] py-[14px] text-[13px] font-bold text-[#86868B]">분류</th>
                <th className="w-[72px] px-[8px] py-[14px] text-[13px] font-bold text-[#86868B]">형식</th>
                <th className="w-[104px] px-[8px] py-[14px] text-center text-[13px] font-bold text-[#86868B]">기준일</th>
                <th className="w-[60px] px-[4px] py-[14px] text-center text-[13px] font-bold text-[#86868B]">조회수</th>
                <th className="w-[128px] px-[8px] py-[14px] text-center text-[13px] font-bold text-[#86868B]">원본</th>
                <th className="w-[84px] px-[8px] py-[14px] text-center text-[13px] font-bold text-[#86868B]">관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((document) => {
                const isExpanded = Boolean(routeDocumentId && String(document.id) === String(routeDocumentId));
                return (
                  <Fragment key={document.id}>
                    <tr
                      ref={isExpanded ? expandedRowRef : null}
                      tabIndex={0}
                      role="link"
                      aria-label={`${document.title} 상세 보기`}
                      aria-expanded={isExpanded}
                      onClick={() => openDocument(document)}
                      onKeyDown={(event) => {
                        if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
                          event.preventDefault();
                          openDocument(document);
                        }
                      }}
                      className={`cursor-pointer border-b border-[#3c3c3c] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#6f9fc7] ${isExpanded ? 'bg-[#30302F]' : 'bg-[#272726] hover:bg-[#333]'}`}
                    >
                      <td className="px-[20px] py-[15px] align-middle">
                        <div className="flex items-center gap-[12px]">
                          <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[10px] border border-[#3c3c3c] bg-[#1F1F1E] text-[#86868B]">
                            <FileText size={17} strokeWidth={1.6} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div title={document.title} className="truncate text-[14px] font-bold text-white">{document.title}</div>
                            <div title={document.description} className="mt-[3px] truncate text-[12px] leading-[18px] text-[#86868B]">{document.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="truncate px-[8px] py-[15px] align-middle text-[13px] font-semibold text-[#D1D1D6]" title={document.authorName || '작성자 미확인'}>{document.authorName || '작성자 미확인'}</td>
                      <td className="truncate px-[8px] py-[15px] align-middle text-[13px] text-[#bbb9af]" title={document.category}>{document.category}</td>
                      <td className="truncate px-[8px] py-[15px] align-middle text-[13px] text-[#bbb9af]" title={document.type}>{document.type}</td>
                      <td className="whitespace-nowrap px-[8px] py-[15px] text-center align-middle tabular-nums text-[13px] text-[#bbb9af]">{document.date}</td>
                      <td className="px-[4px] py-[15px] text-center align-middle tabular-nums text-[13px] text-[#bbb9af]">{document.viewCount || 0}</td>
                      <td className="px-[8px] py-[15px] text-center align-middle">
                        <a
                          href={document.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => { event.stopPropagation(); if (!isReadOnly) recordView(document.id); }}
                          className="inline-flex h-[36px] w-[112px] cursor-pointer items-center justify-center gap-[6px] whitespace-nowrap rounded-[8px] border border-[#555] bg-white/[0.06] text-[12px] font-bold text-white transition-colors hover:border-[#666] hover:bg-white/[0.10]"
                          aria-label={`${document.title} 원문 열기`}
                        >
                          <ExternalLink size={14} strokeWidth={1.7} />
                          원문 열기
                        </a>
                      </td>
                      <td className="px-[8px] py-[15px] text-center align-middle">
                        {!isReadOnly ? <div className="flex items-center justify-center gap-1">
                          <button type="button" onClick={(event) => { event.stopPropagation(); setEditingDocument({ ...document }); }} aria-label={`${document.title} 수정`} title="수정" className="grid h-8 w-8 cursor-pointer place-items-center rounded-[8px] text-[#A1A1A6] hover:bg-[#454544] hover:text-white">
                            <Pencil size={14} strokeWidth={1.8} />
                          </button>
                          <button type="button" disabled={deletingId === document.id} onClick={(event) => { event.stopPropagation(); deleteDocument(document); }} aria-label={`${document.title} 삭제`} title="삭제" className="grid h-8 w-8 cursor-pointer place-items-center rounded-[8px] text-[#A1A1A6] hover:bg-[#FF453A]/15 hover:text-[#FF6961] disabled:cursor-wait disabled:opacity-40">
                            <Trash2 size={14} strokeWidth={1.8} />
                          </button>
                        </div> : <span className="text-[11px] font-bold text-[#6f9fc7]">읽기 전용</span>}
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="border-b border-[#3c3c3c]">
                        <td colSpan={8} className="p-0">
                          <DataRoomInlineDetail
                            document={document}
                            isReadOnly={isReadOnly}
                            onOpenOriginal={recordView}
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {!loading && filteredDocuments.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-[20px] py-[48px] text-center text-[13px] text-[#86868B]">검색 결과가 없습니다.</td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={8} className="px-[20px] py-[48px] text-center text-[13px] text-[#86868B]">Data Room 문서를 불러오는 중입니다…</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </WorkspacePageFrame>

      {editingDocument && !isReadOnly && (
        <DocumentEditor document={editingDocument} onClose={() => setEditingDocument(null)} onSave={saveDocument} />
      )}
    </>
  );
}
