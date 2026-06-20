import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section30({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '지하철 7호선 연장선 ISP & PILOT 채권' : '7 Line ISP & PILOT Bond'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    {lang === 'kr' 
                        ? '미래 세수를 담보로 한 30억 달러 채권 발행과 선제적 인프라 선투자 구조' 
                        : 'Pre-investment of $2.4B Infrastructure Backed by $3.0B Future Tax Revenues'}
                </h2>

                {/* 가치 캡처 프로세스 플로우 */}
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
                                    • 뉴욕시 보증 특수 법인 **HYIC** 설립<br />
                                    • 총 **30억 달러 전용 채권** 발행<br />
                                    <span className="text-gray-400 font-semibold">(2006년 20억$, 2011년 10억$ 분할 발행)</span>
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
                                    • 사업비: 당초 21억$ ➔ **24억 달러** 증액<br />
                                    • 타임스스퀘어 ~ 34번가-11번가(2.4km) 노선 신설 및 2015년 9월 선제 개통 완료
                                </p>
                            </div>
                        </div>

                        {/* 단계 3 */}
                        <div className="border-4 border-[#0f172a] bg-[#0f172a] p-5 text-white flex flex-col justify-between shadow-md relative">
                            <span className="absolute -top-4 -right-4 w-9 h-9 bg-[#3b82f6] text-white flex items-center justify-center font-black text-[13px]">
                                03
                            </span>
                            <div>
                                <span className="block font-black text-[17px] text-[#93c5fd] mb-2">📊 다각화된 미래 세원</span>
                                <p className="text-[13.5px] text-gray-300 font-bold leading-relaxed">
                                    • 상업용지: **PILOT** (재산세 대체납부)<br />
                                    • 주거용지: **TEP** (세수 균등금)<br />
                                    • 용적률 보너스(**DIB**) 및 개발권(**TDR**) 매각 대금을 연동하여 전액 상환
                                </p>
                            </div>
                        </div>

                        {/* 단계 4 */}
                        <div className="border-4 border-[#0f172a] bg-[#0f172a] p-5 text-white flex flex-col justify-between shadow-md relative">
                            <span className="absolute -top-4 -right-4 w-9 h-9 bg-emerald-500 text-white flex items-center justify-center font-black text-[13px]">
                                04
                            </span>
                            <div>
                                <span className="block font-black text-[17px] text-emerald-400 mb-2">💰 이자지원보증 (ISP)</span>
                                <p className="text-[13.5px] text-gray-300 font-bold leading-relaxed">
                                    • 개발 초기 증분 세수 부족 시 뉴욕시가 **ISP(Interest Support Payments)**를 자동 지급<br />
                                    • 채권 원리금 상환 신용을 보강하여 조달 금리 인하 및 안정성 확보
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
                            <span>{lang === 'kr'
                                ? '미래의 세수(PILOT/TEP)와 용적률 보너스(DIB)를 상환 재원으로 채권을 선발행하여 교통망을 우선 확충하고, 세수 부족 시 시(市)가 이자지원(ISP)을 보증한 밸류 캡처 메커니즘'
                                : 'A value capture mechanism where HYIC issued bonds backed by future revenues (PILOT/TEP/DIB) to fund pre-investment, with NYC providing ISP interest guarantees.'
                            }</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
