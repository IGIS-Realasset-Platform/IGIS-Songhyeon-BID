import React, { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { WorkspacePageFrame, WorkspacePageHeader } from '../components/workspace/WorkspacePageLayout';
import { useSonghyeonAuth } from '../context/SonghyeonAuthContext';
import {
  loadDataRoomDocument,
  recordDataRoomView,
} from '../lib/songhyeonDataRoomRepository';

function BackToDataRoom({ to }) {
  return (
    <Link
      to={to}
      className="inline-flex h-[36px] cursor-pointer items-center gap-1.5 rounded-[8px] border border-[#484848] bg-[#30302F] px-4 text-[12px] font-bold text-[#C7C7CC] transition-colors hover:border-[#5A5A5A] hover:bg-[#393938] hover:text-white"
    >
      <ArrowLeft size={14} strokeWidth={2} /> 목록으로
    </Link>
  );
}

export default function DataRoomDetail() {
  const { documentId = '' } = useParams();
  const { state } = useLocation();
  const { isReadOnly } = useSonghyeonAuth();
  const [loadState, setLoadState] = useState({ documentId: null, document: null, error: '' });
  const listHref = state?.dataRoomListSearch ? `/data?${state.dataRoomListSearch}` : '/data';
  const loading = loadState.documentId !== documentId;
  const document = loading ? null : loadState.document;
  const repositoryError = loading ? '' : loadState.error;

  useEffect(() => {
    let active = true;
    loadDataRoomDocument(documentId)
      .then((loadedDocument) => {
        if (active) setLoadState({ documentId, document: loadedDocument, error: '' });
      })
      .catch((error) => {
        if (active) setLoadState({ documentId, document: null, error: error.message || 'Data Room 문서를 불러오지 못했습니다.' });
      });
    return () => { active = false; };
  }, [documentId]);

  const openOriginal = () => {
    if (isReadOnly || !document) return;
    setLoadState((current) => current.documentId === documentId && current.document
      ? { ...current, document: { ...current.document, viewCount: current.document.viewCount + 1 } }
      : current);
    recordDataRoomView(document.id)
      .then((viewCount) => setLoadState((current) => current.documentId === documentId && current.document
        ? { ...current, document: { ...current.document, viewCount } }
        : current))
      .catch(() => {});
  };

  return (
    <WorkspacePageFrame>
      <WorkspacePageHeader title="Data Room" actions={<BackToDataRoom to={listHref} />} />

      {loading ? (
        <div className="rounded-[32px] border border-[#3c3c3c] bg-[#272726] px-6 py-[64px] text-center text-[13px] text-[#86868B]">
          Data Room 문서를 불러오는 중입니다…
        </div>
      ) : repositoryError || !document ? (
        <div className="rounded-[32px] border border-[#3c3c3c] bg-[#272726] px-6 py-[64px] text-center">
          <p className="text-[15px] font-bold text-[#E5E5E5]">문서를 찾을 수 없습니다.</p>
          {repositoryError && <p role="alert" className="mt-2 text-[12px] text-[#FF8A82]">{repositoryError}</p>}
          <Link to={listHref} className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-[12px] font-bold text-[#8fc3ee] hover:text-[#b4daf8]">
            <ArrowLeft size={14} /> Data Room으로 돌아가기
          </Link>
        </div>
      ) : (
        <article className="overflow-hidden rounded-[32px] border border-[#3c3c3c] bg-[#272726]">
          <div className="flex items-start gap-[16px] border-b border-[#3c3c3c] px-[28px] py-[26px]">
            <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[11px] border border-[#3c3c3c] bg-[#1F1F1E] text-[#86868B]">
              <FileText size={20} strokeWidth={1.6} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-[22px] font-bold leading-[30px] text-white">{document.title}</h2>
              {document.description && <p className="mt-[8px] whitespace-pre-wrap text-[14px] leading-[23px] text-[#A1A1A6]">{document.description}</p>}
            </div>
          </div>

          <dl className="grid grid-cols-4 border-b border-[#3c3c3c]">
            {[
              ['분류', document.category],
              ['형식', document.type],
              ['기준일', document.date],
              ['조회수', document.viewCount || 0],
            ].map(([label, value], index) => (
              <div key={label} className={`px-[28px] py-[22px] ${index > 0 ? 'border-l border-[#3c3c3c]' : ''}`}>
                <dt className="text-[12px] font-bold text-[#86868B]">{label}</dt>
                <dd className="mt-[8px] text-[14px] font-semibold text-[#D1D1D6]">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex justify-end px-[28px] py-[22px]">
            <a
              href={document.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openOriginal}
              className="inline-flex h-[40px] cursor-pointer items-center justify-center gap-[7px] whitespace-nowrap rounded-[9px] border border-[#555] bg-white/[0.06] px-5 text-[13px] font-bold text-white transition-colors hover:border-[#666] hover:bg-white/[0.10]"
            >
              <ExternalLink size={15} strokeWidth={1.7} /> 원문 열기
            </a>
          </div>
        </article>
      )}
    </WorkspacePageFrame>
  );
}
