import os

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
                <div className="w-full max-w-[1100px] mt-[40px] mb-[40px] transition-all duration-1000 flex flex-col">
                    <div className="grid grid-cols-4 gap-4 w-full text-[16px] lg:text-[20px]">
                        {/* Headers */}
                        <div className="col-span-1 bg-transparent"></div>
                        <div className={`text-center font-black text-[22px] border-b-[4px] border-gray-400 text-gray-800 pb-2 transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>2030년</div>
                        <div className={`text-center font-black text-[22px] border-b-[4px] border-gray-400 text-gray-800 pb-2 transition-all duration-1000 delay-100 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>2035년</div>
                        <div className={`text-center font-black text-[24px] border-b-[4px] border-[#1d1d1f] pb-2 text-[#1d1d1f] transition-all duration-1000 delay-200 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>2040년</div>
                        
                        {/* Row 1: CBD */}
                        <div className={`bg-gray-200 border-l-[6px] border-gray-500 p-4 font-black flex items-center justify-center text-center text-gray-900 transition-all duration-700 delay-300 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>CBD 프라임 평균</div>
                        <div className={`bg-gray-50 border-[2px] border-gray-300 p-4 flex items-center justify-center font-black transition-all duration-700 delay-400 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>17~18<span className="font-bold text-gray-800 ml-1">만 원</span></div>
                        <div className={`bg-gray-50 border-[2px] border-gray-300 p-4 flex items-center justify-center font-black transition-all duration-700 delay-500 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>21~23<span className="font-bold text-gray-800 ml-1">만 원</span></div>
                        <div className={`bg-gray-100 border-[3px] border-gray-400 p-4 flex items-center justify-center font-black text-gray-900 transition-all duration-700 delay-600 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>25~28<span className="font-bold text-gray-800 ml-1">만 원</span></div>

                        {/* Row 2: GBD */}
                        <div className={`bg-blue-100 border-l-[6px] border-blue-600 p-4 font-black flex items-center justify-center text-center text-blue-900 mt-2 transition-all duration-700 delay-400 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>GBD 프라임 평균</div>
                        <div className={`bg-blue-50 border-[2px] border-blue-200 p-4 flex items-center justify-center font-black mt-2 text-blue-900 transition-all duration-700 delay-500 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>18~20<span className="font-bold text-blue-900 ml-1">만 원</span></div>
                        <div className={`bg-blue-50 border-[2px] border-blue-200 p-4 flex items-center justify-center font-black mt-2 text-blue-900 transition-all duration-700 delay-600 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>24~27<span className="font-bold text-blue-900 ml-1">만 원</span></div>
                        <div className={`bg-blue-100 border-[3px] border-blue-400 p-4 flex items-center justify-center font-black text-[24px] text-blue-900 mt-2 transition-all duration-700 delay-700 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>30~34<span className="text-[20px] font-bold text-blue-900 ml-1">만 원</span></div>

                        {/* Row 3: IOTA */}
                        <div className={`bg-[#1d1d1f] text-white p-4 font-black flex items-center justify-center text-center shadow-lg mt-2 transition-all duration-700 delay-500 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>IOTA 서울 트로피 오피스</div>
                        <div className={`bg-white border-[4px] border-[#1d1d1f] p-4 flex flex-col items-center justify-center font-black mt-2 shadow-sm text-gray-900 transition-all duration-700 delay-600 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>23~26<span className="font-bold text-gray-800">만 원</span></div>
                        <div className={`bg-white border-[4px] border-[#1d1d1f] p-4 flex flex-col items-center justify-center font-black mt-2 shadow-sm text-gray-900 transition-all duration-700 delay-700 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>USD 130~160<span className="text-[14px] font-bold text-gray-800">/sqft/yr</span></div>
                        <div className={`bg-[#1d1d1f] text-white p-4 flex flex-col items-center justify-center font-black text-[22px] mt-2 shadow-lg transition-all duration-700 delay-800 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>도쿄 수준의<span className="text-[28px] text-yellow-400 leading-none mt-1">65~80%</span></div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-[#1d1d1f] break-keep text-center transition-all duration-[900ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>CBD 프라임은 2030년 약 17~18만 원에서 2040년 25~28만 원으로 상승 전망</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>GBD 프라임은 2030년 약 18~20만 원에서 2040년 30~34만 원까지 수직 상승 전망</span></li>
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

# Remove the line: <div className="w-[60%] border-t-[3px] border-gray-300 my-4"></div>
# and <div className="w-[60%] border-t-[3px] border-[#1d1d1f] my-4"></div>
s66 = s66.replace('<div className="w-[60%] border-t-[3px] border-gray-300 my-4"></div>', '')
s66 = s66.replace('<div className="w-[60%] border-t-[3px] border-[#1d1d1f] my-4"></div>', '')

# Reduce height: py-6 px-10 -> py-4 px-10
s66 = s66.replace('py-6 px-10 flex flex-col', 'py-4 px-10 flex flex-col')
s66 = s66.replace('mb-6 grayscale', 'mb-2 grayscale') # reduce margin under icon
s66 = s66.replace('mb-6">🛡️</div>', 'mb-2">🛡️</div>') # reduce margin under shield icon
s66 = s66.replace('mb-4">가치 약세', 'mb-1">가치 약세') # reduce margin under text
s66 = s66.replace('mb-4">절대적 방어력', 'mb-1">절대적 방어력') # reduce margin under text

with open('src/components/Section66.jsx', 'w', encoding='utf-8') as f: f.write(s66)

print("Patched 65p and 67p successfully.")
