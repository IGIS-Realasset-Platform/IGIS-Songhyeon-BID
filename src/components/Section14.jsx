import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section14({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? 'BIA의 탄생: 토론토 Bloor West BIA' : 'BIA Birth: Toronto Bloor West Village'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    교외형 쇼핑몰 확산에 따른 도심 공동화 위기와 무임승차 문제의 발생
                </h2>

                {/* 다채로운 인포그래픽 영역 (2컬럼 격자를 탈피한 비대칭 충돌 구조) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[36px] flex flex-col lg:flex-row items-center justify-between gap-10 relative">
                    
                    {/* 좌측: 신흥 위협 (교외형 쇼핑몰) - 압도적인 다크 입체 블록 */}
                    <div className="w-full lg:w-[45%] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 text-left shadow-2xl relative overflow-hidden">
                        {/* 데코용 백그라운드 그리드 선 */}
                        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                        
                        <div className="relative z-10">
                            <span className="inline-block bg-[#e11d48] text-white text-[13px] font-black px-3 py-1 uppercase mb-4 tracking-wider">
                                Market Disruptor
                            </span>
                            <h3 className="text-[28px] font-black text-white leading-tight mb-2">
                                교외형 복합 쇼핑몰의 급부상
                            </h3>
                            <p className="text-gray-400 text-[15px] font-bold mb-6">
                                1960년대 북미 쇼핑 문화의 근본적 이동
                            </p>
                            
                            <div className="space-y-4">
                                <div className="border-l-4 border-[#3b82f6] bg-white/5 p-3">
                                    <span className="block text-white font-extrabold text-[16px]">🚗 무제한 무료 주차장 제공</span>
                                    <span className="text-[13px] text-gray-400">자가용 중심 소비 트렌드 완벽 부합</span>
                                </div>
                                <div className="border-l-4 border-[#3b82f6] bg-white/5 p-3">
                                    <span className="block text-white font-extrabold text-[16px]">🛍️ 원스톱 쾌적 실내 환경</span>
                                    <span className="text-[13px] text-gray-400">기후 영향이 없는 안전한 중앙 집중식 보행 공간</span>
                                </div>
                                <div className="border-l-4 border-[#3b82f6] bg-white/5 p-3">
                                    <span className="block text-white font-extrabold text-[16px]">📈 대형 백화점 앵커 유치</span>
                                    <span className="text-[13px] text-gray-400">집객력을 극대화하여 도심 가로 상점의 고객 흡수</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 중앙: 충돌 및 이탈 다이어그램 (기울어진 비대칭 연결선 및 이탈 지표) */}
                    <div className="hidden lg:flex flex-col items-center justify-center absolute left-[45%] right-[45%] top-1/2 -translate-y-1/2 z-20">
                        {/* 이탈률 지표 스펙트럼 */}
                        <div className="bg-[#e11d48] text-white border-2 border-white px-4 py-3 shadow-lg font-black text-center text-[18px] z-30">
                            <span className="block text-[12px] font-bold text-rose-200">TRAFFIC OUTFLOW</span>
                            <span>상권 고객 80% 이탈</span>
                        </div>
                        
                        {/* 비대칭 화살표 라인 (SVG) */}
                        <svg className="w-[120px] h-[60px] text-[#e11d48]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 100 50">
                            <path strokeDasharray="5,5" d="M 0,25 Q 50,0 100,25" />
                            <polygon points="90,15 100,25 90,35" fill="currentColor" />
                        </svg>
                    </div>

                    {/* 우측: 붕괴하는 도심 상권 (Bloor West St.) - 쇠퇴곡선 그래프 포함 */}
                    <div className="w-full lg:w-[45%] bg-white border-4 border-red-600 rounded-none p-8 text-left shadow-xl relative">
                        <span className="inline-block bg-[#e11d48] text-white text-[13px] font-black px-3 py-1 uppercase mb-4 tracking-wider">
                            Decaying Downtown
                        </span>
                        <h3 className="text-[28px] font-black text-gray-900 leading-tight mb-2">
                            토론토 Bloor West 가로 상권의 붕괴
                        </h3>
                        <p className="text-red-600 text-[15px] font-bold mb-4">
                            방치된 가로 환경과 상인들의 한계
                        </p>

                        {/* 쇠퇴 곡선 시각화 (SVG 차트 직접 드로잉) */}
                        <div className="w-full h-[120px] bg-red-50/50 border border-red-200 mb-6 p-4 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute inset-0 z-0">
                                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                                    {/* 쇠퇴 하강 라인 */}
                                    <path d="M 0,10 Q 150,20 300,90" fill="none" stroke="#e11d48" strokeWidth="4" />
                                    {/* 점선 가이드 */}
                                    <line x1="0" y1="90" x2="300" y2="90" stroke="#fca5a5" strokeWidth="1" strokeDasharray="3,3" />
                                </svg>
                            </div>
                            
                            <div className="relative z-10 flex justify-between h-full items-start">
                                <div className="text-left">
                                    <span className="block text-[11px] font-bold text-gray-500">1960년대 초</span>
                                    <span className="text-[16px] font-black text-gray-800">공실률 2% 이하</span>
                                </div>
                                <div className="text-right self-end">
                                    <span className="block text-[11px] font-bold text-red-500">1968년 말</span>
                                    <span className="text-[18px] font-black text-red-600">공실률 25% 돌파 ⚠️</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-[14px] text-gray-600 font-bold leading-relaxed">
                            🚧 가로등 노후화, 보도블록 유실, 청소 공백으로 밤거리가 어두워지며 슬럼화 발생. 상인 각자도생으로 활로 모색 불가.
                        </p>
                    </div>

                </div>

                {/* 하단: 무임승차 딜레마 (비대칭 수평 막대 그래프) */}
                <div className="w-full max-w-[1200px] bg-gray-50 border-4 border-gray-400 rounded-none p-6 text-left shadow-sm">
                    <h4 className="text-[18px] font-black text-gray-900 mb-3 uppercase tracking-tight">
                        자발적 협회의 치명적 무임승차(Free-Rider) 딜레마
                    </h4>
                    
                    {/* 수평 비대칭 그래프 */}
                    <div className="w-full h-10 bg-gray-200 flex rounded-none overflow-hidden mb-3 border border-gray-400">
                        {/* 25% 협조 상인 */}
                        <div className="w-[25%] bg-[#1e3a8a] text-white flex items-center justify-center font-black text-[14px]">
                            비용 분담 25%
                        </div>
                        {/* 75% 무임승차 상인 */}
                        <div className="w-[75%] bg-rose-500 text-white flex items-center justify-center font-black text-[14px]">
                            무임승차 75% (혜택만 독점)
                        </div>
                    </div>
                    
                    <div className="flex justify-between text-[13px] text-gray-600 font-bold">
                        <span>💰 "소수가 낸 가로 개선 비용으로 청결해진 거리"</span>
                        <span className="text-red-600">🚫 "아무 돈도 내지 않은 대다수 상인이 낙수 혜택 독점 ➔ 협회 회비 고갈 파산"</span>
                    </div>
                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>기부 형식의 자발적 협회가 지닌 무임승차 한계를 극복하기 위해 제도적 강제 과세의 필요성을 확인한 역사적 배경</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
