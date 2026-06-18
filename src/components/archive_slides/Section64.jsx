import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section64({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918),
            setTimeout(() => setStep(4), 1300),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-black text-[#1d1d1f] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? 'Base 시나리오 임대료 전망' : 'Base Scenario Rent Outlook'}</span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>2040년 평당 34만 원을 돌파할<br/>신규 트로피 자산(IOTA·GBC)의 프라이싱</> : <>Pricing of New Trophy Assets (IOTA·GBC)<br/>Surpassing 340K KRW/py in 2040</>}
                </h2>

                {/* Custom Infographic: Rent Forecast Grid */}
                <div className="w-full max-w-[1100px] mt-[40px] mb-[40px] transition-all duration-[765ms] flex flex-col">
                    <div className="grid grid-cols-4 gap-4 w-full text-[16px] lg:text-[20px]">
                        {/* Headers */}
                        <div className="col-span-1 bg-transparent"></div>
                        <div className={`text-center font-black text-[22px] border-b-[4px] border-gray-400 text-gray-800 pb-2 transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{lang === 'kr' ? '2030년' : '2030'}</div>
                        <div className={`text-center font-black text-[22px] border-b-[4px] border-gray-400 text-gray-800 pb-2 transition-all duration-[765ms] delay-100 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{lang === 'kr' ? '2035년' : '2035'}</div>
                        <div className={`text-center font-black text-[24px] border-b-[4px] border-[#1d1d1f] pb-2 text-[#1d1d1f] transition-all duration-[765ms] delay-[153ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{lang === 'kr' ? '2040년' : '2040'}</div>
                        
                        {/* Row 1: CBD */}
                        <div className={`bg-gray-200 border-l-[6px] border-gray-500 p-4 font-black flex items-center justify-center text-center text-gray-900 transition-all duration-[540ms] delay-[230ms] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>{lang === 'kr' ? 'CBD 프라임 평균' : 'CBD Prime Avg'}</div>
                        <div className={`bg-gray-50 border-[2px] border-gray-300 p-4 flex items-center justify-center font-black transition-all duration-[540ms] delay-400 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>17~18<span className="font-bold text-gray-800 ml-1">{lang === 'kr' ? '만 원' : '0k KRW'}</span></div>
                        <div className={`bg-gray-50 border-[2px] border-gray-300 p-4 flex items-center justify-center font-black transition-all duration-[540ms] delay-[383ms] ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>21~23<span className="font-bold text-gray-800 ml-1">{lang === 'kr' ? '만 원' : '0k KRW'}</span></div>
                        <div className={`bg-gray-100 border-[3px] border-gray-400 p-4 flex items-center justify-center font-black text-gray-900 transition-all duration-[540ms] delay-600 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>25~28<span className="font-bold text-gray-800 ml-1">{lang === 'kr' ? '만 원' : '0k KRW'}</span></div>

                        {/* Row 2: GBD */}
                        <div className={`bg-blue-100 border-l-[6px] border-blue-600 p-4 font-black flex items-center justify-center text-center text-blue-900 mt-2 transition-all duration-[540ms] delay-400 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>{lang === 'kr' ? 'GBD 프라임 평균' : 'GBD Prime Avg'}</div>
                        <div className={`bg-blue-50 border-[2px] border-blue-200 p-4 flex items-center justify-center font-black mt-2 text-blue-900 transition-all duration-[540ms] delay-[383ms] ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>18~20<span className="font-bold text-blue-900 ml-1">{lang === 'kr' ? '만 원' : '0k KRW'}</span></div>
                        <div className={`bg-blue-50 border-[2px] border-blue-200 p-4 flex items-center justify-center font-black mt-2 text-blue-900 transition-all duration-[540ms] delay-600 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>24~27<span className="font-bold text-blue-900 ml-1">{lang === 'kr' ? '만 원' : '0k KRW'}</span></div>
                        <div className={`bg-blue-100 border-[3px] border-blue-400 p-4 flex items-center justify-center font-black text-[24px] text-blue-900 mt-2 transition-all duration-[540ms] delay-[540ms] ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>30~34<span className="text-[20px] font-bold text-blue-900 ml-1">{lang === 'kr' ? '만 원' : '0k KRW'}</span></div>

                        {/* Row 3: IOTA */}
                        <div className={`bg-[#1d1d1f] text-white p-4 font-black flex items-center justify-center text-center shadow-lg mt-2 transition-all duration-[540ms] delay-[383ms] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>{lang === 'kr' ? 'IOTA 서울 트로피 오피스' : 'IOTA Seoul Trophy Office'}</div>
                        <div className={`bg-white border-[4px] border-[#1d1d1f] p-4 flex flex-col items-center justify-center font-black mt-2 shadow-sm text-gray-900 transition-all duration-[540ms] delay-600 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>23~26<span className="font-bold text-gray-800">{lang === 'kr' ? '만 원' : '0k KRW'}</span></div>
                        <div className={`bg-white border-[4px] border-[#1d1d1f] p-4 flex flex-col items-center justify-center font-black mt-2 shadow-sm text-gray-900 transition-all duration-[540ms] delay-[540ms] ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>USD 130~160<span className="text-[14px] font-bold text-gray-800">/sqft/yr</span></div>
                        <div className={`bg-[#1d1d1f] text-white p-4 flex flex-col items-center justify-center font-black text-[22px] mt-2 shadow-lg transition-all duration-[540ms] delay-800 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>{lang === 'kr' ? '도쿄 수준의' : 'Tokyo Level'}<span className="text-[28px] text-yellow-400 leading-none mt-1">65~80%</span></div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-[#1d1d1f] break-keep text-center transition-all duration-[689ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? 'CBD 프라임은 2030년 약 17~18만 원에서 2040년 25~28만 원으로 상승 전망' : 'CBD Prime to rise from 170k-180k (2030) to 250k-280k KRW/py (2040)'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? 'GBD 프라임은 2030년 약 18~20만 원에서 2040년 30~34만 원까지 수직 상승 전망' : 'GBD Prime to surge vertically from 180k-200k (2030) to 300k-340k KRW/py (2040)'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span className="text-[#1d1d1f]">{lang === 'kr' ? 'IOTA 및 GBC 등 신규 트로피 자산은 도쿄 마루노우치(USD 200/sqft) 대비 65~80% 수준으로 수렴하며 압도적 프라이싱 형성' : 'New Trophies (IOTA/GBC) to converge at 65-80% of Tokyo Marunouchi, setting dominant pricing'}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
