import React from 'react';

export default function NewAssets() {
  return (
    <div className="p-10">
      <header className="mb-10 pb-6 border-b border-gray-300">
        <div className="inline-block px-2 py-1 bg-gray-200 text-gray-800 text-xs font-bold uppercase mb-4 rounded-sm">
          Value-Add Target
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">신규 매입 중소자산 2개 (TBD)</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          도화서길 블록 개발 및 Songhyeon Art Triangle 완성을 위한 추가 매입 타겟.
        </p>
      </header>

      {/* Draft Warning */}
      <div className="bg-yellow-50 border border-yellow-300 p-4 mb-10 text-sm">
        <h3 className="font-bold text-gray-900 mb-1">타당성 검토 진행 중 (Under Review)</h3>
        <p className="text-gray-700">
          현재 대상 자산 선별 및 블록 매집(Small Lot) 타당성 검토 단계임. 확정 시 본 페이지에 상세 제원 및 건축 계획 업데이트 예정.
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-white">
          <div className="p-4 bg-gray-100 border-b border-gray-300">
            <h2 className="text-base font-bold text-gray-900">도화서길 블록 밸류애드 전략</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-800 mb-6 leading-relaxed">
              송현 Art Triangle 핵심 앵커인 **'Culture Hub (도화서길)'** 조성을 위해, 소규모 필지 단계적 확보를 통한 문화 클러스터 리모델링 기획.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-2">Target 1: 부티크 호텔 앵커</h4>
                <p className="text-sm text-gray-700 mb-1">30~50실 규모 하이엔드 부티크 호텔.</p>
                <p className="text-xs text-gray-500">예: Ace Hotel, 로컬 럭셔리 브랜드 유치 등</p>
              </div>
              <div className="bg-gray-50 p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-2">Target 2: 갤러리 및 F&B</h4>
                <p className="text-sm text-gray-700 mb-1">삼청동/인사동 갤러리 이전 유치 및 4~6개 큐레이션 다이닝.</p>
                <p className="text-xs text-gray-500">도심에서 머물고 소비하는 문화 클러스터 조성</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
