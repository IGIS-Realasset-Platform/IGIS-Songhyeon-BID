import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section103({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 857), // Left Panel
            setTimeout(() => setStep(4), 1163), // Right Panel
            setTimeout(() => setStep(5), 1469), // Alert Pulse
            setTimeout(() => setStep(6), 1928), // Bottom text
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        Asset Management & CF Protection
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>선제적 위험 관리 및 운용 대시보드</> : <>Proactive Risk Management & Operation Dashboard</>}
                </h2>

                {/* Infographic Area: Dashboard UI */}
                <div className="w-full max-w-[1100px] mt-[20px] mb-[36px] flex flex-col lg:flex-row gap-6 justify-center">
                    
                    {/* Left Panel: UI Mockup */}
                    <div className={`flex-[1.2] bg-white border-4 border-[#1e3a8a] rounded-none p-8 shadow-sm flex flex-col transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                         
                         {/* Top: Warning Alert */}
                         <div className="bg-gray-50 border border-gray-200 rounded-sm p-5 flex items-center gap-5 mb-6 relative overflow-hidden">
                             <div className={`absolute left-0 top-0 bottom-0 w-2 bg-red-600 transition-opacity ${step >= 5 ? 'animate-pulse' : ''}`}></div>
                             <div className={`bg-red-600 text-white font-black px-4 py-2 text-[18px] tracking-widest ${step >= 5 ? 'animate-pulse' : ''}`}>
                                ALERT
                             </div>
                             <div className="text-left">
                                 <div className="font-black text-[#1e3a8a] text-[18px] md:text-[20px] mb-1">
                                    {lang === 'kr' ? '공실 위험 조기 경보' : 'Early Vacancy Warning'}
                                 </div>
                                 <div className="text-red-600 font-bold text-[15px]">
                                    {lang === 'kr' ? 'Tenant B - 계약 연장 확률 < 30%' : 'Tenant B - Renewal probability < 30%'}
                                 </div>
                             </div>
                         </div>
                         
                         {/* Bottom: 2 Modules */}
                         <div className="flex flex-col md:flex-row gap-4">
                             {/* Module 1 */}
                             <div className="flex-1 bg-gray-50 border border-gray-300 rounded-sm p-6 flex flex-col items-center justify-center">
                                 <div className="w-full h-4 bg-gray-200 mb-4 overflow-hidden relative">
                                    <div className="h-full bg-red-600 w-[85%] absolute left-0 top-0"></div>
                                 </div>
                                 <div className="font-bold text-gray-800 text-[16px] mb-1">{lang === 'kr' ? '임대료 연체 예측' : 'Arrears Prediction'}</div>
                                 <div className="text-red-600 font-black text-[22px]">High Risk</div>
                             </div>
                             {/* Module 2 */}
                             <div className="flex-1 bg-gray-50 border border-gray-300 rounded-sm p-6 flex flex-col items-center justify-center">
                                 <div className="w-full h-4 bg-gray-200 mb-4 overflow-hidden relative">
                                    <div className="h-full bg-green-500 w-[20%] absolute left-0 top-0"></div>
                                 </div>
                                 <div className="font-bold text-gray-800 text-[16px] mb-1">{lang === 'kr' ? '캡엑스(CAPEX) 최적화' : 'CAPEX Optimization'}</div>
                                 <div className="text-[#1e3a8a] font-black text-[22px]">Optimal</div>
                             </div>
                         </div>
                    </div>

                    {/* Right Panel: Impact Impact */}
                    <div className={`flex-[0.8] bg-[#1d1d1f] border-4 border-[#1e3a8a] rounded-none p-10 flex flex-col justify-center relative overflow-hidden transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                        <div className="relative z-10 text-left">
                            <h4 className="text-gray-400 font-bold text-[18px] md:text-[22px] mb-2">
                                {lang === 'kr' ? '운용 효율 개선 효과' : 'Operational Efficiency Gain'}
                            </h4>
                            <div className="font-black text-[50px] md:text-[65px] leading-none mb-4 text-white tracking-tighter">
                                30<span className="text-[25px] md:text-[35px]">%</span>
                            </div>
                            <div className="w-12 h-1 bg-gray-500 mb-6"></div>
                            <div className="text-gray-300 text-[18px] md:text-[20px] font-bold leading-relaxed break-keep">
                                {lang === 'kr' 
                                    ? (lang === 'kr' ? <>이지스 73조 원 AUM 전체에 적용 시<br/>캐시플로우 보호 및 막대한 비용 절감 기대</> : <>When applied across IGIS's entire 73T KRW AUM,<br/>expected to protect cash flows and massively reduce costs.</>) 
                                    : <>Expecting massive cost savings and cash flow protection<br/>across IGIS 73T KRW AUM</>}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Text (Style from 59~62p) */}
                <div className={`max-w-[1200px] mt-2 text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '사람의 직관에 의존하던 임차인 리스크 관리를 데이터 기반의 조기 경보 시스템으로 대체' : 'Replacing human intuition with data-driven early warning systems for tenant risk management'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span className="text-indigo-900">{lang === 'kr' ? '임대료 연체 예측 및 CAPEX 최적화를 통해 거대 펀드의 누수 비용을 원천 차단' : 'Preventing leakage costs of massive funds through rent arrears prediction & CAPEX optimization'}</span></li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
