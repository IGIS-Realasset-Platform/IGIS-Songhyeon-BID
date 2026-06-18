import React, { useState } from 'react';

export default function Section42({ isActive }) {
    const [step, _setStep] = useState(20);
    const setStep = () => {};

    return (
        <section className="section w-full h-full bg-[#ffffff] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">
                        SBD의 공공 기여와 보행
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep tracking-[-0.02em] mb-4">
                    개발 이익을 녹지와 보행 인프라로 연결하는 기부채납 플레이스메이킹
                </h2>

                {/* 중앙 콘텐츠 (직사각형 박스, 네이비/블루 계열) */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[36px] flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    
                    {/* 좌측 박스: 축구장 크기 대규모 공개녹지 (7,000㎡) */}
                    <div className="flex-[1] bg-white border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-sm">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-[#0f172a] font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Mega Public Green Space
                                </div>
                                <div className="text-gray-500 font-bold text-[18px] mb-6">
                                    도심 속 생태 숲과 잔디광장 조성
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 flex-1 mb-6">
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🌳 7,000㎡ 숲 광장: 고층 타워 하부 면적의 상당 부분을 전면 개방하여 녹지 네트워크 구축
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🍃 바람길 설계: 남산으로부터 시원한 바람이 도심 내부로 흐르도록 건물 배치 유도
                                </div>
                                <div className="bg-gray-100 border border-gray-300 p-4 flex flex-col justify-center font-bold text-[#0f172a] text-[16px]">
                                    🎨 오픈 스테이지: 시민 누구나 휴식 및 거리 공연을 할 수 있는 상설 야외 데크 제공
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측 박스: 남산 보행길 연결 설계 (서울역-남산) */}
                    <div className="flex-[1] bg-[#0f172a] border-4 border-[#0f172a] rounded-none p-8 flex flex-col justify-between shadow-md">
                        <div className="text-left flex flex-col h-full">
                            <div>
                                <div className="text-white font-black text-[24px] md:text-[28px] mb-2 uppercase">
                                    Namsan Walkway Connection
                                </div>
                                <div className="text-[#93c5fd] font-bold text-[18px] mb-6">
                                    서울역 8번출구에서 남산 정상까지 보행 단절 해소
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 flex-1 mb-6">
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚇 입체 지하 연결: 서울역 환승 센터 지하 광장과 단지 내부 전용 엘리베이터 연계</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🚶‍♂️ 에스컬레이터 보행로: 노약자도 힘들이지 않고 남산 초입까지 갈 수 있는 공공 에스컬레이터 설치</span>
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 font-bold text-white flex justify-between items-center text-[16px]">
                                    <span>🌉 공중 보행 데크: 서울로 7017 및 힐튼 양동 구역의 공중 정원을 가교로 직접 브릿지 연결</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 최하단 텍스트 */}
                <div className="mt-[10px] max-w-[1100px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#0f172a]">▪</span>
                            <span>"남산을 시민에게"라는 슬로건 아래, 민간 개발의 성과를 거대한 공공 인프라 개선 및 녹지 공유로 승화시킴으로써 서울시 공공 심의와 완벽한 조화를 달성했습니다.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
