import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section5({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#e11d48] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '타임스스퀘어의 몰락 (Before 1984)' : 'Times Square Ruin (Before 1984)'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    세계 최악의 우범 지대였던 42번가 타임스스퀘어의 실태
                </h2>

                {/* 다채로운 인포그래픽 영역 (슬럼 크라이시스 스탯 맵) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 성인 상점 난립 및 가로 붕괴 요인 */}
                    <div className="w-full lg:w-[48%] bg-white border-4 border-[#0f172a] rounded-none p-8 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Street Decay Factors
                            </span>
                            <h3 className="text-[26px] font-black text-gray-900 mb-6 leading-tight">
                                성인 유흥업 점령과 가로 환경 붕괴
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="border-l-4 border-red-600 bg-red-50/20 p-4">
                                    <span className="block text-gray-900 font-extrabold text-[16px]">🔞 성인 상점 난립</span>
                                    <span className="text-[13px] text-gray-500">42번가 일대 150여 개 성인 극장 및 유흥 상점 무질서 점령</span>
                                </div>
                                <div className="border-l-4 border-red-600 bg-red-50/20 p-4">
                                    <span className="block text-gray-900 font-extrabold text-[16px]">🚬 비공식 마약 밀매 거점</span>
                                    <span className="text-[13px] text-gray-500">조도 부족과 치안 공백을 틈탄 뉴욕 최대의 마약 소매 기지화</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-red-50 border border-red-200 p-4 text-[13px] font-bold text-red-700">
                            ⚠️ **주변 부동산의 파탄**: 임차인을 구하지 못한 빌딩 소유주들이 고의 방화나 관리를 방치하여 빌딩 붕괴 현상 다수 발생.
                        </div>
                    </div>

                    {/* 우측: 타임스스퀘어 범죄 위기 수치 (각진 레드 슬럼 블록) */}
                    <div className="w-full lg:w-[48%] bg-[#4c0519] border-4 border-[#4c0519] rounded-none p-8 text-left shadow-2xl flex flex-col justify-between text-white relative">
                        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        
                        <div className="relative z-10">
                            <span className="inline-block bg-[#e11d48] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Slum Crisis Stats (Before 1984)
                            </span>
                            <h3 className="text-[26px] font-black text-white mb-8 leading-tight">
                                통제력을 상실했던 공권력 지표
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/5 border border-white/10 p-5">
                                    <span className="block text-rose-300 text-[12px] font-extrabold">강력 범죄 건수</span>
                                    <span className="text-white text-[38px] font-black leading-none block my-2">연 2,300건</span>
                                    <span className="text-[12px] text-rose-200 font-semibold">도심 최악의 범죄율</span>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-5">
                                    <span className="block text-rose-300 text-[12px] font-extrabold">주변 오피스 가치</span>
                                    <span className="text-white text-[38px] font-black leading-none block my-2">-50% 폭락</span>
                                    <span className="text-[12px] text-rose-200 font-semibold">기업 이탈 가속화</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-4 relative z-10">
                            <span className="text-[13px] font-bold text-rose-200 block">
                                🚨 "관광객들이 낮에도 절대 진입을 기피하여 맨해튼의 얼굴이었던 타임스스퀘어가 우범지대의 대명사로 전락"
                            </span>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-red-600">▪</span>
                            <span>{lang === 'kr' ? '치안 공백과 유흥업 난립이 도심 전체의 공실률과 자산 가치 폭락에 미치는 부정적 영향 분석.' : 'Analysis showing the negative impact of security voids and chaotic adult businesses on downtown vacancy and asset values.'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
