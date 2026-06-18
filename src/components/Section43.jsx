import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section43({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const t1 = setTimeout(() => setStep(1), 230);
        const t2 = setTimeout(() => setStep(2), 536);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [isActive]);

    const variables = [
        { title: lang === "kr" ? "인구" : "Population", sub: "Population" },
        { title: lang === "kr" ? "생산성" : "Productivity", sub: "Productivity" },
        { title: lang === "kr" ? "지정학" : "Geopolitics", sub: "Geopolitics" },
        { title: lang === "kr" ? "기술 패권" : "Tech Hegemony", sub: "Tech Hegemony" }
    ];

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden relative">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px]">
                        {lang === 'kr' ? '시나리오 핵심 변수' : 'Core Scenario Variables'}
                    </span>
                </div>
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-16 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '한국 GDP 3조 달러 달성을 좌우하는 4대 프레임' : '4 Core Frameworks determining Korea\'s $3T GDP'}
                </h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1200px]">
                    {variables.map((item, idx) => (
                        <div key={idx} className={`bg-gray-50 rounded-none p-10 border-[6px] border-[#1e3a8a] flex flex-col items-center text-center transition-all duration-[765ms] ease-out ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                            <div className="w-12 h-12 bg-[#1d1d1f] flex items-center justify-center text-white font-bold mb-6 text-[18px]">
                                {idx + 1}
                            </div>
                            <h4 className="text-[22px] md:text-[26px] font-bold text-black mb-2">{item.title}</h4>
                            <p className="text-gray-400 text-[14px] md:text-[16px] font-bold uppercase tracking-wider">{item.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
