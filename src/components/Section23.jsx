import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section23({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '지구관리협회(DMA) 이사회 구성 요건' : 'DMA Board Structure'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    소수 자본의 독점을 방지하기 위한 이사회 법적 인적 구성 강제
                </h2>

                {/* 3각 거버넌스 매트릭스 다이어그램 (2. 3각 매트릭스형) */}
                <div className="w-full max-w-[1100px] mt-[20px] mb-[30px] flex flex-col items-center">
                    
                    {/* SVG 3각 관계망 구조도 */}
                    <div className="relative w-full h-[280px] hidden md:block">
                        <svg className="w-full h-full" viewBox="0 0 800 280">
                            {/* 선과 화살표 연결 */}
                            <g stroke="#0f172a" strokeWidth="2.5" fill="none">
                                {/* 좌측 피어 -> 상단 피어 */}
                                <path d="M 200,200 L 400,80" />
                                {/* 우측 피어 -> 상단 피어 */}
                                <path d="M 600,200 L 400,80" />
                                {/* 좌측 피어 -> 우측 피어 */}
                                <path d="M 200,200 L 600,200" strokeDasharray="5,5" />
                            </g>

                            {/* 노드 1: 상단 중앙 - 지구관리협회 이사회 (DMA Board) */}
                            <g transform="translate(300, 20)">
                                <rect width="200" height="70" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                                <text x="100" y="32" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="black">지구관리협회 이사회</text>
                                <text x="100" y="52" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">(최소 13인 이상 의무)</text>
                            </g>

                            {/* 노드 2: 좌측 하단 - 민간 소유자 (Majority) */}
                            <g transform="translate(80, 160)">
                                <rect width="240" height="80" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                                <text x="120" y="32" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="black">👥 부동산 소유자 (과반수)</text>
                                <text x="120" y="54" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">전체 의석의 50% 초과 필수 의무</text>
                                <text x="120" y="70" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="medium">자산 가치 주도 의사결정권 장착</text>
                            </g>

                            {/* 노드 3: 우측 하단 - 공공 및 상인 (Check & Balance) */}
                            <g transform="translate(480, 160)">
                                <rect width="240" height="80" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                                <text x="120" y="32" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="black">🏛️ 공공 당연직 & 상인·주민</text>
                                <text x="120" y="54" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">시장/재무국장/의원 등 4인 당연직</text>
                                <text x="120" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="medium">상인/주민 의석 배치 ➔ 독점 방지</text>
                            </g>
                        </svg>
                    </div>

                    {/* 모바일용 카드 리스트 */}
                    <div className="md:hidden w-full flex flex-col gap-4">
                        <div className="border-4 border-[#0f172a] bg-[#0f172a] text-white p-4">
                            <span className="block font-black text-[18px]">👑 지구관리협회 (DMA Board)</span>
                            <span className="text-[13px] text-gray-300">최소 13인 이상으로 구성되는 법적 의무 이사회 구조</span>
                        </div>
                        <div className="border-4 border-[#0f172a] bg-white p-4 text-left">
                            <span className="block font-black text-[16px] text-gray-900">👥 부동산 소유자 (의석 과반수 초과)</span>
                            <span className="text-[13px] text-gray-600">자산 가치 방어를 위한 직접 책임 및 투자 통제권 보장</span>
                        </div>
                        <div className="border-4 border-[#0f172a] bg-white p-4 text-left">
                            <span className="block font-black text-[16px] text-gray-900">🏛️ 당연직 공무원 4인 및 상인/주민</span>
                            <span className="text-[13px] text-gray-600">시장, 재무국장, 시의원 당연참여 ➔ 회계 감사 및 행정 견제</span>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr' ? '대형 소유주, 소상공인, 지역 공무원이 의사결정 보드를 공유하여 독점을 방지하고 투명한 공공성을 유지하는 지침' : 'Guidelines for sharing decision boards among owners, merchants, and officials to prevent monopoly and ensure public integrity'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
