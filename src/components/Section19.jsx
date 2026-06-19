import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section19({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '특별부과지구(SAD) 지정 요건' : 'Special Assessment District'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    부동산 소유주 및 사업자의 과반수 동의를 통한 특별부과지구의 지정
                </h2>

                {/* 다채로운 인포그래픽 영역 (좌우 대칭형 입체 밸런스시트) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-center gap-8 relative z-10">
                    
                    {/* 좌측: 매사추세츠주 엄격 동의 기준 */}
                    <div className="flex-1 bg-white border-4 border-[#0f172a] rounded-none p-8 text-left shadow-lg relative flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#1e3a8a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Massachusetts State Code
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-6">
                                소유자 서명 & 평가액 가중 동의 요건
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-bold">소유자 동의 비율</span>
                                    <span className="text-[#1e3a8a] font-black text-[20px]">60% 이상 서명</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-bold">대상 토지 가치 합산</span>
                                    <span className="text-[#1e3a8a] font-black text-[20px]">51% 초과 찬성</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-bold">공청회 이의 제기</span>
                                    <span className="text-gray-800 font-bold">30일 이내 서면 제출</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 bg-blue-50 p-4 border border-blue-200">
                            <span className="text-[13px] font-bold text-gray-600 block">
                                💡 "소수의 대형 건물주 독주와 대다수 영세 건물주 소외를 균형 있게 막기 위해 가장 까다로운 승인 허들을 설정"
                            </span>
                        </div>
                    </div>

                    {/* 중앙: 승인 스탬프 이미지 (CSS 시각화) */}
                    <div className="hidden lg:flex flex-col items-center justify-center relative w-12">
                        <div className="w-[120px] h-[120px] rounded-full border-4 border-dashed border-[#e11d48] flex items-center justify-center rotate-12 bg-white/80 absolute shadow-lg z-20">
                            <span className="text-[#e11d48] font-black text-[20px] tracking-widest uppercase">APPROVED</span>
                        </div>
                    </div>

                    {/* 우측: 캘리포니아주 비례부담 및 Prop 13 수혜 */}
                    <div className="flex-1 bg-white border-4 border-[#0f172a] rounded-none p-8 text-left shadow-lg relative flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                California Prop 13 & Prop 218
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-6">
                                비례적 부담금 한도 & 투표 요건
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-bold">과세 요율 한도</span>
                                    <span className="text-gray-900 font-black text-[20px]">Prop 13 연동 제한</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-bold">동의서 합산 기준</span>
                                    <span className="text-gray-900 font-black text-[20px]">평가액 비례 투표</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-bold">반대 청원 파기권</span>
                                    <span className="text-[#e11d48] font-black text-[20px]">50% 초과 시 자동파기</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-rose-50 p-4 border border-rose-200">
                            <span className="text-[13px] font-bold text-gray-600 block">
                                💡 "납세자 권리 보장(Prop 218)에 의거하여, 각 건물주가 낼 부과금이 당해 지구로부터 받게 될 실질적 혜택에 엄밀히 비례함을 입증해야 함"
                            </span>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>설립 합법성을 획득하기 위한 주별 동의율 기준은 각 지역의 소유자 구성 특성과 역사적 법률 조례(Prop 13 등)에 연동되어 정교한 사법 감시 하에 징수 정당성을 방어합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
