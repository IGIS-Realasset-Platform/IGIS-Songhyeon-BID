import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section21({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) {
            setStep(20);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 765),
            setTimeout(() => setStep(3), 1132),
            setTimeout(() => setStep(4), 1591),
            setTimeout(() => setStep(5), 2050)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '2차전지 산업의 팽창과 숨고르기' : 'Expansion & Breathing Spell of EV Batteries'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '국내 IPO 붐을 견인한 EV 배터리 시장의 구조적 조정기' : 'Structural Adjustment of the EV Battery Market that Led the IPO Boom'}
                </h2>

                <div className="relative w-full max-w-[1000px] mt-[22px] mb-[10px] h-auto py-4 flex items-center justify-center z-10 gap-16">
                    
                    {/* The Boom (Left) */}
                    <div className={`relative flex flex-col items-center transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-20'}`}>
                        <div className="w-[260px] h-[260px] bg-gradient-to-t from-green-400 to-emerald-600 rounded-3xl shadow-xl flex flex-col items-center justify-center border-[6px] border-white mb-4">
                            <span className="text-[56px] font-black text-white leading-none">20%</span>
                            <span className="text-[20px] font-bold text-green-100 mt-2">{lang === 'kr' ? '글로벌 점유율' : 'Global Share'}</span>
                            <div className="mt-4 text-center text-white text-[15px] font-bold flex flex-col gap-1">
                                <span>LG Energy Solution</span>
                                <span>Samsung SDI</span>
                                <span>SK On</span>
                            </div>
                        </div>
                        <span className="text-[26px] font-black text-emerald-600">{lang === 'kr' ? '2020 IPO 붐' : '2020 IPO Boom'}</span>
                    </div>

                    {/* Chart Arrow */}
                    <div className={`flex flex-col items-center transition-all duration-[765ms] ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        {/* A curved arrow pointing down slightly */}
                        <svg className="w-48 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 100 50">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 25 Q 50 -10, 90 40" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M75 40 L 90 40 L 85 25" />
                        </svg>
                        <span className="text-[20px] font-bold text-gray-500 mt-3">{lang === 'kr' ? '2024~2026 사이클' : '2024-2026 Cycle'}</span>
                    </div>

                    {/* The Adjustment (Right) */}
                    <div className={`relative flex flex-col items-center transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[153ms] ${step >= 4 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-20'}`}>
                        <div className="w-[260px] h-[260px] bg-gradient-to-b from-gray-200 to-gray-300 rounded-3xl shadow-lg flex flex-col items-center justify-center border-[6px] border-white mb-4">
                            <svg className="w-20 h-20 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-[22px] font-bold text-gray-600 text-center px-6 leading-tight">{lang === 'kr' ? '중국·미국 정책 변동' : 'US/China Policy Fluctuations'}</span>
                        </div>
                        <span className="text-[26px] font-black text-gray-600">{lang === 'kr' ? '구조적 조정기' : 'Structural Adjustment'}</span>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-emerald-600">▪</span><span>{lang === 'kr' ? <>2차전지(LG엔솔·삼성SDI·SK온)는 <strong>2020년 국내 IPO 붐</strong>을 만든 핵심 엔진임.</> : <>Secondary batteries (LG Energy Solution, Samsung SDI, SK On) were the core engines driving the <strong>2020 domestic IPO boom</strong>.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-emerald-600">▪</span><span>{lang === 'kr' ? <>K-배터리 3사는 합계 <strong>글로벌 EV 배터리 점유율 20% 내외</strong>를 안정적으로 확보함.</> : <>The Big 3 K-Battery makers stably secure a combined <strong>~20% global EV battery market share</strong>.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-emerald-600">▪</span><span>{lang === 'kr' ? <>다만 2024~2026년 사이 중국과 미국의 정책 변동 및 전기차 수요 둔화로 인해 <strong>사이클 조정기(숨고르기)</strong>에 진입함.</> : <>However, entered a <strong>cycle adjustment phase (breather)</strong> due to US-China policy shifts and EV demand slowdown between 2024-2026.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-emerald-600">▪</span><span>EV Batteries (LG, Samsung, SK) were the core engine driving the <strong>2020 domestic IPO boom</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-emerald-600">▪</span><span>The Korean Big 3 secured a combined <strong>global EV battery market share of around 20%</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-emerald-600">▪</span><span>However, entered a <strong>cycle adjustment period (breathing spell)</strong> from 2024-2026 due to US/China policy fluctuations.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
