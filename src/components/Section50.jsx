import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section50({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 - 이철승 대표의 직역을 배제하고 맥락에 맞춘 세련된 문구 적용 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '서울 도심의 스카이라인을 재정의하는 이오타 서울의 독보적 스케일' : 'IOTA Seoul’s Unprecedented Scale Redefining the Downtown Skyline'}
                    </span>
                </div>

                {/* 제목 - 핵심 가치 명확화 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '연면적 46만㎡ 복합 개발과 리츠칼튼 호텔 유치: 도심의 심장을 재탄생시키다' : '460k ㎡ GFA Mixed-Use & Ritz-Carlton: Rebirthing the Core of the City'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏을 배제한 시원한 직사각형 카드 레이아웃 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] flex flex-col gap-6">
                    
                    {/* 상단 3대 핵심 물리적 지표 보드 */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="border border-[#0f172a] bg-slate-50 p-4 flex flex-col items-center justify-center">
                            <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Total Investment</span>
                            <span className="text-[22px] md:text-[28px] font-black text-[#0f172a] mt-1">
                                {lang === 'kr' ? '약 2.0조 원' : 'approx. 2.0T KRW'}
                            </span>
                        </div>
                        <div className="border border-[#0f172a] bg-[#0f172a] p-4 flex flex-col items-center justify-center">
                            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Gross Floor Area (GFA)</span>
                            <span className="text-[22px] md:text-[28px] font-black text-white mt-1">
                                {lang === 'kr' ? '총 460,000 ㎡' : '460,000 ㎡'}
                            </span>
                        </div>
                        <div className="border border-[#0f172a] bg-slate-50 p-4 flex flex-col items-center justify-center">
                            <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Building Scale</span>
                            <span className="text-[22px] md:text-[28px] font-black text-[#0f172a] mt-1">
                                {lang === 'kr' ? '지하 10층 - 지상 39층' : 'B10F - 39F'}
                            </span>
                        </div>
                    </div>

                    {/* 하단 2분할 코어 영역 (좌측: 2대 개발축 / 우측: 앵커 구성원) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        
                        {/* 좌측: 연합 개발의 두 축 */}
                        <div className="border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                            <div>
                                <span className="inline-block bg-[#0f172a] text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                    Double Core Axis
                                </span>
                                <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-4">
                                    {lang === 'kr' ? '남산과 세종대로를 잇는 2대 개발 부지' : 'Two Core Development Sites'}
                                </h3>

                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 border-l-4 border-[#1e3a8a]">
                                        <div className="font-bold text-[15px] text-[#0f172a]">
                                            {lang === 'kr' ? '이오타 서울 1 (힐튼 부지)' : 'IOTA Seoul 1 (Hilton Site)'}
                                        </div>
                                        <div className="text-[13px] text-slate-600 mt-1">
                                            {lang === 'kr' 
                                                ? '남산의 상징적 진입로에 위치하며, 하이엔드 복합 문화 공간과 최고급 호텔 및 리테일로 탄생' 
                                                : 'Namsan Gateway development featuring high-end cultural zones, luxury hotel, and retail.'}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-slate-50 border-l-4 border-[#1e3a8a]">
                                        <div className="font-bold text-[15px] text-[#0f172a]">
                                            {lang === 'kr' ? '이오타 서울 2 (남대문로5가)' : 'IOTA Seoul 2 (Namdaemunro)'}
                                        </div>
                                        <div className="text-[13px] text-slate-600 mt-1">
                                            {lang === 'kr' 
                                                ? '노후화된 메트로타워와 서울타워를 연면적 12만㎡ 규모의 최고급 프라임 오피스 타워로 통합 재개발' 
                                                : 'Reconstructing Metro Tower and Seoul Tower into a unified 120k ㎡ prime office building.'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 우측: 앵커 테넌트 및 핵심 기능 */}
                        <div className="border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                            <div>
                                <span className="inline-block bg-[#2563eb] text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                    Flagship Anchor
                                </span>
                                <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-4">
                                    {lang === 'kr' ? '메리어트 최상위 럭셔리 브랜드 유치' : 'The Ritz-Carlton Hotel Integration'}
                                </h3>

                                <div className="p-4 bg-[#eff6ff] border border-[#2563eb]/20 flex items-center justify-between mb-4">
                                    <div>
                                        <div className="font-black text-[17px] text-[#1e3a8a]">
                                            {lang === 'kr' ? '리츠칼튼(Ritz-Carlton) 서울 복귀' : 'The Ritz-Carlton Return'}
                                        </div>
                                        <div className="text-[12.5px] text-slate-600 mt-1">
                                            {lang === 'kr' 
                                                ? '아시아 호스피탈리티 허브로서 서울의 도시적 위상 격상' 
                                                : 'Elevating Seoul’s metropolitan prestige in the Asian market.'}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[12px] text-slate-500 font-bold">{lang === 'kr' ? '할당 면적' : 'Dedicated GFA'}</div>
                                        <div className="text-[18px] font-black text-[#2563eb]">58,400 ㎡</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 text-center text-[12px] font-bold">
                                    <div className="p-2 border border-slate-200 bg-slate-50 text-[#0f172a]">
                                        🏢 {lang === 'kr' ? '인텔리전트 오피스' : 'Intelligent Office'}
                                    </div>
                                    <div className="p-2 border border-slate-200 bg-slate-50 text-[#0f172a]">
                                        🛍️ {lang === 'kr' ? '하이엔드 리테일' : 'High-End Retail'}
                                    </div>
                                    <div className="p-2 border border-slate-200 bg-slate-50 text-[#0f172a]">
                                        🏨 {lang === 'kr' ? '럭셔리 호스피탈리티' : 'Luxury Hotel'}
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
                                    ? '이지스자산운용과 현대건설이 공동 추진하는 2조 원 규모의 복합 개발로, 힐튼 부지(이오타 1)와 메트로·서울타워(이오타 2)를 아우르는 연면적 46만㎡ 랜드마크 조성'
                                    : 'A joint 2.0-trillion KRW development by IGIS and Hyundai, creating a unified 460k ㎡ landmark by merging the Hilton site and Metro/Seoul Towers.'}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                {lang === 'kr'
                                    ? '메리어트의 최상위 플래그십 호텔 브랜드인 리츠칼튼(5.8만㎡)의 입점을 확정하여 스카이라인의 가치를 높이고 아시아 호스피탈리티 허브 구축'
                                    : 'Secured the return of Marriott’s luxury flagship Ritz-Carlton (58.4k ㎡), elevating skyline value and establishing a luxury hub.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
