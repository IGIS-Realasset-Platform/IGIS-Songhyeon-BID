import React, { useState } from 'react';

export default function Section48({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        SBD/IBD 단계별 실행안
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    이오타서울 파일럿에서 용산 연계 SYBD(서울역-용산) 축 완성까지의 일정
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 3단계 점진적 개발/운영 로드맵 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    3-Phase SYBD Roadmap
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    파일럿에서 메가 벨트 확장까지의 타임라인
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[15px]">
                                    🏁 Phase 1. 양동·봉래 파일럿 (2026-2028): 이오타 서울(힐튼 재개발) 중심으로 한국 최초 소형 타운매니지먼트 공식 시범 가동
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[15px]">
                                    🏢 Phase 2. SBD 광역 확장 (2028-2030): 서울역 북부역세권 개발 및 남산 보행 네트워크 준공 시점에 맞춰 SBD 전역 확산
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[15px]">
                                    🚀 Phase 3. 용산 연계 SYBD 완성 (2030+): 용산국제업무지구 완공과 연계, 서울역-용산 잇는 대한민국 신업무축 확립
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 리스크 관리 및 거버넌스 안전대응책 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Risk Mitigation & Governance
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    과도한 세제 지원 지양 및 민주적 공조 보장
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[15px]">
                                    <span>💸 재정적 위험 통제: 정부 보조(TIF 등)에 의존하지 않고, 민간 자조 분담금 비율을 최소 70% 이상 보수적으로 수립</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[15px]">
                                    <span>⚖️ 당연직 의원 통제: 서울시장 대리인, 서울시의원 등 당연직 공무원 4인의 이사회 참여 의무화로 상업 사유화 제어</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[15px]">
                                    <span>🛡️ 포용주의 가이드라인: 영세 소상공인 퇴출 논란 방지를 위한 상생 조력 기금 설치 및 임대 보조금 제도 운영</span>
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
                            <span>SBD-IBD 통합 마스터플랜은 정교한 3단계 기획과 민·관의 합리적 견제 거버넌스를 동력 삼아, 자산 가치의 프리미엄 방어와 공공의 생태 민주성을 동시에 성취해 나갈 것입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
