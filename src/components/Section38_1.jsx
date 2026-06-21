import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section38_1({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '[개발의 철학] 도시 유기체론에 입각한 모리빌딩의 \'문화도심\' 기획' : '[Philosophy] Mori Building\'s "Cultural Heart" based on Urban Organism'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-6">
                    {lang === 'kr' 
                        ? '도시 유기체론에 입각한 ‘문화도심’ 창조와 아자부다이 힐즈' 
                        : 'Creation of a "Cultural Heart" and the Azabudai Hills Ecosystem'}
                </h2>

                {/* 콘텐츠 영역: 2열 인포그래픽 카드 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                    
                    {/* 좌측: 고(故) 모리 미노루의 문화도심 철학 */}
                    <div className="border-4 border-[#0f172a] bg-white p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#1e3a8a] text-white text-[12px] font-black px-3 py-1 uppercase mb-4">
                                Developer Vision
                            </span>
                            <h3 className="text-[22px] font-black text-gray-900 mb-5">
                                {lang === 'kr' ? '🏙️ 모리 빌딩의 ‘문화도심(Cultural Heart)’ 철학' : '🏙️ Mori Building\'s "Cultural Heart" Philosophy'}
                            </h3>
                            
                            <ul className="space-y-4 text-[14.5px] text-gray-700 font-medium leading-relaxed">
                                <li>
                                    <strong className="text-gray-900 block">• 도심 유기체론 (Urban Organism)</strong>
                                    {lang === 'kr' 
                                        ? '도심을 단순한 파편화된 오피스 빌딩들의 집합이 아닌 일(Work), 주거(Live), 오락(Play), 문화(Culture)가 결합된 단일 생태계로 기획했습니다.'
                                        : 'Designed the city as a single integrated ecosystem combining work, residence, leisure, and culture rather than fragmented office blocks.'}
                                </li>
                                <li>
                                    <strong className="text-gray-900 block">• 소프트웨어 중심의 지속적 에어리어 큐레이션</strong>
                                    {lang === 'kr' 
                                        ? '단순한 분양 및 임대관리 모델을 탈피하여, 완공 후에도 미디어기획부 및 도시개발본부를 통해 문화·예술 프로그램을 지속 운영 및 직접 소유·관리합니다.'
                                        : 'Moved beyond the classical lease/sale model to direct ownership and active curation of cultural events through dedicated media and development divisions.'}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 우측: 롯폰기 힐즈 & 아자부다이 힐즈 상세 실증 성과 */}
                    <div className="border-4 border-[#0f172a] bg-[#0f172a] p-6 text-white shadow-md flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#ef4444] text-white text-[12px] font-black px-3 py-1 uppercase mb-4">
                                Empirical Benchmarks
                            </span>
                            <h3 className="text-[22px] font-black mb-5 text-[#93c5fd]">
                                {lang === 'kr' ? '📈 메가 프로젝트 실증 실적' : '📈 Mega Project Performance'}
                            </h3>
                            
                            <ul className="space-y-4 text-[14.5px] text-gray-300 font-medium leading-relaxed">
                                <li>
                                    <strong className="text-white block">• 롯폰기 힐즈 (Roppongi Hills)</strong>
                                    {lang === 'kr' 
                                        ? '800세대 고급 주거, 296,000㎡ 오피스, 미술관(최상층 모리 미술관), 호텔(그랜드 하얏트)을 하나의 수직 생태계로 엮어 개관 이래 공실률 0% 수준 유지 중입니다.'
                                        : 'Linked 800 luxury apartments, a 296,000㎡ office tower, Mori Art Museum, and Grand Hyatt into a vertical ecosystem, maintaining a near-zero vacancy rate.'}
                                </li>
                                <li>
                                    <strong className="text-white block">• 아자부다이 힐즈 (Azabudai Hills)</strong>
                                    {lang === 'kr' 
                                        ? '580억 엔 규모의 투자로 일본 최고층 빌딩, 대규모 녹지(중앙 광장), 스타트업 허브, 영국학교, 70여 개 VC가 집결한 도쿄 VC 허브를 조성하며 공간 브랜드 가치를 극대화했습니다.'
                                        : 'Invested 580 billion Yen to develop Japan\'s tallest skyscraper, a central green plaza, startup incubators, British School, and Tokyo VC Hub (70+ VCs).'}
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    {lang === 'kr' ? (
                        <p className="font-semibold">
                            ※ 모리빌딩은 단순 건설을 넘어 최상층 전망대에 미술관을 배치하는 등 소프트웨어적 기획력을 접목하여 자산 가치를 극대화했습니다.
                        </p>
                    ) : (
                        <p className="font-semibold">
                            ※ Mori Building maximized asset value through software-driven curation, such as placing an art museum on the skyscraper\'s top floors.
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}
