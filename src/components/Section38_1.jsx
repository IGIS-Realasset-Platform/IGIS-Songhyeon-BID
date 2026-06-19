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
                        {lang === 'kr' ? '일본 도쿄 — 에리어 매니지먼트 & 일본판 BID' : 'Tokyo, Japan — Area Management & Japanese BID'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-6">
                    {lang === 'kr' 
                        ? '대형 디벨로퍼 주도의 수직 통합 모델과 2018년 법적 부담금제 도입' 
                        : 'Developer-Led Vertical Integration and the Legally Mandated Assessment System'}
                </h2>

                {/* 콘텐츠 영역: 2열 인포그래픽 박스 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                    
                    {/* 좌측: 대형 디벨로퍼 수직 통합 모델 */}
                    <div className="border-4 border-[#0f172a] bg-white p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#1e3a8a] text-white text-[12px] font-black px-3 py-1 uppercase mb-4">
                                Developer-Led Model
                            </span>
                            <h3 className="text-[22px] font-black text-gray-900 mb-5">
                                {lang === 'kr' ? '🇯🇵 대형 디벨로퍼의 장기 수직통합 운영' : '🇯🇵 Long-Term Vertically Integrated Operations'}
                            </h3>
                            
                            <div className="space-y-4 text-[14.5px] text-gray-700 font-medium leading-relaxed">
                                <div className="border-l-4 border-[#1e3a8a] pl-3">
                                    <span className="block font-black text-gray-900">{lang === 'kr' ? '🏢 미쓰비시 지쇼 (OMY 지구)' : '🏢 Mitsubishi Estate (OMY District)'}</span>
                                    <p className="text-gray-600 mt-1">
                                        {lang === 'kr' 
                                            ? '마루노우치 일대 106개 빌딩을 협의회 기반으로 관리하며, 미사용 용적률을 매각하는 용적이전(TDR) 및 오픈 이노베이션 플랫폼(TMIP)을 구축했습니다.'
                                            : 'Managed 106 buildings in Marunouchi using a landowners council, utilizing Transfer of Development Rights (TDR) and launching the TMIP open innovation platform.'}
                                    </p>
                                </div>
                                <div className="border-l-4 border-[#1e3a8a] pl-3">
                                    <span className="block font-black text-gray-900">{lang === 'kr' ? '🎨 모리 빌딩 (롯폰기힐스 · 아자부다이힐스)' : '🎨 Mori Building (Roppongi & Azabudai Hills)'}</span>
                                    <p className="text-gray-600 mt-1">
                                        {lang === 'kr' 
                                            ? '단순 분양을 넘어 "문화도심(Cultural Heart)" 철학 하에 최상층 모리 미술관, 벤처캐피탈(VC) 허브, 영국학교 등을 원스톱 라이프스타일 생태계로 큐레이션 및 직접 소유·운영합니다.'
                                            : 'Curated and directly owned/operated a one-stop ecosystem under the "Cultural Heart" philosophy, integrating Mori Art Museum, Tokyo VC Hub, and British School.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 2018년 지역재생법 개정 (일본판 BID) */}
                    <div className="border-4 border-[#0f172a] bg-[#0f172a] p-6 text-white shadow-md flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#ef4444] text-white text-[12px] font-black px-3 py-1 uppercase mb-4">
                                Legal Institutionalization
                            </span>
                            <h3 className="text-[22px] font-black mb-5 text-[#93c5fd]">
                                {lang === 'kr' ? '⚖️ 2018년 일본판 BID (지역재생법 개정)' : '⚖️ 2018 Japanese BID (Local Regeneration Act)'}
                            </h3>
                            
                            <div className="space-y-4 text-[14.5px] text-gray-300 font-medium leading-relaxed">
                                <div className="border-l-4 border-[#ef4444] pl-3">
                                    <span className="block font-black text-white">{lang === 'kr' ? '💰 지역재생 에리어매니지먼트 부담금제도' : '💰 Local Area Management Assessment System'}</span>
                                    <p className="text-gray-400 mt-1">
                                        {lang === 'kr' 
                                            ? '수익자(사업자) 2/3 이상의 서면 동의를 거쳐 지자체가 지방세(자산세·사업소세 등) 방식으로 부담금을 강제 징수한 뒤 에리어 매니지먼트 단체에 100% 교부합니다.'
                                            : 'With 2/3 agreement of local beneficiaries, municipalities collect mandated assessments via property/business taxes and allocate them directly to Area Management organizations.'}
                                    </p>
                                </div>
                                <div className="border-l-4 border-[#ef4444] pl-3">
                                    <span className="block font-black text-white">{lang === 'kr' ? '🔄 무임승차(Free-Rider) 문제 원천 차단' : '🔄 Eradication of Free-Rider Issue'}</span>
                                    <p className="text-gray-400 mt-1">
                                        {lang === 'kr' 
                                            ? '기존의 자발적 기부금에 전적으로 의존하던 재원 한계를 극복하고, 오사카 우메키타(2014년 조례)의 성공 사례를 전국 단위 법제화로 확대해 재원 조달 안정성을 구축했습니다.'
                                            : 'Overcame the instability of voluntary donations by legalizing the Osaka Umekita (2014) model nationwide, establishing a robust and permanent funding stream.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    {lang === 'kr' ? (
                        <ul className="text-left inline-block space-y-2 mx-auto">
                            <li>• 일본은 대형 디벨로퍼들이 대규모 면적을 직접 장기 보유하며 공간 가치를 큐레이션하는 <strong>수직 통합 모델</strong>을 발전시켜 왔습니다.</li>
                            <li>• 2018년 지역재생법 개정을 통해 미국식 BID의 강제적 재원 징수 모델을 도입하여 <strong>공적 강제성과 디벨로퍼 주도 기획력의 결합</strong>을 완비했습니다.</li>
                        </ul>
                    ) : (
                        <ul className="text-left inline-block space-y-2 mx-auto">
                            <li>• Japan has developed a <strong>vertical integration model</strong> where developers hold and curate large districts long-term.</li>
                            <li>• In 2018, Japan integrated the US-style mandatory assessment method to marry <strong>statutory taxing power with developer-led placemaking capability</strong>.</li>
                        </ul>
                    )}
                </div>

            </div>
        </section>
    );
}
