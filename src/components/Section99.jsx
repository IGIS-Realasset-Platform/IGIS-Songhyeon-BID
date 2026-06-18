import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section99({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918), // Row 1
            setTimeout(() => setStep(4), 1300), // Row 2
            setTimeout(() => setStep(5), 1683), // Row 3
            setTimeout(() => setStep(6), 2218)  // Bottom
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '전략적 우선 타겟 LP' : 'Priority Target LPs'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-[40px] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>글로벌 자본 지형도와 타겟팅 전략</> : <>Global Capital Landscape & Targeting Strategy</>}
                </h2>

                <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-5 mb-[30px] relative">
                    
                    {/* Row 1 */}
                    <div className={`col-span-1 bg-white border-4 border-[#1e3a8a] rounded-none py-5 px-6 flex flex-col text-left shadow-sm transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1e3a8a] flex items-center justify-center font-bold">1</span>
                            <h3 className="text-[#1e3a8a] font-extrabold text-[22px]">{lang === 'kr' ? 'GIC, Temasek (싱가포르)' : 'GIC, Temasek (Singapore)'}</h3>
                        </div>
                        <p className="text-gray-700 font-bold text-[17px] pl-11 break-keep">
                            {lang === 'kr' ? '한국 트로피 자산에 이미 LP 참여 경험 보유' : 'Prior LP participation experience in Korean trophy assets'}
                        </p>
                    </div>

                    <div className={`col-span-1 bg-white border-4 border-[#1e3a8a] rounded-none py-5 px-6 flex flex-col text-left shadow-sm transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1e3a8a] flex items-center justify-center font-bold">2</span>
                            <h3 className="text-[#1e3a8a] font-extrabold text-[22px]">{lang === 'kr' ? 'CPPIB (캐나다 연금)' : 'CPPIB (Canada Pension)'}</h3>
                        </div>
                        <p className="text-gray-700 font-bold text-[17px] pl-11 break-keep">
                            {lang === 'kr' ? 'MGRV와 코리빙 JV 사례 등 한국 시장에 적극적 스탠스' : 'Active stance in Korean market, e.g., MGRV Co-living JV'}
                        </p>
                    </div>

                    {/* Row 2 */}
                    <div className={`col-span-1 bg-white border-4 border-[#1e3a8a] rounded-none py-5 px-6 flex flex-col text-left shadow-sm transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1e3a8a] flex items-center justify-center font-bold">3</span>
                            <h3 className="text-[#1e3a8a] font-extrabold text-[22px]">{lang === 'kr' ? 'ADIA, Mubadala, QIA (중동)' : 'ADIA, Mubadala, QIA (Middle East)'}</h3>
                        </div>
                        <p className="text-gray-700 font-bold text-[17px] pl-11 break-keep">
                            {lang === 'kr' ? 'AI 인프라 및 데이터센터 영역에 글로벌 Capacity 대규모 배치 중' : 'Deploying massive global capacity in AI infra & Data Centers'}
                        </p>
                    </div>

                    <div className={`col-span-1 bg-white border-4 border-[#1e3a8a] rounded-none py-5 px-6 flex flex-col text-left shadow-sm transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1e3a8a] flex items-center justify-center font-bold">4</span>
                            <h3 className="text-[#1e3a8a] font-extrabold text-[22px]">{lang === 'kr' ? 'NBIM (노르웨이)' : 'NBIM (Norway)'}</h3>
                        </div>
                        <p className="text-gray-700 font-bold text-[17px] pl-11 break-keep">
                            {lang === 'kr' ? '부동산 직접 투자 비중 지속 확대 기조' : 'Continuous expansion of direct real estate investments'}
                        </p>
                    </div>

                    {/* Row 3 */}
                    <div className={`col-span-1 bg-white border-4 border-[#1e3a8a] rounded-none py-5 px-6 flex flex-col text-left shadow-sm transition-all duration-[765ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1e3a8a] flex items-center justify-center font-bold">5</span>
                            <h3 className="text-[#1e3a8a] font-extrabold text-[20px] md:text-[22px]">AustralianSuper, CalPERS, ABP</h3>
                        </div>
                        <p className="text-gray-700 font-bold text-[17px] pl-11 break-keep">
                            {lang === 'kr' ? '인프라 및 실물 부동산 분야 강력한 글로벌 Mandate' : 'Strong global mandates in Infra & Real Estate'}
                        </p>
                    </div>

                    <div className={`col-span-1 bg-white border-4 border-[#1e3a8a] rounded-none py-5 px-6 flex flex-col text-left shadow-sm transition-all duration-[765ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1e3a8a] flex items-center justify-center font-bold">6</span>
                            <h3 className="text-[#1e3a8a] font-extrabold text-[20px] md:text-[22px]">{lang === 'kr' ? 'Mitsubishi, Mitsui, Sumitomo (일본)' : 'Mitsubishi, Mitsui, Sumitomo (Japan)'}</h3>
                        </div>
                        <p className="text-gray-700 font-bold text-[17px] pl-11 break-keep">
                            {lang === 'kr' ? '본격화되는 일본 자본의 한국 진입에 대한 주요 대응 채널' : 'Key channels corresponding to Japanese capital entering Korea'}
                        </p>
                    </div>

                </div>

                {/* Bottom Thesis Text */}
                <div className={`w-full max-w-[1100px] bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[17px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed text-center">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? <>각 글로벌 LP의 고유한 투자 특성과 전략적 니즈에 맞춘 정교한 타겟팅으로<br/>압도적인 국제적 자본 유치 가속화</> : <>Accelerating overwhelming international capital attraction<br/>through sophisticated targeting tailored to the unique investment characteristics and strategic needs of each global LP.</>)
                            : <>Accelerating massive global capital attraction via precise targeting<br/>tailored to the unique strategies and needs of each global LP</>
                        }
                    </p>
                </div>

            </div>
        </section>
    );
}
