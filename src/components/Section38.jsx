import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section38({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '[공간의 배제] 환경 개선 디자인을 도구로 한 영세 노점상의 물리적 축출' : '[Exclusion] Physically Evicting Vendors via Environment Design'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    보행 환경 개선이라는 명분 이면에 숨겨진 비공식 영세 상인 축출 논란
                </h2>

                {/* 앵커 포커스: 화단 확장 비교 단면도 (6. 앵커 포커스/포인터형) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[25px] flex flex-col lg:flex-row gap-8 justify-between items-stretch">
                    
                    {/* 좌측: 보도 위 화단 규격(5ft vs 12.5ft) 물리적 단면 대조 SVG */}
                    <div className="w-full lg:w-[60%] border-4 border-[#0f172a] bg-white p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <span className="inline-block bg-[#ef4444] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Physical Sidewalk Conflict
                            </span>
                            <h3 className="text-[20px] font-black text-gray-900 mb-6">
                                가로수 보호틀(Tree Bed) 인위적 확장 비교 단면
                            </h3>

                            {/* SVG 단면 대조 */}
                            <div className="w-full h-[180px] bg-gray-50 border border-gray-200 relative overflow-hidden">
                                <svg className="w-full h-full" viewBox="0 0 500 150">
                                    {/* 케이스 A: 표준 규격 (상단) */}
                                    <g transform="translate(0, 10)">
                                        {/* 보도 바닥 */}
                                        <rect x="10" y="35" width="220" height="20" fill="#e2e8f0" stroke="#94a3b8" />
                                        {/* 표준 화단 (5ft) */}
                                        <rect x="20" y="25" width="60" height="10" fill="#10b981" />
                                        <text x="50" y="32" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">화단 5ft</text>
                                        {/* 남은 보행로 (10ft) */}
                                        <rect x="80" y="35" width="150" height="2" fill="#3b82f6" />
                                        <text x="155" y="48" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">🚶‍♂️ 여유 보행로 10ft</text>
                                        <text x="155" y="23" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">🌭 노점상 영업 가능</text>
                                        
                                        <text x="10" y="12" fill="#475569" fontSize="10" fontWeight="black">AS-IS: 뉴욕시 표준 가로 규격</text>
                                    </g>

                                    {/* 구분 점선 */}
                                    <line x1="250" y1="0" x2="250" y2="150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />

                                    {/* 케이스 B: 의도적 확장 규격 (하단) */}
                                    <g transform="translate(250, 10)">
                                        {/* 보도 바닥 */}
                                        <rect x="10" y="35" width="220" height="20" fill="#e2e8f0" stroke="#94a3b8" />
                                        {/* 확장 화단 (12.5ft) */}
                                        <rect x="20" y="25" width="160" height="10" fill="#10b981" />
                                        <text x="100" y="32" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">화단 고의 확대 12.5ft 🌳</text>
                                        {/* 남은 보행로 (2.5ft) */}
                                        <rect x="180" y="35" width="50" height="2" fill="#ef4444" />
                                        <text x="205" y="48" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">통로 2.5ft ⚠️</text>
                                        <text x="205" y="23" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">🚫 노점 불가</text>
                                        
                                        <text x="10" y="12" fill="#ef4444" fontSize="10" fontWeight="black">TO-BE: 허드슨야드 우회 정비 규격</text>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 쟁점 요약 카드 */}
                    <div className="w-full lg:w-[36%] border-4 border-[#0f172a] bg-[#0f172a] p-6 text-left text-white flex flex-col justify-between shadow-md">
                        <div>
                            <span className="inline-block bg-[#ef4444] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Exclusive Design
                            </span>
                            <h3 className="text-[24px] font-black mb-6">
                                물리적 축출 메커니즘
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/10 p-3">
                                    <span className="block font-black text-[16px] text-red-400">🌭 길거리 F&B 차단</span>
                                    <span className="text-[13px] text-gray-300">뉴욕 핫도그 등 1인 영세 상인의 물리적 카트 배치 구역을 원천 말소</span>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-3">
                                    <span className="block font-black text-[16px] text-[#93c5fd]">🏢 복합 쇼핑몰 매출 가두기</span>
                                    <span className="text-[13px] text-gray-300">지구 보행자 소비 수요를 민간 대기업의 복합몰(Mall) 내부 매장으로 유인</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-red-600">▪</span>
                            <span>보도 상 가로수 화단을 인위적으로 넓혀 무허가 노점상을 정비하는 등 청결 확보 이면의 젠트리피케이션 갈등</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
