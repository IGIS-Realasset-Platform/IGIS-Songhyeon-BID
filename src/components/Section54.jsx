import React from 'react';

export default function Section54({ isActive }) {
    const projects = [
        {
            name: '이오타서울 1 (힐튼부지)',
            loc: '양동 4-2·7지구',
            scale: '연면적 33.9만㎡',
            status: '2024.12 사업인가 / 2025 착공 / 2030 완공'
        },
        {
            name: '이오타서울 2 (메트로·서울로타워)',
            loc: '양동 8-1·6지구',
            scale: '이오타 전체 46만㎡',
            status: '삼성물산 시공 / 리츠칼튼 호텔 유치 확정'
        },
        {
            name: '서울역 북부역세권',
            loc: '봉래동2가 유휴 철도부지',
            scale: '연면적 35만㎡ (5개동)',
            status: '2024.11 PF 2.1조 완료 / 착공 / 2029 완공'
        },
        {
            name: '서울역-서대문 1·2구역 (서소문)',
            loc: '중구 순화동 7번지',
            scale: '지상 38층 / 24.9만㎡',
            status: '2030.6 준공 목표 / 녹지생태도심 선도사업'
        },
        {
            name: '봉래구역 2지구',
            loc: '남대문로5가 일대',
            scale: '지상 31층 업무시설',
            status: '2025.12 정비계획 변경 및 추진'
        },
        {
            name: '봉래구역 3지구',
            loc: '중구 남대문로5가 63-1',
            scale: '지상 28층 업무시설',
            status: '서울역 광장 전면 / 통합심의 통과'
        }
    ];

    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        서울 도심 역사상 최대 규모의 정비사업 공급 및 구역 현황
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-5">
                    2030년까지 연면적 150만㎡ 정비사업 동시 공급: 도심 개발의 대전환
                </h2>

                {/* 중앙 컨텐츠 영역 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] flex flex-col xl:flex-row gap-6 items-stretch">
                    
                    {/* 좌측: 정비 프로젝트 비교 테이블 */}
                    <div className="flex-1 border border-[#0f172a] bg-white p-5 overflow-x-auto">
                        <table className="w-full text-left border-collapse text-[13px] md:text-[14px]">
                            <thead>
                                <tr className="border-b border-[#0f172a] text-[#0f172a] font-black bg-slate-50">
                                    <th className="py-2.5 px-3">사업명</th>
                                    <th className="py-2.5 px-3">위치</th>
                                    <th className="py-2.5 px-3">규모</th>
                                    <th className="py-2.5 px-3">현황 및 계획</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((proj, idx) => (
                                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                                        <td className="py-2.5 px-3 font-bold text-[#0f172a]">{proj.name}</td>
                                        <td className="py-2.5 px-3 text-slate-600">{proj.loc}</td>
                                        <td className="py-2.5 px-3 font-extrabold text-[#1e3a8a]">{proj.scale}</td>
                                        <td className="py-2.5 px-3 text-slate-500 font-medium">{proj.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 우측: 공급 스케일 요약 박스 */}
                    <div className="w-full xl:w-[320px] border border-[#0f172a] bg-[#0f172a] text-white p-6 flex flex-col justify-between">
                        <div>
                            <span className="text-[11px] font-black bg-[#2563eb] text-white px-2 py-0.5 uppercase tracking-wider">GFA Sum</span>
                            <h3 className="text-[20px] font-black mt-3 mb-4 leading-tight">
                                도심 최대 규모 동시 공급
                            </h3>
                            <div className="border-t border-slate-700 my-4"></div>
                            
                            <div className="my-6">
                                <div className="text-slate-400 text-[12px] font-bold">총 개발 규모</div>
                                <div className="text-[36px] font-black text-white mt-1 leading-none">150만 ㎡+</div>
                                <div className="text-[#93c5fd] text-[13px] font-extrabold mt-2">
                                    여의도 IFC의 약 3배 규모
                                </div>
                            </div>

                            <p className="text-[13px] text-slate-300 font-bold leading-relaxed">
                                이오타 서울(46만㎡) 단독으로도 여의도 IFC(50만㎡)에 필적하며, 주변 5대 대형 메가 정비사업이 동시 준공됨으로써 서울 중심부에 전무후무한 대규모 프라임 업무 클러스터가 구축됩니다.
                            </p>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                이오타 서울(46만㎡), 북부역세권(35만㎡), 서소문구역(24.9만㎡) 등 서울역-남산 일대 핵심 정비사업들이 2030년까지 총 연면적 150만㎡ 규모의 프라임 공급 확정
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
