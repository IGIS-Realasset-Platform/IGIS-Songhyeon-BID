import os

code_62 = """import React, { useState, useEffect } from 'react';

export default function Section62({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 1000),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#1d1d1f] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            
            <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center text-center relative z-10">
                <div className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[24px] md:text-[30px] font-medium text-gray-400 tracking-[0.2em] mb-[20px] uppercase">
                        Chapter 4
                    </span>
                </div>

                <h1 className={`text-[46px] md:text-[70px] lg:text-[85px] font-black leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-[-0.03em] break-keep transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
                    서울 오피스 시장<br/>2030~2040 전망
                </h1>
                
                <div className={`w-[80px] h-[4px] bg-blue-600 mt-[40px] transition-all duration-1000 delay-700 ${step >= 2 ? 'opacity-100 w-[80px]' : 'opacity-0 w-0'}`}></div>
            </div>
        </section>
    );
}
"""

code_63 = """import React, { useState, useEffect } from 'react';

export default function Section63({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 800),
            setTimeout(() => setStep(3), 1300),
            setTimeout(() => setStep(4), 1800),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        7축 메가 권역으로의 팽창
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    YSBD(용산/서울역)와 KBD(삼성/잠실)가<br/>주도하는 권역 지도의 재편
                </h2>

                {/* Custom Infographic: 5 to 7 Hubs */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-[40px] mb-[30px] max-w-[1200px] w-full">
                    {/* 5 Hubs */}
                    <div className={`flex flex-col items-center bg-gray-50 border-[4px] border-gray-300 p-8 w-full lg:w-[40%] transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="text-[20px] font-black text-gray-600 mb-6 uppercase tracking-widest">기존 5축 권역 구조</div>
                        <div className="flex w-full justify-center gap-4">
                            <div className="bg-gray-800 text-white w-[100px] py-4 flex items-center justify-center font-black text-[22px] shadow-md">CBD</div>
                            <div className="bg-gray-800 text-white w-[100px] py-4 flex items-center justify-center font-black text-[22px] shadow-md">GBD</div>
                            <div className="bg-gray-800 text-white w-[100px] py-4 flex items-center justify-center font-black text-[22px] shadow-md">YBD</div>
                        </div>
                        <div className="flex w-full justify-center gap-4 mt-4">
                            <div className="bg-gray-400 text-white w-[140px] py-3 flex items-center justify-center font-bold text-[18px]">MBD (마곡)</div>
                            <div className="bg-gray-400 text-white w-[140px] py-3 flex items-center justify-center font-bold text-[18px]">BBD (분당·판교)</div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className={`text-[60px] text-blue-600 font-black transition-all duration-1000 delay-200 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>→</div>

                    {/* 7 Hubs */}
                    <div className={`flex flex-col items-center bg-blue-50 border-[6px] border-blue-600 p-10 w-full lg:w-[50%] shadow-2xl transition-all duration-1000 delay-400 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="text-[24px] font-black text-blue-900 mb-6 uppercase tracking-widest">진화된 7축 메가 권역</div>
                        <div className="w-full bg-white border-2 border-blue-200 p-6 flex flex-col items-center mb-4 shadow-sm relative">
                            <div className="absolute -top-3 bg-blue-600 text-white px-4 py-1 text-[14px] font-bold uppercase">신규 메가 거점 편입</div>
                            <div className="text-[36px] font-black text-[#1d1d1f] leading-tight text-center mt-2">
                                YSBD <span className="text-[20px] text-gray-500 font-bold">(용산·서울역)</span>
                            </div>
                            <div className="text-blue-500 font-black text-[24px] my-1">+</div>
                            <div className="text-[36px] font-black text-[#1d1d1f] leading-tight text-center">
                                KBD <span className="text-[20px] text-gray-500 font-bold">(삼성·잠실)</span>
                            </div>
                        </div>
                        <div className="text-[20px] font-bold text-gray-500 flex items-center gap-2">
                            <span className="text-gray-400">+</span> 기존 5축 권역 병존
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>향후 15년간 가장 큰 구조 변화는 YSBD(용산역 + 서울역 IOTA 일대) 신규 권역의 등장과 GBD 동쪽 확장(GBC·잠실MICE·환승센터)임</span></li>
                        <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span className="text-blue-900">기존 3대 핵심축(CBD, GBD, YBD)과 2대 확장축(MBD, BBD)에 2개의 신규 초대형 거점이 편입되며 7축 구조로 진화</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

code_64 = """import React, { useState, useEffect } from 'react';

export default function Section64({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 800),
            setTimeout(() => setStep(3), 1300),
            setTimeout(() => setStep(4), 1800),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        Base 시나리오 하의 임대료 수직 상승
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    2040년 평당 34만 원을 돌파할<br/>신규 트로피 자산(IOTA·GBC)의 프라이싱
                </h2>

                {/* Custom Infographic: Rent Forecast Grid */}
                <div className="w-full max-w-[1100px] mt-[50px] mb-[40px] transition-all duration-1000 flex flex-col">
                    <div className="grid grid-cols-4 gap-4 w-full">
                        {/* Headers */}
                        <div className="col-span-1 bg-transparent"></div>
                        <div className={`text-center font-black text-[22px] border-b-[4px] border-gray-300 pb-2 transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>2030년</div>
                        <div className={`text-center font-black text-[22px] border-b-[4px] border-gray-300 pb-2 transition-all duration-1000 delay-100 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>2035년</div>
                        <div className={`text-center font-black text-[24px] border-b-[4px] border-[#1d1d1f] pb-2 text-[#1d1d1f] transition-all duration-1000 delay-200 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>2040년</div>
                        
                        {/* Row 1: CBD */}
                        <div className={`bg-gray-100 border-l-[6px] border-gray-400 p-4 font-black flex items-center justify-center text-center text-[18px] text-gray-700 transition-all duration-700 delay-300 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>CBD 프라임 평균</div>
                        <div className={`bg-gray-50 border-[2px] border-gray-200 p-4 flex flex-col items-center justify-center font-black text-[24px] transition-all duration-700 delay-400 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>17~18<span className="text-[16px] font-bold text-gray-500">만 원</span></div>
                        <div className={`bg-gray-50 border-[2px] border-gray-200 p-4 flex flex-col items-center justify-center font-black text-[24px] transition-all duration-700 delay-500 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>21~23<span className="text-[16px] font-bold text-gray-500">만 원</span></div>
                        <div className={`bg-gray-100 border-[2px] border-gray-300 p-4 flex flex-col items-center justify-center font-black text-[28px] text-gray-800 transition-all duration-700 delay-600 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>25~28<span className="text-[16px] font-bold text-gray-500">만 원</span></div>

                        {/* Row 2: GBD */}
                        <div className={`bg-blue-50 border-l-[6px] border-blue-500 p-4 font-black flex items-center justify-center text-center text-[18px] text-blue-900 mt-2 transition-all duration-700 delay-400 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>GBD 프라임 평균</div>
                        <div className={`bg-blue-50/50 border-[2px] border-blue-100 p-4 flex flex-col items-center justify-center font-black text-[24px] mt-2 transition-all duration-700 delay-500 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>18~20<span className="text-[16px] font-bold text-gray-500">만 원</span></div>
                        <div className={`bg-blue-50/50 border-[2px] border-blue-100 p-4 flex flex-col items-center justify-center font-black text-[24px] mt-2 transition-all duration-700 delay-600 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>24~27<span className="text-[16px] font-bold text-gray-500">만 원</span></div>
                        <div className={`bg-blue-100 border-[2px] border-blue-300 p-4 flex flex-col items-center justify-center font-black text-[30px] text-blue-900 mt-2 transition-all duration-700 delay-700 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>30~34<span className="text-[16px] font-bold text-blue-700">만 원</span></div>

                        {/* Row 3: Trophy */}
                        <div className={`bg-[#1d1d1f] text-white p-4 font-black flex flex-col items-center justify-center text-center text-[20px] mt-2 shadow-lg transition-all duration-700 delay-500 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>IOTA·GBC<br/><span className="text-[14px] font-bold text-gray-400">신규 트로피 자산</span></div>
                        <div className={`bg-white border-[4px] border-[#1d1d1f] p-4 flex flex-col items-center justify-center font-black text-[28px] mt-2 shadow-sm transition-all duration-700 delay-600 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>22~26<span className="text-[16px] font-bold text-gray-500">만 원</span></div>
                        <div className={`bg-white border-[4px] border-[#1d1d1f] p-4 flex flex-col items-center justify-center font-black text-[28px] mt-2 shadow-sm transition-all duration-700 delay-700 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>USD 130~160<span className="text-[16px] font-bold text-gray-500">/sqft/yr</span></div>
                        <div className={`bg-[#1d1d1f] text-white p-4 flex flex-col items-center justify-center font-black text-[24px] mt-2 shadow-lg transition-all duration-700 delay-800 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>도쿄 수준의<br/><span className="text-[28px] text-yellow-400 leading-none mt-1">65~80%</span></div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>CBD 프라임은 2025년 약 14만 원에서 2040년 25~28만 원으로 상승 전망</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>GBD 프라임은 2025년 약 14.5만 원에서 2040년 30~34만 원까지 수직 상승 전망</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span className="text-[#1d1d1f]">IOTA 및 GBC 등 신규 트로피 자산은 도쿄 마루노우치(USD 200/sqft) 대비 65~80% 수준으로 수렴하며 압도적 프라이싱 형성</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

code_65 = """import React, { useState, useEffect } from 'react';

export default function Section65({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 800),
            setTimeout(() => setStep(3), 1400),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        Bull 시나리오의 도쿄 마루노우치 수렴
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    평당 50만 원 시대, 글로벌 1선 도시의<br/>핵심부와 어깨를 나란히 하다
                </h2>

                {/* Custom Infographic: Bull Scenario High Impact */}
                <div className="flex flex-col lg:flex-row w-full max-w-[1100px] mt-[60px] mb-[50px] gap-6 lg:gap-10">
                    {/* Left: Seoul Trophy */}
                    <div className={`flex-1 bg-white border-[6px] border-[#1d1d1f] p-10 flex flex-col justify-center items-center shadow-2xl relative transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="absolute -top-4 bg-[#1d1d1f] text-white px-6 py-1 font-black text-[16px] uppercase tracking-wider">2040 Bull Scenario</div>
                        <div className="text-[24px] font-bold text-gray-500 mb-2 mt-4">IOTA·GBC 신규 트로피 자산</div>
                        <div className="flex items-end mt-4">
                            <span className="text-[90px] font-black text-[#1d1d1f] leading-none tracking-tighter">50</span>
                            <span className="text-[36px] font-black text-gray-800 mb-2 ml-2">만 원</span>
                        </div>
                        <div className="text-[18px] font-bold text-gray-500 mt-2">/ 평·월</div>
                        <div className="w-full bg-gray-100 mt-8 p-4 font-bold text-gray-800 text-[22px] border-l-[6px] border-[#1d1d1f]">
                            환산 시 USD 200/sqft 돌파
                        </div>
                    </div>

                    {/* Equal Sign */}
                    <div className={`hidden lg:flex items-center justify-center transition-all duration-1000 delay-200 ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <div className="text-[60px] font-black text-gray-300">≒</div>
                    </div>

                    {/* Right: Tokyo Marunouchi */}
                    <div className={`flex-1 bg-[#1d1d1f] text-white border-[6px] border-[#1d1d1f] p-10 flex flex-col justify-center items-center shadow-2xl relative transition-all duration-1000 delay-300 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="absolute -top-4 bg-yellow-500 text-black px-6 py-1 font-black text-[16px] uppercase tracking-wider">Global Benchmark</div>
                        <div className="text-[24px] font-bold text-gray-400 mb-2 mt-4">글로벌 최고 수준 핵심 권역</div>
                        <div className="text-[54px] font-black text-white leading-tight mt-4 text-center">
                            도쿄<br/>마루노우치
                        </div>
                        <div className="w-full border-t border-gray-700 mt-8 pt-6">
                            <div className="text-gray-300 font-bold text-[20px] text-center leading-snug">
                                글로벌 1선 도시 코어 오피스와의<br/>임대료 디커플링(Decoupling) 완전 해소
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>가장 낙관적인 Bull 시나리오 발동 시, GBD 프라임은 2040년 38~42만 원 수준 도달 전망</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span className="text-[#1d1d1f]">IOTA 및 GBC 트로피 자산은 2035년 35만 원을 거쳐 2040년 45~50만 원/평·월 시대 개막</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>이는 도쿄 마루노우치 코어 오피스의 상징적 저항선인 USD 200/sqft와 완전히 수렴하는 역사적 분기점</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

code_66 = """import React, { useState, useEffect } from 'react';

export default function Section66({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 800),
            setTimeout(() => setStep(3), 1400),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        극단적 양극화를 방어하는 트로피 자산
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    Bear 국면에서도 프리미엄을 사수할<br/>신규 랜드마크의 탁월한 자산 방어력
                </h2>

                {/* Custom Infographic: Polarization / Shield */}
                <div className="w-full max-w-[1100px] mt-[50px] mb-[40px] flex flex-col transition-all duration-[1000ms]">
                    
                    <div className={`flex w-full justify-center transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-gray-800 text-white px-10 py-3 font-bold text-[20px] uppercase tracking-widest shadow-md">
                            2030년 정점 이후 인구·기업 통폐합 쇼크 (Bear Scenario)
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row w-full items-stretch gap-6 mt-6">
                        {/* Losers */}
                        <div className={`flex-1 border-[4px] border-gray-300 bg-gray-50 p-10 flex flex-col items-center text-center transition-all duration-1000 delay-100 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                            <div className="text-[60px] mb-6 grayscale opacity-80">📉</div>
                            <div className="text-[28px] font-black text-gray-700 mb-4">가치 약세 및 횡보</div>
                            <div className="w-[60%] border-t-[3px] border-gray-300 my-4"></div>
                            <div className="text-[20px] font-bold text-gray-600 mt-2">일반 등급 클래스(Class B) 공실 누적</div>
                            <div className="text-[20px] font-bold text-gray-600 mt-2">CBD 일부 노후 자산 임대료 약세</div>
                        </div>

                        {/* Winners (Shield) */}
                        <div className={`flex-1 border-[6px] border-[#1d1d1f] bg-white p-10 flex flex-col items-center text-center shadow-2xl relative transition-all duration-1000 delay-300 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                            <div className="absolute -top-5 bg-[#1d1d1f] text-white px-6 py-2 font-black text-[18px] uppercase tracking-wider">
                                Safe Haven
                            </div>
                            <div className="text-[60px] mb-6">🛡️</div>
                            <div className="text-[28px] font-black text-[#1d1d1f] mb-4">절대적 방어력 (프리미엄 사수)</div>
                            <div className="w-[60%] border-t-[3px] border-[#1d1d1f] my-4"></div>
                            <div className="text-[22px] font-black text-[#1d1d1f] mt-2">IOTA · GBC 신규 트로피 자산</div>
                            <div className="text-[18px] font-bold text-gray-700 mt-4 px-4">
                                거시 하방 충격에도 GBD·삼성동 코어 수요 집중으로 견고한 가격 유지
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>Bear 시나리오 발동 시 2030년 정점 이후 인구 및 기업 본사 통폐합으로 전체 시장 임대료 횡보세 진입</span></li>
                        <li className="flex items-start"><span className="mr-3 text-gray-500">▪</span><span className="text-gray-600">CBD 일부 자산은 노후화와 수요 이탈로 약세를 보이며 극단적 양극화 현상 심화</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span className="text-[#1d1d1f]">반면 IOTA 등 삼성동 신규 랜드마크는 핵심 코어 자산으로서 자본의 '안전 도피처(Safe Haven)' 역할을 수행</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

code_67 = """import React, { useState, useEffect } from 'react';

export default function Section67({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 800),
            setTimeout(() => setStep(3), 1200),
            setTimeout(() => setStep(4), 1600),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        Flight-to-Quality라는 비가역적 진리
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    노후 자산의 도태 속에서 오직 프라임 등급만이<br/>향유할 4% 이내 완전 임차
                </h2>

                {/* Custom Infographic: Inverted Pyramid / Tiers */}
                <div className="w-full max-w-[1000px] mt-[50px] mb-[50px] flex flex-col items-center">
                    
                    {/* Tier 1: Prime Trophy */}
                    <div className={`w-[60%] lg:w-[45%] bg-[#1d1d1f] text-white p-6 border-b-[4px] border-white z-30 relative shadow-2xl transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                        <div className="text-[20px] font-black mb-2 text-gray-300">최상위 프라임 등급 (Trophy)</div>
                        <div className="text-[34px] font-black text-white tracking-tighter">공실률 4% 이내 유지</div>
                        <div className="absolute top-[50%] -translate-y-1/2 -right-6 translate-x-full hidden md:block text-left w-max">
                            <span className="font-black text-[#1d1d1f] text-[20px]">▶ 완전 임차(Full Occupancy) 달성</span>
                        </div>
                    </div>

                    {/* Tier 2: Average */}
                    <div className={`w-[80%] lg:w-[65%] bg-gray-400 text-white p-6 border-b-[4px] border-white z-20 relative shadow-lg -mt-2 transition-all duration-1000 delay-100 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                        <div className="text-[18px] font-bold mb-2 text-gray-200">서울 권역 평균 (Base 시나리오)</div>
                        <div className="text-[30px] font-black">2035년 이후 6~8% 도달</div>
                        <div className="absolute top-[50%] -translate-y-1/2 -right-6 translate-x-full hidden md:block text-left w-max">
                            <span className="font-bold text-gray-500 text-[18px]">▶ 인구 감소 충격 반영 (완충 구간)</span>
                        </div>
                    </div>

                    {/* Tier 3: Class B / Bear */}
                    <div className={`w-full lg:w-[85%] bg-gray-100 border-[4px] border-gray-300 text-gray-800 p-8 z-10 relative shadow-sm -mt-2 transition-all duration-1000 delay-200 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                        <div className="text-[18px] font-bold mb-2 text-gray-500">일반 오피스 & 노후 자산 (Class B 이하)</div>
                        <div className="text-[30px] font-black text-gray-700">10%+ 의미 있는 심각한 공실 발생</div>
                        <div className="absolute top-[50%] -translate-y-1/2 -right-6 translate-x-full hidden md:block text-left w-max">
                            <span className="font-black text-red-600 text-[18px]">▶ 자산 도태 가속화 (Flight-to-Quality)</span>
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>권역 평균 공실률은 Base 시 2030년 5~7%, 2035년 이후 인구 감소가 반영되며 6~8%로 상승 전망</span></li>
                        <li className="flex items-start"><span className="mr-3 text-red-600">▪</span><span className="text-gray-600">Bear 시나리오 발동 시 권역 평균 10% 이상 도달 및 Class B 이하 노후 자산의 급격한 도태 우려</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span className="text-[#1d1d1f]">그러나 프라임 등급은 'Flight-to-Quality' 쏠림 현상으로 4% 이내의 완전 임차 상태를 구조적으로 향유</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

with open('src/components/Section62.jsx', 'w', encoding='utf-8') as f: f.write(code_62)
with open('src/components/Section63.jsx', 'w', encoding='utf-8') as f: f.write(code_63)
with open('src/components/Section64.jsx', 'w', encoding='utf-8') as f: f.write(code_64)
with open('src/components/Section65.jsx', 'w', encoding='utf-8') as f: f.write(code_65)
with open('src/components/Section66.jsx', 'w', encoding='utf-8') as f: f.write(code_66)
with open('src/components/Section67.jsx', 'w', encoding='utf-8') as f: f.write(code_67)

print("Generated Section62.jsx to Section67.jsx.")
