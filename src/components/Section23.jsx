import React, { useState } from 'react';

export default function Section23({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        BID의 조직 및 통제
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    소수 자본의 독점을 방지하기 위한 이사회 법적 인적 구성 강제
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 민간 주도 의사결정권 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Private Stakeholder Majority
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    자산 가치 극대화를 견인할 민간 위원
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏢 부동산 소유자 (Property Owners): 이사회 전체 의석의 과반수 초과 필수 의무
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🛍️ 지구 내 임차 상인 (Commercial Tenants): 실질 운영 주체로서 일정 규모 이상 의석 배정
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏠 거주 주민 대표 (Residents): 주거 인프라 안전 확보를 위한 목소리 반영
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 공공의 감시와 협력 (당연직 공무원 4인) */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Public Oversight & Check
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    법적 징수를 보증할 정부 측 이사회 의석
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>👤 시장 당연직 대리인: 시 전체 도시 마스터플랜과의 정합성 감시</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>👤 시 재무국장 (Comptroller): 특별 분담금 예산 집행의 회계 감사 및 통제</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>👤 지역 관할 시의원 / 구청장: 지구 운영 계획의 행정 지원 및 입법 연계</span>
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
                            <span>뉴욕주법 기준 최소 13인 이상으로 구성되는 이사회는 부동산 소유자의 주도권을 보장하되 공적 당국자 4인을 '필연적인 감시자'로 배치해 민관 협동 거버넌스를 완벽히 구현합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
