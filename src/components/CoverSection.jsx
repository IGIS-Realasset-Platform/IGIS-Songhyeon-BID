import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function CoverSection({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            return;
        }
        const t1 = setTimeout(() => setStep(1), 200);
        const t2 = setTimeout(() => setStep(2), 700);
        const t3 = setTimeout(() => setStep(3), 1200);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#070a13] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Delicate tech grid overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center relative z-10 text-white">
                {/* Top Label */}
                <div className={`transition-all duration-[800ms] ease-out ${step >= 1 ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className="text-[14px] md:text-[16px] font-bold tracking-[0.2em] text-blue-400 uppercase">
                        {lang === 'kr' ? '이지스자산운용 전략 기획안' : 'IGIS ASSET MANAGEMENT STRATEGY DRAFT'}
                    </span>
                </div>

                {/* Title */}
                <h1 className="mt-8 flex flex-col items-center">
                    <span 
                        className={`text-[32px] md:text-[62px] lg:text-[72px] font-black leading-none tracking-[-0.03em] bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400 transition-all duration-[1000ms] ease-out ${step >= 1 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-[8px]'}`}
                        style={{ fontFamily: "'Inter', 'Apple SD Gothic Neo', sans-serif" }}
                    >
                        {lang === 'kr' ? 'IOTA SEOUL의 BID 적용과' : 'Application of BID to IOTA SEOUL'}
                    </span>
                    <span 
                        className={`mt-4 text-[32px] md:text-[62px] lg:text-[72px] font-black leading-none tracking-[-0.03em] bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400 transition-all duration-[1000ms] ease-out delay-[300ms] ${step >= 2 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-[8px]'}`}
                        style={{ fontFamily: "'Inter', 'Apple SD Gothic Neo', sans-serif" }}
                    >
                        {lang === 'kr' ? 'SBD 전략 마스터플랜' : '& SBD Strategic Master Plan'}
                    </span>
                </h1>

                {/* Subtle Divider line */}
                <div className={`h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mt-12 mb-8 transition-all duration-[1000ms] ease-out ${step >= 3 ? 'w-[200px] opacity-100' : 'w-0 opacity-0'}`} />

                {/* Footer Meta */}
                <div className={`flex flex-col md:flex-row items-center gap-4 text-[12px] md:text-[14px] font-medium text-gray-500 transition-all duration-[800ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span>{lang === 'kr' ? '기획추진센터' : 'Planning & Promotion Center'}</span>
                    <span className="hidden md:inline text-gray-700">|</span>
                    <span>2026. 06</span>
                </div>
            </div>
        </section>
    );
}
