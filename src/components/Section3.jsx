import React, { useState } from 'react';

export default function Section3({ isActive }) {
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
                    1988년 BID 도입과 리노베이션 후 치안 확보 및 재정적 완전 독립
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: After 성과 */}
                    <div className="flex-[1.2] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    After: Bryant Park Corp (BID)
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    민관 협동 운영을 통한 대전환
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[18px]">
                                    <span>🛡️ 연 강력범죄 500건 → 사실상 0건 수렴</span>
                                </div>
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[18px]">
                                    <span>🤝 Google, Citibank, HBO 스폰서 참여</span>
                                </div>
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[18px]">
                                    <span>🎪 연중 문화·오락 프로그램 상시 기획 및 실행</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 재정 자립 */}
                    <div className="flex-[0.8] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Financial Autonomy
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    자체 수익 비지니스 모델 확립
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-5 font-black text-[#0f172a] text-[20px] text-center">
                                    연간 자체 운영 수익<br/>
                                    <span className="text-[28px] text-[#e04c9a]">3,000만 달러</span> (약 420억원)
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-gray-700 text-[16px] text-center">
                                    29년간 시 예산 지원<br/>
                                    <span className="text-[22px] text-red-600 font-extrabold">0 원</span>
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
                            <span>공적 규제와 민간 경영이 융합된 BID 운영 모델을 통해 추가 세수 투입 없이도 자생력을 갖춘 뉴욕 최고의 랜드마크 광장으로 재탄생</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
