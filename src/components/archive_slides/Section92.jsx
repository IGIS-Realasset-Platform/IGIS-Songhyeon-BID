import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section92({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918), // Left column (Trend/Evolution)
            setTimeout(() => setStep(4), 1300), // Right column (4 Points)
            setTimeout(() => setStep(5), 1912)  // Bottom thesis
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-blue-600 uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? 'IGIS Senior REIT의 300조 시장 점령전' : 'IGIS Senior REIT\'s Conquest of 300T KRW Market'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-12 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>연기금 D2C와 헬스케어를 결합한 시니어 하우징 블루오션</> : <>Senior Housing Blue Ocean Combining Pension D2C & Healthcare</>}
                </h2>

                <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 relative">
                    
                    {/* Left Column: Trend & Evolution */}
                    <div className={`col-span-1 md:col-span-5 flex flex-col gap-6 transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        {/* Trend */}
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left shadow-sm flex-1">
                            <h3 className="text-gray-500 font-bold text-[16px] mb-2">{lang === 'kr' ? '가장 확실한 메가 트렌드' : 'The Most Certain Mega Trend'}</h3>
                            <p className="text-[#1d1d1f] font-extrabold text-[18px] md:text-[20px] leading-snug break-keep">
                                {lang === 'kr' 
                                    ? (lang === 'kr' ? '침투율 0.6% → 5% 갭의 구조적 미충족 수요가 향후 15년을 지배' : 'Structural unmet demand from the 0.6% → 5% penetration rate gap will dominate the next 15 years.')
                                    : 'Structural unmet demand in the 0.6% → 5% penetration gap will dominate the next 15 years'}
                            </p>
                        </div>
                        {/* Evolution */}
                        <div className="bg-[#1e3a8a] rounded-2xl p-6 text-left shadow-md flex-1 text-white relative overflow-hidden">
                            <h3 className="text-blue-300 font-bold text-[16px] mb-2 relative z-10">{lang === 'kr' ? '시장 패러다임의 진화' : 'Evolution of Market Paradigm'}</h3>
                            <p className="font-extrabold text-[18px] md:text-[20px] leading-snug break-keep mb-3 relative z-10">
                                {lang === 'kr' 
                                    ? (lang === 'kr' ? '물류(쿠팡 효과) → 시니어 케어(주거) 효과로 대체' : 'Replacing Logistics (Coupang Effect) → Senior Care (Housing) Effect.')
                                    : 'Logistics (Coupang Effect) → Replaced by Senior Care (Housing) Effect'}
                            </p>
                            <p className="text-blue-100 font-medium text-[15px] leading-relaxed break-keep relative z-10">
                                {lang === 'kr' 
                                    ? (lang === 'kr' ? '1조→2조 달러 구간의 성장 동력이었던 물류가, 2조→3조 달러 구간에서는 시니어 하우징으로 완벽히 전환됨' : 'Logistics, the growth engine of the $1T-$2T period, completely transitions to senior housing in the $2T-$3T period.')
                                    : 'Logistics, the growth engine for the $1T→$2T phase, perfectly transitions to senior housing for the $2T→$3T phase'}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Key Strategies (4 Points) */}
                    <div className={`col-span-1 md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 text-left shadow-sm flex flex-col justify-start">
                            <div className="bg-blue-100 text-blue-600 font-black text-[16px] rounded-full w-8 h-8 flex items-center justify-center mb-3">1</div>
                            <h3 className="font-extrabold text-[17px] md:text-[19px] text-[#1d1d1f] mb-2 break-keep leading-tight">
                                {lang === 'kr' ? '글로벌 최고 수준의 운영자 협업' : 'World-class Operator Collaboration'}
                            </h3>
                            <p className="text-gray-500 font-medium text-[14.5px] leading-snug break-keep">
                                {lang === 'kr' ? '메리어트 시니어 리빙(Marriott Senior Living) 등 검증된 글로벌 운영사와의 파트너십' : 'Partnerships with proven global operators like Marriott Senior Living'}
                            </p>
                        </div>

                        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 text-left shadow-sm flex flex-col justify-start">
                            <div className="bg-blue-100 text-blue-600 font-black text-[16px] rounded-full w-8 h-8 flex items-center justify-center mb-3">2</div>
                            <h3 className="font-extrabold text-[17px] md:text-[19px] text-[#1d1d1f] mb-2 break-keep leading-tight">
                                {lang === 'kr' ? '의료기관 캡티브 연계' : 'Captive Medical Institution Linkage'}
                            </h3>
                            <p className="text-gray-500 font-medium text-[14.5px] leading-snug break-keep">
                                {lang === 'kr' ? '대형 병원 그룹과의 독점적 연계를 통한 강력한 헬스케어 인프라 구축' : 'Building robust healthcare infrastructure via exclusive ties with major hospital groups'}
                            </p>
                        </div>

                        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 text-left shadow-sm flex flex-col justify-start">
                            <div className="bg-blue-100 text-blue-600 font-black text-[16px] rounded-full w-8 h-8 flex items-center justify-center mb-3">3</div>
                            <h3 className="font-extrabold text-[17px] md:text-[19px] text-[#1d1d1f] mb-2 break-keep leading-tight">
                                {lang === 'kr' ? '연금 가입자 다이렉트 마케팅' : 'Pension Subscriber Direct Marketing'}
                            </h3>
                            <p className="text-gray-500 font-medium text-[14.5px] leading-snug break-keep">
                                {lang === 'kr' ? 'NPS, 공무원연금, 사학연금 등 확실한 자금력을 갖춘 은퇴자 대상 D2C 입주 마케팅' : 'D2C occupancy marketing targeting retirees with solid funds (NPS, etc.)'}
                            </p>
                        </div>

                        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 text-left shadow-sm flex flex-col justify-start">
                            <div className="bg-blue-100 text-blue-600 font-black text-[16px] rounded-full w-8 h-8 flex items-center justify-center mb-3">4</div>
                            <h3 className="font-extrabold text-[17px] md:text-[19px] text-[#1d1d1f] mb-2 break-keep leading-tight">
                                {lang === 'kr' ? '시니어 토탈 헬스케어 데이터 연동' : 'Senior Total Healthcare Data Sync'}
                            </h3>
                            <p className="text-gray-500 font-medium text-[14.5px] leading-snug break-keep">
                                {lang === 'kr' ? '시니어 하우징 + 헬스케어 + 데이터(웨어러블·AI 모니터링) 통합 솔루션 제공' : 'Providing integrated solutions: Senior Housing + Healthcare + Data (Wearables/AI)'}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Thesis Text */}
                <div className={`w-full max-w-[1100px] bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[17px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed text-center">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? <>KB골든라이프 모델을 시작으로, 글로벌 메리어트 운영과 연기금 퇴직자 D2C 마케팅을 결합해<br/>외인 자본(Invesco 등)을 압도할 1위 시니어 하우징 플랫폼을 구축한다.</> : <>Starting with the KB Golden Life model, building the #1 senior housing platform to overwhelm foreign capital (e.g. Invesco)<br/>by combining global Marriott operations and D2C marketing to pension fund retirees.</>)
                            : <>Starting with the KB Golden Life model, we combine global Marriott operations and D2C marketing to pension retirees<br/>to build the #1 senior housing platform that overwhelms foreign capital (Invesco, etc.).</>
                        }
                    </p>
                </div>

            </div>
        </section>
    );
}
