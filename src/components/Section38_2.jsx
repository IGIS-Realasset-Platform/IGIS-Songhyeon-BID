import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section38_2({ isActive }) {
    const { lang } = useLanguage();

    const krRows = [
        { cat: '주도 주체', us: '다수 소유자 연합 (바텀업 횡적 연대)', jp: '대형 디벨로퍼 주도 (탑다운 수직 통합)' },
        { cat: '재원 강제성', us: '법적 강제 부과금 (재산세 비례)', jp: '2018년 이후 강제 부담금제 (그 전은 임의 기부)' },
        { cat: '지구 특성', us: '소규모 상업 지구부터 대형 CBD까지 다양', jp: '대규모 신개발 및 역세권(TOD) 복합 개발지 중심' },
        { cat: '공공 공간', us: '지자체로부터 공공 공간 운영 및 유지보수권 위탁', jp: '디벨로퍼가 부지 내 공개공지 직접 소유 및 큐레이션' },
        { cat: '법적 근거', us: '주(State) 단위 입법 ➔ 시(City) 조례 기반', jp: '지역재생법, 도시재생특별조치법 기반' },
        { cat: '대표 사례', us: 'Times Square Alliance, Hudson Yards BID', jp: '마루노우치(미쓰비시), 롯폰기·아자부다이힐스(모리)' },
    ];

    const enRows = [
        { cat: 'Lead Subject', us: 'Multi-Owner Coalition (Bottom-up lateral alliance)', jp: 'Major Developers (Top-down vertical integration)' },
        { cat: 'Funding Mandate', us: 'Legally mandated assessment (tied to property tax)', jp: 'Mandated since 2018 (Prior: voluntary donations)' },
        { cat: 'District Scope', us: 'Diverse (from small retail streets to large CBDs)', jp: 'Large-scale new development & TOD projects' },
        { cat: 'Public Space', us: 'Formally delegated city services (Clean & Safe)', jp: 'Developer-owned plazas directly curated and managed' },
        { cat: 'Legal Basis', us: 'State enabling legislation ➔ City ordinances', jp: 'Local Regeneration Act, Special Act on Urban Renaissance' },
        { cat: 'Key Benchmark', us: 'Times Square Alliance, Hudson Yards BID', jp: 'Marunouchi (Mitsubishi), Roppongi & Azabudai Hills (Mori)' },
    ];

    const rows = lang === 'kr' ? krRows : enRows;

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '미국 vs 일본 제도 비교 / Comparison' : 'US vs Japan System Comparison'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-6">
                    {lang === 'kr' 
                        ? '미국형 BID와 일본형 에리어 매니지먼트의 비교 분석' 
                        : 'Comparative Analysis of US BID vs Japanese Area Management'}
                </h2>

                {/* 비교 테이블 영역 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] overflow-x-auto border-4 border-[#0f172a] shadow-sm bg-white">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-[#0f172a] text-white border-b-4 border-[#0f172a]">
                                <th className="p-4 text-[15px] md:text-[17px] font-black w-[20%] border-r border-white/20">
                                    {lang === 'kr' ? '구분' : 'Category'}
                                </th>
                                <th className="p-4 text-[15px] md:text-[17px] font-black w-[40%] border-r border-white/20 text-[#93c5fd]">
                                    {lang === 'kr' ? '🇺🇸 미국형 BID 모델' : '🇺🇸 US-style BID Model'}
                                </th>
                                <th className="p-4 text-[15px] md:text-[17px] font-black w-[40%] text-emerald-400">
                                    {lang === 'kr' ? '🇯🇵 일본형 에리어 매니지먼트 모델' : '🇯🇵 Japanese Area Management Model'}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <tr 
                                    key={idx} 
                                    className={`border-b border-gray-200 text-[13.5px] md:text-[15.5px] font-semibold text-gray-800 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}`}
                                >
                                    <td className="p-4 border-r border-gray-200 font-bold bg-gray-100/50 text-gray-900">
                                        {row.cat}
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-gray-700">
                                        {row.us}
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        {row.jp}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    {lang === 'kr' ? (
                        <ul className="text-left inline-block space-y-2 mx-auto">
                            <li>• <strong>미국</strong>은 소유권이 고도로 분산된 구역에서 <strong>바텀업 합의와 공적 강제 부과금</strong>을 조화시켜 무임승차를 해결하는 구조입니다.</li>
                            <li>• <strong>일본</strong>은 대형 디벨로퍼의 <strong>자본력과 마스터플랜 기획권</strong>을 통해 공간의 활성화를 주도하며 법제 부담금으로 보완했습니다.</li>
                        </ul>
                    ) : (
                        <ul className="text-left inline-block space-y-2 mx-auto">
                            <li>• The <strong>US model</strong> utilizes <strong>bottom-up agreement and public levies</strong> to solve the free-rider problem across fragmented ownerships.</li>
                            <li>• The <strong>Japan model</strong> leverages developer-led <strong>capital and master-planning authority</strong>, recently backed by legal assessments.</li>
                        </ul>
                    )}
                </div>

            </div>
        </section>
    );
}
