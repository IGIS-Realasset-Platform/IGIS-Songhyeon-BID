import React, { useState, useEffect } from 'react';

export default function Section74({ isActive }) {
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
                        오피스 공실률, 임대료 프리미엄, 치안성능 등 핵심 지표의 극적인 차별화 실증 추정
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    숫자로 보는 "SBD BID가 있는 서울"과 "없는 서울" 비교 예측
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (무배경, 데이터 그리드) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        {/* Table Header */}
                        <g transform="translate(15, 10)">
                            <rect x="0" y="0" width="160" height="35" fill="#1e293b" />
                            <text x="80" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">지표</text>

                            <rect x="165" y="0" width="220" height="35" fill="#475569" />
                            <text x="275" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">BID 없는 현재 서울 CBD</text>

                            <rect x="390" y="0" width="260" height="35" fill="#1e3a8a" />
                            <text x="520" y="22" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="black">BID 완성 후 SBD (추정)</text>

                            <rect x="655" y="0" width="255" height="35" fill="#475569" />
                            <text x="782.5" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">참고 글로벌 벤치마크</text>
                        </g>

                        {/* Row 1: 오피스 공실률 */}
                        <g transform="translate(15, 47)">
                            <rect x="0" y="0" width="160" height="34" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="80" y="21" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">오피스 공실률</text>

                            <rect x="165" y="0" width="220" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="275" y="21" textAnchor="middle" fill="#ef4444" fontSize="10.5" fontWeight="bold">5.1% (2025 Q2 현재)</text>

                            <rect x="390" y="0" width="260" height="34" fill="#eff6ff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="520" y="21" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">2 ~ 3% 수준 방어 목표</text>

                            <rect x="655" y="0" width="255" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="782.5" y="21" textAnchor="middle" fill="#475569" fontSize="10">마루노우치 1.4% / 허드슨야드 0%</text>
                        </g>

                        {/* Row 2: 평균 임대료 */}
                        <g transform="translate(15, 83)">
                            <rect x="0" y="0" width="160" height="34" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="80" y="21" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">평균 임대료</text>

                            <rect x="165" y="0" width="220" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="275" y="21" textAnchor="middle" fill="#334155" fontSize="10.5">KRW 152,000 / 평</text>

                            <rect x="390" y="0" width="260" height="34" fill="#eff6ff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="520" y="21" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">10 ~ 20% 프리미엄 기대</text>

                            <rect x="655" y="0" width="255" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="782.5" y="21" textAnchor="middle" fill="#475569" fontSize="10">허드슨야드 주변 대비 10~20% 프리미엄</text>
                        </g>

                        {/* Row 3: 가로 범죄율 */}
                        <g transform="translate(15, 119)">
                            <rect x="0" y="0" width="160" height="34" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="80" y="21" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">가로 범죄율</text>

                            <rect x="165" y="0" width="220" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="275" y="21" textAnchor="middle" fill="#94a3b8" fontSize="10.5">기준선 부재</text>

                            <rect x="390" y="0" width="260" height="34" fill="#eff6ff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="520" y="21" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">8 ~ 12% 감소 기대</text>

                            <rect x="655" y="0" width="255" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="782.5" y="21" textAnchor="middle" fill="#475569" fontSize="10">LA BID 평균 강도 범죄 12% 감소</text>
                        </g>

                        {/* Row 4: 공개 녹지 활용도 */}
                        <g transform="translate(15, 155)">
                            <rect x="0" y="0" width="160" height="34" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="80" y="21" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">공개 녹지 활용도</text>

                            <rect x="165" y="0" width="220" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="275" y="21" textAnchor="middle" fill="#ef4444" fontSize="10.5" fontWeight="bold">매우 낮음 (POPS 미활용)</text>

                            <rect x="390" y="0" width="260" height="34" fill="#eff6ff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="520" y="21" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="black">상시 프로그램 활성화</text>

                            <rect x="655" y="0" width="255" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="782.5" y="21" textAnchor="middle" fill="#475569" fontSize="10">브라이언트 파크 연 수십만 명 이용</text>
                        </g>

                        {/* Row 5: 리테일 매출 */}
                        <g transform="translate(15, 191)">
                            <rect x="0" y="0" width="160" height="34" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="80" y="21" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">리테일 매출</text>

                            <rect x="165" y="0" width="220" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="275" y="21" textAnchor="middle" fill="#94a3b8" fontSize="10.5">기준선 부재</text>

                            <rect x="390" y="0" width="260" height="34" fill="#eff6ff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="520" y="21" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">10 ~ 40% 상승 기대</text>

                            <rect x="655" y="0" width="255" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="782.5" y="21" textAnchor="middle" fill="#475569" fontSize="10">타임스스퀘어 보행화 시 71% 폭증</text>
                        </g>

                        {/* Row 6: 보행 유동 인구 */}
                        <g transform="translate(15, 227)">
                            <rect x="0" y="0" width="160" height="34" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="80" y="21" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">보행 유동 인구</text>

                            <rect x="165" y="0" width="220" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="275" y="21" textAnchor="middle" fill="#94a3b8" fontSize="10.5">기준선 부재</text>

                            <rect x="390" y="0" width="260" height="34" fill="#eff6ff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="520" y="21" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">20% 이상 증가 기대</text>

                            <rect x="655" y="0" width="255" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="782.5" y="21" textAnchor="middle" fill="#475569" fontSize="10">글로벌 보행화 평균 20% 이상 증가</text>
                        </g>

                        {/* Row 7: 상업 부동산 가치 */}
                        <g transform="translate(15, 263)">
                            <rect x="0" y="0" width="160" height="34" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="80" y="21" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">상업 부동산 가치</text>

                            <rect x="165" y="0" width="220" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="275" y="21" textAnchor="middle" fill="#94a3b8" fontSize="10.5">기준선 부재</text>

                            <rect x="390" y="0" width="260" height="34" fill="#eff6ff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="520" y="21" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">주변 대비 15%p 초과 상승 기대</text>

                            <rect x="655" y="0" width="255" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                            <text x="782.5" y="21" textAnchor="middle" fill="#475569" fontSize="10">NYU Furman Center 대형 BID 가치 연구</text>
                        </g>
                    </svg>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                현재 서울 CBD는 입지 집적 효과만 보유하여 공급에 취약하나, SBD 완성을 통해 공실률 2~3%대 방어 및 10~20%의 자산가치 프리미엄을 안정적으로 확보하게 됨.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
