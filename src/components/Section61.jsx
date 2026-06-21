import React from 'react';

export default function Section61({ isActive }) {
    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        도시 재생과 에어리어 매니지먼트가 입증한 글로벌 3대 성공 실증 사례
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    마약 소굴의 가치 전도부터 빌딩 투자가치 +60% 상승까지의 실증 사례
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 3대 글로벌 랜드마크 비교 카드 SVG 다이어그램 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] relative">
                    <div className="w-full h-[360px] bg-slate-50/50 border border-slate-100 relative flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 900 360">
                            <defs>
                                <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ffffff" />
                                    <stop offset="100%" stopColor="#f8fafc" />
                                </linearGradient>
                            </defs>

                            {/* 1. 뉴욕 브라이언트 파크 */}
                            <g transform="translate(30, 30)">
                                <rect x="0" y="0" width="250" height="280" fill="url(#cardGrad)" stroke="#0f172a" strokeWidth="1.5" />
                                <rect x="15" y="15" width="220" height="35" fill="#0f172a" />
                                <text x="125" y="37" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="black">뉴욕 브라이언트 파크</text>
                                
                                <text x="25" y="80" fill="#ef4444" fontSize="11" fontWeight="bold">Before: 마약과 범죄의 온상</text>
                                <text x="25" y="98" fill="#475569" fontSize="10" fontWeight="bold">1970년대 강력범죄의 해방구 (Needle Park)</text>

                                <path d="M 25,120 L 225,120" stroke="#cbd5e1" strokeWidth="1" />
                                
                                <text x="25" y="145" fill="#1e3a8a" fontSize="11" fontWeight="bold">After: 1980 BID 관리법인 도입</text>
                                <text x="25" y="165" fill="#0f172a" fontSize="10.5" fontWeight="black">• 울타리 철거 및 가시성 개선</text>
                                <text x="25" y="180" fill="#0f172a" fontSize="10.5" fontWeight="black">• 독서·겨울장터 등 상시 프로그램 작동</text>
                                <text x="25" y="195" fill="#0f172a" fontSize="10.5" fontWeight="black">• 주변 오피스 임대 활동 60% 증가</text>
                                
                                <rect x="15" y="225" width="220" height="40" fill="#eff6ff" stroke="#2563eb" strokeWidth="0.5" />
                                <text x="125" y="242" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">주변 자산가치 +50억 달러</text>
                                <text x="125" y="255" textAnchor="middle" fill="#2563eb" fontSize="9.5" fontWeight="bold">평당 임대료 $100 돌파</text>
                            </g>

                            {/* 2. 도쿄 롯폰기 힐즈 */}
                            <g transform="translate(325, 30)">
                                <rect x="0" y="0" width="250" height="280" fill="url(#cardGrad)" stroke="#0f172a" strokeWidth="1.5" />
                                <rect x="15" y="15" width="220" height="35" fill="#0f172a" />
                                <text x="125" y="37" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="black">도쿄 롯폰기 힐즈</text>
                                
                                <text x="25" y="80" fill="#ef4444" fontSize="11" fontWeight="bold">Before: 파편화된 노후 주거지</text>
                                <text x="25" y="98" fill="#475569" fontSize="10" fontWeight="bold">500여 명의 지권자 난립, 목조 노후 주택가</text>

                                <path d="M 25,120 L 225,120" stroke="#cbd5e1" strokeWidth="1" />
                                
                                <text x="25" y="145" fill="#1e3a8a" fontSize="11" fontWeight="bold">After: 모리빌딩 통합 관리 체제</text>
                                <text x="25" y="165" fill="#0f172a" fontSize="10.5" fontWeight="black">• 준공 후 일체적 타운 매니지먼트 적용</text>
                                <text x="25" y="180" fill="#0f172a" fontSize="10.5" fontWeight="black">• 문화도심 구현 및 연 4천만 명 집객</text>
                                <text x="25" y="195" fill="#0f172a" fontSize="10.5" fontWeight="black">• 오피스 공실률 사실상 0% 수호</text>
                                
                                <rect x="15" y="225" width="220" height="40" fill="#eff6ff" stroke="#2563eb" strokeWidth="0.5" />
                                <text x="125" y="242" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">프로젝트 투자가치 순 +60%</text>
                                <text x="125" y="255" textAnchor="middle" fill="#2563eb" fontSize="9.5" fontWeight="bold">잘 운영된 부동산의 표본</text>
                            </g>

                            {/* 3. 도쿄 마루노우치 */}
                            <g transform="translate(620, 30)">
                                <rect x="0" y="0" width="250" height="280" fill="url(#cardGrad)" stroke="#0f172a" strokeWidth="1.5" />
                                <rect x="15" y="15" width="220" height="35" fill="#0f172a" />
                                <text x="125" y="37" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="black">도쿄 마루노우치</text>
                                
                                <text x="25" y="80" fill="#ef4444" fontSize="11" fontWeight="bold">Before: 점(點)적 난개발의 경계</text>
                                <text x="25" y="98" fill="#475569" fontSize="10" fontWeight="bold">1890년 일괄 매입 당시부터 난개발 경계</text>

                                <path d="M 25,120 L 225,120" stroke="#cbd5e1" strokeWidth="1" />
                                
                                <text x="25" y="145" fill="#1e3a8a" fontSize="11" fontWeight="bold">After: 미쓰비시지쇼 면(面)적 기획</text>
                                <text x="25" y="165" fill="#0f172a" fontSize="10.5" fontWeight="black">• OMY 에리어 매니지먼트의 중추 역할</text>
                                <text x="25" y="180" fill="#0f172a" fontSize="10.5" fontWeight="black">• 주변 대비 압도적 임대료 인상 주도</text>
                                <text x="25" y="195" fill="#0f172a" fontSize="10.5" fontWeight="black">• 입주 기업 90% 이상 긍정 변화 설문</text>
                                
                                <rect x="15" y="225" width="220" height="40" fill="#eff6ff" stroke="#2563eb" strokeWidth="0.5" />
                                <text x="125" y="242" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">평균 공실률 2% 수호</text>
                                <text x="125" y="255" textAnchor="middle" fill="#2563eb" fontSize="9.5" fontWeight="bold">지구 단위 장기 기획의 성과</text>
                            </g>
                        </svg>
                    </div>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                범죄 지대에서 임대 활동 60% 증가를 일군 뉴욕 브라이언트 파크, 투자가치 60%를 증가시킨 롯폰기 힐즈, 공실률 2%를 사수한 마루노우치를 통해 에리어 운영의 재무 실익을 입증
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
