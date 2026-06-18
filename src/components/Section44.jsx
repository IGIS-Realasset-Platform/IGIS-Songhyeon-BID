import React, { useState } from 'react';

export default function Section44({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#0f172a] mb-[12px]">
                        자산 가치 프리미엄 구조
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    자연발생적 집적을 넘어 자산 가치에 운영 성과를 내장시키는 한국 최초의 시도
                </h2>

                {/* 다채로운 인포그래픽 영역 (2차원 비교 분석 테이블 + 네트워크 연계 시각화) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 비교 분석 매트릭스 테이블 */}
                    <div className="w-full lg:w-[55%] bg-white border-2 border-[#0f172a] rounded-none p-6 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Paradigm Comparison
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-6 leading-tight">
                                전통적 '입지' vs 미래형 '운영' 가치
                            </h3>
                            
                            {/* 비교 테이블 */}
                            <div className="w-full overflow-hidden border border-gray-300">
                                <table className="w-full border-collapse text-left">
                                    <thead>
                                        <tr className="bg-[#0f172a] text-white text-[14px]">
                                            <th className="p-3 font-bold border-b border-gray-300 w-[25%]">구분</th>
                                            <th className="p-3 font-bold border-b border-gray-300 w-[37.5%]">전통적 GBD/YBD (입지 중심)</th>
                                            <th className="p-3 font-bold border-b border-gray-300 w-[37.5%] text-yellow-400">SBD 미래 비전 (운영 중심)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[13px] text-gray-700 font-medium">
                                        <tr className="border-b border-gray-200">
                                            <td className="p-3 bg-gray-50 font-bold text-gray-900">가치 결정 요인</td>
                                            <td className="p-3">물리적 위치, 지하철역 인접도</td>
                                            <td className="p-3 bg-blue-50/30 text-blue-900 font-bold">통합 관리 품질, 가로 활성화 수준</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="p-3 bg-gray-50 font-bold text-gray-900">관리 대상 영역</td>
                                            <td className="p-3">개별 빌딩 내부 (경계선 안쪽)</td>
                                            <td className="p-3 bg-blue-50/30 text-blue-900 font-bold">가로, 보행광장, 주변 연계 공원</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="p-3 bg-gray-50 font-bold text-gray-900">콘텐츠 공급</td>
                                            <td className="p-3">임차 상인 개별 유치 (수동적)</td>
                                            <td className="p-3 bg-blue-50/30 text-blue-900 font-bold">문화 이벤트 및 조경 상시 기획</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 bg-gray-50 font-bold text-gray-900">임대 프리미엄</td>
                                            <td className="p-3">시장 평균 추종</td>
                                            <td className="p-3 bg-blue-50/30 text-blue-900 font-bold">에리어 매니지먼트 할증 수혜 (10~20%)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 분절형 자산 vs 네트워크형 자산의 가치 비교 (SVG) */}
                    <div className="w-full lg:w-[42%] bg-white border-2 border-[#0f172a] rounded-none p-6 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Asset Structure Graph
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-4 leading-tight">
                                에리어 매니지먼트 네트워크 효과
                            </h3>
                            <p className="text-gray-500 text-[12px] font-bold mb-6">
                                빌딩 경계를 지우고 전체 구역을 하나로 묶어 공간 가치를 극대화하는 원리
                            </p>

                            <div className="w-full h-[180px] bg-slate-50 border border-gray-300 relative flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180">
                                    {/* 좌측: 분절형 (As-Is) */}
                                    <rect x="20" y="30" width="30" height="30" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                                    <rect x="70" y="30" width="30" height="30" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                                    <rect x="45" y="80" width="30" height="30" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                                    <text x="60" y="140" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">As-Is: 분절형 자산</text>
                                    
                                    {/* 구분선 */}
                                    <line x1="140" y1="20" x2="140" y2="150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />
                                    
                                    {/* 우측: 네트워크 통합형 (To-Be) */}
                                    <rect x="180" y="30" width="30" height="30" fill="#eff6ff" stroke="#357ae8" strokeWidth="2" />
                                    <rect x="250" y="30" width="30" height="30" fill="#eff6ff" stroke="#357ae8" strokeWidth="2" />
                                    <rect x="215" y="80" width="30" height="30" fill="#eff6ff" stroke="#357ae8" strokeWidth="2" />
                                    
                                    {/* 네트워크선 */}
                                    <path d="M 195,60 L 230,95 L 265,60" fill="none" stroke="#2563eb" strokeWidth="2" />
                                    <line x1="195" y1="45" x2="250" y2="45" stroke="#2563eb" strokeWidth="2" />
                                    
                                    {/* 중앙 활성화 오퍼레이션 코어 */}
                                    <circle cx="230" cy="50" r="12" fill="#ef4444" />
                                    <text x="230" y="53" textAnchor="middle" fill="white" fontSize="8" fontWeight="black">OS</text>
                                    
                                    <text x="230" y="140" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">To-Be: SBD 운영 연계</text>
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>SBD(Station/Seoul Business District)는 빌딩 내부 스펙에 그치지 않고, 가로와 커뮤니티라는 전체 공간 인프라의 '운영 매니지먼트' 품질을 자산 가치에 직접 내장시키는 한국 부동산 금융의 전환점입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
