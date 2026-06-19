import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section30({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '지하철 7호선 연장선 ISP & PILOT 채권' : '7 Line ISP & PILOT Bond'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    미래의 세수를 담보로 24억 달러 규모의 공공 인프라 선투자를 실행한 구조
                </h2>

                {/* 가치 캡처 프로세스 플로우 (4. 프로세스 플로우형) */}
                <div className="w-full max-w-[1250px] mt-[30px] mb-[30px] relative">
                    
                    {/* SVG 흐름선 배경 */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-emerald-500 -z-10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                        
                        {/* 단계 1 */}
                        <div className="border-4 border-[#0f172a] bg-white p-5 flex flex-col justify-between shadow-sm relative">
                            <span className="absolute -top-4 -right-4 w-9 h-9 bg-[#0f172a] text-white flex items-center justify-center font-black text-[13px]">
                                01
                            </span>
                            <div>
                                <span className="block font-black text-[17px] text-[#0f172a] mb-2">🎫 HYIC 채권 발행</span>
                                <p className="text-[13.5px] text-gray-600 font-bold leading-relaxed">
                                    • 뉴욕시 보증 특수 법인 **HYIC** 설립.<br />
                                    • 미래 개발 증분 세수를 상환 재원으로 하는 **24억 달러 전용 채권** 발행.
                                </p>
                            </div>
                        </div>

                        {/* 단계 2 */}
                        <div className="border-4 border-[#0f172a] bg-white p-5 flex flex-col justify-between shadow-sm relative">
                            <span className="absolute -top-4 -right-4 w-9 h-9 bg-[#0f172a] text-white flex items-center justify-center font-black text-[13px]">
                                02
                            </span>
                            <div>
                                <span className="block font-black text-[17px] text-[#0f172a] mb-2">🚇 지하철 7호선 선투자</span>
                                <p className="text-[13.5px] text-gray-600 font-bold leading-relaxed">
                                    • 채권 조달액 전액을 **지하철 7호선 연장 노선**에 즉각 투입.<br />
                                    • 민간 마천루 착공 이전에 지구 중심까지 광역교통망 선제 개통.
                                </p>
                            </div>
                        </div>

                        {/* 단계 3 */}
                        <div className="border-4 border-[#0f172a] bg-[#0f172a] p-5 text-white flex flex-col justify-between shadow-md relative">
                            <span className="absolute -top-4 -right-4 w-9 h-9 bg-[#3b82f6] text-white flex items-center justify-center font-black text-[13px]">
                                03
                            </span>
                            <div>
                                <span className="block font-black text-[17px] text-[#93c5fd] mb-2">📈 개발 조기 유인</span>
                                <p className="text-[13.5px] text-gray-300 font-bold leading-relaxed">
                                    • 교통망 완비로 Related 등 **민간 디벨로퍼 마천루 착공 조기 유도**.<br />
                                    • 주변 가로 및 일반 오피스 빌딩 임대 가치의 수직 상승 자극.
                                </p>
                            </div>
                        </div>

                        {/* 단계 4 */}
                        <div className="border-4 border-emerald-600 bg-[#0f172a] p-5 text-white flex flex-col justify-between shadow-md relative">
                            <span className="absolute -top-4 -right-4 w-9 h-9 bg-emerald-500 text-white flex items-center justify-center font-black text-[13px]">
                                04
                            </span>
                            <div>
                                <span className="block font-black text-[17px] text-emerald-400 mb-2">💰 미래 증분 세수 상환</span>
                                <p className="text-[13.5px] text-gray-300 font-bold leading-relaxed">
                                    • 완공 후 **PILOT**(재산세 대체금) 및 **DIB**(용적률 상향 보너스 기금) 징수.<br />
                                    • 신탁 계정 적재를 통한 **인프라 채권 원리금 100% 회수**.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>신설 지하철 7호선 연장 비용 24억 달러를 조달하기 위한 가치 캡처(Value Capture) 금융 기법</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
