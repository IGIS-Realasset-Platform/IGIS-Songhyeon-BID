import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section34({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '벨라 압죽 공원 민간 위탁 운영' : 'Bella Abzug Park Model'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    공공 인프라를 민간 BID가 기부채납 형태로 완벽하게 위탁 관리하는 혁신
                </h2>

                {/* 대칭형 비교 테이블 (3. 대칭 밸런스시트형) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[36px] flex flex-col lg:flex-row gap-8 justify-center items-stretch relative">
                    
                    {/* Left: 뉴욕시 공원국 (DPR) 소유권 */}
                    <div className="w-full lg:w-[48%] border-4 border-[#0f172a] bg-white p-6 text-left flex flex-col justify-between shadow-sm">
                        <div>
                            <span className="inline-block bg-gray-400 text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Public Ownership
                            </span>
                            <h3 className="text-[24px] font-black text-gray-900 mb-2">
                                뉴욕시 공원국 (DPR)
                            </h3>
                            <p className="text-gray-500 text-[15px] font-bold mb-6">
                                공원 부지의 영구 소유권 보유
                            </p>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 border border-gray-200">
                                    <span className="block font-black text-[16px] text-gray-900">🌳 공원 부지 영구 소유</span>
                                    <span className="text-[13px] text-gray-600">공공 광장 및 공원의 소유권을 시 정부에 묶어두어 **민간 사유화 시비 원천 차단**</span>
                                </div>
                                <div className="p-4 bg-gray-50 border border-gray-200">
                                    <span className="block font-black text-[16px] text-gray-900">⚖️ 최소 서비스 의무 보장</span>
                                    <span className="text-[13px] text-gray-600">지자체 소관의 소방, 최소 방재 등 법적 행정 지원 지속성 제공</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 중앙 VS 뱃지 */}
                    <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#0f172a] text-white border-4 border-white font-black text-[16px] z-10">
                        CO
                    </div>

                    {/* Right: HYHK BID 운영권 */}
                    <div className="w-full lg:w-[48%] border-4 border-[#0f172a] bg-[#0f172a] p-6 text-left text-white flex flex-col justify-between shadow-md">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                Private Operation
                            </span>
                            <h3 className="text-[24px] font-black mb-2">
                                HYHK Alliance BID
                            </h3>
                            <p className="text-[#93c5fd] text-[15px] font-bold mb-6">
                                공원 일상 유지 관리권 & 상업 임대권 위탁
                            </p>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 border border-white/10">
                                    <span className="block font-black text-[16px] text-[#93c5fd]">🧹 고품질 환경 정비</span>
                                    <span className="text-[13px] text-gray-300">조경 식재, 쓰레기 분리배출, 정기 고압세척 및 전용 경비 순찰 집행</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10">
                                    <span className="block font-black text-[16px] text-[#93c5fd]">🍔 상업 키오스크 임대 및 수익 귀속</span>
                                    <span className="text-[13px] text-gray-300">공원 내 푸드 키오스크 임대 권한을 행사하여 **자체 공원 운영 재원 확보**</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10">
                                    <span className="block font-black text-[16px] text-[#93c5fd]">🎨 문화 프로그래밍 독점권</span>
                                    <span className="text-[13px] text-gray-300">미술품 야외 전시회, 콘서트, 스폰서 이벤트 유치로 지역 상권 활성화 주도</span>
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
                            <span>시 정부 대신 민간 BID가 공원 청소, 보수, 안전 비용을 자체 충당하고 높은 관리 품질을 보장하는 위탁 모델</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
