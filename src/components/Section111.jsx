import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section111({ isActive }) {
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
                        {lang === 'kr' ? '지배구조 전환 (Ownership Transition)' : 'Ownership Transition'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4 transition-all duration-[551ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>가족 운영에서 기관 소유로의 중대한 분기점</> : <>Major Turning Point: From Family to Institutional Ownership</>}
                </h2>

                {/* Infographic Area */}
                <div className="w-full max-w-[1100px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-stretch relative">
                    
                    {/* Left: Family Ownership */}
                    <div className={`flex-[1] bg-gray-50 border-4 border-gray-300 rounded-none p-8 flex flex-col justify-center items-center shadow-sm transition-all duration-[612ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-[#1d1d1f] font-black text-[24px] md:text-[28px] mb-4 uppercase">
                            Family Ownership
                        </div>
                        <div className="text-gray-600 font-bold text-[18px] md:text-[20px] break-keep text-center">
                            {lang === 'kr' ? <>창업자 김대영 회장 사후 상속 지분(12.4%) 등<br/>가족 중심 운영</> : <>Founder legacy & family-centric operation<br/>(12.4% inherited stake)</>}
                        </div>
                    </div>

                    {/* Center Arrow */}
                    <div className={`hidden md:flex flex-col justify-center items-center -mx-[10px] z-10 transition-all duration-[612ms] delay-[122ms] ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <svg className="w-16 h-16 text-[#1e3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>

                    {/* Right: Institutional Ownership */}
                    <div className={`flex-[1] bg-[#1e3a8a] border-4 border-[#1e3a8a] rounded-none p-8 flex flex-col justify-center items-center shadow-md transition-all duration-[612ms] delay-[122ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-white font-black text-[24px] md:text-[28px] mb-4 uppercase">
                            Institutional Ownership
                        </div>
                        <div className="text-[#93c5fd] font-bold text-[18px] md:text-[20px] break-keep text-center">
                            {lang === 'kr' ? <>태광그룹, 다이신, 한화 등 본입찰 참여를 통한<br/>기관 소유 체제 확립</> : <>Establishment of institutional structure<br/>via Taekwang, Hanwha bids</>}
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`max-w-[1000px] mt-2 text-[16px] md:text-[20px] leading-[1.5] font-bold text-[#1e3a8a] bg-blue-50 border border-blue-100 p-6 rounded-none break-keep text-center transition-all duration-[551ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '기업가치 약 8,000억 원 베이스. 단순 M&A 이벤트가 아닌 이지스 브랜드의 넥스트 스텝 도약.' : 'Enterprise value ~KRW 800B. Not just M&A, but the next evolution of IGIS brand.'}
                </div>

            </div>
        </section>
    );
}
