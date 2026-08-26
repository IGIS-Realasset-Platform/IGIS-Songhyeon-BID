import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const REPORT_TABS = [
  { id: 'context', number: '01', title: '도시 차원의 민관협력', description: '국가·도시의 제도와 운영 배경', to: '/cases/city-partnership' },
  { id: 'evidence', number: '02', title: '국내외 75개 사례', description: '조사범위와 공통 문제', to: '/cases/global-evaluation' },
  { id: 'insights', number: '03', title: '공통 인사이트 도출', description: '작동장치와 후속 검토기준', to: '/cases/operating-insights' },
];

export default function CaseReportFrame({ current, children }) {
  const currentIndex = REPORT_TABS.findIndex((tab) => tab.id === current);
  const previous = REPORT_TABS[currentIndex - 1];
  const next = REPORT_TABS[currentIndex + 1];

  return (
    <div data-case-report-frame={current} className="songhyeon-reference-dark mx-auto w-[1120px] max-w-full animate-fade-in px-6 pb-16 text-[#E5E5E5]">
      <nav aria-label="민관협력 사례조사 구성" className="overflow-x-auto pt-8">
        <div className="grid min-w-[760px] grid-cols-3 overflow-hidden rounded-[18px] border border-white/10 bg-[#242423]">
          {REPORT_TABS.map((tab) => {
            const active = tab.id === current;
            return (
              <Link key={tab.id} to={tab.to} aria-current={active ? 'page' : undefined} className={`border-r border-white/10 px-5 py-4 last:border-r-0 ${active ? 'bg-[#202A36]' : 'hover:bg-[#2B2B2A]'}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-[13px] font-bold ${active ? 'text-[#8FC7FF]' : 'text-[#66666B]'}`}>{tab.number}</span>
                  <strong className={`text-[15px] ${active ? 'text-white' : 'text-[#A1A1A6]'}`}>{tab.title}</strong>
                </div>
                <p className={`mt-2 pl-[31px] text-[13px] ${active ? 'text-[#9DB9D0]' : 'text-[#66666B]'}`}>{tab.description}</p>
              </Link>
            );
          })}
        </div>
      </nav>

      {children}

      <footer className="mt-14 border-t border-white/10 pt-6">
        <div className="flex gap-4 max-md:flex-col">
          {previous ? (
            <Link to={previous.to} className="flex flex-1 items-center gap-3 rounded-[14px] border border-white/10 px-5 py-4 text-[#A1A1A6] hover:text-white">
              <ArrowLeft size={16} /><span><small className="block text-[12px] text-[#66666B]">이전 보고서</small><strong className="mt-1 block text-[14px]">{previous.title}</strong></span>
            </Link>
          ) : <span className="flex-1" />}
          {next ? (
            <Link to={next.to} className="flex flex-1 items-center justify-end gap-3 rounded-[14px] border border-[#49789E]/70 bg-[#202A36] px-5 py-4 text-right text-white">
              <span><small className="block text-[12px] text-[#8FC7FF]">다음 보고서</small><strong className="mt-1 block text-[14px]">{next.title}</strong></span><ArrowRight size={16} />
            </Link>
          ) : <span className="flex-1" />}
        </div>
      </footer>
    </div>
  );
}
