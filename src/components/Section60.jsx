import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section60({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 689),
            setTimeout(() => setStep(3), 995),
            setTimeout(() => setStep(4), 1378),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? '인구 역설이 창출할 자본의 대이동' : 'Great Capital Shift via Demographic Paradox'}</span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>가계 자산의 유동화가 열어젖힐<br/>자산운용 및 시니어 하우징 수요의 빅뱅</> : <>Big bang in AM & Senior Housing demand<br/>unlocked by household asset securitization</>}
                </h2>

                {/* Custom Infographic: Capital Flow Diagram */}
                <div className="w-full max-w-[1100px] mt-[50px] mb-[40px] flex flex-col lg:flex-row items-center justify-between gap-6">
                    
                    {/* Catalyst */}
                    <div className={`w-full lg:w-[35%] bg-black p-10 flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="text-[20px] font-bold text-gray-400 mb-2">{lang === 'kr' ? '인구 감소의 역설' : 'Demographic Paradox'}</div>
                        <h3 className="text-[34px] font-black leading-tight text-center">{lang === 'kr' ? <>가계 자산의<br/>대규모 유동화</> : <>Massive Household<br/>Asset Liquidity</>}</h3>
                        <p className="mt-6 text-gray-300 font-medium">{lang === 'kr' ? '부동산 및 금융 자산 처분 가속' : 'Accelerated RE & Financial Asset Disposal'}</p>
                    </div>

                    {/* Arrow */}
                    <div className={`hidden lg:flex flex-col items-center justify-center transition-all duration-[765ms] delay-[153ms] ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <div className="w-[80px] h-[80px] bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-300">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                    </div>

                    {/* Results */}
                    <div className={`w-full lg:w-[50%] flex flex-col gap-4 transition-all duration-[765ms] delay-400 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="w-full bg-blue-50 border-l-[8px] border-y-[2px] border-r-[2px] border-l-blue-600 border-y-blue-200 border-r-blue-200 py-6 px-8 flex items-center shadow-sm">
                            <div className="text-[28px] font-black text-blue-900">{lang === 'kr' ? '자산운용 산업으로의 폭발적 자본 이전' : 'Explosive Capital Transfer to Asset Mgt'}</div>
                        </div>
                        <div className="w-full bg-green-50 border-l-[8px] border-y-[2px] border-r-[2px] border-l-green-600 border-y-green-200 border-r-green-200 py-6 px-8 flex items-center shadow-sm">
                            <div className="text-[28px] font-black text-green-900">{lang === 'kr' ? '시니어 하우징 및 헬스케어 수요 빅뱅' : 'Big Bang in Senior Housing & Healthcare'}</div>
                        </div>
                        <div className="w-full bg-gray-100 border-[2px] border-gray-300 p-4 text-center mt-2">
                            <span className="font-bold text-gray-600">{lang === 'kr' ? '💡 글로벌 벤치마크: 일본 \'잃어버린 30년\'의 신규 시장 패턴과 유사' : '💡 Global Benchmark: Similar to Japan\'s New Market Patterns in Lost 30 Yrs'}</span>
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '거시 양면성: 노동력 부족이라는 부정 효과와 시니어 하우징 등 신규 시장 창출 효과 병존' : 'Macro Duality: Negative labor shortage co-exists with new market creation'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span className="text-blue-900">{lang === 'kr' ? '가계의 부동산·금융 자산 처분이 자산운용 산업으로 이전되며 거대한 자본 대이동 발생' : 'Disposal of household assets shifts to AMC, causing massive capital movement'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '일본이 잃어버린 30년에도 자산운용·시니어 케어·인바운드 관광에서 새 시장을 만들어낸 패턴과 유사' : 'Similar to Japan creating new markets in AMC, Senior Care, and Inbound Tourism'}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
