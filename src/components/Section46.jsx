import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section46({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#f8fafc] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '서울 적용을 위한 제도적 커스터마이징 방향' : 'Institutional Customization for Seoul'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '서울형 BID 안착을 위한 5대 제도적 커스터마이징 전략' : 'Five Strategies for Localizing Seoul-Style BID'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 5각 메커니즘 기어 SVG 인포그래픽 적용 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] flex flex-col lg:flex-row gap-6 items-stretch">
                    
                    {/* 좌측: 5각 기어 메커니즘 다이어그램 (SVG) */}
                    <div className="w-full lg:w-[50%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                Customization Mechanism Gear
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#0f172a] mb-4 leading-snug">
                                {lang === 'kr' ? '5대 커스터마이징 유기적 연결 구조도' : 'Integrated 5-Axis Gear Matrix'}
                            </h3>
                            
                            {/* 5각 기어 SVG */}
                            <div className="w-full h-[280px] bg-slate-50 border border-gray-200 relative flex items-center justify-center">
                                <svg className="w-full h-full" viewBox="0 0 350 280">
                                    {/* 중심 코어 */}
                                    <circle cx="175" cy="140" r="35" fill="#0f172a" stroke="#1e3a8a" strokeWidth="2.5" />
                                    <text x="175" y="137" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="black">K-BID</text>
                                    <text x="175" y="150" textAnchor="middle" fill="#93c5fd" fontSize="7" fontWeight="bold">서울형 모델</text>
                                    
                                    {/* 5개 축 연결 노드 */}
                                    {/* 1. 법적 근거 (Top) */}
                                    <line x1="175" y1="140" x2="175" y2="45" stroke="#0f172a" strokeWidth="1.5" />
                                    <circle cx="175" cy="45" r="18" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                                    <text x="175" y="48" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="black">①법제</text>
                                    
                                    {/* 2. 기부채납 (Top Right) */}
                                    <line x1="175" y1="140" x2="265" y2="90" stroke="#0f172a" strokeWidth="1.5" />
                                    <circle cx="265" cy="90" r="18" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                                    <text x="265" y="93" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="black">②위탁</text>

                                    {/* 3. 소유 분절 (Bottom Right) */}
                                    <line x1="175" y1="140" x2="230" y2="215" stroke="#0f172a" strokeWidth="1.5" />
                                    <circle cx="230" cy="215" r="18" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
                                    <text x="230" y="218" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="black">③앵커</text>

                                    {/* 4. 시 거버넌스 (Bottom Left) */}
                                    <line x1="175" y1="140" x2="120" y2="215" stroke="#0f172a" strokeWidth="1.5" />
                                    <circle cx="120" cy="215" r="18" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                                    <text x="120" y="218" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="black">④SH</text>

                                    {/* 5. 재원 다각화 (Top Left) */}
                                    <line x1="175" y1="140" x2="85" y2="90" stroke="#0f172a" strokeWidth="1.5" />
                                    <circle cx="85" cy="90" r="18" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                                    <text x="85" y="93" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="black">⑤재원</text>
                                    
                                    {/* 기어 회전 가이드 라인 */}
                                    <circle cx="175" cy="140" r="100" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 5대 전략 세부 매트릭스 도표 */}
                    <div className="w-full lg:w-[50%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                Strategy Matrix Table
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#0f172a] mb-4 leading-snug">
                                {lang === 'kr' ? '5대 맞춤 전략 실행 세부사항' : 'Implementation Specifications'}
                            </h3>
                            
                            <div className="space-y-3 text-[13px] font-bold text-gray-700">
                                <div className="border-b border-gray-200 pb-2">
                                    <span className="text-[#1e3a8a] block">① 법적 근거 신설 (일본 선례 벤치마킹)</span>
                                    <span className="text-[12px] text-gray-500 font-medium block mt-0.5">에리어매니지먼트법 제정, 소유주+임차인 이중 구조 및 동의 요건 완화</span>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <span className="text-[#1e3a8a] block">② 공공기여의 BID 연동 위탁 구조화</span>
                                    <span className="text-[12px] text-gray-500 font-medium block mt-0.5">기부채납 공원 관리권을 BID에 위탁, 시 예산 매칭 서비스 계약 모델 도입</span>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <span className="text-red-500 block">③ 소유 분절 해결을 위한 앵커 디벨로퍼 주도</span>
                                    <span className="text-[12px] text-gray-500 font-medium block mt-0.5">재개발 조합/정비시행자를 주체로 편입하고 대형 앵커 투자자를 발의 핵심으로 지정</span>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <span className="text-[#1e3a8a] block">④ 서울시 거버넌스 및 SH 연계 감독</span>
                                    <span className="text-[12px] text-gray-500 font-medium block mt-0.5">SH(서울주택도시공사)에 BID 공적 감독 위임 및 활성화 계획 상호 연동</span>
                                </div>
                                <div>
                                    <span className="text-[#1e3a8a] block">⑤ 다각적 자생 재원 레이어링</span>
                                    <span className="text-[12px] text-gray-500 font-medium block mt-0.5">기본 부담금(감정평가 연면적 연계) + 보행로 운영 보조금 + 특화거리 기금</span>
                                </div>
                            </div>
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
                                    ? '조례를 통한 우회 설계부터 국비 매칭, 기부채납 공간 위탁, 분절 소유주 동의 요건 조정 등 서울의 독특한 환경에 최적화된 5대 맞춤 전략'
                                    : 'A 5-part customization strategy including bylaws bypass, SH governance linkage, developer-led initiation, and multi-layered financing.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
