import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section61({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 689),
            setTimeout(() => setStep(3), 995),
            setTimeout(() => setStep(4), 1301),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? '이민자 수용 및 AI로 방어하는 펀더멘털' : 'Fundamentals Defended by Immigration & AI'}</span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>외국인 10% 비중 확대와 기술적 생산성<br/>상쇄를 통한 거시 연착륙 전략</> : <>Macro soft-landing strategy via 10% foreign pop<br/>and tech productivity offsets</>}
                </h2>

                {/* Custom Infographic: Two Pillars */}
                <div className="w-full max-w-[1000px] mt-[34px] mb-[40px] flex flex-col transition-all duration-[765ms]">
                    
                    <div className={`text-[20px] font-bold text-gray-500 mb-[10px] transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '잠재성장률 하방 압력을 방어하기 위한 2대 핵심 전략' : '2 Core Strategies to Defend Downward Pressure on Potential Growth'}
                    </div>

                    <div className="flex flex-col md:flex-row w-full gap-6">
                        {/* Pillar 1 */}
                        <div className={`flex-1 bg-white shadow-xl border-t-[8px] border-indigo-600 px-10 py-8 flex flex-col items-center justify-center transition-all duration-[765ms] delay-100 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h3 className="text-[24px] font-black text-gray-800">{lang === 'kr' ? 'Strategy 01. 이민자 수용 확대' : 'Strategy 01. Expand Immigration'}</h3>
                            </div>
                            <div className="text-[52px] font-black text-indigo-600 my-2 leading-none">4.5% <span className="text-gray-300 text-[40px]">→</span> 10%</div>
                            <p className="text-[18px] font-bold text-gray-500 mt-2">{lang === 'kr' ? '2040년 목표 (싱가포르 모델 차용)' : '2040 Target (Singapore Model)'}</p>
                        </div>

                        {/* Pillar 2 */}
                        <div className={`flex-1 bg-white shadow-xl border-t-[8px] border-purple-600 px-10 py-8 flex flex-col items-center justify-center transition-all duration-[765ms] delay-[230ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                                </div>
                                <h3 className="text-[24px] font-black text-gray-800">{lang === 'kr' ? 'Strategy 02. AI 기술 상쇄' : 'Strategy 02. AI Tech Offsets'}</h3>
                            </div>
                            <div className="text-[52px] font-black text-purple-600 my-2 leading-none">0.5~1.0<span className="text-[32px]">%p</span></div>
                            <p className="text-[18px] font-bold text-gray-500 mt-2">{lang === 'kr' ? '생산성 향상을 통한 경제 방어 효과' : 'Economic Defense via Productivity'}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '한국 이민자 비중은 약 4.5% 수준이나, Bull 시나리오는 2040년 10%까지 끌어올리는 정책 전환을 전제' : 'Foreigner share at 4.5%, but Bull scenario targets 10% by 2040'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '이는 싱가포르 모델(외국인 비중 30%+)을 부분 차용하여 노동력 감소를 적극 방어하는 전략' : 'Adopts Singapore model (30%+) to actively defend labor shortage'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-purple-700">▪</span><span className="text-purple-900">{lang === 'kr' ? 'AI 기술 도입(BCG·McKinsey 보고서)으로 인한 생산성 향상이 인구 감소 효과를 최대 1.0%p 상쇄 가능' : 'AI adoption (BCG/McKinsey) can offset pop decline impact by up to 1.0%p'}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
