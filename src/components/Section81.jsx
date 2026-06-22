import React, { useState, useEffect } from 'react';

export default function Section81({ isActive }) {
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
                        뉴욕시 SBS 설립 기준에 근거한 법적·실무적 단계별 체크리스트
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    NYC 가이드라인 기준 BID 설립에 최소 3~6년이 소요되므로 마스터플랜 기획 단계부터 선제적 준비가 필수적임
                </h2>

                {/* 중앙 컨텐츠 영역: 외곽 상자 및 그림자 제거한 오픈형 데이터 그리드 */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        {/* Table Header Row */}
                        <g transform="translate(30, 10)">
                            <rect x="0" y="0" width="140" height="32" fill="#1e293b" />
                            <text x="70" y="20" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">단계</text>

                            <rect x="150" y="0" width="530" height="32" fill="#475569" />
                            <text x="415" y="20" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">필수 실무 요건 및 세부 내용</text>

                            <rect x="690" y="0" width="190" height="32" fill="#1e3a8a" />
                            <text x="785" y="20" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">소요 기간 (평균)</text>
                            
                            <line x1="0" y1="32" x2="880" y2="32" stroke="#cbd5e1" strokeWidth="1.5" />
                        </g>

                        {/* Row 1: 사전 준비 */}
                        <g transform="translate(30, 42)">
                            <text x="70" y="25" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">사전 준비</text>
                            <text x="170" y="25" fill="#334155" fontSize="10.5">Steering Committee 구성 (지권자·재산소유자·상인·주민 대표자 회의 소집)</text>
                            <text x="785" y="25" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">—</text>
                            <line x1="0" y1="38" x2="880" y2="38" stroke="#e2e8f0" strokeWidth="1" />
                        </g>

                        {/* Row 2: 계획 수립 */}
                        <g transform="translate(30, 80)">
                            <text x="70" y="25" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">계획 수립</text>
                            <text x="170" y="25" fill="#334155" fontSize="10.5">지역 요구조사(Needs Assessment) 완료, 공식 경계 확정, 서비스 예산 및 부과율 합의</text>
                            <text x="785" y="25" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">6 ~ 12개월</text>
                            <line x1="0" y1="38" x2="880" y2="38" stroke="#e2e8f0" strokeWidth="1" />
                        </g>

                        {/* Row 3: 아웃리치 */}
                        <g transform="translate(30, 118)">
                            <text x="70" y="25" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">아웃리치</text>
                            <text x="170" y="25" fill="#334155" fontSize="10.5">모든 건물주/임차인 대상 지원투표(Support Ballot) 발송, 지역공청회 개최, 지권자 동의서 확보</text>
                            <text x="785" y="25" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">6 ~ 12개월</text>
                            <line x1="0" y1="38" x2="880" y2="38" stroke="#e2e8f0" strokeWidth="1" />
                        </g>

                        {/* Row 4: 입법화 */}
                        <g transform="translate(30, 156)">
                            <text x="70" y="25" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">입법화</text>
                            <text x="170" y="25" fill="#334155" fontSize="10.5">Community Board 심의 ➔ 구청장 동의 ➔ 도시계획위원회 승인 ➔ 시의회 통과 및 시장 서명</text>
                            <text x="785" y="25" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">9 ~ 12개월</text>
                            <line x1="0" y1="38" x2="880" y2="38" stroke="#e2e8f0" strokeWidth="1" />
                        </g>

                        {/* Row 5: 스타트업 */}
                        <g transform="translate(30, 194)">
                            <text x="70" y="25" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">스타트업</text>
                            <text x="170" y="25" fill="#334155" fontSize="10.5">DMA(지구관리협회) 비영리법인 설립등기, 부과금 징수 계좌 개설, 최초 가로 관리 서비스 개시</text>
                            <text x="785" y="25" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">3 ~ 6개월</text>
                            <line x1="0" y1="38" x2="880" y2="38" stroke="#cbd5e1" strokeWidth="1.5" />
                        </g>

                        {/* Row 6: 총 소요 기간 */}
                        <g transform="translate(30, 232)">
                            <rect x="0" y="0" width="880" height="38" fill="#f8fafc" />
                            <text x="70" y="25" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">총 소요 기간</text>
                            <text x="170" y="25" fill="#1e3a8a" fontSize="11" fontWeight="bold">사전 공론화 및 동의서 확보, 다단계 행정 입법 절차를 거치는 실무 총괄 기간</text>
                            <text x="785" y="25" textAnchor="middle" fill="#1e3a8a" fontSize="11.5" fontWeight="black">3 ~ 6년 이상</text>
                            <line x1="0" y1="38" x2="880" y2="38" stroke="#cbd5e1" strokeWidth="1.5" />
                        </g>
                    </svg>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                주민·소유주 사전 동의 확보, 의회 입법 심의, NPO 거버넌스 수립 등 정교한 법적 타임라인 분석
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
