import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section95({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918), // Left Before/After
            setTimeout(() => setStep(4), 1300), // Right Hub
            setTimeout(() => setStep(5), 1912)  // Bottom
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '공간 운영 플랫폼 진화의 핵심 매개' : 'Core Medium for Spatial Operating Platform Evolution'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-[40px] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>단순 자산운용사를 넘어, '공간 운영 플랫폼'으로의 진화</> : <>Beyond Asset Management, Evolution into a 'Spatial Operating Platform'</>}
                </h2>

                <div className="w-full max-w-[1100px] flex flex-col md:flex-row gap-6 mb-10 relative items-stretch">
                    
                    {/* Left: Evolution Arrow Concept */}
                    <div className={`flex-1 flex flex-col justify-between transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {/* PAST */}
                        <div className="bg-gray-100 rounded-2xl p-6 text-center border-2 border-gray-200 opacity-60">
                            <h3 className="text-gray-500 font-bold text-[18px] mb-1">{lang === 'kr' ? '과거 (Past)' : 'Past'}</h3>
                            <p className="text-gray-700 font-extrabold text-[22px]">{lang === 'kr' ? '단순 임대수익 중심의 자산운용' : 'Simple Rent-driven Asset Management'}</p>
                        </div>
                        
                        {/* Arrow Down */}
                        <div className="flex justify-center text-[#1e3a8a] my-[-10px] translate-y-[10px] relative z-10">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="bg-[#fdfdfd]">
                                <path d="M12 5v14M19 12l-7 7-7-7"/>
                            </svg>
                        </div>

                        {/* PRESENT/FUTURE */}
                        <div className="bg-[#1e3a8a] rounded-2xl p-8 flex-1 mt-[30px] flex flex-col justify-center text-center border-4 border-blue-900 shadow-xl relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 text-blue-800/40 text-[100px] font-black leading-none">OS</div>
                            <h3 className="text-blue-200 font-bold text-[18px] mb-2 relative z-10">{lang === 'kr' ? '현재 및 미래 (Factorial Builders)' : 'Present & Future (Factorial Builders)'}</h3>
                            <p className="text-white font-extrabold text-[26px] break-keep relative z-10">
                                {lang === 'kr' ? '기업 운영 인프라를 제공하는 공간 운영 플랫폼' : 'Spatial Operating Platform Providing Corporate Infrastructure'}
                            </p>
                        </div>
                    </div>

                    {/* Right: Core Enablers */}
                    <div className={`flex-[1.2] flex flex-col justify-between gap-5 transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        
                        {/* Tech-Ready Building */}
                        <div className="bg-white border-2 border-[#1e3a8a] rounded-2xl p-8 h-full shadow-sm flex items-start gap-5">
                            <div className="bg-blue-100 text-blue-600 rounded-xl w-14 h-14 flex items-center justify-center shrink-0">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                                    <rect x="9" y="9" width="6" height="6"></rect>
                                    <line x1="9" y1="1" x2="9" y2="4"></line>
                                    <line x1="15" y1="1" x2="15" y2="4"></line>
                                    <line x1="9" y1="20" x2="9" y2="23"></line>
                                    <line x1="15" y1="20" x2="15" y2="23"></line>
                                    <line x1="20" y1="9" x2="23" y2="9"></line>
                                    <line x1="20" y1="14" x2="23" y2="14"></line>
                                    <line x1="1" y1="9" x2="4" y2="9"></line>
                                    <line x1="1" y1="14" x2="4" y2="14"></line>
                                </svg>
                            </div>
                            <div className="text-left mt-1">
                                <div className="text-blue-600 font-bold text-[14px] mb-1">Tech-Ready Building</div>
                                <h4 className="text-[#1d1d1f] font-extrabold text-[22px] mb-3 break-keep">
                                    {lang === 'kr' ? '팩토리얼 성수 (로봇·IoT 친화)' : 'Factorial Seongsu (Robot & IoT Friendly)'}
                                </h4>
                                <p className="text-gray-600 font-medium text-[16px] leading-relaxed break-keep">
                                    {lang === 'kr' ? '삼성전자, 현대차그룹과의 공동개발을 통해 하드웨어와 소프트웨어가 결합된 미래형 빌딩 구현' : 'Co-developed with Samsung & Hyundai Motor Group to realize a future building combining hardware and software.'}
                                </p>
                            </div>
                        </div>

                        {/* AaaS Model */}
                        <div className="bg-white border-2 border-[#1e3a8a] rounded-2xl p-8 h-full shadow-sm flex items-start gap-5">
                            <div className="bg-blue-100 text-blue-600 rounded-xl w-14 h-14 flex items-center justify-center shrink-0">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                </svg>
                            </div>
                            <div className="text-left mt-1">
                                <div className="text-blue-600 font-bold text-[14px] mb-1">Business Model</div>
                                <h4 className="text-[#1d1d1f] font-extrabold text-[22px] mb-3 break-keep">
                                    {lang === 'kr' ? "'Asset as a Service' (AaaS) 모델" : "'Asset as a Service' (AaaS) Model"}
                                </h4>
                                <p className="text-gray-600 font-medium text-[16px] leading-relaxed break-keep">
                                    {lang === 'kr' ? '삼일PwC와의 협업을 통해 자산을 단순한 임대 공간이 아닌, 기업 성장을 돕는 핵심 운영 인프라 서비스로 재정의' : 'Redefining assets as core operational infrastructure services that aid corporate growth, via collaboration with Samil PwC.'}
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Bottom Thesis Text */}
                <div className={`w-full max-w-[1100px] bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[17px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed text-center">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? <>하드웨어(테크 레디)와 소프트웨어(AaaS)를 결합하여,<br/>부동산을 기업에게 '서비스'로서 제공하는 진정한 공간 운영 OS 플랫폼</> : <>A true spatial operations OS platform providing real estate as a 'service' to enterprises<br/>by combining hardware (Tech-Ready) and software (AaaS).</>)
                            : <>A true spatial operating OS platform that combines hardware (Tech-Ready) and software (AaaS)<br/>to provide real estate to corporations as a 'service'</>
                        }
                    </p>
                </div>

            </div>
        </section>
    );
}
