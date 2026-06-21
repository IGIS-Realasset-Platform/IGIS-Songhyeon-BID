import React, { useState, useEffect } from 'react';

export default function Section71({ isActive }) {
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
                        입지적 집적을 넘어 운영체제(OS)와 기획 효과를 자산가치에 내장하는 비즈니스 혁신
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    기존 3대 업무지구 vs 설계·운영형 SBD의 결정적 차이
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (무배경, 정밀 그리드 비교표) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        {/* Table Header Row */}
                        <g transform="translate(25, 10)">
                            {/* 구분 */}
                            <rect x="0" y="0" width="130" height="34" fill="#1e293b" />
                            <text x="65" y="21" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="bold">구분</text>

                            {/* CBD */}
                            <rect x="135" y="0" width="165" height="34" fill="#475569" />
                            <text x="217.5" y="21" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="bold">CBD (도심)</text>

                            {/* GBD */}
                            <rect x="305" y="0" width="165" height="34" fill="#475569" />
                            <text x="387.5" y="21" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="bold">GBD (강남)</text>

                            {/* YBD */}
                            <rect x="475" y="0" width="165" height="34" fill="#475569" />
                            <text x="557.5" y="21" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="bold">YBD (여의도)</text>

                            {/* SBD - Highlighted */}
                            <rect x="645" y="0" width="220" height="34" fill="#1e3a8a" />
                            <text x="755" y="21" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="black">SBD (서울역-남산)</text>
                        </g>

                        {/* Row 1: 형성 방식 */}
                        <g transform="translate(25, 47)">
                            <rect x="0" y="0" width="130" height="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="65" y="19" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">형성 방식</text>

                            <rect x="135" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="217.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">자연발생 (600년+)</text>

                            <rect x="305" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="387.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">토지구획정리 격자</text>

                            <rect x="475" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="557.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">매립 및 계획 개발</text>

                            <rect x="645" y="0" width="220" height="30" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                            <text x="755" y="19" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">계획·운영형 SBD 신설</text>
                        </g>

                        {/* Row 2: 소유 구조 */}
                        <g transform="translate(25, 80)">
                            <rect x="0" y="0" width="130" height="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="65" y="19" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">소유 구조</text>

                            <rect x="135" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="217.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">극도 파편화</text>

                            <rect x="305" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="387.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">파편화</text>

                            <rect x="475" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="557.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">부분 집중</text>

                            <rect x="645" y="0" width="220" height="30" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                            <text x="755" y="19" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">앵커(이오타서울) 중심</text>
                        </g>

                        {/* Row 3: 운영 주체 */}
                        <g transform="translate(25, 113)">
                            <rect x="0" y="0" width="130" height="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="65" y="19" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">운영 주체</text>

                            <rect x="135" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="217.5" y="19" textAnchor="middle" fill="#ef4444" fontSize="10.5" fontWeight="bold">없음</text>

                            <rect x="305" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="387.5" y="19" textAnchor="middle" fill="#ef4444" fontSize="10.5" fontWeight="bold">없음</text>

                            <rect x="475" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="557.5" y="19" textAnchor="middle" fill="#ef4444" fontSize="10.5" fontWeight="bold">없음</text>

                            <rect x="645" y="0" width="220" height="30" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                            <text x="755" y="19" textAnchor="middle" fill="#10b981" fontSize="11.5" fontWeight="black">에리어 매니지먼트 법인</text>
                        </g>

                        {/* Row 4: 어메니티·녹지 */}
                        <g transform="translate(25, 146)">
                            <rect x="0" y="0" width="130" height="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="65" y="19" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">어메니티·녹지</text>

                            <rect x="135" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="217.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">산발적 분포</text>

                            <rect x="305" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="387.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">부족함</text>

                            <rect x="475" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="557.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">부족함 (한강 축 분리)</text>

                            <rect x="645" y="0" width="220" height="30" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                            <text x="755" y="19" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">남산 연계 입체 설계 공원</text>
                        </g>

                        {/* Row 5: 주말 활력 */}
                        <g transform="translate(25, 179)">
                            <rect x="0" y="0" width="130" height="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="65" y="19" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">주말 활력</text>

                            <rect x="135" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="217.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">부분적 활성 (관광 결합)</text>

                            <rect x="305" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="387.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">낮음</text>

                            <rect x="475" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="557.5" y="19" textAnchor="middle" fill="#94a3b8" fontSize="10.5">완전 공동화</text>

                            <rect x="645" y="0" width="220" height="30" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                            <text x="755" y="19" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">보행가로 상시 프로그래밍</text>
                        </g>

                        {/* Row 6: 가로 공간 */}
                        <g transform="translate(25, 212)">
                            <rect x="0" y="0" width="130" height="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="65" y="19" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">가로 공간</text>

                            <rect x="135" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="217.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">차량 통행 중심</text>

                            <rect x="305" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="387.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">차량 통행 중심</text>

                            <rect x="475" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="557.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">차량 통행 중심</text>

                            <rect x="645" y="0" width="220" height="30" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                            <text x="755" y="19" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">보행자 천국/보행 중심 설계</text>
                        </g>

                        {/* Row 7: 공실 리스크 */}
                        <g transform="translate(25, 245)">
                            <rect x="0" y="0" width="130" height="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="65" y="19" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">공실 리스크</text>

                            <rect x="135" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="217.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">공급 충격 취약</text>

                            <rect x="305" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="387.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">프라임/중소형 양극화</text>

                            <rect x="475" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="557.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">단일 기능 취약성</text>

                            <rect x="645" y="0" width="220" height="30" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                            <text x="755" y="19" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">운영 프리미엄 방어막 작동</text>
                        </g>

                        {/* Row 8: 자산 프리미엄 */}
                        <g transform="translate(25, 278)">
                            <rect x="0" y="0" width="130" height="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="65" y="19" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">자산 프리미엄</text>

                            <rect x="135" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="217.5" y="19" textAnchor="middle" fill="#64748b" fontSize="10.5">운영 효과 없음</text>

                            <rect x="305" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="387.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">단순 입지 효과만</text>

                            <rect x="475" y="0" width="165" height="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="557.5" y="19" textAnchor="middle" fill="#334155" fontSize="10.5">단순 입지 효과만</text>

                            <rect x="645" y="0" width="220" height="30" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
                            <text x="755" y="19" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="black">에리어 운영 가치 영구 내장</text>
                        </g>
                    </svg>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                기존 3대 업무지구의 가치는 입지(자연발생적 집적)에서만 유도되는 반면, 서울형 SBD는 타운 매니지먼트 운영 효과를 자산 자체에 영구 내재화함.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
