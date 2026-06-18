import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section117({ isActive }) {
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
            <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-center h-full">
                {/* Header */}
                <div className="w-full flex flex-col items-center text-center mb-[36px]">
                    <div className={`transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                            {lang === 'kr' ? '국가 인프라급 교통 결절점' : 'Core Location Value'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '압도적인 광역 교통망과 도심 연결성' : 'Overwhelming Transit Network & CBD Connectivity'}
                    </h2>
                </div>

                {/* Content: 3 Cards */}
                <div className={`w-full max-w-[1200px] mx-auto mt-[10px] mb-[36px] grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-[612ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Card 1: Network */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] p-8 flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[26px] md:text-[30px] mb-2 uppercase">Transit Network</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-6 border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '7개 철도 노선 교차점' : 'Intersection of 7 Rail Lines'}
                        </div>
                        <ul className="text-[18px] text-gray-600 font-medium leading-relaxed space-y-2">
                            <li>▪ KTX · SRT</li>
                            <li>▪ {lang === 'kr' ? '1호선 · 4호선 · 공항철도' : 'Line 1, 4, AREX'}</li>
                            <li>▪ {lang === 'kr' ? 'GTX-A (2024 개통)' : 'GTX-A (Opened 2024)'}</li>
                            <li>▪ {lang === 'kr' ? 'GTX-B (2030 개통 예정)' : 'GTX-B (Expected 2030)'}</li>
                        </ul>
                    </div>

                    {/* Card 2: Connectivity */}
                    <div className="bg-white border-[6px] border-[#1d1d1f] p-8 flex flex-col shadow-sm">
                        <div className="text-[#1d1d1f] font-black text-[26px] md:text-[30px] mb-2 uppercase">Connectivity</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-6 border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '보행 및 지하철 연결성' : 'Pedestrian & Subway Access'}
                        </div>
                        <ul className="text-[18px] text-gray-600 font-medium leading-relaxed space-y-2">
                            <li>▪ {lang === 'kr' ? '남산 (자연 녹지)' : 'Namsan (Nature/Greenery)'}</li>
                            <li>▪ {lang === 'kr' ? '도심 (전통적 CBD)' : 'Downtown (Traditional CBD)'}</li>
                            <li>▪ {lang === 'kr' ? '용산국제업무지구 (예정)' : 'Yongsan IBD (Planned)'}</li>
                            <li>▪ {lang === 'kr' ? '마포 · 여의도 접근성' : 'Mapo/Yeouido Accessibility'}</li>
                        </ul>
                    </div>

                    {/* Card 3: Global Entry */}
                    <div className="bg-[#1e3a8a] border-[6px] border-[#1e3a8a] p-8 flex flex-col shadow-sm">
                        <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">Global Entry</div>
                        <div className="text-[#93c5fd] font-bold text-[20px] mb-4">
                            {lang === 'kr' ? '외국인 비즈니스 관광 진입점' : 'Foreign Business Tourism Entry Point'}
                        </div>
                        <p className="text-[20px] text-blue-50 font-medium leading-relaxed">
                            {lang === 'kr' ? (
                                <>
                                    {lang === 'kr' ? '인천국제공항과 공항철도로 직결되어' : 'Directly connected to Incheon Int\'l Airport via AREX,'}<br/>
                                    {lang === 'kr' ? '서울 진입 시 가장 먼저 마주하는 관문' : 'the first gateway upon entering Seoul'}<br/>
                                    {lang === 'kr' ? '(약 30분 소요)' : '(approx. 30 mins)'}
                                </>
                            ) : (
                                'Directly connected to Incheon International Airport via AREX, serving as the first gateway upon entering Seoul (approx. 30 min).'
                            )}
                        </p>
                    </div>
                </div>

                {/* Bottom text */}
                <div className={`w-full max-w-[1200px] mx-auto mt-2 text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[612ms] delay-[122ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1d1d1f]">▪</span>
                            <span className="text-[#1d1d1f]">{lang === 'kr' ? '도쿄역(JR 라인 + 신칸센)에 비견되는 국가 인프라급 중심지' : 'A national infrastructure-level hub comparable to Tokyo Station'}</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1d1d1f]">▪</span>
                            <span className="text-[#1d1d1f]">{lang === 'kr' ? '남산(녹지) + 도심(CBD) + 용산국제업무지구(예정) + 마포·여의도와의 보행/지하철 연결성' : 'Pedestrian and subway connectivity to Namsan (greenery) + CBD + Yongsan IBD + Mapo/Yeouido'}</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1d1d1f]">▪</span>
                            <span className="text-[#1d1d1f]">{lang === 'kr' ? '외국인 비즈니스 관광 진입점 (인천공항 직결, 30분)' : 'Entry point for foreign business tourism (Directly connected to Incheon Airport, 30 min)'}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
