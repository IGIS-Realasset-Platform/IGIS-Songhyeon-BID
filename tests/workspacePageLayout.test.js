import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');
const WORKSPACE_LAYOUT_PATH = 'src/components/workspace/WorkspacePageLayout.jsx';
const WORKSPACE_ROUTES = [
  { name: '통합업무보드', path: '/tasks', route: 'tasks', page: 'TaskBoard' },
  { name: 'Map & Activities', path: '/map-activities', route: 'map-activities', page: 'MapActivities', nested: true },
  { name: '마일스톤 및 R&R', path: '/milestones', route: 'milestones', page: 'SonghyeonScheduleGate' },
  { name: '서비스·운영 가설', path: '/hypotheses', route: 'hypotheses', page: 'ServiceHypotheses' },
  { name: '업무 피드', path: '/feed', route: 'feed', page: 'TaskFeed' },
  { name: 'Data Room', path: '/data', route: 'data', page: 'DataRoom' },
];
const HEADER_OWNERS = [
  { title: '통합업무보드', file: 'src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx', frame: false },
  { title: '마일스톤', file: 'src/components/iota-songhyeon/pmo/SonghyeonScheduleGate.jsx', frame: true },
  { title: '서비스·운영 가설', file: 'src/pages/ServiceHypotheses.jsx', frame: true },
  { title: '업무 피드', file: 'src/pages/TaskFeed.jsx', frame: true },
  { title: 'Data Room', file: 'src/pages/DataRoom.jsx', frame: true },
];

test('Layout의 통합업무보드부터 Data Room까지 상위 메뉴 순서와 App route 구조가 일치한다', async () => {
  const [layout, app] = await Promise.all([read('src/components/Layout.jsx'), read('src/App.jsx')]);
  const primaryItems = layout.match(/const primaryItems\s*=\s*\[([\s\S]*?)\n\];/)?.[1] || '';
  let previousIndex = -1;
  for (const { name, path } of WORKSPACE_ROUTES) {
    const nameIndex = primaryItems.indexOf(`name: '${name}'`);
    const pathIndex = primaryItems.indexOf(`path: '${path}'`, nameIndex);
    assert.ok(nameIndex > previousIndex && pathIndex > nameIndex, `${name} 상위 메뉴 순서·경로가 잘못됐습니다.`);
    previousIndex = nameIndex;
  }
  for (const { route, page, nested } of WORKSPACE_ROUTES) {
    if (nested) {
      assert.match(app, new RegExp(`<Route\\s+path=["']${route}["']>`), `${route} parent route 누락`);
      for (const slug of ['integrated-map', 'boundary', 'assets-leases', 'market-activities', 'institutions-community']) {
        assert.match(app, new RegExp(`<Route\\s+path=["']${slug}["']\\s+element=\\{<${page}\\s*\\/>\\}`), `${route}/${slug} 라우트 누락`);
      }
    } else {
      assert.match(app, new RegExp(`<Route\\s+path=["']${route}["']\\s+element=\\{<${page}\\s*\\/>\\}`), `${route} 라우트 누락`);
    }
  }
});

test('WorkspacePageFrame과 WorkspacePageHeader가 상단·본문 폭·제목 간격 토큰을 한곳에서 소유한다', async () => {
  const common = await read(WORKSPACE_LAYOUT_PATH);

  assert.match(common, /export\s+(?:const|function)\s+WorkspacePageFrame\b/);
  assert.match(common, /export\s+(?:const|function)\s+WorkspacePageHeader\b/);
  assert.match(common, /WorkspacePageFrame[\s\S]{0,1600}?pt-\[28px\]/, '공통 Frame의 제목 위 여백은 pt-[28px]이어야 합니다.');
  assert.match(common, /WorkspacePageFrame[\s\S]{0,1600}?pb-\[100px\]/);
  assert.match(common, /WorkspacePageFrame[\s\S]{0,2200}?mx-auto[\s\S]{0,240}?w-\[1200px\][\s\S]{0,240}?max-w-full/);
  assert.match(common, /fluidContent\s*=\s*false/);
  assert.match(common, /fluidContent\s*\?\s*'w-full'\s*:\s*'mx-auto w-\[1200px\] max-w-full'/, '확장형 페이지는 공통 Frame의 fluidContent로 1200px 제한을 해제해야 합니다.');
  assert.doesNotMatch(common, /WorkspacePageFrame[\s\S]{0,1600}?pt-\[29px\]/);

  assert.match(common, /WorkspacePageHeader[\s\S]{0,1800}?mb-\[12px\]/, '공통 Header가 제목과 첫 콘텐츠 사이의 유일한 12px 간격을 가져야 합니다.');
  assert.match(common, /WorkspacePageHeader[\s\S]{0,1800}?h-\[37px\]/);
  assert.match(common, /WorkspacePageHeader[\s\S]{0,1800}?mx-auto[\s\S]{0,160}?w-\[1200px\][\s\S]{0,160}?max-w-full/, 'fluid page에서도 제목행은 1200px 중앙폭을 유지해야 합니다.');
  assert.match(
    common,
    /<h1\b[^>]*className=["'][^"']*font-\['Inter'\] text-\[32px\] font-bold leading-none tracking-tight text-white[^"']*["'][^>]*>/,
    '모든 workspace 제목의 typography 토큰은 공통 Header에서 고정해야 합니다.',
  );
  for (const prop of ['title', 'description', 'descriptionClassName', 'controls', 'actions']) {
    assert.match(common, new RegExp(`\\b${prop}\\b`), `WorkspacePageHeader prop 누락: ${prop}`);
  }
});

test('표준 5개 페이지 제목은 자체 h1·상단 간격을 만들지 않고 동일한 WorkspacePageHeader를 사용한다', async () => {
  for (const { title, file, frame } of HEADER_OWNERS) {
    const source = await read(file);
    assert.match(
      source,
      /import\s*\{[^}]*\bWorkspacePageHeader\b[^}]*\}\s*from\s*['"][^'"]*workspace\/WorkspacePageLayout(?:\.jsx)?['"]/,
      `${title}: 공통 Header import 누락`,
    );
    assert.match(source, /<WorkspacePageHeader\b/, `${title}: 공통 Header 사용 누락`);
    assert.ok(source.includes(title), `${title}: 제목 문구 누락`);
    assert.doesNotMatch(source, /<h1\b/i, `${title}: 페이지가 자체 h1 typography를 다시 만들면 안 됩니다.`);
    assert.doesNotMatch(source, /<header\b[^>]*\b(?:mb-\[(?:12|14)px\]|h-\[37px\])/i, `${title}: 페이지가 공통 Header 간격을 중복 선언하면 안 됩니다.`);

    if (frame) {
      assert.match(
        source,
        /import\s*\{[^}]*\bWorkspacePageFrame\b[^}]*\}\s*from\s*['"][^'"]*workspace\/WorkspacePageLayout(?:\.jsx)?['"]|import\s*\{[^}]*\bWorkspacePageHeader\b[^}]*\bWorkspacePageFrame\b[^}]*\}\s*from\s*['"][^'"]*workspace\/WorkspacePageLayout(?:\.jsx)?['"]/,
        `${title}: 공통 Frame import 누락`,
      );
      assert.match(source, /<WorkspacePageFrame\b/, `${title}: 공통 Frame 사용 누락`);
    }
  }
});

test('서비스·운영 가설과 업무 피드는 공용 Header에서 제목·설명 하단선을 동일하게 맞춘다', async () => {
  const [common, hypotheses, feed] = await Promise.all([
    read(WORKSPACE_LAYOUT_PATH),
    read('src/pages/ServiceHypotheses.jsx'),
    read('src/pages/TaskFeed.jsx'),
  ]);

  const headerStart = common.indexOf('export function WorkspacePageHeader');
  assert.ok(headerStart >= 0, '공용 WorkspacePageHeader 구현을 찾을 수 없습니다.');
  const header = common.slice(headerStart);
  assert.match(header, /<header[\s\S]{0,500}?className=\{`[^`]*\bitems-end\b[^`]*`\}/,
    'Header 전체 행은 actions를 포함해 하단 정렬되어야 합니다.');
  assert.match(header, /descriptionClassName\s*=\s*['"]{2}/,
    '공용 Header가 페이지별 description 정렬 class를 명시적으로 받아야 합니다.');
  assert.match(header, /<h1\b[^>]*\bleading-none\b[^>]*>\{title\}<\/h1>/);
  assert.match(header, /description && <p\b[^>]*className=\{`[^`]*\bleading-none\b[^`]*\$\{descriptionClassName\}[^`]*`\}[^>]*>\{description\}<\/p>/,
    'description 정렬 class는 공용 Header의 설명 요소에 적용되어야 합니다.');

  for (const [page, title, description] of [
    [hypotheses, '서비스·운영 가설', '장소 문제와 참여수요를 실행 가능한 가설로 전환하고 검증합니다.'],
    [feed, '업무 피드', '회의록과 협업 메시지를 자유롭게 기록하고 공유합니다.'],
  ]) {
    const invocation = page.match(/<WorkspacePageHeader\b[\s\S]*?\/>/)?.[0] || '';
    assert.ok(invocation, `${title}: 공용 Header 호출을 찾을 수 없습니다.`);
    assert.ok(invocation.includes(`title="${title}"`), `${title}: 제목 prop 누락`);
    assert.ok(invocation.includes(`description="${description}"`), `${title}: description prop 누락`);
    assert.ok(invocation.includes('descriptionClassName="self-end"'),
      `${title}: 제목과 설명의 bottom edge를 맞추는 공통 description 계약이 필요합니다.`);
    assert.doesNotMatch(invocation, /\bclassName=/,
      `${title}: Header 전체 정렬을 페이지에서 별도로 덮어쓰면 안 됩니다.`);
  }
});

test('Map & Activities는 공통 1200px Frame에서 벗어난 viewport-fill 전용 workspace를 사용한다', async () => {
  const [mapPage, layout] = await Promise.all([
    read('src/pages/MapActivities.jsx'),
    read('src/components/Layout.jsx'),
  ]);

  assert.doesNotMatch(mapPage, /\bWorkspacePageFrame\b/, 'Map workspace를 공통 1200px Frame에 넣으면 안 됩니다.');
  assert.doesNotMatch(mapPage, /w-\[1200px\]|max-w-\[1200px\]|mx-auto\s+w-\[1200px\]/, 'Map workspace 내부에 고정 1200px 중앙 프레임을 다시 만들면 안 됩니다.');
  assert.match(mapPage, /Map & Activities/);
  assert.match(mapPage, /(?:h-screen|h-full|min-h-0|h-\[calc\(100vh)/, 'Map root는 남은 브라우저 높이를 채워야 합니다.');
  assert.match(layout, /pathname\.startsWith\('\/map-activities'\)/, 'Layout은 모든 Map nested route를 같은 dark workspace로 처리해야 합니다.');
  const layoutMain = layout.match(/<main\s+ref=\{mainRef\}\s+className=\{`[^`]+`\}>/)?.[0] || '';
  assert.ok(layoutMain, 'Layout outer main을 찾을 수 없습니다.');
  assert.match(layoutMain, /mapActivitiesActive\s*\?\s*['"][^'"]*overflow-hidden[^'"]*['"]\s*:\s*['"][^'"]*overflow-y-auto/, 'Map route에서만 outer main의 이중 스크롤을 막아야 합니다.');
});

test('통합업무보드 예외 Frame도 top 28px을 지키고 Data Room 첫 콘텐츠는 Header 간격을 중복하지 않는다', async () => {
  const [taskPage, dataRoom] = await Promise.all([
    read('src/pages/TaskBoard.jsx'),
    read('src/pages/DataRoom.jsx'),
  ]);

  assert.match(taskPage, /<WorkspacePageFrame\s+fluidContent\b/, '통합업무보드 확장형 table은 공통 Frame의 1200px inner에 갇히면 안 됩니다.');
  assert.doesNotMatch(taskPage, /\bpt-\[29px\]/);
  assert.doesNotMatch(
    dataRoom,
    /className=["'][^"']*\bmt-\[14px\][^"']*\boverflow-hidden\b[^"']*["']/,
    'Data Room 첫 table에 mt-[14px]를 더하면 공통 Header의 mb-[12px]과 중복됩니다.',
  );
  assert.match(
    dataRoom,
    /<WorkspacePageHeader\b[\s\S]*?\/>\s*<div\s+className=["']overflow-hidden\s+rounded-\[32px\]/,
    'Data Room 첫 table은 공통 Header 직후 추가 margin 없이 시작해야 합니다.',
  );
});
