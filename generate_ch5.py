import os

# S68 (69p) - Chapter Intro
s68 = """import React, { useState, useEffect } from 'react';

export default function Section68({ isActive }) {
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
                .gradient-text-ch5 {
                    background: linear-gradient(90deg, #c1e2dd, #587d94);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                <div className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-normal text-white mb-[14px]" style={{ fontFamily: "'Sanomat Wp', 'Sanomat Web', 'Sanomat', sans-serif" }}>
                        Chapter 5.
                    </span>
                </div>
                <h2 className={`text-[34px] md:text-[54px] lg:text-[66px] font-bold leading-[calc(1.3em-6px)] break-keep transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="gradient-text-ch5">
                        산업/물류 부동산 2030~2040
                    </span>
                </h2>
            </div>
        </section>
    );
}
"""

# S69 (70p) - Data Center
s69 = """import React, { useState, useEffect } from 'react';

export default function Section69({ isActive }) {
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
                        데이터센터 수요 폭발과 분산화
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    전력 인입 제약이라는 병목이 촉발한<br/>메가 자본의 블랙홀
                </h2>

                {/* Custom Infographic */}
                <div className="w-full max-w-[1100px] mt-[40px] mb-[40px] flex flex-col gap-6">
                    
                    {/* Capacity Growth Timeline */}
                    <div className="flex w-full items-end justify-between bg-gray-50 border-[4px] border-gray-300 p-8 h-[220px] relative transition-all duration-1000 delay-100 ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}">
                        <div className="absolute top-4 left-6 text-[20px] font-black text-gray-500 uppercase">한국 데이터센터 전력 수요 전망</div>
                        
                        <div className="flex flex-col items-center w-[30%] relative z-10">
                            <div className="text-[40px] font-black text-blue-600 mb-2 leading-none">6.3<span className="text-[20px] text-blue-500">GW</span></div>
                            <div className="w-full h-8 bg-blue-200 rounded-t-sm"></div>
                            <div className="text-[20px] font-black text-gray-800 mt-2">2030년 (Base)</div>
                        </div>

                        <div className="flex flex-col items-center w-[30%] relative z-10">
                            <div className="text-[54px] font-black text-blue-700 mb-2 leading-none">12<span className="text-[24px] text-blue-600">GW</span></div>
                            <div className="w-full h-16 bg-blue-400 rounded-t-md"></div>
                            <div className="text-[20px] font-black text-gray-800 mt-2">2035년</div>
                        </div>

                        <div className="flex flex-col items-center w-[30%] relative z-10">
                            <div className="text-[70px] font-black text-[#1d1d1f] mb-2 leading-none">18~22<span className="text-[30px] text-gray-600">GW</span></div>
                            <div className="w-full h-24 bg-[#1d1d1f] rounded-t-lg shadow-xl"></div>
                            <div className="text-[20px] font-black text-gray-800 mt-2">2040년</div>
                        </div>
                    </div>

                    {/* Geography Shift */}
                    <div className={`flex flex-col md:flex-row w-full gap-4 transition-all duration-1000 delay-300 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="flex-1 bg-red-50 border-[4px] border-red-300 p-6 flex flex-col justify-center items-center">
                            <div className="text-[22px] font-black text-red-800 mb-2">수도권 전력 인입 제약</div>
                            <div className="text-[18px] font-bold text-red-600">성장의 구조적 병목 (Bottleneck) 발생</div>
                        </div>
                        <div className="hidden md:flex items-center justify-center text-[40px] font-black text-gray-300">→</div>
                        <div className="flex-1 bg-blue-50 border-[4px] border-blue-400 p-6 flex flex-col justify-center items-center shadow-md">
                            <div className="text-[22px] font-black text-blue-900 mb-2">지방 거점 분산 가속화</div>
                            <div className="text-[18px] font-bold text-blue-700">전남 · 경북 · 강원 중심의 신규 클러스터 조성</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-[#1d1d1f] break-keep text-center transition-all duration-[900ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>한국 데이터센터 수요는 2030년 6.3GW에서 2040년 최대 22GW까지 3.5배 이상 폭발적 성장 전망</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>수도권 전력망 한계가 구조적 제약으로 작용하며, 풍부한 전력 확보가 가능한 지방으로의 입지 분산 필연적</span></li>
                        <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span className="text-blue-900">결과적으로 데이터센터는 단일 산업 부동산 카테고리로서 향후 15년간 가장 거대한 자본을 흡수할 섹터로 부상</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

# S70 (71p) - Senior Housing
s70 = """import React, { useState, useEffect } from 'react';

export default function Section70({ isActive }) {
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
                        시니어 하우징 메가 트렌드
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    300조 원 거대 시장을 장악할<br/>한국형 시니어 REIT 모델의 탄생
                </h2>

                {/* Custom Infographic */}
                <div className="flex flex-col lg:flex-row w-full max-w-[1100px] mt-[40px] mb-[40px] gap-8">
                    
                    {/* Market Size */}
                    <div className={`flex-[1.2] bg-[#1d1d1f] text-white p-10 flex flex-col justify-center items-center shadow-2xl relative transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-2 font-black">Market Cap</div>
                        <div className="text-[20px] font-bold text-gray-400 mb-2">2030년 168조 원</div>
                        <div className="text-[40px] text-gray-500 font-black rotate-90 my-2">→</div>
                        <div className="text-[24px] font-bold text-white mb-2">2040년 시장 규모</div>
                        <div className="text-[70px] font-black text-yellow-400 leading-none tracking-tighter">300<span className="text-[40px] text-white">조 원+</span></div>
                        <div className="w-full border-t-[2px] border-gray-600 mt-6 pt-4">
                            <div className="text-[20px] font-bold text-gray-300">침투율 0.6% ➔ 3~5% 확장 시<br/><span className="text-white text-[24px]">신규 공급 50만 호 이상 필요</span></div>
                        </div>
                    </div>

                    {/* Platform Strategy */}
                    <div className={`flex-[1.5] bg-gray-50 border-[6px] border-gray-300 p-10 flex flex-col justify-center shadow-lg transition-all duration-1000 delay-300 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="text-[24px] font-black text-gray-800 mb-6 border-b-[4px] border-gray-300 pb-4 inline-block mx-auto">이지스 시니어 플랫폼의 비전</div>
                        
                        <div className="flex flex-col w-full gap-4">
                            <div className="bg-white border-[3px] border-[#1d1d1f] p-4 flex items-center justify-between shadow-sm">
                                <div className="text-[22px] font-black text-[#1d1d1f]">블랙스톤 BREIT</div>
                                <div className="text-[16px] font-bold text-gray-500">압도적 펀딩·스케일업</div>
                            </div>
                            <div className="flex justify-center text-[30px] font-black text-gray-400">+</div>
                            <div className="bg-white border-[3px] border-[#1d1d1f] p-4 flex items-center justify-between shadow-sm">
                                <div className="text-[22px] font-black text-[#1d1d1f]">미국 Welltower 모델</div>
                                <div className="text-[16px] font-bold text-gray-500">헬스케어·운영 전문성 결합</div>
                            </div>
                            <div className="flex justify-center text-[30px] font-black text-[#1d1d1f] mt-2">↓</div>
                            <div className="bg-[#1d1d1f] p-6 text-center shadow-xl">
                                <div className="text-[26px] font-black text-white">한국형 압도적 시니어 REIT 모델 진화</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-[#1d1d1f] break-keep text-center transition-all duration-[900ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>한국 시니어 하우징 시장은 2030년 168조 원에서 2040년 300조 원 이상으로 폭발적 성장이 확정된 메가 섹터</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>현재 0.6%에 불과한 침투율이 글로벌 평균인 3~5% 수준으로 오를 경우 최소 50만 호의 신규 공급 필요</span></li>
                        <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span className="text-blue-900">이지스는 블랙스톤(BREIT)의 자본력과 웰타워(Welltower)의 운영 전문성을 결합한 거대 시니어 REIT로 시장 장악</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

# S71 (72p) - Life Science / Cold Chain
s71 = """import React, { useState, useEffect } from 'react';

export default function Section71({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 800),
            setTimeout(() => setStep(3), 1300),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-black text-[#1d1d1f] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        생명과학 및 콜드체인 물류 생태계
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    생명과학 클러스터와 콜드체인 제약 물류가<br/>결합하는 신규 거점의 안착
                </h2>

                {/* Custom Infographic: Two Pillars */}
                <div className="w-full max-w-[1100px] mt-[50px] mb-[40px] flex flex-col md:flex-row gap-8 transition-all duration-1000">
                    
                    {/* Life Science Pillar */}
                    <div className={`flex-1 bg-white shadow-xl border-t-[10px] border-[#1d1d1f] px-10 py-10 flex flex-col items-center justify-center transition-all duration-1000 delay-100 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="text-[50px] mb-4">🧬</div>
                        <div className="text-[26px] font-black text-[#1d1d1f] mb-6">생명과학 클러스터</div>
                        <div className="w-full flex justify-center gap-2 mb-6">
                            <span className="bg-gray-100 px-4 py-2 font-bold text-gray-800 rounded-full">송도</span>
                            <span className="bg-gray-100 px-4 py-2 font-bold text-gray-800 rounded-full">판교</span>
                            <span className="bg-gray-100 px-4 py-2 font-bold text-gray-800 rounded-full">마곡</span>
                        </div>
                        <div className="text-[18px] font-bold text-gray-600 bg-gray-50 border-[2px] border-gray-200 p-4 w-full">
                            K-바이오 클러스터 특화 부동산이<br/>독립적인 우량 신규 카테고리로 안착
                        </div>
                    </div>

                    {/* Cold Chain Pillar */}
                    <div className={`flex-1 bg-white shadow-xl border-t-[10px] border-blue-600 px-10 py-10 flex flex-col items-center justify-center transition-all duration-1000 delay-300 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="text-[50px] mb-4">❄️</div>
                        <div className="text-[26px] font-black text-[#1d1d1f] mb-6">콜드체인 · 제약 물류</div>
                        <div className="w-full flex justify-center gap-2 mb-6">
                            <span className="bg-blue-50 border border-blue-200 px-4 py-2 font-bold text-blue-900 rounded-full">인구 고령화</span>
                            <span className="bg-blue-50 border border-blue-200 px-4 py-2 font-bold text-blue-900 rounded-full">바이오 직배송</span>
                        </div>
                        <div className="text-[18px] font-bold text-gray-600 bg-gray-50 border-[2px] border-gray-200 p-4 w-full">
                            의약품 수요 증가와 맞물려<br/>특수 온도 제어 물류 수요의 지속적 성장
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-[#1d1d1f] break-keep text-center transition-all duration-[900ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>송도, 판교, 마곡 등 주요 거점을 중심으로 한 '생명과학 클러스터'가 새로운 핵심 카테고리로 부상</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>인구 고령화 및 바이오/의약품 직배송 트렌드와 결합하여 콜드체인(특수 제어) 물류 인프라 수요 급증</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span className="text-[#1d1d1f]">연구개발 거점과 특수 물류 인프라가 시너지를 내며 K-바이오 특화 밸류체인 부동산 완성</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

# S72 (73p) - Robot Friendly Logistics
s72 = """import React, { useState, useEffect } from 'react';

export default function Section72({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 800),
            setTimeout(() => setStep(3), 1300),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-black text-[#1d1d1f] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        Grade-A 물류센터의 패러다임 전환
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    모든 신규 대형 물류센터의 절대적 설계 표준:<br/>로봇·AMR 친화형
                </h2>

                {/* Custom Infographic */}
                <div className="w-full max-w-[1000px] mt-[40px] mb-[40px] flex flex-col items-center transition-all duration-1000">
                    
                    <div className={`w-full bg-[#1d1d1f] text-white p-6 shadow-2xl relative z-20 transition-all duration-1000 delay-100 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-[18px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Industry Leaders 주도</div>
                        <div className="flex flex-wrap justify-center gap-6 mt-4">
                            <span className="text-[28px] font-black">쿠팡</span>
                            <span className="text-[28px] font-black">CJ대한통운</span>
                            <span className="text-[28px] font-black">네이버</span>
                            <span className="text-[28px] font-black">LG CNS</span>
                        </div>
                    </div>

                    <div className={`w-[90%] bg-white border-[6px] border-[#1d1d1f] p-10 shadow-lg relative z-10 -mt-2 transition-all duration-1000 delay-300 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-[36px] font-black text-[#1d1d1f] mb-4">로봇 · AMR 친화 설계 (Robot-Friendly)</div>
                        <div className="w-full flex flex-col md:flex-row justify-center gap-6 mt-6">
                            <div className="flex-1 bg-gray-50 border-[2px] border-gray-200 p-4 font-bold text-gray-800 text-[18px]">초평탄 바닥 구조 및 하중 강화</div>
                            <div className="flex-1 bg-gray-50 border-[2px] border-gray-200 p-4 font-bold text-gray-800 text-[18px]">물류 로봇 전용 동선 최적화</div>
                            <div className="flex-1 bg-gray-50 border-[2px] border-gray-200 p-4 font-bold text-gray-800 text-[18px]">고전력 인입 및 5G 통신망 완비</div>
                        </div>
                    </div>

                    <div className={`w-[80%] bg-blue-600 text-white p-6 shadow-md relative z-0 -mt-2 transition-all duration-1000 delay-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-[24px] font-black">향후 모든 신규 Grade-A 물류센터의 절대적 표준</div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-[#1d1d1f] break-keep text-center transition-all duration-[900ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>쿠팡, CJ대한통운, 네이버, LG CNS 등 물류 및 IT 거인들이 전면적인 자동화를 시장의 벤치마크로 주도</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>바닥 평탄도, 로봇 전용 통신/전력망, 하중 등 로봇(AMR/AGV) 운영에 최적화된 하드웨어 스펙 필수 요구</span></li>
                        <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span className="text-blue-900">단순 창고를 넘어선 '자동화 설비의 플랫폼'으로서 로봇 친화 설계가 우량 물류센터의 생존 조건으로 정착</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
"""

with open('src/components/Section68.jsx', 'w', encoding='utf-8') as f: f.write(s68)
with open('src/components/Section69.jsx', 'w', encoding='utf-8') as f: f.write(s69)
with open('src/components/Section70.jsx', 'w', encoding='utf-8') as f: f.write(s70)
with open('src/components/Section71.jsx', 'w', encoding='utf-8') as f: f.write(s71)
with open('src/components/Section72.jsx', 'w', encoding='utf-8') as f: f.write(s72)

print("Generated Section68.jsx to Section72.jsx successfully.")
