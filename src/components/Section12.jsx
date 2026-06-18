import React, { useState } from 'react';

export default function Section12({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        복합 개발 생태계 - 모리빌딩
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    업무·주거·문화·보행의 수직 복합화가 창출한 투자가치 60% 순증과 공실 제로
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 생활 복합 생태계 */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Roppongi Hills Lifestyle OS
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    업무와 여가, 주거와 문화의 완벽한 수직 통합
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[17px]">
                                    🎭 모리 미술관, 그랜드 하얏트 F&B, 옥상 텃밭의 연결
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[17px]">
                                    🎒 다국적 임직원을 위한 영국인 학교 및 국제 어린이집 상주
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 font-bold text-[#0f172a] text-[17px]">
                                    ⚡ 재난 대비 자체 열병합 발전으로 글로벌 IT 기업 유치
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 자산가치 방어 성과 */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Financial Appreciation
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    모리빌딩 오퍼레이션의 재무 성과
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6 justify-center">
                                <div className="bg-white/10 border border-white/20 p-5 font-black text-white text-[20px] text-center">
                                    개발 완공 후 독립 감정평가 결과<br/>
                                    <span className="text-[32px] text-[#93c5fd] font-extrabold">투자가치 60% 순증</span>
                                </div>
                                <div className="bg-white/10 border border-white/20 p-4 font-bold text-white text-[18px] text-center">
                                    개관 이래 오피스 공실률<br/>
                                    <span className="text-[26px] text-white font-black">사실상 0% 유지</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>단순 부동산 공급에서 탈피하여 주거, 상업, 문화를 통합 설계·운영하는 플랫폼형 자산 관리 모델이 트로피 자산 가치를 영구 방어함을 입증</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
