import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section40({ isActive }) {
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
            setTimeout(() => setStep(3), 1255),
            setTimeout(() => setStep(4), 1867),
            setTimeout(() => setStep(5), 2326)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? 'IFC 서울이 남긴 글로벌 자본 유입의 유산' : 'Legacy of Global Capital Inflow by IFC'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '외인 자본 유치로 4.1조 퀀텀 점프한 IFC 모델을 재현' : 'Inheriting the Model that Quantum-Jumped to 4.1T via Foreign Capital'}
                </h2>

                <div className="relative w-full max-w-[1000px] mt-[60px] mb-[40px] flex flex-col md:flex-row items-stretch justify-center z-10 gap-12">
                    
                    {/* Value Jump Visualization (Left Box) */}
                    <div className={`relative flex flex-col justify-center items-center bg-white border border-gray-200 rounded-[30px] p-8 shadow-xl transition-all duration-[765ms] w-[450px] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="text-gray-500 font-black text-[22px] mb-6">{lang === 'kr' ? 'IFC 서울 자산 가치' : 'IFC Seoul Asset Value'}</div>
                        
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex flex-col items-center">
                                <span className="text-gray-400 font-bold text-[16px]">{lang === 'kr' ? '2012년 준공 당시' : 'At Completion (2012)'}</span>
                                <span className="text-gray-800 font-black text-[32px]">{lang === 'kr' ? '약 9,500억 원' : '~950B KRW'}</span>
                            </div>
                            
                            <div className={`flex items-center justify-center transition-all duration-[765ms] delay-[230ms] ${step >= 3 ? 'opacity-100 h-16' : 'opacity-0 h-0 overflow-hidden'}`}>
                                <div className="flex flex-col items-center">
                                    <div className="text-blue-600 font-black text-[18px] mb-1">{lang === 'kr' ? '4배 이상 상승 (글로벌 LP 유입)' : 'Up over 4x (Global LP Inflow)'}</div>
                                    {/* Removed animate-bounce */}
                                    <svg className="w-8 h-8 text-blue-500 translate-y-[4px]" fill="none" strokeWidth="3" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                            </div>
                            
                            <div className={`flex flex-col items-center transition-all duration-[765ms] delay-[383ms] ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                                <span className="text-gray-400 font-bold text-[16px]">{lang === 'kr' ? '2022년 매각 시 (브룩필드)' : 'At Sale (2022)'}</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-black text-[46px] leading-tight">{lang === 'kr' ? '약 4.1조 원' : '~4.1T KRW'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Arrow / Connection */}
                    <div className={`self-center text-[40px] font-black text-gray-300 transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        →
                    </div>

                    {/* IOTA Inheritance Box (Right Box) */}
                    <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-900 border border-blue-700 rounded-[30px] p-8 shadow-2xl transition-all duration-[765ms] w-[450px] text-white ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-cyan-400" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                            </svg>
                        </div>
                        <h3 className="text-[32px] font-black mb-4 leading-snug break-keep text-center">
                            {lang === 'kr' ? <>IOTA Seoul의<br />명시적 포지셔닝</> : <>Explicit Positioning of<br />IOTA Seoul</>}
                        </h3>
                        <p className="text-[20px] text-blue-100 font-medium break-keep leading-relaxed text-center">
                            {lang === 'kr' ? '"IFC에 이어 한국 상업용 부동산 시장을 대표하는 새로운 트로피에셋"' : '"The new trophy asset representing Korea\'s CRE market, succeeding the IFC."'}
                        </p>
                    </div>

                </div>

                {/* Summarized Bottom Text */}
                <div className={`mt-[20px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-blue-500">▪</span><span>{lang === 'kr' ? <><strong>상징적 가치 점프</strong>: IFC 서울은 글로벌 LP 자본을 한국으로 유입시키며 가치가 4배 이상 폭발적으로 성장한 대표적 성공 모델</> : <><strong>Symbolic Value Jump</strong>: IFC Seoul is a prime success model where value exploded over 4x by bringing global LP capital into Korea.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-500">▪</span><span>{lang === 'kr' ? <><strong>트로피 계승의 선언</strong>: 이지스자산운용은 IOTA Seoul을 통해 이 거대한 IFC 모델을 두 번째이자 더욱 압도적인 규모로 재현하고자 함</> : <><strong>Declaration of Trophy Succession</strong>: IGIS Asset Management aims to recreate this massive IFC model on a second, even more overwhelming scale through IOTA Seoul.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-blue-500">▪</span><span><strong>Iconic Value Jump</strong>: IFC Seoul represents a major success, quadrupling in value by attracting global LP capital to Korea.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-500">▪</span><span><strong>Inheriting the Trophy</strong>: IGIS aims to recreate and scale this immense IFC model for a second time through IOTA Seoul.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
