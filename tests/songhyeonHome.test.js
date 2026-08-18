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
  assert.match(source, /Songhyeon BID Project/);
  assert.match(source, /Where we are/);
  assert.match(source, /How we work/);
  assert.match(source, /One project, connected views/);
  assert.match(source, /Latest signals/);
  assert.match(source, /hypothesisPipeline\.map/);
  assert.match(source, /milestoneStages\.map/);
  assert.doesNotMatch(source, /tracking-/u);
  assert.doesNotMatch(source, /<Sparkles/u);
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
  assert.match(mapSection, /text-\[23px\] font-semibold text-white/, '각 공간 화면 제목은 충분히 크게 보여야 합니다.');
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
