import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section2({ isActive }) {
 const { lang } = useLanguage();
 const [step, _setStep] = useState(20); const setStep = () => {};

 useEffect(() => {
 if (!isActive) {
 setStep(20);
 return;
 }
 
 const t1 = setTimeout(() => setStep(1), 345);
 return () => clearTimeout(t1);
 }, [isActive]);

 return (
 <section className="relative section w-full h-full flex flex-col justify-center items-center overflow-hidden bg-[#eaeaea]">
 <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#eaeaea] transition-opacity duration-[551ms] ease-out pointer-events-none`}>
 <div 
 className={`flex flex-col items-center text-center transition-all ${step === 0 ? 'opacity-0 blur-sm scale-95 duration-[689ms] ease-out translate-x-0' : 'opacity-100 blur-none scale-100 duration-[689ms] ease-out translate-x-0'}`}
 style={{ 
 fontFamily: "'Sanomat Wp', 'Sanomat Web', 'Sanomat', sans-serif",
 WebkitFontSmoothing: "antialiased",
 textRendering: "optimizeLegibility",
 }}
 >
 <span className="text-[20px] md:text-[34px] lg:text-[40px] text-[#737373] font-light duration-[689ms] transition-all mb-0 md:mb-2 tracking-[-0.02em]">
 Prologue.
 </span>
 <span 
 className="text-[30px] md:text-[50px] lg:text-[60px] text-[#1d1d1f] font-black duration-[689ms] transition-all -mt-[8px] tracking-[-0.02em]"
 style={{ fontFamily: "'Sanomat Wp', 'Sanomat Web', 'Sanomat', 'Apple SD Gothic Neo', '애플 산돌고딕 Neo', sans-serif" }}
 >
 {lang === 'kr' ? "본 고민의 전략적 위치" : "The Strategic Context"}
 </span>
 </div>
 </div>
 </section>
 );
}
