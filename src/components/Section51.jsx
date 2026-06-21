import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section51({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 - 의역하여 맥락 전달력 극대화 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '위기를 극복한 이오타 서울의 금융 타결과 에어리어 매니지먼트의 실행 동력' : 'Financial Resolution & Area Management Momentum for IOTA Seoul'}
                    </span>
                </div>

                {/* 제목 - 드라이하고 단호한 핵심 주장 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '7,170억 규모 브릿지론 극적 타결과 이지스 사옥 이전: 책임 경영의 신호탄' : 'Overcoming 717B KRW Loan Crisis & Relocating IGIS HQ: Anchor of Developer Commitment'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제한 2분할 가시성 높은 인포그래픽 보드 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    
                    {/* 좌측: 금융 위기 극복 프로세스 (남색 테두리 박스) */}
                    <div className="border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                Financial Turnaround
                            </span>
                            <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-4">
                                {lang === 'kr' ? '7,170억 원 브릿지론 EOD 위기 극복' : 'Resolving the 717B KRW Bridge Loan Crisis'}
                            </h3>

                            {/* 세부 프로세스 리스트 */}
                            <div className="space-y-3">
                                <div className="p-3 bg-slate-50 border-l-4 border-slate-400">
                                    <div className="text-[12px] font-bold text-slate-500">{lang === 'kr' ? '브릿지론 만기 도래' : 'Bridge Loan Maturity'}</div>
                                    <div className="text-[14px] font-extrabold text-[#0f172a] mt-0.5">
                                        {lang === 'kr' ? '총 7,170억 원 규모 재원 조달 위기' : 'Total GFA Financial Lock: 717B KRW'}
                                    </div>
                                    <div className="text-[11.5px] text-slate-500 mt-1">
                                        {lang === 'kr' ? '선순위 4,800억 / 중순위 1,400억 / 후순위 970억 원' : 'Senior 480B / Mezzanine 140B / Junior 97B KRW'}
                                    </div>
                                </div>

                                <div className="p-3 bg-red-50 border-l-4 border-red-500">
                                    <div className="text-[12px] font-bold text-red-600">{lang === 'kr' ? 'EOD 사태 및 공매 위기' : 'EOD and Public Auction Risk'}</div>
                                    <div className="text-[14px] font-extrabold text-red-900 mt-0.5">
                                        {lang === 'kr' ? '중순위 대주 동의 보류로 인한 담보권 실행 직전' : 'Mezz Lender Disagreement Led to EOD and Auction Danger'}
                                    </div>
                                    <div className="text-[11.5px] text-red-700 mt-1">
                                        {lang === 'kr' ? 'HDC 현대산업개발 등의 저가 인수 시나리오 대두로 불안감 증폭' : 'HDC Hyundai Dev fire-sale takeover rumors amplified market anxiety'}
                                    </div>
                                </div>

                                <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500">
                                    <div className="text-[12px] font-bold text-emerald-600">{lang === 'kr' ? '리파이낸싱 극적 타결' : 'Refinancing Successfully Agreed'}</div>
                                    <div className="text-[14px] font-extrabold text-emerald-900 mt-0.5">
                                        {lang === 'kr' ? '메리츠·NH투자증권 4,900억 원 신규 자금 지원 합의' : 'Meritz & NH Securities Backing 490B KRW Senior Capital'}
                                    </div>
                                    <div className="text-[11.5px] text-emerald-700 mt-1">
                                        {lang === 'kr' ? '책임임차 확정 및 본PF 전환 모멘텀 확보' : 'Master lease confirmed, building powerful momentum for Main PF'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 에어리어 매니지먼트 및 책임 경영 (남색 테두리 박스) */}
                    <div className="border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#2563eb] text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                Strategic Implications
                            </span>
                            <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-4">
                                {lang === 'kr' ? '에어리어 매니지먼트와 디벨로퍼 책임 경영' : 'Area Management & Developer Relocation'}
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <div className="font-extrabold text-[15px] text-[#0f172a] flex items-center">
                                        <span className="w-1.5 h-3 bg-[#2563eb] mr-2 inline-block"></span>
                                        {lang === 'kr' ? '서울역-남산 SBD 로드맵 자금줄 정상화' : 'Reactivating the SBD Masterplan Fund Flow'}
                                    </div>
                                    <p className="text-[13px] text-slate-600 mt-1.5 ml-3.5 leading-relaxed">
                                        {lang === 'kr'
                                            ? '이오타 서울 2의 극적인 회생은 단일 건물의 위기 극복을 넘어, 서울역 일대 전체를 4세대 업무지구(SBD)로 구축하려는 거대 마스터플랜의 동력을 복원시켰음을 의미합니다.'
                                            : 'The rescue of IOTA Seoul 2 revives the financial lifeline for the entire Seoul Station-Namsan SBD localization project.'}
                                    </p>
                                </div>

                                <div className="border-t border-slate-100 pt-4">
                                    <div className="font-extrabold text-[15px] text-[#0f172a] flex items-center">
                                        <span className="w-1.5 h-3 bg-[#2563eb] mr-2 inline-block"></span>
                                        {lang === 'kr' ? '이지스자산운용 본사 사옥 전격 이전' : 'IGIS Asset Management HQ Relocation Plan'}
                                    </div>
                                    
                                    {/* 사옥 이전 로드맵 도식 */}
                                    <div className="mt-2.5 bg-slate-50 p-3 border border-slate-200 flex justify-between items-center text-center">
                                        <div className="flex-1">
                                            <div className="text-[11px] font-bold text-slate-500">Past</div>
                                            <div className="text-[12.5px] font-extrabold text-slate-600">강남 GFC</div>
                                        </div>
                                        <div className="text-slate-400">➔</div>
                                        <div className="flex-1">
                                            <div className="text-[11px] font-bold text-slate-500">Present</div>
                                            <div className="text-[12.5px] font-extrabold text-slate-600">여의도 세우빌딩</div>
                                        </div>
                                        <div className="text-[#2563eb]">➔</div>
                                        <div className="flex-1 bg-[#eff6ff] border border-[#2563eb]/20 py-1.5">
                                            <div className="text-[11px] font-black text-[#2563eb]">Future Anchor</div>
                                            <div className="text-[13px] font-black text-[#1e3a8a]">{lang === 'kr' ? '이오타 서울' : 'IOTA Seoul'}</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="font-extrabold text-[14.5px] text-[#10b981] flex items-center">
                                        <span className="w-1.5 h-3 bg-[#10b981] mr-2 inline-block"></span>
                                        {lang === 'kr' ? '개발 후 엑시트에서 평생 동반자로 전환' : 'Transition to Long-Term Stewardship'}
                                    </div>
                                    <p className="text-[13px] text-slate-600 mt-1 ml-3.5 leading-relaxed">
                                        {lang === 'kr'
                                            ? '자산운용사가 단순 매각 후 떠나는 디벨로퍼 모델에서 탈피, 직접 입주하여 상업 생태계에 뿌리를 내리고 영구적인 에어리어 매니지먼트의 중심축 역할을 수행하겠다는 강력한 책임 의지를 증명합니다.'
                                            : 'Shows ultimate commitment to area management by anchoring their own headquarters instead of taking a quick exit.'}
                                    </p>
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
                                    ? '자금 경색 및 중순위 대주 갈등으로 인한 EOD/공매 위기를 메리츠·NH의 4,900억 원 신규 선순위 참여로 타결하고 H1 내 본PF 전환 동력 확보'
                                    : 'Overcame EOD and public auction threats from Mezz lender conflicts by securing a 490B KRW senior loan from Meritz/NH Securities.'}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                {lang === 'kr'
                                    ? '이지스자산운용 본사를 이오타 서울로 이전하기로 확정함으로써 개발 직후 매각하는 단순 디벨로퍼를 넘어, 지역 활성화를 책임지는 에어리어 매니지먼트의 중심축 선언'
                                    : 'Confirming IGIS HQ relocation to IOTA Seoul signals a shift from short-term developer exits to permanent area management stewardship.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
