import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section46({ isActive }) {
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
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#e11d48] uppercase tracking-[-0.02em] mb-[12px]">
                        {lang === 'kr' ? 'Bear Scenario (확률 20%)' : 'Bear Scenario (20% Prob)'}
                    </span>
                    <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em]">
                        {lang === 'kr' ? <>지정학적 갈등 및 구조적 모순<br/>심화에 따른<br/>일본식 "잃어버린 10년" 진입</> : <>Japan-style "Lost Decade"<br/>due to geopolitical & structural conflicts</>}
                    </h2>
                </div>

                {/* Right Side: Stats & Assumptions (Sharp Box, Large Text) */}
                <div className={`shrink-0 w-full max-w-[590px] bg-[#fff8f8] rounded-none px-8 py-7 md:py-[28px] md:px-12 border-[6px] border-red-400 transition-all duration-[765ms] ease-out ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="space-y-4">
                        <div>
                            <p className="text-red-500 text-[16px] md:text-[17px] font-bold mb-2 uppercase">{lang === 'kr' ? '2030년 예상 GDP' : '2030 Expected GDP'}</p>
                            <p className="text-[32px] md:text-[40px] font-bold text-[#e11d48] tracking-tight">{lang === 'kr' ? '2.0 ~ 2.1조 달러' : '$2.0 ~ 2.1T'}</p>
                        </div>
                        <div className="w-full h-px bg-red-100"></div>
                        <div>
                            <p className="text-red-500 text-[16px] md:text-[17px] font-bold mb-2 uppercase">{lang === 'kr' ? '3조 달러 도달 시점' : 'Time to $3T'}</p>
                            <p className="text-[32px] md:text-[40px] font-bold text-[#e11d48] tracking-tight">{lang === 'kr' ? '2042년 이후 (또는 미달)' : 'Post-2042 (Or Never)'}</p>
                        </div>
                        <div className="w-full h-px bg-red-100"></div>
                        <div>
                            <p className="text-red-500 text-[16px] md:text-[17px] font-bold mb-4 uppercase">{lang === 'kr' ? '핵심 전제' : 'Core Premises'}</p>
                            <ul className="text-gray-800 space-y-3 text-[19px] md:text-[21px] break-keep leading-normal font-bold">
                                <li className="flex items-start"><span className="text-red-400 mr-3">•</span><span>{lang === 'kr' ? '2024년 정점 이후 가파른 인구 감소 (인구 절벽)' : 'Steep Population Decline post-2024 Peak'}</span></li>
                                <li className="flex items-start"><span className="text-red-400 mr-3">•</span><span>{lang === 'kr' ? '미·중 디커플링 심화 및 중국 반도체 자급 가속화' : 'US-China Decoupling & China Semi Self-sufficiency'}</span></li>
                                <li className="flex items-start"><span className="text-red-400 mr-3">•</span><span>{lang === 'kr' ? '가계부채 누적 및 부동산 PF 부실 재발' : 'Household Debt & Real Estate PF Distress'}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
