import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section19({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) {
            setStep(20);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 765),
            setTimeout(() => setStep(3), 1132),
            setTimeout(() => setStep(4), 1591),
            setTimeout(() => setStep(5), 2050)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '코리아 프리미엄을 낳은 K-콘텐츠' : 'K-Content Creating the Korea Premium'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '하이브, CJ ENM 등이 구축한 자본시장 리레이팅의 무형 자산' : 'Intangible Assets for Capital Market Re-rating Built by HYBE, CJ ENM'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-center z-10">
                    <div className="w-full h-full relative flex items-center justify-center">
                        
                        {/* Glow Background */}
                        <div className={`absolute w-[480px] h-[480px] bg-fuchsia-500/20 blur-[80px] rounded-full transition-all duration-[765ms] ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}></div>

                        {/* Central Core: Korea Premium */}
                        <div className={`relative z-20 w-[260px] h-[260px] rounded-full bg-gradient-to-br from-[#d946ef] to-[#86198f] shadow-[0_0_60px_rgba(217,70,239,0.5)] flex flex-col items-center justify-center border-[6px] border-white transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 4 ? 'scale-100' : 'scale-0'}`}>
                            <span className="text-[20px] font-bold text-fuchsia-200 mb-1">{lang === 'kr' ? '자본시장 리레이팅' : 'Market Re-rating'}</span>
                            <span className="text-[36px] font-black text-white leading-tight text-center">Korea<br/>Premium</span>
                        </div>

                        {/* Orbiting Elements */}
                        <div className={`absolute flex items-center justify-center w-full h-full transition-all duration-[1148ms] ease-out ${step >= 3 ? 'opacity-100' : 'opacity-0 scale-50'}`}>
                            {/* HYBE / Big 4 */}
                            <div className="absolute top-[36px] left-[5%] ml-[26px] bg-white border-[4px] border-fuchsia-100 shadow-xl rounded-2xl px-6 py-4 flex flex-col items-center z-30">
                                <span className="text-[28px] font-black text-[#d946ef] mb-1">{lang === 'kr' ? '4대 엔터' : 'Big 4 Enter'}</span>
                                <span className="text-[16px] text-gray-600 font-bold">HYBE(BTS)·SM·JYP·YG</span>
                            </div>
                            
                            {/* CJ ENM */}
                            <div className="absolute bottom-[20px] left-[15%] bg-white border-[4px] border-purple-100 shadow-xl rounded-2xl px-6 py-4 flex flex-col items-center z-30">
                                <span className="text-[28px] font-black text-[#86198f] mb-1">CJ ENM</span>
                                <span className="text-[16px] text-gray-600 font-bold">{lang === 'kr' ? '기생충 · 오징어 게임' : 'Parasite · Squid Game'}</span>
                            </div>

                            {/* Netflix */}
                            <div className="absolute top-[40px] right-[5%] mr-[20px] bg-white border-[4px] border-rose-100 shadow-xl rounded-2xl px-6 py-4 flex flex-col items-center z-30">
                                <span className="text-[28px] font-black text-[#e11d48] mb-1">{lang === 'kr' ? 'Netflix 투자' : 'Netflix Investment'}</span>
                                <span className="text-[16px] text-gray-600 font-bold">$2.5B+ (2016~2025)</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#d946ef]">▪</span><span>{lang === 'kr' ? <>K-콘텐츠는 1조 ➔ 2조 달러 구간의 숨겨진 진주. HYBE 등 <strong>4대 엔터와 CJ ENM</strong>이 글로벌 흥행을 주도함.</> : <>K-Content is the hidden gem of the $1T to $2T period. <strong>Big 4 agencies (e.g. HYBE) and CJ ENM</strong> lead global hits.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#d946ef]">▪</span><span>{lang === 'kr' ? <>넷플릭스의 한국 콘텐츠 누적 투자(2016~2025)가 <strong>25억 달러 이상</strong>을 기록하며 산업 파이를 키움.</> : <>Netflix's cumulative investment in Korean content (2016-2025) recorded <strong>over $2.5B</strong>, growing the industry pie.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#d946ef]">▪</span><span>{lang === 'kr' ? <>명목 GDP 기여도는 1~2%대지만, 국가 브랜드 <strong>코리아 프리미엄(Korea Premium)</strong>의 핵심 동력으로 작용함.</> : <>Nominal GDP contribution is ~1-2%, but acts as the core driver of the national brand <strong>Korea Premium</strong>.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#d946ef]">▪</span><span>{lang === 'kr' ? <>과거 1980년대 일본 버블기 소니·세가가 구축한 <strong>J-Brand 프리미엄</strong>과 유사한 거대한 무형 자산임.</> : <>A massive intangible asset similar to the <strong>J-Brand Premium</strong> built by Sony/Sega in the 1980s Japan bubble era.</>}</span></li>
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
