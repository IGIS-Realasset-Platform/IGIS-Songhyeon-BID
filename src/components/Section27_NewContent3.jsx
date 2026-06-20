import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section27_NewContent3({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) { setStep(20); return; }
        const t1 = setTimeout(() => setStep(1), 200);
        const t2 = setTimeout(() => setStep(2), 600);
        const t3 = setTimeout(() => setStep(3), 1000);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? 'BID 작동 메커니즘' : 'BID Operational Mechanism'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-6">
                    {lang === 'kr'
                        ? '부동산 소유주 자기 과세 기반의 민관협력 자금 순환 구조'
                        : "PPP Capital Circulation Cycle Funded by Property Owners' Self-Taxation"}
                </h2>

                {/* 중앙 콘텐츠: 순환 고리형 그래픽 루프 */}
                <div className="w-full max-w-[1100px] mt-[10px] mb-[20px] flex justify-center items-center relative">
                    
                    {/* SVG 흐름 선망 (데스크탑뷰) */}
                    <div className="w-full h-[280px] hidden md:block relative">
                        <svg className="w-full h-full" viewBox="0 0 1000 280">
                            {/* 연결 선 */}
                            <g stroke="#0f172a" strokeWidth="3" fill="none">
                                {/* Step 1 -> Step 2 */}
                                <path d="M 210,140 L 260,140" />
                                {/* Step 2 -> Step 3 */}
                                <path d="M 440,140 L 490,140" />
                                {/* Step 3 -> Step 4 */}
                                <path d="M 690,140 L 740,140" />
                                {/* Step 4 -> Step 1 (위쪽으로 우회하는 순환 루프선) */}
                                <path d="M 850,90 Q 500,-10 110,90" strokeDasharray="6,6" stroke="#3b82f6" />
                            </g>

                            {/* 화살표 헤드 */}
                            <g fill="#0f172a">
                                <polygon points="255,135 265,140 255,145" />
                                <polygon points="485,135 495,140 485,145" />
                                <polygon points="735,135 745,140 735,145" />
                            </g>
                            <g fill="#3b82f6">
                                <polygon points="115,85 105,95 120,98" />
                            </g>

                            {/* 루프 텍스트 */}
                            <text x="500" y="35" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="black" className="uppercase">
                                {lang === 'kr' ? '🔄 자산 가치 상승 ➔ 재투자 선순환 환원' : '🔄 Value Appreciation & Reinvestment Loop'}
                            </text>

                            {/* Node 1: 부동산 소유주 */}
                            <g transform="translate(10, 90)">
                                <rect width="200" height="100" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
                                <text x="100" y="35" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="black">1. 부동산 소유주</text>
                                <text x="100" y="60" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">자발적 추가 분담금 합의</text>
                                <text x="100" y="78" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="medium">지구 지정 및 자기과세</text>
                            </g>

                            {/* Node 2: 시 당국 (지방정부) */}
                            <g transform="translate(270, 90)">
                                <rect width="170" height="100" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
                                <text x="85" y="35" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="black">2. 시 당국 (공공)</text>
                                <text x="85" y="60" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">세금과 합산 일괄 징수</text>
                                <text x="85" y="78" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="medium">수수료 없이 100% 교부</text>
                            </g>

                            {/* Node 3: 지구관리협회 (DMA) */}
                            <g transform="translate(500, 90)">
                                <rect width="190" height="100" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                                <text x="95" y="35" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="black">3. 지구관리협회 (DMA)</text>
                                <text x="95" y="60" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">민간 주도 예산 집행</text>
                                <text x="95" y="78" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="medium">이사회 의결로 서비스 발주</text>
                            </g>

                            {/* Node 4: 보충적 공공 서비스 */}
                            <g transform="translate(750, 90)">
                                <rect width="240" height="100" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
                                <text x="120" y="35" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="black">4. 보충적 서비스 이행</text>
                                <text x="120" y="60" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">위생·치안·환경·마케팅 강화</text>
                                <text x="120" y="78" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="medium">➔ 자산 가치 증가 (선순환)</text>
                            </g>
                        </svg>
                    </div>

                    {/* 모바일 화면 카드 흐름 */}
                    <div className="md:hidden w-full flex flex-col gap-3 text-left">
                        <div className="border-4 border-[#0f172a] bg-white p-4">
                            <span className="block font-black text-[16px]">1. 부동산 소유주</span>
                            <span className="text-[13px] text-gray-600 block">지구 지정을 위한 추가 분담금 납부 동의</span>
                        </div>
                        <div className="border-4 border-[#0f172a] bg-white p-4">
                            <span className="block font-black text-[16px]">2. 시 당국 (지방정부)</span>
                            <span className="text-[13px] text-gray-600 block">일반 지방세 고지서와 합산 수납 후 100% 전액 반환</span>
                        </div>
                        <div className="border-4 border-[#0f172a] bg-[#0f172a] text-white p-4">
                            <span className="block font-black text-[16px]">3. 지구관리협회 (DMA)</span>
                            <span className="text-[13px] text-gray-300 block">민간 중심 이사회 의사결정으로 서비스 예산 집행</span>
                        </div>
                        <div className="border-4 border-[#0f172a] bg-white p-4">
                            <span className="block font-black text-[16px]">4. 보충적 서비스 ➔ 가치 상승 환원</span>
                            <span className="text-[13px] text-gray-600 block">위생·치안·환경정비 이행으로 구역 내 프리미엄 창출</span>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr'
                                ? '지방정부는 징수 수수료를 전혀 취하지 않으며, 수납된 기금 전액은 구역의 이익 환원을 위해 해당 지구에 100% 반환 보장'
                                : 'The municipality collects fees free of administration charges, ensuring 100% back to the originating district'}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr'
                                ? '소유자가 직접 낸 만큼 혜택이 돌아가도록 공법상의 강제 징수력과 민간의 자율 경영 기법을 결합시킨 정교한 PPP 루프'
                                : 'Sophisticated PPP loop combining public tax leverage with private management control, returning direct benefits to self-taxed owners'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
