export const projectContext = {
  name: '송현 BID 프로젝트',
  positioning: '송현 일대의 플레이스메이킹·에리어매니지먼트 환경을 구축하는 1차 실증 프로젝트',
  coreValue: '자산·공간·입주사·파트너가 지속적으로 연결되는\n플레이스메이킹·에리어매니지먼트 환경 구축',
  definition:
    '현재 단계는 자산·공간·관계의 사실을 같은 기준으로 정리하고, 장소의 문제와 운영기회를 논의할 수 있는 공통 근거를 만드는 과정입니다.',
  cityCollaboration: {
    owner: '기획추진실',
    scope: '전담 업무흐름',
    role: 'BID 제도·운영모델과 서울시 협의조건을 정리하여 TF의 장소·운영 실증을 지원합니다.',
  },
  currentStage: {
    id: 0,
    code: '0단계',
    name: '근거기반 구축',
    objective: '공간·자산·이용자·운영자료의 확인 가능한 기준선을 구축합니다.',
  },
  nextGate: '1단계 현장기회 정의',
  operatingPrinciples: [
    '확인된 사실과 내부 검토사항을 분리합니다.',
    '조직별 원천 제안은 출처를 유지한 채 장소·운영기회로 연결합니다.',
    '상세 거버넌스·계약·SBD 전이는 실증조건이 확인된 이후 구체화합니다.',
  ],
  axes: [
    {
      id: 'asset',
      label: '근거 축 A',
      title: '자산·공간·운영 기준선',
      description: '물리 조건, 운영 현황, 공용·공개공간, 동선과 이용접점의 최신성과 출처를 정리합니다.',
    },
    {
      id: 'relationship',
      label: '근거 축 B',
      title: '참여·협업 기반',
      description: '입주사, 이용자, 기업 네트워크, 콘텐츠·운영 파트너의 현재 관계와 참여 가능성을 구분합니다.',
    },
  ],
};

export const stages = [
  {
    id: 0,
    title: '근거기반 구축',
    short: '자산·공간·운영·관계 사실 정리',
    gate: '공통 기준선 승인',
    status: '현재',
  },
  {
    id: 1,
    title: '현장기회 정의',
    short: '장소 문제와 운영기회 구조화',
    gate: '기회영역 선정',
    status: '후속',
  },
  {
    id: 2,
    title: '플레이스메이킹 가설',
    short: '공간·콘텐츠·참여 경험 가설 설계',
    gate: '실증 가설 승인',
    status: '후속',
  },
  {
    id: 3,
    title: '서비스·운영 실행성',
    short: '수요·원가·공간·운영조건 검증',
    gate: '실증 후보 확정',
    status: '후속',
  },
  {
    id: 4,
    title: '에리어매니지먼트 환경',
    short: '운영주체·파트너·자원 연결방식 설계',
    gate: '운영환경 합의',
    status: '후속',
  },
  {
    id: 5,
    title: '실증 준비·정합화',
    short: '실행안·협업조건·대외조건 정리',
    gate: '실증 준비 완료',
    status: '후속',
  },
  {
    id: 6,
    title: '실증·학습',
    short: '장소·운영 성과와 전이조건 축적',
    gate: '후속 적용성 검토',
    status: '후속',
  },
];

export const evidenceCategories = [
  {
    id: 'space',
    category: '자산·공간',
    scope: '경계, 면적, 동선, 공용·공개공간, 가동 조건',
    count: '집계 전',
    factStatus: '자료 목록화 필요',
    nextAction: '자산별 최신 도면·면적표·운영현황의 기준일과 소유부서를 확인합니다.',
  },
  {
    id: 'operations',
    category: '운영 현황',
    scope: '현재 프로그램, 시설운영, 이용자 접점, 운영주체',
    count: '집계 전',
    factStatus: '현행 상태 확인 필요',
    nextAction: '운영자료와 현장 인터뷰를 대조해 실제 운영 흐름을 기록합니다.',
  },
  {
    id: 'stakeholders',
    category: '이해관계자',
    scope: '이지스, 자산, 입주사, 서울시, 지역·파트너',
    count: '집계 전',
    factStatus: '관계 맵 초안',
    nextAction: '현재 접점·담당자·협의 이력을 확인하고 관계상태를 구분합니다.',
  },
  {
    id: 'operating-conditions',
    category: '운영환경·제도조건',
    scope: '장소운영 제약, 공공성, 인허가·협의 필요조건',
    count: '집계 전',
    factStatus: '실행조건 확인 필요',
    nextAction: '공간·운영 가설에 영향을 주는 제도조건을 구분하고, 서울시 관련 확인은 기획추진실 업무흐름으로 정리합니다.',
  },
  {
    id: 'users',
    category: '입주사·이용자',
    scope: '이용행태, 불편, 수요 신호, 참여 가능성',
    count: '집계 전',
    factStatus: '직접 근거 부족',
    nextAction: '확인 가능한 이용데이터와 인터뷰 대상을 정의합니다.',
  },
  {
    id: 'cases',
    category: '국내외 사례',
    scope: '운영모델, 협력방식, 재원, 성과지표, 전이 가능 조건',
    count: '집계 전',
    factStatus: '참고자료 분류 필요',
    nextAction: '유사성보다 적용조건 중심으로 사례 근거를 재분류합니다.',
  },
];

export const assetBaseline = [
  {
    id: 'ktwin',
    name: '더케이트윈타워',
    area: '광화문·송현 연계권역',
    relationType: '검토 연계자산',
    factStatus: '내부자료 확인 필요',
    asOf: '2026.07.29',
    source: '기존 웹사이트 자산 페이지',
    path: '/assets/k-twin',
  },
  {
    id: 'twintree',
    name: '트윈트리타워',
    area: '광화문·송현 인접권역',
    relationType: '인접 연계자산',
    factStatus: '관계유형 확인 필요',
    asOf: '2026.07.29',
    source: '기존 웹사이트 자산 페이지',
    path: '/assets/twin-tree',
  },
  {
    id: 'ssamzigil',
    name: '쌈지길',
    area: '인사동·송현 보행권역',
    relationType: '상권·콘텐츠 연계자산',
    factStatus: '운영현황 확인 필요',
    asOf: '2026.07.29',
    source: '기존 웹사이트 자산 페이지',
    path: '/assets/ssamzigil',
  },
  {
    id: 'annyeong',
    name: '안녕인사동',
    area: '인사동·송현 보행권역',
    relationType: '상권·콘텐츠 연계자산',
    factStatus: '운영현황 확인 필요',
    asOf: '2026.07.29',
    source: '기존 웹사이트 자산 페이지',
    path: '/assets/annyeong',
  },
  {
    id: 'dohwaseo',
    name: '도화서길',
    area: '인사동·송현 보행권역',
    relationType: '보행·장소 연계 후보',
    factStatus: '대상범위 확인 필요',
    asOf: '2026.07.29',
    source: '기존 웹사이트 자산 페이지',
    path: '/assets/new-assets',
  },
];

export const immediateBacklog = [
  {
    id: 'data',
    priority: 'P0',
    title: '장소·운영 근거 확보',
    description: '0단계 종료 판단과 플레이스메이킹 기회 탐색에 필요한 최신 원문과 현장사실을 확보합니다.',
    items: [
      {
        title: '자산·공간 자료 인벤토리',
        owner: '기획추진실 + 자산 담당',
        requiredData: '최신 도면, 면적표, 운영자료, 기준일, 소유부서',
        nextAction: '자료별 보유 여부와 최신성 확인',
        completionEvidence: '출처·기준일·담당자가 포함된 자료목록',
      },
      {
        title: '현장 이용·운영 흐름 확인',
        owner: '공간솔루션센터 + 자산 담당',
        requiredData: '동선, 체류, 운영주체, 프로그램, 이용자 접점',
        nextAction: '현장관찰 항목과 인터뷰 질문 확정',
        completionEvidence: '장소별 이용흐름·운영제약·미확인정보 목록',
      },
    ],
  },
  {
    id: 'ecosystem',
    priority: 'P1',
    title: '참여·운영 생태계 기준선',
    description: '입주사·기업·파트너의 현재 관계와 참여 가능성을 분리해 에리어매니지먼트 환경의 출발점을 만듭니다.',
    items: [
      {
        title: '조직별 기여역량 맵',
        owner: '기획추진실 + 참여조직',
        requiredData: '조직별 원천 제안, 보유역량, 현장접점, 필요 선행조건',
        nextAction: '기업마케팅·공간솔루션·기획추진 관점을 출처별 정리',
        completionEvidence: '공동 기여영역과 전담업무가 분리된 역할 기준선',
      },
      {
        title: '입주사·기업·파트너 관계 맵',
        owner: '기업마케팅센터 + 공간솔루션센터',
        requiredData: '현재 접점, 참여목적, 제공 가능 자원, 확인 필요사항',
        nextAction: '기존 네트워크와 잠재 파트너를 사실상태별 분류',
        completionEvidence: '참여 가능성·접점·다음 확인행동이 연결된 생태계 목록',
      },
    ],
  },
  {
    id: 'next',
    priority: 'P2',
    title: '현장기회 정의 준비',
    description: '근거가 충분히 쌓인 항목부터 장소의 문제와 운영기회 질문으로 전환합니다.',
    items: [
      {
        title: '장소·운영 기회 질문 목록',
        owner: '공간솔루션센터 + 참여조직',
        requiredData: '반복되는 문제, 체류·이동 패턴, 이용자 수요 신호, 공간·운영 제약',
        nextAction: '해결책이 아닌 검증 가능한 질문 형태로 작성',
        completionEvidence: '근거 링크가 연결된 현장기회 질문 목록',
      },
      {
        title: '0단계 종료 검토',
        owner: '기획추진실',
        requiredData: '근거목록, 누락정보, 충돌정보, 소유자 확인',
        nextAction: '종료기준 충족 여부와 잔여 리스크 점검',
        completionEvidence: '1단계 진입 의사결정 메모',
      },
    ],
  },
];

export const ecosystemGroups = [
  {
    id: 'igis',
    name: '이지스 내부',
    role: '사업 방향, 장소기획, 기업 네트워크, 자산정보의 연결',
    participants: ['기획추진실', '기업마케팅센터', '공간솔루션센터', '자산 담당조직'],
    factStatus: '기여역량·선행조건 확인 중',
  },
  {
    id: 'assets',
    name: '자산·장소',
    role: '공간·운영 사실과 현장 제약 제공',
    participants: ['자산별 운영주체', '공용·공개공간', '보행·이동 접점', '현장 운영자'],
    factStatus: '장소별 기준선 확인 필요',
  },
  {
    id: 'users',
    name: '입주사·기업·이용자',
    role: '수요 신호, 참여자원, 지속적 이용기반 제공',
    participants: ['입주사', '임직원', '방문자', '기업 네트워크'],
    factStatus: '현재 접점·참여 가능성 확인 필요',
  },
  {
    id: 'partners',
    name: '콘텐츠·운영 파트너',
    role: '장소경험과 에리어 운영에 필요한 실행역량 제공',
    participants: ['콘텐츠 파트너', '식음·리테일', '문화기관', '운영·기술 파트너'],
    factStatus: '필요역량 정의 전',
  },
];

export const organizationRoles = [
  {
    organization: '공간솔루션센터',
    sharedContribution: '플레이스메이킹·에리어매니지먼트 환경 설계 리드',
    responsibilities: [
      '장소별 이용·운영 현황과 공간 제약 확인',
      '공간·콘텐츠·서비스 가설 및 현장 실증안 설계',
      '운영 파트너 필요역량과 실행조건 검증',
    ],
  },
  {
    organization: '기업마케팅센터',
    sharedContribution: '입주사·기업 네트워크와 참여 기반 구축',
    responsibilities: [
      '기업·입주사 접점과 참여수요 확인',
      '기업 네트워크가 제공할 수 있는 자원·콘텐츠·파트너십 발굴',
      '서비스 가설에 대한 참여자 피드백과 협업 가능성 검증',
    ],
  },
  {
    organization: '기획추진실',
    sharedContribution: 'TF 비전 얼라인먼트·사업구조·실행관리',
    responsibilities: [
      'BID 제도·운영모델과 단계별 의사결정 기준 설계',
      '서울시 및 공공부문 협의조건 정리와 협력관계 구축',
      '실증 성과의 SBD 전이조건과 사업 적용성 검토',
    ],
  },
  {
    organization: '자산·운영 담당조직',
    sharedContribution: '자산·운영 원천정보와 현장 실행기반 제공',
    responsibilities: [
      '도면·운영자료·임대차·시설조건의 최신 원문 제공',
      '현장 운영자·입주사 접점 지원',
      '실증 후보의 자산운영 영향과 실행 가능성 검토',
    ],
  },
];

export const workPlanPhases = [
  {
    id: 'WP-00',
    stage: '0단계',
    title: '근거·장소 기준선',
    track: 'TF 공동',
    owner: '기획추진실 + 공간솔루션센터 + 자산 담당',
    status: '진행',
    objective: '자산·공간·이용자·운영의 확인 가능한 기준선과 누락정보를 구축합니다.',
    tasks: [
      '자산별 도면·면적·운영자료의 출처·기준일·담당자 정리',
      '동선·체류·이용접점·현재 프로그램의 현장 관찰',
      '입주사·기업·파트너 관계와 보유자원의 사실상태 구분',
    ],
    gate: '공통 기준선과 현장기회 질문의 근거 연결',
  },
  {
    id: 'WP-01',
    stage: '1단계',
    title: '현장기회 정의',
    track: 'TF 공동',
    owner: '공간솔루션센터 리드 + 참여조직',
    status: '후속',
    objective: '장소별 문제·수요·운영공백을 검증 가능한 기회영역으로 구조화합니다.',
    tasks: [
      '장소별 반복 문제와 이용자 수요 신호 정리',
      '입주사·기업 네트워크의 참여목적과 제공 가능 자원 확인',
      '공간·운영 제약을 반영한 우선 기회영역 선정',
    ],
    gate: '근거가 연결된 기회영역 선정',
  },
  {
    id: 'WP-02',
    stage: '2단계',
    title: '플레이스메이킹 가설',
    track: 'TF 공동',
    owner: '공간솔루션센터 + 기업마케팅센터',
    status: '후속',
    objective: '공간·콘텐츠·참여 경험을 결합한 플레이스메이킹 가설을 설계합니다.',
    tasks: [
      '대상·문제·제안가치·이용경험을 한 단위로 정의',
      '기업·입주사·파트너의 참여방식과 필요한 자원 검증',
      '가설별 장소조건·운영조건·검증방법 정리',
    ],
    gate: '현장 실증이 가능한 가설 승인',
  },
  {
    id: 'WP-03',
    stage: '3–4단계',
    title: '에리어매니지먼트 운영환경',
    track: 'TF 공동 핵심',
    owner: 'TF 공동',
    status: '후속',
    objective: '개별 프로그램을 넘어 장소·자산·참여자·파트너가 지속적으로 연결되는 운영환경을 설계합니다.',
    tasks: [
      '서비스 가설의 수요·원가·공간·운영 실행성 검증',
      '장소 간 연계, 공용자원 활용, 운영 파트너 필요역량 정의',
      '역할·운영주기·정보흐름·성과학습 구조의 실증안 설계',
    ],
    gate: '실증 가능한 운영환경과 협업조건 합의',
  },
  {
    id: 'WP-04A',
    stage: '5단계',
    title: '실증 준비·운영 정합화',
    track: 'TF 공동',
    owner: '공간솔루션센터 + 기획추진실 + 참여조직',
    status: '후속',
    objective: '선정 가설의 실행안·운영주체·파트너·자원·검증방법을 실증 가능한 수준으로 정합화합니다.',
    tasks: [
      '실증 범위·일정·운영자원·현장영향 확정',
      '파트너 역할과 정보공유·이슈 대응 방식 합의',
      '장소경험·운영성·참여성과를 함께 보는 검증항목 설정',
    ],
    gate: '현장 실증 준비 완료',
  },
  {
    id: 'WP-04B',
    stage: '5단계 지원축',
    title: 'BID·대외 정합화',
    track: '기획추진 전담',
    owner: '기획추진실',
    status: '후속',
    objective: 'TF가 설계한 장소·운영 실증에 필요한 BID 제도·공공 협의조건을 별도 업무흐름으로 정리합니다.',
    tasks: [
      'BID 운영모델과 공공–민간 역할 검토',
      '서울시 협의 필요사항·정책 정합성·시민수용성 질문 정리',
      '실증결과를 향후 SBD에 적용하기 위한 전이조건 기록',
    ],
    gate: '실증에 필요한 대외조건과 후속 협의안 정리',
  },
  {
    id: 'WP-05',
    stage: '6단계',
    title: '실증·학습·전이조건',
    track: 'TF 공동',
    owner: 'TF 공동',
    status: '후속',
    objective: '장소·운영 실증을 수행하고 효과·비용·협업방식·전이조건을 축적합니다.',
    tasks: [
      '현장 운영과 이용자·입주사·파트너 반응 기록',
      '장소경험·운영원가·참여성과·공공성 검증',
      '유지·보완·중단 판단과 후속 적용조건 정리',
    ],
    gate: '후속 확대 여부와 적용조건 검토',
  },
];

export const caseInsights = [
  {
    principle: '장소의 실제 문제에서 시작',
    implication: '프로그램을 먼저 정하지 않고 이동·체류·이용·운영의 반복 문제와 기회를 확인합니다.',
  },
  {
    principle: '참여자원을 운영환경으로 연결',
    implication: '입주사·기업·파트너의 개별 참여를 일회성 이벤트가 아닌 지속 가능한 관계와 운영주기로 설계합니다.',
  },
  {
    principle: '역할은 실증을 통해 구체화',
    implication: '초기부터 상세 거버넌스를 확정하지 않고, 장소·서비스 가설과 실행조건을 확인한 뒤 역할을 설계합니다.',
  },
  {
    principle: '성과는 장소경험과 운영성을 함께 검증',
    implication: '방문량보다 이용경험·체류·재참여·운영원가·협업성과를 함께 확인합니다.',
  },
];

export const decisionBoundaries = [
  { item: '상세 플레이스메이킹 프로그램', availableStage: '1–2단계', reason: '현장기회와 이용자·참여자 근거 확인 후 결정' },
  { item: '에리어매니지먼트 운영주체·상세 거버넌스', availableStage: '4단계', reason: '서비스 가설과 실행조건 확인 후 설계' },
  { item: '파트너 확정·계약구조', availableStage: '3–5단계', reason: '필요역량과 원가·책임 범위 확인 후 결정' },
  { item: '기획추진실의 서울시 세부 협의안', availableStage: '5단계 지원축', reason: '장소·운영 실증안과 필요한 대외조건을 갖춘 뒤 협의' },
  { item: '최종 성과지표·성과보상 체계', availableStage: '3–5단계', reason: '장소경험·운영성·참여성과의 검증항목 확정 후 설계' },
  { item: 'SBD 확대·이전 방식', availableStage: '6단계 이후', reason: '송현 실증 결과와 전이조건 축적 후 검토' },
];

export const stageZeroExitCriteria = [
  '핵심 자료마다 출처·기준일·담당자가 기록되어 있습니다.',
  '확인된 사실, 내부 검토사항, 외부 제안이 구분되어 있습니다.',
  '자산·공간·운영·참여관계의 누락정보와 다음 확인행동이 지정되어 있습니다.',
  '1단계 현장기회 질문이 근거자료와 연결되어 있습니다.',
];
