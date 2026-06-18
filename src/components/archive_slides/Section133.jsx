import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section133({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 184),
            setTimeout(() => setStep(2), 551),
            setTimeout(() => setStep(3), 918),
            setTimeout(() => setStep(4), 1300),
            setTimeout(() => setStep(5), 1700),
            setTimeout(() => setStep(6), 2100)
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
                            {lang === 'kr' ? '프라임 프리미엄과 엑시트 전략' : 'Prime Premium & Exit Strategy'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '자산 프리미엄 및 자본 Recycling / IPO' : 'Asset Premium and Capital Recycling / IPO Options'}
                    </h2>
                </div>

                {/* Main Content: Left Bar Chart, Right Tree Diagram */}
                <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-6">
                    
                    {/* Left: Bar Chart (40%) */}
                    <div className={`lg:col-span-5 bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col transition-all duration-700 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="mb-4">
                            <div className="text-[#1e3a8a] font-black text-[16px] tracking-widest uppercase mb-1">4.3 ASSET PREMIUM</div>
                            <h3 className="text-[#1d1d1f] font-bold text-[24px] leading-tight break-keep">
                                {lang === 'kr' ? '서울 프라임 대비 프리미엄' : 'Premium Over Seoul Prime'}
                            </h3>
                        </div>

                        <div className="relative flex-1 flex items-end justify-around pb-6 mt-2 border-b-2 border-gray-300 min-h-[160px]">
                            {/* Bar 1: Seoul Avg */}
                            <div className="relative w-20 flex flex-col items-center">
                                <span className="absolute -top-6 text-gray-500 font-bold text-xs">Base</span>
                                <div className={`w-full bg-gray-300 rounded-t-md transition-all duration-1000 ${step >= 4 ? 'h-[80px]' : 'h-0'}`}></div>
                                <span className="absolute -bottom-6 text-gray-600 font-bold text-xs">Seoul Avg</span>
                            </div>

                            {/* Bar 2: IOTA Premium */}
                            <div className="relative w-20 flex flex-col items-center">
                                <span className="absolute -top-10 bg-blue-100 text-blue-800 border border-blue-300 px-2 py-0.5 rounded text-[11px] font-bold shadow-sm whitespace-nowrap z-10 transition-all duration-500 delay-700 opacity-0" style={{ opacity: step >= 5 ? 1 : 0 }}>
                                    +30~50%
                                </span>
                                <div className={`w-full bg-gradient-to-t from-blue-700 to-blue-400 rounded-t-md shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-1000 delay-300 ${step >= 4 ? 'h-[160px]' : 'h-0'}`}></div>
                                <span className="absolute -bottom-6 text-blue-900 font-bold text-xs">IOTA Seoul</span>
                            </div>

                            {/* Reference Line (Tokyo) */}
                            <div className={`absolute top-[30px] left-0 w-full border-t-2 border-dashed border-red-400 transition-all duration-700 delay-700 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                                <span className="absolute -top-5 right-0 text-red-500 text-[11px] font-bold bg-white px-1">
                                    {lang === 'kr' ? '도쿄 마루노우치 갭 (~40%)' : 'Tokyo Marunouchi Gap (~40%)'}
                                </span>
                            </div>
                        </div>

                        <p className="text-[16px] text-gray-700 mt-6 font-bold break-keep bg-gray-100 p-3 rounded-md">
                            {lang === 'kr' ? 'GTX 교차 및 럭셔리 복합시설 결합으로 도쿄 마루노우치 수준의 초격차 프리미엄 실현' : 'Expect an ultra-gap premium comparable to Tokyo Marunouchi, driven by GTX and luxury mixed-use integration.'}
                        </p>
                    </div>

                    {/* Right: Exit Options (Clean Blocks instead of SVG Tree) */}
                    <div className={`lg:col-span-7 bg-[#1d1d1f] rounded-xl shadow-lg border border-gray-700 p-6 flex flex-col transition-all duration-700 delay-200 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="mb-4">
                            <div className="text-gray-400 font-black text-[16px] tracking-widest uppercase mb-1">4.4 & 4.5 EXIT OPTIONALITY</div>
                            <h3 className="text-white font-bold text-[24px] leading-tight break-keep">
                                {lang === 'kr' ? '안정화 이후 자본 회수 옵션' : 'Post-Stabilization Exit Options'}
                            </h3>
                        </div>

                        {/* Clean Blocks vertically aligned */}
                        <div className="flex-1 w-full flex flex-col justify-center gap-3">
                            
                            {/* Option 1 */}
                            <div className={`w-full bg-blue-900 border-l-8 border-blue-400 rounded-lg p-4 shadow-[0_0_15px_rgba(59,130,246,0.2)] flex items-center justify-between transition-all duration-500 delay-500 ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                                <div className="text-white">
                                    <div className="text-blue-200 text-[13px] font-bold mb-0.5">OPTION A</div>
                                    <div className="font-extrabold text-[20px]">
                                        {lang === 'kr' ? '글로벌 코어 펀드 매각' : 'Global Core Fund Sale'}
                                    </div>
                                    <div className="text-blue-100 text-sm mt-0.5">{lang === 'kr' ? 'GIC, Allianz 등 우량 기관 대상' : 'To blue-chip institutions (GIC, Allianz)'}</div>
                                </div>
                            </div>
                            
                            {/* Option 2 */}
                            <div className={`w-full bg-gray-700 border-l-8 border-gray-400 rounded-lg p-4 shadow-lg flex items-center justify-between transition-all duration-500 delay-700 ${step >= 5 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                                <div className="text-white">
                                    <div className="text-gray-300 text-[13px] font-bold mb-0.5">OPTION B</div>
                                    <div className="font-extrabold text-[20px]">
                                        {lang === 'kr' ? '영구 보유 (Permanent Hold)' : 'Permanent Hold'}
                                    </div>
                                    <div className="text-gray-200 text-sm mt-0.5">{lang === 'kr' ? '도쿄역 GranSta 모델 (Trophy Asset 유지)' : 'Tokyo GranSta Model (Maintain Trophy)'}</div>
                                </div>
                            </div>

                            {/* Option 3 */}
                            <div className={`w-full bg-gradient-to-r from-blue-700 to-cyan-600 border-l-8 border-cyan-300 rounded-lg p-4 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-between transition-all duration-500 delay-900 ${step >= 6 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                                <div className="text-white">
                                    <div className="text-cyan-100 text-[13px] font-bold mb-0.5">OPTION C (BASE CASE)</div>
                                    <div className="font-black text-[22px]">
                                        {lang === 'kr' ? 'IOTA Office REIT IPO 분사' : 'IOTA Office REIT IPO'}
                                    </div>
                                    <div className="text-white font-bold text-sm mt-0.5">{lang === 'kr' ? '5~7조 원 규모의 단일 최대 리츠 상장' : '5-7T KRW Scale single largest REIT'}</div>
                                </div>
                                <div className="bg-white text-blue-900 px-3 py-1 rounded-full font-bold text-xs">Best Scenario</div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom text */}
                <div className={`w-full text-center transition-all duration-[612ms] delay-[122ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-block bg-[#1e3a8a] text-white px-6 py-3 rounded-md border border-blue-900 text-[18px] md:text-[20px] font-bold shadow-lg break-keep">
                        {lang === 'kr' ? 
                            (lang === 'kr' ? '단일 최대 리츠 상장 가능성과 글로벌 자본의 초우량 엑시트 옵션 확보' : 'Possibility of listing the single largest REIT and securing prime exit options for global capital') : 
                            'Securing the potential for the largest single REIT listing and prime exit options for global capital'}
                    </div>
                </div>
            </div>
        </section>
    );
}
