import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section113({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

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
                        {lang === 'kr' ? '인수자 선정의 정치적 변수 (Political & Security Risks)' : 'Political Variables in Buyer Selection (Political & Security Risks)'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4 transition-all duration-[551ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>국가 중요 인프라(데이터센터·물류) 운용의 안보적 관점</> : <>Security Perspectives on Operating Critical Infrastructure</>}
                </h2>

                {/* Infographic Area */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* Left: High Risk */}
                    <div className={`flex-[1] bg-white border-[6px] border-red-800 rounded-none p-8 flex flex-col justify-between shadow-sm transition-all duration-[612ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-red-800 font-black text-[26px] md:text-[30px] mb-2 uppercase">
                                    High Political Risk
                                </div>
                                <div className="text-gray-700 font-bold text-[22px] mb-6">
                                    {lang === 'kr' ? '중국계 자본 (Hillhouse 등)' : 'Chinese Capital (e.g., Hillhouse)'}
                                </div>
                            </div>
                            <div className="flex-1 flex items-center mb-6">
                                <p className="text-[18px] text-gray-600 font-medium leading-relaxed">
                                    {lang === 'kr' ? '데이터센터, 물류 등 Critical Infrastructure 운용사라는 점에서 해외/중국계 자본의 인수는 상당한 정치 및 국가 안보 리스크 야기 가능성' : 'Given the nature of critical infrastructure like data centers and logistics, acquisition by foreign/Chinese capital presents high political and national security risks.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Stable */}
                    <div className={`flex-[1] bg-[#1e3a8a] border-[6px] border-[#1e3a8a] rounded-none p-8 flex flex-col justify-between shadow-md transition-all duration-[612ms] delay-[122ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[26px] md:text-[30px] mb-2 uppercase flex items-center">
                                    Politically Stable
                                    <svg className="w-6 h-6 md:w-8 md:h-8 ml-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[22px] mb-6">
                                    {lang === 'kr' ? '국내 산업자본 및 다국적 기관' : 'Domestic Industrial & Multi-national Institutions'}
                                </div>
                            </div>
                            <div className="flex-1 flex items-center mb-6">
                                <p className="text-[18px] text-blue-50 font-medium leading-relaxed">
                                    {lang === 'kr' ? '결과적으로 태광, 한화 등 국내 산업자본이나 GIC, Brookfield 등 다국적 Institutional 자본이 정치적으로 안정적인(Stable) 대안' : 'Consequently, domestic industrial capital like Taekwang and Hanwha, or multinational institutional capital like GIC and Brookfield, are politically stable alternatives.'}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`max-w-[1200px] mt-2 text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[551ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr' ? '이지스의 포트폴리오가 지닌 국가 안보적 중요성을 고려할 때, 인수자 선정의 핵심 변수로 작용할 전망' : 'Given the national security importance of IGIS\'s portfolio, this will act as a key variable in acquirer selection.'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
