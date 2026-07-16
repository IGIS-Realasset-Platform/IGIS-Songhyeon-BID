import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export default function ExecutionPlan() {
  const phases = [
    {
      id: 'Phase 1',
      title: 'Asset Due Diligence & Data Setup',
      status: 'in-progress',
      timeline: '자산별 데이터 수합',
      owner: '공간솔루션센터 / 투자팀',
      desc: '현재 웹사이트에 뼈대만 있는 5개 핵심 자산의 세부 데이터를 정밀 실사하여 셋업함.',
      tasks: [
        { name: '케이트윈/트윈트리: 도면, 임대차 현황, 어메니티 확충 물리적 여건 실사', done: false },
        { name: '쌈지길/안녕인사동: 트래픽 데이터 및 우수 로컬 테넌트 분석', done: false },
        { name: '신규 타겟(도화서길 등): 매도인 협상 동향 및 기초 타당성(Feasibility) 검토', done: false }
      ]
    },
    {
      id: 'Phase 2',
      title: 'Physical Repositioning & Value-Add',
      status: 'pending',
      timeline: '물리적 공간 기획',
      owner: '공간솔루션센터',
      desc: '자산 간 앵커 테넌트 배치 및 보행/조명 등 물리적 네트워크(동선) 연계안 마련.',
      tasks: [
        { name: '트윈트리 B1~B3 럭셔리 어메니티/다이닝 앵커 숏리스트 도출 및 LOI 타진', done: false },
        { name: '도화서길 블록 부티크 호텔 및 갤러리 클러스터 공간 레이아웃 기획', done: false },
        { name: 'THE QUAD ~ 송현광장 ~ 도화서길 보행 단절 구간 파악 및 웨이파인딩 계획 수립', done: false }
      ]
    },
    {
      id: 'Phase 3',
      title: 'Public-Private Partnership & DMO',
      status: 'pending',
      timeline: '민관 협력 및 조직 셋업',
      owner: '공간솔루션센터 / 경영진',
      desc: 'BID의 핵심인 서울시/종로구청과의 협업 구조 확립 및 DMO(타운매니지먼트 사무국) 발족.',
      tasks: [
        { name: '서울시 및 종로구청과의 "송현 BID 협의체" 공식 발족 및 행정 지원 논의', done: false },
        { name: '송현광장(이건희/공예박물관) 등 공공 인프라와 이지스 자산 간의 연계 방안 수립', done: false },
        { name: '인허가/지구단위계획 관련 공공기여(Public Contribution) 방안 및 조례 제정 협의', done: false },
        { name: '이지스자산운용 산하 DMO(타운매니지먼트 사무국) R&R 확립 및 예산안 마련', done: false }
      ]
    },
    {
      id: 'Phase 4',
      title: 'Digital & Culture Mechanism',
      status: 'pending',
      timeline: '소프트웨어 융합',
      owner: 'DMO / 공간솔루션센터',
      desc: '물리적 연결 위에 얹혀질 서비스 플랫폼과 문화 행사 기획.',
      tasks: [
        { name: 'The Quad 통합 멤버십 앱 핵심 기능 정의(출입/예약/결제) 및 시스템 연동', done: false },
        { name: '봄/가을 송현 Art Week 연간 캘린더 기획 및 전시 콘텐츠 수급', done: false }
      ]
    },
    {
      id: 'Phase 5',
      title: 'Financial Integration & Finalization',
      status: 'pending',
      timeline: '투자 구조화 및 보고',
      owner: '투자팀 / 경영진',
      desc: '총 소요 CAPEX 산출 및 펀드 구조화, 그리고 본 웹사이트를 통한 보고용 마스터플랜 완성.',
      tasks: [
        { name: '단계별 매입 자금 및 Value-add CAPEX 총괄 산출', done: false },
        { name: '유진그룹 등 LP 타겟 블라인드 펀드/리츠 구조화 및 Target IRR 시뮬레이션', done: false },
        { name: '확정된 모든 도면/모델/보고서를 본 웹사이트에 탑재 (경영진 보고용 오픈)', done: false }
      ]
    }
  ];

  return (
    <div>
      <header className="mb-10 pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Songhyeon BID Work Plan</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          공간솔루션센터 및 연관 조직이 마스터플랜을 완성하기 위해 실행해야 할 상세 업무 로드맵임.
        </p>
      </header>

      <div className="space-y-6">
        {phases.map((phase) => (
          <div key={phase.id} className="bg-gray-50 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900 bg-white px-2 py-1">{phase.id}</span>
                <span className="text-base font-semibold text-gray-900">{phase.title}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 md:mt-0 text-sm text-gray-600 bg-white px-3 py-1">
                <span>{phase.timeline}</span>
                <span className="text-gray-300">|</span>
                <span>{phase.owner}</span>
              </div>
            </div>
            
            <div className="bg-white p-6">
              <p className="text-sm text-gray-800 mb-6 font-medium">{phase.desc}</p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Key Action Items</h4>
                {phase.tasks.map((task, tIdx) => (
                  <div key={tIdx} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {task.done ? (
                        <CheckCircle2 size={16} className="text-blue-600" />
                      ) : (
                        <Circle size={16} className="text-gray-400" />
                      )}
                    </div>
                    <span className={`text-sm ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {task.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
