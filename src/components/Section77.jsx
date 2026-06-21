import React, { useState, useEffect } from 'react';

export default function Section77({ isActive }) {
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
                        이오타서울을 테스트베드로 한 에리어 매니지먼트 패키지(거버넌스·분담금·OS)의 이식 구조
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    서울역-남산 SBD 검증 운영 모델의 용산국제업무지구 전이 전략
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (무배경, 아키텍처 다이어그램) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        {/* 1. 좌측: 테스트베드 SBD */}
                        <g transform="translate(10, 10)">
                            <rect x="0" y="0" width="360" height="305" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            
                            <rect x="0" y="0" width="360" height="35" fill="#475569" />
                            <text x="180" y="22" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">1차 테스트베드: SBD (서울역-남산)</text>
                            
                            <g transform="translate(15, 55)">
                                <text x="0" y="15" fill="#1e3a8a" fontSize="11" fontWeight="bold">■ 이오타서울 통합개발 중심의 실증</text>
                                <text x="0" y="32" fill="#475569" fontSize="10.5" fontWeight="medium">• 옛 힐튼+메트로+서울로타워 통합 (약 46만㎡)</text>
                                <text x="0" y="48" fill="#475569" fontSize="10.5" fontWeight="medium">• 리츠칼튼(2031 목표) 유치 및 최고급 예술 기획</text>

                                <text x="0" y="85" fill="#1e3a8a" fontSize="11" fontWeight="bold">■ 공공 기여 및 인접 연계 노하우 축적</text>
                                <text x="0" y="102" fill="#475569" fontSize="10.5" fontWeight="medium">• 7,000㎡ 공개녹지 & 에스컬레이터 보행로 통합</text>
                                <text x="0" y="118" fill="#475569" fontSize="10.5" fontWeight="medium">• 지자체 간 복잡한 권원 및 유지관리 협약 완료</text>

                                <text x="0" y="155" fill="#047857" fontSize="11" fontWeight="bold">➔ 대주단·투자자 조율 및 분담금 구조 설계 완료</text>
                            </g>
                        </g>

                        {/* 2. 중앙: 전이 커넥터 (화살표 & 전이 구성요소) */}
                        <g transform="translate(380, 10)">
                            {/* 화살표 바디 */}
                            <rect x="10" y="130" width="140" height="40" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
                            <polygon points="150,120 170,150 150,180" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
                            
                            <text x="80" y="154" textAnchor="middle" fill="#1e3a8a" fontSize="10.5" fontWeight="black">운영 OS 전이</text>
                            
                            {/* 전이 핵심 구성 요소 */}
                            <g transform="translate(10, 30)">
                                <rect x="0" y="0" width="140" height="75" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                                <text x="70" y="18" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="bold">전이 패키지</text>
                                <text x="10" y="38" fill="#475569" fontSize="9" fontWeight="medium">• 에리어 매니지먼트 법인</text>
                                <text x="10" y="52" fill="#475569" fontSize="9" fontWeight="medium">• 조례/점용 협약 모델</text>
                                <text x="10" y="66" fill="#475569" fontSize="9" fontWeight="medium">• 플레이스메이킹 기획</text>
                            </g>
                        </g>

                        {/* 3. 우측: 2차 적용지 용산 IBD */}
                        <g transform="translate(570, 10)">
                            <rect x="0" y="0" width="360" height="305" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            
                            <rect x="0" y="0" width="360" height="35" fill="#1e3a8a" />
                            <text x="180" y="22" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">2차 확장 대상: 용산국제업무지구 (YBD)</text>
                            
                            <g transform="translate(15, 55)">
                                <text x="0" y="15" fill="#c2410c" fontSize="11" fontWeight="bold">■ 서울 최선진 메가 스마트시티 기획</text>
                                <text x="0" y="32" fill="#475569" fontSize="10.5" fontWeight="medium">• 부지 49.3만㎡, 최대 용적률 1,700%, 100층 랜드마크</text>
                                <text x="0" y="48" fill="#475569" fontSize="10.5" fontWeight="medium">• 총사업비 약 14.3조원 (SBD 대비 4.4배 규모)</text>

                                <text x="0" y="85" fill="#c2410c" fontSize="11" fontWeight="bold">■ 마스터플랜 핵심 "타운 매니지먼트" 요구</text>
                                <text x="0" y="102" fill="#475569" fontSize="10.5" fontWeight="medium">• 전체 면적의 19%에 달하는 대규모 공원 녹지 관리</text>
                                <text x="0" y="118" fill="#475569" fontSize="10.5" fontWeight="medium">• 스카이트레일, 통합운영센터 등 초광역 복합 인프라</text>

                                <text x="0" y="155" fill="#b91c1c" fontSize="11" fontWeight="bold">➔ 파편화된 필지 한계를 넘을 통합 관리조직(뇌) 구축 필수</text>
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
                                이오타서울 통합개발을 통해 축적된 에리어 매니지먼트의 조율 및 협약 모델은 향후 용산국제업무지구의 초대형 타운 매니지먼트를 가동하는 핵심 실무 매뉴얼로 이전됨.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
