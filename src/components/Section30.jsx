import React, { useState } from 'react';

export default function Section30({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        공공가치 캡처 및 금융
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    미래의 세수를 담보로 24억 달러 규모의 공공 인프라 선투자를 실행한 구조
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 미래세수 담보 채권 (HYIC) */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    HYIC Infrastructure Bonds
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    허드슨야드 인프라 공사(HYIC) 금융 모델
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🎫 인프라 채권 발행: 뉴욕시 일반 재정에 부담을 주지 않는 특수목적 채권 발행 체계 구축
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🚇 지하철 7호선 선투자: 조달된 24억 달러를 지하철 연장 공사에 즉각 투입하여 선제 교통망 개통
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🔄 가치 선순환: 대중교통 인프라 개통이 부동산 착공과 자산 가치 상승을 조기 견인
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 세수 락인 재원 (PILOT & DIB) */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Value Capture Backing
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    미래 증분 세수를 담보하는 이중 안전망
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>💸 PILOT (Payment in Lieu of Taxes): 건물주가 일반 재산세 대신 내는 고정액을 채권 상환 재원으로 전용</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🏙️ DIB (District Improvement Bonus): 민간이 허용 용적률 이상 개발하기 위해 시에 납부하는 지구 기금</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>💰 TDR (Tax Increment): 세금 증분 자금을 신탁 관리하여 채권 만기 상환 위험을 원천 차단</span>
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
                            <span>허드슨야드는 재산세 대체납부제(PILOT)와 용적률 거래 대금(DIB)을 연계하여, 공공이 재정 위기 속에서도 한 푼의 추가 부담 없이 인프라 개발을 완성한 '가치 캡처 금융(Value Capture Finance)'의 정수입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
