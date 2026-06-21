import React from 'react';

export default function Section56({ isActive }) {
    const mappings = [
        {
            hy: 'Vessel (앵커 조형물)',
            sbd: '이오타서울 내 남산 조망 루프톱 퍼블릭 데크 또는 시그니처 퍼블릭 아트 커미션 도입'
        },
        {
            hy: '5에이커 퍼블릭 스퀘어',
            sbd: '이오타서울 대지 40% 공개 녹지(축구장 1개 크기) 조성 ➔ BID 공공 프로그래밍 거점 활용'
        },
        {
            hy: '하이라인 연계 보행망',
            sbd: '서울로 7017 연장 + 이오타서울 에스컬레이터(남산 방향) + 북부역세권 연결 데크 구축'
        },
        {
            hy: 'Shops at Hudson Yards',
            sbd: '이오타서울 고급 리테일 + 북부역세권 상업 시설의 BID 통합 공동 마케팅 가동'
        },
        {
            hy: '에퀴녹스 호텔·주거 복합',
            sbd: '리츠칼튼(이오타1) + MICE 컨벤션(북부역세권) 연계를 통한 24시간 도심 활성화 거점화'
        },
        {
            hy: 'Wynn 카지노 (2단계)',
            sbd: '향후 남대문시장 국제 관광 상업 특구 지정을 통한 광역 상권 연계 가능성 타진'
        }
    ];

    return (
        <section className="section w-full h-full bg-[#fcfdfe] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        글로벌 메가 PPP 성공 모델의 서울형 SBD 맞춤형 이식 방향
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[50px] font-extrabold leading-[1.3] text-[#0f172a] break-keep mb-6">
                    뉴욕 허드슨야드 주요 성공 요소와 서울형 SBD 공간 대응 매핑
                </h2>

                {/* 중앙 컨텐츠 영역 */}
                <div className="w-full max-w-[1250px] mt-[10px] mb-[20px] border border-[#0f172a] bg-white p-5 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-[13px] md:text-[14.5px]">
                        <thead>
                            <tr className="border-b border-[#0f172a] text-[#0f172a] font-black bg-slate-50">
                                <th className="py-3 px-4 w-[30%]">허드슨야드 핵심 인프라 요소</th>
                                <th className="py-3 px-4 w-[70%]">서울형 SBD 로컬 적용 및 이식 방안</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mappings.map((item, idx) => (
                                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                                    <td className="py-3 px-4 font-bold text-[#0f172a] flex items-center">
                                        <span className="w-1.5 h-3 bg-[#2563eb] mr-2 inline-block"></span>
                                        {item.hy}
                                    </td>
                                    <td className="py-3 px-4 text-[#1e3a8a] font-semibold">{item.sbd}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>
                                뉴욕 허드슨야드 마스터플랜의 성공적인 핵심 인프라(조형물, 광장, 하이라인 연계)를 서울역 고가(서울로 7017) 및 남산 조망과 1대1 매핑하여 도입
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
