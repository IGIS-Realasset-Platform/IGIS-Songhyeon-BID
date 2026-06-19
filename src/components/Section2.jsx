import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section2({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#e11d48] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '브라이언트 파크의 쇠퇴 (Before 1980s)' : 'Bryant Park Decline (Before 1980s)'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    1980년대 미드타운 한복판의 마약 밀매 거점과 강력범죄의 해방구
                </h2>

                {/* 다채로운 인포그래픽 영역 (도심 슬럼 공원의 위험구역 지도 모델) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 마약 밀매 거점화된 공원 평면도 및 위험 반경 (SVG) */}
                    <div className="w-full lg:w-[48%] bg-white border-4 border-red-600 rounded-none p-8 text-left shadow-lg relative">
                        <span className="inline-block bg-[#e11d48] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                            Slum Park Zone Map
                        </span>
                        <h3 className="text-[26px] font-black text-gray-900 mb-4 leading-tight">
                            뉴욕공공도서관 뒤편의 치안 붕괴 영역
                        </h3>

                        {/* 슬럼 지대 레이아웃 SVG */}
                        <div className="w-full h-[180px] bg-gray-100 border border-gray-300 relative flex items-center justify-center">
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="none">
                                {/* 도서관 블록 */}
                                <rect x="30" y="30" width="100" height="120" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                                <text x="80" y="95" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold">NY Public Library</text>
                                
                                {/* 브라이언트 공원 영역 */}
                                <rect x="160" y="30" width="210" height="120" fill="#fee2e2" stroke="#fca5a5" strokeWidth="2" />
                                <text x="265" y="95" textAnchor="middle" fill="#b91c1c" fontSize="12" fontWeight="black">Bryant Park (위험구역)</text>
                                
                                {/* 마약 거래 경고 지점 반경 */}
                                <circle cx="230" cy="70" r="25" fill="#f43f5e" fillOpacity="0.3" stroke="#e11d48" strokeWidth="2" strokeDasharray="3,3" />
                                <circle cx="310" cy="110" r="20" fill="#f43f5e" fillOpacity="0.3" stroke="#e11d48" strokeWidth="2" strokeDasharray="3,3" />
                            </svg>
                            <div className="absolute top-[55px] left-[205px] bg-[#e11d48] text-white text-[10px] font-black px-1.5 py-0.5">
                                마약 밀매 거점
                            </div>
                            <div className="absolute top-[95px] left-[285px] bg-[#e11d48] text-white text-[10px] font-black px-1.5 py-0.5">
                                강력범죄 빈발
                            </div>
                        </div>

                        <p className="text-[14px] text-gray-600 font-bold leading-relaxed mt-4">
                            🚧 공원 내부 통행로가 어둡고 밀폐되어 보행자가 회피함에 따라 자연스럽게 노숙자와 마약 범죄자들의 아지트로 전락함.
                        </p>
                    </div>

                    {/* 우측: 범죄 지표 및 예산 포기 실태 */}
                    <div className="w-full lg:w-[48%] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 text-left shadow-2xl flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#e11d48] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                Abandoned Public Service
                            </span>
                            <h3 className="text-[26px] font-black text-white mb-6 leading-tight">
                                범죄 지표 및 시의 행정 포기 실태
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 border-l-4 border-red-500">
                                    <span className="block text-white font-extrabold text-[18px]">🚨 연간 500건+ 강력범죄</span>
                                    <span className="text-[13px] text-gray-400">살인, 무장강도, 총격 사건 등 미드타운 내 범죄 최다 발생지</span>
                                </div>
                                <div className="bg-white/5 p-4 border-l-4 border-red-500">
                                    <span className="block text-white font-extrabold text-[18px]">🚫 시 정부 예산 지원 0$</span>
                                    <span className="text-[13px] text-gray-400">재정난을 이유로 뉴욕시 공원국이 청소와 보수 예산을 전면 철회</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-4">
                            <span className="text-[13px] font-bold text-gray-400">
                                💡 "대낮에도 시민들이 진입을 기피하여 미드타운 전체의 부동산 자산 가치를 훼손한 도시 흉물로 전락"
                            </span>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-red-600">▪</span>
                            <span>예산 지원 중단과 치안 부재로 인해 핵심 도심 공원이 급격히 슬럼화된 대표적 사례</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
