import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section43({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '[핵심 자산 1] 이오타 서울(힐튼재개발) 마스터플랜 및 스펙' : '[Key Asset 1] IOTA Seoul Development Spec'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    연면적 46만㎡ 규모의 강북 최대 복합 트로피 에셋 마스터플랜
                </h2>

                {/* 수직 통합 아키텍처 및 금융 스택 (7. 에코-버티컬 스택형) */}
                <div className="w-full max-w-[1200px] mt-[25px] mb-[25px] flex flex-col lg:flex-row gap-8 justify-between items-stretch">
                    
                    {/* 좌측: 수직 통합형 3단 설계 스택 */}
                    <div className="w-full lg:w-[52%] flex flex-col gap-4 text-left">
                        <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase self-start">
                            Vertical Integration Program
                        </span>
                        
                        {/* 1단: 리츠칼튼 호텔 */}
                        <div className="border-4 border-[#0f172a] bg-white p-4 shadow-sm relative">
                            <span className="absolute right-4 top-4 text-[#10b981] font-black text-[12px] uppercase">Ritz-Carlton</span>
                            <span className="block font-black text-[16px] text-gray-900">🏨 최상층: 럭셔리 호스피탈리티 호텔</span>
                            <p className="text-[13px] text-gray-500 font-bold leading-relaxed mt-1">
                                글로벌 최고급 호텔 브랜드 유치를 통해 비즈니스 의전 및 VIP 투숙 수요 독점 흡수
                            </p>
                        </div>

                        {/* 2단: 프라임 오피스 */}
                        <div className="border-4 border-[#0f172a] bg-white p-4 shadow-sm relative">
                            <span className="absolute right-4 top-4 text-[#3b82f6] font-black text-[12px] uppercase">LEED Platinum</span>
                            <span className="block font-black text-[16px] text-gray-900">🏢 중·저층부: 친환경 최첨단 프라임 오피스</span>
                            <p className="text-[13px] text-gray-500 font-bold leading-relaxed mt-1">
                                SOM & Foster + Partners 설계 반영, 친환경 인증 획득으로 다국적 우량 임차인 유치 방어선 구축
                            </p>
                        </div>

                        {/* 3단: 문화/상업 포디움 */}
                        <div className="border-4 border-[#0f172a] bg-white p-4 shadow-sm relative">
                            <span className="absolute right-4 top-4 text-[#ef4444] font-black text-[12px] uppercase">Retail & Culture</span>
                            <span className="block font-black text-[16px] text-gray-900">🛍️ 지하 및 저층부: 서울로 연계 상업·예술 포디움</span>
                            <p className="text-[13px] text-gray-500 font-bold leading-relaxed mt-1">
                                보행 데크를 서울로 7017 및 서울역 지하도와 직접 연결하여 외부 집객 동선 극대화
                            </p>
                        </div>
                    </div>

                    {/* 우측: 이오타 2 PF 리스크 관리 스탯 보드 */}
                    <div className="w-full lg:w-[42%] border-4 border-[#0f172a] bg-[#0f172a] p-6 text-left text-white flex flex-col justify-between shadow-md">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Financing Safety Buffer
                            </span>
                            <h3 className="text-[24px] font-black mb-6">
                                이오타 2 PF 안정성 관리
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/10 p-4">
                                    <span className="block font-black text-[16px] text-[#93c5fd]">💸 브릿지론 연정 구조화</span>
                                    <span className="text-[13px] text-gray-300">시장 추가 금리 충격을 방어할 신용 연계 대주단 금융 협의 안정적 확정</span>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-4">
                                    <span className="block font-black text-[16px] text-[#93c5fd]">🔑 에쿼티 추가 보강</span>
                                    <span className="text-[13px] text-gray-300">이지스 모태 펀드 자본금 투입을 통한 신용 등급 보강 및 대주단 안심 장치 가동</span>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-4">
                                    <span className="block font-black text-[16px] text-emerald-400">🚀 본PF 전환 완료 목표</span>
                                    <span className="text-[13px] text-gray-300">인허가 완료 조율 일정에 연동하여 1금융권 신디케이트 론 전환 가이드 수립</span>
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
                            <span>이지스 시행 및 Foster + Partners 설계로 강북 최대 규모의 친환경 트로피 복합 단지를 조성하는 코어 프로젝트</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
