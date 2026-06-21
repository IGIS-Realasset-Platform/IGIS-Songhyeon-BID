import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section47({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#f8fafc] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '앵커 연합체 기반의 서울형 SBD 운영체제 설계 원칙' : 'Seoul-Style SBD Operation Rules'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '앵커 연합체와 공공공간 수익 사업화: 서울형 SBD 2대 성공 원칙' : 'Anchor Federation & Space Monetization: Two Rules for Seoul SBD'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 2대 원칙 대칭 및 순환 매커니즘 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] flex flex-col lg:flex-row gap-8 items-stretch">
                    
                    {/* 원칙 1: 앵커 디벨로퍼 자본 투입 */}
                    <div className="w-full lg:w-[50%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                RULE 01
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#0f172a] mb-4 leading-tight">
                                {lang === 'kr' ? '앵커 디벨로퍼 중심의 초기 기금 조성' : 'Anchor Developer-Led Capital & Fund Setup'}
                            </h3>
                            <p className="text-[#1e3a8a] text-[14px] font-black mb-4">
                                * 파편화된 영세 상권이 아닌, 대형 자산운용사와 글로벌 디벨로퍼 지배 구역에서 시작
                            </p>
                            <p className="text-[13px] text-gray-600 font-bold leading-relaxed mb-6">
                                {lang === 'kr'
                                    ? '초기에는 소상공인 설득이 어려운 파편 상권을 지양하고, 이오타서울(이지스) 및 서울역 북부역세권(한화) 등 거대 신규 개발 구역의 앵커 소유주 연합체부터 출발합니다. 개별 건물 관리비의 일정 비율을 타운 매니지먼트 수수료로 책정하여 막대한 초기 자생 기금을 선제적으로 구축합니다.'
                                    : 'Avoid fragmented areas initially. Start with mega developments like IOTA Seoul & Seoul Station North. Set a percentage of building management fees as TM fees to build initial funds.'}
                            </p>
                        </div>
                        
                        <div className="bg-slate-50 p-4 border border-gray-200">
                            <span className="block text-[12px] font-black text-gray-400 uppercase">Strategic Focus</span>
                            <span className="text-[13px] font-bold text-gray-700 mt-1 block">
                                ➔ 이오타서울 + 북부역세권 앵커 연합의 매니지먼트 수수료 선적립
                            </span>
                        </div>
                    </div>

                    {/* 원칙 2: 공공공간 수익 사업화 */}
                    <div className="w-full lg:w-[50%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                RULE 02
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-gray-900 mb-4 leading-tight">
                                {lang === 'kr' ? '공공공간 점유를 통한 수익 사업 합법화' : 'Monetizing Public Space (Hudson Yards Benchmark)'}
                            </h3>
                            <p className="text-[#3b82f6] text-[14px] font-black mb-4">
                                * 단순 유지보수 의무를 넘어 공개공지 및 보행로의 일괄 점용 허가 양도
                            </p>
                            <p className="text-[13px] text-gray-600 font-bold leading-relaxed mb-6">
                                {lang === 'kr'
                                    ? '뉴욕시가 HYHK BID에 공원 관리권을 위탁한 사례를 벤치마킹하여, 서울시는 건물 주변 공개공지, 도로, 보행통로에 대한 일괄 점용 허가권을 매니지먼트 연합에 부여해야 합니다. 팝업 스토어, 야외 문화 행사 기획 등으로 수익을 창출해 정부 재정 없이도 자생할 수 있는 구조를 만듭니다.'
                                    : 'Following NYC\'s delegation to HYHK, transfer administrative occupancy rights for open plazas & pedestrian paths to the TM alliance. Enable popups & outdoor event revenues for self-financing.'}
                            </p>
                        </div>
                        
                        <div className="bg-blue-50/50 p-4 border border-blue-200">
                            <span className="block text-[12px] font-black text-blue-500 uppercase">Benchmark Reference</span>
                            <span className="text-[13px] font-bold text-[#1e3a8a] mt-1 block">
                                ➔ 뉴욕 HYHK 모델을 이식한 공공공간 점용권 이양 및 자주적 수익 모델 확보
                            </span>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 - 규격 준수 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                {lang === 'kr'
                                    ? '앵커 디벨로퍼의 연합비로 초기 동력을 확보하고, 서울시의 공공 공간 점용권 허가로 자주적 자생 구조를 완성하는 2대 설계 축'
                                    : 'A dual-axis model: setup initial fund via anchor developer fees, and achieve self-sustainability through public occupancy delegation.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
