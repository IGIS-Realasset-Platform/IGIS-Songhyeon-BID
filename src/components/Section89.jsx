import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section89({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918), // Pillars
            setTimeout(() => setStep(4), 1606), // Formula
            setTimeout(() => setStep(5), 2218)  // Bottom text
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-blue-600 uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '이지스만의 한국적 차별점과 결합 모델' : 'IGIS\'s Korean Differentiation & Hybrid Model'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-[38px] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>블랙스톤을 넘어선 In-house Vertical Integration의 완성</> : <>Completion of In-house Vertical Integration Beyond Blackstone</>}
                </h2>

                {/* 3 Pillars */}
                <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-6 mb-[30px] relative">
                    {/* Pillar 1 */}
                    <div className={`bg-white border-4 border-[#1e3a8a] rounded-lg p-6 shadow-sm flex flex-col items-center justify-center relative transition-all duration-[612ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} min-h-[220px]`}>
                        <div className="absolute top-4 left-5 text-[#1e3a8a] font-black text-[14px] opacity-80">01</div>
                        <h3 className="font-extrabold text-[24px] text-[#1e3a8a] mb-3 break-keep leading-snug text-center">
                            {lang === 'kr' ? '서울 프라임 압도적 지배력' : 'Overwhelming Dominance in Seoul Prime'}
                        </h3>
                        <p className="text-gray-700 font-medium text-[16px] leading-relaxed break-keep text-center">
                            {lang === 'kr' ? '단일 도시 프라임 자산에 대한 독보적인 인사이트와 막강한 딜 소싱(Deal Sourcing) 네트워크 보유' : 'Exclusive insights and powerful deal sourcing networks for prime assets in a single megacity'}
                        </p>
                    </div>

                    {/* Pillar 2 */}
                    <div className={`bg-white border-4 border-[#1e3a8a] rounded-lg p-6 shadow-sm flex flex-col items-center justify-center relative transition-all duration-[612ms] delay-[115ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} min-h-[220px]`}>
                        <div className="absolute top-4 left-5 text-[#1e3a8a] font-black text-[14px] opacity-80">02</div>
                        <h3 className="font-extrabold text-[24px] text-[#1e3a8a] mb-3 break-keep leading-snug text-center">
                            {lang === 'kr' ? '국내 기관 LP 신뢰 자본' : 'Trusted Capital from Domestic Inst. LPs'}
                        </h3>
                        <p className="text-gray-700 font-medium text-[16px] leading-relaxed break-keep text-center">
                            {lang === 'kr' ? 'NPS, 교직원공제회, 우정사업본부 등 핵심 기관투자자들과 오랜 기간 쌓아온 두터운 파트너십과 신뢰' : 'Deep partnerships and trust built over long periods with core institutional investors like NPS'}
                        </p>
                    </div>

                    {/* Pillar 3 */}
                    <div className={`bg-white border-4 border-[#1e3a8a] rounded-lg p-6 shadow-sm flex flex-col items-center justify-center relative transition-all duration-[612ms] delay-[230ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} min-h-[220px]`}>
                        <div className="absolute top-4 left-5 text-[#1e3a8a] font-black text-[14px] opacity-80">03</div>
                        <h3 className="font-extrabold text-[24px] text-[#1e3a8a] mb-3 break-keep leading-snug text-center">
                            {lang === 'kr' ? 'In-house Vertical Integration' : 'In-house Vertical Integration'}
                        </h3>
                        <p className="text-gray-700 font-medium text-[16px] leading-relaxed break-keep text-center">
                            {lang === 'kr' ? '개발-구조화-운영의 내재화 (Factorial Builders, IGIS[X], 이지스네오밸류 등)' : 'Internalization of Develop-Structure-Operate (Factorial Builders, IGIS[X], etc.)'}
                        </p>
                    </div>
                </div>

                {/* Hybrid Model Formula */}
                <div className={`w-full max-w-[1000px] flex flex-col items-center justify-center bg-gray-800 rounded-2xl py-[16px] px-6 md:py-[22px] md:px-8 mb-[30px] transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="text-gray-400 font-bold text-[17px] mb-3">
                        {lang === 'kr' ? '단순 자산 매입·매각 중심의 블랙스톤 모델을 넘어선 최적의 결합 모델' : 'Optimal Hybrid Model Beyond Blackstone\'s Simple Buy-Sell Approach'}
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full">
                        <div className="bg-blue-600 text-white font-bold text-[18px] md:text-[22px] px-5 py-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.5)] break-keep text-center w-full md:w-auto">
                            {lang === 'kr' ? '모리빌딩 (도쿄)' : 'Mori Building (Tokyo)'}
                        </div>
                        <div className="text-white font-black text-[24px]">+</div>
                        <div className="bg-blue-600 text-white font-bold text-[18px] md:text-[22px] px-5 py-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.5)] break-keep text-center w-full md:w-auto">
                            {lang === 'kr' ? 'Hong Kong Land (센트럴)' : 'Hong Kong Land (Central)'}
                        </div>
                        <div className="text-white font-black text-[24px]">+</div>
                        <div className="bg-blue-600 text-white font-bold text-[18px] md:text-[22px] px-5 py-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.5)] break-keep text-center w-full md:w-auto">
                            {lang === 'kr' ? 'Related (허드슨야드)' : 'Related (Hudson Yards)'}
                        </div>
                    </div>
                </div>

                {/* Bottom Thesis Text */}
                <div className={`max-w-[1000px] bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[18px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? '단순 자산 매입·매각 모델을 넘어선 아시아 최고 수준의 부동산 가치 창출 플랫폼' : 'Asia\'s top-tier real estate value creation platform beyond simple asset buy/sell models.')
                            : 'Asia\'s top-tier real estate value creation platform moving beyond a simple asset buy-sell model.'
                        }
                    </p>
                </div>

            </div>
        </section>
    );
}
