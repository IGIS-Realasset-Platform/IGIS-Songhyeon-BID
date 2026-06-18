import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section47({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const t1 = setTimeout(() => setStep(1), 230);
        const t2 = setTimeout(() => setStep(2), 536);
        const t3 = setTimeout(() => setStep(3), 781);
        const t4 = setTimeout(() => setStep(4), 1087);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] tracking-[-0.02em] mb-[12px] bg-transparent">
                            {lang === 'kr' ? '미래 시나리오 종합' : 'Future Scenario Summary'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '한국 GDP 3조 달러 도달 시나리오별 핵심 지표 비교' : 'Core Indicators by Scenario for Korea reaching $3T GDP'}
                    </h2>
                </div>

                {/* 3 Columns */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    
                    {/* Base */}
                    <div className={`flex flex-col bg-gray-50 rounded-none border-[6px] border-gray-400 px-8 py-5 md:px-10 md:py-[18px] transition-all duration-[765ms] ease-out ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <h3 className="text-[28px] font-extrabold text-black mb-2 tracking-tight">Base Scenario</h3>
                        <p className="text-[18px] font-bold text-gray-500 mb-5 border-b border-gray-300 pb-4">{lang === 'kr' ? '확률 50%' : '50% Prob'}</p>
                        
                        <div className="mb-5">
                            <p className="text-[14px] font-bold text-gray-500 mb-1 uppercase">{lang === 'kr' ? '2030년 예상 GDP' : '2030 Expected GDP'}</p>
                            <p className="text-[28px] font-bold text-black tracking-tight">{lang === 'kr' ? '2.2 ~ 2.4조 달러' : '$2.2 ~ 2.4T'}</p>
                        </div>
                        <div className="mb-5">
                            <p className="text-[14px] font-bold text-gray-500 mb-1 uppercase">{lang === 'kr' ? '3조 달러 도달' : 'Reach $3T'}</p>
                            <p className="text-[28px] font-bold text-black tracking-tight">{lang === 'kr' ? '2037 ~ 2038년' : '2037 ~ 2038'}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-[14px] font-bold text-gray-500 mb-3 uppercase">{lang === 'kr' ? '핵심 전제' : 'Core Premises'}</p>
                            <ul className="text-[18px] font-bold text-gray-800 space-y-3 leading-relaxed break-keep">
                                <li className="flex items-start"><span className="text-gray-400 mr-2">•</span>{lang === 'kr' ? '기관 컨센서스(IMF 등) 수렴' : 'Aligns with IMF Consensus'}</li>
                                <li className="flex items-start"><span className="text-gray-400 mr-2">•</span>{lang === 'kr' ? '실질성장률 연 1.5~2.0% 유지' : 'Real Growth 1.5~2.0%'}</li>
                                <li className="flex items-start"><span className="text-gray-400 mr-2">•</span>{lang === 'kr' ? 'AI 향상이 인구 감소 효과 상쇄' : 'AI offsets Pop Decline'}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Bull */}
                    <div className={`flex flex-col bg-[#f8fbff] rounded-none border-[6px] border-blue-400 px-8 py-5 md:px-10 md:py-[18px] transition-all duration-[765ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <h3 className="text-[28px] font-extrabold text-[#0055ff] mb-2 tracking-tight">Bull Scenario</h3>
                        <p className="text-[18px] font-bold text-gray-500 mb-5 border-b border-blue-200 pb-4">{lang === 'kr' ? '확률 30%' : '30% Prob'}</p>
                        
                        <div className="mb-5">
                            <p className="text-[14px] font-bold text-blue-500 mb-1 uppercase">{lang === 'kr' ? '2030년 예상 GDP' : '2030 Expected GDP'}</p>
                            <p className="text-[28px] font-bold text-black tracking-tight">{lang === 'kr' ? '2.5 ~ 2.7조 달러' : '$2.5 ~ 2.7T'}</p>
                        </div>
                        <div className="mb-5">
                            <p className="text-[14px] font-bold text-blue-500 mb-1 uppercase">{lang === 'kr' ? '3조 달러 도달' : 'Reach $3T'}</p>
                            <p className="text-[28px] font-bold text-[#0055ff] tracking-tight">{lang === 'kr' ? '2034 ~ 2035년' : '2034 ~ 2035'}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-[14px] font-bold text-blue-500 mb-3 uppercase">{lang === 'kr' ? '핵심 전제' : 'Core Premises'}</p>
                            <ul className="text-[18px] font-bold text-gray-800 space-y-3 leading-relaxed break-keep">
                                <li className="flex items-start"><span className="text-blue-400 mr-2">•</span>{lang === 'kr' ? '"동아시아 스위스" 모델 안착' : '"East Asian Swiss" Model'}</li>
                                <li className="flex items-start"><span className="text-blue-400 mr-2">•</span>{lang === 'kr' ? '주력 산업 글로벌 슈퍼사이클' : 'Core Industry Supercycle'}</li>
                                <li className="flex items-start"><span className="text-blue-400 mr-2">•</span>{lang === 'kr' ? '대규모 외국인 자본 유입' : 'Massive Foreign Capital'}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Bear */}
                    <div className={`flex flex-col bg-[#fff8f8] rounded-none border-[6px] border-red-400 px-8 py-5 md:px-10 md:py-[18px] transition-all duration-[765ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <h3 className="text-[28px] font-extrabold text-[#e11d48] mb-2 tracking-tight">Bear Scenario</h3>
                        <p className="text-[18px] font-bold text-gray-500 mb-5 border-b border-red-200 pb-4">{lang === 'kr' ? '확률 20%' : '20% Prob'}</p>
                        
                        <div className="mb-5">
                            <p className="text-[14px] font-bold text-red-500 mb-1 uppercase">{lang === 'kr' ? '2030년 예상 GDP' : '2030 Expected GDP'}</p>
                            <p className="text-[28px] font-bold text-black tracking-tight">{lang === 'kr' ? '2.0 ~ 2.1조 달러' : '$2.0 ~ 2.1T'}</p>
                        </div>
                        <div className="mb-5">
                            <p className="text-[14px] font-bold text-red-500 mb-1 uppercase">{lang === 'kr' ? '3조 달러 도달' : 'Reach $3T'}</p>
                            <p className="text-[28px] font-bold text-[#e11d48] tracking-tight">{lang === 'kr' ? '2042년 이후' : 'Post-2042'}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-[14px] font-bold text-red-500 mb-3 uppercase">{lang === 'kr' ? '핵심 전제' : 'Core Premises'}</p>
                            <ul className="text-[18px] font-bold text-gray-800 space-y-3 leading-relaxed break-keep">
                                <li className="flex items-start"><span className="text-red-400 mr-2">•</span>{lang === 'kr' ? '일본식 "잃어버린 10년" 진입' : 'Japan-style "Lost Decade"'}</li>
                                <li className="flex items-start"><span className="text-red-400 mr-2">•</span>{lang === 'kr' ? '가파른 인구 절벽 현실화' : 'Steep Demographic Cliff'}</li>
                                <li className="flex items-start"><span className="text-red-400 mr-2">•</span>{lang === 'kr' ? '미·중 디커플링 및 PF 부실 심화' : 'US-China Decoupling & PF Default'}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
