import os

# S62
s62 = """import React, { useState, useEffect } from 'react';

export default function Section62({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const t1 = setTimeout(() => setStep(1), 300);
        const t2 = setTimeout(() => setStep(2), 900);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#1d1d1f] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <style>{`
                .gradient-text-ch4 {
                    background: linear-gradient(90deg, #c1e2dd, #587d94);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                <div className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-normal text-white mb-[14px]" style={{ fontFamily: "'Sanomat Wp', 'Sanomat Web', 'Sanomat', sans-serif" }}>
                        Chapter 4.
                    </span>
                </div>
                <h2 className={`text-[34px] md:text-[54px] lg:text-[66px] font-bold leading-[calc(1.3em-6px)] break-keep transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="gradient-text-ch4">
                        서울 오피스 시장 2030~2040 전망
                    </span>
                </h2>
            </div>
        </section>
    );
}
"""
with open('src/components/Section62.jsx', 'w', encoding='utf-8') as f: f.write(s62)

# S63 (64)
with open('src/components/Section63.jsx', 'r', encoding='utf-8') as f:
    s63 = f.read()
# change my-1 to -my-1 and p-10 to py-7 px-10
s63 = s63.replace('border-blue-600 p-10 w-full', 'border-blue-600 py-7 px-10 w-full')
s63 = s63.replace('text-blue-500 font-black text-[24px] my-1', 'text-blue-500 font-black text-[24px] -my-1')
with open('src/components/Section63.jsx', 'w', encoding='utf-8') as f: f.write(s63)

# S64 (65)
s64 = """import React, { useState, useEffect } from 'react';

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
                    <span className="inline-block text-[22px] md:text-[26px] font-black text-[#1d1d1f] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        Base 시나리오 임대료 전망
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    2040년 평당 34만 원을 돌파할<br/>신규 트로피 자산(IOTA·GBC)의 프라이싱
                </h2>

                {/* Custom Infographic: Rent Forecast Grid */}
                <div className="w-full max-w-[1200px] mt-[40px] mb-[30px] transition-all duration-1000 flex flex-col">
                    <div className="grid grid-cols-5 gap-3 w-full text-[15px] lg:text-[18px]">
                        {/* Headers */}
                        <div className="col-span-1 bg-transparent"></div>
                        <div className={`text-center font-black border-b-[4px] border-gray-300 pb-2 transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>2025년</div>
                        <div className={`text-center font-black border-b-[4px] border-gray-300 pb-2 transition-all duration-1000 delay-100 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>2030년</div>
                        <div className={`text-center font-black border-b-[4px] border-gray-300 pb-2 transition-all duration-1000 delay-200 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>2035년</div>
                        <div className={`text-center font-black border-b-[4px] border-[#1d1d1f] pb-2 text-[#1d1d1f] transition-all duration-1000 delay-300 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>2040년</div>
                        
                        {/* Row 1: CBD */}
                        <div className={`bg-gray-100 border-l-[6px] border-gray-400 p-2 lg:p-3 font-black flex items-center justify-center text-center text-gray-800 transition-all duration-700 delay-300 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>CBD 프라임 평균</div>
                        <div className={`bg-gray-50 border-[2px] border-gray-200 p-2 lg:p-3 flex items-center justify-center font-black transition-all duration-700 delay-400 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>약 14<span className="font-bold text-gray-800 ml-1">만 원</span></div>
                        <div className={`bg-gray-50 border-[2px] border-gray-200 p-2 lg:p-3 flex items-center justify-center font-black transition-all duration-700 delay-500 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>17~18<span className="font-bold text-gray-800 ml-1">만 원</span></div>
                        <div className={`bg-gray-50 border-[2px] border-gray-200 p-2 lg:p-3 flex items-center justify-center font-black transition-all duration-700 delay-600 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>21~23<span className="font-bold text-gray-800 ml-1">만 원</span></div>
                        <div className={`bg-gray-100 border-[2px] border-gray-300 p-2 lg:p-3 flex items-center justify-center font-black text-gray-900 transition-all duration-700 delay-700 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>25~28<span className="font-bold text-gray-800 ml-1">만 원</span></div>

                        {/* Row 2: GBD */}
                        <div className={`bg-blue-50 border-l-[6px] border-blue-500 p-2 lg:p-3 font-black flex items-center justify-center text-center text-blue-900 mt-1 transition-all duration-700 delay-400 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>GBD 프라임 평균</div>
                        <div className={`bg-blue-50/50 border-[2px] border-blue-100 p-2 lg:p-3 flex items-center justify-center font-black mt-1 transition-all duration-700 delay-500 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>약 14.5<span className="font-bold text-gray-800 ml-1">만 원</span></div>
                        <div className={`bg-blue-50/50 border-[2px] border-blue-100 p-2 lg:p-3 flex items-center justify-center font-black mt-1 transition-all duration-700 delay-600 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>18~20<span className="font-bold text-gray-800 ml-1">만 원</span></div>
                        <div className={`bg-blue-50/50 border-[2px] border-blue-100 p-2 lg:p-3 flex items-center justify-center font-black mt-1 transition-all duration-700 delay-700 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>24~27<span className="font-bold text-gray-800 ml-1">만 원</span></div>
                        <div className={`bg-blue-100 border-[2px] border-blue-300 p-2 lg:p-3 flex items-center justify-center font-black text-blue-900 mt-1 transition-all duration-700 delay-800 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>30~34<span className="font-bold text-blue-800 ml-1">만 원</span></div>

                        {/* Row 3: GBC */}
                        <div className={`bg-gray-100 border-l-[6px] border-[#1d1d1f] p-2 lg:p-3 font-black flex items-center justify-center text-center text-[#1d1d1f] mt-1 transition-all duration-700 delay-500 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>삼성동 트로피 (GBC)</div>
                        <div className={`bg-gray-50 border-[2px] border-gray-200 p-2 lg:p-3 flex items-center justify-center font-bold text-gray-400 mt-1 transition-all duration-700 delay-600 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>-</div>
                        <div className={`bg-gray-50 border-[2px] border-gray-200 p-2 lg:p-3 flex flex-col items-center justify-center font-black mt-1 transition-all duration-700 delay-700 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>22~25<span className="font-bold text-gray-800">만 원</span></div>
                        <div className={`bg-gray-50 border-[2px] border-gray-200 p-2 lg:p-3 flex items-center justify-center font-bold text-gray-400 mt-1 transition-all duration-700 delay-800 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>-</div>
                        <div className={`bg-gray-50 border-[2px] border-gray-200 p-2 lg:p-3 flex items-center justify-center font-bold text-gray-400 mt-1 transition-all duration-700 delay-900 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>-</div>

                        {/* Row 4: IOTA */}
                        <div className={`bg-[#1d1d1f] text-white p-2 lg:p-3 font-black flex items-center justify-center text-center shadow-lg mt-1 transition-all duration-700 delay-600 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>IOTA 서울 트로피 오피스</div>
                        <div className={`bg-white border-[3px] border-[#1d1d1f] p-2 lg:p-3 flex items-center justify-center font-bold text-gray-400 mt-1 shadow-sm transition-all duration-700 delay-700 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>-</div>
                        <div className={`bg-white border-[3px] border-[#1d1d1f] p-2 lg:p-3 flex flex-col items-center justify-center font-black mt-1 shadow-sm transition-all duration-700 delay-800 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>23~26<span className="font-bold text-gray-800">만 원</span></div>
                        <div className={`bg-white border-[3px] border-[#1d1d1f] p-2 lg:p-3 flex flex-col items-center justify-center font-black mt-1 shadow-sm transition-all duration-700 delay-900 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>USD 130~160<span className="text-[12px] font-bold text-gray-600">/sqft/yr</span></div>
                        <div className={`bg-[#1d1d1f] text-white p-2 lg:p-3 flex flex-col items-center justify-center font-black mt-1 shadow-lg transition-all duration-700 delay-1000 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>도쿄 수준의<span className="text-yellow-400 leading-none">65~80%</span></div>
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
with open('src/components/Section64.jsx', 'w', encoding='utf-8') as f: f.write(s64)


# S66 (67)
with open('src/components/Section66.jsx', 'r', encoding='utf-8') as f:
    s66 = f.read()
# change p-10 to py-6 px-10 to reduce 30px (actually padding top/bottom reduces by 16px each, total 32px height)
s66 = s66.replace('p-10 flex flex-col items-center text-center', 'py-6 px-10 flex flex-col items-center text-center')
with open('src/components/Section66.jsx', 'w', encoding='utf-8') as f: f.write(s66)


# S67 (68)
with open('src/components/Section67.jsx', 'r', encoding='utf-8') as f:
    s67 = f.read()
# change subtitle
s67 = s67.replace('Flight-to-Quality라는 비가역적 진리', '공실률 전망')
# adjust padding and margin to reduce height
s67 = s67.replace('mt-[50px] mb-[50px]', 'my-[20px]')
s67 = s67.replace('p-6 border-b-[4px]', 'py-4 px-6 border-b-[4px]')
s67 = s67.replace('p-8 z-10', 'py-5 px-8 z-10')
with open('src/components/Section67.jsx', 'w', encoding='utf-8') as f: f.write(s67)

print("Chapter 4 slides patched successfully.")
