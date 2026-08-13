import React from 'react';
import { ArrowRight, Landmark, TrendingUp, ShieldAlert, Building } from 'lucide-react';

export default function UsCases() {
  return (
    <div className="animate-fade-in pb-16">
      {/* Header */}
      <div className="mb-10 border-b border-gray-900 pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">미국 (New York BID) 핵심 사례 심층 분석</h1>
        <p className="text-[14px] text-gray-600 font-bold">뉴욕시 재정난 극복부터 허드슨야드 TIF 파이낸싱, 공적 보조의 실증 연구까지 포괄하는 전략 데이터룸.</p>
      </div>

      <div className="space-y-8">
        
        {/* Section 1: Genesis */}
        <div className="border border-gray-200 bg-white overflow-hidden">
          <div className="bg-[#1f2937] px-6 py-3 flex items-center">
            <ShieldAlert className="w-5 h-5 text-[#E5E5E5] mr-3" />
            <h2 className="text-[16px] font-bold text-[#E5E5E5] uppercase tracking-wider">01. 뉴욕시의 삼중고와 민간 주도 BID의 탄생</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[14px] font-extrabold text-gray-900 mb-2 border-b border-gray-200 pb-2">배경: 1970~80년대 치안 및 재정 붕괴</h3>
              <ul className="space-y-2 text-[13px] text-gray-800">
                <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-gray-500 block shrink-0"></span><span>재정난, 범죄율 폭증, 인프라 노후화라는 삼중고에 직면함.</span></li>
                <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-gray-500 block shrink-0"></span><span>공공 서비스 강제 감축 지표로 인해 뉴욕시 공원국(DPR)의 청소 및 보수 예산 전면 철회됨.</span></li>
                <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-gray-500 block shrink-0"></span><span>브라이언트 파크 및 공공도서관 일대가 치안 공백을 틈타 마약 소매 기지로 전락함.</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-extrabold text-[#1d4ed8] mb-2 border-b border-gray-200 pb-2">해결: 자산 소유주의 '자기금융' 결단</h3>
              <ul className="space-y-2 text-[13px] text-gray-800">
                <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><span>자산 가치 폭락 방어를 위해 소유주들이 스스로 추가 세금(Assessment)을 납부함.</span></li>
                <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><span>치안과 미화를 전담하는 <strong>민간 주도의 BID 모델</strong>을 최초 설립함.</span></li>
                <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><span>공공 안전국 폐쇄령 위기 속에서 민간 자본이 공공의 빈자리를 완전히 대체한 역사적 전환점임.</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Financial Returns */}
        <div className="border border-gray-200 bg-white overflow-hidden">
          <div className="bg-[#1f2937] px-6 py-3 flex items-center">
            <TrendingUp className="w-5 h-5 text-[#E5E5E5] mr-3" />
            <h2 className="text-[16px] font-bold text-[#E5E5E5] uppercase tracking-wider">02. 프라임 자산 가치 방어 및 수익 폭증</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 border border-gray-100">
                <div className="text-gray-500 text-[11px] font-bold uppercase mb-1">Bryant Park</div>
                <div className="text-[16px] font-black text-gray-900 mb-2">임대 활동 60% 폭증</div>
                <p className="text-[12px] text-gray-600 leading-relaxed">범죄 지대에서 프리미엄 공간으로 탈바꿈하며 주변 오피스의 임대 수요를 폭발적으로 견인함.</p>
              </div>
              <div className="bg-[#eff6ff] p-4 border border-[#bfdbfe]">
                <div className="text-[#1d4ed8] text-[11px] font-bold uppercase mb-1">Times Square</div>
                <div className="text-[16px] font-black text-[#1d4ed8] mb-2">임대료 40% 프리미엄</div>
                <p className="text-[12px] text-gray-800 leading-relaxed">철저한 구역 관리로 미드타운 평균 대비 40% 높은 임대료 초격차 프리미엄을 사수하는 앵커로 자리 매김.</p>
              </div>
              <div className="bg-gray-50 p-4 border border-gray-100">
                <div className="text-gray-500 text-[11px] font-bold uppercase mb-1">Tax Contribution</div>
                <div className="text-[16px] font-black text-gray-900 mb-2">뉴욕시 세수 11% 창출</div>
                <p className="text-[12px] text-gray-600 leading-relaxed">뉴욕 전체 면적의 0.1%만을 점유하면서도 압도적인 집객력과 가치 상승으로 시 전체 세수의 11%를 담당함.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Hudson Yards & TIF */}
        <div className="border border-gray-200 bg-white overflow-hidden">
          <div className="bg-[#1f2937] px-6 py-3 flex items-center">
            <Landmark className="w-5 h-5 text-[#E5E5E5] mr-3" />
            <h2 className="text-[16px] font-bold text-[#E5E5E5] uppercase tracking-wider">03. 허드슨야드 파이낸싱 (TIF) 및 구조적 혁신</h2>
          </div>
          <div className="p-6">
            <h3 className="text-[14px] font-extrabold text-gray-900 mb-3">미래 세수 담보형 24억 달러 공공 인프라 선투자</h3>
            <p className="text-[13px] text-gray-800 leading-relaxed mb-6">
              단순 미화를 넘어, 버려진 차량기지 공중권(TDR) 개발을 위해 뉴욕대중교통국(MTA)과 뉴욕시가 자체 부채 없이 인프라 자금을 조달한 압도적 금융 혁신 모델임.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[13px] font-bold text-[#1d4ed8] mb-2">TIF 및 HYIC (특수목적법인)</h4>
                <ul className="space-y-1.5 text-[12px] text-gray-700">
                  <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><span>미래 세수 증가분(Tax Increment Financing)을 담보로 설정함.</span></li>
                  <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><span>뉴욕시 보증 특수 법인(HYIC)을 설립하여 24억 달러 채권 발행함.</span></li>
                  <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><span>지하철 7호선 연장 등 핵심 인프라를 뉴욕시 예산 투입 없이 건설함.</span></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-gray-900 mb-2">ISP (이자 지원금) 헤징</h4>
                <ul className="space-y-1.5 text-[12px] text-gray-700">
                  <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-gray-500 block shrink-0"></span><span>초기 개발 단계의 세수 부족 리스크를 원천 차단함.</span></li>
                  <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-gray-500 block shrink-0"></span><span>증분 세수가 채권 이자를 덮지 못할 시 뉴욕시가 ISP를 자동 지급함.</span></li>
                  <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-gray-500 block shrink-0"></span><span>민간 자본 진입 리스크를 완벽하게 헤징하여 투자를 견인함.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Governance & AaaS */}
        <div className="border border-gray-200 bg-white overflow-hidden">
          <div className="bg-[#1f2937] px-6 py-3 flex items-center">
            <Building className="w-5 h-5 text-[#E5E5E5] mr-3" />
            <h2 className="text-[16px] font-bold text-[#E5E5E5] uppercase tracking-wider">04. 공간 운영의 사유화 (AaaS) 및 거버넌스 실체</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="md:pr-8 pb-6 md:pb-0">
              <h3 className="text-[14px] font-extrabold text-gray-900 mb-3 border-b border-gray-200 pb-2">HYHK 얼라이언스 및 벨라 압죽 공원 모델</h3>
              <ul className="space-y-2 text-[13px] text-gray-800">
                <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-gray-500 block shrink-0"></span><span>공개공지 및 하이라인 파크의 조경, 치안, 예술 팝업 운영 권한을 민간(HYHK BID)에 일괄 양도함.</span></li>
                <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-gray-500 block shrink-0"></span><span>영세 상인 물리적 카트 배치 말소 및 차도 차단을 통해 가로 환경을 얼라이언스가 독점 통제함.</span></li>
                <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-gray-500 block shrink-0"></span><span>민간이 인프라 유지 자금을 자체 조달하며 자산의 하이엔드 아이덴티티를 방어함.</span></li>
              </ul>
            </div>
            <div className="md:pl-8">
              <h3 className="text-[14px] font-extrabold text-gray-900 mb-3 border-b border-gray-200 pb-2">거버넌스 및 뉴스쿨(SCEPA) 실증 연구</h3>
              <ul className="space-y-2 text-[13px] text-gray-800">
                <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><span><strong>SBS 감사:</strong> 뉴욕시 소기업청(SBS)이 당연직 이사회를 파견하여 72개 BID의 공공성과 투명성을 상시 감시함.</span></li>
                <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><span><strong>22억 달러 공적 보조:</strong> 2018년 뉴스쿨 연구 결과, "자기금융"이라는 초기 명분과 달리 뉴욕시가 실질적으로 약 22억 달러를 보조(Subsidized)했음이 밝혀짐.</span></li>
                <li className="flex items-start"><span className="mr-2 mt-1.5 w-1 h-1 bg-[#1d4ed8] block shrink-0"></span><span>화려한 BID 이면에 거대한 공공 인프라 재정 투입이 필수적이었음을 시사함.</span></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

