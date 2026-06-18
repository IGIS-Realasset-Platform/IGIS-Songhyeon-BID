import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section37({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) {
            setStep(20);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 765),
            setTimeout(() => setStep(3), 1132),
            setTimeout(() => setStep(4), 1591),
            setTimeout(() => setStep(5), 2050)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center relative">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '전력 병목이 낳은 데이터센터의 희소성' : 'Data Center Scarcity'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? 'DC는 급격한 성장이 예상되지만 수도권 병목이 구조적 문제' : 'Rapid DC Growth Expected, but Metropolitan Bottlenecks Persist'}
                </h2>

                <div className="relative w-full max-w-[1200px] mt-[50px] mb-[40px] h-auto flex flex-col md:flex-row items-stretch justify-center z-10 gap-6">
                    
                    {/* Growth Box */}
                    <div className={`flex-1 flex flex-col items-center justify-center bg-gray-900 border border-gray-700 rounded-[24px] p-8 shadow-xl transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="text-gray-400 font-bold text-[20px] mb-2">{lang === 'kr' ? '한국 데이터센터 IT 용량 전망' : 'Korea DC IT Capacity Forecast'}</div>
                        
                        <div className="my-8 flex flex-col items-center w-full">
                            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-black text-[36px] tracking-tight mb-4">CAGR 26.3%</span>
                            <div className="flex items-center justify-center gap-3">
                                <div className="flex flex-col items-center">
                                    <span className="text-white font-black text-[36px] leading-none">1.96GW</span>
                                    <span className="text-gray-400 font-bold text-[18px] mt-1">(2025)</span>
                                </div>
                                <span className="text-cyan-400 font-black text-[30px] mb-6 mx-1">→</span>
                                <div className="flex flex-col items-center">
                                    <span className="text-white font-black text-[36px] leading-none">6.32GW</span>
                                    <span className="text-gray-400 font-bold text-[18px] mt-1">(2030)</span>
                                </div>
                            </div>
                        </div>
                        
                        <span className="absolute bottom-4 left-6 text-[11px] text-gray-500 font-medium">* Mordor Intelligence</span>
                    </div>

                    {/* Bottleneck Box */}
                    <div className={`flex-1 flex flex-col items-center justify-center bg-white border border-gray-300 rounded-[24px] p-8 shadow-xl transition-all duration-[765ms] delay-[153ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="text-red-600 font-black text-[24px] mb-6">{lang === 'kr' ? '극심한 신규 공급 병목' : 'Severe Supply Bottleneck'}</div>
                        
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex flex-col items-center justify-center bg-gray-50 py-4 rounded-xl border border-gray-200">
                                <span className="font-bold text-[16px] text-gray-600 mb-1">{lang === 'kr' ? '서울/판교 핵심 권역 공실률' : 'Seoul/Pangyo Core Vacancy'}</span>
                                <span className="font-black text-[28px] text-gray-900">6% {lang === 'kr' ? '미만' : '<'}</span>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-red-50 py-4 rounded-xl border border-red-200">
                                <span className="font-bold text-[16px] text-red-600 mb-1">{lang === 'kr' ? '전력 인입 물리적 대기 시간' : 'Power Connection Wait Time'}</span>
                                <span className="font-black text-[28px] text-red-600">{lang === 'kr' ? '최소 5년' : 'Min 5 Years'}</span>
                            </div>
                        </div>
                    </div>

                    {/* IGIS Portfolio Box */}
                    <div className={`flex-1 flex flex-col items-center justify-center bg-blue-50 border border-blue-200 rounded-[24px] p-8 shadow-xl transition-all duration-[765ms] delay-400 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="text-blue-700 font-black text-[24px] mb-2">{lang === 'kr' ? '이지스 선제적 포지셔닝' : 'IGIS Preemptive Positioning'}</div>
                        <p className="text-[15px] font-bold text-gray-500 mb-6">{lang === 'kr' ? '병목을 뚫은 압도적 자산 확보' : 'Secured Assets Ahead of Bottleneck'}</p>
                        
                        <div className="w-full flex flex-col gap-3">
                            <div className="bg-white px-4 py-3 rounded-xl border border-blue-100 font-bold text-gray-800 shadow-sm text-center text-[16px]">{lang === 'kr' ? '분당 Hostway IDC' : 'Bundang Hostway IDC'}</div>
                            <div className="bg-white px-4 py-3 rounded-xl border border-blue-100 font-bold text-gray-800 shadow-sm text-center text-[16px]">{lang === 'kr' ? '북미 13개 IDC 포트폴리오' : '13 North American IDC Portfolio'}</div>
                            <div className="mt-2 bg-blue-600 px-4 py-4 rounded-xl border border-blue-700 font-black text-white shadow-sm text-center text-[22px]">{lang === 'kr' ? '총 187MW 확보' : 'Total 187MW Secured'}</div>
                        </div>
                    </div>

                </div>

                {/* Summarized Bottom Text */}
                <div className={`mt-[20px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-indigo-500">▪</span><span>{lang === 'kr' ? <><strong>폭발적 수요 성장</strong>: 한국 IT 용량은 2030년까지 연평균 26.3% 고성장 전망</> : <><strong>Explosive Demand Growth</strong>: Korea's IT capacity is projected to grow at a high 26.3% CAGR until 2030.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-500">▪</span><span>{lang === 'kr' ? <><strong>구조적 공급 병목</strong>: 서울/판교 공실률 6% 미만, 전력 인입 5년 대기로 신규 공급이 막힌 상태</> : <><strong>Structural Supply Bottleneck</strong>: Seoul/Pangyo vacancy under 6%, new supply blocked by 5-year wait for power connection.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-500">▪</span><span>{lang === 'kr' ? <><strong>압도적 선점 효과</strong>: 187MW 규모의 우량 데이터센터를 선제 편입하여 공급 병목의 최대 수혜자로 등극</> : <><strong>Overwhelming Preemption Effect</strong>: Preemptively incorporated 187MW of prime data centers, becoming the biggest beneficiary of the supply bottleneck.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-indigo-500">▪</span><span><strong>Explosive Demand</strong>: Korea's IT capacity projected to grow at 26.3% CAGR until 2030.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-500">▪</span><span><strong>Structural Bottleneck</strong>: Sub-6% vacancy and 5-year power wait times severely restrict new supply.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-500">▪</span><span><strong>Preemptive Advantage</strong>: Securing 187MW of prime DC assets positioned IGIS to maximize returns.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
