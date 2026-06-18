import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section7({ isActive }) {
 const { lang } = useLanguage();
 const [step, _setStep] = useState(20); const setStep = () => {};

 useEffect(() => {
 if (!isActive) {
 setStep(20);
 return;
 }
 
 const t1 = setTimeout(() => setStep(1), 207); // Theme
 const t2 = setTimeout(() => setStep(2), 551); // Main Text
 const t3 = setTimeout(() => setStep(3), 937); // Two models side-by-side
 const t4 = setTimeout(() => setStep(4), 1419); // Bottom Content
 
 return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
 }, [isActive]);

 return (
 <section className="section w-full h-full bg-[#f8f9fa] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
 
 <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
 
 {/* Theme */}
 <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 <span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">
 {lang === 'kr' ? '시대의 리듬과 이지스의 결단' : 'Rhythm of the Era & IGIS\'s Decision'}
 </span>
 </div>

 {/* Main Text */}
 <h2 className={`text-[36px] md:text-[52px] lg:text-[56px] font-extrabold leading-[calc(1.3em-2px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 {lang === 'kr' ? (
 <>
 역사적 변곡점마다 도시는 스스로를 재창조한다
 </>
 ) : (
 <>
 At Every Historical Inflection Point, Cities Reinvent Themselves
 </>
 )}
 </h2>

 {/* Compare Mori Building vs IOTA */}
 <div className="flex flex-col md:flex-row w-full max-w-[1220px] justify-center gap-8 mt-12">
 {/* Mori Building Box */}
 <div className={`w-full md:w-1/2 bg-white border-[3px] border-[#e0e0e0] p-10 flex flex-col items-center transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
 <span className="text-[20px] font-bold text-[#777] mb-[2px] uppercase">{lang === 'kr' ? '도쿄의 심장 재창조' : 'Recreating the Heart of Tokyo'}</span>
 <h3 className="text-[30px] md:text-[34px] font-extrabold text-[#1d1d1f]">{lang === 'kr' ? '모리 빌딩 (Mori Building)' : 'Mori Building'}</h3>
 <p className="mt-[6px] text-[20px] text-[#555] font-bold">{lang === 'kr' ? '수직 도시 (Vertical City) 모델' : 'Vertical City Model'}</p>
 </div>

 {/* IOTA Box */}
 <div className={`w-full md:w-1/2 bg-[#1e3a8a] border-[3px] border-[#1e3a8a] p-10 flex flex-col items-center transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
 <span className="text-[20px] font-bold text-[#aaa] mb-[2px] uppercase">{lang === 'kr' ? '서울 YSBD의 재창조' : 'Recreating Seoul YSBD'}</span>
 <h3 className="text-[30px] md:text-[34px] font-extrabold text-white">{lang === 'kr' ? '이지스자산운용 (IGIS)' : 'IGIS Asset Management'}</h3>
 <p className="mt-[6px] text-[20px] text-[#ccc] font-bold">{lang === 'kr' ? '마스터 디벨로퍼 (Master Developer)' : 'Master Developer'}</p>
 </div>
 </div>

 {/* Content */}
 <div className={`max-w-[1400px] mt-[48px] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
 {lang === 'kr' ? (
 <ul className="text-[22px] md:text-[26px] text-black leading-[1.7] font-bold text-left inline-block space-y-2">
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>도쿄의 심장을 재창조한 모리 빌딩의 수직 도시(Vertical City) 모델 벤치마킹</span></li>
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>단일 건물을 넘어 서울역-남산 일대(YSBD)를 완전히 새로운 차원으로 연결 및 재창조</span></li>
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>이지스자산운용은 단순 투자자가 아닌 도시의 미래를 설계하는 '마스터 디벨로퍼'로 진화</span></li>
 </ul>
 ) : (
 <ul className="text-[22px] md:text-[26px] text-black leading-[1.7] font-bold text-left inline-block space-y-2">
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>Benchmarking Mori Building's Vertical City model which reinvented Tokyo's heart</span></li>
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>Reinventing the Seoul Station-Namsan (YSBD) area to a completely new dimension beyond a single building</span></li>
 <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>IGIS evolves beyond an investor into a 'Master Developer' designing the city's future</span></li>
 </ul>
 )}
 </div>

 </div>
 </section>
 );
}
