import React, { useState } from 'react';

export default function Section20({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        BID 재무 관리 프로세스
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    재산세와 일괄 징수하여 해당 지구관리협회(DMA)로 100% 반환하는 구조
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 시 정부 재무국의 대리 징수 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Tax Collection Agency
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    뉴욕시 재무국(DOF) 대리 징수 프로세스
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📨 매년 정기 재산세(Property Tax) 고지서에 BID 분담금 별도 항목으로 합산 고지
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    ⚖️ 체납 시 일반 지방세 연체 세율과 동일한 법적 패널티 부여 및 유치권 설정
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🛡️ 징수 안정성 99% 이상 보장으로 장기 예산 기획 및 금융 조달 신용도 상승
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 100% 교부 및 무수수료 원칙 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Zero-Commission Return
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    지구관리협회(DMA) 직접 위탁 운영 예산
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>시 정부 수수료 0%: 행정 대행 수수료를 한 푼도 원천 차감하지 않는 원칙</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>분기별 자동 이체: 수금 완료 후 30일 이내에 DMA 운영 계좌로 즉시 반환</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>용도 보장: 일반 행정비나 타 지역으로 유출을 배제하고 당해 지역 자산 관리에 전액 소요</span>
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
                            <span>행정 부처의 예산 편취를 근원적으로 예방하기 위해, 지방세 징수 대행 인프라만 시가 지원하고 재원은 민간 조직에 100% 직송금하는 투명한 순환 체계입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
