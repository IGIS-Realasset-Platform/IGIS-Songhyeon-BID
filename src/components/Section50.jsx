import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section50({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

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
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? 'AI 데이터센터' : 'AI Data Centers'}</span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '데이터센터 10GW 시대를 여는<br/>글로벌 하이퍼스케일러의 집결' : 'Opening the 10GW Era<br/>Gathering of Global Hyperscalers' }}>
                </h2>

                {/* Middle Infographic (3 Dry Boxes) */}
                <div className="relative w-full max-w-[1250px] mt-[40px] mb-[30px] h-auto flex flex-col md:flex-row items-stretch justify-center z-10 gap-6">
                    
                    {/* Base Box */}
                    <div className={`flex-1 bg-white border-[6px] border-gray-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <span className="text-[20px] font-bold text-gray-500 mb-4 uppercase">Base Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-gray-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-black leading-snug break-keep" dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '2030년 한국 IT 용량<br/>6.3GW (현재 3배)' : '2030 IT Capacity<br/>6.3GW (3x Current)' }}></p>
                    </div>

                    {/* Bull Box */}
                    <div className={`flex-1 bg-[#f8fbff] border-[6px] border-blue-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[153ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <span className="text-[20px] font-bold text-blue-500 mb-4 uppercase">Bull Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-blue-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-[#0055ff] leading-snug break-keep" dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '글로벌 허브 집중<br/>10GW+ 도달 가능' : 'Global Hub Focus<br/>Can reach 10GW+' }}></p>
                    </div>

                    {/* Bear Box */}
                    <div className={`flex-1 bg-[#fff8f8] border-[6px] border-red-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-400 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <span className="text-[20px] font-bold text-red-500 mb-4 uppercase">Bear Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-red-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-[#e11d48] leading-snug break-keep" dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '국가 이니셔티브<br/>지연 시 성장 둔화' : 'Growth Slows if<br/>National Init. Delayed' }}></p>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? 'Stock Farm Road(3GW), SK-AWS 확장, 삼성 2,300억 달러 등 거대 파이프라인 집중' : 'Massive pipelines like Stock Farm Road (3GW), SK-AWS, Samsung $230B'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '단일 산업으로 GDP 10% 기여 목표라는 정부의 명시적 정책 의지 반영' : 'Reflects explicit gov intent for 10% GDP contribution as a single industry'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '전력 수급 한계 극복 여부가 최상의 Bull 시나리오 달성을 위한 핵심 트리거' : 'Overcoming power constraints is the key trigger for the Bull scenario'}</span></li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
