import React, { useState } from 'react';

export default function Section48({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#0f172a] mb-[12px]">
                        SBD/IBD 단계별 실행안
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    이오타서울 파일럿에서 용산 연계 SYBD(서울역-용산) 축 완성까지의 일정
                </h2>

                {/* 다채로운 인포그래픽 영역 (3단계 로드맵 타임라인 SVG + 리스크 및 거버넌스 카드) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 3단계 로드맵 타임라인 (SVG) */}
                    <div className="w-full lg:w-[48%] bg-white border-2 border-[#0f172a] rounded-none p-6 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Roadmap Timeline
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-4 leading-tight">
                                3단계 통합 개발 및 운영 타임라인
                            </h3>
                            
                            {/* 타임라인 SVG */}
                            <div className="w-full h-[220px] bg-slate-50 border border-gray-300 relative flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 220">
                                    {/* 수평 메인 연도 축 */}
                                    <line x1="30" y1="140" x2="270" y2="140" stroke="#cbd5e1" strokeWidth="3" />
                                    
                                    {/* Phase 1 노드 */}
                                    <line x1="60" y1="140" x2="60" y2="80" stroke="#3b82f6" strokeWidth="2" />
                                    <circle cx="60" cy="140" r="6" fill="#3b82f6" />
                                    <circle cx="60" cy="80" r="12" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
                                    <text x="60" y="83" textAnchor="middle" fill="#1e3a8a" fontSize="8" fontWeight="black">P.1</text>
                                    <text x="60" y="65" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">파일럿 (양동-봉래)</text>
                                    <text x="60" y="160" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="black">2026 - 2028</text>
                                    
                                    {/* Phase 2 노드 */}
                                    <line x1="150" y1="140" x2="150" y2="60" stroke="#10b981" strokeWidth="2" />
                                    <circle cx="150" cy="140" r="6" fill="#10b981" />
                                    <circle cx="150" cy="60" r="12" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
                                    <text x="150" y="63" textAnchor="middle" fill="#065f46" fontSize="8" fontWeight="black">P.2</text>
                                    <text x="150" y="45" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">SBD 광역 확장</text>
                                    <text x="150" y="160" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="black">2028 - 2030</text>
                                    
                                    {/* Phase 3 노드 */}
                                    <line x1="240" y1="140" x2="240" y2="80" stroke="#f59e0b" strokeWidth="2" />
                                    <circle cx="240" cy="140" r="6" fill="#f59e0b" />
                                    <circle cx="240" cy="80" r="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                                    <text x="240" y="83" textAnchor="middle" fill="#d97706" fontSize="8" fontWeight="black">P.3</text>
                                    <text x="240" y="65" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">SYBD 연계 완성</text>
                                    <text x="240" y="160" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="black">2030년 이후</text>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 리스크 및 거버넌스 가이드라인 대응 카드 */}
                    <div className="w-full lg:w-[48%] bg-[#0f172a] border-2 border-[#0f172a] rounded-none p-6 text-left shadow-2xl flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-yellow-400 text-black text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Risk & Governance Action
                            </span>
                            <h3 className="text-[24px] font-black text-white mb-6 leading-tight">
                                지속 가능 거버넌스 보장 전략
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 border-l-4 border-red-500">
                                    <span className="block text-white font-extrabold text-[15px]">💸 재정 리스크 방지 (민간 중심 자조)</span>
                                    <span className="text-[12px] text-gray-300">정부 세금 지원(TIF 등) 최소화, 부동산 소유주 자발적 자조 분담금 70% 구성 원칙 확립</span>
                                </div>
                                <div className="bg-white/5 p-4 border-l-4 border-red-500">
                                    <span className="block text-white font-extrabold text-[15px]">⚖️ 상업적 사유화 통제 (당연직 참여)</span>
                                    <span className="text-[12px] text-gray-300">지자체 대리인 및 서울시의원 등 당연직 공무원 4인의 이사의 당연직 참여로 사유화 방지</span>
                                </div>
                                <div className="bg-white/5 p-4 border-l-4 border-red-500">
                                    <span className="block text-white font-extrabold text-[15px]">🛡️ 젠트리피케이션 완화 (상생 조력)</span>
                                    <span className="text-[12px] text-gray-300">구역 내 영세 상인의 급격한 임대료 상승 충격 완화를 위한 BID 자체 상생 조력 기금 조성</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>SBD-IBD 통합 마스터플랜은 정교한 3단계 기획과 민·관의 합리적 견제 거버넌스를 동력 삼아, 자산 가치의 프리미엄 방어와 공공의 생태 민주성을 동시에 성취해 나갈 것입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
