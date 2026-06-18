import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section141({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const t1 = setTimeout(() => setStep(1), 200);
        const t2 = setTimeout(() => setStep(2), 800);
        const t3 = setTimeout(() => setStep(3), 1400);
        const t4 = setTimeout(() => setStep(4), 2000);
        const t5 = setTimeout(() => setStep(5), 2600);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-white flex flex-col items-center justify-center relative px-8 md:px-20 overflow-hidden py-12 md:py-24">
            <div className="w-full max-w-[1100px] mx-auto flex flex-col items-start text-left">
                
                {/* Title */}
                <div className={`mb-10 md:mb-14 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <h2 className="text-[32px] md:text-[46px] font-extrabold text-[#1d1d1f] tracking-[-0.02em]">
                        {lang === 'kr' ? '맺음말.' : 'Conclusion.'}
                    </h2>
                </div>

                <div className="w-full flex flex-col space-y-8 md:space-y-12">
                    {/* Paragraph 1 */}
                    <p className={`text-[19px] md:text-[24px] font-medium text-gray-800 leading-[1.65] break-keep transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        {lang === 'kr' ? (
                            <>한국 경제가 2007년 1조 달러를 처음 돌파한 시점에 IFC 서울이 막 첫 삽을 떴음. 2조 달러를 돌파하는 2027년 직전에 IOTA 서울이 본PF를 마무리하고 본격 시공에 들어가는 것은 단순한 우연이 아닌 역사의 리듬임. 3조 달러 시대(2035~2040)가 도래할 때 IOTA가 준공되어 안정화 cash flow를 만들어내는 것 또한 동일한 리듬임.</>
                        ) : (
                            <>When the Korean economy first surpassed the $1 trillion mark in 2007, IFC Seoul had just broken ground. It is no mere coincidence, but the rhythm of history, that IOTA Seoul will close its main PF and begin full-scale construction just before surpassing $2 trillion in 2027. It is the same rhythm that IOTA will be completed and generate stabilized cash flows when the $3 trillion era (2035-2040) arrives.</>
                        )}
                    </p>

                    {/* Paragraph 2 */}
                    <p className={`text-[19px] md:text-[24px] font-medium text-gray-800 leading-[1.65] break-keep transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        {lang === 'kr' ? (
                            <>이지스가 단순한 한국 RE 1위에서 글로벌 1선 운용사로 도약하느냐는, <span className="font-bold text-[#1e3a8a]">IOTA를 어떻게 끝까지 마무리하느냐</span>로 결정될 것임. 블랙스톤이 2007년 IPO 후 글로벌 1위 운용사가 되었듯, 이지스에게 IOTA는 IPO에 준하는 institutional 전환 사건임.</>
                        ) : (
                            <>Whether IGIS leaps from simply being the #1 RE firm in Korea to a top-tier global manager will be determined by <span className="font-bold text-[#1e3a8a]">how successfully it completes IOTA</span>. Just as Blackstone became the global #1 manager after its IPO in 2007, for IGIS, IOTA is an institutional transformation event equivalent to an IPO.</>
                        )}
                    </p>

                    {/* Paragraph 3 */}
                    <p className={`text-[19px] md:text-[24px] font-medium text-gray-800 leading-[1.65] break-keep transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        {lang === 'kr' ? (
                            <>본 보고서가 제시하는 시나리오들은 확률적 분포이지 예언이 아님. 그러나 어느 시나리오에서도 IOTA는 이지스 brand가 한 단계 도약할 수 있는 유일하고 대체 불가능한 매개체라는 결론은 동일함. 따라서 향후 12개월의 본PF 클로징과 글로벌 LP 유치가 <span className="font-bold text-[#1e3a8a]">이지스의 향후 30년 trajectory를 좌우할 단일 의사결정 cluster</span>임을 강조하며 보고서를 마침.</>
                        ) : (
                            <>The scenarios presented in this report are probabilistic distributions, not prophecies. However, in every scenario, the conclusion remains the same: IOTA is the only irreplaceable medium through which the IGIS brand can take a quantum leap. Therefore, we conclude this report by emphasizing that the main PF closing and global LP attraction over the next 12 months is the <span className="font-bold text-[#1e3a8a]">single decision cluster that will dictate IGIS's trajectory for the next 30 years</span>.</>
                        )}
                    </p>
                </div>

                {/* Data Source */}
                <div className={`w-full border-t border-gray-300 pt-6 mt-12 md:mt-16 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed break-keep">
                        {lang === 'kr' ? (
                            <>본 보고서의 데이터는 IMF WEO, BOK, 통계청 KOSIS, MOEF, MOLIT, FSC, FSS, IMF Article IV 2025, CBRE Korea Q3 2025 Seoul Figures, Cushman &amp; Wakefield Seoul MarketBeat, Savills USA Seoul Prime Office Q3 2025, JLL Korea, Colliers Korea Senior Housing 2024, Invesco APAC Senior Living 2025, Mordor Intelligence Korea Data Center 2025, KED Global, Korea Herald, Maeil Business, Korea Economic Daily, Bloomberg, Reuters, JP Morgan Kospi 5000 보고서(2025.10), Macquarie Korea 2026 Outlook, McKinsey·BCG Korea AI Productivity, 인베스트조선, 토픽트리 등 다수 일차 소스를 종합·교차검증한 것임을 명시함. 단, 시나리오상 미래 수치는 추정치이며 시장 환경에 따라 변동 가능함.</>
                        ) : (
                            <>Data sources include IMF WEO, BOK, KOSIS, MOEF, MOLIT, FSC, FSS, IMF Article IV 2025, CBRE Korea Q3 2025 Seoul Figures, Cushman &amp; Wakefield Seoul MarketBeat, Savills USA Seoul Prime Office Q3 2025, JLL Korea, Colliers Korea Senior Housing 2024, Invesco APAC Senior Living 2025, Mordor Intelligence Korea Data Center 2025, KED Global, Korea Herald, Maeil Business, Korea Economic Daily, Bloomberg, Reuters, JP Morgan Kospi 5000 Report (2025.10), Macquarie Korea 2026 Outlook, McKinsey·BCG Korea AI Productivity, Invest Chosun, Topictree, and other primary sources. Future figures in scenarios are estimates subject to market conditions.</>
                        )}
                    </p>
                </div>
                
            </div>
        </section>
    );
}
