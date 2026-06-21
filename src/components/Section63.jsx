import React, { useState, useEffect } from 'react';

export default function Section63({ isActive }) {
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
                        서울시·중구청·용산구청을 아우르는 재정 절감 및 공공성 기여 체계
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    예산 부담 없는 민간 협력형 도시 복지 모델과 지자체 행정 시너지
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (화려한 3D 레이어 및 그라데이션) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="w-full h-[360px] bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 relative flex items-center justify-center shadow-inner">
                        <svg className="w-full h-full" viewBox="0 0 940 360">
                            <defs>
                                <linearGradient id="gradPillar1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#475569" />
                                    <stop offset="100%" stopColor="#1e293b" />
                                </linearGradient>
                                <linearGradient id="gradPillar2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#1d4ed8" />
                                </linearGradient>
                                <linearGradient id="gradPillar3" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="#047857" />
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="8" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.15" />
                                </filter>
                            </defs>

                            {/* 연결되는 기하학적 흐름 라인 */}
                            <path d="M 160,180 Q 470,20 780,180" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                            <path d="M 160,180 Q 470,20 780,180" fill="none" stroke="url(#gradPillar2)" strokeWidth="3" strokeDasharray="6,6" />
                            
                            {/* 카드 1: 글로벌 실증 (입체 둥근 카드, 그라데이션) */}
                            <g transform="translate(30, 40)" filter="url(#shadow)">
                                <rect x="0" y="0" width="260" height="250" fill="url(#gradPillar1)" rx="16" />
                                <rect x="15" y="15" width="230" height="35" fill="rgba(255,255,255,0.1)" rx="8" />
                                <text x="130" y="37" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="bold">글로벌 실증 벤치마크</text>
                                
                                <g transform="translate(20, 75)">
                                    <circle cx="5" cy="10" r="3" fill="#94a3b8" />
                                    <text x="18" y="14" fill="#ffffff" fontSize="12" fontWeight="bold">브라이언트 파크 ($0 예산)</text>
                                    <text x="18" y="30" fill="#94a3b8" fontSize="10.5" fontWeight="medium">29년간 시 예산 0원, 연 3천만달러 자립</text>

                                    <circle cx="5" cy="55" r="3" fill="#94a3b8" />
                                    <text x="18" y="59" fill="#ffffff" fontSize="12" fontWeight="bold">타임스스퀘어 (위탁 대행)</text>
                                    <text x="18" y="75" fill="#94a3b8" fontSize="10.5" fontWeight="medium">청소·보안 BID 위탁으로 예산 대폭 절감</text>

                                    <circle cx="5" cy="100" r="3" fill="#94a3b8" />
                                    <text x="18" y="104" fill="#ffffff" fontSize="12" fontWeight="bold">필라델피아 CCD (세수 방어)</text>
                                    <text x="18" y="120" fill="#94a3b8" fontSize="10.5" fontWeight="medium">경기침체기에도 주택 하락 1% 선방</text>
                                </g>
                            </g>

                            {/* 카드 2: 서울시 본청 효과 (센터 블루 하이라이트 카드, 입체감 극대화) */}
                            <g transform="translate(340, 20)" filter="url(#shadow)">
                                <rect x="0" y="0" width="260" height="270" fill="url(#gradPillar2)" rx="16" />
                                <rect x="15" y="15" width="230" height="38" fill="rgba(255,255,255,0.15)" rx="8" />
                                <text x="130" y="38" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="black">서울시 본청 (재정 레버리지)</text>
                                
                                <g transform="translate(20, 75)">
                                    <circle cx="5" cy="12" r="4" fill="#60a5fa" />
                                    <text x="20" y="17" fill="#ffffff" fontSize="13" fontWeight="bold">기부채납 공공공간 유지비 0원</text>
                                    <text x="20" y="35" fill="#93c5fd" fontSize="11" fontWeight="bold">이오타 서울 광장 유지관리비 BID 전가</text>

                                    <circle cx="5" cy="67" r="4" fill="#60a5fa" />
                                    <text x="20" y="72" fill="#ffffff" fontSize="13" fontWeight="bold">서울로 7017 확장 운영 위탁</text>
                                    <text x="20" y="90" fill="#93c5fd" fontSize="11" fontWeight="bold">보행로 활성화 프로그램 위탁 ➔ 예산 절감</text>

                                    <circle cx="5" cy="122" r="4" fill="#60a5fa" />
                                    <text x="20" y="127" fill="#ffffff" fontSize="13" fontWeight="bold">세수 기반의 구조적 확대</text>
                                    <text x="20" y="145" fill="#93c5fd" fontSize="11" fontWeight="bold">부동산 가치 상승 ➔ 지방세 수입 증가</text>
                                </g>
                            </g>

                            {/* 카드 3: 지자체 행정 시너지 (에메랄드/그린 테마) */}
                            <g transform="translate(650, 40)" filter="url(#shadow)">
                                <rect x="0" y="0" width="260" height="250" fill="url(#gradPillar3)" rx="16" />
                                <rect x="15" y="15" width="230" height="35" fill="rgba(255,255,255,0.1)" rx="8" />
                                <text x="130" y="37" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="bold">지방 자치단체 시너지</text>
                                
                                <g transform="translate(20, 75)">
                                    <circle cx="5" cy="10" r="3" fill="#a7f3d0" />
                                    <text x="18" y="14" fill="#ffffff" fontSize="12" fontWeight="bold">중구청: 민원 흡수 & 행정 효율</text>
                                    <text x="18" y="30" fill="#a7f3d0" fontSize="10.5" fontWeight="medium">불법 주정차·가로 청결·치안 BID 흡수</text>

                                    <circle cx="5" cy="65" r="3" fill="#a7f3d0" />
                                    <text x="18" y="69" fill="#ffffff" fontSize="12" fontWeight="bold">용산구청: 공동 마케팅 연계</text>
                                    <text x="18" y="85" fill="#a7f3d0" fontSize="10.5" fontWeight="medium">Phase 3-용산 IBD 공동 브랜딩 시너지</text>

                                    <circle cx="5" cy="115" r="3" fill="#a7f3d0" />
                                    <text x="18" y="119" fill="#ffffff" fontSize="12" fontWeight="bold">민간 주도 공공 인증 모델</text>
                                    <text x="18" y="135" fill="#a7f3d0" fontSize="10.5" fontWeight="medium">서울시 '민간 협력형 도시재생' 기조 정합</text>
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
                                민간이 자체 조달한 부과금으로 서비스를 대행하여 시 예산 부담 없이 도심 환경과 치안을 강화하고 행정 효율을 극대화함.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
