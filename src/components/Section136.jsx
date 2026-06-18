import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section136({ isActive }) {
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
                            {lang === 'kr' ? '상징성 및 강력한 브랜드 파급력' : 'Symbolism & Powerful Brand Effect'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[46px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '단일 빌딩을 넘어 서울의 정체성을 정의하는 랜드마크' : 'Beyond a Single Building: A Landmark Defining Seoul\'s Identity'}
                    </h2>
                </div>

                {/* Content: 1x2 Grid */}
                <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-[36px]">
                    
                    {/* Left: Diagram */}
                    <div className={`lg:col-span-7 flex flex-col transition-all duration-700 delay-300 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="w-full h-full bg-white border border-gray-200 shadow-lg p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[350px]">
                            
                            <h3 className="text-[22px] font-bold text-gray-800 mb-6 w-full text-left border-b-2 border-gray-100 pb-4">
                                {lang === 'kr' ? '단일 빌딩을 넘어선 블록 스케일 패러다임' : 'Beyond Single Buildings to Block-Scale Paradigm'}
                            </h3>
                            
                            <div className="w-full flex items-end justify-center gap-8 px-4 py-4">
                                
                                {/* 1T Era */}
                                <div className="flex flex-col items-center opacity-70">
                                    <div className="text-[18px] font-black text-gray-500 mb-3 uppercase">{lang === 'kr' ? '1조 달러 시대' : '$1T Era'}</div>
                                    <div className="w-40 h-40 bg-gray-200 border-b-4 border-gray-400 flex items-center justify-center">
                                        <div className="text-gray-700 font-black text-center">
                                            <div className="text-[24px] mb-1">IFC</div>
                                            <div className="text-[15px] font-medium">{lang === 'kr' ? '단일 빌딩 한계' : 'Single Building Limit'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="text-gray-400 text-4xl font-black pb-12">→</div>

                                {/* 4-5T Era */}
                                <div className="flex flex-col items-center">
                                    <div className="text-[18px] font-black text-[#1e3a8a] mb-3 uppercase">{lang === 'kr' ? '3조 → 4~5조 달러 경제 도약기' : 'Leap to $3T → $4-5T Economy'}</div>
                                    <div className="w-64 h-64 bg-blue-50 border-[6px] border-[#1e3a8a] flex flex-col items-center justify-center shadow-xl relative">
                                        <div className="absolute top-0 w-full h-5 bg-[#1e3a8a]"></div>
                                        <div className="text-[#1e3a8a] font-black text-[38px] text-center mt-3">
                                            <div>IOTA</div>
                                        </div>
                                        <div className="text-gray-800 font-bold text-[18px] text-center px-4 mt-4 break-keep leading-snug">
                                            {lang === 'kr' ? '향후 50년, 서울의 정체성을 정의하는 랜드마크' : 'Landmark Defining Seoul\'s Identity for the Next 50 Years'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className={`lg:col-span-5 flex flex-col transition-all duration-700 delay-500 ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-8 flex flex-col justify-center shadow-xl h-full">
                            <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[12px] uppercase break-keep leading-tight">
                                {lang === 'kr' ? '서울의 정체성을 정의하는 랜드마크' : 'A Landmark Defining Seoul\'s Identity'}
                            </div>
                            
                            <h3 className="text-gray-900 font-bold text-[32px] md:text-[36px] mb-[20px] leading-snug break-keep">
                                {lang === 'kr' ? '도시 브랜드 파급력' : 'City Brand Effect'}
                            </h3>
                            
                            <p className="text-[18px] md:text-[20px] text-gray-700 font-medium leading-relaxed break-keep tracking-tight mb-6">
                                {lang === 'kr' ? '향후 50년 후 한국이 4~5조 달러 경제로 도약할 때, IOTA는 도쿄 미드타운이나 록폰기 힐스가 만든 강력한 도시 브랜드 이펙트와 동급의 상징물' : 'As Korea leaps to a $4-5T economy in the next 50 years, IOTA will remain a symbol with a powerful city brand effect equal to Tokyo Midtown or Roppongi Hills.'}
                            </p>

                            <div className="bg-gray-100 p-6 border-l-4 border-[#1e3a8a]">
                                <p className="text-[18px] md:text-[20px] text-gray-800 font-bold leading-relaxed break-keep">
                                    {lang === 'kr' ? '단순한 부동산 개발이 아닌, 한국의 새로운 시대를 여는 도시 창조 과정' : 'Not just real estate development, but a process of city creation that opens a new era for Korea.'}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom text */}
                <div className={`w-full text-center mt-2 transition-all duration-[612ms] delay-[122ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-block bg-[#1e3a8a] text-white px-8 py-5 text-[20px] md:text-[22px] font-bold shadow-lg break-keep">
                        {lang === 'kr' ? 
                            '이지스가 단순 자산운용사가 아니라 도시를 만든 자본으로 한국 및 아시아 자본시장사에 기록될 단일 최대 프로젝트' : 
                            'IGIS will be recorded in Asian capital market history not just as an asset manager, but as the capital that built the city through this single largest project.'}
                    </div>
                </div>

            </div>
        </section>
    );
}
