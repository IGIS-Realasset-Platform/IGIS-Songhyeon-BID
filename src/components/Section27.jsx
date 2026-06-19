import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section27({ isActive }) {
    const { lang } = useLanguage();
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">{lang === 'kr' ? '민주주의 결핍 등 구조적 비판 4선' : '4 Major Structural Criticisms'}</span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    민주주의 결핍, 서비스 격차, 이중과세 논란, 공공공간의 사유화
                </h2>

                {/* 수직 적층형 스택 (7. 에코-버티컬 스택형) */}
                <div className="w-full max-w-[1000px] mt-[25px] mb-[30px] flex flex-col gap-4 text-left">
                    
                    {/* 스택 1 */}
                    <div className="border-4 border-[#0f172a] bg-white p-5 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
                        <div className="md:w-[25%] flex-shrink-0 flex items-center gap-3">
                            <span className="w-8 h-8 bg-[#0f172a] text-white flex items-center justify-center font-black text-[14px]">01</span>
                            <span className="font-black text-[18px] text-gray-900">🗳️ 민주주의 결핍</span>
                        </div>
                        <div className="md:w-[72%] mt-2 md:mt-0">
                            <p className="text-[14px] text-gray-600 font-bold leading-relaxed">
                                토지 소유 비율에 따른 비례 의결권 제도로 인해, <strong>대형 부동산 소유주 위주의 의결권 독점</strong>이 굳어져 소규모 영세 상인 및 현지 거주민의 발언권이 무시될 우려가 존재합니다.
                            </p>
                        </div>
                    </div>

                    {/* 스택 2 */}
                    <div className="border-4 border-[#0f172a] bg-white p-5 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
                        <div className="md:w-[25%] flex-shrink-0 flex items-center gap-3">
                            <span className="w-8 h-8 bg-[#0f172a] text-white flex items-center justify-center font-black text-[14px]">02</span>
                            <span className="font-black text-[18px] text-gray-900">📈 서비스 격차 양극화</span>
                        </div>
                        <div className="md:w-[72%] mt-2 md:mt-0">
                            <p className="text-[14px] text-gray-600 font-bold leading-relaxed">
                                재원이 풍부한 고급 상업용 업무지구(BID)는 최고급 미화와 치안 혜택을 누리는 반면, <strong>부유하지 못한 외곽 소외 지역은 기본적인 공공 청소 공백</strong>마저 노출되는 도시 공간의 비정상적 격차를 유발합니다.
                            </p>
                        </div>
                    </div>

                    {/* 스택 3 */}
                    <div className="border-4 border-[#0f172a] bg-[#0f172a] p-5 text-white flex flex-col md:flex-row justify-between items-start md:items-center shadow-md">
                        <div className="md:w-[25%] flex-shrink-0 flex items-center gap-3">
                            <span className="w-8 h-8 bg-[#3b82f6] text-white flex items-center justify-center font-black text-[14px]">03</span>
                            <span className="font-black text-[18px] text-white">💸 이중과세 논란</span>
                        </div>
                        <div className="md:w-[72%] mt-2 md:mt-0">
                            <p className="text-[14px] text-gray-300 font-bold leading-relaxed">
                                시 당국에 재산세를 적정하게 완납하여 <strong>기본 공공 서비스를 받을 권리가 있음에도 불구하고</strong>, 보완 서비스라는 명목으로 별도의 특별부과금을 추가 납부함으로써 이중 부담에 따른 원천 반발 발생.
                            </p>
                        </div>
                    </div>

                    {/* 스택 4 */}
                    <div className="border-4 border-[#0f172a] bg-[#0f172a] p-5 text-white flex flex-col md:flex-row justify-between items-start md:items-center shadow-md">
                        <div className="md:w-[25%] flex-shrink-0 flex items-center gap-3">
                            <span className="w-8 h-8 bg-[#3b82f6] text-white flex items-center justify-center font-black text-[14px]">04</span>
                            <span className="font-black text-[18px] text-white">🛡️ 공공 공간의 사유화</span>
                        </div>
                        <div className="md:w-[72%] mt-2 md:mt-0">
                            <p className="text-[14px] text-gray-300 font-bold leading-relaxed">
                                보도나 공원 등 <strong>누구나 누려야 하는 열린 공공 공간</strong>이 비영리 민간법인(DMA)의 마케팅 행사나 특정 단속권에 의해 독점 지배되며, 영세 노점상이나 노숙인 등을 인위적으로 정제 배제하는 부작용이 속출합니다.
                            </p>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr' ? '부자 지역과 가난한 지역의 격차 심화 및 노숙인 배제 등 민간 효율성 추구에 따른 공적 형평성 훼손 쟁점' : 'Debates on the erosion of public equity due to private efficiency, widening regional disparities, and exclusion of the homeless'}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
