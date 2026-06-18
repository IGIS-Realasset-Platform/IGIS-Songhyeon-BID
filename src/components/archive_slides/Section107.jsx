import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section107({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 857), // Pillars
            setTimeout(() => setStep(4), 1163), // Arrow
            setTimeout(() => setStep(5), 1469), // Right Targets
            setTimeout(() => setStep(6), 1928), // Bottom text
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        {lang === 'kr' ? 'Cross-over 전략' : 'Cross-over Strategy'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>부동산, 인프라, PE의 경계를 허무는 통합 투자</> : <>Integrated Investment Crossing Real Estate, Infra & PE</>}
                </h2>

                {/* Infographic Area */}
                <div className="w-full max-w-[1060px] mt-[20px] mb-[36px] flex flex-col md:flex-row items-stretch gap-4 justify-center">
                    
                    {/* Left: 3 Pillars */}
                    <div className={`flex-[0.8] bg-white border-4 border-[#1e3a8a] rounded-none p-8 flex flex-col items-center justify-center shadow-sm transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                        <div className="text-left w-full mb-4">
                            <div className="font-black text-[#1e3a8a] text-[22px]">{lang === 'kr' ? '자산군 통합 운영 (Integration)' : 'Asset Class Integration'}</div>
                            <div className="font-bold text-gray-700 text-[16px] mt-2">{lang === 'kr' ? <>부동산, 인프라, PE를 하나로 결합하여<br/>융복합 시너지 및 초과 수익(Alpha) 창출</> : <>Combining Real Estate, Infra, and PE into one<br/>to create convergence synergy and Alpha.</>}</div>
                        </div>
                        <div className="w-full flex justify-between gap-4 h-[120px] items-end border-b-4 border-[#1e3a8a] pb-4">
                            <div className="flex-1 bg-gray-200 h-[60%] flex items-center justify-center font-black text-[#1e3a8a] text-[18px] md:text-[22px]">RE</div>
                            <div className="flex-1 bg-gray-300 h-[80%] flex items-center justify-center font-black text-[#1e3a8a] text-[18px] md:text-[22px]">Infra</div>
                            <div className="flex-1 bg-gray-400 h-[50%] flex items-center justify-center font-black text-[#1e3a8a] text-[18px] md:text-[22px]">PE</div>
                        </div>
                        <div className="mt-5 bg-[#1e3a8a] text-white p-3 font-bold text-[15px] w-full text-left break-keep">
                            {lang === 'kr' ? '💡 벤치마크: 블랙스톤(Blackstone)이 2014년 인프라 펀드 출시 후 AUM을 2배 도약시킨 패턴을 적용' : '💡 Benchmark: Applying Blackstone’s pattern of doubling AUM after launching its infra fund in 2014'}
                        </div>
                    </div>

                    {/* Middle: Arrow/Transition */}
                    <div className={`flex items-center justify-center px-4 transition-all duration-[540ms] ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </div>

                    {/* Right: Cross-over Targets */}
                    <div className={`flex-[1.2] flex flex-col gap-4 transition-all duration-[765ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {/* Target 1 */}
                        <div className="flex-1 bg-white border-4 border-[#1e3a8a] rounded-none p-4 flex items-center shadow-sm">
                            <div className="w-[60px] h-[60px] shrink-0 bg-[#1e3a8a] text-white flex items-center justify-center font-black text-[24px]">1</div>
                            <div className="ml-5 text-left">
                                <div className="font-black text-[#1d1d1f] text-[20px] md:text-[22px]">{lang === 'kr' ? '데이터센터 (Data Center)' : 'Data Center'}</div>
                                <div className="text-gray-600 font-bold mt-1">{lang === 'kr' ? '부동산과 통신 인프라의 완벽한 융합' : 'Perfect fusion of real estate and telecom infra'}</div>
                            </div>
                        </div>
                        {/* Target 2 */}
                        <div className="flex-1 bg-white border-4 border-[#1e3a8a] rounded-none p-4 flex items-center shadow-sm">
                            <div className="w-[60px] h-[60px] shrink-0 bg-[#1e3a8a] text-white flex items-center justify-center font-black text-[24px]">2</div>
                            <div className="ml-5 text-left">
                                <div className="font-black text-[#1d1d1f] text-[20px] md:text-[22px]">{lang === 'kr' ? '신재생 인프라 (Renewable)' : 'Renewable Infra'}</div>
                                <div className="text-gray-600 font-bold mt-1">{lang === 'kr' ? '수소 연료전지 및 ESS 블라인드펀드' : 'Hydrogen fuel cell & ESS blind funds'}</div>
                            </div>
                        </div>
                        {/* Target 3 */}
                        <div className="flex-1 bg-white border-4 border-[#1e3a8a] rounded-none p-4 flex items-center shadow-sm">
                            <div className="w-[60px] h-[60px] shrink-0 bg-[#1e3a8a] text-white flex items-center justify-center font-black text-[24px]">3</div>
                            <div className="ml-5 text-left">
                                <div className="font-black text-[#1d1d1f] text-[20px] md:text-[22px]">{lang === 'kr' ? '시니어/헬스케어 (Healthcare)' : 'Senior/Healthcare'}</div>
                                <div className="text-gray-600 font-bold mt-1">{lang === 'kr' ? '부동산 공간과 오퍼레이션(PE)의 결합' : 'Combining real estate space with operations (PE)'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`max-w-[1200px] mt-2 text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '블랙스톤(Blackstone)이 2014년 인프라 펀드 출시 후 AUM을 2배 도약시킨 패턴을 벤치마크' : 'Benchmarking Blackstone’s pattern of doubling AUM after launching an infra fund in 2014'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1e3a8a]">▪</span><span className="text-[#1e3a8a]">{lang === 'kr' ? '이지스 역시 자산군 간의 경계(Cross-over)에서 발생하는 고수익 알파(Alpha)를 선점' : 'IGIS also pre-empts high-return Alpha generated at the boundaries (Cross-over) between asset classes'}</span></li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
