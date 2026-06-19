import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section11({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '마루노우치 공실률 방어 및 거래' : 'Marunouchi Vacancy Defense'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    공실률 1.40% 유지와 건물주가 임차인을 선택하는 시장의 형성
                </h2>

                {/* 다채로운 인포그래픽 영역 (공실률 비교 게이지 바 및 거래 스펙 카드) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 압도적 공실 방어력 비교 (세로 게이지 디자인) */}
                    <div className="w-full lg:w-[48%] bg-white border-4 border-[#0f172a] rounded-none p-8 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Vacancy Rate Comparison
                            </span>
                            <h3 className="text-[26px] font-black text-gray-900 mb-6 leading-tight">
                                도쿄 평균 대비 절반 수준 이하인 OMY 지구
                            </h3>
                            
                            <div className="space-y-6">
                                {/* 지표 1 */}
                                <div>
                                    <div className="flex justify-between font-bold text-[15px] mb-1">
                                        <span className="text-gray-700">🌆 도심 주요 5개구 평균 공실률</span>
                                        <span className="text-gray-600 font-black">6.40%</span>
                                    </div>
                                    <div className="w-full h-5 bg-gray-200 border border-gray-400">
                                        <div className="h-full bg-gray-500" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                                
                                {/* 지표 2 */}
                                <div>
                                    <div className="flex justify-between font-bold text-[15px] mb-1">
                                        <span className="text-gray-700">🏢 마루노우치 OMY 지구 평균 공실률</span>
                                        <span className="text-blue-600 font-black">1.40% (사실상 완전 임차)</span>
                                    </div>
                                    <div className="w-full h-5 bg-gray-200 border border-gray-400">
                                        <div className="h-full bg-blue-600" style={{ width: '15%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-blue-50 p-4 border border-blue-200 text-[13px] font-bold text-gray-700">
                            📊 **완전 임차 도달 효과**: 공실률 1.4%는 자연 발생적인 공실 수준 이하로, 건물주가 입주 대기 임차인들을 면접하여 임차 업종과 브랜드를 골라서 받는 '임차인 선별제'를 가동하게 만듭니다.
                        </div>
                    </div>

                    {/* 우측: 거대 재개발 거래 스펙 및 혜택 (입체 다크 블록) */}
                    <div className="w-full lg:w-[48%] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 text-left shadow-2xl flex flex-col justify-between text-white relative">
                        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        
                        <div className="relative z-10">
                            <span className="inline-block bg-[#e11d48] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Asset Transaction Spec
                            </span>
                            <h3 className="text-[26px] font-black text-white mb-6 leading-tight">
                                역사적 재개발 거래 및 자산 가치 방어
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 border-l-4 border-yellow-500">
                                    <span className="block text-white font-black text-[16px]">💰 ¥4,200억 역사적 재개발 거래</span>
                                    <span className="text-[13px] text-yellow-300 font-bold">도쿄역 바로 뒤 빌딩 지분 거래로 사상 최고 지가 갱신</span>
                                </div>
                                <div className="bg-white/5 p-4 border-l-4 border-yellow-500">
                                    <span className="block text-white font-black text-[16px]">🏢 미쓰비시 지쇼의 포트폴리오</span>
                                    <span className="text-[13px] text-yellow-300 font-bold">OMY 지구 내 약 30개 동 오피스를 수직 계열화하여 자산 가치 상호 방증</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-4 relative z-10">
                            <span className="text-[13px] font-bold text-gray-400 block">
                                💡 "에리어 매니지먼트가 완성한 공간 브랜딩이 금융 위기나 장기 불황 속에서도 오피스 공실 대란을 차단하는 방어막 역할을 수행"
                            </span>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>지속적인 지역 가치 제고를 통해 경기 침체기에도 도심 오피스의 안정적인 초저공실률과 자산 가치를 방어하는 구조</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
