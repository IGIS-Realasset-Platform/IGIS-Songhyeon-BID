import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section37({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '베셀(Vessel) 자살 사고와 안전 대책' : 'Vessel Security Crisis'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    2억 달러 규모 랜드마크 조형물이 겪은 안전사고와 공공 안전의 충돌
                </h2>

                {/* 타임라인 트랙형 인포그래픽 */}
                <div className="w-full max-w-[1250px] mt-[30px] mb-[30px] relative">
                    
                    {/* 가로 연결 트랙선 (데스크탑) */}
                    <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-1 bg-[#ef4444] -z-10"></div>
                    
                    {/* 4단계 카드 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        {/* 1단계 */}
                        <div className="bg-white border-4 border-[#0f172a] p-5 text-left flex flex-col justify-between shadow-sm relative">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#0f172a] text-white flex items-center justify-center font-black text-[15px]">
                                01
                            </div>
                            <div className="mt-2">
                                <span className="block font-black text-[17px] text-gray-900 mb-1">🎨 화려한 탄생 (2019)</span>
                                <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 font-bold uppercase inline-block mb-3">Launch</span>
                                <p className="text-[13.5px] text-gray-600 font-bold leading-relaxed">
                                    • 토머스 헤더윅 설계 조형물.<br />
                                    • 총 2억 달러 전액 민간 투자.<br />
                                    • 154개 계단실, 높이 46m로 개장 직후 글로벌 인스타 성지 등극.
                                </p>
                            </div>
                        </div>

                        {/* 2단계 */}
                        <div className="bg-white border-4 border-red-600 p-5 text-left flex flex-col justify-between shadow-sm relative">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-red-600 text-white flex items-center justify-center font-black text-[15px]">
                                02
                            </div>
                            <div className="mt-2">
                                <span className="block font-black text-[17px] text-red-600 mb-1">⚠️ 난간 설계결함 노출</span>
                                <span className="text-[11px] bg-red-50 text-red-600 px-2 py-0.5 font-bold uppercase inline-block mb-3">Design Fault</span>
                                <p className="text-[13.5px] text-gray-600 font-bold leading-relaxed">
                                    • 가슴 높이 수준의 낮은 난간 설계.<br />
                                    • 1인 탑승자 및 통행인 보호에 취약.<br />
                                    • 2020~21년 사이 조형물 내에서 **단기간에 4건의 투신 자살 발생**.
                                </p>
                            </div>
                        </div>

                        {/* 3단계 */}
                        <div className="bg-[#0f172a] border-4 border-red-600 p-5 text-left text-white flex flex-col justify-between shadow-md relative">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-red-600 text-white flex items-center justify-center font-black text-[15px]">
                                03
                            </div>
                            <div className="mt-2">
                                <span className="block font-black text-[17px] text-red-400 mb-1">🛑 무기한 전면 폐쇄</span>
                                <span className="text-[11px] bg-red-950/50 text-red-400 px-2 py-0.5 font-bold uppercase inline-block mb-3">Closure</span>
                                <p className="text-[13.5px] text-gray-300 font-bold leading-relaxed">
                                    • 뉴욕시 공공 안전국 폐쇄령 발동.<br />
                                    • 2억 달러 조형물이 미드타운 흉물로 방치될 장기 폐쇄기 돌입.<br />
                                    • 브랜드 이미지 훼손 및 재산 손실 가중.
                                </p>
                            </div>
                        </div>

                        {/* 4단계 */}
                        <div className="bg-[#0f172a] border-4 border-emerald-600 p-5 text-left text-white flex flex-col justify-between shadow-md relative">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-emerald-500 text-white flex items-center justify-center font-black text-[15px]">
                                04
                            </div>
                            <div className="mt-2">
                                <span className="block font-black text-[17px] text-emerald-400 mb-1">🔄 안전망 보강 및 재개</span>
                                <span className="text-[11px] bg-emerald-950/50 text-emerald-400 px-2 py-0.5 font-bold uppercase inline-block mb-3">Re-Opening</span>
                                <p className="text-[13.5px] text-gray-300 font-bold leading-relaxed">
                                    • 고장력 절단 불가 그물망 전면 설치.<br />
                                    • **1인 단독 입장 엄격 제한** 규정 도입.<br />
                                    • 보행 보안 가드 추가 배치 후 조건부 개방 완료.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-red-600">▪</span>
                            <span>2억 달러 규모 랜드마크 조형물이 겪은 잇따른 추락 사고와 이로 인한 장기 폐쇄의 시사점</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
