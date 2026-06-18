import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section118({ isActive }) {
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
                            {lang === 'kr' ? '단순 개발을 넘어선 도시 형성 (City-making)' : 'Beyond Development: City-making'}
                        </span>
                    </div>
                    <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {lang === 'kr' ? '"남산을 시민에게" - 퍼블릭 스페이스와 트로피 자산의 결합' : '"Namsan to Citizens" - Combining Public Space with Trophy Assets'}
                    </h2>
                </div>

                {/* Content: 4 Cards (2x2 grid) */}
                <div className={`w-full max-w-[1160px] mx-auto mt-[0px] mb-[36px] grid grid-cols-1 md:grid-cols-2 gap-[20px] transition-all duration-[612ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Card 1 */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-[23px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Heritage</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px]">
                            {lang === 'kr' ? '힐튼 아트리움 보존' : 'Hilton Atrium Preservation'}
                        </div>
                        <p className="text-[19px] text-gray-600 font-medium leading-relaxed">
                            {lang === 'kr' ? 'SOM, Foster+Partners, DA그룹 등 세계적 설계사 참여 하에 힐튼 아트리움을 3D 디지털로 보존하여 역사적 가치 계승' : 'Preserving the historic Hilton Atrium in 3D digital format with world-class architects like SOM and Foster+Partners.'}
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-[23px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Green Space</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px]">
                            {lang === 'kr' ? '7,000m² 대규모 공개 녹지' : '7,000m² Public Greenery'}
                        </div>
                        <p className="text-[19px] text-gray-600 font-medium leading-relaxed">
                            {lang === 'kr' ? '축구장 1개 크기에 달하는 거대한 도심 속 오픈 스페이스를 조성하여 시민들에게 쾌적한 환경 제공' : 'Creating a massive open space equivalent to a soccer field in the city center for public enjoyment.'}
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-[23px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Public Flow</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px]">
                            {lang === 'kr' ? '보행로 및 공공청사 기부채납' : 'Pedestrian Path & Public Office'}
                        </div>
                        <p className="text-[19px] text-gray-600 font-medium leading-relaxed">
                            {lang === 'kr' ? '서울역 8번 출구에서 남산 백범공원으로 이어지는 에스컬레이터형 보행로 구축 및 공공청사 무상귀속' : 'Establishing an escalator pedestrian path from Seoul Station Exit 8 to Namsan Park, and dedicating public offices.'}
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white border-[6px] border-[#1e3a8a] px-8 py-[23px] flex flex-col shadow-sm">
                        <div className="text-[#1e3a8a] font-black text-[24px] md:text-[28px] mb-[6px] uppercase">Trophy Asset</div>
                        <div className="text-gray-700 font-bold text-[22px] mb-[14px]">
                            {lang === 'kr' ? '글로벌 럭셔리 호텔 유치' : 'Global Luxury Hotel'}
                        </div>
                        <p className="text-[19px] text-gray-600 font-medium leading-relaxed">
                            {lang === 'kr' ? '메리어트 리츠칼튼 등 글로벌 최상위 럭셔리 브랜드를 유치하여 프로젝트의 트로피 자산(Trophy Asset) 위상 확보' : 'Securing the project\'s trophy asset status by attracting top-tier global luxury brands like Marriott Ritz-Carlton.'}
                        </p>
                    </div>
                </div>

                {/* Bottom text */}
                <div className={`w-full text-center mt-2 transition-all duration-[612ms] delay-[122ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-block bg-[#1e3a8a] text-white px-8 py-5 text-[20px] md:text-[22px] font-bold shadow-lg break-keep">
                        {lang === 'kr' ? 
                            (lang === 'kr' ? '단순 부동산 개발이 아닌 도시 형성(city-making) 행위. 롯데월드타워 + 아자부다이힐스 + 허드슨야드의 결합 모델' : 'Not simple real estate development, but an act of city-making. A combined model of Lotte World Tower + Azabudai Hills + Hudson Yards') : 
                            'A city-making act beyond simple development. A combined model of Lotte World Tower, Azabudai Hills, and Hudson Yards.'}
                    </div>
                </div>
            </div>
        </section>
    );
}
