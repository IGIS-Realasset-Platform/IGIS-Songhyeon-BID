import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section67({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 857),
            setTimeout(() => setStep(4), 1163),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? '공실률 전망' : 'Vacancy Outlook'}</span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>노후 자산의 도태 속에서 오직 프라임 등급만이<br/>향유할 4% 이내 완전 임차</> : <>Only Prime Grades Enjoying Sub-4% Full Tenancy<br/>Amid Phasing Out of Aging Assets</>}
                </h2>

                {/* Custom Infographic: Inverted Pyramid / Tiers */}
                <div className="w-full max-w-[1000px] my-[20px] flex flex-col items-center">
                    
                    {/* Tier 1: Prime Trophy */}
                    <div className={`w-[60%] lg:w-[45%] bg-[#1d1d1f] text-white py-4 px-6 border-b-[4px] border-white z-30 relative shadow-2xl transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                        <div className="text-[20px] font-black mb-2 text-gray-300">{lang === 'kr' ? '최상위 프라임 등급 (Trophy)' : 'Top Prime Grade (Trophy)'}</div>
                        <div className="text-[34px] font-black text-white tracking-tighter">{lang === 'kr' ? '공실률 4% 이내 유지' : 'Sub-4% Vacancy Maintained'}</div>
                        <div className="absolute top-[50%] -translate-y-1/2 -right-6 translate-x-full hidden md:block text-left w-max">
                            <span className="font-black text-[#1d1d1f] text-[20px]">{lang === 'kr' ? '▶ 완전 임차(Full Occupancy) 달성' : '▶ Full Occupancy Achieved'}</span>
                        </div>
                    </div>

                    {/* Tier 2: Average */}
                    <div className={`w-[80%] lg:w-[65%] bg-gray-400 text-white py-4 px-6 border-b-[4px] border-white z-20 relative shadow-lg -mt-2 transition-all duration-[765ms] delay-100 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                        <div className="text-[18px] font-bold mb-2 text-gray-200">{lang === 'kr' ? '서울 권역 평균 (Base 시나리오)' : 'Seoul Avg (Base Scenario)'}</div>
                        <div className="text-[30px] font-black">{lang === 'kr' ? '2035년 이후 6~8% 도달' : '6~8% Reached Post-2035'}</div>
                        <div className="absolute top-[50%] -translate-y-1/2 -right-6 translate-x-full hidden md:block text-left w-max">
                            <span className="font-bold text-gray-500 text-[18px]">{lang === 'kr' ? '▶ 인구 감소 충격 반영 (완충 구간)' : '▶ Reflects Demo Shock (Buffer Zone)'}</span>
                        </div>
                    </div>

                    {/* Tier 3: Class B / Bear */}
                    <div className={`w-full lg:w-[85%] bg-gray-100 border-[4px] border-gray-300 text-gray-800 py-5 px-8 z-10 relative shadow-sm -mt-2 transition-all duration-[765ms] delay-[153ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                        <div className="text-[18px] font-bold mb-2 text-gray-500">{lang === 'kr' ? '일반 오피스 & 노후 자산 (Class B 이하)' : 'General/Aging (Class B & Below)'}</div>
                        <div className="text-[30px] font-black text-gray-700">{lang === 'kr' ? '10%+ 의미 있는 심각한 공실 발생' : '10%+ Meaningful Severe Vacancy'}</div>
                        <div className="absolute top-[50%] -translate-y-1/2 -right-6 translate-x-full hidden md:block text-left w-max">
                            <span className="font-black text-red-600 text-[18px]">{lang === 'kr' ? '▶ 자산 도태 가속화 (Flight-to-Quality)' : '▶ Accelerated Culling (Flight-to-Quality)'}</span>
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '권역 평균 공실률은 Base 시 2030년 5~7%, 2035년 이후 인구 감소가 반영되며 6~8%로 상승 전망' : 'Avg vacancy to rise from 5-7% in 2030 to 6-8% post-2035 reflecting demo decline (Base)'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-red-600">▪</span><span className="text-gray-600">{lang === 'kr' ? 'Bear 시나리오 발동 시 권역 평균 10% 이상 도달 및 Class B 이하 노후 자산의 급격한 도태 우려' : 'Under Bear, avg vacancy tops 10% triggering rapid culling of Class B and below'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span className="text-[#1d1d1f]">{lang === 'kr' ? '그러나 프라임 등급은 \'Flight-to-Quality\' 쏠림 현상으로 4% 이내의 완전 임차 상태를 구조적으로 향유' : 'However, Prime grades structurally enjoy sub-4% full occupancy due to Flight-to-Quality'}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
