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

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 2대 원칙 입체 순환 파이프라인 인포그래픽 적용 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] flex flex-col lg:flex-row gap-6 items-stretch">
                    
                    {/* 좌측: 원칙 01 앵커 기금 파이프라인 (SVG) */}
                    <div className="w-full lg:w-[50%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                RULE 01
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#0f172a] mb-4 leading-tight">
                                {lang === 'kr' ? '앵커 연합체 중심의 초기 기금 조성' : 'Anchor Federation Capitalization'}
                            </h3>
                            
                            {/* 앵커 연합 기금 파이프라인 SVG */}
                            <div className="w-full h-[180px] bg-slate-50 border border-gray-200 relative mb-4">
                                <svg className="w-full h-full" viewBox="0 0 300 180">
                                    {/* 대형 소유주 노드 */}
                                    <rect x="20" y="30" width="80" height="40" fill="#0f172a" stroke="#0f172a" strokeWidth="1.5" />
                                    <text x="60" y="50" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">이지스 (이오타)</text>
                                    <text x="60" y="62" textAnchor="middle" fill="#93c5fd" fontSize="7">[46만㎡ 트로피]</text>

                                    <rect x="20" y="110" width="80" height="40" fill="#0f172a" stroke="#0f172a" strokeWidth="1.5" />
                                    <text x="60" y="130" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">한화 (북부역세)</text>
                                    <text x="60" y="142" textAnchor="middle" fill="#93c5fd" fontSize="7">[35만㎡ 트로피]</text>
                                    
                                    {/* 파이프 연결 및 기금 수송 */}
                                    <path d="M 100,50 L 160,50 L 160,95 L 200,95" fill="none" stroke="#1e3a8a" strokeWidth="2.5" />
                                    <path d="M 100,130 L 160,130 L 160,95 L 200,95" fill="none" stroke="#1e3a8a" strokeWidth="2.5" />
                                    
                                    {/* 초기 기금 적립 (코어) */}
                                    <rect x="200" y="75" width="80" height="40" fill="#eff6ff" stroke="#1e3a8a" strokeWidth="2" />
                                    <text x="240" y="94" textAnchor="middle" fill="#1e3a8a" fontSize="9" fontWeight="black">초기 자생 기금</text>
                                    <text x="240" y="106" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">[수수료 정기적립]</text>
                                </svg>
                            </div>

                            <p className="text-[12.5px] text-gray-600 font-bold leading-relaxed">
                                {lang === 'kr'
                                    ? '소상공인이 밀집한 파편 상권 대신, 이오타서울/북부역세권 등 초대형 프라임 앵커 소유주 연합의 관리비 일부를 정기 수수료화하여 막대한 초기 정기 기금을 선제 조성합니다.'
                                    : 'Avoid fragmented areas initially. Start with mega developments like IOTA Seoul & Seoul Station North.'}
                            </p>
                        </div>
                    </div>

                    {/* 우측: 원칙 02 공공공간 수익권 파이프라인 (SVG) */}
                    <div className="w-full lg:w-[50%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                RULE 02
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-gray-900 mb-4 leading-tight">
                                {lang === 'kr' ? '공공공간 점유를 통한 수익 사업 합법화' : 'Monetizing Public Space (Hudson Yards Benchmark)'}
                            </h3>
                            
                            {/* 점용권 양도 및 수익 창출 순환 SVG */}
                            <div className="w-full h-[180px] bg-slate-50 border border-gray-200 relative mb-4">
                                <svg className="w-full h-full" viewBox="0 0 300 180">
                                    {/* 서울시 점용 허가 */}
                                    <rect x="20" y="70" width="80" height="40" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
                                    <text x="60" y="90" textAnchor="middle" fill="#2563eb" fontSize="9" fontWeight="bold">서울시 (지자체)</text>
                                    <text x="60" y="102" textAnchor="middle" fill="#475569" fontSize="7">[점용 허가권 위임]</text>
                                    
                                    {/* 위임 흐름 */}
                                    <line x1="100" y1="90" x2="150" y2="90" stroke="#3b82f6" strokeWidth="2.5" />
                                    <polygon points="155,90 149,94 149,86" fill="#3b82f6" />
                                    
                                    {/* 수익 사업 활성화 노드 */}
                                    <rect x="160" y="50" width="120" height="80" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
                                    <text x="220" y="75" textAnchor="middle" fill="#1e3a8a" fontSize="9" fontWeight="black">공개공지·보행로 점용</text>
                                    <text x="220" y="92" textAnchor="middle" fill="#059669" fontSize="8" fontWeight="bold">➔ 팝업 스토어</text>
                                    <text x="220" y="107" textAnchor="middle" fill="#059669" fontSize="8" fontWeight="bold">➔ 야외 문화 행사 수익</text>
                                    <text x="220" y="122" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">[자주적 자생 재원]</text>
                                </svg>
                            </div>

                            <p className="text-[12.5px] text-gray-600 font-bold leading-relaxed">
                                {lang === 'kr'
                                    ? '뉴욕 HYHK 모델을 이식하여 단순 공공 유지보수 업무 대행에 그치지 않고, 가로와 공개공지 일대의 일괄 독점 점용권을 부여함으로써 민간이 스스로 인프라 유지 자금을 벌어들이는 자생 구조를 확립합니다.'
                                    : 'Enable popups & outdoor event revenues for self-financing.'}
                            </p>
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
