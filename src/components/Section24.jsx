import React, { useState } from 'react';

export default function Section24({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        BID 설립 로드맵
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    기획에서 출범까지 평균 3~6년이 소요되는 정교한 민주적 의사결정 과정
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: Phase 1 & 2 (준비 및 설득 단계) */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Phase 1 & 2: Planning & Outreach
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    설립 준비위원회 발족과 과반 동의 획득 과정
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🗺️ Phase 1. 기획 및 경계 설정 (Planning): 핵심 건물주 위주 발기인 구성, 대상 필지 세밀 획정 및 현황 조사
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📢 Phase 2. 주민 설득 및 서명 (Outreach): 뉴스레터 발송, 공청회 가구별 안내, 소상공인 반발 대응 및 동의율 달성
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: Phase 3 & 4 (입법 및 운영 출범) */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Phase 3 & 4: Legislative & Startup
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    시의회 승인 조례 제정 및 지구관리 개시
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>⚖️ Phase 3. 조례 입법화 (Legislative): 시 정부 공식 청문회 개최, 이의 신청서 접수 및 심사, 의회 결의안 통과</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚀 Phase 4. 비영리법인 DMA 설립 (Startup): 초대 임원진 선출, 재무국과 징수 위탁 계약, 첫 분담금 징수 및 관리 개시</span>
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
                            <span>평균 수년의 소요 기간은 주민간의 합의 강도와 법적 타당성을 검증하기 위한 불가피한 제도적 안전망이며, 이를 성공적으로 마친 BID만이 장기 지속성을 보장받습니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
