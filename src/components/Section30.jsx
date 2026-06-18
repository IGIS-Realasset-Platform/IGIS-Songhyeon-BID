import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section30({ isActive }) {
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
                        {lang === 'kr' ? 'MBD(마곡)와 BBD(판교)의 급부상' : 'Rapid Rise of MBD and BBD'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? 'R&D 테크 자본 집중으로 다극화된 서울 오피스 5대 권역 재편' : 'Reorganization into 5 Core Districts Driven by R&D and Tech Capital'}
                </h2>

                <div className="relative w-full max-w-[1000px] mt-[40px] mb-[30px] h-auto flex flex-col md:flex-row items-center justify-center z-10 gap-10">
                    
                    {/* MBD */}
                    <div className={`relative w-[400px] flex flex-col items-center bg-gray-50 border border-gray-300 rounded-[30px] p-10 shadow-xl hover:shadow-2xl transition-all duration-[765ms] hover:-translate-y-2 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="absolute -top-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[24px] px-6 py-2 rounded-full shadow-md">
                            MBD
                        </div>
                        <h3 className="text-[28px] font-extrabold text-gray-900 mt-6 mb-2">{lang === 'kr' ? '마곡권역' : 'Magok'}</h3>
                        <p className="text-[18px] font-bold text-gray-500 mb-8">{lang === 'kr' ? 'R&D 융복합 클러스터' : 'R&D Convergence Cluster'}</p>
                        
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex flex-col items-center justify-center bg-white py-4 rounded-xl border border-gray-300 shadow-sm">
                                <span className="font-bold text-[18px] text-gray-800">{lang === 'kr' ? 'LG사이언스파크' : 'LG Science Park'}</span>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-white py-4 rounded-xl border border-gray-300 shadow-sm">
                                <span className="font-bold text-[18px] text-gray-800">{lang === 'kr' ? '코오롱 One&Only타워' : 'Kolon One&Only Tower'}</span>
                            </div>
                        </div>
                    </div>

                    <div className={`text-[40px] font-black text-gray-300 transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        +
                    </div>

                    {/* BBD */}
                    <div className={`relative w-[400px] flex flex-col items-center bg-gray-50 border border-gray-300 rounded-[30px] p-10 shadow-xl hover:shadow-2xl transition-all duration-[765ms] hover:-translate-y-2 ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="absolute -top-6 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-black text-[24px] px-6 py-2 rounded-full shadow-md">
                            BBD
                        </div>
                        <h3 className="text-[28px] font-extrabold text-gray-900 mt-6 mb-2">{lang === 'kr' ? '분당·판교권역' : 'Bundang/Pangyo'}</h3>
                        <p className="text-[18px] font-bold text-gray-500 mb-8">{lang === 'kr' ? '한국의 실리콘밸리' : 'Silicon Valley of Korea'}</p>
                        
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex flex-col items-center justify-center bg-white py-4 rounded-xl border border-gray-300 shadow-sm">
                                <span className="font-bold text-[18px] text-gray-800">{lang === 'kr' ? '판교테크노밸리' : 'Pangyo Techno Valley'}</span>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-white py-4 rounded-xl border border-gray-300 shadow-sm">
                                <span className="font-bold text-[18px] text-gray-800">{lang === 'kr' ? '알파돔시티 / K-스퀘어' : 'Alpha Dome City / K-Square'}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>{lang === 'kr' ? <>2010년대 중반 이후 <strong>MBD(마곡)</strong>가 LG사이언스파크 등 거대 R&D 자본을 흡수하며 융복합 클러스터로 형성됨.</> : <>Since the mid-2010s, <strong>MBD (Magok)</strong> formed into a convergence cluster by absorbing massive R&D capital like LG Science Park.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>{lang === 'kr' ? <><strong>BBD(분당·판교)</strong>는 IT·테크 기업의 폭발적 성장과 함께 알파돔시티 등으로 대규모 확장.</> : <><strong>BBD (Bundang/Pangyo)</strong> underwent massive expansion through Alpha Dome City along with the explosive growth of IT/Tech companies.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>{lang === 'kr' ? <>결과적으로 1조→2조 달러 구간 동안 서울 오피스 시장은 전통 3대 권역에서 <strong>5대 권역으로 다극화</strong>되며 질적 성장을 이룸.</> : <>Consequently, during the $1T to $2T period, Seoul's office market achieved qualitative growth by <strong>multipolarizing from 3 traditional axes to 5 axes</strong>.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>Since the mid-2010s, <strong>MBD (Magok)</strong> formed a convergence cluster backed by R&D giants like LG Science Park.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span><strong>BBD (Bundang/Pangyo)</strong> massively expanded alongside the explosive growth of IT/Tech companies.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>Consequently, the Seoul office market diversified from 3 to <strong>5 major districts</strong> during the $1T-$2T era.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
