export const timelineLanes = [
  {
    country: '미국',
    system: 'BID',
    color: '#68A7DC',
    events: [
      { year: '1970년대', title: '도심 공동화 심화', detail: '교외화로 중심시가지 공동화와 물리적 쇠퇴가 본격화됐다.' },
      { year: '1975', title: '뉴올리언스 첫 BID', detail: '다운타운 개발지구가 미국 최초 BID로 출범했다.' },
      { year: '1980년대 후반', title: '뉴욕 도심문제 대응', detail: '재정악화와 치안·위생문제에 대응하며 BID 도입이 확대됐다.' },
      { year: '1990년대', title: '도심활성화 수단으로 확산', detail: '타임스스퀘어·유니온스퀘어 사례가 주목받았다.' },
      { year: '2022', title: '뉴욕시 76개 운영', detail: '서울연구원 보고서가 제시한 기준연도 운영규모이다.' },
    ],
  },
  {
    country: '영국',
    system: 'TCM → BID',
    color: '#9B86D7',
    events: [
      { year: '1980년대', title: '중심상권 쇠퇴와 TCM 등장', detail: '대형점포 확산에 대응해 민간·공공·지역단체가 TCM을 구성했다.' },
      { year: '1990년대', title: '회비방식의 한계', detail: '재원부족과 무임승차가 지속운영의 핵심 문제로 나타났다.' },
      { year: '2003', title: 'BID 법제화', detail: '100개 이상 검토지구 중 22개 파일럿이 선정됐다.' },
      { year: '2005', title: 'BID 공식 출범', detail: '사업세 납부자의 투표와 부담금을 기반으로 운영을 시작했다.' },
      { year: '2021.09', title: '324개 운영', detail: '서울연구원 보고서가 제시한 기준시점 운영규모이다.' },
    ],
  },
  {
    country: '일본',
    system: 'TMO → AM',
    color: '#D39A56',
    events: [
      { year: '전통적 기반', title: '상가회·반상회', detail: '지역 소조직이 협의회·NPO·법인 형태로 발전했다.' },
      { year: '1998', title: 'TMO 제도화', detail: '중심시가지활성화법에 따라 TMO가 지역관리조직으로 도입됐다.' },
      { year: '1998~2006', title: 'TMO 운영 후 제도 전환', detail: '지방정부 보조금 위탁방식의 한계 이후 AM으로 발전했다.' },
      { year: '2014', title: '오사카시 AM 촉진조례', detail: '민간의 공공공간 활용과 지역관리활동을 제도적으로 지원했다.' },
    ],
  },
  {
    country: '한국',
    system: '서울형 타운매니지먼트',
    color: '#58B49A',
    events: [
      { year: '2016.11', title: '서울시 추진계획 수립', detail: '도심지역 지구통합관리 선도사업 추진계획을 수립했다.' },
      { year: '2017', title: '다동·무교동 첫 사업', detail: '서울형 타운매니지먼트 선도사업이 시작됐다.' },
      { year: '2018.05', title: '자치구 공모방식 전환', detail: '도심활력프로그램·도심활력프로젝트를 근거로 사업을 확대했다.' },
      { year: '2020', title: '4개 사업지 추가', detail: '명동·서초·여의도·구로가 시범사업으로 추가됐다.' },
      { year: '2022', title: '5개 사업 운영진단', detail: '서울연구원이 선도·시범사업의 구조와 한계를 종합 진단했다.' },
    ],
  },
];

export const countryComparisonRows = [
  {
    country: '미국', system: 'BID', trigger: '교외화·도심 공동화·행정서비스 약화',
    operator: '부동산소유주 중심 비영리조직', funding: '자산소유주 특별부담금',
    district: '특별구역 지정·소유주 동의와 투표', publicRole: '구역지정·부담금 부과 및 징수의 법적 기반',
    issue: '사회적 합의와 부담원칙 확립에 장기간 소요',
  },
  {
    country: '영국', system: 'TCM → BID', trigger: '대형점포 확산·기존 중심상권 쇠퇴',
    operator: '사업세 납부자·타운센터 매니저', funding: '회비에서 사업세 기반 부담금으로 전환',
    district: '납세자 수와 총평가액 각각 50% 이상 찬성', publicRole: '투표·부담금·최대 5년 사업기간 제도화',
    issue: 'TCM 단계의 무임승차와 재원 불안정',
  },
  {
    country: '일본', system: 'TMO → AM', trigger: '기성시가지 쇠퇴·재개발 이후 지속관리 필요',
    operator: '상가회·NPO·민간디벨로퍼·부동산소유주', funding: '보조금·회비·분담금·수익사업',
    district: '재개발구역 또는 주민·권리자 합의', publicRole: '법인·도시재생·공공공간 활용의 제도적 지원',
    issue: '보조금 위탁형 TMO에서 자립형 AM으로 전환 필요',
  },
  {
    country: '한국', system: '서울형 타운매니지먼트', trigger: '장소경쟁 심화·공공주도 공간관리의 한계',
    operator: '서울시·자치구·전문용역사·지역주체', funding: '서울시 예산과 자치구 용역발주 중심',
    district: '공모·평가를 통한 사업지 선정', publicRole: '사업기획·예산지원·선정·평가·정산',
    issue: '민간 자발성·상설조직·반복재원·공간사용권한 부족',
  },
];

export const scaleComparison = [
  { country: '미국', value: '76개', basis: '뉴욕시 BID', 기준연도: '2022', note: '도시 단위' },
  { country: '영국', value: '324개', basis: '영국 BID', 기준연도: '2021.09', note: '국가 단위' },
  { country: '일본', value: '비교수치 미제시', basis: 'TMO·AM', 기준연도: '—', note: '보고서 내 총량 없음' },
  { country: '한국', value: '5개', basis: '서울형 선도·시범사업', 기준연도: '2022', note: '서울시 사업 단위' },
];

export const scaleCaution = '운영규모는 국가·도시·사업 단위가 서로 달라 직접 비교에 유의해야 한다.';

export const seoulCaseRows = [
  { year: '2017', district: '다동·무교동', area: '120,000㎡', focus: '도심업무지구', actors: '상인·기업·중구·전문조직', output: '36회 간담회, 무교테라스, 시민누리공간' },
  { year: '2018', district: '명동', area: '47,000㎡', focus: '도심형 생활지구·사회혁신', actors: '서울시·중구·사회적경제·비영리·기업', output: '민관협의체 구성' },
  { year: '2019', district: '서초 음악문화지구', area: '62,904㎡', focus: '클래식 음악문화 중심지', actors: '서초구·예술의전당·한예종·지역예술인', output: '타운매니지먼트 협의체·법인화 구상' },
  { year: '2020', district: '여의도 금융지구', area: '96,275㎡', focus: '금융특화·기업 CSR', actors: '금융기업·신영증권·서울시·영등포구', output: '도심활력소·전면공지 활용' },
  { year: '2020', district: '구로 G밸리', area: '48,220㎡', focus: 'IT·벤처 산업집적지', actors: '산업단지·기업·민간협의체·구로구', output: 'TM 협의체 구성' },
];

export const evidenceNote = '자료: 윤서연·정상혁·이슬이(2022), 「서울형 타운매니지먼트사업 현황 진단과 개선방향」 및 정리 원문. 연도와 수치는 각 자료의 기준시점을 유지했다.';
