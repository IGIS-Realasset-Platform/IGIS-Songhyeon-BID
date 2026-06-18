import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section87({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 857), // Blackstone
            setTimeout(() => setStep(4), 1010), // Brookfield
            setTimeout(() => setStep(5), 1163), // PGIM
            setTimeout(() => setStep(6), 1316), // Hines
            setTimeout(() => setStep(7), 1775), // IGIS
            setTimeout(() => setStep(8), 2234)  // Bottom Text
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '이지스의 현재 좌표와 글로벌 비교' : 'IGIS Current Position & Global Comparison'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-5 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>AUM 73조 원의 국내 1위, 그러나 글로벌 TOP 대비 9분의 1 수준</> : <>#1 in Korea with 73T KRW AUM, yet 1/9 of Global Top</>}
                </h2>

                {/* Horizontal Bar Chart */}
                <div className="w-full max-w-[1000px] flex flex-col gap-2 mb-10 relative">
                    
                    {/* Header Label */}
                    <div className={`text-right text-[14px] md:text-[16px] font-bold text-gray-400 mb-0 transition-all duration-[540ms] ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                        {lang === 'kr' ? '글로벌 부동산 운용사 AUM 현황 (억 USD)' : 'Global Real Estate AM AUM (100M USD)'}
                    </div>

                    {/* Chart Container */}
                    <div className="flex flex-col gap-3 border-l-[3px] border-gray-300 pl-4 pt-0 pb-2">
                        
                        {/* 1. Blackstone */}
                        <div className="flex items-center w-full">
                            <div className={`w-[140px] md:w-[160px] shrink-0 text-left text-[16px] md:text-[20px] font-bold text-gray-700 transition-all duration-[383ms] ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                                Blackstone RE
                            </div>
                            <div className="w-full flex items-center">
                                <div className={`h-[32px] md:h-[40px] bg-gray-200 rounded-r-md transition-all duration-[765ms] ease-out flex items-center justify-end pr-4 ${step >= 3 ? 'w-[100%]' : 'w-0'}`}>
                                    <span className={`font-black text-gray-600 text-[18px] md:text-[22px] ${step >= 3 ? 'opacity-100' : 'opacity-0'} transition-opacity delay-[383ms]`}>3,360</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Brookfield */}
                        <div className="flex items-center w-full">
                            <div className={`w-[140px] md:w-[160px] shrink-0 text-left text-[16px] md:text-[20px] font-bold text-gray-700 transition-all duration-[383ms] ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                                Brookfield RE
                            </div>
                            <div className="w-full flex items-center">
                                <div className={`h-[32px] md:h-[40px] bg-gray-200 rounded-r-md transition-all duration-[765ms] ease-out flex items-center justify-end pr-4 ${step >= 4 ? 'w-[82%]' : 'w-0'}`}>
                                    <span className={`font-black text-gray-600 text-[18px] md:text-[22px] ${step >= 4 ? 'opacity-100' : 'opacity-0'} transition-opacity delay-[383ms]`}>2,750</span>
                                </div>
                            </div>
                        </div>

                        {/* 3. PGIM */}
                        <div className="flex items-center w-full">
                            <div className={`w-[140px] md:w-[160px] shrink-0 text-left text-[16px] md:text-[20px] font-bold text-gray-700 transition-all duration-[383ms] ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                                PGIM RE
                            </div>
                            <div className="w-full flex items-center">
                                <div className={`h-[32px] md:h-[40px] bg-gray-200 rounded-r-md transition-all duration-[765ms] ease-out flex items-center justify-end pr-4 ${step >= 5 ? 'w-[62.5%]' : 'w-0'}`}>
                                    <span className={`font-black text-gray-600 text-[18px] md:text-[22px] ${step >= 5 ? 'opacity-100' : 'opacity-0'} transition-opacity delay-[383ms]`}>2,100</span>
                                </div>
                            </div>
                        </div>

                        {/* 4. Hines */}
                        <div className="flex items-center w-full">
                            <div className={`w-[140px] md:w-[160px] shrink-0 text-left text-[16px] md:text-[20px] font-bold text-gray-700 transition-all duration-[383ms] ${step >= 6 ? 'opacity-100' : 'opacity-0'}`}>
                                Hines
                            </div>
                            <div className="w-full flex items-center">
                                <div className={`h-[32px] md:h-[40px] bg-gray-200 rounded-r-md transition-all duration-[765ms] ease-out flex items-center justify-end pr-4 ${step >= 6 ? 'w-[28%]' : 'w-0'}`}>
                                    <span className={`font-black text-gray-600 text-[18px] md:text-[22px] ${step >= 6 ? 'opacity-100' : 'opacity-0'} transition-opacity delay-[383ms]`}>950</span>
                                </div>
                            </div>
                        </div>

                        {/* 5. IGIS (Highlight) */}
                        <div className="flex items-center w-full mt-2">
                            <div className={`w-[140px] md:w-[160px] shrink-0 text-left text-[18px] md:text-[22px] font-black text-[#1e3a8a] transition-all duration-[383ms] ${step >= 7 ? 'opacity-100' : 'opacity-0'}`}>
                                IGIS
                            </div>
                            <div className="w-full flex items-center relative">
                                <div className={`h-[40px] md:h-[50px] bg-gradient-to-r from-blue-600 to-[#1e3a8a] rounded-r-md shadow-lg transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-end pr-4 relative z-10 ${step >= 7 ? 'w-[16%]' : 'w-0'}`}>
                                    <span className={`font-black text-white text-[20px] md:text-[26px] ${step >= 7 ? 'opacity-100' : 'opacity-0'} transition-opacity delay-[383ms]`}>530</span>
                                </div>
                                <div className={`absolute top-0 left-0 w-[100%] h-full flex items-center pl-[18%] transition-opacity duration-[765ms] delay-[918ms] ${step >= 7 ? 'opacity-100' : 'opacity-0'}`}>
                                    <span className="bg-[#1e3a8a]/10 text-[#1e3a8a] font-bold text-[14px] md:text-[16px] px-3 py-1 rounded-full whitespace-nowrap">
                                        {lang === 'kr' ? 'Blackstone의 약 1/9 수준' : 'Only 1/9 of Blackstone'}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Thesis Text */}
                <div className={`max-w-[1000px] bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[18px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? '국내 부동산 펀드·리츠 1위를 넘어 글로벌 무대에서의 객관적 위치 인식' : 'Recognizing our objective position on the global stage, beyond being #1 in domestic real estate funds/REITs.')
                            : 'Moving beyond #1 in domestic RE funds/REITs to objectively recognize our position on the global stage.'
                        }
                    </p>
                </div>

            </div>
        </section>
    );
}
