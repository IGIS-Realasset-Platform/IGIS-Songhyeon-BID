import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section21({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '지구성격별 요율 분담 공식' : 'Assessment Formulas'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    가로 접면, 부지 면적, 감정평가액 등 자산 특성에 맞춘 분담금 배분
                </h2>

                {/* 인포그래픽 영역: 3대 매개변수 가중치 계산기 형상화 */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[36px] flex flex-col lg:flex-row gap-8 justify-between items-stretch">
                    
                    {/* 좌측: 3대 변수 카드 (각진 테두리, 입체형) */}
                    <div className="w-full lg:w-[55%] border-4 border-[#0f172a] bg-white p-6 text-left flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Input Parameters
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-6">
                                분담금 산정의 3대 핵심 매개변수
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="border border-[#0f172a] p-4 flex items-center gap-4 bg-gray-50">
                                    <div className="w-12 h-12 bg-[#0f172a] flex-shrink-0 flex items-center justify-center text-white font-black text-[20px]">
                                        A
                                    </div>
                                    <div>
                                        <span className="block font-black text-[16px] text-gray-900">📏 가로 접면 길이 (Frontage)</span>
                                        <span className="text-[13px] text-gray-500 font-bold">보행자용 환경 청소, 치안 혜택 범위와 직접 연동</span>
                                    </div>
                                </div>
                                
                                <div className="border border-[#0f172a] p-4 flex items-center gap-4 bg-gray-50">
                                    <div className="w-12 h-12 bg-[#0f172a] flex-shrink-0 flex items-center justify-center text-white font-black text-[20px]">
                                        B
                                    </div>
                                    <div>
                                        <span className="block font-black text-[16px] text-gray-900">📐 총 부지/연면적 (Square Footage)</span>
                                        <span className="text-[13px] text-gray-500 font-bold">건물 규모 및 입주 테넌트 밀도 비례 정적 공간 가치 반영</span>
                                    </div>
                                </div>
                                
                                <div className="border border-[#0f172a] p-4 flex items-center gap-4 bg-gray-50">
                                    <div className="w-12 h-12 bg-[#0f172a] flex-shrink-0 flex items-center justify-center text-white font-black text-[20px]">
                                        C
                                    </div>
                                    <div>
                                        <span className="block font-black text-[16px] text-gray-900">💵 재산세 감정가 (Assessed Value)</span>
                                        <span className="text-[13px] text-gray-500 font-bold">자산 소유주의 실제 담세력 및 실질 임대 수익성 추종</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 실제 요율 적용 및 계산 공식 가로 매핑 */}
                    <div className="w-full lg:w-[42%] border-4 border-[#0f172a] bg-[#0f172a] p-6 text-left text-white flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                NYC Empirical Case
                            </span>
                            <h3 className="text-[24px] font-black mb-6">
                                뉴욕 주요 BID의 실증 산정식
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/10 p-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-black text-[17px] text-[#93c5fd]">Times Square BID</span>
                                        <span className="text-[13px] bg-red-600 text-white px-2 py-0.5 font-bold">정률세 방식</span>
                                    </div>
                                    <p className="text-[14px] text-gray-300 font-bold leading-relaxed">
                                        부동산 공시가격(Assessed Value)의 약 0.3% 수준을 매년 분담금으로 부과하여 대형 자산에 높은 책임 부여
                                    </p>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-black text-[17px] text-[#93c5fd]">Flatiron BID</span>
                                        <span className="text-[13px] bg-blue-600 text-white px-2 py-0.5 font-bold">혼합식 가중치</span>
                                    </div>
                                    <p className="text-[14px] text-gray-300 font-bold leading-relaxed">
                                        상업용 연면적당 연 $0.17 부과 및 가로 접면 길이에 비례한 가중치를 종합 계산하여 합산 부과
                                    </p>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-black text-[17px] text-[#a7f3d0]">주거용 부동산 특례</span>
                                        <span className="text-[13px] bg-emerald-600 text-white px-2 py-0.5 font-bold">감면 혜택</span>
                                    </div>
                                    <p className="text-[14px] text-gray-300 font-bold leading-relaxed">
                                        지구 내 주거용 세대에 대해서는 마찰 회피 및 주민 동의 유도를 위해 연간 $1 수준의 형식적 과세만 적용
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>각 자산의 가로 면적, 부지 규모, 평가 가치에 비례하여 징수액을 정교하게 나누는 합리적 형평성 달성 장치</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
