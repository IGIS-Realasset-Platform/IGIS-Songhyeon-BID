import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section35({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '37번가 보행자 친화 가로 개선 설계' : '37th St Streetscape'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    차량 중심의 미드블록을 넥다운(Neckdowns)과 조경을 통해 사람 중심으로 변경
                </h2>

                {/* 앵커 포커스 설계 단면도 (6. 앵커 포커스/포인터형) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[25px] flex flex-col lg:flex-row gap-8 justify-between items-stretch">
                    
                    {/* 좌측: 개선 전/후 단면 대비 SVG 다이어그램 */}
                    <div className="w-full lg:w-[60%] border-4 border-[#0f172a] bg-white p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                MNLA Landscape Design
                            </span>
                            <h3 className="text-[20px] font-black text-gray-900 mb-6">
                                맨해튼 37번가 미드블록 공간 재설계 단면도
                            </h3>

                            {/* SVG 설계 단면도 */}
                            <div className="w-full h-[180px] bg-gray-50 border border-gray-200 relative overflow-hidden">
                                <svg className="w-full h-full" viewBox="0 0 500 150">
                                    {/* 아스팔트 차도 */}
                                    <rect x="120" y="90" width="260" height="60" fill="#cbd5e1" stroke="#94a3b8" />
                                    <line x1="250" y1="90" x2="250" y2="150" stroke="#ffffff" strokeWidth="2" strokeDasharray="5,5" />
                                    
                                    {/* 좌측 확장 보도 (After) */}
                                    <rect x="0" y="70" width="120" height="80" fill="#f1f5f9" stroke="#94a3b8" />
                                    <text x="60" y="115" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">🚶‍♂️ 확장 보도</text>
                                    <text x="60" y="130" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">(15ft로 대폭 확장)</text>
                                    
                                    {/* 우측 확장 보도 + 조경 (After) */}
                                    <rect x="380" y="70" width="120" height="80" fill="#f1f5f9" stroke="#94a3b8" />
                                    <rect x="390" y="60" width="70" height="15" fill="#10b981" />
                                    <text x="425" y="71" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">🌳 가로수 화단</text>
                                    <text x="440" y="115" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">🚶‍♀️ 보행로 & 벤치</text>
                                    
                                    {/* 넥다운 포인터 */}
                                    <path d="M 120,70 L 120,90 M 380,70 L 380,90" stroke="#ef4444" strokeWidth="2.5" />
                                    
                                    {/* 포인터 지시선 */}
                                    <g stroke="#ef4444" strokeWidth="1">
                                        <line x1="120" y1="80" x2="90" y2="40" />
                                        <line x1="380" y1="80" x2="410" y2="40" />
                                    </g>
                                    
                                    <circle cx="120" cy="80" r="4" fill="#ef4444" />
                                    <circle cx="380" cy="80" r="4" fill="#ef4444" />
                                    
                                    <rect x="50" y="20" width="80" height="20" fill="#ef4444" />
                                    <text x="90" y="33" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">넥다운(차도폭 축소)</text>

                                    <rect x="370" y="20" width="80" height="20" fill="#ef4444" />
                                    <text x="410" y="33" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">보행 광장 확장</text>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 디테일 설명 카드 */}
                    <div className="w-full lg:w-[36%] border-4 border-[#0f172a] bg-[#0f172a] p-6 text-left text-white flex flex-col justify-between shadow-md">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Key Achievements
                            </span>
                            <h3 className="text-[24px] font-black mb-6">
                                설계의 주요 사양
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/10 p-3">
                                    <span className="block font-black text-[16px] text-[#93c5fd]">🚦 차량 주정차 예방</span>
                                    <span className="text-[13px] text-gray-300">물리적으로 보도 폭을 코너마다 넓혀 차량의 불법 회차 및 주정차 원천 억제</span>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-3">
                                    <span className="block font-black text-[16px] text-[#93c5fd]">🌳 입체적 바이오가로 조경</span>
                                    <span className="text-[13px] text-gray-300">다년생 조경수 식재를 통해 콘크리트 미드블록의 열섬 완화 및 숲길 경험 선사</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>차량 도로 폭을 줄이고 보도를 넓히는 넥다운 설계를 적용하여 걷기 좋은 환경을 마련하고 빌딩 접근성을 제고한 사례</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
