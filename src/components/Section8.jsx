import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section8({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '허드슨야드 혁신: 입지 vs 장소' : 'Hudson Yards Innovation'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    전통적 "입지(Location)" 패러다임을 파괴한 최초의 공간 가치 선언
                </h2>

                {/* 다채로운 인포그래픽 영역 (Location vs Place 입체 대조 및 임대 프리미엄) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-center gap-8 relative z-10">
                    
                    {/* 좌측: 전통적인 입지론 (Location) */}
                    <div className="flex-1 bg-white border-4 border-gray-300 rounded-none p-8 text-left shadow-sm flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-gray-200 text-gray-700 text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Legacy Real Estate Theory
                            </span>
                            <h3 className="text-[24px] font-black text-gray-500 mb-6">
                                외생적 입지 결정론 (Location)
                            </h3>
                            
                            <div className="space-y-4 text-gray-500 font-bold text-[15px]">
                                <div className="pb-2 border-b border-gray-200">
                                    • 전철역과의 단순 거리(도보 분수) 위주 평가
                                </div>
                                <div className="pb-2 border-b border-gray-200">
                                    • 전통적으로 형성된 강남/여의도 등 간판 입지 의존
                                </div>
                                <div className="pb-2 border-b border-gray-200">
                                    • 건물 단독 빌딩 스펙과 로비 내부 마감 중심 관리
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 bg-gray-100 p-4 border border-gray-200">
                            <span className="text-[13px] font-bold text-gray-500 block">
                                🚧 "빌딩 바깥 가로 환경이 아무리 황폐하고 쓰레기가 넘쳐도 소유주가 제어하지 못하는 방치형 구조"
                            </span>
                        </div>
                    </div>

                    {/* 중앙: 임대 프리미엄 충격 뱃지 */}
                    <div className="hidden lg:flex flex-col items-center justify-center relative w-12">
                        <div className="w-[130px] h-[130px] rounded-none bg-[#e11d48] border-4 border-[#0f172a] flex flex-col items-center justify-center rotate-6 text-white shadow-2xl z-20 p-2 text-center">
                            <span className="text-[10px] font-bold text-rose-200 uppercase">RENT SURGE</span>
                            <span className="text-[28px] font-black block leading-none my-1">+40%</span>
                            <span className="text-[11px] font-bold">임대료 프리미엄</span>
                        </div>
                    </div>

                    {/* 우측: 신흥 장소성 중심 가치 창출 (Place) */}
                    <div className="flex-1 bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 text-left shadow-2xl flex flex-col justify-between text-white">
                        <div>
                            <span className="inline-block bg-[#1e3a8a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                5th Generation Area Management
                            </span>
                            <h3 className="text-[24px] font-black text-white mb-6">
                                통합 장소 가치 창조론 (Place)
                            </h3>
                            
                            <div className="space-y-4 text-gray-300 font-bold text-[15px]">
                                <div className="pb-2 border-b border-white/10">
                                    • 지구 전체의 쾌적성, 청결, 보안을 하나의 브랜딩으로 통합 통제
                                </div>
                                <div className="pb-2 border-b border-white/10">
                                    • 야외 광장, 아트 갤러리, 정기 이벤트(소프트웨어)의 상시 프로그래밍
                                </div>
                                <div className="pb-2 border-b border-white/10">
                                    • 빌딩 로비를 넘어 '가로수, 보도, 대중교통 인프라'까지 민간이 제어
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-white/10 p-4 border border-white/20">
                            <span className="text-[13px] font-bold text-gray-300 block">
                                🚀 "Related 컨소시엄은 버려진 철도 기지 위를 뉴욕에서 가장 힙한 '장소'로 둔갑시켜, 미드타운 평균 대비 40% 높은 임대료 프리미엄을 방어함"
                            </span>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr' ? '물리적 입지의 한계를 뛰어넘어 독창적인 장소 가치 창조로 주변 시세 대비 프리미엄을 확보한 개발 방식.' : 'A development model that overcame physical location limits by creating unique place value to secure premium rent.'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
