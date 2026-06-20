import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section32({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? 'NYC-Related-HYHK BID 3각 공조' : '3-Tier Integration Model'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-8">
                    {lang === 'kr'
                        ? '공공 인허가, 민간 개발, 장기 운영이 결합된 지속가능한 거버넌스 3각 공조'
                        : 'Sustainable 3-Tier Governance: Interlocking NYC, Developer, and BID'}
                </h2>

                {/* 3각 관계망 거버넌스 인포그래픽 */}
                <div className="relative w-full max-w-[1100px] h-[380px] mx-auto mb-[25px] hidden lg:block">
                    
                    {/* SVG Connecting Lines and Arrows */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1100 380">
                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
                            </marker>
                            <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" />
                            </marker>
                        </defs>
                        
                        {/* NYC -> Developer Arrow */}
                        <path d="M 460,95 L 300,195" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeDasharray="4,4" markerEnd="url(#arrow)" />
                        <text x="330" y="135" fill="#475569" fontSize="11" fontWeight="bold" transform="rotate(-30 330 135)">
                            인허가·DIB 보너스 제공
                        </text>

                        {/* Developer -> HYHK BID Arrow */}
                        <path d="M 430,250 L 610,250" fill="none" stroke="#0f172a" strokeWidth="2.5" markerEnd="url(#arrow)" />
                        <text x="520" y="240" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">
                            공원 기부채납 & BID 지원
                        </text>

                        {/* HYHK BID -> NYC Arrow */}
                        <path d="M 750,195 L 610,95" fill="none" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />
                        <text x="700" y="135" fill="#3b82f6" fontSize="11" fontWeight="bold" transform="rotate(30 700 135)">
                            공공공간 위탁 일상 운영
                        </text>

                        {/* Owners/Tenants -> HYHK BID Arrow */}
                        <path d="M 500,340 L 700,310" fill="none" stroke="#0f172a" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow)" />
                    </svg>

                    {/* Node 1: NYC (Top Center) */}
                    <div className="absolute top-0 left-[36%] w-[28%] h-[85px] border-4 border-[#0f172a] bg-white p-3 flex flex-col justify-center items-center shadow-sm rounded-none">
                        <span className="font-black text-[15.5px] text-gray-900">🏛️ 뉴욕시 (SBS + 도시계획)</span>
                        <span className="text-[12.5px] text-gray-500 font-bold mt-1">인허가 · 감독 · 공공 인프라 투자</span>
                    </div>

                    {/* Node 2: Developer (Bottom Left) */}
                    <div className="absolute top-[180px] left-[5%] w-[38%] h-[110px] border-4 border-[#0f172a] bg-white p-4 flex flex-col justify-center items-center shadow-sm rounded-none">
                        <span className="font-black text-[16px] text-gray-900">🏗️ 민간 디벨로퍼 (Related + Oxford)</span>
                        <span className="text-[13px] text-gray-600 font-bold mt-1">28에이커 캠퍼스 복합 개발 ($250억 투자)</span>
                        <span className="text-[12px] text-blue-600 font-bold mt-0.5">오피스 타워, 숍스, 에퀴녹스, Vessel 등 설치</span>
                    </div>

                    {/* Node 3: HYHK BID (Bottom Right) */}
                    <div className="absolute top-[180px] right-[5%] w-[38%] h-[110px] border-4 border-[#0f172a] bg-[#0f172a] text-white p-4 flex flex-col justify-center items-center shadow-md rounded-none">
                        <span className="font-black text-[16.5px] text-[#93c5fd]">🧹 지구관리협회 (HYHK BID)</span>
                        <span className="text-[13px] text-gray-300 font-bold mt-1">기부채납 공원 및 공공 공간 일상 운영 위탁</span>
                        <span className="text-[12px] text-emerald-400 font-bold mt-0.5">청소 · 보안 · 조경 및 문화 프로그램 기획·운영</span>
                    </div>

                    {/* Node 4: Property Owners & Tenants (Bottom Center) */}
                    <div className="absolute bottom-0 left-[28%] w-[44%] h-[55px] border-2 border-gray-400 bg-gray-50 p-2 flex flex-col justify-center items-center rounded-none">
                        <span className="font-black text-[14px] text-gray-800">👥 토지/재산 소유자 + 임차인 (앵커 테넌트 포함)</span>
                        <span className="text-[12px] text-gray-500 font-semibold mt-0.5">BID 특별부과금(Assessment) 납부 ➔ 운영 재원 조달</span>
                    </div>
                </div>

                {/* Mobile Fallback: 3-Layer Stack (Only visible on mobile) */}
                <div className="w-full max-w-[600px] mt-[15px] mb-[25px] flex flex-col gap-4 text-left lg:hidden">
                    <div className="border-4 border-[#0f172a] bg-white p-4 rounded-none shadow-sm">
                        <span className="block font-black text-[16px] text-gray-900">🏛️ 공공 레이어 (NYC / SBS)</span>
                        <p className="text-[13px] text-gray-600 font-bold mt-1 leading-relaxed">
                            • 특별용적률 인센티브 제공 및 공공 개발 인허가 감독<br />
                            • 세수 부족 시 이자지원(ISP)을 통한 리스크 분담
                        </p>
                    </div>
                    <div className="border-4 border-[#0f172a] bg-white p-4 rounded-none shadow-sm">
                        <span className="block font-black text-[16px] text-gray-900">🏗️ 디벨로퍼 레이어 (Related / Oxford)</span>
                        <p className="text-[13px] text-gray-600 font-bold mt-1 leading-relaxed">
                            • 상부 인공데크 건설 등 $250억 대규모 복합 개발 실행<br />
                            • 공공 광장 및 공원 시설물 설치 후 시에 기부채납
                        </p>
                    </div>
                    <div className="border-4 border-[#0f172a] bg-[#0f172a] p-4 text-white rounded-none shadow-md">
                        <span className="block font-black text-[16px] text-[#93c5fd]">🧹 운영 관리 레이어 (HYHK BID)</span>
                        <p className="text-[13px] text-gray-300 font-bold mt-1 leading-relaxed">
                            • 기부채납된 벨라 압죽 공원의 일상 운영 및 관리 권한 위탁 집행<br />
                            • 앵커 테넌트 중심의 특별부과금을 재원으로 미화·보안·문화조경 총괄
                        </p>
                    </div>
                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr'
                                ? '디벨로퍼가 개발 과정에서 공공 공간을 기부채납하고, BID가 앵커 테넌트 부과금을 통해 이를 지속 관리하여 공공 재정 절감과 자산 가치 상승을 상호 보장하는 PPP 핵심 거버넌스'
                                : 'A PPP governance where the developer dedicates public space, and the BID manages it via assessments to reduce public burden and preserve trophy asset values.'
                            }</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
