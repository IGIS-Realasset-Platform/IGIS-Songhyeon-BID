import React from 'react';

export default function Section62({ isActive }) {
    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        디벨로퍼 관점의 결론: 자산 가치를 상승시키는 에어리어 운영 엔진
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    비용이 아닌 자산 가치의 엔진: SBD 운영체제(OS)의 결론
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 맞물려 돌아가는 더블 기어 엔진 커스텀 SVG */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] relative">
                    <div className="w-full h-[360px] bg-slate-50/50 border border-slate-100 relative flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 850 360">
                            <defs>
                                <linearGradient id="gear1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#2563eb" />
                                    <stop offset="100%" stopColor="#1e3a8a" />
                                </linearGradient>
                                <linearGradient id="gear2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="#047857" />
                                </linearGradient>
                            </defs>

                            {/* 1. 기어 1: 임대 프리미엄 엔진 (좌측 상단) */}
                            <g transform="translate(250, 160)">
                                {/* 회전하는 기어 형상 (치차 8개 배치) */}
                                <circle cx="0" cy="0" r="85" fill="url(#gear1Grad)" />
                                {/* 치차(Teeth) */}
                                <rect x="-10" y="-105" width="20" height="30" fill="#1e3a8a" transform="rotate(0)" />
                                <rect x="-10" y="-105" width="20" height="30" fill="#1e3a8a" transform="rotate(45)" />
                                <rect x="-10" y="-105" width="20" height="30" fill="#1e3a8a" transform="rotate(90)" />
                                <rect x="-10" y="-105" width="20" height="30" fill="#1e3a8a" transform="rotate(135)" />
                                <rect x="-10" y="-105" width="20" height="30" fill="#1e3a8a" transform="rotate(180)" />
                                <rect x="-10" y="-105" width="20" height="30" fill="#1e3a8a" transform="rotate(225)" />
                                <rect x="-10" y="-105" width="20" height="30" fill="#1e3a8a" transform="rotate(270)" />
                                <rect x="-10" y="-105" width="20" height="30" fill="#1e3a8a" transform="rotate(315)" />
                                
                                <circle cx="0" cy="0" r="55" fill="#f8fafc" />
                                <text x="0" y="-15" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">ENGINE 01</text>
                                <text x="0" y="5" textAnchor="middle" fill="#0f172a" fontSize="13.5" fontWeight="black">임대 프리미엄</text>
                                <text x="0" y="22" textAnchor="middle" fill="#2563eb" fontSize="10.5" fontWeight="bold">자산가치 극대화</text>
                            </g>

                            {/* 2. 기어 2: 운영사 신규 재원 엔진 (우측 하단) */}
                            <g transform="translate(420, 205)">
                                {/* 회전하는 기어 형상 (치차 8개 배치, 맞물리기 위해 각도 시프트) */}
                                <circle cx="0" cy="0" r="65" fill="url(#gear2Grad)" />
                                {/* 치차(Teeth) */}
                                <rect x="-8" y="-80" width="16" height="22" fill="#047857" transform="rotate(22.5)" />
                                <rect x="-8" y="-80" width="16" height="22" fill="#047857" transform="rotate(67.5)" />
                                <rect x="-8" y="-80" width="16" height="22" fill="#047857" transform="rotate(112.5)" />
                                <rect x="-8" y="-80" width="16" height="22" fill="#047857" transform="rotate(157.5)" />
                                <rect x="-8" y="-80" width="16" height="22" fill="#047857" transform="rotate(202.5)" />
                                <rect x="-8" y="-80" width="16" height="22" fill="#047857" transform="rotate(247.5)" />
                                <rect x="-8" y="-80" width="16" height="22" fill="#047857" transform="rotate(292.5)" />
                                <rect x="-8" y="-80" width="16" height="22" fill="#047857" transform="rotate(337.5)" />
                                
                                <circle cx="0" cy="0" r="42" fill="#f8fafc" />
                                <text x="0" y="-12" textAnchor="middle" fill="#047857" fontSize="9.5" fontWeight="black">ENGINE 02</text>
                                <text x="0" y="5" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="black">독점 운영 수수료</text>
                                <text x="0" y="19" textAnchor="middle" fill="#10b981" fontSize="9.5" fontWeight="bold">정기 수익원 확보</text>
                            </g>

                            {/* 3. 설명 블록 (좌측) */}
                            <g transform="translate(40, 60)">
                                <text x="0" y="20" fill="#1e3a8a" fontSize="14" fontWeight="black">01. 임대 가치 상승</text>
                                <text x="0" y="42" fill="#475569" fontSize="11" fontWeight="medium">• BID 도입 통한 부동산 가치 +15%</text>
                                <text x="0" y="60" fill="#475569" fontSize="11" fontWeight="medium">• 마약 소굴 ➔ 50억 달러 가치 상승</text>
                                <text x="0" y="78" fill="#475569" fontSize="11" fontWeight="medium">• 마루노우치 공실률 2% 수호 효과</text>
                            </g>

                            {/* 4. 설명 블록 (우측) */}
                            <g transform="translate(560, 60)">
                                <text x="0" y="20" fill="#10b981" fontSize="14" fontWeight="black">02. 운용사 수익 구조 다각화</text>
                                <text x="0" y="42" fill="#475569" fontSize="11" fontWeight="medium">• 단순 건물 임대 수수료를 넘어선,</text>
                                <text x="0" y="60" fill="#475569" fontSize="11" fontWeight="medium">  에어리어 매니지먼트 대행 수수료</text>
                                <text x="0" y="78" fill="#475569" fontSize="11" fontWeight="medium">  (Area Management Fee) 정기 징수</text>
                                <text x="0" y="96" fill="#475569" fontSize="11" fontWeight="medium">• 독점적 지위를 활용한 신규 수익원</text>
                            </g>

                            {/* 상호 작용 화살표 */}
                            <path d="M 250,55 A 110,110 0 0,1 360,165" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3,3" />
                            <polygon points="360,165 352,160 362,156" fill="#2563eb" />
                        </svg>
                    </div>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                공간 운영체제(OS)는 비용 지출 부서가 아니라 자산 가치를 극대화하는 더블 엔진이며, 임대 프리미엄을 통한 소유자 실익과 운영 수수료 징수를 통한 이지스(운용사)의 수익원 확보를 달성
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
