import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section41({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) {
            setStep(20);
            return;
        }
        
        const t1 = setTimeout(() => setStep(1), 230); // Small text
        const t2 = setTimeout(() => setStep(2), 689); // Big text
        
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-black flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            
            <style>{`
                .gradient-text {
                    background: linear-gradient(90deg, #e04c9a, #f45407);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: -0.02em;
                }
            `}</style>

            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* Top Small Text */}
                <div className={`transition-all duration-[918ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-normal text-white mb-[14px] tracking-[-0.02em]" style={{ fontFamily: "'Sanomat Wp', 'Sanomat Web', 'Sanomat', sans-serif" }}>
                        Part 2.
                    </span>
                </div>

                {/* Main Flowing Text */}
                <h2 className={`text-[40px] md:text-[60px] lg:text-[72px] font-bold leading-[calc(1.3em-6px)] break-keep tracking-[-0.02em] transition-all duration-[918ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="gradient-text inline-grid grid-cols-[1fr_auto_1fr] gap-x-3 md:gap-x-4 lg:gap-x-5">
                        <span className="text-right">{lang === 'kr' ? '한국 GDP 2조' : 'Korea GDP $2T'}</span>
                        <span className="text-center">→</span>
                        <span className="text-left">{lang === 'kr' ? '3조 달러' : '$3T'}</span>
                        
                        <span className="text-right">2027</span>
                        <span className="text-center">→</span>
                        <span className="text-left">{lang === 'kr' ? '2040 시나리오' : '2040 Scenario'}</span>
                    </span>
                </h2>

            </div>
        </section>
    );
}
