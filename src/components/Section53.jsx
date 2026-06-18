import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section53({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const t1 = setTimeout(() => setStep(1), 230);
        const t2 = setTimeout(() => setStep(2), 689);
        const t3 = setTimeout(() => setStep(3), 872);
        const t4 = setTimeout(() => setStep(4), 1102);
        const t5 = setTimeout(() => setStep(5), 1484);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* Theme */}
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? '방산·우주' : 'Defense & Space'}</span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '2030년 500억 달러 수출을 겨냥하는<br/>K-디펜스의 퀀텀 점프' : 'Quantum Jump of K-Defense<br/>Targeting $50B Exports by 2030' }}>
                </h2>

                {/* Middle Infographic (3 Dry Boxes) */}
                <div className="relative w-full max-w-[1250px] mt-[40px] mb-[30px] h-auto flex flex-col md:flex-row items-stretch justify-center z-10 gap-6">
                    
                    {/* Base Box */}
                    <div className={`flex-1 bg-white border-[6px] border-gray-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <span className="text-[20px] font-bold text-gray-500 mb-4 uppercase">Base Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-gray-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-black leading-snug break-keep" dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '우주·방산 글로벌 진출<br/>안정적 시장 확보' : 'Global Space/Defense<br/>Stable Market Secured' }}></p>
                    </div>

                    {/* Bull Box */}
                    <div className={`flex-1 bg-[#f8fbff] border-[6px] border-blue-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[153ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <span className="text-[20px] font-bold text-blue-500 mb-4 uppercase">Bull Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-blue-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-[#0055ff] leading-snug break-keep" dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '2030년 방산 수출<br/>500억 달러 (현재 3배)' : '2030 Defense Exports<br/>$50B (3x Current)' }}></p>
                    </div>

                    {/* Bear Box */}
                    <div className={`flex-1 bg-[#fff8f8] border-[6px] border-red-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-400 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <span className="text-[20px] font-bold text-red-500 mb-4 uppercase">Bear Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-red-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-[#e11d48] leading-snug break-keep" dangerouslySetInnerHTML={{ __html: lang === 'kr' ? '지정학적 리스크<br/>완화 시 모멘텀 축소' : 'Momentum Shrinks if<br/>Geopolitical Risk Eases' }}></p>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? 'KAI, 한화, KARI가 주도하는 K-방산과 우주 산업의 구조적 퀀텀 점프 기대' : 'Structural quantum jump expected in K-Defense and Space led by KAI, Hanwha, KARI'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '1조 달러대 거대 글로벌 시장에서 지정학적 갈등을 기회로 삼는 새로운 신데렐라 산업' : 'A new Cinderella industry leveraging geopolitical conflicts in a $1T global market'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '미·중 패권 경쟁 및 유라시아 긴장 국면이 오히려 수출의 장기 슈퍼사이클을 지지' : 'US-China rivalry and Eurasian tensions support a long-term export supercycle'}</span></li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
