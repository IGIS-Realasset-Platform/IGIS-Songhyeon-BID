import React from 'react';

export default function Membership() {
  return (
    <div className="p-10">
      <header className="mb-10 pb-6 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Membership & Placemaking</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          THE QUAD 임차인을 위한 하드웨어 연계 어메니티 및 송현 Culture Pass를 활용한 지역 소프트웨어 융합 계획안.
        </p>
      </header>

      {/* The Quad Membership */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-4">The Quad Membership Platform</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-2">통합 출입 & 예약</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              4개 오피스동 모바일 통합 출입. 회의실, 라운지, 웰니스 시설 실시간 예약 및 결제 시스템 연동 지원.
            </p>
          </div>
          <div className="bg-gray-50 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-2">F&B 리테일 혜택</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              단지 내 미쉐린 다이닝, 글로벌 스페셜티 커피 등 F&B 브랜드 독점 할인 및 제휴 프로모션 제공.
            </p>
          </div>
          <div className="bg-gray-50 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-2">비즈니스 커뮤니티</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              임직원 대상 네트워킹 이벤트, 원데이 클래스 신청 등 상위 비즈니스 커뮤니티 구축.
            </p>
          </div>
        </div>
      </section>

      {/* Placemaking & DMO */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Placemaking: Songhyeon Art Triangle</h2>
        
        <div className="bg-gray-50 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-300">
          <div className="md:w-1/3 p-8 bg-gray-100 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Songhyeon Culture Pass</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              더쿼드 임차인에게 발급되는 아트 패스로, 도화서길 갤러리 및 공공 미술관 혜택 통합 제공.
            </p>
          </div>
          <div className="md:w-2/3 p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gray-900 font-bold mb-2">시즌 페스티벌 (연 2회)</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                봄/가을 '송현 Art Week' 및 'Craft Week' 개최. 야간 거점 활성화를 위한 'Art Night' 기획.
              </p>
            </div>
            <div>
              <h4 className="text-gray-900 font-bold mb-2">보행 네트워크 연계</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                THE QUAD 코트야드에서 도화서길로 진입하는 보행 친화적 사인 및 조명 시스템 개선.
              </p>
            </div>
            <div className="sm:col-span-2 mt-2 pt-6 border-t border-gray-300">
              <h4 className="text-gray-900 font-bold mb-2">IGIS as District Curator (DMO)</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                이지스자산운용이 사무국 역할을 맡아 미술관, 박물관, 쌈지길을 잇는 연합체 구축. 통합 마케팅(BI, MAP, 웹사이트) 주도.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
