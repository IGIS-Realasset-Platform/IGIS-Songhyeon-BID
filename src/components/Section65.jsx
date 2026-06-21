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
                
                {/* 소제목 */}
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        롯폰기힐즈 녹색 인프라 실증 및 서울시 기후·탄소 목표와 브랜드 경쟁력 융합
                    </span>
                </div>

                {/* 제목 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    환경 인프라의 지속 가능 성과와 서울의 글로벌 도시 브랜드 효과
                </h2>

                {/* 중앙 컨텐츠 영역: 녹색 성능 및 4대 복합 레버리지 루프 커스텀 SVG */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="w-full h-[360px] bg-slate-50/50 border border-slate-100 relative flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 900 360">
                            <defs>
                                <linearGradient id="greenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="#059669" />
                                </linearGradient>
                                <linearGradient id="cityBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#1e3a8a" />
                                    <stop offset="100%" stopColor="#0f172a" />
                                </linearGradient>
                            </defs>

                            {/* 1. 좌측: 롯폰기힐즈 녹색 성과 */}
                            <g transform="translate(40, 20)">
                                <rect x="0" y="0" width="360" height="300" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" rx="8" />
                                <text x="20" y="30" fill="#0f172a" fontSize="14" fontWeight="black">모리빌딩 롯폰기힐즈 환경 지표 실증</text>
                                
                                {/* 녹지율 */}
                                <g transform="translate(20, 50)">
                                    <rect x="0" y="0" width="150" height="90" fill="#f0fdf4" stroke="#86efac" strokeWidth="0.5" />
                                    <text x="15" y="25" fill="#065f46" fontSize="11" fontWeight="black">롯폰기힐즈 녹지율</text>
                                    <text x="15" y="60" fill="#047857" fontSize="28" fontWeight="black">31%</text>
                                    <text x="15" y="80" fill="#059669" fontSize="9.5" fontWeight="bold">미나토구 평균의 1.4배</text>
                                </g>

                                {/* 표면 온도 저감 */}
                                <g transform="translate(190, 50)">
                                    <rect x="0" y="0" width="150" height="90" fill="#f0fdf4" stroke="#86efac" strokeWidth="0.5" />
                                    <text x="15" y="25" fill="#065f46" fontSize="11" fontWeight="black">표면 온도 감소 효과</text>
                                    <text x="15" y="60" fill="#b91c1c" fontSize="24" fontWeight="black">5~15℃↓</text>
                                    <text x="15" y="80" fill="#ef4444" fontSize="9.5" fontWeight="bold">아스팔트 주변 구역 대비</text>
                                </g>

                                {/* 상세 기술 */}
                                <g transform="translate(20, 155)">
                                    <text x="0" y="18" fill="#1e3a8a" fontSize="11.5" fontWeight="black">도시 열섬현상 해소 및 기후 목표 기여</text>
                                    <text x="0" y="36" fill="#475569" fontSize="10.5" fontWeight="medium">• 옥상 정원 및 생태 녹지의 체계적 유지 관리</text>
                                    <text x="0" y="52" fill="#475569" fontSize="10.5" fontWeight="medium">• 단지 내 논밭 복원으로 지역 주민 벼농사 연계</text>
                                    <text x="0" y="68" fill="#475569" fontSize="10.5" fontWeight="medium">• 환경 성능이 자산가치 극대화의 핵심 요소 작동</text>
                                    <text x="0" y="90" fill="#047857" fontSize="11" fontWeight="bold">➔ 서울시 탄소중립/ESG 성과 지표에 즉시 반영 가능</text>
                                </g>
                            </g>

                            {/* 화살표 */}
                            <path d="M 420,170 L 440,170" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3,3" />

                            {/* 2. 우측: 서울시 관점 4대 레버리지와 최종 결론 */}
                            <g transform="translate(460, 20)">
                                <rect x="0" y="0" width="400" height="300" fill="url(#cityBrandGrad)" rx="8" />
                                <text x="25" y="35" fill="#ffffff" fontSize="14" fontWeight="black">SBD 모델이 서울시에 제공하는 4대 가치</text>
                                
                                {/* 4대 밸류 */}
                                <g transform="translate(25, 60)">
                                    {/* 1 */}
                                    <g transform="translate(0, 0)">
                                        <circle cx="15" cy="15" r="12" fill="#3b82f6" />
                                        <text x="15" y="19" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">1</text>
                                        <text x="35" y="14" fill="#ffffff" fontSize="12" fontWeight="black">시 예산 투입 0원</text>
                                        <text x="35" y="28" fill="#93c5fd" fontSize="9.5" fontWeight="bold">민간 자기 자금 조달로 도시 유지 관리 대행</text>
                                    </g>
                                    
                                    {/* 2 */}
                                    <g transform="translate(180, 0)">
                                        <circle cx="15" cy="15" r="12" fill="#10b981" />
                                        <text x="15" y="19" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">2</text>
                                        <text x="35" y="14" fill="#ffffff" fontSize="12" fontWeight="black">안전·청결 도심 확보</text>
                                        <text x="35" y="28" fill="#a7f3d0" fontSize="9.5" fontWeight="bold">범죄율 20%↓, 보행 부상 40%↓ 입증 효과</text>
                                    </g>

                                    {/* 3 */}
                                    <g transform="translate(0, 60)">
                                        <circle cx="15" cy="15" r="12" fill="#10b981" />
                                        <text x="15" y="19" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">3</text>
                                        <text x="35" y="14" fill="#ffffff" fontSize="12" fontWeight="black">녹색 친환경 도시</text>
                                        <text x="35" y="28" fill="#a7f3d0" fontSize="9.5" fontWeight="bold">열섬현상 저감(5~15도↓) 및 기후 목표 충족</text>
                                    </g>

                                    {/* 4 */}
                                    <g transform="translate(180, 60)">
                                        <circle cx="15" cy="15" r="12" fill="#3b82f6" />
                                        <text x="15" y="19" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">4</text>
                                        <text x="35" y="14" fill="#ffffff" fontSize="12" fontWeight="black">세원 경제 기반 확대</text>
                                        <text x="35" y="28" fill="#93c5fd" fontSize="9.5" fontWeight="bold">부동산 가치 상승에 따른 세수 확대 견인</text>
                                    </g>
                                </g>

                                {/* 최종 메시지 박스 */}
                                <g transform="translate(25, 205)">
                                    <rect x="0" y="0" width="350" height="70" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                                    <text x="175" y="28" textAnchor="middle" fill="#38bdf8" fontSize="13.5" fontWeight="black">최종 요약: 서울의 글로벌 도시 브랜드 파급력</text>
                                    <text x="175" y="48" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold">글로벌 LP와 다국적 기업들이 유입되는 초일류 도심 경쟁력 브랜딩 구축</text>
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
                                롯폰기힐즈는 녹지율 31%를 달성하여 도심 표면 온도를 5~15도 낮추고 옥상 논밭 커뮤니티 등 다각적 환경 관리를 제공함으로써 서울시의 기후·탄소중립 목표에 완벽히 기여함.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                서울시는 예산 지출 없이 SBD 모델을 통해 도심 안전, 청결, 녹색 인프라, 세수 확대를 다져 글로벌 LP와 다국적 앵커 기업이 신뢰하고 찾아오는 강력한 서울시 도시 경쟁력 브랜딩을 획득하게 됨.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
