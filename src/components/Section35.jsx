import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section35({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '플레이스메이킹과 보행 가로 네트워크' : 'Placemaking & Pedestrian Network'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-8">
                    {lang === 'kr'
                        ? '차량 중심 도로의 보행 공간화 및 광역 녹지 보행 네트워크 구축'
                        : 'Repurposing Streets for Pedestrians & Constructing Green Networks'}
                </h2>

                {/* 2열 인포그래픽 구성 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch text-left">
                    
                    {/* 좌측 열: 37번가 보행자 친화 가로 개선 설계 */}
                    <div className="border-4 border-[#0f172a] bg-white p-5 flex flex-col justify-between shadow-sm rounded-none">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[12px] font-black px-3 py-1 uppercase mb-3">
                                37th St Streetscape (MNLA)
                            </span>
                            <h3 className="text-[20px] font-black text-gray-900 mb-4">
                                {lang === 'kr' ? '37번가 미드블록 공간 재설계 단면' : '37th St Mid-block Redesign Section'}
                            </h3>

                            {/* SVG 설계 단면도 */}
                            <div className="w-full h-[150px] bg-gray-50 border border-gray-200 relative overflow-hidden mb-4">
                                <svg className="w-full h-full" viewBox="0 0 500 150">
                                    {/* 아스팔트 차도 */}
                                    <rect x="120" y="90" width="260" height="60" fill="#cbd5e1" stroke="#94a3b8" />
                                    <line x1="250" y1="90" x2="250" y2="150" stroke="#ffffff" strokeWidth="2" strokeDasharray="5,5" />
                                    
                                    {/* 좌측 확장 보도 */}
                                    <rect x="0" y="70" width="120" height="80" fill="#f1f5f9" stroke="#94a3b8" />
                                    <text x="60" y="115" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="black">🚶‍♂️ 확장 보도 (15ft)</text>
                                    
                                    {/* 우측 확장 보도 + 조경 */}
                                    <rect x="380" y="70" width="120" height="80" fill="#f1f5f9" stroke="#94a3b8" />
                                    <rect x="390" y="60" width="70" height="15" fill="#10b981" />
                                    <text x="425" y="71" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">🌳 가로수 화단</text>
                                    
                                    {/* 넥다운 포인터 */}
                                    <path d="M 120,70 L 120,90 M 380,70 L 380,90" stroke="#ef4444" strokeWidth="2.5" />
                                    
                                    <g stroke="#ef4444" strokeWidth="1">
                                        <line x1="120" y1="80" x2="90" y2="40" />
                                        <line x1="380" y1="80" x2="410" y2="40" />
                                    </g>
                                    
                                    <circle cx="120" cy="80" r="4" fill="#ef4444" />
                                    <circle cx="380" cy="80" r="4" fill="#ef4444" />
                                    
                                    <rect x="40" y="20" width="100" height="20" fill="#ef4444" />
                                    <text x="90" y="33" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">넥다운(차도폭 축소)</text>

                                    <rect x="360" y="20" width="100" height="20" fill="#ef4444" />
                                    <text x="410" y="33" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">보행 광장 확장</text>
                                </svg>
                            </div>

                            <ul className="space-y-2 text-[13px] text-gray-700 font-bold leading-normal">
                                <li>• **넥다운(Neckdowns) 설계**: 코너별 도로 연석 확장으로 주정차를 물리적으로 억제</li>
                                <li>• **보행 환경 극대화**: 미드블록 차도를 축소하여 보도를 15피트 넓이로 대폭 확장</li>
                            </ul>
                        </div>
                    </div>

                    {/* 우측 열: 하이라인 연계 및 허드슨그린 2단계 공원 계획 */}
                    <div className="border-4 border-[#0f172a] bg-[#0f172a] p-5 text-white flex flex-col justify-between shadow-md rounded-none">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[12px] font-black px-3 py-1 uppercase mb-3">
                                Green Network (High Line & Hudson Green)
                            </span>
                            <h3 className="text-[20px] font-black text-[#93c5fd] mb-4">
                                {lang === 'kr' ? '광역 보행 네트워크 및 2단계 녹지 계획' : 'Regional Pedestrian & Phase 2 Park Plans'}
                            </h3>

                            <div className="space-y-4">
                                {/* 하이라인 연계 */}
                                <div className="bg-white/5 border border-white/10 p-3 rounded-none">
                                    <span className="block font-black text-[15.5px] text-emerald-400">🔗 하이라인(High Line) 보행망 연결</span>
                                    <span className="text-[13px] text-gray-300 block mt-1 leading-relaxed">
                                        • 공공 광장이 하이라인 자연공원의 종착점 역할을 수행해 입체 보행로 완성<br />
                                        • **MNLA 설계 스트리트스케이프 마스터플랜**(113에이커)을 BID 예산으로 실행
                                    </span>
                                </div>
                                
                                {/* 허드슨그린 2단계 */}
                                <div className="bg-white/5 border border-white/10 p-3 rounded-none">
                                    <span className="block font-black text-[15.5px] text-emerald-400">🌳 허드슨그린 (Hudson Green) 2단계 계획</span>
                                    <span className="text-[13px] text-gray-300 block mt-1 leading-relaxed">
                                        • Related+Oxford+Wynn이 추진하는 **130억 달러 규모 2단계 복합 개발**의 핵심<br />
                                        • **5.6에이커 규모**의 공공 녹지 공원 (SOM 마스터플랜, Hollander & Sasaki 설계)<br />
                                        • 주거 1,500세대, K-8 공립학교 결합 (2025년 NYC 도시계획위 승인), MTA에 **27억 달러** 세수 기여 예정
                                    </span>
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
                            <span>{lang === 'kr'
                                ? '차량을 제어하여 보도를 넓히는 37번가 실무 설계와 하이라인 보행 연계, 그리고 5.6에이커의 2단계 허드슨그린 공원 계획을 통해 맨해튼 서부의 입체적 장소성을 완성한 사례'
                                : 'Completed Manhattan West placemaking via 37th St pedestrianization, High Line connection, and the 5.6-acre Hudson Green Phase 2 park plan.'
                            }</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
