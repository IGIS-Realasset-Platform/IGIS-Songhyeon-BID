import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section38_Newschool({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '관리 고도화에 따른 갈등과 형평성 과제' : 'Management Elevation & Equity Challenges'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-8">
                    {lang === 'kr'
                        ? '뉴욕 뉴스쿨(SCEPA) 연구가 분석한 공적 보조의 실질 부담과 형평성 문제'
                        : 'Newschool (SCEPA) Study: Public Subsidy Burden & Equity Debates'}
                </h2>

                {/* 콘텐츠 영역: 2열 인포그래픽 카드 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] grid grid-cols-1 lg:grid-cols-2 gap-8 text-left items-stretch">
                    
                    {/* 좌측 열: 공공 재정 부담 실태 */}
                    <div className="border-4 border-[#0f172a] bg-white p-6 shadow-sm flex flex-col justify-between rounded-none">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[12px] font-black px-3 py-1 uppercase mb-4">
                                Public Financial Burden Analysis
                            </span>
                            <h3 className="text-[22px] font-black text-gray-900 mb-5">
                                {lang === 'kr' ? '🏛️ 시(市) 재정의 실질 부담 규모 규명' : '🏛️ Identifying Actual Public Financial Burdens'}
                            </h3>
                            
                            <ul className="space-y-4 text-[14.5px] text-gray-700 font-bold leading-relaxed">
                                <li>
                                    <strong className="text-gray-900 block">• 실질적인 공공 부채 전가</strong>
                                    {lang === 'kr' 
                                        ? '자금 전액을 자체 충당하는 "자기금융"이라는 초기 주장과 달리, 2018년 뉴스쿨 연구(Bridget Fisher & Flávia Leite) 결과 뉴욕시가 실질적으로 약 22억 달러를 부담했다고 분석.'
                                        : 'Contrary to self-financing claims, the 2018 Newschool study showed NYC ultimately bore a $2.2B financial burden.'}
                                </li>
                                <li>
                                    <strong className="text-gray-900 block">• 총 60억 달러 이상의 대규모 공공 투자</strong>
                                    {lang === 'kr' 
                                        ? '지하철 7호선 연장(24억 달러), 녹지 공원 조성(12억 달러), 이자지원(ISP) 3.59억 달러 등 복합적인 공공 비용이 추가 발생하며 시 재정적 지출이 대거 투입됨.'
                                        : 'Massive public spending included $2.4B for 7 Line extension, $1.2B for parks, and $359M in Interest Support Payments (ISP).'}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 우측 열: 세제 혜택과 형평성 논란 */}
                    <div className="border-4 border-[#0f172a] bg-[#0f172a] p-6 text-white shadow-md flex flex-col justify-between rounded-none">
                        <div>
                            <span className="inline-block bg-[#ef4444] text-white text-[12px] font-black px-3 py-1 uppercase mb-4">
                                PILOT Discounts & Equity Debate
                            </span>
                            <h3 className="text-[22px] font-black mb-5 text-[#93c5fd]">
                                {lang === 'kr' ? '📈 세제 혜택 감면과 형평성 갈등' : '📈 Tax Incentives & Equity Controversies'}
                            </h3>
                            
                            <ul className="space-y-4 text-[14.5px] text-gray-300 font-bold leading-relaxed">
                                <li>
                                    <strong className="text-white block">• PILOT 세제 감면에 따른 세수 손실</strong>
                                    {lang === 'kr' 
                                        ? '상업용 오피스 빌딩 8개 동에 최대 40%에 달하는 PILOT(재산세 대체납부) 할인을 승인함에 따라, 25년간 누적 약 11억 달러 이상의 세수 손실 유발.'
                                        : 'A PILOT tax discount of up to 40% for 8 commercial buildings caused an estimated $1.1B tax loss over 25 years.'}
                                </li>
                                <li>
                                    <strong className="text-white block">• "But-For" 적절성 논쟁</strong>
                                    {lang === 'kr' 
                                        ? '"공적 보조금 지원이 없었더라면 개발이 불가능했을 것인가?"에 대한 회의적 시각. 초과 자산을 보유한 거대 개발사에 과도한 혜택이 돌아갔다는 형평성 문제 제기.'
                                        : 'Debate over whether development would have failed "but-for" public aid, questioning the fairness of subsidizing private developers.'}
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-red-600">▪</span>
                            <span>{lang === 'kr'
                                ? '초거대 민관협력 개발에 지급된 세제 혜택(PILOT 할인)이 공공 재정에 끼친 영향과, 공공-민간 협력 모델의 형평성 및 공공성 조화를 둘러싼 학술적·정책적 비판 사례'
                                : 'Academic critique on the fiscal impacts of tax discounts (PILOT) on public finance and the balance of public-private equity in mega PPP developments.'
                            }</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
