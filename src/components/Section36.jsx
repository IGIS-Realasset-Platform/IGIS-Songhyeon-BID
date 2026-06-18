import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section36({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

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
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '물류센터 공급 과잉의 소화와 정상화' : 'Normalization of Logistics Oversupply'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '신규공급 감소되며 정상화 진행중, 안성의 신규 부상' : 'Normalization Amid Supply Drop, Rise of Anseong'}
                </h2>

                <div className="relative w-full max-w-[1100px] mt-[50px] mb-[40px] h-auto flex flex-col md:flex-row items-center justify-center z-10 gap-10">
                    
                    {/* Vacancy Trend */}
                    <div className={`relative w-[450px] flex flex-col items-center bg-white border border-gray-300 rounded-[30px] p-10 shadow-xl transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="absolute -top-6 bg-gradient-to-r from-red-500 to-rose-600 text-white font-black text-[22px] px-6 py-2 rounded-full shadow-md">
                            {lang === 'kr' ? '수도권 Grade-A 공실률' : 'Grade-A Vacancy Rate'}
                        </div>
                        
                        <div className="w-full flex justify-between items-end mt-6 mb-8 px-4">
                            <div className="flex flex-col items-center">
                                <span className="text-gray-400 font-bold text-[14px]">{lang === 'kr' ? '23~24 (과잉공급)' : '23~24 (Oversupply)'}</span>
                                <span className="text-red-500 font-black text-[38px]">23%</span>
                            </div>
                            <div className="text-gray-300 font-black text-[32px] mb-2">→</div>
                            <div className="flex flex-col items-center">
                                <span className="text-gray-400 font-bold text-[14px]">{lang === 'kr' ? '2025 (공급 68%↓)' : '2025 (Supply 68%↓)'}</span>
                                <span className="text-blue-600 font-black text-[38px]">19~20%</span>
                            </div>
                        </div>

                        <div className="w-full bg-blue-50 py-3 rounded-xl border border-blue-100 text-center">
                            <span className="text-blue-700 font-black text-[20px]">{lang === 'kr' ? '정상화 국면 진입' : 'Entering Normalization Phase'}</span>
                        </div>
                    </div>

                    <div className={`text-[40px] font-black text-gray-300 transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        &
                    </div>

                    {/* Regional Shift */}
                    <div className={`relative w-[450px] flex flex-col items-center bg-white border border-gray-300 rounded-[30px] p-8 shadow-xl transition-all duration-[765ms] delay-[153ms] ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="absolute -top-6 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-black text-[22px] px-6 py-2 rounded-full shadow-md">
                            {lang === 'kr' ? '권역별 지형도 변화' : 'Regional Dynamics'}
                        </div>
                        
                        <div className="w-full flex flex-col gap-5 mt-6">
                            <div className="flex flex-col items-center justify-center py-2 relative">
                                <span className="font-black text-[36px] text-gray-900 tracking-tight">{lang === 'kr' ? '안성' : 'Anseong'}</span>
                                <span className="font-extrabold text-[18px] text-emerald-600 bg-emerald-50 px-4 py-1 rounded-full mt-2">{lang === 'kr' ? '수도권 3대 물류권역 급부상' : 'Emerged as Top 3 Hub'}</span>
                            </div>
                            <div className="w-full h-[1px] bg-gray-200"></div>
                            <div className="flex flex-col items-center justify-center py-2 relative">
                                <span className="font-black text-[32px] text-gray-800 tracking-tight">{lang === 'kr' ? '이천·용인' : 'Icheon·Yongin'}</span>
                                <span className="font-extrabold text-[16px] text-blue-600 bg-blue-50 px-4 py-1 rounded-full mt-2">{lang === 'kr' ? '콜드체인 거점화 강세' : 'Cold Chain Dominance'}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Summarized Bottom Text */}
                <div className={`mt-[20px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-blue-500">▪</span><span>{lang === 'kr' ? <><strong>공실률 피크아웃</strong>: 과잉 공급으로 23%까지 치솟았던 공실률이 19~20%대로 하향 안정화 진행</> : <><strong>Vacancy Rate Peak-out</strong>: Vacancy rates that spiked to 23% due to oversupply are stabilizing downwards to 19-20%.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-500">▪</span><span>{lang === 'kr' ? <><strong>신규 공급 급감</strong>: 2025년 예정된 신규 공급이 전년 대비 약 68% 감소하며 시장 정상화 가속</> : <><strong>New Supply Plunge</strong>: Planned new supply in 2025 dropped ~68% YoY, accelerating market normalization.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-500">▪</span><span>{lang === 'kr' ? <><strong>지형도 재편</strong>: 안성이 3대 핵심 물류권역으로 도약했으며, 이천·용인은 콜드체인 거점 굳히기 돌입</> : <><strong>Landscape Reshaping</strong>: Anseong leaped into the Top 3 logistics regions, while Icheon/Yongin solidified as cold chain hubs.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-blue-500">▪</span><span><strong>Vacancy Peak-out</strong>: 23% vacancy rate from oversupply is normalizing down to 19-20%.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-500">▪</span><span><strong>Supply Drop</strong>: 2025 new supply plummets by 68%, accelerating market normalization.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-500">▪</span><span><strong>Regional Shift</strong>: Anseong rises as a Top 3 hub, while Icheon/Yongin solidify cold chain dominance.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
