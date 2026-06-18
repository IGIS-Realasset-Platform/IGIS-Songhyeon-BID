import React, { useState } from 'react';

export default function Section25({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        BID의 법적 지위와 판례
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    Kessler v. Grand Central DMA 판결이 인정한 부동산 소유자 편중 의결권
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 원고 Kessler의 주장 (1인 1표) */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Plaintiff's Challenge
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    Kessler v. Grand Central DMA (1998)
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    ⚖️ 헌법 소송: BID 특별부과금을 내는 구역 내 주민 및 상인 등 전체 구성원의 투표권 동등 배정 요구
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🚨 평등권 침해 주장: 이사회 구성 시 부동산 소유자 지분 과반을 법제화한 조례는 수정헌법 제14조 위배
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 연방 법원의 최종 판결 (민간정부 합법성 확보) */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Federal Court Ruling
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    "특수 실체(Special Purpose Entity)" 지위 인정
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🏛️ 연방 제2항소법원 판결: BID는 일반적인 공권력을 집행하는 행정기구가 아니라고 선언</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🔍 제한 목적 실체: 보행 가로 환경 정비, 홍보 마케팅, 부가 치안 등 제한적 임무 수행</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🔑 의결권 배분 정당성: 실질 담세자인 소유주 비율 과반은 헌법상 예외로 용인됨을 최종 판시</span>
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
                            <span>Kessler 판례는 BID 제도가 일반 투표자 민주주의(General Voter Democracy)가 아닌, 이해관계자 비례 원칙에 기반한 주주형 거버넌스로 작동할 수 있는 헌법적 보호막을 마련했습니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
