import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section12({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

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
                        {lang === 'kr' ? '10대 산업 듀얼 엔진의 위력과 양면성' : 'Power & Duality of the Dual Engine'}
                    </span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? (
<>중후장대와 신성장 산업의 결합,<br/>그리고 심화된 단일 종목 종속성</>
                    ) : (
                        <>Combination of Heavy & New Growth Industries,<br/>And the Deepened Reliance on a Single Sector</>
                    )}
                </h2>

                {/* Infographic Dual Engine Architecture */}
                <div className="relative w-full max-w-[1020px] mt-[50px] h-[360px] flex items-center justify-between">
                    
                    {/* Left Engine: Traditional */}
                    <div className={`relative z-10 w-[310px] h-full flex flex-col items-center transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                        <div className="w-full bg-[#1e3a8a] text-white py-4 rounded-t-xl text-center shadow-lg">
                            <h3 className="text-[24px] font-black tracking-tight">{lang === 'kr' ? '5대 중후장대' : 'Top 5 Heavy Industries'}</h3>
                            <p className="text-[14px] font-medium text-blue-200">{lang === 'kr' ? '수출 제조업 슈퍼 사이클' : 'Export Manufacturing Supercycle'}</p>
                        </div>
                        <div className="w-full flex-1 bg-white border-2 border-t-0 border-[#1e3a8a] rounded-b-xl shadow-lg flex flex-col justify-center px-6 space-y-3">
                            {(lang === 'kr' ? ['반도체', '자동차', '조선', '석유화학', '철강'] : ['Semiconductors', 'Automobiles', 'Shipbuilding', 'Petrochemicals', 'Steel']).map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                                    <span className={`text-[18px] font-bold ${idx === 0 ? 'text-[#e11d48]' : 'text-gray-800'}`}>{item}</span>
                                    <div className="w-2 h-2 rounded-full bg-[#1e3a8a]"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Center Core: Semiconductor Reliance & Resilience */}
                    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center transition-all duration-[918ms] ease-out ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        {/* Connecting Lines */}
                        <div className="absolute top-1/2 left-[-160px] w-[160px] h-[4px] bg-gradient-to-r from-[#1e3a8a] to-[#e11d48] -translate-y-1/2 -z-10"></div>
                        <div className="absolute top-1/2 right-[-160px] w-[160px] h-[4px] bg-gradient-to-l from-[#4B7053] to-[#e11d48] -translate-y-1/2 -z-10"></div>
                        
                        {/* Core Circle */}
                        <div className="w-[200px] h-[200px] rounded-full bg-white border-[8px] border-[#e11d48] shadow-2xl flex flex-col items-center justify-center p-4">
                            <span className="text-[14px] font-bold text-gray-500 mb-1">{lang === 'kr' ? '거시적 양면성' : 'Macro Duality'}</span>
                            <span className="text-[24px] font-black text-[#e11d48] text-center leading-tight mb-2">
                                {lang === 'kr' ? <>반도체<br/>의존도 심화</> : <>Deepened<br/>Semiconductor Reliance</>}
                            </span>
                            <div className="w-full h-[1px] bg-gray-200 my-1"></div>
                            <span className="text-[16px] font-bold text-gray-800 text-center">
                                {lang === 'kr' ? <>높은 회복탄력성<br/>(Resilience)</> : <>High Resilience<br/>(Resilience)</>}
                            </span>
                        </div>
                    </div>

                    {/* Right Engine: New Growth */}
                    <div className={`relative z-10 w-[310px] h-full flex flex-col items-center transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
                        <div className="w-full bg-[#4B7053] text-white py-4 rounded-t-xl text-center shadow-lg">
                            <h3 className="text-[24px] font-black tracking-tight">{lang === 'kr' ? '5대 신성장' : 'Top 5 New Growth'}</h3>
                            <p className="text-[14px] font-medium text-green-200">{lang === 'kr' ? '신규 엔진 장착' : 'Equipping New Engines'}</p>
                        </div>
                        <div className="w-full flex-1 bg-white border-2 border-t-0 border-[#4B7053] rounded-b-xl shadow-lg flex flex-col justify-center px-6 space-y-3">
                            {(lang === 'kr' ? ['콘텐츠', '바이오', '2차전지', 'IT 플랫폼', '방산'] : ['Content', 'Biotech', 'EV Batteries', 'IT Platforms', 'Defense']).map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                                    <div className="w-2 h-2 rounded-full bg-[#4B7053]"></div>
                                    <span className="text-[18px] font-bold text-gray-800">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            

                {/* Description Text */}
                <div className={`mt-12 max-w-[1200px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === 'kr' ? <>1조 → 2조 달러 20년 구간의 본질은 <strong>"수출 제조업 슈퍼 사이클 + 신규 엔진 장착"</strong>임</> : <>The essence of the 20-year $1T to $2T period is <strong>"Export Manufacturing Super Cycle + New Engines"</strong></>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === 'kr' ? <><strong>5대 중후장대</strong>(반도체·자동차·조선 등)와 <strong>5대 신성장</strong>(콘텐츠·바이오 등)의 10대 산업 듀얼 엔진으로 확장됨</> : <>Expanded into a 10-industry dual engine of <strong>5 Heavy Industries</strong> (Semiconductors, Auto, Shipbuilding) and <strong>5 New Growth Industries</strong> (Content, Bio, etc.)</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === 'kr' ? <>단일 동력원에 의존하지 않아 높은 <strong>회복탄력성(Resilience)</strong>을 입증함</> : <>Proven high <strong>Resilience</strong> by not relying on a single power source</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === 'kr' ? <>반대로 <strong>반도체 단일 종목에 대한 의존도 심화</strong>라는 거시적 양면성도 함께 가짐</> : <>Conversely, accompanied by the macroeconomic duality of <strong>deepened dependency on a single semiconductor sector</strong></>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>The essence of the 20-year transition from $1T to $2T is <strong>"Export Manufacturing Supercycle + New Engines"</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Expanded into a 10-industry dual engine: <strong>Top 5 Heavy</strong> (Semiconductors, Auto) and <strong>Top 5 New Growth</strong> (Content, Bio).</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Proven high <strong>resilience</strong> by avoiding dependence on a single power source.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Conversely, it holds the macro duality of <strong>deepened reliance on a single sector: Semiconductors</strong>.</span></li>
                            </>
                        )}
                    </ul>
                </div>
</div>
        </section>
    );
}
