import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section22({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '보완적 서비스(Supplemental) 원칙' : 'Supplemental Services'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    기존 시의 행정 서비스를 대체하지 않고 추가적으로 보완하는 원칙
                </h2>

                {/* 대칭형 비교 테이블 (3. 대칭 밸런스시트형) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[36px] flex flex-col lg:flex-row gap-8 justify-center items-stretch relative">
                    
                    {/* Left Column: 시 정부 행정 서비스 (Base-Level) */}
                    <div className="w-full lg:w-[48%] border-4 border-[#0f172a] bg-white p-6 text-left flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-gray-400 text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Base-Level Services
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-2">
                                시 정부 기본 행정 서비스
                            </h3>
                            <p className="text-gray-500 text-[15px] font-bold mb-6">
                                시가 세금으로 의무 제공하는 표준 공공 서비스
                            </p>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 border border-gray-200">
                                    <span className="block font-black text-[16px] text-gray-900">👮 일반 치안 및 소방</span>
                                    <span className="text-[13px] text-gray-500 font-bold">일반 경찰 순찰 노선 운영 및 형사 사건사고 처리</span>
                                </div>
                                <div className="p-4 bg-gray-50 border border-gray-200">
                                    <span className="block font-black text-[16px] text-gray-900">🚛 표준 위생 청소</span>
                                    <span className="text-[13px] text-gray-500 font-bold">도로 위 가로 쓰레기 수거함 비우기 및 일일 청소</span>
                                </div>
                                <div className="p-4 bg-gray-50 border border-gray-200">
                                    <span className="block font-black text-[16px] text-gray-900">⚠️ 행정 철수 금지 (Base-Level Lock-in)</span>
                                    <span className="text-[13px] text-gray-500 font-bold">시 정부는 BID 구역 지정 후 기존 투입 자원을 축소할 수 없음</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 중앙 경계선 및 VS 표시 */}
                    <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#0f172a] text-white border-4 border-white font-black text-[18px] z-10">
                        VS
                    </div>

                    {/* Right Column: BID의 보완적 서비스 (Supplemental) */}
                    <div className="w-full lg:w-[48%] border-4 border-[#0f172a] bg-[#0f172a] p-6 text-left text-white flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Supplemental Services
                            </span>
                            <h3 className="text-[24px] font-black mb-2">
                                BID 보완적 스페셜 서비스
                            </h3>
                            <p className="text-blue-300 text-[15px] font-bold mb-6">
                                DMA 주도로 추가 제공하는 부가가치 서비스
                            </p>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 border border-white/10">
                                    <span className="block font-black text-[16px] text-white">🧹 고밀도 위생 케어</span>
                                    <span className="text-[13px] text-gray-300 font-bold">매일 수회 가로 빗자루 청소 및 정기 고압수 물세척</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10">
                                    <span className="block font-black text-[16px] text-white">🛡️ 민간 전용 순찰대</span>
                                    <span className="text-[13px] text-gray-300 font-bold">비무장 순찰 요원 배치, 취약점 모니터링, 안전 핫라인 가동</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10">
                                    <span className="block font-black text-[16px] text-white">🎨 적극적 플레이스메이킹</span>
                                    <span className="text-[13px] text-gray-300 font-bold">화단 가로수 가로등 미화, 특별 축제 개최, 공공 디자인 적용</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>지방 정부와 체결하는 '기준 서비스 수준 협약서(Base Level Agreement)'를 통해 시 재정 부족에 따른 공적 책임을 민간에 무단 전가(Shifting)하는 부작용을 사전에 완벽히 통제합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
