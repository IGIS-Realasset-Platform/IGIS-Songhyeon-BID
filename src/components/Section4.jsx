import React, { useState } from 'react';

export default function Section4({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        NYC BID 실증적 가치 - Bryant Park
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    공원의 정화가 주변 오피스 신축과 임대료 상승의 필수 선결 조건으로 작용
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 인과관계의 역전 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Paradigm Shift
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    공간 정화가 자본을 부르는 메커니즘
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6 justify-center">
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[18px] text-center">
                                    공원 환경 재생 (BID 주도)
                                </div>
                                <div className="flex justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e04c9a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                                    </svg>
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[18px] text-center">
                                    주변 오피스 빌딩 신축 및 재개발 개시
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 자산가치 증대 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Asset Appreciation
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    상업 부동산의 가치 동반 상승
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white text-[17px]">
                                    📈 공원 주변 오피스 타워 임대료 급등
                                </div>
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white text-[17px]">
                                    🏙️ 전망과 쾌적성이 결합된 오피스 프리미엄 형성
                                </div>
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white text-[17px]">
                                    🛍️ 방문객 유입에 따른 가로 리테일 활성화 및 매출 증가
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
                            <span>"공원이 살아났기 때문에 오피스가 새로 지어지고 입주한 것이지, 오피스가 생겨서 공원이 살아난 것이 아니다"라는 입지적 락인 효과의 입증</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
