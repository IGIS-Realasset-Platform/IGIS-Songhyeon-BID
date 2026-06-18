import React, { useState } from 'react';

export default function Section17({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        미국 BID의 역사적 확산
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    'BID 방법론의 교과서'가 증명한 실증 성과와 1,000여 개 지구로의 확산
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 필라델피아 CCD의 출범 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Philadelphia CCD (1991)
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    폴 레비(Paul Levy) 주도의 과학적 지구 운영
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    👮 CSR(Community Service Representatives) 파견을 통한 밀착 안내 및 예방 치안
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    🧹 '청소 전후 조도와 청결 수준' 계량화 시스템 등 정량 평가 프레임워크 구축
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    🏢 미드타운 소유주들의 장기 서면 동의를 기반으로 한 안정적 특별세 수입 구조
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 전국적 확산 성과 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Proven Empirical Results
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    미국 전역 40개 주 확산 로드맵의 모태
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>설립 5년 이내 강력 범죄 50% 급감 및 방문객 만족도 90% 이상 도달</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>투자 대비 세입 증대 유발 효과 10배 달성으로 입주 기업 리턴 가속화</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>미국 40개 주 1,000개 이상 도시 상업 지구가 벤치마킹하는 국가적 모델 정립</span>
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
                            <span>필라델피아 CCD(Center City District)는 BID 운영을 단순 청소 대행이 아닌 정량화된 경영 지표 관리와 전문 행정 구조로 고도화하여 미국식 BID의 전형을 정립했습니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
