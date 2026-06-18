import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section125({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 184),
            setTimeout(() => setStep(2), 551),
            setTimeout(() => setStep(3), 918)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-white flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-center items-center h-full">
                
                {/* Header */}
                <div className="w-full flex flex-col items-center text-center mb-[36px]">
                    <div className={`transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                            {lang === 'kr' ? '2030 성장을 이끌 전략적 자산' : 'Strategic Asset for 2030 Growth'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '앵커 트로피 자산과 글로벌 LP 진입' : 'Anchor Trophy Asset & Global LP Entry'}
                    </h2>
                </div>

                {/* Content: 2 Cards (1x2 grid) */}
                <div className={`w-full max-w-[1200px] mx-auto mt-[10px] mb-[36px] grid grid-cols-1 md:grid-cols-2 gap-[20px] transition-all duration-[612ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Card 1 */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Asset 01</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '앵커 트로피 자산' : 'Anchor Trophy Asset'}
                        </div>
                        <ul className="text-[18px] text-gray-600 font-medium leading-relaxed space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#1e3a8a] mr-2">▪</span>
                                <span>{lang === 'kr' ? '향후 10년 이지스 브랜드의 단일 최대 PR 자산.' : 'Single largest PR asset for IGIS brand over the next 10 years.'}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#1e3a8a] mr-2">▪</span>
                                <span>{lang === 'kr' ? 'AUM 73조 → 100조 원 성장 경로에서 약 7조 원(10%)을 단일 프로젝트에 집중.' : 'Concentrating ~7T KRW (10%) into a single project on the path from 73T to 100T KRW AUM.'}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2">▪</span>
                                <span>{lang === 'kr' ? '매우 높은 포트폴리오 집중도는 단점이자 압도적인 Strength.' : 'Extremely high portfolio concentration is both a weakness and an overwhelming strength.'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Asset 02</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '글로벌 LP 진입 Vehicle' : 'Global LP Entry Vehicle'}
                        </div>
                        <ul className="text-[18px] text-gray-600 font-medium leading-relaxed space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#1e3a8a] mr-2">▪</span>
                                <span>{lang === 'kr' ? 'IOTA를 매개로 GIC·CPPIB·QIA·Allianz·Mitsubishi Estate 등 글로벌 LP 신규 도입.' : 'Introducing new global LPs (GIC, CPPIB, QIA, Allianz, Mitsubishi Estate) via IOTA.'}</span>
                            </li>
                            <li className="flex flex-col bg-gray-50 p-4 rounded-lg mt-2">
                                <span className="font-bold text-gray-800 mb-1">{lang === 'kr' ? 'Reverse Mirror 효과' : 'Reverse Mirror Effect'}</span>
                                <span className="text-[17px]">{lang === 'kr' ? 'IFC 서울 인수 시 브룩필드의 입장이 이지스에게 외부 GP의 인식이 되었듯, 이번에는 이지스가 GP로서 글로벌 자본을 성공적으로 유치.' : 'Just as Brookfield was perceived as an external GP during the IFC Seoul acquisition, now IGIS successfully attracts global capital as a GP.'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom text */}
                <div className={`w-full text-center mt-2 transition-all duration-[612ms] delay-[122ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-block bg-[#1e3a8a] text-white px-8 py-5 text-[20px] md:text-[22px] font-bold shadow-lg break-keep">
                        {lang === 'kr' ? 
                            (lang === 'kr' ? '단순한 딜(Deal)을 넘어선 글로벌 스탠다드 운용사(GP) 도약의 지렛대' : 'A lever to leap forward as a global standard General Partner (GP) beyond a simple Deal') : 
                            'A lever to leap into a global standard GP, beyond a simple deal'}
                    </div>
                </div>
            </div>
        </section>
    );
}
