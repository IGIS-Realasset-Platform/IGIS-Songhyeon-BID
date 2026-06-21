import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section38_2({ isActive }) {
    const { lang } = useLanguage();

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '[실행의 모델] 3대 디벨로퍼(미쓰비시·모리·미쓰이)의 독자적 차별화 전략' : '[Execution Model] Unique Strategies of the 3 Major Developers'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-6">
                    {lang === 'kr' 
                        ? '미쓰비시 · 모리 · 미쓰이의 에리어 매니지먼트 실행 모델' 
                        : 'Area Management execution models of Mitsubishi, Mori, and Mitsui'}
                </h2>

                {/* 콘텐츠 영역: 3열 카드 그리드 */}
                <div className="w-full max-w-[1300px] mt-[10px] mb-[20px] grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    
                    {/* 미쓰비시 지쇼 - OMY 협의회 및 용적이전 */}
                    <div className="border-4 border-[#0f172a] bg-white p-5 shadow-sm flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                Mitsubishi Estate
                            </span>
                            <h3 className="text-[19px] font-black text-gray-900 mb-3">
                                {lang === 'kr' ? '🏢 미쓰비시 지쇼 (OMY 지구)' : '🏢 Mitsubishi Estate (OMY)'}
                            </h3>
                            <p className="text-[13.5px] text-gray-600 font-semibold leading-relaxed">
                                {lang === 'kr' ? (
                                    <>
                                        • <strong>지구 규모:</strong> 120ha 내 오피스 빌딩 106개 관리.<br />
                                        • <strong>용적 이전(TDR):</strong> 역사 복원 시 남은 공중 용적률을 다른 개발자에게 매각하여 수익화 및 환경 정비 재원 확보.<br />
                                        • <strong>TMIP 플랫폼:</strong> 오픈 이노베이션을 촉진하기 위한 민관학 네트워크 구축.
                                    </>
                                ) : (
                                    <>
                                        • <strong>Scale:</strong> Manages 106 towers in 120ha.<br />
                                        • <strong>TDR System:</strong> Sold unused development air rights to fund historical station restoration and streetscapes.<br />
                                        • <strong>TMIP:</strong> Established an open-innovation ecosystem connecting industry, academia, and government.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* 모리 빌딩 - 롯폰기힐스 및 수직통합 */}
                    <div className="border-4 border-[#0f172a] bg-[#0f172a] p-5 text-white shadow-md flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#ef4444] text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                Mori Building
                            </span>
                            <h3 className="text-[19px] font-black text-[#93c5fd] mb-3">
                                {lang === 'kr' ? '🌳 모리 빌딩 (Hills 시리즈)' : '🌳 Mori Building (Hills Series)'}
                            </h3>
                            <p className="text-[13.5px] text-gray-300 font-semibold leading-relaxed">
                                {lang === 'kr' ? (
                                    <>
                                        • <strong>수직 통합 모델:</strong> 단일 디벨로퍼가 부지를 통합 매수하여 장기 보유·직영 운영.<br />
                                        • <strong>문화·산업 클러스터:</strong> 미술관, 호텔, 주거에 더해 도쿄 스타트업 허브 및 VC 허브를 유기 결합.<br />
                                        • <strong>도시 기능 내재화:</strong> 재정 불안 없는 장기 에리어 큐레이션 역량 확보.
                                    </>
                                ) : (
                                    <>
                                        • <strong>Vertical Integration:</strong> Single developer buys, owns, and manages key commercial spaces long-term.<br />
                                        • <strong>Socio-cultural Incubation:</strong> Integrates Tokyo Startup Hub, VC hubs, art galleries, and residential zones.<br />
                                        • <strong>Curatorial Autonomy:</strong> Preserves long-term placemaking capability without financial volatility.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* 미쓰이 부동산 - 니혼바시 클러스터 */}
                    <div className="border-4 border-[#0f172a] bg-white p-5 shadow-sm flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[11px] font-black px-2 py-0.5 uppercase mb-3">
                                Mitsui Fudosan
                            </span>
                            <h3 className="text-[19px] font-black text-gray-900 mb-3">
                                {lang === 'kr' ? '🏙️ 미쓰이 부동산 (니혼바시)' : '🏙️ Mitsui Fudosan (Nihonbashi)'}
                            </h3>
                            <p className="text-[13.5px] text-gray-600 font-semibold leading-relaxed">
                                {lang === 'kr' ? (
                                    <>
                                        • <strong>도쿄 미드타운(롯폰기):</strong> 6.9ha 규모 복합 용도 개발에 약 20억 엔의 지자체 공공보조금 수령.<br />
                                        • <strong>LINK-J 생태계:</strong> 라이프사이언스 및 바이오헬스케어 관련 다국적 기업, 연구소 클러스터 구축.<br />
                                        • <strong>우주·푸드테크:</strong> 미래 유망 신산업 지구 브랜딩과 에리어 매니지먼트의 결합.
                                    </>
                                ) : (
                                    <>
                                        • <strong>Tokyo Midtown:</strong> Received 2 billion Yen public subsidy for public-space enhancements in 6.9ha.<br />
                                        • <strong>LINK-J:</strong> Clustered life-science startups, research institutes, and MNCs to build a bio-health hub.<br />
                                        • <strong>Space & Food Tech:</strong> Integrated new-industry branding with area management.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    {lang === 'kr' ? (
                        <p className="font-semibold">
                            ※ 일본 디벨로퍼들은 단순히 건물을 짓는 데 그치지 않고 역사 복원, 바이오 클러스터 구축, 오픈 이노베이션 등 소프트웨어 차별화에 투자했습니다.
                        </p>
                    ) : (
                        <p className="font-semibold">
                            ※ Japanese developers went beyond building physical structures, investing in historical preservation, open innovation, and industry clustering.
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}
