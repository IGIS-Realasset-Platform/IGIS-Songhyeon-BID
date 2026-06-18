import React, { useState } from 'react';

export default function Section47({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        미래 SBD-IBD 연계 비전
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    스마트 코어(AI·디지털 트윈) 및 블록체인 기반의 디지털 분담금 징수 구조
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: SBD 운영 OS의 이식과 AI 고도화 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Smart City OS Migration
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    이오타 서울의 운영 데이터 용산 전파
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🖥️ 디지털 트윈 통합 관제: 용산 IBD의 공중 스카이트레일 및 지하 공동물류를 3D 그래픽으로 완벽 모니터링
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🤖 AI 예측 수거: 센서 정보 분석을 통해 쓰레기 적체 및 유동 인구 과밀 구간을 예측하여 미화 요원 선배치
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🚗 자율 셔틀 제어: 49만㎡ 전체 부지 내 친환경 자율주행 셔틀의 안전 배차 및 동선 통제 OS 탑재
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 블록체인 기반 디지털 BID (Digital Assessment) */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Blockchain Assessment
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    스마트 컨트랙트를 통한 실시간 분담 정산
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🔗 블록체인 분담금: 입주 자산의 전력, 수도 사용량 및 보행 트래픽 변동을 고려한 스마트 계산</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>💸 자동 실시간 부과: 지자체의 재산세 고지서 대기 없이 스마트 계약으로 디지털 부과금 자동 징수</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🔑 분산 원장 기록: 징수와 지출 내역을 분산 원장에 영구 보존하여 거버넌스 투명성 100% 보장</span>
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
                            <span>5세대 디지털 BID 비전은 하드웨어 인프라에 첨단 소프트웨어(AI/블록체인)를 융합하여, 아날로그 행정 기반의 서구식 BID 한계를 극복하고 아시아형 스마트 도시 모델의 표준을 선점합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
