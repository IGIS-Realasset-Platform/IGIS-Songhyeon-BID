import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section35({ isActive }) {
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
                        {lang === 'kr' ? '단일 임차인이 창조한 쿠팡 이펙트' : 'The Coupang Effect'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '수도권 외곽을 물류 허브로 둔갑시킨 국가급 라스트마일 네트워크' : 'Transforming Outskirts into a National Last-Mile Network'}
                </h2>

                <div className="relative w-full max-w-[1200px] mt-[50px] mb-[40px] h-auto flex flex-col md:flex-row items-stretch justify-center z-10 gap-8">
                    
                    {/* Growth Box */}
                    <div className={`w-[450px] flex flex-col items-center justify-center bg-gray-900 border border-gray-800 rounded-[24px] p-10 shadow-2xl transition-all duration-[765ms] ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="text-gray-400 font-bold text-[20px] mb-2">{lang === 'kr' ? '쿠팡 매출 폭발적 성장' : 'Coupang Revenue Surge'}</div>
                        
                        <div className="w-full flex justify-between items-end mt-4 mb-4 px-2">
                            <div className="flex flex-col items-center">
                                <span className="text-gray-500 font-bold text-[16px]">2014</span>
                                <span className="text-white font-black text-[42px]">{lang === 'kr' ? '1조' : '1T'}</span>
                            </div>
                            <div className="flex flex-col items-center mb-2">
                                <span className="text-yellow-400 font-black text-[36px]">{lang === 'kr' ? '40배 🚀' : '40X 🚀'}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-yellow-500 font-bold text-[16px]">2024</span>
                                <span className="text-yellow-400 font-black text-[42px]">{lang === 'kr' ? '42조' : '42T'}</span>
                            </div>
                        </div>

                        <div className="w-full bg-white/10 py-3 rounded-xl border border-white/20 text-center mt-4">
                            <span className="text-yellow-300 font-extrabold text-[18px]">{lang === 'kr' ? '최초의 국가급 물류 수요 창출' : 'Created First National Logistics Demand'}</span>
                        </div>
                    </div>

                    {/* Network Box */}
                    <div className={`flex-1 flex flex-col justify-center bg-white border border-gray-300 rounded-[24px] p-10 shadow-xl transition-all duration-[765ms] delay-[153ms] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <h3 className="text-[26px] font-extrabold text-gray-900 mb-8 text-center">{lang === 'kr' ? '초대형 물류 허브 벨트 완성' : 'Mega Logistics Hub Belt'}</h3>
                        
                        <div className="w-full flex flex-col items-center">
                            {/* Tags */}
                            <div className="flex gap-3 mb-8">
                                <span className="px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-full border border-blue-200">{lang === 'kr' ? '콜드체인' : 'Cold Chain'}</span>
                                <span className="px-4 py-2 bg-orange-50 text-orange-700 font-bold rounded-full border border-orange-200">{lang === 'kr' ? '라스트마일' : 'Last Mile'}</span>
                                <span className="px-4 py-2 bg-purple-50 text-purple-700 font-bold rounded-full border border-purple-200">{lang === 'kr' ? '풀필먼트' : 'Fulfillment'}</span>
                            </div>

                            {/* Timeline Network */}
                            <div className="relative w-full max-w-[500px] h-16 flex items-center justify-between">
                                <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 -translate-y-1/2 rounded-full"></div>
                                <div className={`absolute top-1/2 left-0 h-2 bg-gradient-to-r from-orange-400 to-red-500 -translate-y-1/2 rounded-full transition-all duration-[1148ms] delay-[383ms]`} style={{ width: step >= 4 ? '100%' : '0%' }}></div>
                                
                                {['용인', '이천', '안성', '평택'].map((city, idx) => { const cityEn = ['Yongin', 'Icheon', 'Anseong', 'Pyeongtaek'][idx]; return (
                                    <div key={city} className={`relative z-10 flex flex-col items-center transition-all duration-[383ms]`} style={{ transitionDelay: `${500 + (idx * 200)}ms`, opacity: step >= 4 ? 1 : 0, transform: step >= 4 ? 'scale(1)' : 'scale(0.5)' }}>
                                        <div className="w-6 h-6 bg-white border-4 border-red-500 rounded-full shadow-md"></div>
                                        <span className="absolute top-8 font-black text-[22px] text-gray-800 whitespace-nowrap">{lang === 'kr' ? city : cityEn}</span>
                                    </div>
                                )})}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Summarized Bottom Text */}
                <div className={`mt-[30px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-orange-500">▪</span><span>{lang === 'kr' ? <><strong>압도적 매출 폭증(40배)</strong>: 1조→2조 달러 구간의 가장 극적인 신규 섹터 탄생</> : <><strong>Overwhelming Revenue Surge (40x)</strong>: The most dramatic new sector birth in the $1T to $2T period.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-orange-500">▪</span><span>{lang === 'kr' ? <><strong>단일 임차인 파워</strong>: 쿠팡이 창출한 최초의 국가급 물류 수요 사례</> : <><strong>Single Tenant Power</strong>: First nation-scale logistics demand created by Coupang.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-orange-500">▪</span><span>{lang === 'kr' ? <><strong>허브 벨트 구축</strong>: 용인·이천·안성·평택을 잇는 거대한 풀필먼트·콜드체인 인프라 완성</> : <><strong>Hub Belt Construction</strong>: Completion of massive fulfillment/cold chain infra linking Yongin, Icheon, Anseong, and Pyeongtaek.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-orange-500">▪</span><span><strong>Explosive Growth (40x)</strong>: The most dramatic new sector of the $1T-$2T era.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-orange-500">▪</span><span><strong>Single Tenant Power</strong>: First national-scale logistics demand created by Coupang.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-orange-500">▪</span><span><strong>Hub Belt</strong>: Massive fulfillment & cold chain infrastructure linking Yongin to Pyeongtaek.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
