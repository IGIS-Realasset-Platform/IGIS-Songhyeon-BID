import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section46({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#0f172a] mb-[12px]">{lang === 'kr' ? '용산 IBD 타운매니지먼트 당위성' : 'Yongsan IBD Megastructure'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    14.3조 초대형 용산 개발을 조율할 초광역 거버넌스 도입의 필연성
                </h2>

                {/* 다채로운 인포그래픽 영역 (용산 입체 도시 버티컬 스택 SVG + 거버넌스 당위성 카드) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 용산 IBD 3차원 입체 도시 버티컬 스택 (SVG) */}
                    <div className="w-full lg:w-[45%] bg-white border-2 border-[#0f172a] rounded-none p-6 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Vertical Stack Structure
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-4 leading-tight">
                                3차원 입체 복합 도시 설계
                            </h3>
                            
                            {/* 버티컬 스택 SVG */}
                            <div className="w-full h-[240px] bg-slate-50 border border-gray-300 relative flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 240">
                                    {/* 고층 빌딩 아웃라인 */}
                                    <line x1="80" y1="20" x2="80" y2="220" stroke="#cbd5e1" strokeWidth="2" />
                                    <line x1="220" y1="20" x2="220" y2="220" stroke="#cbd5e1" strokeWidth="2" />
                                    
                                    {/* 빌딩 실루엣 */}
                                    <rect x="50" y="30" width="60" height="180" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
                                    <rect x="190" y="50" width="60" height="160" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
                                    
                                    {/* Layer 1: 공중 (Sky Trail 40F) */}
                                    <rect x="30" y="80" width="240" height="15" fill="#3b82f6" fillOpacity="0.8" stroke="#1d4ed8" strokeWidth="1.5" />
                                    <text x="150" y="91" textAnchor="middle" fill="white" fontSize="9" fontWeight="black">SKY TRAIL (공중 녹지 보행로 - 40F)</text>
                                    
                                    {/* Layer 2: 지상 (Ground Level) */}
                                    <rect x="30" y="145" width="240" height="15" fill="#10b981" fillOpacity="0.8" stroke="#047857" strokeWidth="1.5" />
                                    <text x="150" y="156" textAnchor="middle" fill="white" fontSize="9" fontWeight="black">GROUND GREENWAY (보행 가로 & 수변광장)</text>
                                    
                                    {/* Layer 3: 지하 (Underground Level) */}
                                    <rect x="30" y="195" width="240" height="15" fill="#0f172a" fillOpacity="0.9" stroke="#000" strokeWidth="1.5" />
                                    <text x="150" y="206" textAnchor="middle" fill="white" fontSize="9" fontWeight="black">UNDERGROUND CORE (공동물류 및 로봇 배송)</text>

                                    {/* 연결 엘리베이터 코어 라인 */}
                                    <line x1="150" y1="80" x2="150" y2="210" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                                    <circle cx="150" cy="87.5" r="3" fill="#ef4444" />
                                    <circle cx="150" cy="152.5" r="3" fill="#ef4444" />
                                    <circle cx="150" cy="202.5" r="3" fill="#ef4444" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4 bg-gray-50 p-3 border border-gray-200">
                            <p className="text-[12px] text-gray-600 font-bold leading-relaxed">
                                🏢 스카이 트레일(공중)-녹지 가로(지상)-공동 하역장(지하)의 수직 복합 레이어가 단일 시스템으로 연계되는 구조적 당위성 제시.
                            </p>
                        </div>
                    </div>

                    {/* 우측: 타운 매니지먼트의 통합 조율 임무 카드 */}
                    <div className="w-full lg:w-[50%] bg-[#0f172a] border-2 border-[#0f172a] rounded-none p-6 text-left shadow-2xl flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-yellow-400 text-black text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Governance Imperative
                            </span>
                            <h3 className="text-[24px] font-black text-white mb-6 leading-tight">
                                파편적 관리를 넘는 초광역 운영 주체
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 border-l-4 border-blue-500">
                                    <span className="block text-white font-extrabold text-[15px]">🚚 지하 공동물류 및 인프라 통합 관제</span>
                                    <span className="text-[12px] text-gray-300">개별 빌딩 하역장 통합 관리 및 로봇 자율주행 배송 인프라 통제</span>
                                </div>
                                <div className="bg-white/5 p-4 border-l-4 border-blue-500">
                                    <span className="block text-white font-extrabold text-[15px]">🌉 40층 스카이 트레일 통합 오퍼레이션</span>
                                    <span className="text-[12px] text-gray-300">여러 마천루에 나뉘어 있는 입체 데크의 상업 시설 연계, 보수, 안전 점검 일괄 집행</span>
                                </div>
                                <div className="bg-white/5 p-4 border-l-4 border-blue-500">
                                    <span className="block text-white font-extrabold text-[15px]">⚖️ 의결 보드 단일화 거버넌스</span>
                                    <span className="text-[12px] text-gray-300">코레일, SH공사, 개별 디벨로퍼들이 의결 지분을 공유하는 통합 타운 매니지먼트(DMA) 구축</span>
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
                            <span>14.3조 초대형 용산 개발에 따른 다차원 스카이트레일, 지하 공동물류 통합 관제의 당위성</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>SH, 코레일, 개별 디벨로퍼의 이해관계를 조율할 단일 통합 타운 거버넌스의 필요성</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>대규모 인프라 운영 비효율을 방지하고 장기 도시 프리미엄을 영속화하기 위한 공공-민간 협력</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
