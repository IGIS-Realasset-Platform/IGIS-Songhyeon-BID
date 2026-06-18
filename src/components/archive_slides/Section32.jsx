import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section32({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) {
            setStep(20);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 765),
            setTimeout(() => setStep(3), 1132),
            setTimeout(() => setStep(4), 1591),
            setTimeout(() => setStep(5), 2050)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '도쿄와의 격차, 그리고 수렴의 법칙' : 'The Gap with Tokyo & Law of Convergence'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '누적 50% 상승에도 여전히 2배 높은 마루노우치가 제시하는 상승 여력' : 'Upside Potential Suggested by Marunouchi, Still 2x Higher Despite 50% Growth'}
                </h2>

                <div className="relative w-full max-w-[1100px] mt-[40px] mb-[30px] h-auto flex flex-col items-center justify-center z-10 gap-10">
                    
                    <div className={`w-full flex justify-between items-end pb-8 border-b-2 border-gray-100 transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        
                        {/* Seoul Office Rent */}
                        <div className="flex flex-col items-start w-[45%]">
                            <div className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-full mb-4">Seoul Prime</div>
                            <div className="text-[20px] font-bold text-gray-500 mb-1">{lang === 'kr' ? '2025년 3분기 평균 명목임대료' : 'Q3 2025 Avg. Face Rent'}</div>
                            <div className="text-[48px] font-black text-gray-900 leading-none mb-4">13.2<span className="text-[24px]">{lang === 'kr' ? '만 원' : '0K KRW'}</span><span className="text-[16px] text-gray-400 font-bold ml-2">{lang === 'kr' ? '/평·월' : '/pyeong·month'}</span></div>
                            
                            <div className="w-full flex items-center gap-2">
                                <div className="h-6 w-1/2 bg-blue-300 rounded-l-full relative">
                                    <div className="absolute top-8 left-0 text-[14px] font-bold text-gray-400">{lang === 'kr' ? '2007: 9만 원' : '2007: 90K KRW'}</div>
                                </div>
                                <div className="h-6 w-1/2 bg-blue-600 rounded-r-full relative flex items-center">
                                    <div className="absolute -top-10 right-0 bg-blue-600 text-white font-bold px-3 py-1 rounded-lg shadow-sm">
                                        +50%
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gap */}
                        <div className={`flex flex-col items-center pb-6 transition-all duration-[765ms] delay-[230ms] ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                            <div className="text-[24px] font-black text-gray-300 mb-2">Gap-to-Tokyo</div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                                <div className="text-gray-500 font-bold ml-2">{lang === 'kr' ? '여전히 50% 이상 격차' : 'Still >50% gap'}</div>
                            </div>
                        </div>

                        {/* Tokyo Office Rent */}
                        <div className="flex flex-col items-end w-[45%] text-right">
                            <div className="bg-red-100 text-red-700 font-bold px-4 py-2 rounded-full mb-4">Tokyo Marunouchi</div>
                            <div className="text-[20px] font-bold text-gray-500 mb-1">{lang === 'kr' ? '프라임 임대료 (환산)' : 'Prime Rent (Converted)'}</div>
                            <div className="text-[48px] font-black text-gray-900 leading-none mb-4">200<span className="text-[24px]">$+</span><span className="text-[16px] text-gray-400 font-bold ml-2">/sqft</span></div>
                            
                            <div className="w-full flex items-center justify-end gap-2">
                                <div className="h-6 w-[80%] bg-red-600 rounded-full relative flex items-center justify-end pr-4 text-white font-bold">
                                    {lang === 'kr' ? '서울의 약 2배 수준' : 'Approx 2x of Seoul'}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-red-500">▪</span><span>{lang === 'kr' ? <>서울 프라임 명목임대료는 2007년 9만 원에서 <strong>2025년 3분기 13.2만 원</strong>으로 18년간 누적 50% 상승.</> : <>Seoul prime nominal rent rose from 90K KRW in 2007 to <strong>132K KRW in Q3 2025</strong>, a cumulative 50% increase over 18 years.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-red-500">▪</span><span>{lang === 'kr' ? <>그러나 도쿄 마루노우치 프라임 임대료는 약 200달러대까지 상승하며 <strong>서울의 약 2배 수준을 여전히 유지</strong>.</> : <>However, Tokyo Marunouchi prime rents rose to the $200 range, <strong>still maintaining roughly double the level of Seoul</strong>.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-red-500">▪</span><span>{lang === 'kr' ? <>이는 글로벌 갭(gap-to-Tokyo)이 여전히 50% 이상 남아있음을 의미하며, 향후 <strong>트로피 자산의 Rent Re-pricing 정량적 근거</strong>가 됨.</> : <>This means the global gap (gap-to-Tokyo) remains over 50%, serving as the <strong>quantitative basis for future Rent Re-pricing of trophy assets</strong>.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-red-500">▪</span><span>Seoul Prime rent grew by 50% over 18 years, reaching <strong>132,000 KRW/pyeong in Q3 2025</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-red-500">▪</span><span>However, Tokyo Marunouchi rent rose to $200+, <strong>maintaining roughly a 2x multiple over Seoul</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-red-500">▪</span><span>This remaining 50%+ gap-to-Tokyo serves as the <strong>quantitative thesis for future rent re-pricing</strong> of trophy assets.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
