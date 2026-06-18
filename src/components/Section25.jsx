import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section25({ isActive }) {
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
                        {lang === 'kr' ? '박스피(Boxpi)를 뚫어낸 역사적 랠리' : 'Historic Rally Breaking Through Boxpi'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '2007년 2,000선 돌파 이후 마침내 열린 KOSPI 5,000 시대' : 'KOSPI 5,000 Era Finally Opens After Breaking 2,000 in 2007'}
                </h2>

                <div className="relative w-full max-w-[1100px] mt-[22px] mb-[20px] h-auto py-4 flex flex-col md:flex-row items-center justify-center z-10 gap-8 md:gap-16">
                    
                    {/* The Past: Boxpi */}
                    <div className={`relative flex flex-col items-center transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= 2 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 -translate-x-12'}`}>
                        <div className="w-[240px] h-[240px] bg-stone-200 rounded-[30px] shadow-lg flex flex-col items-center justify-center border-[4px] border-stone-300 mb-6 p-4">
                            <span className="text-[18px] font-bold text-stone-500 mb-1">2017 ~ 2024</span>
                            <span className="text-[42px] font-black text-stone-800 leading-none tracking-tighter">BOXPI</span>
                            <span className="text-[18px] font-bold text-stone-600 mt-2 bg-white px-3 py-1 rounded-full shadow-sm">1,800 - 2,400</span>
                            <div className="mt-3 text-[13px] font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-md">
                                {lang === 'kr' ? '코리아 디스카운트 고착화' : 'Korea Discount Entrenched'}
                            </div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className={`flex flex-col items-center transition-all duration-[765ms] ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-[20px] font-black text-[#d97706] mb-2">2025.07 ~ 12</div>
                        <div className="w-[120px] h-[6px] bg-gradient-to-r from-stone-400 to-[#d97706] relative rounded-full">
                            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-[#d97706]"></div>
                        </div>
                        <div className="text-[16px] font-bold text-gray-500 mt-2">{lang === 'kr' ? '약 75.6% 폭등' : 'Surged 75.6%'}</div>
                    </div>

                    {/* The Present: 5000 Era */}
                    <div className={`relative flex flex-col items-center transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[153ms] ${step >= 4 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 translate-x-12'}`}>
                        <div className="w-[300px] h-[300px] bg-gradient-to-br from-amber-400 to-amber-600 rounded-[40px] shadow-[0_20px_50px_rgba(217,119,6,0.4)] flex flex-col items-center justify-center border-[6px] border-white mb-6 p-6">
                            <span className="text-[20px] font-bold text-amber-900 mb-1">2026.01.22</span>
                            <span className="text-[22px] font-bold text-white mb-2">{lang === 'kr' ? '사상 처음 돌파' : 'First Time Ever'}</span>
                            <span className="text-[72px] font-black text-white leading-none tracking-tighter drop-shadow-md">5,000</span>
                            <div className="mt-4 flex gap-2">
                                <span className="text-[14px] font-bold text-amber-900 bg-white/40 px-3 py-1 rounded-full">KOSPI</span>
                                <span className="text-[14px] font-bold text-amber-900 bg-white/40 px-3 py-1 rounded-full">{lang === 'kr' ? '글로벌 지수 1위' : 'Global #1 Index'}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-amber-600">▪</span><span>{lang === 'kr' ? <>금융위기 이후 <strong>2017~2020년 장기 박스피(1,800~2,400)</strong>에 갇히며 '코리아 디스카운트'가 고착화됨.</> : <>Entrenched 'Korea Discount' trapped in a <strong>long-term Boxpi (1,800-2,400) from 2017-2020</strong> after the financial crisis.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-amber-600">▪</span><span>{lang === 'kr' ? <>2021년 3,000선 돌파 후 다시 박스권에 머물렀으나, <strong>2025년 하반기 약 75.6% 폭등</strong>하며 글로벌 지수 상승률 1위 기록.</> : <>After breaking 3,000 in 2021, returned to a box range, but <strong>surged ~75.6% in 2H 2025</strong>, ranking 1st in global index growth.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-amber-600">▪</span><span>{lang === 'kr' ? <>랠리가 지속되며 <strong>2026년 1월 22일, 역사상 최초로 KOSPI 5,000선</strong>을 돌파하는 기념비적 성과 달성.</> : <>As the rally continued, achieved a monumental milestone of <strong>breaking KOSPI 5,000 for the first time in history on Jan 22, 2026</strong>.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-amber-600">▪</span><span>Post-financial crisis, trapped in <strong>2017-2020 Boxpi (1,800-2,400)</strong>, entrenching the 'Korea Discount'.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-amber-600">▪</span><span>After breaking 3,000 in 2021, it flatlined again until <strong>surging 75.6% in H2 2025</strong>, topping global indices.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-amber-600">▪</span><span>The historic rally culminated on <strong>Jan 22, 2026, breaking KOSPI 5,000</strong> for the first time ever.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
