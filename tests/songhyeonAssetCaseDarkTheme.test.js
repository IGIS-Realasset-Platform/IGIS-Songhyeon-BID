import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const CONTENT_ROUTES = [
  { path: 'assets', component: 'AssetPortfolio', file: 'src/pages/AssetPortfolio.jsx' },
  { path: 'assets/k-twin', component: 'KTwin', file: 'src/pages/assets/KTwin.jsx' },
  { path: 'assets/twin-tree', component: 'TwinTree', file: 'src/pages/assets/TwinTree.jsx' },
  { path: 'assets/ssamzigil', component: 'Ssamzigil', file: 'src/pages/assets/Ssamzigil.jsx' },
  { path: 'assets/annyeong', component: 'Annyeong', file: 'src/pages/assets/Annyeong.jsx' },
  { path: 'assets/new-assets', component: 'NewAssets', file: 'src/pages/assets/NewAssets.jsx' },
  { path: 'assets/market-data', component: 'MarketData', file: 'src/pages/assets/MarketData.jsx' },
  { path: 'cases/city-partnership', component: 'CityPartnership', file: 'src/pages/cases/CityPartnership.jsx' },
  { path: 'cases/global-evaluation', component: 'CaseTbdPage', file: 'src/pages/cases/CaseTbdPage.jsx' },
  { path: 'cases/songhyeon-application', component: 'CaseTbdPage', file: 'src/pages/cases/CaseTbdPage.jsx' },
];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('주요 자산과 BID 구축사례의 실제 route/page 인벤토리를 빠짐없이 유지한다', async () => {
  const [app, layout] = await Promise.all([
    read('src/App.jsx'),
    read('src/components/Layout.jsx'),
  ]);

  assert.match(layout, /<Section\s+label=["']이지스 주요 자산["']\s+items=\{assetItems\}/,
    '좌측 자산 메뉴는 이지스 주요 자산으로 표시해야 합니다.');

  for (const route of CONTENT_ROUTES) {
    assert.match(
      app,
      new RegExp(`<Route\\s+path=["']${escapeRegex(route.path)}["']\\s+element=\\{<${route.component}[^>]*\\s/>\\}`),
      `/${route.path} 라우트는 ${route.component} 페이지와 계속 연결되어야 합니다.`,
    );
  }
});

test('assets와 cases 하위 route는 공통 black workspace 배경을 사용한다', async () => {
  const layout = await read('src/components/Layout.jsx');
  const darkWorkspaceRule = layout.match(/const isDarkWorkspace\s*=\s*[\s\S]*?;/)?.[0] || '';

  assert.match(darkWorkspaceRule, /pathname\.startsWith\(['"]\/assets['"]\)/, '모든 주요 자산 route를 dark workspace로 분류해야 합니다.');
  assert.match(darkWorkspaceRule, /pathname\.startsWith\(['"]\/cases['"]\)/, '모든 BID 구축사례 route를 dark workspace로 분류해야 합니다.');
  assert.match(layout, /isDarkWorkspace\s*\?\s*['"]bg-\[#1F1F1E\]['"]/, 'dark workspace의 main 배경은 송현 black 배경이어야 합니다.');
});

const classTokenPattern = /(?:(?:hover|group-hover|focus|md|lg):)*(?:bg|text|border|divide)-(?:white|black|[a-z]+-[0-9]+|\[#[0-9A-Fa-f]+\])(?:\/[0-9]+)?/g;

const needsDarkThemeMapping = (token) => {
  const utility = token.replace(/^(?:(?:hover|group-hover|focus|md|lg):)+/, '');
  if (/^bg-white$/.test(utility)) return true;
  if (/^bg-(?:gray|slate|zinc|neutral|stone)-(?:50|100|200)$/.test(utility)) return true;
  if (/^bg-(?:blue|green|orange|purple|yellow)-(?:50|100)$/.test(utility)) return true;
  if (/^bg-\[#(?:dbeafe|e5e7eb|eff6ff|f3f4f6|f8f9fa|f9fafb|fafafa|ffffff)\]$/i.test(utility)) return true;
  if (/^(?:border|divide)-(?:gray|slate|zinc|neutral|stone)-(?:50|100|200|300|400)$/.test(utility)) return true;
  if (/^border-(?:yellow-300|\[#bfdbfe\])$/i.test(utility)) return true;
  if (/^text-black$/.test(utility)) return true;
  if (/^text-(?:gray|slate|zinc|neutral|stone)-(?:500|600|700|800|900|950)$/.test(utility)) return true;
  if (/^text-(?:blue-600|green-800|orange-800|purple-800)$/.test(utility)) return true;
  return /^text-\[#(?:111|172033|1d1d1f|1d4ed8|1f2937|1e293b|1e3a8a|0f172a)\](?:\/80)?$/i.test(utility);
};

const scopedRulesForToken = (css, token) => {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const normalizedToken = token.replaceAll('\\', '');
  return [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter((match) => match[1]
    .split(',')
    .some((selector) => {
      const normalizedSelector = selector.replaceAll('\\', '');
      const wrapperIndex = normalizedSelector.indexOf('.songhyeon-reference-dark');
      return wrapperIndex >= 0 && normalizedSelector.indexOf(normalizedToken, wrapperIndex) >= 0;
    }));
};

test('모든 reference page는 scoped dark wrapper와 black surface/light text 계약을 사용한다', async () => {
  const [css, ...pages] = await Promise.all([
    read('src/index.css'),
    ...CONTENT_ROUTES.map(async (route) => ({ ...route, source: await read(route.file) })),
  ]);

  for (const page of pages) {
    assert.match(page.source, /\bsonghyeon-reference-dark\b/, `${page.file}의 route root에 scoped dark wrapper가 있어야 합니다.`);
  }

  const cssWithoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rootRule = [...cssWithoutComments.matchAll(/([^{}]+)\{([^{}]*)\}/g)].find((match) => match[1].trim() === '.songhyeon-reference-dark');
  assert.ok(rootRule, 'index.css에 reference page 전용 root theme rule이 있어야 합니다.');
  assert.match(rootRule[2], /background(?:-color)?\s*:\s*#1F1F1E\b/i, 'reference page root surface는 #1F1F1E이어야 합니다.');
  assert.match(rootRule[2], /(?:^|;)\s*color\s*:\s*#E5E5E5\b/i, 'reference page 기본 본문색은 #E5E5E5이어야 합니다.');
});

test('reference page에 남겨둔 legacy light utility는 모두 wrapper 내부 dark mapping을 갖는다', async () => {
  const [css, ...sources] = await Promise.all([
    read('src/index.css'),
    ...CONTENT_ROUTES.map((route) => read(route.file)),
  ]);
  const legacyTokens = [...new Set(sources.flatMap((source) => source.match(classTokenPattern) || []).filter(needsDarkThemeMapping))].sort();

  assert.ok(legacyTokens.length > 0, 'scoped 변환이 보호할 legacy utility 인벤토리가 비어 있으면 안 됩니다.');
  for (const token of legacyTokens) {
    assert.ok(
      scopedRulesForToken(css, token).length > 0,
      `${token} utility에는 .songhyeon-reference-dark 범위 안의 명시적 dark mapping이 있어야 합니다.`,
    );
  }

  const whitePanelMapping = scopedRulesForToken(css, 'bg-white')[0]?.[2] || '';
  const darkBodyMapping = scopedRulesForToken(css, 'text-gray-900')[0]?.[2] || '';
  assert.match(whitePanelMapping, /background(?:-color)?\s*:\s*#272726\b/i, '기존 white panel은 #272726 dark panel로 보여야 합니다.');
  assert.match(darkBodyMapping, /(?:^|;)\s*color\s*:\s*#E5E5E5\b/i, '기존 gray-900 본문은 #E5E5E5 light text로 보여야 합니다.');
});
