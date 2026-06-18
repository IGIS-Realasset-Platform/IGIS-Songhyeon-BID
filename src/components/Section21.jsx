import React, { useState } from 'react';

export default function Section21({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        BID 재무 관리 프로세스
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    가로 접면, 부지 면적, 감정평가액 등 자산 특성에 맞춘 분담금 배분
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 분담금 산정의 3대 매개변수 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Assessment Parameters
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    형평성 있는 과세를 위한 변수 조합
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📏 가로 접면 길이 (Frontage): 보행자 청소와 경관 개선 혜택에 직접 비례
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📐 총 연면적 (Gross Square Footage): 오피스 빌딩 등의 자산 규모 반영
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    💵 세금 감정가 (Assessed Value): 실질 담세력과 자산 가치 수익성 추종
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: NYC 앵커 BID 실제 사례 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Empirical Assessment Formula
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    대표적인 뉴욕 도심 지구의 분담 요율 스펙
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>Times Square BID: 부동산 공시가격의 0.3% 정률 과세 모델 적용</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>Flatiron BID: 상업용 자산 연면적당 연간 $0.17 수준 정액 과세 모델 혼용</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>주거 에어리어 배려: 일반 입주민과의 마찰을 회피하기 위해 $1/Year 형식적 과세</span>
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
                            <span>자산의 위치적 가치와 규모를 정확히 반영하는 맞춤식 알고리즘(Algorithm)을 적용함으로써, 소액 건물주와 초대형 개발자 사이의 분쟁을 예방하고 합의를 유도합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
