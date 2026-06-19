import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section45({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#0f172a] mb-[12px]">{lang === 'kr' ? 'SBD BID 도입 전/후 목표 지표 시나리오' : 'Quantitative Target Scenarios'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    공실률 2%대 달성 및 주변 임대료 10~20% 프리미엄 창출의 목표
                </h2>

                {/* 다채로운 인포그래픽 영역 (정량적 시나리오 KPI 대시보드) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    
                    {/* 카드 1: 공실률 */}
                    <div className="bg-white border-2 border-[#0f172a] rounded-none p-5 text-left shadow-lg flex flex-col justify-between h-[280px]">
                        <div>
                            <span className="text-[11px] font-black text-[#0f172a] block mb-1">METRIC 01</span>
                            <h3 className="text-[20px] font-black text-gray-900 mb-4">공실률 방어 (Vacancy)</h3>
                            
                            <div className="flex items-baseline gap-2 mt-4">
                                <span className="text-gray-400 text-[18px] line-through font-bold">7.5%</span>
                                <span className="text-[36px] font-black text-blue-600">2.0%</span>
                                <span className="text-[12px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 mb-1">-5.5%p</span>
                            </div>
                            <p className="text-[12px] text-gray-500 font-bold mt-2">
                                글로벌 앵커 및 에코 테넌트 사전 임차 매칭을 통한 초저공실 사수
                            </p>
                        </div>
                        <div className="w-full h-2 bg-gray-100 mt-4">
                            <div className="h-full bg-blue-600" style={{ width: '27%' }}></div>
                        </div>
                    </div>

                    {/* 카드 2: 임대 프리미엄 */}
                    <div className="bg-white border-2 border-[#0f172a] rounded-none p-5 text-left shadow-lg flex flex-col justify-between h-[280px]">
                        <div>
                            <span className="text-[11px] font-black text-[#0f172a] block mb-1">METRIC 02</span>
                            <h3 className="text-[20px] font-black text-gray-900 mb-4">임대 프리미엄</h3>
                            
                            <div className="flex items-baseline gap-2 mt-4">
                                <span className="text-gray-400 text-[18px] line-through font-bold">평균가</span>
                                <span className="text-[36px] font-black text-[#10b981]">+15%</span>
                                <span className="text-[12px] font-black text-[#10b981] bg-emerald-50 px-2 py-0.5 mb-1">Premium</span>
                            </div>
                            <p className="text-[12px] text-gray-500 font-bold mt-2">
                                통합 가로 경관 가치 및 웰니스를 확보한 에리어 매니지먼트 프리미엄
                            </p>
                        </div>
                        <div className="w-full h-2 bg-gray-100 mt-4">
                            <div className="h-full bg-[#10b981]" style={{ width: '85%' }}></div>
                        </div>
                    </div>

                    {/* 카드 3: 보행 유동인구 */}
                    <div className="bg-white border-2 border-[#0f172a] rounded-none p-5 text-left shadow-lg flex flex-col justify-between h-[280px]">
                        <div>
                            <span className="text-[11px] font-black text-[#0f172a] block mb-1">METRIC 03</span>
                            <h3 className="text-[20px] font-black text-gray-900 mb-4">보행 유동인구</h3>
                            
                            <div className="flex items-baseline gap-2 mt-4">
                                <span className="text-gray-400 text-[18px] font-bold">Base</span>
                                <span className="text-[36px] font-black text-purple-600">+35%</span>
                                <span className="text-[12px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 mb-1">Increase</span>
                            </div>
                            <p className="text-[12px] text-gray-500 font-bold mt-2">
                                남산 보행축 개선 및 상설 문화행사 유입 효과로 일반 보행객 유입 극대화
                            </p>
                        </div>
                        <div className="w-full h-2 bg-gray-100 mt-4">
                            <div className="h-full bg-purple-600" style={{ width: '65%' }}></div>
                        </div>
                    </div>

                    {/* 카드 4: 가로 환경 만족도 */}
                    <div className="bg-[#0f172a] border-2 border-[#0f172a] rounded-none p-5 text-left shadow-2xl flex flex-col justify-between h-[280px]">
                        <div>
                            <span className="text-[11px] font-black text-yellow-400 block mb-1">METRIC 04</span>
                            <h3 className="text-[20px] font-black text-white mb-4">안전 및 쾌적도</h3>
                            
                            <div className="flex items-baseline gap-2 mt-4">
                                <span className="text-gray-400 text-[18px] line-through font-bold">60%</span>
                                <span className="text-[36px] font-black text-yellow-400">95%</span>
                                <span className="text-[12px] font-black text-yellow-400 bg-white/10 px-2 py-0.5 mb-1">Satisfaction</span>
                            </div>
                            <p className="text-[12px] text-gray-300 font-bold mt-2">
                                전용 청소/보안 스태프 상주 배치를 통한 무결점 공공 케어 완성
                            </p>
                        </div>
                        <div className="w-full h-2 bg-white/10 mt-4">
                            <div className="h-full bg-yellow-400" style={{ width: '95%' }}></div>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>타운 매니지먼트 실행 시 기대되는 정량적 재무 및 임대 지표 시나리오</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
