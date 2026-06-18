import React, { useState } from 'react';

export default function Section26({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        BID의 비판과 리스크
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    젠트리피케이션 및 저소득층 축출 우려로 무산된 사례 분석
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 로체스터 BID 추진의 좌절 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Rochester BID Proposal (2024)
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    대형 부동산 디벨로퍼 주도 계획
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏙️ 도심 쇠퇴 극대화를 해소하기 위해 앵커 기업 및 상업 부동산 주주 중심 기획안 수립
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📝 토지 가치 기준 과반 동의는 신속 취합했으나 소형 상인과의 사전 소통 부재
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 갈등의 쟁점과 시의회 부결 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Core Conflict Points
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    지역 공동체 연대 반발과 정당성 한계
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>💸 영세 자영업자의 부과금 전가(임대료 인상) 및 불합리한 이중과세 호소</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚨 치안 사유화 우려: 민간 가드가 소수 상류층 전용 구역을 위해 노숙인 및 빈곤층 차별적 배제 시도 비판</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🛑 민주적 결핍 논란 심화로 시의회가 설립 조례 가결을 거부하고 무기한 부결</span>
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
                            <span>로체스터시의 좌절은 지역 사회와의 긴밀한 의사소통 및 포용적 거버넌스 보장이 결여된 BID가 가질 수 있는 치명적인 추진 리스크를 경고합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
