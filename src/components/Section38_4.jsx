import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section38_4({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '[거버넌스 대조] 미국의 조세 기반 횡적 바텀업 vs 일본의 자본 기반 종적 탑다운' : '[Governance Contrast] US Tax-based Horizontal vs Japan Capital-based Vertical'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-6">
                    {lang === 'kr' 
                        ? '미국의 횡적 바텀업(Bottom-up) 연대 vs 일본의 종적 탑다운(Top-down) 통합' 
                        : 'Horizontal Bottom-up (US) vs Vertical Top-down (Japan) Integration'}
                </h2>

                {/* 콘텐츠 영역: 2열 인포그래픽 대조 박스 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                    
                    {/* 미국의 횡적 연대 모델 */}
                    <div className="border-4 border-[#0f172a] bg-white p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#1e3a8a] text-white text-[12px] font-black px-3 py-1 uppercase mb-4">
                                US: Horizontal Alliance
                            </span>
                            <h3 className="text-[22px] font-black text-gray-900 mb-4">
                                {lang === 'kr' ? '🇺🇸 미국의 조세 중심 바텀업 모델' : '🇺🇸 US Bottom-up & Levy Model'}
                            </h3>
                            
                            <ul className="space-y-3 text-[14.5px] text-gray-600 font-semibold leading-relaxed">
                                <li>
                                    <strong className="text-gray-900">• 다수 소유자의 횡적 결집:</strong><br />
                                    {lang === 'kr' 
                                        ? '소유권이 잘게 쪼개진 상업 지구에서, 무임승차를 해결하기 위해 지권자들이 스스로 법적 추가 세금을 결의하여 기금을 공동 운영합니다.'
                                        : 'Fragmented property owners vote to levy additional property taxes on themselves to prevent free-riding and manage common funds.'}
                                </li>
                                <li>
                                    <strong className="text-gray-900">• 강력한 재원 강제성과 기획의 한계:</strong><br />
                                    {lang === 'kr' 
                                        ? '100% 강제 징수로 예산 안정성은 매우 높으나, 수백 명의 지권자 합의가 필요해 통합 마스터플랜의 빠른 실행과 통제가 어렵습니다.'
                                        : 'While financial stability is highly secured by taxation, fragmented ownership makes it difficult to implement and control unified master-planned designs.'}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 일본의 종적 수직 통합 및 TOD 모델 */}
                    <div className="border-4 border-[#0f172a] bg-[#0f172a] p-6 text-white shadow-md flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-emerald-500 text-white text-[12px] font-black px-3 py-1 uppercase mb-4">
                                JP: Vertical Integration & TOD
                            </span>
                            <h3 className="text-[22px] font-black mb-4 text-[#93c5fd]">
                                {lang === 'kr' ? '🇯🇵 일본의 자본 중심 탑다운 모델' : '🇯🇵 Japan Top-down & TOD Model'}
                            </h3>
                            
                            <ul className="space-y-3 text-[14.5px] text-gray-300 font-semibold leading-relaxed">
                                <li>
                                    <strong className="text-white">• 대형 디벨로퍼의 수직적 통합:</strong><br />
                                    {lang === 'kr' 
                                        ? '단일 또는 소수 앵커 디벨로퍼가 부지를 대규모로 확보해 직접 기획, 건설, 운영을 일체화하여 완결성 높은 장기 마스터플랜을 구사합니다.'
                                        : 'A single anchor developer secures large land tracts and integrates planning, construction, and operation to execute high-quality master plans.'}
                                </li>
                                <li>
                                    <strong className="text-white">• 철도 역세권(TOD) 및 타운 매니지먼트의 일체화:</strong><br />
                                    {lang === 'kr' 
                                        ? '시부야, 도쿄역 등 대형 복합 환승역과 주변 상업 개발에 철도사업자가 기획 단계부터 직접 참여하여 대중교통 연계 에리어 매니지먼트를 내재화했습니다.'
                                        : 'Rail companies (e.g. JR East) and developers integrate public transit corridors (TOD) with town management right from the design stage.'}
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    {lang === 'kr' ? (
                        <p className="font-semibold text-blue-800">
                            ※ 미국은 조세라는 ‘제도적 장치’로 흩어진 소유주를 묶었고, 일본은 대기업의 ‘자본과 개발권’을 축으로 공간을 통합해 입체적으로 관리해 왔습니다.
                        </p>
                    ) : (
                        <p className="font-semibold text-blue-600">
                            ※ US unified scattered owners via the institutional mechanism of taxation, while Japan integrated spaces utilizing corporate capital and TOD nodes.
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}
