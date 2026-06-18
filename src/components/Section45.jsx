import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section45({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const t1 = setTimeout(() => setStep(1), 230);
        const t2 = setTimeout(() => setStep(2), 536);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-[70px] items-center justify-center">
                
                {/* Left Side: Theme & Title */}
                <div className={`shrink-0 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#0055ff] uppercase tracking-[-0.02em] mb-[12px]">
                        {lang === 'kr' ? 'Bull Scenario (확률 30%)' : 'Bull Scenario (30% Prob)'}
                    </span>
                    <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em]">
                        {lang === 'kr' ? <>고급제조 + 콘텐츠 + 금융<br/>"동아시아 스위스" 모델<br/>재포지셔닝</> : <>High-end Mfg + Content + Finance<br/>Repositioning to "East Asian Swiss" Model</>}
                    </h2>
                </div>

                {/* Right Side: Stats & Assumptions (Sharp Box, Large Text) */}
                <div className={`shrink-0 w-full max-w-[590px] bg-[#f8fbff] rounded-none px-8 py-7 md:py-[28px] md:px-12 border-[6px] border-blue-400 transition-all duration-[765ms] ease-out ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="space-y-4">
                        <div>
                            <p className="text-blue-500 text-[16px] md:text-[17px] font-bold mb-2 uppercase">{lang === 'kr' ? '2030년 예상 GDP' : '2030 Expected GDP'}</p>
                            <p className="text-[32px] md:text-[40px] font-bold text-[#0055ff] tracking-tight">{lang === 'kr' ? '2.5 ~ 2.7조 달러' : '$2.5 ~ 2.7T'}</p>
                        </div>
                        <div className="w-full h-px bg-blue-100"></div>
                        <div>
                            <p className="text-blue-500 text-[16px] md:text-[17px] font-bold mb-2 uppercase">{lang === 'kr' ? '3조 달러 도달 시점' : 'Time to $3T'}</p>
                            <p className="text-[32px] md:text-[40px] font-bold text-[#0055ff] tracking-tight">{lang === 'kr' ? '2034 ~ 2035년' : '2034 ~ 2035'}</p>
                        </div>
                        <div className="w-full h-px bg-blue-100"></div>
                        <div>
                            <p className="text-blue-500 text-[16px] md:text-[17px] font-bold mb-4 uppercase">{lang === 'kr' ? '핵심 전제' : 'Core Premises'}</p>
                            <ul className="text-gray-800 space-y-3 text-[19px] md:text-[21px] break-keep leading-normal font-bold">
                                <li className="flex items-start"><span className="text-blue-400 mr-3">•</span><span>{lang === 'kr' ? 'HBM/AI 인프라 패권 유지 및 대규모 외인 자본 유입' : 'HBM/AI Hegemony & Massive Foreign Capital Inflow'}</span></li>
                                <li className="flex items-start"><span className="text-blue-400 mr-3">•</span><span>{lang === 'kr' ? '환율 KRW/USD 1,000~1,150 (원화 강세)' : 'FX KRW/USD 1,000~1,150 (Strong KRW)'}</span></li>
                                <li className="flex items-start"><span className="text-blue-400 mr-3">•</span><span>{lang === 'kr' ? 'K-콘텐츠, K-방산, K-원전, K-조선 슈퍼사이클 진입' : 'K-Content, Defense, Nuclear, Ship Supercycle'}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
