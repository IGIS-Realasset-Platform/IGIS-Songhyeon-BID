import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section15({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '온타리오 지방자치법 제361조 개정' : 'Ontario Municipal Act Amendment'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    무임승차자를 원천 차단하기 위한 강제 특별부과금 체계의 법제화
                </h2>

                {/* 다채로운 인포그래픽 영역 (지그재그 비대칭 흐름도) */}
                <div className="w-full max-w-[1100px] mt-[40px] mb-[40px] relative h-auto flex flex-col md:flex-row items-stretch justify-between gap-6">
                    
                    {/* 흐름을 이어주는 배경 지그재그 선 (SVG) */}
                    <div className="absolute top-[80px] left-10 right-10 h-2 hidden md:block z-0">
                        <svg className="w-full h-[60px]" viewBox="0 0 1000 60" fill="none" preserveAspectRatio="none">
                            <path d="M 0,10 L 330,50 L 660,10 L 1000,50" stroke="#bae6fd" strokeWidth="4" strokeDasharray="6,6" />
                            <path d="M 0,10 L 330,50 L 660,10 L 1000,50" stroke="#1e3a8a" strokeWidth="2" />
                        </svg>
                    </div>

                    {/* Step 1: 상인들의 탄원 (Petition) */}
                    <div className="relative z-10 flex-1 bg-white border-4 border-[#0f172a] rounded-none p-6 text-left shadow-md flex flex-col justify-between min-h-[280px]">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[14px] font-black bg-[#0f172a] text-white px-2 py-0.5">STEP 01</span>
                                <span className="text-gray-400 font-extrabold text-[12px]">1969년 초기</span>
                            </div>
                            <h3 className="text-[20px] font-black text-gray-900 mb-2">
                                자발적 한계 봉착 & 탄원
                            </h3>
                            <p className="text-[14px] text-gray-600 font-bold mb-4">
                                Bloor West 상인 협회의 청원
                            </p>
                            <ul className="text-[13px] text-gray-500 space-y-1 font-semibold">
                                <li>• 상인들의 대대적인 지방자치법 개정 요구</li>
                                <li>• 공동 개선 비용의 의무 부과 제도 건의</li>
                                <li>• 상인 186명의 자발적 서명 동의서 확보</li>
                            </ul>
                        </div>
                        <div className="mt-4 bg-[#eff6ff] p-3 border border-blue-200">
                            <span className="text-[13px] font-extrabold text-[#1e3a8a]">"소비자 이탈을 막을 유일한 수단 청구"</span>
                        </div>
                    </div>

                    {/* Step 2: 입법 및 특별 조항 신설 (Legislation) - 비대칭 높이 배치 (mt-8로 아래로 쏠림) */}
                    <div className="relative z-10 flex-1 bg-[#1e3a8a] border-4 border-[#1e3a8a] rounded-none p-6 text-left shadow-lg flex flex-col justify-between min-h-[280px] md:mt-8">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[14px] font-black bg-white text-[#1e3a8a] px-2 py-0.5">STEP 02</span>
                                <span className="text-blue-200 font-extrabold text-[12px]">1969년 말</span>
                            </div>
                            <h3 className="text-[20px] font-black text-white mb-2">
                                온타리오 지방자치법 제361조
                            </h3>
                            <p className="text-blue-200 text-[14px] font-bold mb-4">
                                특별부과지구(BIA) 신설의 법제화
                            </p>
                            <ul className="text-[13px] text-blue-100 space-y-1 font-medium">
                                <li>• 소유자/상인 과반 동의 시 지구 강제 획정</li>
                                <li>• 획정 구역 내 모든 사업자 대상 자기과세권 위임</li>
                                <li>• 무임승차(Free-Rider)의 법률적 원천 봉쇄</li>
                            </ul>
                        </div>
                        <div className="mt-4 bg-white/10 p-3 border border-white/20">
                            <span className="text-[13px] font-extrabold text-white">"민간 상인의 연대 의무를 공법으로 보장"</span>
                        </div>
                    </div>

                    {/* Step 3: 최초의 BIA 출범 및 징수 체계 수립 */}
                    <div className="relative z-10 flex-1 bg-white border-4 border-[#0f172a] rounded-none p-6 text-left shadow-md flex flex-col justify-between min-h-[280px]">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[14px] font-black bg-[#0f172a] text-white px-2 py-0.5">STEP 03</span>
                                <span className="text-gray-400 font-extrabold text-[12px]">1970년 초</span>
                            </div>
                            <h3 className="text-[20px] font-black text-gray-900 mb-2">
                                Bloor West BIA 출범
                            </h3>
                            <p className="text-[14px] text-gray-600 font-bold mb-4">
                                세계 최초 BIA의 실제 가동
                            </p>
                            <ul className="text-[13px] text-gray-500 space-y-1 font-semibold">
                                <li>• 275개 전체 점포에 공평 분담금 일괄 부과</li>
                                <li>• 시 재무당국이 재산세 고지서에 병기 수납</li>
                                <li>• 수납액 100%를 BIA에 즉각 교부 및 정산</li>
                            </ul>
                        </div>
                        <div className="mt-4 bg-emerald-50 p-3 border border-emerald-200">
                            <span className="text-[13px] font-extrabold text-emerald-700">"가로 청결 및 경관 조명 대대적 개선 완성"</span>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>지방자치법 개정은 자치단체가 세금 수납 인프라를 지원하되, 그 지출과 기획은 민간 BIA가 100% 전담하는 <strong>'공공 지원 - 민간 자율 경영'</strong>의 모델을 완성했습니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
