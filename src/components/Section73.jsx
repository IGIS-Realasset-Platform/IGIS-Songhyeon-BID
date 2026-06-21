import React, { useState, useEffect } from 'react';

export default function Section73({ isActive }) {
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
                        압도적 자연자산과 교통결절의 융합, 그리고 뉴욕·도쿄의 에리어 매니지먼트 입증 효과
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    SBD의 고유 경쟁력(남산·서울역)과 글로벌 매니지먼트 사례
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (무배경, 2컬럼 레이아웃) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        {/* 1. 좌측: SBD만의 결정적 무기 */}
                        <g transform="translate(10, 10)">
                            <rect x="0" y="0" width="310" height="305" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="310" height="35" fill="#1e293b" />
                            <text x="155" y="22" textAnchor="middle" fill="#ffffff" fontSize="12.5" fontWeight="bold">SBD만의 고유 융합 자산</text>

                            {/* 남산 자산 */}
                            <g transform="translate(15, 50)">
                                <rect x="0" y="0" width="280" height="110" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                                <text x="15" y="24" fill="#047857" fontSize="12" fontWeight="black">남산 (압도적 자연자산)</text>
                                <text x="15" y="48" fill="#0f172a" fontSize="10.5" fontWeight="bold">• 7,000㎡ 도심 속 공개녹지 개방</text>
                                <text x="15" y="66" fill="#475569" fontSize="10" fontWeight="medium">• 자연자산을 에리어 매니지먼트로 활성화</text>
                                <text x="15" y="84" fill="#475569" fontSize="10" fontWeight="medium">• 오피스 지구의 가치를 장소 가치로 전환</text>
                            </g>

                            {/* 서울역 자산 */}
                            <g transform="translate(15, 175)">
                                <rect x="0" y="0" width="280" height="110" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                                <text x="15" y="24" fill="#1d4ed8" fontSize="12" fontWeight="black">서울역 (교통 허브 결절지)</text>
                                <text x="15" y="48" fill="#0f172a" fontSize="10.5" fontWeight="bold">• 전국 철도망 & 공항철도 직결 게이트웨이</text>
                                <text x="15" y="66" fill="#475569" fontSize="10" fontWeight="medium">• 도보권 남산과의 연결로 끊김 없는 보행</text>
                                <text x="15" y="84" fill="#475569" fontSize="10" fontWeight="medium">• 교통 잠재력을 도심 상업/관광 활력으로 연결</text>
                            </g>
                        </g>

                        {/* 2. 우측: 글로벌 매니지먼트 도입 결과 표 */}
                        <g transform="translate(340, 10)">
                            {/* Table Header */}
                            <rect x="0" y="0" width="580" height="35" fill="#1e3a8a" />
                            <text x="70" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">글로벌 사례</text>
                            <text x="245" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">전(前) - 오피스/공공 공간 방치</text>
                            <text x="450" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">후(後) - 운영체제(BID) 도입 결과</text>

                            {/* Row 1: Bryant Park */}
                            <g transform="translate(0, 35)">
                                <rect x="0" y="0" width="140" height="54" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="70" y="31" textAnchor="middle" fill="#1e3a8a" fontSize="10.5" fontWeight="bold">Bryant Park (NY)</text>
                                
                                <rect x="140" y="0" width="210" height="54" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="155" y="22" fill="#334155" fontSize="10">▪ 범죄 다발(강도 43건/반년)</text>
                                <text x="155" y="38" fill="#334155" fontSize="10">▪ 슬럼화 및 주변 오피스 공실</text>
                                
                                <rect x="350" y="0" width="230" height="54" fill="#f0fdf4" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="365" y="22" fill="#166534" fontSize="10" fontWeight="bold">▪ 주변 부동산 가치 +50억 달러 상승</text>
                                <text x="365" y="38" fill="#166534" fontSize="10" fontWeight="bold">▪ 연간 1,200만 명 이상 방문객 유입</text>
                            </g>

                            {/* Row 2: Times Square */}
                            <g transform="translate(0, 89)">
                                <rect x="0" y="0" width="140" height="54" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="70" y="31" textAnchor="middle" fill="#1e3a8a" fontSize="10.5" fontWeight="bold">Times Square (NY)</text>
                                
                                <rect x="140" y="0" width="210" height="54" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="155" y="22" fill="#334155" fontSize="10">▪ 심각한 혼잡과 차도 중심 노고존</text>
                                <text x="155" y="38" fill="#334155" fontSize="10">▪ 치안 부재와 폭력 범죄 노출</text>
                                
                                <rect x="350" y="0" width="230" height="54" fill="#f0fdf4" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="365" y="22" fill="#166534" fontSize="10" fontWeight="bold">▪ 보행 광장화 후 범죄율 20% 감소</text>
                                <text x="365" y="38" fill="#166534" fontSize="10" fontWeight="bold">▪ 면적 0.1%로 뉴욕시 세수 11% 담당</text>
                            </g>

                            {/* Row 3: NYC BID 전체 */}
                            <g transform="translate(0, 143)">
                                <rect x="0" y="0" width="140" height="54" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="70" y="31" textAnchor="middle" fill="#1e3a8a" fontSize="10.5" fontWeight="bold">NYC BID 전체</text>
                                
                                <rect x="140" y="0" width="210" height="54" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="155" y="31" fill="#334155" fontSize="10">▪ 공공 관리 결여된 일반 상업지역</text>
                                
                                <rect x="350" y="0" width="230" height="54" fill="#f0fdf4" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="365" y="31" fill="#166534" fontSize="10" fontWeight="bold">▪ 상업 자산가치 주변비 +15% 이상 상승</text>
                            </g>

                            {/* Row 4: 마루노우치 */}
                            <g transform="translate(0, 197)">
                                <rect x="0" y="0" width="140" height="54" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="70" y="31" textAnchor="middle" fill="#1e3a8a" fontSize="10.5" fontWeight="bold">마루노우치 (도쿄)</text>
                                
                                <rect x="140" y="0" width="210" height="54" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="155" y="22" fill="#334155" fontSize="10">▪ 단순 은행 점포 위주 오피스 가로</text>
                                <text x="155" y="38" fill="#334155" fontSize="10">▪ 주말이면 공동화되는 무기질 거리</text>
                                
                                <rect x="350" y="0" width="230" height="54" fill="#f0fdf4" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="365" y="22" fill="#166534" fontSize="10" fontWeight="bold">▪ 공실률 2%대 최저 수준 유지</text>
                                <text x="365" y="38" fill="#166534" fontSize="10" fontWeight="bold">▪ 기업 의식 변화: 90% 이상 긍정 응답</text>
                            </g>

                            {/* Row 5: 롯폰기힐스 */}
                            <g transform="translate(0, 251)">
                                <rect x="0" y="0" width="140" height="54" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="70" y="31" textAnchor="middle" fill="#1e3a8a" fontSize="10.5" fontWeight="bold">롯폰기힐스 (도쿄)</text>
                                
                                <rect x="140" y="0" width="210" height="54" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="155" y="22" fill="#334155" fontSize="10">▪ 파편화된 다수 소유자 유휴가</text>
                                <text x="155" y="38" fill="#334155" fontSize="10">▪ 개발 계획 및 상생 운영 부재</text>
                                
                                <rect x="350" y="0" width="230" height="54" fill="#f0fdf4" stroke="#cbd5e1" strokeWidth="0.5" />
                                <text x="365" y="22" fill="#166534" fontSize="10" fontWeight="bold">▪ 자산가치 대비 투자가치 +60% 초과</text>
                                <text x="365" y="38" fill="#166534" fontSize="10" fontWeight="bold">▪ 연간 4,000만 방문, 공실 0% 수렴</text>
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
                                남산과 서울역이라는 독보적 자연·교통 자산에 에리어 매니지먼트 운영체제를 결합하여, 기존의 단순 입지 위주 오피스 집합을 넘어선 국내 최초의 진화형 업무지구를 구축함.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
