import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function KTwin() {
  const [isImageOpen, setIsImageOpen] = useState(false);

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
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">더케이트윈타워</h1>
        <p className="text-[14px] text-gray-500 max-w-3xl leading-relaxed">
          IGIS 보유 핵심 프라임 오피스 자산. 송현 BID 및 THE QUAD(트윈트리 연계) 밸류애드 전략 실행을 위한 기준 데이터 및 운영 스펙.
        </p>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Grid: Key Specs & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-10">
        
        {/* Left Column: Physical Specs */}
        <div>
          <h2 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-4">Physical Specs.</h2>
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
          <h2 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-4">Operating & Regulatory Specs</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
              <span className="text-[14px] text-gray-500 font-medium">용도지역</span>
              <span className="text-[14px] text-gray-900 font-semibold text-right">일반상업지역 / 방화지구 / 중심지미관지구</span>
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
            <div className="flex flex-col gap-1.5 border-b border-gray-100 pb-3 mt-2">
              <span className="text-[14px] text-gray-500 font-medium">공개공지 및 BID 점용 잠재력</span>
              <span className="text-[13px] text-gray-800 leading-relaxed mt-1">
                전면부(종로1길) 및 후면부 넓은 공개공지 확보. 트윈트리 빌딩과의 연계를 위한 'Courtyard' 조성 시, 보행자 전용 공간 전환 및 팝업/리테일 점용 허가 타진 가능 구역.
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Financial & Tenant Specs Row */}
      <div className="mb-8">
        <h2 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-3">Financial & Rent Roll</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
            <span className="block text-[12px] text-gray-500 font-medium mb-1">현재 임대율</span>
            <span className="block text-2xl font-bold text-gray-900">100.0%</span>
            <span className="block text-[11px] text-green-600 font-semibold mt-1">공실률 0%</span>
          </div>
          <div className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm col-span-2">
            <span className="block text-[12px] text-gray-500 font-medium mb-2">핵심 앵커 테넌트 (Anchor Tenants)</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[12px] font-semibold rounded-md">Microsoft Korea (13%)</span>
              <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[12px] font-semibold rounded-md">우리카드</span>
              <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[12px] font-semibold rounded-md">종로구청</span>
            </div>
          </div>
          <div className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
            <span className="block text-[12px] text-gray-500 font-medium mb-1">임차 리스크 모니터링</span>
            <span className="block text-[14px] font-bold text-gray-900 mt-1">2029년 / 2033년</span>
            <span className="block text-[11px] text-[#e11d48] font-semibold mt-1">우리카드 / MS 대규모 만기</span>
          </div>
        </div>
      </div>

      {/* Stacking Plan & Lease Expiry Section */}
      <div className="border border-gray-200 rounded-xl p-5 bg-white mb-8">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-[16px] font-bold text-gray-900">Stacking Plan & Lease Expiration</h2>
          <span className="text-[12px] font-semibold text-gray-400 uppercase">Tenant Mix</span>
        </div>
        <div 
          className="w-full bg-[#f8f9fa] rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center p-4 cursor-pointer hover:bg-gray-50 transition-colors group relative"
          onClick={() => setIsImageOpen(true)}
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

      {/* The QUAD Value-Add Strategy Section */}
      <div className="border border-gray-200 rounded-xl p-6 bg-[#fafafa] mb-8">
        <h2 className="text-[15px] font-bold tracking-tight mb-4 text-gray-900">Value-add Execution Focus : THE QUAD</h2>
        
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
      <div className="border border-gray-200 rounded-xl p-6 bg-white">
        <h2 className="text-[16px] font-bold text-gray-900 mb-5">송현 BID 연계 시 예측 NOI 상승 시나리오 (예시)</h2>
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
              src="/k_twin_stacking.png" 
              alt="더케이트윈타워 Stacking Plan Full" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

    </>
  );
}