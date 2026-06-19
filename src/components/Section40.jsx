import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section40({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? 'SBD 서울역-남산 신업무 권역 선언' : 'SBD Corridor Declaration'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    서울역에서 남산에 이르는 메가스케일 트로피 에셋 공급축의 정립
                </h2>

                {/* 앵커 포커스 공간 지도화 (6. 앵커 포커스/포인터형) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[25px] flex flex-col lg:flex-row gap-8 justify-between items-stretch">
                    
                    {/* 좌측: 서울역-남산 연결 지리적 앵커 지도 (SVG) */}
                    <div className="w-full lg:w-[60%] border-4 border-[#0f172a] bg-white p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Geographic Axis Map
                            </span>
                            <h3 className="text-[20px] font-black text-gray-900 mb-6">
                                SBD 서울역-남산 보행 녹지 및 비즈니스 공급축
                            </h3>

                            {/* 지리적 축 SVG */}
                            <div className="w-full h-[180px] bg-gray-50 border border-gray-200 relative overflow-hidden">
                                <svg className="w-full h-full" viewBox="0 0 500 150">
                                    {/* 남산 등고선 데코 */}
                                    <path d="M 400,10 Q 450,40 430,140" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                                    <path d="M 420,10 Q 470,30 450,140" fill="none" stroke="#e2e8f0" strokeWidth="6" />

                                    {/* 1. 서울역 노드 */}
                                    <rect x="20" y="45" width="100" height="60" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
                                    <text x="70" y="72" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="black">🚇 서울역</text>
                                    <text x="70" y="90" textAnchor="middle" fill="#1e3a8a" fontSize="8" fontWeight="bold">GTX-A/B, 11개 철도망</text>
                                    
                                    {/* 2. 남산 공원 노드 */}
                                    <circle cx="430" cy="75" r="35" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2.5" />
                                    <text x="430" y="72" textAnchor="middle" fill="#2e7d32" fontSize="12" fontWeight="black">🌳 남산공원</text>
                                    <text x="430" y="90" textAnchor="middle" fill="#4caf50" fontSize="8" fontWeight="bold">도심 최대 자연 녹지</text>

                                    {/* 3. 중간 앵커 코어 - IOTA Seoul */}
                                    <rect x="210" y="30" width="110" height="90" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                                    <text x="265" y="65" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="black">🏢 IOTA Seoul</text>
                                    <text x="265" y="85" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">(힐튼 재개발 코어)</text>
                                    <text x="265" y="100" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="bold">연면적 46만㎡ 트로피</text>

                                    {/* 보행 흐름 점선 */}
                                    <path d="M 120,75 C 160,75 180,75 210,75" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                                    <path d="M 320,75 C 350,75 370,75 395,75" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                                    <circle cx="120" cy="75" r="3" fill="#ef4444" />
                                    <circle cx="395" cy="75" r="3" fill="#ef4444" />
                                    
                                    {/* 지시 포인터 라벨 */}
                                    <rect x="135" y="90" width="60" height="15" fill="#ef4444" />
                                    <text x="165" y="100" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">서울역 연결</text>

                                    <rect x="330" y="90" width="60" height="15" fill="#ef4444" />
                                    <text x="360" y="100" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">남산 보행연결</text>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 핵심 스펙 및 개념 요약 */}
                    <div className="w-full lg:w-[36%] border-4 border-[#0f172a] bg-[#0f172a] p-6 text-left text-white flex flex-col justify-between shadow-md">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Strategic Gateway
                            </span>
                            <h3 className="text-[24px] font-black mb-6">
                                SBD의 차별적 사양
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/10 p-3">
                                    <span className="block font-black text-[16px] text-[#93c5fd]">🚇 서울역 광역 교통 결절</span>
                                    <span className="text-[13px] text-gray-300">GTX-A/B 조기 개통 및 유동 인구를 흡수하는 강북 최첨단 교통 결착점</span>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-3">
                                    <span className="block font-black text-[16px] text-[#93c5fd]">🌳 대자연 녹지 결합축</span>
                                    <span className="text-[13px] text-gray-300">양동-봉래 구역의 정비를 통해 서울역 광장에서 남산 중턱까지 끊김 없는 보행 공원 형성</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr' ? '서울역 교통 인프라와 남산 생태축을 결합하여 구도심의 한계를 돌파하는 신업무 권역 공급 비전' : 'A vision for a new business district corridor by combining Seoul Station\'s transport hub and Namsan\'s ecological axis'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
