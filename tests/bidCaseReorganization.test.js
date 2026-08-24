import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('민관협력 사례연구 메뉴는 주요 자산 위에서 도시·전수·심층조사의 3단계로 재편한다', async () => {
  const [app, layout] = await Promise.all([
    read('src/App.jsx'),
    read('src/components/Layout.jsx'),
  ]);

  assert.match(layout, /도시 차원의 민관협력/);
  assert.match(layout, /국내외 BID 전수조사/);
  assert.match(layout, /송현 매칭사례 심층조사/);
  assert.ok(layout.indexOf('label="민관협력 사례연구"') < layout.indexOf('label="이지스 주요 자산"'));
  assert.doesNotMatch(layout, /name:\s*['"]미국 BID['"]/);
  assert.doesNotMatch(layout, /name:\s*['"]일본 에리어매니지먼트['"]/);

  assert.match(app, /path=["']cases\/city-partnership["']/);
  assert.match(app, /path=["']cases\/global-evaluation["']/);
  assert.match(app, /path=["']cases\/songhyeon-application["']/);
  assert.match(app, /path=["']cases\/us["'][\s\S]*Navigate replace to=["']\/cases\/city-partnership["']/);
  assert.match(app, /path=["']cases\/japan["'][\s\S]*Navigate replace to=["']\/cases\/city-partnership["']/);
});

test('첫 페이지는 서울형 타운매니지먼트의 사실·진단·TF 토론가설을 구분한다', async () => {
  const [page, content] = await Promise.all([
    read('src/pages/cases/CityPartnership.jsx'),
    read('src/data/cityPartnershipNotionContent.js'),
  ]);
  const source = `${page}\n${content}`;

  for (const text of [
    '서울형 타운매니지먼트사업 현황 진단과 개선방향',
    '서울형 타운매니지먼트 사업 운영 실태',
    '지역관리시스템의 개념과 여러가지 정의',
    '생각해볼것',
    '핵심 검토사항',
    '2016~2022',
    '공공 예산 지원을 통해 용역 발주',
    '민간의 참여여부를 이끌어내는게 중요함',
    '지역공감에서 제도화까지의 단계',
  ]) assert.match(source, new RegExp(text));

  assert.doesNotMatch(source, /서울시는 준비가 되어있다/);
});

test('첫 페이지는 920px 이하 세로 스토리와 큰 본문으로 읽힌다', async () => {
  const source = await read('src/pages/cases/CityPartnership.jsx');

  assert.match(source, /w-\[920px\]/);
  assert.match(source, /text-\[54px\]/);
  assert.match(source, /text-\[42px\]/);
  assert.match(source, /text-\[18px\]/);
  assert.match(source, /leading-\[1\.8\]/);
  assert.match(source, /data-city-partnership-story/);
  assert.match(source, /<table/);
  assert.doesNotMatch(source, /grid-cols-4 border/);
});

test('노션 전체 내용 뒤에 생각해볼것 원문과 편집 요약을 순서대로 둔다', async () => {
  const [page, content] = await Promise.all([
    read('src/pages/cases/CityPartnership.jsx'),
    read('src/data/cityPartnershipNotionContent.js'),
  ]);

  assert.ok(page.indexOf('data-notion-full-content') < page.lastIndexOf('<ThoughtsSection />'));
  assert.ok(page.lastIndexOf('<ThoughtsSection />') < page.indexOf('data-editorial-summary'));
  assert.match(page, /ThoughtsSection/);
  assert.match(page, /buildThoughtItems/);
  assert.match(page, /data-thoughts-item/);
  assert.doesNotMatch(page, /whitespace-pre-wrap[\s\S]*\{thoughtsRaw\}/);
  for (const exactText of [
    '서울의 ‘기존장소 쇠퇴’에 가장 취약한 곳이 최초 플레이스메이킹이 시도된 인사동이다.',
    '우리는 서울시 부시장 이상, 이지스 대표이사 이상, 파트너십 C라인 이상급과 협의를 끝마쳐야.',
    '데이터기반 AI를 활용한 운영의 효율화와 개선방향을 지속 도출하고 개선한다.',
  ]) assert.match(content, new RegExp(exactText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('생각해볼것은 노션에서 구분한 진단과 실행방향의 색상을 구절별로 보존한다', async () => {
  const [page, content] = await Promise.all([
    read('src/pages/cases/CityPartnership.jsx'),
    read('src/data/cityPartnershipNotionContent.js'),
  ]);

  assert.match(content, /이는 페인포인트이지만 거꾸로 생각해보면 오랜 시간이 흐른 도시의 브랜드 리포지셔닝의 주기로써 기회 일 수 있다\./);
  for (const phrase of [
    '최초 플레이스메이킹이 시도된 인사동',
    '복합단지 시행 초기 개발 계획 시에 지방정부 협력해서 법적 구도를 미리 구축',
    '처음부터 세금을 강제하는 BID 형태는 장기간 사회적 합의가 필요한',
    '공공주체는 거점시설 조성, 이벤트 개최 등 단순 시각 성과만 요구한다',
  ]) assert.match(page, new RegExp(`text: '${phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}', tone: 'red'`));
  for (const phrase of [
    '브랜드 리포지셔닝의 주기로써 기회',
    '현 시점에서 우리가 지방정부와 협력해야 할 과제',
    '타운매니지먼트가 뭔지 단번 이해시킬수 있는 사전 정의를 구축해 놓아야.',
    '우리는 최초부터 확실한 민간참여 파트너십을 구축하여 빠르게 시스템 정착할 수 있게 해야.',
  ]) assert.match(page, new RegExp(`text: '${phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}', tone: 'blue'`));
  assert.match(page, /highlight\.tone === 'red' \? 'text-\[#FF7B72\]' : 'text-\[#8FC7FF\]'/);
  assert.match(page, /<ThoughtText text=\{child\.text\} \/>/);
  assert.doesNotMatch(page, /mt-3 block text-\[#8FC7FF\]/);
});

test('각 챕터 사이에는 중앙 정렬된 분리선을 둔다', async () => {
  const page = await read('src/pages/cases/CityPartnership.jsx');

  assert.match(page, /data-chapter-divider/);
  assert.match(page, /mx-auto mb-\[112px\] h-px w-\[180px\] bg-white\/25/);
  assert.match(page, /isLast=\{index === chapters\.length - 1\}/);
  assert.match(page, /!isLast &&/);
});

test('생각해볼것은 하단 본문과 구분되는 강조 박스로 표시한다', async () => {
  const page = await read('src/pages/cases/CityPartnership.jsx');

  assert.match(page, /data-thoughts-verbatim[\s\S]*border border-\[#49789E\]\/70 bg-\[#202A36\]/);
  assert.match(page, /absolute inset-x-0 top-0 h-\[4px\] bg-\[#78B8E8\]/);
  assert.match(page, /송현 적용을 위한 TF 검토 메모/);
  assert.match(page, /rounded-\[22px\] border border-white\/10 bg-black\/15/);
});

test('송현 적용 핵심 검토사항도 생각해볼것과 동일한 강조 체계를 사용한다', async () => {
  const page = await read('src/pages/cases/CityPartnership.jsx');

  assert.match(page, /data-editorial-summary[\s\S]*border border-\[#49789E\]\/70 bg-\[#202A36\]/);
  assert.match(page, /송현 적용을 위한 핵심 검토사항/);
  assert.match(page, /mt-14 space-y-12 rounded-\[22px\] border border-white\/10 bg-black\/15/);
  assert.equal((page.match(/absolute inset-x-0 top-0 h-\[4px\] bg-\[#78B8E8\]/g) || []).length, 2);
});

test('송현 적용 핵심 검토사항은 성수동 연구의 운영구조를 네 가지 검증과제로 압축한다', async () => {
  const page = await read('src/pages/cases/CityPartnership.jsx');

  for (const text of [
    '참여와 제도 기반의 동시 설계',
    '결정·협의·실행의 역할 구분',
    '위원회가 방향을 결정하고, 권역별 협의체가 현안을 발굴하며, 상설 TMO가 데이터·민원·현장사업을 실행',
    '작은 실행에서 단계적 제도화로',
    '운영성과와 지속가능성의 검증',
  ]) assert.match(page, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(page, /송현에서 직접 검증해야 할 네 가지 조건/);
});

test('독자는 제작 설명 없이 도시 변화부터 서울의 과제까지 하나의 스토리로 읽는다', async () => {
  const page = await read('src/pages/cases/CityPartnership.jsx');

  for (const chapter of [
    '지역매니지먼트 시스템의 개념과 구조',
    '미국·영국·일본의 지역매니지먼트 시스템',
    '한국의 지역매니지먼트 시스템: 서울형 타운매니지먼트',
    '서울형 타운매니지먼트의 문제점과 개선방향',
    '송현 적용을 위한 핵심 검토사항',
  ]) assert.match(page, new RegExp(chapter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

  assert.doesNotMatch(page, /노션/);
  assert.doesNotMatch(page, /그대로 담았/);
  assert.doesNotMatch(page, /원문 보고서/);
  assert.doesNotMatch(page, /수정하지 않고 수록/);
});

test('노션의 26개 도표는 WebP로 변환되어 해당 보고서 절에 배치된다', async () => {
  const [page, images] = await Promise.all([
    read('src/pages/cases/CityPartnership.jsx'),
    read('src/data/cityPartnershipReportImages.js'),
  ]);
  const indices = [...images.matchAll(/image\((\d+),/g)].map((match) => Number(match[1]));

  assert.deepEqual([...indices].sort((a, b) => a - b), Array.from({ length: 26 }, (_, index) => index + 1));
  assert.match(page, /ReportImage/);
  assert.match(page, /sectionImages/);
  assert.match(page, /sectionNarratives/);
  for (let index = 1; index <= 26; index += 1) {
    const filename = `report-${String(index).padStart(2, '0')}.webp`;
    await read(`public/city-partnership/${filename}`);
  }
});

test('원문 메모는 보고서형 제목과 편집 원고로 발전시켜 표시한다', async () => {
  const page = await read('src/pages/cases/CityPartnership.jsx');
  const narrative = await read('src/data/cityPartnershipNarrative.js');

  for (const heading of [
    '국가·도시별 지역관리시스템의 개념과 유형',
    '서울의 도시환경 변화와 지역관리 필요성',
    '미국 BID의 형성과 운영구조',
    '서울형 사업의 대상지 선정 및 평가구조',
    '사업 이해관계자별 문제인식',
  ]) assert.match(`${page}\n${narrative}`, new RegExp(heading));

  assert.match(page, /sectionNarratives/);
  assert.doesNotMatch(page, /normalizeReportLines\(section\.lines\)/);
  assert.doesNotMatch(page, /<SourceLine/);
  assert.doesNotMatch(page, />•<\/span>/);
  assert.match(narrative, /근거자료가 다루는 2016~2022년/);
  assert.match(narrative, /운영주체·재원·활동/);
});

test('4개국 시계열과 제도·운영규모·서울 사업지 비교를 제공한다', async () => {
  const [page, comparison] = await Promise.all([
    read('src/pages/cases/CityPartnership.jsx'),
    read('src/data/cityPartnershipComparison.js'),
  ]);

  for (const component of ['SystemTimeline', 'CountryComparisonTable', 'ScaleComparison', 'SeoulCaseMatrix']) {
    assert.match(page, new RegExp(component));
  }
  for (const year of ['1975', '1998', '2003', '2005', '2016', '2017', '2020', '2022']) {
    assert.match(comparison, new RegExp(year));
  }
  for (const fact of ['76개', '324개', '5개', '비교수치 미제시']) {
    assert.match(comparison, new RegExp(fact));
  }
  assert.match(comparison, /기준연도/);
  assert.match(comparison, /직접 비교에 유의/);
});

test('두 후속 페이지는 동일한 구조의 TBD 상태로 제공한다', async () => {
  const source = await read('src/pages/cases/CaseTbdPage.jsx');
  assert.match(source, /TBD/);
  assert.match(source, /준비 중/);
  assert.match(source, /title/);
  assert.match(source, /description/);
});
