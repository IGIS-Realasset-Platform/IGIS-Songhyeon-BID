import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section80({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918),
            setTimeout(() => setStep(4), 1300),
            setTimeout(() => setStep(5), 1683)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#f4f4f5] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            
            {/* Background Texture for Bear Vibe */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center relative z-10">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-gray-500 uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? 'Bear 시나리오: 짙은 디플레이션 그림자와 박스피' : 'Bear Scenario: Shadow of Deflation & Box-PI'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-14 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>일본식 박스피에 짓눌린 인구 절벽 늪에서의 자본 이탈 리스크</> : <>Capital Flight Risk in Demographic Cliff suppressed by Japan-style Box-PI</>}
                </h2>

                {/* Box-PI Graphic */}
                <div className="w-full max-w-[1000px] h-[210px] md:h-[240px] flex items-center justify-center relative mb-12 border-y-[8px] border-gray-300 bg-white shadow-inner">
                    
                    {/* The "Box" Label */}
                    <div className="absolute top-4 left-4 text-gray-400 font-black text-[24px] tracking-widest uppercase opacity-40">
                        Long-term Box Range
                    </div>

                    <div className="flex w-full h-full px-10 items-center justify-between">
                        
                        {/* 2030 */}
                        <div className={`flex flex-col items-center justify-center transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-y-0 grayscale-0' : 'opacity-0 translate-y-8 grayscale'}`}>
                            <div className="text-gray-500 font-bold text-[20px] mb-2">2030</div>
                            <div className="text-gray-800 font-black text-[32px] md:text-[42px] leading-none">4,500<br/><span className="text-gray-400 text-[24px]">~5,200</span></div>
                        </div>

                        <div className={`w-16 md:w-32 h-[2px] bg-gray-300 transition-all duration-[540ms] ${step >= 3 ? 'opacity-100 w-16 md:w-32' : 'opacity-0 w-0'}`}></div>

                        {/* 2035 (Boxed) */}
                        <div className={`flex flex-col items-center justify-center transition-all duration-[765ms] delay-[153ms] ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                            <div className="text-red-700 font-bold text-[20px] mb-2">2035</div>
                            <div className="border-[4px] border-red-700 bg-red-50 py-4 px-6 relative">
                                <div className="absolute -top-4 -right-4 bg-red-700 text-white text-[14px] font-black px-2 py-1 uppercase transform rotate-12">Trap</div>
                                <div className="text-red-900 font-black text-[36px] md:text-[46px] leading-none">4,500<br/><span className="text-red-600 text-[26px]">~6,000</span></div>
                            </div>
                        </div>

                        <div className={`w-16 md:w-32 h-[2px] bg-gray-300 transition-all duration-[540ms] ${step >= 4 ? 'opacity-100 w-16 md:w-32' : 'opacity-0 w-0'}`}></div>

                        {/* 2040 */}
                        <div className={`flex flex-col items-center justify-center transition-all duration-[765ms] delay-400 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="text-gray-500 font-bold text-[20px] mb-2">2040</div>
                            <div className="text-gray-800 font-black text-[32px] md:text-[42px] leading-none">5,500<br/><span className="text-gray-400 text-[24px]">~7,000</span></div>
                        </div>

                    </div>
                </div>

                {/* Bottom Thesis Text */}
                <div className={`max-w-[1100px] flex flex-col md:flex-row items-center gap-6 transition-all duration-[540ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-[#1d1d1f] text-white py-6 px-8 rounded-xl shadow-lg flex-1 text-left">
                        <div className="text-red-400 font-bold text-[18px] mb-2 uppercase">{lang === 'kr' ? '리스크 경고' : 'Risk Warning'}</div>
                        <p className="text-[18px] md:text-[20px] font-bold break-keep leading-snug">
                            {lang === 'kr' 
                                ? (lang === 'kr' ? '인구 충격과 지정학의 덫에 빠질 경우 KOSPI가 4천~6천 대 긴 박스권에 체류하며 밸류에이션 붕괴와 지독한 디플레 압력을 받을 리스크 경고' : 'Warning of risks where KOSPI stays in a long 4,000-6,000 box range, suffering valuation collapse and severe deflationary pressure if caught in demographic shocks and geopolitical traps.')
                                : 'Warns of the risk where KOSPI stagnates in a long 4,000~6,000 box range, suffering valuation collapse and severe deflationary pressure if trapped by demographic shock and geopolitics.'
                            }
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold text-[18px] border border-gray-300 whitespace-nowrap">{lang === 'kr' ? '일본식 디플레 압력' : 'Japan-style Deflation Pressure'}</span>
                        <span className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold text-[18px] border border-gray-300 whitespace-nowrap">{lang === 'kr' ? '인구 충격 동반' : 'Accompanied by Demographic Shock'}</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
