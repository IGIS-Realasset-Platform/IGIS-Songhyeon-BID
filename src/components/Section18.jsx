import React, { useState } from 'react';

export default function Section18({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        BID의 학술적/법적 성격
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    보충적이고 배타적인 공공재를 특정 구역에 한정하여 제공하는 거버넌스
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 민간 정부(Private Governments) 이론 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Theoretical Foundation
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    헬슬리 & 스트레인지(Helsley & Strange, 1998) 정의
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    🏛️ 공공 행정이 충족시키지 못하는 특정 상업 권역 전용 공공재 생산 실체
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    🏠 구역 내 부동산 가치 보존과 직결된 전용 청소, 치안, 환경 서비스 위탁
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[17px]">
                                    🌐 '사적 클럽재(Club Goods)' 성격의 혜택을 클럽 가입(자기과세)자에게 배타적 교부
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 공권력 위임 및 독점 메커니즘 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Delegated Authority
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    공법상의 강제력과 사법상의 효율적 집행
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>의무 강제 징수권: 지방세법에 준하여 미납 시 압류 등 법적 강제 절차 가능</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>서비스 독점: 시 정부와의 계약을 통해 당해 권역의 공간 관리 권리를 독점 위임</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[17px]">
                                    <span>의사결정 주도: 관료주의를 탈피하여 민간 이사회가 예산과 집행을 신속 결정</span>
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
                            <span>학술적으로 BID는 공공의 세금 강제권과 민간의 전문 경영 기법을 결합하여, 지구 내 자산 가치를 고속 방어하는 '민간 정부(Private Government)' 이론의 핵심 실증체입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
