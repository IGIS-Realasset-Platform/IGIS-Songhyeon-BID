import React, { useState } from 'react';

export default function Section34({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        지속가능한 공원 운영
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    공공 인프라를 민간 BID가 기부채납 형태로 완벽하게 위탁 관리하는 혁신
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 소유권과 위탁의 분리 메커니즘 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Public Ownership & Private Operation
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    뉴욕시 공원국(DPR)과의 법적 계약 구조
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🌳 공원 부지 소유: 뉴욕시 정부 소유권을 명확히 유지하여 사유화 시비 차단
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📜 장기 관리 위탁: HYHK BID가 모든 일상적 조경, 청소, 시설 유지 보수를 완전 대행
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🔒 공공 안전 책임: 뉴욕경찰(NYPD)과 협업하는 사설 보안 요원 정기 순찰 실시
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 민간 기법 도입을 통한 가치 극대화 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Flexible Asset Activation
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    지속 가능한 운영 재원 및 프로그램
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🍔 상업 키오스크: 공원 내 푸드 코트/키오스크 임대 권한을 BID가 행사하여 자체 운영 수입화</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🎨 문화 활성화: 조각품 야외 전시, 음악회 개최 등으로 공공공간을 고급 마케팅 장소화</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🧹 예산 절감: 시 예산 없이 오직 BID 분담금과 자체 임대료 수익만으로 공원을 철저히 청결 유지</span>
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
                            <span>벨라 압죽 공원은 공기업의 느리고 비효율적인 사후 관리 관성을 탈피하고, 신속하고 영리한 민간 에리어 매니지먼트(Area Management) 기법을 장착하여 연중 무결점 상태를 사수합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
