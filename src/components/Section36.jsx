import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section36({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '벨라 압죽 공원 소모스 댄스 파티' : 'SOMOS Latin Dance Party'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    차갑고 삭막한 고층 빌딩 숲을 인간 중심의 활력 공간으로 바꾸는 문화의 힘
                </h2>

                {/* 다차원 스탯 및 스케줄 카드 영역 (5. 다차원 스탯카드형) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[36px] flex flex-col lg:flex-row gap-8 justify-between items-stretch">
                    
                    {/* Left: SOMOS 프로그램 대시보드 */}
                    <div className="w-full lg:w-[48%] border-4 border-[#0f172a] bg-[#0f172a] p-6 text-left text-white flex flex-col justify-between shadow-md">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Programming Schedule
                            </span>
                            <h3 className="text-[24px] font-black mb-6">
                                SOMOS 라틴 댄스 파티 운용
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border border-white/10 bg-white/5 p-4">
                                    <span className="block text-[11px] text-gray-400 font-bold">📆 가동 기간</span>
                                    <span className="text-[18px] font-black text-[#93c5fd]">매년 5월 ~ 9월</span>
                                </div>
                                <div className="border border-white/10 bg-white/5 p-4">
                                    <span className="block text-[11px] text-gray-400 font-bold">⏰ 개최 요일</span>
                                    <span className="text-[18px] font-black text-[#93c5fd]">매주 목요일 (퇴근길)</span>
                                </div>
                                <div className="col-span-2 border border-white/10 bg-white/5 p-4">
                                    <span className="block text-[11px] text-gray-400 font-bold">🕺 주요 프로그램</span>
                                    <span className="text-[15px] font-bold text-white leading-relaxed">
                                        실시간 라틴 라이브 밴드 연주 및 전문 댄스 코치 야외 무료 강습
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: 상권 파급 효과 스탯 보드 */}
                    <div className="w-full lg:w-[48%] border-4 border-[#0f172a] bg-white p-6 text-left flex flex-col justify-between shadow-sm">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Economic & Social Impact
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-6">
                                공간 활성화로 발생하는 실질 가치
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="border border-[#0f172a] p-4 flex justify-between items-center bg-gray-50">
                                    <span className="font-extrabold text-[15px] text-gray-800">👥 주간 집객 규모</span>
                                    <span className="text-[20px] font-black text-gray-900">수천 명 단위 자발적 유입</span>
                                </div>
                                <div className="border border-[#0f172a] p-4 flex justify-between items-center bg-gray-50">
                                    <span className="font-extrabold text-[15px] text-gray-800">🍔 인근 상권 F&B 매출</span>
                                    <span className="text-[20px] font-black text-[#ef4444]">+20% 이상 매출 급증 📈</span>
                                </div>
                                <div className="border border-[#0f172a] p-4 bg-[#0f172a] text-white">
                                    <span className="block font-black text-[14px] text-[#93c5fd] mb-1">🏢 테넌트 락인 효과 (Trophy Tenants)</span>
                                    <p className="text-[13px] text-gray-300 font-bold leading-relaxed">
                                        콘크리트 빌딩 숲 내부의 독자적 문화 복지 제공을 통해 글로벌 혁신 기업들의 장기 임차 지속 견인
                                    </p>
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
                            <span>매년 5~9월 벨라 압죽 공원에서 가동되는 라틴 댄스 등 다채로운 상시 문화 프로그래밍</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
