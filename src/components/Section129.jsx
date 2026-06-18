import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section129({ isActive }) {
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
                            {lang === 'kr' ? '정치·규제 및 자산 운영' : 'Politics, Regulations & Operations'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '인허가 변수 및 앵커 임차인 확보 리스크' : 'Permit Variables & Anchor Tenant Risks'}
                    </h2>
                </div>

                {/* Content: 2 Cards (1x2 grid) */}
                <div className={`w-full max-w-[1200px] mx-auto mt-[10px] mb-[36px] grid grid-cols-1 md:grid-cols-2 gap-[20px] transition-all duration-[612ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Card 1 */}
                    <div className="bg-white border-[6px] border-[#1d1d1f] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[6px]">RISK 4</div>
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '규제 및 정치 변수' : 'Regulatory & Political Variables'}
                        </div>
                        <ul className="text-[18px] text-gray-600 font-medium leading-relaxed space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#1d1d1f] mr-2">▪</span>
                                <span>{lang === 'kr' ? '서울시 도시계획위원회 정비계획안 승인은 확보(2023.11). 그러나 향후 인허가·환경·교통영향평가·문화재 단계 잔여.' : 'Secured urban planning approval, but permits and various impact assessments remain.'}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2">▪</span>
                                <span>{lang === 'kr' ? '정권이나 서울시장 교체 시 도시계획 변동 가능성.' : 'Possibility of urban planning changes due to political shifts.'}</span>
                            </li>
                            <li className="flex flex-col bg-red-50 p-4 rounded-lg mt-2 border border-red-100">
                                <span className="font-bold text-red-800 mb-1">{lang === 'kr' ? '핵심 요구사항' : 'Key Requirement'}</span>
                                <span className="text-[17px] text-red-700">{lang === 'kr' ? '향후 이재명 정부 후반기(2027~2030)의 부동산·도시계획 기조와의 철저한 Alignment 필요.' : 'Thorough alignment with the real estate/urban planning stance of the late Lee Jae-myung administration (2027-2030) is required.'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border-[6px] border-[#1d1d1f] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[6px]">RISK 5</div>
                        <div className="text-[#1d1d1f] font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '앵커 임차인 확보' : 'Securing Anchor Tenants'}
                        </div>
                        <ul className="text-[18px] text-gray-600 font-medium leading-relaxed space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#1d1d1f] mr-2">▪</span>
                                <span>{lang === 'kr' ? '삼성물산 마스터리스 75% 확약 및 리츠칼튼 호텔 운영 협약은 큰 진전이나, 삼성물산 확약 연장 협상이 본PF 전환의 변수.' : 'Samsung C&T master lease (75%) and Ritz-Carlton agreement are progress, but lease extension negotiation is a variable for Main PF.'}</span>
                            </li>
                            <li className="flex flex-col bg-gray-50 p-4 rounded-lg mt-2">
                                <span className="font-bold text-[#1d1d1f] mb-1">{lang === 'kr' ? 'Trophy Positioning의 핵심' : 'Core of Trophy Positioning'}</span>
                                <span className="text-[17px]">{lang === 'kr' ? '오피스 잔여 25% 이상 공간에 대한 글로벌 다국적 본사(Google Korea, Microsoft Korea, Amazon Korea 등) 유치.' : 'Attracting global HQs (Google, MS, Amazon, etc.) for the remaining 25% office space.'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom text */}
                <div className={`w-full text-center mt-2 transition-all duration-[612ms] delay-[122ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-block bg-[#1d1d1f] text-white px-8 py-5 text-[20px] md:text-[22px] font-bold shadow-lg break-keep">
                        {lang === 'kr' ? 
                            (lang === 'kr' ? '정권·정책 변화에 유연하게 대응하고, 글로벌 앵커 테넌트로 자산 가치 극대화' : 'Flexibly responding to regime/policy changes and maximizing asset value with global anchor tenants') : 
                            'Flexibly respond to political shifts and maximize asset value with global anchor tenants'}
                    </div>
                </div>
            </div>
        </section>
    );
}
