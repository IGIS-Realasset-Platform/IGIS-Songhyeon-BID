import React, { useState, useEffect } from 'react';

export default function Section64({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 689),
            setTimeout(() => setStep(3), 995),
            setTimeout(() => setStep(4), 1301)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        보행광장 전환을 통한 범죄·사고 감소와 시 전체 경제 11% 견인 효과
                    </span>
                </div>

                {/* 제목 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    뉴욕 타임스스퀘어 실증: 안전과 세수의 거대 지렛대 효과
                </h2>

                {/* 중앙 컨텐츠 영역: 안전 대시보드 및 세수 레버리지 커스텀 SVG */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="w-full h-[360px] bg-slate-50/50 border border-slate-100 relative flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 900 360">
                            <defs>
                                <linearGradient id="safetyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ef4444" />
                                    <stop offset="100%" stopColor="#b91c1c" />
                                </linearGradient>
                                <linearGradient id="economicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="#047857" />
                                </linearGradient>
                            </defs>

                            {/* 1. 좌측: 안전 혁신 대시보드 */}
                            <g transform="translate(40, 20)">
                                <rect x="0" y="0" width="380" height="300" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" rx="8" />
                                <text x="20" y="30" fill="#0f172a" fontSize="14" fontWeight="black">보행광장 전환 및 BID 공동 관리 효과</text>
                                
                                {/* 보행자 부상 감소 */}
                                <g transform="translate(20, 55)">
                                    <rect x="0" y="0" width="340" height="42" fill="#fef2f2" stroke="#fca5a5" strokeWidth="0.5" />
                                    <text x="15" y="25" fill="#991b1b" fontSize="12" fontWeight="black">보행자 부상 감소율</text>
                                    <text x="320" y="27" textAnchor="end" fill="#b91c1c" fontSize="18" fontWeight="black">-40%</text>
                                </g>

                                {/* 대기오염 감소 */}
                                <g transform="translate(20, 110)">
                                    <rect x="0" y="0" width="340" height="42" fill="#fef2f2" stroke="#fca5a5" strokeWidth="0.5" />
                                    <text x="15" y="25" fill="#991b1b" fontSize="12" fontWeight="black">대기오염 (매연·배기 가스)</text>
                                    <text x="320" y="27" textAnchor="end" fill="#b91c1c" fontSize="18" fontWeight="black">-60%</text>
                                </g>

                                {/* 전체 범죄 감소 */}
                                <g transform="translate(20, 165)">
                                    <rect x="0" y="0" width="340" height="42" fill="#fef2f2" stroke="#fca5a5" strokeWidth="0.5" />
                                    <text x="15" y="25" fill="#991b1b" fontSize="12" fontWeight="black">지구 내 전체 범죄 발생 건수</text>
                                    <text x="320" y="27" textAnchor="end" fill="#b91c1c" fontSize="18" fontWeight="black">-20%</text>
                                </g>

                                {/* 만족도 설문 결과 */}
                                <g transform="translate(20, 225)">
                                    <rect x="0" y="0" width="340" height="55" fill="#fafafa" stroke="#e5e5e5" strokeWidth="1" />
                                    <text x="15" y="22" fill="#475569" fontSize="10.5" fontWeight="bold">방문자 안전 의식 : 80% 이상이 "더 안전해졌다" 응답</text>
                                    <text x="15" y="40" fill="#475569" fontSize="10.5" fontWeight="bold">쾌적성 만족 지수 : 93% 이상이 "더 쾌적해졌다" 응답</text>
                                </g>
                            </g>

                            {/* 중간 연결 화살표/지레대 그래픽 */}
                            <path d="M 440,170 L 460,170" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3,3" />

                            {/* 2. 우측: 세수 및 경제적 기여 레버리지 */}
                            <g transform="translate(480, 20)">
                                <rect x="0" y="0" width="380" height="300" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" rx="8" />
                                <text x="20" y="30" fill="#0f172a" fontSize="14" fontWeight="black">뉴욕 경제의 11%를 만드는 0.1%의 면적</text>
                                
                                {/* 0.1% vs 11% 바 비교 */}
                                <g transform="translate(20, 50)">
                                    {/* 0.1% 면적 */}
                                    <text x="0" y="18" fill="#475569" fontSize="11" fontWeight="bold">타임스스퀘어 면적 비중 (뉴욕 전체 대비)</text>
                                    <rect x="0" y="26" width="3" height="15" fill="#64748b" />
                                    <text x="12" y="38" fill="#475569" fontSize="11.5" fontWeight="bold">0.1%</text>

                                    {/* 11% 산출 */}
                                    <text x="0" y="70" fill="#065f46" fontSize="11" fontWeight="bold">뉴욕시 전체 경제 산출(GDP) 중 기여도</text>
                                    <rect x="0" y="78" width="220" height="18" fill="url(#economicGrad)" />
                                    <text x="230" y="92" fill="#047857" fontSize="14" fontWeight="black">11% ($1,100억+)</text>
                                </g>

                                {/* 집적 효과 명세 */}
                                <g transform="translate(20, 165)">
                                    <rect x="0" y="0" width="340" height="115" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="0.5" />
                                    <text x="15" y="22" fill="#065f46" fontSize="12" fontWeight="black">압도적 상권/인프라 집적</text>
                                    <text x="15" y="44" fill="#1f2937" fontSize="11" fontWeight="medium">• 지구 내 상주 근로자 : 약 18만 명</text>
                                    <text x="15" y="62" fill="#1f2937" fontSize="11" fontWeight="medium">• 오피스 집적 면적 : 약 31만 ㎡</text>
                                    <text x="15" y="80" fill="#1f2937" fontSize="11" fontWeight="medium">• 관광 인프라 : 19,000실 이상의 호텔</text>
                                    <text x="15" y="98" fill="#047857" fontSize="11" fontWeight="bold">➔ 부동산 가치 상승(BID +15%)으로 재산세·취득세 확대</text>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                타임스스퀘어는 보행광장 조성 및 BID와의 협업 관리 이후 보행자 부상 40% 감소, 범죄 20% 감소, 대기오염 60% 감소를 달성하여 도심의 안전성과 쾌적성을 획기적으로 개선함.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                타임스스퀘어는 뉴욕 전체 면적의 0.1%에 불과하나 뉴욕 경제 산출의 11%를 견인하며, 에어리어 매니지먼트를 통한 자산가치 극대화가 세수를 늘려 시 경제의 핵심 세원이 됨을 증명함.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
