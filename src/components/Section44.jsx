import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section44({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#f8fafc] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '한국의 현황과 제도적 공백' : 'Institutional Gaps in Korea'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '통합 법제 부재와 제도적 한계: 서울 도심 BID의 3대 구조적 난제' : 'Integrated Legislation Void & 3 Structural Challenges in Seoul'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 맞춤형 인포그래픽 설계 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] flex flex-col lg:flex-row gap-6 items-stretch">
                    
                    {/* 좌측: 현행 법제의 분산 및 한계 */}
                    <div className="w-full lg:w-[50%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                Current Legal Status
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#0f172a] mb-6 leading-snug">
                                {lang === 'kr' ? '개별 산재된 유사 법령의 한계' : 'Limitations of Scattered Statutes'}
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="border border-gray-300 p-3.5 bg-slate-50">
                                    <div className="text-[14px] font-black text-gray-900">⚖️ 지역상권법 (2022 시행)</div>
                                    <p className="text-[12.5px] text-gray-600 font-bold leading-relaxed mt-1">
                                        자율상권구역 지정 및 상생협약을 규정하지만, 쇠퇴 상권 및 임차인 보호(임대료 제한) 중심일 뿐 강제 부담금 징수 조항은 없음.
                                    </p>
                                </div>
                                <div className="border border-gray-300 p-3.5 bg-slate-50">
                                    <div className="text-[14px] font-black text-gray-900">🧱 도시재생 활성화 특별법</div>
                                    <p className="text-[12.5px] text-gray-600 font-bold leading-relaxed mt-1">
                                        도시재생사업 위주로 공공 보조금 재원에만 의존하며, 지구 내부 이해관계자가 지속해서 운영 자금을 충당하는 메커니즘 결여.
                                    </p>
                                </div>
                                <div className="border border-gray-300 p-3.5 bg-slate-50">
                                    <div className="text-[14px] font-black text-[#1e3a8a]">🚀 신규 에리어매니지먼트의 태동 시도</div>
                                    <p className="text-[12.5px] text-gray-600 font-bold leading-relaxed mt-1">
                                        중구 전통시장 발전소(민간 주도 법인 설립), 용산국제업무지구(시 주도 타운매니지먼트) 등의 시도가 있으나 독자적 재원 모델 부재.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 핵심 공란과 3대 난제 */}
                    <div className="w-full lg:w-[50%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#ef4444] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                The Three Key Gaps
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#ef4444] mb-6 leading-snug">
                                {lang === 'kr' ? '법적 강제 징수 권한의 3대 핵심 난제' : 'Three Obstacles to Mandatory Assessment'}
                            </h3>
                            
                            <div className="space-y-4">
                                {/* 난제 1 */}
                                <div className="border border-[#0f172a] p-4 bg-red-50/20">
                                    <span className="block text-[15px] font-black text-red-600">1. 강제 부담금 징수 법적 근거 부재</span>
                                    <p className="text-[13px] text-gray-600 font-bold leading-relaxed mt-1">
                                        현행법상 지구 내 소유주들에게 의무적으로 부담금을 부과·징수할 권한이 전혀 없어 자발적 기부 형태의 불안정한 재원 운영에 봉착.
                                    </p>
                                </div>

                                {/* 난제 2 */}
                                <div className="border border-[#0f172a] p-4 bg-red-50/20">
                                    <span className="block text-[15px] font-black text-red-600">2. 재산세·종부세 정합성 및 이중과세 논란</span>
                                    <p className="text-[13px] text-gray-600 font-bold leading-relaxed mt-1">
                                        이미 고율의 재산세와 종부세를 내는 토지·건물 소유주에게 추가 부담금을 물릴 경우 발생할 이중과세 시비와 정합성 문제 해결이 곤란.
                                    </p>
                                </div>

                                {/* 난제 3 */}
                                <div className="border border-[#0f172a] p-4 bg-red-50/20">
                                    <span className="block text-[15px] font-black text-red-600">3. 사유재산 강제징수 위헌 시비</span>
                                    <p className="text-[13px] text-gray-600 font-bold leading-relaxed mt-1">
                                        조세 법률주의가 강력한 한국 법령 체계상, 비정부 민간 법인이 사유 재산인 분담금을 강제로 거두는 것에 대한 헌법적 정당성 확보 문제.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 - 규격 준수 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                {lang === 'kr'
                                    ? '통합 법제 없이 개별 법령이 분산된 한국의 현황에서, 부담금 강제 징수 한계와 위헌 시비를 정면으로 돌파할 입법 설계가 시급합니다.'
                                    : 'Scattered statutes without an integrated BID law face critical obstacles: double taxation, lack of assessment power, and constitutional queries.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
