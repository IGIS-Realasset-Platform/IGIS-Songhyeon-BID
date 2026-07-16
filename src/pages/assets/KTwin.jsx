import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function KTwin() {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/k_twin_stacking.png',
    '/k_twin_view.png',
    '/cbd_asset_map.png',
    '/ktwin_gallery_1.webp',
    '/ktwin_gallery_2.webp',
    '/ktwin_gallery_3.webp',
    '/ktwin_gallery_4.webp'
  ];

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
  }, [isImageOpen]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const data = [
    { year: '2025', noi: 240, premium: 0 },
    { year: '2026', noi: 252, premium: 12 },
    { year: '2027', noi: 275, premium: 25 },
    { year: '2028', noi: 310, premium: 50 },
    { year: '2029', noi: 365, premium: 95 },
    { year: '2030', noi: 420, premium: 140 },
  ];

  return (
    <>
    <div className="animate-fade-in pb-16">
      {/* Header Area */}
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">더케이트윈타워</h1>
        <p className="text-[14px] text-gray-500 max-w-3xl leading-relaxed">
          IGIS 보유 핵심 프라임 오피스 자산. 송현 BID 및 THE QUAD(트윈트리 연계) 밸류애드 전략 실행을 위한 기준 데이터 및 운영 스펙.
        </p>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Grid: Key Specs & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-10">
        
        {/* Left Column: Physical Specs */}
        <div>
          <h2 className="text-[17px] font-bold text-gray-900 uppercase mb-4">Physical Specs.</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">위치</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">종로구 종로1길 50 (Core CBD)</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">건축 규모</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">지하 6층 / 지상 16층 (A, B 2개동)</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">연면적 (GFA)</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">83,899.3㎡ (약 25,379.5평)</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">바닥면적 / 전용률</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">평균 약 413평 / 57.4%</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">주차대수</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">398대 (자주식)</span>
            </div>
            <div className="flex justify-between items-baseline pb-2">
              <span className="text-[14px] text-gray-500 font-medium">준공연도</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">2012년 (안정화 완료)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Physical & Regulatory Constraints */}
        <div>
          <h2 className="text-[17px] font-bold text-gray-900 uppercase mb-4">Operating & Regulatory Specs</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">용도지역</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">일반상업지역 / 방화지구 / 미관지구</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">지구단위계획</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">광화문광장 지구단위계획구역</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">건폐율 / 법정 한도</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">58.33% / 60.00%</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">용적률 / 법정 한도</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">763.53% / 800.00%</span>
            </div>
            
            {/* View Corridor & Public Infrastructure */}
            <div className="flex flex-col gap-1.5 border-b border-gray-100 pb-3 mt-2">
              <span className="text-[14px] text-gray-900 font-bold">영구 조망권 및 BID 점용 잠재력</span>
              <div className="text-[13px] text-gray-600 leading-relaxed mt-1 space-y-2">
                <p>
                  <strong className="text-gray-800">조망 프리미엄:</strong> 광화문·경복궁·북한산으로 이어지는 파노라마 뷰 확보. 
                  전면 부지(구 중학동 111) 철거 및 서울시의 공원화(역사유적광장 조성) 확정으로 영구적인 시야 통경축 보장.
                </p>
                <p>
                  <strong className="text-gray-800">공공공간 점용:</strong> 전/후면 공개공지와 인접 공원을 연계한 Courtyard 조성. 
                  영구 조망과 맞물린 야외 팝업/리테일 활성화로 최상급 임대 프리미엄 획득 가능.
                </p>
              </div>
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
                <th className="px-4 py-3 font-medium">신용등급</th>
                <th className="px-4 py-3 font-medium">영업이익 (23년 기준)</th>
                <th className="px-4 py-3 font-medium">임대면적 (NLA)</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-900 divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-bold">우리카드</td>
                <td className="px-4 py-3 text-gray-600">신용카드 및 금융</td>
                <td className="px-4 py-3 font-semibold">AA0</td>
                <td className="px-4 py-3 text-gray-500">207.4 십억원</td>
                <td className="px-4 py-3 font-semibold text-[#111]">4,606 py</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-bold">종로구청</td>
                <td className="px-4 py-3 text-gray-600">공공기관</td>
                <td className="px-4 py-3 font-semibold">-</td>
                <td className="px-4 py-3 text-gray-500">-</td>
                <td className="px-4 py-3 font-semibold text-[#111]">4,320 py</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-bold">Microsoft</td>
                <td className="px-4 py-3 text-gray-600">IT / 소프트웨어</td>
                <td className="px-4 py-3 font-semibold">A0</td>
                <td className="px-4 py-3 text-gray-500">80.4 십억원</td>
                <td className="px-4 py-3 font-semibold text-[#111]">3,250 py</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-bold">매일유업 (Maeil)</td>
                <td className="px-4 py-3 text-gray-600">유제품 제조 및 유통</td>
                <td className="px-4 py-3 font-semibold">AA-</td>
                <td className="px-4 py-3 text-gray-500">64.0 십억원</td>
                <td className="px-4 py-3 font-semibold text-[#111]">1,692 py</td>
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
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <svg className="w-8 h-8 text-gray-600 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
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

      {/* Permanent View Corridor Section */}
      <div className="border border-gray-200 p-5 bg-white mb-8">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-[17px] font-bold text-gray-900">Permanent Panoramic Views</h2>
          <span className="text-[12px] font-semibold text-gray-400 uppercase">View Corridor</span>
        </div>
        <div 
          className="w-full bg-[#f8f9fa] overflow-hidden border border-gray-100 flex items-center justify-center p-4 cursor-pointer hover:bg-gray-50 transition-colors group relative"
          onClick={() => { setIsImageOpen(true); setCurrentImageIndex(1); }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <svg className="w-8 h-8 text-gray-600 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
          <img 
            src="/k_twin_view.png" 
            alt="더케이트윈타워 영구 조망권 (경복궁, 광화문)" 
            className="w-full max-w-[1000px] h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <p className="text-[12px] text-gray-400 mt-3 leading-relaxed">
          * 광화문·경복궁·북한산으로 이어지는 파노라마 뷰 확보. 전면 부지(구 중학동 111) 철거 및 서울시의 공원화(역사유적광장 조성) 확정으로 영구적인 시야 통경축 보장.
        </p>
      </div>

      {/* CBD Asset Positioning Map */}
      <div className="border border-gray-200 p-5 bg-white mb-8">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-[17px] font-bold text-gray-900">Core CBD Prime Office Positioning</h2>
          <span className="text-[12px] font-semibold text-gray-400 uppercase">Location Map</span>
        </div>
        <div 
          className="w-full bg-[#f8f9fa] overflow-hidden border border-gray-100 flex items-center justify-center p-4 cursor-pointer hover:bg-gray-50 transition-colors group relative"
          onClick={() => { setIsImageOpen(true); setCurrentImageIndex(2); }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <svg className="w-8 h-8 text-gray-600 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
          <img 
            src="/cbd_asset_map.png" 
            alt="Core CBD Asset Map" 
            className="w-full max-w-[1000px] h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-100">
          <ul className="text-[12px] text-gray-600 space-y-2 list-disc pl-4">
            <li><strong className="text-gray-900">CBD 최북단 지배력:</strong> 종각·을지로 축(그랑서울, D타워, 센트로폴리스 등)에 밀집된 타 2.5만평 이상 프라임 오피스와 달리, 유일하게 광화문 광장과 경복궁에 맞닿은 최북단 코어에 위치.</li>
            <li><strong className="text-gray-900">송현 Art Triangle의 지정학적 앵커:</strong> CBD 20대 프라임 자산 중 송현광장, 북촌, 인사동 문화축과 가장 가까운 유일한 거점으로서 THE QUAD 및 쌈지길 연계 밸류애드의 지리적 당위성 제공.</li>
          </ul>
        </div>
      </div>

      {/* Asset Visual Data Gallery */}
      <div className="border border-gray-200 p-5 bg-white mb-8">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-[17px] font-bold text-gray-900">Asset Visual Data Gallery</h2>
          <span className="text-[12px] font-semibold text-gray-400 uppercase">Archive</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Gallery Item 1 */}
          <div 
            className="w-full aspect-[4/3] bg-[#f8f9fa] overflow-hidden border border-gray-100 cursor-pointer group relative"
            onClick={() => { setIsImageOpen(true); setCurrentImageIndex(3); }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
            <img 
              src="/ktwin_gallery_1.webp" 
              alt="더케이트윈타워 전경 1" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </div>

          {/* Gallery Item 2 */}
          <div 
            className="w-full aspect-[4/3] bg-[#f8f9fa] overflow-hidden border border-gray-100 cursor-pointer group relative"
            onClick={() => { setIsImageOpen(true); setCurrentImageIndex(4); }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
            <img 
              src="/ktwin_gallery_2.webp" 
              alt="더케이트윈타워 전경 2" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </div>

          {/* Gallery Item 3 */}
          <div 
            className="w-full aspect-[4/3] bg-[#f8f9fa] overflow-hidden border border-gray-100 cursor-pointer group relative"
            onClick={() => { setIsImageOpen(true); setCurrentImageIndex(5); }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
            <img 
              src="/ktwin_gallery_3.webp" 
              alt="더케이트윈타워 전경 3" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </div>

          {/* Gallery Item 4 */}
          <div 
            className="w-full aspect-[4/3] bg-[#f8f9fa] overflow-hidden border border-gray-100 cursor-pointer group relative"
            onClick={() => { setIsImageOpen(true); setCurrentImageIndex(6); }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
            <img 
              src="/ktwin_gallery_4.webp" 
              alt="더케이트윈타워 전경 4" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </div>
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

      {/* NOI Simulation Chart (Dummy Data Example) */}
      <div className="border border-gray-200 p-6 bg-white">
        <h2 className="text-[17px] font-bold text-gray-900 mb-5">송현 BID 연계 시 예측 NOI 상승 시나리오 (예시)</h2>
        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorNoi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#111" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="#888" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Area type="monotone" dataKey="noi" stackId="1" stroke="#111" strokeWidth={2} fill="url(#colorNoi)" name="Base NOI" />
              <Area type="monotone" dataKey="premium" stackId="1" stroke="#3b82f6" strokeWidth={2} fill="url(#colorPremium)" name="BID Premium" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[11px] text-gray-400 mt-4 text-center">* 위 차트는 뉴욕 BID 자산 가치 +15% 상승 효과를 더케이트윈타워에 시뮬레이션한 참고 지표입니다.</p>
      </div>

      {/* Fullscreen Image Modal */}
      {isImageOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsImageOpen(false)}
        >
          <div className="relative w-full max-w-[90vw] max-h-[90vh] flex items-center justify-center p-4">
            <button 
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsImageOpen(false)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={images[currentImageIndex]}
              alt="더케이트윈타워 Full Image" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
      </div>
    </>
  );
}