import os

sections = {
    'src/components/Section21.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section21({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 1000),
            setTimeout(() => setStep(3), 1600),
            setTimeout(() => setStep(4), 2200),
            setTimeout(() => setStep(5), 2800)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '[산업 분석 8] 2차전지 산업의 팽창과 숨고르기' : '[Industry 8] Expansion & Breathing Spell of EV Batteries'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '국내 IPO 붐을 견인한 EV 배터리 시장의 구조적 조정기' : 'Structural Adjustment of the EV Battery Market that Led the IPO Boom'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-center z-10 gap-12">
                    
                    {/* The Boom (Left) */}
                    <div className={`relative flex flex-col items-center transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-20'}`}>
                        <div className="w-[180px] h-[180px] bg-gradient-to-t from-green-400 to-emerald-600 rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-white mb-2">
                            <span className="text-[28px] font-black text-white">20%</span>
                            <span className="text-[12px] font-bold text-green-100">{lang === 'kr' ? '글로벌 점유율' : 'Global Share'}</span>
                            <div className="mt-2 text-center text-white text-[10px] font-bold flex flex-col">
                                <span>LG Energy Solution</span>
                                <span>Samsung SDI</span>
                                <span>SK On</span>
                            </div>
                        </div>
                        <span className="text-[16px] font-black text-emerald-600">{lang === 'kr' ? '2020 IPO 붐' : '2020 IPO Boom'}</span>
                    </div>

                    {/* Chart Arrow */}
                    <div className={`flex flex-col items-center transition-all duration-1000 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        {/* A curved arrow pointing down slightly */}
                        <svg className="w-32 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 100 50">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M10 25 Q 50 -10, 90 40" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M75 40 L 90 40 L 85 25" />
                        </svg>
                        <span className="text-[12px] font-bold text-gray-500 mt-2">{lang === 'kr' ? '2024~2026 사이클' : '2024-2026 Cycle'}</span>
                    </div>

                    {/* The Adjustment (Right) */}
                    <div className={`relative flex flex-col items-center transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-200 ${step >= 4 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-20'}`}>
                        <div className="w-[180px] h-[180px] bg-gradient-to-b from-gray-200 to-gray-300 rounded-2xl shadow-lg flex flex-col items-center justify-center border-4 border-white mb-2">
                            <svg className="w-12 h-12 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-[14px] font-bold text-gray-600 text-center px-4 leading-tight">{lang === 'kr' ? '중국·미국 정책 변동' : 'US/China Policy Fluctuations'}</span>
                        </div>
                        <span className="text-[16px] font-black text-gray-600">{lang === 'kr' ? '구조적 조정기' : 'Structural Adjustment'}</span>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-emerald-600">▪</span><span>2차전지(LG엔솔·삼성SDI·SK온)는 <strong>2020년 국내 IPO 붐</strong>을 만든 핵심 엔진임.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-emerald-600">▪</span><span>K-배터리 3사는 합계 <strong>글로벌 EV 배터리 점유율 20% 내외</strong>를 안정적으로 확보함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-emerald-600">▪</span><span>다만 2024~2026년 사이 중국과 미국의 정책 변동 및 전기차 수요 둔화로 인해 <strong>사이클 조정기(숨고르기)</strong>에 진입함.</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-emerald-600">▪</span><span>EV Batteries (LG, Samsung, SK) were the core engine driving the <strong>2020 domestic IPO boom</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-emerald-600">▪</span><span>The Korean Big 3 secured a combined <strong>global EV battery market share of around 20%</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-emerald-600">▪</span><span>However, entered a <strong>cycle adjustment period (breathing spell)</strong> from 2024-2026 due to US/China policy fluctuations.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
''',
    'src/components/Section22.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section22({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 1000),
            setTimeout(() => setStep(3), 1600),
            setTimeout(() => setStep(4), 2200),
            setTimeout(() => setStep(5), 2800)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '[산업 분석 9] 플랫폼 빅테크의 물류 지형 재편' : '[Industry 9] Logistics Reshaping by Platform Big Tech'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '네이버, 쿠팡 등 IT 플랫폼이 촉발한 국가급 물류 수요의 폭발' : 'Explosion of National Logistics Demand Triggered by IT Platforms'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-center z-10 gap-16">
                    
                    {/* Big Tech Platforms */}
                    <div className={`relative flex flex-col gap-4 transition-all duration-1000 ease-out ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="flex gap-4">
                            <div className="w-[100px] h-[100px] bg-[#03c75a] rounded-2xl shadow-lg flex flex-col items-center justify-center text-white">
                                <span className="font-black text-[20px]">Naver</span>
                                <span className="text-[12px] font-bold">Cap 30T+</span>
                            </div>
                            <div className="w-[100px] h-[100px] bg-[#fee500] rounded-2xl shadow-lg flex flex-col items-center justify-center text-[#3c1e1e]">
                                <span className="font-black text-[20px]">Kakao</span>
                                <span className="text-[12px] font-bold">Cap ~30T</span>
                            </div>
                        </div>
                        <div className="w-full h-[100px] bg-black rounded-2xl shadow-lg flex flex-col items-center justify-center text-white">
                            <span className="font-black text-[24px]">Coupang</span>
                            <span className="text-[12px] font-bold text-gray-300">NYSE Cap 30T+</span>
                        </div>
                    </div>

                    {/* Arrow / Trigger */}
                    <div className={`flex flex-col items-center transition-all duration-1000 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-[16px] font-black text-indigo-600 mb-2 italic">Rocket Delivery</div>
                        <div className="w-[100px] h-[4px] bg-gradient-to-r from-gray-300 to-indigo-600 relative mb-2">
                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-indigo-600"></div>
                        </div>
                    </div>

                    {/* Logistics Demand */}
                    <div className={`relative flex flex-col items-center transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-200 ${step >= 4 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 translate-x-12'}`}>
                        <div className="w-[200px] h-[200px] bg-gradient-to-br from-indigo-500 to-purple-700 rounded-full shadow-2xl border-4 border-white flex flex-col items-center justify-center">
                            <svg className="w-12 h-12 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            <span className="text-[20px] font-black text-white leading-tight text-center">Logistics<br/>Real Estate</span>
                        </div>
                        <span className="text-[14px] font-bold text-indigo-600 mt-3">{lang === 'kr' ? '가장 큰 단일 변수' : 'Largest Single Variable'}</span>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>네이버, 카카오, 쿠팡 등 <strong>IT 플랫폼 빅테크</strong>들은 각각 시총 30조 원 이상을 기록하며 거대 기업으로 성장함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>네이버의 일본 LINE 야후 통합, 쿠팡의 로켓배송 전국화 등이 <strong>물류 지형을 근본적으로 재편</strong>함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>플랫폼이 촉발한 이커머스 혁명은 국내 <strong>물류 부동산 수요 폭발의 가장 큰 단일 변수</strong>로 작용함.</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>IT Platform Big Techs like Naver, Kakao, and Coupang grew into giants, each surpassing <strong>30T KRW in market cap</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>Naver's LINE-Yahoo integration in Japan and Coupang's nationwide Rocket Delivery <strong>fundamentally reshaped logistics</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>The e-commerce revolution triggered by these platforms became the <strong>largest single variable for logistics real estate demand</strong>.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
''',
    'src/components/Section23.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section23({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 1000),
            setTimeout(() => setStep(3), 1600),
            setTimeout(() => setStep(4), 2200),
            setTimeout(() => setStep(5), 2800)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '[산업 분석 10] 지정학적 위기가 낳은 K-디펜스' : '[Industry 10] K-Defense Born from Geopolitical Crisis'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '글로벌 수출 폭발을 기록하며 급부상한 방위산업의 신데렐라 서사' : 'Cinderella Story of the Defense Industry Surging with Global Exports'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-center z-10 gap-10">
                    
                    {/* Companies & Lineup */}
                    <div className={`relative w-[280px] h-[240px] bg-stone-800 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 border-b-8 border-stone-600 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="text-[20px] font-black text-white mb-3">Core Lineup</div>
                        <div className="w-full flex flex-col gap-2">
                            <div className="flex justify-between items-center text-[12px] bg-stone-700 px-3 py-1.5 rounded text-gray-200">
                                <span className="font-bold">Hanwha / Rotem</span>
                                <span className="text-[#a3e635]">K9 / K2 Tanks</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px] bg-stone-700 px-3 py-1.5 rounded text-gray-200">
                                <span className="font-bold">KAI</span>
                                <span className="text-[#a3e635]">FA-50</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px] bg-stone-700 px-3 py-1.5 rounded text-gray-200">
                                <span className="font-bold">LIG Nex1</span>
                                <span className="text-[#a3e635]">Cheongung</span>
                            </div>
                        </div>
                    </div>

                    {/* Arrow Export */}
                    <div className={`flex flex-col items-center transition-all duration-1000 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-[16px] font-black text-[#65a30d] mb-2 italic">Global Export</div>
                        <div className="w-[120px] h-[4px] bg-gradient-to-r from-stone-400 to-[#65a30d] relative mb-2">
                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-[#65a30d]"></div>
                        </div>
                        <div className="text-[12px] font-bold text-gray-500">Poland, UAE, MENA</div>
                    </div>

                    {/* Milestone Record */}
                    <div className={`relative w-[220px] h-[220px] rounded-full bg-gradient-to-br from-[#bef264] to-[#65a30d] shadow-[0_0_40px_rgba(101,163,13,0.3)] flex flex-col items-center justify-center border-4 border-white transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-200 ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <span className="text-[16px] font-bold text-green-900 mb-1">2022 Record</span>
                        <span className="text-[48px] font-black text-white leading-none mb-1">$17.3B</span>
                        <span className="text-[12px] font-bold text-green-900 bg-white/40 px-3 py-1 rounded-full">{lang === 'kr' ? '사상 최고치 달성' : 'All-time High'}</span>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#65a30d]">▪</span><span>지정학적 위기 고조로 <strong>폴란드·UAE·호주·중동</strong> 등에서 글로벌 방산 수출이 폭발함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#65a30d]">▪</span><span>2022년 한국 방산 수출은 <strong>173억 달러(약 23조 원)로 사상 최고치</strong>를 기록함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#65a30d]">▪</span><span>한화, LIG넥스원, KAI, 현대로템의 <strong>K2 전차·K9 자주포·FA-50·천궁</strong>이 수출을 견인하는 핵심 라인업임.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#65a30d]">▪</span><span>1조 ➔ 2조 달러 구간 후반부에 급부상한 명실상부한 <strong>대한민국 산업의 신데렐라 섹터</strong>임.</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#65a30d]">▪</span><span>Global defense exports exploded in <strong>Poland, UAE, Australia, and MENA</strong> due to geopolitical crises.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#65a30d]">▪</span><span>Korean defense exports hit an <strong>all-time high of $17.3 billion in 2022</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#65a30d]">▪</span><span>Core lineup driving exports includes <strong>K2 tanks, K9 howitzers, FA-50, and Cheongung</strong> (Hanwha, LIG, KAI, Rotem).</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#65a30d]">▪</span><span>Undeniably the <strong>Cinderella sector of Korean industry</strong> that emerged in the latter half of the $1T ➔ $2T transition.</span></li>
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

for file_path, content in sections.items():
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Successfully generated Section21, Section22, Section23")
