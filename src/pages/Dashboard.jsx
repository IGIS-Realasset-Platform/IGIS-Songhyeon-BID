import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const assets = [
    { 
      name: '더케이트윈타워', 
      desc: 'CBD 내 최상의 입지, 코어 오피스', 
      path: '/assets/k-twin'
    },
    { 
      name: '트윈트리 빌딩', 
      desc: '리테일 특화 및 미쉐린 다이닝 밸류애드', 
      path: '/assets/twin-tree'
    },
    { 
      name: '쌈지길', 
      desc: '인사동의 상징적 로컬 크래프트 리테일', 
      path: '/assets/ssamzigil'
    },
    { 
      name: '안녕인사동', 
      desc: '복합 문화 공간 및 전시 리테일 거점', 
      path: '/assets/annyeong'
    },
    { 
      name: '신규 매입 중소자산 2개', 
      desc: '도화서길 블록 및 주변 추가 매집 타겟', 
      path: '/assets/new-assets'
    },
  ];

  return (
    <div className="p-10">
      <header className="mb-10 pb-6 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Songhyeon BID Asset Network
        </h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          인사동 권역 핵심 자산을 연결하여 거대한 문화·상업 생태계 구축 목표. SBD(Seoul Business District) BID의 핵심 작동 메커니즘을 기반으로 실제 구동되는 통합 타운 매니지먼트 실행안임.
        </p>
      </header>

      {/* 5 Core Assets */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Core Assets</h2>
        <div className="divide-y divide-gray-300 bg-gray-50">
          {assets.map((asset) => (
            <Link to={asset.path} key={asset.name} className="block hover:bg-gray-100 transition-colors">
              <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{asset.name}</h3>
                  <p className="text-sm text-gray-600">{asset.desc}</p>
                </div>
                <div className="text-sm font-medium text-blue-600">
                  자세히 보기 &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SBD Execution Mechanism Summary */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">SBD BID Execution Mechanism</h2>
          <Link to="/execution" className="text-sm font-medium text-blue-600 hover:underline">
            실행 계획 상세 &rarr;
          </Link>
        </div>

        <div className="divide-y md:divide-y-0 md:divide-x divide-gray-300 flex flex-col md:flex-row bg-gray-50">
          <div className="flex-1 p-6">
            <span className="text-2xl font-bold text-gray-300 mb-4 block">01</span>
            <h4 className="text-base font-bold text-gray-900 mb-2">System Plan & Financing</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              이지스 자체 고유자금 투입 및 외부 금융 구조화. 4개동 자산에 대한 단계별 매집 및 Value-add 펀드 기획 완료.
            </p>
          </div>
          <div className="flex-1 p-6">
            <span className="text-2xl font-bold text-gray-300 mb-4 block">02</span>
            <h4 className="text-base font-bold text-gray-900 mb-2">Development & Asset Repositioning</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              유휴 공간 리뉴얼, 프리미엄 리테일 유치. 도화서길 등 신규 자산 블록 리모델링 및 부티크 호텔/갤러리 신규 조성 계획.
            </p>
          </div>
          <div className="flex-1 p-6">
            <span className="text-2xl font-bold text-gray-300 mb-4 block">03</span>
            <h4 className="text-base font-bold text-gray-900 mb-2">Town Management (DMO)</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              디지털 트윈 기반 AI PM 도입. 전담 조직(DMO) 주도의 멤버십 플랫폼 및 아트 위크 등 문화 이벤트 운영.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
