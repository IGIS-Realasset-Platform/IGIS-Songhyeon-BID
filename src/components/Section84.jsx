import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section84({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),  // 2026 Box
            setTimeout(() => setStep(3), 1041), // Arrow
            setTimeout(() => setStep(4), 1576), // 2040 Box
            setTimeout(() => setStep(5), 2112)  // Bottom Text
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-white flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-blue-600 uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? 'Convergence Trade 2배 랠리의 명분' : 'Convergence Trade: Rationale for a 2x Rally'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-[54px] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>신규 트로피가 도쿄 수렴점인 USD 150 이상으로<br/>도달할 것이라는 강력한 세일즈 논리</> : <>Powerful Sales Logic: New Trophies Reaching Tokyo Convergence Point of USD 150+</>}
                </h2>

                {/* Convergence Flow Infographic */}
                <div className="w-full max-w-[1000px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-[54px] relative">
                    
                    {/* Current State (2026) */}
                    <div className={`flex flex-col items-center justify-center w-[280px] h-[200px] bg-gray-50 border-2 border-gray-200 rounded-2xl shadow-sm transition-all duration-[540ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                        <div className="text-gray-500 font-bold text-[18px] mb-2">{lang === 'kr' ? '2026 (현재)' : '2026 (Current)'}</div>
                        <div className="text-[#1d1d1f] font-black text-[36px] leading-none mb-1">USD 80<span className="text-[20px] text-gray-500">{lang === 'kr' ? '대' : 's'}</span></div>
                        <div className="text-blue-600 font-bold text-[16px] mt-2 bg-blue-50 px-3 py-1 rounded-full">
                            {lang === 'kr' ? '터무니없는 저평가 현실' : 'Ridiculously Undervalued'}
                        </div>
                    </div>

                    {/* The Convergence Arrow */}
                    <div className={`hidden md:flex flex-col items-center justify-center transition-all duration-[918ms] ease-out ${step >= 3 ? 'opacity-100 w-[200px]' : 'opacity-0 w-0'}`}>
                        <div className="text-blue-600 font-black text-[22px] italic mb-2 whitespace-nowrap">Convergence Trade</div>
                        <div className="w-full h-[6px] bg-gradient-to-r from-gray-300 to-blue-600 relative">
                            <div className="absolute right-[-4px] top-[-7px] border-solid border-l-blue-600 border-l-[14px] border-y-transparent border-y-[10px]"></div>
                        </div>
                        <div className="text-gray-500 font-bold text-[15px] mt-2 whitespace-nowrap">
                            {lang === 'kr' ? '향후 15년간 가격 수렴' : 'Price Convergence over 15 years'}
                        </div>
                    </div>
                    {/* Mobile Arrow */}
                    <div className={`md:hidden flex flex-col items-center justify-center my-4 transition-all duration-[540ms] ${step >= 3 ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                        <div className="text-blue-600 font-black text-[18px] italic mb-1">Convergence Trade</div>
                        <div className="w-[6px] h-[40px] bg-gradient-to-b from-gray-300 to-blue-600 relative">
                            <div className="absolute bottom-[-4px] left-[-7px] border-solid border-t-blue-600 border-t-[14px] border-x-transparent border-x-[10px]"></div>
                        </div>
                    </div>

                    {/* Future State (2040) */}
                    <div className={`flex flex-col items-center justify-center w-[320px] h-[240px] bg-[#1e3a8a] border-4 border-blue-200 rounded-2xl shadow-2xl relative transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                        <div className="text-blue-200 font-bold text-[20px] mb-2">{lang === 'kr' ? '2040 (Tokyo Marunouchi 수준)' : '2040 (Tokyo Marunouchi level)'}</div>
                        <div className="text-white font-black text-[42px] leading-none mb-1">USD 150<span className="text-[24px] text-blue-300">~180</span></div>
                    </div>

                </div>

                {/* Bottom Thesis Text */}
                <div className={`max-w-[1000px] bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[18px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? <>현재의 터무니없는 저평가가 역으로 IOTA를 글로벌 LP에게<br/>"향후 15년간 가격이 2배로 수렴 가능하다고 세일즈할 수 있는 단일 최강 Thesis"</> : <>Current absurd undervaluation paradoxically provides the single strongest thesis to sell IOTA to global LPs:<br/>"Prices can converge to double over the next 15 years."</>)
                            : <>This absurd undervaluation paradoxically acts as the single strongest thesis to sell IOTA to global LPs:<br/>"Prices have the potential to converge to 2x over the next 15 years."</>
                        }
                    </p>
                </div>

            </div>
        </section>
    );
}
