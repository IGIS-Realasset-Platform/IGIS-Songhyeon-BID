import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section135({ isActive }) {
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
                            {lang === 'kr' ? '도심 권역의 장기 Stewardship 모델' : 'Long-term Stewardship of Urban Districts'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[46px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '단순 ROI를 넘어 세대를 건너는 자본 순환의 시작' : 'Beyond ROI: The Start of a Cross-Generational Capital Cycle'}
                    </h2>
                </div>

                {/* Content: 1x2 Grid */}
                <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-[36px]">
                    
                    {/* Left: Diagram */}
                    <div className={`lg:col-span-7 flex flex-col transition-all duration-700 delay-300 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="w-full h-full bg-white border border-gray-200 shadow-lg p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[350px]">
                            
                            <h3 className="text-[22px] font-bold text-gray-800 mb-6 w-full text-left border-b-2 border-gray-100 pb-4">
                                {lang === 'kr' ? '단일 디벨로퍼의 30~50년 권역 마스터플랜 사례' : '30-50 Year District Masterplans by Single Developers'}
                            </h3>
                            
                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Tokyo */}
                                <div className="flex flex-col items-center text-center p-6 bg-gray-50 border border-gray-200 rounded-lg">
                                    <div className="w-20 h-20 rounded-full bg-white border-[4px] border-[#1e3a8a] flex items-center justify-center mb-4 shadow-sm">
                                        <span className="font-black text-[#1e3a8a] text-lg">TOKYO</span>
                                    </div>
                                    <div className="font-bold text-gray-800 text-[20px] mb-2">{lang === 'kr' ? '마루노우치' : 'Marunouchi'}</div>
                                    <div className="text-[16px] text-gray-600 font-medium">{lang === 'kr' ? '미츠비시 지소 주도' : 'Led by Mitsubishi Estate'}</div>
                                </div>
                                
                                {/* London */}
                                <div className="flex flex-col items-center text-center p-6 bg-gray-50 border border-gray-200 rounded-lg">
                                    <div className="w-20 h-20 rounded-full bg-white border-[4px] border-[#1e3a8a] flex items-center justify-center mb-4 shadow-sm">
                                        <span className="font-black text-[#1e3a8a] text-lg">LONDON</span>
                                    </div>
                                    <div className="font-bold text-gray-800 text-[20px] mb-2">King's Cross</div>
                                    <div className="text-[16px] text-gray-600 font-medium">{lang === 'kr' ? '아르젠트(Argent)' : 'Argent Group'}</div>
                                </div>

                                {/* NY */}
                                <div className="flex flex-col items-center text-center p-6 bg-gray-50 border border-gray-200 rounded-lg">
                                    <div className="w-20 h-20 rounded-full bg-white border-[4px] border-[#1e3a8a] flex items-center justify-center mb-4 shadow-sm">
                                        <span className="font-black text-[#1e3a8a] text-lg">NY</span>
                                    </div>
                                    <div className="font-bold text-gray-800 text-[20px] mb-2">Hudson Yards</div>
                                    <div className="text-[16px] text-gray-600 font-medium">{lang === 'kr' ? '릴레이티드' : 'Related Companies'}</div>
                                </div>
                            </div>
                            
                            <div className="w-full mt-8 bg-[#1e3a8a] text-white p-5 flex flex-col items-center justify-center font-bold text-center">
                                <div className="text-[15px] opacity-80 mb-2 uppercase tracking-widest">Global Common Pattern</div>
                                <div className="text-[18px]">{lang === 'kr' ? '한 운용사·디벨로퍼가 한 도시의 권역을 세대에 걸쳐 Stewardship' : 'A single developer stewarding a city district across generations'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className={`lg:col-span-5 flex flex-col transition-all duration-700 delay-500 ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-10 flex flex-col justify-center shadow-xl h-full">
                            <div className="text-[#1e3a8a] font-black text-[22px] md:text-[24px] mb-[8px] uppercase break-keep leading-tight">
                                {lang === 'kr' ? '세대를 건너는 Capital Cycle' : 'Cross-Generational Capital Cycle'}
                            </div>
                            
                            <h3 className="text-gray-900 font-bold text-[32px] md:text-[36px] mb-[20px] leading-snug break-keep">
                                {lang === 'kr' ? '도시와 자본의 상생' : 'Coexistence of City and Capital'}
                            </h3>
                            
                            <p className="text-[18px] md:text-[20px] text-gray-700 font-medium leading-relaxed break-keep tracking-tight mb-8">
                                {lang === 'kr' ? '단순히 건물을 짓고 파는 모델이 아닌, 30년~50년에 걸쳐 도심 공간을 지속적으로 관리하고 진화시키는 장기 Stewardship 모델' : 'A long-term Stewardship model that continuously manages and evolves urban spaces over 30-50 years, not just building and selling.'}
                            </p>

                            <div className="bg-gray-100 p-6 border-l-4 border-[#1e3a8a]">
                                <p className="text-[18px] md:text-[20px] text-gray-800 font-bold leading-relaxed break-keep">
                                    {lang === 'kr' ? '뉴욕 릴레이티드나 런던 아르젠트처럼, IOTA는 이지스가 단순한 개발 주체를 넘어 서울을 관리하는 장기적인 파트너로 거듭나는 시발점' : 'Like NY\'s Related or London\'s Argent, IOTA marks the beginning of IGIS becoming a long-term partner managing Seoul beyond a simple developer.'}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
