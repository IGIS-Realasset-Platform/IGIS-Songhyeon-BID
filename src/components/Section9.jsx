import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section9({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '허드슨야드 트로피타워 임대료' : 'Hudson Yards Trophy Rent'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    미드타운 평균 대비 10~20% 임대료 할증을 지불하는 글로벌 테넌트
                </h2>

                {/* 다채로운 인포그래픽 영역 (임대 단가 비교 막대 게이지 및 글로벌 앵커 테넌트 그리드) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 임대 스펙 비교 (막대 게이지 모델) */}
                    <div className="w-full lg:w-[48%] bg-white border-4 border-[#0f172a] rounded-none p-8 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Rent Premium Comparison
                            </span>
                            <h3 className="text-[26px] font-black text-gray-900 mb-6 leading-tight">
                                미드타운 평균 대비 압도적 임대 스펙
                            </h3>
                            
                            <div className="space-y-6">
                                {/* 지표 1 */}
                                <div>
                                    <div className="flex justify-between font-bold text-[15px] mb-1">
                                        <span className="text-gray-700">🏢 허드슨야드 트로피 타워군 (10/30 HY 등)</span>
                                        <span className="text-blue-600 font-black">$120 ~ $150 / SF</span>
                                    </div>
                                    <div className="w-full h-5 bg-gray-200 border border-gray-400">
                                        <div className="h-full bg-blue-600" style={{ width: '100%' }}></div>
                                    </div>
                                </div>
                                
                                {/* 지표 2 */}
                                <div>
                                    <div className="flex justify-between font-bold text-[15px] mb-1">
                                        <span className="text-gray-700">🌆 맨해튼 미드타운 평균 임대 가격</span>
                                        <span className="text-gray-600 font-black">$80 ~ $95 / SF</span>
                                    </div>
                                    <div className="w-full h-5 bg-gray-200 border border-gray-400">
                                        <div className="h-full bg-gray-500" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-blue-50 p-4 border border-blue-200 text-[13px] font-bold text-gray-700">
                            📈 **프리미엄 지불 의사**: KKR, BlackRock 등 글로벌 IB들은 임직원 리텐션을 위한 최고 환경 보장을 위해 평방피트당 $140 이상의 초고가 임대료를 기꺼이 승인함.
                        </div>
                    </div>

                    {/* 우측: 입주 글로벌 앵커 현황 (비대칭 카드 그리드) */}
                    <div className="w-full lg:w-[48%] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 text-left shadow-2xl flex flex-col justify-between text-white">
                        <div>
                            <span className="inline-block bg-[#e11d48] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Global Anchor Tenants
                            </span>
                            <h3 className="text-[26px] font-black text-white mb-6 leading-tight">
                                허드슨야드 주요 마천루별 입주사 스펙
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 border-l-4 border-yellow-500">
                                    <span className="block text-white font-black text-[16px]">🏢 30 Hudson Yards (100층 타워)</span>
                                    <span className="text-[13px] text-yellow-300 font-bold">KKR, Wells Fargo, WarnerMedia 본사 입주</span>
                                </div>
                                <div className="bg-white/5 p-4 border-l-4 border-yellow-500">
                                    <span className="block text-white font-black text-[16px]">🏢 50 Hudson Yards (신축 앵커)</span>
                                    <span className="text-[13px] text-yellow-300 font-bold">BlackRock (명목 임대 면적 최대 규모), Meta 입주</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-4">
                            <span className="text-[13px] font-bold text-gray-400 block">
                                💡 "초고층 빌딩 내부 레이아웃과 공원 전망, 보행자 친화 환경이 글로벌 공룡 IT/금융 회사 유치의 킬러 컨텐츠가 됨"
                            </span>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr' ? '글로벌 하이테크 및 금융 앵커 임차인들이 직원 생산성 향상을 위해 고액의 임대료 할증을 수용하는 현상.' : 'A trend where global high-tech and finance anchor tenants accept high rent premiums to enhance employee productivity.'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
