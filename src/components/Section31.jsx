import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section31({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? 'DIB(보너스) & TDR(개발권) 작동' : 'DIB & TDR Mechanics'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    디벨로퍼의 용적률 매입 대금으로 공원과 도로를 정비하는 선순환 구조
                </h2>

                {/* 다차원 스탯카드 및 TDR 다이어그램 (5. 다차원 스탯카드형) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[36px] flex flex-col lg:flex-row gap-8 justify-between items-stretch">
                    
                    {/* Left: DIB 작동 메커니즘 카드 */}
                    <div className="w-full lg:w-[48%] border-4 border-[#0f172a] bg-white p-6 text-left flex flex-col justify-between shadow-sm">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                District Improvement Bonus (DIB)
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-6">
                                지구 개선 보너스 용적률 매입식
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="border border-[#0f172a] p-4 bg-gray-50 flex items-center justify-between">
                                    <span className="font-extrabold text-[15px] text-gray-800">💰 초기 기준 가격</span>
                                    <span className="text-[20px] font-black text-gray-900">$100 / SF (평방피트당)</span>
                                </div>
                                <div className="border border-[#0f172a] p-4 bg-gray-50 flex items-center justify-between">
                                    <span className="font-extrabold text-[15px] text-gray-800">📈 물가 지수 연동</span>
                                    <span className="text-[16px] font-black text-blue-700">CPI 지수 기준 가격 에스컬레이터 자동 반영</span>
                                </div>
                                <div className="border border-[#0f172a] p-4 bg-[#0f172a] text-white flex flex-col gap-1">
                                    <span className="font-extrabold text-[14px] text-[#93c5fd]">🌳 징수 재원의 사용처 지정</span>
                                    <span className="text-[13px] text-gray-300">지구 내 공원(Bella Abzug Park) 조성, 가로 시설물 정비, 보행 인도 환경 정비 펀드로만 전용 귀속</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: TDR 공중권 거래 및 차량기지 현대화 (SVG 다이어그램) */}
                    <div className="w-full lg:w-[48%] border-4 border-[#0f172a] bg-[#0f172a] p-6 text-left text-white flex flex-col justify-between shadow-md">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Transfer of Development Rights (TDR)
                            </span>
                            <h3 className="text-[24px] font-black mb-6">
                                MTA 차량기지 공중권 매각 구조
                            </h3>
                            
                            {/* TDR 작동 구조도 SVG */}
                            <div className="w-full h-[120px] bg-white/5 border border-white/10 mb-6 p-2 relative flex items-center justify-center">
                                <svg className="w-full h-full" viewBox="0 0 350 100">
                                    {/* MTA 철도기지 (하단) */}
                                    <rect x="10" y="65" width="130" height="30" fill="none" stroke="#93c5fd" strokeWidth="2" />
                                    <text x="75" y="83" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">🚇 MTA 철도기지</text>
                                    
                                    {/* 미사용 공중권 (야드 위 점선) */}
                                    <rect x="10" y="15" width="130" height="40" fill="none" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="3,3" />
                                    <text x="75" y="40" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">📦 미사용 공중권 (TDR)</text>
                                    
                                    {/* 이전 화살표 */}
                                    <path d="M 150,40 L 200,40" stroke="#3b82f6" strokeWidth="3" fill="none" />
                                    <polygon points="195,33 207,40 195,47" fill="#3b82f6" />
                                    <text x="178" y="27" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">매각</text>
                                    
                                    {/* 민간 빌딩 (우측) */}
                                    <rect x="220" y="15" width="110" height="80" fill="none" stroke="#ffffff" strokeWidth="2" />
                                    <text x="275" y="45" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="black">🏢 민간 마천루</text>
                                    <text x="275" y="65" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">용적률 합산</text>
                                    <text x="275" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">(초고층 개발 실현)</text>
                                </svg>
                            </div>

                            <p className="text-[13.5px] text-gray-300 font-bold leading-relaxed">
                                MTA는 차량기지 지상의 남은 공중권(TDR)을 인근 민간 필지에 매각하여, 뉴욕시 재정 지원이나 부채 없이 **차량기지 자체 현대화 공사 자금**을 성공적으로 조달했습니다.
                            </p>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>DIB와 TDR의 유기적 작동은 정부 예산 배정이나 공적 부채 증대 없이, 오직 시장 내부의 용적률(FAR) 공급-수요 메커니즘을 통해 공공 공간과 교통 인프라를 확장해내는 입체적 도시 금융 전략의 정수입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
