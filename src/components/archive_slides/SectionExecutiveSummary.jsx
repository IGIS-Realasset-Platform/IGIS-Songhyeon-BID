import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function SectionExecutiveSummary({ isActive }) {
    const { lang } = useLanguage();
    const contentRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isActive) {
            setIsVisible(true);
            if (contentRef.current) {
                contentRef.current.scrollTop = 0;
            }
        } else {
            setIsVisible(false);
        }
    }, [isActive]);

    return (
        <div className={`w-full h-full bg-white font-sans text-black flex flex-col items-center overflow-hidden transition-opacity duration-[765ms] ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            
            <div className={`w-[calc(100%-48px)] md:w-[calc(100%-100px)] max-w-[1000px] mt-24 md:mt-32 shrink-0 transition-all duration-[765ms] transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h1 className="text-[28px] md:text-[36px] font-extrabold mb-8 font-inter tracking-[-0.02em]">
                    Executive Summary
                </h1>
            </div>

            {/* Scrollable Content Area */}
            <div ref={contentRef} className={`w-full flex-1 overflow-y-auto pb-[150px] relative px-[24px] md:px-[50px] flex flex-col items-center transition-all duration-[765ms] delay-[230ms] transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="w-full max-w-[1000px] block">
                    
                    <div className="text-[15px] md:text-[17px] leading-[1.7] font-medium text-gray-800 break-keep mb-12">
                        {lang === 'kr' ? (
                            "본 프레젠테이션 기획서는 이지스자산운용이 운용자산(AUM) 100조 원을 돌파하고 진정한 글로벌 탑티어 운용사로 도약하기 위한 로드맵을 구조화한 마스터플랜입니다. 본 전략의 궁극적인 목표는 한국 상업용 부동산 역사상 최대 규모인 7조 원 규모의 IOTA 서울 프로젝트 파이낸싱(PF)을 성공적으로 실행하고, 이를 지렛대 삼아 글로벌 LP 자본을 성공적으로 유치하는 데 있습니다. 이를 위해 본 프레젠테이션은 CEO 및 핵심 의사결정권자들을 위해 다음과 같은 4단계의 논리적 흐름(4-Part Logical Flow)을 제시합니다."
                        ) : (
                            "This presentation proposal is a master plan structuring the roadmap for IGIS Asset Management to surpass 100 trillion KRW in Assets Under Management (AUM) and leap forward as a true global top-tier asset manager. The ultimate goal of this strategy is to successfully execute the 7 trillion KRW IOTA Seoul Project Financing (PF)—the largest in the history of Korean commercial real estate—and leverage it to attract massive global LP capital. To achieve this, this presentation presents the following 4-Part Logical Flow for the CEO and key decision-makers:"
                        )}
                    </div>

                    <div className="space-y-8 mb-16">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-3 text-black">{lang === 'kr' ? 'Part 1 역사적 분석' : 'Part 1. Historical Analysis'}</h2>
                            <div className="text-[15px] md:text-[17px] leading-[1.7] font-medium whitespace-pre-wrap text-gray-800 break-keep">
                                {lang === 'kr' ? "한국 경제가 1조 달러에서 2조 달러로 팽창하는 지난 20년간의 산업·자본시장 진화와 서울 프라임 오피스의 구조적 가치 상승을 데이터로 입증합니다." : "We prove with data the structural value appreciation of Seoul prime offices and the evolution of the industrial/capital markets over the past 20 years, during which the Korean economy expanded from 1 trillion to 2 trillion dollars."}
                            </div>
                        </div>

                        <div className="mb-6" style={{ marginTop: '42px' }}>
                            <h2 className="text-xl font-bold mb-3 text-black">{lang === 'kr' ? 'Part 2 미래 시나리오' : 'Part 2. Future Scenarios'}</h2>
                            <div className="text-[15px] md:text-[17px] leading-[1.7] font-medium whitespace-pre-wrap text-gray-800 break-keep">
                                {lang === 'kr' ? "3조 달러 시대로 진입하는 향후 15년(2027~2040)의 거시경제, 인구 구조, 신성장 산업의 지형도를 예측하고 프라임 부동산의 임대료 수렴(Convergence) 논리를 도출합니다." : "Predicting the topography of macroeconomics, demographics, and new growth industries over the next 15 years (2027-2040) as we enter the 3 trillion dollar era, we derive the rental convergence logic for prime real estate."}
                            </div>
                        </div>

                        <div className="mb-6" style={{ marginTop: '42px' }}>
                            <h2 className="text-xl font-bold mb-3 text-black">{lang === 'kr' ? 'Part 3 이지스 전략 포지셔닝' : 'Part 3. Strategic Positioning'}</h2>
                            <div className="text-[15px] md:text-[17px] leading-[1.7] font-medium whitespace-pre-wrap text-gray-800 break-keep">
                                {lang === 'kr' ? "데이터센터, 시니어 하우징, 프라임 융복합 개발이라는 3대 플랫폼에 AI 워크플로우를 접목하여 100조 AUM을 달성하기 위한 구체적 자본 및 운영 체계를 설계합니다." : "We design a specific capital and operational framework to achieve 100 trillion AUM by integrating AI workflows into three major platforms: Data Centers, Senior Housing, and Prime Mixed-Use Development."}
                            </div>
                        </div>

                        <div className="mb-6" style={{ marginTop: '42px' }}>
                            <h2 className="text-xl font-bold mb-3 text-black">{lang === 'kr' ? 'Part 4 IOTA Seoul의 역할' : 'Part 4. IOTA Seoul Execution'}</h2>
                            <div className="text-[15px] md:text-[17px] leading-[1.7] font-medium whitespace-pre-wrap text-gray-800 break-keep">
                                {lang === 'kr' ? "전략의 실체인 IOTA 서울의 투자가치, 거버넌스 리스크, 자본 조달, 그리고 위기 상황 돌파를 위한 비상 대응책(Contingency Plan)을 제시하며, 당면한 핵심 과제를 12개월 타임라인으로 환산하여 즉각적인 행동을 촉구합니다." : "Presenting the investment value, governance risks, capital raising, and contingency plans for overcoming crises for IOTA Seoul—the core execution of the strategy—we translate imminent key tasks into a 12-month timeline to urge immediate action."}
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer Box */}
                    <div className="mt-8 border-t-2 border-black pt-8 mb-20">
                        <h4 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-4 uppercase">Disclaimer</h4>
                        <div className="text-[15px] md:text-[16px] leading-[1.8] text-gray-700 break-keep">
                            {lang === 'kr' ? (
                                "본 문서는 전략적 정보 제공 및 내부 기획을 목적으로 작성되었으며, 재무적, 법률적, 또는 전문적인 투자 자문을 구성하지 않습니다. 문서에 포함된 시장 전망, 수익률 추정치, 펀딩 목표 및 특정 기업/기관과 관련된 미래 예측 진술(Forward-looking statements)은 작성 시점의 거시경제 데이터와 분석을 바탕으로 한 시나리오이며, 실제 시장 상황, 금리 변동, 규제 변화 및 예기치 못한 리스크에 따라 크게 달라질 수 있습니다. 의사결정 시 반드시 개별적인 법무·회계·재무 실사(Due Diligence)를 거쳐야 합니다."
                            ) : (
                                "This document has been prepared for the purpose of providing strategic information and internal planning, and does not constitute financial, legal, or professional investment advice. Forward-looking statements related to market outlooks, yield estimates, funding targets, and specific companies/institutions included in this document are scenarios based on macroeconomic data and analysis at the time of writing, and may vary significantly depending on actual market conditions, interest rate fluctuations, regulatory changes, and unforeseen risks. Decision-making must be preceded by separate legal, accounting, and financial due diligence."
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
