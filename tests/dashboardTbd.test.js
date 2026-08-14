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
