import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section98({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918), // Center Fund
            setTimeout(() => setStep(4), 1300), // Left / Right Directions
            setTimeout(() => setStep(5), 1912)  // Bottom
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '글로벌 코밍글드 펀드' : 'Global Commingled Fund'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-[40px] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>이지스 1호 글로벌 코밍글드 펀드 조성을 통한 양방향 플랫폼</> : <>Bidirectional Platform via 1st Global Commingled Fund</>}
                </h2>

                <div className="w-full max-w-[1100px] relative mb-12 flex flex-col items-center">
                    
                    {/* Center Core */}
                    <div className={`w-full max-w-[600px] z-10 bg-[#1e3a8a] border-4 border-blue-900 rounded-2xl py-5 px-8 text-center shadow-2xl transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="bg-blue-800/50 text-blue-200 text-[14px] font-bold px-4 py-1 inline-block rounded-full mb-2 uppercase tracking-wider">
                            Decisive Turning Point
                        </div>
                        <h3 className="text-white font-black text-[28px] md:text-[32px] leading-tight break-keep mb-1">
                            {lang === 'kr' ? '이지스 1호 글로벌 코밍글드 펀드' : 'IGIS 1st Global Commingled Fund'}
                        </h3>
                        <p className="text-blue-300 font-extrabold text-[24px]">Target: $1B USD</p>
                    </div>

                    {/* Arrows & Directions */}
                    <div className={`w-full flex flex-col md:flex-row justify-between items-center md:items-stretch gap-6 -mt-[26px] pt-[54px] px-4 transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        
                        {/* Left: Outbound / Globalizing Domestic Assets */}
                        <div className="flex-1 bg-white border-4 border-[#1e3a8a] rounded-2xl p-8 flex flex-col items-center text-center shadow-sm relative w-full">
                            <div className="absolute -top-6 bg-white border-2 border-gray-200 text-gray-400 rounded-full w-12 h-12 flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </div>
                            <span className="text-blue-600 font-bold text-[20px] mb-2">{lang === 'kr' ? '(1) 국내 자산의 글로벌화' : '(1) Globalizing Domestic Assets'}</span>
                            <p className="text-[#1d1d1f] font-extrabold text-[22px] break-keep">
                                {lang === 'kr' ? '이지스의 한국 자산을 글로벌 LP에게 패키지 매각' : 'Package sale of IGIS Korean assets to Global LPs'}
                            </p>
                        </div>

                        {/* Right: Inbound / Attracting Global Assets */}
                        <div className="flex-1 bg-white border-4 border-[#1e3a8a] rounded-2xl p-8 flex flex-col items-center text-center shadow-sm relative w-full">
                            <div className="absolute -top-6 bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] rounded-full w-12 h-12 flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            </div>
                            <span className="text-blue-600 font-bold text-[20px] mb-2">{lang === 'kr' ? '(2) 글로벌 자산의 국내 유치' : '(2) Attracting Global Assets to Korea'}</span>
                            <p className="text-[#1d1d1f] font-extrabold text-[22px] break-keep">
                                {lang === 'kr' ? '한국 LP의 해외 위탁 및 글로벌 딜소싱 거점화' : 'Overseas mandate for Korean LPs & Global Deal Sourcing Hub'}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Bottom Thesis Text */}
                <div className={`w-full max-w-[1100px] bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[17px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed text-center">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? <>현재 국내 LP 비중이 압도적인 구조에서 탈피,<br/>향후 5년 내 코밍글드 펀드 조성을 기점으로 양방향 플랫폼 도약</> : <>Breaking away from the current structure overwhelmingly weighted towards domestic LPs,<br/>leaping into a two-way platform starting with commingled fund creation within 5 years.</>)
                            : <>Breaking away from the current domestic LP-dominated structure,<br/>leaping into a bidirectional platform within 5 years via commingled fund</>
                        }
                    </p>
                </div>

            </div>
        </section>
    );
}
