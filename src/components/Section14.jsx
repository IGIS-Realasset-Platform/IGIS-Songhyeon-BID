import React, { useState } from 'react';

export default function Section14({ isActive }) {
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
                    교외형 쇼핑몰 확산에 따른 도심 공동화 위기와 무임승차 문제의 발생
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 교외 쇼핑몰의 위협 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Suburban Mall Expansion
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    1960년대 토론토 도심 상권의 붕괴 위기
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    🚗 무료 주차와 쾌적한 보행로를 갖춘 현대식 교외 쇼핑몰의 등장
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    🏚️ 기존 가로형 상점가의 급격한 공실률 상승 및 가로 환경 노후화
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    📉 개별 상인 단위의 영세성으로 통합 마케팅 및 대형 투자 불가
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 자발적 기부의 한계 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Free-Rider Dilemma
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    자발적 상인협회(Association)의 실패 원인
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>협회비 납부율 저하 (전체 상인의 20~30%만 비용 분담)</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>비협조적 무임승차 상인들이 홍보 및 가로 청소 혜택 독점</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>재원의 한계와 갈등 심화로 인한 자발적 협회의 상시 붕괴 위기</span>
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
                            <span>세계 최초의 BIA(Business Improvement Area)는 민간 상인들의 자발적 기부에 의존하는 기존 상인협회 모델의 무임승차 한계를 극복하기 위해 제도화되었습니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
