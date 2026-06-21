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
                
                {/* 소제목 - 자간 배제 */}
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#0f172a] mb-[12px]">
                        보행광장 전환을 통한 범죄·사고 감소와 시 전체 경제 11% 견인 효과
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    뉴욕 타임스스퀘어 실증: 안전과 세수의 거대 지렛대 효과
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (풍부한 그라데이션, 인포그래픽 대시보드) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="w-full h-[360px] bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 relative flex items-center justify-center shadow-inner">
                        <svg className="w-full h-full" viewBox="0 0 920 360">
                            <defs>
                                <linearGradient id="safetyTitleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#f43f5e" />
                                    <stop offset="100%" stopColor="#be123c" />
                                </linearGradient>
                                <linearGradient id="ecoTitleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="#047857" />
                                </linearGradient>
                                <linearGradient id="metricCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#ffffff" />
                                    <stop offset="100%" stopColor="#f8fafc" />
                                </linearGradient>
                                <filter id="shadow-blur" x="-10%" y="-10%" width="120%" height="120%">
                                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.1" />
                                </filter>
                            </defs>

                            {/* 1. 좌측 대시보드: 안전 지표 (Rose 계열 그라데이션 포인트) */}
                            <g transform="translate(30, 25)" filter="url(#shadow-blur)">
                                <rect x="0" y="0" width="390" height="280" fill="#ffffff" rx="16" />
                                <rect x="15" y="15" width="360" height="35" fill="url(#safetyTitleGrad)" rx="8" />
                                <text x="195" y="37" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="black">안전 대시보드 (보행 전환 효과)</text>
                                
                                {/* 보행자 부상 */}
                                <g transform="translate(15, 65)">
                                    <rect x="0" y="0" width="110" height="70" fill="url(#metricCardGrad)" stroke="#f1f5f9" strokeWidth="1" rx="8" />
                                    <text x="55" y="24" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">보행자 부상</text>
                                    <text x="55" y="55" textAnchor="middle" fill="#e11d48" fontSize="22" fontWeight="black">-40%</text>
                                </g>

                                {/* 차량 사고 */}
                                <g transform="translate(140, 65)">
                                    <rect x="0" y="0" width="110" height="70" fill="url(#metricCardGrad)" stroke="#f1f5f9" strokeWidth="1" rx="8" />
                                    <text x="55" y="24" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">차량 사고</text>
                                    <text x="55" y="55" textAnchor="middle" fill="#e11d48" fontSize="22" fontWeight="black">-15%</text>
                                </g>

                                {/* 대기 오염 */}
                                <g transform="translate(265, 65)">
                                    <rect x="0" y="0" width="110" height="70" fill="url(#metricCardGrad)" stroke="#f1f5f9" strokeWidth="1" rx="8" />
                                    <text x="55" y="24" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">대기 오염</text>
                                    <text x="55" y="55" textAnchor="middle" fill="#e11d48" fontSize="22" fontWeight="black">-60%</text>
                                </g>

                                {/* 만족도 지표 */}
                                <g transform="translate(15, 150)">
                                    <rect x="0" y="0" width="360" height="110" fill="#fff5f5" stroke="#fecaca" strokeWidth="1" rx="8" />
                                    <text x="20" y="26" fill="#be123c" fontSize="11.5" fontWeight="black">체진률 및 시민 체감</text>
                                    
                                    <text x="20" y="50" fill="#4b5563" fontSize="11" fontWeight="medium">• 방문자 80% 이상 : "범죄로부터 더 안전해졌다"고 응답</text>
                                    <text x="20" y="68" fill="#4b5563" fontSize="11" fontWeight="medium">• 방문자 93% 이상 : "보행 환경이 훨씬 쾌적해졌다"고 응답</text>
                                    <text x="20" y="86" fill="#4b5563" fontSize="11" fontWeight="medium">• 브라이언트 파크 깨진 유리창 이론 연계 범죄 차단</text>
                                </g>
                            </g>

                            {/* 연결 지레대 아이콘 */}
                            <g transform="translate(435, 150)">
                                <circle cx="15" cy="15" r="20" fill="#3b82f6" opacity="0.1" />
                                <path d="M 5,15 L 25,15 M 18,8 L 25,15 L 18,22" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </g>

                            {/* 2. 우측 대시보드: 경제 레버리지 (Emerald 그라데이션 포인트) */}
                            <g transform="translate(480, 25)" filter="url(#shadow-blur)">
                                <rect x="0" y="0" width="410" height="280" fill="#ffffff" rx="16" />
                                <rect x="15" y="15" width="380" height="35" fill="url(#ecoTitleGrad)" rx="8" />
                                <text x="205" y="37" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="black">경제 레버리지 (면적 대비 생산성)</text>
                                
                                {/* 0.1% vs 11% 비주얼화 */}
                                <g transform="translate(20, 65)">
                                    <text x="0" y="12" fill="#4b5563" fontSize="11.5" fontWeight="bold">뉴욕시 점유 면적</text>
                                    <rect x="0" y="20" width="10" height="20" fill="#94a3b8" rx="2" />
                                    <text x="18" y="35" fill="#4b5563" fontSize="13" fontWeight="black">0.1%</text>

                                    <text x="180" y="12" fill="#047857" fontSize="11.5" fontWeight="bold">뉴욕시 전체 GDP 기여도</text>
                                    <rect x="180" y="20" width="160" height="20" fill="#10b981" rx="4" />
                                    <text x="348" y="36" fill="#047857" fontSize="14" fontWeight="black">11%</text>
                                </g>

                                {/* 집적 자산 정보 */}
                                <g transform="translate(20, 115)">
                                    <rect x="0" y="0" width="370" height="145" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1" rx="8" />
                                    <text x="20" y="26" fill="#065f46" fontSize="12" fontWeight="black">압도적인 상권 인프라 집적</text>
                                    
                                    <text x="20" y="52" fill="#1f2937" fontSize="11" fontWeight="medium">• 상주 근로자 : 약 18만 명 규모의 두터운 배후 수요</text>
                                    <text x="20" y="70" fill="#1f2937" fontSize="11" fontWeight="medium">• 업무 공간 집적 : 총 31만 ㎡ 이상의 오피스</text>
                                    <text x="20" y="88" fill="#1f2937" fontSize="11" fontWeight="medium">• 글로벌 관광 자원 : 19,000실 이상의 호텔 시설</text>
                                    <text x="20" y="106" fill="#1f2937" fontSize="11" fontWeight="medium">• 자산 가치 상승(BID +15%)에 따른 세수 순증 메커니즘</text>
                                    <text x="20" y="128" fill="#047857" fontSize="11.5" fontWeight="bold">➔ 부동산 활성화 ➔ 재산세·취득세 확대 (세원의 핵심)</text>
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
                                보행광장 전환 및 BID 협업을 통한 범죄·부상 극적 감소와 시 전체 경제의 11%를 견인하는 세원 레버리지 효과를 입증함.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
