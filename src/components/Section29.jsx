import React, { useState } from 'react';

export default function Section29({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        메가스케일 개발 PPP
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    북미 최대 250억 달러 민간 개발과 공공 인프라 결합 거버넌스
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 민간 디벨로퍼의 연합 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Private Developer Consortium
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    Related & Oxford 중심의 투자와 시공
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏗️ 민간 재원: 총 사업비 250억 달러(북미 최대 부동산 프로젝트) 전액 민간 펀딩 조달
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🚇 인공 데크 공사: 30개 레일이 흐르는 철도 차량기지 위에 6만 톤의 플랫폼 및 마천루 건설 책임
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏢 앵커 테넌트 유치: BlackRock, KKR, L'Oreal 등 글로벌 기업을 선임차인으로 유치하여 분양성 확보
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 공공 파트너의 보증 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Public Agencies Support
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    뉴욕시(NYC)와 대중교통국(MTA)의 기반 제공
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚇 MTA 차량기지 부지: 99년 장기 임대 계약을 통해 초지 지가 부담 완화 및 개발권 이전</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>⚖️ 뉴욕시 특별 조례: 차량기지 구역을 특별계획구역으로 지정하고 용적률 한도를 획기적으로 완화</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚇 인프라 선투자: 시 자산 연계 7호선 지하철을 지구 한복판까지 연장하는 보증 제공</span>
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
                            <span>허드슨야드는 공공기관(MTA/NYC)의 공적 자산(철도차량기지)과 민간 컨소시엄의 기획/자본력을 정밀 결합하여, 단순 도심 개발을 넘어 도시 인프라 혁신을 도출한 PPP의 최첨단 사례입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
