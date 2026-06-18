import React, { useState } from 'react';

export default function Section45({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        SBD 정량적 목표 지표
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    공실률 2%대 달성 및 주변 임대료 10~20% 프리미엄 창출의 목표
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: BID 미도입 시 가상 시나리오 (As-Is) */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Without Town Management
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    단순 물리적 건물 신축 및 방치 시 추이
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📉 공실률 장기 정체: 권역 경쟁 심화로 7.5% ~ 9.0% 대 공실 장기 누적
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    💸 임대 요율 둔화: 주변 오피스 지구 평균 가격 수준 수렴 및 프리미엄 상실
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🚶‍♂️ 보행 단절 지속: 노후 보행로 및 차량 소음으로 유동 인구가 유입되지 않는 슬럼 현상 잔존
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: SBD 타운 매니지먼트 적용 효과 (To-Be) */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    With SBD OS Implementation
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    운영체제 장착 후 핵심 목표 실적
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🎯 초저공실률 사수: 글로벌 앵커 및 에코 테넌트 사전 매칭으로 공실률 2.0% 이하 안정 유지</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>📈 임대료 프리미엄: 통합 가로 경관 가치 확보로 미드타운 평균 대비 15% 이상 할증 임대료 달성</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚶‍♀️ 유동객 35% 증대: 남산 보행 네트워크 가로 설계 개선을 통해 젊은 연령대 보행 유입 대폭 유발</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>정량 지표 예측 모델링은 타운 매니지먼트의 투입 비용 대비 약 8배의 실질적 자산가치 증대 효과를 도출하여, 대주단 및 투자자(LP)들을 설득하는 가장 강력한 무기가 됩니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
