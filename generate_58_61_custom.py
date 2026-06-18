import os

code_58 = """import React, { useState, useEffect } from 'react';

export default function Section58({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 900),
            setTimeout(() => setStep(3), 1400),
            setTimeout(() => setStep(4), 1800),
            setTimeout(() => setStep(5), 2200),
            setTimeout(() => setStep(6), 2600),
            setTimeout(() => setStep(7), 3000),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* Theme */}
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        인구 구조 1 혹독한 인구 다이어트의 시작
                    </span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    2024년 5,175만 정점 통과 후 직면할<br/>가파른 국가 규모 축소의 현실
                </h2>

                {/* Custom Infographic: Population Drop Bar Chart */}
                <div className="relative w-full max-w-[1000px] mt-[60px] mb-[40px] h-[320px] flex items-end justify-between px-4 md:px-12 border-b-[4px] border-[#1d1d1f]">
                    {/* Y-Axis Label */}
                    <div className="absolute left-[-20px] top-0 h-full flex flex-col justify-between text-gray-400 font-bold text-[14px]">
                        <span>6,000만</span>
                        <span>4,000만</span>
                        <span>2,000만</span>
                        <span>0</span>
                    </div>

                    {/* Bar 1: 2024 */}
                    <div className={`flex flex-col items-center w-[12%] transition-all duration-1000 ease-out ${step >= 2 ? 'opacity-100 h-full' : 'opacity-0 h-0'}`}>
                        <span className="text-[20px] md:text-[26px] font-black text-black mb-2">5,175만</span>
                        <div className="w-full bg-[#1d1d1f] rounded-t-sm" style={{ height: '86%' }}></div>
                        <span className="mt-4 font-bold text-[18px] text-black">2024 (정점)</span>
                    </div>

                    {/* Bar 2: 2040 */}
                    <div className={`flex flex-col items-center w-[12%] transition-all duration-1000 ease-out ${step >= 3 ? 'opacity-100 h-full' : 'opacity-0 h-0'}`}>
                        <span className="text-[18px] md:text-[22px] font-bold text-gray-600 mb-2">4,734만</span>
                        <div className="w-full bg-gray-400 rounded-t-sm" style={{ height: '79%' }}></div>
                        <span className="mt-4 font-bold text-[16px] text-gray-600">2040</span>
                    </div>

                    {/* Bar 3: 2050 */}
                    <div className={`flex flex-col items-center w-[12%] transition-all duration-1000 ease-out ${step >= 4 ? 'opacity-100 h-full' : 'opacity-0 h-0'}`}>
                        <span className="text-[18px] md:text-[22px] font-bold text-gray-600 mb-2">4,300만</span>
                        <div className="w-full bg-gray-400 rounded-t-sm" style={{ height: '71%' }}></div>
                        <span className="mt-4 font-bold text-[16px] text-gray-600">2050</span>
                    </div>

                    {/* Bar 4: 2060 */}
                    <div className={`flex flex-col items-center w-[12%] transition-all duration-1000 ease-out ${step >= 5 ? 'opacity-100 h-full' : 'opacity-0 h-0'}`}>
                        <span className="text-[18px] md:text-[22px] font-bold text-gray-600 mb-2">3,664만</span>
                        <div className="w-full bg-gray-400 rounded-t-sm" style={{ height: '61%' }}></div>
                        <span className="mt-4 font-bold text-[16px] text-gray-600">2060</span>
                    </div>

                    {/* Bar 5: 2100 */}
                    <div className={`flex flex-col items-center w-[12%] transition-all duration-1000 ease-out ${step >= 6 ? 'opacity-100 h-full' : 'opacity-0 h-0'}`}>
                        <span className="text-[20px] md:text-[26px] font-black text-red-600 mb-2 whitespace-nowrap -ml-8 -mr-8">1,100~3,000만</span>
                        <div className="w-full bg-red-600 rounded-t-sm" style={{ height: '35%' }}></div>
                        <span className="mt-4 font-black text-[18px] text-red-600">2100 (추정)</span>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[20px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>통계청·UN 중위 변동치 기준 2024년 5,175만 명 정점 이후 본격적인 감소 진입</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>2040년 약 4,734만 명, 2050년 약 4,300만 명, 2060년 3,664만 명으로 가파른 축소</span></li>
                        <li className="flex items-start"><span className="mr-3 text-red-600">▪</span><span className="text-red-900">Bayesian 확률 추정 기준 2100년에는 1,100만~3,000만 명 사이로 국가 규모 축소 불가피</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

code_59 = """import React, { useState, useEffect } from 'react';

export default function Section59({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 900),
            setTimeout(() => setStep(3), 1400),
            setTimeout(() => setStep(4), 1800),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        인구 구조 2 생산 인구 35% 증발의 충격파
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    2035년 고령 비중 30% 돌파가 몰고 올<br/>잠재성장률 하방 압력
                </h2>

                {/* Custom Infographic: Dual Insight */}
                <div className="w-full max-w-[1100px] mt-[40px] mb-[30px] flex flex-col md:flex-row gap-8 justify-center">
                    
                    {/* Left: Aging Percentage */}
                    <div className={`flex-1 flex flex-col items-center bg-gray-50 border-[4px] border-gray-200 p-8 transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <h3 className="text-[24px] font-black text-black mb-8">고령 인구(65세 이상) 비중 급증</h3>
                        <div className="flex w-full items-end justify-center gap-6 h-[180px]">
                            <div className="flex flex-col items-center w-[30%]">
                                <span className="font-bold text-gray-500 mb-2">20%</span>
                                <div className="w-full bg-gray-300 h-[60px]"></div>
                                <span className="mt-3 font-bold text-gray-600">2025</span>
                            </div>
                            <div className="flex flex-col items-center w-[30%]">
                                <span className="font-black text-black mb-2 text-[22px]">30%</span>
                                <div className="w-full bg-black h-[100px]"></div>
                                <span className="mt-3 font-black text-black">2035</span>
                            </div>
                            <div className="flex flex-col items-center w-[30%]">
                                <span className="font-bold text-gray-500 mb-2">33%</span>
                                <div className="w-full bg-gray-400 h-[120px]"></div>
                                <span className="mt-3 font-bold text-gray-600">2040</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Shrinking Workforce */}
                    <div className={`flex-1 flex flex-col items-center bg-red-50 border-[4px] border-red-200 p-8 transition-all duration-1000 delay-200 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <h3 className="text-[24px] font-black text-red-700 mb-8">생산가능인구(15~64세) 증발</h3>
                        <div className="flex w-full items-center justify-between mt-4">
                            <div className="flex flex-col items-center">
                                <div className="w-[120px] h-[120px] bg-red-200 rounded-full flex items-center justify-center border-4 border-red-400">
                                    <span className="font-black text-red-800 text-[24px]">3,738만</span>
                                </div>
                                <span className="mt-4 font-bold text-gray-700">2020년</span>
                            </div>
                            
                            <div className="flex flex-col items-center">
                                <span className="text-[32px] font-black text-red-600 mb-1">📉 -35%</span>
                                <div className="h-[4px] w-[60px] bg-red-600"></div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-[80px] h-[80px] bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="font-black text-white text-[18px]">2,419만</span>
                                </div>
                                <span className="mt-4 font-black text-red-700">2050년</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>65세 이상 고령자 비중은 2025년 20%로 초고령사회 진입 후 2035년 30%를 돌파 전망</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>생산가능인구(15~64세)는 2020년 3,738만 명에서 2050년 2,419만 명으로 약 35% 증발</span></li>
                        <li className="flex items-start"><span className="mr-3 text-red-600">▪</span><span className="text-red-900">극단적인 부양비 증가와 노동력 부족으로 거시 경제의 잠재성장률 하방 압력 가중</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

code_60 = """import React, { useState, useEffect } from 'react';

export default function Section60({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 900),
            setTimeout(() => setStep(3), 1400),
            setTimeout(() => setStep(4), 1900),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        인구 구조 3 인구 역설이 창출할 자본의 대이동
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    가계 자산의 유동화가 열어젖힐<br/>자산운용 및 시니어 하우징 수요의 빅뱅
                </h2>

                {/* Custom Infographic: Capital Flow Diagram */}
                <div className="w-full max-w-[1100px] mt-[50px] mb-[40px] flex flex-col lg:flex-row items-center justify-between gap-6">
                    
                    {/* Catalyst */}
                    <div className={`w-full lg:w-[35%] bg-black p-10 flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="text-[20px] font-bold text-gray-400 mb-2">인구 감소의 역설</div>
                        <h3 className="text-[34px] font-black leading-tight text-center">가계 자산의<br/>대규모 유동화</h3>
                        <p className="mt-6 text-gray-300 font-medium">부동산 및 금융 자산 처분 가속</p>
                    </div>

                    {/* Arrow */}
                    <div className={`hidden lg:flex flex-col items-center justify-center transition-all duration-1000 delay-200 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <div className="w-[80px] h-[80px] bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-300">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                    </div>

                    {/* Results */}
                    <div className={`w-full lg:w-[50%] flex flex-col gap-4 transition-all duration-1000 delay-400 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="w-full bg-blue-50 border-l-[8px] border-blue-600 p-8 flex items-center shadow-sm">
                            <div className="text-[28px] font-black text-blue-900">자산운용 산업으로의 폭발적 자본 이전</div>
                        </div>
                        <div className="w-full bg-green-50 border-l-[8px] border-green-600 p-8 flex items-center shadow-sm">
                            <div className="text-[28px] font-black text-green-900">시니어 하우징 및 헬스케어 수요 빅뱅</div>
                        </div>
                        <div className="w-full bg-gray-100 border border-gray-300 p-4 text-center mt-2">
                            <span className="font-bold text-gray-600">💡 글로벌 벤치마크: 일본 '잃어버린 30년'의 신규 시장 패턴과 유사</span>
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>거시 양면성: 노동력 부족이라는 부정 효과와 시니어 하우징 등 신규 시장 창출 효과 병존</span></li>
                        <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span className="text-blue-900">가계의 부동산·금융 자산 처분이 자산운용 산업으로 이전되며 거대한 자본 대이동 발생</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>일본이 잃어버린 30년에도 자산운용·시니어 케어·인바운드 관광에서 새 시장을 만들어낸 패턴과 유사</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

code_61 = """import React, { useState, useEffect } from 'react';

export default function Section61({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 900),
            setTimeout(() => setStep(3), 1400),
            setTimeout(() => setStep(4), 1800),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        인구 구조 4 이민자 수용 및 AI로 방어하는 펀더멘털
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    외국인 10% 비중 확대와 기술적 생산성<br/>상쇄를 통한 거시 연착륙 전략
                </h2>

                {/* Custom Infographic: Two Pillars */}
                <div className="w-full max-w-[1000px] mt-[50px] mb-[40px] flex flex-col gap-2 transition-all duration-[1000ms]">
                    
                    <div className={`text-[20px] font-bold text-gray-500 mb-4 transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        잠재성장률 하방 압력을 방어하기 위한 2대 핵심 전략
                    </div>

                    <div className="flex flex-col md:flex-row w-full gap-6">
                        {/* Pillar 1 */}
                        <div className={`flex-1 bg-white shadow-xl border-t-[8px] border-indigo-600 p-10 flex flex-col items-center justify-center transition-all duration-1000 delay-100 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-[26px] font-black text-gray-800 mb-2">Strategy 01. 이민자 수용 확대</h3>
                            <div className="text-[52px] font-black text-indigo-600 my-4 leading-none">4.5% <span className="text-gray-300 text-[40px]">→</span> 10%</div>
                            <p className="text-[18px] font-bold text-gray-500">2040년 목표 (싱가포르 모델 차용)</p>
                        </div>

                        {/* Pillar 2 */}
                        <div className={`flex-1 bg-white shadow-xl border-t-[8px] border-purple-600 p-10 flex flex-col items-center justify-center transition-all duration-1000 delay-300 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                            </div>
                            <h3 className="text-[26px] font-black text-gray-800 mb-2">Strategy 02. AI 기술 상쇄</h3>
                            <div className="text-[52px] font-black text-purple-600 my-4 leading-none">0.5~1.0<span className="text-[32px]">%p</span></div>
                            <p className="text-[18px] font-bold text-gray-500">생산성 향상을 통한 경제 방어 효과</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>한국 이민자 비중은 약 4.5% 수준이나, Bull 시나리오는 2040년 10%까지 끌어올리는 정책 전환을 전제</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>이는 싱가포르 모델(외국인 비중 30%+)을 부분 차용하여 노동력 감소를 적극 방어하는 전략</span></li>
                        <li className="flex items-start"><span className="mr-3 text-purple-700">▪</span><span className="text-purple-900">AI 기술 도입(BCG·McKinsey 보고서)으로 인한 생산성 향상이 인구 감소 효과를 최대 1.0%p 상쇄 가능</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

with open('src/components/Section58.jsx', 'w', encoding='utf-8') as f:
    f.write(code_58)
with open('src/components/Section59.jsx', 'w', encoding='utf-8') as f:
    f.write(code_59)
with open('src/components/Section60.jsx', 'w', encoding='utf-8') as f:
    f.write(code_60)
with open('src/components/Section61.jsx', 'w', encoding='utf-8') as f:
    f.write(code_61)

print("Custom CSS Infographics generated for S58-S61.")
