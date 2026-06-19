import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section16({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '뉴욕의 재정난과 치안 공백 해결' : 'NYC Financial Crisis & Crime Void'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    1970-80년대 뉴욕시 삼중고(재정난·범죄율·인프라 노후화)와 BID의 채택
                </h2>

                {/* 다채로운 인포그래픽 영역 (좌측 게이지 지표 vs 우측 자금 매커니즘 흐름) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 재정 붕괴의 통계 (게이지 바 형태) */}
                    <div className="w-full lg:w-[48%] bg-white border-4 border-red-600 rounded-none p-8 text-left shadow-lg">
                        <span className="inline-block bg-[#e11d48] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                            NYC Fiscal Deficit Metrics
                        </span>
                        <h3 className="text-[26px] font-black text-gray-900 mb-6 leading-tight">
                            뉴욕시 공공 서비스의 강제 감축 지표
                        </h3>
                        
                        {/* 세로 및 가로 게이지 리스트 */}
                        <div className="space-y-6">
                            {/* 지표 1 */}
                            <div>
                                <div className="flex justify-between font-bold text-[15px] mb-1">
                                    <span className="text-gray-700">👮 경찰/치안 인력 규모</span>
                                    <span className="text-red-600">-20% 삭감</span>
                                </div>
                                <div className="w-full h-4 bg-gray-200 border border-gray-400">
                                    <div className="h-full bg-red-600" style={{ width: '80%' }}></div>
                                </div>
                            </div>
                            
                            {/* 지표 2 */}
                            <div>
                                <div className="flex justify-between font-bold text-[15px] mb-1">
                                    <span className="text-gray-700">🧹 거리 미화 및 청소 예산</span>
                                    <span className="text-red-600">-35% 감축</span>
                                </div>
                                <div className="w-full h-4 bg-gray-200 border border-gray-400">
                                    <div className="h-full bg-red-600" style={{ width: '65%' }}></div>
                                </div>
                            </div>

                            {/* 지표 3 */}
                            <div>
                                <div className="flex justify-between font-bold text-[15px] mb-1">
                                    <span className="text-gray-700">🚨 미드타운 42번가 강력 범죄 건수</span>
                                    <span className="text-red-600">2.4배 폭등</span>
                                </div>
                                <div className="w-full h-4 bg-gray-200 border border-gray-400">
                                    <div className="h-full bg-red-600" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 민간 자기과세(Self-Taxation) 전환 구조 */}
                    <div className="w-full lg:w-[48%] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 text-left shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#1e3a8a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Private Self-Taxation Model
                            </span>
                            <h3 className="text-[26px] font-black text-white mb-4 leading-tight">
                                공공 공백을 채우는 민간 자조 전환구조
                            </h3>
                            <p className="text-gray-400 text-[14px] font-bold mb-6">
                                기업들이 본사이전을 결정하는 오피스 붕괴 직전에 소유주들이 결단한 전환 메커니즘
                            </p>

                            {/* 전환 다이어그램 박스 */}
                            <div className="bg-white/5 border border-white/20 p-5 relative">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center font-black rounded-none">
                                        위기
                                    </div>
                                    <span className="text-white font-extrabold text-[15px]">시 행정 서비스 중단 ➔ 상권 붕괴</span>
                                </div>
                                
                                <div className="w-full h-[2px] bg-white/20 my-3 relative">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f172a] px-3 text-[11px] font-black text-[#93c5fd]">
                                        TRANSITION
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-black rounded-none">
                                        자조
                                    </div>
                                    <span className="text-[#60a5fa] font-extrabold text-[15px]">소유주의 100% 분담금 추가 납세 ➔ 자체 해결</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-4">
                            <span className="text-[13px] font-bold text-gray-400">
                                💡 "일반 지방세로 해결할 수 없는 권역 특화 서비스를 민간의 목적 기금을 징수해 해결하겠다"는 최초의 선언.
                            </span>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr' ? '도시 재정 위기 시기에 정부 세부담 없이 민간이 스스로 기금을 모아 청소와 치안 등 기초 공공 서비스를 유지한 위기 대응책.' : 'A crisis response where the private sector self-funded basic services like cleaning and security during municipal fiscal crises.'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
