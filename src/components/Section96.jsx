import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section96({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918), // Left: WeWork vs IGIS
            setTimeout(() => setStep(4), 1300), // Right: Mori Building
            setTimeout(() => setStep(5), 1912)  // Bottom
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? 'WeWork의 Institutional Version' : 'Institutional Version of WeWork'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-[40px] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>WeWork의 구조적 한계 극복과 글로벌 벤치마크 '수직 도시'</> : <>Overcoming WeWork's Structural Limits & Global Benchmark 'Vertical City'</>}
                </h2>

                <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative">
                    
                    {/* Left: WeWork vs IGIS (Institutional Version) */}
                    <div className={`col-span-1 bg-white border-2 border-gray-200 rounded-2xl p-8 h-fit shadow-sm flex flex-col gap-5 transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-red-600 text-white text-[16px] font-bold px-3 py-1 rounded-md">Limit</span>
                            <h3 className="text-gray-800 font-extrabold text-[20px] break-keep">
                                {lang === 'kr' ? "WeWork 실패의 본질적 한계" : "Fundamental Limits of WeWork's Failure"}
                            </h3>
                        </div>
                        <p className="text-red-500 font-bold text-[18px] pl-2 border-l-4 border-red-500 mb-2">
                            {lang === 'kr' ? '(1) 자기 자본 미보유 & (2) 단기-장기 임대료 미스매치' : '(1) No Own Capital & (2) Short/Long-term Rent Mismatch'}
                        </p>
                        
                        <div className="h-[1px] w-full bg-gray-200 my-2"></div>

                        <div className="flex items-center gap-3">
                            <span className="bg-[#1e3a8a] text-white text-[16px] font-bold px-3 py-1 rounded-md">Solution</span>
                            <h3 className="text-[#1e3a8a] font-extrabold text-[20px] break-keep">
                                {lang === 'kr' ? "IGIS의 Institutional Version" : "IGIS's Institutional Version"}
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-[#1e3a8a] text-white rounded-xl p-4 flex items-center justify-center font-bold text-[18px] shadow-md">
                                1. {lang === 'kr' ? 'Capital (거대 자본력)' : 'Capital (Massive Capital Power)'}
                            </div>
                            <div className="bg-blue-600 text-white rounded-xl p-4 flex items-center justify-center font-bold text-[18px] shadow-md relative z-0">
                                2. {lang === 'kr' ? 'Real Estate Ownership (실물 자산 보유)' : 'Real Estate Ownership'}
                            </div>
                            <div className="bg-blue-400 text-white rounded-xl p-4 flex items-center justify-center font-bold text-[18px] shadow-md relative z-0">
                                3. {lang === 'kr' ? 'Operating Layer (공간 운영 OS)' : 'Operating Layer (Spatial Operations OS)'}
                            </div>
                        </div>
                    </div>

                    {/* Right: Mori Building Benchmark */}
                    <div className={`col-span-1 bg-[#1e3a8a] border-2 border-[#1e3a8a] rounded-2xl p-8 h-full shadow-xl flex flex-col gap-6 transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white font-extrabold text-[24px] break-keep">
                                {lang === 'kr' ? "글로벌 벤치마크 모델" : "Global Benchmark Model"}
                            </h3>
                            <span className="bg-white text-blue-800 text-[14px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Mori Building</span>
                        </div>
                        
                        <div className="bg-white/10 rounded-xl p-6 border border-white/20 flex-1">
                            <h4 className="text-blue-200 font-bold text-[20px] mb-3">{lang === 'kr' ? '모리빌딩, 토라노몬 & 아자부다이 힐스 (2023)' : 'Mori Building, Toranomon & Azabudai Hills (2023)'}</h4>
                            <p className="text-white text-[17px] leading-relaxed break-keep">
                                {lang === 'kr' 
                                    ? (lang === 'kr' ? <>글로벌 비교 시 모리빌딩의 운영 모델에 가장 근접.<br/>압도적 자본력과 실물 자산, 그리고 섬세한 운영 역량을<br/>완벽하게 결합한 성공 사례</> : <>Closest to Mori Building's operating model in global comparison.<br/>A successful case perfectly combining overwhelming capital, physical assets, and delicate operational capabilities.</>) 
                                    : 'Closest to Mori Building\'s operational model. A successful case that perfectly combines overwhelming capital, physical assets, and delicate operational capabilities.'}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-lg mt-auto">
                            <h4 className="text-[#1e3a8a] font-black text-[22px] mb-2">{lang === 'kr' ? '"수직 도시 (Vertical City)" 컨셉 차용' : 'Adopting "Vertical City" Concept'}</h4>
                            <p className="text-gray-700 font-bold text-[16px] break-keep">
                                {lang === 'kr' 
                                    ? (lang === 'kr' ? '임차 · 주거 · 문화 · F&B를 하나로 묶어 통합 운영하는 Mori의 모델을 IOTA에 직접 적용' : 'Directly applying Mori\'s model of integrating leasing, residential, culture, and F&B into unified operations to IOTA.') 
                                    : 'Directly applying Mori\'s model of integrated operation of office, residential, culture, and F&B into IOTA'}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Thesis Text */}
                <div className={`w-full max-w-[1100px] bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[17px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed text-center">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? <>자본력(Capital)과 소유권(Ownership), 그리고 운영(Operating) 역량을 모두 갖춘 이지스가<br/>WeWork의 실패를 넘어서는 기관용(Institutional) 공간 운영 플랫폼 실현 가능</> : <>IGIS, equipped with Capital, Ownership, and Operating capabilities, can realize an Institutional spatial operations platform transcending WeWork's failure.</>)
                            : <>IGIS, equipped with Capital, Ownership, and Operating capabilities,<br/>can realize an Institutional spatial platform overcoming WeWork's failures</>
                        }
                    </p>
                </div>

            </div>
        </section>
    );
}
