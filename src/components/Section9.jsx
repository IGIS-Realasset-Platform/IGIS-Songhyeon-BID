import React, { useState } from 'react';

export default function Section9({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        플레이스메이킹과 가치 창출 - Hudson Yards
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    뉴욕 미드타운 평균 대비 10~20%의 브랜드 프리미엄을 획득한 오피스 가치
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 임대료 상세 사양 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Trophy Towers Rent Spec
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    최고 임대료 수준 및 프리미엄율
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[17px] flex justify-between items-center">
                                    <span>🏢 오피스 평균 임대료</span>
                                    <span className="text-[20px] font-black">$120 ~ 150/SF</span>
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[17px] flex justify-between items-center">
                                    <span>💎 최상층 및 특별 전망 층</span>
                                    <span className="text-[20px] font-black text-[#e04c9a]">$160/SF 초과</span>
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[17px] flex justify-between items-center">
                                    <span>📊 미드타운 평균 오피스 대비</span>
                                    <span className="text-[20px] font-black text-[#e04c9a]">10~20% 프리미엄</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 트로피 테넌트 락인 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Trophy Tenants Lock-In
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    우량 다국적 기업의 전입 완료 성과
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white text-[16px] text-center">
                                    💼 BlackRock, KKR, Meta, Tapestry 등 대기업 본사 유치
                                </div>
                                <div className="bg-white/10 border border-white/20 p-5 font-black text-[#93c5fd] text-[20px] text-center">
                                    2026년 현재 오피스 4개 타워<br/>
                                    <span className="text-[32px] text-white">100% 입주 완료</span>
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
                            <span>임대 비용 상승에도 불구하고 기업들이 자발적으로 입주하는 이유는 공간 자체가 지니는 압도적인 장소 브랜드 가치 때문임</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
