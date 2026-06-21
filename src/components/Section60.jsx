import React from 'react';

export default function Section60({ isActive }) {
    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        학술적 가치 상승 분석과 서울 도심 프라임 오피스의 압도적 ROI 분석
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    상업용 부동산 가치 15% 상승의 학술 증명과 이오타 서울의 재무 효과
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 서클 게이지 및 ROI 도표 커스텀 SVG */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] relative">
                    <div className="w-full h-[360px] bg-slate-50/50 border border-slate-100 relative flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 850 360">
                            <defs>
                                <linearGradient id="valueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#2563eb" />
                                    <stop offset="100%" stopColor="#1e3a8a" />
                                </linearGradient>
                                <linearGradient id="premiumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#ef4444" />
                                    <stop offset="100%" stopColor="#b91c1c" />
                                </linearGradient>
                            </defs>

                            {/* 1. 좌측: 학술 증명 다이얼 게이지 (NYU Furman Center) */}
                            <g transform="translate(40, 20)">
                                {/* 아우터 서클 백그라운드 */}
                                <circle cx="150" cy="150" r="100" fill="none" stroke="#cbd5e1" strokeWidth="15" />
                                {/* 게이지 아크 (+15% 부분 강조) */}
                                <path d="M 150,50 A 100,100 0 0,1 230,210" fill="none" stroke="#2563eb" strokeWidth="15" strokeLinecap="square" />
                                
                                {/* 수치 텍스트 */}
                                <text x="150" y="140" textAnchor="middle" fill="#0f172a" fontSize="38" fontWeight="black">+15%</text>
                                <text x="150" y="175" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">상업용 부동산 가치 상승</text>
                                
                                <text x="150" y="270" textAnchor="middle" fill="#0f172a" fontSize="13.5" fontWeight="black">NYU 퍼먼센터 실증 연구</text>
                                <text x="150" y="290" textAnchor="middle" fill="#475569" fontSize="10.5" fontWeight="bold">"예산 규모가 큰 대형 고밀도 BID"</text>
                                <text x="150" y="305" textAnchor="middle" fill="#475569" fontSize="10.5" fontWeight="bold">지구에서 가치 상승 효과 극대화</text>
                            </g>

                            {/* 구분선 */}
                            <line x1="380" y1="40" x2="380" y2="320" stroke="#cbd5e1" strokeWidth="1" />

                            {/* 2. 우측: 이오타 서울의 ROI 파이프라인 */}
                            <g transform="translate(410, 30)">
                                <text x="0" y="20" fill="#0f172a" fontSize="16" fontWeight="black">이오타 서울의 재무 프리미엄 비교</text>
                                
                                {/* 가치 바 1: BID 연간 운영 분담금 */}
                                <g transform="translate(0, 55)">
                                    <text x="0" y="15" fill="#475569" fontSize="11.5" fontWeight="black">연간 공간 운영비 분담금 (추정)</text>
                                    <rect x="0" y="25" width="80" height="25" fill="#94a3b8" />
                                    <text x="90" y="42" fill="#0f172a" fontSize="13.5" fontWeight="black">약 200억 - 300억 원</text>
                                </g>

                                {/* 가치 바 2: 10% 프리미엄 추가 임대 수익 */}
                                <g transform="translate(0, 135)">
                                    <text x="0" y="15" fill="#1e3a8a" fontSize="11.5" fontWeight="black">10% 임대 프리미엄 추가 수익 기회 (JLL 2025 Q2 기준)</text>
                                    <rect x="0" y="25" width="280" height="25" fill="url(#premiumGrad)" />
                                    <text x="290" y="42" fill="#b91c1c" fontSize="15" fontWeight="black">연간 +1,390억 원</text>
                                    
                                    <text x="0" y="65" fill="#64748b" fontSize="10.5" fontWeight="bold">
                                        * 오피스 임대면적 25만㎡ 기준 프리미엄 적용 시의 수익 잠재력
                                    </text>
                                </g>

                                {/* 공실률 대비 */}
                                <g transform="translate(0, 235)">
                                    <rect x="0" y="0" width="390" height="45" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
                                    <text x="15" y="26" fill="#1e3a8a" fontSize="12" fontWeight="black">
                                        공실률 대조 : 서울 CBD 평균 5.1% vs 도쿄 OMY 에리어매니지먼트 지구 1.4%
                                    </text>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>

                {/* 하단 설명글 - 규격 완벽 준수 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                뉴욕대 퍼먼센터의 학술 연구 결과 대형·고밀도 업무지구에 강력한 BID 운영체제를 얹을수록 주변 자산가치 효과(+15%)가 뚜렷하게 입증됨
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                이오타 서울의 임대 면적에 10% 프리미엄 발생 시 연간 약 1,390억 원의 추가 임대 수익 잠재력을 확보하여, 공간 운영 분담금 대비 압도적인 재무적 ROI를 달성
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
