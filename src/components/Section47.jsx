import React, { useState } from 'react';

export default function Section47({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#0f172a] mb-[12px]">
                        미래 SBD-IBD 연계 비전
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    스마트 코어(AI·디지털 트윈) 및 블록체인 기반의 디지털 분담금 징수 구조
                </h2>

                {/* 다채로운 인포그래픽 영역 (5세대 디지털 BID 프로세스 플로우 SVG + 세부 내용 카드) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 4단계 스마트 데이터 순환 플로우 (SVG) */}
                    <div className="w-full lg:w-[48%] bg-white border-2 border-[#0f172a] rounded-none p-6 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Data Cycle Flow
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-4 leading-tight">
                                5세대 디지털 운영 체계
                            </h3>
                            <p className="text-gray-500 text-[12px] font-bold mb-6">
                                아날로그 행정의 한계를 뛰어넘는 AI 관제와 스마트 분담금 연동 라이프사이클
                            </p>

                            {/* 프로세스 플로우 SVG */}
                            <div className="w-full h-[180px] bg-slate-50 border border-gray-300 relative flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180">
                                    {/* 루프 서클 */}
                                    <circle cx="150" cy="90" r="55" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="5,5" />
                                    
                                    {/* 단계 노드 (4개) */}
                                    {/* 1. 수집 */}
                                    <circle cx="150" cy="35" r="18" fill="#0f172a" stroke="#2563eb" strokeWidth="2" />
                                    <text x="150" y="38" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Sensing</text>
                                    
                                    {/* 2. 관제 */}
                                    <circle cx="205" cy="90" r="18" fill="#0f172a" stroke="#2563eb" strokeWidth="2" />
                                    <text x="205" y="93" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Control</text>
                                    
                                    {/* 3. 정산 */}
                                    <circle cx="150" cy="145" r="18" fill="#0f172a" stroke="#2563eb" strokeWidth="2" />
                                    <text x="150" y="148" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Billing</text>
                                    
                                    {/* 4. 기록 */}
                                    <circle cx="95" cy="90" r="18" fill="#0f172a" stroke="#2563eb" strokeWidth="2" />
                                    <text x="95" y="93" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Ledger</text>
                                    
                                    {/* 흐름 화살표 */}
                                    <path d="M 168,35 Q 190,45 200,72" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
                                    <path d="M 205,108 Q 190,135 168,145" fill="none" stroke="#ef4444" strokeWidth="2" />
                                    <path d="M 132,145 Q 110,135 98,108" fill="none" stroke="#ef4444" strokeWidth="2" />
                                    <path d="M 95,72 Q 110,45 132,35" fill="none" stroke="#ef4444" strokeWidth="2" />

                                    {/* 중앙 라벨 */}
                                    <text x="150" y="94" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="black">5G BID OS</text>
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4 bg-gray-50 p-3 border border-gray-200">
                            <p className="text-[12px] text-gray-600 font-bold leading-relaxed">
                                🔗 IoT 센서 기반의 실시간 가로 데이터 수집과 스마트 계약에 의한 분담 정산, 신뢰도 높은 블록체인 장부 기록으로의 연속성 확보.
                            </p>
                        </div>
                    </div>

                    {/* 우측: 핵심 디지털 고도화 세부 카드 */}
                    <div className="w-full lg:w-[48%] bg-white border-2 border-[#0f172a] rounded-none p-6 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Core Specifications
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-6 leading-tight">
                                스마트 도시 인프라 및 블록체인
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="border border-gray-200 p-4">
                                    <span className="block text-[#0f172a] font-extrabold text-[15px]">🖥️ 3D 디지털 트윈 기반 실시간 모니터링</span>
                                    <span className="text-[12px] text-gray-600 block mt-1">공중 보행 스카이 트레일, 지하 하역 인프라 및 지상 도로의 물리적 상태와 혼잡도를 가상 3D 맵에 100% 동기화</span>
                                </div>
                                <div className="border border-gray-200 p-4">
                                    <span className="block text-[#0f172a] font-extrabold text-[15px]">🤖 AI 알고리즘 기반 스마트 자원 배치</span>
                                    <span className="text-[12px] text-gray-600 block mt-1">보행량 센서 및 쓰레기 적체 예측 기능을 통해 보안 미화 요원을 과밀 구간에 실시간 선배치 및 청결 유지</span>
                                </div>
                                <div className="border border-gray-200 p-4">
                                    <span className="block text-[#0f172a] font-extrabold text-[15px]">🔗 스마트 컨트랙트 실시간 분담 정산 (D-BID)</span>
                                    <span className="text-[12px] text-gray-600 block mt-1">트래픽, 오염 배출 등 각 자산의 실제 환경 영향 요인을 산정하여 임의 분담 방식이 아닌 알고리즘 기반 자동 과금</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
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
