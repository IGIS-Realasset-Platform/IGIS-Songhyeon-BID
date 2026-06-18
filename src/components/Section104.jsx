import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section104({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 857), // Raw Data
            setTimeout(() => setStep(4), 1316), // AI Engine
            setTimeout(() => setStep(5), 1775), // Language outputs
            setTimeout(() => setStep(6), 2234), // Bottom text
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        LP Reporting
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>다국어 리포트 동시 생성 및 데이터 통합</> : <>Simultaneous Multi-Language Reporting & Data Integration</>}
                </h2>

                {/* Infographic Area: Translation Funnel */}
                <div className="w-full max-w-[1000px] mt-12 mb-16 flex items-center justify-center relative">

                    {/* Left: Input Data */}
                    <div className="flex-1 flex flex-col gap-5 items-end pr-8 md:pr-16 relative z-10">
                        <div className={`bg-white border-4 border-[#1e3a8a] rounded-none p-5 shadow-sm w-[220px] text-center transition-all duration-[540ms] ${step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                            <div className="w-6 h-1 bg-[#1e3a8a] mx-auto mb-3"></div>
                            <div className="font-bold text-[#1e3a8a] text-[16px] md:text-[18px]">{lang === 'kr' ? '재무 데이터 통합' : 'Financial Data'}</div>
                        </div>
                        <div className={`bg-white border-4 border-[#1e3a8a] rounded-none p-5 shadow-sm w-[220px] text-center transition-all duration-[540ms] delay-100 ${step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                            <div className="w-6 h-1 bg-[#1e3a8a] mx-auto mb-3"></div>
                            <div className="font-bold text-[#1e3a8a] text-[16px] md:text-[18px]">{lang === 'kr' ? 'ESG 데이터' : 'ESG Data'}</div>
                        </div>
                    </div>
                    
                    {/* Center: AI Engine */}
                    <div className={`relative z-20 flex flex-col items-center transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-[#1e3a8a] border-[6px] border-gray-100 outline outline-1 outline-gray-300 flex flex-col items-center justify-center shadow-md">
                            <span className="text-white font-black text-[24px] md:text-[32px]">AI Gen</span>
                            <span className="text-white/80 font-bold text-[14px]">Engine</span>
                        </div>
                        <div className="mt-4 bg-[#1d1d1f] text-white px-4 py-1.5 font-bold text-[14px] shadow-sm">
                            {lang === 'kr' ? '실시간 다국어 생성' : 'Real-time Generation'}
                        </div>
                    </div>

                    {/* Right: Output Languages */}
                    <div className="flex-1 flex flex-col gap-3 items-start pl-8 md:pl-16 relative z-10">
                        <div className={`bg-white border-4 border-[#1e3a8a] p-4 rounded-none shadow-sm text-[#1e3a8a] font-black flex items-center justify-center gap-3 w-[200px] transition-all duration-[540ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            {lang === 'kr' ? '영어 (English)' : 'English'}
                        </div>
                        <div className={`bg-white border-4 border-[#1e3a8a] p-4 rounded-none shadow-sm text-[#1e3a8a] font-black flex items-center justify-center gap-3 w-[200px] transition-all duration-[540ms] delay-100 ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            {lang === 'kr' ? '한국어 (Korean)' : 'Korean'}
                        </div>
                        <div className={`bg-white border-4 border-[#1e3a8a] p-4 rounded-none shadow-sm text-[#1e3a8a] font-black flex items-center justify-center gap-3 w-[200px] transition-all duration-[540ms] delay-[153ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            {lang === 'kr' ? '중국어 (Chinese)' : 'Chinese'}
                        </div>
                        <div className={`bg-white border-4 border-[#1e3a8a] p-4 rounded-none shadow-sm text-[#1e3a8a] font-black flex items-center justify-center gap-3 w-[200px] transition-all duration-[540ms] delay-[230ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            {lang === 'kr' ? '일본어 (Japanese)' : 'Japanese'}
                        </div>
                    </div>

                </div>

                {/* Bottom Text (Style from 59~62p) */}
                <div className={`max-w-[1200px] mt-2 text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '각종 재무 데이터와 ESG 지표를 자동으로 취합하여 글로벌 표준에 맞는 분기 리포트 생성' : 'Automatically aggregates financial & ESG data to generate quarterly reports matching global standards'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-teal-600">▪</span><span className="text-teal-900">{lang === 'kr' ? '언어 장벽을 허무는 다국어(한·영·중·일) 동시 출력으로 글로벌 LP 베이스 확장 시 필수 인프라 확보' : 'Secures essential infra for global LP expansion by removing language barriers with simultaneous multi-lang output'}</span></li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
