import React, { useState, useEffect } from 'react';

export default function Section80({ isActive }) {
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
                        양동-봉래 구역의 기부채납 공간 위탁 관리에서 시작해 서울역-남산 통합 SBD와 용산 연계 축 완성
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    파일럿 BID 설립 및 권역 확장 로드맵 (Phase 1~3)
                </h2>

                {/* 중앙 컨텐츠 영역: 외곽 박스 및 그림자를 완전히 제거한 오픈형 인포그래픽 */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        {/* 컬럼 구분 점선 (박스를 씌우지 않음) */}
                        <line x1="310" y1="20" x2="310" y2="340" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
                        <line x1="620" y1="20" x2="620" y2="340" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />

                        {/* 1. Phase 1: 파일럿 양동-봉래 BID (2026~2028) */}
                        <g transform="translate(10, 10)">
                            <text x="0" y="20" fill="#1e3a8a" fontSize="13.5" fontWeight="black">Phase 1. 파일럿 BID (2026~2028)</text>
                            
                            <g transform="translate(0, 45)">
                                <text x="0" y="15" fill="#0f172a" fontSize="11" fontWeight="bold">■ 구역 설정 및 핵심 발의 주체</text>
                                <text x="10" y="32" fill="#475569" fontSize="10">• 이오타 1·2 + 봉래 2·3지구 + 서울역 광장 일부</text>
                                <text x="10" y="48" fill="#475569" fontSize="10">• 이지스(앵커), 한화(북부), 삼성물산, 코레일 참여</text>

                                <text x="0" y="80" fill="#0f172a" fontSize="11" fontWeight="bold">■ 재원 조달 방식</text>
                                <text x="10" y="97" fill="#475569" fontSize="10">• 이오타서울 기부채납 공공공간 위탁 관리 수수료</text>
                                <text x="10" y="113" fill="#475569" fontSize="10">• 소유자 분담금 (추정 ₩2,000~3,000/㎡/년)</text>

                                <text x="0" y="145" fill="#0f172a" fontSize="11" fontWeight="bold">■ 제공 서비스 내역</text>
                                <text x="10" y="162" fill="#475569" fontSize="10">• 서울역-이오타-남산 보행로 통합 및 상시 청소/방범</text>
                                <text x="10" y="178" fill="#475569" fontSize="10">• 공개녹지 내 공연·전시/중소상공인 연계 마케팅</text>
                            </g>
                        </g>

                        {/* 2. Phase 2: 서울역-남산 통합 SBD BID (2028~2030) */}
                        <g transform="translate(325, 10)">
                            <text x="0" y="20" fill="#4f46e5" fontSize="13.5" fontWeight="black">Phase 2. SBD BID 확장 (2028~2030)</text>
                            
                            <g transform="translate(0, 45)">
                                <text x="0" y="15" fill="#0f172a" fontSize="11" fontWeight="bold">■ 관리 구역 광역 통합</text>
                                <text x="10" y="32" fill="#475569" fontSize="10">• 서울역북부역세권 및 서대문(서소문 빌딩) 공식 편입</text>
                                <text x="10" y="48" fill="#475569" fontSize="10">• 개별 빌딩 단위를 넘어선 광역 통합 운영구역화</text>

                                <text x="0" y="80" fill="#0f172a" fontSize="11" fontWeight="bold">■ 공공 보행 네트워크 인수</text>
                                <text x="10" y="97" fill="#475569" fontSize="10">• 서울로 7017 에리어의 BID 핵심 보행 인프라로의</text>
                                <text x="10" y="113" fill="#475569" fontSize="10">  위탁 및 통합 유지관리 개시</text>

                                <text x="0" y="145" fill="#0f172a" fontSize="11" fontWeight="bold">■ 통합 에리어 브랜딩</text>
                                <text x="10" y="162" fill="#475569" fontSize="10">• 북부역세권 MICE 기능과 통합 플레이스메이킹 연계</text>
                                <text x="10" y="178" fill="#475569" fontSize="10">• 글로벌 비즈니스 목적지로서의 위상 정립</text>
                            </g>
                        </g>

                        {/* 3. Phase 3: SBD-YBD 브릿지 연계 BID (2030~) */}
                        <g transform="translate(635, 10)">
                            <text x="0" y="20" fill="#047857" fontSize="13.5" fontWeight="black">Phase 3. 용산 IBD 연계 (2030~)</text>
                            
                            <g transform="translate(0, 45)">
                                <text x="0" y="15" fill="#0f172a" fontSize="11" fontWeight="bold">■ 용산국제업무지구 OS 전이</text>
                                <text x="10" y="32" fill="#475569" fontSize="10">• 용산 IBD 초기 입주 연계 ➔ SBD-용산 3km 결합</text>
                                <text x="10" y="48" fill="#475569" fontSize="10">• 서울역-용산역 구간 '업무 벨트 BID' 통합 구상</text>

                                <text x="0" y="80" fill="#0f172a" fontSize="11" fontWeight="bold">■ 초광역 보행·녹지 축 운영</text>
                                <text x="10" y="97" fill="#475569" fontSize="10">• 서울역 광장-한강로-용산역-한강 축 통합 네트워크</text>
                                <text x="10" y="113" fill="#475569" fontSize="10">• 보행자 및 자전거 친화 에리어 매니지먼트 구축</text>

                                <text x="0" y="145" fill="#0f172a" fontSize="11" fontWeight="bold">■ 서울 4대 개발 축의 완성</text>
                                <text x="10" y="162" fill="#047857" fontSize="10" fontWeight="bold">• 총면적 합계 100만㎡+ 초대형 메가 비즈니스 벨트 구축</text>
                                <text x="10" y="178" fill="#047857" fontSize="10" fontWeight="bold">• 기존 CBD·GBD·YBD 축을 'SBD-IBD 연계축'으로 재편</text>
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
                                양동 파일럿 BID의 기부공간 위탁 운영 경험을 토대로 서울역-남산 전체를 하나로 묶고, 최종적으로 용산국제업무지구까지 연결해 서울의 중심 업무 축을 재편함.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
