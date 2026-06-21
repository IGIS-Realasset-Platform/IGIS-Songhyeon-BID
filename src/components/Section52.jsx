import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section52({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 - 의역하여 맥락 강화 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '하드웨어를 넘어 소프트웨어 운영체제로 진화하는 서울형 SBD 거버넌스' : 'Seoul-Style SBD Governance Evolving into a Software OS'}
                    </span>
                </div>

                {/* 제목 - 단호하고 임팩트 있는 핵심 메시지 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '민관 협력의 \'서울역-남산 매니지먼트 얼라이언스\' 구축과 운영체제 가동' : 'Establishing Public-Private Seoul Station-Namsan Management Alliance'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 2대 칼럼 및 거버넌스 SVG 다이어그램 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    
                    {/* 좌측: 글로벌 벤치마크 (소프트웨어 관리의 중요성) */}
                    <div className="border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                Space Software Benchmarks
                            </span>
                            <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-4">
                                {lang === 'kr' ? '물리적 개발을 넘어선 소프트웨어 관리' : 'Software-Led Area Management'}
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 border-l-4 border-slate-400">
                                    <div className="font-bold text-[15.5px] text-[#0f172a]">
                                        {lang === 'kr' ? '뉴욕 허드슨야드 ➔ HYHK BID' : 'NYC Hudson Yards ➔ HYHK BID'}
                                    </div>
                                    <p className="text-[13px] text-slate-600 mt-1 leading-relaxed">
                                        {lang === 'kr' 
                                            ? '세계 최대 복합 개발의 완성이자 성공 비결은 단순히 건물을 올린 기술이 아니라, 준공 후 가로 활성화와 안전·미화를 밀착 전담한 HYHK BID의 정교한 관리 역량이었습니다.' 
                                            : 'The core driver behind Hudson Yards was the HYHK BID’s operational system managing local safety and streetscape.'}
                                    </p>
                                </div>

                                <div className="p-4 bg-slate-50 border-l-4 border-slate-400">
                                    <div className="font-bold text-[15.5px] text-[#0f172a]">
                                        {lang === 'kr' ? '도쿄 롯폰기 힐즈 ➔ 모리 타운 매니지먼트' : 'Tokyo Roppongi Hills ➔ Mori Town Management'}
                                    </div>
                                    <p className="text-[13px] text-slate-600 mt-1 leading-relaxed">
                                        {lang === 'kr' 
                                            ? '롯폰기 힐즈를 단순 빌딩에서 도쿄의 문화적 심장으로 리브랜딩한 것은 Mori의 타운 매니지먼트가 가동한 문화·마케팅 소프트웨어의 힘이었습니다.' 
                                            : 'Mori Building’s software operating system transformed Roppongi Hills from a mere office complex into a cultural landmark.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 가칭 서울역-남산 얼라이언스 거버넌스 (SVG 다이어그램) */}
                    <div className="border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#2563eb] text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                Alliance Governance Structure
                            </span>
                            <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-4">
                                {lang === 'kr' ? '민관 협력 통합 거버넌스 체제' : 'Public-Private Integrated Governance'}
                            </h3>

                            {/* 얼라이언스 거버넌스 관계도 SVG */}
                            <div className="w-full h-[220px] bg-slate-50 border border-slate-200 relative flex items-center justify-center">
                                <svg className="w-full h-full" viewBox="0 0 450 220">
                                    {/* 중앙: 얼라이언스 코어 */}
                                    <rect x="150" y="85" width="150" height="50" fill="#0f172a" stroke="#0f172a" strokeWidth="1.5" />
                                    <text x="225" y="108" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="black">서울역-남산 매니지먼트</text>
                                    <text x="225" y="122" textAnchor="middle" fill="#93c5fd" fontSize="8.5" fontWeight="bold">얼라이언스 (가칭)</text>

                                    {/* 상단: 공공 */}
                                    <rect x="165" y="10" width="120" height="35" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
                                    <text x="225" y="27" textAnchor="middle" fill="#1e3a8a" fontSize="9" fontWeight="bold">서울시 (공공)</text>
                                    
                                    {/* 하단 좌측: 이오타 서울 */}
                                    <rect x="30" y="170" width="100" height="40" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
                                    <text x="80" y="187" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="bold">이오타 서울</text>
                                    <text x="80" y="198" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="bold">(이지스·현대건설)</text>

                                    {/* 하단 중앙: 북부역세권 */}
                                    <rect x="175" y="170" width="100" height="40" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
                                    <text x="225" y="187" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="bold">북부역세권</text>
                                    <text x="225" y="198" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="bold">(한화그룹)</text>

                                    {/* 하단 우측: 인근 소유주 */}
                                    <rect x="320" y="170" width="100" height="40" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
                                    <text x="370" y="187" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="bold">봉래·서소문 구역</text>
                                    <text x="370" y="198" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="bold">(빌딩 소유주·펀드)</text>

                                    {/* 연결 화살표들 */}
                                    {/* 공공 ➔ 코어 */}
                                    <path d="M 225,45 L 225,85" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3,3" />
                                    <polygon points="225,85 221,79 229,79" fill="#2563eb" />
                                    <text x="233" y="65" fill="#2563eb" fontSize="7.5" fontWeight="bold">관리 및 점용 권한 위임</text>

                                    {/* 민간 ➔ 코어 */}
                                    <path d="M 80,170 L 80,145 L 150,110" fill="none" stroke="#64748b" strokeWidth="1" />
                                    <path d="M 225,170 L 225,135" fill="none" stroke="#64748b" strokeWidth="1" />
                                    <path d="M 370,170 L 370,145 L 300,110" fill="none" stroke="#64748b" strokeWidth="1" />
                                    
                                    <text x="225" y="153" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="bold">재원 공동 출연 및 자산 연계</text>
                                </svg>
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
                                    ? '물리적인 토목 건설을 넘어 가로와 광장의 자생적 운영체제를 확보하기 위해, 민간 대형 소유주 연합과 공공이 협력하는 거버넌스 가칭 \'서울역-남산 매니지먼트 얼라이언스\' 공식 출범 제안'
                                    : 'Proposing the "Seoul Station-Namsan Management Alliance" governance model to ensure self-sustaining space activation beyond construction.'}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                {lang === 'kr'
                                    ? '서울역 북부역세권(한화그룹), 서소문·봉래 구역 등 인근의 핵심 오피스 소유주들의 펀드를 하나로 엮는 민관 협동 거버넌스를 통해 체계적인 에어리어 매니지먼트 실행'
                                    : 'Structuring a PPP governance connecting Seoul Station North (Hanwha), Bongrae, and Seosomun property owners to drive area management.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
