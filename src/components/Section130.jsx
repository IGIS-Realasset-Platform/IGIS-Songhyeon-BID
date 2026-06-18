import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section130({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 184),
            setTimeout(() => setStep(2), 551),
            setTimeout(() => setStep(3), 918)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-white flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-center items-center h-full">
                
                {/* Header */}
                <div className="w-full flex flex-col items-center text-center mb-[36px]">
                    <div className={`transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                            {lang === 'kr' ? '글로벌 자본 및 거버넌스' : 'Global Capital & Governance'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '외국인 자본 참여 및 지배구조 매각 리스크' : 'Foreign Capital & Governance Sale Risks'}
                    </h2>
                </div>

                {/* Content: 2 Cards (1x2 grid) */}
                <div className={`w-full max-w-[1200px] mx-auto mt-[10px] mb-[36px] grid grid-cols-1 md:grid-cols-2 gap-[20px] transition-all duration-[612ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Card 1 */}
                    <div className="bg-white border-[6px] border-[#1d1d1f] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[6px]">RISK 6</div>
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '외국인 자본 참여' : 'Foreign Capital Participation'}
                        </div>
                        <ul className="text-[18px] text-gray-600 font-medium leading-relaxed space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#1d1d1f] mr-2">▪</span>
                                <span>{lang === 'kr' ? 'IPR Equity에 글로벌 LP가 명시적으로 들어와야 Trophy 의미가 완성됨.' : 'Trophy significance is complete only with explicit participation of global LPs in IPR Equity.'}</span>
                            </li>
                            <li className="flex flex-col bg-gray-50 p-4 rounded-lg mt-2 border border-gray-200">
                                <span className="font-bold text-[#1d1d1f] mb-1">{lang === 'kr' ? '전략적 마일스톤 (Strategic Milestone)' : 'Strategic Milestone'}</span>
                                <span className="text-[17px] text-gray-800 font-bold">{lang === 'kr' ? '2026년 12월 클로징 시점까지 최소 1~2개 글로벌 SWF/연기금 LP 확보' : 'Secure at least 1-2 global SWF/Pension LPs by closing in Dec 2026.'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border-[6px] border-[#1d1d1f] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[6px]">RISK 7</div>
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '거버넌스 리스크' : 'Governance Risks'}
                        </div>
                        <ul className="text-[18px] text-gray-600 font-medium leading-relaxed space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#1d1d1f] mr-2">▪</span>
                                <span>{lang === 'kr' ? '이지스 지배지분 매각 진행 중. 새 대주주의 IOTA 프로젝트에 대한 Commitment 확약이 LP 신뢰에 결정적 역할.' : 'IGIS controlling stake sale in progress. Commitment from the new major shareholder to the IOTA project is crucial for LP trust.'}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2">▪</span>
                                <span>{lang === 'kr' ? '인수자 선정 일정과 IPR 클로징 일정 간의 완벽한 시간적 Alignment가 매우 중요.' : 'Perfect time alignment between the acquirer selection schedule and IPR closing schedule is essential.'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom text */}
                <div className={`w-full text-center mt-2 transition-all duration-[612ms] delay-[122ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-block bg-[#1d1d1f] text-white px-8 py-5 text-[20px] md:text-[22px] font-bold shadow-lg break-keep">
                        {lang === 'kr' ? 
                            (lang === 'kr' ? '글로벌 자본 유치와 안정적 거버넌스 확립을 통한 IPR 클로징 완성' : 'Completing IPR closing through global capital attraction and establishment of stable governance') : 
                            'Completing IPR closing through global capital attraction and stable governance'}
                    </div>
                </div>
            </div>
        </section>
    );
}
