import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section58({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 689),
            setTimeout(() => setStep(3), 995),
            setTimeout(() => setStep(4), 1301),
            setTimeout(() => setStep(5), 1607),
            setTimeout(() => setStep(6), 1913),
            setTimeout(() => setStep(7), 2219),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* Theme */}
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? '혹독한 인구 다이어트의 시작' : 'Beginning of a Harsh Demographic Diet'}</span>
                </div>

                {/* Main Title */}
                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>2024년 5,175만 정점 통과 후 직면할<br/>가파른 국가 규모 축소의 현실</> : <>Steep shrinkage of national scale<br/>facing after 2024 peak of 51.75M</>}
                </h2>

                {/* Custom Infographic: Population Drop Bar Chart */}
                <div className="relative w-full max-w-[1000px] mt-[60px] mb-[60px] h-[300px] flex items-end justify-between px-4 md:px-12 border-b-[4px] border-[#1d1d1f]">
                    {/* Y-Axis Label */}
                    <div className="absolute left-[-30px] top-0 h-full flex flex-col justify-between text-gray-400 font-bold text-[14px]">
                        <span>{lang === 'kr' ? '6,000만' : '60M'}</span>
                        <span>{lang === 'kr' ? '4,000만' : '40M'}</span>
                        <span>{lang === 'kr' ? '2,000만' : '20M'}</span>
                        <span>0</span>
                    </div>

                    {/* Bar 1: 2024 */}
                    <div className={`relative flex flex-col justify-end items-center w-[12%] transition-all duration-[765ms] ease-out h-full ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute bottom-[calc(86%+10px)] text-[20px] md:text-[24px] font-black text-black">{lang === 'kr' ? '5,175만' : '51.75M'}</div>
                        <div className="w-full bg-[#1d1d1f] rounded-t-sm" style={{ height: '86%' }}></div>
                        <div className="absolute -bottom-[35px] font-bold text-[16px] text-black">{lang === 'kr' ? '2024 (정점)' : '2024 (Peak)'}</div>
                    </div>

                    {/* Bar 2: 2040 */}
                    <div className={`relative flex flex-col justify-end items-center w-[12%] transition-all duration-[765ms] ease-out h-full ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute bottom-[calc(79%+10px)] text-[18px] md:text-[22px] font-bold text-gray-600">{lang === 'kr' ? '4,734만' : '47.34M'}</div>
                        <div className="w-full bg-gray-400 rounded-t-sm" style={{ height: '79%' }}></div>
                        <div className="absolute -bottom-[35px] font-bold text-[16px] text-gray-600">2040</div>
                    </div>

                    {/* Bar 3: 2050 */}
                    <div className={`relative flex flex-col justify-end items-center w-[12%] transition-all duration-[765ms] ease-out h-full ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute bottom-[calc(71%+10px)] text-[18px] md:text-[22px] font-bold text-gray-600">{lang === 'kr' ? '4,300만' : '43M'}</div>
                        <div className="w-full bg-gray-400 rounded-t-sm" style={{ height: '71%' }}></div>
                        <div className="absolute -bottom-[35px] font-bold text-[16px] text-gray-600">2050</div>
                    </div>

                    {/* Bar 4: 2060 */}
                    <div className={`relative flex flex-col justify-end items-center w-[12%] transition-all duration-[765ms] ease-out h-full ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute bottom-[calc(61%+10px)] text-[18px] md:text-[22px] font-bold text-gray-600">{lang === 'kr' ? '3,664만' : '36.64M'}</div>
                        <div className="w-full bg-gray-400 rounded-t-sm" style={{ height: '61%' }}></div>
                        <div className="absolute -bottom-[35px] font-bold text-[16px] text-gray-600">2060</div>
                    </div>

                    {/* Bar 5: 2100 */}
                    <div className={`relative flex flex-col justify-end items-center w-[12%] transition-all duration-[765ms] ease-out h-full ${step >= 6 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute bottom-[calc(35%+10px)] text-[20px] md:text-[24px] font-black text-red-600 whitespace-nowrap">{lang === 'kr' ? '1,100~3,000만' : '11M~30M'}</div>
                        <div className="w-full bg-red-600 rounded-t-sm" style={{ height: '35%' }}></div>
                        <div className="absolute -bottom-[35px] font-black text-[16px] text-red-600 whitespace-nowrap">{lang === 'kr' ? '2100 (추정)' : '2100 (Est.)'}</div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[20px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '통계청·UN 중위 변동치 기준 2024년 5,175만 명 정점 이후 본격적인 감소 진입' : 'Entering full decline after 2024 peak of 51.75M (Statistics Korea/UN Med. Var.)'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '2040년 약 4,734만 명, 2050년 약 4,300만 명, 2060년 3,664만 명으로 가파른 축소' : 'Steep shrinkage: 47.34M by 2040, 43M by 2050, 36.64M by 2060'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-red-600">▪</span><span className="text-red-900">{lang === 'kr' ? 'Bayesian 확률 추정 기준 2100년에는 1,100만~3,000만 명 사이로 국가 규모 축소 불가피' : 'Inevitable scale down to 11M-30M by 2100 (Bayesian Prob. Est.)'}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
