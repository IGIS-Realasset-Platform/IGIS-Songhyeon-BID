import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section33({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? 'HYHK Alliance 이사회 구성' : 'HYHK Alliance Board'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    디벨로퍼 임원들의 직접 참여를 통한 트로피 자산 가치 방어 거버넌스
                </h2>

                {/* 3각 거버넌스 다이어그램 (2. 3각 매트릭스형) */}
                <div className="w-full max-w-[1100px] mt-[15px] mb-[25px] flex flex-col items-center">
                    
                    {/* SVG 3각 거버넌스 관계망 */}
                    <div className="relative w-full h-[300px] hidden md:block">
                        <svg className="w-full h-full" viewBox="0 0 800 300">
                            {/* 연결선 */}
                            <g stroke="#0f172a" strokeWidth="2.5" fill="none">
                                <path d="M 400,80 L 220,180" />
                                <path d="M 400,80 L 580,180" />
                                <path d="M 220,220 L 580,220" strokeDasharray="5,5" />
                            </g>

                            {/* 노드 1: 상단 중앙 - 디벨로퍼 임원단 (Related/Oxford) */}
                            <g transform="translate(280, 10)">
                                <rect width="240" height="70" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                                <text x="120" y="30" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="black">👑 디벨로퍼 임원 보드</text>
                                <text x="120" y="50" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Related 부사장 등 이사회 등기 임원 참여</text>
                                <text x="120" y="62" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">강력한 장기 가치 보호 체계 구축</text>
                            </g>

                            {/* 노드 2: 좌측 하단 - 주민 대변 CB4 (Community Board 4) */}
                            <g transform="translate(60, 170)">
                                <rect width="240" height="85" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                                <text x="120" y="28" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="black">👥 CB4 (맨해튼 4 커뮤니티 보드)</text>
                                <text x="120" y="48" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">지역 주민 대리권 행사</text>
                                <text x="120" y="62" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="medium">민간 가드의 차별적 배제 감시</text>
                                <text x="120" y="76" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="medium">지역 사회와의 상생/포용 균형 조율</text>
                            </g>

                            {/* 노드 3: 우측 하단 - 뉴욕시 소기업지원국 (SBS) */}
                            <g transform="translate(500, 170)">
                                <rect width="240" height="85" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                                <text x="120" y="28" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="black">🏛️ 뉴욕시 소기업지원국 (SBS)</text>
                                <text x="120" y="48" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">공식 지자체 감독 행정관 참여</text>
                                <text x="120" y="62" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="medium">비영리 BID 법인의 세무/회계 감독</text>
                                <text x="120" y="76" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="medium">도시 계획 조례 정합성 및 행정 중재</text>
                            </g>
                        </svg>
                    </div>

                    {/* 모바일 리스트 */}
                    <div className="md:hidden w-full flex flex-col gap-4">
                        <div className="border-4 border-[#0f172a] bg-[#0f172a] text-white p-4">
                            <span className="block font-black text-[16px]">👑 Related & Oxford 디벨로퍼 임원</span>
                            <span className="text-[13px] text-gray-300">자산 가치 주도, 소유 지분 기반의 강력한 의결권 참여</span>
                        </div>
                        <div className="border-4 border-[#0f172a] bg-white p-4 text-left">
                            <span className="block font-black text-[16px] text-gray-900">👥 CB4 (주민 커뮤니티 대표)</span>
                            <span className="text-[13px] text-gray-600">지구 내 약자 축출 및 차별적 배제 활동 감시</span>
                        </div>
                        <div className="border-4 border-[#0f172a] bg-white p-4 text-left">
                            <span className="block font-black text-[16px] text-gray-900">🏛️ 뉴욕시 소기업지원국 (SBS)</span>
                            <span className="text-[13px] text-gray-600">공적인 행정 감사 및 비영리 법인 투명성 보증</span>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>HYHK Alliance BID는 단순 이익 단체가 아닌, 최고 결정권을 가진 자산 소유자와 공적 행정 대리인이 실질적인 이사회 보드를 공유하는 입체적 3각 거버넌스 구조를 통해 트로피 자산가치를 장기 방어합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
