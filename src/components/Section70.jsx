import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section70({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918),
            setTimeout(() => setStep(4), 1300),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? '시니어 하우징 메가 트렌드' : 'Senior Housing Mega Trend'}</span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>300조 원 거대 시장을 장악할<br/>한국형 시니어 REIT 모델의 탄생</> : <>Birth of Korean-style Senior REIT Model<br/>to Dominate the 300 Trillion KRW Market</>}
                </h2>

                {/* Custom Infographic */}
                <div className="flex flex-col lg:flex-row w-full max-w-[1100px] mx-auto justify-center mt-[40px] mb-[40px] gap-8">
                    
                    {/* Market Size */}
                    <div className={`flex-[1.2] bg-[#1d1d1f] text-white p-10 flex flex-col justify-center items-center shadow-2xl relative transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-2 font-black">Market Cap</div>
                        <div className="text-[20px] font-bold text-gray-400 mb-2">{lang === 'kr' ? '2030년 168조 원' : '2030: 168T Won'}</div>
                        <div className="text-[40px] text-gray-500 font-black my-2 leading-none">↓</div>
                        <div className="text-[24px] font-bold text-white mb-2">{lang === 'kr' ? '2040년 시장 규모' : '2040 Market Size'}</div>
                        <div className="font-black text-yellow-400 leading-none tracking-tighter" style={{ fontSize: '66px' }}>300<span className="text-white font-bold ml-1" style={{ fontSize: '40px' }}>{lang === 'kr' ? '조 원+' : 'T+'}</span></div>
                        <div className="w-full border-t-[2px] border-gray-600 mt-6 pt-4">
                            <div className="text-[20px] font-bold text-gray-300">{lang === 'kr' ? <>침투율 0.6% ➔ 3~5% 확장 시<br/><span className="text-white text-[24px]">신규 공급 50만 호 이상 필요</span></> : <>Penetration 0.6% ➔ 3-5% implies<br/><span className="text-white text-[24px]">500k+ new units needed</span></>}</div>
                        </div>
                    </div>

                    {/* Platform Strategy */}
                    <div className={`flex-[1.5] bg-gray-50 border-[6px] border-gray-300 py-4 px-10 flex flex-col justify-center shadow-lg transition-all duration-[765ms] delay-[230ms] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="text-[24px] font-black text-gray-800 mb-2 inline-block mx-auto">{lang === 'kr' ? '이지스 시니어 플랫폼의 비전' : 'IGIS Senior Platform Vision'}</div>
                        
                        <div className="flex flex-col w-full gap-2">
                            <div className="bg-white border-[3px] border-[#1d1d1f] p-4 flex items-center justify-between shadow-sm">
                                <div className="text-[22px] font-black text-[#1d1d1f]">{lang === 'kr' ? '블랙스톤 BREIT' : 'Blackstone BREIT'}</div>
                                <div className="text-[16px] font-bold text-gray-500">{lang === 'kr' ? '압도적 펀딩·스케일업' : 'Dominant Funding & Scale-up'}</div>
                            </div>
                            <div className="flex justify-center text-[30px] font-black text-gray-400" style={{ marginTop: '-12px', marginBottom: '-12px' }}>+</div>
                            <div className="bg-white border-[3px] border-[#1d1d1f] p-4 flex items-center justify-between shadow-sm">
                                <div className="text-[22px] font-black text-[#1d1d1f]">{lang === 'kr' ? '미국 Welltower 모델' : 'US Welltower Model'}</div>
                                <div className="text-[16px] font-bold text-gray-500">{lang === 'kr' ? '헬스케어·운영 전문성 결합' : 'Healthcare & Ops Expertise'}</div>
                            </div>
                            <div className="flex justify-center text-[30px] font-black text-[#1d1d1f]" style={{ marginTop: '-14px', marginBottom: '-14px' }}>↓</div>
                            <div className="bg-[#1d1d1f] p-4 text-center shadow-xl">
                                <div className="text-[26px] font-black text-white">{lang === 'kr' ? '한국형 압도적 시니어 REIT 모델 진화' : 'Evolution of Dominant Korean Senior REIT'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-[#1d1d1f] break-keep text-center transition-all duration-[689ms] ease-out ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '한국 시니어 하우징 시장은 2030년 168조 원에서 2040년 300조 원 이상으로 폭발적 성장이 확정된 메가 섹터' : 'Korea Senior Housing to explode from 168T (2030) to 300T+ (2040), a guaranteed mega sector'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '현재 0.6%에 불과한 침투율이 글로벌 평균인 3~5% 수준으로 오를 경우 최소 50만 호의 신규 공급 필요' : 'Rising from 0.6% to 3-5% global average requires at least 500,000 new units'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-blue-600">▪</span><span className="text-blue-900">{lang === 'kr' ? '이지스는 블랙스톤(BREIT)의 자본력과 웰타워(Welltower)의 운영 전문성을 결합한 거대 시니어 REIT로 시장 장악' : 'IGIS dominates with a mega Senior REIT merging BREIT\'s capital and Welltower\'s ops expertise'}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
