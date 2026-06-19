import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section17({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '필라델피아 Center City District 성공' : 'Philadelphia CCD Success Case'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    'BID 방법론의 교과서'가 증명한 실증 성과와 1,000여 개 지구로의 확산
                </h2>

                {/* 다채로운 인포그래픽 영역 (지구 현황판 대시보드 및 빅 스타트 그리드) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 폴 레비의 CCD 운영 설계 핵심 (포커스 카드) */}
                    <div className="w-full lg:w-[42%] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 text-left shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#1e3a8a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Operating Standard
                            </span>
                            <h3 className="text-[26px] font-black text-white mb-4 leading-tight">
                                CCD 과학적 도시 관리 기법
                            </h3>
                            <p className="text-gray-400 text-[14px] font-bold mb-6">
                                단순 가로 청소를 넘어 범죄 예방과 성과 측정을 전용 매뉴얼화한 혁신 사례
                            </p>

                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 border-l-4 border-yellow-500">
                                    <span className="block text-white font-extrabold text-[16px]">👮 CSR 전담 예방 순찰</span>
                                    <span className="text-[13px] text-gray-400">민간 가이드 요원 배치를 통한 범죄 예방 환경 설계(CPTED)</span>
                                </div>
                                <div className="bg-white/5 p-4 border-l-4 border-yellow-500">
                                    <span className="block text-white font-extrabold text-[16px]">📊 정량적 세척/미화 지표</span>
                                    <span className="text-[13px] text-gray-400">가로 청결 수준을 지표화하여 매일 등급을 매겨 이사회에 공표</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-4">
                            <span className="text-[13px] font-bold text-yellow-400">
                                💡 "치안과 위생을 민간 비영리 협회가 브랜드 자산화하여 고객 만족도를 계량화함"
                            </span>
                        </div>
                    </div>

                    {/* 우측: 실증적 파급 지표 (비대칭 입체 빅 스탯 그리드) */}
                    <div className="w-full lg:w-[54%] flex flex-col justify-between gap-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                            {/* 빅스탯 1 */}
                            <div className="bg-white border-4 border-[#0f172a] rounded-none p-6 text-left shadow-md flex flex-col justify-between">
                                <div>
                                    <span className="block text-gray-400 font-extrabold text-[12px] uppercase">Crime Reduction</span>
                                    <span className="block text-[44px] font-black text-red-600 leading-none my-2">-50%</span>
                                    <span className="text-[15px] text-gray-800 font-extrabold">강력 범죄율의 급격한 반감</span>
                                </div>
                                <span className="text-[12px] text-gray-500 font-bold block mt-3">CCD 출범 후 5년 내 실측 통계</span>
                            </div>

                            {/* 빅스탯 2 */}
                            <div className="bg-white border-4 border-[#0f172a] rounded-none p-6 text-left shadow-md flex flex-col justify-between">
                                <div>
                                    <span className="block text-gray-400 font-extrabold text-[12px] uppercase">Visitor Satisfaction</span>
                                    <span className="block text-[44px] font-black text-blue-600 leading-none my-2">90%+</span>
                                    <span className="text-[15px] text-gray-800 font-extrabold">지구 청결 및 치안 만족도</span>
                                </div>
                                <span className="text-[12px] text-gray-500 font-bold block mt-3">방문객 및 소매점 설문 조사 결과</span>
                            </div>

                            {/* 빅스탯 3 */}
                            <div className="bg-white border-4 border-[#0f172a] rounded-none p-6 text-left shadow-md flex flex-col justify-between">
                                <div>
                                    <span className="block text-gray-400 font-extrabold text-[12px] uppercase">State Legislation</span>
                                    <span className="block text-[44px] font-black text-[#1e3a8a] leading-none my-2">40개 주</span>
                                    <span className="text-[15px] text-gray-800 font-extrabold">미국 전역 주법 제정 확산</span>
                                </div>
                                <span className="text-[12px] text-gray-500 font-bold block mt-3">미국 내 40개 주에서 합법성 인가</span>
                            </div>

                            {/* 빅스탯 4 */}
                            <div className="bg-white border-4 border-[#0f172a] rounded-none p-6 text-left shadow-md flex flex-col justify-between">
                                <div>
                                    <span className="block text-gray-400 font-extrabold text-[12px] uppercase">Total Active BIDs</span>
                                    <span className="block text-[44px] font-black text-[#10b981] leading-none my-2">1,000개+</span>
                                    <span className="text-[15px] text-gray-800 font-extrabold">미국 전역 BID 지자체 붐</span>
                                </div>
                                <span className="text-[12px] text-gray-500 font-bold block mt-3">CCD 모델을 표준으로 삼아 전국 확산</span>
                            </div>
                        </div>

                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>가로 미화와 도보 순찰 등 가장 기초적인 치안/환경 관리가 지역 상권 부활로 이어진 명확한 인과관계 증명</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
