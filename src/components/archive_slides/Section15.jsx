import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section15({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

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
                        {lang === 'kr' ? '모빌리티를 넘어선 자동차 산업의 진화' : 'Evolution of Automobiles Beyond Mobility'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '로봇과 AI 인프라로 비즈니스 영토를 전면 확장하는 현대차그룹' : 'Hyundai Motor Group Radically Expanding Business Territory with Robotics & AI'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex flex-col items-center justify-center z-10">
                    <div className="w-full flex justify-between items-center px-4 relative mt-[40px]">
                        
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-[10%] w-[80%] h-[4px] bg-gray-200 -translate-y-1/2 -z-10"></div>
                        <div className={`absolute top-1/2 left-[10%] h-[4px] bg-gradient-to-r from-[#047857] to-[#10b981] -translate-y-1/2 -z-10 transition-all duration-[1148ms] ease-out`} style={{ width: step >= 4 ? '80%' : step >= 3 ? '40%' : '0%' }}></div>

                        {/* Pillar 1: Auto */}
                        <div className={`relative flex flex-col items-center transition-all duration-[612ms] ease-out ${step >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'}`}>
                            <div className="w-[160px] h-[140px] rounded-2xl bg-white border-4 border-[#047857] shadow-xl flex flex-col items-center justify-center z-20">
                                <span className="text-[36px] font-black text-[#047857]">Auto</span>
                                <span className="text-[16px] font-bold text-gray-500 mt-1">Global Top 3</span>
                            </div>
                            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-center shadow-sm w-[200px]">
                                <p className="text-[18px] font-bold text-gray-800">4M ➔ <span className="text-[#047857] text-[20px] font-black">7.23M</span></p>
                                <p className="text-[14px] text-gray-500 mt-1">{lang === 'kr' ? '2007~2024 글로벌 판매' : 'Global Sales (2007-2024)'}</p>
                            </div>
                        </div>

                        {/* Pillar 2: Robotics */}
                        <div className={`relative flex flex-col items-center transition-all duration-[612ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'}`}>
                            <div className="w-[160px] h-[140px] rounded-2xl bg-white border-4 border-[#10b981] shadow-xl flex flex-col items-center justify-center z-20">
                                <span className="text-[36px] font-black text-[#10b981]">Robotics</span>
                                <span className="text-[16px] font-bold text-gray-500 mt-1">UAM & Droids</span>
                            </div>
                            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-center shadow-sm w-[200px]">
                                <p className="text-[16px] font-bold text-gray-800">Boston Dynamics</p>
                                <p className="text-[14px] text-gray-500 mt-1">{lang === 'kr' ? '인수 및 슈퍼널 설립' : 'Acquisition & Supernal'}</p>
                            </div>
                        </div>

                        {/* Pillar 3: AI Infra */}
                        <div className={`relative flex flex-col items-center transition-all duration-[612ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'}`}>
                            <div className="w-[160px] h-[140px] rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#047857] shadow-2xl flex flex-col items-center justify-center z-20 border-4 border-white">
                                <span className="text-[36px] font-black text-white">AI Infra</span>
                                <span className="text-[16px] font-bold text-emerald-200 mt-1">Data Center</span>
                            </div>
                            <div className="mt-4 bg-gray-900 border border-gray-700 rounded-lg p-3 text-center shadow-md w-[200px]">
                                <p className="text-[16px] font-bold text-white">NVIDIA Partner</p>
                                <p className="text-[14px] text-gray-400 mt-1">{lang === 'kr' ? 'AI 인프라 혁신(2026)' : 'AI Infra Innovation (2026)'}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>{lang === 'kr' ? <>2007년 글로벌 판매 약 400만 대에서 <strong>2024년 약 723만 대</strong>로 도요타·폭스바겐에 이은 <strong>글로벌 3위 그룹</strong>으로 확립.</> : <>Established as the <strong>global 3rd largest group</strong> following Toyota and Volkswagen, from ~4M units in 2007 to <strong>~7.23M units in 2024</strong>.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>{lang === 'kr' ? '전기차 전환에서 아이오닉·EV9 라인업으로 테슬라·BYD 다음 그룹에 안정적으로 안착함.' : 'Stably positioned in the group following Tesla and BYD with IONIQ and EV9 lineups in the EV transition.'}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>{lang === 'kr' ? '보스턴 다이내믹스 인수(2021) 및 슈퍼널(UAM) 설립으로 모빌리티의 경계를 허묾.' : 'Breaking mobility boundaries by acquiring Boston Dynamics (2021) and establishing Supernal (UAM).'}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>{lang === 'kr' ? <>NVIDIA 협력 AI 데이터센터 건립을 통해 <strong>자동차 ➔ 로봇 ➔ AI 인프라</strong>까지 비즈니스 영역을 전면 확장 중.</> : <>Fully expanding business scope from <strong>Automobiles ➔ Robotics ➔ AI Infrastructure</strong> through NVIDIA-partnered AI data centers.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>Established as the <strong>world's 3rd largest group</strong>, with sales growing from ~4M units in 2007 to <strong>~7.23M in 2024</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>Successfully positioned just behind Tesla and BYD in the EV transition with the Ioniq and EV9 lineups.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>Breaking mobility boundaries through the acquisition of Boston Dynamics (2021) and establishment of Supernal.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-[#047857]">▪</span><span>Radically expanding business scope: <strong>Automobiles ➔ Robotics ➔ AI Infrastructure</strong> via NVIDIA partnership.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
