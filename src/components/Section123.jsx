import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section123({ isActive }) {
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
                            {lang === 'kr' ? '핵심 액션 아이템 및 목표' : 'Key Action Items & Targets'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '성공적 클로징을 위한 3대 과제' : '3 Major Tasks for Successful Closing'}
                    </h2>
                </div>

                {/* Content: 3 Cards */}
                <div className={`w-full max-w-[1200px] mx-auto mt-[10px] mb-[36px] grid grid-cols-1 md:grid-cols-3 gap-[20px] transition-all duration-[612ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Card 1 */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Task 01</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? 'YD816 본PF 즉시 클로징' : 'Immediate YD816 Main PF Closing'}
                        </div>
                        <p className="text-[18px] text-gray-600 font-medium leading-relaxed">
                            {lang === 'kr' ? '공매 회피 인수자 확정 (메리츠증권 추가 협상 또는 대체 Senior 대주 확보)을 통한 급선무 해결.' : 'Resolve urgent priority by securing acquirer to avoid short sale (additional negotiation with Meritz or alternative senior lender).'}
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Task 02</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? 'YD427 2차 PF 사전 Anchor' : 'YD427 2nd PF Pre-Anchor'}
                        </div>
                        <p className="text-[18px] text-gray-600 font-medium leading-relaxed">
                            {lang === 'kr' ? '2027년 5월 2차 PF 4.5조 원 조달을 위한 사전 Anchor 확보. 7조 원 규모 한국 RE 사상 최대 PF의 핵심 게임.' : 'Secure pre-anchor for 4.5T KRW 2nd PF in May 2027. The core game of the largest 7T KRW PF in Korean RE history.'}
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Task 03</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '통합 가치 제고 스토리텔링' : 'Unified Value Storytelling'}
                        </div>
                        <p className="text-[18px] text-gray-600 font-medium leading-relaxed">
                            {lang === 'kr' ? '본PF 심사 시 금융권이 두 사업을 동일 선상에서 평가하지 않는 분위기 타파. 통합 가치 인정받지 못하면 IOTA 브랜드 분열 위험 방어.' : 'Overcome lack of unified valuation by lenders. Defend against IOTA brand fragmentation if unified value is unrecognized.'}
                        </p>
                    </div>
                </div>

                {/* Bottom text */}
                <div className={`w-full text-center mt-2 transition-all duration-[612ms] delay-[122ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-block bg-[#1d1d1f] text-white px-8 py-5 text-[20px] md:text-[22px] font-bold shadow-lg break-keep">
                        {lang === 'kr' ? 
                            (lang === 'kr' ? '[2026.12 클로징 타겟] 성공 시 이지스의 글로벌 LP 확장 최강 레퍼런스, 실패 시 Brand Impairment 위험' : '[Dec 2026 Closing Target] If successful, IGIS\'s strongest reference for global LP expansion; if failed, risk of Brand Impairment') : 
                            '[2026.12 Target] Success: Ultimate reference for Global LP expansion. Failure: Brand Impairment risk.'}
                    </div>
                </div>
            </div>
        </section>
    );
}
