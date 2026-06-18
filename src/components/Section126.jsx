import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section126({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 184),
            setTimeout(() => setStep(2), 551),
            setTimeout(() => setStep(3), 918),
            setTimeout(() => setStep(4), 1285),
            setTimeout(() => setStep(5), 1652)
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
                            {lang === 'kr' ? 'IOTA가 제시하는 미래 청사진' : 'Future Blueprint Presented by IOTA'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '혁신 운영 쇼케이스와 트로피 시리즈 템플릿' : 'Innovative Operation Showcase & Trophy Template'}
                    </h2>
                </div>

                {/* Main Content: Left Text, Right 3D Diagram */}
                <div className="w-full max-w-[1300px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
                    
                    {/* Left: Text Content */}
                    <div className={`lg:col-span-6 flex flex-col gap-8 ml-[20px] transition-all duration-700 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        
                        <div className={`relative pl-6 border-l-[4px] border-[#1e3a8a] transition-all duration-700 delay-500 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="text-[#1e3a8a] font-black text-[16px] tracking-widest uppercase mb-2">Blueprint 01</div>
                            <h3 className="text-[#1d1d1f] font-bold text-[28px] mb-3 leading-tight break-keep">
                                {lang === 'kr' ? 'Factorial Builders 운영 모델' : 'Factorial Builders Operating Model'}
                            </h3>
                            <p className="text-[16px] text-gray-700 font-bold leading-relaxed break-keep tracking-tight">
                                {lang === 'kr' ? (
                                    <>'Asset as a Service' 모델 적용, AI, 로봇, IoT가 통합된 독자적 빌딩 OS 구축<br/>글로벌 스탠다드 대비 확고한 초격차 운영 경쟁력 확보</>
                                ) : (
                                    <>Implementing a proprietary building OS integrated with AI, robotics, and IoT under the 'Asset as a Service' model<br/>Securing an ultra-gap operational edge over global standards</>
                                )}
                            </p>
                        </div>

                        <div className={`relative pl-6 border-l-[4px] border-[#1d1d1f] transition-all duration-700 delay-700 ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="text-[#1d1d1f] font-black text-[16px] tracking-widest uppercase mb-2">Blueprint 02</div>
                            <h3 className="text-[#1d1d1f] font-bold text-[28px] mb-3 leading-tight break-keep">
                                {lang === 'kr' ? 'Trophy Stack 자본 템플릿' : 'Trophy Stack Capital Template'}
                            </h3>
                            <p className="text-[16px] text-gray-700 font-bold leading-relaxed break-keep tracking-tight mb-4">
                                {lang === 'kr' ? (
<>[PFV + 부동산펀드 + 리츠 + LP]가 완벽하게 결합된 통합 자본 구조 구축 및 브랜드화<br/>향후 YIBD, 잠실 등 신규 트로피 에셋의 템플릿으로 확장</>
                                ) : (
                                    <>Branding a seamlessly unified capital structure of [PFV + RE Fund + REIT + LP]<br/>This success model will expand as a template for future trophy assets like YIBD and Jamsil</>
                                )}
                            </p>
                            <div className="inline-flex items-center justify-center bg-[#1d1d1f] text-white px-5 py-2 rounded-full text-lg font-bold shadow-md">
                                {lang === 'kr' ? '미래 10년의 확장형 DNA 이식' : 'Implanting Scalable DNA for the Next 10 Years'}
                            </div>
                        </div>

                    </div>

                    {/* Right: 2D Stack Diagram (Clear & Readable) */}
                    <div className="lg:col-span-6 flex justify-center lg:justify-start items-center py-4">
                        <div className={`w-full max-w-[500px] flex flex-col gap-2 transition-all duration-1000 delay-300 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            
                            {/* Layer 4: REIT */}
                            <div className="bg-[#0f172a] border-l-8 border-[#60a5fa] rounded-lg p-5 shadow-xl flex justify-between items-center text-white">
                                <div className="text-left">
                                    <div className="text-[#60a5fa] font-black text-[13px] tracking-widest mb-0.5">EXIT / SECURITIZATION</div>
                                    <div className="font-extrabold text-[22px]">IOTA Office REIT</div>
                                </div>
                                <div className="bg-[#1e3a8a] px-4 py-2 rounded font-bold text-[16px]">{lang === 'kr' ? '상장 및 유동화' : 'Listing & Liquidation'}</div>
                            </div>

                            {/* Layer 3: Fund */}
                            <div className="bg-[#1e3a8a] border-l-8 border-blue-400 rounded-lg p-5 shadow-xl flex justify-between items-center text-white">
                                <div className="text-left">
                                    <div className="text-blue-300 font-black text-[13px] tracking-widest mb-0.5">STABILIZED HOLDING</div>
                                    <div className="font-extrabold text-[22px]">IGIS RE Fund</div>
                                </div>
                                <div className="bg-[#0f172a] px-4 py-2 rounded font-bold text-[16px]">{lang === 'kr' ? '안정화 보유' : 'Stabilized Holding'}</div>
                            </div>

                            {/* Layer 2: PFV */}
                            <div className="bg-[#3b82f6] border-l-8 border-blue-200 rounded-lg p-5 shadow-xl flex justify-between items-center text-white">
                                <div className="text-left">
                                    <div className="text-blue-100 font-black text-[13px] tracking-widest mb-0.5">DEVELOPMENT PHASE</div>
                                    <div className="font-extrabold text-[22px]">Project PFV</div>
                                </div>
                                <div className="bg-[#1e3a8a] px-4 py-2 rounded font-bold text-[16px]">{lang === 'kr' ? '개발 및 시공' : 'Development & Construction'}</div>
                            </div>

                            {/* Layer 1: LP */}
                            <div className="bg-[#e2e8f0] border-l-8 border-gray-500 rounded-lg p-5 shadow-xl flex justify-between items-center">
                                <div className="text-left">
                                    <div className="text-gray-500 font-black text-[13px] tracking-widest mb-0.5">CAPITAL BASE</div>
                                    <div className="text-[#1d1d1f] font-extrabold text-[22px]">Global LP</div>
                                </div>
                                <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-bold text-[16px]">{lang === 'kr' ? '기초 자본' : 'Base Capital'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
