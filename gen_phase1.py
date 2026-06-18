import os

sections = {
    'src/components/Section14.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section14({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 300), // Theme & Title
            setTimeout(() => setStep(2), 1000), // Infographic Base
            setTimeout(() => setStep(3), 1600), // Infographic Details
            setTimeout(() => setStep(4), 2200), // More Details
            setTimeout(() => setStep(5), 2800)  // Description Text
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* Theme */}
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] bg-blue-50 border border-blue-100 px-4 py-1 rounded-full mb-[12px]">
                        {lang === 'kr' ? '[산업 분석 1] AI 슈퍼사이클과 반도체의 독주' : '[Industry 1] AI Supercycle & Semiconductor Monopoly'}
                    </span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '삼성·SK 하이닉스가 주도하는 GDP 성장의 절대적 중추' : 'Absolute Pillar of GDP Growth Led by Samsung & SK Hynix'}
                </h2>

                {/* Infographic */}
                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex flex-col md:flex-row items-center justify-center gap-8 z-10">
                    {/* Left Box */}
                    <div className={`relative w-[280px] bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] rounded-2xl shadow-2xl p-6 text-left transition-all duration-[1000ms] ease-out ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="absolute -top-4 -right-4 w-[60px] h-[60px] bg-[#3b82f6] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                            <span className="text-white font-black text-[20px]">AI</span>
                        </div>
                        <h3 className="text-[24px] font-black text-white mb-1">Samsung</h3>
                        <p className="text-[14px] text-blue-200 mb-6 font-medium">{lang === 'kr' ? '매출 폭발적 확장' : 'Explosive Revenue Growth'}</p>
                        
                        <div className="flex justify-between items-end border-b border-blue-800 pb-2 mb-2">
                            <span className="text-gray-400 font-bold">2007</span>
                            <span className="text-white font-bold">{lang === 'kr' ? '약 100조 원' : '~$100T KRW'}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-[#3b82f6] font-black text-[20px]">2025</span>
                            <span className="text-[#60a5fa] font-black text-[24px]">{lang === 'kr' ? '약 333조 원' : '~$333T KRW'}</span>
                        </div>
                    </div>

                    {/* Center Core */}
                    <div className={`relative flex flex-col items-center transition-all duration-[1200ms] ease-out ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <div className="w-[180px] h-[180px] rounded-full border-[8px] border-[#eff6ff] bg-white shadow-[0_0_40px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center z-20">
                            <span className="text-[14px] font-bold text-gray-500 mb-1">GDP Share</span>
                            <span className="text-[36px] font-black text-[#1e3a8a] leading-none mb-1">22.4%</span>
                            <span className="text-[12px] font-bold text-[#e11d48] bg-rose-50 px-2 py-0.5 rounded-md">{lang === 'kr' ? '단일 그룹 종속성' : 'Single Group Reliance'}</span>
                        </div>
                        {/* Connecting Lines */}
                        <div className="absolute top-1/2 left-[-60px] w-[60px] h-[3px] bg-gradient-to-r from-[#1e3a8a] to-blue-200 -z-10"></div>
                        <div className="absolute top-1/2 right-[-60px] w-[60px] h-[3px] bg-gradient-to-l from-[#e11d48] to-blue-200 -z-10"></div>
                    </div>

                    {/* Right Box */}
                    <div className={`relative w-[280px] bg-gradient-to-br from-[#4c0519] to-[#be185d] rounded-2xl shadow-2xl p-6 text-left transition-all duration-[1000ms] ease-out ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="absolute -top-4 -left-4 w-[60px] h-[60px] bg-[#fb7185] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                            <span className="text-white font-black text-[16px]">HBM</span>
                        </div>
                        <h3 className="text-[24px] font-black text-white mb-1">SK Hynix</h3>
                        <p className="text-[14px] text-rose-200 mb-6 font-medium">{lang === 'kr' ? '사상 최대 영업이익' : 'Record Operating Profit'}</p>
                        
                        <div className="flex justify-between items-end border-b border-rose-800 pb-2 mb-2">
                            <span className="text-gray-400 font-bold">2007 Rev.</span>
                            <span className="text-white font-bold">{lang === 'kr' ? '8.6조 원' : '8.6T KRW'}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-[#fb7185] font-black text-[18px]">2025 Q-Profit</span>
                            <span className="text-[#fecdd3] font-black text-[24px]">{lang === 'kr' ? '10조 원+' : '10T+ KRW'}</span>
                        </div>
                    </div>
                </div>

                {/* Description Text */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>가장 결정적 엔진임. <strong>삼성전자 매출은 2007년 약 100조 원에서 2025년 약 333조 원</strong>으로 3배 이상 확대.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span><strong>SK하이닉스는 2025년 사상 처음 분기 영업이익 10조 원</strong>을 돌파하며 AI 슈퍼사이클의 가장 큰 수혜자가 됨.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Bloomberg는 2024년 삼성전자 단독으로 한국 GDP 성장의 약 절반을 설명한다고 분석함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>삼성그룹 매출의 GDP 비중이 <strong>2007년 15%에서 2022년 22.4%</strong>까지 상승하여 단일 그룹 매크로 종속성이 오히려 심화됨.</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>The most decisive engine. <strong>Samsung's revenue expanded over 3x</strong> from ~$100T KRW in 2007 to ~$333T KRW in 2025.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span><strong>SK Hynix surpassed 10T KRW in quarterly operating profit</strong> for the first time in 2025, maximizing AI supercycle benefits.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Bloomberg Economics analyzed that Samsung alone accounts for about half of Korea's GDP growth in 2024.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span>Samsung Group's revenue share of GDP rose from <strong>15% in 2007 to 22.4% in 2022</strong>, deepening macroeconomic dependence.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
''',
    'src/components/Section15.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section15({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 1000),
            setTimeout(() => setStep(3), 1600),
            setTimeout(() => setStep(4), 2200),
            setTimeout(() => setStep(5), 2800)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#047857] bg-emerald-50 border border-emerald-100 px-4 py-1 rounded-full mb-[12px]">
                        {lang === 'kr' ? '[산업 분석 2] 모빌리티를 넘어선 자동차 산업의 진화' : '[Industry 2] Evolution of Automobiles Beyond Mobility'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '로봇과 AI 인프라로 비즈니스 영토를 전면 확장하는 현대차그룹' : 'Hyundai Motor Group Radically Expanding Business Territory with Robotics & AI'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex flex-col items-center justify-center z-10">
                    <div className="w-full flex justify-between items-center px-4 relative mt-[40px]">
                        
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-[10%] w-[80%] h-[4px] bg-gray-200 -translate-y-1/2 -z-10"></div>
                        <div className={`absolute top-1/2 left-[10%] h-[4px] bg-gradient-to-r from-[#047857] to-[#10b981] -translate-y-1/2 -z-10 transition-all duration-[1500ms] ease-out`} style={{ width: step >= 4 ? '80%' : step >= 3 ? '40%' : '0%' }}></div>

                        {/* Pillar 1: Auto */}
                        <div className={`relative flex flex-col items-center transition-all duration-[800ms] ease-out ${step >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'}`}>
                            <div className="w-[120px] h-[120px] rounded-2xl bg-white border-4 border-[#047857] shadow-xl flex flex-col items-center justify-center z-20">
                                <span className="text-[32px] font-black text-[#047857]">Auto</span>
                                <span className="text-[12px] font-bold text-gray-500 mt-1">Global Top 3</span>
                            </div>
                            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-center shadow-sm w-[160px]">
                                <p className="text-[13px] font-bold text-gray-800">4M -> <span className="text-[#047857] text-[16px]">7.23M</span></p>
                                <p className="text-[11px] text-gray-500 mt-1">{lang === 'kr' ? '2007~2024 글로벌 판매' : 'Global Sales (2007-2024)'}</p>
                            </div>
                        </div>

                        {/* Pillar 2: Robotics */}
                        <div className={`relative flex flex-col items-center transition-all duration-[800ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'}`}>
                            <div className="w-[120px] h-[120px] rounded-2xl bg-white border-4 border-[#10b981] shadow-xl flex flex-col items-center justify-center z-20">
                                <span className="text-[28px] font-black text-[#10b981]">Robotics</span>
                                <span className="text-[12px] font-bold text-gray-500 mt-1">UAM & Droids</span>
                            </div>
                            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-center shadow-sm w-[160px]">
                                <p className="text-[13px] font-bold text-gray-800">Boston Dynamics</p>
                                <p className="text-[11px] text-gray-500 mt-1">{lang === 'kr' ? '인수 및 슈퍼널 설립' : 'Acquisition & Supernal'}</p>
                            </div>
                        </div>

                        {/* Pillar 3: AI Infra */}
                        <div className={`relative flex flex-col items-center transition-all duration-[800ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'}`}>
                            <div className="w-[120px] h-[120px] rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#047857] shadow-2xl flex flex-col items-center justify-center z-20 border-4 border-white">
                                <span className="text-[28px] font-black text-white">AI Infra</span>
                                <span className="text-[12px] font-bold text-emerald-200 mt-1">Data Center</span>
                            </div>
                            <div className="mt-4 bg-gray-900 border border-gray-700 rounded-lg p-3 text-center shadow-md w-[160px]">
                                <p className="text-[13px] font-bold text-white">NVIDIA Partner</p>
                                <p className="text-[11px] text-gray-400 mt-1">{lang === 'kr' ? 'AI 인프라 혁신(2026)' : 'AI Infra Innovation (2026)'}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>2007년 글로벌 판매 약 400만 대에서 <strong>2024년 약 723만 대</strong>로 도요타·폭스바겐에 이은 <strong>글로벌 3위 그룹</strong>으로 확립.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>전기차 전환에서 아이오닉·EV9 라인업으로 테슬라·BYD 다음 그룹에 안정적으로 안착함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>보스턴 다이내믹스 인수(2021) 및 슈퍼널(UAM) 설립으로 모빌리티의 경계를 허묾.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>NVIDIA 협력 AI 데이터센터 건립을 통해 <strong>자동차 ➔ 로봇 ➔ AI 인프라</strong>까지 비즈니스 영역을 전면 확장 중.</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>Established as the <strong>world's 3rd largest group</strong>, with sales growing from ~4M units in 2007 to <strong>~7.23M in 2024</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>Successfully positioned just behind Tesla and BYD in the EV transition with the Ioniq and EV9 lineups.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>Breaking mobility boundaries through the acquisition of Boston Dynamics (2021) and establishment of Supernal.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>Radically expanding business scope: <strong>Automobiles ➔ Robotics ➔ AI Infrastructure</strong> via NVIDIA partnership.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
''',
    'src/components/Section16.jsx': '''import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section16({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 1000),
            setTimeout(() => setStep(3), 1600),
            setTimeout(() => setStep(4), 2200),
            setTimeout(() => setStep(5), 2800)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#ea580c] bg-orange-50 border border-orange-100 px-4 py-1 rounded-full mb-[12px]">
                        {lang === 'kr' ? '[산업 분석 3] 글로벌 패권 경쟁 속 조선업의 부활' : '[Industry 3] Resurgence of Shipbuilding amid Global Hegemony'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? 'MASGA 흐름을 올라탄 K-조선 빅3의 압도적 시장 지배력' : 'Overwhelming Dominance of K-Shipbuilding Big 3 Riding the MASGA Wave'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-center z-10 gap-6">
                    
                    {/* Left: Export Growth */}
                    <div className={`relative w-[240px] h-[240px] rounded-full border-[10px] border-[#fdba74] flex flex-col items-center justify-center shadow-xl transition-all duration-[1000ms] ease-out ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <span className="text-[16px] font-bold text-gray-500 mb-1">{lang === 'kr' ? '2025년 수출 증가율' : '2025 Export Growth'}</span>
                        <span className="text-[48px] font-black text-[#ea580c] leading-none mb-2">+24.9%</span>
                        <span className="text-[12px] font-bold text-orange-800 bg-orange-100 px-3 py-1 rounded-full text-center leading-tight">
                            {lang === 'kr' ? <>반도체와 유일한<br/>두 자릿수 성장</> : <>Only Double-Digit<br/>Growth with Semi</>}
                        </span>
                    </div>

                    {/* Middle: Market Share */}
                    <div className={`relative w-[280px] h-[280px] rounded-full border-[12px] border-[#ea580c] flex flex-col items-center justify-center shadow-2xl transition-all duration-[1000ms] ease-out delay-100 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <div className="absolute top-4 w-[80px] h-[24px] bg-[#ea580c] text-white font-bold text-[12px] flex items-center justify-center rounded-full shadow-md">BIG 3</div>
                        <span className="text-[16px] font-bold text-gray-600 mb-1">{lang === 'kr' ? '고부가가치선 점유율' : 'High-Value Ship Share'}</span>
                        <span className="text-[64px] font-black text-[#ea580c] leading-none mb-2">60%+</span>
                        <span className="text-[13px] font-medium text-gray-500 text-center px-4 leading-tight">
                            LNG / Ammonia Carriers<br/>Offshore Plants
                        </span>
                    </div>

                    {/* Right: MASGA */}
                    <div className={`relative w-[240px] h-[240px] rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] flex flex-col items-center justify-center shadow-xl transition-all duration-[1000ms] ease-out delay-200 ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <span className="text-[14px] font-bold text-blue-200 mb-1">{lang === 'kr' ? '미·중 패권 수혜' : 'US-China Hegemony'}</span>
                        <span className="text-[36px] font-black text-white leading-none mb-2">MASGA</span>
                        <span className="text-[11px] font-medium text-gray-300 text-center px-4 leading-tight">
                            Make American Shipbuilding<br/>Great Again
                        </span>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#ea580c]">▪</span><span>HD현대중공업·삼성중공업·한화오션의 <strong>압도적 빅3 체제</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#ea580c]">▪</span><span>2025년 한국 조선 수출은 <strong>전년 대비 24.9% 증가</strong>하며, 반도체(+22.2%)와 함께 두 자릿수 성장을 기록한 유일한 업종임.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#ea580c]">▪</span><span>LNG 운반선·암모니아 운반선·해양플랜트 등 고부가가치 선박에서 <strong>글로벌 점유율 60% 이상</strong>을 차지함.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#ea580c]">▪</span><span>미·중 패권 경쟁이 촉발한 <strong>MASGA(Make American Shipbuilding Great Again)</strong> 흐름의 직접적 수혜 산업.</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#ea580c]">▪</span><span>Led by the overwhelming <strong>Big 3 system</strong>: HD Hyundai Heavy, Samsung Heavy, and Hanwha Ocean.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#ea580c]">▪</span><span>Korea's shipbuilding exports in 2025 <strong>jumped 24.9% YoY</strong>, the only sector alongside semi to record double-digit growth.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#ea580c]">▪</span><span>Holds <strong>over 60% global market share</strong> in high-value ships like LNG/Ammonia carriers and offshore plants.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#ea580c]">▪</span><span>Direct beneficiary of the <strong>MASGA (Make American Shipbuilding Great Again)</strong> trend driven by US-China hegemony.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
'''
}

for file_path, content in sections.items():
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Successfully generated Section14, Section15, Section16")
