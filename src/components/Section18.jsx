import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section18({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">{lang === 'kr' ? '민간 정부(Private Governments) 이론' : 'Private Governments Theory'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    보충적이고 배타적인 공공재를 특정 구역에 한정하여 제공하는 거버넌스
                </h2>

                {/* 다채로운 인포그래픽 영역 (3각 거버넌스 매트릭스 다이어그램) */}
                <div className="w-full max-w-[1100px] mt-[40px] mb-[40px] relative h-[380px] flex items-center justify-center">
                    
                    {/* 3각 연결 화살표 배경 (SVG) */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <svg className="w-[600px] h-[350px] text-[#1e3a8a]" viewBox="0 0 600 350" fill="none">
                            {/* A (중앙 상단) -> B (우측 하단) */}
                            <path d="M 300,40 L 480,260" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" />
                            <path d="M 300,40 L 480,260" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                            {/* B (우측 하단) -> C (좌측 하단) */}
                            <path d="M 480,260 L 120,260" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" />
                            <path d="M 480,260 L 120,260" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                            {/* C (좌측 하단) -> A (중앙 상단) */}
                            <path d="M 120,260 L 300,40" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" />
                            <path d="M 120,260 L 300,40" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                            
                            {/* 중간 전송 라인 글씨 표시용 */}
                            <rect x="370" y="130" width="100" height="24" fill="#fdfdfd" rx="0" />
                            <text x="420" y="146" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">조례 승인 & 징수 대행</text>
                            
                            <rect x="250" y="248" width="100" height="24" fill="#fdfdfd" rx="0" />
                            <text x="300" y="264" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">특별분담금 납부</text>

                            <rect x="130" y="130" width="100" height="24" fill="#fdfdfd" rx="0" />
                            <text x="180" y="146" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">독점적 가로 관리권</text>
                        </svg>
                    </div>

                    {/* 노드 1: 시 정부 (Public Authority) - 상단 중앙 */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-white border-4 border-[#0f172a] rounded-none p-4 w-[240px] text-center shadow-lg">
                        <span className="text-[12px] font-black text-blue-600 block mb-1">GOVERNMENT</span>
                        <h4 className="text-[18px] font-black text-gray-900">시 정부 (NYC 등)</h4>
                        <p className="text-[12px] text-gray-500 font-bold mt-2">
                            • 지방자치 조례 승인권<br/>
                            • 지방세 징수 인프라 연계 고지<br/>
                            • 0% 수수료 100% 반환 보증
                        </p>
                    </div>

                    {/* 노드 2: 소유주 및 상인 (Taxpayers) - 좌측 하단 */}
                    <div className="absolute bottom-0 left-[20px] md:left-[80px] z-10 bg-white border-4 border-[#0f172a] rounded-none p-4 w-[240px] text-center shadow-lg">
                        <span className="text-[12px] font-black text-[#e11d48] block mb-1">MEMBER</span>
                        <h4 className="text-[18px] font-black text-gray-900">지구 내 소유주/상인</h4>
                        <p className="text-[12px] text-gray-500 font-bold mt-2">
                            • 추가 자발적 부과금 동의/납부<br/>
                            • 이사회 임원 선출 의결권 행사<br/>
                            • 프리미엄 보완적 서비스 수혜
                        </p>
                    </div>

                    {/* 노드 3: 지구관리협회 (DMA) - 우측 하단 */}
                    <div className="absolute bottom-0 right-[20px] md:right-[80px] z-10 bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-4 w-[240px] text-center shadow-2xl">
                        <span className="text-[12px] font-black text-yellow-400 block mb-1">PRIVATE AGENT</span>
                        <h4 className="text-[18px] font-black text-white">지구관리협회 (DMA)</h4>
                        <p className="text-[12px] text-gray-400 font-bold mt-2">
                            • 비영리 운영 법인 발기<br/>
                            • 보완적 서비스 단독 기획/집행<br/>
                            • 구역 내 부동산 가치 디펜스
                        </p>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>헬슬리와 스트레인지(1998)의 연구에 기반한 특정 구역 내 보충적 공공재 제공 모델</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>지방정부가 행정 규모를 늘리지 않고도 공공 서비스의 질을 혁신적으로 개선하는 장치</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>공공의 조세 권한과 민간의 신속한 의사결정 및 자본을 결합한 하이브리드 거버넌스 이론</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
