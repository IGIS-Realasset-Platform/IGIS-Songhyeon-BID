import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section83({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 857), // HK
            setTimeout(() => setStep(4), 1010), // London
            setTimeout(() => setStep(5), 1163), // Tokyo
            setTimeout(() => setStep(6), 1316), // NY
            setTimeout(() => setStep(7), 1469), // SG
            setTimeout(() => setStep(8), 1775), // Seoul
            setTimeout(() => setStep(9), 2234)  // Bottom Text
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '여전히 싼 서울 프라임 오피스' : 'Seoul Prime Office Still Cheap'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-5 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>서울은 글로벌 1선 도시 중 가장 낮은 프라임 임대료를 유지 중</> : <>Seoul Maintains Lowest Prime Rent Among Tier 1 Global Cities</>}
                </h2>

                {/* Horizontal Bar Chart */}
                <div className="w-full max-w-[1000px] flex flex-col gap-2 mb-10 relative">
                    
                    {/* Header Label */}
                    <div className={`text-right text-[14px] md:text-[16px] font-bold text-gray-400 mb-0 transition-all duration-[540ms] ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                        {lang === 'kr' ? '2026년 5월 기준 프라임 오피스 임대료 (USD/sqft/yr, 점유 비용 기준)' : 'Prime Office Rent as of May 2026 (USD/sqft/yr, Occupancy Cost Basis)'}
                    </div>

                    {/* Chart Container */}
                    <div className="flex flex-col gap-3 border-l-[3px] border-gray-300 pl-4 pt-0 pb-2">
                        
                        {/* 1. Hong Kong */}
                        <div className="flex items-center w-full">
                            <div className={`w-[20%] text-left text-[16px] md:text-[20px] font-bold text-gray-700 transition-all duration-[383ms] ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                                {lang === 'kr' ? '홍콩 센트럴' : 'Hong Kong Central'}
                            </div>
                            <div className="w-[80%] flex items-center">
                                <div className={`h-[32px] md:h-[40px] bg-gray-200 rounded-r-md transition-all duration-[765ms] ease-out flex items-center justify-end pr-4 ${step >= 3 ? 'w-[100%]' : 'w-0'}`}>
                                    <span className={`font-black text-gray-600 text-[18px] md:text-[22px] ${step >= 3 ? 'opacity-100' : 'opacity-0'} transition-opacity delay-[383ms]`}>250~280</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. London */}
                        <div className="flex items-center w-full">
                            <div className={`w-[20%] text-left text-[16px] md:text-[20px] font-bold text-gray-700 transition-all duration-[383ms] ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                                {lang === 'kr' ? '런던 웨스트엔드' : 'London West End'}
                            </div>
                            <div className="w-[80%] flex items-center">
                                <div className={`h-[32px] md:h-[40px] bg-gray-200 rounded-r-md transition-all duration-[765ms] ease-out flex items-center justify-end pr-4 ${step >= 4 ? 'w-[78%]' : 'w-0'}`}>
                                    <span className={`font-black text-gray-600 text-[18px] md:text-[22px] ${step >= 4 ? 'opacity-100' : 'opacity-0'} transition-opacity delay-[383ms]`}>200~220</span>
                                </div>
                            </div>
                        </div>

                        {/* 3. Tokyo */}
                        <div className="flex items-center w-full">
                            <div className={`w-[20%] text-left text-[16px] md:text-[20px] font-bold text-gray-700 transition-all duration-[383ms] ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                                {lang === 'kr' ? '도쿄 마루노우치' : 'Tokyo Marunouchi'}
                            </div>
                            <div className="w-[80%] flex items-center">
                                <div className={`h-[32px] md:h-[40px] bg-gray-200 rounded-r-md transition-all duration-[765ms] ease-out flex items-center justify-end pr-4 ${step >= 5 ? 'w-[75%]' : 'w-0'}`}>
                                    <span className={`font-black text-gray-600 text-[18px] md:text-[22px] ${step >= 5 ? 'opacity-100' : 'opacity-0'} transition-opacity delay-[383ms]`}>190~210</span>
                                </div>
                            </div>
                        </div>

                        {/* 4. New York */}
                        <div className="flex items-center w-full">
                            <div className={`w-[20%] text-left text-[16px] md:text-[20px] font-bold text-gray-700 transition-all duration-[383ms] ${step >= 6 ? 'opacity-100' : 'opacity-0'}`}>
                                {lang === 'kr' ? '뉴욕 미드타운' : 'NY Midtown'}
                            </div>
                            <div className="w-[80%] flex items-center">
                                <div className={`h-[32px] md:h-[40px] bg-gray-200 rounded-r-md transition-all duration-[765ms] ease-out flex items-center justify-end pr-4 ${step >= 6 ? 'w-[71%]' : 'w-0'}`}>
                                    <span className={`font-black text-gray-600 text-[18px] md:text-[22px] ${step >= 6 ? 'opacity-100' : 'opacity-0'} transition-opacity delay-[383ms]`}>180~200</span>
                                </div>
                            </div>
                        </div>

                        {/* 5. Singapore */}
                        <div className="flex items-center w-full">
                            <div className={`w-[20%] text-left text-[16px] md:text-[20px] font-bold text-gray-700 transition-all duration-[383ms] ${step >= 7 ? 'opacity-100' : 'opacity-0'}`}>
                                {lang === 'kr' ? '싱가포르 라플즈' : 'Singapore Raffles'}
                            </div>
                            <div className="w-[80%] flex items-center">
                                <div className={`h-[32px] md:h-[40px] bg-gray-200 rounded-r-md transition-all duration-[765ms] ease-out flex items-center justify-end pr-4 ${step >= 7 ? 'w-[53%]' : 'w-0'}`}>
                                    <span className={`font-black text-gray-600 text-[18px] md:text-[22px] ${step >= 7 ? 'opacity-100' : 'opacity-0'} transition-opacity delay-[383ms]`}>130~150</span>
                                </div>
                            </div>
                        </div>

                        {/* 6. Seoul GBD (Highlight) */}
                        <div className="flex items-center w-full mt-2">
                            <div className={`w-[20%] text-left text-[18px] md:text-[22px] font-black text-[#1e3a8a] transition-all duration-[383ms] ${step >= 8 ? 'opacity-100' : 'opacity-0'}`}>
                                {lang === 'kr' ? '서울 GBD 프라임' : 'Seoul GBD Prime'}
                            </div>
                            <div className="w-[80%] flex items-center relative">
                                <div className={`h-[40px] md:h-[50px] bg-gradient-to-r from-blue-600 to-[#1e3a8a] rounded-r-md shadow-lg transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-end pr-4 relative z-10 ${step >= 8 ? 'w-[32%]' : 'w-0'}`}>
                                    <span className={`font-black text-white text-[20px] md:text-[26px] ${step >= 8 ? 'opacity-100' : 'opacity-0'} transition-opacity delay-[383ms]`}>80~90</span>
                                </div>
                                <div className={`absolute top-0 left-0 w-[100%] h-full flex items-center pl-[34%] transition-opacity duration-[765ms] delay-[918ms] ${step >= 8 ? 'opacity-100' : 'opacity-0'}`}>
                                    <span className="bg-[#1e3a8a]/10 text-[#1e3a8a] font-bold text-[14px] md:text-[16px] px-3 py-1 rounded-full whitespace-nowrap">
                                        {lang === 'kr' ? '홍콩 센트럴의 1/3 수준' : 'Only 1/3 of Hong Kong Central'}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Thesis Text */}
                <div className={`max-w-[1000px] bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 9 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[18px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? '싱가포르보다 낮고 홍콩 센트럴 대비 3분의 1 수준의 서울 프라임 임대료' : 'Seoul prime rents lower than Singapore and at 1/3 the level of Hong Kong Central.')
                            : 'Seoul Prime rent, lower than Singapore and only one-third of Hong Kong Central.'
                        }
                    </p>
                </div>

            </div>
        </section>
    );
}
