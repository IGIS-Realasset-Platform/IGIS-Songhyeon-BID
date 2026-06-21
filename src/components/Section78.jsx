import React, { useState, useEffect } from 'react';

export default function Section78({ isActive }) {
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
                        콘크리트 하드웨어를 넘어 데이터 기반 타운 매니지먼트와 투명한 디지털 분담금 조율 완성
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    5세대 디지털 BID: 스마트코어(AI·디지털트윈) 기반 통합 관리체제
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (무배경, 디지털 아키텍처) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        {/* 중앙: 5세대 디지털 BID 거버넌스 */}
                        <g transform="translate(330, 95)">
                            <rect x="0" y="0" width="280" height="150" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
                            <text x="140" y="32" textAnchor="middle" fill="#1e3a8a" fontSize="13.5" fontWeight="black">5세대 디지털 BID 거버넌스</text>
                            <text x="140" y="55" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">(용산 스마트 코어의 '통합 뇌')</text>
                            
                            <text x="25" y="85" fill="#475569" fontSize="10" fontWeight="medium">• 데이터 수집 및 지구 의사결정 총괄</text>
                            <text x="25" y="103" fill="#475569" fontSize="10" fontWeight="medium">• 블록 소유주 및 공공 인프라 통합 조율</text>
                            <text x="25" y="121" fill="#475569" fontSize="10" fontWeight="medium">• SBD 이오타서울 실무 가이드라인 기반 가동</text>
                        </g>

                        {/* 좌측: AI 물류 및 모빌리티 */}
                        <g transform="translate(10, 20)">
                            <rect x="0" y="0" width="290" height="105" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="290" height="26" fill="#1e293b" />
                            <text x="145" y="17" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">AI 자율 모빌리티 & 스마트 물류</text>
                            
                            <text x="15" y="46" fill="#334155" fontSize="10.5" fontWeight="bold">• AI 기반 순환 자율주행 셔틀 정밀 배차</text>
                            <text x="15" y="64" fill="#334155" fontSize="10.5" fontWeight="bold">• 지하 공동 물류 네트워크 실시간 트래킹</text>
                            <text x="15" y="82" fill="#475569" fontSize="9.5" fontWeight="medium">➔ 공동 사용료의 디지털 알고리즘 자동 정산</text>
                        </g>

                        {/* 우측: 디지털 트윈 & 에너지 제어 */}
                        <g transform="translate(640, 20)">
                            <rect x="0" y="0" width="290" height="105" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="290" height="26" fill="#1e293b" />
                            <text x="145" y="17" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">디지털 트윈 기반 환경/시설 관리</text>
                            
                            <text x="15" y="46" fill="#334155" fontSize="10.5" fontWeight="bold">• 초광역 스카이트레일 입체 조명/치안 모니터링</text>
                            <text x="15" y="64" fill="#334155" fontSize="10.5" fontWeight="bold">• 빌딩 숲 탄소 성능 및 에너지 효율 원격 제어</text>
                            <text x="15" y="82" fill="#475569" fontSize="9.5" fontWeight="medium">➔ 인프라 고도화로 가로 관리비 15~25% 절감</text>
                        </g>

                        {/* 하단: 블록체인 디지털 분담금 */}
                        <g transform="translate(10, 235)">
                            <rect x="0" y="0" width="290" height="105" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="290" height="26" fill="#10b981" />
                            <text x="145" y="17" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">블록체인 기반 디지털 분담금</text>
                            
                            <text x="15" y="46" fill="#334155" fontSize="10.5" fontWeight="bold">• 다국적 소유주 간 유지보수비 정밀 정산</text>
                            <text x="15" y="64" fill="#334155" fontSize="10.5" fontWeight="bold">• 분담 비용 산정 기준의 스마트 컨트랙트 내장</text>
                            <text x="15" y="82" fill="#047857" fontSize="9.5" fontWeight="bold">➔ 비용 징수의 불투명성 배제로 소송/분쟁 예방</text>
                        </g>

                        {/* 연결선 (점선) */}
                        <line x1="300" y1="72" x2="330" y2="130" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
                        <line x1="640" y1="72" x2="610" y2="130" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
                        <line x1="300" y1="287" x2="330" y2="225" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
                    </svg>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                용산국제업무지구는 단순 물리적 관리를 넘어 AI, 디지털 트윈, 블록체인 분담금 시스템이 통합된 5세대 디지털 BID로 진화하며, 그 시작점이 이오타서울임.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
