import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section132({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 184),
            setTimeout(() => setStep(2), 551),
            setTimeout(() => setStep(3), 918),
            setTimeout(() => setStep(4), 1300),
            setTimeout(() => setStep(5), 1700),
            setTimeout(() => setStep(6), 2100)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-white flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-center items-center h-full">
                
                {/* Header */}
                <div className="w-full flex flex-col items-center text-center mb-[36px]">
                    <div className={`transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                            {lang === 'kr' ? '근원적 자산 가치' : 'Fundamental Asset Value'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '입지적 Land Value 및 NOI 창출력' : 'Locational Land Value & NOI Capability'}
                    </h2>
                </div>

                {/* Main Content: 2 Charts */}
                <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center mb-6">
                    
                    {/* Left: Land Value Trend Chart */}
                    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col transition-all duration-700 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-[#1e3a8a] font-black text-[16px] tracking-widest uppercase mb-1">4.1 VALUE DRIVER</div>
                                <h3 className="text-[#1d1d1f] font-bold text-[24px] leading-tight break-keep">
                                    {lang === 'kr' ? '토지 담보 가치 (Land Value)' : 'Land Collateral Value'}
                                </h3>
                            </div>
                            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm font-bold border border-blue-200">
                                {lang === 'kr' ? '+10~20% 추가 상승 여지' : '+10-20% Upside'}
                            </div>
                        </div>

                        {/* SVG Line Chart */}
                        <div className="relative w-full h-[180px] mt-2 border-l-2 border-b-2 border-gray-300">
                            {/* Y-axis labels */}
                            <div className="absolute -left-[40px] bottom-0 text-xs text-gray-500 font-bold">100</div>
                            <div className="absolute -left-[40px] bottom-[70px] text-xs text-gray-500 font-bold">150</div>
                            <div className="absolute -left-[40px] top-0 text-xs text-gray-500 font-bold">200+</div>

                            {/* X-axis labels */}
                            <div className="absolute left-0 -bottom-[20px] text-xs text-gray-500 font-bold">2024 (Now)</div>
                            <div className="absolute left-[45%] -bottom-[20px] text-xs text-gray-500 font-bold">2028 (GTX-A)</div>
                            <div className="absolute right-0 -bottom-[20px] text-xs text-gray-500 font-bold">2031 (GTX-B)</div>

                            {/* Line SVG */}
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {/* Base Trend */}
                                <path 
                                    d="M 0 90 Q 50 60 100 20" 
                                    fill="none" 
                                    stroke="#cbd5e1" 
                                    strokeWidth="2" 
                                    strokeDasharray="4,4" 
                                />
                                {/* Actual GTX Premium Trend */}
                                <path 
                                    d="M 0 90 Q 45 40 100 10" 
                                    fill="none" 
                                    stroke="#1e3a8a" 
                                    strokeWidth="4" 
                                    strokeLinecap="round"
                                    className="transition-all duration-[1500ms] ease-out"
                                    strokeDasharray="200"
                                    strokeDashoffset={step >= 4 ? 0 : 200}
                                />
                                {/* Gradient Fill Under Line */}
                                <path 
                                    d="M 0 90 Q 45 40 100 10 L 100 100 L 0 100 Z" 
                                    fill="url(#grad1)" 
                                    className="transition-all duration-[1500ms] ease-out"
                                    style={{ opacity: step >= 4 ? 0.3 : 0 }}
                                />
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#1e3a8a" />
                                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                
                                {/* Pings */}
                                <circle cx="45" cy="48" r="3" fill="#ef4444" className={`transition-all duration-500 ${step >= 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                                <circle cx="100" cy="10" r="4" fill="#1e3a8a" className={`transition-all duration-500 ${step >= 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                            </svg>

                            {/* Chart Annotations */}
                            <div className={`absolute top-[60px] left-[38%] bg-white/90 px-2 py-1 border border-red-200 rounded text-xs font-bold text-red-600 shadow-sm transition-all duration-500 delay-300 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                                {lang === 'kr' ? '서울역-인천공항 연결 효과' : 'Seoul Stn - Incheon Airport'}
                            </div>
                        </div>

                        <p className="text-[18px] text-gray-700 mt-6 font-bold break-keep bg-gray-100 p-3 rounded-md">
                            {lang === 'kr' ? 'GTX-A/B 교차 입지의 프리미엄이 본격 반영되며 향후 5~10년간 구조적 우상향 전망' : 'Premium of GTX-A/B intersection fully reflects, forming a structural uptrend over the next 5-10 years.'}
                        </p>
                    </div>

                    {/* Right: Waterfall Chart */}
                    <div className={`bg-[#1d1d1f] rounded-xl shadow-lg border border-gray-700 p-6 flex flex-col transition-all duration-700 delay-200 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-gray-400 font-black text-[16px] tracking-widest uppercase mb-1">4.2 STABILIZATION</div>
                                <h3 className="text-white font-bold text-[24px] leading-tight break-keep">
                                    {lang === 'kr' ? '안정화 캐시플로우' : 'Stabilized Cash Flow'}
                                </h3>
                            </div>
                        </div>

                        {/* Waterfall Diagram (Flex based) */}
                        <div className="relative w-full h-[180px] mt-2 flex items-end justify-between px-2 gap-2">
                            {/* Base Construction */}
                            <div className={`relative w-full bg-gray-600 rounded-t-sm flex flex-col items-center justify-start pt-2 transition-all duration-1000 ${step >= 4 ? 'h-[20%]' : 'h-0'}`}>
                                <span className="text-sm text-white font-bold mt-[-25px] absolute">2026</span>
                            </div>
                            
                            {/* Completion NOI (Base) */}
                            <div className={`relative w-full bg-blue-600 rounded-t-sm flex flex-col items-center justify-start pt-2 transition-all duration-1000 delay-200 ${step >= 5 ? 'h-[50%]' : 'h-0'}`}>
                                <span className="text-sm text-blue-200 font-bold mt-[-25px] absolute text-center w-full">NOI<br/>{lang === 'kr' ? '~3K억' : '~300B'}</span>
                            </div>

                            {/* Completion NOI (Bull) */}
                            <div className={`relative w-full bg-blue-500 rounded-t-sm flex flex-col items-center justify-start pt-2 transition-all duration-1000 delay-300 ${step >= 5 ? 'h-[70%]' : 'h-0'}`}>
                                <span className="text-sm text-white font-bold mt-[-25px] absolute text-center w-full whitespace-nowrap">Bull Scenario<br/>{lang === 'kr' ? '~4.5K억' : '~450B'}</span>
                            </div>

                            {/* Asset Value (Cap Rate 4%) */}
                            <div className={`relative w-[120%] bg-gradient-to-t from-blue-400 to-cyan-300 rounded-t-sm shadow-[0_0_20px_rgba(34,211,238,0.3)] flex flex-col items-center justify-start pt-2 transition-all duration-1000 delay-500 ${step >= 6 ? 'h-[100%]' : 'h-0'}`}>
                                <span className="text-[22px] text-white font-black mt-[-30px] absolute whitespace-nowrap drop-shadow-md">
                                    {lang === 'kr' ? '6조 ~ 10조 원' : '6T ~ 10T KRW'}
                                </span>
                                <div className="text-blue-900 font-bold text-sm mt-3 text-center leading-tight">
                                    Target<br/>Asset Value
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 items-center bg-gray-800/80 p-3 rounded-md">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                <span className="text-blue-400 font-bold text-lg">%</span>
                            </div>
                            <p className="text-[15px] text-gray-200 font-bold break-keep">
                                {lang === 'kr' ? '준공 후 연면적 30만m² 기준, 평당 25만~35만 원 임대료 가정 시 캡레이트 4%대 자산 가치 도달' : 'Value achievable post-completion (300K sqm) at 4% cap rate, assuming 250K-350K KRW/pyeong rent.'}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom text */}
                <div className={`w-full text-center transition-all duration-[612ms] delay-[122ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-block bg-[#1e3a8a] text-white px-6 py-3 rounded-md border border-blue-900 text-[18px] md:text-[20px] font-bold shadow-lg break-keep">
                        {lang === 'kr' ? 
                            (lang === 'kr' ? '압도적 입지와 규모가 만들어내는 견고한 Cash Flow 및 Value Add 잠재력' : 'Solid Cash Flow and Value-Add potential created by overwhelming location and scale') : 
                            'Solid Cash Flow and Value Add potential generated by overwhelming location and scale'}
                    </div>
                </div>
            </div>
        </section>
    );
}
