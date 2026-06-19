import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section43({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#0f172a] mb-[12px]">{lang === 'kr' ? 'SBD의 무기: 서울역 교통 & 남산 자연' : 'SBD Weapon: Seoul Station & Namsan'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    타 업무지구(CBD·GBD·YBD)가 끝내 갖지 못한 녹지 축과 광역 연결성의 결합
                </h2>

                {/* 다채로운 인포그래픽 영역 (대칭 밸런스시트: 서울역 교통 노드 vs 남산 에코 축) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 서울역 교통 결절 (Transit Hub) */}
                    <div className="w-full lg:w-[48%] bg-[#0f172a] border-2 border-[#0f172a] rounded-none p-6 text-left shadow-2xl flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-blue-500 text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Transit Node Premium
                            </span>
                            <h3 className="text-[24px] font-black text-white mb-4 leading-tight">
                                서울역 광역 교통 결절점
                            </h3>
                            <p className="text-gray-400 text-[13px] font-bold mb-6">
                                KTX, GTX-A/B, 1/4호선, 공항철도 연계로 수도권 및 전국 비즈니스 노드를 최단 시간에 묶어주는 초광역 교통 거점
                            </p>

                            {/* 교통망 시각화 SVG */}
                            <div className="w-full h-[150px] bg-white/5 border border-white/10 relative flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 150">
                                    {/* 중앙 중심 노드 */}
                                    <circle cx="150" cy="75" r="25" fill="#2563eb" fillOpacity="0.8" />
                                    <circle cx="150" cy="75" r="15" fill="#3b82f6" />
                                    <text x="150" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">SEOUL STATION</text>
                                    
                                    {/* 연결선 */}
                                    <line x1="50" y1="30" x2="130" y2="60" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                                    <line x1="250" y1="30" x2="170" y2="60" stroke="#10b981" strokeWidth="2" />
                                    <line x1="50" y1="120" x2="130" y2="90" stroke="#3b82f6" strokeWidth="2" />
                                    <line x1="250" y1="120" x2="170" y2="90" stroke="#ec4899" strokeWidth="2" strokeDasharray="3,3" />
                                    
                                    {/* 주변 노드 텍스트 */}
                                    <text x="40" y="25" fill="#f59e0b" fontSize="10" fontWeight="bold">GTX-A/B (예정)</text>
                                    <text x="260" y="25" fill="#10b981" fontSize="10" fontWeight="bold">공항철도 (Incheon Airport)</text>
                                    <text x="35" y="130" fill="#3b82f6" fontSize="10" fontWeight="bold">KTX 전 노선</text>
                                    <text x="260" y="130" fill="#ec4899" fontSize="10" fontWeight="bold">지하철 1/4호선</text>
                                </svg>
                            </div>
                        </div>
                        
                        <div className="mt-4 border-t border-white/10 pt-4">
                            <span className="text-[12px] font-bold text-gray-400">
                                💼 "지방 출장자 및 해외 파트너 접근성이 국내에서 가장 압도적인 입지 자산"
                            </span>
                        </div>
                    </div>

                    {/* 우측: 남산 에코 시스템 (Eco & Wellbeing) */}
                    <div className="w-full lg:w-[48%] bg-white border-2 border-[#0f172a] rounded-none p-6 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#10b981] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Eco-Wellness Premium
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-4 leading-tight">
                                남산 그린 에코 벨트
                            </h3>
                            <p className="text-gray-600 text-[13px] font-bold mb-6">
                                서울의 최상급 도심 자연 자산인 남산 녹지축을 기점으로 신선한 대기 공급 및 청정 조망을 확보하여 임직원 웰니스를 극대화
                            </p>

                            {/* 남산 자연 축 시각화 SVG */}
                            <div className="w-full h-[150px] bg-emerald-50/50 border border-emerald-200 relative flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 150">
                                    {/* 산 모양 패스 */}
                                    <path d="M 50,130 Q 150,30 250,130" fill="#a7f3d0" fillOpacity="0.5" stroke="#10b981" strokeWidth="2" />
                                    <path d="M 100,130 Q 180,50 260,130" fill="#d1fae5" fillOpacity="0.4" stroke="#059669" strokeWidth="1" />
                                    
                                    {/* 나무 모양 심볼 */}
                                    <circle cx="150" cy="55" r="8" fill="#059669" />
                                    <line x1="150" y1="55" x2="150" y2="70" stroke="#059669" strokeWidth="2" />
                                    
                                    <circle cx="130" cy="75" r="7" fill="#10b981" />
                                    <line x1="130" y1="75" x2="130" y2="90" stroke="#10b981" strokeWidth="2" />
                                    
                                    <circle cx="170" cy="75" r="7" fill="#10b981" />
                                    <line x1="170" y1="75" x2="170" y2="90" stroke="#10b981" strokeWidth="2" />
                                    
                                    {/* 웰빙 텍스트 */}
                                    <text x="150" y="115" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="black">Namsan Green Spine</text>
                                </svg>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <span className="text-[12px] font-bold text-gray-500">
                                🌳 "ESG 기준을 중요하게 평가하는 글로벌 테넌트들이 가장 선호하는 웰빙 환경"
                            </span>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>{lang === 'kr' ? 'KTX/GTX 광역 대중교통 노드와 영구 조망권을 갖춘 남산 자연환경이 융합된 유일무이한 상징적 가치' : 'A unique symbolic value fusing KTX/GTX transit nodes with Namsan\'s natural views'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
