import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section14({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) {
            setStep(20);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 230), // Theme & Title
            setTimeout(() => setStep(2), 765), // Infographic Base
            setTimeout(() => setStep(3), 1132), // Infographic Details
            setTimeout(() => setStep(4), 1591), // More Details
            setTimeout(() => setStep(5), 2050)  // Description Text
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* Theme */}
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? 'AI 슈퍼사이클과 반도체의 독주' : 'AI Supercycle & Semiconductor Monopoly'}
                    </span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '삼성·SK 하이닉스가 주도하는 GDP 성장의 절대적 중추' : 'Absolute Pillar of GDP Growth Led by Samsung & SK Hynix'}
                </h2>

                {/* Infographic */}
                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex flex-col md:flex-row items-center justify-center gap-8 z-10">
                    {/* Left Box */}
                    <div className={`relative w-[280px] bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] rounded-2xl shadow-2xl p-6 text-left transition-all duration-[765ms] ease-out ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="absolute -top-4 -right-4 w-[60px] h-[60px] bg-[#3b82f6] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                            <span className="text-white font-black text-[20px]">AI</span>
                        </div>
                        <h3 className="text-[24px] font-black text-white mb-1">Samsung</h3>
                        <p className="text-[14px] text-blue-200 mb-6 font-medium">{lang === 'kr' ? '매출 폭발적 확장' : 'Explosive Revenue Growth'}</p>
                        
                        <div className="flex justify-between items-end border-b border-blue-800 pb-2 mb-2">
                            <span className="text-gray-400 font-bold">2007</span>
                            <span className="text-white font-bold">{lang === 'kr' ? '약 100조 원' : '~$100T KRW'}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-[#3b82f6] font-black text-[20px]">2025</span>
                            <span className="text-[#60a5fa] font-black text-[24px]">{lang === 'kr' ? '약 333조 원' : '~$333T KRW'}</span>
                        </div>
                    </div>

                    {/* Center Core */}
                    <div className={`relative flex flex-col items-center transition-all duration-[918ms] ease-out ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <div className="w-[180px] h-[180px] rounded-full border-[8px] border-[#eff6ff] bg-white shadow-[0_0_40px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center z-20">
                            <span className="text-[14px] font-bold text-gray-500 mb-1">GDP Share</span>
                            <span className="text-[36px] font-black text-[#1e3a8a] leading-none mb-1">22.4%</span>
                            <span className="text-[12px] font-bold text-[#e11d48] bg-rose-50 px-2 py-0.5 rounded-md">{lang === 'kr' ? '단일 그룹 종속성' : 'Single Group Reliance'}</span>
                        </div>
                        {/* Connecting Lines */}
                        <div className="absolute top-1/2 left-[-60px] w-[60px] h-[3px] bg-gradient-to-r from-[#1e3a8a] to-blue-200 -z-10"></div>
                        <div className="absolute top-1/2 right-[-60px] w-[60px] h-[3px] bg-gradient-to-l from-[#e11d48] to-blue-200 -z-10"></div>
                    </div>

                    {/* Right Box */}
                    <div className={`relative w-[280px] bg-gradient-to-br from-[#4c0519] to-[#be185d] rounded-2xl shadow-2xl p-6 text-left transition-all duration-[765ms] ease-out ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="absolute -top-4 -left-4 w-[60px] h-[60px] bg-[#fb7185] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                            <span className="text-white font-black text-[16px]">HBM</span>
                        </div>
                        <h3 className="text-[24px] font-black text-white mb-1">SK Hynix</h3>
                        <p className="text-[14px] text-rose-200 mb-6 font-medium">{lang === 'kr' ? '사상 최대 영업이익' : 'Record Operating Profit'}</p>
                        
                        <div className="flex justify-between items-end border-b border-rose-800 pb-2 mb-2">
                            <span className="text-gray-400 font-bold">2007 Rev.</span>
                            <span className="text-white font-bold">{lang === 'kr' ? '8.6조 원' : '8.6T KRW'}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-[#fb7185] font-black text-[18px]">2025 Q-Profit</span>
                            <span className="text-[#fecdd3] font-black text-[24px]">{lang === 'kr' ? '10조 원+' : '10T+ KRW'}</span>
                        </div>
                    </div>
                </div>

                {/* Description Text */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === 'kr' ? <>가장 결정적 엔진임. <strong>삼성전자 매출은 2007년 약 100조 원에서 2025년 약 333조 원</strong>으로 3배 이상 확대.</> : <>The most crucial engine. <strong>Samsung Electronics revenue expanded over 3x from ~$100T KRW in 2007 to ~$333T KRW in 2025.</strong></>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === 'kr' ? <><strong>SK하이닉스는 2025년 사상 처음 분기 영업이익 10조 원</strong>을 돌파하며 AI 슈퍼사이클의 가장 큰 수혜자가 됨.</> : <><strong>SK Hynix surpassed 10T KRW in quarterly operating profit for the first time in 2025</strong>, becoming the biggest beneficiary of the AI super cycle.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === 'kr' ? 'Bloomberg는 2024년 삼성전자 단독으로 한국 GDP 성장의 약 절반을 설명한다고 분석함.' : 'Bloomberg analyzed that Samsung Electronics alone accounted for about half of Korea\'s GDP growth in 2024.'}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === 'kr' ? <>삼성그룹 매출의 GDP 비중이 <strong>2007년 15%에서 2022년 22.4%</strong>까지 상승하여 단일 그룹 매크로 종속성이 오히려 심화됨.</> : <>Samsung Group revenue to GDP ratio rose from <strong>15% in 2007 to 22.4% in 2022</strong>, deepening macroeconomic dependency on a single group.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>The most decisive engine. <strong>Samsung's revenue expanded over 3x</strong> from ~$100T KRW in 2007 to ~$333T KRW in 2025.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span><strong>SK Hynix surpassed 10T KRW in quarterly operating profit</strong> for the first time in 2025, maximizing AI supercycle benefits.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Bloomberg Economics analyzed that Samsung alone accounts for about half of Korea's GDP growth in 2024.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Samsung Group's revenue share of GDP rose from <strong>15% in 2007 to 22.4% in 2022</strong>, deepening macroeconomic dependence.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
