import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

test('홈은 프로젝트 서사부터 최근 기록까지 이어지는 스크롤형 랜딩이다', () => {
  const source = read('src/pages/Dashboard.jsx');
  assert.match(source, /data-songhyeon-home/);
  assert.match(source, /송현 BID 프로젝트/);
  assert.match(source, /프로젝트 현재 위치/);
  assert.match(source, /일하는 방식/);
  assert.match(source, /프로젝트 통합 현황/);
  assert.match(source, /최근 업무와 문서/);
  assert.match(source, /hypothesisPipeline\.map/);
  assert.match(source, /milestoneStages\.map/);
  assert.doesNotMatch(source, /tracking-/u);
  assert.doesNotMatch(source, /<Sparkles/u);
});

test('홈 문구는 프로젝트의 현황과 다음 판단을 방문자 관점에서 설명한다', () => {
  const source = read('src/pages/Dashboard.jsx');

  for (const phrase of [
    '전체 프로젝트 여정 속에서, 현재 과업의 위치를 확인합니다.',
    '전체 일정에서 얼마나 시간이 지났는지, 실제 업무는 어디까지 완료됐는지 확인할 수 있습니다.',
    '가정으로 시작하지 않고, 근거에서 앞으로 나아갑니다.',
    '계획과 실행, 장소의 근거를 하나의 흐름으로 연결합니다.',
    '현재 단계와 Gate별 상세 일정, 실행주관, 연결된 업무를 확인하고 다음 의사결정 시점을 파악할 수 있습니다.',
    '누가 무엇을 언제까지 수행하는지, 현재 상태와 필요한 결정을 하나의 업무 원장에서 확인합니다.',
    '7개의 관점으로 송현의 실행 조건을 확인합니다.',
    '최근의 기록에서 다음 결정을 확인합니다.',
  ]) assert.ok(source.includes(phrase), `홈에 확정 문구가 필요합니다: ${phrase}`);

  for (const englishEyebrow of ['Songhyeon BID Project', 'Where we are', 'How we work', 'One project, connected views', 'Latest signals']) {
    assert.ok(!source.includes(englishEyebrow), `파란 섹션명은 한글로 표시해야 합니다: ${englishEyebrow}`);
  }
  assert.doesNotMatch(source, /분리해 보여줍니다|같은 숫자로 포장하지 않습니다|홈은 결과를 복제하지 않습니다|핵심 콘텐츠를 바로 소개합니다/);
});

test('홈 첫 화면은 송현 BID의 정의와 이지스가 추진하는 이유를 먼저 설명한다', () => {
  const source = read('src/pages/Dashboard.jsx');
  const continuousCopy = source.replace(/<br \/>\s*/g, '');

  assert.match(source, /프로젝트 정의/);
  assert.match(source, /이지스가 추진하는 이유/);
  assert.match(continuousCopy, /열린송현녹지광장과 주변의 자산·상권·기관을하나의 운영 체계로 연결/);
  assert.match(continuousCopy, /송현 일대 자산의 운영 경험과 데이터를 바탕으로/);
  assert.match(continuousCopy, /민관 협력의 실행 구조를 만들기위해 이 프로젝트를 추진합니다/);
  assert.match(source, /자산·상권·기관을<br \/>\s*하나의 운영 체계/);
  assert.match(source, /도심 운영모델을<br \/>\s*설계·검증/);
  assert.match(source, /개별 자산을<br \/>\s*넘어 지역 전체/);
  assert.match(source, /실행 구조를 만들기<br \/>\s*위해 이 프로젝트/);
  assert.match(source, /mt-8 max-w-\[1080px\] space-y-6/);
  assert.match(source, /border-t border-white\/\[0\.14\] pt-6/);
  assert.doesNotMatch(source, /max-w-\[1080px\] grid-cols-2/);
  assert.doesNotMatch(source, /자산·공간·이용자·기업·지역·공공의 근거를 연결해 실행 가능한 서비스 가설/);
});

test('홈의 파란 섹션 제목은 15px로 선명하게 표시한다', () => {
  const source = read('src/pages/Dashboard.jsx');
  const sectionHeading = source.match(/function SectionHeading[\s\S]*?\n}/)?.[0] || '';

  assert.match(sectionHeading, /text-\[15px\] font-bold uppercase text-\[#7eb5e4\]/);
  assert.doesNotMatch(sectionHeading, /text-\[13px\] font-bold uppercase text-\[#7eb5e4\]/);
});

test('홈의 주요 컴포넌트는 실제 상세 랜딩으로 연결된다', () => {
  const source = read('src/pages/Dashboard.jsx');
  assert.match(source, /`\/milestones\?stage=\$\{overview\.currentStage\.code\}&focus=current`/);
  assert.match(source, /to="\/tasks"[\s\S]{0,260}?진행 중 업무/u);
  assert.match(source, /to="\/tasks\?status=진행중"[\s\S]{0,260}?현재 상세 업무 보기/u);
  assert.match(source, /to="\/map-activities\/integrated-map"/);
  for (const path of ['boundary', 'assets-leases', 'igis-retail', 'market-activities', 'hotel', 'institutions-community']) {
    assert.match(source, new RegExp(`path: '/map-activities/${path}'`));
  }
  assert.match(source, /to=\{`\/feed\/\$\{encodeURIComponent\(post\.id\)\}`\}/);
  assert.match(source, /to=\{`\/data\/\$\{encodeURIComponent\(document\.id\)\}`\}/);
});

test('홈의 공간 화면 소개 카드는 작은 글씨를 피하고 구분선과 메타 정보 사이 여백을 확보한다', () => {
  const source = read('src/pages/Dashboard.jsx');
  const mapSection = source.match(/<div className="grid grid-cols-12 gap-px bg-white\/\[0\.09\]">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/)?.[0] || '';

  assert.ok(mapSection, '공간 화면 소개 카드 영역을 찾을 수 없습니다.');
  assert.match(mapSection, /text-\[15px\] font-bold text-\[#8fc1ba\]/, '통합지도·운영구역 등의 분류명은 15px 이상이어야 합니다.');
  assert.match(mapSection, /text-\[23px\] font-semibold[^"\n]*text-white/, '각 공간 화면 제목은 충분히 크게 보여야 합니다.');
  assert.match(mapSection, /break-keep text-\[23px\][^"\n]*leading-\[1\.35\]/, '긴 한글 제목은 카드 밖으로 넘치지 않고 단어 단위로 줄바꿈되어야 합니다.');
  assert.match(mapSection, /text-\[15px\] leading-\[1\.65\]/, '카드 설명은 15px 이상이어야 합니다.');
  assert.match(mapSection, /border-t[^"\n]*pt-5 text-\[14px\]/, '하단 선과 데이터 문구 사이에 충분한 위쪽 여백이 필요합니다.');
  assert.doesNotMatch(mapSection, /text-\[(?:10|11|12|13)px\]/, '공간 화면 카드에 지나치게 작은 글씨를 다시 사용하면 안 됩니다.');
});

test('홈 메인 제목 아래 실행계획 PDF는 브라우저 새 탭으로 열린다', () => {
  const source = read('src/pages/Dashboard.jsx');
  const pdfPath = 'public/songhyeon-bid-direction-execution-plan-260813.pdf';

  assert.match(source, /href="\/songhyeon-bid-direction-execution-plan-260813\.pdf"/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /rel="noopener noreferrer"/);
  assert.match(source, /송현 BID 프로젝트 방향 &amp; 실행계획_260813\.pdf/u);
  assert.ok(fs.existsSync(path.join(root, pdfPath)));
  assert.ok(fs.statSync(path.join(root, pdfPath)).size > 1_000_000);
});

test('홈 상단 이동 버튼은 하단 전략 구분선과 충분히 떨어진다', () => {
  const source = read('src/pages/Dashboard.jsx');
  assert.match(source, /className="mb-8 mt-10 flex items-center gap-3"/);
});

test('홈은 실제 원장을 독립적으로 읽고 최근 목록만 경량 조회한다', () => {
  const source = read('src/pages/Dashboard.jsx');
  assert.match(source, /Promise\.allSettled/);
  assert.match(source, /loadScheduleRows\(\)/);
  assert.match(source, /loadTasks\(\)/);
  assert.match(source, /loadSonghyeonMapActivitiesOverview\(\)/);
  assert.match(source, /loadRecentTaskFeedPosts\(4\)/);
  assert.match(source, /loadRecentDataRoomDocuments\(4\)/);

  const feedRepository = read('src/lib/songhyeonTaskFeedRepository.js');
  const dataRepository = read('src/lib/songhyeonDataRoomRepository.js');
  assert.match(feedRepository, /export async function loadRecentTaskFeedPosts/);
  assert.match(feedRepository, /\.limit\(/);
  assert.match(dataRepository, /export async function loadRecentDataRoomDocuments/);
  assert.match(dataRepository, /\.limit\(/);
});

test('서비스 가설 메뉴는 홈에 흡수되고 기존 URL은 홈 작업방식으로 보존된다', () => {
  const layout = read('src/components/Layout.jsx');
  const app = read('src/App.jsx');
  const login = read('src/pages/Login.jsx');
  assert.doesNotMatch(layout, /name: '서비스·운영 가설'/);
  assert.match(app, /Route index element=\{<Dashboard \/>\}/);
  assert.match(app, /path="home" element=\{<Navigate replace to="\/"/);
  assert.match(app, /path="hypotheses" element=\{<Navigate replace to="\/#how-we-work"/);
  assert.match(app, /path="membership" element=\{<Navigate replace to="\/#how-we-work"/);
  assert.match(login, /const postLoginPath = '\/'/);
});

test('홈 딥링크는 마일스톤 단계와 업무 상태 필터를 초기화한다', () => {
  const milestone = read('src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx');
  const tasks = read('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx');
  assert.match(milestone, /new URLSearchParams\(window\.location\.search\)\.get\('stage'\)/);
  assert.match(milestone, /useState\(initialMilestoneStage\)/);
  assert.match(tasks, /new URLSearchParams\(window\.location\.search\)\.get\('status'\)/);
  assert.match(tasks, /useState\(initialTaskStatus\)/);
});
