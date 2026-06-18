import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section27({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

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
                        {lang === 'kr' ? '코리아 디스카운트의 구조적 종언' : 'Structural End of Korea Discount'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? 'AI 수혜 노출과 밸류업 정책이 주도할 아시아 평균 밸류에이션 수렴' : 'Convergence to Asian Average Valuation Driven by AI Exposure and Value-up Policy'}
                </h2>

                <div className="relative w-full max-w-[1200px] mt-[22px] mb-[20px] h-auto py-4 flex flex-col md:flex-row items-center justify-center z-10 gap-10">
                    
                    {/* Key Drivers */}
                    <div className={`relative w-full md:w-[500px] flex flex-col gap-3 transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="text-[22px] font-black text-left text-[#1d1d1f] mb-[-6px]">{lang === 'kr' ? '5대 핵심 동력' : '5 Core Drivers'}</div>
                        
                        <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm text-left">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-black text-[22px]">1</div>
                            <div className="flex-1">
                                <div className="text-[22px] font-bold text-gray-800">{lang === 'kr' ? '반도체 슈퍼사이클' : 'Semi Supercycle'}</div>
                                <div className="text-[14px] font-bold text-gray-500">{lang === 'kr' ? 'HBM 공급 부족 현상 지속' : 'Prolonged HBM Shortage'}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm text-left">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-black text-[22px]">2</div>
                            <div className="flex-1">
                                <div className="text-[22px] font-bold text-gray-800">{lang === 'kr' ? '외국인 대규모 유입' : 'Massive Foreign Inflows'}</div>
                                <div className="text-[14px] font-bold text-gray-500">{lang === 'kr' ? '공매도 재개 이후 패시브/액티브 자금 회귀' : 'Return of funds post-short selling resume'}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm text-left">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-black text-[22px]">3</div>
                            <div className="flex-1">
                                <div className="text-[22px] font-bold text-gray-800">{lang === 'kr' ? '정부의 친주주 정책' : "Gov't Pro-shareholder Policy"}</div>
                                <div className="text-[14px] font-bold text-gray-500">{lang === 'kr' ? '밸류업 프로그램 및 자본시장법 개정안' : 'Value-up Program & Capital Market Act revision'}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm text-left">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-black text-[22px]">4</div>
                            <div className="flex-1">
                                <div className="text-[22px] font-bold text-gray-800">{lang === 'kr' ? '글로벌 AI 수혜 노출도 1위' : '#1 Global AI Exposure'}</div>
                                <div className="text-[14px] font-bold text-gray-500">{lang === 'kr' ? '전 세계에서 AI 수혜에 가장 직결된 시장 인식' : 'Perceived as the market most directly tied to AI'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Valuation Comparison */}
                    <div className={`relative w-[460px] flex flex-col items-center bg-purple-900 rounded-[30px] shadow-xl p-8 mt-[34px] transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[153ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="text-[20px] font-black text-purple-200 mb-8">{lang === 'kr' ? '2026.05 밸류에이션 비교' : 'May 2026 Valuation Comparison'}</div>
                        
                        <div className="w-full flex justify-between items-center relative py-4 px-2">
                            {/* KOSPI Column */}
                            <div className="flex flex-col gap-10 w-[140px] items-center">
                                <div className="flex flex-col items-center">
                                    <div className="text-[16px] font-bold text-purple-300 mb-1">KOSPI</div>
                                    <div className="text-[38px] font-black text-white">13.2<span className="text-[20px]">x</span></div>
                                    <div className="text-[14px] font-bold text-purple-400">PER</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-[38px] font-black text-white">1.34<span className="text-[20px]">x</span></div>
                                    <div className="text-[14px] font-bold text-purple-400">PBR</div>
                                </div>
                            </div>

                            {/* Center VS */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-500 font-black text-[28px] bg-purple-900 px-4 py-2 z-10">
                                VS
                            </div>

                            {/* Vertical dividing line */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-purple-700 -translate-x-1/2"></div>

                            {/* Asia Avg Column */}
                            <div className="flex flex-col gap-10 w-[140px] items-center">
                                <div className="flex flex-col items-center">
                                    <div className="text-[16px] font-bold text-purple-300 mb-1">Asia Avg.</div>
                                    <div className="text-[38px] font-black text-white">16.1<span className="text-[20px]">x</span></div>
                                    <div className="text-[14px] font-bold text-purple-400">PER</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-[38px] font-black text-white">2.15<span className="text-[20px]">x</span></div>
                                    <div className="text-[14px] font-bold text-purple-400">PBR</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-purple-700">▪</span><span>{lang === 'kr' ? <>핵심 상승 동력은 <strong>HBM 부족 현상 지속, 외국인 자금 회귀, 강력한 밸류업 정책 및 자본시장법 개정</strong>.</> : <>Core drivers include <strong>persistent HBM shortage, return of foreign capital, strong Value-up policies, and Capital Markets Act revisions</strong>.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-purple-700">▪</span><span>{lang === 'kr' ? <>무엇보다 KOSPI가 <strong>글로벌 AI 밸류체인의 핵심 수혜 시장</strong>이라는 외국인 투자자의 확고한 인식이 결정적 작용.</> : <>Above all, foreign investors' firm perception that KOSPI is the <strong>core beneficiary market of the global AI value chain</strong> played a decisive role.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-purple-700">▪</span><span>{lang === 'kr' ? <>PER 13.2배로 상승했으나 아시아 평균 대비 여전히 저평가 상태. <strong>향후 5년 내 "코리아 디스카운트"의 완전한 해소 전망</strong>.</> : <>PER rose to 13.2x but remains undervalued compared to Asian averages. <strong>Expect complete resolution of the "Korea Discount" within 5 years</strong>.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-purple-700">▪</span><span>Core drivers: <strong>prolonged HBM shortage, foreign inflows, strong Value-up policies, & Capital Market Act revisions</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-purple-700">▪</span><span>Above all, foreign investors firmly perceive KOSPI as a <strong>core beneficiary market in the global AI value chain</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-purple-700">▪</span><span>PER rose to 13.2x but still undervalued vs Asia avg. <strong>"Korea Discount" expected to fully dissolve within 5 years</strong>.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
