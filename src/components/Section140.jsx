import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section140({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const t1 = setTimeout(() => setStep(1), 100);
        const t2 = setTimeout(() => setStep(2), 300);
        const t3 = setTimeout(() => setStep(3), 500);
        const t4 = setTimeout(() => setStep(4), 700);
        const t5 = setTimeout(() => setStep(5), 900);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-white flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                {/* Header */}
                <div className={`transition-all duration-[734ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        {lang === 'kr' ? '핵심 Metric 추적' : 'Core Metric Tracking'}
                    </span>
                </div>
                <h2 className={`text-[32px] md:text-[46px] lg:text-[46px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] mb-12 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '성공적인 중장기 전략 달성을 위한 3대 모니터링 지표' : '3 Key Monitoring Metrics for Long-term Strategy Success'}
                </h2>
                
                {/* 3 Column Layout */}
                <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Macro */}
                    <div className={`bg-white border-2 border-[#1e3a8a] shadow-lg p-8 flex flex-col items-start text-left transition-all duration-700 delay-300 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h3 className="text-[24px] font-black text-[#1e3a8a] mb-6">거시 (Macro)</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">KOSPI 5,000~6,000 유지 여부</span>
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">기준금리 경로</span> (PF 자본 비용)
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">KRW/USD</span> (글로벌 LP capital flow)
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">한국 GDP 성장률 2%</span> 유지 여부
                                </p>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Market */}
                    <div className={`bg-white border-2 border-[#1e3a8a] shadow-lg p-8 flex flex-col items-start text-left transition-all duration-700 delay-500 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h3 className="text-[24px] font-black text-[#1e3a8a] mb-6">시장 (Market)</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">서울 프라임 오피스 공실률 4%</span> 이하 유지
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">임대료 평당 15만 원 돌파</span> 시점 (GBD 기준)
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">거래량 30조 원</span> 이상 유지
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">외국인 자본 유입 비중 25%+</span> 도달
                                </p>
                            </li>
                        </ul>
                    </div>

                    {/* IGIS */}
                    <div className={`bg-white border-2 border-[#1e3a8a] shadow-lg p-8 flex flex-col items-start text-left transition-all duration-700 delay-700 ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h3 className="text-[24px] font-black text-[#1e3a8a] mb-6">이지스 (IGIS)</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">AUM 분기 성장률</span>
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">글로벌 LP 비중</span>
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">운용 수수료 마진</span>
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">인재 retention rate</span>
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                                <p className="text-[17px] text-gray-800 font-bold leading-snug break-keep">
                                    <span className="text-[#1e3a8a]">IPR 본 PF 클로징 마일스톤</span>
                                </p>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}
