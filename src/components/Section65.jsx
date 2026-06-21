import React, { useState, useEffect } from 'react';

export default function Section65({ isActive }) {
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
                        롯폰기힐즈 녹색 인프라 실증 및 서울시 기후·탄소 목표와 브랜드 경쟁력 융합
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    환경 인프라의 지속 가능 성과와 서울의 글로벌 도시 브랜드 효과
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (환경 인포그래픽 & 4대 순환 고리) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="w-full h-[360px] bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 relative flex items-center justify-center shadow-inner">
                        <svg className="w-full h-full" viewBox="0 0 920 360">
                            <defs>
                                <linearGradient id="headerGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="#059669" />
                                </linearGradient>
                                <linearGradient id="headerBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#1d4ed8" />
                                </linearGradient>
                                <filter id="shadow-drop" x="-10%" y="-10%" width="120%" height="120%">
                                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.1" />
                                </filter>
                            </defs>

                            {/* 1. 좌측 Panel: 롯폰기힐즈 환경 성능 (Green 계열) */}
                            <g transform="translate(30, 25)" filter="url(#shadow-drop)">
                                <rect x="0" y="0" width="380" height="280" fill="#ffffff" rx="16" />
                                <rect x="15" y="15" width="350" height="35" fill="url(#headerGreenGrad)" rx="8" />
                                <text x="190" y="37" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="black">모리빌딩 롯폰기힐즈 환경 실증 지표</text>
                                
                                {/* 녹지율 수치 */}
                                <g transform="translate(20, 65)">
                                    <rect x="0" y="0" width="155" height="85" fill="#f0fdf4" stroke="#dcfce7" strokeWidth="1" rx="8" />
                                    <text x="15" y="24" fill="#065f46" fontSize="11" fontWeight="bold">지구 내 녹지 면적 비율</text>
                                    <text x="15" y="58" fill="#047857" fontSize="28" fontWeight="black">31%</text>
                                    <text x="15" y="76" fill="#059669" fontSize="9.5" fontWeight="bold">미나토구 평균의 약 1.4배</text>
                                </g>

                                {/* 표면 온도 저감 수치 */}
                                <g transform="translate(195, 65)">
                                    <rect x="0" y="0" width="165" height="85" fill="#f0fdf4" stroke="#dcfce7" strokeWidth="1" rx="8" />
                                    <text x="15" y="24" fill="#065f46" fontSize="11" fontWeight="bold">지구 표면 온도 저감 효과</text>
                                    <text x="15" y="56" fill="#dc2626" fontSize="24" fontWeight="black">5~15℃↓</text>
                                    <text x="15" y="76" fill="#ef4444" fontSize="9.5" fontWeight="bold">주변 아스팔트 바닥 대비</text>
                                </g>

                                {/* 상세 텍스트 */}
                                <g transform="translate(20, 165)">
                                    <text x="0" y="15" fill="#0f172a" fontSize="11.5" fontWeight="bold">지속가능 기후 인프라 및 커뮤니티 작동</text>
                                    <text x="10" y="34" fill="#4b5563" fontSize="10.5" fontWeight="medium">• 인공지반 옥상 녹화 및 체계적 관리를 통한 생태 수림 구축</text>
                                    <text x="10" y="50" fill="#4b5563" fontSize="10.5" fontWeight="medium">• 단지 내 정원에서 주민들과 벼농사 및 모내기 이벤트 진행</text>
                                    <text x="10" y="66" fill="#4b5563" fontSize="10.5" fontWeight="medium">• 친환경 빌딩 성능 축적 ➔ 글로벌 LP ESG 기준 즉시 부합</text>
                                    <text x="0" y="88" fill="#047857" fontSize="11" fontWeight="bold">➔ 서울시 2050 탄소중립 및 기후목표에 완벽 대응 가능한 구조</text>
                                </g>
                            </g>

                            {/* 연결선 */}
                            <g transform="translate(425, 150)">
                                <circle cx="15" cy="15" r="20" fill="#10b981" opacity="0.1" />
                                <path d="M 5,15 L 25,15 M 18,8 L 25,15 L 18,22" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </g>

                            {/* 2. 우측 Panel: 서울시 4대 가치 루프 (Blue 계열) */}
                            <g transform="translate(480, 25)" filter="url(#shadow-drop)">
                                <rect x="0" y="0" width="410" height="280" fill="#1e3a8a" rx="16" />
                                <text x="25" y="32" fill="#ffffff" fontSize="13.5" fontWeight="black">SBD 모델이 제공하는 4대 복합 가치</text>
                                
                                <g transform="translate(20, 50)">
                                    {/* 1 */}
                                    <g transform="translate(0, 0)">
                                        <rect x="0" y="0" width="175" height="55" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" rx="8" />
                                        <circle cx="20" cy="27" r="10" fill="#ffffff" />
                                        <text x="20" y="31" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">1</text>
                                        <text x="38" y="24" fill="#ffffff" fontSize="11.5" fontWeight="bold">시 예산 0원</text>
                                        <text x="38" y="38" fill="#93c5fd" fontSize="9" fontWeight="bold">민간 자금으로 공공 서비스 대행</text>
                                    </g>
                                    
                                    {/* 2 */}
                                    <g transform="translate(190, 0)">
                                        <rect x="0" y="0" width="180" height="55" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" rx="8" />
                                        <circle cx="20" cy="27" r="10" fill="#ffffff" />
                                        <text x="20" y="31" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">2</text>
                                        <text x="38" y="24" fill="#ffffff" fontSize="11.5" fontWeight="bold">안전·청결 확보</text>
                                        <text x="38" y="38" fill="#93c5fd" fontSize="9" fontWeight="bold">범죄 20%↓, 부상 40%↓ 입증</text>
                                    </g>

                                    {/* 3 */}
                                    <g transform="translate(0, 65)">
                                        <rect x="0" y="0" width="175" height="55" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" rx="8" />
                                        <circle cx="20" cy="27" r="10" fill="#ffffff" />
                                        <text x="20" y="31" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">3</text>
                                        <text x="38" y="24" fill="#ffffff" fontSize="11.5" fontWeight="bold">녹색 친환경 도시</text>
                                        <text x="38" y="38" fill="#93c5fd" fontSize="9" fontWeight="bold">열섬현상 완화 (5~15도↓)</text>
                                    </g>

                                    {/* 4 */}
                                    <g transform="translate(190, 65)">
                                        <rect x="0" y="0" width="180" height="55" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" rx="8" />
                                        <circle cx="20" cy="27" r="10" fill="#ffffff" />
                                        <text x="20" y="31" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">4</text>
                                        <text x="38" y="24" fill="#ffffff" fontSize="11.5" fontWeight="bold">세원 확대 효과</text>
                                        <text x="38" y="38" fill="#93c5fd" fontSize="9" fontWeight="bold">자산가치 상승에 연동된 세수</text>
                                    </g>
                                </g>

                                {/* 최종 브랜딩 요약 박스 */}
                                <g transform="translate(20, 195)">
                                    <rect x="0" y="0" width="370" height="70" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" rx="8" />
                                    <text x="185" y="26" textAnchor="middle" fill="#60a5fa" fontSize="13.5" fontWeight="black">최종 결론: 서울의 글로벌 도시 브랜드 효과</text>
                                    <text x="185" y="46" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold">글로벌 LP와 다국적 기업이 신뢰하고 유입되는</text>
                                    <text x="185" y="60" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold">초일류 도심 경쟁력 브랜딩 구축</text>
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
                                롯폰기힐즈의 환경 성능 실증을 기반으로, 예산 부담 없는 '안전·녹색·세수' 복합 효과를 통한 서울의 글로벌 도시 경쟁력 브랜딩을 구축함.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
