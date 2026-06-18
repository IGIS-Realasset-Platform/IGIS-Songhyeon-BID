import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section81({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 979),
            setTimeout(() => setStep(4), 1438),
            setTimeout(() => setStep(5), 2050)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#1d1d1f] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            
            {/* Background subtle effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#2d2d30] to-transparent opacity-50"></div>

            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center relative z-10">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#fcd34d] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? 'KOSPI 상승이 촉발할 부동산 리레이팅' : 'Real Estate Rerating Triggered by KOSPI Surge'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-white break-keep tracking-[-0.02em] mb-16 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>주식 PER 팽창이 트로피 자산의 캡레이트 압축과<br/>가치 급등을 강제하는 연쇄 효과</> : <>Chain Effect: Stock PER Expansion Forcing Trophy Asset Cap Rate Compression & Value Surge</>}
                </h2>

                {/* 3-Step Flow Chart */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-[1200px] mb-16">
                    
                    {/* Step 1 */}
                    <div className={`flex flex-col items-center justify-center w-full md:w-[30%] bg-white/10 border border-white/20 p-8 rounded-2xl backdrop-blur-md transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 text-white text-[28px]">📈</div>
                        <h3 className="text-white font-black text-[24px] md:text-[28px] mb-3 leading-tight">{lang === 'kr' ? '주식 PER 상승' : 'Stock PER Expansion'}</h3>
                        <p className="text-gray-400 font-medium text-[16px] md:text-[18px]">
                            {lang === 'kr' ? 'KOSPI 5,000 이미 달성 완료, 코리아 프리미엄 시작 (컨센서스 이동)' : 'KOSPI 5,000 achieved, Korea Premium begins (Consensus shift)'}
                        </p>
                    </div>

                    {/* Arrow 1 */}
                    <div className={`text-[#fcd34d] text-[40px] md:text-[50px] transform rotate-90 md:rotate-0 transition-all duration-[383ms] ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        ➔
                    </div>

                    {/* Step 2 */}
                    <div className={`flex flex-col items-center justify-center w-full md:w-[30%] bg-white/10 border border-white/20 p-8 rounded-2xl backdrop-blur-md transition-all duration-[765ms] delay-[117ms] ${step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-6 text-white text-[28px]">⏬</div>
                        <h3 className="text-white font-black text-[24px] md:text-[28px] mb-3 leading-tight">{lang === 'kr' ? '부동산 캡레이트 압축' : 'Real Estate Cap Rate Compression'}</h3>
                        <p className="text-gray-400 font-medium text-[16px] md:text-[18px]">
                            {lang === 'kr' ? '자본 시장 팽창이 실물 자산의 요구 수익률(Cap Rate)을 강력하게 끌어내림' : 'Capital market expansion forcefully drags down required returns (Cap Rate) of real assets'}
                        </p>
                    </div>

                    {/* Arrow 2 */}
                    <div className={`text-[#fcd34d] text-[40px] md:text-[50px] transform rotate-90 md:rotate-0 transition-all duration-[383ms] ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                        ➔
                    </div>

                    {/* Step 3 */}
                    <div className={`flex flex-col items-center justify-center w-full md:w-[30%] bg-gradient-to-br from-[#fcd34d] to-[#f59e0b] border-2 border-yellow-300 p-8 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-[765ms] delay-[230ms] ${step >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 text-[#f59e0b] text-[28px]">🏆</div>
                        <h3 className="text-[#1d1d1f] font-black text-[24px] md:text-[28px] mb-3 leading-tight">{lang === 'kr' ? '트로피 자산 가치 상승' : 'Trophy Asset Value Surge'}</h3>
                        <p className="text-[#1d1d1f] opacity-80 font-bold text-[16px] md:text-[18px]">
                            {lang === 'kr' ? '대규모 Valuation Lift 발생. 단일 최대 트로피 자산의 Re-rating 본격화' : 'Massive Valuation Lift occurs. Re-rating of single largest trophy assets in full swing'}
                        </p>
                    </div>

                </div>

                {/* Bottom Thesis Text */}
                <div className={`max-w-[1000px] border-t border-white/20 pt-8 transition-all duration-[765ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="text-[24px] md:text-[32px] font-black text-white tracking-wide">
                        {lang === 'kr' ? (
                            <>
                                {lang === 'kr' ? <><span className="text-[#fcd34d]">주가 상승</span> = 코리아 프리미엄 = <span className="text-[#fcd34d]">캡레이트 하락</span></> : <><span className="text-[#fcd34d]">Stock Rise</span> = Korea Premium = <span className="text-[#fcd34d]">Cap Rate Drop</span></>}
                            </>
                        ) : (
                            <>
                                <span className="text-[#fcd34d]">Stock Surge</span> = Korea Premium = <span className="text-[#fcd34d]">Cap Rate Drop</span>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}
