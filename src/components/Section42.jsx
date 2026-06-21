import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section42({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#f8fafc] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? 'SBD BID 추진의 주체별 핵심 메시지' : 'Stakeholder Core Messages'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '이해관계자별 가치 정립: SBD BID 추진의 핵심 메시지 매트릭스' : 'Stakeholder Alignment: SBD BID Value Proposition Matrix'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 깔끔하고 정밀한 표 레이아웃 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] overflow-x-auto">
                    <table className="w-full border-collapse border border-[#0f172a] bg-white text-left shadow-md min-w-[800px]">
                        <thead>
                            <tr className="bg-[#0f172a] text-white">
                                <th className="border border-[#0f172a] px-6 py-4 text-[16px] font-black w-[25%]">
                                    {lang === 'kr' ? '주체 (Stakeholders)' : 'Stakeholders'}
                                </th>
                                <th className="border border-[#0f172a] px-6 py-4 text-[16px] font-black w-[75%]">
                                    {lang === 'kr' ? 'SBD BID 도입에 따른 핵심 메시지 및 기대 가치' : 'Core Message & Expected Value'}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 이지스자산운용 */}
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="border border-[#0f172a] px-6 py-4 bg-slate-50/50 font-black text-[#0f172a] text-[15px] md:text-[16px]">
                                    이지스자산운용 (이오타서울)
                                </td>
                                <td className="border border-[#0f172a] px-6 py-4 text-[14px] md:text-[15px] text-gray-700 font-bold leading-relaxed">
                                    {lang === 'kr'
                                        ? 'BID 주도권을 잡는 것이 가장 비용 효율적인 자산 가치 상승 전략입니다. 늦게 시작할수록 주도권을 잃습니다.'
                                        : 'Securing BID leadership is the most cost-effective asset appreciation strategy. Delaying means losing control.'}
                                </td>
                            </tr>
                            {/* 한화 */}
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="border border-[#0f172a] px-6 py-4 bg-slate-50/50 font-black text-[#0f172a] text-[15px] md:text-[16px]">
                                    한화 (북부역세권)
                                </td>
                                <td className="border border-[#0f172a] px-6 py-4 text-[14px] md:text-[15px] text-gray-700 font-bold leading-relaxed">
                                    {lang === 'kr'
                                        ? '홀로 마케팅하는 것보다 SBD BID 안에서 함께 브랜딩하는 것이 우량 테넌트(앵커사) 유치 비용을 현격히 낮춥니다.'
                                        : 'Co-branding within the SBD BID is far more effective at reducing tenant acquisition costs than marketing alone.'}
                                </td>
                            </tr>
                            {/* 서울시 / 중구청 */}
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="border border-[#0f172a] px-6 py-4 bg-slate-50/50 font-black text-[#0f172a] text-[15px] md:text-[16px]">
                                    서울시 / 중구청
                                </td>
                                <td className="border border-[#0f172a] px-6 py-4 text-[14px] md:text-[15px] text-gray-700 font-bold leading-relaxed">
                                    {lang === 'kr'
                                        ? '공공 예산을 대규모로 추가 투입하지 않고도 도심 서비스 수준을 끌어올릴 수 있는 기회. 제도적 기반만 만들어주면 민간이 운영합니다.'
                                        : 'A rare opportunity to raise urban services without additional public budget. Once authorized, the private sector operates it.'}
                                </td>
                            </tr>
                            {/* 직장인 / 거주자 */}
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="border border-[#0f172a] px-6 py-4 bg-slate-50/50 font-black text-[#0f172a] text-[15px] md:text-[16px]">
                                    직장인 / 거주자
                                </td>
                                <td className="border border-[#0f172a] px-6 py-4 text-[14px] md:text-[15px] text-gray-700 font-bold leading-relaxed">
                                    {lang === 'kr'
                                        ? '내가 매일 일하고 생활하는 권역의 청소, 보안, 보행 공간, 그리고 문화 이벤트 품질이 극대화되고, 내 소유 부동산 가치가 상승합니다.'
                                        : 'Direct upgrades in daily cleaning, security, pedestrian spaces, and events, while boosting property value.'}
                                </td>
                            </tr>
                            {/* 소상공인 */}
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="border border-[#0f172a] px-6 py-4 bg-slate-50/50 font-black text-[#0f172a] text-[15px] md:text-[16px]">
                                    소상공인
                                </td>
                                <td className="border border-[#0f172a] px-6 py-4 text-[14px] md:text-[15px] text-gray-700 font-bold leading-relaxed">
                                    {lang === 'kr'
                                        ? '개별 영세 업소 단위로는 불가능한 광역 통합 지구 단위 공동 마케팅을 BID 재원을 통해 지원받아 유동 인구 집객 효과를 누립니다.'
                                        : 'Enjoy the benefits of coordinated district-wide marketing that is impossible for individual small shops to afford.'}
                                </td>
                            </tr>
                            {/* IGIS자산운용 */}
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="border border-[#0f172a] px-6 py-4 bg-[#eff6ff] font-black text-[#1e3a8a] text-[15px] md:text-[16px]">
                                    IGIS자산운용
                                </td>
                                <td className="border border-[#0f172a] px-6 py-4 text-[14px] md:text-[15px] text-[#1e3a8a] font-black leading-relaxed">
                                    {lang === 'kr'
                                        ? 'SBD가 서울의 4번째 핵심 업무지구로 발돋움하는 골든타임. 이 메가 변화를 이끈 플레이어로서의 레코드가 향후 10년의 글로벌 펀드 레이징을 결정합니다.'
                                        : 'As SBD becomes the 4th major business district, leading this urban evolution determines the success of fund raising for the next 10 years.'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 하단 설명글 - 규격 준수 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                {lang === 'kr'
                                    ? '자산 운용사, 건설 디벨로퍼, 공공 지방정부, 지역 주민과 소상공인까지 개별 가치를 정교하게 연계한 이해관계 매트릭스'
                                    : 'A sophisticated alignment of value propositions for institutional managers, public authorities, and local businesses.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
