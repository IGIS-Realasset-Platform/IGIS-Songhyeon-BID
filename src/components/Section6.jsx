import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section6({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#10b981] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '타임스스퀘어의 재생 (After 1992)' : 'Times Square Regeneration (After 1992)'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    Times Square Alliance BID 설립 후 범죄율 97% 감소의 실증
                </h2>

                {/* 다채로운 인포그래픽 영역 (얼라이언스 실드 뱃지 및 범죄 감소 곡선) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: Times Square Alliance BID의 파수꾼 모델 */}
                    <div className="w-full lg:w-[48%] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 text-left shadow-2xl flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#10b981] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Private Protection Force
                            </span>
                            <h3 className="text-[26px] font-black text-white mb-4 leading-tight">
                                자체 미화단 및 민간 순찰대(PSA) 가동
                            </h3>
                            <p className="text-gray-400 text-[14px] font-bold mb-6">
                                시 경찰과 연계하는 무장 해제 민간 경비단(Public Safety Officers)을 24시간 도심에 배치
                            </p>

                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 border-l-4 border-[#10b981]">
                                    <span className="block text-white font-extrabold text-[16px]">🧹 24시간 쓰레기 수거 및 고압 살수</span>
                                    <span className="text-[13px] text-gray-400">깨진 유리창 이론 차단: 낙서와 전단을 2시간 내에 완전 제거</span>
                                </div>
                                <div className="bg-white/5 p-4 border-l-4 border-[#10b981]">
                                    <span className="block text-white font-extrabold text-[16px]">👮 NYPD 공동 밀착 협업</span>
                                    <span className="text-[13px] text-gray-400">무전 채널 공유 및 매주 범죄 핫스팟 정보를 공유하여 예방 배치</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-4">
                            <span className="text-[13px] font-bold text-gray-400">
                                💡 "단순 순찰에 그치지 않고, 가로등 조도를 3배 높이고 노상 불법 행위를 민관 합동으로 지속 단속"
                            </span>
                        </div>
                    </div>

                    {/* 우측: 범죄 급감 실증 곡선 (SVG 드로잉 포함) */}
                    <div className="w-full lg:w-[48%] bg-white border-4 border-[#0f172a] rounded-none p-8 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Empirical Crime Drop
                            </span>
                            <h3 className="text-[26px] font-black text-gray-900 mb-4 leading-tight">
                                범죄 해방구 딱지를 뗀 대전환 지표
                            </h3>

                            {/* 감소 추이 SVG 곡선 */}
                            <div className="w-full h-[150px] bg-emerald-50/50 border border-emerald-200 p-4 mb-6 relative overflow-hidden">
                                <div className="absolute inset-0">
                                    <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                                        <path d="M 10,10 L 100,20 L 200,90 L 290,110" fill="none" stroke="#10b981" strokeWidth="4" />
                                        <circle cx="10" cy="10" r="5" fill="#10b981" />
                                        <circle cx="290" cy="110" r="5" fill="#10b981" />
                                    </svg>
                                </div>
                                
                                <div className="relative z-10 flex justify-between h-full items-start">
                                    <div>
                                        <span className="block text-[11px] font-bold text-gray-500">1992 (BID 설립)</span>
                                        <span className="text-[15px] font-black text-gray-800">범죄 최고점 기록</span>
                                    </div>
                                    <div className="text-right self-end">
                                        <span className="block text-[11px] font-bold text-emerald-600">1998~현재</span>
                                        <span className="text-[18px] font-black text-[#10b981]">전체 범죄 97% 감소 🎉</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 border border-gray-200">
                            <span className="text-[13px] font-bold text-gray-600 block">
                                🔑 **지구 청결 관리와 범죄 예방의 인과성**: 깨진 유리창 이론을 도시 행정에 완벽히 이식하여, 깨끗하고 조명이 밝아진 거리에 우범 분자들이 스스로 자취를 감춤.
                            </span>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#10b981]">▪</span>
                            <span>전담 안전/청소 인력 상주 등 민간 거버넌스의 신속한 의사결정으로 범죄율을 획기적으로 낮춘 혁신 사례</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
