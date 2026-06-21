import React, { useState, useEffect } from 'react';

export default function Section66({ isActive }) {
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
                        SBD BID 완성에 따른 서울역 주변 일상 경험의 전후 대조
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    이오타서울 직장인의 하루: 공간이 명함이 되는 변화
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (무배경, 시간 흐름 비교 다이어그램) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[360px]" viewBox="0 0 940 360">
                        <defs>
                            <linearGradient id="glowGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#1d4ed8" />
                            </linearGradient>
                            <linearGradient id="glowGradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#f59e0b" />
                                <stop offset="100%" stopColor="#d97706" />
                            </linearGradient>
                            <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#e2e8f0" />
                                <stop offset="50%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#f59e0b" />
                            </linearGradient>
                            <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
                                <feDropShadow dx="0" dy="8" stdDeviation="5" floodOpacity="0.1" />
                            </filter>
                        </defs>

                        {/* 중앙 타임라인 축 */}
                        <rect x="50" y="165" width="840" height="6" fill="url(#timelineGrad)" />

                        {/* 1. 출근 및 이동 (오전) */}
                        <g transform="translate(60, 20)" filter="url(#cardShadow)">
                            <rect x="0" y="0" width="240" height="120" fill="#ffffff" rx="12" />
                            <rect x="15" y="15" width="210" height="25" fill="#f1f5f9" rx="6" />
                            <text x="120" y="32" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="black">AM 08:30 | 출근 및 이동</text>
                            
                            <text x="20" y="62" fill="#ef4444" fontSize="10.5" fontWeight="bold">현재 : 좁은 보도, 택시 대기 혼잡</text>
                            <text x="20" y="80" fill="#10b981" fontSize="10.5" fontWeight="bold">SBD 후 : 이오타 녹지 ➔ 서울로 연결 보행</text>
                            <text x="20" y="98" fill="#475569" fontSize="9.5" fontWeight="medium">차 없는 남산 직통 보행 환경 구축</text>
                        </g>
                        <circle cx="180" cy="168" r="8" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />
                        <text x="180" y="195" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">보행 환경 혁신</text>

                        {/* 2. 점심 및 일상 어메니티 (오후) */}
                        <g transform="translate(350, 215)" filter="url(#cardShadow)">
                            <rect x="0" y="0" width="240" height="120" fill="#ffffff" rx="12" />
                            <rect x="15" y="15" width="210" height="25" fill="#eff6ff" rx="6" />
                            <text x="120" y="32" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="black">PM 12:00 | 점심 및 어메니티</text>
                            
                            <text x="20" y="62" fill="#ef4444" fontSize="10.5" fontWeight="bold">현재 : 편의점 쪽잠 또는 비좁은 식당</text>
                            <text x="20" y="80" fill="#10b981" fontSize="10.5" fontWeight="bold">SBD 후 : 이오타 리테일 F&B + 어반테라스</text>
                            <text x="20" y="98" fill="#475569" fontSize="9.5" fontWeight="medium">남산 정상까지 도보 15분 힐링 코스</text>
                        </g>
                        <circle cx="470" cy="168" r="8" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2.5" />
                        <text x="470" y="145" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">F&B 및 휴식 공간</text>

                        {/* 3. 저녁 및 비즈니스 (야간) */}
                        <g transform="translate(640, 20)" filter="url(#cardShadow)">
                            <rect x="0" y="0" width="240" height="120" fill="#ffffff" rx="12" />
                            <rect x="15" y="15" width="210" height="25" fill="#fef3c7" rx="6" />
                            <text x="120" y="32" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="black">PM 07:00 | 바이어 응대 & 퇴근</text>
                            
                            <text x="20" y="62" fill="#ef4444" fontSize="10.5" fontWeight="bold">현재 : 내세울 것 없는 을씨년스런 가로</text>
                            <text x="20" y="80" fill="#10b981" fontSize="10.5" fontWeight="bold">SBD 후 : 리츠칼튼 + 남산뷰 전망 문화공간</text>
                            <text x="20" y="98" fill="#475569" fontSize="9.5" fontWeight="medium">조명·치안 확보된 남산 야경 보행로 귀가</text>
                        </g>
                        <circle cx="760" cy="168" r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
                        <text x="760" y="195" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">글로벌 명함 및 퇴근길</text>
                        
                    </svg>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                단순한 빌딩 출근을 넘어 글로벌 TOP 브랜드(BlackRock 등) 수준의 소속감과 생활 어메니티를 제공해 기업의 인재 유치력을 극적으로 향상시킴.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
