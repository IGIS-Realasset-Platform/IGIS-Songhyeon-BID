import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section128({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

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
                            {lang === 'kr' ? '거시 경제 및 시장 환경' : 'Macro & Market Environment'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '매크로 변수 및 PF 시장 유동성 리스크' : 'Macro Variables & PF Liquidity Risks'}
                    </h2>
                </div>

                {/* Content: 3 Cards (1x3 grid) */}
                <div className={`w-full max-w-[1400px] mx-auto mt-[10px] mb-[36px] grid grid-cols-1 md:grid-cols-3 gap-[20px] transition-all duration-[612ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Card 1 */}
                    <div className="bg-white border-[6px] border-[#1d1d1f] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[6px]">RISK 1</div>
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '금리 환경' : 'Interest Rate Environment'}
                        </div>
                        <ul className="text-[17px] text-gray-600 font-medium leading-relaxed space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#1d1d1f] mr-2">▪</span>
                                <span>{lang === 'kr' ? '한국 기준금리 2025년 2.25~2.50% 수준에서 2026~2027 추가 인하 예상되나 급격한 인하는 제한적.' : 'Base rate expected to fall further in 2026-2027, but sharp cuts are limited.'}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2">▪</span>
                                <span>{lang === 'kr' ? 'PF Senior 조달 금리 6~7%에서 5~6%로 인하될 경우 IPR equity IRR 약 200~300bp 개선 효과 기대.' : 'If PF Senior rate drops to 5-6%, IPR equity IRR improves by 200-300bp.'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border-[6px] border-[#1d1d1f] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[6px]">RISK 2</div>
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '공사비 인플레이션' : 'Construction Cost Inflation'}
                        </div>
                        <ul className="text-[17px] text-gray-600 font-medium leading-relaxed space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#1d1d1f] mr-2">▪</span>
                                <span>{lang === 'kr' ? '평당 5,000만 원 → 4,000만 원으로 하향 조정에도 불구하고 추가 변동 가능성 상존.' : 'Despite downward adjustment to 40M KRW/pyeong, risk of further fluctuations remains.'}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2">▪</span>
                                <span>{lang === 'kr' ? '삼성물산·현대건설과의 단가 Lock-in이 시공 단계 핵심 통제 변수.' : 'Lock-in of unit costs with Samsung C&T and Hyundai E&C is the key control variable.'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border-[6px] border-[#1d1d1f] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[6px]">RISK 3</div>
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? 'PF 시장 유동성' : 'PF Market Liquidity'}
                        </div>
                        <ul className="text-[17px] text-gray-600 font-medium leading-relaxed space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#1d1d1f] mr-2">▪</span>
                                <span>{lang === 'kr' ? '2024~2025년 PF 부실 사태 후 시장 신뢰 회복 진행 중이나, 신규 대형 PF에 대한 금융권 보수성 여전.' : 'Market trust recovering post-PF crisis, but financial sector remains conservative on mega PFs.'}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2">▪</span>
                                <span>{lang === 'kr' ? 'IOTA만큼 큰 초대형 PF는 단일 금융기관이 감당 불가. Club deal 신디케이션 필수.' : 'Mega PFs like IOTA require club deal syndications as single institutions cannot cover them.'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom text */}
                <div className={`w-full text-center mt-2 transition-all duration-[612ms] delay-[122ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-block bg-[#1d1d1f] text-white px-8 py-5 text-[20px] md:text-[22px] font-bold shadow-lg break-keep">
                        {lang === 'kr' ? 
                            (lang === 'kr' ? '매크로 불확실성에 대응하는 철저한 금리/원가 통제 및 펀딩 구조 다각화' : 'Thorough interest rate/cost control and funding structure diversification responding to macro uncertainties') : 
                            'Thorough control of interest rates/costs and diversification of funding to counter macro uncertainties'}
                    </div>
                </div>
            </div>
        </section>
    );
}
