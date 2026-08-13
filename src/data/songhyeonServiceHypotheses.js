export const hypothesisPipeline = [
  {
    id: 'evidence',
    step: '01',
    title: '근거 확보',
    status: '현재',
    description: '자산·공간·이용·운영·참여관계의 직접 근거와 누락정보를 정리합니다.',
    gate: '출처·기준일·사실상태가 확인된 공통 기준선',
  },
  {
    id: 'opportunity',
    step: '02',
    title: '기회 정의',
    status: '후속',
    description: '장소·대상·시간대별 문제와 수요를 검증 가능한 기회로 구조화합니다.',
    gate: '직접 근거가 연결된 우선 기회영역',
  },
  {
    id: 'hypothesis',
    step: '03',
    title: '가설 등록',
    status: '후속',
    description: '대상·장소·경험·참여자원과 검증방법을 하나의 실행 가설로 등록합니다.',
    gate: '현장 실증 검토가 가능한 가설 카드',
  },
  {
    id: 'feasibility',
    step: '04',
    title: '실행성 검증',
    status: '후속',
    description: '운영주체·인력·원가·안전·절차·파트너 참여조건을 확인합니다.',
    gate: '최소 운영패키지와 실행조건 합의',
  },
  {
    id: 'pilot',
    step: '05',
    title: '실증·학습',
    status: '후속',
    description: '최소 범위로 운영하고 경험·참여·비용·이슈 데이터를 기록합니다.',
    gate: '유지·보완·확대·종료 판단',
  },
];

export const hypothesisRegistrationCriteria = [
  { id: 'problem', label: '장소 문제', requirement: '누가 어디에서 무엇을 경험하는지 직접 근거로 설명', required: true },
  { id: 'user', label: '대상 이용자', requirement: '시민·방문객·입주사·리테일 등 구체적 대상 지정', required: true },
  { id: 'place-time', label: '장소·시간', requirement: '운영 장소와 발생 시간대 또는 이용상황 지정', required: true },
  { id: 'evidence', label: '직접 근거', requirement: '현장관찰·인터뷰·운영자료·공개자료의 출처 연결', required: true },
  { id: 'experience', label: '검증 경험', requirement: '제공할 경험과 확인할 변화를 측정 가능한 문장으로 정의', required: true },
  { id: 'next-action', label: '다음 행동', requirement: '미확인 정보와 담당·확인방법을 지정', required: true },
];

export const hypothesisInputs = [
  {
    id: 'INPUT-01',
    title: '장소·공간 기준선',
    status: '근거 수집 중',
    factStatus: '미확인 정보 존재',
    sourceKey: 'G0-WS02-T01',
    evidence: '송현·인접 권역 자료, 자산 관계유형, 공용·공개공간 및 운영조건',
    nextAction: '자료별 출처·기준일·담당자를 확인하고 장소 단위로 연결',
  },
  {
    id: 'INPUT-02',
    title: '현장조사·인터뷰 질문',
    status: '작성 중',
    factStatus: '직접 근거 수집 전',
    sourceKey: 'G0-WS01-T05',
    evidence: '국내외 사례에서 도출한 장소 문제·운영조건·실패요인',
    nextAction: '송현 현장관찰과 이해관계자 인터뷰에 적용할 질문 확정',
  },
  {
    id: 'INPUT-03',
    title: '참여·운영 생태계',
    status: '관계 기준선 작성 중',
    factStatus: '참여의사 미확인',
    sourceKey: 'G0-WS03-T02',
    evidence: '입주사·기업·파트너의 현재 접점과 제공 가능 자원',
    nextAction: '확인된 관계·내부 검토·외부 협의 필요 상태를 구분',
  },
];

export const participationTracks = [
  {
    id: 'tenant-business',
    participant: '입주사·기업',
    possibleRole: '이용수요·참여자원·채널·파트너십 제공',
    factStatus: '현재 접점·수요 확인 전',
    nextCheck: '참여목적, 제공 가능 자원, 반복 참여 제약 확인',
  },
  {
    id: 'citizen-user',
    participant: '시민·방문객',
    possibleRole: '장소 이용경험과 서비스 수요의 직접 근거 제공',
    factStatus: '대상·시간대별 근거 부족',
    nextCheck: '동선·체류·불편·만족과 재이용 의향 관찰',
  },
  {
    id: 'retail',
    participant: '리테일·지역상권',
    possibleRole: '현장 운영정보·서비스 접점·지역 연계자원 제공',
    factStatus: '대상범위·참여조건 미확인',
    nextCheck: '운영시간, 현장 불편, 협업 관심사와 영향 확인',
  },
  {
    id: 'operator',
    participant: '콘텐츠·운영 파트너',
    possibleRole: '서비스 설계·현장인력·운영절차·전문역량 제공',
    factStatus: '필요역량 정의 전',
    nextCheck: '가설 확정 후 복수 후보의 역량·원가·참여조건 비교',
  },
];

export const hypothesisDecisionBoundaries = [
  { item: '멤버십·앱·패스·행사명', stage: '2단계 이후', reason: '장소 문제와 대상 이용자 근거를 확보한 뒤 서비스 가설로 검증' },
  { item: '운영주체·DMO·사무국', stage: '4단계 이후', reason: '선정 가설의 운영업무와 필요역량이 확인된 뒤 설계' },
  { item: '파트너 확정·계약구조', stage: '3–5단계', reason: '역할·원가·책임·참여조건 검증 후 확정' },
  { item: '최종 KPI·성과보상', stage: '3–5단계', reason: '가설별 측정항목과 데이터 수집 가능성을 확인한 뒤 설계' },
  { item: 'SBD 적용·확대 방식', stage: '6단계 이후', reason: '송현 실증의 장소·운영·협업조건을 축적한 뒤 검토' },
];

// 승인된 서비스 가설은 Stage 2 Gate를 통과한 뒤 이 레지스터에 추가합니다.
export const serviceHypotheses = [];
