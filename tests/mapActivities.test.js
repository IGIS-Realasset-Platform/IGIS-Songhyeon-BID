import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fromRoot = (...parts) => resolve(projectRoot, ...parts);
const read = (...parts) => readFile(fromRoot(...parts), 'utf8');
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const MAP_SECTIONS = [
  { label: '통합지도', slug: 'integrated-map' },
  { label: '운영구역', slug: 'boundary' },
  { label: '자산·임차', slug: 'assets-leases' },
  { label: '이지스 리테일', slug: 'igis-retail' },
  { label: '상권·활동', slug: 'market-activities' },
  { label: '제도·공동체', slug: 'institutions-community' },
];
const HOTEL_SECTION = { label: '호텔', slug: 'hotel' };
const EXPECTED_SOURCE_SHA256 = 'ab022062d28812bbc39fa34bd81dd894450ffebfb4c61eaf6e05d39c0c7f8b02';
const EXPECTED_LEGACY_RUNTIME_BUNDLE_SHA256 = {
  'integrated-map': 'bdeefec643c5b9a490f7ce5e0d48e0aa13f2a50216cf3df186f26449c175111f',
  'operating-boundaries': 'e9e5a46f6645b6fb20319393d17ceb1d6a3c6ae2af826df8a656863a9d073c17',
  'assets-leases': 'cff47397441ab16fcfccab98580bc4517e54a73fb8143d15e6d50814706a9738',
  'market-activities': '817a6682c0e93f85a2de3474fcf68915dd587bf85fca572fa6461119609a2ed2',
  'institutions-community': '512903959188c986c3172c2b941bbdce74f1bfc98abf0859738217c2e44f450a',
  stores: '1423862df91f338afd38330363d38b79db0128430186926ab380b60ae203d9fb',
};
const EXPECTED_HOTEL_FIELDS = [
  'address',
  'building',
  'bukchon',
  'classification_basis',
  'compact',
  'east',
  'facility_id',
  'grade',
  'grade_checked_at',
  'grade_source_url',
  'grade_status',
  'homepage',
  'id',
  'lat',
  'lodging_style',
  'lodging_type',
  'lon',
  'name',
  'official_business_type',
  'official_hotel_name',
  'official_record_id',
  'operator_name',
  'rating_decision_date',
  'rating_match_method',
  'room_count',
  'segment',
  'source_category2',
  'source_lodging_type',
  'store_checked_at',
  'store_id',
  'store_published_at',
  'store_source_url',
];
const EXPECTED_DATASET_COUNTS = {
  activities: 21,
  activity_markers: 21,
  asset_markers: 6,
  assets: 5,
  boundaries: 3,
  boundary_analysis: 6,
  boundary_geojson: 3,
  boundary_narratives: 3,
  delivery_parity: 6,
  igis_retail: 147,
  insights: 6,
  landmarks: 4,
  organizations: 22,
  plan_geojson: 4,
  plans: 27,
  program_operations: 21,
  public_spaces: 13,
  retail_statistics: 1202,
  store_display_audit: 7,
  stores: 10571,
  strategies: 4,
};
const MANIFEST_PATH = fromRoot('references/map-activities/manifest.json');
const DATASET_ROOT = fromRoot('references/map-activities/datasets');
const FULL_RUNTIME_MANIFEST_PATH = fromRoot('public/map-activities/data/manifest.json');
const EXPECTED_RUNTIME_BUNDLES = {
  'integrated-map': ['landmarks', 'activity_markers', 'asset_markers', 'public_spaces'],
  'operating-boundaries': ['boundaries', 'boundary_analysis', 'boundary_geojson', 'boundary_narratives', 'delivery_parity'],
  'assets-leases': ['assets'],
  'market-activities': ['activities', 'igis_retail', 'program_operations', 'retail_statistics', 'store_display_audit'],
  'institutions-community': ['insights', 'organizations', 'plan_geojson', 'plans', 'strategies'],
  stores: ['stores'],
};

const walkFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? walkFiles(path) : [path];
  }));
  return nested.flat();
};

const resolveRelativeImport = async (importer, specifier) => {
  const base = resolve(dirname(importer), specifier);
  const candidates = extname(base)
    ? [base]
    : [base, `${base}.js`, `${base}.jsx`, `${base}.json`, resolve(base, 'index.js'), resolve(base, 'index.jsx')];
  for (const candidate of candidates) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      // Try the next normal ESM/Vite resolution candidate.
    }
  }
  return null;
};

const runtimeDependencyClosure = async (entryPath, visited = new Set()) => {
  if (visited.has(entryPath)) return visited;
  visited.add(entryPath);
  if (extname(entryPath) === '.json') return visited;
  const source = await readFile(entryPath, 'utf8');
  const importSpecifiers = [
    ...source.matchAll(/\b(?:import|export)\s+(?:[\s\S]*?\s+from\s+)?['"]([^'"]+)['"]/g),
    ...source.matchAll(/\bimport\(\s*['"]([^'"]+)['"]\s*\)/g),
  ].map((match) => match[1]).filter((specifier) => specifier.startsWith('.'));
  for (const specifier of importSpecifiers) {
    const dependency = await resolveRelativeImport(entryPath, specifier);
    assert.ok(dependency, `Map & Activities 상대 import를 찾을 수 없습니다: ${specifier}`);
    await runtimeDependencyClosure(dependency, visited);
  }
  return visited;
};

const recordsFor = (value, recordPath) => {
  if (recordPath === '$') {
    assert.ok(Array.isArray(value), 'recordPath "$"는 배열 dataset에만 사용해야 합니다.');
    return value;
  }
  if (recordPath === '$.features') {
    assert.ok(Array.isArray(value?.features), 'recordPath "$.features"의 배열이 없습니다.');
    return value.features;
  }
  if (recordPath === '$.records') {
    assert.ok(Array.isArray(value?.records), 'recordPath "$.records"의 배열이 없습니다.');
    return value.records;
  }
  if (recordPath === '$.*') {
    assert.ok(value && typeof value === 'object' && !Array.isArray(value), 'recordPath "$.*"는 객체 dataset에만 사용해야 합니다.');
    return Object.values(value);
  }
  assert.fail(`지원하지 않는 manifest recordPath입니다: ${recordPath}`);
};

const resolveJsonPointer = (document, pointer) => {
  if (pointer === '') return document;
  assert.match(pointer, /^\//, `RFC 6901 JSON Pointer가 아닙니다: ${pointer}`);
  return pointer.slice(1).split('/').reduce((value, token) => {
    const key = token.replace(/~1/g, '/').replace(/~0/g, '~');
    assert.ok(value !== null && typeof value === 'object' && Object.hasOwn(value, key), `JSON Pointer 경로를 찾을 수 없습니다: ${pointer}`);
    return value[key];
  }, document);
};

const publicRepositoryPath = (bundle) => {
  const repositoryPath = bundle.repositoryPath
    || (typeof bundle.file === 'string' ? bundle.file.replace(/^\//, 'public/') : '');
  assert.ok(repositoryPath.startsWith('public/map-activities/data/'), `bundle은 송현 전용 public data 경로에 있어야 합니다: ${repositoryPath}`);
  return fromRoot(repositoryPath);
};

const populatedIdValue = (value) => value !== null && value !== undefined && value !== '';
const duplicateAudit = (records, fieldPath) => {
  const counts = new Map();
  const displayValues = new Map();
  let populatedCount = 0;
  for (const record of records) {
    const value = record && typeof record === 'object' ? record[fieldPath] : undefined;
    if (!populatedIdValue(value)) continue;
    populatedCount += 1;
    const key = JSON.stringify(value);
    counts.set(key, (counts.get(key) || 0) + 1);
    displayValues.set(key, value);
  }
  const duplicates = [...counts.entries()]
    .filter(([, count]) => count > 1)
    .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)
    .map(([key, count]) => ({ value: displayValues.get(key), count }));
  return {
    populatedCount,
    missingCount: records.length - populatedCount,
    uniqueCount: counts.size,
    duplicateValueCount: duplicates.length,
    duplicateRecordCount: duplicates.reduce((sum, duplicate) => sum + duplicate.count, 0),
    duplicateExcessCount: duplicates.reduce((sum, duplicate) => sum + duplicate.count - 1, 0),
    duplicates,
  };
};

test('Map & Activities는 좌측 세 번째 expandable parent와 원본의 6개 nested route를 그대로 제공한다', async () => {
  const [layout, app, page] = await Promise.all([
    read('src/components/Layout.jsx'),
    read('src/App.jsx'),
    read('src/pages/MapActivities.jsx'),
  ]);

  const primaryItems = layout.match(/const primaryItems\s*=\s*\[([\s\S]*?)\n\];/)?.[1] || '';
  const taskIndex = primaryItems.indexOf("name: '통합업무보드'");
  const mapIndex = primaryItems.indexOf("name: 'Map & Activities'");
  const milestoneIndex = primaryItems.indexOf("name: '마일스톤 및 R&R'");
  assert.ok(taskIndex >= 0 && taskIndex < mapIndex && mapIndex < milestoneIndex, 'Map & Activities parent는 통합업무보드 다음 세 번째 주 메뉴여야 합니다.');
  assert.match(primaryItems, /name:\s*'Map & Activities'[\s\S]{0,180}?path:\s*'\/map-activities'[\s\S]{0,180}?children:\s*\[/);
  for (const { label, slug } of MAP_SECTIONS) {
    assert.match(primaryItems, new RegExp(`\\{\\s*name:\\s*'${label}',\\s*path:\\s*'/map-activities/${slug}'\\s*\\}`), `${label} 하위 메뉴 누락`);
  }

  assert.match(layout, /function ExpandableMainMenu\b/);
  assert.match(layout, /aria-expanded=\{collapsed \? undefined : expanded\}/);
  assert.match(layout, /aria-controls=\{collapsed \? undefined : submenuId\}/);
  assert.match(layout, /<ChevronRight[^>]*aria-hidden="true"[\s\S]{0,220}?expanded \? 'rotate-90'/, 'parent chevron은 펼침 상태를 시각적으로 반영해야 합니다.');
  assert.match(layout, /const \[expanded, setExpanded\] = useState\(active\)/, 'nested route에서 parent가 자동으로 펼쳐져야 합니다.');
  assert.match(layout, /key=\{`\$\{item\.path\}-\$\{mapActivitiesActive \? 'active' : 'inactive'\}`\}/, 'route active 변경 시 expandable parent 상태가 현재 위치와 동기화돼야 합니다.');
  assert.match(layout, /<NavLink[\s\S]{0,260}?to=\{child\.path\}[\s\S]{0,160}?\bend\b[\s\S]{0,500}?isActive/, '하위 경로는 정확 일치 active NavLink여야 합니다.');
  assert.match(layout, /mapActivitiesActive\s*=\s*pathname\.startsWith\('\/map-activities'\)/);
  assert.match(layout, /active\s*=\{mapActivitiesActive\}/);

  assert.match(app, /import MapActivities from ['"]\.\/pages\/MapActivities['"]/);
  assert.match(app, /<Route path="map-activities">[\s\S]{0,180}?<Route index element=\{<Navigate replace to="integrated-map" \/>\}/, 'parent URL은 첫 섹션으로 replace redirect해야 합니다.');
  for (const { slug } of MAP_SECTIONS) {
    assert.match(app, new RegExp(`<Route path=["']${slug}["'] element=\\{<MapActivities \\/>\\}`), `${slug} nested route 누락`);
  }
  assert.doesNotMatch(app, /<Route path=['"]map-activities['"] element=\{<MapActivities \/>\}/, 'parent와 section route를 하나의 평면 route로 합치면 안 됩니다.');
  assert.ok(page.includes('Map & Activities'));
});

test('Map & Activities 본문은 고정폭 요약화면이 아닌 원본형 viewport-fill workspace다', async () => {
  const [page, layout, leafletMap] = await Promise.all([
    read('src/pages/MapActivities.jsx'),
    read('src/components/Layout.jsx'),
    read('src/components/map-activities/SonghyeonLeafletMap.jsx'),
  ]);

  assert.doesNotMatch(page, /\bWorkspacePageFrame\b|w-\[1200px\]|max-w-\[1200px\]/, '지도 workspace를 고정 1200px 문서 Frame에 넣으면 안 됩니다.');
  assert.match(page, /data-map-activities-workspace/);
  const rootTag = page.match(/<(?:div|main)\b[^>]*data-map-activities-workspace[^>]*>/)?.[0] || '';
  assert.ok(rootTag, 'Map workspace root를 찾을 수 없습니다.');
  assert.match(rootTag, /\bh-full\b/, 'Map workspace root는 Layout이 제공한 viewport 높이를 전부 사용해야 합니다.');
  assert.match(rootTag, /\bmin-h-0\b/, 'Map workspace root는 flex 자식의 높이 축소를 허용해야 합니다.');
  assert.doesNotMatch(rootTag, /min-h-\[680px\]/, '통합지도 root에 680px 최소높이를 두면 작은 브라우저에서 viewport를 넘깁니다.');
  assert.match(rootTag, /overflow-hidden/, '3열 shell 바깥에서 이중 스크롤이 생기면 안 됩니다.');

  const integratedWorkspace = page.match(/function IntegratedWorkspace\b[\s\S]*?(?=\nfunction BoundaryWorkspace\b)/)?.[0] || '';
  assert.ok(integratedWorkspace, 'IntegratedWorkspace 구현을 찾을 수 없습니다.');
  const integratedRootTag = integratedWorkspace.match(/<(?:div|main)\b[^>]*data-original-view=["']overview["'][^>]*>/)?.[0] || '';
  assert.ok(integratedRootTag, '통합지도 workspace root를 찾을 수 없습니다.');
  assert.match(integratedRootTag, /\bh-full\b/, '통합지도 workspace는 남은 Layout 높이를 전부 채워야 합니다.');
  assert.match(integratedRootTag, /\bmin-h-0\b/, '통합지도 workspace는 브라우저 높이에 맞춰 축소될 수 있어야 합니다.');
  assert.doesNotMatch(integratedWorkspace, /min-h-\[610px\]/, '통합지도에 610px 최소높이를 두면 viewport-fill 높이 체인이 끊깁니다.');

  const integratedCanvasTag = integratedWorkspace.match(/<(?:section|div)\b[^>]*data-map-canvas[^>]*>/)?.[0] || '';
  assert.ok(integratedCanvasTag, '통합지도 canvas를 찾을 수 없습니다.');
  assert.match(integratedCanvasTag, /\bh-full\b/, '통합지도 canvas가 grid row 높이를 전부 채워야 합니다.');
  assert.match(integratedCanvasTag, /\bmin-h-0\b/, '통합지도 canvas는 viewport보다 큰 최소높이를 강제하면 안 됩니다.');
  const integratedLeaflet = integratedWorkspace.match(/<SonghyeonLeafletMap\b[\s\S]*?\/>/)?.[0] || '';
  assert.ok(integratedLeaflet, '통합지도 Leaflet 인스턴스를 찾을 수 없습니다.');
  assert.match(integratedLeaflet, /className=["'][^"']*\bh-full\b[^"']*["']/, 'Leaflet root가 통합지도 canvas 높이를 전부 채워야 합니다.');

  assert.match(page, /(?:grid-cols-\[|gridTemplateColumns|data-map-controls|data-map-inspector)/, '원본처럼 제어영역과 작업영역을 나눈 full-browser workspace여야 합니다.');
  assert.match(page, /data-map-canvas|data-map-stage/, '지도·차트·테이블을 보여주는 중앙 작업영역이 필요합니다.');
  assert.match(page, /<input\b[^>]*onChange=|<select\b[^>]*onChange=/, '검색·필터 control은 실제 입력을 제공해야 합니다.');
  assert.match(leafletMap, /<div\s+ref=\{containerRef\}\s+className="absolute inset-0"\s*\/>/, '중앙 canvas는 실제 Leaflet map container를 렌더해야 합니다.');
  assert.match(leafletMap, /role="region"\s+aria-label=\{ariaLabel\}/, '실제 지도에도 접근 가능한 이름이 있어야 합니다.');

  const layoutMain = layout.match(/<main\s+ref=\{mainRef\}\s+className=\{`[^`]+`\}>/)?.[0] || '';
  assert.ok(layoutMain, 'Layout outer main을 찾을 수 없습니다.');
  assert.match(layoutMain, /mapActivitiesActive\s*\?\s*['"][^'"]*overflow-hidden[^'"]*['"]\s*:\s*['"][^'"]*overflow-y-auto/, 'Layout main도 Map route에서만 outer scroll을 잠가야 합니다.');
  const layoutMapHeightBranch = layout.match(/mapActivitiesActive\s*\?\s*['"]([^'"]*)['"]\s*:\s*['"][^'"]*min-h-full[^'"]*['"]/)?.[1] || '';
  assert.ok(layoutMapHeightBranch, 'Layout dark wrapper의 Map route 높이 분기를 찾을 수 없습니다.');
  assert.match(layoutMapHeightBranch, /\bh-full\b/, 'Layout dark wrapper는 Map route에서 definite height를 제공해야 합니다.');
  assert.match(layoutMapHeightBranch, /\bmin-h-0\b/, 'Layout dark wrapper는 Map route에서 자식이 viewport 안으로 축소되게 해야 합니다.');
});

test('통합지도 점포 grouping은 lucide Map 아이콘이 native Map 생성자를 shadowing하지 않는다', async () => {
  const page = await read('src/pages/MapActivities.jsx');
  const lucideImport = page.match(/import\s*\{([\s\S]*?)\}\s*from\s*['"]lucide-react['"]/)?.[1] || '';
  assert.ok(lucideImport, 'lucide-react named import를 찾을 수 없습니다.');
  assert.match(lucideImport, /^\s*Map\s+as\s+MapIcon\s*,?\s*$/m, 'lucide Map 아이콘은 MapIcon 별칭으로 가져와야 합니다.');
  assert.doesNotMatch(lucideImport, /^\s*Map\s*,?\s*$/m, 'Map 이름을 lucide 아이콘이 차지하면 native Map 생성자를 호출할 수 없습니다.');
  assert.doesNotMatch(page, /id:\s*['"]integrated-map['"][^\n]*\bicon:/, '상단에는 제목·부제목 외 아이콘을 표시하면 안 됩니다.');

  const groupStores = page.match(/function groupStores\b[\s\S]*?(?=\nfunction\s)/)?.[0] || '';
  assert.ok(groupStores, 'groupStores 구현을 찾을 수 없습니다.');
  assert.match(groupStores, /const\s+grouped\s*=\s*new\s+Map\s*\(\s*\)\s*;/, '점포 grouping은 native Map 컬렉션을 생성해야 합니다.');
  assert.doesNotMatch(groupStores, /new\s+MapIcon\b/, '아이콘 컴포넌트를 점포 grouping 생성자로 호출하면 안 됩니다.');
});

test('지도 레이어의 긴 운영구역 이름은 한 줄로 표시한다', async () => {
  const page = await read('src/pages/MapActivities.jsx');
  const layerCluster = page.match(/function LayerCluster\b[\s\S]*?(?=\nfunction BasemapSelect\b)/)?.[0] || '';
  assert.match(layerCluster, /whitespace-nowrap/, '운영구역 이름이 두 줄로 떨어지지 않도록 줄바꿈을 막아야 합니다.');
  assert.doesNotMatch(layerCluster, /item\.count|formatNumber\(item\.count\)|tabular-nums/, '레이어 탭 우측에 개수 숫자를 별도로 표시하면 안 됩니다.');
  const integratedWorkspace = page.match(/function IntegratedWorkspace\b[\s\S]*?(?=\nfunction BoundaryWorkspace\b)/)?.[0] || '';
  assert.match(integratedWorkspace, /min-\[701px\]:grid-cols-\[230px_minmax\(0,1fr\)\][\s\S]*?min-\[981px\]:grid-cols-\[270px_minmax\(0,1fr\)\]/, '지도 레이어 패널은 기존 폭을 유지해야 합니다.');
});

test('Map & Activities 각 화면 상단은 메뉴명과 한글 페이지명만 표시한다', async () => {
  const [page, governance] = await Promise.all([
    read('src/pages/MapActivities.jsx'),
    read('src/components/map-activities/SonghyeonMarketGovernanceViews.jsx'),
  ]);
  const header = page.match(/function Header\b[\s\S]*?(?=\nfunction LayerCluster\b)/)?.[0] || '';
  assert.ok(header, 'Map & Activities Header를 찾을 수 없습니다.');
  assert.match(header, /Map & Activities/);
  assert.match(header, /\{section\.label\}/);
  assert.doesNotMatch(page, /\beyebrow\b|AREA OVERVIEW|OPERATING BOUNDARY|ASSETS & LEASES|IGIS RETAIL|MARKET & ACTIVITIES|INSTITUTIONS & COMMUNITY/, '각 페이지 상단의 영문 부제목을 다시 표시하면 안 됩니다.');
  for (const removed of ['전체 원본 연결', 'READ ONLY', '원본 21개 데이터셋', 'sumOfDatasetRecordCounts', 'section.icon', '<Icon']) {
    assert.doesNotMatch(header, new RegExp(removed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `상단 불필요 요소가 남아 있습니다: ${removed}`);
  }
  const institutionsHeader = governance.match(/<header className="mb-4[\s\S]*?<\/header>/)?.[0] || '';
  assert.match(institutionsHeader, /계획·제도와 기관·공동체 원문 기록/);
  assert.doesNotMatch(governance, /PLANS & REGULATIONS|ORGANIZATIONS|시행연도 내림차순|활동 원문 포함/, '제도·공동체 영역 제목에는 한글 제목 외 임의 영문·보조문구를 넣으면 안 됩니다.');
  assert.doesNotMatch(institutionsHeader, /INSTITUTIONS & COMMUNITY|인사이트|전략|활동 좌표|위치 미확인|data-governance-map|<button\b/, '제도·공동체 상단에는 한글 제목만 남아야 합니다.');
});

test('제도·공동체의 계획과 기관 영역은 패널·그룹·카드 계층을 서로 다른 색과 간격으로 구분한다', async () => {
  const governance = await read('src/components/map-activities/SonghyeonMarketGovernanceViews.jsx');
  const workspace = governance.match(/export function InstitutionsCommunityWorkspace\b[\s\S]*$/)?.[0] || '';
  const planAccordion = governance.match(/function PlanAccordion\b[\s\S]*?(?=\nfunction OrganizationAccordion\b)/)?.[0] || '';
  const organizationAccordion = governance.match(/function OrganizationAccordion\b[\s\S]*?(?=\nfunction planAnchor\b)/)?.[0] || '';

  const plansPanel = workspace.match(/<section\b(?=[^>]*data-governance-plans-panel)[^>]*>/)?.[0] || '';
  const organizationsPanel = workspace.match(/<section\b(?=[^>]*data-governance-organizations-panel)[^>]*>/)?.[0] || '';
  assert.ok(plansPanel, '계획·제도 패널의 안정적인 식별자가 필요합니다.');
  assert.ok(organizationsPanel, '기관·공동체 패널의 안정적인 식별자가 필요합니다.');
  assert.match(plansPanel, /border-\[#40515d\]/, '계획 패널은 청회색 경계를 사용해야 합니다.');
  assert.match(plansPanel, /bg-\[#20272b\]/, '계획 패널은 청회색 바탕을 사용해야 합니다.');
  assert.match(organizationsPanel, /border-\[#51475a\]/, '기관 패널은 자주색 경계를 사용해야 합니다.');
  assert.match(organizationsPanel, /bg-\[#272329\]/, '기관 패널은 자주색 바탕을 사용해야 합니다.');
  assert.notEqual(plansPanel, organizationsPanel, '좌우 패널을 같은 시각 토큰으로 되돌리면 안 됩니다.');

  const plansHeader = workspace.match(/<section\b(?=[^>]*data-governance-plans-panel)[^>]*>\s*(<header\b[^>]*>)/)?.[1] || '';
  const organizationsHeader = workspace.match(/<section\b(?=[^>]*data-governance-organizations-panel)[^>]*>\s*(<header\b[^>]*>)/)?.[1] || '';
  assert.match(plansHeader, /border-t-\[#6f98b2\]/, '계획 패널 머리에는 청회색 상단 accent가 필요합니다.');
  assert.match(organizationsHeader, /border-t-\[#a486b3\]/, '기관 패널 머리에는 자주색 상단 accent가 필요합니다.');
  assert.match(plansHeader, /\bpx-5\b/, '패널 머리의 좌우 여백을 확보해야 합니다.');
  assert.match(organizationsHeader, /\bpx-5\b/, '패널 머리의 좌우 여백을 확보해야 합니다.');

  const planGroupHeader = workspace.match(/data-governance-plan-group><div className="([^"]+)"/)?.[1] || '';
  const organizationGroupHeader = workspace.match(/data-governance-organization-group><div className="([^"]+)"/)?.[1] || '';
  for (const [label, groupHeader] of [['계획 연도', planGroupHeader], ['기관 유형', organizationGroupHeader]]) {
    assert.ok(groupHeader, `${label} 그룹 머리를 찾을 수 없습니다.`);
    assert.match(groupHeader, /\bmb-3\b/, `${label} 그룹과 카드 사이 간격이 필요합니다.`);
    assert.match(groupHeader, /rounded-\[8px\]/, `${label} 그룹 머리는 카드와 구별되는 막대여야 합니다.`);
    assert.match(groupHeader, /\bborder\b/, `${label} 그룹 머리에 경계가 필요합니다.`);
    assert.match(groupHeader, /bg-\[#[a-fA-F0-9]{6}\]/, `${label} 그룹 머리에 별도 배경이 필요합니다.`);
    assert.match(groupHeader, /\bpx-3\b[\s\S]*\bpy-2\b/, `${label} 그룹 머리의 내부 여백을 유지해야 합니다.`);
  }
  assert.notEqual(planGroupHeader, organizationGroupHeader, '계획 연도와 기관 유형 그룹 바의 색 체계가 같으면 안 됩니다.');
  assert.match(workspace, /data-governance-plans-panel[\s\S]{0,700}?className="space-y-6 p-4"[\s\S]{0,900}?data-governance-plan-group[\s\S]{0,700}?className="space-y-3"/, '계획 그룹과 카드 사이에 6/3단계 수직 간격이 필요합니다.');
  assert.match(workspace, /data-governance-organizations-panel[\s\S]{0,700}?className="space-y-6 p-4"[\s\S]{0,900}?data-governance-organization-group[\s\S]{0,700}?className="space-y-3"/, '기관 그룹과 카드 사이에 6/3단계 수직 간격이 필요합니다.');

  assert.match(planAccordion, /data-governance-card="plan"/, '계획 카드 식별자가 필요합니다.');
  assert.match(organizationAccordion, /data-governance-card="organization"/, '기관 카드 식별자가 필요합니다.');
  for (const [label, accordion] of [['계획', planAccordion], ['기관', organizationAccordion]]) {
    assert.match(accordion, /border-l-\[3px\]/, `${label} 카드에 패널 색을 잇는 3px accent가 필요합니다.`);
    assert.match(accordion, /shadow-\[/, `${label} 카드는 패널 바탕에서 분리되는 그림자가 필요합니다.`);
    assert.match(accordion, /\bp-3\.5\b/, `${label} 카드 제목부의 내부 여백을 유지해야 합니다.`);
  }
  assert.match(planAccordion, /border-l-\[#5f8299\]/, '계획 카드 accent는 청회색이어야 합니다.');
  assert.match(organizationAccordion, /border-l-\[#9b7eaa\]/, '기관 카드 accent는 자주색이어야 합니다.');
  assert.doesNotMatch(`${planAccordion}\n${organizationAccordion}`, /text-\[#7e8084\]|text-\[#77797d\]/, '카드 핵심 요약을 기존의 지나치게 흐린 회색으로 되돌리면 안 됩니다.');
});

test('제도·공동체 가독성 개선은 계획·기관 원문과 상세 상호작용을 전량 유지한다', async () => {
  const [governance, plans, organizations] = await Promise.all([
    read('src/components/map-activities/SonghyeonMarketGovernanceViews.jsx'),
    read('references/map-activities/datasets/plans.json').then(JSON.parse),
    read('references/map-activities/datasets/organizations.json').then(JSON.parse),
  ]);
  const workspace = governance.match(/export function InstitutionsCommunityWorkspace\b[\s\S]*$/)?.[0] || '';
  const planAccordion = governance.match(/function PlanAccordion\b[\s\S]*?(?=\nfunction OrganizationAccordion\b)/)?.[0] || '';
  const organizationAccordion = governance.match(/function OrganizationAccordion\b[\s\S]*?(?=\nfunction planAnchor\b)/)?.[0] || '';

  assert.equal(plans.length, 27, '계획·제도 원본 27건을 유지해야 합니다.');
  assert.equal(organizations.length, 22, '기관·공동체 원본 22곳을 유지해야 합니다.');
  assert.equal(new Set(plans.map((plan) => plan.id)).size, plans.length, '계획 원본 ID가 누락·중복되면 안 됩니다.');
  assert.equal(new Set(organizations.map((organization) => organization.id)).size, organizations.length, '기관 원본 ID가 누락·중복되면 안 됩니다.');

  assert.match(workspace, /const plans = rowsOf\(institutionData, ['"]plans['"]\)/);
  assert.match(workspace, /const organizations = rowsOf\(institutionData, ['"]organizations['"]\)/);
  assert.match(workspace, /plans\.forEach\(\(plan\) =>/, '계획 그룹은 원본 계획을 전량 순회해야 합니다.');
  assert.match(workspace, /planGroups\.map\([\s\S]{0,900}?rows\.map\(\(plan\) => <PlanAccordion\b/, '그룹 안의 모든 계획을 카드로 렌더해야 합니다.');
  assert.match(workspace, /organizationGroups\.map\([\s\S]{0,900}?rows\.map\(\(organization\) => <OrganizationAccordion\b/, '그룹 안의 모든 기관을 카드로 렌더해야 합니다.');
  assert.match(workspace, /계획·제도 \{plans\.length\}건/);
  assert.match(workspace, /공동체·활동 기록 · \{organizations\.length\}곳/);

  for (const label of ['공간범위', '시행일', '상태', '적용 후보', '확인일', '핵심 내용', '송현 영향', '추가 확인', '관련 공간 지도']) {
    assert.ok(planAccordion.includes(label), `계획 원문 상세 항목을 유지해야 합니다: ${label}`);
  }
  for (const label of ['확인 역할', '연결 가능성', '활동 요약', '확인일', '근거', '확인된 활동', '활동 원문']) {
    assert.ok(organizationAccordion.includes(label), `기관 원문 상세 항목을 유지해야 합니다: ${label}`);
  }
  assert.match(workspace, /insights\.map\(\(insight\) => <article\b/, '판단 인사이트 원문을 계속 전량 렌더해야 합니다.');
  assert.match(workspace, /strategies\.map\(\(strategy\) => <article\b/, '권역 전략 원문을 계속 전량 렌더해야 합니다.');
  assert.match(workspace, /\{mapPlan && <RelatedSpaceDialog\b/, '관련 공간 지도 상호작용을 유지해야 합니다.');
});

test('계획 카드 요약은 위치·면적·구역을 제목 아래에 표시하고 기존 최하단 설명은 숨긴다', async () => {
  const governance = await read('src/components/map-activities/SonghyeonMarketGovernanceViews.jsx');
  const planAccordion = governance.match(/function PlanAccordion\b[\s\S]*?(?=\nfunction OrganizationAccordion\b)/)?.[0] || '';
  const summaryButton = planAccordion.match(/<button\b[\s\S]*?<\/button>/)?.[0] || '';
  assert.match(summaryButton, /plan\.type[\s\S]*?plan\.title[\s\S]*?plan\.scope/, '계획 유형과 제목 다음에 위치·면적·구역 문구가 와야 합니다.');
  assert.doesNotMatch(summaryButton, /plan\.feature/, '기존 최하단 적용·고시 설명은 요약 카드에 표시하지 않아야 합니다.');
});

test('통합지도 점포 레이어는 원본의 전량·위치 grouping·업종 범례를 빠짐없이 유지한다', async () => {
  const [page, leafletMap, stores, displayAudit] = await Promise.all([
    read('src/pages/MapActivities.jsx'),
    read('src/components/map-activities/SonghyeonLeafletMap.jsx'),
    read('references/map-activities/datasets/stores.json').then(JSON.parse),
    read('references/map-activities/datasets/store_display_audit.json').then(JSON.parse),
  ]);
  const expectedLegend = [
    ['과학·기술', '#3d63b8'],
    ['교육', '#7149a8'],
    ['보건의료', '#0086ad'],
    ['부동산', '#566270'],
    ['소매', '#00887a'],
    ['수리·개인', '#ca4f8d'],
    ['숙박', '#ef9b25'],
    ['시설관리·임대', '#8b6b32'],
    ['예술·스포츠', '#9c5a3c'],
    ['음식', '#d84a3a'],
  ];

  const legendConstant = page.match(/const\s+STORE_CATEGORY_LEGEND\s*=\s*\[([\s\S]*?)\n\];/)?.[1] || '';
  assert.ok(legendConstant, '원본 점포 업종 범례 상수를 찾을 수 없습니다.');
  const legendItems = [...legendConstant.matchAll(/\[\s*['"]([^'"]+)['"]\s*,\s*['"](#[a-fA-F0-9]{6})['"]\s*\]/g)]
    .map((match) => [match[1], match[2].toLowerCase()]);
  assert.deepEqual(legendItems, expectedLegend, '점포 범례의 업종·색상·표시 순서는 원본과 정확히 같아야 합니다.');
  assert.match(page, /const\s+MULTI_STORE_COLOR\s*=\s*['"]#69736e['"]/, '동일 위치의 다수 점포는 원본 전용 회색을 사용해야 합니다.');
  assert.match(page, /const\s+STORE_FALLBACK_COLOR\s*=\s*['"]#818b87['"]/, '알 수 없는 단일점포 업종은 원본 기타 색으로 표시해야 합니다.');

  const integratedWorkspace = page.match(/function IntegratedWorkspace\b[\s\S]*?(?=\nfunction BoundaryWorkspace\b)/)?.[0] || '';
  assert.ok(integratedWorkspace, 'IntegratedWorkspace 구현을 찾을 수 없습니다.');
  const layerDefaults = integratedWorkspace.match(/const\s*\[layers,\s*setLayers\]\s*=\s*useState\(\{([\s\S]*?)\}\);/)?.[1] || '';
  assert.match(layerDefaults, /\bstoresEast:\s*false\b/, '원본처럼 점포 레이어와 점포 범례는 최초에 꺼져 있어야 합니다.');
  assert.match(integratedWorkspace, /\{layers\.storesEast\s*&&\s*\([\s\S]*?data-store-category-legend[\s\S]*?STORE_CATEGORY_LEGEND\.map[\s\S]*?MULTI_STORE_COLOR[\s\S]*?다수 점포[\s\S]*?\)\}/, '점포 범례는 storesEast를 켰을 때만 10개 업종과 다수 점포를 표시해야 합니다.');
  assert.match(integratedWorkspace, /label:\s*`상점·점포\s*\$\{formatNumber\(market\.store_display_audit\.east_store_count\)\}개\s*·\s*\$\{formatNumber\(market\.store_display_audit\.east_location_count\)\}곳/, '점포 레이어 라벨에 원본의 점포 수와 지도 위치 수를 모두 표시해야 합니다.');

  assert.match(integratedWorkspace, /groupStores\(stores\.filter\(\(item\)\s*=>\s*item\.east\)\)/, '통합지도는 대안 3의 모든 점포를 grouping 함수에 전달해야 합니다.');
  const groupStores = page.match(/function groupStores\b[\s\S]*?(?=\nfunction\s)/)?.[0] || '';
  assert.match(groupStores, /stores\.forEach\(\(store\)\s*=>/, '점포 grouping은 전달받은 레코드를 전부 순회해야 합니다.');
  assert.match(groupStores, /Number\(store\.lon\)\.toFixed\(7\)[\s\S]{0,100}?Number\(store\.lat\)\.toFixed\(7\)/, '원본처럼 경도·위도 7자리 좌표로 동일 위치를 묶어야 합니다.');
  assert.match(groupStores, /grouped\.get\(key\)\.records\.push\(store\)/, '동일 위치에 포함된 점포 레코드를 하나도 버리면 안 됩니다.');
  assert.doesNotMatch(groupStores, /\.(?:slice|splice)\s*\(|\b(?:sample|limit|maxStores|truncate)\b/i, '통합지도 점포를 샘플링·절단하면 안 됩니다.');
  assert.match(groupStores, /group\.records\.length\s*>\s*1[\s\S]{0,100}?MULTI_STORE_COLOR[\s\S]{0,180}?STORE_CATEGORY_COLORS\[group\.records\[0\]\?\.category1\][\s\S]{0,100}?STORE_FALLBACK_COLOR/, '다수 점포와 단일점포 업종색을 원본 규칙대로 구분해야 합니다.');
  assert.match(leafletMap, /fillColor:\s*group\.color\s*\|\|/, 'grouping에서 정한 원본 점포색을 Leaflet 마커에 실제 적용해야 합니다.');

  const eastStores = stores.filter((store) => store.east);
  const eastLocationGroups = new Map();
  for (const store of eastStores) {
    const key = `${Number(store.lat).toFixed(7)},${Number(store.lon).toFixed(7)}`;
    eastLocationGroups.set(key, (eastLocationGroups.get(key) || 0) + 1);
  }
  assert.equal(eastStores.length, 2_370, '원본 대안 3 점포 수');
  assert.equal(eastLocationGroups.size, 788, '원본 대안 3 지도 위치 수');
  assert.equal([...eastLocationGroups.values()].filter((count) => count > 1).length, 336, '다수 점포 전용 마커가 필요한 위치 수');
  assert.deepEqual(
    { stores: displayAudit.east_store_count, locations: displayAudit.east_location_count },
    { stores: eastStores.length, locations: eastLocationGroups.size },
    '표시 audit와 실제 전달 대상 점포·위치 수가 일치해야 합니다.',
  );
});

test('통합지도 상세는 중복 패널 없이 마커 팝업에서만 열리고 관련 기록으로 이동한다', async () => {
  const [page, leafletMap, assetViews, marketGovernanceViews] = await Promise.all([
    read('src/pages/MapActivities.jsx'),
    read('src/components/map-activities/SonghyeonLeafletMap.jsx'),
    read('src/components/map-activities/SonghyeonAssetRetailViews.jsx'),
    read('src/components/map-activities/SonghyeonMarketGovernanceViews.jsx'),
  ]);

  assert.doesNotMatch(page, /function\s+SelectionCard\b|<SelectionCard\b|data-map-selection|선택 상세/, '지도 위 팝업과 별도로 뜨는 우측 선택 상세 패널을 만들면 안 됩니다.');
  assert.match(leafletMap, /layer\.bindPopup\(/, '상세는 해당 지도 객체에 고정된 Leaflet 팝업으로 열어야 합니다.');
  assert.match(leafletMap, /appendPopupAction\(root,\s*action\)/, '마커 팝업 안에서 관련 화면 이동 액션을 제공해야 합니다.');
  assert.match(leafletMap, /onMarkerActionRef\.current\(\{\s*\.\.\.marker,\s*key\s*\}\)/, '팝업 액션이 선택 마커의 기록으로 이동해야 합니다.');

  const integratedWorkspace = page.match(/function IntegratedWorkspace\b[\s\S]*?(?=\nfunction BoundaryWorkspace\b)/)?.[0] || '';
  const destinations = [
    ['/map-activities/assets-leases', 'asset'],
    ['/map-activities/market-activities', 'program'],
    ['/map-activities/institutions-community', 'plan'],
  ];
  for (const [route, parameter] of destinations) {
    assert.ok(integratedWorkspace.includes(route), `통합지도 상세 이동 목적지 누락: ${route}`);
    assert.match(integratedWorkspace, new RegExp(`[?&]${parameter}=\\$\\{encodeURIComponent\\(`), `${route} 이동 시 선택 기록 ID를 ${parameter} query로 보존해야 합니다.`);
  }
  assert.match(integratedWorkspace, /<SonghyeonLeafletMap\b[\s\S]{0,900}?onMarkerAction=\{handleMarkerAction\}/, '마커 팝업과 상세 이동 handler가 직접 연결되어야 합니다.');

  assert.match(page, /(?:new\s+URLSearchParams\(search\)|useSearchParams\(\))/, 'nested route 도착 후 선택 기록 query를 읽어야 합니다.');
  for (const parameter of ['asset', 'program', 'plan']) {
    assert.match(page, new RegExp(`\\.get\\(['"]${parameter}['"]\\)`), `${parameter} query를 대상 workspace에 전달해야 합니다.`);
  }
  assert.match(page, /<AssetLeaseWorkspace\b[\s\S]{0,700}?\b(?:initialAssetId|focusAssetId|requestedAssetId)=\{/, '자산·임차 화면에 선택 자산 ID를 전달해야 합니다.');
  assert.match(page, /<MarketActivitiesWorkspace\b[\s\S]{0,700}?\b(?:initialProgramId|focusProgramId|requestedProgramId)=\{/, '상권·활동 화면에 선택 활동 ID를 전달해야 합니다.');
  assert.match(page, /<InstitutionsCommunityWorkspace\b[\s\S]{0,700}?\b(?:initialPlanId|focusPlanId|requestedPlanId)=\{/, '제도·공동체 화면에 선택 계획 ID를 전달해야 합니다.');

  const assetWorkspace = assetViews.match(/export function AssetLeaseWorkspace\b[\s\S]*?(?=\n(?:export\s+)?function RetailMap\b)/)?.[0] || '';
  assert.match(assetWorkspace, /(?:initialAssetId|focusAssetId|requestedAssetId)/, '자산·임차 화면은 선택 자산 ID prop을 받아야 합니다.');
  assert.match(assetWorkspace, /useEffect\([\s\S]{0,900}?\.find\([\s\S]{0,260}?\.id[\s\S]{0,260}?(?:initialAssetId|focusAssetId|requestedAssetId)[\s\S]{0,500}?setSelectedAsset/, '선택 자산 ID에 해당하는 AssetDialog를 자동으로 열어야 합니다.');

  const marketWorkspace = marketGovernanceViews.match(/export function MarketActivitiesWorkspace\b[\s\S]*?(?=\nfunction PlanAccordion\b)/)?.[0] || '';
  assert.match(marketWorkspace, /(?:initialProgramId|focusProgramId|requestedProgramId)/, '상권·활동 화면은 선택 활동 ID prop을 받아야 합니다.');
  assert.match(marketGovernanceViews, /program-record-\$\{[^}]*(?:program_id|\.id)[^}]*\}/, '활동 기록마다 원본과 같은 안정적인 DOM target을 제공해야 합니다.');
  assert.match(marketWorkspace, /useEffect\([\s\S]{0,1200}?(?:initialProgramId|focusProgramId|requestedProgramId)[\s\S]{0,1200}?scrollIntoView/, '선택 활동 기록을 찾아 화면에 표시해야 합니다.');

  const institutionWorkspace = marketGovernanceViews.match(/export function InstitutionsCommunityWorkspace\b[\s\S]*$/)?.[0] || '';
  assert.match(institutionWorkspace, /(?:initialPlanId|focusPlanId|requestedPlanId)/, '제도·공동체 화면은 선택 계획 ID prop을 받아야 합니다.');
  assert.match(institutionWorkspace, /useEffect\([\s\S]{0,1600}?(?:initialPlanId|focusPlanId|requestedPlanId)[\s\S]{0,1600}?setOpenPlans[\s\S]{0,1600}?scrollIntoView/, '선택 계획 accordion을 열고 해당 기록을 화면에 표시해야 합니다.');
});

test('지도 팝업은 이용자에게 필요한 정보만 표시하고 내부 필드는 숨긴다', async () => {
  const [page, leafletMap] = await Promise.all([
    read('src/pages/MapActivities.jsx'),
    read('src/components/map-activities/SonghyeonLeafletMap.jsx'),
  ]);

  const labels = leafletMap.match(/const DETAIL_LABELS\s*=\s*\{([\s\S]*?)\n\};/)?.[1] || '';
  assert.ok(labels, '팝업 표시 필드 allowlist를 찾을 수 없습니다.');
  for (const internalKey of ['entity_id', 'coordinate_source', 'inside_bukchon', 'inside_compact', 'inside_east', 'latitude', 'longitude', 'lat', 'lon', 'compact', 'bukchon', 'east', 'checked_at', 'published_at']) {
    assert.doesNotMatch(labels, new RegExp(`(^|\\n)\\s*${internalKey}\\s*:`), `내부 필드 ${internalKey}를 팝업에 노출하면 안 됩니다.`);
  }
  assert.match(leafletMap, /const POPUP_DETAIL_KEYS\s*=\s*new Set\(Object\.keys\(DETAIL_LABELS\)\)/, '팝업은 명시한 표시 필드만 허용해야 합니다.');
  assert.match(leafletMap, /Object\.entries\(record\)\.filter\(\(\[key, value\]\)\s*=>\s*POPUP_DETAIL_KEYS\.has\(key\)/, '원본 레코드를 그대로 출력하지 말고 allowlist로 걸러야 합니다.');
  assert.match(leafletMap, /key === ['"]source_url['"]\s*\?\s*['"]원문 열기['"]/, '긴 원문 URL 대신 원문 열기 버튼 문구를 표시해야 합니다.');

  const markerFactory = page.match(/function markerFromRecord\b[\s\S]*?(?=\nfunction groupStores\b)/)?.[0] || '';
  assert.match(markerFactory, /kind === ['"]landmark['"][\s\S]{0,220}?\{\s*type:[\s\S]{0,220}?address:[\s\S]{0,220}?summary:/, '랜드마크 팝업은 구분·주소·설명만 선별해야 합니다.');
  assert.match(markerFactory, /kind === ['"]public['"][\s\S]{0,260}?\{\s*type:[\s\S]{0,260}?address:[\s\S]{0,260}?organization:[\s\S]{0,260}?summary:[\s\S]{0,260}?source_url:/, '공공공간 팝업은 구분·주소·주체·내용·원문만 선별해야 합니다.');
});

test('마커가 아닌 지도 도형에는 hover 안내를 연결하지 않는다', async () => {
  const leafletMap = await read('src/components/map-activities/SonghyeonLeafletMap.jsx');
  const boundaryBlock = leafletMap.match(/if \(boundaryData\) \{[\s\S]*?(?=\n\s*Object\.entries\(boundaryAnalysis)/)?.[0] || '';
  assert.ok(boundaryBlock, '운영경계 Leaflet 렌더링 구간을 찾을 수 없습니다.');
  assert.doesNotMatch(boundaryBlock, /bindTooltip\(/, '운영경계 면 전체에는 hover 안내를 연결하면 안 됩니다.');

  const interactionHelper = leafletMap.match(/function bindInteraction\b[\s\S]*?(?=\nfunction createTileLayer\b)/)?.[0] || '';
  assert.ok(interactionHelper, 'Leaflet 지도 객체 상호작용 helper를 찾을 수 없습니다.');
  assert.match(interactionHelper, /showTooltip\s*=\s*false/, '지도 객체의 hover 안내는 기본적으로 꺼져 있어야 합니다.');
  assert.match(interactionHelper, /if \(showTooltip\)\s*\{?\s*layer\.bindTooltip\(/, '명시적으로 허용한 마커에만 hover 안내를 연결해야 합니다.');

  const storeMarkerBlock = leafletMap.match(/storeGroups\.forEach\([\s\S]*?(?=\n\s*markers\.forEach\()/)?.[0] || '';
  const markerBlock = leafletMap.match(/markers\.forEach\([\s\S]*?(?=\n\s*selectableLayersRef\.current)/)?.[0] || '';
  assert.match(storeMarkerBlock, /showTooltip:\s*true/, '점포 위치 마커는 필요한 hover 안내를 유지할 수 있어야 합니다.');
  assert.match(markerBlock, /showTooltip:\s*true/, '일반 위치 마커는 필요한 hover 안내를 유지할 수 있어야 합니다.');
  assert.equal((leafletMap.match(/showTooltip:\s*true/g) || []).length, 2, 'hover 안내 허용은 점포 위치와 일반 위치 마커 두 종류로 한정해야 합니다.');
  assert.equal((leafletMap.match(/\.bindTooltip\(/g) || []).length, 1, '경계·분석·계획·건물 도형에서 직접 hover 안내를 연결하면 안 됩니다.');
});

test('모든 공간 화면은 SVG 격자 대체물이 아니라 원본과 같은 상세 Leaflet 지도 서비스를 사용한다', async () => {
  const [packageText, page, leafletMap, assetRetailViews, marketGovernanceViews] = await Promise.all([
    read('package.json'),
    read('src/pages/MapActivities.jsx'),
    read('src/components/map-activities/SonghyeonLeafletMap.jsx'),
    read('src/components/map-activities/SonghyeonAssetRetailViews.jsx'),
    read('src/components/map-activities/SonghyeonMarketGovernanceViews.jsx'),
  ]);
  const packageJson = JSON.parse(packageText);

  assert.equal(packageJson.dependencies?.leaflet, '^1.9.4', 'Leaflet 1.9.4를 정식 runtime dependency로 사용해야 합니다.');
  assert.match(leafletMap, /import\s+L\s+from\s+['"]leaflet['"]/);
  assert.match(leafletMap, /import\s+['"]leaflet\/dist\/leaflet\.css['"]/, '도로·건물·지명 타일뿐 아니라 Leaflet 기본 제어 UI CSS도 로드해야 합니다.');

  assert.ok(
    leafletMap.includes('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'),
    '원본 Voyager 상세 배경지도 URL을 그대로 제공해야 합니다.',
  );
  assert.ok(
    leafletMap.includes('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'),
    '원본 Positron 상세 배경지도 URL을 그대로 제공해야 합니다.',
  );
  const attributionMatches = [...leafletMap.matchAll(/attribution:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
  assert.ok(attributionMatches.length >= 2, '두 CARTO 배경지도 모두 출처 표기를 제공해야 합니다.');
  assert.ok(
    attributionMatches.every((attribution) => attribution === '&copy; OpenStreetMap contributors &copy; CARTO'),
    '배경지도 attribution은 원본의 OpenStreetMap/CARTO 표기를 정확히 유지해야 합니다.',
  );

  const mapOptions = leafletMap.match(/L\.map\(containerRef\.current,\s*\{([\s\S]*?)\n\s*\}\);/)?.[1] || '';
  assert.ok(mapOptions, 'Leaflet map 초기화 옵션을 찾을 수 없습니다.');
  assert.match(mapOptions, /\bzoomControl:\s*true\b/, '지도 확대·축소 제어를 활성화해야 합니다.');
  assert.match(mapOptions, /\bpreferCanvas:\s*true\b/, '원본의 대용량 공간레이어 렌더링 옵션을 유지해야 합니다.');
  assert.match(mapOptions, /\bminZoom:\s*13\b/);
  assert.match(mapOptions, /\bmaxZoom:\s*19\b/);
  assert.doesNotMatch(mapOptions, /\b(?:dragging|scrollWheelZoom|doubleClickZoom|touchZoom|boxZoom|keyboard):\s*false\b/, '지도 이동·확대 상호작용을 막으면 안 됩니다.');
  assert.match(leafletMap, /const DEFAULT_BOUNDS\s*=\s*\[\s*\[\s*37\.5706\s*,\s*126\.9776\s*\]\s*,\s*\[\s*37\.5844\s*,\s*126\.9900\s*\]\s*,?\s*\]/, '원본 송현 공통 지도 범위를 정확히 사용해야 합니다.');
  assert.match(leafletMap, /map\.fitBounds\(DEFAULT_BOUNDS,\s*\{[^}]*padding:\s*\[\s*18\s*,\s*18\s*\]/, '원본의 공통 bounds와 18px padding으로 초기 위치를 맞춰야 합니다.');
  assert.match(leafletMap, /maxZoom:\s*19\b/, '배경 타일도 원본 최대 확대 수준 19를 지원해야 합니다.');

  const viewSources = [
    ['src/pages/MapActivities.jsx', page, 2],
    ['src/components/map-activities/SonghyeonAssetRetailViews.jsx', assetRetailViews, 2],
    ['src/components/map-activities/SonghyeonMarketGovernanceViews.jsx', marketGovernanceViews, 2],
  ];
  for (const [file, source, minimumMapCount] of viewSources) {
    assert.match(source, /import\s+SonghyeonLeafletMap\s+from\s+['"][^'"]*SonghyeonLeafletMap['"]/, `${file}은 공통 상세 Leaflet 지도를 사용해야 합니다.`);
    const mapCount = (source.match(/<SonghyeonLeafletMap\b/g) || []).length;
    assert.ok(mapCount >= minimumMapCount, `${file}의 모든 지도 화면을 Leaflet으로 교체해야 합니다. 예상 ${minimumMapCount}개 이상, 현재 ${mapCount}개`);
    assert.doesNotMatch(source, /Songhyeon(?:Full)?AreaMap/, `${file}에서 SVG 대체 지도를 다시 사용하면 안 됩니다.`);
    assert.doesNotMatch(source, /<pattern\b[^>]*\bid=["'][^"']*(?:map[-_]?grid|grid[-_]?map|governance-grid|asset-retail-grid)[^"']*["']/i, `${file}에 지도처럼 보이게 만든 SVG 격자를 남기면 안 됩니다.`);
    assert.doesNotMatch(source, /<svg\b[\s\S]{0,320}?aria-label=(?:["'][^"']*(?:지도|좌표 분포)[^"']*["']|\{`[^`]*(?:지도|좌표 분포)[^`]*`\})/i, `${file}의 지도 화면을 SVG 좌표 그림으로 렌더하면 안 됩니다.`);
  }

  const runtimeFiles = [...await runtimeDependencyClosure(fromRoot('src/pages/MapActivities.jsx'))]
    .filter((path) => extname(path) !== '.json');
  const runtime = (await Promise.all(runtimeFiles.map((path) => readFile(path, 'utf8')))).join('\n');
  assert.doesNotMatch(runtime, /배경지도\s*미사용|CRS84\s*경량\s*렌더링/i, '배경지도 제거·경량화를 정상 기능처럼 표시하면 안 됩니다.');
  assert.doesNotMatch(runtime, /<pattern\b[^>]*\bid=["'][^"']*(?:map[-_]?grid|grid[-_]?map|governance-grid|asset-retail-grid)[^"']*["']/i, '실행 경로에 SVG 지도 격자가 남아 있으면 안 됩니다.');

  assert.match(leafletMap, /L\.geoJSON\(boundaryData,/, '운영경계 FeatureCollection 전체를 Leaflet에 직접 전달해야 합니다.');
  assert.match(leafletMap, /L\.geoJSON\(analysisData,/, '경계 분석 FeatureCollection 전체를 Leaflet에 직접 전달해야 합니다.');
  assert.match(leafletMap, /L\.geoJSON\(planData,/, '계획·제도 FeatureCollection 전체를 Leaflet에 직접 전달해야 합니다.');
  assert.doesNotMatch(leafletMap, /\b(?:simplif(?:y|ied|ication)|decimat(?:e|ion)|downsample|featureLimit|maxFeatures|sampleRate)\b/i, 'GeoJSON 도형이나 레코드를 임의 단순화·샘플링하면 안 됩니다.');
  assert.doesNotMatch(leafletMap, /(?:boundaryData|analysisData|planData)\.features\s*\.(?:slice|splice|filter)\b/, 'Leaflet에 넘기기 전에 GeoJSON feature를 자르거나 제외하면 안 됩니다.');

  assert.match(leafletMap, /\.leaflet-container\s*\{[\s\S]*?font-size:\s*14px\b/, 'Leaflet 지도 기본 텍스트를 14px 이상으로 고정해야 합니다.');
  assert.match(leafletMap, /\.leaflet-control[\s\S]*?font-size:\s*14px\b/, '지도 제어·출처·팝업 텍스트도 14px 이상이어야 합니다.');
});

test('자산·임차 지도는 로드 후 전체 마커 기준으로 다시 맞추며 경계를 왼쪽으로 밀지 않는다', async () => {
  const assetViews = await read('src/components/map-activities/SonghyeonAssetRetailViews.jsx');
  const assetMap = assetViews.match(/function AssetLocationPlot\b[\s\S]*?(?=\nfunction TenantChip\b)/)?.[0] || '';
  assert.ok(assetMap, '자산·임차 위치 지도 구현을 찾을 수 없습니다.');
  assert.match(assetMap, /<SonghyeonLeafletMap\b/, '자산·임차 화면은 상세 Leaflet 지도를 유지해야 합니다.');
  assert.match(assetMap, /boundaryVisibility=\{ASSET_BOUNDARY_VISIBILITY\}/, '부모 재렌더 때 경계 visibility 객체를 새로 만들면 지도 레이어가 불필요하게 다시 계산됩니다.');
  assert.doesNotMatch(assetMap, /\bfitVisible\b/, '자산·랜드마크 전체 좌표로 두 번째 자동 fit을 실행하면 경계가 왼쪽으로 이동합니다.');
});

test('상권·활동과 이지스 리테일 지도는 진입 시 타일과 화면을 중복 초기화하지 않는다', async () => {
  const [leafletMap, assetViews, marketViews] = await Promise.all([
    read('src/components/map-activities/SonghyeonLeafletMap.jsx'),
    read('src/components/map-activities/SonghyeonAssetRetailViews.jsx'),
    read('src/components/map-activities/SonghyeonMarketGovernanceViews.jsx'),
  ]);

  assert.match(leafletMap, /const tileLayerNameRef = useRef\(null\)/, '현재 배경지도 종류를 기억해 같은 타일을 다시 만들지 않아야 합니다.');
  assert.match(leafletMap, /tileLayerRef\.current\s*&&\s*tileLayerNameRef\.current === basemap\) return;/, '최초 Voyager 타일을 즉시 제거·재생성하면 안 됩니다.');
  assert.match(leafletMap, /const deferInitialTileRef = useRef\(fitVisible \|\| focusSelected\)/, '화면 맞춤 지도는 최종 범위를 계산하기 전에 기본 타일을 먼저 그리면 안 됩니다.');
  assert.match(leafletMap, /applyViewport\(\);[\s\S]{0,500}?deferInitialTileRef\.current = false;[\s\S]{0,500}?createTileLayer\(nextBasemap\)\.addTo\(map\)/, '최종 중심·확대 수준을 적용한 뒤 타일을 한 번만 표시해야 합니다.');
  assert.match(leafletMap, /currentCenter\.distanceTo\(center\) < 0\.5\) return;/, '같은 중심과 확대 수준으로 setView를 반복해 타일을 다시 그리면 안 됩니다.');
  const viewportBlock = leafletMap.match(/const applyViewport = \(\) => \{[\s\S]*?(?=\n\s*return \(\) => \{)/)?.[0] || '';
  assert.equal((viewportBlock.match(/applyViewport\(\);/g) || []).length, 1, '화면 맞춤은 한 프레임에서 한 번만 실행해야 합니다.');
  assert.doesNotMatch(viewportBlock, /viewportTimer|setTimeout/, '진입 후 타이머로 화면을 다시 맞추면 지도가 깜빡입니다.');

  const retailMap = assetViews.match(/function RetailMap\b[\s\S]*?(?=\nfunction RetailSummary\b)/)?.[0] || '';
  const retailFeatureLayers = retailMap.match(/const featureLayers = useMemo\([\s\S]*?\n\s*const badgeMarkers/)?.[0] || '';
  const retailBadgeMarkers = retailMap.match(/const badgeMarkers = useMemo\([\s\S]*?\n\s*const activeMapKey/)?.[0] || '';
  assert.doesNotMatch(retailFeatureLayers, /\]\s*,?\s*\[[^\]]*highlightedAsset/, 'hover마다 리테일 건물 레이어 전체를 다시 만들면 안 됩니다.');
  assert.doesNotMatch(retailBadgeMarkers, /\]\s*,?\s*\[[^\]]*highlightedAsset/, 'hover마다 리테일 마커 전체를 다시 만들면 안 됩니다.');
  assert.match(retailMap, /selectedKey=\{activeMapKey\}/, 'hover 강조는 전체 레이어 재생성 대신 선택 스타일만 갱신해야 합니다.');

  const storeMap = marketViews.match(/function StoreMap\b[\s\S]*?(?=\nexport function StoreTableDialog\b)/)?.[0] || '';
  assert.match(storeMap, /const boundaryVisibility = useMemo\([\s\S]*?\[boundaryMode\]\)/, '상권 지도 경계 설정 객체를 안정화해 불필요한 레이어 재생성을 막아야 합니다.');
});

test('이지스 리테일 요약 패널은 불필요한 ASSET SUMMARY 영문 제목과 잔여 상단 여백을 표시하지 않는다', async () => {
  const assetViews = await read('src/components/map-activities/SonghyeonAssetRetailViews.jsx');
  const retailSummary = assetViews.match(/function RetailSummary\b[\s\S]*?(?=\nfunction RetailRawDialog\b)/)?.[0] || '';

  assert.ok(retailSummary, '이지스 리테일 요약 패널 구현을 찾을 수 없습니다.');
  assert.doesNotMatch(retailSummary, /ASSET SUMMARY/, '요청에 따라 ASSET SUMMARY 제목은 제거되어야 합니다.');
  assert.match(retailSummary, /<h2 className="text-\[21px\]/, '첫 제목에 제거된 라벨의 상단 여백이 남으면 안 됩니다.');
  assert.doesNotMatch(retailSummary, /<h2 className="[^"]*\bmt-2\b/, '첫 제목을 불필요하게 아래로 미루면 안 됩니다.');
});

test('이지스 리테일 지도는 6개 전체 건물 형상을 맞춘 뒤 늦은 초기 애니메이션이나 마커 범위로 다시 축소하지 않는다', async () => {
  const [leafletMap, assetViews, marketBundleText] = await Promise.all([
    read('src/components/map-activities/SonghyeonLeafletMap.jsx'),
    read('src/components/map-activities/SonghyeonAssetRetailViews.jsx'),
    read('public/map-activities/data/market-activities.json'),
  ]);
  const marketBundle = JSON.parse(marketBundleText);
  const mapAssets = marketBundle?.datasets?.igis_retail?.map_assets || [];

  assert.equal(mapAssets.length, 6, '이지스 리테일 최초 화면 맞춤은 원본의 6개 건물·구역 형상을 모두 포함해야 합니다.');
  assert.equal(new Set(mapAssets.map((asset) => asset.id)).size, 6, '화면 맞춤 대상 6개 건물·구역 ID가 중복되면 안 됩니다.');
  assert.ok(
    mapAssets.every((asset) => ['Polygon', 'MultiPolygon'].includes(asset?.geometry?.type)),
    '마커 중심점이 아니라 각 자산의 실제 Polygon/MultiPolygon 형상을 화면 맞춤 기준으로 유지해야 합니다.',
  );

  const retailMap = assetViews.match(/function RetailMap\b[\s\S]*?(?=\nfunction RetailSummary\b)/)?.[0] || '';
  const retailLeaflet = retailMap.match(/<SonghyeonLeafletMap\b[\s\S]*?\/>/)?.[0] || '';
  assert.ok(retailLeaflet, '이지스 리테일 Leaflet 지도 호출을 찾을 수 없습니다.');
  assert.match(retailLeaflet, /featureLayers=\{featureLayers\}/, '6개 실제 건물 형상 레이어를 지도에 전달해야 합니다.');
  assert.match(retailLeaflet, /\bfitVisible\b/, '최초 진입 시 전체 건물 형상을 한 번 화면에 맞춰야 합니다.');
  assert.doesNotMatch(retailLeaflet, /fitVisibleToMarkers/, '건물 형상보다 좁은 배지 마커 범위로 다시 맞추면 안 됩니다.');

  const immediateInitialSetup = leafletMap.match(/if \(!deferInitialTileRef\.current\) \{[\s\S]*?tileLayerNameRef\.current = initialBasemapRef\.current;\s*\}/)?.[0] || '';
  assert.ok(immediateInitialSetup, '자동 화면 맞춤 지도와 일반 지도의 초기화 경계를 찾을 수 없습니다.');
  assert.match(
    immediateInitialSetup,
    /map\.fitBounds\(DEFAULT_BOUNDS,\s*\{\s*padding:\s*\[\s*18\s*,\s*18\s*\],\s*animate:\s*false\s*\}\)/,
    '일반 지도 초기 공통 bounds는 비애니메이션이어야 하며 자동 화면 맞춤 지도에서는 이 단계를 건너뛰어야 합니다.',
  );
  assert.equal((leafletMap.match(/map\.fitBounds\(DEFAULT_BOUNDS/g) || []).length, 1, 'DEFAULT_BOUNDS 맞춤을 guard 밖에서 다시 실행하면 최종 건물 형상 viewport를 덮어씁니다.');
  assert.match(immediateInitialSetup, /createTileLayer\(initialBasemapRef\.current\)\.addTo\(map\)/, '일반 지도는 공통 bounds 적용 뒤 최초 타일을 표시해야 합니다.');
  const viewportBlock = leafletMap.match(/const applyViewport = \(\) => \{[\s\S]*?(?=\n\s*return \(\) => \{)/)?.[0] || '';
  assert.equal((viewportBlock.match(/applyViewport\(\);/g) || []).length, 1, '전체 건물 형상 화면 맞춤은 진입 프레임에서 한 번만 실행해야 합니다.');
  assert.match(
    viewportBlock,
    /const targetBounds = fitVisibleToMarkers && markerBounds\.isValid\(\) \? markerBounds : visibleBounds;/,
    '마커 전용 맞춤을 명시하지 않은 이지스 리테일은 전체 건물 형상 visibleBounds를 사용해야 합니다.',
  );
});

test('기존 6개 Map & Activities 화면의 텍스트 크기 계약을 유지한다', async () => {
  const mapComponentRoot = fromRoot('src/components/map-activities');
  const mapComponentFiles = (await walkFiles(mapComponentRoot))
    .filter((path) => ['.js', '.jsx', '.css'].includes(extname(path)))
    .filter((path) => !path.endsWith(`${sep}SonghyeonHotelWorkspace.jsx`));
  const layout = await read('src/components/Layout.jsx');
  const mapMenu = layout.match(/function ExpandableMainMenu\b[\s\S]*?(?=\nfunction Section\b)/)?.[0] || '';
  assert.ok(mapMenu, 'Layout의 Map & Activities expandable menu를 찾을 수 없습니다.');

  const auditedSources = [
    ['src/pages/MapActivities.jsx', await read('src/pages/MapActivities.jsx')],
    ...await Promise.all(mapComponentFiles.map(async (path) => [relative(projectRoot, path), await readFile(path, 'utf8')])),
    ['src/components/Layout.jsx#ExpandableMainMenu', mapMenu],
  ];
  const violations = [];
  const patterns = [
    { kind: 'Tailwind text size', pattern: /text-\[\s*([0-9]+(?:\.[0-9]+)?)(px|rem|em|pt)\s*\]/g },
    { kind: 'CSS font-size', pattern: /font-size\s*:\s*([0-9]+(?:\.[0-9]+)?)(px|rem|em|pt)\b/g },
    { kind: 'inline fontSize string', pattern: /fontSize\s*:\s*['"]([0-9]+(?:\.[0-9]+)?)(px|rem|em|pt)['"]/g },
    { kind: 'inline/SVG fontSize number', pattern: /\bfontSize\s*=\s*\{?([0-9]+(?:\.[0-9]+)?)\}?/g, numericPixels: true },
  ];
  const toPixels = (value, unit) => {
    if (unit === 'rem' || unit === 'em') return value * 16;
    if (unit === 'pt') return value * (4 / 3);
    return value;
  };

  for (const [file, source] of auditedSources) {
    for (const { kind, pattern, numericPixels } of patterns) {
      for (const match of source.matchAll(pattern)) {
        const size = toPixels(Number(match[1]), numericPixels ? 'px' : match[2]);
        if (size >= 14 - Number.EPSILON) continue;
        const line = source.slice(0, match.index).split('\n').length;
        violations.push(`${file}:${line} ${kind} ${match[1]}${numericPixels ? 'px' : match[2]}`);
      }
    }
  }

  assert.deepEqual(violations, [], `Map & Activities에서 14px 미만 텍스트를 발견했습니다:\n${violations.join('\n')}`);
  const page = await read('src/pages/MapActivities.jsx');
  const rootTag = page.match(/<(?:div|main)\b[^>]*data-map-activities-workspace[^>]*>/)?.[0] || '';
  assert.match(rootTag, /text-\[14px\]/, '크기를 지정하지 않은 자식도 14px 미만으로 떨어지지 않도록 workspace 기본값을 명시해야 합니다.');
  const globalCss = await read('src/index.css');
  assert.match(globalCss, /\.workspace-shell \.map-layer-panel-title,[\s\S]*?font-size:\s*15px\s*!important/, '지도 레이어 그룹 제목은 15px로 정리해야 합니다.');
  assert.match(globalCss, /\.workspace-shell \.map-layer-toggle-all,[\s\S]*?font-size:\s*14px\s*!important/, '지도 레이어 항목·전체 표시는 14px로 정리해야 합니다.');
  assert.match(page, /BOUNDARY_IDS\.includes\(item\.id\)\s*\?\s*['"]map-boundary-option['"]/, '운영구역 대안 1·2·3만 별도 글자 크기 클래스를 적용해야 합니다.');
  assert.match(globalCss, /\.workspace-shell \.map-layer-item\.map-boundary-option\s*\{\s*font-size:\s*10px\s*!important/, '운영구역 대안명과 점포 수는 좁은 기존 패널 안에서 한 줄로 보여야 합니다.');
});

test('원본 6개 nested route는 같은 shell에서 섹션을 전환한다', async () => {
  const page = await read('src/pages/MapActivities.jsx');

  assert.match(page, /(?:useLocation|useParams)\b/, '현재 nested URL을 읽어야 합니다.');
  assert.match(page, /(?:pathname|section|slug)/, '현재 nested URL slug로 section model을 선택해야 합니다.');
  assert.doesNotMatch(page, /useState\(\s*workspaceTabs\[0\]\.id\s*\)/, 'active section은 로컬 tab state가 아니라 URL nested route의 단일 진실원천이어야 합니다.');
  for (const { label, slug } of MAP_SECTIONS) {
    assert.match(page, new RegExp(`(?:id|slug|route):\\s*['"]${slug}['"][\\s\\S]{0,220}?(?:label|title):\\s*['"]${label}['"]|(?:label|title):\\s*['"]${label}['"][\\s\\S]{0,220}?(?:id|slug|route):\\s*['"]${slug}['"]`), `${label} section config 누락`);
  }
  assert.match(page, /(?:SECTIONS|workspaceSections)\.find\([\s\S]{0,160}?(?:slug|pathname)/, '현재 URL에 대응하는 section model이 필요합니다.');
  assert.doesNotMatch(page, /데이터 연결 전|검수 전|STRUCTURE PREVIEW|NOT LIVE DATA|UI 구조만 준비|실제 지도·통계·원장 데이터를 표시하지 않습니다/, '이제 실제 송현 콘텐츠를 표시하므로 준비중 placeholder를 남기면 안 됩니다.');
});

test('원본 6개 화면의 주요 콘텐츠와 상호작용을 축약·삭제하지 않는다', async () => {
  const componentRoot = fromRoot('src/components/map-activities');
  const componentFiles = (await walkFiles(componentRoot)).filter((path) => ['.js', '.jsx'].includes(extname(path)));
  const sources = [
    await read('src/pages/MapActivities.jsx'),
    await read('src/lib/songhyeonMapActivitiesRepository.js'),
    ...await Promise.all(componentFiles.map((path) => readFile(path, 'utf8'))),
  ].join('\n');

  const requiredVisibleContent = {
    '통합지도': ['지도 레이어', '자산·공공공간', '상권·활동', '계획·규제', '경계 분석자료'],
    '운영구역': ['순증가 영역', '판단 근거', '왜 세 개의 대안을 함께 보는가', '대안별 수치 비교', '생활인구'],
    '자산·임차': ['자산명', '주소', '보유·검토 상태', '자산 유형', '대지면적', '연면적', '층 규모', '주용도', '건물·구역', '현재 운영 정보', 'Area Management 역할', '임차', '층별 임차·공간'],
    '이지스 리테일': ['리테일 자산 선택', 'RAW DATA', '대분류 구성', '중분류 구성', 'Origin 구성', '자산별 대기업 모회사 비율', '브랜드·모회사·비고 검색'],
    '상권·활동': ['점포 상세표', '점포명·주소 검색', '선택 경계 밖 점포도 표시', '업종 구성', '권역별 상대 특화', '행사·문화·상권·공간운영 기록'],
    '제도·공동체': ['계획·규제', '공동체·활동 기록', '관련 공간 지도', '공간범위', '확인된 활동'],
  };
  const missingContent = Object.entries(requiredVisibleContent).flatMap(([screen, labels]) => (
    labels.filter((label) => !sources.includes(label)).map((label) => `${screen}: ${label}`)
  ));

  const interactions = [
    ['레이어 checkbox', /<input\b(?=[^>]*type=["']checkbox["'])(?=[^>]*onChange=)[^>]*>/],
    ['레이어 그룹 전체/부분선택', /\.indeterminate\s*=|data-layer-group=/],
    ['배경지도 select', /<select\b(?=[^>]*(?:배경지도|basemap))(?=[^>]*onChange=)[^>]*>/i],
    ['자산 상세 열기', /<(?:button|article)\b(?=[^>]*onClick=)(?=[^>]*(?:data-[^=]*asset|aria-label=\{?[^>]*상세))[^>]*>/],
    ['이지스 리테일 자산 필터', /<button\b(?=[^>]*onClick=)(?=[^>]*(?:data-[^=]*retail|role=["']tab["']))[^>]*>/],
    ['리테일 tab 키보드 전환', /ArrowLeft[\s\S]{0,400}?ArrowRight[\s\S]{0,400}?Home[\s\S]{0,400}?End|Home[\s\S]{0,400}?End[\s\S]{0,400}?ArrowRight/],
    ['RAW DATA 검색', /<input\b(?=[^>]*type=["']search["'])(?=[^>]*(?:RAW|raw|브랜드|모회사))(?=[^>]*onChange=)[^>]*>/],
    ['RAW DATA 자산·대분류·중분류·Origin 필터', /<RawSelect\s+label=["']자산["'][\s\S]{0,500}?<RawSelect\s+label=["']대분류["'][\s\S]{0,500}?<RawSelect\s+label=["']중분류["'][\s\S]{0,500}?<RawSelect\s+label=["']Origin["']/],
    ['상권 조건 필터', /<SelectField\s+label=["']대분류["'][^>]*onChange=|<(?:input|select)\b(?=[^>]*(?:점포|업종|대분류|중분류|소분류))(?=[^>]*onChange=)[^>]*>/],
    ['업종 통계 단계 전환', /onClick=\{\(\) => setStatLevel\(level\)\}|<button\b(?=[^>]*onClick=)(?=[^>]*(?:data-[^=]*stat|aria-label=["'][^"']*(?:세부업종|대분류)))[^>]*>/],
    ['점포 상세표 페이징', /function StoreTableDialog[\s\S]{0,2400}?setPage[\s\S]{0,2400}?pageCount/],
    ['제도·활동 관련 공간 지도', /onClick=\{\(\) => onMap\(plan\)\}|<button\b(?=[^>]*onClick=)(?=[^>]*(?:aria-label=["'][^"']*관련 공간 지도|data-[^=]*governance))[^>]*>/],
    ['계획·조직 상세 아코디언', /function PlanAccordion[\s\S]{0,500}?onToggle[\s\S]*?function OrganizationAccordion[\s\S]{0,500}?onToggle/],
    ['모달/대화상자', /<(?:dialog\b|[^>]+\brole=["']dialog["'])/],
  ];
  const missingInteractions = interactions.filter(([, pattern]) => !pattern.test(sources)).map(([name]) => name);
  assert.deepEqual(
    { content: missingContent, interactions: missingInteractions },
    { content: [], interactions: [] },
    `원본 visible content·상호작용을 축약·삭제했습니다.\n콘텐츠:\n${missingContent.join('\n')}\n상호작용:\n${missingInteractions.join('\n')}`,
  );
  assert.doesNotMatch(sources, /데이터 연결 전|검수 전|STRUCTURE PREVIEW|NOT LIVE DATA|UI 구조만 준비/);
});

test('호텔은 기존 6개 순서를 보존하면서 일곱 번째 nested route와 메뉴로만 추가된다', async () => {
  const [layout, app, page, repository] = await Promise.all([
    read('src/components/Layout.jsx'),
    read('src/App.jsx'),
    read('src/pages/MapActivities.jsx'),
    read('src/lib/songhyeonMapActivitiesRepository.js'),
  ]);

  const primaryItems = layout.match(/const primaryItems\s*=\s*\[([\s\S]*?)\n\];/)?.[1] || '';
  const mapMenu = primaryItems.match(/name:\s*['"]Map & Activities['"][\s\S]*?children:\s*\[([\s\S]*?)\]\s*,?\s*\}/)?.[1] || '';
  assert.ok(mapMenu, 'Map & Activities 하위 메뉴를 찾을 수 없습니다.');
  const menuItems = [...mapMenu.matchAll(/\{\s*name:\s*['"]([^'"]+)['"]\s*,\s*path:\s*['"](\/map-activities\/[^'"]+)['"]\s*\}/g)]
    .map((match) => ({ label: match[1], slug: match[2].split('/').at(-1) }));
  assert.equal(menuItems.length, 7, '호텔을 포함한 하위 메뉴는 정확히 7개여야 합니다.');
  assert.deepEqual(
    menuItems.filter(({ slug }) => slug !== HOTEL_SECTION.slug),
    MAP_SECTIONS,
    '호텔 추가 전의 6개 메뉴명·경로·상대 순서를 바꾸면 안 됩니다.',
  );
  assert.deepEqual(menuItems.map(({ slug }) => slug), [
    'integrated-map',
    'boundary',
    'assets-leases',
    'igis-retail',
    'market-activities',
    'hotel',
    'institutions-community',
  ], 'v1.2 원본처럼 상권·활동 다음, 제도·공동체 앞에 호텔을 배치해야 합니다.');
  assert.deepEqual(menuItems.find(({ slug }) => slug === HOTEL_SECTION.slug), HOTEL_SECTION);

  for (const { slug } of [...MAP_SECTIONS, HOTEL_SECTION]) {
    assert.match(app, new RegExp(`<Route path=["']${slug}["'] element=\\{<MapActivities \\/>\\}`), `${slug} nested route 누락`);
  }
  const nestedRoutes = [...app.matchAll(/<Route path=["']([^"']+)["'] element=\{<MapActivities \/>\}/g)].map((match) => match[1]);
  assert.deepEqual(nestedRoutes, menuItems.map(({ slug }) => slug), 'App route와 좌측 메뉴의 7개 경로·순서가 일치해야 합니다.');
  assert.match(page, /\{\s*id:\s*['"]hotel['"]\s*,\s*label:\s*['"]호텔['"]\s*\}/, '호텔 section model 누락');
  assert.match(page, /section\.id\s*===\s*['"]hotel['"][\s\S]{0,500}?<SonghyeonHotelWorkspace\b/, '호텔 URL은 전용 workspace를 렌더해야 합니다.');
  assert.match(page, /hotel:\s*\[[^\]]*(?:hotel|hotels)[^\]]*operatingBoundaries|hotel:\s*\[[^\]]*operatingBoundaries[^\]]*(?:hotel|hotels)/, '호텔 route는 호텔 데이터와 운영경계만 별도로 불러와야 합니다.');
  assert.match(repository, /\/map-activities\/data\/hotel\.json|\$\{MAP_DATA_BASE_URL\}\/hotel\.json/, '호텔 전용 runtime bundle URL 누락');
  assert.match(repository, /export\s+const\s+loadSonghyeonHotelData\b|export\s+(?:async\s+)?function\s+loadSonghyeonHotelData\b/, '호텔 전용 lazy loader 누락');
});

test('호텔 추가 후 기존 6개 runtime bundle은 바이트 단위로 그대로 유지된다', async () => {
  const manifest = JSON.parse(await readFile(FULL_RUNTIME_MANIFEST_PATH, 'utf8'));
  assert.equal(manifest.bundles.length, 6, '호텔은 기존 bundles 배열을 변경하지 않고 additions에 등록해야 합니다.');
  assert.equal(manifest.datasets.length, 21, '기존 21개 dataset manifest를 변경하면 안 됩니다.');
  assert.equal(manifest.summary.datasetCount, 21, '기존 summary.datasetCount를 변경하면 안 됩니다.');
  assert.deepEqual(
    Object.fromEntries(manifest.bundles.map((bundle) => [bundle.id, bundle.sha256])),
    EXPECTED_LEGACY_RUNTIME_BUNDLE_SHA256,
    '호텔 추가가 기존 6개 bundle 내용·SHA-256을 변경했습니다.',
  );

  for (const bundle of manifest.bundles) {
    const bytes = await readFile(publicRepositoryPath(bundle));
    assert.equal(sha256(bytes), EXPECTED_LEGACY_RUNTIME_BUNDLE_SHA256[bundle.id], `${bundle.id} 실제 파일 SHA-256`);
  }

  const hotelAddition = manifest.additions?.hotel;
  assert.ok(hotelAddition && typeof hotelAddition === 'object', 'manifest.additions.hotel provenance가 필요합니다.');
  const additionText = JSON.stringify(hotelAddition);
  assert.match(additionText, /hotel\.json/, '호텔 addition은 public hotel.json을 가리켜야 합니다.');
  assert.match(additionText, /hotels/, '호텔 addition에 hotels dataset provenance가 필요합니다.');
  assert.match(additionText, /hotel_display_audit/, '호텔 addition에 hotel_display_audit provenance가 필요합니다.');
  const additionDatasets = Array.isArray(hotelAddition.datasets)
    ? hotelAddition.datasets
    : Object.values(hotelAddition.datasets || {});
  assert.equal(additionDatasets.length, 2, '호텔 addition은 hotels와 hotel_display_audit 두 dataset만 포함해야 합니다.');
  assert.match(additionText, /[a-f0-9]{64}/, '호텔 addition에 SHA-256 provenance가 필요합니다.');
});

test('호텔 runtime bundle은 266개 시설·248개 위치·공식 성급 13개를 전량 보존한다', async () => {
  const hotelBundlePath = fromRoot('public/map-activities/data/hotel.json');
  const hotelBundle = JSON.parse(await readFile(hotelBundlePath, 'utf8'));
  assert.equal(hotelBundle.bundleId, 'hotel');
  const datasets = hotelBundle.datasets || hotelBundle;
  const hotels = datasets.hotels;
  const audit = datasets.hotel_display_audit;
  assert.ok(Array.isArray(hotels), 'hotel.json datasets.hotels는 배열이어야 합니다.');
  assert.equal(hotels.length, 266, 'v1.2 호텔 시설 전량');
  assert.deepEqual(audit, {
    total: 266,
    compact: 24,
    bukchon: 37,
    east: 56,
    official_grade_total: 13,
    official_grade_east: 5,
  });

  const fields = [...new Set(hotels.flatMap((hotel) => Object.keys(hotel)))].sort((left, right) => left.localeCompare(right));
  assert.deepEqual(fields, EXPECTED_HOTEL_FIELDS, 'v1.2 호텔 32개 필드를 축약하거나 추가 변형하면 안 됩니다.');
  assert.equal(new Set(hotels.map((hotel) => hotel.facility_id)).size, 266, 'facility_id는 266건 모두 고유해야 합니다.');
  assert.ok(hotels.every((hotel) => hotel.id === hotel.facility_id), 'id와 facility_id의 원본 대응을 유지해야 합니다.');
  assert.ok(hotels.every((hotel) => Number.isFinite(hotel.lat) && Number.isFinite(hotel.lon)), '266건 모두 유효한 지도 좌표가 필요합니다.');
  assert.equal(new Set(hotels.map((hotel) => `${hotel.lat.toFixed(7)}:${hotel.lon.toFixed(7)}`)).size, 248, '동일 좌표를 묶은 실제 지도 위치 수');
  assert.equal(hotels.filter((hotel) => hotel.grade_status === '공식 확인').length, 13, '공식 성급 확인 시설 수');
  assert.equal(hotels.filter((hotel) => hotel.east && hotel.grade_status === '공식 확인').length, 5, '대안 3 공식 성급 시설 수');
  assert.equal(hotels.filter((hotel) => hotel.compact).length, 24);
  assert.equal(hotels.filter((hotel) => hotel.bukchon).length, 37);
  assert.equal(hotels.filter((hotel) => hotel.east).length, 56);
  assert.ok(hotels.every((hotel) => !hotel.compact || hotel.bukchon), '대안 1은 대안 2에 포함돼야 합니다.');
  assert.ok(hotels.every((hotel) => !hotel.bukchon || hotel.east), '대안 2는 대안 3에 포함돼야 합니다.');

  const countBy = (field) => Object.fromEntries([...hotels.reduce((counts, hotel) => {
    const value = hotel[field];
    counts.set(value, (counts.get(value) || 0) + 1);
    return counts;
  }, new Map()).entries()].sort(([left], [right]) => String(left).localeCompare(String(right), 'ko')));
  assert.deepEqual(countBy('lodging_type'), {
    '게스트하우스·호스텔': 18,
    '고시원·기숙사': 26,
    '기타 숙박': 3,
    '레지던스·서비스드 숙소': 12,
    '여관·모텔': 45,
    '펜션·스테이': 97,
    호텔: 65,
  });
  assert.deepEqual(countBy('grade'), {
    '2성': 4,
    '3성': 6,
    '4성': 2,
    '5성': 1,
    '성급 미확인': 253,
  });
  const officialHotels = hotels.filter((hotel) => hotel.grade_status === '공식 확인');
  assert.ok(officialHotels.every((hotel) => hotel.official_record_id && hotel.grade_source_url && hotel.grade_checked_at), '공식 성급 13건은 원문 provenance를 유지해야 합니다.');
});

test('호텔 workspace는 필터·Leaflet·차트·목록·상세표·두 모달을 실제 상호작용으로 제공한다', async () => {
  const componentPath = fromRoot('src/components/map-activities/SonghyeonHotelWorkspace.jsx');
  const closure = await runtimeDependencyClosure(componentPath);
  const sources = (await Promise.all([...closure]
    .filter((path) => ['.js', '.jsx', '.css'].includes(extname(path)))
    .map((path) => readFile(path, 'utf8')))).join('\n');
  const component = await readFile(componentPath, 'utf8');

  assert.match(component, /export\s+(?:default\s+)?function\s+SonghyeonHotelWorkspace\b|export\s+const\s+SonghyeonHotelWorkspace\b/);
  const visibleLabels = [
    '숙박 유형 안내',
    '숙박 상세표',
    '전체 숙박 유형',
    '전체 성급',
    '시설명·주소 검색',
    '숙박시설',
    '지도 위치',
    '공식 성급 확인',
    '가장 많은 유형',
    '숙박 유형 구성',
    '공식 성급 구성',
    '운영구역별 숙박 분포',
  ];
  assert.deepEqual(visibleLabels.filter((label) => !sources.includes(label)), [], 'v1.2 호텔 화면의 visible content가 누락됐습니다.');
  for (const option of ['대안 1', '대안 2', '대안 3', '전체 수집범위']) assert.ok(sources.includes(option), `운영구역 필터 누락: ${option}`);
  for (const type of ['호텔', '레지던스·서비스드 숙소', '여관·모텔', '게스트하우스·호스텔', '펜션·스테이', '고시원·기숙사', '기타 숙박']) assert.ok(sources.includes(type), `숙박 유형 누락: ${type}`);
  for (const grade of ['5성', '4성', '3성', '2성', '1성', '성급 미확인']) assert.ok(sources.includes(grade), `성급 필터 누락: ${grade}`);

  assert.match(component, /<input\b(?=[^>]*type=["']search["'])(?=[^>]*onChange=)[^>]*>/, '시설명·주소 검색 input이 실제 상태를 변경해야 합니다.');
  const directFilterSelects = (component.match(/<select\b(?=[^>]*value=\{(?:boundary|type|grade)\})(?=[^>]*onChange=)[^>]*>/g) || []).length;
  const sharedFilterSelects = (component.match(/<FilterSelect\b(?=[^>]*label=["'](?:운영구역|숙박 유형|성급)["'])(?=[^>]*onChange=)[^>]*>/g) || []).length;
  assert.ok(directFilterSelects >= 3 || sharedFilterSelects >= 3, '운영구역·숙박유형·성급 controlled select가 모두 필요합니다.');
  if (sharedFilterSelects >= 3) {
    const filterSelect = component.match(/function FilterSelect\b[\s\S]*?(?=\nfunction\s)/)?.[0] || '';
    assert.match(filterSelect, /<select\b(?=[^>]*value=)(?=[^>]*onChange=)[^>]*>/, '공용 FilterSelect는 실제 controlled select를 렌더해야 합니다.');
  }
  assert.match(sources, /\.filter\([\s\S]{0,900}?(?:lodging_type|grade)[\s\S]{0,900}?(?:query|search)/, '숙박 유형·성급·검색어를 실제 시설 배열에 적용해야 합니다.');

  assert.match(component, /import\s+SonghyeonLeafletMap\s+from\s+['"][^'"]*SonghyeonLeafletMap['"]/);
  const hotelMap = component.match(/<SonghyeonLeafletMap\b[\s\S]*?\/>/)?.[0] || '';
  assert.ok(hotelMap, '호텔 화면에 실제 공통 Leaflet 지도가 필요합니다.');
  assert.match(hotelMap, /boundaryGeojson=\{/);
  assert.match(hotelMap, /boundaryVisibility=\{/);
  assert.match(hotelMap, /markers=\{/);
  assert.match(hotelMap, /basemap=\{/);
  assert.doesNotMatch(component, /<svg\b[\s\S]{0,320}?(?:지도|map)/i, '호텔 지도는 SVG 대체 그림이면 안 됩니다.');

  assert.ok((sources.match(/숙박 유형 구성|공식 성급 구성/g) || []).length >= 2, '유형·성급 차트 제목이 필요합니다.');
  assert.match(sources, /(?:chart|Chart)[\s\S]{0,1800}?onClick=|onClick=[\s\S]{0,1800}?(?:chart|Chart)/, '호텔 차트 행을 눌러 필터를 전환할 수 있어야 합니다.');
  assert.match(sources, /aria-pressed|role=["']button["']/, '차트 필터의 선택 상태를 접근성 API로 제공해야 합니다.');
  assert.match(sources, /data-hotel-facility-id|focusHotel|selectedHotel|selectedFacility|setSelectedHotel|setSelectedFacility|openHotel/, '오른쪽 시설 목록에서 지도 시설이나 상세를 선택할 수 있어야 합니다.');

  for (const column of ['숙박시설', '숙박 유형', '운영사·원천 상호', '성급', '주소', '세부권역', '공식 확인 내용']) {
    assert.ok(sources.includes(column), `숙박 상세표 열 누락: ${column}`);
  }
  assert.match(sources, /<dialog\b|role=["']dialog["']/, '호텔 대화상자는 실제 dialog semantics를 제공해야 합니다.');
  assert.match(sources, /modal\?\.type\s*===\s*['"]guide['"][\s\S]{0,300}?(?:TypeGuideModal|ModalShell)/, '숙박 유형 안내 모달 누락');
  assert.match(sources, /modal\?\.type\s*===\s*['"]table['"][\s\S]{0,300}?(?:HotelDetailTable|ModalShell)/, '숙박 상세표 모달 누락');
  assert.match(sources, /성급 원문/);
  assert.match(sources, /호텔 홈페이지/);
  assert.match(sources, /onClose|\.close\(\)|set[A-Za-z]*Dialog\(null\)|set[A-Za-z]*Open\(false\)/, '모달 닫기 상호작용이 필요합니다.');
});

test('호텔 지도 아래에 v1.2 숙박 구성 차트와 운영구역별 정확한 누적 표를 노출한다', async () => {
  const component = await read('src/components/map-activities/SonghyeonHotelWorkspace.jsx');
  const hotelBundle = JSON.parse(await read('public/map-activities/data/hotel.json'));
  const hotels = hotelBundle.datasets?.hotels || hotelBundle.hotels;
  const countBy = (rows, field) => Object.fromEntries(rows.reduce((counts, row) => {
    const value = row[field];
    counts.set(value, (counts.get(value) || 0) + 1);
    return counts;
  }, new Map()));
  const locationCount = (rows) => new Set(rows.map((row) => `${Number(row.lat).toFixed(7)}:${Number(row.lon).toFixed(7)}`)).size;

  const eastHotels = hotels.filter((hotel) => hotel.east);
  assert.deepEqual(countBy(eastHotels, 'lodging_type'), {
    '호텔': 8,
    '레지던스·서비스드 숙소': 1,
    '여관·모텔': 8,
    '게스트하우스·호스텔': 5,
    '펜션·스테이': 30,
    '고시원·기숙사': 3,
    '기타 숙박': 1,
  }, '기본 대안 3의 숙박 유형 차트 값은 v1.2 원본 56건과 같아야 합니다.');
  assert.deepEqual(countBy(eastHotels, 'grade'), {
    '4성': 2,
    '3성': 3,
    '성급 미확인': 51,
  }, '기본 대안 3의 공식 성급 차트 값은 2개·3개·51개여야 합니다.');

  const expectedBoundaryRows = [
    {
      key: 'compact', label: '대안 1', count: 24, locations: 24, official: 5,
      types: '호텔 7개 · 여관·모텔 6개 · 펜션·스테이 4개 · 게스트하우스·호스텔 3개 · 고시원·기숙사 3개 · 레지던스·서비스드 숙소 1개',
    },
    {
      key: 'bukchon', label: '대안 2', count: 37, locations: 37, official: 5,
      types: '펜션·스테이 14개 · 호텔 8개 · 여관·모텔 7개 · 게스트하우스·호스텔 3개 · 고시원·기숙사 3개 · 기타 숙박 1개 · 레지던스·서비스드 숙소 1개',
    },
    {
      key: 'east', label: '대안 3', count: 56, locations: 56, official: 5,
      types: '펜션·스테이 30개 · 여관·모텔 8개 · 호텔 8개 · 게스트하우스·호스텔 5개 · 고시원·기숙사 3개 · 기타 숙박 1개 · 레지던스·서비스드 숙소 1개',
    },
  ];
  const actualBoundaryRows = [['compact', '대안 1'], ['bukchon', '대안 2'], ['east', '대안 3']].map(([key, label]) => {
    const rows = hotels.filter((hotel) => hotel[key]);
    const types = Object.entries(countBy(rows, 'lodging_type'))
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'ko'))
      .map(([type, count]) => `${type} ${count}개`)
      .join(' · ');
    return {
      key,
      label,
      count: rows.length,
      locations: locationCount(rows),
      official: rows.filter((hotel) => hotel.grade_status === '공식 확인').length,
      types,
    };
  });
  assert.deepEqual(actualBoundaryRows, expectedBoundaryRows, '운영구역별 누적 표는 v1.2 원본 수치와 일치해야 합니다.');

  const mainMapStart = component.indexOf('<section data-hotel-primary-workspace');
  const typeChartIndex = component.indexOf('<AnalysisChart title="숙박 유형 구성"');
  const gradeChartIndex = component.indexOf('<AnalysisChart title="공식 성급 구성"');
  const boundaryTableIndex = component.indexOf('운영구역별 숙박 분포');
  assert.ok(mainMapStart >= 0 && typeChartIndex > mainMapStart && gradeChartIndex > typeChartIndex && boundaryTableIndex > gradeChartIndex, '지도 아래에 숙박 유형→공식 성급→운영구역별 분포를 순서대로 렌더해야 합니다.');
  assert.match(component, /data-hotel-workspace[^>]*className=["'][^"']*overflow-y-auto/, '지도 아래 분석 영역으로 스크롤할 수 있어야 합니다.');
  assert.match(component, /data-hotel-primary-workspace[^>]*className=["'][^"']*h-\[610px\][^"']*min-h-\[610px\]/, '원본처럼 상단 호텔 작업영역은 610px로 고정하고 하단 분석 영역을 바로 이어야 합니다.');
  assert.match(component, /data-hotel-analysis/, '숙박 유형·공식 성급 차트 영역을 실제 렌더해야 합니다.');
  assert.match(component, /data-hotel-boundary-distribution/, '운영구역별 숙박 분포표 영역을 실제 렌더해야 합니다.');
  assert.match(component, /useState\(['"]east['"]\)/, '기본 차트 및 지도 범위는 대안 3이어야 합니다.');
  assert.match(component, /BOUNDARY_OPTIONS\.slice\(0,\s*3\)\.map[\s\S]{0,900}?hotels\.filter\(\(item\)\s*=>\s*item\[key\]\)[\s\S]{0,900}?groupByLocation\(rows\)\.length[\s\S]{0,900}?grade_status\s*===\s*['"]공식 확인['"]/, '운영구역 표는 데이터에서 시설·위치·공식 성급 수를 계산해야 합니다.');
  assert.match(component, /\{nf\.format\(item\.count\)\}\s*·\s*\{item\.share\.toFixed\(1\)\}%/, '구성 차트는 원본과 같이 건수·비율을 함께 보여야 합니다.');

  assert.match(component, /grid-cols-\[230px_minmax\(0,1fr\)_280px\]/, '기본 우측 숙박 목록은 시설명이 읽히도록 280px을 확보해야 합니다.');
  assert.match(component, /2xl:grid-cols-\[260px_minmax\(0,1fr\)_320px\]/, '2xl 우측 숙박 목록은 320px을 확보해야 합니다.');
  assert.match(component, /max-\[980px\]:grid-cols-\[220px_minmax\(0,1fr\)_240px\]/, '980px 이하 우측 숙박 목록은 240px을 확보해야 합니다.');
});

test('호텔 route에서 사용하는 모든 명시적 텍스트 크기는 12px 이상이다', async () => {
  const componentPath = fromRoot('src/components/map-activities/SonghyeonHotelWorkspace.jsx');
  const closure = await runtimeDependencyClosure(componentPath);
  const layout = await read('src/components/Layout.jsx');
  const mapMenu = layout.match(/function ExpandableMainMenu\b[\s\S]*?(?=\nfunction Section\b)/)?.[0] || '';
  const auditedSources = [
    ['src/pages/MapActivities.jsx', await read('src/pages/MapActivities.jsx')],
    ['src/components/Layout.jsx#ExpandableMainMenu', mapMenu],
    ...await Promise.all([...closure]
      .filter((path) => ['.js', '.jsx', '.css'].includes(extname(path)))
      .map(async (path) => [relative(projectRoot, path), await readFile(path, 'utf8')])),
  ];
  const violations = [];
  const patterns = [
    { kind: 'Tailwind text size', pattern: /text-\[\s*([0-9]*\.?[0-9]+)(px|rem|em|pt)\s*\]/g },
    { kind: 'CSS font-size', pattern: /font-size\s*:\s*([0-9]*\.?[0-9]+)(px|rem|em|pt)\b/g },
    { kind: 'inline fontSize string', pattern: /fontSize\s*:\s*['"]([0-9]*\.?[0-9]+)(px|rem|em|pt)['"]/g },
    { kind: 'inline/SVG fontSize number', pattern: /\bfontSize\s*=\s*\{?([0-9]*\.?[0-9]+)\}?/g, numericPixels: true },
  ];
  const toPixels = (value, unit) => {
    if (unit === 'rem' || unit === 'em') return value * 16;
    if (unit === 'pt') return value * (4 / 3);
    return value;
  };

  for (const [file, source] of auditedSources) {
    for (const { kind, pattern, numericPixels } of patterns) {
      for (const match of source.matchAll(pattern)) {
        const size = toPixels(Number(match[1]), numericPixels ? 'px' : match[2]);
        if (size >= 12 - Number.EPSILON) continue;
        const line = source.slice(0, match.index).split('\n').length;
        violations.push(`${file}:${line} ${kind} ${match[1]}${numericPixels ? 'px' : match[2]}`);
      }
    }
    for (const match of source.matchAll(/\btext-(?:2xs|3xs)\b/g)) {
      const line = source.slice(0, match.index).split('\n').length;
      violations.push(`${file}:${line} Tailwind text size ${match[0]}`);
    }
  }
  assert.deepEqual(violations, [], `호텔 route에서 12px 미만 텍스트를 발견했습니다:\n${violations.join('\n')}`);
});

test('public 런타임은 21개 원본 dataset의 모든 레코드·필드·값을 그대로 제공한다', async () => {
  const [sourceManifestBuffer, runtimeManifestBuffer] = await Promise.all([
    readFile(MANIFEST_PATH),
    readFile(FULL_RUNTIME_MANIFEST_PATH),
  ]);
  const sourceManifest = JSON.parse(sourceManifestBuffer.toString('utf8'));
  const runtimeManifest = JSON.parse(runtimeManifestBuffer.toString('utf8'));
  assert.ok(Array.isArray(runtimeManifest.datasets));
  assert.ok(Array.isArray(runtimeManifest.bundles));
  const runtimeByName = new Map(runtimeManifest.datasets.map((dataset) => [dataset.name, dataset]));
  const bundlesById = new Map(runtimeManifest.bundles.map((bundle) => [bundle.id, bundle]));

  assert.equal(runtimeManifest.schemaVersion, 1);
  assert.match(runtimeManifest.generatedBy, /scripts\/build[^\s]*map[^\s]*data[^\s]*\.mjs/);
  assert.equal(runtimeManifest.deterministic, true);
  assert.equal(runtimeManifest.provenance.sourceManifest.repositoryPath, 'references/map-activities/manifest.json');
  assert.equal(runtimeManifest.provenance.sourceManifest.sha256, sha256(sourceManifestBuffer));
  assert.equal(runtimeManifest.provenance.sourceDashboard.sha256, EXPECTED_SOURCE_SHA256);
  assert.equal(runtimeManifest.datasets.length, 21);
  assert.equal(runtimeByName.size, 21);
  assert.equal(runtimeManifest.summary.datasetCount, 21);
  assert.equal(runtimeManifest.summary.sumOfDatasetRecordCounts, sourceManifest.summary.sumOfDatasetRecordCounts);
  assert.equal(runtimeManifest.summary.totalSourceDatasetBytes, sourceManifest.summary.totalDatasetBytes);

  assert.deepEqual(
    Object.fromEntries(runtimeManifest.bundles.map((bundle) => [bundle.id, [...bundle.datasets].sort()])),
    Object.fromEntries(Object.entries(EXPECTED_RUNTIME_BUNDLES).map(([bundleId, datasets]) => [bundleId, [...datasets].sort()])),
    '기능별 bundle은 21개 dataset을 한 번씩만 보존해야 합니다.',
  );

  const bundleDocuments = new Map();
  let totalRuntimeBytes = 0;
  for (const bundle of runtimeManifest.bundles) {
    assert.match(bundle.sha256, SHA256_PATTERN);
    const repositoryPath = publicRepositoryPath(bundle);
    const [buffer, fileStat] = await Promise.all([readFile(repositoryPath), stat(repositoryPath)]);
    assert.equal(fileStat.size, bundle.sizeBytes, `${bundle.id} sizeBytes`);
    assert.equal(sha256(buffer), bundle.sha256, `${bundle.id} sha256`);
    assert.ok(bundle.publicPath.startsWith('/map-activities/data/'));
    bundleDocuments.set(bundle.id, JSON.parse(buffer.toString('utf8')));
    totalRuntimeBytes += bundle.sizeBytes;
  }
  assert.equal(runtimeManifest.summary.totalRuntimeDataBytes, totalRuntimeBytes);

  for (const sourceDataset of sourceManifest.datasets) {
    const runtimeDataset = runtimeByName.get(sourceDataset.name);
    assert.ok(runtimeDataset, `public runtime dataset 누락: ${sourceDataset.name}`);
    assert.equal(runtimeDataset.recordCount, sourceDataset.recordCount, `${sourceDataset.name} recordCount`);
    assert.equal(runtimeDataset.valueType, sourceDataset.valueType, `${sourceDataset.name} valueType`);
    assert.equal(runtimeDataset.recordPath, sourceDataset.recordPath, `${sourceDataset.name} recordPath`);
    assert.equal(runtimeDataset.sourceSha256, sourceDataset.sha256, `${sourceDataset.name} sourceSha256`);
    assert.deepEqual(runtimeDataset.fields, sourceDataset.fields, `${sourceDataset.name} manifest fields`);
    assert.deepEqual(runtimeDataset.containerFields, sourceDataset.containerFields, `${sourceDataset.name} manifest containerFields`);
    assert.match(runtimeDataset.runtimeValueSha256, SHA256_PATTERN);
    const bundle = bundlesById.get(runtimeDataset.bundleId);
    assert.ok(bundle, `${sourceDataset.name} bundle 누락: ${runtimeDataset.bundleId}`);
    assert.equal(runtimeDataset.file, bundle.file);

    const sourcePath = sourceDataset.file.startsWith('references/')
      ? fromRoot(sourceDataset.file)
      : resolve(dirname(MANIFEST_PATH), sourceDataset.file);
    const sourceValue = JSON.parse(await readFile(sourcePath, 'utf8'));
    const runtimeValue = resolveJsonPointer(bundleDocuments.get(runtimeDataset.bundleId), runtimeDataset.jsonPointer);
    assert.deepEqual(runtimeValue, sourceValue, `${sourceDataset.name}의 행·필드·값이 원본과 다릅니다.`);
    const runtimeRecords = recordsFor(runtimeValue, sourceDataset.recordPath);
    const runtimeFields = [...new Set(runtimeRecords.flatMap((record) => (
      record && typeof record === 'object' && !Array.isArray(record) ? Object.keys(record) : []
    )))].sort((left, right) => left.localeCompare(right));
    assert.deepEqual(runtimeFields, [...sourceDataset.fields].sort((left, right) => left.localeCompare(right)), `${sourceDataset.name} fields`);
  }
});

test('Map & Activities 런타임은 iframe·원본 작업폴더·iota_* DB에 의존하지 않는다', async () => {
  const entry = fromRoot('src/pages/MapActivities.jsx');
  const closure = await runtimeDependencyClosure(entry);
  const runtimeFiles = [...closure];
  const sources = await Promise.all(runtimeFiles.filter((path) => extname(path) !== '.json').map((path) => readFile(path, 'utf8')));
  const runtime = sources.join('\n');
  const externalWorkspaceName = ['IGIS Fund', 'Production DP'].join(' ');

  assert.doesNotMatch(runtime, /<iframe\b|createElement\(\s*['"]iframe['"]\s*\)/i);
  assert.ok(!runtime.includes(externalWorkspaceName), '런타임에서 원본 작업폴더를 참조하면 안 됩니다.');
  assert.doesNotMatch(runtime, /\biota_[a-z0-9_]+\b/i, 'Map & Activities 런타임에서 iota_* DB 객체를 참조하면 안 됩니다.');
  assert.deepEqual(runtimeFiles.filter((path) => extname(path) === '.json'), [], 'Map runtime이 추출 JSON을 import하면 대용량 번들이 됩니다.');
  assert.ok(runtimeFiles.every((path) => !path.includes(`${sep}references${sep}map-activities${sep}`)), 'references/map-activities는 검수용이며 runtime dependency가 아니어야 합니다.');
  assert.doesNotMatch(runtime, /references[\\/]map-activities|datasets[\\/](?:stores|boundary_analysis|retail_statistics)\.json/i);
});

test('Map & Activities 추출물은 재현 스크립트·README와 source SHA-256 provenance를 남긴다', async () => {
  const [script, readme, manifestText] = await Promise.all([
    read('scripts/extract-songhyeon-map-activities.mjs'),
    read('references/map-activities/README.md'),
    readFile(MANIFEST_PATH, 'utf8'),
  ]);
  const manifest = JSON.parse(manifestText);

  assert.ok(readme.trim().length > 0);
  assert.match(script, /dashboard-data/);
  assert.match(script, /createHash\(\s*['"]sha256['"]\s*\)/);
  assert.equal(manifest.schemaVersion, 1);
  assert.equal(typeof manifest.source?.fileName, 'string');
  assert.ok(manifest.source.fileName.endsWith('.html'));
  assert.ok(manifest.source.sizeBytes > 1_000_000);
  assert.equal(manifest.source.sha256, EXPECTED_SOURCE_SHA256);
  assert.equal(manifest.source.embeddedJson?.elementId, 'dashboard-data');
  assert.ok(manifest.source.embeddedJson.sizeBytes > 1_000_000);
  assert.match(manifest.source.embeddedJson.sha256, SHA256_PATTERN);
  assert.equal(manifest.extraction?.script, 'scripts/extract-songhyeon-map-activities.mjs');
  assert.equal(manifest.extraction?.datasetDirectory, 'references/map-activities/datasets');
  assert.equal(manifest.extraction?.deterministic, true);
});

test('추출 manifest의 21개 dataset count·fields·output SHA-256·중복 감사가 실제 파일과 일치한다', async () => {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  assert.ok(Array.isArray(manifest.datasets));
  assert.equal(manifest.datasets.length, 21);
  assert.equal(manifest.summary?.datasetCount, manifest.datasets.length);
  assert.equal(new Set(manifest.datasets.map((dataset) => dataset.name)).size, manifest.datasets.length);
  assert.equal(new Set(manifest.datasets.map((dataset) => dataset.file)).size, manifest.datasets.length);
  assert.deepEqual(
    Object.fromEntries(manifest.datasets.map((dataset) => [dataset.name, dataset.recordCount])),
    EXPECTED_DATASET_COUNTS,
  );

  let recordCountSum = 0;
  let totalDatasetBytes = 0;
  for (const dataset of manifest.datasets) {
    assert.equal(typeof dataset.name, 'string');
    assert.ok(dataset.name.length > 0);
    assert.ok(['array', 'object'].includes(dataset.valueType));
    assert.ok(['$', '$.features', '$.records', '$.*'].includes(dataset.recordPath));
    assert.match(dataset.sha256, SHA256_PATTERN);

    const outputPath = dataset.file.startsWith('references/')
      ? fromRoot(dataset.file)
      : resolve(dirname(MANIFEST_PATH), dataset.file);
    assert.ok(outputPath === DATASET_ROOT || outputPath.startsWith(`${DATASET_ROOT}${sep}`), `dataset 경로 이탈: ${dataset.file}`);
    const output = await readFile(outputPath);
    const outputStat = await stat(outputPath);
    assert.equal(outputStat.size, dataset.sizeBytes, `${dataset.name} sizeBytes`);
    assert.equal(sha256(output), dataset.sha256, `${dataset.name} sha256`);

    const value = JSON.parse(output.toString('utf8'));
    const records = recordsFor(value, dataset.recordPath);
    assert.equal(records.length, dataset.recordCount, `${dataset.name} recordCount`);
    const actualFields = [...new Set(records.flatMap((record) => (
      record && typeof record === 'object' && !Array.isArray(record) ? Object.keys(record) : []
    )))].sort((a, b) => a.localeCompare(b));
    assert.deepEqual([...dataset.fields].sort((a, b) => a.localeCompare(b)), actualFields, `${dataset.name} fields`);
    const expectedContainerFields = value && typeof value === 'object' && !Array.isArray(value) ? Object.keys(value).sort((a, b) => a.localeCompare(b)) : [];
    assert.deepEqual([...dataset.containerFields].sort((a, b) => a.localeCompare(b)), expectedContainerFields, `${dataset.name} containerFields`);

    assert.ok(Array.isArray(dataset.idFields), `${dataset.name} idFields`);
    const expectedIdPaths = [...new Set(records.flatMap((record) => (
      record && typeof record === 'object' && !Array.isArray(record)
        ? Object.entries(record)
          .filter(([key, value]) => (key.toLowerCase() === 'id' || key.toLowerCase().endsWith('_id'))
            && (value === null || ['string', 'number', 'boolean'].includes(typeof value)))
          .map(([key]) => key)
        : []
    )))].sort((left, right) => left < right ? -1 : left > right ? 1 : 0);
    assert.deepEqual(dataset.idFields.map((audit) => audit.path), expectedIdPaths, `${dataset.name} id audit coverage`);
    for (const audit of dataset.idFields) {
      assert.equal(typeof audit.path, 'string');
      const actualAudit = duplicateAudit(records, audit.path);
      for (const [metric, expected] of Object.entries(actualAudit)) {
        assert.deepEqual(audit[metric], expected, `${dataset.name}.${audit.path}.${metric}`);
      }
    }

    recordCountSum += dataset.recordCount;
    totalDatasetBytes += dataset.sizeBytes;
  }

  assert.equal(manifest.summary.sumOfDatasetRecordCounts, recordCountSum);
  assert.equal(manifest.summary.totalDatasetBytes, totalDatasetBytes);
});

test('대용량 추출 JSON은 src에 복사하지 않고 references에만 둔다', async () => {
  const srcJsonFiles = (await walkFiles(fromRoot('src'))).filter((path) => extname(path) === '.json');
  const largeJsonThreshold = 128 * 1024;
  const largeSrcJson = [];
  for (const path of srcJsonFiles) {
    if ((await stat(path)).size >= largeJsonThreshold) largeSrcJson.push(relative(projectRoot, path));
  }
  assert.deepEqual(largeSrcJson, []);

  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  assert.ok(manifest.datasets.some((dataset) => dataset.sizeBytes >= largeJsonThreshold), '대용량 원본 dataset이 references에 보존되어야 합니다.');
});
