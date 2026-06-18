import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section122({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

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
                        <span className="inline-block text-[20px] md:text-[24px] font-bold text-red-700 tracking-[-0.02em] mb-[12px]">
                            {lang === 'kr' ? '당면한 실행 변수' : 'Immediate Execution Variables'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? 'YD816 본PF 전환 리스크 및 타임라인' : 'YD816 Main PF Transition Risk & Timeline'}
                    </h2>
                </div>

                {/* Content: 3 Cards */}
                <div className={`w-full max-w-[1200px] mx-auto mt-[10px] mb-[36px] grid grid-cols-1 md:grid-cols-3 gap-[20px] transition-all duration-[612ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Card 1: Crisis */}
                    <div className="bg-white border-[6px] border-red-700 px-6 py-[28px] flex flex-col shadow-sm">
                        <div className="text-red-700 font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Crisis</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px] border-b-2 border-red-100 pb-4">
                            {lang === 'kr' ? '본PF 전환 실패 리스크' : 'Main PF Transition Failure Risk'}
                        </div>
                        <p className="text-[18px] text-gray-600 font-medium leading-relaxed mb-4">
                            {lang === 'kr' ? '2026년 1월 17일 KB국민은행 선순위 채권 4,800억 원에 대해 EOD 통보.' : 'KB Kookmin Bank notified EOD on 480B KRW senior debt on Jan 17, 2026.'}
                        </p>
                        <p className="text-[18px] text-gray-600 font-medium leading-relaxed">
                            {lang === 'kr' ? '메리츠증권과의 선순위 대주 교체 협상이 1·2차 투심에서 반려됨.' : 'Senior lender replacement negotiation with Meritz Securities rejected in 1st/2nd investment committees.'}
                        </p>
                    </div>

                    {/* Card 2: Timeline */}
                    <div className="bg-white border-[6px] border-[#1d1d1f] px-6 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1d1d1f] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Timeline</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px] border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '공매 절차 데드라인 임박' : 'Short Sale Deadline Approaching'}
                        </div>
                        <div className="space-y-4">
                            <div className="bg-gray-100 p-3 flex items-center justify-between font-bold">
                                <span className="text-gray-600">{lang === 'kr' ? '잔여 협상 기간' : 'Negotiation Time'}</span>
                                <span className="text-red-600">{lang === 'kr' ? '약 2주' : 'Approx 2 weeks'}</span>
                            </div>
                            <div className="bg-gray-100 p-3 flex items-center justify-between font-bold">
                                <span className="text-gray-600">{lang === 'kr' ? '담보권 실행 유예' : 'Execution Grace'}</span>
                                <span className="text-red-600">{lang === 'kr' ? '1개월' : '1 month'}</span>
                            </div>
                            <p className="text-[17px] text-gray-600 font-bold mt-2 text-center text-red-600">
                                {lang === 'kr' ? '3월 중순: 공매 개시 실질적 데드라인' : 'Mid-March: Actual short sale deadline'}
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Countermeasure */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-6 py-[28px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Countermeasure</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px] border-b-2 border-[#1e3a8a]/20 pb-4">
                            {lang === 'kr' ? '자금 조달 구조 보완' : 'Capital Structure Supplementation'}
                        </div>
                        <ul className="text-[18px] text-gray-600 font-medium leading-relaxed space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#1e3a8a] mr-2">▪</span>
                                <span>{lang === 'kr' ? '이지스는 SI로 대명소노그룹을 확보하여 자금 조달 구조 보완 진행 중.' : 'Securing Daemyung Sono Group as SI to supplement capital structure.'}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#1e3a8a] mr-2">▪</span>
                                <span>{lang === 'kr' ? '삼성물산 책임임차(마스터리스 75%) 확약 연장 협상 동시 진행 중.' : 'Negotiating extension of Samsung C&T Master Lease (75%) commitment.'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom text */}
                <div className={`w-full text-center mt-2 transition-all duration-[612ms] delay-[122ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-block bg-[#1e3a8a] text-white px-8 py-5 text-[20px] md:text-[22px] font-bold shadow-lg break-keep">
                        {lang === 'kr' ? 
                            (lang === 'kr' ? '2026년 4월 현 시점, YD816 PFV 약 1조원 규모 리파이낸싱 완료' : 'As of April 2026, YD816 PFV completed approx. 1T KRW refinancing') : 
                            'As of April 2026, YD816 PFV approx 1T KRW Refinancing Completed'}
                    </div>
                </div>
            </div>
        </section>
    );
}
