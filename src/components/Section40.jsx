import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section40({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#f8fafc] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '국내 도시재생 사업의 한계와 조세 저항' : 'Limits of Urban Regeneration & Tax Resistance'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '서울 도심 BID 도입의 한계와 5대 제도적 암초' : 'Five Institutional Barriers of Seoul BID Implementation'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 금지, 커스텀 인포그래픽 설계 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] flex flex-col lg:flex-row gap-6 items-stretch">
                    
                    {/* 좌측: 공간적 부조화 (트로피 오피스 vs 낙후 가로) 현상 경고 */}
                    <div className="w-full lg:w-[35%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#ef4444] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                Space Discordance
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#0f172a] mb-4 leading-snug">
                                {lang === 'kr' ? '도심의 물리적 단절 현상' : 'Physical Disconnect in CBD'}
                            </h3>
                            <p className="text-[14px] text-gray-600 font-medium leading-relaxed mb-6">
                                {lang === 'kr'
                                    ? '수천억 원이 투입된 초고급 프라임 오피스(트로피 에셋) 빌딩 내부와 달리, 회전문을 나서는 순간 낙후되고 단절된 보행 가로망이 방치되는 공간적 모순이 발생하고 있습니다.'
                                    : 'While prime trophy assets receive massive investments, the surrounding pedestrian spaces remain severely degraded as soon as one exits the building lobby.'}
                            </p>
                        </div>
                        
                        {/* 시각화 데코: 빌딩과 가로의 단절 */}
                        <div className="w-full h-[120px] bg-slate-50 border border-gray-200 relative overflow-hidden flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 300 100">
                                {/* 트로피 빌딩 */}
                                <rect x="30" y="10" width="70" height="80" fill="#0f172a" />
                                <rect x="40" y="20" width="10" height="15" fill="#3b82f6" />
                                <rect x="60" y="20" width="10" height="15" fill="#3b82f6" />
                                <rect x="80" y="20" width="10" height="15" fill="#3b82f6" />
                                <rect x="40" y="45" width="10" height="15" fill="#3b82f6" />
                                <rect x="60" y="45" width="10" height="15" fill="#3b82f6" />
                                <rect x="80" y="45" width="10" height="15" fill="#3b82f6" />
                                <text x="65" y="80" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">Trophy Asset</text>
                                
                                {/* 단절 장벽 */}
                                <line x1="120" y1="10" x2="120" y2="90" stroke="#ef4444" strokeWidth="3" strokeDasharray="4,2" />
                                <text x="120" y="55" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold" transform="rotate(-90 120 55)" dy="-5">DISCONNECT</text>
                                
                                {/* 낙후 가로 */}
                                <rect x="140" y="50" width="130" height="40" fill="#e2e8f0" />
                                <circle cx="160" cy="70" r="4" fill="#94a3b8" />
                                <circle cx="200" cy="65" r="4" fill="#94a3b8" />
                                <line x1="140" y1="50" x2="270" y2="50" stroke="#475569" strokeWidth="2" />
                                <text x="205" y="80" textAnchor="middle" fill="#475569" fontSize="9" fontWeight="bold">낙후된 가로망</text>
                            </svg>
                        </div>
                    </div>

                    {/* 우측: 5대 제도적 암초 (남색 테두리, 완전 직사각형 장벽 다이어그램) */}
                    <div className="w-full lg:w-[65%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                The Five Barriers
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#0f172a] mb-6 leading-snug">
                                {lang === 'kr' ? '도입 실패의 5대 구조적 근원' : 'Structural Causes of Repeated Failure'}
                            </h3>
                            
                            {/* 5대 장벽 그리드 */}
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-stretch">
                                
                                {/* 1. 법적 근거 */}
                                <div className="border border-[#0f172a] bg-slate-50 p-3.5 flex flex-col justify-between">
                                    <div>
                                        <div className="text-[12px] font-black text-red-500 mb-1">BARRIER 01</div>
                                        <h4 className="text-[15px] font-black text-[#0f172a] mb-2 leading-tight">법적 근거 부재</h4>
                                        <p className="text-[12px] text-gray-500 font-bold leading-relaxed">
                                            강제 부담금 징수 법령 부재로 무임승차자가 양산되어 자발적 협의체는 재원 부족으로 소멸.
                                        </p>
                                    </div>
                                </div>

                                {/* 2. 소유 분절 */}
                                <div className="border border-[#0f172a] bg-slate-50 p-3.5 flex flex-col justify-between">
                                    <div>
                                        <div className="text-[12px] font-black text-red-500 mb-1">BARRIER 02</div>
                                        <h4 className="text-[15px] font-black text-[#0f172a] mb-2 leading-tight">소유 분절 구조</h4>
                                        <p className="text-[12px] text-gray-500 font-bold leading-relaxed">
                                            서울 도심은 수백 명의 개별 소유자로 분절되어 복잡한 이해관계 조정 및 협의체 구성이 극히 곤란.
                                        </p>
                                    </div>
                                </div>

                                {/* 3. 공공 의존 */}
                                <div className="border border-[#0f172a] bg-slate-50 p-3.5 flex flex-col justify-between">
                                    <div>
                                        <div className="text-[12px] font-black text-red-500 mb-1">BARRIER 03</div>
                                        <h4 className="text-[15px] font-black text-[#0f172a] mb-2 leading-tight">공공 의존 관성</h4>
                                        <p className="text-[12px] text-gray-500 font-bold leading-relaxed">
                                            "도시 정비와 서비스는 공공이 전담해야 한다"는 관성이 지배하여 민간 주도의 환경 개선 구조에 대한 거부감 존재.
                                        </p>
                                    </div>
                                </div>

                                {/* 4. 트리거 자산 */}
                                <div className="border border-[#0f172a] bg-slate-50 p-3.5 flex flex-col justify-between">
                                    <div>
                                        <div className="text-[12px] font-black text-red-500 mb-1">BARRIER 04</div>
                                        <h4 className="text-[15px] font-black text-[#0f172a] mb-2 leading-tight">트리거 자산 부재</h4>
                                        <p className="text-[12px] text-gray-500 font-bold leading-relaxed">
                                            BID의 기폭제 역할을 할 초대형 앵커 개발자 부재. 지금까지 서울역 권역에는 대규모 민간 플레이어가 없었음.
                                        </p>
                                    </div>
                                </div>

                                {/* 5. 준조세 저항 */}
                                <div className="border border-[#0f172a] bg-slate-50 p-3.5 flex flex-col justify-between">
                                    <div>
                                        <div className="text-[12px] font-black text-red-500 mb-1">BARRIER 05</div>
                                        <h4 className="text-[15px] font-black text-red-500 mb-2 leading-tight">준조세 저항</h4>
                                        <p className="text-[12px] text-gray-500 font-bold leading-relaxed">
                                            조세 법률주의 하에 추가 부담금을 '준조세'로 인식하는 저항 심리와 상권 활성화 매출 직결에 대한 상호 신뢰 부족.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* 시사점 */}
                        <div className="mt-4 border-t border-gray-200 pt-4 flex items-center justify-between">
                            <span className="text-[13px] font-black text-[#1e3a8a] bg-blue-50 px-2 py-1 uppercase">
                                Root Solution Needed
                            </span>
                            <span className="text-[13px] font-bold text-gray-600">
                                * 단순한 재정 지원을 넘어 제도적 암초를 해결하는 새로운 민간 플레이어 주도의 돌파구 필요
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
                                    ? '미국식 법적 징수 권한의 결여와 극도로 분절된 소유주 구조 및 준조세 저항이 한국형 BID 도입을 저지해 온 핵심 암초'
                                    : 'The absence of legal assessment authority, fragmented ownership, and tax resistance are the key barriers that have blocked K-BID.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
