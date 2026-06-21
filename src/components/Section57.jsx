import React from 'react';

export default function Section57({ isActive }) {
    const assets = [
        {
            title: '남산 자연 조망권 (Namsan View Corridor)',
            desc: '서울 도심 심장부에서 누릴 수 있는 유일무이한 영구적 자연 조망 자산. 이오타 서울 설계 및 가로 구획 시 남산 조망 통경축 확보를 최우선으로 적용.'
        },
        {
            title: '서울로 7017 보행길 (Seoulo 7017 Path)',
            desc: '뉴욕 하이라인을 연상시키는 국내 최초의 입체형 고가 보행 공원. 얼라이언스 BID가 직접 프로그래밍 및 야외 스트리트 마케팅, 치안·미화를 전담.'
        },
        {
            title: '역사문화 레이어 (Historical Layer)',
            desc: '약현성당, 손기정 기념관, 남대문시장 등 유구한 근현대 유산과 전통 상권 인접. 현대적 비즈니스와 전통 역사문화 관광의 입체적 복합화 가능.'
        },
        {
            title: '서울역 관문성 (Seoul Station Gateway)',
            desc: 'KTX, GTX(예정), 공항철도 및 지하철 1·4호선을 연계한 국제적 교통 결절점 위상. 글로벌 다국적 기업 HQ 유치 마케팅의 차별화된 핵심 무기로 활용.'
        }
    ];

    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        서울역-남산 구역이 보유한 독보적인 역사·자연 플레이스메이킹 자산
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    SBD 공간 차별화와 브랜드 가치를 이끄는 4대 플레이스메이킹 자산
                </h2>

                {/* 중앙 컨텐츠 영역 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {assets.map((asset, idx) => (
                        <div key={idx} className="border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                            <div>
                                <h3 className="text-[19px] font-extrabold text-[#0f172a] mb-3 flex items-center">
                                    <span className="w-2 h-4 bg-[#2563eb] mr-2.5 inline-block"></span>
                                    {asset.title}
                                </h3>
                                <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                                    {asset.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                SBD가 강남(GBD)이나 여의도(YBD)와 구별되는 독보적인 강점은 자연(남산)과 보행 인프라, 근현대 역사문화와 글로벌 관문성을 모두 보유하고 있다는 점임
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
