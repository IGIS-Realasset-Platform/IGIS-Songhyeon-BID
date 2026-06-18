import React, { useState } from 'react';

export default function Section37({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        랜드마크 플레이스메이킹의 리스크
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    2억 달러 규모 랜드마크 조형물이 겪은 안전사고와 공공 안전의 충돌
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 비셀(Vessel)의 탄생과 영광 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Vessel's Architectural Spec
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    토머스 헤더윅(Thomas Heatherwick) 설계 조형물
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🎨 미학적 랜드마크: 154개의 상호 연결된 계단실, 2,500개의 스텝, 높이 46m의 벌집 형상
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    💰 2억 달러 투자: Related 컨소시엄이 전액 출자하여 메인 광장에 입체 수직 구조물 배치
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    📸 세계적 흥행: 개장 직후 인스타그램 최대 성지화, 뉴욕 서부 관광객 최우선 방문지 등락
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 연쇄 안전사고와 리스크 관리 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Safety Crisis & Closedown
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    추신 연쇄 자살 사고로 인한 전면 통제와 수습
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚨 디자인 결함: 낮은 유리 난간(가슴 높이) 설계로 인해 단독 보행자 투신 위험 방치</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🛑 2021년 전면 폐쇄: 개장 후 단기간에 4건의 극단적 선택 사고가 잇따라 발생하며 폐쇄 처분</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🔄 안전망 보강 및 재개장: 그물 안전망 신규 설치, '1인 단독 입장 엄격 금지' 수칙 하에 조건부 개방</span>
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
                            <span>비셀(Vessel)의 위기는 랜드마크 조성 시 인간 행동 리스크에 대한 사전 엔지니어링 검토가 미비할 경우, 막대한 랜드마크 구축 투자가 일순간에 거대한 부채로 변질될 수 있음을 증명합니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
