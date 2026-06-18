import React, { useState } from 'react';

export default function Section31({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        용적률 거래 및 가치 귀속
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    디벨로퍼의 용적률 매입 대금으로 공원과 도로를 정비하는 선순환 구조
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 지구개선보너스 (DIB) 작동원리 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    DIB (District Improvement Bonus)
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    민간 용용적률 매입을 통한 공공기여금 확보
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    💵 평방피트당 초기 단가 $100: 기준 용적률 초과 개발을 희망하는 디벨로퍼에 부과
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📈 물가 지수(CPI) 자동 연동: 시간이 흐름에 따라 매입 단가가 시장 실질 가치에 연동되어 자동 상승
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🌳 전용 펀드 귀속: 징수액 전액을 허드슨야드 내 공원, 인도, 보행환경 조성을 위해 분리 관리
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 개발권 이전 제도 (TDR) 구조 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    TDR (Transfer of Development Rights)
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    철도기지 입체적 사용과 공공 재산 가치화
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚇 공중권 분리 매각: MTA 차량기지 부지 상부에 남은 미사용 용적률을 주변 민간 필지로 매각 허용</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🏢 초고층 복합 타워: Related 등 민간 개발자는 TDR 매입을 통해 용적률을 가중 확보하여 랜드마크 마천루 건설</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>💰 공적 재무 개량: MTA는 TDR 매각 수입으로 시 보조 없이 철도 차량기지 현대화 공사 완수</span>
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
                            <span>DIB와 TDR의 유기적 작동은 정부 예산 배정이나 공적 부채 증대 없이 오직 시장 내부의 용적률 공급-수요 메커니즘을 통해 공공 공간과 교통 인프라를 확장해내는 획기적인 모델입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
