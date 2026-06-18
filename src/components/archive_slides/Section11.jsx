import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section11({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) {
            setStep(20);
            return;
        }
        
        const t1 = setTimeout(() => setStep(1), 230); // Theme & Title
        const t2 = setTimeout(() => setStep(2), 765); // Node 1
        const t3 = setTimeout(() => setStep(3), 1132); // Node 2
        const t4 = setTimeout(() => setStep(4), 1591); // Node 3
        const t5 = setTimeout(() => setStep(5), 2050); // Intro Text
        
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* Theme */}
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '마침내 도달할 GDP 2조 달러 고지' : 'Reaching the $2 Trillion GDP Milestone'}
                    </span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? (
<>1조에서 2조 달러로 2배 성장,<br/>대한민국의 20년 도약</>
                    ) : (
                        <>Doubling from $1T to $2T,<br/>Korea's 20-Year Leap</>
                    )}
                </h2>

                {/* Growth Infographic */}
                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-between">
                    
                    {/* Small Box (2007) */}
                    <div className={`relative flex flex-col items-center justify-end transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-20'}`}>
                        <div className="text-center mb-1">
                            <span className="block text-[24px] font-black text-gray-400">2007</span>
                            <span className="block text-[14px] font-bold text-gray-500">{lang === 'kr' ? '1조 달러 돌파' : 'Passed $1 Trillion'}</span>
                        </div>
                        <div className="w-[140px] h-[140px] bg-gradient-to-t from-gray-200 to-gray-50 border border-gray-300 rounded-xl shadow-inner flex items-center justify-center">
                            <span className="text-[28px] font-black text-gray-600">$1T</span>
                        </div>
                    </div>

                    {/* Center Arrow & Multiplier */}
                    <div className={`flex flex-col items-center justify-center mb-[40px] transition-all duration-[612ms] ease-out ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="text-[32px] font-black text-[#e11d48] italic tracking-tighter mb-2">
                            {lang === 'kr' ? 'X 2.0 배' : 'X 2.0 Times'}
                        </div>
                        <div className="w-[300px] h-[3px] bg-gradient-to-r from-gray-300 via-[#e11d48] to-[#1e3a8a] relative">
                            {/* Arrow head */}
                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-[#1e3a8a]"></div>
                        </div>
                        <p className="mt-4 text-[14px] font-bold text-gray-500 bg-white px-4 py-1 rounded-full shadow-sm border border-gray-200">
                            {lang === 'kr' ? '경제 규모 2배 성장 (약 20년 소요)' : 'Economy Doubled in Size (Took Approx. 20 Yrs)'}
                        </p>
                    </div>

                    {/* Large Box (2025-2027) */}
                    <div className={`relative flex flex-col items-center justify-end transition-all duration-[918ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 4 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-32'}`}>
                        <div className="text-center mb-1">
                            <span className="block text-[32px] font-black text-[#1e3a8a]">2025~2027</span>
                            <span className="block text-[16px] font-bold text-[#e11d48]">{lang === 'kr' ? '2조 달러 달성 예상' : 'Expected to Hit $2 Trillion'}</span>
                        </div>
                        <div className="w-[220px] h-[220px] bg-gradient-to-tr from-[#1e3a8a] to-[#3b82f6] rounded-xl shadow-2xl flex flex-col items-center justify-center border-4 border-white">
                            <span className="text-[52px] font-black text-white drop-shadow-md">$2T</span>
                            <span className="mt-2 text-[14px] font-bold text-blue-100 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                {lang === 'kr' ? '명목 GDP: 약 2조 달러' : 'Nominal GDP: Approx. $2T'}
                            </span>
                        </div>
                    </div>

                </div>

            

                {/* Description Text */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === 'kr' ? <>2007년 1조 달러를 처음 돌파한 이후, <strong>약 20년 만에 2조 달러 고지 달성</strong>이 가시화됨.</> : <>After surpassing $1T in 2007, <strong>reaching the $2T mark in about 20 years</strong> is now visible.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === 'kr' ? <>글로벌 경제의 변동성 속에서도 국가 경제 규모가 <strong>2배로 성장하는 거대한 사이클</strong>을 완성함.</> : <>Completed a <strong>massive cycle of doubling the national economy</strong> despite global economic volatility.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === 'kr' ? '단순한 양적 성장을 넘어, 산업 구조의 다변화와 글로벌 경쟁력 강화를 동반한 질적 도약의 시기였음.' : 'Beyond quantitative growth, a period of qualitative leap accompanied by industrial diversification and global competitiveness enhancement.'}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>After breaking $1T in 2007, reaching the <strong>$2T milestone</strong> is now in sight after approx. 20 years.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Completed a massive cycle of <strong>doubling the national economy size</strong> despite global volatility.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>This period marked a qualitative leap, accompanied by industrial diversification and enhanced global competitiveness.</span></li>
                            </>
                        )}
                    </ul>
                </div>
</div>
        </section>
    );
}
