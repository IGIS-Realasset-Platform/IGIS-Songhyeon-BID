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
            
            <div className={`w-[calc(100%-48px)] md:w-[calc(100%-100px)] max-w-[1100px] mt-16 md:mt-24 shrink-0 transition-all duration-[765ms] transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h1 className="text-[32px] md:text-[44px] font-extrabold mb-4 font-inter tracking-[-0.02em] text-[#0f172a]">
                    Executive Summary
                </h1>
            </div>

            {/* Scrollable Content Area */}
            <div ref={contentRef} className={`w-full flex-1 overflow-y-auto pb-[100px] relative px-[24px] md:px-[50px] flex flex-col items-center transition-all duration-[765ms] delay-[230ms] transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="w-full max-w-[1100px] block text-left">
                    
                    {/* 메인 서두 요약글 */}
                    <div className="text-[15px] md:text-[17.5px] leading-[1.75] font-medium text-gray-800 break-keep mb-8 border-l-4 border-[#0f172a] pl-4">
                        {lang === 'kr' ? (
                            "본 보고서는 이지스자산운용이 운용자산(AUM) 100조 원을 돌파하고 진정한 글로벌 탑티어 운용사로 도약하기 위한 로드맵을 구조화한 마스터플랜의 연장선입니다. 본 전략의 궁극적인 목표는 한국 상업용 부동산 역사상 최대 규모인 7조 원 규모의 IOTA 서울 프로젝트 파이낸싱(PF)을 성공적으로 실행하고, 이를 지렛대 삼아 글로벌 LP 자본을 성공적으로 유치하는 데 있습니다. 특히, 본 보고서는 뉴욕의 업무환경개선지구(BID) 및 일본의 에리어 매니지먼트(Area Management) 모델을 심층 분석하여, 이를 IOTA 서울에 적용하고 서울역-남산 일대를 제4의 핵심 업무 권역인 SBD(Seoul Business District)로 격상시키기 위한 슬라이드 전체 구조와 상세 시나리오를 제시합니다."
                        ) : (
                            "This report is an extension of the master plan structuring the roadmap for IGIS Asset Management to surpass 100 trillion KRW in AUM and leap forward as a true global top-tier player. The ultimate goal of this strategy is to successfully execute the 7 trillion KRW IOTA Seoul Project Financing (PF)—the largest in the history of Korean commercial real estate—and leverage it to attract global LP capital. Specifically, this report analyzes in depth the Business Improvement District (BID) model of New York and the Area Management model of Japan, applying these to IOTA Seoul to elevate the Seoul Station-Namsan area into the SBD (Seoul Business District), presenting the entire structure and detailed scenarios."
                        )}
                    </div>

                    {/* 파트 구성 설명 카드/리스트 */}
                    <div className="space-y-5 mb-10">
                        
                        {/* Part 1 */}
                        <div className="border border-gray-200 bg-gray-50/50 p-4">
                            <h3 className="text-[17px] font-bold text-gray-900 mb-1">
                                {lang === 'kr' ? 'Part 1. 글로벌 비즈니스 지구의 부활 공식' : 'Part 1. Global Business District Revival Equation'}
                            </h3>
                            <p className="text-[14px] md:text-[15px] text-gray-600 font-semibold leading-relaxed break-keep">
                                {lang === 'kr' 
                                    ? '세계적 대도시들의 성공 사례 분석을 통한 도심 재생과 자산 가치 극대화의 핵심 비결' 
                                    : 'The core secrets of urban regeneration and asset value maximization through case analyses of major global cities.'}
                            </p>
                        </div>

                        {/* Part 2 */}
                        <div className="border border-gray-200 bg-gray-50/50 p-4">
                            <h3 className="text-[17px] font-bold text-gray-900 mb-1">
                                {lang === 'kr' ? 'Part 2. BID의 탄생 배경과 제도적 메커니즘' : 'Part 2. BID Origins & Institutional Mechanisms'}
                            </h3>
                            <p className="text-[14px] md:text-[15px] text-gray-600 font-semibold leading-relaxed break-keep">
                                {lang === 'kr' 
                                    ? '무임승차 문제를 법제화와 재정적 작동 구조로 극복하여 민간 주도 공공 서비스를 실현한 메커니즘' 
                                    : 'Mechanisms that overcame the free-rider problem through codification and financial frameworks to deliver private-led public services.'}
                            </p>
                        </div>

                        {/* Part 3 */}
                        <div className="border border-gray-200 bg-gray-50/50 p-4">
                            <h3 className="text-[17px] font-bold text-gray-900 mb-1">
                                {lang === 'kr' ? 'Part 3. 허드슨야드의 메가스케일 공공-민간 협력(PPP)' : 'Part 3. Hudson Yards Mega-Scale Public-Private Partnership'}
                            </h3>
                            <p className="text-[14px] md:text-[15px] text-gray-600 font-semibold leading-relaxed break-keep">
                                {lang === 'kr' 
                                    ? '미래 세수를 담보로 24억 달러 규모의 공공 인프라 선투자를 성공시킨 뉴욕의 PPP 파이낸싱과 통합 운영 체계' 
                                    : 'New York\'s PPP financing and integrated operation system that successfully secured a $2.4 billion public infrastructure pre-investment backed by future tax revenues.'}
                            </p>
                        </div>

                        {/* Part 4 */}
                        <div className="border border-gray-200 bg-gray-50/50 p-4">
                            <h3 className="text-[17px] font-bold text-gray-900 mb-1">
                                {lang === 'kr' ? "Part 4. 일본 도쿄의 에리어 매니지먼트와 '일본판 BID'" : "Part 4. Tokyo's Area Management & Japanese BID"}
                            </h3>
                            <p className="text-[14px] md:text-[15px] text-gray-600 font-semibold leading-relaxed break-keep">
                                {lang === 'kr' 
                                    ? '대형 디벨로퍼 주도의 수직 통합형 에리어 매니지먼트 특징 및 2018년 지역재생법 개정 세부 제도 분석' 
                                    : 'Analysis of developer-led vertical integration and the legally mandated assessment system created by the 2018 Local Regeneration Act.'}
                            </p>
                        </div>

                        {/* Part 5 */}
                        <div className="border border-gray-200 bg-gray-50/50 p-4">
                            <h3 className="text-[17px] font-bold text-gray-900 mb-1">
                                {lang === 'kr' ? 'Part 5. 서울의 제4 업무지구 SBD 정립과 미래 비전' : 'Part 5. Establishing Seoul SBD & Future Vision'}
                            </h3>
                            <p className="text-[14px] md:text-[15px] text-gray-600 font-semibold leading-relaxed break-keep">
                                {lang === 'kr' 
                                    ? '서울역에서 남산, 용산으로 이어지는 대한민국 신업무축 정립과 5세대 디지털 BID 운영 체계의 미래 청사진' 
                                    : 'A future blueprint for establishing Korea\'s new business corridor spanning Seoul Station, Namsan, and Yongsan, integrated with 5G digital BIDs.'}
                            </p>
                        </div>

                    </div>

                    {/* Disclaimer Box */}
                    <div className="border-t-4 border-[#0f172a] pt-6 mb-16">
                        <h4 className="text-[16px] md:text-[18px] font-black text-gray-900 mb-3 uppercase tracking-wider">
                            DISCLAIMER
                        </h4>
                        <div className="text-[12.5px] md:text-[13.5px] leading-[1.65] font-semibold text-gray-600 break-keep">
                            {lang === 'kr' ? (
                                "본 문서는 전략적 정보 제공 및 내부 기획을 목적으로 작성되었으며, 재무적, 법률적, 또는 전문적인 투자 자문을 구성하지 않습니다. 문서에 포함된 시장 전망, 수익률 추정치, 펀딩 목표 및 특정 기업/기관과 관련된 미래 예측 진술은 작성 시점의 거시경제 데이터와 분석을 바탕으로 한 시나리오이며, 실제 시장 상황, 금리 변동, 규제 변화 및 예기치 못한 리스크에 따라 크게 달라질 수 있습니다. 의사결정 시 반드시 개별적인 법무·회계·재무 실사를 거쳐야 합니다."
                            ) : (
                                "This document has been prepared for strategic information provision and internal planning, and does not constitute financial, legal, or professional investment advice. Forward-looking statements, yield estimates, funding targets, and market projections herein are scenarios based on macroeconomic data at the time of writing, and may vary depending on actual market conditions, interest rate shifts, and unforeseen risks. Separate legal, accounting, and financial due diligence must be conducted for decision-making."
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
