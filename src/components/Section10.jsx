import React, { useState } from 'react';

export default function Section10({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        에리어 매니지먼트 - OMY
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    단순 빌딩 관리를 넘어 도로를 광장화하고 보행자 중심 가로를 설계한 도쿄 OMY 모델
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: OMY 컨셉 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    OMY Area Management
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    미쓰비시 지쇼 주도의 거리 혁신
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[17px]">
                                    🚗 마루노우치 나카도리 등 핵심 도로의 보행자 전용화
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[17px]">
                                    🎨 오픈 이노베이션 공간 및 연중 상시 이벤트 프로그래밍
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[17px]">
                                    🤝 공무원-지권자-기업이 결합된 고도의 의사결정 협의체
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 에리어 매니지먼트의 목적 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Target Value
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    단일 건물 단위 관리의 외연 확장
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6 justify-center">
                                <div className="bg-white/10 border border-white/20 p-5 font-bold text-white text-[16px] leading-relaxed">
                                    "우리는 개별 건물의 공간을 임대·공급하는 것을 넘어, 기업들이 반드시 이곳에 입주하여 머물러야만 하는 이유(장소 독점성)를 창출한다."
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
                            <span>은행 점포와 무기질 가로가 가득하던 주말 공동화 구역을 에리어 매니지먼트를 통해 365일 활성화된 도쿄의 심장부로 개편한 메커니즘</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
