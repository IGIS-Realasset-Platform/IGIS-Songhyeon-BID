import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section76({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 1102)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '외국인 자본의 트로피 매입 사이클 진입' : 'Entry into Foreign Capital Trophy Acquisition Cycle'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-12 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>한국판 Reversal: 헐값 매각에서 프리미엄 매입 시대로</> : <>Korean Reversal: From Fire Sale to Premium Acquisition Era</>}
                </h2>

                {/* Historic Reversal Comparison */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[40px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 transition-all duration-[765ms]">
                    
                    {/* Past (IMF) */}
                    <div className={`flex-1 w-full bg-gray-50 border-[6px] border-gray-300 p-10 flex flex-col items-center text-center relative grayscale opacity-70 transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="absolute -top-5 bg-gray-300 text-gray-800 px-6 py-2 font-black text-[18px] uppercase tracking-wider">
                            1996~2000
                        </div>
                        <h3 className="text-[36px] md:text-[42px] font-black text-gray-700 mt-4 mb-4 leading-tight">{lang === 'kr' ? 'IMF 외환위기 시대' : 'IMF Crisis Era'}</h3>
                        <div className="text-[20px] font-bold text-gray-500 mb-6">{lang === 'kr' ? '자산 헐값 매각 (Fire Sale)' : 'Fire Sale of Assets'}</div>
                        <p className="text-[18px] font-medium text-gray-600 break-keep">
                            {lang === 'kr' ? '거시 경제의 붕괴로 인해 생존을 위해 알짜 자산과 빌딩들을 외국계 자본에 헐값으로 넘겨야 했던 시기' : 'A period of handing over prime assets to foreign capital at rock-bottom prices for survival due to macro collapse'}
                        </p>
                    </div>

                    {/* Arrow / Reversal icon */}
                    <div className={`hidden md:flex flex-col items-center justify-center transition-all duration-[765ms] delay-[117ms] ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <div className="w-16 h-16 bg-[#1d1d1f] text-white rounded-full flex items-center justify-center text-[24px]">
                            ➔
                        </div>
                        <div className="text-[#1d1d1f] font-black text-[16px] uppercase tracking-widest mt-3">Reversal</div>
                    </div>

                    {/* Present/Future (Premium) */}
                    <div className={`flex-1 w-full bg-white border-[6px] border-[#1e3a8a] p-10 flex flex-col items-center text-center shadow-2xl relative transition-all duration-[765ms] delay-[230ms] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="absolute -top-5 bg-[#1e3a8a] text-white px-6 py-2 font-black text-[18px] uppercase tracking-wider">
                            2025~2030 (Now)
                        </div>
                        <h3 className="text-[36px] md:text-[42px] font-black text-[#1e3a8a] mt-4 mb-4 leading-tight">{lang === 'kr' ? '첫 프리미엄 매입 사이클' : 'First Premium Acquisition Cycle'}</h3>
                        <div className="text-[20px] font-bold text-[#1e3a8a] mb-6">{lang === 'kr' ? '글로벌 자본의 핵심 트렌드' : 'Core Trend of Global Capital'}</div>
                        <p className="text-[18px] font-medium text-gray-800 break-keep">
                            {lang === 'kr' ? '과거와 정반대로, 이제는 프리미엄 가격을 지불하고서라도 한국의 트로피 자산을 매입하려는 글로벌 펀드들의 본격 진입기' : 'Conversely, global funds are now fully entering to acquire Korea\'s trophy assets even if paying a premium price'}
                        </p>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '2025년 Aberdeen Pacific Tower, BentallGreenOak Tower 730, PAG·Koramco Digital Dream Tower 등 실사례 다수 포진' : 'Multiple live cases in 2025: Aberdeen (Pacific Tower), BGO (Tower 730), PAG (Digital Dream Tower)'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span className="text-[#1d1d1f]">{lang === 'kr' ? '이는 1980년대 막강한 현금력을 바탕으로 미국 록펠러센터·Pebble Beach를 매입하던 일본 자본 사이클의 한국판 Reversal' : 'A Korean Reversal similar to 1980s Japanese capital buying Rockefeller Center/Pebble Beach with massive cash flow'}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
