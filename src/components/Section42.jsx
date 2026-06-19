import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section42({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#0f172a] mb-[12px]">{lang === 'kr' ? '7,000㎡ 공개녹지 기부채납 설계' : '7,000㎡ Public Green Space'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    개발 이익을 녹지와 보행 인프라로 연결하는 기부채납 플레이스메이킹
                </h2>

                {/* 다채로운 인포그래픽 영역 (공개녹지 및 남산 보행길 연결 SVG 맵 + 스펙) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[30px] flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                    
                    {/* 좌측: 서울역-남산 보행 연결 가로 맵 (SVG) */}
                    <div className="w-full lg:w-[50%] bg-white border-2 border-[#0f172a] rounded-none p-6 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Pedestrian Connectivity Map
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-4 leading-tight">
                                서울역-남산 입체 보행축 연결 구상도
                            </h3>
                            
                            {/* 입체 보행축 SVG */}
                            <div className="w-full h-[220px] bg-slate-50 border border-gray-300 relative flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 220" preserveAspectRatio="none">
                                    {/* 남산 에코 시스템 (우측 상단 녹색 산 모양) */}
                                    <path d="M 400,100 Q 450,20 500,100 L 500,220 L 350,220 Z" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
                                    <text x="440" y="150" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="bold">남산 공원 (Nature)</text>
                                    
                                    {/* 서울역 (좌측 하단 회색 블록) */}
                                    <rect x="10" y="120" width="100" height="80" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
                                    <text x="60" y="165" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">서울역 (Transit)</text>
                                    
                                    {/* 이오타서울 단지 (중앙) */}
                                    <rect x="180" y="80" width="140" height="120" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
                                    <text x="250" y="115" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="black">IOTA Seoul</text>
                                    
                                    {/* 7,000㎡ 공개녹지 (이오타서울 하부 녹색 사각형) */}
                                    <rect x="190" y="140" width="120" height="50" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />
                                    <text x="250" y="170" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">7,000㎡ 공개녹지</text>
                                    
                                    {/* 보행 연결선 (서울역 8번출구 -> 이오타서울 에스컬레이터 -> 남산) */}
                                    <path d="M 110,160 Q 150,160 180,150 T 320,130 Q 360,130 400,120" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round" />
                                    <path d="M 110,160 Q 150,160 180,150 T 320,130 Q 360,130 400,120" stroke="#d97706" strokeWidth="2" fill="none" strokeDasharray="4,4" />
                                    
                                    {/* 핀 포인트 포인터 */}
                                    <circle cx="110" cy="160" r="5" fill="#ef4444" />
                                    <circle cx="200" cy="150" r="5" fill="#ef4444" />
                                    <circle cx="310" cy="135" r="5" fill="#ef4444" />
                                    <circle cx="400" cy="120" r="5" fill="#ef4444" />
                                </svg>
                                <div className="absolute top-[170px] left-[105px] bg-[#ef4444] text-white text-[9px] font-black px-1 py-0.5">
                                    서울역 8번출구
                                </div>
                                <div className="absolute top-[85px] left-[265px] bg-[#d97706] text-white text-[9px] font-black px-1 py-0.5">
                                    에스컬레이터 연결
                                </div>
                                <div className="absolute top-[85px] left-[360px] bg-[#10b981] text-white text-[9px] font-black px-1 py-0.5">
                                    남산 보행교 브릿지
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 bg-gray-50 p-3 border border-gray-200">
                            <p className="text-[13px] text-gray-600 font-bold leading-relaxed">
                                🚶‍♂️ 서울역 대중교통 노드에서 시작하여 입체적 보행 데크와 에스컬레이터를 거쳐 남산 정상까지 단절 없이 연결되는 쾌적한 보행 네트워크 확보.
                            </p>
                        </div>
                    </div>

                    {/* 우측: 7,000㎡ 공개녹지 스펙 및 핵심 기여도 */}
                    <div className="w-full lg:w-[46%] bg-white border-2 border-[#0f172a] rounded-none p-6 text-left shadow-lg flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Project Specification
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-6 leading-tight">
                                기부채납을 통한 친환경 오픈스페이스
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="border border-gray-200 p-4">
                                    <span className="block text-[#0f172a] font-extrabold text-[16px]">🌲 축구장 크기의 도심 숲광장 (7,000㎡)</span>
                                    <span className="text-[13px] text-gray-600 block mt-1">고층 오피스 빌딩 하부 면적의 상당 부분을 개방형 잔디광장과 자연 숲으로 조성하여 시민에 환원</span>
                                </div>
                                <div className="border border-gray-200 p-4">
                                    <span className="block text-[#0f172a] font-extrabold text-[16px]">🍃 남산에서 이어지는 바람길 설계</span>
                                    <span className="text-[13px] text-gray-600 block mt-1">도심 기온을 낮추고 대기 순환을 촉진하기 위해 남산의 산바람 경로를 반영한 타워 및 녹지 배치 설계</span>
                                </div>
                                <div className="border border-gray-200 p-4">
                                    <span className="block text-[#0f172a] font-extrabold text-[16px]">🎭 지역사회 오픈 스테이지 데크</span>
                                    <span className="text-[13px] text-gray-600 block mt-1">야외 콘서트, 전시회, 버스킹 등이 연중 가능한 목재 데크 플랫폼을 설치하여 활력 넘치는 문화공간 구축</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>개발 지구 내 대규모 축구장 면적 크기의 공개녹지를 기부채납하여 시민의 공간으로 개방</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>서울역 8번출구에서 남산 에스컬레이터로 연결되는 무장애 입체 보행 인프라 연결선 구축</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>사적 개발이 도시적 보행 가치 및 자연의 연계성을 극대화시키는 수준 높은 공공 기여의 표본</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
