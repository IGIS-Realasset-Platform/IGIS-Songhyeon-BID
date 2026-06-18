import React, { useState } from 'react';

export default function Section43({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        SBD의 가치 귀속 원천
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    타 업무지구(CBD·GBD·YBD)가 끝내 갖지 못한 녹지 축과 광역 연결성의 결합
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 기존 3대 업무지구(GBD, YBD, CBD)의 환경 스펙 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Existing Districts (GBD/YBD/CBD)
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    자연 조망 부재와 국지적 교통 중심의 한계
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏢 GBD (강남): 높은 밀도와 유행의 중심이나, 대규모 자연 녹지가 전무하고 광역 KTX/GTX 망 연결 미비
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏙️ YBD (여의도): 한강 공원 접근성은 좋으나 금융 특화 업종 위주이며 강북 핵심 행정 중심지와의 단절성
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🚫 구도심 CBD: 오랜 역사성과 행정 접근성은 최고이나 자산 파편화와 대규모 기부채납 광장 면적의 절대 부족
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: SBD만의 독점적 프리미엄 무기 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    SBD's Exclusive Core Values
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    교통 편의성과 친자연 웰빙의 유일무이한 합작
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚇 광역 연결성: KTX 전 노선 및 향후 개통될 GTX-A/B 선상에 직접 노출되어 전국을 반나절 생활권으로 통합</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🌳 남산 에코 시스템: 빌딩 문을 열면 축구장 크기의 녹지 광장과 남산 생태 공원이 직접 보행로로 눈앞에 펼쳐지는 구조</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>💼 글로벌 기업 니즈: ESG 표준을 충족하는 '친환경 탄소제로 등급'과 '원스톱 광역 비즈니스 교통' 완벽 합치</span>
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
                            <span>남산의 영구 조망권과 서울역의 광역 허브 스펙이 결합된 SBD는, 시간이 흐를수록 주변 노후 빌딩들과의 격차를 압도적으로 벌리며 최고 수준의 임대료 프리미엄을 방어하는 기초 체력을 확보했습니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
