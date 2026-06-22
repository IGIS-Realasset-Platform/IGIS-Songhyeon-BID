import React, { useState, useEffect } from 'react';

export default function Section69({ isActive }) {
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
                        지역 리테일 활성화와 주말 공동화 방지 및 지속가능성 확보 전략
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    보행 광장 활성화와 젠트리피케이션 방지 설계로 주말 공동화 없는 지속가능 상생 생태계를 구축함
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (무배경, 2분할 정보 구조화) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        <defs>
                            <linearGradient id="purpleAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4338ca" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                            <linearGradient id="orangeAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#c2410c" />
                                <stop offset="100%" stopColor="#f97316" />
                            </linearGradient>
                        </defs>

                        {/* 1. 좌측: 리테일·소상공인 활성화 엔진 */}
                        <g transform="translate(10, 10)">
                            <rect x="0" y="0" width="445" height="305" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                            
                            {/* 상단 라벨 */}
                            <rect x="0" y="0" width="445" height="35" fill="url(#purpleAccent)" />
                            <text x="222.5" y="23" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="bold">소상공인 매출 극대화 및 유동인구 가두리 해소</text>

                            {/* 세부항목 1 */}
                            <g transform="translate(15, 55)">
                                <rect x="0" y="0" width="415" height="105" fill="#fafafa" stroke="#e2e8f0" strokeWidth="1" />
                                <text x="15" y="25" fill="#4338ca" fontSize="12" fontWeight="black">보행 환경 개선 및 유동량 증폭</text>
                                <text x="15" y="48" fill="#0f172a" fontSize="11" fontWeight="bold">• 가로 정비와 보행자 친화 환경 유동 인구 20~40% 증가</text>
                                <text x="15" y="66" fill="#0f172a" fontSize="11" fontWeight="bold">• 타임스스퀘어 사례: 광장 보행화 이후 상권 매출 71% 폭증</text>
                                <text x="15" y="86" fill="#475569" fontSize="10.5" fontWeight="medium">➔ 오피스 빌딩 내부에 갇힌 직장인 유동 인구를 가로로 방출</text>
                            </g>

                            {/* 세부항목 2 */}
                            <g transform="translate(15, 175)">
                                <rect x="0" y="0" width="415" height="110" fill="#fafafa" stroke="#e2e8f0" strokeWidth="1" />
                                <text x="15" y="25" fill="#4338ca" fontSize="12" fontWeight="black">지구 단위 공동 마케팅 실행</text>
                                <text x="15" y="48" fill="#0f172a" fontSize="11" fontWeight="bold">• 개별 점포가 불가능한 통합 공간 단위 프로모션 수행</text>
                                <text x="15" y="66" fill="#0f172a" fontSize="11" fontWeight="bold">• "SBD 맛집 지도", "야간 도심 산책 코스" 등 콘텐츠 생산</text>
                                <text x="15" y="86" fill="#475569" fontSize="10.5" fontWeight="medium">➔ 외부 문화/쇼핑 관광객을 능동적으로 유입시키는 매개 작동</text>
                            </g>
                        </g>

                        {/* 2. 우측: 주말 활성화 및 지속가능성 설계 */}
                        <g transform="translate(485, 10)">
                            <rect x="0" y="0" width="445" height="305" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                            
                            {/* 상단 라벨 */}
                            <rect x="0" y="0" width="445" height="35" fill="url(#orangeAccent)" />
                            <text x="222.5" y="23" textAnchor="middle" fill="#ffffff" fontSize="13.5" fontWeight="bold">주말 공동화 방지 및 지역 상생 상생(Win-Win) 생태계</text>

                            {/* 세부항목 1 */}
                            <g transform="translate(15, 55)">
                                <rect x="0" y="0" width="415" height="105" fill="#fafafa" stroke="#e2e8f0" strokeWidth="1" />
                                <text x="15" y="25" fill="#c2410c" fontSize="12" fontWeight="black">주말 공동화 차단 (일하는 곳 ➔ 머무는 곳)</text>
                                <text x="15" y="48" fill="#0f172a" fontSize="11" fontWeight="bold">• 도쿄 마루노우치: 토·일 나카도리 보행자 천국으로 활성 유지</text>
                                <text x="15" y="66" fill="#0f172a" fontSize="11" fontWeight="bold">• 롯폰기힐스: 모리미술관·모리가든 연계로 문화·자연 융합</text>
                                <text x="15" y="86" fill="#475569" fontSize="10.5" fontWeight="medium">➔ 단순 업무 외 시간에 공동화되는 전형적 오피스 타운 극복</text>
                            </g>

                            {/* 세부항목 2 */}
                            <g transform="translate(15, 175)">
                                <rect x="0" y="0" width="415" height="110" fill="#fffaf8" stroke="#ffedd5" strokeWidth="1" />
                                <text x="15" y="25" fill="#b91c1c" fontSize="12" fontWeight="black">상생 장치 내장 (젠트리피케이션 대응)</text>
                                <text x="15" y="48" fill="#0f172a" fontSize="11" fontWeight="bold">• 고급화에 따른 임대료 상승으로 기존 소상공인 퇴출 우려 방지</text>
                                <text x="15" y="66" fill="#0f172a" fontSize="11" fontWeight="bold">• SBD 초기 개발 설계 시 공공기여 가이드라인 지정</text>
                                <text x="15" y="86" fill="#7f1d1d" fontSize="10.5" fontWeight="black">➔ 저소득 소상공인을 위한 장기 안심 임대 용도/가격대 확보</text>
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
                                보행자 친화 환경 정비와 지구 단위 공동 마케팅 가동 및 소상공인 보호를 위한 상생 장치 내장
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
