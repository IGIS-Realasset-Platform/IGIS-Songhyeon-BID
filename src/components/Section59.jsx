import React from 'react';

export default function Section59({ isActive }) {
    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 - 본 슬라이드의 주제 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        제4세대 업무지구 SBD의 구조적 정의와 운영 모델
                    </span>
                </div>

                {/* 제목 - 본 슬라이드의 핵심 메시지 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    이지스 단일 앵커 자산에 통합 에리어 운영체제(OS)를 선제적으로 결합함
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 입체적 3D isometric 레이어 아키텍처 SVG */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] relative">
                    <div className="w-full h-[360px] bg-slate-50/50 border border-slate-100 relative flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 850 360">
                            <defs>
                                <linearGradient id="layer3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#60a5fa" />
                                    <stop offset="100%" stopColor="#2563eb" />
                                </linearGradient>
                                <linearGradient id="layer2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#1e3a8a" />
                                    <stop offset="100%" stopColor="#0f172a" />
                                </linearGradient>
                                <linearGradient id="layer1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#475569" />
                                    <stop offset="100%" stopColor="#1e293b" />
                                </linearGradient>
                                <filter id="layerGlow" x="-10%" y="-10%" width="120%" height="120%">
                                    <feGaussianBlur stdDeviation="5" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* 좌측: 3D 적층 레이어 (SBD OS 구조) */}
                            <g transform="translate(50, 0)">
                                
                                {/* 1단계 플레이트 (물리 인프라) - 맨 밑 */}
                                <polygon points="120,240 370,240 330,290 80,290" fill="url(#layer1Grad)" opacity="0.9" />
                                <text x="225" y="270" textAnchor="middle" fill="#94a3b8" fontSize="10.5" fontWeight="bold">LAYER 01 : 150만㎡ 물리 인프라 (이오타 + 북부역세권)</text>

                                {/* 연결 점선 커넥터 */}
                                <line x1="225" y1="240" x2="225" y2="175" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3,3" />

                                {/* 2단계 플레이트 (운영체제 OS) - 중간 */}
                                <polygon points="120,150 370,150 330,200 80,200" fill="url(#layer2Grad)" opacity="0.95" filter="url(#layerGlow)" />
                                <text x="225" y="180" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="black">LAYER 02 : 에어리어 매니지먼트 OS (이지스·얼라이언스 BID)</text>

                                {/* 연결 점선 커넥터 */}
                                <line x1="225" y1="150" x2="225" y2="85" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3,3" />

                                {/* 3단계 플레이트 (사용자 경험) - 맨 위 */}
                                <polygon points="120,60 370,60 330,110 80,110" fill="url(#layer3Grad)" opacity="0.9" />
                                <text x="225" y="90" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold">LAYER 03 : 하이엔드 테넌트 경험 (리츠칼튼 + 로컬 상생)</text>

                                {/* 지시선 설명 */}
                                <text x="225" y="325" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="black">SBD : 인프라와 운영체제(OS)의 일체형 탑재</text>
                            </g>

                            {/* 우측: CBD와의 결정적 구조 비교 */}
                            <g transform="translate(480, 40)">
                                {/* 배경 남색 외곽선 */}
                                <rect x="0" y="0" width="310" height="250" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                                
                                <text x="155" y="35" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="black">기존 CBD vs 신규 SBD 차이</text>
                                <line x1="30" y1="50" x2="280" y2="50" stroke="#0f172a" strokeWidth="1" />

                                {/* CBD 설명 */}
                                <g transform="translate(20, 70)">
                                    <rect x="0" y="0" width="10" height="10" fill="#ef4444" />
                                    <text x="20" y="10" fill="#0f172a" fontSize="12" fontWeight="black">파편화된 기존 CBD의 한계</text>
                                    <text x="20" y="30" fill="#64748b" fontSize="10.5" fontWeight="bold" leading="1.3">
                                        개별 필지별 소유주가 수천 명으로 분절되어
                                    </text>
                                    <text x="20" y="47" fill="#64748b" fontSize="10.5" fontWeight="bold">
                                        지구 단위의 통합 운영체제(OS) 구축 불가
                                    </text>
                                </g>

                                {/* SBD 설명 */}
                                <g transform="translate(20, 160)">
                                    <rect x="0" y="0" width="10" height="10" fill="#2563eb" />
                                    <text x="20" y="10" fill="#0f172a" fontSize="12" fontWeight="black">이오타 서울 중심 SBD의 혁신</text>
                                    <text x="20" y="30" fill="#1e3a8a" fontSize="10.5" fontWeight="bold">
                                        이지스(이오타서울)라는 강력한 단일 앵커와
                                    </text>
                                    <text x="20" y="47" fill="#1e3a8a" fontSize="10.5" fontWeight="bold">
                                        운영 주체가 존재하여 최초의 통합 관리 가능
                                    </text>
                                </g>
                            </g>

                            {/* 구분선 */}
                            <line x1="440" y1="40" x2="440" y2="310" stroke="#cbd5e1" strokeWidth="1" />
                        </svg>
                    </div>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                SBD는 한국 정비사업 사상 최초로 건물(하드웨어)과 BID(소프트웨어 운영체제)를 결합하여 설계함으로써, 파편화 소유로 관리가 불가능했던 CBD를 뛰어넘어 최고 수준의 진화형 업무지구로 도약
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
