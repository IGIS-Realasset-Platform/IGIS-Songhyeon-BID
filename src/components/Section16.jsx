import React, { useState } from 'react';

export default function Section16({ isActive }) {
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
                    1970-80년대 뉴욕시 삼중고(재정난·범죄율·인프라 노후화)와 BID의 채택
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 뉴욕시 디폴트 위기 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    NYC Fiscal Crisis (1975)
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    공공 행정 서비스의 전면적 기능 마비
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    📉 1975년 뉴욕시 모라토리엄 선언 직전의 파산 위기 봉착
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    🧹 청소 예산 및 안전 인력 감축으로 거리의 쓰레기 적체 및 치안 악화
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    🏢 미드타운 내 대기업들이 교외 및 타 주로 본사를 이전하는 대탈출 발생
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 민간 자조(Self-Help)와 자기과세 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Self-Taxation Mechanism
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    민간 재원을 통한 공공재 공급의 정당성 확보
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>"내 빌딩 앞의 환경은 내가 돈을 더 내서라도 지키겠다"는 소유주들의 연대</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>일반 시세(Tax)와 구분되는 목적세적 특별 부과금(Assessment)의 법제화 요구</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>민간 재원 조달 + 민간 직접 집행 구조를 시와 주정부가 합법적으로 수용</span>
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
                            <span>지방 정부의 재무 붕괴로 야기된 청결과 치안 공백을 우량 건물주들이 '추가적인 자기 과세(Self-taxation)'를 통해 자율적으로 해소하며 도심을 지켜내기 시작했습니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
