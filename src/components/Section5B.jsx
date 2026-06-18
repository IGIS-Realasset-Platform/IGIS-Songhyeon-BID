import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section6({ isActive }) {
 const { lang } = useLanguage();
 const [step, setStep] = useState(20);

 useEffect(() => {
 if (!isActive) {
 setStep(20);
 return;
 }
 
 const t1 = setTimeout(() => setStep(1), 230); // Title
 const t2 = setTimeout(() => setStep(2), 612); // Part 1
 const t3 = setTimeout(() => setStep(3), 857); // Part 2
 const t4 = setTimeout(() => setStep(4), 1163); // Part 3
 const t5 = setTimeout(() => setStep(5), 1469); // Part 4
 const t6 = setTimeout(() => setStep(6), 1928); // Disclaimer

 return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); };
 }, [isActive]);

 return (
 <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-12 overflow-y-auto font-sans text-[#1d1d1f]">
 
 <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center gap-10 py-20">
 
 {/* Title Section - Centered, Dry, Clear */}
 <div className={`flex flex-col items-center text-center transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 <span className="text-[20px] md:text-[24px] font-bold text-[#555] mb-4 break-keep">
 IOTA 서울 프로젝트(IPR)의 다층적 분석을 위한 CEO 레벨 전략 구성
 </span>
 <h2 className="text-[44px] md:text-[60px] font-black leading-snug text-[#1d1d1f]">
 4단계 전략 프레임워크
 </h2>
 <div className="w-16 h-[4px] bg-[#1d1d1f] mt-8"></div>
 </div>

 {/* Main Content: 4-Part List */}
 <div className="flex flex-col w-full gap-4 mt-8">
 
 {/* Part 1 */}
 <div className={`flex items-start bg-white border-[3px] border-[#1d1d1f] p-8 shadow-sm transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
 <div className="text-[40px] font-black text-[#888] w-20 shrink-0 font-serif leading-none mt-1">{lang === 'kr' ? '1부' : 'Part 1'}</div>
 <div className="flex flex-col">
 <h3 className="text-[28px] font-black text-[#1d1d1f] mb-2 break-keep">
 {lang === 'kr' ? '한국 1조 → 2조 달러 산업·자본·부동산 역사' : 'Korea $1T → $2T Industry·Capital·Real Estate History'}
 </h3>
 <p className="text-[20px] text-[#555] leading-snug">{lang === 'kr' ? '거시적 관점에서의 과거 양적 팽창기 분석 및 부동산 시장의 구조적 변화 추적' : 'Macro analysis of past quantitative expansion & structural changes in real estate'}</p>
 </div>
 </div>

 {/* Part 2 */}
 <div className={`flex items-start bg-white border-[3px] border-[#1d1d1f] p-8 shadow-sm transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
 <div className="text-[40px] font-black text-[#888] w-20 shrink-0 font-serif leading-none mt-1">{lang === 'kr' ? '2부' : 'Part 2'}</div>
 <div className="flex flex-col">
 <h3 className="text-[28px] font-black text-[#1d1d1f] mb-2 break-keep">
 {lang === 'kr' ? '2조 → 3조 달러 시나리오 분석' : '$2T → $3T Scenario Analysis'} <span className="text-[#888] font-bold text-[24px]">(Base / Bull / Bear)</span>
 </h3>
 <p className="text-[20px] text-[#555] leading-snug">{lang === 'kr' ? '미래 패권 경쟁 및 거시 경제 변수(금리, 성장률)를 기반으로 한 방향성 도출' : 'Deriving direction based on future hegemony competition & macro variables'}</p>
 </div>
 </div>

 {/* Part 3 */}
 <div className={`flex items-start bg-white border-[3px] border-[#1d1d1f] p-8 shadow-sm transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
 <div className="text-[40px] font-black text-[#888] w-20 shrink-0 font-serif leading-none mt-1">{lang === 'kr' ? '3부' : 'Part 3'}</div>
 <div className="flex flex-col">
 <h3 className="text-[28px] font-black text-[#1d1d1f] mb-2 break-keep">
 {lang === 'kr' ? '이지스 전략 포지셔닝' : 'IGIS Strategic Positioning'}
 </h3>
 <p className="text-[20px] text-[#555] leading-snug">{lang === 'kr' ? '시나리오에 대응하는 이지스자산운용의 전사적 리스크 관리 및 밸류애드 전략 타겟' : 'Enterprise risk management & value-add strategy targets corresponding to scenarios'}</p>
 </div>
 </div>

 {/* Part 4 */}
 <div className={`flex items-start bg-[#1d1d1f] text-white border-[3px] border-[#1d1d1f] p-8 shadow-lg transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 5 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
 <div className="text-[40px] font-black text-[#555] w-20 shrink-0 font-serif leading-none mt-1">{lang === 'kr' ? '4부' : 'Part 4'}</div>
 <div className="flex flex-col">
 <h3 className="text-[28px] font-black text-white mb-2 break-keep">
 {lang === 'kr' ? 'IOTA 서울의 역할과 실행 변수' : 'Role & Execution Variables of IOTA Seoul'}
 </h3>
 <p className="text-[20px] text-[#aaa] leading-snug">{lang === 'kr' ? '단일 최대 PF 프로젝트가 글로벌 운용사 도약에 미치는 상징성과 세부 실행 프레임워크' : 'Significance of the largest PF project for global AM leap & execution framework'}</p>
 </div>
 </div>

 </div>

 {/* Disclaimer */}
 <div className={`mt-8 w-full border-t border-[#ddd] pt-6 transition-all duration-[765ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 6 ? 'opacity-100' : 'opacity-0'}`}>
 <p className="text-[18px] text-[#666] leading-relaxed text-center">
 {lang === 'kr' ? <><strong className="text-[#333]">[문체 일러두기]</strong> 본 분석은 객관성 유지를 위해 <strong>'음슴체'</strong>를 적용하며, 직접 호명에 한해 <strong>'존댓말'</strong>을 제한적으로 사용함.</> : <><strong className="text-[#333]">[Note on Style]</strong> The Korean version uses noun-ending objective style for clarity.</>}
 </p>
 </div>

 </div>
 </section>
 );
}
