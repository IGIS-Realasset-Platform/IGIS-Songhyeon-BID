import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section10({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '도쿄 마루노우치 에리어매니지먼트' : 'Tokyo Marunouchi Area Management'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    미쓰비시 지쇼 주도 하에 도로를 보행자 광장으로 바꾼 공공 공간 관리
                </h2>

                {/* 다채로운 인포그래픽 영역 (3각 거버넌스 기둥 및 OMY 전용 Naka-dori 설계안) */}
                <div className="w-full max-w-[1100px] mt-[30px] mb-[30px] relative h-[380px] flex items-center justify-center">
                    
                    {/* OMY 3각 연결 화살표 배경 (SVG) */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <svg className="w-[600px] h-[350px] text-[#1e3a8a]" viewBox="0 0 600 350" fill="none">
                            <path d="M 300,40 L 480,260" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" />
                            <path d="M 300,40 L 480,260" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                            
                            <path d="M 480,260 L 120,260" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" />
                            <path d="M 480,260 L 120,260" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                            
                            <path d="M 120,260 L 300,40" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" />
                            <path d="M 120,260 L 300,40" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                            
                            <rect x="360" y="130" width="120" height="24" fill="#fdfdfd" />
                            <text x="420" y="146" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">주요 자산 연계 마케팅</text>
                            
                            <rect x="250" y="248" width="100" height="24" fill="#fdfdfd" />
                            <text x="300" y="264" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">민관 파트너십 구축</text>

                            <rect x="120" y="130" width="120" height="24" fill="#fdfdfd" />
                            <text x="180" y="146" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">차도 보행화 조례 협의</text>
                        </svg>
                    </div>

                    {/* 노드 1: OMY 에리어 매니지먼트 협회 (중앙 상단) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-4 w-[250px] text-center shadow-2xl text-white">
                        <span className="text-[12px] font-black text-yellow-400 block mb-1">GOVERNANCE CORE</span>
                        <h4 className="text-[18px] font-black text-white">OMY 에리어 매니지먼트</h4>
                        <p className="text-[12px] text-gray-400 font-bold mt-2">
                            • 치요다구와 미쓰비시지쇼 간의 연대<br/>
                            • 가로 전반의 일관성 있는 디자인 통제<br/>
                            • 지구 경제 활성화용 이벤트 총괄
                        </p>
                    </div>

                    {/* 노드 2: 가로 활성화 (Naka-dori Street) - 좌측 하단 */}
                    <div className="absolute bottom-0 left-[20px] md:left-[80px] z-10 bg-white border-4 border-[#0f172a] rounded-none p-4 w-[240px] text-center shadow-lg">
                        <span className="text-[12px] font-black text-[#1e3a8a] block mb-1">STREET ACTIVATION</span>
                        <h4 className="text-[18px] font-black text-gray-900">나카도리(Naka-dori) 보행화</h4>
                        <p className="text-[12px] text-gray-500 font-bold mt-2">
                            • 차량 차도를 영구 보행광장으로 전환<br/>
                            • 가로수 식재 및 고급 테이블/의자 비치<br/>
                            • 연중 무휴 푸드트럭 및 오픈 마켓 유치
                        </p>
                    </div>

                    {/* 노드 3: 민관 파트너십 규제 완화 - 우측 하단 */}
                    <div className="absolute bottom-0 right-[20px] md:right-[80px] z-10 bg-white border-4 border-[#0f172a] rounded-none p-4 w-[240px] text-center shadow-lg">
                        <span className="text-[12px] font-black text-[#1e3a8a] block mb-1">REGULATORY LEAP</span>
                        <h4 className="text-[18px] font-black text-gray-900">도로 점용 규제 완화 협의</h4>
                        <p className="text-[12px] text-gray-500 font-bold mt-2">
                            • 공공 도로 상업 행위 허용권 취득<br/>
                            • 주변 빌딩들의 용적률 인센티브 획득<br/>
                            • 지구 내 자산들의 가치 선순환 보장
                        </p>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>미쓰비시 지쇼와 지자체가 OMY 지구에서 차도를 보행자 중심 광장 및 가로로 개조하는 사업 실행</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>도로 점용 기준 완화 및 상시적인 야외 문화 이벤트를 유치하여 빌딩 숲의 활력을 재생</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>개별 빌딩 수준을 넘어 지구 전체의 환경을 하나의 일관된 가치로 관리하는 거버넌스 체계 구축</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
