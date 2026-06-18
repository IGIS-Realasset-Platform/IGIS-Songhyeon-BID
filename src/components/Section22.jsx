import React, { useState } from 'react';

export default function Section22({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        BID의 역할 범위
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    기존 시의 행정 서비스를 대체하지 않고 추가적으로 보완하는 원칙
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 기존 시 정부 서비스 기준선 (Base Level) */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Base-Level Public Services
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    지방자치단체 고유의 법적 의무 행정
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    👮 일반 경찰 순찰 노선 배정 및 사건사고 법적 처리
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🚛 기본 시 조례 기준의 쓰레기 일일 수거 및 공공 도로 유지 보수
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📝 기준선 위배 금지: 시 정부는 BID 구역 내의 행정 인력을 인위적으로 철수할 수 없음
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: BID의 보완적 서비스 (Supplemental) */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Supplemental Special Services
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    지구관리협회(DMA)의 6대 프리미엄 가치 창출
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🧹 고밀도 청소 (하루 수회 추가 빗자루 청소 및 고압수 세척 실시)</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🛡️ 전용 보안 가드 (경비 순찰 및 비상 상황 경고 네트워크 독자 운용)</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🎨 플레이스메이킹 (꽃마차 가로등 설치, 특별 예술 프로그램, 브랜드 조형물 등)</span>
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
                            <span>지방 정부와 체결하는 기준 서비스 협약서(Base Level Agreement)를 통해, 시 재정 부족에 따른 책임을 민간에 전가(Shifting)하는 부작용을 사전에 원천 예방합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
