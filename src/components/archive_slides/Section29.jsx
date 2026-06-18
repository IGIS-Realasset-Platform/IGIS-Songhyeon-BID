import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section29({ isActive }) {
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
                        {lang === 'kr' ? '3대 핵심 권역(CBD/GBD/YBD)의 골격' : 'Foundation of 3 Core Districts'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? 'SFC부터 파크원까지 트로피 자산이 주도한 권역별 랜드마크 진화' : 'Trophy Assets like SFC to Parc1 Driving District Evolution'}
                </h2>

                <div className="relative w-full max-w-[1200px] mt-[40px] mb-[30px] h-auto flex flex-col md:flex-row items-stretch justify-center z-10 gap-6 md:gap-8">
                    
                    {/* CBD */}
                    <div className={`flex-1 flex flex-col items-center bg-gray-50 border border-gray-300 rounded-[24px] p-8 shadow-lg hover:shadow-2xl transition-all duration-[540ms] hover:-translate-y-2 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-black text-[32px] mb-6 shadow-sm">CBD</div>
                        <h3 className="text-[26px] font-extrabold text-gray-900 mb-2">{lang === 'kr' ? '도심권역' : 'Central'}</h3>
                        <p className="text-[18px] font-bold text-gray-500 mb-6">{lang === 'kr' ? '광화문·시청·종로' : 'Gwanghwamun·Jongno'}</p>
                        <div className="w-full flex flex-col gap-3">
                            <div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">SFC (2002)</div>
                            <div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">{lang === 'kr' ? '종로타워 / 그랑서울 (2014)' : 'Jongno Tower / Gran Seoul (2014)'}</div>
                            <div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">{lang === 'kr' ? 'D타워 (2017) / 센트로폴리스 (2018)' : 'D Tower (2017) / Centropolis (2018)'}</div>
                        </div>
                    </div>

                    {/* GBD */}
                    <div className={`flex-1 flex flex-col items-center bg-gray-50 border border-gray-300 rounded-[24px] p-8 shadow-lg hover:shadow-2xl transition-all duration-[540ms] hover:-translate-y-2 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-[32px] mb-6 shadow-sm">GBD</div>
                        <h3 className="text-[26px] font-extrabold text-gray-900 mb-2">{lang === 'kr' ? '강남권역' : 'Gangnam'}</h3>
                        <p className="text-[18px] font-bold text-gray-500 mb-6">{lang === 'kr' ? '테헤란로 라인 핵심' : 'Teheran-ro Core'}</p>
                        <div className="w-full flex flex-col gap-3">
                            <div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">GFC (2001)</div>
                            <div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">{lang === 'kr' ? '파르나스타워 (2016)' : 'Parnas Tower (2016)'}</div>
                            <div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">{lang === 'kr' ? '캐피탈타워 (1998)' : 'Capital Tower (1998)'}</div>
                        </div>
                    </div>

                    {/* YBD */}
                    <div className={`flex-1 flex flex-col items-center bg-gray-50 border border-gray-300 rounded-[24px] p-8 shadow-lg hover:shadow-2xl transition-all duration-[540ms] hover:-translate-y-2 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-[32px] mb-6 shadow-sm">YBD</div>
                        <h3 className="text-[26px] font-extrabold text-gray-900 mb-2">{lang === 'kr' ? '여의도권역' : 'Yeouido'}</h3>
                        <p className="text-[18px] font-bold text-gray-500 mb-6">{lang === 'kr' ? '두 번의 거대한 변곡점' : 'Two Major Turning Points'}</p>
                        <div className="w-full flex flex-col gap-3">
                            <div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">{lang === 'kr' ? 'IFC 서울 (2012)' : 'IFC Seoul (2012)'}</div>
                            <div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">{lang === 'kr' ? '파크원 Parc1 (2020)' : 'Parc1 (2020)'}</div>
                            <div className="bg-transparent px-4 py-3"></div>
                        </div>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span>{lang === 'kr' ? <>2007년 서울 오피스 시장은 <strong>CBD(광화문·시청·종로)</strong> 중심이었으며, SFC부터 센트로폴리스까지 핵심 랜드마크가 골격을 형성.</> : <>In 2007, Seoul's office market was centered around <strong>CBD (Gwanghwamun/City Hall/Jongno)</strong>, with core landmarks from SFC to Centropolis forming the framework.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span>{lang === 'kr' ? <><strong>GBD(강남)</strong>는 GFC와 파르나스타워 등 테헤란로 중심, <strong>YBD(여의도)</strong>는 IFC와 파크원으로 거대한 변곡점을 맞이함.</> : <><strong>GBD (Gangnam)</strong> centered around Teheran-ro with GFC and Parnas Tower, while <strong>YBD (Yeouido)</strong> reached massive inflection points with IFC and Parc1.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span>In 2007, the market centered on <strong>CBD</strong>, with landmarks like SFC shaping its foundation.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span><strong>GBD</strong> grew around Teheran-ro (GFC, Parnas Tower), while <strong>YBD</strong> hit major turning points via IFC and Parc1.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
