import React, { useState, useEffect } from 'react';

export default function Section76({ isActive }) {
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
                        단순 사회공헌을 넘어 감정평가액 상승 및 '서울형 플레이스메이커' 브랜드 자산화 전략
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    SBD 도입을 통한 이오타서울 자산 가치 극대화 메커니즘
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (무배경, 밸류체인 다이어그램) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        {/* 1. 상단: 가치 극대화 파이프라인 (Flow) */}
                        <g transform="translate(10, 10)">
                            {/* 배경 커넥터 라인 */}
                            <line x1="100" y1="45" x2="820" y2="45" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 4" />

                            {/* 단계 1 */}
                            <g transform="translate(15, 0)">
                                <rect x="0" y="0" width="180" height="90" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                                <rect x="0" y="0" width="180" height="26" fill="#1e293b" />
                                <text x="90" y="17" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold">1단계: BID 설립 발의</text>
                                <text x="15" y="48" fill="#1e3a8a" fontSize="11" fontWeight="bold">• 이지스 주도의 민간 발의</text>
                                <text x="15" y="68" fill="#475569" fontSize="10" fontWeight="medium">• 복잡한 권원/이해 조율</text>
                            </g>

                            {/* 단계 2 */}
                            <g transform="translate(245, 0)">
                                <rect x="0" y="0" width="180" height="90" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                                <rect x="0" y="0" width="180" height="26" fill="#1e293b" />
                                <text x="90" y="17" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold">2단계: 공공 공간 개선</text>
                                <text x="15" y="48" fill="#1e3a8a" fontSize="11" fontWeight="bold">• 안전·청결·녹지 수준 향상</text>
                                <text x="15" y="68" fill="#475569" fontSize="10" fontWeight="medium">• 남산 연결 보행로 활성화</text>
                            </g>

                            {/* 단계 3 */}
                            <g transform="translate(475, 0)">
                                <rect x="0" y="0" width="180" height="90" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                                <rect x="0" y="0" width="180" height="26" fill="#1e293b" />
                                <text x="90" y="17" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold">3단계: 임대성 제고</text>
                                <text x="15" y="48" fill="#1e3a8a" fontSize="11" fontWeight="bold">• 임대료 프리미엄 확보</text>
                                <text x="15" y="68" fill="#475569" fontSize="10" fontWeight="medium">• 우량 임차인 유치/공실↓</text>
                            </g>

                            {/* 단계 4 */}
                            <g transform="translate(705, 0)">
                                <rect x="0" y="0" width="180" height="90" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                                <rect x="0" y="0" width="180" height="26" fill="#1e3a8a" />
                                <text x="90" y="17" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold">4단계: 자산가치 상승</text>
                                <text x="15" y="48" fill="#1e3a8a" fontSize="11" fontWeight="bold">• 감정평가 가치 극대화</text>
                                <text x="15" y="68" fill="#166534" fontSize="10" fontWeight="bold">➔ 펀드 최종 수익률 상승</text>
                            </g>
                        </g>

                        {/* 2. 하단: 전략적 유효성 (2개 상세 보드) */}
                        <g transform="translate(10, 130)">
                            {/* 보드 1: 플레이스메이커 브랜드화 */}
                            <g transform="translate(15, 0)">
                                <rect x="0" y="0" width="410" height="150" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                                <rect x="0" y="0" width="410" height="32" fill="#334155" />
                                <text x="20" y="20" fill="#ffffff" fontSize="12" fontWeight="bold">Placemaker 브랜드 자산화</text>
                                
                                <text x="20" y="58" fill="#0f172a" fontSize="11" fontWeight="bold">• 단순 단일 빌딩 임대를 넘어 지구 단위 '장소 형성자'로 도약</text>
                                <text x="20" y="80" fill="#475569" fontSize="10.5" fontWeight="medium">• 메가 PPP 개발 계획 수립 및 가로 운영 노하우 브랜드 내재화</text>
                                <text x="20" y="102" fill="#475569" fontSize="10.5" fontWeight="medium">• 허드슨야드 디벨로퍼 주도 임대성공 사례(블랙록 유치 등) 벤치마킹</text>
                                <text x="20" y="124" fill="#1e3a8a" fontSize="11" fontWeight="bold">➔ 대체투자 자산 운용 시장 내 IGIS의 독보적 지위 확보</text>
                            </g>

                            {/* 보드 2: 용산 연계 거버넌스 리더십 */}
                            <g transform="translate(475, 0)">
                                <rect x="0" y="0" width="410" height="150" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                                <rect x="0" y="0" width="410" height="32" fill="#334155" />
                                <text x="20" y="20" fill="#ffffff" fontSize="12" fontWeight="bold">용산 IBD 연계 및 거버넌스 리더십 선점</text>
                                
                                <text x="20" y="58" fill="#0f172a" fontSize="11" fontWeight="bold">• 서울 스마트 코어(용산) 타운 매니지먼트 파트너십 구축</text>
                                <text x="20" y="80" fill="#475569" fontSize="10.5" fontWeight="medium">• SBD 선제적 구축을 통한 검증된 거버넌스 조율 노하우 축적</text>
                                <text x="20" y="102" fill="#475569" fontSize="10.5" fontWeight="medium">• 글로벌 대표 사모펀드(Hines, Blackstone)식 도시 개발 참여 트랙 레코드</text>
                                <text x="20" y="124" fill="#047857" fontSize="11" fontWeight="bold">➔ 대규모 민관합동 개발 사업 내 선두적 파트너 지위 확보</text>
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
                                이오타서울의 BID 설립 주도는 단순한 자산 관리를 넘어 펀드 수익률 개선 및 향후 용산 개발 거버넌스 내 민간 리더십 확보로 직결되는 핵심 가치 극대화 전략임.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
