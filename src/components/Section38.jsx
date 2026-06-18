import React, { useState } from 'react';

export default function Section38({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        배제적 플레이스메이킹 갈등
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    보행 환경 개선이라는 명분 이면에 숨겨진 비공식 영세 상인 축출 논란
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 가로수 식재지 보호틀(Tree beds) 기형적 확장 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Strategic Tree Bed Expansion
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    가로 조경 설계를 활용한 물리적 점유 통제
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🌳 보호틀 면적 임의 확대: 5피트였던 기본 가로수 보호틀 규격을 12.5피트의 초대형 화단으로 변경 식재
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🚫 푸드트럭 주정차 불가: 보도 여백의 폭이 급격히 좁아져 영세 노점상의 카트 주차 및 영업이 불가능해짐
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 공공성 훼손과 젠트리피케이션 논쟁 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Gentification & Exclusion Controversy
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    도시 공공 공간의 상업적 지배 및 배제성
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🌭 노점상 축출: 길거리 대표 간식인 핫도그 등 영세 길거리 경제 주체를 인위적으로 퇴출</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🏢 민간 쇼핑몰 독점: 지구 방문자들의 F&B 수요를 관련 대기업 복합몰 내부로 의도적 감금 유도</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>⚖️ 공익과 사익의 충돌: 공원의 조경 개선이라는 명목과 소상공인 생존권 박탈 비판의 상충</span>
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
                            <span>허드슨야드의 가로수 화단 분쟁은 디자인(Design) 규격을 미묘하게 변경함으로써 사회적으로 불합리한 축출과 고급 상업 독점을 관철해낼 수 있는 에리어 매니지먼트의 어두운 이면을 실증합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
