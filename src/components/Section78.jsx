import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section78({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918),
            setTimeout(() => setStep(4), 1300),
            setTimeout(() => setStep(5), 1683)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? 'KOSPI 10,000을 향한 Base 우상향' : 'Base Upward Trend Towards KOSPI 10,000'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-5 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>이익 성장과 밸류업이 창출할 자본시장의 거대한 체력 증진</> : <>Massive Structural Strengthening via Profit Growth & Value-up</>}
                </h2>

                {/* 3-Step Upward Timeline */}
                <div className="flex flex-col md:flex-row items-end justify-center gap-4 w-full max-w-[1000px] h-[280px] md:h-[320px] relative border-b-[3px] border-[#1e3a8a] mb-8">
                    
                    {/* Step 1: 2030 */}
                    <div className={`flex-1 w-full flex flex-col items-center justify-end relative transition-all duration-[540ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="w-full max-w-[280px] bg-indigo-100 border-t-4 border-indigo-400 flex flex-col items-center justify-start py-6 px-4 rounded-t-xl" style={{ height: '110px' }}>
                            <div className="text-[18px] font-bold text-indigo-900 mb-1">2030</div>
                            <div className="text-[28px] md:text-[32px] font-black text-indigo-800 leading-none">5,500<span className="text-[20px] font-bold text-indigo-500 mx-1">~</span>6,500</div>
                        </div>
                    </div>

                    {/* Step 2: 2035 */}
                    <div className={`flex-1 w-full flex flex-col items-center justify-end relative transition-all duration-[540ms] delay-[153ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="w-full max-w-[280px] bg-indigo-500 border-t-4 border-indigo-700 flex flex-col items-center justify-start py-6 px-4 rounded-t-xl" style={{ height: '180px' }}>
                            <div className="text-[18px] font-bold text-indigo-100 mb-1">2035</div>
                            <div className="text-[28px] md:text-[34px] font-black text-white leading-none">7,500<span className="text-[20px] font-bold text-indigo-300 mx-1">~</span>9,000</div>
                        </div>
                    </div>

                    {/* Step 3: 2040 */}
                    <div className={`flex-1 w-full flex flex-col items-center justify-end relative transition-all duration-[540ms] delay-400 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="w-full max-w-[280px] bg-[#1e3a8a] border-t-4 border-[#0f172a] flex flex-col items-center justify-start py-6 px-4 shadow-2xl rounded-t-xl" style={{ height: '260px' }}>
                            <div className="text-[20px] font-black text-indigo-200 mb-1">2040</div>
                            <div className="text-[28px] md:text-[34px] font-black text-white leading-none tracking-tight">9,000<span className="text-[20px] font-bold text-indigo-400 mx-1">~</span>11,000</div>
                            
                            <div className="mt-auto mb-2 bg-white/10 backdrop-blur-md text-white text-[14px] font-bold px-4 py-2 rounded-full border border-white/20">
                                {lang === 'kr' ? 'Korea Premium 진입' : 'Entry into Korea Premium'}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Thesis Text */}
                <div className={`max-w-[1000px] bg-indigo-50 border border-indigo-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[18px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed mb-4">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? 'PER 13배 디스카운트 해소 및 2040년 KOSPI 9,000~11,000 도달. 코리아 프리미엄 진입을 위한 안정적 Base 성장 모델' : 'Resolution of PER 13x discount and reaching KOSPI 9,000-11,000 by 2040. Stable Base growth model for entering Korea Premium.')
                            : 'Stable Base growth model for Korea Premium entry, resolving PER 13x discount to reach KOSPI 9,000~11,000 by 2040.'
                        }
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[15px] md:text-[16px] font-bold text-indigo-800">
                        <span className="bg-white px-4 py-1.5 rounded-full shadow-sm">{lang === 'kr' ? '전제 1: PER 13~15배' : 'Premise 1: PER 13~15x'}</span>
                        <span className="bg-white px-4 py-1.5 rounded-full shadow-sm">{lang === 'kr' ? '전제 2: 기업이익 연 7~9% 성장' : 'Premise 2: Corp Profit 7~9% CAGR'}</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
