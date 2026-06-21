import React, { useState, useEffect } from 'react';

export default function Section72({ isActive }) {
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
                        이지스디벨로퍼, 지자체(서울시·중구·용산구) 및 직장인과 시민이 동시에 누리는 상생 가치
                    </span>
                </div>

                {/* 제목 - 자간 및 밑선 배제 */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    이오타서울 SBD가 가져올 이해관계자별 체감 변화 시나리오
                </h2>

                {/* 중앙 컨텐츠 영역: 제약 없는 자유로운 비주얼 기획 (무배경, 3열 2행 구조화) */}
                <div className={`w-full max-w-[1250px] mt-[10px] mb-[25px] relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex items-center justify-center`}>
                    <svg className="w-full h-[370px]" viewBox="0 0 940 370">
                        {/* Row 1 */}
                        {/* 1. 디벨로퍼 (이지스) */}
                        <g transform="translate(10, 10)">
                            <rect x="0" y="0" width="290" height="135" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="8" height="135" fill="#1e3a8a" />
                            
                            <text x="20" y="25" fill="#1e3a8a" fontSize="12" fontWeight="black">디벨로퍼 (이지스)</text>
                            <text x="20" y="48" fill="#0f172a" fontSize="11" fontWeight="bold">운영 프리미엄 자산으로 전환</text>
                            <text x="20" y="70" fill="#475569" fontSize="10" fontWeight="medium">• 임대료 및 자산가치 극대화 실현</text>
                            <text x="20" y="88" fill="#475569" fontSize="10" fontWeight="medium">• 지구 운영에 따른 관리 수수료 신규 확보</text>
                            <text x="20" y="106" fill="#475569" fontSize="10" fontWeight="medium">• 타 도심(용산 등)으로 확장하는 플랫폼화</text>
                        </g>

                        {/* 2. 서울특별시 */}
                        <g transform="translate(325, 10)">
                            <rect x="0" y="0" width="290" height="135" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="8" height="135" fill="#1e3a8a" />
                            
                            <text x="20" y="25" fill="#1e3a8a" fontSize="12" fontWeight="black">서울특별시</text>
                            <text x="20" y="48" fill="#0f172a" fontSize="11" fontWeight="bold">재정 절감형 민관 협력 도시 복지</text>
                            <text x="20" y="70" fill="#475569" fontSize="10" fontWeight="medium">• 예산 투입 없이 안전·청결·녹지 확보</text>
                            <text x="20" y="88" fill="#475569" fontSize="10" fontWeight="medium">• 세수 기반(지방세 등) 확대 지렛대 작동</text>
                            <text x="20" y="106" fill="#475569" fontSize="10" fontWeight="medium">• 글로벌 수준의 에리어 매니지먼트 확보</text>
                        </g>

                        {/* 3. 서울 중구 */}
                        <g transform="translate(640, 10)">
                            <rect x="0" y="0" width="290" height="135" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="8" height="135" fill="#1e3a8a" />
                            
                            <text x="20" y="25" fill="#1e3a8a" fontSize="12" fontWeight="black">서울 중구</text>
                            <text x="20" y="48" fill="#0f172a" fontSize="11" fontWeight="bold">낙후 도심 정비 및 활력 복원</text>
                            <text x="20" y="70" fill="#475569" fontSize="10" fontWeight="medium">• 서울역·양동 주변 가로 정비와 상권 활성화</text>
                            <text x="20" y="88" fill="#475569" fontSize="10" fontWeight="medium">• 교통 결절지의 잠재력을 실제 활력으로 전환</text>
                            <text x="20" y="106" fill="#475569" fontSize="10" fontWeight="medium">• 주민 정주 환경의 질적 상승 유도</text>
                        </g>

                        {/* Row 2 */}
                        {/* 4. 서울 용산구 */}
                        <g transform="translate(10, 160)">
                            <rect x="0" y="0" width="290" height="135" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="8" height="135" fill="#10b981" />
                            
                            <text x="20" y="25" fill="#047857" fontSize="12" fontWeight="black">서울 용산구</text>
                            <text x="20" y="48" fill="#0f172a" fontSize="11" fontWeight="bold">용산국제업무지구 운영 모델 확립</text>
                            <text x="20" y="70" fill="#475569" fontSize="10" fontWeight="medium">• SBD 검증 운영 OS의 용산 지구 즉시 이식</text>
                            <text x="20" y="88" fill="#475569" fontSize="10" fontWeight="medium">• 시행 초기부터 완성형 운영체제(BID) 탑재</text>
                            <text x="20" y="106" fill="#475569" fontSize="10" fontWeight="medium">• 서울역-용산 융합 SYBD 개발 축 완성</text>
                        </g>

                        {/* 5. 오피스 직장인 */}
                        <g transform="translate(325, 160)">
                            <rect x="0" y="0" width="290" height="135" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="8" height="135" fill="#10b981" />
                            
                            <text x="20" y="25" fill="#047857" fontSize="12" fontWeight="black">오피스 직장인</text>
                            <text x="20" y="48" fill="#0f172a" fontSize="11" fontWeight="bold">점심시간 어메니티와 삶의 질 개선</text>
                            <text x="20" y="70" fill="#475569" fontSize="10" fontWeight="medium">• 답답한 실내 쪽잠 대신 남산 보행 힐링</text>
                            <text x="20" y="88" fill="#475569" fontSize="10" fontWeight="medium">• 쾌적한 보행환경과 리테일 공간 확보</text>
                            <text x="20" y="106" fill="#475569" fontSize="10" fontWeight="medium">• 입주 기업 소속감 및 인재 유치 경쟁력 강화</text>
                        </g>

                        {/* 6. 주민 및 시민 */}
                        <g transform="translate(640, 160)">
                            <rect x="0" y="0" width="290" height="135" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="0" y="0" width="8" height="135" fill="#10b981" />
                            
                            <text x="20" y="25" fill="#047857" fontSize="12" fontWeight="black">주민 및 시민</text>
                            <text x="20" y="48" fill="#0f172a" fontSize="11" fontWeight="bold">남산 개방형 인프라 및 녹지 향유</text>
                            <text x="20" y="70" fill="#475569" fontSize="10" fontWeight="medium">• 7,000㎡ 대규모 공개녹지 이용성 극대화</text>
                            <text x="20" y="88" fill="#475569" fontSize="10" fontWeight="medium">• 서울역에서 남산까지 단절 없는 보행 연결</text>
                            <text x="20" y="106" fill="#475569" fontSize="10" fontWeight="medium">• 주말 공동화 없는 문화·예술 도심 공간 획득</text>
                        </g>
                    </svg>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                디벨로퍼의 운영 수수료 수익 확보부터 서울시의 예산 절감형 복지, 시민의 녹지 향유권까지 모든 이해관계자가 가치를 공유하는 상생 모델을 구축함.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
