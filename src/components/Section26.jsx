import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section26({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '로체스터시(2024) 설립 무산 실패기' : 'Rochester Failure (2024)'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    젠트리피케이션 및 저소득층 축출 우려로 무산된 사례 분석 (Rochester, 2024)
                </h2>

                {/* 3대 실패 원인 축 시각화 (5. 다차원 스탯카드형) */}
                <div className="w-full max-w-[1200px] mt-[30px] mb-[36px] grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                    
                    {/* 카드 1: 재정적 부담 (Economic) */}
                    <div className="border-4 border-[#0f172a] bg-white p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <span className="inline-block bg-red-600 text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                01. Economic Burden
                            </span>
                            <h3 className="text-[20px] font-black text-gray-900 mb-4">
                                임대료 전가 및 이중과세 논란
                            </h3>
                            <p className="text-[14px] text-gray-600 font-medium leading-relaxed">
                                • 특별부과금이 임대차 계약의 'NNN(Net Lease)' 조항에 의해 <strong>영세 임차 상인들에게 100% 전가</strong>되는 문제 발생.<br />
                                • 시 정부에 재산세를 이미 납부하고도 별도 청소/치안 부과금을 내야 하는 <strong>이중과세(Double Taxation)</strong> 저항 극대화.
                            </p>
                        </div>
                    </div>

                    {/* 카드 2: 사회적 배제 (Social) */}
                    <div className="border-4 border-[#0f172a] bg-white p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <span className="inline-block bg-red-600 text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                02. Social Exclusion
                            </span>
                            <h3 className="text-[20px] font-black text-gray-900 mb-4">
                                치안 사유화 및 취약층 축출
                            </h3>
                            <p className="text-[14px] text-gray-600 font-medium leading-relaxed">
                                • 민간 BID 경비 인력들이 공공 광장 내의 <strong>노숙인 및 유색인종 빈곤층을 위압적으로 정화/축출</strong>하려 한다는 비판 직면.<br />
                                • 상류층 소비자를 위한 공공 공간의 <strong>인위적 사유화 및 차별적 정제 리스크</strong>에 대해 지역 커뮤니티 연대 반발.
                            </p>
                        </div>
                    </div>

                    {/* 카드 3: 거버넌스 한계 (Democratic) */}
                    <div className="border-4 border-[#0f172a] bg-[#0f172a] p-6 text-white flex flex-col justify-between shadow-md">
                        <div>
                            <span className="inline-block bg-[#3b82f6] text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                03. Democratic Deficit
                            </span>
                            <h3 className="text-[20px] font-black text-white mb-4">
                                소통의 부재와 민주적 결핍
                            </h3>
                            <p className="text-[14px] text-gray-300 font-medium leading-relaxed">
                                • 대형 디벨로퍼와 랜드마크 소유주 중심으로 계획이 은밀히 수립되어, **지역 소상공인과의 실질적 협의 및 의견 수렴 누락**.<br />
                                • 시의회가 로체스터 내 다수 소수계층 상인의 표심을 의식하여 **BID 설립 조례의 가결을 무기한 거부**하고 전면 백지화.
                            </p>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-red-600">▪</span>
                            <span>{lang === 'kr' ? '상업 젠트리피케이션 우려 및 저소득 세입자의 배제 문제를 해결하지 못해 지역 사회의 거센 반대로 무산된 사례' : 'A Rochester failure case due to severe local opposition over commercial gentrification and low-income tenant exclusion'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
