import React, { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';

const IMAGES = [
  '/k_twin_stacking.png',
  '/k_twin_view.png',
  '/cbd_asset_map.png',
  '/ktwin_gallery_1.webp',
  '/ktwin_gallery_2.webp',
  '/ktwin_gallery_3.webp',
  '/ktwin_gallery_4.webp',
  '/ktwin_floorplan.webp'
];

export default function KTwin() {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryOffset, setGalleryOffset] = useState(0);
  const [unit, setUnit] = useState('pyeong'); // 'pyeong' or 'sqm'

  const images = IMAGES;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isImageOpen) return;
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        setIsImageOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageOpen, images.length]);

  return (
    <>
    <div className="songhyeon-reference-dark animate-fade-in pb-16">
      {/* Header Area */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">더케이트윈타워</h1>
          <p className="text-[14px] text-gray-500 max-w-3xl leading-relaxed">
            IGIS 보유 핵심 프라임 오피스 자산. 송현 BID 및 THE QUAD(트윈트리 연계) 밸류애드 전략 실행을 위한 기준 데이터 및 운영 스펙.
          </p>
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Grid: Key Specs & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[50px] gap-y-8 mb-10">
        
        {/* Left Column: Physical Specs */}
        <div>
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-[17px] font-bold text-gray-900 uppercase">Physical Specs.</h2>
            {/* Unit Toggle Button */}
            <div className="flex border border-gray-300 rounded-none overflow-hidden">
              <button 
                onClick={() => setUnit('pyeong')}
                className={`px-2 py-0.5 text-[10px] font-bold cursor-pointer transition-colors border-r border-gray-300 ${unit === 'pyeong' ? 'bg-gray-900 text-[#172033]' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
              >
                평 (py)
              </button>
              <button 
                onClick={() => setUnit('sqm')}
                className={`px-2 py-0.5 text-[10px] font-bold cursor-pointer transition-colors ${unit === 'sqm' ? 'bg-gray-900 text-[#172033]' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
              >
                ㎡ (sqm)
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">소재지</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">서울 종로구 중학동 19</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">규모 / 주구조</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">B6 / 16F (2개동) · 철근콘크리트조</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">대지면적</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">
                {unit === 'pyeong' ? '2,032.83 평' : '6,720.10 ㎡'}
              </span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">건축면적</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">
                {unit === 'pyeong' ? '1,114.90 평' : '3,685.62 ㎡'}
              </span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">연면적 (GFA)</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">
                {unit === 'pyeong' ? '25,379.54 평' : '83,899.30 ㎡'}
              </span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">기준층 면적</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">
                {unit === 'pyeong' ? '임대 720 py / 전용 413.02 py' : '임대 2,380.17 ㎡ / 전용 1,365.36 ㎡'}
              </span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">전용률</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">57.36%</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">승강기</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">총 16대 (승객 12, 비상 4)</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">주차대수</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">총 398대 (자주식)</span>
            </div>
            <div className="flex justify-between items-baseline pb-2">
              <span className="text-[14px] text-gray-500 font-medium">사용승인일</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">2012년 5월 4일</span>
            </div>
          </div>
        </div>

        {/* Right Column: Physical & Regulatory Constraints */}
        <div>
          <h2 className="text-[17px] font-bold text-gray-900 uppercase mb-4">Operating & Regulatory Specs</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">용도지역</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">일반상업지역</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">주용도</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">업무시설, 판매시설</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">건폐율 (BCR)</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">54.84%</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">용적률 (FAR)</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">799.98%</span>
            </div>
            
            {/* View Corridor & Public Infrastructure */}
            <div className="flex flex-col gap-1.5 border-b border-gray-100 pb-3 mt-2">
              <span className="text-[14px] text-gray-900 font-bold">BID 연계 점용 잠재력</span>
              <div className="text-[13px] text-gray-600 leading-relaxed mt-1 space-y-2">
                <p>
                  <strong className="text-gray-800">공공공간 점용:</strong> 전/후면 공개공지와 인접 공원(조성 예정)을 연계한 Courtyard 확장. 
                  야외 팝업/리테일 활성화를 통한 1층부 활성화 및 수익화 구조 세팅.
                </p>
                <p>
                  <strong className="text-gray-800">트윈트리 연계:</strong> 율곡로 축을 공유하는 트윈트리 빌딩과 물리적/운영적 통합을 통한 THE QUAD 밸류애드 시너지 확보 요망.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      
      {/* Fund Structure & Assumptions Section */}
      <div className="mb-10">
        <h2 className="text-[17px] font-bold text-gray-900 uppercase mb-4">Fund Structure & Assumptions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          
          {/* Left Table: Fund Specs */}
          <div className="border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-left border-collapse text-[13px]">
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="bg-[#fafafa] px-4 py-3 font-semibold w-[120px] text-gray-700 border-r border-gray-200">펀드명</th>
                  <td className="px-4 py-3 text-gray-900 font-semibold">이지스광화문오피스일반사모부동산투자신탁 (가칭)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="bg-[#fafafa] px-4 py-3 font-semibold text-gray-700 border-r border-gray-200">투자대상</th>
                  <td className="px-4 py-3 text-gray-900">케이트윈타워 (서울특별시 종로구 종로1길 50)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="bg-[#fafafa] px-4 py-3 font-semibold text-gray-700 border-r border-gray-200">상품유형</th>
                  <td className="px-4 py-3 text-gray-900">부동산집합투자기구, 신탁형, 폐쇄형, 단위형, 사모형, 일반형</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="bg-[#fafafa] px-4 py-3 font-semibold text-gray-700 border-r border-gray-200">회계기간</th>
                  <td className="px-4 py-3 text-gray-900">직전 회계기간의 말일의 다음날부터 6개월이 되는 날 까지</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="bg-[#fafafa] px-4 py-3 font-semibold text-gray-700 border-r border-gray-200">투자위험등급</th>
                  <td className="px-4 py-3 text-[#e11d48] font-bold">2등급 (높은 위험)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="bg-[#fafafa] px-4 py-3 font-semibold text-gray-700 border-r border-gray-200">존속기간</th>
                  <td className="px-4 py-3 text-gray-900">펀드설정일로부터 5년 <span className="text-gray-400 text-[12px] block mt-0.5">(시장상황을 고려하여 조기청산 또는 연장가능)</span></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="bg-[#fafafa] px-4 py-3 font-semibold text-gray-700 border-r border-gray-200 align-top">모집금액</th>
                  <td className="px-4 py-3 text-gray-900">
                    <div className="flex justify-between border-b border-gray-100 pb-1.5 mb-1.5">
                      <span className="font-semibold text-gray-600">Equity (우선주)</span>
                      <span className="font-bold">약 [1,500]억원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">Equity (보통주)</span>
                      <span className="font-bold">약 [1,500]억원</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="bg-[#fafafa] px-4 py-3 font-semibold text-gray-700 border-r border-gray-200">펀드보수</th>
                  <td className="px-4 py-3 text-gray-500 text-[12px]">
                    운용보수(TBD) · 수탁보수(TBD) · 판매보수(TBD) · 사무관리보수(TBD)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Table: Assumptions */}
          <div className="border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-left border-collapse text-[13px] h-full">
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="bg-[#fafafa] px-4 py-3 font-semibold w-[120px] text-gray-700 border-r border-gray-200 align-top">기간가정</th>
                  <td className="px-4 py-3 text-gray-900 space-y-2">
                    <div className="flex justify-between items-center"><span className="text-gray-500">펀드 설정일</span><span className="font-semibold">2026년 9월</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-500">운영기간</span><span className="font-semibold">5년</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-500">매각 예정일</span><span className="font-semibold">2031년 9월</span></div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="bg-[#fafafa] px-4 py-3 font-semibold text-gray-700 border-r border-gray-200 align-top">매입가정</th>
                  <td className="px-4 py-3 text-gray-900 space-y-2">
                    <div className="flex flex-col mb-1">
                      <div className="flex justify-between items-center mb-1"><span className="text-gray-500">매입금액</span><span className="font-bold text-[15px]">약 1조원</span></div>
                      <span className="text-gray-400 text-[11px] text-right tracking-tight">(평당 매입가 약 38.0~42.0 백만원)</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100"><span className="text-gray-500">총 투자금액</span><span className="font-bold text-[14px]">약 1조 1,000억원</span></div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="bg-[#fafafa] px-4 py-3 font-semibold text-gray-700 border-r border-gray-200 align-top">Cap.rate</th>
                  <td className="px-4 py-3 text-gray-900 space-y-2">
                    <div className="flex justify-between items-center"><span className="text-gray-500">Initial Cap rate</span><span className="font-semibold">약 4.20% 내외</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-500">Exit Cap rate</span><span className="font-semibold">약 4.20% 내외</span></div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <th className="bg-[#fafafa] px-4 py-3 font-semibold text-gray-700 border-r border-gray-200 align-top">매각가정</th>
                  <td className="px-4 py-3 text-gray-900">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center mb-1"><span className="text-gray-500">매각금액</span><span className="font-bold text-[#3b82f6] text-[15px]">약 1조 3,000억원</span></div>
                      <span className="text-gray-400 text-[11px] text-right tracking-tight">(평당 매각가 약 48.0~52.0 백만원)</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      {/* Investment Structure & Capital Stack Section */}
      <div className="mb-10">
        <h2 className="text-[17px] font-bold text-gray-900 uppercase mb-4">Investment Structure & Capital Stack</h2>
        <div className="flex flex-col lg:flex-row gap-x-6 gap-y-8 w-full">
          
          {/* Left: Transaction Flow Diagram (Wider: col-span-3) */}
          <div className="w-full lg:w-[calc(60%+13.6px)] border border-gray-200 bg-white p-8 flex flex-col justify-between items-center min-h-[350px]">
            {/* Top: Lender */}
            <div className="flex flex-col items-center w-full">
              <div className="border border-gray-900 px-6 py-3 text-center w-[220px] cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="block text-[12px] text-gray-500 mb-1">대출기관</span>
                <span className="block text-[14px] font-bold text-gray-900">선순위 및 후순위 대출</span>
              </div>
              <div className="flex justify-center my-4 space-x-16 text-gray-500 w-[220px]">
                <div className="flex flex-col items-center"><span className="text-[11px] mb-1">이자 지급</span><ArrowUp className="w-4 h-4" /></div>
                <div className="flex flex-col items-center"><ArrowDown className="w-4 h-4 mb-1" /><span className="text-[11px]">대출 실행</span></div>
              </div>
            </div>

            {/* Middle Row: Seller -> Fund <- Investors */}
            <div className="flex w-full justify-center items-center my-2 gap-2 md:gap-4">
              {/* Seller */}
              <div className="bg-[#4b5563] border border-[#4b5563] py-4 px-2 text-center w-[120px] cursor-pointer hover:bg-gray-800 transition-colors shrink-0">
                <span className="block text-[11px] text-gray-300 mb-1">매도인</span>
                <span className="block text-[13px] font-bold text-[#172033] leading-tight">삼성SRA<br/>자산운용</span>
              </div>
              
              {/* Flow Left */}
              <div className="flex flex-col items-center text-gray-400 min-w-[80px]">
                <div className="flex items-center space-x-1.5 mb-1.5"><ArrowLeft className="w-4 h-4" /><span className="text-[11px] whitespace-nowrap">매매대금 지급</span></div>
                <div className="flex items-center space-x-1.5"><span className="text-[11px] whitespace-nowrap">소유권 이전</span><ArrowRight className="w-4 h-4" /></div>
              </div>

              {/* Fund */}
              <div className="bg-[#1f2937] border border-[#1f2937] py-4 px-2 text-center w-[180px] cursor-pointer hover:bg-black transition-colors shrink-0">
                <span className="block text-[13px] font-bold text-white leading-relaxed">이지스광화문오피스<br/>일반사모부동산투자신탁</span>
              </div>

              {/* Flow Right */}
              <div className="flex flex-col items-center text-gray-400 min-w-[80px]">
                <div className="flex items-center space-x-1.5 mb-1.5"><ArrowLeft className="w-4 h-4" /><span className="text-[11px] whitespace-nowrap">배당금 분배</span></div>
                <div className="flex items-center space-x-1.5"><span className="text-[11px] whitespace-nowrap">수익증권 투자</span><ArrowRight className="w-4 h-4" /></div>
              </div>

              {/* Investors */}
              <div className="border border-[#1d4ed8] py-4 px-2 text-center w-[120px] cursor-pointer hover:bg-blue-50 transition-colors shrink-0">
                <span className="block text-[11px] text-[#1d4ed8] font-bold mb-1">Equity 투자자</span>
                <span className="block text-[13px] font-bold text-gray-900 leading-tight">우선주/보통주</span>
              </div>
            </div>

            {/* Bottom: AMC */}
            <div className="flex flex-col items-center mt-2 w-full">
              <div className="flex justify-center my-4 text-gray-500 w-[220px]">
                <div className="flex flex-col items-center"><ArrowUp className="w-4 h-4 mb-1" /><span className="text-[11px]">펀드 운용</span></div>
              </div>
              <div className="border border-gray-300 px-6 py-3 text-center w-[220px] cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="block text-[12px] text-gray-500 mb-1">집합투자업자</span>
                <span className="block text-[14px] font-bold text-gray-900">이지스자산운용</span>
              </div>
            </div>
          </div>

          {/* Right: Capital Stack (Narrower: col-span-2) */}
          <div className="w-full lg:w-[calc(40%-37.6px)] border border-gray-200 bg-white p-6 flex items-center justify-center min-h-[350px]">
            <div className="w-full max-w-[260px] flex flex-col h-[300px] border border-gray-200 cursor-pointer">
              {/* Deposit: 30B (~3%) */}
              <div className="h-[10%] bg-[#f3f4f6] flex flex-col items-center justify-center border-b border-white hover:bg-[#e5e7eb] transition-colors">
                <span className="text-[11px] text-gray-500 font-medium">임대보증금</span>
                <span className="text-[12px] text-gray-900 font-bold">약 [300]억원</span>
              </div>
              
              {/* Senior/Junior Loan: 700B (~68%) */}
              <div className="h-[60%] bg-[#6b7280] flex flex-col items-center justify-center border-b border-white hover:bg-[#4b5563] transition-colors">
                <span className="text-[12px] text-[#172033]/80 font-medium mb-1">담보대출 선/후순위</span>
                <span className="text-[16px] text-[#172033] font-bold">약 [7,700]억원</span>
              </div>
              
              {/* Pref Equity: 150B (~14.5%) */}
              <div className="h-[15%] bg-[#5E8FBE] flex flex-col items-center justify-center border-b border-white hover:bg-[#2563A6] transition-colors">
                <span className="text-[11px] text-gray-800 font-medium">우선주 (Equity)</span>
                <span className="text-[13px] text-gray-900 font-bold">약 [1,500]억원</span>
              </div>
              
              {/* Common Equity: 150B (~14.5%) */}
              <div className="h-[15%] bg-[#1d4ed8] flex flex-col items-center justify-center hover:bg-[#1e40af] transition-colors">
                <span className="text-[11px] text-[#172033]/80 font-medium">보통주 (Equity)</span>
                <span className="text-[13px] text-[#172033] font-bold">약 [1,500]억원</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Strategic Scenario Analysis: Core+ vs Value-Add */}
      <div className="mb-10">
        <h2 className="text-[17px] font-bold text-gray-900 uppercase mb-4">Scenario Returns: Core+ vs Value-Add</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-8">
          
          {/* Core+ Strategy */}
          <div>
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-gray-900 mr-2"></div>
              <h3 className="text-[14px] font-bold text-gray-900">Core+ 전략 주요 가정</h3>
            </div>
            {/* Top Table */}
            <div className="border border-gray-200 bg-white overflow-hidden mb-4">
              <table className="w-full text-left border-collapse text-[12px]">
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer group">
                    <th className="bg-[#fafafa] px-3 py-2.5 font-semibold w-[90px] text-gray-700 border-r border-gray-200 align-top">운영전략</th>
                    <td className="px-3 py-2.5 text-gray-900 space-y-1.5">
                      <p className="flex items-start"><span className="mr-1.5 mt-1.5 w-1 h-1 bg-gray-400 block shrink-0"></span>우량 임차인 기반의 안정적인 현금흐름 확보</p>
                      <p className="flex items-start"><span className="mr-1.5 mt-1.5 w-1 h-1 bg-gray-400 block shrink-0"></span>장기 임차 및 높은 재계약률을 기반으로 임대 안정성 확보</p>
                      <p className="flex items-start"><span className="mr-1.5 mt-1.5 w-1 h-1 bg-gray-400 block shrink-0"></span>인접 자산과의 통합 관리를 통한 운영 효율성 및 경쟁력 강화</p>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer group">
                    <th className="bg-[#fafafa] px-3 py-2.5 font-semibold text-gray-700 border-r border-gray-200 align-top">Equity</th>
                    <td className="px-3 py-2.5 text-gray-900 space-y-1">
                      <div className="flex justify-between"><span className="text-gray-500">우선주:</span><span className="font-semibold">약 [1,500] 억원</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">보통주:</span><span className="font-semibold">약 [1,500] 억원</span></div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer group">
                    <th className="bg-[#fafafa] px-3 py-2.5 font-semibold text-gray-700 border-r border-gray-200 align-top">Loan</th>
                    <td className="px-3 py-2.5 text-gray-900 space-y-1">
                      <div className="flex justify-between"><span className="text-gray-500">선순위 대출:</span><span className="font-semibold">약 [6,600] 억원 <span className="text-[10px] text-gray-400 font-normal">(LTV 65% 수준)</span></span></div>
                      <div className="flex justify-between"><span className="text-gray-500">후순위 대출:</span><span className="font-semibold">약 [1,100] 억원 <span className="text-[10px] text-gray-400 font-normal">(LTV 75% 수준)</span></span></div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer group">
                    <th className="bg-[#fafafa] px-3 py-2.5 font-semibold text-gray-700 border-r border-gray-200 align-top">임대수입</th>
                    <td className="px-3 py-2.5 text-gray-900 space-y-1">
                      <div className="flex justify-between"><span className="text-gray-500">업무시설 목표 E.NOC:</span><span className="font-semibold">30만원 중반 수준</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">판매시설 목표 E.NOC:</span><span className="font-semibold">기존 임대차 계약 연장 가정</span></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Bottom Table: Returns */}
            <div className="border border-gray-200 bg-white overflow-hidden">
              <table className="w-full text-center border-collapse text-[12px]">
                <thead>
                  <tr className="bg-[#111] text-[#172033] border-b border-gray-200">
                    <th className="px-2 py-2 font-semibold border-r border-gray-700">구분</th>
                    <th className="px-2 py-2 font-semibold border-r border-gray-700">우선주</th>
                    <th className="px-2 py-2 font-semibold border-r border-gray-700">보통주</th>
                    <th className="px-2 py-2 font-semibold">펀드</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <th className="bg-[#fafafa] px-2 py-2 font-medium border-r border-gray-200 text-gray-700">CoC <span className="text-[10px] font-normal text-gray-400 block -mt-0.5">(C.G제외)</span></th>
                    <td className="px-2 py-2 border-r border-gray-200 font-semibold">약 [6.50]%</td>
                    <td className="px-2 py-2 border-r border-gray-200 font-semibold">약 [2.50]%</td>
                    <td className="px-2 py-2 font-semibold">약 [4.50]%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <th className="bg-[#fafafa] px-2 py-2 font-medium border-r border-gray-200 text-gray-700">IRR <span className="text-[10px] font-normal text-gray-400 block -mt-0.5">(C.G포함)</span></th>
                    <td className="px-2 py-2 border-r border-gray-200 font-bold text-gray-900">약 [10.00]%</td>
                    <td className="px-2 py-2 border-r border-gray-200 font-bold text-gray-900">약 [15.00]%</td>
                    <td className="px-2 py-2 font-bold text-gray-900">약 [13.00]%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Value-Add Strategy */}
          <div>
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-[#1d4ed8] mr-2"></div>
              <h3 className="text-[14px] font-bold text-[#1d4ed8]">Value-Add 전략 주요 가정</h3>
            </div>
            {/* Top Table */}
            <div className="border border-gray-200 bg-white overflow-hidden mb-4">
              <table className="w-full text-left border-collapse text-[12px]">
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer group">
                    <th className="bg-[#fafafa] px-3 py-2.5 font-semibold w-[90px] text-gray-700 border-r border-gray-200 align-top">운영전략</th>
                    <td className="px-3 py-2.5 text-gray-900 space-y-1.5">
                      <p className="flex items-start"><span className="mr-1.5 mt-1.5 w-1 h-1 bg-gray-400 block shrink-0"></span>Core+ 전략을 기반으로 아래와 같은 전략 추가실행</p>
                      <p className="flex items-start"><span className="mr-1.5 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><strong className="text-[#1d4ed8]">기존 건물에 증축을 통한 추가 수입 확보</strong></p>
                      <p className="flex items-start"><span className="mr-1.5 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><strong className="text-[#1d4ed8]">단계별 임대차 계약 조정을 통한 NOI 향상</strong></p>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer group">
                    <th className="bg-[#fafafa] px-3 py-2.5 font-semibold text-gray-700 border-r border-gray-200 align-top">Equity</th>
                    <td className="px-3 py-2.5 text-gray-900 space-y-1">
                      <div className="flex justify-between"><span className="text-gray-500">우선주:</span><span className="font-semibold">약 [1,500] 억원</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">보통주:</span><span className="font-semibold">약 [1,500] 억원</span></div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer group">
                    <th className="bg-[#fafafa] px-3 py-2.5 font-semibold text-gray-700 border-r border-gray-200 align-top">Loan</th>
                    <td className="px-3 py-2.5 text-gray-900 space-y-1">
                      <div className="flex justify-between"><span className="text-gray-500">선순위 대출:</span><span className="font-semibold">약 [6,600] 억원 <span className="text-[10px] text-gray-400 font-normal">(LTV 65% 수준)</span></span></div>
                      <div className="flex justify-between"><span className="text-gray-500">후순위 대출:</span><span className="font-semibold">약 [1,100] 억원 <span className="text-[10px] text-gray-400 font-normal">(LTV 75% 수준)</span></span></div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer group">
                    <th className="bg-[#fafafa] px-3 py-2.5 font-semibold text-gray-700 border-r border-gray-200 align-top leading-tight">기존면적<br/>임대수입</th>
                    <td className="px-3 py-2.5 text-gray-900 space-y-1">
                      <div className="flex justify-between"><span className="text-gray-500">업무시설 목표 E.NOC:</span><span className="font-semibold">30만원대 중반 수준</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">판매시설 목표 E.NOC:</span><span className="font-semibold">기존 임대료 수준</span></div>
                    </td>
                  </tr>
                  <tr className="bg-[#eff6ff] hover:bg-[#dbeafe] transition-colors cursor-pointer group">
                    <th className="px-3 py-2.5 font-bold text-[#1d4ed8] border-r border-[#bfdbfe] align-middle leading-tight border-t-2 border-[#5E8FBE]">증축면적<br/>임대수입</th>
                    <td className="px-3 py-2.5 text-[#1d4ed8] font-bold border-t-2 border-[#5E8FBE] align-middle">
                      판매시설 (증축부) 타겟 E.NOC : 30만원 수준
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Bottom Table: Returns */}
            <div className="border border-[#bfdbfe] bg-white overflow-hidden shadow-[0_0_0_1px_rgba(29,78,216,0.1)]">
              <table className="w-full text-center border-collapse text-[12px]">
                <thead>
                  <tr className="bg-[#111] text-[#172033] border-b border-gray-200">
                    <th className="px-2 py-2 font-semibold border-r border-gray-700">구분</th>
                    <th className="px-2 py-2 font-semibold border-r border-gray-700">우선주</th>
                    <th className="px-2 py-2 font-semibold border-r border-gray-700">보통주</th>
                    <th className="px-2 py-2 font-semibold">펀드</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <th className="bg-[#fafafa] px-2 py-2 font-medium border-r border-gray-200 text-gray-700">CoC <span className="text-[10px] font-normal text-gray-400 block -mt-0.5">(C.G제외)</span></th>
                    <td className="px-2 py-2 border-r border-gray-200 font-semibold">약 [6.50]%</td>
                    <td className="px-2 py-2 border-r border-gray-200 font-semibold">약 [2.50]%</td>
                    <td className="px-2 py-2 font-semibold">약 [4.50]%</td>
                  </tr>
                  <tr className="bg-[#eff6ff] hover:bg-[#dbeafe] transition-colors cursor-pointer">
                    <th className="px-2 py-2 font-bold border-r border-[#bfdbfe] text-[#1d4ed8]">IRR <span className="text-[10px] font-normal opacity-70 block -mt-0.5">(C.G포함)</span></th>
                    <td className="px-2 py-2 border-r border-[#bfdbfe] font-bold text-[#1d4ed8]">약 [10.00]%</td>
                    <td className="px-2 py-2 border-r border-[#bfdbfe] font-extrabold text-[#1d4ed8] text-[13px]">약 [17.50]% <span className="text-red-500 text-[10px] block font-bold">▲ 2.50%p</span></td>
                    <td className="px-2 py-2 font-extrabold text-[#1d4ed8] text-[13px]">약 [14.50]% <span className="text-red-500 text-[10px] block font-bold">▲ 1.50%p</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Financial & Tenant Specs Row */}
      <div className="mb-8">
        <h2 className="text-[17px] font-bold text-gray-900 uppercase mb-3">Financial & Rent Roll</h2>
        
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="border border-gray-200 p-4 bg-white">
            <span className="block text-[12px] text-gray-500 font-medium mb-1">현재 임대율</span>
            <span className="block text-2xl font-bold text-gray-900">100.0%</span>
            <span className="block text-[11px] text-green-600 font-semibold mt-1">공실률 0% (완전 임차)</span>
          </div>
          <div className="border border-gray-200 p-4 bg-white">
            <span className="block text-[12px] text-gray-500 font-medium mb-1">15년 이상 장기 임대 비중</span>
            <span className="block text-2xl font-bold text-gray-900">48.0%</span>
            <span className="block text-[11px] text-blue-600 font-semibold mt-1">MS, 우리카드, 매일유업 등 장기 락인</span>
          </div>
          <div className="border border-gray-200 p-4 bg-white">
            <span className="block text-[12px] text-gray-500 font-medium mb-1">임차 리스크 모니터링 (WALE)</span>
            <span className="block text-[15px] font-bold text-gray-900 mt-1">2029년 / 2033년 집중</span>
            <span className="block text-[11px] text-[#e11d48] font-semibold mt-1">우리카드 및 MS 대규모 만기 도래</span>
          </div>
        </div>

        {/* High-Credit Tenant Table */}
        <div className="border border-gray-200 bg-white overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fafafa] border-b border-gray-200 text-[12px] text-gray-500 font-semibold">
                <th className="px-4 py-3 font-medium">임차인 (Tenant)</th>
                <th className="px-4 py-3 font-medium">업종 (Industry)</th>
                <th className="px-4 py-3 font-medium text-center">신용등급</th>
                <th className="px-4 py-3 font-medium text-right">영업이익 (23년)</th>
                <th className="px-4 py-3 font-medium text-right">임대면적 (NLA)</th>
                <th className="px-4 py-3 font-medium text-center">임대만기 (Exp.)</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-900 divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-3 font-bold">우리카드 (Woori Card)</td>
                <td className="px-4 py-3 text-gray-600">신용카드 및 금융</td>
                <td className="px-4 py-3 font-semibold text-center">AA0</td>
                <td className="px-4 py-3 text-gray-500 text-right">207.4 십억원</td>
                <td className="px-4 py-3 font-semibold text-[#111] text-right">{unit === 'pyeong' ? '4,606 py' : '15,226 ㎡'}</td>
                <td className="px-4 py-3 font-bold text-[#e11d48] text-center">2029년</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-3 font-bold">종로구청 (Jongno-gu)</td>
                <td className="px-4 py-3 text-gray-600">공공기관</td>
                <td className="px-4 py-3 font-semibold text-gray-400 text-center">N/A</td>
                <td className="px-4 py-3 text-gray-400 text-right">N/A</td>
                <td className="px-4 py-3 font-semibold text-[#111] text-right">{unit === 'pyeong' ? '4,320 py' : '14,281 ㎡'}</td>
                <td className="px-4 py-3 font-bold text-[#e11d48] text-center">2025년</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-3 font-bold">Microsoft</td>
                <td className="px-4 py-3 text-gray-600">IT / 소프트웨어</td>
                <td className="px-4 py-3 font-semibold text-center">A0</td>
                <td className="px-4 py-3 text-gray-500 text-right">80.4 십억원</td>
                <td className="px-4 py-3 font-semibold text-[#111] text-right">{unit === 'pyeong' ? '3,250 py' : '10,744 ㎡'}</td>
                <td className="px-4 py-3 font-bold text-[#e11d48] text-center">2033년</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-3 font-bold">K&J, C&K (김앤장 등)</td>
                <td className="px-4 py-3 text-gray-600">법률 서비스</td>
                <td className="px-4 py-3 font-semibold text-gray-400 text-center">N/A</td>
                <td className="px-4 py-3 text-gray-400 text-right">N/A</td>
                <td className="px-4 py-3 font-semibold text-[#111] text-right">{unit === 'pyeong' ? '1,692 py' : '5,593 ㎡'}</td>
                <td className="px-4 py-3 font-bold text-[#111] text-center">2026년</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-3 font-bold">WE WORK</td>
                <td className="px-4 py-3 text-gray-600">공유 오피스</td>
                <td className="px-4 py-3 font-semibold text-gray-400 text-center">N/A</td>
                <td className="px-4 py-3 text-gray-400 text-right">N/A</td>
                <td className="px-4 py-3 font-semibold text-[#111] text-right">{unit === 'pyeong' ? '1,353 py' : '4,472 ㎡'}</td>
                <td className="px-4 py-3 font-bold text-[#111] text-center">2030년</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Stacking Plan & Lease Expiry Section */}
      <div className="border border-gray-200 p-5 bg-white mb-8">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-[17px] font-bold text-gray-900">Stacking Plan & Lease Expiration</h2>
          <span className="text-[12px] font-semibold text-gray-400 uppercase">Tenant Mix</span>
        </div>
        <div 
          className="w-full bg-[#f8f9fa] overflow-hidden border border-gray-100 flex items-center justify-center p-4 cursor-pointer hover:bg-gray-50 transition-colors group relative"
          onClick={() => { setIsImageOpen(true); setCurrentImageIndex(0); }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Plus className="w-8 h-8 text-[#172033] drop-shadow-md" />
          </div>
          <img 
            src="/k_twin_stacking.png" 
            alt="더케이트윈타워 Stacking Plan" 
            className="w-full max-w-[1000px] h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <p className="text-[12px] text-gray-400 mt-3 leading-relaxed">
          * 주요 앵커 테넌트: Microsoft (Tower A 고층부), Jongno-gu Office (Tower B 중층부), WeWork (Tower B 저층부), Woori Card (Tower A 저층부).<br/>
          * 임대차 만기(WALE) 리스크: 2029년(우리카드 등 6,899평) 및 2033년(마이크로소프트 등 5,373평)에 만기 도래가 집중되어 있어, THE QUAD 리테일 밸류애드를 통한 선제적 Tenant Retention이 요구됨.
        </p>
      </div>

            {/* Standard Floor Plan & Core Layout Section */}
      <div className="border border-gray-200 bg-white mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Text Descriptions */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-start">
            <div className="mb-2">
              <span className="text-[12px] font-semibold text-gray-400 uppercase">Floor Plan & Layout</span>
            </div>
            <h2 className="text-[19px] font-bold text-gray-900 mb-4">Wide Floor Plate & Side Core</h2>
            <div className="text-[14px] text-gray-600 leading-relaxed space-y-4">
              <p>
                <strong className="text-gray-900 block mb-1">기준층 720평 스케일:</strong> 
                Tower A와 Tower B 모두 기준층 임대면적 720평(py)의 대규모 바닥면적 확보. CBD 권역 내에서 이러한 입지, 스케일, 프라임급 운영 이력을 동시에 충족하는 비교 자산은 극도로 제한적임.
              </p>
              <p>
                <strong className="text-gray-900 block mb-1">편심코어(Side Core) 및 18m 유효 뎁스:</strong> 
                코어를 한쪽으로 밀어낸 편심코어 레이아웃 적용. 코어부터 창측까지 무려 18m의 유효 공간(Depth)을 기둥 간섭 없이 확보하여, Microsoft 등 글로벌 테크 기업 및 우량 대기업 임차인들의 공간 활용 선호도가 최상급임.
              </p>
            </div>
          </div>
          {/* Image Side */}
          <div 
            className="w-full h-full min-h-[250px] bg-[#f8f9fa] overflow-hidden flex items-center justify-center p-4 cursor-pointer hover:bg-gray-50 transition-colors group relative"
            onClick={() => { setIsImageOpen(true); setCurrentImageIndex(7); }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Plus className="w-8 h-8 text-[#172033] drop-shadow-md" />
            </div>
            <img 
              src="/ktwin_floorplan.webp" 
              alt="더케이트윈타워 기준층 평면도" 
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Permanent View Corridor Section (Modified to Grid Layout) */}
      <div className="border border-gray-200 bg-white mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Text Descriptions */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-start">
            <div className="mb-2">
              <span className="text-[12px] font-semibold text-gray-400 uppercase">View Corridor</span>
            </div>
            <h2 className="text-[19px] font-bold text-gray-900 mb-4">Permanent Panoramic Views</h2>
            <div className="text-[14px] text-gray-600 leading-relaxed space-y-4">
              <p>
                <strong className="text-gray-900 block mb-1">영구 조망권 확보:</strong> 
                경복궁, 광화문 광장, 청와대 일대의 파노라마 뷰를 영구적으로 확보. 북악산 스카이라인으로 인한 간섭이 없으며, 북향 및 서향의 탁 트인 개방감으로 프라임 오피스 가치를 영구 보존함.
              </p>
              <p>
                <strong className="text-gray-900 block mb-1">통경축 보장:</strong> 
                전면 부지(구 중학동 111) 철거 및 서울시 역사유적광장(공원화) 조성 확정에 따라, 전면부 시야를 제한할 수 있는 추가 건축물 등재 가능성 제로(0).
              </p>
            </div>
          </div>
          {/* Image Side */}
          <div 
            className="w-full h-full min-h-[250px] bg-[#f8f9fa] overflow-hidden flex items-center justify-center p-4 cursor-pointer hover:bg-gray-50 transition-colors group relative"
            onClick={() => { setIsImageOpen(true); setCurrentImageIndex(1); }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Plus className="w-8 h-8 text-[#172033] drop-shadow-md" />
            </div>
            <img 
              src="/k_twin_view.png" 
              alt="더케이트윈타워 영구 조망권 (경복궁, 광화문)" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* CBD Asset Positioning Map (Modified to Grid Layout) */}
      <div className="border border-gray-200 bg-white mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Text Descriptions */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-start">
            <div className="mb-2">
              <span className="text-[12px] font-semibold text-gray-400 uppercase">Location Positioning</span>
            </div>
            <h2 className="text-[19px] font-bold text-gray-900 mb-4">Core CBD Prime Office Positioning</h2>
            <div className="text-[14px] text-gray-600 leading-relaxed space-y-4">
              <p>
                <strong className="text-gray-900 block mb-1">지하철 및 교통망 접근성:</strong> 
                지하철 3호선 경복궁역, 5호선 광화문역 및 안국역 인접 (트리플 역세권). 주요 행정, 금융 기관 및 대기업 본사가 밀집된 도심권역(CBD) 내 최상위 위계 보유.
              </p>
              <p>
                <strong className="text-gray-900 block mb-1">송현 Art Triangle 앵커 거점:</strong> 
                종각·을지로 축(그랑서울, D타워 등)에 밀집된 타 2.5만평 이상 프라임 자산과 차별화. 송현광장 개발 축과 맞닿은 최북단 코어로, THE QUAD 및 쌈지길, 도화서길로 이어지는 보행 네트워크의 출발점 역할 수행.
              </p>
            </div>
          </div>
          {/* Image Side */}
          <div 
            className="w-full h-full min-h-[250px] bg-[#f8f9fa] overflow-hidden flex items-center justify-center p-4 cursor-pointer hover:bg-gray-50 transition-colors group relative"
            onClick={() => { setIsImageOpen(true); setCurrentImageIndex(2); }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Plus className="w-8 h-8 text-[#172033] drop-shadow-md" />
            </div>
            <img 
              src="/cbd_asset_map.png" 
              alt="Core CBD Asset Map" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Asset Visual Data Gallery */}
      <div className="border border-gray-200 p-5 bg-white mb-8">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-[17px] font-bold text-gray-900">Asset Visual Data Gallery</h2>
          <span className="text-[12px] font-semibold text-gray-400 uppercase">Archive</span>
        </div>
        
        <div className="relative w-full group/gallerybox">
          {/* Left Arrow */}
          <button 
            className="absolute left-[4px] md:left-[4px] top-1/2 -translate-y-1/2 text-gray-900 cursor-pointer opacity-[0.24] hover:opacity-100 transition-opacity z-20 p-1"
            onClick={(e) => {
              e.stopPropagation();
              setGalleryOffset((prev) => (prev === 0 ? 3 : prev - 1));
            }}
          >
            <ChevronLeft className="w-8 h-8" strokeWidth={2} />
          </button>

          <div className="grid grid-cols-4 gap-4 w-full">
            {[0, 1, 2, 3].map((i) => {
              // Array of actual gallery indices in the images array
              const galleryIndices = [3, 4, 5, 6];
              const targetIndex = galleryIndices[(i + galleryOffset) % 4];
              
              return (
                <div 
                  key={i}
                  className="w-full aspect-[4/3] bg-[#f8f9fa] overflow-hidden border border-gray-100 cursor-pointer group relative"
                  onClick={() => { setIsImageOpen(true); setCurrentImageIndex(targetIndex); }}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Plus className="w-8 h-8 text-[#172033] drop-shadow-md" />
                  </div>
                  <img 
                    src={images[targetIndex]} 
                    alt={`더케이트윈타워 전경 ${targetIndex - 2}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button 
            className="absolute right-[4px] md:right-[4px] top-1/2 -translate-y-1/2 text-gray-900 cursor-pointer opacity-[0.24] hover:opacity-100 transition-opacity z-20 p-1"
            onClick={(e) => {
              e.stopPropagation();
              setGalleryOffset((prev) => (prev === 3 ? 0 : prev + 1));
            }}
          >
            <ChevronRight className="w-8 h-8" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* The QUAD Value-Add Strategy Section */}
      <div className="border border-gray-200 p-6 bg-[#fafafa] mb-8">
        <h2 className="text-[17px] font-bold mb-4 text-gray-900">Value-add Execution Focus : THE QUAD</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <div className="text-gray-400 font-bold text-[12px] mb-1.5 uppercase">Task 01</div>
            <h3 className="text-[14px] font-semibold mb-2 text-gray-900">어메니티 통합 운영</h3>
            <p className="text-gray-600 text-[13px] leading-relaxed">
              트윈트리 빌딩과 어메니티 인프라 통합(1인당 0.1평 확보). 공용부 물리적/운영적 연결 방안 검토 요망.
            </p>
          </div>
          <div>
            <div className="text-gray-400 font-bold text-[12px] mb-1.5 uppercase">Task 02</div>
            <h3 className="text-[14px] font-semibold mb-2 text-gray-900">저층부 F&B 시너지 극대화</h3>
            <p className="text-gray-600 text-[13px] leading-relaxed">
              비즈니스 다이닝 특화 클러스터 육성. 두 자산 사이 단절된 가로를 Courtyard로 묶어 체류시간 및 리테일 매출 증대.
            </p>
          </div>
          <div>
            <div className="text-gray-400 font-bold text-[12px] mb-1.5 uppercase">Task 03</div>
            <h3 className="text-[14px] font-semibold mb-2 text-gray-900">멤버십 & AI PM 적용</h3>
            <p className="text-gray-600 text-[13px] leading-relaxed">
              Culture Triangle 통합 멤버십 플랫폼 기획. 데이터 기반 타운 매니지먼트를 통한 운영 효율화(Opex 절감) 검증.
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isImageOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsImageOpen(false)}
        >
          <div className="relative w-full max-w-[90vw] max-h-[90vh] flex items-center justify-center p-4 group/modal">
            {/* Close Button */}
            <button 
              className="absolute -top-10 right-0 text-[#172033] cursor-pointer opacity-[0.24] hover:opacity-100 transition-opacity"
              onClick={() => setIsImageOpen(false)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Prev Button */}
            <button 
              className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 text-[#172033] cursor-pointer opacity-[0.24] hover:opacity-100 transition-opacity z-50 p-2"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
            >
              <ChevronLeft className="w-12 h-12" strokeWidth={1.5} />
            </button>

            <img 
              src={images[currentImageIndex]}
              alt="더케이트윈타워 Full Image" 
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Right Next Button */}
            <button 
              className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 text-[#172033] cursor-pointer opacity-[0.24] hover:opacity-100 transition-opacity z-50 p-2"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
            >
              <ChevronRight className="w-12 h-12" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
