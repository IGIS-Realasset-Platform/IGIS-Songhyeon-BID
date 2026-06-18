import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section39({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) {
            setStep(20);
            return;
        }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 689),
            setTimeout(() => setStep(3), 1056),
            setTimeout(() => setStep(4), 1515),
            setTimeout(() => setStep(5), 1974),
            setTimeout(() => setStep(6), 2433)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    const timelineData = [
        {
            period: '2001~2002',
            title: lang === 'kr' ? '원조 트로피' : 'Original Trophies',
            assets: 'SFC (CBD)\nGFC (GBD)',
            color: 'from-blue-600 to-blue-800',
            bg: 'bg-blue-900 border-[6px] border-blue-950',
            divider: 'bg-blue-800',
            textTitle: 'text-white',
            textPeriod: 'text-blue-300',
            textAssets: 'text-white'
        },
        {
            period: '2012~2018',
            title: lang === 'kr' ? '게임체인저 & 랜드마크' : 'Game Changers & Expansion',
            assets: 'IFC 서울\n그랑서울\n롯데월드타워\n센트로폴리스',
            color: 'from-blue-700 to-blue-900',
            bg: 'bg-blue-950 border-[6px] border-blue-900',
            divider: 'bg-blue-800',
            textTitle: 'text-white',
            textPeriod: 'text-blue-300',
            textAssets: 'text-white'
        },
        {
            period: '2020~2022',
            title: lang === 'kr' ? '대규모 복합/프라임' : 'Mega Complex & Prime',
            assets: '파크원\n알파돔시티\nK-Square Citi\nTower 8',
            color: 'from-indigo-600 to-blue-800',
            bg: 'bg-blue-800 border-[6px] border-blue-900',
            divider: 'bg-blue-700',
            textTitle: 'text-white',
            textPeriod: 'text-blue-300',
            textAssets: 'text-white'
        },
        {
            period: '2025~2031',
            title: lang === 'kr' ? '차세대 랜드마크' : 'Next-Gen Landmarks',
            assets: 'ONE CENTINEL (2025)\nIOTA Seoul (2032)',
            color: 'from-blue-800 to-indigo-900',
            bg: 'bg-[#0f172a] border-[6px] border-[#1e293b]',
            divider: 'bg-[#334155]',
            textTitle: 'text-white',
            textPeriod: 'text-blue-300',
            textAssets: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300'
        }
    ];

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '트로피 자산 계보' : 'Trophy Asset Lineage'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? '2002년 SFC에서 2032년 IOTA 서울에 이르기까지의 트로피 시계열' : 'Trophy Time Series from SFC (2002) to IOTA Seoul (2032)'}
                </h2>

                <div className="relative w-full max-w-[1200px] mt-[50px] mb-[30px] flex flex-col items-center justify-center z-10">
                    
                    {/* Horizontal Timeline Line */}
                    <div className="absolute top-[50%] left-0 w-full h-1.5 bg-gray-200 rounded-full">
                        <div className={`h-full bg-blue-600 rounded-full transition-all duration-[1530ms] ease-in-out`} style={{ width: step >= 2 ? '100%' : '0%' }}></div>
                    </div>

                    <div className="w-full grid grid-cols-4 gap-6 relative z-10">
                        {timelineData.map((item, idx) => (
                            <div key={idx} className={`flex flex-col items-center transition-all duration-[765ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= idx + 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-black mb-6 z-20 translate-y-[6px]`}>
                                    {idx + 1}
                                </div>
                                <div className={`w-full flex flex-col items-center pt-8 px-6 pb-6 rounded-[30px] ${item.bg} shadow-xl h-[290px] justify-start`}>
                                    <div className={`text-[24px] font-black ${item.textTitle} mb-2 break-keep`}>{item.title}</div>
                                    <div className={`text-[16px] font-bold ${item.textPeriod} mb-4`}>{item.period}</div>
                                    <div className={`w-full h-[1px] ${item.divider} mb-5`}></div>
                                    <p className={`font-black text-[22px] leading-[1.4] break-keep ${item.textAssets} whitespace-pre-line`}>
                                        {item.assets}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summarized Bottom Text */}
                <div className={`mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center transition-all duration-[689ms] ease-out ${step >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        {lang === 'kr' ? (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-blue-700">▪</span><span>{lang === 'kr' ? <><strong>1조→2조 달러 구간의 역사</strong>: 서울의 주요 거점을 중심으로 글로벌 자본을 유입시킨 트로피 랜드마크들이 시계열적으로 등장</> : <><strong>History of $1T to $2T Period</strong>: Trophy landmarks that attracted global capital emerged chronologically across Seoul's major hubs.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-700">▪</span><span>{lang === 'kr' ? <><strong>권역별 거점 구축</strong>: 2000년대 초반 원조 트로피(SFC/GFC)에서 시작해 IFC, 롯데월드타워, 파크원 등 메가 콤플렉스로 진화</> : <><strong>Regional Hub Construction</strong>: Evolved from early 2000s original trophies (SFC/GFC) to mega complexes like IFC, Lotte World Tower, and Parc1.</>}</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-700">▪</span><span>{lang === 'kr' ? <><strong>차세대 트로피 공급</strong>: 2025년 이후 ONE CENTINEL 및 IOTA Seoul(2032) 등 신규 랜드마크 공급 예정</> : <><strong>Next-Gen Trophy Supply</strong>: New landmarks like ONE CENTINEL and IOTA Seoul (2032) scheduled for supply after 2025.</>}</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start"><span className="mr-3 text-blue-700">▪</span><span><strong>$1T to $2T Era</strong>: Trophy landmarks attracting global capital emerged sequentially across Seoul's major hubs.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-700">▪</span><span><strong>Evolution of Core Landmarks</strong>: Starting from original trophies (SFC/GFC) in the 2000s, evolving into mega complexes like IFC and Parc.1.</span></li>
                                <li className="flex items-start"><span className="mr-3 text-blue-700">▪</span><span><strong>Next-Gen Trophies</strong>: Introduction of new landmarks including ONE CENTINEL (2025) and IOTA Seoul (2032).</span></li>
                            </>
                        )}
                    </ul>
                </div>

            </div>
        </section>
    );
}
