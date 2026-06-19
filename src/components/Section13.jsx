import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section13({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden" style={{ background: 'linear-gradient(90deg, #e04c9a, #f45407)' }}>
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center text-white">
                <span className="inline-block text-[22px] md:text-[26px] font-normal mb-[14px]">
                    PART 2
                </span>
                <h2 className="text-[34px] md:text-[54px] lg:text-[66px] font-bold leading-[1.3] break-keep">
                    BID의 탄생 배경과 제도적 메커니즘
                </h2>
                <p className="text-[16px] md:text-[20px] font-medium opacity-80 mt-4 max-w-[800px] break-keep leading-relaxed">
                    {lang === 'kr' 
                        ? '무임승차를 극복하고 민간 주도의 공공 서비스를 실현한 법제화와 재정적 작동 구조' 
                        : 'Understanding the legislative frameworks and financial mechanisms of self-governing business improvement districts.'}
                </p>
                <div className="w-[120px] h-[3px] bg-white mt-[30px] opacity-80" />
            </div>
        </section>
    );
}
