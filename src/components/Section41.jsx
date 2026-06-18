import React, { useState } from 'react';

export default function Section41({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        SBD의 물리적 코어 - IOTA Seoul
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    연면적 46만㎡ 규모의 강북 최대의 복합 트로피 에셋 탄생
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 건축 마스터플랜 및 용도 스펙 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Hilton Site Redevelopment
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    SOM / Foster + Partners 글로벌 설계 조화
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏢 초대형 연면적: 힐튼·메트로·양동구역 통합 연면적 46만㎡ (강북 최고밀 프라임급 복합 단지)
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🏨 최고급 호텔: 하이엔드 럭셔리 '리츠칼튼(Ritz-Carlton)' 호텔 유치 확정
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🌿 친환경 오피스: 리드(LEED) 플래티넘 등급 지향 및 녹지 수직 통합 빌딩 구현
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: PF 재무 구조 및 리스크 통제 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Financing & Risk Management
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    브릿지론 연장 및 본PF 전환 안정성 방어
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>💸 이오타 2 PF 안정: 브릿지론 연장에 따른 추가 금리 충격을 방어할 금융 구조 설계</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🔑 이지스 에쿼티 보강: 모태 펀드 자본금 추가 투입을 통해 대주단 신용 확보</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚀 본PF 연착륙: 인허가 확정 시기에 맞춰 1금융권 중심 신디케이트 론 사전 조율 완료</span>
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
                            <span>IOTA Seoul은 단순 오피스 빌딩을 넘어 복합 문화, 예술, 럭셔리 호스피탈리티가 수직 결합된 초우량 자산이며, 정밀한 금융 구도로 시장 리스크를 무력화하고 개발을 가속화합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
