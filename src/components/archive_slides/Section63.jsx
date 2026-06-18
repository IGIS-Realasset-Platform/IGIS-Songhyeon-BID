import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section63({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918),
            setTimeout(() => setStep(4), 1300),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? '7축 메가 권역으로의 팽창' : 'Expansion to a 7-Axis Mega District'}</span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>YSBD(용산/서울역)와 KBD(삼성/잠실)가<br/>주도하는 권역 지도의 재편</> : <>Reorganization of District Map<br/>led by YSBD (Yongsan/Seoul Station) & KBD (Samsung/Jamsil)</>}
                </h2>

                {/* Custom Infographic: 5 to 7 Hubs */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-[40px] mb-[30px] max-w-[1200px] w-full">
                    {/* 5 Hubs */}
                    <div className={`flex flex-col items-center bg-gray-50 border-[4px] border-gray-300 p-8 w-full lg:w-[40%] transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="text-[20px] font-black text-gray-600 mb-6 uppercase tracking-widest">{lang === 'kr' ? '기존 5축 권역 구조' : 'Existing 5-Axis Structure'}</div>
                        <div className="flex w-full justify-center gap-4">
                            <div className="bg-gray-800 text-white w-[100px] py-4 flex items-center justify-center font-black text-[22px] shadow-md">CBD</div>
                            <div className="bg-gray-800 text-white w-[100px] py-4 flex items-center justify-center font-black text-[22px] shadow-md">GBD</div>
                            <div className="bg-gray-800 text-white w-[100px] py-4 flex items-center justify-center font-black text-[22px] shadow-md">YBD</div>
                        </div>
                        <div className="flex w-full justify-center gap-4 mt-4">
                            <div className="bg-gray-400 text-white w-[140px] py-3 flex items-center justify-center font-bold text-[18px]">{lang === 'kr' ? 'MBD (마곡)' : 'MBD (Magok)'}</div>
                            <div className="bg-gray-400 text-white w-[140px] py-3 flex items-center justify-center font-bold text-[18px]">{lang === 'kr' ? 'BBD (분당·판교)' : 'BBD (Bundang/Pangyo)'}</div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className={`text-[60px] text-blue-600 font-black transition-all duration-[765ms] delay-[153ms] ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>→</div>

                    {/* 7 Hubs */}
                    <div className={`flex flex-col items-center bg-blue-50 border-[6px] border-blue-600 py-7 px-10 w-full lg:w-[50%] shadow-2xl transition-all duration-[765ms] delay-400 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="text-[24px] font-black text-blue-900 mb-6 uppercase tracking-widest">{lang === 'kr' ? '진화된 7축 메가 권역' : 'Evolved 7-Axis Mega District'}</div>
                        <div className="w-full bg-white border-2 border-blue-200 p-6 flex flex-col items-center mb-4 shadow-sm relative">
                            <div className="absolute -top-3 bg-blue-600 text-white px-4 py-1 text-[14px] font-bold uppercase">{lang === 'kr' ? '신규 메가 거점 편입' : 'New Mega Nodes Included'}</div>
                            <div className="text-[36px] font-black text-[#1d1d1f] leading-tight text-center mt-2">
                                YSBD <span className="text-[20px] text-gray-500 font-bold">{lang === 'kr' ? '(용산·서울역)' : '(Yongsan/Seoul Stn)'}</span>
                            </div>
                            <div className="text-blue-500 font-black text-[24px] -my-1">+</div>
                            <div className="text-[36px] font-black text-[#1d1d1f] leading-tight text-center">
                                KBD <span className="text-[20px] text-gray-500 font-bold">{lang === 'kr' ? '(삼성·잠실)' : '(Samsung/Jamsil)'}</span>
                            </div>
                        </div>
                        <div className="text-[20px] font-bold text-gray-500 flex items-center gap-2">
                            <span className="text-gray-400">+</span>{lang === 'kr' ? '기존 5축 권역 병존' : 'Coexistence of Existing 5-Axis'}</div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '향후 15년간 가장 큰 구조 변화는 YSBD(용산역 + 서울역 IOTA 일대) 신규 권역의 등장과 GBD 동쪽 확장(GBC·잠실MICE·환승센터)임' : 'Biggest shift over 15 yrs is emergence of YSBD and GBD eastbound expansion (GBC, Jamsil MICE)'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span className="text-blue-900">{lang === 'kr' ? '기존 3대 핵심축(CBD, GBD, YBD)과 2대 확장축(MBD, BBD)에 2개의 신규 초대형 거점이 편입되며 7축 구조로 진화' : '2 new mega-nodes added to existing 3 cores and 2 extended axes, evolving into 7-axis structure'}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
