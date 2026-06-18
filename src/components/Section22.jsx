import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section22({ isActive }) {
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
                        {lang === 'kr' ? '플랫폼 빅테크의 물류 지형 재편' : 'Logistics Reshaping by Platform Big Tech'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '네이버, 쿠팡 등 IT 플랫폼이 촉발한 국가급 물류 수요의 폭발' : 'Explosion of National Logistics Demand Triggered by IT Platforms'}
                </h2>

                <div className="relative w-full max-w-[900px] -mt-[8px] h-[360px] flex items-center justify-center z-10 gap-16">
                    
                    {/* Big Tech Platforms */}
                    <div className={`relative flex flex-col gap-4 transition-all duration-[765ms] ease-out ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="flex gap-4">
                            <div className="w-[100px] h-[100px] bg-[#03c75a] rounded-2xl shadow-lg flex flex-col items-center justify-center text-white">
                                <span className="font-black text-[20px]">Naver</span>
                                <span className="text-[12px] font-bold">Cap 30T+</span>
                            </div>
                            <div className="w-[100px] h-[100px] bg-[#fee500] rounded-2xl shadow-lg flex flex-col items-center justify-center text-[#3c1e1e]">
                                <span className="font-black text-[20px]">Kakao</span>
                                <span className="text-[12px] font-bold">Cap ~30T</span>
                            </div>
                        </div>
                        <div className="w-full h-[100px] bg-black rounded-2xl shadow-lg flex flex-col items-center justify-center text-white">
                            <span className="font-black text-[24px]">Coupang</span>
                            <span className="text-[12px] font-bold text-gray-300">NYSE Cap 30T+</span>
                        </div>
                    </div>

                    {/* Arrow / Trigger */}
                    <div className={`flex flex-col items-center transition-all duration-[765ms] ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-[16px] font-black text-indigo-600 mb-2 italic">Rocket Delivery</div>
                        <div className="w-[100px] h-[4px] bg-gradient-to-r from-gray-300 to-indigo-600 relative mb-2">
                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-indigo-600"></div>
                        </div>
                    </div>

                    {/* Logistics Demand */}
                    <div className={`relative flex flex-col items-center transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[153ms] ${step >= 4 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 translate-x-12'}`}>
                        <div className="w-[200px] h-[200px] bg-gradient-to-br from-indigo-500 to-purple-700 rounded-full shadow-2xl border-4 border-white flex flex-col items-center justify-center">
                            <svg className="w-12 h-12 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            <span className="text-[20px] font-black text-white leading-tight text-center">Logistics<br/>Real Estate</span>
                        </div>
                        <span className="text-[14px] font-bold text-indigo-600 mt-3">{lang === 'kr' ? '가장 큰 단일 변수' : 'Largest Single Variable'}</span>
                    </div>

                </div>

                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>{lang === 'kr' ? <>네이버, 카카오, 쿠팡 등 <strong>IT 플랫폼 빅테크</strong>들은 각각 시총 30조 원 이상을 기록하며 거대 기업으로 성장함.</> : <><strong>IT Platform Big Techs</strong> like Naver, Kakao, and Coupang grew into giant corporations, each exceeding 30T KRW in market cap.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>{lang === 'kr' ? <>네이버의 일본 LINE 야후 통합, 쿠팡의 로켓배송 전국화 등이 <strong>물류 지형을 근본적으로 재편</strong>함.</> : <>Naver's integration with LINE Yahoo in Japan and Coupang's nationwide Rocket Delivery <strong>fundamentally reshaped the logistics landscape</strong>.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>{lang === 'kr' ? <>플랫폼이 촉발한 이커머스 혁명은 국내 <strong>물류 부동산 수요 폭발의 가장 큰 단일 변수</strong>로 작용함.</> : <>The e-commerce revolution triggered by platforms acted as the <strong>largest single variable for the explosion in domestic logistics real estate demand</strong>.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>IT Platform Big Techs like Naver, Kakao, and Coupang grew into giants, each surpassing <strong>30T KRW in market cap</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>Naver's LINE-Yahoo integration in Japan and Coupang's nationwide Rocket Delivery <strong>fundamentally reshaped logistics</strong>.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-indigo-600">▪</span><span>The e-commerce revolution triggered by these platforms became the <strong>largest single variable for logistics real estate demand</strong>.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
