import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section66({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 979),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? '극단적 양극화를 방어하는 트로피 자산' : 'Trophy Assets Defending Extreme Polarization'}</span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>Bear 국면에서도 프리미엄을 사수할<br/>신규 랜드마크의 탁월한 자산 방어력</> : <>Excellent Asset Defense of New Landmarks<br/>Safeguarding Premium even in Bear Phase</>}
                </h2>

                {/* Custom Infographic: Polarization / Shield */}
                <div className="w-full max-w-[1100px] mt-[50px] mb-[40px] flex flex-col transition-all duration-[765ms]">
                    
                    <div className={`flex w-full justify-center transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-gray-800 text-white px-10 py-3 font-bold text-[20px] uppercase tracking-widest shadow-md">
                            {lang === 'kr' ? '2030년 정점 이후 인구·기업 통폐합 쇼크 (Bear Scenario)' : 'Pop/Corporate Consolidation Shock Post-2030 Peak (Bear Scenario)'}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row w-full items-stretch gap-6 mt-6">
                        {/* Losers */}
                        <div className={`flex-1 border-[4px] border-gray-300 bg-gray-50 py-4 px-10 flex flex-col items-center text-center transition-all duration-[765ms] delay-100 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                            <div className="text-[60px] mb-2 grayscale opacity-80">📉</div>
                            <div className="text-[28px] font-black text-gray-700 mb-1">{lang === 'kr' ? '가치 약세 및 횡보' : 'Value Weakness & Stagnation'}</div>
                            
                            <div className="text-[20px] font-bold text-gray-600 mt-2">{lang === 'kr' ? '일반 등급 클래스(Class B) 공실 누적' : 'General Grade (Class B) Vacancy Accumulation'}</div>
                            <div className="text-[20px] font-bold text-gray-600 mt-2">{lang === 'kr' ? 'CBD 일부 노후 자산 임대료 약세' : 'CBD Aging Asset Rent Weakness'}</div>
                        </div>

                        {/* Winners (Shield) */}
                        <div className={`flex-1 border-[6px] border-[#1d1d1f] bg-white py-4 px-10 flex flex-col items-center text-center shadow-2xl relative transition-all duration-[765ms] delay-[230ms] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                            <div className="absolute -top-5 bg-[#1d1d1f] text-white px-6 py-2 font-black text-[18px] uppercase tracking-wider">
                                Safe Haven
                            </div>
                            <div className="text-[60px] mb-2">🛡️</div>
                            <div className="text-[28px] font-black text-[#1d1d1f] mb-1">{lang === 'kr' ? '절대적 방어력 (프리미엄 사수)' : 'Absolute Defense (Premium Retained)'}</div>
                            
                            <div className="text-[22px] font-black text-[#1d1d1f] mt-2">{lang === 'kr' ? 'IOTA · GBC 신규 트로피 자산' : 'IOTA/GBC New Trophy Assets'}</div>
                            <div className="text-[18px] font-bold text-gray-700 mt-4 px-4">
                                {lang === 'kr' ? '거시 하방 충격에도 GBD·삼성동 코어 수요 집중으로 견고한 가격 유지' : 'Solid Pricing Maintained via Core Demand in GBD/Samsung-dong despite Macro Shock'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? 'Bear 시나리오 발동 시 2030년 정점 이후 인구 및 기업 본사 통폐합으로 전체 시장 임대료 횡보세 진입' : 'Under Bear scenario, market rents stagnate due to demographic/corp consolidation post-2030'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-gray-500">▪</span><span className="text-gray-600">{lang === 'kr' ? 'CBD 일부 자산은 노후화와 수요 이탈로 약세를 보이며 극단적 양극화 현상 심화' : 'Some CBD assets weaken from aging/demand flight, worsening extreme polarization'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span className="text-[#1d1d1f]">{lang === 'kr' ? '반면 IOTA 등 삼성동 신규 랜드마크는 핵심 코어 자산으로서 자본의 \'안전 도피처(Safe Haven)\' 역할을 수행' : 'Conversely, new landmarks like IOTA act as a Safe Haven for capital as core assets'}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
