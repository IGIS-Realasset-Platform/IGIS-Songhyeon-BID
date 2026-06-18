import React, { useState } from 'react';

export default function Section33({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        허드슨야드 관리 주체
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    디벨로퍼 임원들의 직접 참여를 통한 트로피 자산 가치 방어 거버넌스
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 디벨로퍼의 직접 참여와 지배력 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Developer Board Seats
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    Related & Oxford 중심의 강력한 책임 집행
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    👔 핵심 의사결정: Related 부사장 등 앵커 디벨로퍼 핵심 임원들이 이사회 등기 임원으로 등재
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🔒 투자 얼라인먼트: 준공 후 철수하는 일반 건설사와 달리 소유 지분을 보유하고 장기 관리 관여
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    💵 신속 자금 조달: 추가 자본 투입이 필요할 시 민간 이사회 협의를 통해 예산 추가 승인
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 민-관-학-민 지역 연대 채널 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Multi-Stakeholder Governance
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    지역 커뮤니티 및 지자체 당연직의 감시 균형
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>👥 CB4 (맨해튼 제4 커뮤니티 보드) 대표: 지역 주민의 소수 배제 우려 감시</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>⚖️ 뉴욕시 소기업지원국(SBS): 비영리 법인인 HYHK BID 운영 합법성 정기 감사</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🌐 가교 역할: 소유자와 지자체, 그리고 지역 주민 간의 갈등을 평화적으로 조율하는 상설 기구화</span>
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
                            <span>HYHK Alliance는 단순 이익 집단이 아닌, 최고 결정권을 가진 자산 소유자와 공적 행정 대리인이 실질적인 이사회 보드를 공유하는 통합 거버넌스 구조를 통해 트로피 자산가치를 수장합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
