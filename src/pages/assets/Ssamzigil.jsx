import React from 'react';

export default function Ssamzigil() {
  return (
    <div className="p-10">
      <header className="mb-10 pb-6 border-b border-gray-300">
        <div className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold uppercase mb-4 rounded-sm">
          Craft & Local Anchor
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">쌈지길</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          지역성과 소비를 연결하는 로컬 크래프트의 중심지.
        </p>
      </header>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-gray-50 p-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">위치</h3>
          <p className="text-base font-semibold text-gray-900">서울특별시 종로구 인사동길</p>
        </div>
        
        <div className="bg-gray-50 p-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">운영 상태</h3>
          <p className="text-base font-semibold text-gray-900">이지스자산운용 펀드 편입·운영 중</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white">
          <div className="p-4 bg-gray-100 border-b border-gray-300">
            <h2 className="text-base font-bold text-gray-900">Songhyeon Art Triangle 연계 전략</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-800 mb-6 leading-relaxed">
              광화문 코어 오피스(THE QUAD) 임직원에게 로컬 콘텐츠와 문화를 제공하는 <strong>'Craft Hub'</strong> 역할 수행.
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-4 items-start">
                <span className="text-gray-900 font-bold w-8">01</span>
                <div>
                  <h4 className="text-gray-900 font-bold mb-1">로컬 앵커 브랜딩</h4>
                  <p className="text-gray-700">도화서길 시그니처 다이닝/갤러리와 연동. 쌈지길 내 우수 로컬 브랜드 스케일업(Scale-up) 지원.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-gray-900 font-bold w-8">02</span>
                <div>
                  <h4 className="text-gray-900 font-bold mb-1">멤버십 및 트래픽 유입</h4>
                  <p className="text-gray-700">The Quad 멤버십 및 Songhyeon Culture Pass를 통한 프로모션 전개. 오피스 상주 인구를 주말/야간 리테일 소비로 유도.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
