import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section116({ isActive }) {
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
            <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-center h-full">
                {/* Header */}
                <div className="w-full flex flex-col items-center text-center mb-[36px]">
                    <div className={`transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                            {lang === 'kr' ? '글로벌 도시 위계 상승의 분기점' : 'Turning Point for Global Urban Hierarchy'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '글로벌 거점 도시들의 재개발 패턴 한국판 적용' : 'Korean Application of Global Hub Redevelopment Patterns'}
                    </h2>
                </div>

                {/* Content: 3 Cards */}
                <div className={`w-full max-w-[1200px] mx-auto mt-[10px] mb-[36px] grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-[612ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Card 1: Tokyo */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] p-8 flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[26px] md:text-[30px] mb-2 uppercase">Tokyo</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-6 border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? '마루노우치 재개발' : 'Marunouchi Redevelopment'}
                        </div>
                        <p className="text-[18px] text-gray-600 font-medium leading-relaxed">
                            {lang === 'kr' ? '1990년대부터 미츠비시 지소가 한 세대에 걸쳐 재개발하여 글로벌 금융 중심지 위상 공고화' : 'Redeveloped over a generation by Mitsubishi Estate since the 1990s, solidifying its status as a global financial hub.'}
                        </p>
                    </div>

                    {/* Card 2: London */}
                    <div className="bg-white border-[6px] border-[#1d1d1f] p-8 flex flex-col shadow-sm">
                        <div className="text-[#1d1d1f] font-black text-[26px] md:text-[30px] mb-2 uppercase">London</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-6 border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? "King's Cross / St Pancras" : "King's Cross / St Pancras"}
                        </div>
                        <p className="text-[18px] text-gray-600 font-medium leading-relaxed">
                            {lang === 'kr' ? '2000년대 초중반 재개발을 통해 Google, Meta, AstraZeneca 등 글로벌 본사 라인 유치' : 'Redeveloped in the mid-2000s, attracting global headquarters like Google, Meta, and AstraZeneca.'}
                        </p>
                    </div>

                    {/* Card 3: New York */}
                    <div className="bg-white border-[6px] border-blue-900 p-8 flex flex-col shadow-sm">
                        <div className="text-blue-900 font-black text-[26px] md:text-[30px] mb-2 uppercase">New York</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-6 border-b-2 border-gray-100 pb-4">
                            {lang === 'kr' ? 'One Vanderbilt' : 'One Vanderbilt'}
                        </div>
                        <p className="text-[18px] text-gray-600 font-medium leading-relaxed">
                            {lang === 'kr' ? '2020년 Grand Central 일대를 완전히 재정의하며 Transit-Oriented Vertical City 구현' : 'Redefined the Grand Central area in 2020, implementing a Transit-Oriented Vertical City.'}
                        </p>
                    </div>
                </div>

                {/* Bottom text */}
                <div className={`w-full text-center mt-2 transition-all duration-[612ms] delay-[122ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-block bg-[#1e3a8a] text-white px-8 py-5 text-[20px] md:text-[22px] font-bold shadow-lg">
                        {lang === 'kr' ? 
                            (lang === 'kr' ? 'IOTA 서울의 본질: 서울이 글로벌 도시 위계상 한 단계 도약하는 분기점이자 Transit-Oriented Vertical City의 한국판 적용' : 'The Essence of IOTA Seoul: A turning point for Seoul to leap forward in the global city hierarchy and the Korean application of a Transit-Oriented Vertical City') : 
                            'IOTA Seoul: A turning point for Seoul’s global hierarchy and the Korean application of a Transit-Oriented Vertical City'}
                    </div>
                </div>
            </div>
        </section>
    );
}
