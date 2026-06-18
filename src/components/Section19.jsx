import React, { useState } from 'react';

export default function Section19({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        BID 설립 기준 및 법적 절차
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    부동산 소유주 및 사업자의 과반수 동의를 통한 특별부과지구의 지정
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 법적 설립 요건 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Legal Requirements
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    지구 획정을 위한 4대 필수 절차
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    ✍️ 소유자 동의서 취합 (전체 필지 수 및 공시지가 총액 기준 과반수 이상 동의)
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🗣️ 법적 주민 공청회 (지정 구역의 경계 획정 및 분담금 요율 타당성 검토)
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏛️ 시의회 조례(Ordinance) 제정 및 주정부 최종 승인 획득
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 주요 주별 규정 비교 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    State Regulation Comparison
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    동의율 및 과세 비례부담 기준
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>매사추세츠주: 부동산 소유주의 60% 이상 및 토지 가치 51% 이상 동의 의무화</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>캘리포니아주: Prop 13 비례성 원칙에 의거, 혜택 대비 부담금 한도 규제</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>반대 청원: 토지 소유자 50% 초과 서명 시 설립 절차 즉각 파기 및 1년 재상정 불가</span>
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
                            <span>지방 정부에 의한 일방적 지정이 아닌, 소유주와 상인들의 고도 동의 및 법률 조례 제정 단계를 거치는 사법/공법 결합형 프로세스입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
