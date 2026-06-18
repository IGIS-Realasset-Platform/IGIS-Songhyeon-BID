import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section93({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918), // Step 1
            setTimeout(() => setStep(4), 1300), // Step 2
            setTimeout(() => setStep(5), 1683), // Step 3
            setTimeout(() => setStep(6), 2295)  // Bottom thesis
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-blue-600 uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {lang === 'kr' ? 'Prime Mixed-Use 트로피 시리즈화' : 'Prime Mixed-Use Trophy Serialization'}
                    </span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-[40px] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>IOTA 기반 글로벌 LP 전용 패키지, '이지스 트로피 시리즈'</> : <>'IGIS Trophy Series': Global LP Package Based on IOTA</>}
                </h2>

                <div className="w-full max-w-[1100px] flex flex-col md:flex-row gap-6 mb-10 relative items-stretch">
                    
                    {/* Flow Step 1 */}
                    <div className={`flex-1 bg-white border-4 border-[#1e3a8a] rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center relative transition-all duration-[540ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-blue-600 text-white font-black text-[16px] rounded-full w-10 h-10 flex items-center justify-center mb-5 shadow-md">1</div>
                        <h3 className="font-extrabold text-[22px] text-[#1d1d1f] mb-3 break-keep text-center leading-tight">
                            {lang === 'kr' ? 'First Major Reference' : 'First Major Reference'}
                        </h3>
                        <p className="text-blue-600 font-bold text-[18px] break-keep text-center leading-snug">
                            {lang === 'kr' ? 'IOTA 프로젝트 성공적 안착' : 'Successful Landing of IOTA Project'}
                        </p>
                    </div>

                    {/* Arrow 1 */}
                    <div className={`hidden md:flex items-center justify-center transition-all duration-[383ms] ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </div>

                    {/* Flow Step 2 */}
                    <div className={`flex-1 bg-white border-4 border-[#1e3a8a] rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center relative transition-all duration-[540ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-blue-600 text-white font-black text-[16px] rounded-full w-10 h-10 flex items-center justify-center mb-5 shadow-md">2</div>
                        <h3 className="font-extrabold text-[22px] text-[#1d1d1f] mb-3 break-keep text-center leading-tight">
                            {lang === 'kr' ? 'Series Expansion' : 'Series Expansion'}
                        </h3>
                        <p className="text-gray-600 font-medium text-[16px] break-keep text-center leading-snug">
                            {lang === 'kr' ? 'YIBD 일부 지구, 잠실, 여의도 재개발, 마곡 중대형 블록 등으로 무한 연쇄 확장' : 'Infinite chain expansion into YIBD zones, Jamsil/Yeouido redevelopments, Magok mid-to-large blocks'}
                        </p>
                    </div>

                    {/* Arrow 2 */}
                    <div className={`hidden md:flex items-center justify-center transition-all duration-[383ms] ${step >= 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </div>

                    {/* Flow Step 3 */}
                    <div className={`flex-1 bg-[#1e3a8a] border-2 border-[#1e3a8a] rounded-2xl p-8 shadow-md flex flex-col items-center justify-center relative transition-all duration-[540ms] ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-white text-blue-600 font-black text-[16px] rounded-full w-10 h-10 flex items-center justify-center mb-5 shadow-md">3</div>
                        <h3 className="font-extrabold text-[22px] text-white mb-3 break-keep text-center leading-tight">
                            {lang === 'kr' ? 'Brand Packaging' : 'Brand Packaging'}
                        </h3>
                        <p className="text-blue-200 font-medium text-[16px] break-keep text-center leading-snug">
                            {lang === 'kr' ? '"이지스 트로피 시리즈" 단일 브랜드화 및 글로벌 LP 특화 패키지 판매' : 'Single branding of "IGIS Trophy Series" & specialized package sales for Global LPs'}
                        </p>
                    </div>

                </div>

                {/* Bottom Thesis Text */}
                <div className={`w-full max-w-[1100px] bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm transition-all duration-[540ms] ${step >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[17px] md:text-[20px] font-bold text-[#1e3a8a] break-keep leading-relaxed text-center">
                        {lang === 'kr' 
                            ? (lang === 'kr' ? <>IOTA라는 앵커 메가 프로젝트를 지렛대 삼아 마곡, 여의도 개발로 무한 연쇄 확장할<br/>글로벌 LP 전용 특화 패키지 '이지스 트로피 시리즈'를 상품화 한다.</> : <>Commercializing the 'IGIS Trophy Series', a specialized package exclusive to global LPs, for infinite chain expansion into Magok and Yeouido developments,<br/>leveraging the anchor mega-project IOTA.</>)
                            : <>By leveraging the anchor mega-project IOTA, we commercialize the 'IGIS Trophy Series',<br/>a specialized package for global LPs that infinitely expands into Magok and Yeouido developments.</>
                        }
                    </p>
                </div>

            </div>
        </section>
    );
}
