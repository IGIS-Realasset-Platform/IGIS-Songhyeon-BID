import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section4({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '브라이언트 파크 부동산 파급 효과' : 'Bryant Park Real Estate Impact'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    공원의 부활이 견인한 주변 오피스 임대료 급등과 재개발 촉진
                </h2>

                {/* 다채로운 인포그래픽 영역 (방사형 자산 가치 유출 네트워크 맵) */}
                <div className="w-full max-w-[1100px] mt-[30px] mb-[30px] relative h-[380px] flex items-center justify-center">
                    
                    {/* 가치 전이 배경선 (SVG) */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <svg className="w-[800px] h-[350px] text-[#e11d48]" viewBox="0 0 800 350" fill="none">
                            {/* 공원(중앙) -> Grace Building(좌측 상단) */}
                            <path d="M 400,175 L 180,80" stroke="#fca5a5" strokeWidth="4" strokeDasharray="4,4" />
                            <path d="M 400,175 L 180,80" stroke="#e11d48" strokeWidth="2" />
                            
                            {/* 공원(중앙) -> 1095 AOA(우측 상단) */}
                            <path d="M 400,175 L 620,80" stroke="#fca5a5" strokeWidth="4" strokeDasharray="4,4" />
                            <path d="M 400,175 L 620,80" stroke="#e11d48" strokeWidth="2" />
                            
                            {/* 공원(중앙) -> 주변 임대 시장 전체(하단 중앙) */}
                            <path d="M 400,175 L 400,300" stroke="#93c5fd" strokeWidth="4" strokeDasharray="4,4" />
                            <path d="M 400,175 L 400,300" stroke="#1e3a8a" strokeWidth="2" />
                        </svg>
                    </div>

                    {/* 중앙 앵커: Bryant Park 부활 */}
                    <div className="absolute z-10 w-[180px] h-[180px] rounded-none bg-emerald-600 border-4 border-[#0f172a] shadow-2xl flex flex-col items-center justify-center text-center p-4">
                        <span className="text-white text-[12px] font-bold block mb-1">ANCHOR CORE</span>
                        <h4 className="text-white font-black text-[18px] leading-tight">브라이언트 공원 리노베이션</h4>
                        <span className="text-[11px] text-emerald-100 font-extrabold mt-2">7,000평 도심 녹지</span>
                    </div>

                    {/* 좌측 상단: Grace Building */}
                    <div className="absolute top-[20px] left-[20px] md:left-[80px] z-10 bg-white border-4 border-[#0f172a] rounded-none p-4 w-[240px] text-left shadow-lg">
                        <span className="text-[11px] font-black text-rose-600 block mb-1">PROPERTY 01</span>
                        <h5 className="text-[16px] font-black text-gray-900">Grace Building</h5>
                        <p className="text-[12px] text-gray-500 font-semibold mt-2">
                            • 공원 개보수 직후 공실률 제로 수렴<br/>
                            • 1년 만에 임대료 <span className="text-rose-600 font-bold">60% 초고속 폭등</span><br/>
                            • 공원 조망 보유에 따른 프리미엄 획득
                        </p>
                    </div>

                    {/* 우측 상단: 1095 Avenue of the Americas */}
                    <div className="absolute top-[20px] right-[20px] md:right-[80px] z-10 bg-white border-4 border-[#0f172a] rounded-none p-4 w-[240px] text-left shadow-lg">
                        <span className="text-[11px] font-black text-rose-600 block mb-1">PROPERTY 02</span>
                        <h5 className="text-[16px] font-black text-gray-900">1095 Ave of the Americas</h5>
                        <p className="text-[12px] text-gray-500 font-semibold mt-2">
                            • 건물 전면을 통유리 파사드로 리노베이션<br/>
                            • 글로벌 운용사 <span className="text-blue-600 font-bold">BlackRock 본사 유치</span><br/>
                            • 공원을 앞마당으로 활용하는 거점 설계
                        </p>
                    </div>

                    {/* 하단 중앙: 임대료 할증 프리미엄 */}
                    <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 z-10 bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-4 w-[280px] text-center shadow-2xl">
                        <span className="text-[11px] font-black text-yellow-400 block mb-1">MARKET VALUE RERATING</span>
                        <h5 className="text-[16px] font-black text-white">주변 임대 시장 Rerating</h5>
                        <p className="text-[12px] text-gray-300 font-bold mt-2">
                            "공원과 인접해 있을수록 평방피트당 임대료가 경쟁 건물 대비 평균 15~22% 할증 거래되는 현상 고착화"
                        </p>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>브라이언트 파크의 기적은 **"공원(Place)이 주변 부동산 가치와 오피스 수요를 창출한다"**는 현대 플레이스메이킹 이론의 완벽한 실증 근거로 인용됩니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
