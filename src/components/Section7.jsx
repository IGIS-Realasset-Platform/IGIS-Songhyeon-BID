import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section7({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '타임스스퀘어 보행화 및 매출 폭등' : 'Times Square Pedestrianization'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    차도 축소와 광장 조성이 이끌어낸 보행량 11% 증가 및 매출 71% 폭등
                </h2>

                {/* 다채로운 인포그래픽 영역 (공간 구조 전/후 및 소매 매출 폭증 지표) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 보행광장(Pedestrian Plaza) 혁신 설계안 */}
                    <div className="w-full lg:w-[48%] bg-white border-4 border-[#0f172a] rounded-none p-8 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Jan Gehl's Spatial Redesign (2009)
                            </span>
                            <h3 className="text-[26px] font-black text-gray-900 mb-4 leading-tight">
                                차도를 차단한 영구 보행자 전용 공간
                            </h3>
                            <p className="text-gray-500 text-[14px] font-bold mb-6">
                                뉴욕시 교통국과 BID가 협업하여 브로드웨이 차도를 차단하고 임시 컬러 페인팅과 아웃도어 의자 배치
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-red-100 text-red-600 flex items-center justify-center font-black rounded-none">
                                        구
                                    </div>
                                    <span className="text-gray-700 font-bold text-[14px]">차량 혼잡, 매연, 협소한 보도로 보행 불가능</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center font-black rounded-none">
                                        신
                                    </div>
                                    <span className="text-gray-900 font-black text-[14px]">보행량 11% 즉각 상승 및 체류 시간 3배 연장</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-[#eff6ff] p-4 border border-blue-200">
                            <span className="text-[13px] font-bold text-gray-700 block">
                                💡 "보행자가 머물 수 있는 의자와 테이블을 비치하자마자, 가로 매장 매출이 상상을 초월해 급증하기 시작"
                            </span>
                        </div>
                    </div>

                    {/* 우측: 매출 폭증 지표 (대형 비대칭 보드) */}
                    <div className="w-full lg:w-[48%] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 text-left shadow-2xl flex flex-col justify-between text-white">
                        <div>
                            <span className="inline-block bg-[#e11d48] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Economic Performance Metrics
                            </span>
                            <h3 className="text-[26px] font-black text-white mb-6 leading-tight">
                                가로 보행화가 낳은 세수/매출 폭발 성과
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 border border-white/10 p-4">
                                    <span className="text-rose-300 font-extrabold text-[12px] block">소매 매장 매출</span>
                                    <span className="text-white text-[38px] font-black block my-1">+71%</span>
                                    <span className="text-[12px] text-gray-400 font-bold">도심 상권 역사적 신기록</span>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-4">
                                    <span className="text-rose-300 font-extrabold text-[12px] block">지구 연간 세수</span>
                                    <span className="text-white text-[38px] font-black block my-1">24억$</span>
                                    <span className="text-[12px] text-gray-400 font-bold">뉴욕 전체 세수의 지대한 축</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-4">
                            <span className="text-[13px] font-bold text-gray-400 block">
                                🔑 **보행 경제(Pedestrian Economy)**: 차도를 없애면 경제가 망할 것이라는 상인들의 우려를 완전히 불식하고, 보행자가 곧 돈이라는 명제를 실증한 전환점.
                            </span>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>기존 차도를 과감히 축소하고 보행자 중심 광장을 조성하여 통행량을 11% 이상 증가시킨 혁신</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>쾌적한 보행 환경 확보를 통해 광장 주변 상권의 소매 매출을 평균 71% 폭등시킨 성과</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>연간 뉴욕시와 주 정부에 총 24억 달러 이상의 신규 세수를 헌납하는 초우량 세원 지구로 변모</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
