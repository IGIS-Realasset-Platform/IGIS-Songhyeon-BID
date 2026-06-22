import React, { useState, useEffect } from 'react';

export default function Section67({ isActive }) {
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
                        한국 업무지구의 결핍과 글로벌 어메니티 격차
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    글로벌 녹지 어메니티는 복지가 아닌 인재 유치와 기업 경쟁력의 핵심 무기임
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (무배경, 대조 대시보드) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[360px]" viewBox="0 0 920 360">
                        <defs>
                            <linearGradient id="marunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#047857" />
                            </linearGradient>
                            <linearGradient id="bryantGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#1d4ed8" />
                            </linearGradient>
                            <filter id="boxShadow" x="-10%" y="-10%" width="120%" height="120%">
                                <feDropShadow dx="0" dy="8" stdDeviation="5" floodOpacity="0.1" />
                            </filter>
                        </defs>

                        {/* 1. 좌측: 한국 업무지구의 현실 (여의도·강남) */}
                        <g transform="translate(20, 20)" filter="url(#boxShadow)">
                            <rect x="0" y="0" width="400" height="280" fill="#ffffff" rx="16" />
                            <rect x="15" y="15" width="370" height="35" fill="#475569" rx="8" />
                            <text x="200" y="37" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="bold">한국 업무지구의 현실 (여의도·강남)</text>
                            
                            <g transform="translate(25, 75)">
                                {/* 수면 부족 수치 */}
                                <rect x="0" y="0" width="165" height="85" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="8" />
                                <text x="15" y="22" fill="#475569" fontSize="10.5" fontWeight="bold">직장인 평균 수면 시간</text>
                                <text x="15" y="55" fill="#ef4444" fontSize="26" fontWeight="black">5h 25m</text>
                                <text x="15" y="74" fill="#94a3b8" fontSize="9.5" fontWeight="bold">권장량 대비 -2시간 부족</text>

                                {/* 안마의자 만석 */}
                                <rect x="180" y="0" width="170" height="85" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="8" />
                                <text x="15" y="22" fill="#475569" fontSize="10.5" fontWeight="bold">북카페/쪽잠 대기 상황</text>
                                <text x="15" y="55" fill="#ef4444" fontSize="22" fontWeight="black">AM 11:40</text>
                                <text x="15" y="74" fill="#94a3b8" fontSize="9.5" fontWeight="bold">이전부터 만석 대기 발생</text>
                            </g>

                            <g transform="translate(25, 180)">
                                <rect x="0" y="0" width="350" height="80" fill="#fff5f5" stroke="#fee2e2" strokeWidth="1" rx="8" />
                                <text x="15" y="24" fill="#991b1b" fontSize="12" fontWeight="bold">인프라 결핍 결론</text>
                                <text x="15" y="46" fill="#7f1d1d" fontSize="11" fontWeight="medium">• 오피스 빌딩(용적률)만 가득 차 있고,</text>
                                <text x="15" y="62" fill="#7f1d1d" fontSize="11" fontWeight="medium">  인간을 위한 휴식·회복 공간은 완전히 배제된 실태</text>
                            </g>
                        </g>

                        {/* 2. 우측: 글로벌 랜드마크의 어메니티 (마루노우치 & 브라이언트 파크) */}
                        <g transform="translate(480, 20)" filter="url(#boxShadow)">
                            <rect x="0" y="0" width="420" height="280" fill="#ffffff" rx="16" />
                            <rect x="15" y="15" width="390" height="35" fill="url(#marunGrad)" rx="8" />
                            <text x="210" y="37" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="bold">글로벌 랜드마크 어반 리빙룸</text>
                            
                            {/* 마루노우치 어반테라스 */}
                            <g transform="translate(20, 70)">
                                <rect x="0" y="0" width="380" height="90" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1" rx="8" />
                                <text x="15" y="22" fill="#047857" fontSize="12" fontWeight="black">도쿄 마루노우치 (나카도리 1.2km 보행자천국)</text>
                                <text x="15" y="44" fill="#065f46" fontSize="11" fontWeight="medium">• 도로를 잔디 테라스·스트리트 파크화하여 보행 공간 제공</text>
                                <text x="15" y="60" fill="#065f46" fontSize="11" fontWeight="medium">• 입주 기업 90% 긍정 응답, 직원 인게이지먼트 극대화</text>
                                <text x="15" y="76" fill="#0f766e" fontSize="10.5" fontWeight="bold">➔ 인재 유치·유지를 위한 최고의 기업 경쟁력 무기 작동</text>
                            </g>

                            {/* 브라이언트 파크 잔디밭 */}
                            <g transform="translate(20, 175)">
                                <rect x="0" y="0" width="380" height="85" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" rx="8" />
                                <text x="15" y="22" fill="#1d4ed8" fontSize="12" fontWeight="black">뉴욕 브라이언트 파크 (일상 복지 인프라)</text>
                                <text x="15" y="44" fill="#1e40af" fontSize="11" fontWeight="medium">• 봄/여름 잔디밭 쉼터 ➔ 직장인의 허브 및 점심 가로 활성</text>
                                <text x="15" y="60" fill="#1e40af" fontSize="11" fontWeight="medium">• 랜드마크 공원의 존재 자체가 임대 유치의 최대 소구점</text>
                            </g>
                        </g>
                    </svg>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                안마의자 카페의 쪽잠에 의존하는 한국 도심 환경과 마루노우치·브라이언트파크의 잔디밭 등 글로벌 어메니티의 격차 실태
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
