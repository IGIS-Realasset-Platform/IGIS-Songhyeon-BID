import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section32({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? 'NYC-Related-HYHK BID 3각 공조' : '3-Tier Integration Model'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    인허가, 개발, 그리고 입주 후 장기 관리로 이어지는 수직 통합적 관리 구조
                </h2>

                {/* 수직 적층형 3단 스택 거버넌스 (7. 에코-버티컬 스택형) */}
                <div className="w-full max-w-[1000px] mt-[25px] mb-[30px] flex flex-col gap-4 text-left">
                    
                    {/* Layer 1: 공공 인허가 권한 */}
                    <div className="border-4 border-[#0f172a] bg-white p-5 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
                        <div className="md:w-[30%] flex-shrink-0 flex items-center gap-3">
                            <span className="w-8 h-8 bg-[#0f172a] text-white flex items-center justify-center font-black text-[14px]">01</span>
                            <span className="font-black text-[18px] text-gray-900">🏛️ 공공 권한 (NYC / MTA)</span>
                        </div>
                        <div className="md:w-[68%] mt-2 md:mt-0">
                            <p className="text-[14px] text-gray-600 font-bold leading-relaxed">
                                • **용도 지역 특별 변경(Re-zoning)** 및 특별계획지구 지정으로 용적률 대폭 규제 완화.<br />
                                • **PILOT(재산세 대체금) 및 HYIC 채권 보증** 조례 제정으로 공공 금융 구조화 승인.
                            </p>
                        </div>
                    </div>

                    {/* Layer 2: 개발 및 시공 */}
                    <div className="border-4 border-[#0f172a] bg-white p-5 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
                        <div className="md:w-[30%] flex-shrink-0 flex items-center gap-3">
                            <span className="w-8 h-8 bg-[#0f172a] text-white flex items-center justify-center font-black text-[14px]">02</span>
                            <span className="font-black text-[18px] text-gray-900">🏗️ 민간 개발 (Related / Oxford)</span>
                        </div>
                        <div className="md:w-[68%] mt-2 md:mt-0">
                            <p className="text-[14px] text-gray-600 font-bold leading-relaxed">
                                • 철도 차량기지 상부 **인공 데크 및 마천루 복합 지구 개발** 리스크 전담.<br />
                                • 글로벌 앵커 테넌트(BlackRock, KKR, Meta 등) 선임차 계약 성사 및 분양/임대 실무 실행.
                            </p>
                        </div>
                    </div>

                    {/* Layer 3: 장기 운영 관리 */}
                    <div className="border-4 border-[#0f172a] bg-[#0f172a] p-5 text-white flex flex-col md:flex-row justify-between items-start md:items-center shadow-md">
                        <div className="md:w-[30%] flex-shrink-0 flex items-center gap-3">
                            <span className="w-8 h-8 bg-[#3b82f6] text-white flex items-center justify-center font-black text-[14px]">03</span>
                            <span className="font-black text-[18px] text-white">🧹 장기 운영 (HYHK BID)</span>
                        </div>
                        <div className="md:w-[68%] mt-2 md:mt-0">
                            <p className="text-[14px] text-gray-300 font-bold leading-relaxed">
                                • 준공 후 기부채납된 **벨라 압죽 공원 및 공공 보행공간**의 미화, 청소, 보완 조경 실무 위탁 집행.<br />
                                • 지역 상권 활성화를 위한 **소프트웨어 문화 프로그램 상시 운용** 및 장기 자산 가치 방어.
                            </p>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>건물 준공이 종료된 후 민간 개발사가 철수하더라도, 남겨진 특별부과지구(BID)가 이사회를 통해 바통을 이어받아 동일한 프리미엄 품질로 공공 유휴 공간을 영속적 관리(Operation)하는 수직 통합적 생태계입니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
