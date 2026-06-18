import React, { useState } from 'react';

export default function Section44({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        자산 가치 프리미엄 구조
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    자연발생적 집적을 넘어 자산 가치에 운영 성과를 내장시키는 한국 최초의 시도
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 단순 입지(Location) 중심의 기존 패러다임 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Location-Only Value
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    기존 업무지구(CBD/GBD/YBD)의 단순 집적 구조
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📍 지리적 의존: 전철역 및 주요 도로 교차점이라는 물리적 위치에만 전적으로 의존
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏚️ 방치형 환경: 개별 분양 및 관리 주체 상이로, 빌딩 문 밖 가로 공간 노화 급속 방치
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📉 가치 정체: 주변 환경의 낙후로 인해 시간이 흐를수록 자산 단독 리모델링 외에 가치 보존 한계
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 에리어 매니지먼트 운영(Operation)의 가치 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Operation-Embedded Premium
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    SBD의 한국형 타운 매니지먼트 적용안
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🔑 통합 제어: 이지스 중심의 밸류애드 플랫폼을 활용, 개별 건물 경계를 허물고 단지 전체 통합 관리</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🧹 프리미엄 케어: 가로 전용 고정 정비단 투입으로 서울에서 가장 청결하고 안전한 보행 가로 유지</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🎨 소프트웨어 내재: 야외 전시, 음악 페스티벌, 플리마켓 등을 연중 지속 실행하여 상시 활력 주입</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>SBD(Station/Seoul Business District)는 빌딩 내부 스펙에 그치지 않고, 가로와 커뮤니티라는 전체 공간 인프라의 '운영 매니지먼트' 품질을 자산 가치에 직접 내장시키는 한국 부동산 금융의 전환점입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
