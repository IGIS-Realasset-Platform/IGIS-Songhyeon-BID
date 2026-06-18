import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section71({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20); const setStep = () => {};

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const timers = [
            setTimeout(() => setStep(1), 230),
            setTimeout(() => setStep(2), 612),
            setTimeout(() => setStep(3), 918),
        ];
        return () => timers.forEach(clearTimeout);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                <div className={`transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">{lang === 'kr' ? '생명과학 및 콜드체인 물류 생태계' : 'Life Sciences & Cold-chain Pharma Ecosystem'}</span>
                </div>

                <h2 className={`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[689ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {lang === 'kr' ? <>생명과학 클러스터와 콜드체인 제약 물류가<br/>결합하는 신규 거점의 안착</> : <>Establishment of New Hubs Combining<br/>Life Science Clusters & Cold-chain Pharma Logistics</>}
                </h2>

                {/* Custom Infographic: Two Pillars */}
                <div className="w-full max-w-[1100px] mt-[30px] mb-[30px] flex flex-col md:flex-row gap-8 transition-all duration-[765ms]">
                    
                    {/* Life Science Pillar */}
                    <div className={`flex-1 bg-white shadow-xl border-t-[10px] border-[#1d1d1f] px-8 py-6 flex flex-col items-center justify-center transition-all duration-[765ms] delay-100 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-[40px]">🧬</div>
                            <div className="text-[26px] font-bold text-[#888]">{lang === 'kr' ? '생명과학 클러스터' : 'Life Science Cluster'}</div>
                        </div>
                        <div className="w-full flex justify-center gap-2 mb-4">
                            <span className="bg-gray-100 px-4 py-2 font-bold text-gray-800 rounded-full">{lang === 'kr' ? '송도' : 'Songdo'}</span>
                            <span className="bg-gray-100 px-4 py-2 font-bold text-gray-800 rounded-full">{lang === 'kr' ? '판교' : 'Pangyo'}</span>
                            <span className="bg-gray-100 px-4 py-2 font-bold text-gray-800 rounded-full">{lang === 'kr' ? '마곡' : 'Magok'}</span>
                        </div>
                        <div className="text-[24px] font-black text-[#1d1d1f] bg-gray-50 border-[3px] border-gray-300 p-6 w-full shadow-inner">
                            {lang === 'kr' ? <>K-바이오 클러스터 특화 부동산이<br/>독립적인 우량 신규 카테고리로 안착</> : <>K-Bio Cluster Specialized Real Estate<br/>Established as an Independent Blue-chip Category</>}
                        </div>
                    </div>

                    {/* Cold Chain Pillar */}
                    <div className={`flex-1 bg-white shadow-xl border-t-[10px] border-blue-600 px-8 py-6 flex flex-col items-center justify-center transition-all duration-[765ms] delay-[230ms] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-[40px]">❄️</div>
                            <div className="text-[26px] font-bold text-[#888]">{lang === 'kr' ? '콜드체인 · 제약 물류' : 'Cold Chain & Pharma Logistics'}</div>
                        </div>
                        <div className="w-full flex justify-center gap-2 mb-4">
                            <span className="bg-blue-50 border border-blue-200 px-4 py-2 font-bold text-blue-900 rounded-full">{lang === 'kr' ? '인구 고령화' : 'Aging Pop'}</span>
                            <span className="bg-blue-50 border border-blue-200 px-4 py-2 font-bold text-blue-900 rounded-full">{lang === 'kr' ? '바이오 직배송' : 'Bio Direct Delivery'}</span>
                        </div>
                        <div className="text-[24px] font-black text-[#1d1d1f] bg-gray-50 border-[3px] border-gray-300 p-6 w-full shadow-inner">
                            {lang === 'kr' ? <>의약품 수요 증가와 맞물려<br/>특수 온도 제어 물류 수요의 지속적 성장</> : <>Continuous Growth of Temp-controlled Logistics<br/>Coupled with Increasing Pharma Demand</>}
                        </div>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className={`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-[#1d1d1f] break-keep text-center transition-all duration-[689ms] ease-out ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '송도, 판교, 마곡 등 주요 거점을 중심으로 한 \'생명과학 클러스터\'가 새로운 핵심 카테고리로 부상' : 'Life Science Clusters around Songdo, Pangyo, Magok emerge as a new core category'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{lang === 'kr' ? '인구 고령화 및 바이오/의약품 직배송 트렌드와 결합하여 콜드체인(특수 제어) 물류 인프라 수요 급증' : 'Cold chain infra demand surges with aging pop and bio direct delivery trends'}</span></li>
                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span className="text-[#1d1d1f]">{lang === 'kr' ? '연구개발 거점과 특수 물류 인프라가 시너지를 내며 K-바이오 특화 밸류체인 부동산 완성' : 'R&D nodes and specialized infra synergize to complete the K-Bio RE value chain'}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
