import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section12_Formula({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '글로벌 비즈니스 지구 공식 / Key Formula' : 'Global Business District Formula'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-10">
                    {lang === 'kr' 
                        ? '글로벌 비즈니스 지구의 부활 공식' 
                        : 'Formula for Global Business District Revival'}
                </h2>

                {/* 콘텐츠 영역: 3단계 가로 흐름형 박스 */}
                <div className="w-full max-w-[1100px] mt-[10px] mb-[30px] flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
                    
                    {/* Step 1 */}
                    <div className="w-full lg:w-[28%] border-4 border-[#0f172a] bg-[#0f172a] text-white p-8 h-[220px] flex flex-col justify-center items-center shadow-md">
                        <span className="text-[14px] md:text-[16px] text-gray-400 font-bold uppercase mb-3">
                            Step 1
                        </span>
                        <p className="text-[20px] md:text-[22px] font-black text-center leading-[1.4] break-keep">
                            {lang === 'kr' ? '공공 관리 방치로 인한 쇠퇴' : 'Decline due to public neglect'}
                        </p>
                    </div>

                    {/* Arrow 1 */}
                    <div className="flex items-center justify-center w-full lg:w-[8%] h-[40px] lg:h-auto rotate-90 lg:rotate-0">
                        <svg className="w-8 h-8 text-[#0f172a] fill-current" viewBox="0 0 24 24">
                            <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
                        </svg>
                    </div>

                    {/* Step 2 */}
                    <div className="w-full lg:w-[28%] border-4 border-[#0f172a] bg-[#0f172a] text-white p-8 h-[220px] flex flex-col justify-center items-center shadow-md">
                        <span className="text-[14px] md:text-[16px] text-emerald-400 font-bold uppercase mb-3">
                            Step 2
                        </span>
                        <p className="text-[20px] md:text-[22px] font-black text-center leading-[1.4] break-keep">
                            {lang === 'kr' ? '민관협력 에리어매니지먼트/BID 도입' : 'Introduction of PPP Area Management / BID'}
                        </p>
                    </div>

                    {/* Arrow 2 */}
                    <div className="flex items-center justify-center w-full lg:w-[8%] h-[40px] lg:h-auto rotate-90 lg:rotate-0">
                        <svg className="w-8 h-8 text-[#0f172a] fill-current" viewBox="0 0 24 24">
                            <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
                        </svg>
                    </div>

                    {/* Step 3 */}
                    <div className="w-full lg:w-[28%] border-4 border-[#0f172a] bg-[#0f172a] text-white p-8 h-[220px] flex flex-col justify-center items-center shadow-md">
                        <span className="text-[14px] md:text-[16px] text-rose-400 font-bold uppercase mb-3">
                            Step 3
                        </span>
                        <p className="text-[20px] md:text-[22px] font-black text-center leading-[1.4] break-keep">
                            {lang === 'kr' ? '지속 가능한 자산 가치 창출' : 'Sustainable asset value creation'}
                        </p>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    {lang === 'kr' ? (
                        <p className="font-semibold text-blue-900">
                            ※ 행정력 공백으로 슬럼화된 지구를 민관협력 거버넌스(BID/AM) 모델로 재정비함으로써, 집객 효과 증대와 자산 가치 상승의 선순환 구조를 구축하는 것이 핵심 요체입니다.
                        </p>
                    ) : (
                        <p className="font-semibold text-blue-900">
                            ※ The core key is establishing a virtuous cycle of traffic enhancement and asset value growth by rebuilding slummed districts via a public-private partnership (BID/AM) model.
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}
