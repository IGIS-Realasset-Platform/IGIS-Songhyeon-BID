import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section112({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 184),
            setTimeout(() => setStep(2), 490),
            setTimeout(() => setStep(3), 686), // Left Box
            setTimeout(() => setStep(4), 930), // Right Box
            setTimeout(() => setStep(5), 1297), // Bottom Text
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[551ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        {lang === 'kr' ? '핵심 리스크 및 대응 (Retention & Dual-Management)' : 'Core Risks & Responses (Retention & Dual-Management)'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4 transition-all duration-[551ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>운용사의 핵심 자본인 '인력'과 '트랙레코드' 보호</> : <>Protecting Core Capital: 'Talent' & 'Track Record'</>}
                </h2>

                {/* Infographic Area */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* Left: Opportunity */}
                    <div className={`flex-[1] bg-white border-[6px] border-[#1e3a8a] rounded-none p-8 flex flex-col justify-between shadow-sm transition-all duration-[612ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#1e3a8a] font-black text-[26px] md:text-[30px] mb-2 uppercase">
                                    Opportunity
                                </div>
                                <div className="text-gray-700 font-bold text-[22px] mb-6">
                                    {lang === 'kr' ? '글로벌 LP 신뢰 확장' : 'Expanding Global LP Trust'}
                                </div>
                            </div>
                            <div className="flex-1 flex items-center mb-6">
                                <p className="text-[18px] text-gray-600 font-medium leading-relaxed">
                                    {lang === 'kr' ? 'Institutional Ownership으로의 전환은 글로벌 투자자들에게 투명하고 깨끗한 거버넌스 시그널로 작용' : 'Transition to Institutional Ownership acts as a clear signal of transparent governance for global investors.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Risk */}
                    <div className={`flex-[1] bg-white border-[6px] border-[#1d1d1f] rounded-none p-8 flex flex-col justify-between shadow-md transition-all duration-[612ms] delay-[122ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#1d1d1f] font-black text-[26px] md:text-[30px] mb-2 uppercase">
                                    Core Risk
                                </div>
                                <div className="text-red-700 font-bold text-[22px] mb-6">
                                    {lang === 'kr' ? '핵심 인재 이탈 리스크' : 'Key Talent Retention Risk'}
                                </div>
                            </div>
                            <div className="flex-1 flex items-center mb-6">
                                <p className="text-[18px] text-gray-600 font-medium leading-relaxed">
                                    {lang === 'kr' ? '자산운용사의 핵심 자본은 인력. 신규 대주주의 운용 자율성 보장과 강력한 인재 Retention 설계가 향후 5년 브랜드 가치를 결정' : 'An asset manager\'s value is its people. Guaranteeing operational autonomy and robust retention design will dictate brand value for the next 5 years.'}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`max-w-[1200px] mt-2 text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[551ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1d1d1f]">▪</span>
                            <span>{lang === 'kr' ? '인재 보호를 위한 Dual-Management 구조 확보가 필수적' : 'Securing a Dual-Management structure for talent retention is essential.'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
