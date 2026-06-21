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
                
                {/* 소제목 */}
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        서울시·중구청·용산구청을 아우르는 재정 절감 및 공공성 기여 체계
                    </span>
                </div>

                {/* 제목 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    예산 부담 없는 민간 협력형 도시 복지 모델과 지자체 행정 시너지
                </h2>

                {/* 중앙 컨텐츠 영역: 3개 지자체 및 실증 3단 비교 카드 SVG 다이어그램 */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="w-full h-[360px] bg-slate-50/50 border border-slate-100 relative flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 920 360">
                            <defs>
                                <linearGradient id="cardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#f8fafc" />
                                    <stop offset="100%" stopColor="#f1f5f9" />
                                </linearGradient>
                                <linearGradient id="cardGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#eff6ff" />
                                    <stop offset="100%" stopColor="#dbeafe" />
                                </linearGradient>
                                <linearGradient id="cardGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#f0fdf4" />
                                    <stop offset="100%" stopColor="#dcfce7" />
                                </linearGradient>
                            </defs>

                            {/* 카드 1: 글로벌 실증 (재정 절감) */}
                            <g transform="translate(20, 20)">
                                <rect x="0" y="0" width="270" height="300" fill="url(#cardGrad1)" stroke="#cbd5e1" strokeWidth="1" rx="8" />
                                <rect x="15" y="15" width="240" height="35" fill="#475569" rx="4" />
                                <text x="135" y="37" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">글로벌 실증 벤치마크</text>
                                
                                <g transform="translate(20, 75)">
                                    <text x="0" y="15" fill="#0f172a" fontSize="12" fontWeight="black">브라이언트 파크</text>
                                    <text x="0" y="32" fill="#475569" fontSize="11" fontWeight="medium">• 29년간 시 예산 0원 투입</text>
                                    <text x="0" y="48" fill="#475569" fontSize="11" fontWeight="medium">• 연 3,000만 달러 자체 조달 자립</text>
                                </g>
                                
                                <g transform="translate(20, 150)">
                                    <text x="0" y="15" fill="#0f172a" fontSize="12" fontWeight="black">타임스스퀘어</text>
                                    <text x="0" y="32" fill="#475569" fontSize="11" fontWeight="medium">• 청소·치안 서비스를 BID에 위탁</text>
                                    <text x="0" y="48" fill="#475569" fontSize="11" fontWeight="medium">• 시 직접 운영 대비 압도적 예산 절감</text>
                                </g>

                                <g transform="translate(20, 225)">
                                    <text x="0" y="15" fill="#0f172a" fontSize="12" fontWeight="black">필라델피아 CCD</text>
                                    <text x="0" y="32" fill="#475569" fontSize="11" fontWeight="medium">• 경기침체기 주택 하락 방어 (-1%)</text>
                                    <text x="0" y="48" fill="#475569" fontSize="11" fontWeight="medium">• 지구 활성화 통한 간접 세수 유지</text>
                                </g>
                            </g>

                            {/* 카드 2: 서울시 본청 (재정 레버리지) */}
                            <g transform="translate(325, 20)">
                                <rect x="0" y="0" width="270" height="300" fill="url(#cardGrad2)" stroke="#93c5fd" strokeWidth="1.5" rx="8" />
                                <rect x="15" y="15" width="240" height="35" fill="#1e3a8a" rx="4" />
                                <text x="135" y="37" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">서울시 본청 (재정 레버리지)</text>
                                
                                <g transform="translate(20, 75)">
                                    <text x="0" y="15" fill="#1e3a8a" fontSize="12.5" fontWeight="black">기부채납 공공공간 유지비 제로</text>
                                    <text x="0" y="34" fill="#1e40af" fontSize="11" fontWeight="bold">• 이오타 서울·북부역세권 공공 광장</text>
                                    <text x="0" y="50" fill="#3b82f6" fontSize="10.5" fontWeight="medium">  (수천 평 규모) 유지관리비 BID 전가</text>
                                </g>

                                <g transform="translate(20, 150)">
                                    <text x="0" y="15" fill="#1e3a8a" fontSize="12.5" fontWeight="black">서울로 7017 확장 운영 위탁</text>
                                    <text x="0" y="34" fill="#1e40af" fontSize="11" fontWeight="bold">• 보행로 활성화 프로그램을 BID에 위탁</text>
                                    <text x="0" y="50" fill="#3b82f6" fontSize="10.5" fontWeight="medium">  ➔ 본청의 운영 예산 매년 대폭 절감</text>
                                </g>

                                <g transform="translate(20, 225)">
                                    <text x="0" y="15" fill="#1e3a8a" fontSize="12.5" fontWeight="black">구조적 세수 확충 효과</text>
                                    <text x="0" y="34" fill="#1e40af" fontSize="11" fontWeight="bold">• 부동산 밸류업 ➔ 취득세·재산세 상승</text>
                                    <text x="0" y="50" fill="#3b82f6" fontSize="10.5" fontWeight="medium">  • 상권 집적 효과 ➔ 법인·부가세 확대</text>
                                </g>
                            </g>

                            {/* 카드 3: 중구청 & 용산구청 (행정 시너지) */}
                            <g transform="translate(630, 20)">
                                <rect x="0" y="0" width="270" height="300" fill="url(#cardGrad3)" stroke="#86efac" strokeWidth="1" rx="8" />
                                <rect x="15" y="15" width="240" height="35" fill="#047857" rx="4" />
                                <text x="135" y="37" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">지방 자치단체 행정 시너지</text>
                                
                                <g transform="translate(20, 75)">
                                    <text x="0" y="15" fill="#065f46" fontSize="12.5" fontWeight="black">중구청: 민원 흡수 및 행정 효율</text>
                                    <text x="0" y="34" fill="#0f766e" fontSize="11" fontWeight="medium">• 불법 주정차, 청결 문제 선제 흡수</text>
                                    <text x="0" y="50" fill="#0f766e" fontSize="11" fontWeight="medium">• 야간 치안 공백을 민간 순찰로 보완</text>
                                    <text x="0" y="66" fill="#10b981" fontSize="10" fontWeight="bold">➔ 구청은 장기 기획 및 정책 수립 집중</text>
                                </g>

                                <g transform="translate(20, 160)">
                                    <text x="0" y="15" fill="#065f46" fontSize="12.5" fontWeight="black">용산구청: 개발 연계 테넌트 시너지</text>
                                    <text x="0" y="34" fill="#0f766e" fontSize="11" fontWeight="medium">• 용산 IBD-서울역 SBD 간 연계 확대</text>
                                    <text x="0" y="50" fill="#0f766e" fontSize="11" fontWeight="medium">• 공동 마케팅·브랜딩을 통한 파급효과</text>
                                    <text x="0" y="66" fill="#10b981" fontSize="10" fontWeight="bold">➔ 글로벌 대기업·앵커 테넌트 유치 가속</text>
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
                                BID는 민간 소유주들이 자체 조달한 강제 부과금으로 공공 서비스를 대행하는 구조로, 서울시는 예산 추가 투입 없이 도심 가로 청결과 치안 품질을 대폭 강화할 수 있습니다.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                기부채납될 대규모 공공 보행로와 광장들의 유지관리비를 민간 BID가 전적으로 부담하여 예산을 절감하고, 불법 주정차 등 고질적 민원을 민간 차원에서 신속히 해소해 지자체의 행정 효율성을 극대화합니다.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
