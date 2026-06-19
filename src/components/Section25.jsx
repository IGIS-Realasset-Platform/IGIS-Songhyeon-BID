import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section25({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? 'Kessler 판결: 1인 1표 원칙 예외' : 'Kessler Case: Exception of One-Person-One-Vote'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    Kessler v. Grand Central DMA 판결이 인정한 부동산 소유자 편중 의결권
                </h2>

                {/* 대칭형 법정 공방 테이블 */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[36px] flex flex-col lg:flex-row gap-8 justify-center items-stretch relative">
                    
                    {/* Left: 원고 Kessler의 주장 (Plaintiff's Challenge) */}
                    <div className="w-full lg:w-[48%] border-4 border-[#0f172a] bg-white p-6 text-left flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#e11d48] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Plaintiff's Argument
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-2">
                                원고: Kessler & 지역 거주민
                            </h3>
                            <p className="text-red-600 text-[15px] font-bold mb-6">
                                헌법상 "1인 1표(One Person, One Vote)" 평등권 주장
                            </p>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-red-50/50 border border-red-200">
                                    <span className="block font-black text-[16px] text-gray-900">⚖️ 수정헌법 제14조 평등권 침해</span>
                                    <span className="text-[13px] text-gray-600">지구관리협회(DMA)는 세금을 징수하고 치안/미화를 집행하므로 사실상의 지방 행정 기구라고 주장</span>
                                </div>
                                <div className="p-4 bg-red-50/50 border border-red-200">
                                    <span className="block font-black text-[16px] text-gray-900">🚫 부동산 소유자 이사회 독점 반대</span>
                                    <span className="text-[13px] text-gray-600">소유주 지분 비율 과반을 강제한 조례는 주거용 세대와 일반 상인의 민주적 투표 지분을 훼손하여 불평등 유발</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 중앙 법정 가위 바위 보 / 판결 아이콘 */}
                    <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#0f172a] text-white border-4 border-white rounded-none z-10">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M12 3v18M3 12h18M6 8l-3 4 3 4M18 8l3 4-3 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {/* Right: 연방 법원의 최종 판시 (Federal Court Ruling) */}
                    <div className="w-full lg:w-[48%] border-4 border-[#0f172a] bg-[#0f172a] p-6 text-left text-white flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Federal Court Decision
                            </span>
                            <h3 className="text-[24px] font-black mb-2">
                                연방 제2항소법원 판결
                            </h3>
                            <p className="text-blue-300 text-[15px] font-bold mb-6">
                                "제한 목적 특수 실체(Special/Limited Purpose Entity)" 인정
                            </p>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 border border-white/10">
                                    <span className="block font-black text-[16px] text-[#93c5fd]">🏛️ 일반 행정 공권력의 부재</span>
                                    <span className="text-[13px] text-gray-300">BID는 형사법 집행, 교육, 조세율 결정 등 일반 시 정부 수준의 절대적 통제 권한이 없음을 선언</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10">
                                    <span className="block font-black text-[16px] text-[#93c5fd]">🔑 비례적 책임/의결권 용인</span>
                                    <span className="text-[13px] text-gray-300">실질 세원 부담자인 부동산 소유자가 더 큰 리스크를 안고 있으므로, 1인 1표 헌법주의 예외 적용 합법 판결</span>
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
                            <span>{lang === 'kr' ? '자산 규모에 비례한 의결권 배분이 합헌임을 인정한 판례로, 투자 비례 효율성과 공공 책임성의 균형을 인정한 결정.' : 'A precedent confirming property-weighted voting is constitutional, balancing investment efficiency and public accountability.'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
