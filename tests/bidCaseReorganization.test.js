import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('왼쪽 메뉴는 접이식 사례조사 섹션 하나를 제공하고 01·02·03은 상단 탭으로 연결한다', async () => {
  const [app, layout, frame] = await Promise.all([
    read('src/App.jsx'),
    read('src/components/Layout.jsx'),
    read('src/components/cases/CaseReportFrame.jsx'),
  ]);

  for (const [route, component] of [['city-partnership', 'CityPartnership'], ['global-evaluation', 'GlobalEvaluation'], ['operating-insights', 'OperatingInsights']]) {
    assert.match(app, new RegExp(`path="cases/${route}" element=\\{<${component} />\\}`));
  }
  assert.match(app, /path="cases" element=\{<Navigate replace to="\/cases\/city-partnership" \/>\}/);
  assert.match(layout, /<Section label="민관협력 사례조사" items=\{caseItems\}/);
  assert.match(layout, /name: '도시차원 민관협력 & 공통 인사이트', path: '\/cases'/);
  assert.doesNotMatch(layout, /01 도시 차원의 민관협력|02 국내외 75개 사례|03 운영 인사이트/);
  assert.doesNotMatch(app, /<SonghyeonPlaceThesis|import SonghyeonPlaceThesis/);
  assert.match(app, /path="cases\/songhyeon-place-thesis" element=\{<Navigate replace to="\/cases\/operating-insights" \/>\}/);
  assert.match(app, /path="cases\/us" element=\{<Navigate replace to="\/cases\/city-partnership" \/>\}/);
  assert.match(app, /path="cases\/japan" element=\{<Navigate replace to="\/cases\/city-partnership" \/>\}/);

  assert.doesNotMatch(layout, /04 송현 Place Thesis/);
  assert.equal((frame.match(/number: '0[1-3]'/g) || []).length, 3);
  assert.doesNotMatch(frame, /number: '04'|songhyeon-place-thesis/);
});

test('세 보고서는 공통 상단 탭과 1120px 프레임을 사용한다', async () => {
  const [frame, context, evidence, insights] = await Promise.all([
    read('src/components/cases/CaseReportFrame.jsx'),
    read('src/pages/cases/CityPartnership.jsx'),
    read('src/pages/cases/GlobalEvaluation.jsx'),
    read('src/pages/cases/OperatingInsights.jsx'),
  ]);

  assert.match(frame, /w-\[1120px\]/);
  assert.match(frame, /grid-cols-3/);
  assert.match(frame, /title: '공통 인사이트 도출'/);
  assert.match(frame, /aria-label="민관협력 사례조사 구성"/);
  assert.match(context, /<CaseReportFrame current="context">/);
  assert.match(evidence, /<CaseReportFrame current="evidence">/);
  assert.match(insights, /<CaseReportFrame current="insights">/);
});

test('03 공통 인사이트 도출은 PDF Summary & Insight의 결론 흐름을 후속 리서치 기준까지 연결한다', async () => {
  const page = await read('src/pages/cases/OperatingInsights.jsx');
  const headings = [
    '도심의 공간은 나뉘어 관리되지만, 이용자는 하나의 장소로 경험한다.',
    '성과가 축적된 사례는 여섯 가지 운영조건을 갖췄다.',
    '조직도를 만들기 전에 누구에게 어떤 변화가 필요한지 정한다.',
    '방문객 수만 보지 않고 네 단계의 결과를 순서대로 확인한다.',
  ];
  let prior = -1;
  for (const heading of headings) {
    const index = page.indexOf(heading);
    assert.ok(index > prior, `${heading}이 Summary & Insight 순서에 맞게 표시돼야 합니다.`);
    prior = index;
  }
  assert.match(page, /SUMMARY &amp; INSIGHT/);
  assert.match(page, /53개는 실패 사례가 아니다/);
  assert.match(page, /재원은 세 층으로 분리한다/);
  assert.match(page, /송현 의사결정 체크포인트/);
  assert.match(page, /mt-3 whitespace-nowrap text-\[30px\]/);
  assert.match(page, /<div className="mt-4 space-y-3">/);
  assert.match(page, /rounded-\[14px\] border border-white\/8 bg-black\/15/);
  assert.doesNotMatch(page, /border-t border-white\/15/);
  assert.doesNotMatch(page, /Place Thesis|One Operator|문화경제 회랑/);
});
