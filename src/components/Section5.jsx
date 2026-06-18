import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section5({ isActive }) {
 const { lang } = useLanguage();
 const [step, setStep] = useState(20);

 useEffect(() => {
 if (!isActive) {
 setStep(20);
 return;
 }
 
 const t1 = setTimeout(() => setStep(1), 207); // Theme
 const t2 = setTimeout(() => setStep(2), 551); // Main Text
 const t3 = setTimeout(() => setStep(3), 937); // Two Boxes
 const t4 = setTimeout(() => setStep(4), 1419); // Content Text
 
 return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
 }, [isActive]);

 return (
 <section className="section w-full h-full bg-[#1d1d1f] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
 
 <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
 
 {/* Theme */}
 <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 <span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">
 {lang === 'kr' ? 'IOTA 서울 프로젝트의 문명사적 의미' : 'Civilizational Significance of IOTA Seoul Project'}
 </span>
 </div>

 {/* Main Text */}
 <h2 className={`text-[36px] md:text-[52px] lg:text-[56px] font-extrabold leading-[calc(1.3em-2px)] text-white break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 {lang === 'kr' ? (
 <>
 7조 원 규모 단일 PF<br/>
 한국 상업용 부동산 역사상 최대의 트로피 자산
 </>
 ) : (
 <>
 A 7T KRW Single PF The Largest Trophy Asset<br/>
 in Korean Commercial Real Estate History
 </>
 )}
 </h2>

 {/* Content: Two boxes representing 1T vs 3T era */}
 <div className="flex flex-col md:flex-row w-full justify-center gap-6 mt-12">
 {/* IFC Box */}
 <div className={`w-full md:w-1/2 max-w-[450px] bg-[#333] border-[3px] border-[#555] p-10 flex flex-col items-center transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
 <span className="text-[20px] font-bold text-[#aaa] mb-[2px] uppercase">{lang === 'kr' ? '1조 달러 시대의 상징' : 'Symbol of the $1T Era'}</span>
 <h3 className="text-[36px] font-extrabold text-white">{lang === 'kr' ? 'IFC 서울' : 'IFC Seoul'}</h3>
 </div>

 {/* IOTA Box */}
 <div className={`w-full md:w-1/2 max-w-[450px] bg-[#1d4ed8] border-[3px] border-white p-10 flex flex-col items-center transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
 <span className="text-[20px] font-bold text-[#bfdbfe] mb-[2px] uppercase">{lang === 'kr' ? '3조 달러 시대를 정의할 절대 좌표' : 'Absolute Coordinates Defining the $3T Era'}</span>
 <h3 className="text-[36px] font-extrabold text-white">{lang === 'kr' ? 'IOTA 서울' : 'IOTA Seoul'}</h3>
 </div>
 </div>

 {/* Content Text */}
 <div className={`max-w-[1400px] mt-[48px] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 {lang === 'kr' ? (
 <ul className="text-[22px] md:text-[26px] text-[#ccc] leading-[1.7] font-bold text-left inline-block space-y-0">
 <li className="flex items-start"><span className="mr-3 text-white">▪</span><span>단순한 오피스 개발을 넘어, 한국 자본시장의 가치를 글로벌 유동성에 재정의하는 상징적 매개체</span></li>
 <li className="flex items-start"><span className="mr-3 text-white">▪</span><span>1조 달러 시대의 상징이 IFC 서울이었다면, 3조 달러 시대를 정의할 절대 좌표는 IOTA 서울</span></li>
 </ul>
 ) : (
 <ul className="text-[22px] md:text-[26px] text-[#ccc] leading-[1.7] font-bold text-left inline-block space-y-0">
 <li className="flex items-start"><span className="mr-3 text-white">▪</span><span>Beyond a simple office development, it's a symbolic medium redefining the Korean capital market's value to global liquidity</span></li>
 <li className="flex items-start"><span className="mr-3 text-white">▪</span><span>If IFC Seoul was the symbol of the $1T era, IOTA Seoul is the absolute coordinate defining the $3T era</span></li>
 </ul>
 )}
 </div>

 </div>
 </section>
 );
}
