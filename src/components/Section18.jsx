import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section18({ isActive }) {
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
                        {lang === 'kr' ? '철강 산업의 생존을 위한 대전환' : 'Great Transition of the Steel Industry'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '2차전지 소재 밸류체인으로의 피벗팅을 증명한 POSCO홀딩스' : 'POSCO Holdings Proving the Pivot to EV Battery Materials'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-center z-10">
                    
                    {/* Transformation Graphic */}
                    <div className="relative w-full flex items-center justify-center h-[240px]">
                        
                        {/* Old Steel (Left) */}
                        <div className={`absolute left-[10%] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border-4 border-white shadow-lg flex flex-col items-center justify-center transition-all duration-[765ms] ease-out ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                            <span className="text-[28px] font-black text-white">Traditional</span>
                            <span className="text-[16px] font-bold text-gray-200 mt-1">STEEL</span>
                            <span className="text-[11px] bg-black/20 text-white px-2 py-1 rounded-md mt-2">{lang === 'kr' ? '중국 과잉공급 마진 압박' : 'Margin Pressure from China'}</span>
                        </div>

                        {/* Arrow */}
                        <div className={`absolute left-[38%] w-[24%] h-[60px] flex items-center justify-center z-20 transition-all duration-[765ms] ease-out ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                            <div className="relative w-full h-[8px] bg-gradient-to-r from-gray-400 to-[#7c3aed] rounded-full">
                                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-[#7c3aed]"></div>
                            </div>
                            <span className="absolute -top-8 text-[14px] font-black text-[#7c3aed] italic">{lang === 'kr' ? 'PIVOTING' : 'PIVOTING'}</span>
                        </div>

                        {/* New Materials (Right) */}
                        <div className={`absolute right-[10%] w-[240px] h-[240px] rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#4c1d95] border-4 border-white shadow-2xl flex flex-col items-center justify-center transition-all duration-[765ms] ease-out ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
                            <span className="text-[14px] font-bold text-violet-200 mb-1">POSCO Holdings</span>
                            <span className="text-[28px] font-black text-white leading-tight text-center">Battery<br/>Materials</span>
                            <div className="flex gap-2 mt-3">
                                <span className="text-[12px] font-bold bg-white text-[#4c1d95] px-3 py-1 rounded-full">{lang === 'kr' ? '양극재' : 'Cathodes'}</span>
                                <span className="text-[12px] font-bold bg-white text-[#4c1d95] px-3 py-1 rounded-full">{lang === 'kr' ? '리튬' : 'Lithium'}</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#7c3aed]">▪</span><span>{lang === 'kr' ? <>철강(POSCO)은 1조 달러 시대 초입 <strong>한국 경제의 상징</strong>이었으나, 중국의 과잉 공급으로 마진 압박에 직면함.</> : <>Steel (POSCO) was a <strong>symbol of the Korean economy</strong> in the early $1T era, but faced margin pressure from China's oversupply.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#7c3aed]">▪</span><span>{lang === 'kr' ? <>이러한 위기를 타개하기 위해 <strong>2차전지 소재(양극재·리튬 등) 밸류체인</strong>으로 과감한 피벗팅(Pivoting)을 단행함.</> : <>To overcome this, executed a bold pivot to the <strong>secondary battery material (cathode, lithium, etc.) value chain</strong>.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#7c3aed]">▪</span><span>{lang === 'kr' ? <>POSCO홀딩스의 진화는 1조 ➔ 2조 달러 구간에서 일어난 가장 <strong>대표적인 산업 전환 케이스</strong>임.</> : <>The evolution of POSCO Holdings is the most <strong>representative industrial transition case</strong> in the $1T to $2T period.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#7c3aed]">▪</span><span>Steel (POSCO) was a <strong>symbol of the Korean economy</strong> in the $1T era, but faced margin pressure from China's oversupply.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#7c3aed]">▪</span><span>Executed a bold pivot to the <strong>EV battery materials value chain (cathodes, lithium, etc.)</strong> to overcome the crisis.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#7c3aed]">▪</span><span>POSCO Holdings' evolution is a <strong>representative case of industrial transition</strong> during the $1T ➔ $2T period.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
