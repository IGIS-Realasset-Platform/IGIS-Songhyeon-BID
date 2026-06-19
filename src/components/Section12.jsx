import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section12({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '롯폰기힐스 복합 생태계 부가가치' : 'Roppongi Hills Ecosystem Value'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    일, 휴식, 주거, 예술이 결합되어 투자가치 60% 순증을 달성한 비결
                </h2>

                {/* 다채로운 인포그래픽 영역 (롯폰기 힐스 수직 정원 도시 단면도 스택 및 성과 카드) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: Vertical Garden City 수직 적층 스택 (단면 시각화) */}
                    <div className="w-full lg:w-[48%] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 text-left shadow-2xl flex flex-col justify-between text-white">
                        <div>
                            <span className="inline-block bg-[#1e3a8a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Vertical Garden City Concept
                            </span>
                            <h3 className="text-[26px] font-black text-white mb-6 leading-tight">
                                롯폰기 힐스 모리타워의 복합 용도 수직 구성
                            </h3>

                            {/* 빌딩 단면 스택 */}
                            <div className="space-y-2">
                                {/* 스택 1 */}
                                <div className="bg-white/10 p-3 border-l-4 border-rose-500">
                                    <span className="block font-black text-[15px] text-white">🎨 TOP LEVEL (52F ~ 54F)</span>
                                    <span className="text-[12px] text-gray-400 font-bold">Mori Art Museum (미술관), 도심 전망대, 롯폰기 힐즈 클럽</span>
                                </div>
                                {/* /스택 2 */}
                                <div className="bg-white/10 p-3 border-l-4 border-blue-500">
                                    <span className="block font-black text-[15px] text-white">💼 MIDDLE LEVEL (7F ~ 51F)</span>
                                    <span className="text-[12px] text-gray-400 font-bold">골드만삭스, 구글 등 글로벌 금융/IT 앵커 기업 오피스</span>
                                </div>
                                {/* 스택 3 */}
                                <div className="bg-white/10 p-3 border-l-4 border-yellow-500">
                                    <span className="block font-black text-[15px] text-white">🏨 LOWER LEVEL & GROUND (B6F ~ 6F)</span>
                                    <span className="text-[12px] text-gray-400 font-bold">Grand Hyatt Hotel, 로드 매장, 아사히TV, 정원 공원, 주거동 연계</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-4">
                            <span className="text-[13px] font-bold text-gray-400 block">
                                💡 "일과 생활, 여가와 문화가 단 한 보의 수직 동선으로 해결되는 수직 계열 생태계 구축"
                            </span>
                        </div>
                    </div>

                    {/* 우측: 투자 가치 순증 및 성과 지표 (각진 보드) */}
                    <div className="w-full lg:w-[48%] bg-white border-4 border-[#0f172a] rounded-none p-8 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Economic Valuation
                            </span>
                            <h3 className="text-[26px] font-black text-gray-900 mb-6 leading-tight">
                                복합 용도 시너지가 낳은 자산가치 폭증
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 border border-blue-200 p-4">
                                    <span className="text-gray-500 font-extrabold text-[12px] block">투자 가치 상승률</span>
                                    <span className="text-blue-600 text-[36px] font-black block my-1">+60%</span>
                                    <span className="text-[12px] text-gray-600 font-bold">준공 후 자산 가치 순증</span>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 p-4">
                                    <span className="text-gray-500 font-extrabold text-[12px] block">오피스 공실률</span>
                                    <span className="text-blue-600 text-[36px] font-black block my-1">0%대</span>
                                    <span className="text-[12px] text-gray-600 font-bold">도쿄 평균 압도적 방어</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 border border-gray-200 text-[13px] font-bold text-gray-600">
                            🔑 **지속적인 문화 인센티브**: 모리 미술관(Mori Art Museum)을 통해 연중 예술 프로그램을 상시 가동하여, 단순 빌딩 숲이 아닌 **도쿄에서 가장 방문하고 싶은 복합 문화 타운**의 지위를 유지함.
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>롯폰기 힐스는 도시를 단순 기능적으로 분할하지 않고, 수직 복합 단일 빌딩 내에 다채로운 목적(Work, Live, Play, Art)을 융합시킬 때 유발되는 가치 시너지를 증명한 대표적 랜드마크입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
