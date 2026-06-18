import React, { useState } from 'react';

export default function Section6({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        NYC BID 실증적 가치 - Times Square
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    1992년 BID 도입 후 범죄율 97% 급감 및 안전지대화 안착
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: After 운영 혁신 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    After: Times Square Alliance
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    민관 합동 상권 수호 체계 수립
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white text-[17px]">
                                    🧹 24시간 운영되는 가로 청소 및 환경 정화단 구축
                                </div>
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white text-[17px]">
                                    👮 민간 특별 보안 요원(Public Safety Officers) 배치
                                </div>
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white text-[17px]">
                                    🤝 공공 경찰(NYPD)과의 실시간 정보 공유 채널 개설
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 강력한 범죄 감소 수치 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Dramatic Crime Reduction
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    지표로 증명된 가로 안전의 정량적 확보
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6 justify-center">
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[18px] text-center">
                                    42번가 강력범죄 수<br/>
                                    <span className="text-[28px] text-[#e04c9a]">2,300건 → 60건</span> (97% 급감)
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[18px] text-center">
                                    설립 초기 6년간 전체 범죄율<br/>
                                    <span className="text-[24px] text-[#e04c9a]">57% 감소</span>
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
                            <span>공적 경찰력과 BID 법인의 보완적 서비스가 결합되어 뉴욕 최고의 역사적 슬럼가를 단 6년 만에 글로벌 랜드마크 명소로 세팅한 성공 사례</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
