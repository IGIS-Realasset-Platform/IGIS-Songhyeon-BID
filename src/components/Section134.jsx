import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section134({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 184),
            setTimeout(() => setStep(2), 551),
            setTimeout(() => setStep(3), 918),
            setTimeout(() => setStep(4), 1285)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-white flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1500px] mx-auto flex flex-col justify-center items-center h-full">
                
                {/* Header */}
                <div className="w-full flex flex-col items-center text-center mb-[36px]">
                    <div className={`transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                            {lang === 'kr' ? '4대 변곡점과 IOTA' : 'The 4 Inflection Points & IOTA'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[46px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '1조 → 2조 달러 시대를 정의하는 새로운 트로피' : 'The New Defining Trophy of the $1T to $2T Era'}
                    </h2>
                </div>

                {/* Content: 1x2 Grid (Infographic + Text) */}
                <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                    
                    {/* Left: Infographic */}
                    <div className={`lg:col-span-6 flex flex-col transition-all duration-700 delay-300 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="w-full h-full bg-white border border-gray-200 shadow-lg p-8 relative overflow-hidden flex flex-col justify-center">
                            <div className="absolute top-0 left-0 w-2 h-full bg-[#1e3a8a]"></div>
                            
                            <h3 className="text-[20px] font-bold text-gray-800 mb-6 border-b-2 border-gray-100 pb-3">
                                {lang === 'kr' ? '글로벌 패권과 시대적 변곡점' : 'Global Hegemony & Historical Inflection Points'}
                            </h3>
                            
                            <div className="flex flex-col gap-5 relative">
                                {/* Vertical Timeline Line */}
                                <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-gray-200"></div>
                                
                                {/* Item 1 */}
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full border-[3px] border-gray-300 flex items-center justify-center font-bold text-gray-500 text-[16px] shrink-0">18C</div>
                                    <div className="bg-gray-50 p-4 rounded-lg flex-1 border border-gray-200">
                                        <div className="font-bold text-gray-800 text-[18px] mb-2">{lang === 'kr' ? '산업혁명' : 'Industrial Revolution'}</div>
                                        <div className="text-[16px] text-gray-600 font-medium leading-snug">{lang === 'kr' ? '증기기관 → 단일 기술 변곡점이 글로벌 패권 형성' : 'Steam Engine → Single tech inflection point forming global hegemony'}</div>
                                    </div>
                                </div>
                                
                                {/* Item 2 */}
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full border-[3px] border-gray-300 flex items-center justify-center font-bold text-gray-500 text-[16px] shrink-0">20C</div>
                                    <div className="bg-gray-50 p-4 rounded-lg flex-1 border border-gray-200">
                                        <div className="font-bold text-gray-800 text-[16px] mb-1">{lang === 'kr' ? '냉전기 (미·소)' : 'Cold War (US/USSR)'}</div>
                                        <div className="text-[15px] text-gray-600 font-medium leading-snug">{lang === 'kr' ? '핵무기·우주산업 → 새로운 지정학 형성' : 'Nuclear/Space tech → Forming new geopolitics'}</div>
                                    </div>
                                </div>

                                {/* Item 3 (Highlight) */}
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="w-12 h-12 bg-[#1e3a8a] rounded-full border-[3px] border-[#1e3a8a] flex items-center justify-center font-bold text-white text-[16px] shrink-0 shadow-md">21C</div>
                                    <div className="bg-blue-50/50 p-4 rounded-lg flex-1 border-2 border-[#1e3a8a] shadow-sm">
                                        <div className="font-bold text-[#1e3a8a] text-[20px] mb-2">{lang === 'kr' ? '대한민국 4대 변곡점' : 'Korea\'s 4 Inflection Points'}</div>
                                        <div className="text-[18px] font-black text-gray-900 tracking-tight">
                                            {lang === 'kr' ? 'AI · 반도체 · 문화 · 인구' : 'AI · Semiconductors · Culture · Population'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className={`lg:col-span-6 flex flex-col transition-all duration-700 delay-500 ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-8 flex flex-col justify-center shadow-xl h-full">
                            <div className="text-[#1e3a8a] font-black text-[22px] md:text-[24px] mb-[8px] uppercase break-keep leading-tight">
                                {lang === 'kr' ? '1조 → 2조 달러 시대의 마침표' : 'The Conclusion of the $1T to $2T Era'}
                            </div>
                            
                            <h3 className="text-gray-900 font-bold text-[28px] md:text-[32px] mb-[16px] leading-snug break-keep">
                                {lang === 'kr' ? '새로운 랜드마크의 탄생' : 'Birth of a New Landmark'}
                            </h3>
                            
                            <p className="text-[16px] md:text-[18px] text-gray-700 font-medium leading-relaxed break-keep tracking-tight mb-6">
                                {lang === 'kr' ? '대한민국이 4대 변곡점을 지나며 맞이하는 새로운 시대. IOTA는 한국이 단일 빌딩 개발을 넘어 블록 스케일의 도시 개발로 도약하는 상징적 전환점' : 'A new era as Korea passes 4 inflection points. IOTA is a symbolic turning point leaping beyond single-building development into block-scale urban development.'}
                            </p>

                            <div className="bg-gray-100 p-5 border-l-4 border-[#1e3a8a]">
                                <p className="text-[16px] md:text-[18px] text-gray-800 font-bold leading-relaxed break-keep">
                                    {lang === 'kr' ? '단순한 자산 가치를 넘어 국가 경제의 스케일업을 증명할 거대한 패러다임 시프트의 최전선' : 'The frontline of a massive paradigm shift that proves the scale-up of the national economy beyond simple asset value.'}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
