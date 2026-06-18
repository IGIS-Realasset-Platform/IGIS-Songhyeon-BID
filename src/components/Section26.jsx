import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section26({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) {
            setStep(20);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 765),
            setTimeout(() => setStep(3), 1132),
            setTimeout(() => setStep(4), 1591),
            setTimeout(() => setStep(5), 2050)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '글로벌 IB들의 KOSPI 6,000 낙관론' : 'Global IBs\' Optimism on KOSPI 6,000'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '메모리 슈퍼사이클과 조기 달성된 5,000 시대 공약' : 'Memory Supercycle and Early Achievement of 5,000 Era Pledge'}
                </h2>

                <div className="relative w-full max-w-[1100px] mt-[22px] mb-[20px] h-auto py-4 flex flex-col md:flex-row items-center justify-center z-10 gap-8">
                    
                    {/* JP Morgan */}
                    <div className={`relative w-[320px] h-[280px] bg-blue-900 rounded-[30px] shadow-xl flex flex-col items-center justify-center p-6 border-[6px] border-blue-950 transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="text-[26px] font-black text-white mb-2">JP Morgan</div>
                        <div className="text-[16px] font-bold text-blue-300 italic mb-4">'Kospi 5000 on the Cards'</div>
                        <div className="w-full h-[1px] bg-blue-800 mb-4"></div>
                        <div className="text-[42px] font-black text-white leading-none">6,000</div>
                        <div className="text-[16px] font-bold text-blue-200 mt-2">{lang === 'kr' ? '풀불(Full Bull) 시나리오' : 'Full Bull Scenario'}</div>
                    </div>

                    {/* Macquarie */}
                    <div className={`relative w-[320px] h-[280px] bg-blue-950 rounded-[30px] shadow-xl flex flex-col items-center justify-center p-6 border-[6px] border-blue-900 transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[153ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="text-[26px] font-black text-white mb-2">Macquarie</div>
                        <div className="text-[16px] font-bold text-blue-300 italic mb-4">2026 Target</div>
                        <div className="w-full h-[1px] bg-blue-800 mb-4"></div>
                        <div className="text-[42px] font-black text-white leading-none">6,000</div>
                        <div className="text-[16px] font-bold text-blue-200 mt-2">{lang === 'kr' ? '메모리 슈퍼사이클 근거' : 'Based on Memory Supercycle'}</div>
                    </div>

                    {/* Domestic */}
                    <div className={`relative w-[320px] h-[280px] bg-blue-800 rounded-[30px] shadow-xl flex flex-col items-center justify-center p-6 border-[6px] border-blue-900 transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-400 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="text-[26px] font-black text-white mb-2">NH & HMC</div>
                        <div className="text-[16px] font-bold text-blue-300 italic mb-4">2026 Domestic Target</div>
                        <div className="w-full h-[1px] bg-blue-700 mb-4"></div>
                        <div className="text-[42px] font-black text-white leading-none">5,500</div>
                        <div className="text-[16px] font-bold text-blue-200 mt-2">{lang === 'kr' ? '국내 주요 증권사 전망' : 'Major Domestic Outlook'}</div>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-blue-700">▪</span><span>{lang === 'kr' ? <><strong>JP모건, 맥쿼리 등 글로벌 IB</strong>, 메모리 슈퍼사이클을 근거로 2026년 KOSPI 목표를 <strong>최고 6,000선(Full Bull)</strong>으로 상향 제시.</> : <><strong>Global IBs like JP Morgan and Macquarie</strong> raised 2026 KOSPI targets up to <strong>6,000 (Full Bull)</strong> citing the memory super cycle.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-700">▪</span><span>{lang === 'kr' ? <>NH투자·HMC증권 등 국내 주요 증권사 역시 <strong>5,500선을 목표치</strong>로 상향 조정하며 강세장에 힘을 실음.</> : <>Major domestic securities firms like NH Investment and HMC Securities also raised targets to <strong>5,500</strong>, supporting the bull market.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-700">▪</span><span>{lang === 'kr' ? <>현 정부의 <strong>'임기 내 KOSPI 5,000' 공약이 폭발적 랠리로 조기 달성</strong>되며 자본시장의 새로운 국면 진입.</> : <>The current government's pledge of <strong>'KOSPI 5,000 within term' was achieved early through an explosive rally</strong>, entering a new phase for capital markets.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-blue-700">▪</span><span><strong>Global IBs like JP Morgan & Macquarie</strong> upgraded 2026 KOSPI targets up to <strong>6,000 (Full Bull)</strong> on memory supercycle.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-700">▪</span><span>Major domestic securities firms like NH & HMC also raised targets to <strong>5,500</strong>, fueling the bull market.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-700">▪</span><span>The gov't pledge of <strong>'KOSPI 5,000 within term' was achieved early</strong> due to the rally, opening a new market phase.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
