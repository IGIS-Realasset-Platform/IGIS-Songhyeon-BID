import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section59({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 689),
            setTimeout(() => setStep(3), 995),
            setTimeout(() => setStep(4), 1301),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? '생산 인구 35% 증발의 충격파' : 'Shockwave of 35% Working-Age Pop Evaporation'}</span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>2035년 고령 비중 30% 돌파가 몰고 올<br/>잠재성장률 하방 압력</> : <>Downward pressure on potential growth<br/>driven by elderly pop exceeding 30% in 2035</>}
                </h2>

                {/* Custom Infographic: Dual Insight */}
                <div className="w-full max-w-[1100px] mt-[40px] mb-[30px] flex flex-col md:flex-row gap-8 justify-center">
                    
                    {/* Left: Aging Percentage */}
                    <div className={`flex-1 flex flex-col items-center bg-gray-50 border-[4px] border-gray-300 p-8 transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <h3 className="text-[24px] font-black text-black mb-8">{lang === 'kr' ? '고령 인구(65세 이상) 비중 급증' : 'Senior Pop (65+) Surge'}</h3>
                        <div className="flex w-full items-end justify-center gap-6 h-[180px]">
                            <div className="flex flex-col items-center w-[30%]">
                                <span className="font-bold text-gray-500 mb-2">20%</span>
                                <div className="w-full bg-gray-300 h-[60px]"></div>
                                <span className="mt-3 font-bold text-gray-600">2025</span>
                            </div>
                            <div className="flex flex-col items-center w-[30%]">
                                <span className="font-black text-black mb-2 text-[22px]">30%</span>
                                <div className="w-full bg-black h-[100px]"></div>
                                <span className="mt-3 font-black text-black">2035</span>
                            </div>
                            <div className="flex flex-col items-center w-[30%]">
                                <span className="font-bold text-gray-500 mb-2">33%</span>
                                <div className="w-full bg-gray-400 h-[120px]"></div>
                                <span className="mt-3 font-bold text-gray-600">2040</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Shrinking Workforce */}
                    <div className={`flex-1 flex flex-col items-center bg-gray-50 border-[4px] border-gray-300 p-8 transition-all duration-[765ms] delay-[153ms] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <h3 className="text-[24px] font-black text-gray-900 mb-8">{lang === 'kr' ? '생산가능인구(15~64세) 증발' : 'Working-age Pop (15-64) Evaporation'}</h3>
                        <div className="flex w-full items-center justify-between mt-4">
                            <div className="flex flex-col items-center">
                                <div className="w-[120px] h-[120px] bg-gray-200 rounded-full flex items-center justify-center border-4 border-gray-400">
                                    <span className="font-black text-gray-800 text-[24px]">{lang === 'kr' ? '3,738만' : '37.38M'}</span>
                                </div>
                                <span className="mt-4 font-bold text-gray-700">{lang === 'kr' ? '2020년' : '2020'}</span>
                            </div>
                            
                            <div className="flex flex-col items-center">
                                <span className="text-[32px] font-black text-gray-700 mb-1">📉 -35%</span>
                                <div className="h-[4px] w-[60px] bg-gray-600"></div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-[80px] h-[80px] bg-[#1d1d1f] rounded-full flex items-center justify-center shadow-lg">
                                    <span className="font-black text-white text-[18px]">{lang === 'kr' ? '2,419만' : '24.19M'}</span>
                                </div>
                                <span className="mt-4 font-black text-[#1d1d1f]">{lang === 'kr' ? '2050년' : '2050'}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '65세 이상 고령자 비중은 2025년 20%로 초고령사회 진입 후 2035년 30%를 돌파 전망' : 'Seniors (65+) to hit 20% by 2025, topping 30% by 2035'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '생산가능인구(15~64세)는 2020년 3,738만 명에서 2050년 2,419만 명으로 약 35% 증발' : 'Working-age pop drops from 37.38M in 2020 to 24.19M in 2050 (~35% drop)'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-red-600">▪</span><span className="text-red-900">{lang === 'kr' ? '극단적인 부양비 증가와 노동력 부족으로 거시 경제의 잠재성장률 하방 압력 가중' : 'Extreme dependency ratio & labor shortage adds downward macro pressure'}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
