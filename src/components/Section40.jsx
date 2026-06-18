import React, { useState } from 'react';

export default function Section40({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        SBD의 입지적 포지셔닝
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    서울역에서 남산에 이르는 메가스케일 트로피 에셋 공급축의 정립
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 기존 CBD 업무지구의 한계 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Traditional CBD Limitations
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    노후 오피스 누적과 양적 팽창의 종말
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📉 공급 과잉: 도심 주요 권역 내 대규모 프라임 빌딩 누적 공급으로 공실 장기화 리스크
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏢 자산 파편화: 건물마다 상이한 소유주, 통일되지 않은 물리 환경과 낙후된 보행로
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🚫 하드웨어 편중: 공간을 활성화하고 자산 매력도를 높일 통합 운영 콘텐츠(OS)의 결여
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 제4 업무 권역 SBD의 지향점 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    New SBD Concept (Seoul Station)
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    교통 결절과 대자연 자연축의 결합 복합 공간
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚇 메가 게이트웨이: GTX-A/B, KTX, 공항철도 등 11개 철도 노선 결절점인 서울역의 압도적 위상 활용</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🌳 남산 녹지 연계: 힐튼 재개발 등 강북 코어 입지에서 남산 자연공원까지 보행 녹지축 직선 연결</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🔑 통합 타운 매니지먼트: 한국 최초로 타운 전용 운영체제(OS)를 적용하는 5세대 지식형 에코 워크지구</span>
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
                            <span>SBD(Station/Seoul Business District)는 서울 도심 한복판에 자연, 교통, 그리고 민간 에리어 매니지먼트의 강력한 조화를 이식하여 글로벌 비즈니스 테넌트를 쓸어안는 메인 오피스 플랫폼을 지향합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
