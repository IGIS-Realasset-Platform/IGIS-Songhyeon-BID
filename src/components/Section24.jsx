import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section24({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '4단계 설립 프로세스 타임라인' : '4-Stage Roadmap'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    기획에서 출범까지 평균 3~6년이 소요되는 정교한 민주적 의사결정 과정
                </h2>

                {/* 타임라인 트랙형 인포그래픽 */}
                <div className="w-full max-w-[1250px] mt-[30px] mb-[30px] relative">
                    
                    {/* 가로 트랙 라인 (데스크탑) */}
                    <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-1 bg-[#0f172a] -z-10"></div>
                    
                    {/* 4단계 카드 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        {/* 1단계 */}
                        <div className="bg-white border-4 border-[#0f172a] p-5 text-left flex flex-col justify-between shadow-sm relative">
                            {/* 단계 넘버링 뱃지 */}
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#0f172a] text-white flex items-center justify-center font-black text-[15px]">
                                01
                            </div>
                            <div className="mt-2">
                                <span className="block font-black text-[18px] text-gray-900 mb-1">🗺️ 기획 및 설계</span>
                                <span className="text-[12px] bg-gray-100 text-gray-600 px-2 py-0.5 font-bold uppercase inline-block mb-3">Planning</span>
                                <p className="text-[13.5px] text-gray-600 font-bold leading-relaxed">
                                    • 핵심 건물주 발기인단 구성<br />
                                    • 대상 필지 정밀 획정 (Boundary)<br />
                                    • 지구별 도시 기본 현황 조사 실시
                                </p>
                            </div>
                        </div>

                        {/* 2단계 */}
                        <div className="bg-white border-4 border-[#0f172a] p-5 text-left flex flex-col justify-between shadow-sm relative">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#0f172a] text-white flex items-center justify-center font-black text-[15px]">
                                02
                            </div>
                            <div className="mt-2">
                                <span className="block font-black text-[18px] text-gray-900 mb-1">📢 홍보 및 동의 획득</span>
                                <span className="text-[12px] bg-gray-100 text-gray-600 px-2 py-0.5 font-bold uppercase inline-block mb-3">Outreach</span>
                                <p className="text-[13.5px] text-gray-600 font-bold leading-relaxed">
                                    • 정기 공청회 및 건물주 서명회<br />
                                    • 소상공인 젠트리피케이션 대책 논의<br />
                                    • 과반수 동의율 확보 (서명 수집)
                                </p>
                            </div>
                        </div>

                        {/* 3단계 */}
                        <div className="bg-[#0f172a] border-4 border-[#0f172a] p-5 text-left text-white flex flex-col justify-between shadow-md relative">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#3b82f6] text-white flex items-center justify-center font-black text-[15px]">
                                03
                            </div>
                            <div className="mt-2">
                                <span className="block font-black text-[18px] text-white mb-1">⚖️ 공청회 및 입법화</span>
                                <span className="text-[12px] bg-white/10 text-gray-300 px-2 py-0.5 font-bold uppercase inline-block mb-3">Legislative</span>
                                <p className="text-[13.5px] text-gray-300 font-bold leading-relaxed">
                                    • 시 정부 주관 공식 청문회 개최<br />
                                    • 법정 이의 신청서 접수 및 타당성 심사<br />
                                    • 시의회 최종 설립 조례안 통과
                                </p>
                            </div>
                        </div>

                        {/* 4단계 */}
                        <div className="bg-[#0f172a] border-4 border-[#0f172a] p-5 text-left text-white flex flex-col justify-between shadow-md relative">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#3b82f6] text-white flex items-center justify-center font-black text-[15px]">
                                04
                            </div>
                            <div className="mt-2">
                                <span className="block font-black text-[18px] text-white mb-1">🚀 법인 설립 및 출범</span>
                                <span className="text-[12px] bg-white/10 text-gray-300 px-2 py-0.5 font-bold uppercase inline-block mb-3">Startup</span>
                                <p className="text-[13.5px] text-gray-300 font-bold leading-relaxed">
                                    • 비영리법인(DMA) 정식 법인 등기<br />
                                    • 시 재무국과 분담금 수납 위탁 계약<br />
                                    • 첫 특별부과금 징수 및 청소/보안 개시
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>평균 수년의 소요 기간은 주민간의 합의 강도와 법적 타당성을 검증하기 위한 불가피한 제도적 안전망이며, 이를 성공적으로 마친 BID만이 장기 지속성을 보장받습니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
