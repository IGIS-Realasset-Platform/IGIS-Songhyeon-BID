import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section44({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#f8fafc] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '한국의 현황과 제도적 공백' : 'Institutional Gaps in Korea'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '통합 법제 부재와 제도적 한계: 서울 도심 BID의 3대 구조적 난제' : 'Integrated Legislation Void & 3 Structural Challenges in Seoul'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 입체적 인포그래픽 설계 (SVG 도표 + 허들 그래프) */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] flex flex-col lg:flex-row gap-6 items-stretch">
                    
                    {/* 좌측: 현행 법제 커버리지 분석 도표 (SVG) */}
                    <div className="w-full lg:w-[48%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                Legislation Coverage Chart
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#0f172a] mb-4 leading-snug">
                                {lang === 'kr' ? '현행 유사 법제 커버리지 대조표' : 'Statute Coverage & Deficiencies'}
                            </h3>
                            
                            {/* 법제 범위 시각화 SVG 도표 */}
                            <div className="w-full h-[250px] bg-slate-50 border border-gray-200 relative mb-4">
                                <svg className="w-full h-full" viewBox="0 0 350 250">
                                    {/* X/Y축 가이드 */}
                                    <line x1="40" y1="20" x2="40" y2="210" stroke="#94a3b8" strokeWidth="1.5" />
                                    <line x1="40" y1="210" x2="330" y2="210" stroke="#94a3b8" strokeWidth="1.5" />
                                    <text x="320" y="225" fill="#475569" fontSize="8" fontWeight="bold">강제재원 조달력</text>
                                    <text x="15" y="15" fill="#475569" fontSize="8" fontWeight="bold" transform="rotate(-90 15 15)" dy="20">지구관리 범위</text>
                                    
                                    {/* 전통시장 특별법 */}
                                    <rect x="50" y="160" width="80" height="40" fill="#cbd5e1" fillOpacity="0.4" stroke="#475569" strokeWidth="1.5" />
                                    <text x="90" y="180" textAnchor="middle" fill="#1e293b" fontSize="9" fontWeight="bold">전통시장법</text>
                                    <text x="90" y="195" textAnchor="middle" fill="#64748b" fontSize="7">[상인보호 국한 / 국비]</text>

                                    {/* 도시재생특별법 */}
                                    <rect x="140" y="110" width="80" height="80" fill="#93c5fd" fillOpacity="0.3" stroke="#2563eb" strokeWidth="1.5" />
                                    <text x="180" y="145" textAnchor="middle" fill="#1e3a8a" fontSize="9" fontWeight="bold">도시재생법</text>
                                    <text x="180" y="160" textAnchor="middle" fill="#1e3a8a" fontSize="7">[공공보조금 의존]</text>

                                    {/* 미래 서울형 SBD BID Target */}
                                    <rect x="230" y="40" width="90" height="150" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                                    <text x="275" y="100" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="black">서울형 SBD BID</text>
                                    <text x="275" y="115" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="bold">[강제분담금 100%]</text>
                                    <text x="275" y="130" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="bold">[통합 가로 관리]</text>
                                    
                                    {/* 격차 화살표 */}
                                    <path d="M 180,105 Q 220,70 260,45" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                                    <polygon points="260,42 262,48 256,46" fill="#ef4444" />
                                    <text x="220" y="65" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">제도적 공백</text>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 3대 핵심 난제 허들 그래프 (SVG) */}
                    <div className="w-full lg:w-[52%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#ef4444] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                Obstacle Hurdle Diagram
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#0f172a] mb-4 leading-snug">
                                {lang === 'kr' ? '제도 안착을 가로막는 3대 허들 구조도' : 'Three Obstacle Hurdles'}
                            </h3>
                            
                            {/* 허들 그래프 SVG */}
                            <div className="w-full h-[250px] bg-slate-50 border border-gray-200 relative mb-4 flex items-center justify-center">
                                <svg className="w-full h-full" viewBox="0 0 380 230">
                                    {/* 바닥선 */}
                                    <line x1="20" y1="200" x2="360" y2="200" stroke="#0f172a" strokeWidth="3" />
                                    
                                    {/* 허들 1: 법령 부재 */}
                                    <rect x="40" y="110" width="80" height="90" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                                    <line x1="40" y1="140" x2="120" y2="140" stroke="#ef4444" strokeWidth="1.5" />
                                    <text x="80" y="130" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="black">HURDLE 01</text>
                                    <text x="80" y="160" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">강제징수</text>
                                    <text x="80" y="175" textAnchor="middle" fill="#475569" fontSize="8">법적근거 부재</text>
                                    
                                    {/* 허들 2: 이중과세 */}
                                    <rect x="150" y="70" width="80" height="130" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                                    <line x1="150" y1="100" x2="230" y2="100" stroke="#ef4444" strokeWidth="1.5" />
                                    <text x="190" y="90" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="black">HURDLE 02</text>
                                    <text x="190" y="125" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">이중과세 시비</text>
                                    <text x="190" y="140" textAnchor="middle" fill="#475569" fontSize="8">재산세 체계 충돌</text>
                                    <text x="190" y="155" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">[2/3 동의 요구]</text>
                                    
                                    {/* 허들 3: 위헌 논란 */}
                                    <rect x="260" y="30" width="80" height="170" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                                    <line x1="260" y1="60" x2="340" y2="60" stroke="#ef4444" strokeWidth="1.5" />
                                    <text x="300" y="50" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="black">HURDLE 03</text>
                                    <text x="300" y="90" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">사유재산권</text>
                                    <text x="300" y="105" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">침해 논란</text>
                                    <text x="300" y="125" textAnchor="middle" fill="#475569" fontSize="8">위헌 시비 방지책</text>
                                    
                                    {/* 화살표 흐름선 (허들을 넘어서는 패스) */}
                                    <path d="M 25,180 Q 80,70 145,130 T 255,80 T 355,50" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="4,2" />
                                    <circle cx="355" cy="50" r="4" fill="#2563eb" />
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 - 규격 준수 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                {lang === 'kr'
                                    ? '통합 법제 부재 상황에서 강제부담금 징수권, 재산세 연동 이중과세, 위헌 시비 방지를 위한 정교한 3대 입법 허들 돌파 전략이 요구됨'
                                    : 'Scattered statutes without an integrated BID law require strategies to bypass double taxation and constitutional hurdles.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
