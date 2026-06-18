import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section49({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const t1 = setTimeout(() => setStep(1), 230);
        const t2 = setTimeout(() => setStep(2), 689);
        const t3 = setTimeout(() => setStep(3), 872);
        const t4 = setTimeout(() => setStep(4), 1102);
        const t5 = setTimeout(() => setStep(5), 1484);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* Theme */}
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? '2.1 AI 반도체 / HBM' : '2.1 AI Semiconductors / HBM'}</span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '모든 시나리오에서 메모리는 한국 경제의 단일 최대 변수로 잔존' : 'Memory remains the single largest variable for Korea\'s economy in all scenarios' }}>
                </h2>

                {/* Middle Infographic (3 Dry Boxes) */}
                <div className="relative w-full max-w-[1250px] mt-[40px] mb-[30px] h-auto flex flex-col md:flex-row items-stretch justify-center z-10 gap-6">
                    
                    {/* Base Box */}
                    <div className={`flex-1 bg-white border-[6px] border-gray-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <span className="text-[18px] md:text-[20px] font-bold text-gray-500 mb-4 uppercase">Base Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-gray-200 mb-6"></div>
                        <p className="text-[20px] md:text-[24px] lg:text-[28px] font-black text-black leading-snug break-keep text-center" dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '글로벌 점유율<br />70%+ 유지' : '70%+ Global<br />HBM Share' }}></p>
                    </div>

                    {/* Bull Box */}
                    <div className={`flex-1 bg-[#f8fbff] border-[6px] border-blue-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[153ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <span className="text-[18px] md:text-[20px] font-bold text-blue-500 mb-4 uppercase">Bull Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-blue-200 mb-6"></div>
                        <p className="text-[20px] md:text-[24px] lg:text-[28px] font-black text-[#0055ff] leading-snug break-keep text-center" dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '합산 영업이익<br />300~350조 원' : 'Combined OP<br />300~350T KRW' }}></p>
                    </div>

                    {/* Bear Box */}
                    <div className={`flex-1 bg-[#fff8f8] border-[6px] border-red-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-400 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <span className="text-[18px] md:text-[20px] font-bold text-red-500 mb-4 uppercase">Bear Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-red-200 mb-6"></div>
                        <p className="text-[20px] md:text-[24px] lg:text-[28px] font-black text-[#e11d48] leading-snug break-keep text-center" dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '점유율 50%대로<br />하락' : 'Share Drops to<br />50% Range' }}></p>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[18px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? 'Base 케이스에서도 한국이 HBM 글로벌 점유율 70%+ 유지' : 'Korea retains 70%+ global HBM share even in Base Case'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? 'Bull 시 SK하이닉스·삼성전자 합산 영업이익이 2026년 200조 원 → 2030년 300~350조 원 도달' : 'Bull: Combined OP reaches 200T KRW in 2026 → 300~350T KRW in 2030'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? 'Bear 시 마이크론·CXMT 추격으로 점유율 50%대로 하락' : 'Bear: Share drops to 50% range due to Micron & CXMT chase'}</span></li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
