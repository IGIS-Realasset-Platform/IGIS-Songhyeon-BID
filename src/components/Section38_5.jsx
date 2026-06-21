import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section38_5({ isActive }) {
    const { lang } = useLanguage();

    const krRows = [
        { 
            cat: '법적 권한 & 강제성', 
            us: '강제 조세 징수권 보유 (무임승차 원천 차단)', 
            jp: '단일 디벨로퍼 자본력/자발적 협의 의존 (2018년 부담금 도입)', 
            seoul: '특별구역 지정을 통한 관리비 내 부분적 강제 부과 신설 (혼합형)' 
        },
        { 
            cat: '재원 조달 방식', 
            us: '자산 가치/면적 비례 분담금 (부동산세 병합 청구)', 
            jp: '앵커 디벨로퍼 출자 및 보유 상업시설 임대수익 전용', 
            seoul: '기관투자자·디벨로퍼 연합 마중물 펀드 + 공공공간 수익사업 허용' 
        },
        { 
            cat: '거버넌스 주도 주체', 
            us: '다수 소유주·상인·공무원 연합 이사회(DMA) 구성', 
            jp: '거대 단일 디벨로퍼가 기획부터 운영까지 수직 통합', 
            seoul: '앵커 개발사(이지스 등) 중심 얼라이언스 구성 + 서울시 가이드라인' 
        },
        { 
            cat: '공공공간 활용 전략', 
            us: '지구 개선 인프라의 유지보수 및 운영권 공식 위탁', 
            jp: '자사 소유 사유지 및 공개공지 활용, 문화예술 콘텐츠 탑재', 
            seoul: '공공 인프라 점용 허가 및 위탁 관리권을 얼라이언스에 공식 위임' 
        }
    ];

    const enRows = [
        { 
            cat: 'Legal Power', 
            us: 'Mandatory taxing power (completely blocks free-riders)', 
            jp: 'Corporate capital / voluntary compact (2018 assessment reform)', 
            seoul: 'Partial mandate via special district code / management fees (hybrid)' 
        },
        { 
            cat: 'Funding Model', 
            us: 'SAD assessment based on asset value/frontage (tied to tax bills)', 
            jp: 'Anchor developer funding & retail leasing income cross-subsidies', 
            seoul: 'Institutional investor seed fund + public-space concession revenues' 
        },
        { 
            cat: 'Governance Lead', 
            us: 'Joint board (DMA) of property owners, retailers, and city officials', 
            jp: 'Single mega developer vertical integration from planning to operation', 
            seoul: 'Anchor developer-led alliance under Seoul Metropolitan guidelines' 
        },
        { 
            cat: 'Public Space Use', 
            us: 'Formally delegated operations & maintenance of public plazas', 
            jp: 'Direct curation of culture/arts inside developer-owned public plazas', 
            seoul: 'Formally delegated concessions & management of public infrastructure' 
        }
    ];

    const rows = lang === 'kr' ? krRows : enRows;

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '[서울형의 제안] 미국형 BID와 일본형 타운매니지먼트를 융합한 SBD 하이브리드 거버넌스' : '[Seoul Proposal] SBD Hybrid Fusing US BID and Japan AM'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    {lang === 'kr' 
                        ? '미국형 BID · 일본형 타운 매니지먼트 · 서울형 SBD 적용 모델 비교' 
                        : 'Three-Way Comparison: US BID vs Japan AM vs Seoul SBD Model'}
                </h2>

                {/* 비교 테이블 영역 */}
                <div className="w-full max-w-[1300px] mt-[10px] mb-[15px] overflow-x-auto border-4 border-[#0f172a] shadow-sm bg-white">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-[#0f172a] text-white border-b-4 border-[#0f172a]">
                                <th className="p-3 text-[14px] md:text-[15.5px] font-black w-[15%] border-r border-white/20">
                                    {lang === 'kr' ? '구분' : 'Category'}
                                </th>
                                <th className="p-3 text-[14px] md:text-[15.5px] font-black w-[28%] border-r border-white/20 text-[#93c5fd]">
                                    {lang === 'kr' ? '🇺🇸 미국형 BID 모델' : '🇺🇸 US-style BID Model'}
                                </th>
                                <th className="p-3 text-[14px] md:text-[15.5px] font-black w-[28%] border-r border-white/20 text-emerald-400">
                                    {lang === 'kr' ? '🇯🇵 일본형 타운 매니지먼트' : '🇯🇵 Japanese Town Management'}
                                </th>
                                <th className="p-3 text-[14px] md:text-[15.5px] font-black w-[29%] text-rose-400">
                                    {lang === 'kr' ? '🇰🇷 서울형 SBD 적용 모델(제안)' : '🇰🇷 Proposed Seoul SBD Model'}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <tr 
                                    key={idx} 
                                    className={`border-b border-gray-200 text-[13px] md:text-[14.5px] font-semibold text-gray-800 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}`}
                                >
                                    <td className="p-3 border-r border-gray-200 font-bold bg-gray-100/50 text-gray-900">
                                        {row.cat}
                                    </td>
                                    <td className="p-3 border-r border-gray-200 text-gray-600">
                                        {row.us}
                                    </td>
                                    <td className="p-3 border-r border-gray-200 text-gray-600">
                                        {row.jp}
                                    </td>
                                    <td className="p-3 text-gray-800 font-bold bg-rose-50/20">
                                        {row.seoul}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    {lang === 'kr' ? (
                        <p className="font-semibold text-rose-600">
                            ※ 제안하는 서울형 SBD 모델은 미국의 공공 위탁 및 부분 강제 조항과 일본의 앵커 디벨로퍼 주도 기획력을 결합한 하이브리드 거버넌스를 목표로 합니다.
                        </p>
                    ) : (
                        <p className="font-semibold text-rose-600">
                            ※ The proposed Seoul SBD model aims for a hybrid governance model combining US public-private concessions and Japanese developer-led curation.
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}
