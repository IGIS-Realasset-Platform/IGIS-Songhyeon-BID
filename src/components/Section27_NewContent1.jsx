import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section27_NewContent1({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const t1 = setTimeout(() => setStep(1), 200);
        const t2 = setTimeout(() => setStep(2), 500);
        const t3 = setTimeout(() => setStep(3), 800);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '뉴욕시 BID 생태계 현황' : 'NYC BID Ecosystem Overview'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-6">
                    {lang === 'kr' 
                        ? 'SBS 행정 감독 하의 78개 지구 네트워크와 보충적 서비스 성과' 
                        : '78 District Networks under SBS Supervision and Supplemental Services Output'}
                </h2>

                {/* 중앙 콘텐츠: 대형 스탯 & 2단 분할 비주얼 레이아웃 */}
                <div className="w-full max-w-[1200px] mt-[10px] mb-[20px] flex flex-col lg:flex-row gap-6 justify-center items-stretch">
                    
                    {/* 좌측: 주요 거시 지표 (대형 타이포그래피) */}
                    <div className="w-full lg:w-[45%] border-4 border-[#0f172a] bg-white p-8 text-left flex flex-col justify-between shadow-sm">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                NETWORK SCALE (FY25)
                            </span>
                            
                            <div className="space-y-6">
                                <div className="flex items-baseline justify-between border-b border-gray-100 pb-3">
                                    <span className="text-[14px] text-gray-500 font-bold">{lang === 'kr' ? '총 운영 지구 수' : 'Active BIDs'}</span>
                                    <span className="text-[34px] font-black text-gray-900">78개 지구</span>
                                </div>
                                <div className="flex items-baseline justify-between border-b border-gray-100 pb-3">
                                    <span className="text-[14px] text-gray-500 font-bold">{lang === 'kr' ? '연간 자원 투입액' : 'Annual Resources'}</span>
                                    <span className="text-[34px] font-black text-[#1e3a8a]">$2.16억 (약 3천억)</span>
                                </div>
                                <div className="flex items-baseline justify-between border-b border-gray-100 pb-3">
                                    <span className="text-[14px] text-gray-500 font-bold">{lang === 'kr' ? '밀착 관리 가로 길이' : 'Managed Corridor'}</span>
                                    <span className="text-[34px] font-black text-gray-900">320 Miles+</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t-2 border-gray-100 text-[13px] text-gray-500 font-medium">
                            * {lang === 'kr' ? '뉴욕시 소기업청(SBS)이 당연직 이사회 대표를 파견하여 거버넌스 및 계약 운영 투명성을 상시 감사' : 'NYC SBS monitors governance, compliance, and transparent operations by dispatching ex-officio board reps'}
                        </div>
                    </div>

                    {/* 우측: 연간 공공 인프라 보완 성과 카드 */}
                    <div className="w-full lg:w-[55%] border-4 border-[#0f172a] bg-[#0f172a] p-8 text-left text-white flex flex-col justify-between shadow-md">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[13px] font-black px-3 py-1 uppercase mb-6">
                                ANNUAL SUPPLEMENTAL SERVICE VALUE
                            </span>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
                                    <span className="text-[36px] block">🧹</span>
                                    <div>
                                        <span className="block font-black text-[22px] text-[#93c5fd] mt-2">400만 개</span>
                                        <span className="text-[12px] text-gray-300 block font-medium mt-1">연간 쓰레기봉투 수거 및 가로 위생 정비</span>
                                    </div>
                                </div>
                                <div className="border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
                                    <span className="text-[36px] block">🎨</span>
                                    <div>
                                        <span className="block font-black text-[22px] text-[#93c5fd] mt-2">448,000건</span>
                                        <span className="text-[12px] text-gray-300 block font-medium mt-1">노상 낙서 신속 제거 및 도시 가로 경관 정화</span>
                                    </div>
                                </div>
                                <div className="border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
                                    <span className="text-[36px] block">🎪</span>
                                    <div>
                                        <span className="block font-black text-[22px] text-[#93c5fd] mt-2">4,092건</span>
                                        <span className="text-[12px] text-gray-300 block font-medium mt-1">가로 축제 및 공공 행사 개최 (참가자 1,470만명)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/10 text-[13px] text-gray-400 font-medium">
                            * {lang === 'kr' ? '시 예산 지원 없이 민간 부동산 소유자들의 자기 과세 재원만으로 달성한 순수 증분 성과' : 'Pure incremental achievements funded solely by private property owners without city budget support'}
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr' 
                                ? '뉴욕시는 미국 내에서 가장 방대하고 조직화된 BID 네트워크를 구축하여 도시 위생 및 치안 공백을 민간 자조로 보완' 
                                : 'NYC builds the most extensive BID network in the US, supplementing urban hygiene and crime control via private self-help'}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr'
                                ? '모든 BID 이사회에 시장을 대리하는 당연직 인원을 배치하여 민주적 책임성과 투명한 기금 감사를 확보하는 이중 거버넌스 구현'
                                : 'Ensures democratic accountability by placing mayoral representatives on all BID boards for transparent audit control'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
