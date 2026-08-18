import React from 'react';

export default function TwinTree() {
  return (
    <div className="songhyeon-reference-dark p-10">
      <header className="mb-10 pb-6 border-b border-gray-300">
        <div className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase mb-4 rounded-sm">
          Core Asset & Amenity Hub
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">트윈트리 빌딩</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          더쿼드(THE QUAD) 멤버십 플랫폼의 핵심 어메니티 인프라를 제공하는 코어 오피스.
        </p>
      </header>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-gray-50 p-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">위치</h3>
          <p className="text-base font-semibold text-gray-900">서울특별시 종로구 율곡로</p>
        </div>
        
        <div className="bg-gray-50 p-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">규모</h3>
          <p className="text-base font-semibold text-gray-900">연면적 16,874평</p>
          <p className="text-xs text-gray-600 mt-1">B8 / 17F (A, B 2개동)</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white">
          <div className="p-4 bg-gray-100 border-b border-gray-300">
            <h2 className="text-base font-bold text-gray-900">Value-add 플랜 (어메니티 확충)</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-800 mb-6 leading-relaxed">
              케이트윈타워의 부족한 어메니티 공간을 트윈트리 빌딩의 리테일 밸류애드로 보완. 4개동 통합 멤버십(The Quad Membership) 사용자 대상 편의 시설 제공.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-2">B1F: 미쉐린 다이닝</h4>
                <p className="text-sm text-gray-700">
                  품격있는 접객을 위한 미쉐린 스타 다이닝. 약 100평 규모 (홀 공간 및 PDR 룸).
                </p>
              </div>
              <div className="bg-gray-50 p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-2">B2F: 피트니스 & 웰니스</h4>
                <p className="text-sm text-gray-700">
                  럭셔리 피트니스(에퀴녹스 등) 유치. 건강식 위주 그랩 푸드 바(Grab Food Healthy Bar) 입점.
                </p>
              </div>
              <div className="bg-gray-50 p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-2">B3F: 스파 특화</h4>
                <p className="text-sm text-gray-700">
                  리셉션, 스파, 락커룸 구비 프리미엄 휴식 공간 (아크힐스 스파 모델 벤치마킹).
                </p>
              </div>
              <div className="bg-gray-50 p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-2">1F/2F: F&B 및 커뮤니티</h4>
                <p className="text-sm text-gray-700">
                  1F: 베이커리 카페, 스페셜티 커피, 헬시 주스 바 등 라이프스타일 리테일.<br/>
                  2F: 멤버스 라운지, 미팅룸, 핫데스크 등 업무 지원 시설.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
