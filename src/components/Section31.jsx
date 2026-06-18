import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section31({ isActive }) {
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
                        {lang === 'kr' ? '자연 공실률 하한선 돌파' : 'Breaking Natural Vacancy Floor'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '코로나 이후의 급반등, 사실상 완전 임차에 도달하다' : 'Rapid Rebound Post-COVID, Reaching Full Occupancy'}
                </h2>

                <div className="relative w-full max-w-[1100px] mt-[40px] mb-[20px] h-auto flex flex-col items-center justify-center z-10 gap-4">
                    
                    {/* Timeline Graph */}
                    <div className={`w-full h-[150px] relative mb-2 transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {/* SVG Line */}
                        <svg className="absolute top-[50px] left-0 w-full h-[50px] z-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <path 
                                d="M 10,50 L 30,0 L 50,60 L 70,30 L 90,100" 
                                fill="none" stroke="#cbd5e1" strokeWidth="3" vectorEffect="non-scaling-stroke" 
                                strokeDasharray="6 6"
                            />
                        </svg>

                        {/* Points & Labels */}
                        <div className="absolute w-full h-full flex justify-between items-center z-10">
                            
                            {/* Point 1 */}
                            <div className="flex flex-col items-center justify-center absolute left-[10%] -translate-x-1/2" style={{ top: 'calc(50px + 50px * 0.5 - 8px)' }}>
                                <div className="w-4 h-4 rounded-full bg-blue-400 border-[3px] border-white shadow-sm mb-2 relative -top-2"></div>
                                <div className="text-center absolute top-4 w-[150px]">
                                    <div className="text-[13px] font-bold text-gray-400">{lang === 'kr' ? '2007~2010' : '2007-2010'}</div>
                                    <div className="text-[15px] font-bold text-gray-800">{lang === 'kr' ? '글로벌 금융위기' : 'Global Fin. Crisis'}</div>
                                    <div className="text-[16px] font-black text-blue-600">8~10%</div>
                                </div>
                            </div>
                            
                            {/* Point 2 */}
                            <div className="flex flex-col items-center justify-center absolute left-[30%] -translate-x-1/2" style={{ top: 'calc(50px + 50px * 0.0 - 8px)' }}>
                                <div className="text-center absolute bottom-4 w-[150px]">
                                    <div className="text-[13px] font-bold text-gray-400">{lang === 'kr' ? '2013~2015' : '2013-2015'}</div>
                                    <div className="text-[15px] font-bold text-gray-800 leading-tight">{lang === 'kr' ? '대형 공급(YBD)' : 'Massive Supply'}</div>
                                    <div className="text-[16px] font-black text-red-500">{lang === 'kr' ? '18% 상승' : 'Rose to 18%'}</div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-red-400 border-[3px] border-white shadow-sm relative top-2"></div>
                            </div>

                            {/* Point 3 */}
                            <div className="flex flex-col items-center justify-center absolute left-[50%] -translate-x-1/2" style={{ top: 'calc(50px + 50px * 0.6 - 8px)' }}>
                                <div className="w-4 h-4 rounded-full bg-gray-400 border-[3px] border-white shadow-sm mb-2 relative -top-2"></div>
                                <div className="text-center absolute top-4 w-[150px]">
                                    <div className="text-[13px] font-bold text-gray-400">{lang === 'kr' ? '2018~2019' : '2018-2019'}</div>
                                    <div className="text-[15px] font-bold text-gray-800">{lang === 'kr' ? '점진적 안정' : 'Stabilization'}</div>
                                </div>
                            </div>

                            {/* Point 4 */}
                            <div className="flex flex-col items-center justify-center absolute left-[70%] -translate-x-1/2" style={{ top: 'calc(50px + 50px * 0.3 - 8px)' }}>
                                <div className="text-center absolute bottom-4 w-[150px]">
                                    <div className="text-[13px] font-bold text-gray-400">{lang === 'kr' ? '2020~2021' : '2020-2021'}</div>
                                    <div className="text-[15px] font-bold text-gray-800">{lang === 'kr' ? '코로나 시기' : 'COVID Era'}</div>
                                    <div className="text-[15px] font-bold text-red-400">{lang === 'kr' ? '일시 상승' : 'Temp Rise'}</div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-red-400 border-[3px] border-white shadow-sm relative top-2"></div>
                            </div>

                            {/* Point 5 */}
                            <div className="flex flex-col items-center justify-center absolute left-[90%] -translate-x-1/2" style={{ top: 'calc(50px + 50px * 1.0 - 8px)' }}>
                                <div className="w-4 h-4 rounded-full bg-blue-600 border-[3px] border-white shadow-sm mb-2 relative -top-2"></div>
                                <div className="text-center absolute top-4 w-[150px]">
                                    <div className="text-[13px] font-bold text-gray-400">{lang === 'kr' ? '2022~' : '2022~'}</div>
                                    <div className="text-[16px] font-black text-blue-600">{lang === 'kr' ? '급격히 하락' : 'Sharp Drop'}</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Vacancy Highlight Box (Height reduced by 30px using py-[25px] instead of p-10) */}
                    <div className={`-mt-[6px] relative w-full flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-gray-900 to-black rounded-[24px] px-10 py-[25px] shadow-2xl transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
                        
                        <div className="flex-1 text-left flex flex-col gap-1">
                            <div className="text-gray-400 font-bold text-[18px]">{lang === 'kr' ? 'CBRE 2025년 3분기 기준' : 'CBRE Q3 2025'}</div>
                            <div className="text-white font-extrabold text-[30px] leading-tight break-keep">
                                {lang === 'kr' ? '서울 Grade-A 오피스 평균 공실률' : 'Seoul Grade-A Office Average Vacancy Rate'}
                            </div>
                        </div>

                        <div className={`flex flex-col items-center justify-center px-8 py-4 bg-white/10 rounded-[18px] backdrop-blur-sm border border-white/20 transition-all duration-[765ms] delay-[230ms] ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                            <div className="text-blue-400 font-black text-[64px] leading-none mb-1">
                                3.1<span className="text-[36px]">%</span>
                            </div>
                            <div className="text-white font-bold text-[16px]">Full Occupancy</div>
                        </div>

                    </div>

                    {/* Breakdown Cards */}
                    <div className="w-full flex justify-center gap-6 mt-2">
                        <div className={`flex-1 bg-white border border-gray-200 rounded-[20px] py-4 px-6 shadow-sm transition-all duration-[540ms] hover:-translate-y-2 delay-400 ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="text-gray-500 font-bold text-[15px] mb-1">GBD</div>
                            <div className="text-gray-900 font-black text-[32px]">1.5%</div>
                        </div>
                        <div className={`flex-1 bg-white border border-gray-200 rounded-[20px] py-4 px-6 shadow-sm transition-all duration-[540ms] hover:-translate-y-2 delay-[383ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="text-gray-500 font-bold text-[15px] mb-1">YBD</div>
                            <div className="text-gray-900 font-black text-[32px]">3.6%</div>
                        </div>
                        <div className={`flex-1 bg-white border border-gray-200 rounded-[20px] py-4 px-6 shadow-sm transition-all duration-[540ms] hover:-translate-y-2 delay-600 ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="text-gray-500 font-bold text-[15px] mb-1">CBD</div>
                            <div className="text-gray-900 font-black text-[32px]">4.1%</div>
                        </div>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-gray-500">▪</span><span>{lang === 'kr' ? <>2007~2010년 글로벌 금융위기로 8~10%대, 2013~2015년 대형 공급(IFC 등)으로 YBD 일시 18%까지 상승.</> : <>Rose to 8-10% during the 07-10 Global Financial Crisis, and YBD temporarily spiked to 18% due to large supplies (e.g. IFC) during 13-15.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-gray-500">▪</span><span>{lang === 'kr' ? <>2020~2021년 코로나 시기 일시 상승 후 2022년부터 급락, <strong>2025년 서울 Grade-A 공실률은 3.1%</strong> 기록.</> : <>After a temporary rise during the 20-21 COVID period, plummeted since 2022, recording a <strong>3.1% Grade-A vacancy rate in Seoul in 2025</strong>.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-gray-500">▪</span><span>{lang === 'kr' ? <>1조→2조 달러 구간 종료 시점, 서울 프라임 오피스는 사실상 <strong>자연 공실률을 하회하는 완전 임차 상태</strong> 도달.</> : <>At the end of the $1T to $2T period, Seoul prime offices practically reached a <strong>fully leased state below the natural vacancy rate</strong>.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-gray-500">▪</span><span>Historically rose to 8-10% post-GFC, and YBD hit 18% during massive supply waves (2013-2015).</span></li>
                                <li className="flex items-start"><span className="mr-3 text-gray-500">▪</span><span>Dropped sharply since 2022. By 2025, <strong>Seoul Grade-A vacancy reached 3.1%</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-gray-500">▪</span><span>At the end of the $1T-$2T era, prime offices have effectively reached <strong>Full Occupancy</strong> below natural vacancy.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
