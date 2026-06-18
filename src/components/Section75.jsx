import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section75({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 857),
            setTimeout(() => setStep(4), 1163)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? '서울 메가 프로젝트 파이프라인' : 'Seoul Mega Project Pipeline'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-12 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>주요 도심에서 전개되는 차세대 트로피 공급망</> : <>Next-gen Trophy Supply Chain unfolding across major urban cores</>}
                </h2>

                {/* 3-Box Layout */}
                <div className="flex flex-col md:flex-row w-full max-w-[1300px] gap-6">
                    
                    {/* Box 1: YIBD */}
                    <div className={`flex-1 bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-[383ms] rounded-xl overflow-hidden flex flex-col ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="p-8 flex flex-col flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-[40px]">🚆</div>
                                <h3 className="text-[22px] md:text-[24px] font-black text-[#1d1d1f] text-left leading-tight">{lang === 'kr' ? '용산국제업무지구 (YIBD)' : 'Yongsan Int\'l Business Dist. (YIBD)'}</h3>
                            </div>
                            <div className="w-12 h-1 bg-gray-900 mb-6"></div>
                            <ul className="text-left space-y-3 flex-1">
                                <li className="flex items-start">
                                    <span className="mr-3 text-gray-500">▪</span>
                                    <span className="text-[16px] md:text-[18px] font-bold text-gray-700 break-keep">{lang === 'kr' ? '코레일·서울시 마스터플랜 재가동' : 'KORAIL/Seoul Master Plan Reactivated'}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-gray-500">▪</span>
                                    <span className="text-[16px] md:text-[18px] font-bold text-gray-700 break-keep">{lang === 'kr' ? '2027~2035년 단계적 개발 본격화' : 'Phased development scaling 2027~2035'}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-gray-500">▪</span>
                                    <span className="text-[16px] md:text-[18px] font-bold text-gray-700 break-keep">{lang === 'kr' ? '글로벌 거대 자본이 신규 진입할 핵심 무대' : 'Core stage for new global mega-capital entry'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Box 2: Yeouido */}
                    <div className={`flex-1 bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-[383ms] rounded-xl overflow-hidden flex flex-col delay-[117ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="p-8 flex flex-col flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-[40px]">🏦</div>
                                <h3 className="text-[22px] md:text-[24px] font-black text-[#1d1d1f] text-left leading-tight">{lang === 'kr' ? '여의도 재개발' : 'Yeouido Redevelopment'}</h3>
                            </div>
                            <div className="w-12 h-1 bg-blue-900 mb-6"></div>
                            <ul className="text-left space-y-3 flex-1">
                                <li className="flex items-start">
                                    <span className="mr-3 text-blue-600">▪</span>
                                    <span className="text-[16px] md:text-[18px] font-bold text-gray-700 break-keep">{lang === 'kr' ? '금융허브 스카이라인을 재편하는 트로피 사이클' : 'Trophy cycle reshaping the financial hub skyline'}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-blue-600">▪</span>
                                    <span className="text-[16px] md:text-[18px] font-bold text-gray-700 break-keep">{lang === 'kr' ? '한국거래소 부지 일대 대규모 재건축' : 'Large-scale rebuild around KRX site'}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-blue-600">▪</span>
                                    <span className="text-[16px] md:text-[18px] font-bold text-gray-700 break-keep">{lang === 'kr' ? '옛 MBC 부지 및 사학연금 부지 등 코어 에셋 개발' : 'Core asset dev. (former MBC, Teachers Pension)'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Box 3: Jamsil MICE */}
                    <div className={`flex-1 bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-[383ms] rounded-xl overflow-hidden flex flex-col delay-[230ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="p-8 flex flex-col flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-[40px]">🏟️</div>
                                <h3 className="text-[22px] md:text-[24px] font-black text-[#1d1d1f] text-left leading-tight">{lang === 'kr' ? '잠실 MICE' : 'Jamsil MICE'}</h3>
                            </div>
                            <div className="w-12 h-1 bg-purple-900 mb-6"></div>
                            <ul className="text-left space-y-3 flex-1">
                                <li className="flex items-start">
                                    <span className="mr-3 text-purple-600">▪</span>
                                    <span className="text-[16px] md:text-[18px] font-bold text-gray-700 break-keep">{lang === 'kr' ? '스포츠·마이스 복합 공간 조성 사업' : 'Sports/MICE complex development'}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-purple-600">▪</span>
                                    <span className="text-[16px] md:text-[18px] font-bold text-gray-700 break-keep">{lang === 'kr' ? '한화 컨소시엄 주도, 약 6조 원 규모의 초대형 민자' : 'Hanwha Consortium led, ~6T KRW mega private biz'}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-purple-600">▪</span>
                                    <span className="text-[16px] md:text-[18px] font-bold text-gray-700 break-keep">{lang === 'kr' ? '강남권역 동진(Eastward) 트렌드를 가속화' : 'Accelerating the Eastward trend of GBD'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
