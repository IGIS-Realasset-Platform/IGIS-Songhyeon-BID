import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section91({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918), // Left column (Basis/Goal)
            setTimeout(() => setStep(4), 1300), // Right column (Key 1,2,3)
            setTimeout(() => setStep(5), 1912)  // Bottom thesis
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-blue-600 uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? 'IGIS DC REIT의 상장 마스터플랜' : 'Master Plan for IGIS DC REIT Listing'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-12 transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>전력망 선점과 빅테크 록인, 독자 상장형 DC REIT</> : <>Independent Listed DC REIT via Power Grid Preemption & Big Tech Lock-in</>}
                </h2>

                <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 relative">
                    
                    {/* Left Column: Basis & Goal */}
                    <div className={`col-span-1 md:col-span-5 flex flex-col gap-6 transition-all duration-[765ms] ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        {/* Basis */}
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left shadow-sm flex-1">
                            <h3 className="text-gray-500 font-bold text-[16px] mb-2">{lang === 'kr' ? '현재 자산 기반' : 'Current Asset Base'}</h3>
                            <p className="text-[#1d1d1f] font-extrabold text-[18px] md:text-[20px] leading-snug break-keep">
                                {lang === 'kr' 
                                    ? (lang === 'kr' ? '이지스밸류플러스리츠 內 분당 Hostway IDC + 북미 13개 DC 포트폴리오(187MW)' : 'Bundang Hostway IDC + 13 North American DC Portfolios (187MW) within IGIS Value Plus REIT.')
                                    : 'Bundang Hostway IDC within IGIS Value Plus REIT + 13 North American DC Portfolios (187MW)'}
                            </p>
                        </div>
                        {/* Goal */}
                        <div className="bg-[#1e3a8a] rounded-2xl p-6 text-left shadow-md flex-1 text-white relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 text-blue-500/20 text-[100px] font-black leading-none">GOAL</div>
                            <h3 className="text-blue-300 font-bold text-[16px] mb-2 relative z-10">{lang === 'kr' ? '분사 목표' : 'Spin-off Goal'}</h3>
                            <p className="font-extrabold text-[18px] md:text-[20px] leading-snug break-keep mb-3 relative z-10">
                                {lang === 'kr' 
                                    ? (lang === 'kr' ? '향후 5년 내 독립 상장 DC REIT 분사 (2028~2030년)' : 'Spin-off of an independently listed DC REIT within 5 years (2028-2030).')
                                    : 'Independent listed DC REIT spin-off within 5 years (2028-2030)'}
                            </p>
                            <p className="text-blue-100 font-medium text-[15px] leading-relaxed break-keep relative z-10">
                                {lang === 'kr' 
                                    ? (lang === 'kr' ? '미국 Digital Realty(시총 약 USD 500억), Equinix(약 USD 800억) 수준의 globalish DC REIT 빌드업' : 'Building a globalish DC REIT on par with US Digital Realty (~$50B) and Equinix (~$80B).')
                                    : 'Build-up to a globalish DC REIT on par with US Digital Realty (approx $50B) & Equinix ($80B)'}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Key Strategies */}
                    <div className={`col-span-1 md:col-span-7 flex flex-col gap-4 transition-all duration-[765ms] ${step >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <div className="bg-white border-2 border-[#1e3a8a] rounded-2xl p-6 text-left shadow-sm flex items-start gap-4">
                            <div className="bg-blue-100 text-blue-600 font-black text-[18px] rounded-lg w-12 h-12 flex items-center justify-center shrink-0">1</div>
                            <div>
                                <h3 className="font-extrabold text-[18px] md:text-[20px] text-[#1d1d1f] mb-1 break-keep">
                                    {lang === 'kr' ? '국내 수도권 데이터센터 신규 개발 파이프라인 확보' : 'Securing New DC Development Pipeline in Seoul Metro'}
                                </h3>
                                <p className="text-blue-600 font-bold text-[15px]">{lang === 'kr' ? '전력 인입 권리가 곧 자산' : 'Power intake rights are the ultimate asset'}</p>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-[#1e3a8a] rounded-2xl p-6 text-left shadow-sm flex items-start gap-4">
                            <div className="bg-blue-100 text-blue-600 font-black text-[18px] rounded-lg w-12 h-12 flex items-center justify-center shrink-0">2</div>
                            <div>
                                <h3 className="font-extrabold text-[18px] md:text-[20px] text-[#1d1d1f] mb-1 break-keep">
                                    {lang === 'kr' ? '동남아·일본 데이터센터 자산 인수로 지역 다각화' : 'Regional Diversification via SE Asia & Japan DC Acquisitions'}
                                </h3>
                                <p className="text-gray-500 font-medium text-[15px]">{lang === 'kr' ? '아시아 거점 연결을 통한 리스크 분산 및 스케일업' : 'Risk mitigation and scale-up via Asian hub connections'}</p>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-[#1e3a8a] rounded-2xl p-6 text-left shadow-sm flex items-start gap-4">
                            <div className="bg-blue-100 text-blue-600 font-black text-[18px] rounded-lg w-12 h-12 flex items-center justify-center shrink-0">3</div>
                            <div>
                                <h3 className="font-extrabold text-[18px] md:text-[20px] text-[#1d1d1f] mb-1 break-keep">
                                    {lang === 'kr' ? '하이퍼스케일러 장기 임대 확약' : 'Securing Long-term Leases from Hyperscalers'}
                                </h3>
                                <p className="text-gray-500 font-medium text-[15px]">{lang === 'kr' ? 'AWS, MS, 구글, 네이버, 카카오 등 빅테크 고객 록인' : 'Lock-in of Big Tech clients (AWS, MS, Google, Naver, Kakao)'}</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Thesis Text */}
                <div className={`w-full max-w-[1100px] bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[17px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed text-center">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? <>북미 13개 포트폴리오를 넘어, 국내 신규 전력 인입 권리와 빅테크 임대 확약을 바탕으로<br/>에퀴닉스에 버금갈 독자 상장형 DC REIT 플랫폼의 분사 로드맵을 띄운다.</> : <>Beyond the 13 NA portfolios, launching a spin-off roadmap for an independently listed DC REIT platform rivaling Equinix,<br/>based on domestic new power connection rights and Big Tech lease commitments.</>)
                            : <>Beyond the 13 NA portfolios, we launch a spin-off roadmap for an independent listed DC REIT platform comparable to Equinix,<br/>backed by domestic power intake rights and big tech lease commitments.</>
                        }
                    </p>
                </div>

            </div>
        </section>
    );
}
