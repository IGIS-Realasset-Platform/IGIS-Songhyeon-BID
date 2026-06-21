import React, { useState, useEffect } from 'react';

export default function Section68({ isActive }) {
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
                        이오타서울 공개 녹지 관리, 보행 네트워크 연결 및 치안 개선을 통한 주거 환경 혁신
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    주변 거주자 관점의 실질적 혜택과 부동산 가치 상승 효과
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (무배경, 2컬럼 비교 다이어그램) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        <defs>
                            <linearGradient id="blueAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1e3a8a" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                            <linearGradient id="emeraldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#047857" />
                                <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                        </defs>

                        {/* 1. 좌측: 서계·청파·중림동 주민의 실질적 변화 (3단계 리스트) - 라운드코너 없음 */}
                        <g transform="translate(10, 10)">
                            {/* 상단 라벨 */}
                            <rect x="0" y="0" width="500" height="35" fill="#1e293b" />
                            <text x="250" y="23" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="bold">인접 지역 주민 생활 인프라의 전면 업그레이드</text>

                            {/* 항목 1: 이오타서울 공개 녹지 */}
                            <g transform="translate(0, 50)">
                                <rect x="0" y="0" width="500" height="75" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                                <rect x="15" y="15" width="110" height="45" fill="#f0fdf4" stroke="#dcfce7" strokeWidth="1" />
                                <text x="70" y="42" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="black">생활공원 확보</text>
                                
                                <text x="145" y="32" fill="#0f172a" fontSize="12" fontWeight="bold">축구장 1개 규모의 거대 공개 녹지 조성</text>
                                <text x="145" y="52" fill="#475569" fontSize="11" fontWeight="medium">BID 전담 인력의 통합 관리로 안전하고 쾌적한 주민 쉼터 작동</text>
                            </g>

                            {/* 항목 2: 보행 네트워크 완성 */}
                            <g transform="translate(0, 140)">
                                <rect x="0" y="0" width="500" height="75" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                                <rect x="15" y="15" width="110" height="45" fill="#eff6ff" stroke="#dbeafe" strokeWidth="1" />
                                <text x="70" y="42" textAnchor="middle" fill="#1d4ed8" fontSize="12" fontWeight="black">보행망 완성</text>
                                
                                <text x="145" y="32" fill="#0f172a" fontSize="12" fontWeight="bold">서울로 7017 ~ 남산 연결 네트워크 구축</text>
                                <text x="145" y="52" fill="#475569" fontSize="11" fontWeight="medium">단절된 보행 흐름을 복원하여 동네 산책 인프라의 질적 상승</text>
                            </g>

                            {/* 항목 3: 조명·청소·방범 */}
                            <g transform="translate(0, 230)">
                                <rect x="0" y="0" width="500" height="75" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                                <rect x="15" y="15" width="110" height="45" fill="#fffbeb" stroke="#fef3c7" strokeWidth="1" />
                                <text x="70" y="42" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="black">야간 치안 개선</text>
                                
                                <text x="145" y="32" fill="#0f172a" fontSize="12" fontWeight="bold">SBD 전역 고화질 CCTV 및 전담 보안 패트롤</text>
                                <text x="145" y="52" fill="#475569" fontSize="11" fontWeight="medium">노고존 해소 및 가로등 조도 상향으로 안심 보행 가로망 조성</text>
                            </g>
                        </g>

                        {/* 2. 우측: 부동산 가치 파급 효과 (NYU Furman Center 실증 자료) */}
                        <g transform="translate(540, 10)">
                            <rect x="0" y="0" width="390" height="305" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                            
                            {/* 상단 라벨 */}
                            <rect x="0" y="0" width="390" height="35" fill="url(#blueAccent)" />
                            <text x="195" y="23" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="bold">글로벌 실증 연구: 부동산 가치 변화</text>

                            {/* 메인 통계 수치 */}
                            <text x="195" y="80" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">NYU Furman Center 오피스 BID 분석 연구</text>
                            <text x="195" y="130" textAnchor="middle" fill="#1e3a8a" fontSize="48" fontWeight="black">+15%p</text>
                            <text x="195" y="155" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="bold">주변 대비 상업용 부동산 가치 초과 상승</text>

                            {/* 그래프 */}
                            <g transform="translate(30, 175)">
                                {/* 일반 상업지역 */}
                                <text x="0" y="35" fill="#64748b" fontSize="11" fontWeight="bold">일반 지역</text>
                                <rect x="70" y="22" width="160" height="18" fill="#cbd5e1" />
                                <text x="240" y="35" fill="#475569" fontSize="11" fontWeight="black">기준선</text>

                                {/* BID 경계 내 */}
                                <text x="0" y="75" fill="#1e3a8a" fontSize="11" fontWeight="bold">BID 경계내</text>
                                <rect x="70" y="62" width="220" height="18" fill="url(#emeraldAccent)" />
                                <text x="300" y="75" fill="#047857" fontSize="11" fontWeight="black">+15%p</text>
                            </g>

                            {/* 부가 정보 */}
                            <text x="195" y="285" textAnchor="middle" fill="#475569" fontSize="10.5" fontWeight="medium">※ 상업용 자산의 지가 상승은 인접 주거지역 가치 상승으로 직결</text>
                        </g>
                    </svg>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                축구장 1개 크기의 이오타서울 녹지 관리와 남산 연결 보행로 및 치안 인프라 구축을 통해 인접 주거지의 정주 여건을 개선하고 부동산 가치의 초과 상승을 견인함.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
