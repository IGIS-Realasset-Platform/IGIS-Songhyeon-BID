import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section29({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '허드슨야드 PPP 개발 거버넌스' : 'Hudson Yards PPP Governance'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    북미 최대 250억 달러 민간 개발과 공공 인프라 결합 거버넌스
                </h2>

                {/* 3각 거버넌스 다이어그램 (2. 3각 매트릭스형) */}
                <div className="w-full max-w-[1100px] mt-[15px] mb-[25px] flex flex-col items-center">
                    
                    {/* SVG 3각 PPP 거버넌스 */}
                    <div className="relative w-full h-[300px] hidden md:block">
                        <svg className="w-full h-full" viewBox="0 0 800 300">
                            {/* 연결 화살표 관계선 */}
                            <g stroke="#0f172a" strokeWidth="2.5" fill="none">
                                {/* NYC -> MTA */}
                                <path d="M 370,80 L 220,180" />
                                {/* NYC -> Related */}
                                <path d="M 430,80 L 580,180" />
                                {/* Related -> MTA */}
                                <path d="M 520,220 L 280,220" strokeDasharray="5,5" />
                            </g>

                            {/* 노드 1: 상단 중앙 - 뉴욕시 (NYC) */}
                            <g transform="translate(300, 10)">
                                <rect width="200" height="70" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                                <text x="100" y="30" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="black">🏛️ 뉴욕시 (NYC)</text>
                                <text x="100" y="50" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">특별 조례 제정 및 용적률 완화</text>
                                <text x="100" y="62" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">미래 PILOT 세수 담보 채권 보증</text>
                            </g>

                            {/* 노드 2: 좌측 하단 - 뉴욕대중교통국 (MTA) */}
                            <g transform="translate(60, 170)">
                                <rect width="240" height="85" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                                <text x="120" y="28" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="black">🚇 뉴욕대중교통국 (MTA)</text>
                                <text x="120" y="48" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">철도 차량기지(Yard) 부지 제공</text>
                                <text x="120" y="62" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="medium">99년 장기 임차 & 개발권 이전(TDR)</text>
                                <text x="120" y="76" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="medium">7호선 연장 노선 인프라 수용</text>
                            </g>

                            {/* 노드 3: 우측 하단 - Related / Oxford */}
                            <g transform="translate(500, 170)">
                                <rect width="240" height="85" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                                <text x="120" y="28" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="black">🏗️ Related & Oxford (민간)</text>
                                <text x="120" y="48" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">250억 달러 프로젝트 리스크 부담</text>
                                <text x="120" y="62" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="medium">차량기지 상부 6만 톤 인공 데크 시공</text>
                                <text x="120" y="76" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="medium">글로벌 앵커 테넌트 유치 및 개발 주도</text>
                            </g>
                        </svg>
                    </div>

                    {/* 모바일 대응 리스트 */}
                    <div className="md:hidden w-full flex flex-col gap-4">
                        <div className="border-4 border-[#0f172a] bg-[#0f172a] text-white p-4">
                            <span className="block font-black text-[16px]">🏛️ 뉴욕시 (NYC)</span>
                            <span className="text-[13px] text-gray-300">조례 제정, 인허가 특혜, PILOT 세수 보증 채권 구조화</span>
                        </div>
                        <div className="border-4 border-[#0f172a] bg-white p-4 text-left">
                            <span className="block font-black text-[16px] text-gray-900">🚇 뉴욕대중교통국 (MTA)</span>
                            <span className="text-[13px] text-gray-600">야드 부지 제공 및 7호선 연장 노선 수용</span>
                        </div>
                        <div className="border-4 border-[#0f172a] bg-white p-4 text-left">
                            <span className="block font-black text-[16px] text-gray-900">🏗️ Related / Oxford (민간)</span>
                            <span className="text-[13px] text-gray-600">인공 데크 공사 시공 책임 및 글로벌 테넌트 유치</span>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr' ? '초대형 개발 사업의 인허가 및 금융 리스크를 지자체(MTA/NYC)와 민간 디벨로퍼가 분산 매핑한 협력 체계.' : 'A collaborative partnership model distributing massive development risks between municipal agencies and private developers.'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
