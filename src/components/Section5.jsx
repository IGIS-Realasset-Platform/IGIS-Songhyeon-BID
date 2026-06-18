import React, { useState } from 'react';

export default function Section5({ isActive }) {
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
                    1980년대 세계 최악의 우범 지역이었던 42번가 타임스스퀘어의 실태
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: Before 슬럼화 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Before: 1984 Times Square
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    도심 공동화 및 상권의 전면적인 황폐화
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[18px]">
                                    🔞 성인 업소와 퇴폐 상권의 난립 및 독점
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[18px]">
                                    💊 길거리 노상 마약 거래 및 강도 범죄 일상화
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[18px]">
                                    📉 임대료를 극단적으로 낮춰도 임차인 확보 불가능
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 구체적인 범죄 수치 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Criminal Threat
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    특정 지리 구역에 집중된 치안 위험
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-5 font-bold text-white text-[18px] text-center">
                                    42번가 단 한 블록에서만<br/>
                                    <span className="text-[28px] text-[#eab308]">연간 2,300건</span>의 강력범죄 발생
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white text-[16px] text-center">
                                    관광객 및 우량 다국적 기업의 진입 원천 차단
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
                            <span>유동 인구가 극도로 집중되는 맨해튼 핵심 교차로조차 치안과 인프라 관리가 무너지면 상업적 가치가 완전히 파멸한다는 실례</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
