import React from 'react';

export default function Section55({ isActive }) {
    const conditions = [
        {
            num: '01',
            title: '공급 규모 (Scale)',
            desc: '단일 구역 내 오피스 공급 50만㎡ 이상 확보 및 복수의 랜드마크 트로피 에셋 존재 (이오타서울/북부역세권 등으로 충족)'
        },
        {
            num: '02',
            title: '교통 연결성 (Connectivity)',
            desc: '서울역 KTX·GTX·공항철도·지하철 1·4호선 연계와 남산-서울로 7017 보행길이 융합된 입체 교통 네트워크 구축'
        },
        {
            num: '03',
            title: '업종 다양성 (Diversity)',
            desc: '프라임 오피스 + 6성급 호텔(리츠칼튼) + 대규모 MICE + 상업 리테일 + 도심 공원의 완벽한 용도 융합 생태계 형성'
        },
        {
            num: '04',
            title: '국제 및 지역 연계 (Global Link)',
            desc: '공항철도를 통한 국제 직결성과 용산 국제업무지구(IBD)와 3km 거리의 연계를 통한 글로벌 기업 HQ 유치 기반 확보'
        },
        {
            num: '05',
            title: '지역 아이덴티티 (Identity)',
            desc: '남산 조망권 수호, 서울로 7017의 공공 보행로 활성화, 약현성당 및 손기정 기념관 등 역사문화 자산의 연계'
        }
    ];

    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        서울 3대 업무구역을 넘어 4대 비즈니스 허브로 도약하는 SBD의 지향점
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    4대 업무 권역(SBD)으로 공식 인정받기 위한 5대 필요충분조건
                </h2>

                {/* 중앙 컨텐츠 영역 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[25px] grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
                    {conditions.map((cond, idx) => (
                        <div key={idx} className="border border-[#0f172a] bg-white p-5 flex flex-col justify-between text-left">
                            <div>
                                <div className="text-[14px] font-black text-[#2563eb]">
                                    CONDITION {cond.num}
                                </div>
                                <h3 className="text-[17px] font-black text-[#0f172a] mt-2 mb-3 leading-tight">
                                    {cond.title}
                                </h3>
                                <p className="text-[12.5px] text-slate-600 font-medium leading-relaxed">
                                    {cond.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                기존 CBD·GBD·YBD의 고착화된 3대 권역 체제를 타파하고, 이오타 서울 중심의 대규모 복합 공간을 기반으로 4대 권역인 SBD의 조건 완성
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
