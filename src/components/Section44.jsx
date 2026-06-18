import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section44({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

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
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px]">
                        {lang === 'kr' ? 'Base Scenario (확률 50%)' : 'Base Scenario (50% Prob)'}
                    </span>
                    <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em]">
                        {lang === 'kr' ? <>IMF·OECD·KDI<br/>공통 컨센서스 기반<br/>표준 성장 궤도 진입</> : <>Standard Growth Trajectory<br/>based on IMF/OECD/KDI Consensus</>}
                    </h2>
                </div>

                {/* Right Side: Stats & Assumptions (Sharp Box, Large Text) */}
                <div className={`shrink-0 w-full max-w-[590px] bg-gray-50 rounded-none px-8 py-7 md:py-[28px] md:px-12 border-[6px] border-gray-400 transition-all duration-[765ms] ease-out ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-400 text-[16px] md:text-[17px] font-bold mb-2 uppercase">{lang === 'kr' ? '2030년 예상 GDP' : '2030 Expected GDP'}</p>
                            <p className="text-[32px] md:text-[40px] font-bold text-black tracking-tight">{lang === 'kr' ? '2.2 ~ 2.4조 달러' : '$2.2 ~ 2.4T'}</p>
                        </div>
                        <div className="w-full h-px bg-gray-200"></div>
                        <div>
                            <p className="text-gray-400 text-[16px] md:text-[17px] font-bold mb-2 uppercase">{lang === 'kr' ? '3조 달러 도달 시점' : 'Time to $3T'}</p>
                            <p className="text-[32px] md:text-[40px] font-bold text-black tracking-tight">{lang === 'kr' ? '2037 ~ 2038년' : '2037 ~ 2038'}</p>
                        </div>
                        <div className="w-full h-px bg-gray-200"></div>
                        <div>
                            <p className="text-gray-400 text-[16px] md:text-[17px] font-bold mb-4 uppercase">{lang === 'kr' ? '핵심 전제' : 'Core Premises'}</p>
                            <ul className="text-gray-800 space-y-3 text-[19px] md:text-[21px] break-keep leading-normal font-bold">
                                <li className="flex items-start"><span className="text-gray-400 mr-3">•</span><span>{lang === 'kr' ? '실질성장률 연 1.5~2.0%, 인플레 2~3% 유지' : 'Real Growth 1.5~2.0%, Inflation 2~3%'}</span></li>
                                <li className="flex items-start"><span className="text-gray-400 mr-3">•</span><span>{lang === 'kr' ? '환율 KRW/USD 1,200~1,300 박스권' : 'FX KRW/USD 1,200~1,300 Range'}</span></li>
                                <li className="flex items-start"><span className="text-gray-400 mr-3">•</span><span>{lang === 'kr' ? 'AI 생산성 향상(0.3~0.5%p 상향)으로 인구 감소 상쇄' : 'AI Productivity Gain (+0.3~0.5%p) Offsets Pop Decline'}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
