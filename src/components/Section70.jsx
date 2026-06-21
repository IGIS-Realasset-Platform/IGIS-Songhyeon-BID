import React, { useState, useEffect } from 'react';

export default function Section70({ isActive }) {
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
                        운영주체와 어메니티, 정책 지원이 결여된 단순 오피스 집합의 한계 노출
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    한국 3대 업무지구(CBD·GBD·YBD)의 구조적 한계와 결핍
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (무배경, 3열 대비 레이아웃) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        <defs>
                            <linearGradient id="cbdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#475569" />
                                <stop offset="100%" stopColor="#64748b" />
                            </linearGradient>
                            <linearGradient id="gbdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0f172a" />
                                <stop offset="100%" stopColor="#334155" />
                            </linearGradient>
                            <linearGradient id="ybdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1e3a8a" />
                                <stop offset="100%" stopColor="#1e40af" />
                            </linearGradient>
                        </defs>

                        {/* 1. CBD (도심) */}
                        <g transform="translate(10, 10)">
                            <rect x="0" y="0" width="290" height="305" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="290" height="40" fill="url(#cbdGrad)" />
                            <text x="145" y="26" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">CBD (도심권역)</text>
                            
                            <g transform="translate(15, 60)">
                                <text x="0" y="15" fill="#ef4444" fontSize="12" fontWeight="black">■ 자연발생의 한계 (600년 역사)</text>
                                <text x="0" y="38" fill="#334155" fontSize="11" fontWeight="bold">• 극단적 파편화된 소유 구조</text>
                                <text x="0" y="56" fill="#334155" fontSize="11" fontWeight="bold">• 지구 단위 운영주체 설립 불가능</text>

                                <text x="0" y="95" fill="#ef4444" fontSize="12" fontWeight="black">■ 공급 과잉 충격에 무방비</text>
                                <text x="0" y="118" fill="#334155" fontSize="11" fontWeight="bold">• 대형 오피스 집중 공급 충격</text>
                                <text x="0" y="136" fill="#334155" fontSize="11" fontWeight="bold">• 2025년 하반기 공실률 8~10% 급등 우려</text>
                                
                                <text x="0" y="175" fill="#64748b" fontSize="10.5" fontWeight="medium">※ 소유권 분절로 가로 정비 및 통합</text>
                                <text x="0" y="190" fill="#64748b" fontSize="10.5" fontWeight="medium">   에리어 매니지먼트 추진 주체 부재</text>
                            </g>
                        </g>

                        {/* 2. GBD (강남) */}
                        <g transform="translate(325, 10)">
                            <rect x="0" y="0" width="290" height="305" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="290" height="40" fill="url(#gbdGrad)" />
                            <text x="145" y="26" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">GBD (강남권역)</text>
                            
                            <g transform="translate(15, 60)">
                                <text x="0" y="15" fill="#ef4444" fontSize="12" fontWeight="black">■ 물리적 계획 vs 운영 부재</text>
                                <text x="0" y="38" fill="#334155" fontSize="11" fontWeight="bold">• 격자형 토지구획은 도로/획지 계획일 뿐</text>
                                <text x="0" y="56" fill="#334155" fontSize="11" fontWeight="bold">• 사람을 배려한 어메니티/녹지 계획 결여</text>

                                <text x="0" y="95" fill="#ef4444" fontSize="12" fontWeight="black">■ 오피스 시장의 극단적 양극화</text>
                                <text x="0" y="118" fill="#334155" fontSize="11" fontWeight="bold">• 프라임급 공실률 1%대 초강세</text>
                                <text x="0" y="136" fill="#334155" fontSize="11" fontWeight="bold">• 중소형 공실률 4%대 상승 (시장 양극화)</text>
                                
                                <text x="0" y="175" fill="#64748b" fontSize="10.5" fontWeight="medium">※ 단순 격자에 건물만 채웠을 뿐,</text>
                                <text x="0" y="190" fill="#64748b" fontSize="10.5" fontWeight="medium">   일하고 쉬는 공간적 매니지먼트 없음</text>
                            </g>
                        </g>

                        {/* 3. YBD (여의도) */}
                        <g transform="translate(640, 10)">
                            <rect x="0" y="0" width="290" height="305" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="290" height="40" fill="url(#ybdGrad)" />
                            <text x="145" y="26" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">YBD (여의도권역)</text>
                            
                            <g transform="translate(15, 60)">
                                <text x="0" y="15" fill="#ef4444" fontSize="12" fontWeight="black">■ 전형적 단일 기능 오피스 지구</text>
                                <text x="0" y="38" fill="#334155" fontSize="11" fontWeight="bold">• 한국의 맨해튼을 지향하는 외형</text>
                                <text x="0" y="56" fill="#334155" fontSize="11" fontWeight="bold">• 주말이면 유동인구가 증발하는 공동화</text>

                                <text x="0" y="95" fill="#ef4444" fontSize="12" fontWeight="black">■ 차량 중심 가로로 도보 단절</text>
                                <text x="0" y="118" fill="#334155" fontSize="11" fontWeight="bold">• 넓은 도로로 인한 보행 쾌적성 결여</text>
                                <text x="0" y="136" fill="#334155" fontSize="11" fontWeight="bold">• 점심시간 안마의자 쪽잠에 의존하는 환경</text>
                                
                                <text x="0" y="175" fill="#64748b" fontSize="10.5" fontWeight="medium">※ 주말 및 야간 시간대 배후 활력 부재,</text>
                                <text x="0" y="190" fill="#64748b" fontSize="10.5" fontWeight="medium">   차량 소음과 단절된 보행 네트워크</text>
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
                                기존 3대 권역은 거대한 종사자 규모에도 불구하고 운영 주체와 어메니티의 결여로 인해 공급 충격, 양극화, 주말 공동화 등의 구조적 한계를 안고 있음.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
