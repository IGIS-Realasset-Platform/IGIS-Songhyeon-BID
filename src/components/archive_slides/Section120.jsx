import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section120({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 184),
            setTimeout(() => setStep(2), 551),
            setTimeout(() => setStep(3), 918)
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-white flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-center items-center h-full">
                
                {/* Header */}
                <div className="w-full flex flex-col items-center text-center mb-[36px]">
                    <div className={`transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                            {lang === 'kr' ? '프로젝트 펀더멘털' : 'Project Fundamentals'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '두 개의 거대한 축: YD427 & YD816' : 'Two Massive Pillars: YD427 & YD816'}
                    </h2>
                </div>

                {/* Content: 2 Cards (1x2 grid) */}
                <div className={`w-full max-w-[1200px] mx-auto mt-[10px] mb-[36px] grid grid-cols-1 md:grid-cols-2 gap-[20px] transition-all duration-[612ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Card 1: YD427 */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">YD427 PFV</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? 'IOTA 1 · 호텔 (힐튼 부지)' : 'IOTA 1 · Hotel (Hilton Site)'}
                        </div>
                        <ul className="text-[18px] text-gray-600 font-medium leading-relaxed space-y-3">
                            <li>▪ <strong className="text-gray-800">{lang === 'kr' ? '시공:' : 'Builder:'}</strong> {lang === 'kr' ? '현대건설' : 'Hyundai E&C'}</li>
                            <li>▪ <strong className="text-gray-800">{lang === 'kr' ? '사업규모:' : 'Project Scale:'}</strong> {lang === 'kr' ? '총 사업비 약 6조 원' : 'Total cost approx. 6T KRW'}</li>
                            <li>▪ <strong className="text-gray-800">{lang === 'kr' ? '조달현황:' : 'Funding Status:'}</strong> {lang === 'kr' ? '1차 본PF 2.2조 원 완료 (2025.5)' : '1st Main PF 2.2T KRW completed (May 2025)'} <br/><span className="ml-4 text-gray-500">→ {lang === 'kr' ? '2차 본PF 4.5조 원 예정 (2027.5)' : '2nd Main PF 4.5T KRW expected (May 2027)'}</span></li>
                            <li>▪ <strong className="text-gray-800">{lang === 'kr' ? '용도:' : 'Usage:'}</strong> {lang === 'kr' ? '리츠칼튼 호텔 + 오피스' : 'Ritz-Carlton Hotel + Office'}</li>
                            <li>▪ <strong className="text-gray-800">{lang === 'kr' ? '준공목표:' : 'Target Completion:'}</strong> {lang === 'kr' ? '2031년 3월' : 'March 2031'}</li>
                        </ul>
                    </div>

                    {/* Card 2: YD816 */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">YD816 PFV</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? 'IOTA 2 · 오피스 (메트로/서울로타워)' : 'IOTA 2 · Office (Metro/Seoullo Tower)'}
                        </div>
                        <ul className="text-[18px] text-gray-600 font-medium leading-relaxed space-y-3">
                            <li>▪ <strong className="text-gray-800">{lang === 'kr' ? '시공:' : 'Builder:'}</strong> {lang === 'kr' ? '삼성물산' : 'Samsung C&T'}</li>
                            <li>▪ <strong className="text-gray-800">{lang === 'kr' ? '사업규모:' : 'Project Scale:'}</strong> {lang === 'kr' ? '총 사업비 약 2조 1,963억 원' : 'Total cost approx. 2.19T KRW'}</li>
                            <li>▪ <strong className="text-gray-800">{lang === 'kr' ? '인센티브:' : 'Incentive:'}</strong> {lang === 'kr' ? '용적률 1,100% 확보' : 'Secured 1,100% FAR'}</li>
                            <li>▪ <strong className="text-gray-800">{lang === 'kr' ? '규모:' : 'Scale:'}</strong> {lang === 'kr' ? '지하 9층 ~ 지상 34층' : 'B9 to 34F'}</li>
                            <li>▪ <strong className="text-gray-800">{lang === 'kr' ? '운용:' : 'Management:'}</strong> {lang === 'kr' ? '이지스일반사모부동산투자신탁421호' : 'IGIS General Private Real Estate Investment Trust No. 421'}</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom text */}
                <div className={`w-full text-center mt-2 transition-all duration-[612ms] delay-[122ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-block bg-[#1e3a8a] text-white px-8 py-5 text-[20px] md:text-[22px] font-bold shadow-lg break-keep">
                        {lang === 'kr' ? 
                            (lang === 'kr' ? '한국 부동산 개발 역사상 최대 규모인 약 8조 원 규모의 거대한 통합 PF 프로젝트' : 'A massive integrated PF project worth approx. 8T KRW, the largest in the history of Korean real estate development') : 
                            'A massive unified PF project worth approx 8 trillion KRW, the largest in Korean real estate history.'}
                    </div>
                </div>
            </div>
        </section>
    );
}
