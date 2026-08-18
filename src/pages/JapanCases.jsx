import React from 'react';
import { Map, TrendingUp, Building2, Repeat } from 'lucide-react';

export default function JapanCases() {
  return (
    <div className="songhyeon-reference-dark animate-fade-in pb-16">
      {/* Header */}
      <div className="mb-10 border-b border-gray-900 pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">일본 (Tokyo Area Mgt) 핵심 사례 심층 분석</h1>
        <p className="text-[14px] text-gray-600 font-bold">'잃어버린 30년'을 극복하고 트로피 자산의 프라이싱 방어 및 자본 리사이클링을 실현한 Area Management 모델.</p>
      </div>

      <div className="space-y-8">
        
        {/* Section 1: Paradigm Shift */}
        <div className="border border-gray-200 bg-white overflow-hidden">
          <div className="bg-[#1f2937] px-6 py-3 flex items-center">
            <Map className="w-5 h-5 text-[#E5E5E5] mr-3" />
            <h2 className="text-[16px] font-bold text-[#E5E5E5] uppercase tracking-wider">01. 잃어버린 30년 극복과 Area Management</h2>
          </div>
          <div className="p-6">
            <h3 className="text-[14px] font-extrabold text-gray-900 mb-3 border-b border-gray-200 pb-2">점(Building)에서 선/면(Area) 단위의 통합 관리로 진화</h3>
            <ul className="space-y-2 text-[13px] text-gray-800">
              <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-gray-500 block shrink-0"></span><span>일본은 장기 디플레이션과 노후 자산의 도태 위기 속에서, 미쓰비시와 모리빌딩 등 초대형 민간 디벨로퍼 주도의 <strong>Area Management(지역 통합 관리)</strong> 패러다임을 도입함.</span></li>
              <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-gray-500 block shrink-0"></span><span>단일 건물 개발에 머물지 않고, 도쿄역 및 롯폰기 일대와 같은 거대한 복합 인프라를 하나로 묶어 지역 전체를 브랜드화시킴.</span></li>
              <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-gray-500 block shrink-0"></span><span>자산운용, 시니어 케어, 인바운드 관광과 융합하여 '잃어버린 30년'의 늪에서 새로운 거시적 시장 가치를 창출함.</span></li>
            </ul>
          </div>
        </div>

        {/* Section 2: Marunouchi Pricing */}
        <div className="border border-gray-200 bg-white overflow-hidden">
          <div className="bg-[#1f2937] px-6 py-3 flex items-center">
            <TrendingUp className="w-5 h-5 text-[#E5E5E5] mr-3" />
            <h2 className="text-[16px] font-bold text-[#E5E5E5] uppercase tracking-wider">02. 마루노우치 프라이싱과 절대적 공실 방어</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#eff6ff] p-5 border border-[#bfdbfe]">
              <h3 className="text-[15px] font-bold text-[#1d4ed8] mb-2">USD 200/sqft 글로벌 저항선 돌파</h3>
              <p className="text-[13px] text-gray-800 leading-relaxed mb-2">
                미쓰비시 지쇼가 주도한 도쿄 마루노우치 권역은 글로벌 스탠다드를 상회하는 압도적 프라임 임대료(USD 200/sqft 이상)를 유지함.
              </p>
              <p className="text-[13px] text-gray-800 leading-relaxed">
                이는 신규 트로피 자산들의 가치 평가 시 기준점이 되는 <strong>수렴점(Convergence Point)</strong> 역할을 확고히 함.
              </p>
            </div>
            <div className="bg-gray-50 p-5 border border-gray-200">
              <h3 className="text-[15px] font-bold text-gray-900 mb-2">공실률 2% 사수 및 Bear 국면 방어력</h3>
              <p className="text-[13px] text-gray-800 leading-relaxed mb-2">
                노후 자산들의 도태 속에서도 압도적인 타운 매니지먼트 퀄리티를 바탕으로 <strong>공실률 2% 이하의 완전 임차</strong>를 사수하고 있음.
              </p>
              <p className="text-[13px] text-gray-800 leading-relaxed">
                거시적 불황(Bear) 국면에서도 자산 가치 하락을 원천 차단하는 탁월한 자본 방어력을 실증함.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Vertical City */}
        <div className="border border-gray-200 bg-white overflow-hidden">
          <div className="bg-[#1f2937] px-6 py-3 flex items-center">
            <Building2 className="w-5 h-5 text-[#E5E5E5] mr-3" />
            <h2 className="text-[16px] font-bold text-[#E5E5E5] uppercase tracking-wider">03. 수직 도시(Vertical City)와 J-Brand 프리미엄</h2>
          </div>
          <div className="p-6">
            <h3 className="text-[14px] font-extrabold text-gray-900 mb-3 border-b border-gray-200 pb-2">퍼블릭 스페이스의 사유화와 무형 자산의 이식</h3>
            <ul className="space-y-2 text-[13px] text-gray-800">
              <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><span><strong>수직 도시 모델:</strong> 롯폰기 힐스와 도쿄 미드타운은 압도적인 퍼블릭 스페이스와 상업 시설을 고밀도로 적층 결합하여 도시 내 새로운 도시를 구축함.</span></li>
              <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><span><strong>J-Brand 프리미엄:</strong> 과거 1980년대 소니와 세가가 전 세계에 구축했던 강력한 무형 자산(J-Brand)을 오프라인 부동산 시장에 벤치마킹함.</span></li>
              <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><span>단순 임대수익 중심의 자산운용에서 벗어나 'Asset as a Service(AaaS)' 모델로 진화하며 글로벌 자본의 거대한 유입을 견인함.</span></li>
            </ul>
          </div>
        </div>

        {/* Section 4: Capital Recycling */}
        <div className="border border-gray-200 bg-white overflow-hidden">
          <div className="bg-[#1f2937] px-6 py-3 flex items-center">
            <Repeat className="w-5 h-5 text-[#E5E5E5] mr-3" />
            <h2 className="text-[16px] font-bold text-[#E5E5E5] uppercase tracking-wider">04. 자본 리사이클링 (Capital Recycling) 전략</h2>
          </div>
          <div className="p-6">
            <h3 className="text-[14px] font-extrabold text-gray-900 mb-2">도쿄역 GranSta 모델: 트로피 자산의 지위 영속화</h3>
            <p className="text-[13px] text-gray-800 leading-relaxed mb-4">
              핵심 앵커 자산을 단순 매각(Exit)하여 포트폴리오에서 상실하는 기존 펀드 운영의 한계를 극복함. 도쿄역 GranSta 모델처럼 운영 권한과 브랜드 가치는 지속적으로 보유하면서도, 유동화를 통해 자본을 효율적으로 회수(Recycling)하는 고도화된 스킴을 입증함.
            </p>
            <div className="bg-gray-50 p-4 border-l-4 border-gray-900 text-[13px] text-gray-700 font-medium">
              결론적으로 일본의 Area Management는 노후화된 도심을 파괴적 스케일로 재생시키고, 초격차 프라이싱 방어벽을 구축함으로써 글로벌 LP들에게 가장 안정적인 투자 피난처(Safe Haven)를 제공하고 있음.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
