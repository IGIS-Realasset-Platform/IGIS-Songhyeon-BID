import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section48({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#2563eb] mb-[12px]">
                        {lang === 'kr' ? '이오타 서울 중심의 서울역-남산 구역의 SBD화 명분은?' : 'Rationale for SBD Center at Seoul Station-Namsan'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '서울의 4세대 계획형 업무구역: 서울역-남산 SBD 도약의 당위성' : 'The 4th Generation District: Seoul Station-Namsan SBD'}
                </h2>

                {/* 중앙 컨텐츠 영역: 기존 사각형 박스 가이드 완전 무시, 자유로운 SVG 곡선형 도약/진화 다이어그램 */}
                <div className="w-full max-w-[1100px] mt-[10px] mb-[25px] relative">
                    
                    {/* 메인 인포그래픽 SVG: 3대 권역에서 4세대 SBD로의 입체적 도약 */}
                    <div className="w-full h-[320px] bg-slate-50/50 border border-slate-100 relative flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 600 320">
                            <defs>
                                {/* 그라데이션 정의 */}
                                <linearGradient id="sbdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#1d4ed8" />
                                </linearGradient>
                                <linearGradient id="legacyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#94a3b8" />
                                    <stop offset="100%" stopColor="#475569" />
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* 1. 기저 레벨: 1~3세대 전통 권역 (가로 배치) */}
                            {/* CBD 노드 */}
                            <circle cx="100" cy="240" r="30" fill="url(#legacyGrad)" />
                            <text x="100" y="243" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">CBD</text>
                            <text x="100" y="285" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="black">1세대 도심권</text>
                            <text x="100" y="297" textAnchor="middle" fill="#64748b" fontSize="7">[역사적 중추 / 종로·중구]</text>

                            {/* GBD 노드 */}
                            <circle cx="300" cy="240" r="30" fill="url(#legacyGrad)" />
                            <text x="300" y="243" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">GBD</text>
                            <text x="300" y="285" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="black">2세대 강남권</text>
                            <text x="300" y="297" textAnchor="middle" fill="#64748b" fontSize="7">[금융·IT 자본 / 강남·서초]</text>

                            {/* YBD 노드 */}
                            <circle cx="500" cy="240" r="30" fill="url(#legacyGrad)" />
                            <text x="500" y="243" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">YBD</text>
                            <text x="500" y="285" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="black">3세대 여의도권</text>
                            <text x="500" y="297" textAnchor="middle" fill="#64748b" fontSize="7">[전통 금융허브 / 여의도]</text>

                            {/* 1~3세대 공통 한계선 바닥 데코 */}
                            <path d="M 50,240 L 550,240" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" z="-1" />
                            <rect x="230" y="195" width="140" height="15" fill="#ef4444" />
                            <text x="300" y="206" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">한계: 개별 필지식 경쟁 개발 (분절)</text>

                            {/* 2. 도약 패스 (유선형 아치 화살표) */}
                            <path d="M 100,210 Q 300,110 300,105" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
                            <path d="M 500,210 Q 300,110 300,105" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
                            <path d="M 300,210 L 300,115" fill="none" stroke="#3b82f6" strokeWidth="3" />
                            
                            {/* 3. 상단 레벨: 4세대 SBD 허브 (도약의 지향점) */}
                            <circle cx="300" cy="75" r="45" fill="url(#sbdGrad)" filter="url(#glow)" />
                            <text x="300" y="70" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="black">SBD</text>
                            <text x="300" y="86" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="black">(서울역-남산)</text>
                            <text x="300" y="98" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="bold">4세대 계획형 업무구역</text>
                            
                            {/* SBD 왕관형 아치 및 관계망 데코 */}
                            <path d="M 230,75 C 230,40 370,40 370,75" fill="none" stroke="#10b981" strokeWidth="2" />
                            <circle cx="230" cy="75" r="4" fill="#10b981" />
                            <circle cx="370" cy="75" r="4" fill="#10b981" />

                            <text x="300" y="15" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">
                                지구 전체를 하나의 생태계로 엮는 BID 운영체제 도입
                            </text>
                        </svg>
                    </div>
                </div>

                {/* 하단 설명글 - 규격 준수 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#2563eb]">▪</span>
                            <span>
                                {lang === 'kr'
                                    ? '기존 3대 업무구역(CBD·GBD·YBD)의 분절적 개발 한계를 극복하고, 메가스케일 정비와 일괄 BID 운영체제를 융합한 최초의 4세대 업무지구(SBD) 도약'
                                    : 'Overcoming the fragmented limits of traditional CBD, GBD, and YBD, SBD emerges as the 4th generation business district integrating mega-scale updates and BID.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
