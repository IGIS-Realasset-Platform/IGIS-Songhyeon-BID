import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section41({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#f8fafc] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '왜 지금이 타이밍인가?' : 'Why Now is the Perfect Timing?'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '이오타서울과 서울역 대형 기관 소유주 블록의 형성' : 'Large Institutional Blocks & Golden Time of SBD BID'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 커스텀 인포그래픽 설계 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] flex flex-col lg:flex-row gap-6 items-stretch">
                    
                    {/* 좌측: 왜 지금인가? 4대 핵심 트리거 */}
                    <div className="w-full lg:w-[55%] border border-[#0f172a] bg-white p-6 flex flex-col justify-between text-left">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                Strategic Triggers
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black text-[#0f172a] mb-6 leading-snug">
                                {lang === 'kr' ? '방정식을 바꾸는 4대 기폭제' : 'Four Strategic Triggers Changing the Equation'}
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Trigger 1 */}
                                <div className="border border-[#0f172a] p-4 bg-slate-50">
                                    <div className="text-[14px] font-black text-[#1e3a8a] mb-2">01. 대형 기관 소유주 블록</div>
                                    <p className="text-[12.5px] text-gray-600 font-bold leading-relaxed">
                                        이지스(이오타서울, 46만㎡) + 한화(북부역세권, 35만㎡) + 서소문·봉래 복수 사업자로 서울역 권역 최초 대형 기관 소유주 블록 형성.
                                    </p>
                                </div>
                                
                                {/* Trigger 2 */}
                                <div className="border border-[#0f172a] p-4 bg-slate-50">
                                    <div className="text-[14px] font-black text-[#1e3a8a] mb-2">02. 축구장 크기 공개녹지</div>
                                    <p className="text-[12.5px] text-gray-600 font-bold leading-relaxed">
                                        이오타서울의 기부채납 입체 공개녹지(7,000㎡)가 단순 오픈스페이스를 넘어 광역 BID 운영의 핵심 물리적 거점으로 최적화.
                                    </p>
                                </div>

                                {/* Trigger 3 */}
                                <div className="border border-[#0f172a] p-4 bg-slate-50">
                                    <div className="text-[14px] font-black text-[#1e3a8a] mb-2">03. 용산 IBD 연계 압력</div>
                                    <p className="text-[12.5px] text-gray-600 font-bold leading-relaxed">
                                        용산 IBD 2025년 착공 및 2030년 입주 개시에 따라 SBD-용산 축의 광역 보행 및 업무 연계 압력이 자연 발생.
                                    </p>
                                </div>

                                {/* Trigger 4 */}
                                <div className="border border-[#0f172a] p-4 bg-slate-50">
                                    <div className="text-[14px] font-black text-[#1e3a8a] mb-2">04. 시 예산 매칭 재원</div>
                                    <p className="text-[12.5px] text-gray-600 font-bold leading-relaxed">
                                        서울시의 도심 도시재생 예산 2,482억 원 계획을 활용, BID 설립 및 공공 서비스 위탁에 따른 매칭 재원 연결 가능.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 2026-2028-2030 타임라인 로드맵 */}
                    <div className="w-full lg:w-[45%] border border-[#0f172a] bg-[#0f172a] p-6 text-left text-white flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[12px] font-black px-2.5 py-1 uppercase mb-4">
                                Timeline Roadmap
                            </span>
                            <h3 className="text-[20px] md:text-[22px] font-black mb-6 leading-snug">
                                {lang === 'kr' ? '다시 오지 않을 SBD 브랜드 골든타임' : 'The SBD Brand Golden Time'}
                            </h3>
                            
                            {/* 타임라인 SVG 또는 CSS */}
                            <div className="space-y-4">
                                {/* 2026 */}
                                <div className="border border-white/20 p-4 bg-white/5 flex gap-4 items-center">
                                    <div className="text-[28px] font-black text-[#93c5fd] leading-none w-[80px] shrink-0 border-r border-white/20 pr-4">
                                        2026
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-black text-white">SBD BID 제도 설계</div>
                                        <p className="text-[12px] text-gray-300 font-medium leading-relaxed mt-1">
                                            이지스-한화 공동 협의 구성 및 서울시 매칭 조례 연동 BID 법제 가이드 수립
                                        </p>
                                    </div>
                                </div>

                                {/* 2028 */}
                                <div className="border border-white/20 p-4 bg-white/5 flex gap-4 items-center">
                                    <div className="text-[28px] font-black text-[#93c5fd] leading-none w-[80px] shrink-0 border-r border-white/20 pr-4">
                                        2028
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-black text-white">착공 시점 BID 조기 출범</div>
                                        <p className="text-[12px] text-gray-300 font-medium leading-relaxed mt-1">
                                            건물이 완공된 후 논의하면 지체됨. 물리적 착공 시점에 조기 운영 거버넌스 출범
                                        </p>
                                    </div>
                                </div>

                                {/* 2030 */}
                                <div className="border border-white/20 p-4 bg-white/5 flex gap-4 items-center">
                                    <div className="text-[28px] font-black text-emerald-400 leading-none w-[80px] shrink-0 border-r border-white/20 pr-4">
                                        2030
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-black text-emerald-400">완공 및 SBD 브랜드 시장 론칭</div>
                                        <p className="text-[12px] text-gray-300 font-medium leading-relaxed mt-1">
                                            이오타서울 오프닝에 맞춰 물리적 자산과 지구 브랜드 통합 런칭
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-white/10 pt-4 text-[12px] text-gray-400 font-bold">
                            * 2030년 완공 시점에 브랜딩을 완료하려면 2028년 착공 시점에 BID를 반드시 정립해야 함.
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
                                    ? '대규모 기관 소유주 블록 형성을 기반으로 2026년 설계, 2028년 착공 시 출범하여 2030년 완공 즉시 SBD 브랜드 가치를 시장에 론칭해야 합니다.'
                                    : 'By forming large owner blocks, we must design in 2026, launch at 2028 construction, and brand SBD by 2030 completion.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
