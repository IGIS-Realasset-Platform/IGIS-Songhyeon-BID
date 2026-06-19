import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section3({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#10b981] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '브라이언트 파크의 부활 (After 1988)' : 'Bryant Park Revival (After 1988)'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    BID 법인 설립과 전면 리노베이션을 통한 도심 광장의 대전환
                </h2>

                {/* 다채로운 인포그래픽 영역 (BPC 예산 다이어그램 및 대형 성과 그리드) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: Bryant Park Corporation (BPC) 예산 조달 자급 구조 (SVG) */}
                    <div className="w-full lg:w-[48%] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 text-left shadow-2xl flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#10b981] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                BPC Financial Autonomy
                            </span>
                            <h3 className="text-[26px] font-black text-white mb-4 leading-tight">
                                시 지원금 0원의 자립형 예산 구조
                            </h3>
                            <p className="text-gray-400 text-[14px] font-bold mb-6">
                                부동산 소유주 특별부과금과 자체 사업 수익(키오스크 임대, 이벤트 등)만으로 3,000만 달러 예산 달성
                            </p>

                            {/* 예산 분배 비율 시각화 */}
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between font-bold text-[14px] text-gray-300 mb-1">
                                        <span>🏢 주변 소유주 특별부과금 (Assessment)</span>
                                        <span className="text-yellow-400">40%</span>
                                    </div>
                                    <div className="w-full h-3 bg-gray-700">
                                        <div className="h-full bg-yellow-400" style={{ width: '40%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between font-bold text-[14px] text-gray-300 mb-1">
                                        <span>🎟️ 공원 자체 상업 수익 (매점, 스케이트장, 스폰서십)</span>
                                        <span className="text-[#10b981]">60%</span>
                                    </div>
                                    <div className="w-full h-3 bg-gray-700">
                                        <div className="h-full bg-[#10b981]" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-4">
                            <span className="text-[13px] font-bold text-gray-400">
                                💡 "시 예산에 의존하지 않아 관료주의적 결재를 피하고, 오직 상권 가치 보존에만 전념하여 신속히 집행"
                            </span>
                        </div>
                    </div>

                    {/* 우측: 리노베이션 성과 지표 (각진 성과 스탯 그리드) */}
                    <div className="w-full lg:w-[48%] bg-white border-4 border-[#0f172a] rounded-none p-8 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Performance Outcomes (Post-1988)
                            </span>
                            <h3 className="text-[26px] font-black text-gray-900 mb-6 leading-tight">
                                범죄 해방구에서 뉴욕 최고 명소로의 도약
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-emerald-50 border border-emerald-200 p-4">
                                    <span className="block text-gray-500 text-[12px] font-extrabold">강력 범죄율</span>
                                    <span className="text-[#10b981] text-[36px] font-black leading-none block my-1">0%</span>
                                    <span className="text-[12px] text-gray-600 font-bold">슬럼가 완전 탈피</span>
                                </div>
                                <div className="bg-emerald-50 border border-emerald-200 p-4">
                                    <span className="block text-gray-500 text-[12px] font-extrabold">연간 방문객</span>
                                    <span className="text-[#10b981] text-[36px] font-black leading-none block my-1">1,200만</span>
                                    <span className="text-[12px] text-gray-600 font-bold">인구 밀집도 최고 도달</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-gray-50 p-4 border border-gray-200 text-[13px] font-bold text-gray-600">
                            🛋️ **혁신 기법**: 못박힌 벤치를 치우고, 프랑스 뤽상부르 공원 스타일의 **이동식 개별 의자 2,000개**를 배치해 시민들이 보행과 쉼을 스스로 조율하도록 자율성 부여.
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#10b981]">▪</span>
                            <span>{lang === 'kr' ? '민간 비즈니스 기법과 자체 재원 마련을 통해 도심 공공 공간을 복합 문화 랜드마크로 전환한 성공 모델.' : 'Success model of turning a decaying public space into a cultural landmark using private business methods and self-funding.'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
