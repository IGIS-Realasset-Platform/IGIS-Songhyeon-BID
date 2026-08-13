import { milestoneStages } from './songhyeonMilestones.js';

// Source: "송현 BID 프로젝트 방향 & 실행계획_260810"
// Hierarchy contract: Milestone(lv1) → accountable workstream(lv2) → checklist task(task).
const plan = [
  {
    stage: 'G0',
    workstreams: [
      ['공간솔루션센터 — 사례조사·현장 질문 설계', [
        '국내외 BID·플레이스메이킹·에리어매니지먼트 사례를 조사한다.',
        '사례별 대상 권역·장소 문제·이용자·공간·콘텐츠·서비스·운영주체·참여 파트너를 정리한다.',
        '공공·민간 협업·운영재원·현장운영·성과·갈등·민원·실패요인을 비교한다.',
        '송현에 적용 가능한 운영요소와 필요한 선행조건을 추출한다.',
        '송현 현장조사와 인터뷰에서 확인할 질문 리스트를 만든다.',
      ]],
      ['기획추진센터 — 송현 자료 전수조사·데이터화', [
        '송현동 부지·열린송현녹지광장 및 광화문·종로·인사동 인접 권역의 내부·공개자료를 전수 탐색한다.',
        '케이트윈타워·트윈트리타워·쌈지길·안녕인사동·도화서길 등 이지스 자산 정보를 취합한다.',
        '자산 관계유형·면적·용도·소유·관리·운영주체를 확인한다.',
        '공용공간·공개공간·리테일·문화·편의시설과 운영시간을 확인한다.',
        '시설·보안·미화·안전·동선·공간사용의 현재 조건을 확인한다.',
      ]],
      ['TF 리드 — 공통 기준선 결합', [
        '공통 자료양식과 사실상태 기준을 수립하고 적용한다.',
        '자산·공간·이용자·입주사·파트너 관계를 하나의 생태계 지도로 연결한다.',
        '초기 에리어 운영 경계선을 지정한다.',
      ]],
    ],
  },
  {
    stage: 'G1',
    workstreams: [
      ['공간솔루션센터 — 이용자 경험·문제 도출', [
        '현장 서비스 현황을 파악하고 필요시 트래픽·매출·이용객·만족도를 관찰한다.',
        '이지스 자산은 필요시 관계자를 통해 심층 파악한다.',
        '시민·방문객·입주사·리테일 운영자의 이용자 여정을 작성한다.',
        '활성·비활성 공간·이동 단절·관심사·체류 불편·잠재 서비스 지점의 문제와 요구사항을 도출한다.',
        '복수 운영파트너사와 접촉하여 가능한 서비스와 운영여건을 파악한다.',
        '공간·콘텐츠·채널·인력·재원 등 제공 가능한 자원을 정리한다.',
        '국내외 사례에서 도출한 문제가 송현에서도 유효한지 확인한다.',
      ]],
      ['기획추진센터 — 현장 운영제약 확인 지원', [
        '공간솔루션센터의 문제·기회 포착 기획업무를 지원한다.',
        '이지스 자산의 시설·보안·미화·리테일 운영자 인터뷰를 필요시 지원한다.',
        '이지스 자산의 시간대별 운영·이용행태·시설·안전·민원 이슈를 확인한다.',
      ]],
      ['TF 리드 — 기회영역 선정', [
        '문제·수요·기회를 장소·대상·시간대별로 분류한다.',
        '우선 검토할 기회영역 3~5개를 선정한다.',
        '직접 근거를 통한 제안 초안을 만든다.',
      ]],
    ],
  },
  {
    stage: 'G2',
    workstreams: [
      ['공간솔루션센터 — 플레이스메이킹 가설 설계', [
        '영역별 경험 목표를 정의한다.',
        '콘텐츠·서비스·공간사용 가설을 설계한다.',
        '입주사·기업·리테일·브랜드가 참여할 수 있는 방식을 설계한다.',
        '상시·정기·일회성 운영방식과 이용흐름을 구분한다.',
        '국내외 사례의 적용요소와 송현의 차이를 정리한다.',
        '가설안을 구체화하고 필요한 선행조건을 명시한다.',
      ]],
      ['기획추진센터 — BID·공공가치 정합성', [
        '서비스 가설이 BID 목적과 서울시 등 공공 운영원리에 어떻게 연결되는지 정리한다.',
        '공공가치와 자산·입주사 가치가 함께 형성되는 지점을 설계한다.',
        '현 단계에서 필요한 제도 확인사항을 식별하고 협의한다.',
      ]],
      ['TF 리드 — 우선 실증 가설 결정', [
        '직접 근거와 가설을 구분하고 기대효과·실행난이도·참여 가능성·학습가치를 분석한다.',
        '우선 실증 가설 1~3개를 선정한다.',
      ]],
    ],
  },
  {
    stage: 'G3',
    workstreams: [
      ['공간솔루션센터 — 운영모델·파트너 검토', [
        '공간사용·시설·동선·운영시간을 검토한다.',
        '운영주체·현장인력·전문 파트너의 역할을 정의한다.',
        '서비스 수준·운영절차·현장이슈 대응방식을 설계한다.',
        '기업·입주사·리테일·파트너별 참여의사와 조건을 확인한다.',
        '참여주체의 제공자원과 실제 운영업무를 연결한다.',
      ]],
      ['자산·운영 담당조직 — 자산 실행성 검증', [
        '시설·안전·보안·미화·보험·민원 조건을 확인한다.',
        '자산별 운영영향·필수 승인·현장 지원사항을 검토한다.',
      ]],
      ['기획추진센터 — 운영 실행성·공공 정합성', [
        '장소·운영 가설에 영향을 주는 제도·공간사용·행정절차를 확인한다.',
        '이용자·참여자 커뮤니케이션 및 서비스·운영 플랫폼을 계획한다.',
        '서울시 협의 필요항목과 협의시점을 수립한다.',
        '서울시 협업을 진행하고 관리한다.',
      ]],
      ['TF 리드 — 최소 실행조건 판단', [
        '초기 투자비·운영비와 재원항목을 검토한다.',
        '성과지표·데이터 수집방법·중단조건을 정의한다.',
        '실행 여부를 판단할 최소 운영패키지를 구성한다.',
      ]],
    ],
  },
  {
    stage: 'G4',
    workstreams: [
      ['공간솔루션센터 — 현장 실행안 완성', [
        '운영일정·공간사용·인력·시설·안전 계획을 확정한다.',
        '참여 기업·입주사·파트너의 역할과 제공자원을 확정한다.',
        '운영 참여자 커뮤니케이션 정책과 접점을 설계한다.',
        '운영정책 및 현장 대응체계를 확정한다.',
      ]],
      ['기획추진센터 — 지원조건·운영플랫폼 구축', [
        '계약·보험·회계·예산 등 행정 검토사항을 정리한다.',
        '서울시 협의 아젠다와 공공가치 근거를 준비한다.',
        '이용자·참여자 커뮤니케이션 및 서비스·운영 플랫폼을 구축한다.',
        '마일스톤과 연결된 통합업무보드·상세·댓글·이슈관리 체계를 구축한다.',
      ]],
      ['TF 리드 — 최소 실증 패키지 확정', [
        '실증 목표·범위·기간·대상과 검증가설을 확정한다.',
        '조직별 책임자·현장책임·지원사항을 정의한다.',
        '실행·보고·의사결정·이슈관리 흐름을 설계한다.',
      ]],
    ],
  },
  {
    stage: 'G5',
    workstreams: [
      ['TF 리드 — 실행 승인 최종 판단', [
        '내부 조직별 실행범위·책임자·지원사항을 최종 확인한다.',
        '서비스·예산·책임·운영절차·성과지표·데이터 수집 준비를 통합 점검한다.',
        '실행 여부를 최종 판단한다.',
      ]],
      ['공간솔루션센터 — 운영·파트너 준비 확인', [
        '파트너 참여조건과 장소·서비스·현장인력·운영절차를 확인한다.',
      ]],
      ['이지스 AM — 자산 운영준비 확인', [
        '공간사용·시설·보안·미화·안전 준비상태를 확인한다.',
      ]],
      ['기획추진센터 — 대외·행정조건 확인', [
        '필요한 대외협의와 행정·계약·예산 사항을 확인한다.',
      ]],
    ],
  },
  {
    stage: 'G6',
    workstreams: [
      ['TF 공동 — 현장 실증·평가·후속판단', [
        'MVP 최소 실증 패키지를 현장에서 운영한다.',
        '이용·참여·운영·비용·안전·민원 데이터를 기록한다.',
        '이용자·입주사·기업·파트너의 경험과 피드백을 기록한다.',
        '현장이슈와 대응과정을 기록한다.',
        '정성·정량 성과와 원가·매출을 기록한다.',
        '계획목표와 실증내용을 기준으로 평가하고 유지·종료 여부를 판단한다.',
        '재사용 가능한 장소·운영·협업·제도 노하우를 정리하고 공유한다.',
        '후속 실증과 장기적인 SBD 적용 가능 조건을 검토한다.',
      ]],
    ],
  },
];

const stageScheduleWindows = {
  G0: { startIndex: 0, endIndex: 2 },
  G1: { startIndex: 2, endIndex: 3 },
  G2: { startIndex: 4, endIndex: 5 },
  G3: { startIndex: 6, endIndex: 8 },
  G4: { startIndex: 9, endIndex: 10 },
  G5: { startIndex: 11, endIndex: 12 },
  G6: { startIndex: 13, endIndex: 14 },
};

const getTaskRange = (stage, workstreamIndex, taskIndex, taskCount) => {
  const { startIndex: stageStart, endIndex: stageEnd } = stageScheduleWindows[stage];
  if (taskCount === 1) return { startIndex: stageStart, endIndex: stageEnd };
  const progress = taskIndex / (taskCount - 1);
  const startIndex = Math.min(stageEnd, stageStart + Math.round(progress * (stageEnd - stageStart)));
  return {
    startIndex,
    endIndex: taskIndex === taskCount - 1 ? stageEnd : Math.min(stageEnd, startIndex + (workstreamIndex % 2)),
  };
};

const summarizeRange = (items) => ({
  startIndex: Math.min(...items.map((item) => item.startIndex)),
  endIndex: Math.max(...items.map((item) => item.endIndex)),
});

const compactTitleOverrides = new Map([
  ['국내외 BID·플레이스메이킹·에리어매니지먼트 사례를 조사한다.', '국내외 BID·플레이스메이킹 사례 조사'],
  ['사례별 대상 권역·장소 문제·이용자·공간·콘텐츠·서비스·운영주체·참여 파트너를 정리한다.', '사례별 권역·이용자·운영주체 정리'],
  ['공공·민간 협업·운영재원·현장운영·성과·갈등·민원·실패요인을 비교한다.', '협업·재원·현장운영·성과요인 비교'],
  ['송현에 적용 가능한 운영요소와 필요한 선행조건을 추출한다.', '송현 적용요소·선행조건 도출'],
  ['송현 현장조사와 인터뷰에서 확인할 질문 리스트를 만든다.', '현장조사·인터뷰 질문 작성'],
  ['송현동 부지·열린송현녹지광장 및 광화문·종로·인사동 인접 권역의 내부·공개자료를 전수 탐색한다.', '송현·인접 권역 자료 전수조사'],
  ['케이트윈타워·트윈트리타워·쌈지길·안녕인사동·도화서길 등 이지스 자산 정보를 취합한다.', '인접 이지스 자산정보 취합'],
  ['공용공간·공개공간·리테일·문화·편의시설과 운영시간을 확인한다.', '공용·공개공간·리테일 운영 확인'],
  ['시설·보안·미화·안전·동선·공간사용의 현재 조건을 확인한다.', '시설·안전·동선·공간사용 조건 확인'],
  ['자산·공간·이용자·입주사·파트너 관계를 하나의 생태계 지도로 연결한다.', '자산·이용자·파트너 생태계 지도'],
  ['현장 서비스 현황을 파악하고 필요시 트래픽·매출·이용객·만족도를 관찰한다.', '현장 서비스·이용지표 관찰'],
  ['시민·방문객·입주사·리테일 운영자의 이용자 여정을 작성한다.', '핵심 이용자 여정 작성'],
  ['활성·비활성 공간·이동 단절·관심사·체류 불편·잠재 서비스 지점의 문제와 요구사항을 도출한다.', '공간·이동·체류·서비스 문제 도출'],
  ['복수 운영파트너사와 접촉하여 가능한 서비스와 운영여건을 파악한다.', '운영파트너 서비스·운영여건 파악'],
  ['공간·콘텐츠·채널·인력·재원 등 제공 가능한 자원을 정리한다.', '공간·콘텐츠·인력·재원 정리'],
  ['국내외 사례에서 도출한 문제가 송현에서도 유효한지 확인한다.', '사례 문제의 송현 유효성 확인'],
  ['이지스 자산의 시설·보안·미화·리테일 운영자 인터뷰를 필요시 지원한다.', '자산 운영자 인터뷰 지원'],
  ['이지스 자산의 시간대별 운영·이용행태·시설·안전·민원 이슈를 확인한다.', '자산 운영·이용·안전 이슈 확인'],
  ['입주사·기업·리테일·브랜드가 참여할 수 있는 방식을 설계한다.', '입주사·기업 참여방식 설계'],
  ['서비스 가설이 BID 목적과 서울시 등 공공 운영원리에 어떻게 연결되는지 정리한다.', '서비스 가설·BID 공공원리 정합화'],
  ['공공가치와 자산·입주사 가치가 함께 형성되는 지점을 설계한다.', '공공·자산·입주사 가치 접점 설계'],
  ['직접 근거와 가설을 구분하고 기대효과·실행난이도·참여 가능성·학습가치를 분석한다.', '실증가설 효과·난이도·학습가치 분석'],
  ['장소·운영 가설에 영향을 주는 제도·공간사용·행정절차를 확인한다.', '제도·공간사용·행정절차 확인'],
  ['이용자·참여자 커뮤니케이션 및 서비스·운영 플랫폼을 계획한다.', '서비스·운영 플랫폼 계획'],
  ['이용자·참여자 커뮤니케이션 및 서비스·운영 플랫폼을 구축한다.', '서비스·운영 플랫폼 구축'],
  ['서비스·예산·책임·운영절차·성과지표·데이터 수집 준비를 통합 점검한다.', '서비스·예산·운영·성과 준비 점검'],
  ['파트너 참여조건과 장소·서비스·현장인력·운영절차를 확인한다.', '파트너·현장 운영조건 확인'],
  ['계획목표와 실증내용을 기준으로 평가하고 유지·종료 여부를 판단한다.', '실증 평가·유지 여부 판단'],
  ['재사용 가능한 장소·운영·협업·제도 노하우를 정리하고 공유한다.', '장소·운영·협업 노하우 정리'],
]);

const toTaskTitle = (sourceText) => {
  const source = sourceText.trim();
  if (compactTitleOverrides.has(source)) return compactTitleOverrides.get(source);
  const compact = source
    .replace(/진행하고 관리한다\.?$/, '진행·관리')
    .replace(/만든다\.?$/, '작성')
    .replace(/한다\.?$/, '')
    .replace(/([가-힣A-Za-z0-9)]+)[을를] (확인|검토|조사|정리|비교|분석|설계|수립|작성|도출|선정|확정|기록|평가)$/, '$1 $2')
    .replace(/필요시 /g, '')
    .trim();
  if (compact.length <= 38) return compact;
  const words = compact.split(' ');
  const action = words.at(-1);
  const segments = words.slice(0, -1).join(' ').split('·');
  while (`${segments.join('·')} ${action}`.length > 38 && segments.length > 3) segments.splice(-2, 1);
  return `${segments.join('·')} ${action}`.slice(0, 38).trim();
};

export const songhyeonDetailedScheduleItems = plan.flatMap(({ stage, workstreams }) => {
  const stageData = milestoneStages.find((item) => item.code === stage);
  const workstreamRows = workstreams.map(([name, tasks], workstreamIndex) => {
    const workstreamKey = `${stage}-WS${String(workstreamIndex + 1).padStart(2, '0')}`;
    const [leadLabel, outcome = '책임 과업'] = name.split(' — ');
    const taskRows = tasks.map((sourceText, taskIndex) => ({
      sourceKey: `${workstreamKey}-T${String(taskIndex + 1).padStart(2, '0')}`,
      itemType: 'task',
      parentSourceKey: workstreamKey,
      displayName: toTaskTitle(sourceText),
      sourceText: sourceText.trim(),
      leadLabel,
      categoryMain: outcome,
      stage,
      status: stage === 'G0' ? 'in_progress' : 'not_started',
      ...getTaskRange(stage, workstreamIndex, taskIndex, tasks.length),
    }));
    const range = summarizeRange(taskRows);
    return [{
      sourceKey: workstreamKey,
      itemType: 'lv2',
      parentSourceKey: stage,
      displayName: name,
      leadLabel,
      categoryMain: outcome,
      stage,
      status: stage === 'G0' ? 'in_progress' : 'not_started',
      ...range,
    }, ...taskRows];
  });

  const stageTasks = workstreamRows.flat().filter((item) => item.itemType === 'task');
  const range = summarizeRange(stageTasks);
  const milestone = {
    sourceKey: stage,
    itemType: 'lv1',
    parentSourceKey: null,
    displayName: `${stage} ${stageData.title}`,
    leadLabel: stageData.accountable,
    categoryMain: stageData.keyQuestion,
    stage,
    status: stage === 'G0' ? 'in_progress' : 'not_started',
    milestoneIndex: range.endIndex,
    ...range,
  };

  return [milestone, ...workstreamRows.flat()];
});
