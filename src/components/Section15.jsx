import React, { useState } from 'react';

export default function Section15({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        BIA의 기원과 역사
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    무임승차자를 원천 차단하기 위한 강제 특별부과금 체계의 법제화
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 온타리오 지방자치법 개정 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Ontario Municipal Act
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    지방자치법 제361조 개정 (1969년)
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    📜 지구 상인/소유주 과반 동의 시 특별지구 획정 권한 부여
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    💰 획정된 구역 내 모든 사업체에 대해 회비 납부 법적 강제화
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    ⚖️ 시 정부가 지방세 징수 시스템을 통해 대행 수납하는 법적 근거 마련
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: Bloor West Village BIA */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    The First BIA (1970)
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    세계 최초 BIA의 출범과 초기 예산 실적
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>275개 전체 점포에 가로 접면 비율 기준의 공평 부담 요율 산정</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>첫해 전원 납부로 예산 예측 가능성 100% 확보</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>가로 경관 조명 및 화단 설치 등 공동 비즈니스 환경 대폭 개선</span>
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
                            <span>법제화된 특별 부과금 제도는 지방자치단체가 일반 지방세 시스템과 일괄하여 강제 징수한 뒤, BIA 운영이사회로 100% 반환하는 금융적 메커니즘을 정립했습니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
