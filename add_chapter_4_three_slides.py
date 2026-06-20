import re
import os

def main():
    # 1. Create Section27_NewContent1.jsx (Ecosystem dashboard specs)
    content1_code = """import React, { useState, useEffect } from 'react';
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
"""
    with open('src/components/Section27_NewContent1.jsx', 'w', encoding='utf-8') as f:
        f.write(content1_code)
    print("Created Section27_NewContent1.jsx")

    # 2. Create Section27_NewContent2.jsx (Manhattan BIDs budget indicator bars)
    content2_code = """import React, { useState, useEffect } from 'react';
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
"""
    with open('src/components/Section27_NewContent2.jsx', 'w', encoding='utf-8') as f:
        f.write(content2_code)
    print("Created Section27_NewContent2.jsx")

    # 3. Create Section27_NewContent3.jsx (PPP funding cycle diagram)
    content3_code = """import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section27_NewContent3({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const t1 = setTimeout(() => setStep(1), 200);
        const t2 = setTimeout(() => setStep(2), 600);
        const t3 = setTimeout(() => setStep(3), 1000);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? 'BID 작동 메커니즘' : 'BID Operational Mechanism'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-6">
                    {lang === 'kr'
                        ? '부동산 소유주 자기 과세 기반의 민관협력 자금 순환 구조'
                        : 'PPP Capital Circulation Cycle Funded by Property Owners\' Self-Taxation'}
                </h2>

                {/* 중앙 콘텐츠: 순환 고리형 그래픽 루프 */}
                <div className="w-full max-w-[1100px] mt-[10px] mb-[20px] flex justify-center items-center relative">
                    
                    {/* SVG 흐름 선망 (데스크탑뷰) */}
                    <div className="w-full h-[280px] hidden md:block relative">
                        <svg className="w-full h-full" viewBox="0 0 1000 280">
                            {/* 연결 선 */}
                            <g stroke="#0f172a" strokeWidth="3" fill="none">
                                {/* Step 1 -> Step 2 */}
                                <path d="M 210,140 L 260,140" />
                                {/* Step 2 -> Step 3 */}
                                <path d="M 440,140 L 490,140" />
                                {/* Step 3 -> Step 4 */}
                                <path d="M 690,140 L 740,140" />
                                {/* Step 4 -> Step 1 (위쪽으로 우회하는 순환 루프선) */}
                                <path d="M 850,90 Q 500,-10 110,90" strokeDasharray="6,6" stroke="#3b82f6" />
                            </g>

                            {/* 화살표 헤드 */}
                            <g fill="#0f172a">
                                <polygon points="255,135 265,140 255,145" />
                                <polygon points="485,135 495,140 485,145" />
                                <polygon points="735,135 745,140 735,145" />
                            </g>
                            <g fill="#3b82f6">
                                <polygon points="115,85 105,95 120,98" />
                            </g>

                            {/* 루프 텍스트 */}
                            <text x="500" y="35" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="black" className="uppercase">
                                {lang === 'kr' ? '🔄 자산 가치 상승 ➔ 재투자 선순환 환원' : '🔄 Value Appreciation & Reinvestment Loop'}
                            </text>

                            {/* Node 1: 부동산 소유주 */}
                            <g transform="translate(10, 90)">
                                <rect width="200" height="100" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
                                <text x="100" y="35" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="black">1. 부동산 소유주</text>
                                <text x="100" y="60" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">자발적 추가 분담금 합의</text>
                                <text x="100" y="78" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="medium">지구 지정 및 자기과세</text>
                            </g>

                            {/* Node 2: 시 당국 (지방정부) */}
                            <g transform="translate(270, 90)">
                                <rect width="170" height="100" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
                                <text x="85" y="35" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="black">2. 시 당국 (공공)</text>
                                <text x="85" y="60" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">세금과 합산 일괄 징수</text>
                                <text x="85" y="78" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="medium">수수료 없이 100% 교부</text>
                            </g>

                            {/* Node 3: 지구관리협회 (DMA) */}
                            <g transform="translate(500, 90)">
                                <rect width="190" height="100" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                                <text x="95" y="35" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="black">3. 지구관리협회 (DMA)</text>
                                <text x="95" y="60" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">민간 주도 예산 집행</text>
                                <text x="95" y="78" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="medium">이사회 의결로 서비스 발주</text>
                            </g>

                            {/* Node 4: 보충적 공공 서비스 */}
                            <g transform="translate(750, 90)">
                                <rect width="240" height="100" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
                                <text x="120" y="35" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="black">4. 보충적 서비스 이행</text>
                                <text x="120" y="60" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">위생·치안·환경·마케팅 강화</text>
                                <text x="120" y="78" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="medium">➔ 자산 가치 증가 (선순환)</text>
                            </g>
                        </svg>
                    </div>

                    {/* 모바일 화면 카드 흐름 */}
                    <div className="md:hidden w-full flex flex-col gap-3 text-left">
                        <div className="border-4 border-[#0f172a] bg-white p-4">
                            <span className="block font-black text-[16px]">1. 부동산 소유주</span>
                            <span className="text-[13px] text-gray-600 block">지구 지정을 위한 추가 분담금 납부 동의</span>
                        </div>
                        <div className="border-4 border-[#0f172a] bg-white p-4">
                            <span className="block font-black text-[16px]">2. 시 당국 (지방정부)</span>
                            <span className="text-[13px] text-gray-600 block">일반 지방세 고지서와 합산 수납 후 100% 전액 반환</span>
                        </div>
                        <div className="border-4 border-[#0f172a] bg-[#0f172a] text-white p-4">
                            <span className="block font-black text-[16px]">3. 지구관리협회 (DMA)</span>
                            <span className="text-[13px] text-gray-300 block">민간 중심 이사회 의사결정으로 서비스 예산 집행</span>
                        </div>
                        <div className="border-4 border-[#0f172a] bg-white p-4">
                            <span className="block font-black text-[16px]">4. 보충적 서비스 ➔ 가치 상승 환원</span>
                            <span className="text-[13px] text-gray-600 block">위생·치안·환경정비 이행으로 구역 내 프리미엄 창출</span>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr'
                                ? '지방정부는 징수 수수료를 전혀 취하지 않으며, 수납된 기금 전액은 구역의 이익 환원을 위해 해당 지구에 100% 반환 보장'
                                : 'The municipality collects fees free of administration charges, ensuring 100% back to the originating district'}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr'
                                ? '소유자가 직접 낸 만큼 혜택이 돌아가도록 공법상의 강제 징수력과 민간의 자율 경영 기법을 결합시킨 정교한 PPP 루프'
                                : 'Sophisticated PPP loop combining public tax leverage with private management control, returning direct benefits to self-taxed owners'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
"""
    with open('src/components/Section27_NewContent3.jsx', 'w', encoding='utf-8') as f:
        f.write(content3_code)
    print("Created Section27_NewContent3.jsx")

    # 4. Modify MainLayout.jsx
    layout_file = 'src/components/MainLayout.jsx'
    with open(layout_file, 'r', encoding='utf-8') as f:
        layout_code = f.read()

    # Import insertion
    import_pat = "import Section27 from './Section27';"
    new_imports = """import Section27 from './Section27';
import Section27_NewContent1 from './Section27_NewContent1';
import Section27_NewContent2 from './Section27_NewContent2';
import Section27_NewContent3 from './Section27_NewContent3';"""
    layout_code = layout_code.replace(import_pat, new_imports)

    # slidesLength update
    layout_code = layout_code.replace("const slidesLength = 72;", "const slidesLength = 76;")

    # We want to replace Section27 and Section28 lines with Chapter 4 insertion (Total 4 slides inserted)
    target_block = """        <Section27 />, // Page 32
        <Section28 />, // Page 33 (Part 3 Cover)"""
    
    replacement_block = """        <Section27 />, // Page 32
        <ChapterCover chapterNum="4" title={<>뉴욕 현황<br />72개 BID의 생태계</>} />, // Page 33
        <Section27_NewContent1 />, // Page 34
        <Section27_NewContent2 />, // Page 35
        <Section27_NewContent3 />, // Page 36
        <Section28 />, // Page 37 (Part 3 Cover)"""
    
    layout_code = layout_code.replace(target_block, replacement_block)

    # Shift subsequent comments in the array
    lines = layout_code.split('\n')
    in_array = False
    new_lines = []
    replacement_seen = False
    for line in lines:
        if 'const slides = React.useMemo(() => [' in line:
            in_array = True
        elif '], []);' in line:
            in_array = False
        
        if 'Section27_NewContent3' in line:
            replacement_seen = True
            
        if in_array and replacement_seen:
            # Shift comments of form: // Page X (if X is greater than 36)
            # The replacement block has:
            # ChapterCover -> Page 33
            # Content1 -> Page 34
            # Content2 -> Page 35
            # Content3 -> Page 36
            # Section28 -> Page 37
            # So anything with old Page 34 or larger must be shifted by +4!
            m = re.search(r'//\s*Page\s*(\d+)', line)
            if m:
                p_num = int(m.group(1))
                if p_num >= 34 and 'Section27_NewContent' not in line and 'Section28' not in line:
                    new_p_num = p_num + 4
                    line = line.replace(f'// Page {p_num}', f'// Page {new_p_num}')
                    line = line.replace(f'// Page{p_num}', f'// Page {new_p_num}')
        new_lines.append(line)
    
    layout_code = '\n'.join(new_lines)

    with open(layout_file, 'w', encoding='utf-8') as f:
        f.write(layout_code)
    print("Modified MainLayout.jsx successfully.")

    # 5. Modify NavigationData.js
    nav_file = 'src/data/NavigationData.js'
    with open(nav_file, 'r', encoding='utf-8') as f:
        nav_code = f.read()

    # Shift all page-X IDs in NavigationData.js by +4 if X > 36
    def shift_id(match):
        p_num = int(match.group(1))
        if p_num > 36:
            return f"page-{p_num + 4}"
        return f"page-{p_num}"

    nav_code = re.sub(r'page-(\d+)', shift_id, nav_code)

    # Insert Chapter 4 into menuDataEn
    ch3_en_pattern = """            {
                title: "Chapter 3. Legal Status & Criticisms",
                id: "page-33",
                items: [
                    { label: "Kessler Case: Exception of One-Person-One-Vote", id: "page-34" },
                    { label: "Rochester Failure (2024)", id: "page-35" },
                    { label: "4 Major Structural Criticisms", id: "page-36" }
                ]
            }"""
    ch4_en_block = """            {
                title: "Chapter 3. Legal Status & Criticisms",
                id: "page-33",
                items: [
                    { label: "Kessler Case: Exception of One-Person-One-Vote", id: "page-34" },
                    { label: "Rochester Failure (2024)", id: "page-35" },
                    { label: "4 Major Structural Criticisms", id: "page-36" }
                ]
            },
            {
                title: "Chapter 4. NYC BID Ecosystem & Major Districts",
                id: "page-37",
                items: [
                    { label: "NYC 72 BIDs Ecosystem Status", id: "page-38" },
                    { label: "Top 5 Manhattan BIDs Comparison", id: "page-39" },
                    { label: "PPP Capital Circulation Cycle", id: "page-40" }
                ]
            }"""
    nav_code = nav_code.replace(ch3_en_pattern, ch4_en_block)

    # Insert Chapter 4 into menuDataKr
    ch3_kr_pattern = """            {
                title: "Chapter 3. 법적 판례와 실패/비판론",
                id: "page-33",
                items: [
                    { label: "Kessler 판결: 1인 1표 원칙 예외", id: "page-34" },
                    { label: "로체스터시(2024) 설립 무산 실패기", id: "page-35" },
                    { label: "민주주의 결핍 등 구조적 비판 4선", id: "page-36" }
                ]
            }"""
    ch4_kr_block = """            {
                title: "Chapter 3. 법적 판례와 실패/비판론",
                id: "page-33",
                items: [
                    { label: "Kessler 판결: 1인 1표 원칙 예외", id: "page-34" },
                    { label: "로체스터시(2024) 설립 무산 실패기", id: "page-35" },
                    { label: "민주주의 결핍 등 구조적 비판 4선", id: "page-36" }
                ]
            },
            {
                title: "Chapter 4. 뉴욕 현황 — 72개 BID의 생태계",
                id: "page-37",
                items: [
                    { label: "뉴욕시 72개 BID 생태계 현황", id: "page-38" },
                    { label: "주요 맨해튼 5대 BID 재무 비교", id: "page-39" },
                    { label: "자금 순환 메커니즘과 특별부과금", id: "page-40" }
                ]
            }"""
    nav_code = nav_code.replace(ch3_kr_pattern, ch4_kr_block)

    with open(nav_file, 'w', encoding='utf-8') as f:
        f.write(nav_code)
    print("Modified NavigationData.js successfully.")

if __name__ == '__main__':
    main()
