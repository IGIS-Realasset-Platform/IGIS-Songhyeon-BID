import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section20({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '특별부과금 징수와 100% 교부' : 'Assessment & Allocation'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    재산세와 일괄 징수하여 해당 지구관리협회(DMA)로 100% 반환하는 구조
                </h2>

                {/* 다채로운 인포그래픽 영역 (세수 고지서 및 송환 흐름 순서도) */}
                <div className="w-full max-w-[1100px] mt-[40px] mb-[40px] relative h-auto flex flex-col md:flex-row items-stretch justify-between gap-6">
                    
                    {/* 가로 송환선 (SVG) */}
                    <div className="absolute top-[80px] left-10 right-10 h-2 hidden md:block z-0">
                        <svg className="w-full h-[60px]" viewBox="0 0 1000 60" fill="none" preserveAspectRatio="none">
                            <path d="M 0,20 Q 250,50 500,20 T 1000,20" stroke="#bae6fd" strokeWidth="6" strokeDasharray="5,5" />
                            <path d="M 0,20 Q 250,50 500,20 T 1000,20" stroke="#1e3a8a" strokeWidth="2" />
                        </svg>
                    </div>

                    {/* Step 1: 시 재무국(DOF) 통합 고지 */}
                    <div className="relative z-10 flex-1 bg-white border-4 border-[#0f172a] rounded-none p-6 text-left shadow-md flex flex-col justify-between min-h-[260px]">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[13px] font-black bg-[#0f172a] text-white px-2 py-0.5">PROCESS 01</span>
                                <span className="text-gray-400 font-extrabold text-[12px]">일괄 징수 인프라</span>
                            </div>
                            <h3 className="text-[18px] font-black text-gray-900 mb-2">
                                재산세 고지서 내 병기
                            </h3>
                            <p className="text-[13px] text-gray-500 font-bold mb-4">
                                분담금 항목을 별도 추가하여 일괄 우편 발송
                            </p>
                            <span className="text-[12px] text-gray-400 block font-semibold">• 징수 비용 최소화 효과</span>
                            <span className="text-[12px] text-gray-400 block font-semibold">• 지방세와 동등한 납부 강제력 획득</span>
                        </div>
                        <div className="mt-4 bg-[#eff6ff] p-3 border border-blue-200">
                            <span className="text-[12px] font-bold text-[#1e3a8a] block">"징수 누락률 1% 미만 철저 통제"</span>
                        </div>
                    </div>

                    {/* Step 2: 체납 시 강력 제재 (Sanctions) - 비대칭 높이 배치 */}
                    <div className="relative z-10 flex-1 bg-white border-4 border-red-600 rounded-none p-6 text-left shadow-md flex flex-col justify-between min-h-[260px] md:mt-6">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[13px] font-black bg-red-600 text-white px-2 py-0.5">PROCESS 02</span>
                                <span className="text-red-400 font-extrabold text-[12px]">체납 방지 대책</span>
                            </div>
                            <h3 className="text-[18px] font-black text-gray-900 mb-2">
                                법적 강제력 위임
                            </h3>
                            <p className="text-[13px] text-red-600 font-bold mb-4">
                                지방세 체납 시와 동일한 법적 패널티
                            </p>
                            <span className="text-[12px] text-gray-500 block font-semibold">• 건물 및 자산에 저당권(Lien) 즉각 설정</span>
                            <span className="text-[12px] text-gray-500 block font-semibold">• 높은 연체 이자 부과로 성실 납부 유도</span>
                        </div>
                        <div className="mt-4 bg-red-50 p-3 border border-red-200">
                            <span className="text-[12px] font-bold text-red-700 block">"재정적 예측 안정성 99% 확보"</span>
                        </div>
                    </div>

                    {/* Step 3: 수수료 0% 즉각 이체 (Zero Commission) */}
                    <div className="relative z-10 flex-1 bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-6 text-left shadow-2xl flex flex-col justify-between min-h-[260px]">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[13px] font-black bg-white text-[#0f172a] px-2 py-0.5">PROCESS 03</span>
                                <span className="text-yellow-400 font-extrabold text-[12px]">100% 자금 이관</span>
                            </div>
                            <h3 className="text-[18px] font-black text-white mb-2">
                                무수수료 즉시 송환
                            </h3>
                            <p className="text-[13px] text-gray-400 font-bold mb-4">
                                시 당국의 행정 대행 수수료 0%
                            </p>
                            <span className="text-[12px] text-gray-300 block font-semibold">• 징수 완료 후 30일 내 DMA 계좌 송금</span>
                            <span className="text-[12px] text-gray-300 block font-semibold">• 일반 시 예산과 혼용 금지, 당해 구역 전용</span>
                        </div>
                        <div className="mt-4 bg-white/10 p-3 border border-white/20">
                            <span className="text-[12px] font-bold text-yellow-400 block">"납세액 전액이 고스란히 지역에 환원"</span>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr' ? '지자체가 세금 고지서로 징수 대행을 수행하되, 수수료 없이 해당 지구로 전액 돌려주어 온전히 환원시키는 재무 흐름.' : 'A financial flow where the city handles tax billing but returns 100% of the funds to the district without administrative fees.'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
