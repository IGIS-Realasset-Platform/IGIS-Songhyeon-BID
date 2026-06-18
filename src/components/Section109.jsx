import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section109({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 857), // Left Box
            setTimeout(() => setStep(4), 1163), // Right Box
            setTimeout(() => setStep(5), 1622), // Bottom Text
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        {lang === 'kr' ? '패밀리오피스 & 연기금 파트너십' : 'Family Office & Pension Fund Partnerships'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>새로운 자본 풀(Pool)과 거대 연기금의 전략적 동맹</> : <>Strategic Alliance of New Capital Pools & Mega Pensions</>}
                </h2>

                {/* Infographic Area */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* Left: Emerging Family Office */}
                    <div className={`flex-[1] bg-white border-4 border-[#1d1d1f] rounded-none p-8 flex flex-col justify-between shadow-sm transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#1d1d1f] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Emerging Family Office
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    {lang === 'kr' ? '한국 신흥 패밀리오피스 자본' : 'Korea\'s Emerging Tech Wealth'}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 flex-1 mb-6 min-h-[160px]">
                                <div className="bg-gray-100 border border-gray-300 flex items-center justify-center font-black text-[#1d1d1f] text-[20px] md:text-[22px]">Coupang</div>
                                <div className="bg-gray-100 border border-gray-300 flex items-center justify-center font-black text-[#1d1d1f] text-[20px] md:text-[22px]">HYBE</div>
                                <div className="bg-gray-100 border border-gray-300 flex items-center justify-center font-black text-[#1d1d1f] text-[20px] md:text-[22px]">Celltrion</div>
                                <div className="bg-gray-100 border border-gray-300 flex items-center justify-center font-black text-[#1d1d1f] text-[20px] md:text-[22px]">Kakao</div>
                            </div>
                        </div>
                        <div className="bg-[#1d1d1f] text-white p-4 font-bold text-[18px] md:text-[20px]">
                            {lang === 'kr' ? '향후 5년, 테크 창업자 자본의 거대한 신규 위탁 풀 형성' : 'Massive new capital pool from tech founders over the next 5 years'}
                        </div>
                    </div>

                    {/* Right: Public Pension Funds */}
                    <div className={`flex-[1] bg-[#1e3a8a] border-4 border-[#1e3a8a] rounded-none p-8 flex flex-col justify-between shadow-md transition-all duration-[765ms] delay-[153ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Mega Public Pensions
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    {lang === 'kr' ? '국가 주도 초거대 연기금' : 'Sovereign-backed Mega Pensions'}
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-black text-white flex justify-between items-center text-[22px]">
                                    <span>{lang === 'kr' ? 'NPS (국민연금)' : 'NPS (National Pension Service)'}</span>
                                    <span className="text-[#93c5fd]">2026 AUM ~1,200T KRW</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 flex-[1.5]">
                                    <div className="bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-center text-[17px]">{lang === 'kr' ? '교직원공제회' : 'KTCU'}</div>
                                    <div className="bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-center text-[17px]">{lang === 'kr' ? '행정공제회' : 'POBA'}</div>
                                    <div className="bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-center text-[17px]">{lang === 'kr' ? '우정사업본부' : 'Korea Post'}</div>
                                    <div className="bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-center text-[17px]">{lang === 'kr' ? '새마을금고' : 'KFCC'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white text-[#1e3a8a] p-4 font-black text-[18px] md:text-[20px]">
                            {lang === 'kr' ? <>NPS 해외 부동산 확대 정책 ↔ 이지스 글로벌 펀드의<br/>완벽한 얼라인먼트</> : <>Perfect alignment: NPS overseas expansion ↔ IGIS Global Funds</>}
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`max-w-[1200px] mt-2 text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '전통적인 기관 자본(연기금)과 신흥 거대 자본(테크 패밀리오피스)을 아우르는 이중 포섭 전략' : 'Dual-engagement strategy encompassing traditional mega-institutions and emerging tech wealth'}</span></li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
