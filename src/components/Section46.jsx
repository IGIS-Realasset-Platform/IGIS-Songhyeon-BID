import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section46({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#f8fafc] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '서울 적용을 위한 제도적 커스터마이징 방향' : 'Institutional Customization for Seoul'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    {lang === 'kr' ? '서울형 BID 안착을 위한 5대 제도적 커스터마이징 전략' : 'Five Strategies for Localizing Seoul-Style BID'}
                </h2>

                {/* 중앙 컨텐츠 영역: 쫌생이 핏 배제, 5대 카드형 인포그래픽 설계 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px]">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
                        
                        {/* 카드 1 */}
                        <div className="border border-[#0f172a] bg-white p-5 flex flex-col justify-between text-left">
                            <div>
                                <span className="text-[12px] font-black text-[#1e3a8a] block mb-2">STRATEGY 01</span>
                                <h3 className="text-[16px] md:text-[18px] font-black text-[#0f172a] mb-3 leading-snug">
                                    법적 근거 신설
                                </h3>
                                <p className="text-[12px] text-gray-600 font-bold leading-relaxed">
                                    도시재생특별법 개정 혹은 '에리어매니지먼트법'을 제정하고, 소유자+상업 임차인(사업소세 연동)의 이중 부과 구조 및 면적+인수 기준 동의제 마련.
                                </p>
                            </div>
                        </div>

                        {/* 카드 2 */}
                        <div className="border border-[#0f172a] bg-white p-5 flex flex-col justify-between text-left">
                            <div>
                                <span className="text-[12px] font-black text-[#1e3a8a] block mb-2">STRATEGY 02</span>
                                <h3 className="text-[16px] md:text-[18px] font-black text-[#0f172a] mb-3 leading-snug">
                                    기부채납-BID 연계
                                </h3>
                                <p className="text-[12px] text-gray-600 font-bold leading-relaxed">
                                    대형 재개발 사업 인허가 시 기부채납하는 보행 광장·공원의 관리권을 BID에 위탁하고, 시 예산 일부를 보조하는 '서비스 계약 모델'을 장착.
                                </p>
                            </div>
                        </div>

                        {/* 카드 3 */}
                        <div className="border border-[#0f172a] bg-white p-5 flex flex-col justify-between text-left">
                            <div>
                                <span className="text-[12px] font-black text-[#1e3a8a] block mb-2">STRATEGY 03</span>
                                <h3 className="text-[16px] md:text-[18px] font-black text-[#0f172a] mb-3 leading-snug">
                                    소유 분절 대응
                                </h3>
                                <p className="text-[12px] text-gray-600 font-bold leading-relaxed">
                                    소유주가 극도로 분절된 구도심 특성을 감안해 재개발 조합 및 도시환경정비사업 시행자를 발의 주체로 포용하며, 이오타 등 앵커 디벨로퍼를 핵심 축으로 설정.
                                </p>
                            </div>
                        </div>

                        {/* 카드 4 */}
                        <div className="border border-[#0f172a] bg-white p-5 flex flex-col justify-between text-left">
                            <div>
                                <span className="text-[12px] font-black text-[#1e3a8a] block mb-2">STRATEGY 04</span>
                                <h3 className="text-[16px] md:text-[18px] font-black text-[#0f172a] mb-3 leading-snug">
                                    서울시 거버넌스 연계
                                </h3>
                                <p className="text-[12px] text-gray-600 font-bold leading-relaxed">
                                    서울주택도시공사(SH) 또는 서울도시재생지원센터가 BID의 공적 감독 기구 역할을 수행하고, 서울시 도시재생 활성화 계획과 예산 심의를 연계.
                                </p>
                            </div>
                        </div>

                        {/* 카드 5 */}
                        <div className="border border-[#0f172a] bg-white p-5 flex flex-col justify-between text-left">
                            <div>
                                <span className="text-[12px] font-black text-[#1e3a8a] block mb-2">STRATEGY 05</span>
                                <h3 className="text-[16px] md:text-[18px] font-black text-[#0f172a] mb-3 leading-snug">
                                    다각적 재원 구조
                                </h3>
                                <p className="text-[12px] text-gray-600 font-bold leading-relaxed">
                                    기본 토지 소유자 부담금 외에도 공개공지 운영 보조금, 문체부 특화거리 예산 지원, 관광진흥개발기금 등을 보완적으로 레이어링하여 재정 자립도 확보.
                                </p>
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
                                    ? '조례를 통한 우회 설계부터 국비 매칭, 기부채납 공간 위탁, 분절 소유주 동의 요건 조정 등 서울의 독특한 환경에 최적화된 5대 맞춤 전략'
                                    : 'A 5-part customization strategy including bylaws bypass, SH governance linkage, developer-led initiation, and multi-layered financing.'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
