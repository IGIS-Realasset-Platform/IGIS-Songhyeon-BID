import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section4({ isActive }) {
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
 <section className="section w-full h-full bg-[#f8f9fa] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
 
 <div className="inline-block w-auto max-w-full mx-auto flex flex-col items-center text-center">
 
 {/* Theme */}
 <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 <span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">
 {lang === 'kr' ? '글로벌 운용사로의 도약 분기점' : 'Inflection Point for Global AM Leap'}
 </span>
 </div>

 {/* Main Text */}
 <h2 className={`text-[36px] md:text-[52px] lg:text-[56px] font-extrabold leading-[calc(1.3em-2px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 {lang === 'kr' ? (
 <>
 73조 원 AUM의 압도적 1위에서,<br/>
 Blackstone·Brookfield급 글로벌 플랫폼으로의 전환
 </>
 ) : (
 <>
 From a Dominant 1st with 73T KRW AUM, to a<br/>
 Global Platform like Blackstone & Brookfield
 </>
 )}
 </h2>

 {/* Content */}
 <div className={`inline-block w-auto max-w-full bg-transparent rounded-none border-[8px] border-[#1e3a8a] px-[50px] py-8 mt-12 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 {lang === 'kr' ? (
 <ul className="text-[22px] md:text-[26px] text-black leading-[1.7] font-bold text-left inline-block space-y-4">
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>아시아 정상급 부동산 자산운용사로 성장 (운용자산 미화 503억 달러 달성)</span></li>
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>AUM 200~300조 원 시대를 주도할 압도적 스케일 및 펀더멘털 확보</span></li>
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>글로벌 LP 네트워크 확장 및 다전략(Multi-strategy) 플랫폼으로의 패러다임 전환</span></li>
 </ul>
 ) : (
 <ul className="text-[22px] md:text-[26px] text-black leading-[1.7] font-bold text-left inline-block space-y-4">
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>Grown into Asia's top-tier real estate asset management firm (USD 50.3 billion AUM)</span></li>
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>Securing overwhelming scale and fundamentals to lead the era of 200-300T KRW AUM</span></li>
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>Paradigm shift towards expanding global LP networks and building a Multi-strategy platform</span></li>
 </ul>
 )}
 </div>

 </div>
 </section>
 );
}
