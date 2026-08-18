import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');

const explicitFontSizeCounts = (source) => {
  const counts = new Map();
  for (const match of source.matchAll(/!?text-\[(\d+)px\]/g)) {
    const size = Number(match[1]);
    counts.set(size, (counts.get(size) || 0) + 1);
  }
  return Object.fromEntries([...counts].sort(([left], [right]) => left - right));
};

test('Analytics의 기본·작은 글씨는 기존보다 2px 커지고 큰 지표는 유지한다', async () => {
  const page = await read('src/pages/admin/SonghyeonAnalytics.jsx');

  // 기존 8~14px 글자만 각각 10~16px로 올린 분포다. 새 항목이 생겨도
  // 작은 글자를 이전 크기로 되돌리거나 일부만 누락하면 이 계약이 깨진다.
  assert.deepEqual(explicitFontSizeCounts(page), {
    10: 4,
    11: 11,
    12: 13,
    13: 9,
    14: 11,
    15: 4,
    16: 9,
    28: 1,
  });

  assert.match(page, /descriptionClassName=["']!text-\[16px\]["']/);
  assert.match(page, /className=["']text-\[13px\] font-bold text-\[#86868B\]["']>\{label\}/);
  assert.match(page, /note && <div className=["']mt-2 text-\[12px\] text-\[#686868\]["']/);
  assert.match(page, /analytics-daily-title[\s\S]*?text-\[16px\][\s\S]*?일별 이용 추이/);
  assert.match(page, /text-\[10px\] text-\[#686868\]["']>\{showLabel \? shortDate/);

  // 요약 카드의 핵심 수치 크기는 강조 계층을 유지한다.
  assert.match(page, /compact \? 'text-\[15px\]' : 'text-\[28px\]'/);
  assert.doesNotMatch(page, /text-\[(?:17|30)px\]/);
});

test('Analytics의 큰 페이지 제목은 공용 32px 제목 계층을 그대로 사용한다', async () => {
  const [page, layout] = await Promise.all([
    read('src/pages/admin/SonghyeonAnalytics.jsx'),
    read('src/components/workspace/WorkspacePageLayout.jsx'),
  ]);

  assert.match(page, /<WorkspacePageHeader[\s\S]*?title=["']이용 현황["']/);
  assert.match(layout, /<h1 className="[^"]*text-\[32px\][^"]*">\{title\}<\/h1>/);
  assert.doesNotMatch(layout, /<h1 className="[^"]*text-\[34px\]/);
});
