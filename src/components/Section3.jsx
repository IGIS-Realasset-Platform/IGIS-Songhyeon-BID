import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section3({ isActive }) {
 const { lang } = useLanguage();
 const [step, _setStep] = useState(20); const setStep = () => {};

 useEffect(() => {
 if (!isActive) {
 setStep(20);
 return;
 }
 
 const t1 = setTimeout(() => setStep(1), 207); // Theme
 const t2 = setTimeout(() => setStep(2), 551); // Main Text
 const t3 = setTimeout(() => setStep(3), 937); // Content Text
 
 return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
 }, [isActive]);

 return (
 <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
 
 <div className="inline-block w-auto max-w-full mx-auto flex flex-col items-center text-center">
 
 {/* Theme */}
 <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 <span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">
 {lang === 'kr' ? '3조 달러 시대, 이지스자산운용의 전략적 좌표' : 'The $3 Trillion Era, IGIS Asset Management\'s Strategic Coordinates'}
 </span>
 </div>

 {/* Main Text */}
 <h2 className={`text-[36px] md:text-[52px] lg:text-[60px] font-extrabold leading-[calc(1.3em-2px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 {lang === 'kr' ? (
 <>
 한국 경제 1조 → 2조 → 3조 달러 궤적,<br/>
 이지스자산운용은 어디에 서 있는가?
 </>
 ) : (
 <>
 Korea's $1T → $2T → $3T GDP Trajectory,<br/>
 Where Does IGIS Stand?
 </>
 )}
 </h2>

 {/* Content */}
 <div className={`inline-block w-auto max-w-full bg-transparent rounded-none border-[8px] border-[#1e3a8a] px-[50px] py-8 mt-12 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 {lang === 'kr' ? (
 <ul className="text-[22px] md:text-[26px] text-black leading-[1.7] font-bold text-left inline-block space-y-4">
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>한국 명목 GDP 1조 달러 돌파(2007년) 이후, 2조 달러 안착(2026~2027년)을 앞둔 거시적 변곡점</span></li>
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>런던 시티와 뉴욕 미드타운의 진화 패턴을 바탕으로 서울 프라임 부동산의 미래 조망</span></li>
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>새로운 패러다임 속에서 이지스자산운용의 전략적 좌표 재정립</span></li>
 </ul>
 ) : (
 <ul className="text-[22px] md:text-[26px] text-black leading-[1.7] font-bold text-left inline-block space-y-4">
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>Macro inflection point approaching $2T GDP (2026-2027) after surpassing $1T in 2007</span></li>
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>Forecasting the future of Seoul's prime real estate based on evolutionary patterns of the City of London and Midtown New York</span></li>
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>Redefining IGIS Asset Management's strategic coordinates within this new paradigm</span></li>
 </ul>
 )}
 </div>

 </div>
 </section>
 );
}
