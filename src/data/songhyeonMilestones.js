export const milestoneStages = [
  {
    id: 0,
    code: 'G0',
    durationWeeks: 2,
    title: '기준선·근거 확보',
    shortTitle: '기준선',
    objective: '자산·공간·이용자·운영·관계의 확인 가능한 기준선을 구축합니다.',
    keyQuestion: '무엇을 사실로 알고 있으며, 어떤 정보가 아직 비어 있는가?',
    activities: [
      '최신 도면·면적표·운영자료의 기준일·출처·소유부서 확인',
      '동선·체류·공용·공개공간·현재 프로그램 현장 관찰',
      '입주사·기업·지역·공공·파트너 접점과 협의이력 목록화',
    ],
    evidence: ['자산·공간 원문', '운영현황 자료', '현장관찰 기록', '관계정보 원장'],
    outputs: ['근거 인벤토리', '현장 기준선', '미확인·충돌정보 목록'],
    responsible: ['기획추진센터', '공간솔루션센터', '자산·현장 지원조직'],
    accountable: '송현 BID TF',
    consulted: ['기업마케팅센터'],
    informed: ['서울시·공공기관'],
    external: ['자산·현장 지원조직'],
    gate: '공통 기준선 승인',
    gateDecision: 'G1 진입·보완·중단 결정',
    status: '현재',
  },
  {
    id: 1,
    code: 'G1',
    durationWeeks: 2,
    title: '문제·기회 정의 및 사전 인터뷰',
    shortTitle: '기회·인터뷰',
    objective: '현장 문제와 수요를 검증 가능한 기회영역으로 전환하고 실행주체의 현실조건을 학습합니다.',
    keyQuestion: '누구의 어떤 문제를 송현에서 실제로 검증할 가치가 있는가?',
    activities: [
      '이용자·입주사·지역의 반복 문제와 수요 신호 구조화',
      '복수 운영파트너 후보 대상 비구속 사전 인터뷰',
      '기업·지역·공공의 참여 가능 자원과 제약 확인',
    ],
    evidence: ['현장 문제근거', '이용자·기업 인터뷰', '운영파트너 비구속 인터뷰 메모'],
    outputs: ['기회영역 맵', '핵심 문제정의서', '실행조건 학습목록'],
    responsible: ['공간솔루션센터', '기업마케팅센터'],
    accountable: '송현 BID TF',
    consulted: ['기획추진센터', '복수 운영파트너 후보', '지역상권·지역조직'],
    informed: ['자산·현장 지원조직'],
    external: ['이용자', '기업파트너', '복수 운영파트너 후보'],
    gate: '우선 기회영역 선정',
    gateDecision: 'G2 진입·보완·중단 결정',
    status: '후속',
  },
  {
    id: 2,
    code: 'G2',
    durationWeeks: 2,
    title: '서비스 가설 설계',
    shortTitle: '서비스 가설',
    objective: '공간·콘텐츠·운영·참여를 하나의 검증 가능한 서비스 가설로 설계합니다.',
    keyQuestion: '어떤 이용자 경험과 운영방식이 문제를 해결할 수 있는가?',
    activities: [
      '타깃 이용자·사용상황·가치제안 설계',
      '공간·콘텐츠·서비스·데이터 흐름 통합',
      '가설별 성과지표와 실패판단 기준 정의',
    ],
    evidence: ['문제정의 근거', '수요 신호', '사례 적용조건', '현장 제약'],
    outputs: ['서비스 가설 카드', '이용자 여정', '초기 KPI·실패기준'],
    responsible: ['공간솔루션센터'],
    accountable: '송현 BID TF',
    consulted: ['기업마케팅센터', '기획추진센터', '콘텐츠 협력사 후보'],
    informed: ['자산·현장 지원조직'],
    external: ['이용자', '기업파트너', '콘텐츠 협력사 후보'],
    gate: '우선 실증 가설 승인',
    gateDecision: 'G3 진입·보완·중단 결정',
    status: '후속',
  },
  {
    id: 3,
    code: 'G3',
    durationWeeks: 3,
    title: '실행조건 검증',
    shortTitle: '실행조건',
    objective: '수요·공간·운영·원가·안전·제도조건을 함께 검증합니다.',
    keyQuestion: '가설을 현장에서 안전하고 지속가능하게 실행할 수 있는가?',
    activities: [
      '운영파트너 후보와 인력·동선·안전·품질·원가 실행성 공동검증',
      '기업·콘텐츠·지역 파트너의 참여조건 확인',
      '서울시·공공공간·인허가·공공성 관련 조건 확인',
    ],
    evidence: ['공간검토', '운영견적·인력안', '안전·시설조건', '참여의향·제약조건'],
    outputs: ['실행성 검증표', '원가·리스크 범위', '조건별 보완안'],
    responsible: ['공간솔루션센터', '기획추진센터'],
    accountable: '송현 BID TF',
    consulted: ['운영파트너 후보', '기업마케팅센터', '자산·현장 지원조직'],
    informed: ['서울시·공공기관'],
    external: ['운영파트너 후보', '서울시·공공기관', '기업·콘텐츠 협력사'],
    gate: '실행가능 가설 확정',
    gateDecision: 'G4 진입·보완·중단 결정',
    status: '후속',
  },
  {
    id: 4,
    code: 'G4',
    durationWeeks: 2,
    title: 'MVP·협력구조 확정',
    shortTitle: 'MVP·협력',
    objective: '최소 실행 패키지와 총괄 운영구조, 참여조건을 확정합니다.',
    keyQuestion: '무엇을 누구와 어느 범위까지 실행할 것인가?',
    activities: [
      'MVP 서비스·공간·기간·대상·성과범위 확정',
      '총괄 운영파트너와 콘텐츠 협력사 역할 구분',
      '기업·지역·공공 파트너의 참여모델·비용·책임 협의',
    ],
    evidence: ['실행성 검증결과', '파트너 제안조건', 'MVP 원가·일정안'],
    outputs: ['MVP 실행안 및 협력구조', '파트너 선정안', '참여조건·예산·KPI 안'],
    responsible: ['공간솔루션센터', '기획추진센터'],
    accountable: '송현 BID TF',
    consulted: ['기업마케팅센터', '총괄 운영파트너 후보', '콘텐츠 협력사'],
    informed: ['서울시·공공기관', '자산·현장 지원조직'],
    external: ['총괄 운영파트너 후보', '기업·콘텐츠·지역 파트너'],
    gate: 'MVP·파트너·주요조건 승인',
    gateDecision: 'G5 진입·보완·중단 결정',
    status: '후속',
  },
  {
    id: 5,
    code: 'G5',
    durationWeeks: 2,
    title: '최종 실행준비',
    shortTitle: '실행준비',
    objective: '현장 가동에 필요한 계약·인력·일정·안전·품질·데이터 조건을 완결합니다.',
    keyQuestion: '내일부터 실행해도 되는 수준으로 준비됐는가?',
    activities: [
      '실행합의·발주·보험·안전·시설·운영 SOP 확정',
      '현장 인력·일정·비상대응·품질관리 체계 점검',
      '이용자 안내·데이터 수집·성과보고 체계 준비',
    ],
    evidence: ['실행합의서', 'SOP·안전계획', '인력·일정표', '데이터 수집설계'],
    outputs: ['최종 실행계획', '역할·연락망', '운영 체크리스트', 'Go/No-Go 자료'],
    responsible: ['총괄 운영파트너', '공간솔루션센터'],
    accountable: '송현 BID TF',
    consulted: ['기획추진센터', '기업마케팅센터', '자산·현장 지원조직'],
    informed: ['서울시·공공기관', '참여 파트너'],
    external: ['총괄 운영파트너', '콘텐츠 협력사', '자산·현장 지원조직'],
    gate: '실증 Go/No-Go',
    gateDecision: 'G6 진입·보완·중단 결정',
    status: '후속',
  },
  {
    id: 6,
    code: 'G6',
    durationWeeks: 2,
    title: '실증·평가·학습',
    shortTitle: '실증·학습',
    objective: '현장 서비스와 이용자 경험을 측정하고 유지·보완·확대·중단을 판단합니다.',
    keyQuestion: '무엇이 실제로 작동했고 다음 적용을 위해 무엇을 바꿔야 하는가?',
    activities: [
      '총괄 운영파트너 중심 현장 서비스 실행',
      '이용행동·만족도·운영품질·원가·공공성 성과 측정',
      '공간솔루션센터 분석과 TF 유지·보완·확대·중단 판단',
    ],
    evidence: ['이용데이터', '운영일지', '만족도·민원', '원가·품질·안전 성과'],
    outputs: ['실증 성과보고', '개선안', '후속 적용조건', '표준계약·SOP 개선안'],
    responsible: ['총괄 운영파트너', '공간솔루션센터'],
    accountable: '송현 BID TF',
    consulted: ['기획추진센터', '기업마케팅센터', '이용자', '참여 파트너'],
    informed: ['서울시·공공기관', '자산·현장 지원조직'],
    external: ['이용자', '총괄 운영파트너', '기업·콘텐츠·지역 파트너'],
    gate: '유지·보완·확대·중단 판단',
    gateDecision: '후속 적용방향 결정',
    status: '후속',
  },
];

const SCHEDULE_YEAR = 2026;
const SCHEDULE_START_MONTH = 8;
const SCHEDULE_END_MONTH = 11;
const SCHEDULE_LABEL_COLUMN_WIDTH = 430;
const SCHEDULE_PERIOD_WIDTH = 48;

const stageByPeriod = milestoneStages.flatMap((stage) => Array(stage.durationWeeks).fill(stage));

const schedulePeriods = [
  ...[2, 3, 4].map((weekOfMonth) => ({ month: 8, weekOfMonth })),
  ...[9, 10, 11].flatMap((month) => [1, 2, 3, 4].map((weekOfMonth) => ({ month, weekOfMonth }))),
];

const augustPeriodDates = {
  2: { startDay: 10, endDay: 16 },
  3: { startDay: 17, endDay: 23 },
  4: { startDay: 24, endDay: 31 },
};

export const milestoneWeeks = schedulePeriods.map(({ month, weekOfMonth }, index) => {
  const daysInMonth = new Date(Date.UTC(SCHEDULE_YEAR, month, 0)).getUTCDate();
  const startDay = month === 8 ? augustPeriodDates[weekOfMonth].startDay : ((weekOfMonth - 1) * 7) + 1;
  const endDay = month === 8 ? augustPeriodDates[weekOfMonth].endDay : (weekOfMonth < 4 ? startDay + 6 : daysInMonth);
  const stage = stageByPeriod[index];
  const previousStagePeriods = stageByPeriod.slice(0, index).filter((item) => item.code === stage.code).length;
  const stagePeriodCount = stageByPeriod.filter((item) => item.code === stage.code).length;
  return {
    week: index + 1,
    stage: stage.code,
    stageTitle: stage.title,
    weekInStage: previousStagePeriods + 1,
    isGateWeek: previousStagePeriods === stagePeriodCount - 1,
    month,
    weekOfMonth,
    weekLabel: `${month}월 ${weekOfMonth}주`,
    startDate: `${SCHEDULE_YEAR}-${String(month).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`,
    endDate: `${SCHEDULE_YEAR}-${String(month).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`,
  };
});

const getSeoulDateParts = (date = new Date()) => Object.fromEntries(
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: 'numeric', day: 'numeric',
  }).formatToParts(date)
    .filter((part) => ['year', 'month', 'day'].includes(part.type))
    .map((part) => [part.type, Number(part.value)]),
);

export const getSonghyeonTodayMarker = (date = new Date()) => {
  const { year, month, day } = getSeoulDateParts(date);
  if (year !== SCHEDULE_YEAR || month < SCHEDULE_START_MONTH || month > SCHEDULE_END_MONTH) return null;
  const weekIndex = Math.min(3, Math.floor((day - 1) / 7));
  const weekOfMonth = weekIndex + 1;
  const adjustedWeekOfMonth = month === 8
    ? (day <= 16 ? 2 : day <= 23 ? 3 : 4)
    : weekOfMonth;
  const periodIndex = schedulePeriods.findIndex((period) => period.month === month && period.weekOfMonth === adjustedWeekOfMonth);
  if (periodIndex < 0) return null;
  const periodStartDay = month === 8 ? augustPeriodDates[adjustedWeekOfMonth].startDay : (weekIndex * 7) + 1;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const periodEndDay = month === 8 ? augustPeriodDates[adjustedWeekOfMonth].endDay : (weekIndex < 3 ? periodStartDay + 6 : daysInMonth);
  const periodProgress = (day - periodStartDay + 0.5) / (periodEndDay - periodStartDay + 1);
  return {
    dateLabel: `오늘 ${month}.${day}`,
    isoDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    periodIndex,
    left: SCHEDULE_LABEL_COLUMN_WIDTH + ((periodIndex + periodProgress) * SCHEDULE_PERIOD_WIDTH),
  };
};

export const milestoneTimelineRows = [
  ...milestoneStages.map((stage) => ({
    id: `TL-${stage.code}`,
    type: 'Gate',
    stage: stage.code,
    name: `${stage.code} ${stage.title}`,
    description: stage.gate,
    lead: stage.accountable,
    collaboration: stage.responsible,
    schedule: Object.fromEntries(milestoneStages.map((item) => [item.code, item.code === stage.code ? '◆' : null])),
  })),
  {
    id: 'TL-W01', type: 'Task', stage: 'G0', name: '근거·현장 기준선',
    description: '도면·운영자료·현장관찰·관계정보를 같은 기준으로 정리',
    lead: '기획추진센터', collaboration: ['공간솔루션센터', '자산·현장 지원조직'],
    schedule: { G0: '●', G1: '●' },
  },
  {
    id: 'TL-W02', type: 'Task', stage: 'G1', name: '문제·수요·사전 인터뷰',
    description: '이용자 문제와 복수 운영파트너 후보의 현실조건 확인',
    lead: '공간솔루션센터', collaboration: ['기업마케팅센터', '운영파트너 후보'],
    schedule: { G1: '●', G2: '●' },
  },
  {
    id: 'TL-W03', type: 'Task', stage: 'G2', name: '서비스·이용경험 가설',
    description: '공간·콘텐츠·서비스·데이터 흐름과 KPI 설계',
    lead: '공간솔루션센터', collaboration: ['기업마케팅센터', '기획추진센터'],
    schedule: { G2: '●', G3: '●' },
  },
  {
    id: 'TL-W04', type: 'Task', stage: 'G3', name: '실행성·공공조건 검증',
    description: '수요·원가·안전·시설·제도·공공성 조건 공동검증',
    lead: '공간솔루션센터', collaboration: ['기획추진센터', '운영파트너 후보'],
    schedule: { G3: '●', G4: '●' },
  },
  {
    id: 'TL-W05', type: 'Task', stage: 'G4', name: 'MVP·파트너·주요조건',
    description: '최소 실행범위·운영구조·참여조건·예산·KPI 확정',
    lead: '송현 BID TF', collaboration: ['공간솔루션센터', '기획추진센터'],
    schedule: { G4: '●', G5: '●' },
  },
  {
    id: 'TL-W06', type: 'Task', stage: 'G5', name: '현장 가동 준비',
    description: '계약·인력·일정·안전·품질·데이터·비상대응 완결',
    lead: '총괄 운영파트너', collaboration: ['공간솔루션센터', '자산·현장 지원조직'],
    schedule: { G5: '●', G6: '●' },
  },
  {
    id: 'TL-W07', type: 'Task', stage: 'G6', name: '서비스 실행·데이터 환류',
    description: '현장 서비스→이용자 경험→성과분석→TF 의사결정',
    lead: '총괄 운영파트너', collaboration: ['공간솔루션센터', '이용자'],
    schedule: { G6: '●' },
  },
];

export const responsibilityMatrix = [
  { id: 'RR-01', stage: 'G0', majorCategory: '근거', category: '자산·현장', task: '도면·면적·동선·운영자료 기준선', responsible: '자산·현장 지원조직', accountable: '송현 BID TF', consulted: ['공간솔루션센터', '기획추진센터'], informed: ['기업마케팅센터'], external: '자산 PM·FM·보안·미화', output: '출처·기준일 포함 근거 인벤토리', gatePoint: '미확인·충돌정보가 식별됐는가?' },
  { id: 'RR-02', stage: 'G1', majorCategory: '기회', category: '이용자·지역', task: '현장 문제·수요·기회영역 정의', responsible: '공간솔루션센터', accountable: '송현 BID TF', consulted: ['이용자', '지역상권·지역조직'], informed: ['기획추진센터'], external: '이용자·지역상권', output: '근거가 연결된 문제정의서', gatePoint: '검증할 가치가 있는 문제가 선정됐는가?' },
  { id: 'RR-03', stage: 'G1', majorCategory: '협력', category: '기업파트너', task: '기업 발굴·최초 접점·관계정보 인계', responsible: '기업마케팅센터', accountable: '송현 BID TF', consulted: ['공간솔루션센터'], informed: ['기획추진센터'], external: '기업파트너 후보', output: '관계 브리프·인계 기록', gatePoint: '참여자원과 다음 협의주체가 명확한가?' },
  { id: 'RR-04', stage: 'G1', majorCategory: '협력', category: '운영파트너', task: '복수 후보 비구속 사전 인터뷰', responsible: '공간솔루션센터', accountable: '송현 BID TF', consulted: ['기획추진센터'], informed: ['기업마케팅센터'], external: '운영파트너 후보', output: '현실조건·제약 학습목록', gatePoint: '선정 없이 실행조건을 충분히 학습했는가?' },
  { id: 'RR-05', stage: 'G2', majorCategory: '설계', category: '서비스·공간', task: '서비스·운영모델과 이용자 여정 설계', responsible: '공간솔루션센터', accountable: '송현 BID TF', consulted: ['기업마케팅센터', '콘텐츠 협력사 후보'], informed: ['자산·현장 지원조직'], external: '이용자·콘텐츠 협력사', output: '서비스 가설·이용자 여정·KPI', gatePoint: '가설과 실패기준이 검증 가능한가?' },
  { id: 'RR-06', stage: 'G3', majorCategory: '검증', category: '운영·원가', task: '인력·일정·안전·품질·원가 실행성 공동검증', responsible: '공간솔루션센터', accountable: '송현 BID TF', consulted: ['운영파트너 후보', '자산·현장 지원조직'], informed: ['기업마케팅센터'], external: '운영파트너 후보', output: '실행성 검증표·원가범위', gatePoint: '현장 실행과 지속가능성이 확인됐는가?' },
  { id: 'RR-07', stage: 'G3', majorCategory: '공공협력', category: '서울시·제도', task: '공공목표·정책·인허가·공공공간 조건 협의', responsible: '기획추진센터', accountable: '송현 BID TF', consulted: ['공간솔루션센터', '자산·현장 지원조직'], informed: ['기업마케팅센터'], external: '서울시·공공기관', output: '공공협력·실행조건 확인서', gatePoint: 'MVP에 영향을 주는 공공조건이 확인됐는가?' },
  { id: 'RR-08', stage: 'G4', majorCategory: '협력', category: 'MVP·파트너', task: 'MVP 범위·총괄 운영구조·참여조건 협의', responsible: '공간솔루션센터', accountable: '송현 BID TF', consulted: ['기획추진센터', '기업마케팅센터', '총괄 운영파트너 후보'], informed: ['서울시·공공기관'], external: '기업·운영·콘텐츠·지역 파트너', output: 'MVP 실행안 및 협력구조', gatePoint: '파트너·예산·KPI·주요조건을 승인할 수 있는가?' },
  { id: 'RR-09', stage: 'G5', majorCategory: '준비', category: '현장운영', task: '인력·일정·안전·품질·원가·비상대응 통합', responsible: '총괄 운영파트너', accountable: '송현 BID TF', consulted: ['공간솔루션센터', '자산·현장 지원조직'], informed: ['기획추진센터', '기업마케팅센터'], external: '콘텐츠 협력사', output: '최종 실행계획·SOP·현장 연락망', gatePoint: 'Go/No-Go 판단에 필요한 조건이 완결됐는가?' },
  { id: 'RR-10', stage: 'G5', majorCategory: '준비', category: '기업·콘텐츠', task: '참여기업·콘텐츠 실행조건 최종 정합화', responsible: '공간솔루션센터', accountable: '송현 BID TF', consulted: ['기업마케팅센터', '총괄 운영파트너'], informed: ['기획추진센터'], external: '기업·콘텐츠 협력사', output: '참여조건 확인서·실행합의', gatePoint: '현장운영 구조와 참여조건이 일치하는가?' },
  { id: 'RR-11', stage: 'G6', majorCategory: '실증', category: '서비스 실행', task: '이용자 대상 현장 서비스 제공', responsible: '총괄 운영파트너', accountable: '송현 BID TF', consulted: ['공간솔루션센터', '콘텐츠 협력사'], informed: ['기획추진센터', '기업마케팅센터'], external: '이용자', output: '운영일지·품질·안전·원가 데이터', gatePoint: '합의된 서비스와 운영기준이 실행됐는가?' },
  { id: 'RR-12', stage: 'G6', majorCategory: '평가', category: '데이터·학습', task: '이용데이터·만족도·개선요구 분석 및 TF 환류', responsible: '공간솔루션센터', accountable: '송현 BID TF', consulted: ['총괄 운영파트너', '이용자', '참여 파트너'], informed: ['서울시·공공기관', '자산·현장 지원조직'], external: '이용자·참여 파트너', output: '성과보고·개선안·후속 적용조건', gatePoint: '유지·보완·확대·중단을 판단할 근거가 있는가?' },
];

export const organizationDirectory = [
  { name: '송현 BID TF', role: '실증 가설·파트너·주요 조건·예산·KPI·단계 전환 최종 결정' },
  { name: '기획추진센터', role: '사업방향·서울시 협력·사업구조·주요 승인 지원' },
  { name: '공간솔루션센터', role: '서비스·운영모델 설계, 파트너 실무협의, 운영성과관리' },
  { name: '기업마케팅센터', role: '기업 발굴·최초 접점·관계정보 인계·후속 관계지원' },
  { name: '총괄 운영파트너', role: '현장 인력·일정·안전·품질·원가 통합 및 서비스 제공' },
  { name: '콘텐츠 협력사', role: 'F&B·리테일·문화예술·기획·기술 기반 콘텐츠 제공' },
  { name: '지역상권·지역조직', role: '지역수요·자원·상생 프로그램·콘텐츠 공동기획' },
  { name: '이용자', role: '이용·평가·행동데이터·만족도·개선 피드백 제공' },
];
