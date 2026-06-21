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

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 커스텀 인포그래픽 설계 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] flex flex-col lg:flex-row gap-6 items-stretch">
                    
                    {/* 좌측: 무교·다동 타운매니지먼트 사업 개요 */}
                    <div className="w-full lg:w-[48%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                Pilot Project Overview
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#0f172a] mb-6 leading-snug">
                                {lang === 'kr' ? '느슨한 연성(Soft) 거버넌스의 실태' : 'Soft Governance in Practice (2018)'}
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="border border-gray-300 p-4 bg-slate-50">
                                    <span className="block font-black text-[15px] text-gray-900">🏢 분절된 복합 구역</span>
                                    <p className="text-[12.5px] text-gray-600 font-bold leading-relaxed mt-1">
                                        17개의 대형 프라임 오피스 빌딩과 200여 개가 넘는 영세 음식점 및 도소매업종이 한데 뒤엉킨 복잡한 서울 구도심 상권.
                                    </p>
                                </div>
                                <div className="border border-gray-300 p-4 bg-slate-50">
                                    <span className="block font-black text-[15px] text-gray-900">🤝 자발성 중심의 민민 협력</span>
                                    <p className="text-[12.5px] text-gray-600 font-bold leading-relaxed mt-1">
                                        강제 부담금이나 세금 징수를 철저히 배제하고, 민간 빌딩주들과 상인들의 자발적 참여 및 서울시의 느슨한 행정 지원에만 의존.
                                    </p>
                                </div>
                                <div className="border border-gray-300 p-4 bg-slate-50">
                                    <span className="block font-black text-[15px] text-red-500">⚠️ 지속 불가능성 노출</span>
                                    <p className="text-[12.5px] text-gray-600 font-bold leading-relaxed mt-1">
                                        자체적인 강제 재원 징수권과 사업화 구조가 없어 마케팅 및 지속적인 지구 환경 관리를 위한 자금을 마련하는 데 만성적 한계를 보임.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 무임승차(Free-rider) 악순환 루프 SVG 시각화 */}
                    <div className="w-full lg:w-[52%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#ef4444] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                The Free-rider Loop
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#ef4444] mb-6 leading-snug">
                                {lang === 'kr' ? '강제력 없는 자발적 모델의 악순환 루프' : 'Vicious Cycle of Non-Mandatory Model'}
                            </h3>
                            
                            {/* 악순환 SVG 다이어그램 */}
                            <div className="w-full h-[240px] bg-slate-50 border border-gray-200 relative flex items-center justify-center">
                                <svg className="w-full h-full" viewBox="0 0 400 240">
                                    {/* 중앙 원형 가이드 라인 */}
                                    <circle cx="200" cy="115" r="70" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />
                                    
                                    {/* 1. 법적 강제력 부재 (Top) */}
                                    <rect x="130" y="15" width="140" height="36" fill="#0f172a" stroke="#0f172a" strokeWidth="1.5" />
                                    <text x="200" y="37" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">① 법적 강제력 부재</text>
                                    
                                    {/* 2. 무임승차 발생 (Right) */}
                                    <rect x="250" y="97" width="130" height="36" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
                                    <text x="315" y="119" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">② 무임승차(Free-rider)</text>
                                    
                                    {/* 3. 재원 고갈 (Bottom) */}
                                    <rect x="130" y="180" width="140" height="36" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                                    <text x="200" y="202" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">③ 재원 확보 실패</text>
                                    
                                    {/* 4. 지속 불가능 (Left) */}
                                    <rect x="20" y="97" width="130" height="36" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
                                    <text x="85" y="119" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">④ 관리 수준의 저하</text>
                                    
                                    {/* 순환 화살표 데코 */}
                                    {/* Top -> Right */}
                                    <path d="M 270,33 C 310,45 325,75 320,95" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
                                    {/* Right -> Bottom */}
                                    <path d="M 315,135 C 310,165 290,185 270,195" fill="none" stroke="#ef4444" strokeWidth="2" />
                                    {/* Bottom -> Left */}
                                    <path d="M 130,198 C 90,190 75,165 80,135" fill="none" stroke="#ef4444" strokeWidth="2" />
                                    {/* Left -> Top */}
                                    <path d="M 85,97 C 90,65 110,45 130,33" fill="none" stroke="#ef4444" strokeWidth="2" />
                                    
                                    {/* 화살표 마커 헤드 정의 */}
                                    <defs>
                                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                                        </marker>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        
                        <div className="mt-4 bg-red-50/10 p-3 border border-[#ef4444]/20 text-[12px] text-gray-500 font-bold">
                            * 아무리 세련된 가로 활성화 프로그램을 기획하더라도, 이를 지속해서 뒷받침할 "법적 강제 징수 권한"이 없으면 결국 무임승차자가 늘어 재원이 고갈됩니다.
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
