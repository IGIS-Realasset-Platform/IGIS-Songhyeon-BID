import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section72({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? 'Grade-A 물류센터의 패러다임 전환' : 'Paradigm Shift in Grade-A Logistics'}</span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>모든 신규 대형 물류센터의 절대적 설계 표준<br/>로봇·AMR 친화형</> : <>Absolute Design Standard for All New Mega Logistics Centers:<br/>Robot/AMR Friendly</>}
                </h2>

                {/* Custom Infographic */}
                <div className="w-full max-w-[1000px] mt-[20px] mb-[20px] flex flex-col items-center transition-all duration-[765ms]">
                    
                    <div className={`w-full bg-[#1d1d1f] text-white py-4 px-6 shadow-2xl relative z-20 transition-all duration-[765ms] delay-100 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-[18px] font-bold text-gray-400 uppercase tracking-widest">{lang === 'kr' ? 'Industry Leaders 주도' : 'Led by Industry Leaders'}</div>
                        <div className="flex flex-wrap justify-center gap-6 mt-2">
                            <span className="text-[28px] font-black leading-none">{lang === 'kr' ? '쿠팡' : 'Coupang'}</span>
                            <span className="text-[28px] font-black leading-none">{lang === 'kr' ? 'CJ대한통운' : 'CJ Logistics'}</span>
                            <span className="text-[28px] font-black leading-none">{lang === 'kr' ? '네이버' : 'Naver'}</span>
                            <span className="text-[28px] font-black leading-none">{lang === 'kr' ? 'LG CNS' : 'LG CNS'}</span>
                        </div>
                    </div>

                    <div className={`w-[90%] bg-white border-[6px] border-[#1d1d1f] py-4 px-8 shadow-lg relative z-10 -mt-2 transition-all duration-[765ms] delay-[230ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-[36px] font-bold text-[#888] mb-2">{lang === 'kr' ? '로봇 · AMR 친화 설계 (Robot-Friendly)' : 'Robot & AMR Friendly Design'}</div>
                        <div className="w-full flex flex-col md:flex-row justify-center gap-4 mt-2">
                            <div className="flex-1 bg-gray-50 border-[2px] border-gray-200 py-3 px-2 font-bold text-gray-800 text-[17px] break-keep flex items-center justify-center text-center">{lang === 'kr' ? '초평탄 바닥 구조 및 하중 강화' : 'Super Flat Floor & Load Bearing'}</div>
                            <div className="flex-1 bg-gray-50 border-[2px] border-gray-200 py-3 px-2 font-bold text-gray-800 text-[17px] break-keep flex items-center justify-center text-center">{lang === 'kr' ? '물류 로봇 전용 동선 최적화' : 'Optimized Robot Routing'}</div>
                            <div className="flex-1 bg-gray-50 border-[2px] border-gray-200 py-3 px-2 font-bold text-gray-800 text-[17px] break-keep flex items-center justify-center text-center">{lang === 'kr' ? '고전력 인입 및 5G 통신망 완비' : 'High Power & 5G Network Ready'}</div>
                        </div>
                    </div>

                    <div className={`w-[80%] bg-blue-600 text-white p-6 shadow-md relative z-0 -mt-2 transition-all duration-[765ms] delay-[383ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-[24px] font-black">{lang === 'kr' ? '향후 모든 신규 Grade-A 물류센터의 절대적 표준' : 'Absolute Standard for all Future Grade-A Logistics'}</div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-[#1d1d1f] break-keep text-center transition-all duration-[689ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '쿠팡, CJ대한통운, 네이버, LG CNS 등 물류 및 IT 거인들이 전면적인 자동화를 시장의 벤치마크로 주도' : 'Logistics/IT giants like Coupang, CJ, Naver lead full automation as the market benchmark'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '바닥 평탄도, 로봇 전용 통신/전력망, 하중 등 로봇(AMR/AGV) 운영에 최적화된 하드웨어 스펙 필수 요구' : 'Requires HW specs optimized for AMR/AGV operations: flat floors, dedicated networks, loads'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span className="text-blue-900">{lang === 'kr' ? '단순 창고를 넘어선 \'자동화 설비의 플랫폼\'으로서 로봇 친화 설계가 우량 물류센터의 생존 조건으로 정착' : 'Beyond mere warehousing, robot-friendly design becomes a survival condition as an \'automation platform\''}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
