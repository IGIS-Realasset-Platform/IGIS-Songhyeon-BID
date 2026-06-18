import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section74({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 979)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? 'GBD의 신규 절대 좌표' : 'New Absolute Coordinates of GBD'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>IOTA 서울 & 현대차 GBC 파이프라인</> : <>IOTA Seoul & Hyundai GBC Pipeline</>}
                </h2>

                {/* 2-Pillar Layout */}
                <div className="flex flex-col md:flex-row w-full max-w-[1200px] mt-[50px] mb-[40px] gap-6 lg:gap-10">
                    
                    {/* Left Pillar: IOTA */}
                    <div className={`flex-1 bg-white border-t-[8px] border-[#1d1d1f] shadow-xl p-10 flex flex-col items-center text-center transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-[32px]">🏛️</span>
                        </div>
                        <h3 className="text-[28px] font-black text-[#1d1d1f] mb-2">{lang === 'kr' ? 'IOTA 서울' : 'IOTA Seoul'}</h3>
                        <div className="text-[18px] font-bold text-gray-500 mb-6">{lang === 'kr' ? '(2032 준공예정)' : '(Est. Completion: 2032)'}</div>
                        
                        <div className="w-full h-[1px] bg-gray-200 mb-6"></div>
                        
                        <p className="text-[20px] font-bold text-gray-700 break-keep leading-snug px-4">
                            {lang === 'kr' ? '본 보고서의 핵심 대상이자, 트로피 자산의 새로운 기준점' : 'The core subject of this report, establishing a new benchmark for Trophy Assets'}
                        </p>
                    </div>

                    {/* Right Pillar: GBC */}
                    <div className={`flex-1 bg-white border-t-[8px] border-blue-600 shadow-xl p-10 flex flex-col items-center text-center transition-all duration-[765ms] delay-[153ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <span className="text-[32px]">🏗️</span>
                        </div>
                        <h3 className="text-[28px] font-black text-[#1d1d1f] mb-2">{lang === 'kr' ? '현대차 GBC' : 'Hyundai GBC'}</h3>
                        <div className="text-[18px] font-bold text-gray-500 mb-6">{lang === 'kr' ? '(삼성동, 2029~2030 준공 예정)' : '(Samsung-dong, Est. Completion: 2029~2030)'}</div>
                        
                        <div className="w-full h-[1px] bg-gray-200 mb-6"></div>
                        
                        <ul className="text-left space-y-3 px-4">
                            <li className="flex items-start">
                                <span className="mr-3 text-blue-600">▪</span>
                                <span className="text-[18px] font-bold text-gray-700 break-keep">{lang === 'kr' ? '3개 54층 타워로 전면 재설계 확정' : 'Redesigned as three 54-story towers'}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-blue-600">▪</span>
                                <span className="text-[18px] font-bold text-gray-700 break-keep">{lang === 'kr' ? '총사업비 약 4조 원 달하는 초대형 메가 프로젝트' : 'Mega project with approx. 4T KRW total cost'}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-blue-600">▪</span>
                                <span className="text-[18px] font-bold text-gray-700 break-keep">{lang === 'kr' ? '현대차 자체 사용 및 일부 프라임 오피스 임대 병행' : 'Hyundai internal use + partial prime office lease'}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
