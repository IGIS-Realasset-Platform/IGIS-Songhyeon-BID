import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section108({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 857), // Left Input
            setTimeout(() => setStep(4), 1163), // Flow line
            setTimeout(() => setStep(5), 1469), // Right Target
            setTimeout(() => setStep(6), 1928), // Bottom Text
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        {lang === 'kr' ? 'SWF 파트너십 & 보험사 자본' : 'SWF Partnership & Insurer Capital'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>초장기 자본(Long-Duration Capital)의 트로피 자산 매칭</> : <>Matching Long-Duration Capital with Trophy Assets</>}
                </h2>

                {/* Infographic Area */}
                <div className="w-full max-w-[1100px] mt-[30px] mb-[46px] flex flex-col md:flex-row items-center gap-10 justify-center relative">

                    {/* Left: Capital Sources */}
                    <div className={`flex-[1] flex flex-col gap-6 relative z-10 transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        {/* SWF */}
                        <div className="bg-white border-4 border-[#1e3a8a] rounded-none p-6 text-left shadow-sm">
                            <div className="text-[#1e3a8a] font-black text-[22px] md:text-[26px] mb-2">{lang === 'kr' ? '국부펀드 (SWF)' : 'Sovereign Wealth Funds (SWF)'}</div>
                            <div className="text-gray-600 font-bold text-[16px] leading-relaxed">
                                {lang === 'kr' ? '중동(ADIA, PIF) 및 싱가포르(GIC) 등 막대한 자금력을 갖춘 최상위 기관과의 파트너십 구축' : 'Partnerships with top-tier institutions holding massive capital (ADIA, PIF, GIC)'}
                            </div>
                        </div>
                        {/* Insurance */}
                        <div className="bg-white border-4 border-[#1e3a8a] rounded-none p-5 text-left shadow-sm flex items-center justify-between">
                            <div>
                                <div className="text-[#1e3a8a] font-black text-[22px] md:text-[26px] mb-1">{lang === 'kr' ? '글로벌 & 국내 보험사' : 'Global & Domestic Insurers'}</div>
                                <div className="text-gray-800 font-bold text-[15px] leading-relaxed">
                                    {lang === 'kr' ? '국내: 삼성생명 · 교보생명 · 한화생명' : 'Domestic: Samsung Life · Kyobo · Hanwha'}
                                    <br />
                                    {lang === 'kr' ? '글로벌: Allianz · AXA · MetLife' : 'Global: Allianz · AXA · MetLife'}
                                </div>
                            </div>
                            <div className="bg-gray-100 border border-gray-300 text-gray-700 font-bold px-3 py-2 text-[14px] text-center ml-4 whitespace-nowrap">
                                Long-Duration<br/>Capital
                            </div>
                        </div>
                    </div>

                    {/* Right: Trophy Assets */}
                    <div className={`flex-[1] relative z-10 transition-all duration-[765ms] ${step >= 5 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <div className="bg-[#1e3a8a] border-[8px] border-white outline outline-4 outline-[#1e3a8a] p-8 text-center shadow-lg">
                            <div className="text-white/80 font-bold text-[18px] uppercase tracking-widest mb-2">Target Destination</div>
                            <div className="text-white font-black text-[32px] md:text-[40px] mb-6">Trophy Assets</div>
                            
                            <div className="flex flex-col gap-3">
                                <div className="bg-white text-[#1e3a8a] font-black text-[18px] p-4 flex items-center justify-between">
                                    <span>Core Equity</span>
                                    <span className="text-gray-400 text-[14px] uppercase tracking-wider">{lang === 'kr' ? '핵심 지분 투자' : 'Stable Return'}</span>
                                </div>
                                <div className="bg-white text-[#1e3a8a] font-black text-[18px] p-4 flex items-center justify-between">
                                    <span>Senior Debt</span>
                                    <span className="text-gray-400 text-[14px] uppercase tracking-wider">{lang === 'kr' ? '선순위 대출' : 'Capital Protection'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`max-w-[1200px] mt-2 text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '긴 듀레이션(Long-Duration)을 필요로 하는 보험사 자본의 특성을 정확히 공략' : 'Accurately targeting the long-duration needs characteristic of insurance capital'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span className="text-[#1e3a8a]">{lang === 'kr' ? '안정적 배당과 자본 보호가 확실한 핵심 도심 트로피 자산의 선순위 대출 및 코어 에쿼티에 최적화' : 'Optimized for senior debt and core equity of urban trophy assets ensuring stable dividends and capital protection'}</span></li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
