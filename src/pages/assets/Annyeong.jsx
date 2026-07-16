import React from 'react';

export default function Annyeong() {
  return (
    <div className="p-10">
      <header className="mb-10 pb-6 border-b border-gray-300">
        <div className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold uppercase mb-4 rounded-sm">
          Retail & Culture
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">안녕인사동</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          전시, 체험, 리테일이 결합된 인사동 복합 문화 상업 시설.
        </p>
      </header>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-gray-50 p-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">위치</h3>
          <p className="text-base font-semibold text-gray-900">서울특별시 종로구 인사동길</p>
        </div>
        
        <div className="bg-gray-50 p-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">기능</h3>
          <p className="text-base font-semibold text-gray-900">복합 문화 상업 시설 (전시관, 리테일, F&B)</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white">
          <div className="p-4 bg-gray-100 border-b border-gray-300">
            <h2 className="text-base font-bold text-gray-900">연계 시너지 플랜</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-800 mb-6 leading-relaxed">
              쌈지길과 함께 인사동 축 주요 집객 앵커 역할 수행. 아트 디스트릭트 활성화를 위한 문화 콘텐츠 교류 예정.
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-4 items-start">
                <span className="text-gray-900 font-bold w-4">•</span>
                <div>
                  <h4 className="text-gray-900 font-bold mb-1">전시 인프라 연계</h4>
                  <p className="text-gray-700">안녕인사동 내 기획 전시를 Songhyeon Culture Pass 라인업에 편입. 통합 마케팅 전개.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-gray-900 font-bold w-4">•</span>
                <div>
                  <h4 className="text-gray-900 font-bold mb-1">인사동 문화 축제 연동</h4>
                  <p className="text-gray-700">Art Week, Craft Week 진행 시 거점 공간으로 활용함.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
