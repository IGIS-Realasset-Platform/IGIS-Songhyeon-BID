import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section100({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918), // IBs
            setTimeout(() => setStep(4), 1300), // Integration / Anchor Case
            setTimeout(() => setStep(5), 1912)  // Bottom
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '글로벌 IB 협력 채널' : 'Global IB Collaboration Channels'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-[40px] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>최상위 글로벌 IB와의 Deeper Integration</> : <>Deeper Integration with Top-tier Global IBs</>}
                </h2>

                <div className="w-full max-w-[1100px] flex flex-col items-center mb-[30px] relative">
                    
                    {/* Top: 6 Global IBs */}
                    <div className={`w-full flex flex-wrap justify-center gap-4 transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {['Goldman Sachs', 'Morgan Stanley', 'J.P. Morgan', 'Citi', 'Nomura', 'HSBC'].map((ib, idx) => (
                            <div key={idx} className="bg-white border-2 border-gray-200 text-gray-800 font-black text-[18px] md:text-[20px] px-6 py-3 rounded-full shadow-sm">
                                {ib}
                            </div>
                        ))}
                    </div>

                    {/* Connecting Arrow */}
                    <div className={`my-[6px] text-blue-400 transition-all duration-[765ms] delay-[230ms] ${step >= 4 ? 'opacity-100 h-8' : 'opacity-0 h-0'} overflow-hidden flex flex-col items-center justify-center`}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21l-7-7h4V3h6v11h4z"/>
                        </svg>
                    </div>

                    {/* Bottom: Anchor Case Core */}
                    <div className={`w-full max-w-[1000px] bg-[#1e3a8a] rounded-2xl p-8 border-4 border-blue-900 shadow-2xl relative overflow-hidden transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        {/* Background pattern */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                        
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            
                            <div className="flex-1 text-left border-b md:border-b-0 md:border-r border-blue-700 pb-6 md:pb-0 md:pr-8">
                                <h4 className="text-blue-300 font-bold text-[18px] mb-2 uppercase tracking-wide">
                                    {lang === 'kr' ? '파트너십 통합' : 'Partnership Integration'}
                                </h4>
                                <p className="text-white font-extrabold text-[22px] leading-snug break-keep">
                                    {lang === 'kr' ? 'Korea PB & Alternative Coverage 팀과의 강력한 전략적 결속' : 'Strong strategic integration with Korea PB & Alternative Coverage teams'}
                                </p>
                            </div>

                            <div className="flex-[1.2] text-left">
                                <h4 className="text-blue-300 font-bold text-[18px] mb-2 uppercase tracking-wide">
                                    {lang === 'kr' ? 'IOTA 앵커 케이스' : 'IOTA Anchor Case'}
                                </h4>
                                <p className="text-white font-extrabold text-[24px] leading-snug break-keep">
                                    {lang === 'kr' ? '일본, 유럽, 중동 지역 글로벌 로드쇼의 핵심 앵커(Anchor) 사례로 전면 활용' : 'Fully utilized as the core Anchor case for Global Roadshows in Japan, Europe, and Middle East'}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom Thesis Text */}
                <div className={`w-full max-w-[1000px] bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[17px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed text-center">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? <>글로벌 최상위 IB 네트워크를 십분 활용하여,<br/>IOTA 프로젝트를 국제적 자본 유치의 핵심 동력으로 격상</> : <>Fully leveraging top-tier global IB networks,<br/>elevating the IOTA project to the core driver of international capital attraction.</>)
                            : <>By fully leveraging the top-tier global IB network,<br/>IOTA project is elevated to the core engine of international capital attraction</>
                        }
                    </p>
                </div>

            </div>
        </section>
    );
}
