import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section49({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#2563eb] mb-[12px]">
                        {lang === 'kr' ? '서울역 교통 거점 기반 메가 정비사업들의 입체적 연계 전략' : 'Integration Strategy for Mega Redevelopments around Seoul Station Hub'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '서울역 권역 메가 개발의 연쇄 폭발: SBD의 화룡점정이자 정중앙 앵커 \'이오타서울\'' : 'Chain Explosion of Seoul Station Megas: IOTA Seoul as the Core Anchor'}
                </h2>

                {/* 중앙 컨텐츠 영역: 디자인 가이드 완전 무시, 자유로운 SVG 개발 벨트 관계망 설계 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] relative">
                    
                    {/* 메가 프로젝트 벨트 SVG */}
                    <div className="w-full h-[320px] bg-slate-50/50 border border-slate-100 relative flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 700 320">
                            <defs>
                                {/* 그라데이션 및 필터 정의 */}
                                <linearGradient id="anchorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ef4444" />
                                    <stop offset="100%" stopColor="#b91c1c" />
                                </linearGradient>
                                <linearGradient id="projectGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0f172a" />
                                    <stop offset="100%" stopColor="#334155" />
                                </linearGradient>
                                <filter id="glowGold" x="-30%" y="-30%" width="160%" height="160%">
                                    <feGaussianBlur stdDeviation="6" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* 개발 축 연결선 (Line) */}
                            <path d="M 80,160 Q 220,60 350,160 T 620,160" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                            <path d="M 80,160 Q 220,60 350,160 T 620,160" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,4" />

                            {/* 1. 서소문 구역 (왼쪽 끝) */}
                            <circle cx="80" cy="160" r="30" fill="url(#projectGrad)" />
                            <text x="80" y="163" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">서소문</text>
                            <text x="80" y="210" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="black">서소문 구역</text>
                            <text x="80" y="222" textAnchor="middle" fill="#475569" fontSize="7">[개방형 녹지 도입]</text>

                            {/* 2. 서울역 북부역세권 (중간 상단 아치) */}
                            <circle cx="215" cy="100" r="35" fill="url(#projectGrad)" />
                            <text x="215" y="98" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">북부역세권</text>
                            <text x="215" y="108" textAnchor="middle" fill="#93c5fd" fontSize="7" fontWeight="bold">MICE 복합</text>
                            <text x="215" y="50" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="black">서울역 북부역세권</text>
                            <text x="215" y="62" textAnchor="middle" fill="#475569" fontSize="7">[한화 주도 / 만다린 오리엔탈]</text>

                            {/* 3. 봉래 구역 (중간 우측) */}
                            <circle cx="485" cy="100" r="35" fill="url(#projectGrad)" />
                            <text x="485" y="98" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">봉래 구역</text>
                            <text x="485" y="108" textAnchor="middle" fill="#3b82f6" fontSize="7" fontWeight="bold">용적률 1260%</text>
                            <text x="485" y="50" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="black">중구 봉래동1가</text>
                            <text x="485" y="62" textAnchor="middle" fill="#475569" fontSize="7">[30층 빌딩 / 벤처집적]</text>

                            {/* 4. 양동 및 남대문로5가 (오른쪽 끝) */}
                            <circle cx="620" cy="160" r="30" fill="url(#projectGrad)" />
                            <text x="620" y="163" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">양동</text>
                            <text x="620" y="210" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="black">남대문로5가</text>
                            <text x="620" y="222" textAnchor="middle" fill="#475569" fontSize="7">[용적률 842% / 100m]</text>

                            {/* 5. 정중앙 핵심 앵커: 이오타 서울 (Center Anchor) */}
                            <circle cx="350" cy="160" r="50" fill="url(#anchorGrad)" filter="url(#glowGold)" />
                            <text x="350" y="152" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="black">IOTA SEOUL</text>
                            <text x="350" y="167" textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">연면적 46만㎡ 트로피</text>
                            <text x="350" y="179" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="black">화룡점정 앵커</text>

                            {/* 앵커 중심 에너지 전파 점선 링 */}
                            <circle cx="350" cy="160" r="75" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
                            <circle cx="350" cy="160" r="100" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,4" />

                            <text x="350" y="270" textAnchor="middle" fill="#b91c1c" fontSize="12" fontWeight="black">
                                서소문 ➔ 북부역세권 ➔ 봉래 ➔ 양동을 잇는 거대한 개발 벨트의 중심축
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
                                    ? '북부역세권 MICE, 봉래구역 용적률 1,260% 빌딩, 남대문로 100m 빌딩 등 굵직한 메가 개발 프로젝트들의 정중앙 앵커이자 연결고리가 되는 이오타서울'
                                    : 'IOTA Seoul serves as the central spatial anchor and crowning stroke connecting Seosomun, Seoul Station North MICE, Bongrae, and Yangdong.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
