import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section52({ isActive }) {
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
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? '바이오 융합 / 장수의학 / 세포·유전자치료' : 'Bio Convergence / Longevity / Cell & Gene Therapy'}</span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '매출 10조 시대를 여는 CDMO 역량이<br/>창출할 거대 부동산 실수요' : 'CDMO Capacity Opening 10T Era<br/>Creates Massive Real Estate Demand' }}>
                </h2>

                {/* Middle Infographic (3 Dry Boxes) */}
                <div className="relative w-full max-w-[1250px] mt-[40px] mb-[30px] h-auto flex flex-col md:flex-row items-stretch justify-center z-10 gap-6">
                    
                    {/* Base Box */}
                    <div className={`flex-1 bg-white border-[6px] border-gray-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <span className="text-[20px] font-bold text-gray-500 mb-4 uppercase">Base Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-gray-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-black leading-snug break-keep" dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '삼성바이오 2030년<br/>매출 10조 원+ 전망' : 'Samsung Bio 2030<br/>Revenue 10T+ Expected' }}></p>
                    </div>

                    {/* Bull Box */}
                    <div className={`flex-1 bg-[#f8fbff] border-[6px] border-blue-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[153ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <span className="text-[20px] font-bold text-blue-500 mb-4 uppercase">Bull Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-blue-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-[#0055ff] leading-snug break-keep" dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '글로벌 CDMO 시장<br/>두 자릿수 점유 조기 달성' : 'Global CDMO Market<br/>Early Double-Digit Share' }}></p>
                    </div>

                    {/* Bear Box */}
                    <div className={`flex-1 bg-[#fff8f8] border-[6px] border-red-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-400 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <span className="text-[20px] font-bold text-red-500 mb-4 uppercase">Bear Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-red-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-[#e11d48] leading-snug break-keep" dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '글로벌 규제 및<br/>경쟁 심화로 수익성 둔화' : 'Profitability Slows<br/>Due to Regulation & Comp' }}></p>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '삼성바이오로직스 등 핵심 기업 매출 컨센서스 상향 및 K-바이오 글로벌 확장 가속화' : 'Revenue consensus upgrades for key players like Samsung Bio and K-Bio global expansion'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '세포 및 유전자 치료 CDMO에서 글로벌 두 자릿수 점유율을 차지할 수 있는 잠재력' : 'Potential to capture double-digit global market share in Cell & Gene Therapy CDMO'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '매출 10조 시대를 여는 생산 역량이 창출할 거대한 연구시설 및 공장 부동산 실수요' : 'Massive real estate demand for R&D and factories created by 10T revenue capacity'}</span></li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
