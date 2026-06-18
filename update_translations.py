import os

files = {
    'src/components/Section10.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section10({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            return;
        }
        
        const t1 = setTimeout(() => setStep(1), 300); // Theme & Title
        const t2 = setTimeout(() => setStep(2), 1000); // Node 1
        const t3 = setTimeout(() => setStep(3), 1600); // Node 2
        const t4 = setTimeout(() => setStep(4), 2200); // Node 3
        const t5 = setTimeout(() => setStep(5), 2800); // Intro Text
        
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* Theme */}
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '[거시 경제] 1조 달러 시대의 개막과 담금질' : '[Macroeconomy] The Dawn and Forging of the $1 Trillion Era'}
                    </span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? (
                        <>2007년 KOSPI 2000 돌파와<br/>금융위기를 극복한 1조 경제의 안착</>
                    ) : (
                        <>Breaking KOSPI 2000 in 2007 and<br/>Settling the $1 Trillion Economy Post-Crisis</>
                    )}
                </h2>

                {/* Infographic Timeline */}
                <div className="relative w-full max-w-[1000px] mt-[40px] h-[380px] flex items-center justify-between">
                    
                    {/* Connecting Line ($1 Trillion Baseline) */}
                    <div className="absolute top-1/2 left-0 w-full border-t-[2px] border-dashed border-gray-400 -translate-y-1/2 z-0"></div>
                    <div className="absolute top-1/2 -left-[100px] -translate-y-1/2 z-10 bg-[#fdfdfd] pr-4">
                        <span className="inline-block text-[13px] font-bold text-gray-500 bg-white px-3 py-1 border border-gray-200 rounded-full shadow-sm">
                            {lang === 'kr' ? '$1 Trillion (명목 GDP 1조 달러 기준선)' : '$1 Trillion (Nominal GDP Baseline)'}
                        </span>
                    </div>
                    
                    <div className={`absolute top-1/2 left-0 h-[3px] bg-gradient-to-r from-[#1e3a8a] via-[#e11d48] to-[#1e3a8a] -translate-y-1/2 z-0 transition-all duration-[2000ms] ease-out`}
                         style={{ width: step >= 4 ? '100%' : step >= 3 ? '50%' : step >= 2 ? '10%' : '0%' }}></div>

                    {/* 2007 Node (Success) */}
                    <div className={`relative z-10 flex flex-col items-center transition-all duration-[800ms] ease-out w-1/3 -mt-[100px] ${step >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'}`}>
                        <div className="mb-4 text-center">
                            <span className="block text-[32px] font-black text-[#1e3a8a] tracking-tight">2007</span>
                            <span className="block text-[16px] font-bold text-gray-500">{lang === 'kr' ? '최초 1조 달러 돌파' : 'First $1T Breakthrough'}</span>
                        </div>
                        <div className="w-[24px] h-[24px] rounded-full bg-white border-[6px] border-[#1e3a8a] shadow-lg"></div>
                        <div className="mt-6 bg-white border border-gray-200 shadow-xl rounded-xl p-5 text-left w-[260px]">
                            <p className="text-[16px] font-bold text-gray-800 mb-2">{lang === 'kr' ? '핵심 지표' : 'Key Indicators'}</p>
                            <ul className="text-[14px] text-gray-600 space-y-2">
                                {lang === 'kr' ? (
                                    <>
                                        <li>• 명목 GDP: <span className="font-bold text-black">1.12조 달러</span></li>
                                        <li>• 1인당 GDP: <span className="font-bold text-black">2.4만 달러</span></li>
                                        <li>• KOSPI: <span className="font-bold text-black">최초 2,000선 돌파</span></li>
                                        <li>• OECD 평균 소득의 <span className="font-bold text-black">70% 달성</span></li>
                                    </>
                                ) : (
                                    <>
                                        <li>• Nominal GDP: <span className="font-bold text-black">$1.12 Trillion</span></li>
                                        <li>• GDP per capita: <span className="font-bold text-black">$24K</span></li>
                                        <li>• KOSPI: <span className="font-bold text-black">Broke 2,000 mark</span></li>
                                        <li>• Reached <span className="font-bold text-black">70%</span> of OECD avg</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* 2008 Node (Crisis) */}
                    <div className={`relative z-10 flex flex-col items-center transition-all duration-[800ms] ease-out w-1/3 mt-[100px] ${step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'}`}>
                        <div className="mb-4 text-center">
                            <span className="block text-[32px] font-black text-[#e11d48] tracking-tight">2008~2009</span>
                            <span className="block text-[16px] font-bold text-gray-500">{lang === 'kr' ? '글로벌 금융위기' : 'Global Financial Crisis'}</span>
                        </div>
                        <div className="w-[24px] h-[24px] rounded-full bg-white border-[6px] border-[#e11d48] shadow-lg"></div>
                        <div className="mt-6 bg-[#fff0f5] border border-[#fbcfe8] rounded-xl p-5 text-center w-[220px]">
                            {lang === 'kr' ? (
                                <p className="text-[15px] font-bold text-[#be185d]">GDP 1조 달러 아래로 후퇴<br/>(약 0.94조 달러)</p>
                            ) : (
                                <p className="text-[15px] font-bold text-[#be185d]">GDP retreated below $1T<br/>(Approx. $0.94T)</p>
                            )}
                        </div>
                    </div>

                    {/* 2010 Node (Recovery) */}
                    <div className={`relative z-10 flex flex-col items-center transition-all duration-[800ms] ease-out w-1/3 -mt-[100px] ${step >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'}`}>
                        <div className="mb-4 text-center">
                            <span className="block text-[32px] font-black text-[#1e3a8a] tracking-tight">2010~</span>
                            <span className="block text-[16px] font-bold text-gray-500">{lang === 'kr' ? '완전한 안착' : 'Complete Settlement'}</span>
                        </div>
                        <div className="w-[24px] h-[24px] rounded-full bg-white border-[6px] border-[#1e3a8a] shadow-lg"></div>
                        <div className="mt-6 bg-[#f0f9ff] border border-[#bae6fd] shadow-lg rounded-xl p-5 text-center w-[240px]">
                            {lang === 'kr' ? (
                                <>
                                    <p className="text-[16px] font-bold text-[#0369a1] mb-2">안정적인 1조 달러 경제 정착</p>
                                    <p className="text-[14px] font-medium text-gray-700">명목 GDP: <span className="font-bold text-black">약 1.14조 달러</span></p>
                                </>
                            ) : (
                                <>
                                    <p className="text-[16px] font-bold text-[#0369a1] mb-2">Stable $1 Trillion Economy</p>
                                    <p className="text-[14px] font-medium text-gray-700">Nominal GDP: <span className="font-bold text-black">~$1.14T</span></p>
                                </>
                            )}
                        </div>
                    </div>

                </div>

            

                {/* Description Text */}
                <div className={`mt-6 max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>한국이 GDP 1조 달러를 처음 돌파한 해는 <strong>2007년</strong>임</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>IMF 기준 명목 GDP <strong>약 1.12조 달러</strong>, 1인당 GDP <strong>약 2.4만 달러</strong> 기록</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>KOSPI가 처음 <strong>2,000선</strong>을 돌파한 기념비적인 해</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>그러나 <strong>2008년 글로벌 금융위기</strong>로 1조 달러 아래로 후퇴하는 담금질을 겪음</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span><strong>2010년</strong>에 이르러서야 비로소 흔들림 없는 "안정적인 1조 달러 경제"로 정착함</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Korea first surpassed $1 Trillion in GDP in <strong>2007</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Recorded nominal GDP of <strong>~$1.12T</strong> and GDP per capita of <strong>~$24K</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>A monumental year when KOSPI broke through the <strong>2,000 mark</strong> for the first time.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Experienced a forging period due to the 2008 global financial crisis, falling below $1T.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Finally settled into an unwavering "Stable $1 Trillion Economy" by <strong>2010</strong>.</span></li>
                            </>
                        )}
                    </ul>
                </div>
</div>
        </section>
    );
}
''',

    'src/components/Section11.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section11({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            return;
        }
        
        const t1 = setTimeout(() => setStep(1), 300); // Theme & Title
        const t2 = setTimeout(() => setStep(2), 1000); // Node 1
        const t3 = setTimeout(() => setStep(3), 1600); // Node 2
        const t4 = setTimeout(() => setStep(4), 2200); // Node 3
        const t5 = setTimeout(() => setStep(5), 2800); // Intro Text
        
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* Theme */}
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '[거시 경제] 마침내 도달할 GDP 2조 달러 고지' : '[Macroeconomy] Reaching the $2 Trillion GDP Milestone'}
                    </span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? (
                        <>1조에서 2조 달러로 2배 성장,<br/>대한민국의 20년 도약</>
                    ) : (
                        <>Doubling from $1T to $2T,<br/>Korea's 20-Year Leap</>
                    )}
                </h2>

                {/* Growth Infographic */}
                <div className="relative w-full max-w-[900px] mt-[60px] h-[360px] flex items-center justify-between">
                    
                    {/* Small Box (2007) */}
                    <div className={`relative flex flex-col items-center justify-end transition-all duration-[1000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-20'}`}>
                        <div className="text-center mb-3">
                            <span className="block text-[24px] font-black text-gray-400">2007</span>
                            <span className="block text-[14px] font-bold text-gray-500">{lang === 'kr' ? '1조 달러 돌파' : 'Passed $1 Trillion'}</span>
                        </div>
                        <div className="w-[140px] h-[140px] bg-gradient-to-t from-gray-200 to-gray-50 border border-gray-300 rounded-xl shadow-inner flex items-center justify-center">
                            <span className="text-[28px] font-black text-gray-600">$1T</span>
                        </div>
                    </div>

                    {/* Center Arrow & Multiplier */}
                    <div className={`flex flex-col items-center justify-center mb-[40px] transition-all duration-[800ms] ease-out ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
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
                    <div className={`relative flex flex-col items-center justify-end transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 4 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-32'}`}>
                        <div className="text-center mb-4">
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
                <div className={`mt-12 max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>2007년 1조 달러를 처음 돌파한 이후, <strong>약 20년 만에 2조 달러 고지 달성</strong>이 가시화됨.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>글로벌 경제의 변동성 속에서도 국가 경제 규모가 <strong>2배로 성장하는 거대한 사이클</strong>을 완성함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>단순한 양적 성장을 넘어, 산업 구조의 다변화와 글로벌 경쟁력 강화를 동반한 질적 도약의 시기였음.</span></li>
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
''',

    'src/components/Section12.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section12({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            return;
        }
        
        const t1 = setTimeout(() => setStep(1), 300); // Theme & Title
        const t2 = setTimeout(() => setStep(2), 1000); // Node 1
        const t3 = setTimeout(() => setStep(3), 1600); // Node 2
        const t4 = setTimeout(() => setStep(4), 2200); // Node 3
        const t5 = setTimeout(() => setStep(5), 2800); // Intro Text
        
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* Theme */}
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '[산업 구조] 10대 산업 듀얼 엔진의 위력과 양면성' : '[Industrial Structure] Power & Duality of the Dual Engine'}
                    </span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? (
                        <>중후장대와 신성장 산업의 결합,<br/>그리고 심화된 단일 종목 종속성</>
                    ) : (
                        <>Combination of Heavy & New Growth Industries,<br/>And the Deepened Reliance on a Single Sector</>
                    )}
                </h2>

                {/* Infographic Dual Engine Architecture */}
                <div className="relative w-full max-w-[1020px] mt-[50px] h-[360px] flex items-center justify-between">
                    
                    {/* Left Engine: Traditional */}
                    <div className={`relative z-10 w-[310px] h-full flex flex-col items-center transition-all duration-[1000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
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
                    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center transition-all duration-[1200ms] ease-out ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
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
                    <div className={`relative z-10 w-[310px] h-full flex flex-col items-center transition-all duration-[1000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
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
                <div className={`mt-12 max-w-[1200px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>1조 → 2조 달러 20년 구간의 본질은 <strong>"수출 제조업 슈퍼 사이클 + 신규 엔진 장착"</strong>임</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span><strong>5대 중후장대</strong>(반도체·자동차·조선 등)와 <strong>5대 신성장</strong>(콘텐츠·바이오 등)의 10대 산업 듀얼 엔진으로 확장됨</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>단일 동력원에 의존하지 않아 높은 <strong>회복탄력성(Resilience)</strong>을 입증함</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>반대로 <strong>반도체 단일 종목에 대한 의존도 심화</strong>라는 거시적 양면성도 함께 가짐</span></li>
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
'''
}

for file_path, content in files.items():
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated i18n for 3 sections!")
