import React, { useState } from 'react';

export default function Section11({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        에리어 매니지먼트 - OMY
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    도쿄 평균의 절반에 불과한 공실률 1.4%와 사상 최대의 랜드마크 딜
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 시장 성과 지표 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    OMY Market Indicators (2026)
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    철저한 지구 공실률 방어 및 임대 성과
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[17px] flex justify-between items-center">
                                    <span>📊 OMY 구역 평균 공실률</span>
                                    <span className="text-[20px] font-black text-[#e04c9a]">1.40%</span>
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[17px] flex justify-between items-center">
                                    <span>📉 도쿄 주요 5개구 평균 공실률</span>
                                    <span className="text-[18px] font-bold text-gray-600">2.80% (OMY의 2배)</span>
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[17px] flex justify-between items-center">
                                    <span>📈 OMY 오피스 최고 임대료</span>
                                    <span className="text-[20px] font-black">¥81,000/평 (+16.5%yoy)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 자산 매각 딜 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Record-Breaking Transaction
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    지구 매력도가 보증하는 자산 유동성
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6 justify-center">
                                <div className="bg-white/10 border border-white/20 p-5 font-black text-white text-[18px] text-center">
                                    마루노우치 3-3 재개발 단일 딜<br/>
                                    <span className="text-[26px] text-[#93c5fd]">¥4,200억 (약 4.2조원)</span> 거래 성사<br/>
                                    <span className="text-[15px] font-bold text-gray-300">(도쿄 상업용 부동산 역사상 단일 딜 최대 규모)</span>
                                </div>
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white text-[15px] text-center">
                                    초과 공실률 0.5% 미만 구간에서 건물주가 임차인을 선발하는 구도 확립
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
                            <span>에리어 매니지먼트를 통한 지구 단위의 종합 브랜딩이 임대 수익 극대화는 물론 자산 유동성(Capital Liquidity) 확보로 귀결됨을 입증하는 실증 데이터</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
