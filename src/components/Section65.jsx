import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section65({ isActive }) {
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
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? 'Bull 시나리오의 도쿄 마루노우치 수렴' : 'Convergence with Tokyo Marunouchi in Bull Scenario'}</span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>평당 50만 원 시대, 글로벌 1선 도시의<br/>핵심부와 어깨를 나란히 하다</> : <>Era of 500K KRW/py,<br/>Standing shoulder to shoulder with Global Tier 1 Core</>}
                </h2>

                {/* Custom Infographic: Bull Scenario High Impact */}
                <div className="flex flex-col lg:flex-row w-full max-w-[1100px] mt-[60px] mb-[50px] gap-6 lg:gap-10">
                    {/* Left: Seoul Trophy */}
                    <div className={`flex-1 bg-white border-[6px] border-[#1d1d1f] p-10 flex flex-col justify-center items-center shadow-2xl relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="absolute -top-4 bg-[#1d1d1f] text-white px-6 py-1 font-black text-[16px] uppercase tracking-wider">2040 Bull Scenario</div>
                        <div className="text-[24px] font-bold text-gray-500 mb-2 mt-4">{lang === 'kr' ? 'IOTA·GBC 신규 트로피 자산' : 'IOTA/GBC New Trophy Assets'}</div>
                        <div className="flex items-end mt-4">
                            <span className="text-[90px] font-black text-[#1d1d1f] leading-none tracking-tighter">50</span>
                            <span className="text-[36px] font-black text-gray-800 mb-2 ml-2">{lang === 'kr' ? '만 원' : '0k KRW'}</span>
                        </div>
                        <div className="text-[18px] font-bold text-gray-500 mt-2">{lang === 'kr' ? '/ 평·월' : '/ py·mo'}</div>
                        <div className="w-full bg-gray-100 mt-8 p-4 font-bold text-gray-800 text-[22px] border-l-[6px] border-[#1d1d1f]">
                            {lang === 'kr' ? '환산 시 USD 200/sqft 돌파' : 'Exceeding USD 200/sqft upon conversion'}
                        </div>
                    </div>

                    {/* Equal Sign */}
                    <div className={`hidden lg:flex items-center justify-center transition-all duration-[765ms] delay-[153ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <div className="text-[60px] font-black text-gray-300">≒</div>
                    </div>

                    {/* Right: Tokyo Marunouchi */}
                    <div className={`flex-1 bg-[#1d1d1f] text-white border-[6px] border-[#1d1d1f] p-10 flex flex-col justify-center items-center shadow-2xl relative transition-all duration-[765ms] delay-[230ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="absolute -top-4 bg-yellow-500 text-black px-6 py-1 font-black text-[16px] uppercase tracking-wider">Global Benchmark</div>
                        <div className="text-[24px] font-bold text-gray-400 mb-2 mt-4">{lang === 'kr' ? '글로벌 최고 수준 핵심 권역' : 'Global Top-Tier Core'}</div>
                        <div className="text-[54px] font-black text-white leading-tight mt-4 text-center">
                            {lang === 'kr' ? <>도쿄<br/>마루노우치</> : <>Tokyo<br/>Marunouchi</>}
                        </div>
                        <div className="w-full border-t border-gray-700 mt-8 pt-6">
                            <div className="text-gray-300 font-bold text-[20px] text-center leading-snug">
                                {lang === 'kr' ? <>글로벌 1선 도시 코어 오피스와의<br/>임대료 디커플링(Decoupling) 완전 해소</> : <>Complete Resolution of Rent Decoupling<br/>with Global Tier 1 Core Offices</>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '가장 낙관적인 Bull 시나리오 발동 시, GBD 프라임은 2040년 38~42만 원 수준 도달 전망' : 'In most optimistic Bull Scenario, GBD Prime to reach 380k-420k KRW by 2040'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span className="text-[#1d1d1f]">{lang === 'kr' ? 'IOTA 및 GBC 트로피 자산은 2035년 35만 원을 거쳐 2040년 45~50만 원/평·월 시대 개막' : 'IOTA/GBC Trophies passing 350k in 2035 to open 450k-500k KRW/py era by 2040'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '이는 도쿄 마루노우치 코어 오피스의 상징적 저항선인 USD 200/sqft와 완전히 수렴하는 역사적 분기점' : 'A historic inflection point fully converging with Tokyo Marunouchi\'s USD 200/sqft resistance line'}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
