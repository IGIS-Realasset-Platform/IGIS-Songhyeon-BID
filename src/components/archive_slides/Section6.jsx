import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section6({ isActive }) {
 const { lang } = useLanguage();
 const [step, _setStep] = useState(20); const setStep = () => {};

 useEffect(() => {
 if (!isActive) {
 setStep(20);
 return;
 }
 
 const t1 = setTimeout(() => setStep(1), 207); // Theme
 const t2 = setTimeout(() => setStep(2), 551); // Main Text
 const t3 = setTimeout(() => setStep(3), 937); // Roadmap container
 const t4 = setTimeout(() => setStep(4), 1205); // Roadmap items
 
 return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
 }, [isActive]);

 return (
 <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
 
 <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
 
 {/* Theme */}
 <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 <span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">
 {lang === 'kr' ? '이지스 2030 마스터플랜의 4대 핵심 축' : '4 Core Pillars of IGIS 2030 Master Plan'}
 </span>
 </div>

 {/* Main Text */}
 <h2 className={`text-[36px] md:text-[52px] lg:text-[56px] font-extrabold leading-[calc(1.3em-2px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 {lang === 'kr' ? (
 <>
 거시 경제, 산업 모멘텀, 자본 구조 혁신,<br/>
 그리고 트로피 에셋의 융합
 </>
 ) : (
 <>
 Macroeconomy, Industrial Momentum, Capital Structure Innovation, and Trophy Asset Fusion
 </>
 )}
 </h2>

 {/* Content: 4-part Roadmap */}
 <div className={`flex flex-col w-full max-w-[840px] mt-[38px] bg-white border-[8px] border-[#1e3a8a] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
 {[
 { 
 num: '1', 
 titleKr: '1조 → 2조 달러 역사적 분석', titleEn: 'Historical Analysis of $1T to $2T', 
 subtitleKr: '한국 자본·산업·부동산 성장의 궤적', subtitleEn: 'Trajectory of Korean Capital, Industry, and Real Estate Growth' 
 },
 { 
 num: '2', 
 titleKr: '2조 → 3조 달러 시나리오 전망', titleEn: 'Scenario Outlook for $2T to $3T', 
 subtitleKr: '미래 거시 경제와 프라임 공간의 구조적 변화', subtitleEn: 'Structural Changes in Future Macroeconomy and Prime Space' 
 },
 { 
 num: '3', 
 titleKr: '이지스 글로벌 도약 전략 포지셔닝', titleEn: 'Strategic Positioning for IGIS Global Leap', 
 subtitleKr: '3대 플랫폼 베팅과 다전략 아키텍처 구축', subtitleEn: 'Betting on 3 Platforms and Building Multi-Strategy Architecture' 
 },
 { 
 num: '4', 
 titleKr: 'IOTA 서울의 역할과 실행 변수', titleEn: 'Role and Execution Variables of IOTA Seoul', 
 subtitleKr: '단일 최대 트로피 자산의 Re-rating 메커니즘', subtitleEn: 'Re-rating Mechanism of the Single Largest Trophy Asset' 
 }
 ].map((item, index) => (
 <div 
 key={index}
 className={`flex flex-col md:flex-row items-center text-center md:text-left py-[19px] pr-6 pl-[34px] transition-all duration-[536ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${index !== 0 ? 'border-t-[1px] border-[#1e3a8a]' : ''}`}
 style={{ transitionDelay: `${index * 150}ms` }}
 >
 <span className="text-[40px] font-extrabold text-[#888] w-16 mb-2 md:mb-0 shrink-0 flex items-center justify-center md:justify-start">{item.num}</span>
 <div className="flex flex-col">
 <h4 className="text-[26px] md:text-[30px] font-extrabold text-[#1d1d1f]">{lang === 'kr' ? item.titleKr : item.titleEn}</h4>
 <p className="text-[20px] md:text-[22px] font-bold text-[#555] -mt-1">{lang === 'kr' ? item.subtitleKr : item.subtitleEn}</p>
 </div>
 </div>
 ))}
 </div>

 </div>
 </section>
 );
}
