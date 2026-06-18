import os

sections = {
    'src/components/Section17.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section17({ isActive }) {
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
                        {lang === 'kr' ? '[산업 분석 4] 구조적 한계에 봉착한 석유화학' : '[Industry 4] Petrochemicals Facing Structural Limits'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '중국 자급률 상승이 촉발한 전통 에너지 섹터의 다운사이클' : "Downcycle of Traditional Energy Sector Triggered by China's Self-Sufficiency"}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-center z-10 gap-12">
                    
                    {/* 2007 Era */}
                    <div className={`flex flex-col items-center transition-all duration-[1000ms] ease-out ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="text-[24px] font-black text-gray-400 mb-2">2007 Era</div>
                        <div className="w-[200px] h-[200px] bg-gradient-to-tr from-gray-200 to-white border-2 border-gray-300 rounded-2xl shadow-lg flex flex-col items-center justify-center p-4">
                            <span className="text-[18px] font-bold text-gray-700 mb-2">{lang === 'kr' ? '정유 4강 체제' : 'Big 4 Era'}</span>
                            <div className="flex flex-wrap justify-center gap-2">
                                <span className="text-[11px] bg-gray-100 px-2 py-1 rounded">SK Innovation</span>
                                <span className="text-[11px] bg-gray-100 px-2 py-1 rounded">GS Caltex</span>
                                <span className="text-[11px] bg-gray-100 px-2 py-1 rounded">S-Oil</span>
                                <span className="text-[11px] bg-gray-100 px-2 py-1 rounded">Hyundai Oilbank</span>
                            </div>
                        </div>
                    </div>

                    {/* Arrow / Downcycle Indicator */}
                    <div className={`flex flex-col items-center transition-all duration-[1000ms] ease-out delay-100 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <div className="text-[16px] font-bold text-red-500 mb-2">{lang === 'kr' ? '구조적 다운사이클' : 'Structural Downcycle'}</div>
                        <div className="w-[100px] h-[4px] bg-gradient-to-r from-gray-300 to-red-500 relative mb-2">
                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-red-500"></div>
                        </div>
                        <div className="text-[14px] font-medium text-gray-500">{lang === 'kr' ? '중국 자급률 상승' : 'China Self-Sufficiency'}</div>
                    </div>

                    {/* Mid 2020s */}
                    <div className={`flex flex-col items-center transition-all duration-[1000ms] ease-out delay-200 ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="text-[24px] font-black text-red-600 mb-2">Mid 2020s</div>
                        <div className="w-[200px] h-[200px] bg-gradient-to-br from-red-50 to-white border-2 border-red-200 rounded-2xl shadow-xl flex flex-col items-center justify-center p-4">
                            <svg className="w-12 h-12 text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                            <span className="text-[16px] font-bold text-red-700 text-center">{lang === 'kr' ? '후반부 성장 둔화' : 'Latter Half Slowdown'}</span>
                        </div>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-red-500">▪</span><span>2007년에는 <strong>SK이노베이션·GS칼텍스·에쓰오일·현대오일뱅크 4강</strong>이 명확히 시장을 주도함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-red-500">▪</span><span>그러나 2020년대 중반 들어 <strong>중국의 자급률 상승</strong>으로 인해 구조적 다운사이클에 진입함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-red-500">▪</span><span>결과적으로 1조 ➔ 2조 달러 구간 후반부에는 <strong>상대적 둔화 섹터</strong>로 분류해야 하는 상황임.</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-red-500">▪</span><span>In 2007, the <strong>Big 4 (SK, GS, S-Oil, Hyundai)</strong> clearly dominated the market.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-red-500">▪</span><span>However, entered a structural downcycle in the mid-2020s due to <strong>China's rising self-sufficiency</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-red-500">▪</span><span>Consequently, it must be classified as a <strong>relatively slowing sector</strong> in the latter half of the $1T to $2T era.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
''',
    'src/components/Section18.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section18({ isActive }) {
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
                        {lang === 'kr' ? '[산업 분석 5] 철강 산업의 생존을 위한 대전환' : '[Industry 5] Great Transition of the Steel Industry'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '2차전지 소재 밸류체인으로의 피벗팅을 증명한 POSCO홀딩스' : 'POSCO Holdings Proving the Pivot to EV Battery Materials'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-center z-10">
                    
                    {/* Transformation Graphic */}
                    <div className="relative w-full flex items-center justify-center h-[240px]">
                        
                        {/* Old Steel (Left) */}
                        <div className={`absolute left-[10%] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border-4 border-white shadow-lg flex flex-col items-center justify-center transition-all duration-[1000ms] ease-out ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                            <span className="text-[28px] font-black text-white">Traditional</span>
                            <span className="text-[16px] font-bold text-gray-200 mt-1">STEEL</span>
                            <span className="text-[11px] bg-black/20 text-white px-2 py-1 rounded-md mt-2">{lang === 'kr' ? '중국 과잉공급 마진 압박' : 'Margin Pressure from China'}</span>
                        </div>

                        {/* Arrow */}
                        <div className={`absolute left-[38%] w-[24%] h-[60px] flex items-center justify-center z-20 transition-all duration-[1000ms] ease-out ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                            <div className="relative w-full h-[8px] bg-gradient-to-r from-gray-400 to-[#7c3aed] rounded-full">
                                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-[#7c3aed]"></div>
                            </div>
                            <span className="absolute -top-8 text-[14px] font-black text-[#7c3aed] italic">{lang === 'kr' ? 'PIVOTING' : 'PIVOTING'}</span>
                        </div>

                        {/* New Materials (Right) */}
                        <div className={`absolute right-[10%] w-[240px] h-[240px] rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#4c1d95] border-4 border-white shadow-2xl flex flex-col items-center justify-center transition-all duration-[1000ms] ease-out ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
                            <span className="text-[14px] font-bold text-violet-200 mb-1">POSCO Holdings</span>
                            <span className="text-[28px] font-black text-white leading-tight text-center">Battery<br/>Materials</span>
                            <div className="flex gap-2 mt-3">
                                <span className="text-[12px] font-bold bg-white text-[#4c1d95] px-3 py-1 rounded-full">{lang === 'kr' ? '양극재' : 'Cathodes'}</span>
                                <span className="text-[12px] font-bold bg-white text-[#4c1d95] px-3 py-1 rounded-full">{lang === 'kr' ? '리튬' : 'Lithium'}</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#7c3aed]">▪</span><span>철강(POSCO)은 1조 달러 시대 초입 <strong>한국 경제의 상징</strong>이었으나, 중국의 과잉 공급으로 마진 압박에 직면함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#7c3aed]">▪</span><span>이러한 위기를 타개하기 위해 <strong>2차전지 소재(양극재·리튬 등) 밸류체인</strong>으로 과감한 피벗팅(Pivoting)을 단행함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#7c3aed]">▪</span><span>POSCO홀딩스의 진화는 1조 ➔ 2조 달러 구간에서 일어난 가장 <strong>대표적인 산업 전환 케이스</strong>임.</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#7c3aed]">▪</span><span>Steel (POSCO) was a <strong>symbol of the Korean economy</strong> in the $1T era, but faced margin pressure from China's oversupply.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#7c3aed]">▪</span><span>Executed a bold pivot to the <strong>EV battery materials value chain (cathodes, lithium, etc.)</strong> to overcome the crisis.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#7c3aed]">▪</span><span>POSCO Holdings' evolution is a <strong>representative case of industrial transition</strong> during the $1T ➔ $2T period.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
''',
    'src/components/Section19.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section19({ isActive }) {
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
                        {lang === 'kr' ? '[산업 분석 6] 코리아 프리미엄을 낳은 K-콘텐츠' : '[Industry 6] K-Content Creating the Korea Premium'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '하이브, CJ ENM 등이 구축한 자본시장 리레이팅의 무형 자산' : 'Intangible Assets for Capital Market Re-rating Built by HYBE, CJ ENM'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-center z-10">
                    <div className="w-full h-full relative flex items-center justify-center">
                        
                        {/* Glow Background */}
                        <div className={`absolute w-[400px] h-[400px] bg-fuchsia-500/20 blur-[80px] rounded-full transition-all duration-1000 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}></div>

                        {/* Central Core: Korea Premium */}
                        <div className={`relative z-20 w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#d946ef] to-[#86198f] shadow-[0_0_50px_rgba(217,70,239,0.5)] flex flex-col items-center justify-center border-4 border-white transition-all duration-[1000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 4 ? 'scale-100' : 'scale-0'}`}>
                            <span className="text-[16px] font-bold text-fuchsia-200">{lang === 'kr' ? '자본시장 리레이팅' : 'Market Re-rating'}</span>
                            <span className="text-[28px] font-black text-white leading-tight text-center">Korea<br/>Premium</span>
                        </div>

                        {/* Orbiting Elements */}
                        <div className={`absolute flex items-center justify-center w-full h-full transition-all duration-[1500ms] ease-out ${step >= 3 ? 'opacity-100' : 'opacity-0 scale-50'}`}>
                            {/* HYBE / Big 4 */}
                            <div className="absolute top-[40px] left-[15%] bg-white border border-gray-200 shadow-lg rounded-xl p-3 flex flex-col items-center">
                                <span className="text-[16px] font-black text-[#d946ef]">4대 엔터</span>
                                <span className="text-[12px] text-gray-500 font-bold">HYBE(BTS)·SM·JYP·YG</span>
                            </div>
                            
                            {/* CJ ENM */}
                            <div className="absolute bottom-[40px] left-[25%] bg-white border border-gray-200 shadow-lg rounded-xl p-3 flex flex-col items-center">
                                <span className="text-[16px] font-black text-[#86198f]">CJ ENM</span>
                                <span className="text-[12px] text-gray-500 font-bold">기생충 · 오징어 게임</span>
                            </div>

                            {/* Netflix */}
                            <div className="absolute top-[60px] right-[15%] bg-white border border-gray-200 shadow-lg rounded-xl p-3 flex flex-col items-center">
                                <span className="text-[16px] font-black text-[#e11d48]">Netflix 투자</span>
                                <span className="text-[12px] text-gray-500 font-bold">$2.5B+ (2016~2025)</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#d946ef]">▪</span><span>K-콘텐츠는 1조 ➔ 2조 달러 구간의 숨겨진 진주. HYBE 등 <strong>4대 엔터와 CJ ENM</strong>이 글로벌 흥행을 주도함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#d946ef]">▪</span><span>넷플릭스의 한국 콘텐츠 누적 투자(2016~2025)가 <strong>25억 달러 이상</strong>을 기록하며 산업 파이를 키움.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#d946ef]">▪</span><span>명목 GDP 기여도는 1~2%대지만, 국가 브랜드 <strong>코리아 프리미엄(Korea Premium)</strong>의 핵심 동력으로 작용함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#d946ef]">▪</span><span>과거 1980년대 일본 버블기 소니·세가가 구축한 <strong>J-Brand 프리미엄</strong>과 유사한 거대한 무형 자산임.</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#d946ef]">▪</span><span>K-Content is the hidden pearl of the $1T ➔ $2T era, led by the <strong>Big 4 agencies and CJ ENM</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#d946ef]">▪</span><span>Netflix's cumulative investment in Korean content (2016-2025) exceeded <strong>$2.5B</strong>, expanding the industry pie.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#d946ef]">▪</span><span>While GDP contribution is ~1-2%, it acts as the core engine for the national brand's <strong>Korea Premium</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#d946ef]">▪</span><span>A massive intangible asset similar to the <strong>J-Brand premium</strong> built by Sony & Sega in Japan's 1980s bubble era.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
''',
    'src/components/Section20.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section20({ isActive }) {
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
                        {lang === 'kr' ? '[산업 분석 7] K-바이오 클러스터의 성공적 안착' : '[Industry 7] Successful Settlement of the K-Bio Cluster'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '1조 달러 초입에는 존재하지 않았던 CDMO 글로벌 1위의 탄생' : 'Birth of Global #1 CDMO, Non-existent at the Dawn of the $1T Era'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-center z-10 gap-10">
                    
                    {/* The Void (2007) */}
                    <div className={`relative flex flex-col items-center justify-center w-[200px] h-[200px] rounded-full border-4 border-dashed border-gray-300 transition-all duration-1000 ${step >= 2 ? 'opacity-100' : 'opacity-0 -translate-x-10'}`}>
                        <span className="text-[20px] font-black text-gray-400">2007 Era</span>
                        <span className="text-[14px] font-bold text-gray-400 mt-2">{lang === 'kr' ? '산업 존재감 미미' : 'Negligible Presence'}</span>
                    </div>

                    {/* Arrow */}
                    <div className={`flex items-center transition-all duration-1000 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-[120px] h-[4px] bg-gradient-to-r from-gray-300 to-[#0ea5e9] relative">
                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-[#0ea5e9]"></div>
                        </div>
                    </div>

                    {/* The Success (Present) */}
                    <div className={`relative flex flex-col items-center justify-center w-[260px] h-[260px] rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] shadow-2xl border-4 border-white transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 translate-x-10'}`}>
                        <span className="text-[14px] font-bold text-sky-200 mb-1">Samsung Biologics</span>
                        <span className="text-[36px] font-black text-white leading-none mb-1">Global #1</span>
                        <span className="text-[20px] font-bold text-white mb-3">CDMO</span>
                        <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            <span className="text-[12px] font-bold text-white">{lang === 'kr' ? '매출 4조+ / 시총 50조+' : 'Rev 4T+ / Cap 50T+'}</span>
                        </div>
                        <span className="text-[12px] font-bold text-sky-100 mt-3">+ Celltrion Biosimilars</span>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#0ea5e9]">▪</span><span>바이오/제약 산업은 1조 달러 시대 초입(2007년 경)에는 <strong>글로벌 존재감이 거의 없었던 새로운 산업</strong>임.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#0ea5e9]">▪</span><span>현재 삼성바이오로직스는 <strong>CDMO(위탁개발생산) 분야 글로벌 1위</strong>(매출 4조 원+, 시총 50조 원+)로 등극함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#0ea5e9]">▪</span><span>셀트리온의 바이오시밀러 글로벌 진출 등과 맞물려 <strong>K-바이오 클러스터</strong>가 한국 경제의 신성장 동력으로 안착함.</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#0ea5e9]">▪</span><span>Bio/Pharma is a new industry that had <strong>almost no global presence</strong> at the dawn of the $1T era.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#0ea5e9]">▪</span><span>Samsung Biologics has now risen to <strong>Global #1 in CDMO</strong> (Revenue 4T+ KRW, Market Cap 50T+ KRW).</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#0ea5e9]">▪</span><span>Coupled with Celltrion's biosimilar expansion, the <strong>K-Bio cluster</strong> has successfully settled as a new growth engine.</span></li>
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

print("Successfully generated Section17, Section18, Section19, Section20")
