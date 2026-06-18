import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section127({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const t1 = setTimeout(() => setStep(1), 184);
        const t2 = setTimeout(() => setStep(2), 551);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#1d1d1f] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <style>{`
                .gradient-text-p4c4 {
                    background: linear-gradient(90deg, #c1e2dd, #587d94);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                <div className={`transition-all duration-[734ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-normal text-white mb-[14px]" style={{ fontFamily: "'Sanomat Wp', 'Sanomat Web', 'Sanomat', sans-serif" }}>
                        Chapter 5.
                    </span>
                </div>
                <h2 className={`text-[34px] md:text-[54px] lg:text-[66px] font-bold leading-[calc(1.3em-6px)] break-keep transition-all duration-[734ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="gradient-text-p4c4">
                        {lang === 'kr' ? '리스크 분석' : 'Risk Analysis'}
                    </span>
                </h2>
            </div>
        </section>
    );
}
