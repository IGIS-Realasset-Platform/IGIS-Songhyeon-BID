import React, { useState } from 'react';

export default function Section7({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        NYC BID 실증적 가치 - Times Square
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    보행자 중심의 공간 재편이 불러온 상권 매출 폭등과 부동산 가치 순증
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 보행화와 상권 매출 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Economic Boom & Pedestrianization
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    공용 도로 회수를 통한 광장 활성화
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex justify-between items-center font-bold text-[#0f172a] text-[18px]">
                                    <span>🛍️ 광장 보행화 후 구역 상권 매출</span>
                                    <span className="text-[22px] font-black text-[#e04c9a]">+71% 증가</span>
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex justify-between items-center font-bold text-[#0f172a] text-[18px]">
                                    <span>🚶 보행자 수 흐름 추이</span>
                                    <span className="text-[20px] font-black text-[#0f172a]">+11% 증가</span>
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex justify-between items-center font-bold text-[#0f172a] text-[18px]">
                                    <span>🚗 교통사고 부상률 변동</span>
                                    <span className="text-[20px] font-black text-[#0f172a]">-35% 감소</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 부동산 가치 및 세수 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Property Value & Taxes
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    도시 및 주 정부 세수 기여 효과
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white text-[17px] flex justify-between items-center">
                                    <span>🏢 상업 부동산 가치 상승률</span>
                                    <span className="text-[#93c5fd] font-black">유사지 대비 +15%p</span>
                                </div>
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white text-[17px] flex justify-between items-center">
                                    <span>🗽 연간 뉴욕시 납세 세액</span>
                                    <span className="text-white font-black">11억 달러</span>
                                </div>
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white text-[17px] flex justify-between items-center">
                                    <span>🏛️ 연간 뉴욕주 납세 세액</span>
                                    <span className="text-white font-black">13억 달러</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>BID 연간 예산 약 300억 원(2,180만 달러)의 투입 대비, 창출되는 공공 공간의 부가가치와 도시 세수 유입 비율은 극대화된 투자 효율성을 나타냄</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
