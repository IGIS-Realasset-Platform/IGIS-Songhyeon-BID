import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section1({ isActive }) {
 const { lang } = useLanguage();
 const [step, setStep] = useState(20);

 useEffect(() => {
 if (!isActive) {
 setStep(20);
 return;
 }
 
 const t1 = setTimeout(() => setStep(1), 345); // Title
 const t2 = setTimeout(() => setStep(2), 1033); // Subtitle
 
 return () => { clearTimeout(t1); clearTimeout(t2); };
 }, [isActive]);

 return (
 <section className="section w-full h-full bg-[#fdfdfd] overflow-y-auto relative px-4 flex flex-col items-center">
 <div className="logo-fade w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center -translate-y-[20px] my-auto py-12 px-6 md:px-0">
 
 {/* Main Title - Epic focal resolve effect */}
 <div 
 className={`flex text-[#1d1d1f] text-center antialiased text-[44px] md:text-[62px] transition-all duration-[1239ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${step >= 1 ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-[0.98] blur-[12px]'}`}
 style={{ 
 fontFamily: "'Inter', 'Sanomat Wp', 'Sanomat Web', 'Sanomat', sans-serif",
 fontWeight: 900, 
 letterSpacing: "-0.02em",
 WebkitFontSmoothing: "antialiased",
 MozOsxFontSmoothing: "grayscale",
 textRendering: "optimizeLegibility",
 wordBreak: "keep-all",
 lineHeight: "1.1"
 }}
 >
 {lang === 'kr' ? (
 <div className="flex flex-col items-center">
 <span>3조 달러 시대</span>
 <span className="mt-[10px]">이지스의 글로벌 도약과 IOTA 프로젝트 마스터플랜</span>
 </div>
 ) : (
 <div className="flex flex-col items-center">
 <span>The $3 Trillion Era</span>
 <span className="mt-[10px]">IGIS's Global Leap and IOTA Project Master Plan</span>
 </div>
 )}
 </div>

 {/* Subtitle - Gentle delayed cascade */}
 <div 
 className={`mt-[20px] text-gray-500 text-[18px] md:text-[22px] font-normal ] transition-all duration-[1239ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${step >= 2 ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-[8px]'}`}
 style={{ fontFamily: "'Guardian Sans', 'Apple SD Gothic Neo', '애플 SD 산돌고딕 Neo', sans-serif" }}
 >
 IGIS Strategy Draft
 </div>

 </div>
 </section>
 );
}
