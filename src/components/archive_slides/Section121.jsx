import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section121({ isActive }) {
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
                            {lang === 'kr' ? '총 사업비 구조와 자본 효율성' : 'Capital Structure & Efficiency'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? 'IPR 7조 원 통합 PF 자본 구조' : '7T KRW IPR Unified Capital Structure'}
                    </h2>
                </div>

                {/* Content: 2 Cards */}
                <div className={`w-full max-w-[1200px] mx-auto mt-[10px] mb-[36px] grid grid-cols-1 md:grid-cols-2 gap-[20px] transition-all duration-[612ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Card 1: Capital Stack */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Capital Stack</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '7조 원 다층 자본 구조 (가정)' : '7T KRW Multi-layered Capital Structure'}
                        </div>
                        <ul className="text-[18px] text-gray-600 font-medium leading-relaxed space-y-4">
                            <li className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                <span className="font-bold text-gray-800">Senior Debt</span>
                                <span className="text-gray-600">{lang === 'kr' ? '약 5조 원' : 'approx 5T KRW'}</span>
                            </li>
                            <li className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                <span className="font-bold text-gray-800">Mezzanine</span>
                                <span className="text-gray-600">{lang === 'kr' ? '약 1조 원' : 'approx 1T KRW'}</span>
                            </li>
                            <li className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                <span className="font-bold text-gray-800">Junior</span>
                                <span className="text-gray-600">{lang === 'kr' ? '약 3,000억 원' : 'approx 0.3T KRW'}</span>
                            </li>
                            <li className="flex justify-between items-center bg-[#1e3a8a]/10 p-3 rounded-md border border-[#1e3a8a]/20">
                                <span className="font-bold text-[#1e3a8a]">Equity (10%)</span>
                                <span className="text-[#1e3a8a] font-bold">{lang === 'kr' ? '약 7,000억 원' : 'approx 0.7T KRW'}</span>
                            </li>
                        </ul>
                        <p className="mt-4 text-[15px] text-gray-500 leading-tight">
                            {lang === 'kr' ? '* Equity는 700억 원(10%) 베이스가 아닌 7,000억 원(10%) 가량의 Sponsor + LP Equity로 추정' : '* Equity estimated at ~700B KRW Sponsor+LP equity.'}
                        </p>
                    </div>

                    {/* Card 2: Risks & Efficiency */}
                    <div className="bg-white border-[6px] border-[#1d1d1f] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1d1d1f] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Efficiency & Risks</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '자본 효율성과 구조적 위험요소' : 'Capital Efficiency & Structural Risks'}
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[19px] font-bold text-[#1e3a8a] mb-2">{lang === 'kr' ? '가장 우수한 효율성 모델' : 'Optimal Efficiency Model'}</h4>
                                <p className="text-[17px] text-gray-600 font-medium">
                                    {lang === 'kr' ? 'Option C 신설 SPC + 현물출자 경로가 자본 효율성 측면에서 가장 우수함.' : 'Option C (New SPC + In-kind investment) is the most capital efficient.'}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-[19px] font-bold text-red-600 mb-2">{lang === 'kr' ? '트랜치 B 우선매수권 리스크' : 'Tranche B Pre-emptive Right Risk'}</h4>
                                <p className="text-[17px] text-gray-600 font-medium">
                                    {lang === 'kr' ? '한투리얼·HDC현산의 트랜치 B 우선매수권. IPR의 신규 자본 유치 시 Dilution 위험으로 작용.' : 'Pre-emptive rights of Tranche B cause dilution risk during new IPR capital raises.'}
                                </p>
                            </div>
                            <div className="bg-[#1e3a8a]/10 p-5 rounded-lg border border-[#1e3a8a]/20 shadow-sm mt-4">
                                <p className="text-[18px] text-[#1e3a8a] font-bold leading-relaxed">
                                    {lang === 'kr' ? '대응 방안: 일부 매입·정리(buyback) 및 행사 조건 명확화를 통해 자본 구조 사전 정리 필요' : 'Action: Clarify conditions and perform buybacks to clean up capital structure.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
