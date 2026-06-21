import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section53({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 - 의역하여 맥락 강화 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '공공 인프라 민간 위탁 관리와 로컬 상권의 상생 플레이스메이킹' : 'Private Infrastructure Management & Local Win-Win Placemaking'}
                    </span>
                </div>

                {/* 제목 - 단호하고 임팩트 있는 핵심 메시지 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '서울로 7017 하이엔드 관리 위탁과 지역 상생형 플레이스메이킹 전략' : 'Seoulo 7017 High-End Maintenance & Regional Synergy Placemaking'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제한 2분할 가시성 높은 인포그래픽 보드 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    
                    {/* 좌측: 서울로 7017 통합 하이엔드 관리 (남색 테두리 박스) */}
                    <div className="border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                Infrastructure Stewardship
                            </span>
                            <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-4">
                                {lang === 'kr' ? '서울로 7017 공공 기여형 관리 위탁' : 'Seoulo 7017 Private Maintenance Delegation'}
                            </h3>

                            <div className="space-y-4">
                                <div className="p-3 bg-slate-50 border-l-4 border-[#2563eb]">
                                    <div className="font-bold text-[14.5px] text-[#0f172a]">{lang === 'kr' ? '명동-남산을 잇는 보행축과의 건축적 직결' : 'Architectural Connection to Pedestrian Axis'}</div>
                                    <div className="text-[12.5px] text-slate-600 mt-1">
                                        {lang === 'kr' 
                                            ? '이오타 서울은 서울역 고가도로를 재생한 보행 공원인 \'서울로 7017\'과 브릿지로 직접 연결되며, 남산과 도심을 잇는 보행 네트워크 중심에 자리 잡고 있습니다.' 
                                            : 'IOTA Seoul directly interfaces with Seoulo 7017 park, serving as the link connecting Myeongdong, Namsan, and Seoul Station.'}
                                    </div>
                                </div>

                                <div className="p-3 bg-[#eff6ff] border border-[#2563eb]/20">
                                    <div className="font-bold text-[14.5px] text-[#1e3a8a]">{lang === 'kr' ? '공공 공간 점용 및 위탁 권한 이전' : 'Delegation of Maintenance and Pop-up Rights'}</div>
                                    <div className="text-[12.5px] text-slate-700 mt-1 leading-relaxed">
                                        {lang === 'kr' 
                                            ? '서울시가 소유한 서울로 7017 일부 구간과 인근 공개공지의 치안, 미화, 조경 및 예술 팝업 운영 권한을 얼라이언스에 양도합니다. (뉴욕 벨라 압죽 공원 모델의 철저한 로컬 벤치마킹)' 
                                            : 'Benchmark Hudson Yards’ Bella Abzug Park model. Seoul City delegates landscaping, safety, and event popup rights to the Alliance to secure premium identity.'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 로컬 상생 플레이스메이킹 (남색 테두리 박스) */}
                    <div className="border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#2563eb] text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                Regional Value Spillover
                            </span>
                            <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-4">
                                {lang === 'kr' ? '럭셔리 콘텐츠 연계형 로컬 상생 전략' : 'Synergy with Traditional Neighborhoods'}
                            </h3>

                            <div className="space-y-4">
                                <div className="p-3 bg-slate-50 border-l-4 border-[#10b981]">
                                    <div className="font-bold text-[14.5px] text-[#0f172a]">{lang === 'kr' ? '호텔·오피스 네트워크와 전통 상권의 연계' : 'Connecting Trophiess & Local Merchant Markets'}</div>
                                    <div className="text-[12.5px] text-slate-600 mt-1 leading-relaxed">
                                        {lang === 'kr' 
                                            ? '리츠칼튼 호텔의 럭셔리 식음료(F&B) 수요와 대기업 입주사의 비즈니스 네트워크를 인근 남대문 시장, 봉래동 먹자골목 등으로 유도하는 마케팅 연계 시스템을 가동합니다.' 
                                            : 'Channel Ritz-Carlton’s fine dining audience and prime tenant business networks into neighboring Namdaemun Market and local dining streets.'}
                                    </div>
                                </div>

                                <div className="p-3 bg-emerald-50 border border-emerald-200">
                                    <div className="font-bold text-[14.5px] text-emerald-800">{lang === 'kr' ? '소프트웨어 중심의 가로 활성화 이벤트' : 'Street Activation and Streetscape Marketing'}</div>
                                    <div className="text-[12.5px] text-emerald-900 mt-1 leading-relaxed">
                                        {lang === 'kr' 
                                            ? '뉴욕의 스트리트 댄스 페스티벌이나 보행자 친화 화분 설치 사례와 같이, 얼라이언스 자체 기금으로 가로 예술품 설치, 야외 스트리트 세련 마케팅 등을 상시 기획·실행합니다.' 
                                            : 'Plan and fund outdoor art installations, modern street marketing, and cultural programs to create substantial spillover benefits for the local ecosystem.'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                {lang === 'kr'
                                    ? '뉴욕 벨라 압죽 공원의 민간 위탁 운영 모델을 도입하여 서울로 7017의 일부 구간 조경·치안·이벤트 권리를 민간이 총괄함으로써 시 예산 절감과 하이엔드 아이덴티티 수호'
                                    : 'Integrating NY’s Bella Abzug Park model to delegate Seoulo 7017’s upkeep and popup rights, saving public funds while preserving premium identity.'}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                {lang === 'kr'
                                    ? '이오타 서울의 프리미엄 자산을 주변 남대문 시장 및 봉래동 먹거리 가로와 입체적으로 연계하는 마케팅·예술 기획을 통해 지역 전반에 낙수 효과 창출'
                                    : 'Bridging premium assets with neighboring traditional retail streets via sophisticated cultural programs to generate sustainable local economic synergy.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
