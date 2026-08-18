import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('홈은 송현 BID 프로젝트의 스크롤형 홈페이지를 제공한다', async () => {
  const dashboard = await readFile('src/pages/Dashboard.jsx', 'utf8');

  assert.match(dashboard, /data-songhyeon-home/u);
  assert.match(dashboard, /송현을 하나의 장소가 아니라/u);
  assert.match(dashboard, /Where we are/u);
  assert.match(dashboard, /How we work/u);
  assert.match(dashboard, /Latest signals/u);
  assert.match(dashboard, /\bbg-\[#1F1F1E\]/u, '홈은 송현 워크스페이스 배경색을 직접 사용해야 합니다.');
});

test('사이트 루트가 정식 홈페이지이고 기존 /home은 루트로 호환 이동한다', async () => {
  const [app, layout] = await Promise.all([
    readFile('src/App.jsx', 'utf8'),
    readFile('src/components/Layout.jsx', 'utf8'),
  ]);

  assert.match(
    app,
    /<Route\s+index\s+element=\{<Dashboard\s*\/>\}\s*\/>/u,
    '사이트 루트(/)는 홈페이지를 직접 렌더링해야 합니다.',
  );
  assert.match(
    app,
    /<Route\s+path=["']home["']\s+element=\{<Navigate\s+replace\s+to=["']\/["']\s*\/>\}\s*\/>/u,
    '기존 /home 주소는 홈페이지 루트로 호환 이동해야 합니다.',
  );
  assert.match(layout, /name:\s*['"]홈['"],\s*path:\s*['"]\/['"]/u, '좌측 홈 메뉴는 정식 홈페이지를 열어야 합니다.');
  assert.match(layout, /pathname\s*===\s*['"]\/['"]/u, '루트 홈페이지는 Layout의 어두운 워크스페이스 경로여야 합니다.');
});
