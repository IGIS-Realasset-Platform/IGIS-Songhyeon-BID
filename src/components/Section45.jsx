import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section45({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#f8fafc] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '무교·다동 타운 매니지먼트 실험의 시사점' : 'Lessons from Mugyo Da-dong Case Study'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '자발적 연합의 한계: 무교·다동 실험이 남긴 무임승차(Free-rider) 교훈' : 'Limits of Voluntary Alliance: The Free-rider Lesson of Mugyo Da-dong'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 입체적 인포그래픽 설계 (구역 구성 분포도 + 재원 쇠퇴 파이프라인) */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] flex flex-col lg:flex-row gap-6 items-stretch">
                    
                    {/* 좌측: 무교·다동 구역의 소유 분절 구조 및 한계 분석 (SVG) */}
                    <div className="w-full lg:w-[48%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                District Structure & Soft Governance
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#0f172a] mb-4 leading-snug">
                                {lang === 'kr' ? '무교·다동 구역 소유구조 격자망' : 'Soft Governance Configuration'}
                            </h3>
                            
                            {/* 무교다동 빌딩-상인 구역 구성 격자형 맵 */}
                            <div className="w-full h-[220px] bg-slate-50 border border-gray-200 relative mb-4">
                                <svg className="w-full h-full" viewBox="0 0 350 220">
                                    {/* 17개 빌딩 상징 (남색 큰 상자들) */}
                                    <rect x="20" y="30" width="40" height="60" fill="#0f172a" stroke="#0f172a" strokeWidth="1" />
                                    <rect x="75" y="20" width="45" height="70" fill="#0f172a" stroke="#0f172a" strokeWidth="1" />
                                    <rect x="135" y="40" width="35" height="50" fill="#0f172a" stroke="#0f172a" strokeWidth="1" />
                                    
                                    <rect x="20" y="110" width="50" height="50" fill="#0f172a" stroke="#0f172a" strokeWidth="1" />
                                    <rect x="85" y="110" width="40" height="65" fill="#0f172a" stroke="#0f172a" strokeWidth="1" />
                                    
                                    {/* 200여개 영세 상점 상징 (작은 회색 점/상자들) */}
                                    <circle cx="210" cy="40" r="4" fill="#94a3b8" />
                                    <circle cx="225" cy="35" r="4" fill="#94a3b8" />
                                    <circle cx="240" cy="45" r="4" fill="#94a3b8" />
                                    <circle cx="215" cy="60" r="4" fill="#ef4444" /> {/* 자발적 참여 주체 */}
                                    <circle cx="235" cy="65" r="4" fill="#94a3b8" />
                                    <circle cx="220" cy="80" r="4" fill="#94a3b8" />
                                    
                                    <circle cx="270" cy="110" r="4" fill="#94a3b8" />
                                    <circle cx="285" cy="105" r="4" fill="#94a3b8" />
                                    <circle cx="300" cy="115" r="4" fill="#ef4444" /> {/* 자발적 참여 주체 */}
                                    <circle cx="275" cy="130" r="4" fill="#94a3b8" />
                                    <circle cx="295" cy="135" r="4" fill="#94a3b8" />
                                    
                                    {/* 텍스트 설명 데코 */}
                                    <text x="65" y="195" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">17개 프라임 오피스</text>
                                    <text x="260" y="165" textAnchor="middle" fill="#475569" fontSize="9" fontWeight="bold">200여개 소상공인</text>
                                    
                                    <line x1="160" y1="140" x2="200" y2="140" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                                    <text x="180" y="130" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">자발적 협의체</text>
                                    
                                    {/* 경고 딱지 */}
                                    <rect x="20" y="20" width="50" height="15" fill="#ef4444" />
                                    <text x="45" y="31" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">무임승차 노출</text>
                                </svg>
                            </div>
                            
                            <p className="text-[13px] text-gray-500 font-bold leading-relaxed">
                                {lang === 'kr' 
                                    ? '대형 빌딩주들과 골목 영세 업소의 복잡한 분절 구조 속에서, 법적 의무 없는 자발적 기부금 유치 모델은 지속적인 재원 마련에 한계를 드러냈습니다.'
                                    : '散산재한 소유주들 간의 자발적 참여에 의존한 Soft 거버넌스는 마케팅 재원 지속성 확보에 실패하여 한계를 보였습니다.'}
                            </p>
                        </div>
                    </div>

                    {/* 우측: 재원 쇠퇴 파이프라인 및 무임승차 순환 매커니즘 (SVG) */}
                    <div className="w-full lg:w-[52%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#ef4444] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                Resource Pipeline & Free-rider Loop
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#ef4444] mb-6 leading-snug">
                                {lang === 'kr' ? '자발적 모델의 재원 쇠퇴 루프' : 'Vicious Cycle of Non-Mandatory Model'}
                            </h3>
                            
                            {/* 악순환 SVG 다이어그램 */}
                            <div className="w-full h-[220px] bg-slate-50 border border-gray-200 relative mb-4 flex items-center justify-center">
                                <svg className="w-full h-full" viewBox="0 0 380 220">
                                    {/* 파이프라인 입구 (재원 유입) */}
                                    <rect x="20" y="50" width="80" height="30" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                                    <text x="60" y="68" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">기부금 유입</text>
                                    
                                    {/* 유출 구멍 (무임승차로 인한 유실) */}
                                    <path d="M 100,65 L 200,65 L 200,130" fill="none" stroke="#ef4444" strokeWidth="3" />
                                    <polygon points="200,135 204,129 196,129" fill="#ef4444" />
                                    <text x="250" y="105" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="black">⚠️ 무임승차(Free-rider)</text>
                                    <text x="250" y="118" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">[분담자 ➔ 기부 중단]</text>
                                    
                                    {/* 파이프라인 출구 (고갈된 재정 게이지) */}
                                    <rect x="160" y="160" width="130" height="30" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
                                    <rect x="162" y="162" width="20" height="26" fill="#ef4444" /> {/* 빈약한 잔고 */}
                                    <text x="225" y="178" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="black">재원 고갈 (Low Cash Flow)</text>
                                    
                                    {/* 피드백 루프 화살표 */}
                                    <path d="M 160,175 C 90,170 50,130 50,85" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
                                    <polygon points="50,80 53,86 47,86" fill="#64748b" />
                                    <text x="65" y="130" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold">지속적 관리 실패</text>
                                </svg>
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
                                    ? '자발성에만 의존했던 무교·다동 실험은 부담금 강제성 결여로 인해 유동 재원을 마련하지 못하고 만성적 한계를 보였습니다.'
                                    : 'The voluntary TM pilot in Mugyo Da-dong failed to prevent the free-rider problem, highlighting the need for mandatory financing.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
