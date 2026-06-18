import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section20({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

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
                        {lang === 'kr' ? 'K-바이오 클러스터의 성공적 안착' : 'Successful Settlement of the K-Bio Cluster'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '1조 달러 초입에는 존재하지 않았던 CDMO 글로벌 1위의 탄생' : 'Birth of Global #1 CDMO, Non-existent at the Dawn of the $1T Era'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-center z-10 gap-10">
                    
                    {/* The Void (2007) */}
                    <div className={`relative flex flex-col items-center justify-center w-[200px] h-[200px] rounded-full border-4 border-dashed border-gray-300 transition-all duration-[765ms] ${step >= 2 ? 'opacity-100' : 'opacity-0 -translate-x-10'}`}>
                        <span className="text-[20px] font-black text-gray-400">2007 Era</span>
                        <span className="text-[14px] font-bold text-gray-400 mt-2">{lang === 'kr' ? '산업 존재감 미미' : 'Negligible Presence'}</span>
                    </div>

                    {/* Arrow */}
                    <div className={`flex items-center transition-all duration-[765ms] ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-[120px] h-[4px] bg-gradient-to-r from-gray-300 to-[#0ea5e9] relative">
                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-[#0ea5e9]"></div>
                        </div>
                    </div>

                    {/* The Success (Present) */}
                    <div className={`relative flex flex-col items-center justify-center w-[260px] h-[260px] rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] shadow-2xl border-4 border-white transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 translate-x-10'}`}>
                        <span className="text-[14px] font-bold text-sky-200 mb-1">Samsung Biologics</span>
                        <span className="text-[36px] font-black text-white leading-none mb-1">Global #1</span>
                        <span className="text-[20px] font-bold text-white mb-3">CDMO</span>
                        <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            <span className="text-[12px] font-bold text-white">{lang === 'kr' ? '매출 4조+ / 시총 50조+' : 'Rev 4T+ / Cap 50T+'}</span>
                        </div>
                        <span className="text-[12px] font-bold text-sky-100 mt-3">+ Celltrion Biosimilars</span>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#0ea5e9]">▪</span><span>{lang === 'kr' ? <>바이오/제약 산업은 1조 달러 시대 초입(2007년 경)에는 <strong>글로벌 존재감이 거의 없었던 새로운 산업</strong>임.</> : <>Bio/Pharma was a <strong>new industry with almost no global presence</strong> in the early $1T era (around 2007).</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#0ea5e9]">▪</span><span>{lang === 'kr' ? <>현재 삼성바이오로직스는 <strong>CDMO(위탁개발생산) 분야 글로벌 1위</strong>(매출 4조 원+, 시총 50조 원+)로 등극함.</> : <>Samsung Biologics is now <strong>Global #1 in CDMO</strong> (Revenue 4T KRW+, Market Cap 50T KRW+).</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#0ea5e9]">▪</span><span>{lang === 'kr' ? <>셀트리온의 바이오시밀러 글로벌 진출 등과 맞물려 <strong>K-바이오 클러스터</strong>가 한국 경제의 신성장 동력으로 안착함.</> : <>Coupled with Celltrion's global biosimilar expansion, the <strong>K-Bio Cluster</strong> settled as Korea's new growth engine.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#0ea5e9]">▪</span><span>Bio/Pharma is a new industry that had <strong>almost no global presence</strong> at the dawn of the $1T era.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#0ea5e9]">▪</span><span>Samsung Biologics has now risen to <strong>Global #1 in CDMO</strong> (Revenue 4T+ KRW, Market Cap 50T+ KRW).</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#0ea5e9]">▪</span><span>Coupled with Celltrion's biosimilar expansion, the <strong>K-Bio cluster</strong> has successfully settled as a new growth engine.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
