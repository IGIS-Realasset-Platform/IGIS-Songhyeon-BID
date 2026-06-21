import React, { useState, useEffect } from 'react';

export default function Section79({ isActive }) {
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
                        즉시(지권자 NPO)에서 시작해 단기 조례 제정, 중기 통합 구역화, 장기 용산 전이로 이어지는 단계적 실행
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    서울형 SBD 구축을 위한 단계별 실행 로드맵 및 타임라인
                </h2>

                {/* 중앙 컨텐츠 영역: 외곽 박스를 완전히 배제한 오픈형 인포그래픽 */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        {/* 1. 상단: 단계별 5단계 마일스톤 가로 축 */}
                        <g transform="translate(10, 10)">
                            {/* 타임라인 점선 축 */}
                            <line x1="80" y1="40" x2="840" y2="40" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="6 4" />

                            {/* 1단계 */}
                            <g transform="translate(10, 0)">
                                <circle cx="80" cy="40" r="8" fill="#1e3a8a" />
                                <text x="80" y="20" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">즉시 (0~12개월)</text>
                                <text x="80" y="65" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">이지스 주도 NPO 설립</text>
                                <text x="80" y="82" textAnchor="middle" fill="#475569" fontSize="9.5" fontWeight="medium">일본 大丸有 벤치마크</text>
                            </g>

                            {/* 2단계 */}
                            <g transform="translate(195, 0)">
                                <circle cx="80" cy="40" r="8" fill="#1e3a8a" />
                                <text x="80" y="20" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">단기 (1~3년)</text>
                                <text x="80" y="65" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">SBD 분담금 조례 공동 설계</text>
                                <text x="80" y="82" textAnchor="middle" fill="#475569" fontSize="9.5" fontWeight="medium">수익자 2/3 동의 명문화</text>
                            </g>

                            {/* 3단계 */}
                            <g transform="translate(380, 0)">
                                <circle cx="80" cy="40" r="8" fill="#1e3a8a" />
                                <text x="80" y="20" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">중기 (3~5년)</text>
                                <text x="80" y="65" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">단일 SBD 구역 통합</text>
                                <text x="80" y="82" textAnchor="middle" fill="#475569" fontSize="9.5" fontWeight="medium">남산 연결 보행·녹지 구축</text>
                            </g>

                            {/* 4단계 */}
                            <g transform="translate(565, 0)">
                                <circle cx="80" cy="40" r="8" fill="#1e3a8a" />
                                <text x="80" y="20" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">장기 (5년+)</text>
                                <text x="80" y="65" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">용산 IBD 운영체제 전이</text>
                                <text x="80" y="82" textAnchor="middle" fill="#475569" fontSize="9.5" fontWeight="medium">서울역-용산 SYBD 축 완성</text>
                            </g>

                            {/* 5단계 */}
                            <g transform="translate(750, 0)">
                                <circle cx="80" cy="40" r="8" fill="#e11d48" />
                                <text x="80" y="20" textAnchor="middle" fill="#e11d48" fontSize="11" fontWeight="black">리스크 관리</text>
                                <text x="80" y="65" textAnchor="middle" fill="#b91c1c" fontSize="10.5" fontWeight="bold">공공성 균형 장치</text>
                                <text x="80" y="82" textAnchor="middle" fill="#475569" fontSize="9.5" fontWeight="medium">Hudson Yards 사례 반면교사</text>
                            </g>
                        </g>

                        {/* 2. 하단: 타임라인 표 (구분선과 배경색만 사용한 깔끔한 레이아웃, 외각 박스 없음) */}
                        <g transform="translate(20, 130)">
                            {/* 헤더 행 */}
                            <rect x="0" y="0" width="900" height="28" fill="#f1f5f9" />
                            <text x="30" y="18" fill="#1e293b" fontSize="11" fontWeight="bold">시기</text>
                            <text x="180" y="18" fill="#1e293b" fontSize="11" fontWeight="bold">주요 액션</text>
                            <text x="620" y="18" fill="#1e293b" fontSize="11" fontWeight="bold">주요 주체</text>
                            <line x1="0" y1="28" x2="900" y2="28" stroke="#cbd5e1" strokeWidth="1.5" />

                            {/* 행 1: 2026 (즉시) */}
                            <text x="30" y="48" fill="#0f172a" fontSize="10.5" fontWeight="bold">2026 (즉시)</text>
                            <text x="180" y="48" fill="#334155" fontSize="10.5">SBD BID 개념 연구·공론화, 법적 근거 검토 및 이지스/한화/코레일 협의 개시</text>
                            <text x="620" y="48" fill="#334155" fontSize="10.5">이지스자산운용, 서울특별시</text>
                            <line x1="0" y1="58" x2="900" y2="58" stroke="#e2e8f0" strokeWidth="1" />

                            {/* 행 2: 2027 */}
                            <text x="30" y="78" fill="#0f172a" fontSize="10.5" fontWeight="bold">2027</text>
                            <text x="180" y="78" fill="#334155" fontSize="10.5">도시재생법 기반 특례법 추진 및 추진위원회(Steering Committee) 구성</text>
                            <text x="620" y="78" fill="#334155" fontSize="10.5">국토교통부, 서울특별시, 민간 컨소시엄</text>
                            <line x1="0" y1="88" x2="900" y2="88" stroke="#e2e8f0" strokeWidth="1" />

                            {/* 행 3: 2028 */}
                            <text x="30" y="108" fill="#0f172a" fontSize="10.5" fontWeight="bold">2028</text>
                            <text x="180" y="108" fill="#334155" fontSize="10.5">이오타서울 공개 녹지 준공에 맞춘 파일럿 BID 공식 출범, 북부역세권 연계</text>
                            <text x="620" y="108" fill="#334155" fontSize="10.5">파일럿 BID DMA 법인, SH공사</text>
                            <line x1="0" y1="118" x2="900" y2="118" stroke="#e2e8f0" strokeWidth="1" />

                            {/* 행 4: 2029-2030 */}
                            <text x="30" y="138" fill="#0f172a" fontSize="10.5" fontWeight="bold">2029 ~ 2030</text>
                            <text x="180" y="138" fill="#334155" fontSize="10.5">이오타서울 완공에 따른 확장 BID 기동 및 SBD 공식 브랜드 선언</text>
                            <text x="620" y="138" fill="#334155" fontSize="10.5">서울특별시, SBD BID 연합</text>
                            <line x1="0" y1="148" x2="900" y2="148" stroke="#e2e8f0" strokeWidth="1" />

                            {/* 행 5: 2030+ */}
                            <text x="30" y="168" fill="#0f172a" fontSize="10.5" fontWeight="bold">2030 ~</text>
                            <text x="180" y="168" fill="#1e3a8a" fontSize="10.5" fontWeight="bold">용산 IBD 초기 입주 연계 ➔ SBD-IBD 연계 업무 벨트 통합 거버넌스 출범</text>
                            <text x="620" y="168" fill="#1e3a8a" fontSize="10.5" fontWeight="bold">서울특별시, KORAIL, SH공사, 민간 디벨로퍼</text>
                            <line x1="0" y1="178" x2="900" y2="178" stroke="#cbd5e1" strokeWidth="1.5" />
                        </g>
                    </svg>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                2026년 이지스자산운용 주도의 파일럿 NPO 설립을 기점으로 조례 입법과 SBD-IBD 연계를 단계적으로 달성하는 실행 로드맵을 구축함.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
