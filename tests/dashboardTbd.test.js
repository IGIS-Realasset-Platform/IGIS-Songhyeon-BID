import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('홈은 기존 대시보드 콘텐츠 없이 화면 중앙에 TBD만 표시한다', async () => {
  const dashboard = await readFile('src/pages/Dashboard.jsx', 'utf8');

  assert.match(dashboard, /\bTBD\b/, '홈 중앙에 TBD 문구가 필요합니다.');
  assert.ok(
    /(?:\bgrid\b[^"'\n]*\bplace-items-center\b|\bflex\b[^"'\n]*\bitems-center\b[^"'\n]*\bjustify-center\b|\bflex\b[^"'\n]*\bjustify-center\b[^"'\n]*\bitems-center\b)/u.test(dashboard),
    '홈의 TBD는 가로·세로 중앙 정렬돼야 합니다.',
  );
  assert.match(dashboard, /\bbg-\[#1F1F1E\]/u, '홈은 송현 워크스페이스 배경색을 직접 사용해야 합니다.');
  assert.doesNotMatch(dashboard, /\bbg-(?:white\b|\[#F3F4F6\]|\[#FDFDFD\])/u, '홈에 흰색·밝은 회색 배경을 사용하면 안 됩니다.');

  for (const removedContent of [
    'ProjectContext',
    'EvidenceStatus',
    'ImmediateBacklog',
    'StageRoadmap',
    'EcosystemPreview',
    'OrganizationRoles',
    'DecisionBoundary',
    'AssetBaseline',
    'GlobalCaseInsights',
    'StageExitCriteria',
    'SonghyeonTaskBoard',
    'sectionLinks',
  ]) {
    assert.doesNotMatch(dashboard, new RegExp(`\\b${removedContent}\\b`), `홈에 기존 콘텐츠 ${removedContent}가 남으면 안 됩니다.`);
  }

  assert.doesNotMatch(dashboard, /<(?:header|nav|section)\b/u, '홈에 기존 헤더·바로가기·콘텐츠 섹션이 남으면 안 됩니다.');
  assert.match(dashboard, /export default Dashboard/);
});

test('루트는 통합업무보드로 이동하고 홈은 독립된 어두운 /home 경로로 유지한다', async () => {
  const [app, layout] = await Promise.all([
    readFile('src/App.jsx', 'utf8'),
    readFile('src/components/Layout.jsx', 'utf8'),
  ]);

  assert.match(
    app,
    /<Route\s+index\s+element=\{<Navigate\s+replace\s+to=["']\/tasks["']\s*\/>\}\s*\/>/u,
    '사이트 루트(/)는 replace 방식으로 /tasks에 진입해야 합니다.',
  );
  assert.match(
    app,
    /<Route\s+path=["']home["']\s+element=\{<Dashboard\s*\/>\}\s*\/>/u,
    'TBD 홈 화면은 /home 경로에서 계속 접근할 수 있어야 합니다.',
  );
  assert.match(layout, /name:\s*['"]홈['"],\s*path:\s*['"]\/home['"]/u, '좌측 홈 메뉴는 /home을 열어야 합니다.');
  assert.doesNotMatch(layout, /name:\s*['"]홈['"],\s*path:\s*['"]\/['"]/u, '홈 메뉴가 redirect 전용 루트(/)를 가리키면 안 됩니다.');
  assert.match(layout, /pathname\s*===\s*['"]\/home['"]/u, '/home은 Layout의 어두운 워크스페이스 경로여야 합니다.');
});
