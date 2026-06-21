import React from 'react';

export default function Section58({ isActive }) {
    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 - 본 슬라이드의 주제 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        기존 오피스 지구의 한계와 SBD의 패러다임 비교
                    </span>
                </div>

                {/* 제목 - 본 슬라이드의 핵심 메시지 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    단순 빌딩 적치를 넘어 에어리어 기획으로 공간 가치를 극대화함
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 자유로운 대칭형 비주얼 SVG 다이어그램 설계 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] relative">
                    <div className="w-full h-[360px] bg-slate-50/50 border border-slate-100 relative flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 800 360">
                            <defs>
                                <linearGradient id="glowNavy" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#1e3a8a" />
                                    <stop offset="100%" stopColor="#0f172a" />
                                </linearGradient>
                                <linearGradient id="warningRed" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#f87171" />
                                    <stop offset="100%" stopColor="#ef4444" />
                                </linearGradient>
                                <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="8" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* 1. 좌측: 한국의 통념 - 오피스 적치장 */}
                            <g transform="translate(0, 0)">
                                {/* 백그라운드 박스 */}
                                <rect x="50" y="40" width="310" height="280" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />
                                
                                {/* 타이틀 */}
                                <text x="205" y="70" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="black">점(點)의 개발: 오피스 적치장</text>
                                <text x="205" y="90" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">한국의 기존 통념 (운영주체 부재)</text>

                                {/* 파편화된 오피스 빌딩 노드들 */}
                                <rect x="80" y="130" width="60" height="40" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
                                <text x="110" y="153" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">오피스 A</text>
                                
                                <rect x="260" y="130" width="60" height="40" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
                                <text x="290" y="153" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">오피스 B</text>

                                <rect x="170" y="180" width="60" height="40" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
                                <text x="200" y="203" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">오피스 C</text>

                                <rect x="80" y="240" width="60" height="40" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
                                <text x="110" y="263" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">오피스 D</text>

                                <rect x="260" y="240" width="60" height="40" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
                                <text x="290" y="263" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">오피스 E</text>

                                {/* 분절 선들 */}
                                <path d="M 140,150 L 260,150" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                                <text x="200" y="145" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">상호 단절</text>

                                <path d="M 140,260 L 260,260" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                                
                                <circle cx="200" cy="150" r="3" fill="#ef4444" />
                                <circle cx="200" cy="260" r="3" fill="#ef4444" />

                                {/* 설명 */}
                                <text x="205" y="305" textAnchor="middle" fill="#ef4444" fontSize="10.5" fontWeight="bold">
                                    "누가 이 집합을 운영하고 일하는 사람의 경험을 책임지는가?" 부재
                                </text>
                            </g>

                            {/* 2. 우측: 선진 도시 - 설계·운영된 면적 지구 */}
                            <g transform="translate(440, 0)">
                                {/* 백그라운드 박스 */}
                                <rect x="0" y="40" width="310" height="280" fill="none" stroke="#93c5fd" strokeWidth="2" />
                                
                                {/* 타이틀 */}
                                <text x="155" y="70" textAnchor="middle" fill="#1e3a8a" fontSize="16" fontWeight="black">면(面)의 개발: 설계·운영된 지구</text>
                                <text x="155" y="90" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">글로벌 선진 도시 기준 (통합 운영 주체)</text>

                                {/* 통합 관리막 (둥글지 않은 샤프한 다각형) */}
                                <polygon points="30,120 280,120 280,270 30,270" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" filter="url(#glowGold)" />
                                <text x="155" y="145" textAnchor="middle" fill="#1e3a8a" fontSize="9" fontWeight="black">통합 에리어 매니지먼트 / BID 운영법인</text>

                                {/* 유기적으로 연결된 오피스 노드들 */}
                                <rect x="50" y="160" width="60" height="35" fill="url(#glowNavy)" stroke="#ffffff" strokeWidth="1" />
                                <text x="80" y="181" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">자산 01</text>
                                
                                <rect x="200" y="160" width="60" height="35" fill="url(#glowNavy)" stroke="#ffffff" strokeWidth="1" />
                                <text x="230" y="181" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">자산 02</text>

                                <rect x="125" y="215" width="60" height="35" fill="url(#glowNavy)" stroke="#ffffff" strokeWidth="1" />
                                <text x="155" y="236" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">앵커 자산</text>

                                {/* 유기적 연결선 */}
                                <path d="M 80,195 L 125,230" fill="none" stroke="#60a5fa" strokeWidth="2" />
                                <path d="M 230,195 L 185,230" fill="none" stroke="#60a5fa" strokeWidth="2" />
                                <path d="M 110,177 L 200,177" fill="none" stroke="#60a5fa" strokeWidth="2" />

                                <circle cx="102" cy="212" r="3" fill="#60a5fa" />
                                <circle cx="207" cy="212" r="3" fill="#60a5fa" />

                                {/* 설명 */}
                                <text x="155" y="295" textAnchor="middle" fill="#1e3a8a" fontSize="10.5" fontWeight="bold">
                                    뉴욕 BID / 도쿄 디벨로퍼 주도 에리어매니지먼트
                                </text>
                                <text x="155" y="308" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">
                                    (미쓰비시지쇼: 1890년부터 마루노우치를 면(面)으로 기획)
                                </text>
                            </g>

                            {/* 중앙 분리선 대신 대비를 보여주는 아이콘 */}
                            <line x1="400" y1="60" x2="400" y2="300" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,4" />
                        </svg>
                    </div>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                한국의 전통적인 오피스 개발은 운영주체 없이 건물만 빽빽이 채운 단순 ‘적치장’인 반면, 선진 도시의 업무지구는 지구 전체를 하나의 가치 단위로 묶는 ‘면(面)의 개발’을 핵심으로 삼음
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
