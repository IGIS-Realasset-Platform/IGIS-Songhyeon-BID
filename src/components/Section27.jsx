import React, { useState } from 'react';

export default function Section27({ isActive }) {
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
                    민주주의 결핍, 서비스 격차, 이중과세 논란, 공공공간의 사유화
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 의사결정 결핍과 양극화 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Democracy Deficit & Polarization
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    민주적 정당성 한계와 도시 불균형
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🗳️ 민주주의 결핍: 대형 소유주 위주의 의결권 편중으로 영세 상인 및 임차인 권리 무시 가능성
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📈 서비스 양극화: 부유한 업무지구(BID)는 초정밀 청결 유지, 취약 지역은 기본 청소조차 공백 발생
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 재정 부담과 공공의 상업화 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Double Taxation & Privatization
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    추가 세금 부담 논쟁과 공공성 훼손
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>💸 이중과세 논란: 공공 서비스를 받을 권리가 있음에도 건물주가 별도 부담금을 이중 지불한다는 상인 연대의 반발</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🛡️ 공공공간의 사유화: 보도나 광장 등 열린 공간이 비영리 민간법인(DMA)의 마케팅 행사나 특정 단속권에 종속</span>
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
                            <span>BID 제도는 상업 자산 가치 보존이라는 민간의 순기능과 공공의 공간 민주성 확보라는 상치되는 도시 공학적 가치를 동시에 조명하는 핵심 쟁점 모델입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
