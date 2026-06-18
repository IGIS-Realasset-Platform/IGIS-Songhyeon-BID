import React, { useState } from 'react';

export default function Section35({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        가로 환경 개선 사례
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    차량 중심의 미드블록을 넥다운(Neckdowns)과 조경을 통해 사람 중심으로 변경
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 개선 전 차량 중심 환경 (Before) */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Before: Vehicle-First Street
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    맨해튼 37번가 미드블록(9-11번가 사이)
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🚗 과도한 차도폭: 불법 주정차가 상시 발생하고 통과 차량들의 과속 유발
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🚶‍♀️ 협소한 인도폭: 보행자 통행 교차가 불편하여 입주민과 오피스 근무자의 보행 회피
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏚️ 노후 인프라: 조경 및 휴게 시설이 전무하여 슬럼화 및 도시 열섬 현상 가중
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 개선 후 보행자 친화 환경 (After) */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    After: Human-Scale Placemaking
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    MNLA(Mathews Nielsen) 조경 설계 반영 결과
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚶‍♂️ 넥다운(Neckdowns) 공사: 보행 대기 구간의 보도를 확장하고 차도를 기능적으로 축소</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🌳 입체 가로 조경: 풍부한 다년생 화초와 가로수를 대대적으로 식재하여 숲길 조성</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🛋️ 공공 벤치 설치: 보행 피로를 해소하고 거리에서의 대화를 유도하는 휴게 플랫폼 마련</span>
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
                            <span>37번가 보행자 친화 가로 개선은 도시 도로를 단순 차량 흐름의 파이프로 보지 않고, 지역의 자산 매력도를 높이는 '장소(Place)'로 적극 재정의한 대표적 사례입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
