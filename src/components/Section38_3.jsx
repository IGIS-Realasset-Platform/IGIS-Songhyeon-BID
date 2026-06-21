import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section38_3({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '[제도의 진화] 자발적 마을 만들기에서 법정 부담금 제도(일본판 BID)로의 도약' : '[Evolution] Leap from Voluntary Machizukuri to Mandated Assessment'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-6">
                    {lang === 'kr' 
                        ? '다층적 제도 발전과 2018년 법정 지역재생 부담금 제도(일본판 BID)' 
                        : 'Evolution of Regulatory Systems & the 2018 Legally Mandated Assessment'}
                </h2>

                {/* 콘텐츠 영역: 4단계 가로 흐름형 인포그래픽 */}
                <div className="w-full max-w-[1300px] mt-[10px] mb-[20px] relative">
                    
                    {/* 가로 연결선 (데스크탑) */}
                    <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-1 bg-[#cbd5e1] -z-10"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                        
                        {/* 1단계: 마치즈쿠리 */}
                        <div className="bg-white border-4 border-[#0f172a] p-5 flex flex-col justify-between shadow-sm relative">
                            <div className="absolute -top-4 -left-4 w-9 h-9 bg-[#0f172a] text-white flex items-center justify-center font-black text-[13px]">
                                01
                            </div>
                            <div className="mt-2">
                                <span className="block font-black text-[17px] text-gray-900 mb-1">🏡 마치즈쿠리 (まちづくり)</span>
                                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 font-bold uppercase inline-block mb-3">1960s ~</span>
                                <p className="text-[13px] text-gray-600 font-semibold leading-relaxed">
                                    • 시민 참여형 자발적 마을 만들기.<br />
                                    • 민법상 자발적 협의체 구조.<br />
                                    • 강제력 및 재원 징수권이 없어 대규모 상업 지구 관리에 한계.
                                </p>
                            </div>
                        </div>

                        {/* 2단계: 도시재생특별지구 */}
                        <div className="bg-white border-4 border-[#0f172a] p-5 flex flex-col justify-between shadow-sm relative">
                            <div className="absolute -top-4 -left-4 w-9 h-9 bg-[#0f172a] text-white flex items-center justify-center font-black text-[13px]">
                                02
                            </div>
                            <div className="mt-2">
                                <span className="block font-black text-[17px] text-gray-900 mb-1">🏢 도시재생특별지구</span>
                                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 font-bold uppercase inline-block mb-3">2002 ~</span>
                                <p className="text-[13px] text-gray-600 font-semibold leading-relaxed">
                                    • 도시재생특별조치법 제정.<br />
                                    • 용적률 등 규제를 획기적으로 완화.<br />
                                    • 민간이 제안한 도심 역세권 중심 대규모 복합개발 촉진.
                                </p>
                            </div>
                        </div>

                        {/* 3단계: 오사카판 BID 조례 */}
                        <div className="bg-white border-4 border-emerald-600 p-5 flex flex-col justify-between shadow-sm relative">
                            <div className="absolute -top-4 -left-4 w-9 h-9 bg-[#10b981] text-white flex items-center justify-center font-black text-[13px]">
                                03
                            </div>
                            <div className="mt-2">
                                <span className="block font-black text-[17px] text-emerald-700 mb-1">🌟 오사카판 BID 조례</span>
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 font-bold uppercase inline-block mb-3">2014 ~</span>
                                <p className="text-[13px] text-gray-600 font-semibold leading-relaxed">
                                    • 오사카시 독자 조례로 시범 적용.<br />
                                    • 그랑프론트오사카(우메키타)에 최초 적용.<br />
                                    • 지권자 12명에게 연 2,800만 엔을 징수하여 TMO에 교부하는 최초 시도.
                                </p>
                            </div>
                        </div>

                        {/* 4단계: 2018 지역재생법 개정 */}
                        <div className="bg-[#0f172a] border-4 border-emerald-500 p-5 text-white flex flex-col justify-between shadow-md relative">
                            <div className="absolute -top-4 -left-4 w-9 h-9 bg-emerald-500 text-white flex items-center justify-center font-black text-[13px]">
                                04
                            </div>
                            <div className="mt-2">
                                <span className="block font-black text-[17px] text-emerald-400 mb-1">⚖️ 지역재생법 개정 (일본판 BID)</span>
                                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 font-bold uppercase inline-block mb-3">2018 ~</span>
                                <p className="text-[13px] text-gray-300 font-semibold leading-relaxed">
                                    • 전국 단위 부담금제 법제화 완성.<br />
                                    • 수익자 2/3 서면 동의 ➔ 시정촌 승인 ➔ 조례 제정 ➔ 부담금 징수 후 100% 교부.<br />
                                    • 무임승차(Free-rider) 문제 차단.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    {lang === 'kr' ? (
                        <p className="font-semibold text-emerald-700">
                            ※ 2018년 개정안은 상업·업무지구 내 테넌트(사업자)를 대상으로 자산세·사업소세에 연계해 부담금을 징수함으로써 무임승차를 원천 봉쇄했습니다.
                        </p>
                    ) : (
                        <p className="font-semibold text-emerald-600">
                            ※ The 2018 amendment prevents free-riders by collecting mandatory assessments from business owners via property and enterprise taxes.
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}
