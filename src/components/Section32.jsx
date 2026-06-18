import React, { useState } from 'react';

export default function Section32({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        허드슨야드 거버넌스 층위
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    인허가, 개발, 그리고 입주 후 장기 관리로 이어지는 수직 통합적 관리 구조
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 행정 및 개발 인프라 구축 권한 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Planning & Execution
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    공공 인허가 권한과 민간 시공의 조화
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏛️ 뉴욕시(NYC) 행정 당국: 용도 지역 변경(Re-zoning)과 세금 캡처(PILOT) 조례 제정 등 법적 승인 제공
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏢 Related & Oxford (디벨로퍼): 복합 지구 설계, 자금 조달, 건설 및 글로벌 선도 기업 테넌트 유치
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 입주 후 장기 자산 관리 거버넌스 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Long-term Operation (HYHK BID)
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    준공 후 공간 관리 및 가치 방어 주체
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🧹 공공 기부채납 부지(벨라 압죽 공원 등)의 상시 유지 관리 및 보안 위탁 집행</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🎨 가로 마케팅 및 지구 활성화 소프트웨어 프로그램 기획/운용</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🔄 상시 피드백: 자산가치와 공공 보행 환경을 지켜내기 위한 소유자·시 간 가교 역할</span>
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
                            <span>건물 준공이 끝난 후 디벨로퍼가 철수하더라도, 특별부과지구(BID)가 바통을 이어받아 동일한 프리미엄 품질로 공공 공간과 주변 환경을 무한 루프로 유지 관리하는 거버넌스 메커니즘입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
