import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section27_NewContent2({ isActive }) {
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
                        {lang === 'kr' ? '맨해튼 주요 BID 재무 비교' : 'Top Manhattan BIDs Finances'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-6">
                    {lang === 'kr'
                        ? '5대 핵심 지구의 지출 규모 대조 및 비즈니스 모델 비교'
                        : 'Expenditure Scales and Business Models of 5 Core Manhattan Districts'}
                </h2>

                {/* 중앙 콘텐츠: 가로형 시각 막대 지표 카드 그리드 */}
                <div className="w-full max-w-[1200px] mt-[10px] mb-[20px] space-y-3">
                    
                    {/* BP */}
                    <div className="border-4 border-[#0f172a] bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center relative shadow-sm">
                        <div className="w-full md:w-[25%] flex flex-col">
                            <span className="font-black text-[18px] text-gray-900">Bryant Park Corp.</span>
                            <span className="text-[12px] text-gray-400 font-bold uppercase">Business Self-Sufficient</span>
                        </div>
                        <div className="w-full md:w-[45%] bg-gray-100 h-6 mt-2 md:mt-0 relative overflow-hidden">
                            <div className="bg-[#0f172a] h-full transition-all duration-[1000ms] ease-out" style={{ width: step >= 2 ? '100%' : '0%' }}></div>
                            <span className="absolute right-3 top-0.5 text-[12px] font-black text-gray-600 z-10">$2,965만 / 년</span>
                        </div>
                        <div className="w-full md:w-[28%] text-[13.5px] text-gray-600 font-bold mt-2 md:mt-0">
                            🎭 {lang === 'kr' ? '겨울장터, 식음료, 브랜딩 결합 수익모델 극대화' : 'Maximizes winter village, food & licensing revenues'}
                        </div>
                    </div>

                    {/* TS */}
                    <div className="border-4 border-[#0f172a] bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center relative shadow-sm">
                        <div className="w-full md:w-[25%] flex flex-col">
                            <span className="font-black text-[18px] text-gray-900">Times Square Alliance</span>
                            <span className="text-[12px] text-gray-400 font-bold uppercase">Global Branding & Patrol</span>
                        </div>
                        <div className="w-full md:w-[45%] bg-gray-100 h-6 mt-2 md:mt-0 relative overflow-hidden">
                            <div className="bg-[#1e3a8a] h-full transition-all duration-[1000ms] ease-out" style={{ width: step >= 2 ? '91%' : '0%' }}></div>
                            <span className="absolute right-3 top-0.5 text-[12px] font-black text-gray-600 z-10">$2,707만 / 년</span>
                        </div>
                        <div className="w-full md:w-[28%] text-[13.5px] text-gray-600 font-bold mt-2 md:mt-0">
                            🚨 {lang === 'kr' ? '치안·미화 및 글로벌 새해 행사 중심 브랜딩' : 'Focuses on safety, sanitation, and global branding events'}
                        </div>
                    </div>

                    {/* DA */}
                    <div className="border-4 border-[#0f172a] bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center relative shadow-sm">
                        <div className="w-full md:w-[25%] flex flex-col">
                            <span className="font-black text-[18px] text-gray-900">Downtown Alliance</span>
                            <span className="text-[12px] text-gray-400 font-bold uppercase">Residential Shift</span>
                        </div>
                        <div className="w-full md:w-[45%] bg-gray-100 h-6 mt-2 md:mt-0 relative overflow-hidden">
                            <div className="bg-[#3b82f6] h-full transition-all duration-[1000ms] ease-out" style={{ width: step >= 2 ? '76%' : '0%' }}></div>
                            <span className="absolute right-3 top-0.5 text-[12px] font-black text-gray-600 z-10">$2,263만 / 년</span>
                        </div>
                        <div className="w-full md:w-[28%] text-[13.5px] text-gray-600 font-bold mt-2 md:mt-0">
                            🏙️ {lang === 'kr' ? '예산 60% 위생·안전 투입, 하부 주거인구 5배 견인' : 'Spends 60% on safety & cleaning, boosting residential pop'}
                        </div>
                    </div>

                    {/* 34th */}
                    <div className="border-4 border-[#0f172a] bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center relative shadow-sm">
                        <div className="w-full md:w-[25%] flex flex-col">
                            <span className="font-black text-[18px] text-gray-900">34th Street Partnership</span>
                            <span className="text-[12px] text-gray-400 font-bold uppercase">Midtown Commercial Core</span>
                        </div>
                        <div className="w-full md:w-[45%] bg-gray-100 h-6 mt-2 md:mt-0 relative overflow-hidden">
                            <div className="bg-gray-700 h-full transition-all duration-[1000ms] ease-out" style={{ width: step >= 2 ? '52%' : '0%' }}></div>
                            <span className="absolute right-3 top-0.5 text-[12px] font-black text-gray-600 z-10">$1,541만 / 년</span>
                        </div>
                        <div className="w-full md:w-[28%] text-[13.5px] text-gray-600 font-bold mt-2 md:mt-0">
                            🏢 {lang === 'kr' ? '미드타운 상업축 관리, BP와 공동 경영진 공유' : 'Manages Midtown core, shares executive leadership with BP'}
                        </div>
                    </div>

                    {/* GCP */}
                    <div className="border-4 border-[#0f172a] bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center relative shadow-sm">
                        <div className="w-full md:w-[25%] flex flex-col">
                            <span className="font-black text-[18px] text-gray-900">Grand Central Partnership</span>
                            <span className="text-[12px] text-gray-400 font-bold uppercase">Landscape Bonding</span>
                        </div>
                        <div className="w-full md:w-[45%] bg-gray-100 h-6 mt-2 md:mt-0 relative overflow-hidden">
                            <div className="bg-gray-500 h-full transition-all duration-[1000ms] ease-out" style={{ width: step >= 2 ? '44%' : '0%' }}></div>
                            <span className="absolute right-3 top-0.5 text-[12px] font-black text-gray-600 z-10">$1,307만 / 년</span>
                        </div>
                        <div className="w-full md:w-[28%] text-[13.5px] text-gray-600 font-bold mt-2 md:mt-0">
                            🏛️ {lang === 'kr' ? '미국 최초로 채권을 활용한 가로경관 선투자 개선' : 'First to utilize municipal bond financing for streetscapes'}
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr'
                                ? '맨해튼 미드타운 및 다운타운 일대의 주요 대형 지구들은 단일 BID당 중소도시 전체에 맞먹는 대규모 재정을 가동하여 독자적 행정 지원 제공'
                                : 'Major Manhattan BIDs operate budgets comparable to small municipal entities, providing customized public services'}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr'
                                ? '단순 환경 미화를 뛰어넘어 공공 채권 발행, 인프라 선투자, 공원 상업 앵커 유치 등 고도의 금융 및 리테일 융합 기법 도입'
                                : 'Goes beyond standard cleaning by incorporating bond financing, infrastructure pre-investment, and retail-park integration'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
