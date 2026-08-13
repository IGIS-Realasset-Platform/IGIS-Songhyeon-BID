import React, { useState } from 'react';
import { Download, ExternalLink, FileText, Search } from 'lucide-react';

const documents = [
  {
    id: 'SH-BID-PREREAD-260728',
    title: '송현 BID 사전공유자료 : SBD 기반 BID 개념과 송현 BID의 관계',
    description: 'IOTA SEOUL 기반 SBD 전략과 BID 개념, 송현 BID의 실증 역할을 정리한 최초 사전공유자료',
    category: '배경·개념',
    type: 'Notion',
    date: '2026.07.28',
    size: '원문 링크',
    href: 'https://app.notion.com/p/BID-SBD-BID-BID-_260728-2398ced43c47839c9742018aa51cc7d3?source=copy_link',
    action: 'external',
  },
  {
    id: 'SH-BID-STRATEGY-260811',
    title: '송현 BID 프로젝트 방향 및 실행계획',
    description: '송현 BID의 프로젝트 방향, 추진 구조 및 실행계획을 정리한 기준 문서',
    category: '전략·실행계획',
    type: 'PDF',
    date: '2026.08.11',
    size: '10.4 MB',
    href: '/documents/songhyeon_bid_strategy_execution_plan_260811.pdf',
    filename: '송현_BID_프로젝트_방향_및_실행계획_260811.pdf',
    action: 'download',
  },
];

export default function DataRoom() {
  const [query, setQuery] = useState('');
  const [views, setViews] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem('songhyeon-document-views') || '{}');
    } catch {
      return {};
    }
  });

  const recordView = (documentId) => {
    setViews((current) => {
      const next = { ...current, [documentId]: (current[documentId] || 0) + 1 };
      window.localStorage.setItem('songhyeon-document-views', JSON.stringify(next));
      return next;
    });
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredDocuments = documents.filter((document) => (
    !normalizedQuery
    || [document.title, document.description, document.category, document.type, document.date]
      .some((value) => value.toLowerCase().includes(normalizedQuery))
  ));

  return (
    <div className="w-full min-w-0 flex-1 pb-[100px] pt-[28px] text-[#E5E5E5]">
      <div className="w-[1200px] mx-auto">
      <div className="mb-[12px] flex w-full items-end justify-between">
        <h1 className="font-['Inter'] text-[32px] font-bold leading-none tracking-tight text-white">자료실</h1>
        <label className="relative block w-[280px]">
          <Search className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#86868B]" size={14} strokeWidth={1.8} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="문서 검색"
            aria-label="자료실 문서 검색"
            className="h-[36px] w-full rounded-[8px] border border-[#3c3c3c] bg-[#262626] py-[8px] pl-[38px] pr-[12px] text-[13px] text-white outline-none transition-colors placeholder:text-[#686868] focus:border-[#666]"
          />
        </label>
      </div>

      <div className="mt-[14px] overflow-hidden rounded-[32px] border border-[#3c3c3c] bg-[#272726]">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-[#3c3c3c] bg-[#272726]">
              <th className="px-[20px] py-[14px] text-[13px] font-bold text-[#86868B]">문서명</th>
              <th className="w-[150px] px-[20px] py-[14px] text-[13px] font-bold text-[#86868B]">분류</th>
              <th className="w-[92px] px-[20px] py-[14px] text-[13px] font-bold text-[#86868B]">형식</th>
              <th className="w-[130px] px-[16px] py-[14px] text-center text-[13px] font-bold text-[#86868B]">기준일</th>
              <th className="w-[90px] px-[12px] py-[14px] text-center text-[13px] font-bold text-[#86868B]">조회수</th>
              <th className="w-[156px] px-[16px] py-[14px] text-center text-[13px] font-bold text-[#86868B]">원본</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((document) => (
              <tr key={document.id} className="border-b border-[#3c3c3c] bg-[#272726] transition-colors last:border-b-0 hover:bg-[#333]">
                <td className="px-[20px] py-[18px] align-middle">
                  <div className="flex items-center gap-[12px]">
                    <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[10px] border border-[#3c3c3c] bg-[#1F1F1E] text-[#86868B]">
                      <FileText size={17} strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-white">{document.title}</div>
                      <div className="mt-[3px] text-[12px] leading-[18px] text-[#86868B]">{document.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-[20px] py-[18px] align-middle text-[13px] text-[#bbb9af]">{document.category}</td>
                <td className="px-[20px] py-[18px] align-middle text-[13px] text-[#bbb9af]">{document.type}<div className="mt-[2px] text-[11px] text-[#686868]">{document.size}</div></td>
                <td className="px-[16px] py-[18px] text-center align-middle tabular-nums text-[13px] text-[#bbb9af]">{document.date}</td>
                <td className="px-[12px] py-[18px] text-center align-middle tabular-nums text-[13px] text-[#bbb9af]">{views[document.id] || 0}</td>
                <td className="px-[16px] py-[18px] text-center align-middle">
                  <a
                    href={document.href}
                    {...(document.action === 'download'
                      ? { download: document.filename }
                      : { target: '_blank', rel: 'noopener noreferrer' })}
                    onClick={() => recordView(document.id)}
                    className="inline-flex h-[38px] w-[124px] cursor-pointer items-center justify-center gap-[6px] whitespace-nowrap rounded-[8px] border border-[#3c3c3c] text-[12px] font-bold text-[#E5E5E5] transition-colors hover:border-[#555] hover:bg-[#30302F]"
                    aria-label={`${document.title} ${document.action === 'download' ? '다운로드' : '원문 열기'}`}
                  >
                    {document.action === 'download'
                      ? <Download size={14} strokeWidth={1.7} />
                      : <ExternalLink size={14} strokeWidth={1.7} />}
                    {document.action === 'download' ? '다운로드' : '원문 열기'}
                  </a>
                </td>
              </tr>
            ))}
            {filteredDocuments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-[20px] py-[48px] text-center text-[13px] text-[#86868B]">검색 결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
