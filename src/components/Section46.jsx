import React, { useState } from 'react';

export default function Section46({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        용산 IBD 타운매니지먼트 당위성
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    14.3조 초대형 용산 개발을 조율할 초광역 거버넌스 도입의 필연성
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 용산국제업무지구 개발 마스터 스펙 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Yongsan IBD Scale
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    코레일 & SH공사 주도 메가프로젝트
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    💰 14.3조 사업비: 단일 도심 개발 역사상 단연 세계적 스케일의 메가 파이낸싱
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏢 100층 랜드마크: 49만㎡ 부지에 상징적인 하이라이트 복합 타워 배치
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🌉 스카이 트레일 (Sky Trail): 마천루 40층 레벨을 둥글게 잇는 공중 보행 인프라 기획
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 타운 매니지먼트의 통합 조율 임무 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Mega Governance Imperative
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    파편적 빌딩별 관리를 넘는 초광역 운영 시스템
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚚 공동 물류 제어: 지하 공동물류 하역장 및 자율 로봇 배송 경로의 일괄 관제권 확보</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🌉 스카이트레일 운영: 여러 빌딩에 걸쳐 있는 공중 보행 데크의 시설 정비, 대피 계획, 상업 연계 일괄 수행</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>⚖️ 거버넌스 단일화: 코레일, SH, 민간 디벨로퍼들이 의결 보드를 공유하는 단일 운영기구(DMA) 조기 법제화</span>
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
                            <span>용산국제업무지구는 극도로 복잡한 입체 도시 설계(지하-지상-공중)를 수반하므로, 물리적 완공 이전에 전체 타운의 혈맥을 제어할 전문 타운 매니지먼트의 기획이 절대적인 선제 조건입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
