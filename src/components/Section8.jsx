import React, { useState } from 'react';

export default function Section8({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        플레이스메이킹과 가치 창출 - Hudson Yards
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    도시 부동산 역사상 최초로 입지(Location)가 아닌 장소(Place)가 임대료를 결정하다
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 장소성의 정의 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Place-Making Philosophy
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    공간의 재인식과 상징성 부여
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6 justify-center">
                                <div className="bg-white/10 border border-white/20 p-5 text-white font-serif text-[18px] italic leading-relaxed text-center">
                                    "과거에는 입지, 입지, 입지(Location)였다.<br/>
                                    오늘날은 장소, 장소, 장소(Place)다."
                                </div>
                                <div className="text-gray-400 font-bold text-[15px] text-right">
                                    — Thomas Birnbaum, NYC Realty Advisors
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 임대료 지표 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Rent Appreciation
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    물리적 개발 개시 시점의 가치 선반영
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6 justify-center">
                                <div className="bg-gray-100 border border-gray-300 p-5 font-black text-[#0f172a] text-[20px] text-center">
                                    2019년 복합단지 오픈 직전<br/>
                                    주변 부동산 임대료 1년 만에<br/>
                                    <span className="text-[28px] text-[#e04c9a] font-extrabold">40% 급상승</span>
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-gray-700 text-[15px] text-center">
                                    오피스 입지 자체가 기업의 최상위 브랜드 가치로 전환
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
                            <span>철도 차량 기지 상부에 조성된 대규모 인공 데크 플랫폼 위에 초고층 빌딩, 공원, 랜드마크 조형물을 결합하여 독보적인 장소 가치를 구현한 결과</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
