import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  SONGHYEON_FEED_ATTACHMENT_BUCKET,
  SONGHYEON_FEED_PRIORITIES,
  SONGHYEON_FEED_PROJECTS,
  SONGHYEON_FEED_PURPOSES,
  SONGHYEON_FEED_SIGNED_URL_TTL_SECONDS,
  SONGHYEON_FEED_STATUSES,
} from '../src/data/songhyeonTaskFeedOptions.js';

const read = (path) => readFile(path, 'utf8');
const PAGE_PATH = 'src/pages/TaskFeed.jsx';
const FEED_PATH = 'src/components/iota-songhyeon/task-feed/SonghyeonTaskFeed.jsx';
const WRITE_BOX_PATH = 'src/components/iota-songhyeon/task-feed/SonghyeonTaskFeedWriteBox.jsx';
const MEMBER_AVATAR_PATH = 'src/components/iota-songhyeon/SonghyeonMemberAvatar.jsx';
const REPOSITORY_PATH = 'src/lib/songhyeonTaskFeedRepository.js';
const MIGRATION_PATH = 'supabase/migrations/202608180001_songhyeon_task_feed.sql';
const SHARED_CONTACTS_MIGRATION_PATH = 'supabase/migrations/202608180003_songhyeon_shared_stakeholder_contacts.sql';

const exportedFunction = (source, name) => new RegExp(`export\\s+(?:async\\s+)?function\\s+${name}\\b|export\\s+const\\s+${name}\\s*=`);

test('업무 피드는 Data Room 바로 앞의 독립 상위 메뉴와 /feed 라우트로 열린다', async () => {
  const [layout, app, page] = await Promise.all([
    read('src/components/Layout.jsx'),
    read('src/App.jsx'),
    read(PAGE_PATH),
  ]);

  const primaryItems = layout.match(/const primaryItems\s*=\s*\[([\s\S]*?)\n\];/)?.[1] || '';
  const names = [...primaryItems.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
  const feedIndex = names.indexOf('업무 피드');
  const dataRoomIndex = names.indexOf('Data Room');
  assert.ok(feedIndex >= 0, '업무 피드 상위 메뉴가 필요합니다.');
  assert.equal(dataRoomIndex, feedIndex + 1, '업무 피드는 Data Room 바로 앞에 있어야 합니다.');
  assert.match(primaryItems, /name:\s*['"]업무 피드['"]\s*,\s*path:\s*['"]\/feed['"]/);

  assert.match(app, /import\s+TaskFeed\s+from\s+['"]\.\/pages\/TaskFeed['"]/);
  assert.match(app, /<Route\s+path=['"]feed['"]\s+element=\{<TaskFeed\s*\/>\}/);
  assert.match(page, /SonghyeonTaskFeed/);
  assert.match(page, /<WorkspacePageFrame\b/);
  assert.match(page, /<WorkspacePageHeader\b[^>]*title=['"]업무 피드['"]/);
});

test('업무 피드는 IOTA 실제 게시판의 열 구조·작성 프롬프트와 송현 전용 선택값을 보존한다', async () => {
  const [feed, writeBox, options] = await Promise.all([
    read(FEED_PATH),
    read(WRITE_BOX_PATH),
    read('src/data/songhyeonTaskFeedOptions.js'),
  ]);

  assert.doesNotMatch(feed, /송현 BID 업무 메시지/, 'WorkspacePageHeader 아래에 내부 중복 제목을 다시 표시하면 안 됩니다.');
  for (const column of ['프로젝트', '기능셀', '등록자', '내용', '이해관계자', '목적', '진행상태', '중요도', '등록일']) {
    assert.match(feed, new RegExp(column), `원본 게시판 열 누락: ${column}`);
  }
  assert.match(writeBox, /업무 메시지, 협업 사항 또는 공유할 내용을 등록하세요\./);
  for (const prompt of ['진행 이력', '협업 요청', '리스크 판단 필요사항', '의사결정 필요항목']) {
    assert.match(writeBox, new RegExp(prompt), `원본 작성 안내 누락: ${prompt}`);
  }
  assert.match(writeBox, /@/);

  assert.deepEqual(SONGHYEON_FEED_PROJECTS, [{ value: 'SONGHYEON_BID', label: '송현 BID' }]);
  assert.deepEqual(SONGHYEON_FEED_PURPOSES, ['공유', '협업', '리스크 판단', '의사결정']);
  assert.deepEqual(SONGHYEON_FEED_STATUSES, ['신규', '검토중', '진행중', '중단', '완료']);
  assert.deepEqual(SONGHYEON_FEED_PRIORITIES, ['높음', '중간', '낮음']);
  assert.doesNotMatch(options, /IOTA_COMMON|P00030|P00037|112614|iota_/i);
  assert.doesNotMatch(options, /['"]보류['"]/);
});

test('등록자 header와 row는 같은 grid 열에서 중앙 정렬되고 나머지 열을 보존한다', async () => {
  const feed = await read(FEED_PATH);
  const headerStart = feed.indexOf('<div className="grid min-w-[1080px]');
  const headerEnd = feed.indexOf('</div>', headerStart);
  const rowStart = feed.indexOf('<button type="button" onClick={() => setExpanded', headerEnd);
  const rowEnd = feed.indexOf('</button>', rowStart);
  assert.ok(headerStart >= 0 && headerEnd > headerStart, '피드 table header grid를 찾을 수 없습니다.');
  assert.ok(rowStart >= 0 && rowEnd > rowStart, '피드 table row grid를 찾을 수 없습니다.');
  const header = feed.slice(headerStart, headerEnd);
  const row = feed.slice(rowStart, rowEnd);
  const headerGrid = header.match(/grid-cols-\[([^\]]+)\]/)?.[1] || '';
  const rowGrid = row.match(/grid-cols-\[([^\]]+)\]/)?.[1] || '';
  const expectedGrid = '116px_90px_126px_minmax(260px,1fr)_100px_118px_72px_82px_68px_76px';
  assert.equal(headerGrid, expectedGrid, '기존 10개 header 열 템플릿을 보존해야 합니다.');
  assert.equal(rowGrid, expectedGrid, 'row는 header와 정확히 같은 10개 열을 사용해야 합니다.');
  assert.equal(headerGrid.split('_').length, 10);

  const assertOrdered = (source, tokens, label) => {
    let previous = -1;
    tokens.forEach((token, index) => {
      const position = source.indexOf(token, previous + 1);
      assert.ok(position > previous, `${label} ${index + 1}번 열 누락·순서 변경: ${token}`);
      previous = position;
    });
  };
  assertOrdered(header, [
    '>프로젝트<', 'label="기능셀"', '>등록자<', '>내용<', 'aria-label="반응자"',
    'label="이해관계자"', 'label="목적"', 'label="진행상태"', 'label="중요도"', '>등록일<',
  ], 'header');
  assertOrdered(row, [
    '{post.project}', '{post.cell', '<Avatar profile={{ name: post.authorName', '{post.title || post.content}',
    '<SonghyeonReactionAvatarStack', '{post.stakeholderLabel', '{post.purpose', 'statusClass(post.status)',
    'priorityClass(post.priority)', 'shortDate(post.workDate)',
  ], 'row');

  assert.match(header, /className="[^"]*text-center[^"]*"[\s\S]*?<span(?:\s+className="(?![^"]*text-left)[^"]*")?>등록자<\/span>/,
    '등록자 header는 해당 grid cell에서 중앙 정렬을 유지해야 합니다.');
  const authorCell = row.match(/<span className="([^"]*)"><Avatar profile=\{\{ name: post\.authorName[\s\S]*?\{post\.authorName \|\| ['"]-['"]\}[\s\S]*?<\/span><\/span>/);
  assert.ok(authorCell, '등록자 avatar·이름 row cell을 찾을 수 없습니다.');
  assert.match(authorCell[1], /\bjustify-center\b/,
    '등록자 row는 126px 열 안에서 avatar·이름을 중앙 정렬해야 합니다.');
});

test('작성 UI의 이해관계자는 회사·기관명과 담당자명만 입력·자동완성·저장한다', async () => {
  const writeBox = await read(WRITE_BOX_PATH);
  const stakeholderOptionStart = writeBox.indexOf('const stakeholderOption =');
  const taskOptionStart = writeBox.indexOf('const taskOption =', stakeholderOptionStart);
  assert.ok(stakeholderOptionStart >= 0 && taskOptionStart > stakeholderOptionStart,
    '이해관계자 UI 정규화 구간을 찾을 수 없습니다.');
  const stakeholderOptions = writeBox.slice(stakeholderOptionStart, taskOptionStart);

  assert.match(stakeholderOptions, /companyName/);
  assert.match(stakeholderOptions, /contactName/);
  assert.doesNotMatch(stakeholderOptions, /category|roleCategory|role_category/i,
    '작성 UI의 이해관계자 정규화·키에는 legacy 분류를 다시 포함하면 안 됩니다.');
  assert.match(writeBox, /const \[stakeholderCompany, setStakeholderCompany\] = useState\(initialStakeholder\.companyName\)/);
  assert.match(writeBox, /const \[stakeholderContact, setStakeholderContact\] = useState\(initialStakeholder\.contactName\)/);
  for (const removedToken of [
    'stakeholderCategory',
    'setStakeholderCategory',
    'stakeholderCategories',
    'stakeholder-categories',
    '이해관계자 분류',
    'placeholder="분류"',
  ]) {
    assert.ok(!writeBox.includes(removedToken), `작성 UI에서 제거되지 않은 분류 계약: ${removedToken}`);
  }

  assert.match(writeBox, /placeholder="회사·기관명"/);
  assert.match(writeBox, /placeholder="담당자명"/);
  const stakeholderDatalists = [...writeBox.matchAll(/stakeholder-(companies|contacts|categories)/g)].map((match) => match[1]);
  assert.deepEqual([...new Set(stakeholderDatalists)].sort(), ['companies', 'contacts']);

  const payloadStart = writeBox.indexOf('const payload = {');
  const saveCallStart = writeBox.indexOf('const savedPost =', payloadStart);
  assert.ok(payloadStart >= 0 && saveCallStart > payloadStart, '게시글 저장 payload 구간을 찾을 수 없습니다.');
  const payload = writeBox.slice(payloadStart, saveCallStart);
  assert.match(payload, /stakeholder:\s*stakeholderCompany\s*\|\|\s*stakeholderContact\s*\?\s*\{\s*companyName:\s*stakeholderCompany,\s*contactName:\s*stakeholderContact\s*\}\s*:\s*null/);
  assert.doesNotMatch(payload, /stakeholderCategory|\bcategory\s*:/,
    '새 게시글 payload에는 legacy 이해관계자 분류를 저장하면 안 됩니다.');
});

test('담당자명 자동완성은 회사별 외부 연락처와 전체 내부 멤버 이름을 중복 없이 합친다', async () => {
  const writeBox = await read(WRITE_BOX_PATH);
  assert.match(writeBox, /const members = useMemo\(\(\) => asArray\(options\.members\)\.map\(memberOption\)/,
    '내부 담당자 후보는 options.members에서 정규화해야 합니다.');
  assert.match(writeBox, /const unique = \(values\) => \[\.\.\.new Set\(/,
    '외부·내부에 같은 이름이 있어도 datalist에는 한 번만 표시해야 합니다.');

  const contactsStart = writeBox.indexOf('const stakeholderContacts =');
  const contactsEnd = writeBox.indexOf('\n\n  const updateMentionQuery', contactsStart);
  assert.ok(contactsStart >= 0 && contactsEnd > contactsStart, '담당자명 후보 계산 구간을 찾을 수 없습니다.');
  const contacts = writeBox.slice(contactsStart, contactsEnd);
  assert.match(contacts, /unique\(\s*\[/,
    '외부 연락처와 내부 멤버를 합친 뒤 전체 후보를 중복 제거해야 합니다.');
  assert.match(contacts, /\.\.\.stakeholders\s*\.filter\(\(entry\)\s*=>\s*!stakeholderCompany\s*\|\|\s*entry\.companyName === stakeholderCompany\)\s*\.map\(\(entry\)\s*=>\s*entry\.contactName\)/,
    '외부 이해관계자 연락처에는 선택한 회사·기관 필터를 유지해야 합니다.');
  assert.match(contacts, /\.\.\.members\.map\(\(member\)\s*=>\s*member\.name\)/,
    '내부 options.members 이름은 담당자명 후보에 항상 합쳐야 합니다.');
  const memberNamesStart = contacts.indexOf('...members.map');
  assert.ok(memberNamesStart > contacts.indexOf('...stakeholders'), '외부 연락처와 내부 멤버 이름을 모두 합쳐야 합니다.');
  assert.doesNotMatch(contacts.slice(memberNamesStart), /stakeholderCompany|\.filter\(/,
    '회사 선택이 내부 멤버 이름까지 필터링하면 안 됩니다.');

  assert.match(writeBox, /<datalist id=\{`\$\{formId\}-stakeholder-contacts`\}>\{stakeholderContacts\.map/);
  const payloadStart = writeBox.indexOf('const payload = {');
  const payloadEnd = writeBox.indexOf('const savedPost =', payloadStart);
  const payload = writeBox.slice(payloadStart, payloadEnd);
  assert.match(payload, /contactName:\s*stakeholderContact/,
    '신규 게시글에는 선택된 담당자의 표시 문자열만 저장해야 합니다.');
  assert.doesNotMatch(payload, /contact(?:Member)?Id|stakeholderContact\.|\bcategory\s*:/,
    '담당자 객체·내부 ID·분류를 신규 게시글 payload에 저장하면 안 됩니다.');
});

test('공유 이해관계자 연락처는 인증 사용자에게만 읽기 전용으로 제공하고 legacy fallback을 유지한다', async () => {
  const [repository, migration] = await Promise.all([
    read(REPOSITORY_PATH),
    read(SHARED_CONTACTS_MIGRATION_PATH),
  ]);
  const lower = migration.toLowerCase();
  const viewDefinition = lower.match(/create or replace view public\.songhyeon_shared_stakeholder_contacts[\s\S]*?(?=\nrevoke\s)/)?.[0] || '';
  assert.ok(viewDefinition, '공유 이해관계자 연락처 view 정의가 필요합니다.');
  assert.match(viewDefinition, /with\s*\(\s*security_invoker\s*=\s*true\s*\)/,
    '기반 IOTA 권한을 우회하지 않는 security-invoker view여야 합니다.');
  assert.match(viewDefinition, /select distinct[\s\S]*?company_name[\s\S]*?contact_name[\s\S]*?from public\.iota_stakeholder_master/,
    'iota_stakeholder_master의 회사·기관명과 담당자명을 공유해야 합니다.');

  assert.match(lower, /revoke all on public\.songhyeon_shared_stakeholder_contacts\s+from public, anon, authenticated\s*;/,
    '기본·비인증·인증 role의 기존 view 권한을 먼저 제거해야 합니다.');
  assert.match(lower, /grant select on public\.songhyeon_shared_stakeholder_contacts to authenticated\s*;/,
    '인증된 사용자에게만 조회 권한을 줄 수 있습니다.');
  assert.doesNotMatch(lower, /grant select on public\.songhyeon_shared_stakeholder_contacts to (?:public|anon)\b/,
    '비인증 사용자에게 공유 연락처를 노출하면 안 됩니다.');
  assert.doesNotMatch(lower, /grant\s+(?:all|insert|update|delete|truncate|references|trigger)\b[^;]*songhyeon_shared_stakeholder_contacts/,
    '공유 연락처 view에 쓰기 권한을 주면 안 됩니다.');

  const loaderStart = repository.indexOf('const loadSharedStakeholderContacts =');
  const optionsStart = repository.indexOf('export async function loadTaskFeedOptions', loaderStart);
  assert.ok(loaderStart >= 0 && optionsStart > loaderStart, '공유 연락처 loader를 찾을 수 없습니다.');
  const loader = repository.slice(loaderStart, optionsStart);
  assert.match(loader, /if\s*\(\s*!authenticated\s*\)\s*return\s*\{\s*data:\s*\[\],\s*error:\s*null\s*\}/,
    '비인증 세션은 연락처 view를 조회하지 않아야 합니다.');
  assert.match(loader, /\.from\(['"]songhyeon_shared_stakeholder_contacts['"]\)\s*\.select\(['"]company_name,contact_name['"]\)/,
    '상세 view에서 회사·기관명과 담당자명을 함께 조회해야 합니다.');
  assert.match(loader, /if\s*\(\s*!detailed\.error\s*\)\s*return detailed\s*;/,
    '상세 view가 적용된 환경에서는 그 결과를 우선해야 합니다.');
  const detailedStart = loader.indexOf(".from('songhyeon_shared_stakeholder_contacts')");
  const legacyStart = loader.indexOf(".from('songhyeon_shared_stakeholders')");
  assert.ok(detailedStart >= 0 && legacyStart > detailedStart,
    '상세 view 조회가 실패한 미적용 환경에서만 legacy view로 fallback해야 합니다.');
  assert.match(loader, /\.from\(['"]songhyeon_shared_stakeholders['"]\)\s*\.select\(['"]stakeholder_name['"]\)/);
  assert.match(loader, /company_name:\s*row\.stakeholder_name,\s*contact_name:\s*['"]{2}/,
    'legacy 결과는 회사·기관명만 보존하고 담당자명은 빈 문자열이어야 합니다.');

  const optionMapping = repository.slice(optionsStart, repository.indexOf('const normalizeStakeholder', optionsStart));
  assert.match(optionMapping, /loadSharedStakeholderContacts\(client, authenticated\)/);
  assert.match(optionMapping, /companyName:\s*row\.company_name\s*\|\|\s*row\.stakeholder_name\s*\|\|\s*['"]{2}/);
  assert.match(optionMapping, /contactName:\s*row\.contact_name\s*\|\|\s*['"]{2}/,
    'repository 옵션은 DB snake_case를 UI의 companyName/contactName으로 매핑해야 합니다.');
});

test('검색과 요약·전체보기 전환은 최상단 WorkspacePageHeader actions에서 기존 피드 상태를 제어한다', async () => {
  const [page, feed, workspaceLayout] = await Promise.all([
    read(PAGE_PATH),
    read(FEED_PATH),
    read('src/components/workspace/WorkspacePageLayout.jsx'),
  ]);

  assert.match(workspaceLayout, /\{actions && <div className="flex shrink-0 items-end">\{actions\}<\/div>\}/,
    '공용 Header의 trailing actions 슬롯이 유지되어야 합니다.');
  assert.match(page, /<SonghyeonTaskFeed\b[\s\S]{0,240}?renderHeader=\{\(actions\)\s*=>\s*\([\s\S]{0,360}?<WorkspacePageHeader\b/,
    '페이지가 Feed 상태를 유지하는 renderHeader 연결로 최상단 공용 Header를 렌더해야 합니다.');
  const renderPropStart = page.indexOf('renderHeader={(actions) =>');
  const feedMountEnd = page.indexOf('/>', renderPropStart);
  assert.ok(renderPropStart >= 0 && feedMountEnd > renderPropStart, 'TaskFeed renderHeader 구간을 찾을 수 없습니다.');
  const pageHeader = page.slice(renderPropStart, feedMountEnd);
  assert.match(pageHeader, /<WorkspacePageHeader\b/);
  assert.match(pageHeader, /title="업무 피드"/);
  assert.match(pageHeader, /\bactions=\{actions\}/,
    '검색·보기 전환 UI는 WorkspacePageHeader의 우측 actions로 전달되어야 합니다.');

  assert.match(feed, /export default function SonghyeonTaskFeed\(\{\s*renderHeader\s*\}\)/);
  const headerActionsStart = feed.indexOf('const headerActions =');
  const feedReturnStart = feed.indexOf('\n  return (', headerActionsStart);
  assert.ok(headerActionsStart >= 0 && feedReturnStart > headerActionsStart,
    'Feed의 header actions 구간을 찾을 수 없습니다.');
  const headerControls = feed.slice(headerActionsStart, feedReturnStart);
  assert.match(headerControls, /<Search\b/);
  assert.match(headerControls, /placeholder="검색어 입력\.\.\."/);
  assert.match(headerControls, /value=\{searchQuery\}/);
  assert.match(headerControls, /setSearchQuery\(event\.target\.value\)/);
  assert.match(headerControls, /setCurrentPage\(1\)/,
    '헤더 검색 변경과 보기 전환은 기존 페이지를 1쪽으로 되돌려야 합니다.');
  assert.match(headerControls, /setViewMode\(\(mode\)\s*=>\s*mode === ['"]summary['"]\s*\?\s*['"]full['"]\s*:\s*['"]summary['"]\)/);
  assert.match(headerControls, /viewMode === ['"]summary['"]\s*\?\s*['"]전체보기['"]\s*:\s*['"]간략히 보기['"]/);
  assert.equal((headerControls.match(/h-\[37px\]/g) || []).length, 2,
    '검색 입력과 보기 전환 버튼은 37px 제목행 높이에 맞아야 합니다.');

  const renderCallStart = feed.indexOf('renderHeader?.(headerActions)', feedReturnStart);
  const feedSectionStart = feed.indexOf('<section', renderCallStart);
  assert.ok(renderCallStart >= 0 && feedSectionStart > renderCallStart,
    'Feed가 게시판 section보다 먼저 WorkspacePageHeader actions를 요청해야 합니다.');

  assert.doesNotMatch(feed, /송현 BID 업무 메시지|<h2\b[^>]*>\s*송현 BID/,
    '피드 본문에 예전 내부 제목을 남기면 안 됩니다.');
  assert.match(feed, /const \[searchQuery, setSearchQuery\] = useState\(['"]{2}\)/);
  assert.match(feed, /const \[viewMode, setViewMode\] = useState\(['"]summary['"]\)/);
  assert.match(feed, /const \[currentPage, setCurrentPage\] = useState\(1\)/);
  assert.match(feed, /const query = searchQuery\.trim\(\)\.toLowerCase\(\)/);
  assert.match(feed, /const pageSize = viewMode === ['"]summary['"] \? SUMMARY_PAGE_SIZE : FULL_PAGE_SIZE/);
  assert.match(feed, /setViewMode\(['"]full['"]\)/,
    'postId deep-link는 기존처럼 전체보기로 전환되어야 합니다.');
});

test('피드 목록은 원본의 검색·5개 요약·20개 전체보기와 다섯 필터를 실제 데이터에 적용한다', async () => {
  const [page, feed, repository] = await Promise.all([read(PAGE_PATH), read(FEED_PATH), read(REPOSITORY_PATH)]);

  assert.match(feed, /loadTaskFeedPosts/);
  assert.match(feed, /loadTaskFeedOptions/);
  assert.match(repository, exportedFunction(repository, 'loadTaskFeedPosts'));
  assert.match(repository, exportedFunction(repository, 'loadTaskFeedOptions'));
  assert.match(feed, /(?:SUMMARY_PAGE_SIZE|summaryPageSize|summary[^\n]{0,40})\s*=\s*5/i);
  assert.match(feed, /(?:FULL_PAGE_SIZE|fullPageSize|full[^\n]{0,40})\s*=\s*20/i);
  assert.match(`${page}\n${feed}`, /전체보기/);
  assert.match(`${page}\n${feed}`, /간략히 보기/);
  assert.match(`${page}\n${feed}`, /검색어 입력/);

  for (const filter of ['stakeholder', 'cell', 'purpose', 'status', 'priority']) {
    assert.match(feed, new RegExp(`filter${filter}|selected${filter}|filters?\\.${filter}`, 'i'), `필터 상태 누락: ${filter}`);
  }
  for (const field of ['content', 'author', 'project', 'task']) {
    assert.match(feed, new RegExp(field, 'i'), `검색 대상 누락: ${field}`);
  }
  assert.match(feed, /setCurrentPage\(1\)/);
  assert.match(feed, /totalPages/);
  assert.match(feed, /NEW_MARKER_WINDOW\s*=\s*48\s*\*\s*60\s*\*\s*60\s*\*\s*1000/);
  assert.match(feed, /isRecent\(post\.createdAt,\s*post\.updatedAt\)/);
  assert.doesNotMatch(feed, /unread|lastRead|readAt|markAsRead/i, 'N 표시는 개인별 읽지 않음 상태가 아닌 48시간 최신 표시여야 합니다.');
});

test('postId 딥링크는 대상 페이지로 이동해 상세를 펼치고 강조한 뒤 URL을 정리한다', async () => {
  const feed = await read(FEED_PATH);

  assert.match(feed, /new URLSearchParams\(window\.location\.search\)/);
  assert.match(feed, /\.get\(['"]postId['"]\)/);
  assert.match(feed, /findIndex[\s\S]{0,700}setCurrentPage/);
  assert.match(feed, /setExpanded/);
  assert.match(feed, /scrollIntoView\(\{[^}]*behavior:\s*['"]smooth['"]/);
  assert.match(feed, /classList\.add|data-feed-highlight|highlightedPostId/);
  assert.match(feed, /(?:searchParams|params)\.delete\(['"]postId['"]\)/);
  assert.match(feed, /history\.replaceState/);
});

test('게시글 작성·수정·삭제는 공통 작성폼과 송현 repository를 사용하고 UI 제어는 작성자에게만 보인다', async () => {
  const [feed, writeBox, repository] = await Promise.all([
    read(FEED_PATH),
    read(WRITE_BOX_PATH),
    read(REPOSITORY_PATH),
  ]);

  for (const method of ['createTaskFeedPost', 'updateTaskFeedPost', 'deleteTaskFeedPost']) {
    assert.match(repository, exportedFunction(repository, method), `repository export 누락: ${method}`);
    assert.match(`${feed}\n${writeBox}`, new RegExp(method), `UI 연결 누락: ${method}`);
  }
  assert.match(writeBox, /editMode|initialPost|initialData/);
  assert.match(`${feed}\n${writeBox}`, /isReadOnly/);
  assert.match(writeBox, /열람 권한 설정/);
  assert.match(writeBox, /설정하지 않으면 전체 공개/);
  assert.match(writeBox, /permissions:\s*\{\s*groups:\s*visibilityGroups,\s*individuals:\s*visibilityIndividuals\s*\}/);
  assert.match(feed, /authorId|author_id|isAuthor/);
  assert.match(feed, /수정하기/);
  assert.match(feed, /삭제/);
  assert.doesNotMatch(feed, /isAdmin[\s\S]{0,180}(?:수정하기|삭제)/, 'DB 관리 예외를 원본 작성자 전용 UI에 노출하면 안 됩니다.');
});

test('공개글 수정 확인 모달은 편집 overlay 앞에 표시되어 수정 완료가 먹통이 되지 않는다', async () => {
  const [feed, writeBox] = await Promise.all([read(FEED_PATH), read(WRITE_BOX_PATH)]);
  assert.match(writeBox, /if\s*\(\s*visibilityGroups\.length === 0 && visibilityIndividuals\.length === 0\s*\)\s*setShowPublicWarning\(true\)/,
    '열람 권한이 없는 공개글은 저장 전 확인을 거쳐야 합니다.');
  const publicWarningStart = writeBox.indexOf('{showPublicWarning &&');
  const publicWarningEnd = writeBox.indexOf('\n      )}', publicWarningStart);
  assert.ok(publicWarningStart >= 0 && publicWarningEnd > publicWarningStart, '전체 공개 확인 modal을 찾을 수 없습니다.');
  const publicWarning = writeBox.slice(publicWarningStart, publicWarningEnd);
  assert.match(publicWarning, /<ModalShell\s+title=\{editMode\s*\?\s*['"]전체 공개 게시물 수정['"]\s*:\s*['"]전체 공개 게시물 작성['"]\}/);
  assert.match(publicWarning, /\{editMode\s*\?\s*['"]네, 수정할게요['"]\s*:\s*['"]네, 작성할게요['"]\}/,
    '수정 확인 버튼이 작성 행위로 오인되지 않아야 합니다.');
  assert.match(writeBox, /return createPortal\([\s\S]*?document\.body/,
    '확인 모달은 document.body portal로 렌더됩니다.');

  const modalShellStart = writeBox.indexOf('function ModalShell');
  const modalShellEnd = writeBox.indexOf('\n}\n', modalShellStart);
  const modalShell = writeBox.slice(modalShellStart, modalShellEnd);
  const portalZ = Number(modalShell.match(/z-\[(\d+)\]/)?.[1]);
  const editingOverlayStart = feed.indexOf('{editingPost ?');
  const editingOverlay = feed.slice(editingOverlayStart, feed.indexOf('{deleteTarget ?', editingOverlayStart));
  const editingZ = Number(editingOverlay.match(/z-\[(\d+)\]/)?.[1]);
  assert.ok(Number.isFinite(portalZ) && Number.isFinite(editingZ), '모달 z-index 계층을 확인할 수 없습니다.');
  assert.ok(portalZ > editingZ,
    `공개글 확인 portal(z=${portalZ})은 수정 overlay(z=${editingZ})보다 앞에 있어야 합니다.`);
});

test('업무 피드 수정 modal의 활성 control은 pointer, 비활성 control은 not-allowed cursor를 사용한다', async () => {
  const [feed, writeBox] = await Promise.all([read(FEED_PATH), read(WRITE_BOX_PATH)]);
  const cursorContracts = [
    '[&_button]:cursor-pointer',
    '[&_button:disabled]:cursor-not-allowed',
    '[&_select]:cursor-pointer',
    '[&_select:disabled]:cursor-not-allowed',
  ];

  const formRootStart = writeBox.indexOf('<div className={`mb-[11px] w-full rounded-[24px]');
  const formRootEnd = writeBox.indexOf('}>', formRootStart);
  assert.ok(formRootStart >= 0 && formRootEnd > formRootStart, '펼쳐진 작성·수정 form root를 찾을 수 없습니다.');
  const formRoot = writeBox.slice(formRootStart, formRootEnd);
  const modalShellStart = writeBox.indexOf('function ModalShell');
  const modalShellEnd = writeBox.indexOf('\n}\n', modalShellStart);
  const modalShell = writeBox.slice(modalShellStart, modalShellEnd);
  for (const contract of cursorContracts) {
    assert.ok(formRoot.includes(contract), `수정 form cursor 계약 누락: ${contract}`);
    assert.ok(modalShell.includes(contract), `수정 내부 portal cursor 계약 누락: ${contract}`);
  }

  const selectFieldStart = writeBox.indexOf('function SelectField');
  const selectFieldEnd = writeBox.indexOf('\n}\n', selectFieldStart);
  const selectField = writeBox.slice(selectFieldStart, selectFieldEnd);
  assert.match(selectField, /<label className="[^"]*\bcursor-pointer\b[^"]*">[\s\S]*?<select\b/,
    '선택 필드 label 전체가 클릭 가능한 cursor를 보여야 합니다.');
  const dateLabelStart = writeBox.indexOf('<label className="relative ml-auto inline-flex h-9');
  const dateLabelEnd = writeBox.indexOf('</label>', dateLabelStart);
  assert.ok(dateLabelStart >= 0 && dateLabelEnd > dateLabelStart, '작업일 control을 찾을 수 없습니다.');
  const dateControl = writeBox.slice(dateLabelStart, dateLabelEnd);
  assert.match(dateControl, /<label className="[^"]*\bcursor-pointer\b/);
  assert.match(dateControl, /<input type="date"[\s\S]*?className="[^"]*\bcursor-pointer\b/,
    '작업일 필드와 date input 모두 클릭 가능한 cursor를 유지해야 합니다.');
  assert.match(writeBox, /<button type="button" onClick=\{requestSave\} disabled=\{submitting\} className="[^"]*disabled:cursor-not-allowed[^"]*"/,
    '저장 중인 수정 완료 버튼은 not-allowed cursor여야 합니다.');

  const editOverlayStart = feed.indexOf('{editingPost ?');
  const editOverlayEnd = feed.indexOf('<SonghyeonTaskFeedWriteBox', editOverlayStart);
  const editOverlay = feed.slice(editOverlayStart, editOverlayEnd);
  const editCloseStart = editOverlay.indexOf('<button type="button" aria-label="닫기"');
  const editCloseEnd = editOverlay.indexOf('><X', editCloseStart);
  assert.ok(editCloseStart >= 0 && editCloseEnd > editCloseStart, '부모 수정 modal 닫기 control을 찾을 수 없습니다.');
  const editClose = editOverlay.slice(editCloseStart, editCloseEnd);
  assert.match(editClose, /className="[^"]*\bcursor-pointer\b[^"]*"/,
    '부모 수정 modal의 상단 닫기 control도 pointer cursor를 사용해야 합니다.');
});

test('수정 저장은 ID 반환·pending 해제·닫기 후 재조회·inline 오류 계약을 유지한다', async () => {
  const [repository, writeBox, feed] = await Promise.all([
    read(REPOSITORY_PATH),
    read(WRITE_BOX_PATH),
    read(FEED_PATH),
  ]);

  const updateStart = repository.indexOf('export async function updateTaskFeedPost');
  const updateEnd = repository.indexOf('export async function deleteTaskFeedPost', updateStart);
  assert.ok(updateStart >= 0 && updateEnd > updateStart, 'updateTaskFeedPost 구간을 찾을 수 없습니다.');
  const update = repository.slice(updateStart, updateEnd);
  assert.match(update, /const postId = text\(id\)/,
    '수정 대상 ID를 안정적인 문자열로 정규화해야 합니다.');
  assert.match(update, /await run\([\s\S]*?target_post_id:\s*postId[\s\S]*?\)/,
    'RPC 성공을 확인한 뒤에만 수정 완료로 처리해야 합니다.');
  assert.match(update, /return postId\s*;/,
    'updateTaskFeedPost는 raw RPC row가 아닌 수정된 게시글 ID 문자열을 반환해야 합니다.');

  const saveStart = writeBox.indexOf('const save = async () =>');
  const saveEnd = writeBox.indexOf('\n\n  const requestSave', saveStart);
  assert.ok(saveStart >= 0 && saveEnd > saveStart, '작성창 저장 흐름을 찾을 수 없습니다.');
  const save = writeBox.slice(saveStart, saveEnd);
  assert.match(save, /setSubmitting\(true\)[\s\S]*?try\s*\{/);
  assert.match(save, /await updateTaskFeedPost\(initialPost\.id, payload, actor\)/);
  assert.match(save, /onSaved\?\.\(savedPost\)/,
    '저장 성공 후에만 부모 onSaved를 호출해야 합니다.');
  const catchStart = save.indexOf('catch (saveError)');
  const finallyStart = save.indexOf('finally', catchStart);
  assert.ok(catchStart >= 0 && finallyStart > catchStart, '저장 실패와 종료 처리가 필요합니다.');
  const failedSave = save.slice(catchStart, finallyStart);
  assert.match(failedSave, /setError\(saveError\?\.message\s*\|\|\s*['"]게시글을 저장하지 못했습니다\.['"]\)/);
  assert.doesNotMatch(failedSave, /onSaved|onCancel/,
    '수정 실패 시에는 편집창을 닫지 말고 오류를 보존해야 합니다.');
  assert.match(save.slice(finallyStart), /finally\s*\{\s*setSubmitting\(false\)\s*;?\s*\}/,
    '성공·실패 모두에서 저장 pending을 반드시 해제해야 합니다.');
  assert.match(writeBox, /\{error\s*&&\s*<p role="alert"[^>]*>\{error\}<\/p>\}/,
    '저장 실패 사유를 수정창 내 inline alert로 남겨야 합니다.');
  assert.match(writeBox, /editMode\s*&&\s*<button[^>]*onClick=\{onCancel\}[^>]*>\uCDE8소<\/button>/,
    '수정 취소는 저장 콜백과 분리된 onCancel로 닫혀야 합니다.');

  const editMountStart = feed.indexOf('{editingPost ?');
  const editMountEnd = feed.indexOf('{deleteTarget ?', editMountStart);
  assert.ok(editMountStart >= 0 && editMountEnd > editMountStart, '부모 편집 modal 구간을 찾을 수 없습니다.');
  const editMount = feed.slice(editMountStart, editMountEnd);
  assert.match(editMount, /onCancel=\{\(\)\s*=>\s*setEditingPost\(null\)\}|onCancel=\{[A-Za-z_$][\w$]*\}/,
    '부모는 취소 시 editingPost를 닫아야 합니다.');

  const onSavedExpression = editMount.match(/onSaved=\{([\s\S]*?)\}\s+onCancel=/)?.[1] || '';
  let editSavedFlow = onSavedExpression;
  if (/^[A-Za-z_$][\w$]*$/.test(onSavedExpression.trim())) {
    const handlerName = onSavedExpression.trim();
    const handlerStart = feed.indexOf(`const ${handlerName} =`);
    const handlerEnd = feed.indexOf('\n  };', handlerStart);
    assert.ok(handlerStart >= 0 && handlerEnd > handlerStart, '수정 성공 handler를 찾을 수 없습니다.');
    editSavedFlow = feed.slice(handlerStart, handlerEnd);
  }
  assert.match(editSavedFlow, /setEditingPost\(null\)/,
    '수정 RPC 성공 즉시 편집 modal을 닫아야 합니다.');
  assert.match(editSavedFlow, /void\s+refresh\(\)|refresh\(\)\s*;?/,
    '편집창을 닫은 뒤 목록을 재조회해야 합니다.');
  assert.ok(editSavedFlow.indexOf('setEditingPost(null)') < editSavedFlow.indexOf('refresh()'),
    '재조회가 지연되어도 수정 modal은 먼저 닫혀야 합니다.');
  assert.doesNotMatch(editSavedFlow, /await\s+refresh\(\)/,
    '편집 modal 닫기를 재조회 완료에 결합하면 안 됩니다.');
});

test('부서 mention의 UI row id를 멤버 UUID로 재해석하지 않는다', async () => {
  const [repository, writeBox] = await Promise.all([read(REPOSITORY_PATH), read(WRITE_BOX_PATH)]);

  const candidatesStart = writeBox.indexOf('const mentionCandidates =');
  const candidatesEnd = writeBox.indexOf('const filteredMentions', candidatesStart);
  assert.ok(candidatesStart >= 0 && candidatesEnd > candidatesStart, 'mention 후보 구간을 찾을 수 없습니다.');
  const candidates = writeBox.slice(candidatesStart, candidatesEnd);
  assert.match(candidates, /groups\.map\(\(group\)\s*=>\s*\(\{\s*id:\s*`group:\$\{group\}`,[\s\S]*?type:\s*['"]department['"][\s\S]*?groupName:\s*group/,
    '부서 후보의 id는 UI key일 뿐이며 department로 구분해야 합니다.');
  assert.match(candidates, /members\.map\(\(member\)\s*=>\s*\(\{[\s\S]*?type:\s*['"]person['"][\s\S]*?memberId:\s*member\.id/,
    '실제 멤버 후보만 memberId를 명시해야 합니다.');

  const normalizeStart = repository.indexOf('const normalizeMentions =');
  const normalizeEnd = repository.indexOf('const normalizeAttachments', normalizeStart);
  assert.ok(normalizeStart >= 0 && normalizeEnd > normalizeStart, 'mention repository 정규화 구간을 찾을 수 없습니다.');
  const normalize = repository.slice(normalizeStart, normalizeEnd);
  assert.match(normalize, /const memberId = text\(mention\.memberId\s*\|\|\s*mention\.member_id\)/,
    'memberId는 명시적인 memberId 필드에서만 읽어야 합니다.');
  assert.doesNotMatch(normalize, /memberId[^\n]*(?:\|\||\?\?)[^\n]*mention\.id|text\([^\n]*mention\.id/,
    '부서 UI row id를 멤버 UUID로 전송하면 DB cast가 실패합니다.');
  assert.match(normalize, /memberId:\s*isUuid\(memberId\)\s*\?\s*memberId\s*:\s*['"]{2}/,
    '명시된 멤버 ID도 UUID인 경우에만 RPC payload에 포함해야 합니다.');
});

test('댓글은 @멘션 가능한 단일 계층이며 댓글 수정·대댓글·댓글 첨부를 새로 만들지 않는다', async () => {
  const [feed, repository, migration] = await Promise.all([
    read(FEED_PATH),
    read(REPOSITORY_PATH),
    read(MIGRATION_PATH),
  ]);

  for (const method of ['addTaskFeedComment', 'deleteTaskFeedComment']) {
    assert.match(repository, exportedFunction(repository, method), `댓글 API 누락: ${method}`);
    assert.match(feed, new RegExp(method), `댓글 UI 연결 누락: ${method}`);
  }
  assert.match(feed, /댓글을 입력하세요|@를 입력하여/);
  assert.match(feed, /mention/i);
  assert.doesNotMatch(repository, /updateTaskFeedComment|addTaskFeedReply|deleteTaskFeedReply|replyId|parentComment/i);
  assert.doesNotMatch(feed, /대댓글|답글|replyId|parentComment/i);
  assert.doesNotMatch(migration, /songhyeon_feed_(?:comment_)?repl(?:y|ies)|parent_comment/i);

  const commentsTable = migration.match(/create table(?: if not exists)? public\.songhyeon_feed_comments[\s\S]*?\n\);/i)?.[0] || '';
  assert.ok(commentsTable, 'flat comments 원장 테이블이 필요합니다.');
  assert.doesNotMatch(commentsTable, /attachment|parent_/i, '댓글에는 첨부나 중첩 부모 필드를 두지 않습니다.');
});

test('좋아요·확인은 게시글과 댓글에서 사용자별 토글되고 반응자 프로필을 표시한다', async () => {
  const [feed, repository, migration] = await Promise.all([
    read(FEED_PATH),
    read(REPOSITORY_PATH),
    read(MIGRATION_PATH),
  ]);

  assert.match(repository, exportedFunction(repository, 'toggleTaskFeedReaction'));
  assert.match(feed, /toggleTaskFeedReaction/);
  for (const kind of ['like', 'check']) {
    assert.match(`${feed}\n${repository}\n${migration}`, new RegExp(`['"]${kind}['"]`), `반응 종류 누락: ${kind}`);
  }
  assert.match(`${feed}\n${repository}\n${migration}`, /post[\s\S]{0,500}comment|comment[\s\S]{0,500}post/i);
  assert.match(feed, /ReactionAvatarStack|reactionProfiles|reactors/);
  assert.match(migration, /unique[\s\S]{0,240}(?:reaction|kind)|unique[\s\S]{0,240}reactor/i);
});

test('피드 작성자·댓글·반응 프로필은 member photoPath를 잃지 않고 공용 송현 아바타를 사용한다', async () => {
  const [feed, writeBox, repository, memberAvatar] = await Promise.all([
    read(FEED_PATH),
    read(WRITE_BOX_PATH),
    read(REPOSITORY_PATH),
    read(MEMBER_AVATAR_PATH),
  ]);

  assert.match(memberAvatar, /export\s+(?:const|function)\s+songhyeonMemberPhotoSource\b/);
  assert.match(memberAvatar, /export\s+default\s+(?:function\s+)?SonghyeonMemberAvatar\b|export\s+default\s+SonghyeonMemberAvatar\b/);
  assert.match(memberAvatar, /photoPath|photo_path/);
  assert.match(memberAvatar, /songhyeon-members/);
  assert.match(memberAvatar, /encodeURIComponent/);
  const storedPhotoBranch = memberAvatar.search(/if\s*\(\s*(?:storedPath|photoPath)\s*\)/);
  const namePhotoFallback = memberAvatar.indexOf('songhyeon-members');
  assert.ok(storedPhotoBranch >= 0 && namePhotoFallback > storedPhotoBranch,
    'DB photoPath를 이름 기반 public 이미지보다 먼저 선택해야 합니다.');
  assert.match(memberAvatar, /onError/);
  assert.match(memberAvatar, /set[A-Za-z]*(?:Failed|Error)|currentTarget\.style\.display\s*=\s*['"]none['"]/i);
  assert.match(memberAvatar, /slice|substring/, '이미지 오류 시 표시할 이름 이니셜을 계산해야 합니다.');

  for (const [source, label] of [[feed, '피드'], [writeBox, '작성창']]) {
    assert.match(source, /import\s+SonghyeonMemberAvatar\s+from\s+['"][^'"]*SonghyeonMemberAvatar(?:\.jsx)?['"]/,
      `${label}가 공용 아바타 컴포넌트를 가져와야 합니다.`);
    assert.match(source, /<SonghyeonMemberAvatar\b/, `${label}가 공용 아바타 컴포넌트를 렌더링해야 합니다.`);
  }

  assert.match(repository, /photoPath:\s*row\[`\$\{prefix\}_photo_path`\]\s*\|\|\s*['"]{2}/,
    '게시글·댓글·반응 공통 프로필 매핑에서 DB photo_path를 보존해야 합니다.');
  assert.match(repository, /photoPath:\s*row\.photo_path/,
    '작성폼 멤버 선택값에서도 DB photo_path를 보존해야 합니다.');
  assert.match(feed, /authorPhotoPath:\s*valueOf\(post\.author\?\.photoPath/);
  assert.match(feed, /photoPath:\s*entry\?\.photoPath\s*\|\|\s*entry\?\.photo_path/);
  assert.match(feed, /comment\.author\?\.photoPath\s*\|\|\s*comment\.authorPhotoPath\s*\|\|\s*comment\.author_photo_path/);
  assert.match(feed, /photoPath:\s*member\?\.photo_path\s*\|\|\s*['"]{2}/,
    '현재 로그인 멤버의 실제 photo_path를 작성자 프로필에 전달해야 합니다.');
});

test('첨부파일은 게시글에만 연결하고 private bucket의 60초 signed URL로 내려받는다', async () => {
  const [writeBox, repository, migration] = await Promise.all([
    read(WRITE_BOX_PATH),
    read(REPOSITORY_PATH),
    read(MIGRATION_PATH),
  ]);

  for (const method of ['uploadTaskFeedAttachment', 'downloadTaskFeedAttachment']) {
    assert.match(repository, exportedFunction(repository, method), `첨부 API 누락: ${method}`);
    assert.match(writeBox, new RegExp(method), `작성폼 첨부 연결 누락: ${method}`);
  }
  assert.match(writeBox, /type=['"]file['"]/);
  assert.match(writeBox, /\bmultiple\b/);
  assert.equal(SONGHYEON_FEED_ATTACHMENT_BUCKET, 'songhyeon-feed-attachments');
  assert.equal(SONGHYEON_FEED_SIGNED_URL_TTL_SECONDS, 60);
  assert.match(repository, /\.storage\s*\.from\((?:SONGHYEON_FEED_ATTACHMENT_BUCKET|['"]songhyeon-feed-attachments['"])\)/);
  assert.match(repository, /createSignedUrl\([^,]+,\s*(?:SONGHYEON_FEED_SIGNED_URL_TTL_SECONDS|60)\)/);
  assert.doesNotMatch(repository, /getPublicUrl/);

  const attachmentsTable = migration.match(/create table(?: if not exists)? public\.songhyeon_feed_attachments[\s\S]*?\n\);/i)?.[0] || '';
  assert.ok(attachmentsTable, '게시글 첨부 원장 테이블이 필요합니다.');
  assert.match(attachmentsTable, /post_id/);
  assert.doesNotMatch(attachmentsTable, /comment_id/);
  assert.match(migration, /songhyeon-feed-attachments/);
  assert.match(migration, /private|public\s*=\s*false/i);
});

test('원본처럼 명시적 재조회로 동기화하며 존재하지 않는 Supabase realtime 계약을 발명하지 않는다', async () => {
  const [feed, repository] = await Promise.all([read(FEED_PATH), read(REPOSITORY_PATH)]);
  const combined = `${feed}\n${repository}`;

  assert.match(feed, /useEffect\([\s\S]{0,500}(?:loadTaskFeedPosts|refresh)/);
  assert.match(feed, /(?:createTaskFeedPost|updateTaskFeedPost|deleteTaskFeedPost|addTaskFeedComment|deleteTaskFeedComment|toggleTaskFeedReaction)[\s\S]{0,800}(?:loadTaskFeedPosts|refresh)/);
  assert.doesNotMatch(combined, /\.channel\(|postgres_changes|subscribeToTaskFeed|\.subscribe\(/);
});

test('피드 DB는 송현 전용 원장·guest-safe 공개뷰·active-member 쓰기와 작성자 권한을 서버에서 강제한다', async () => {
  const [repository, migration] = await Promise.all([read(REPOSITORY_PATH), read(MIGRATION_PATH)]);
  const lower = migration.toLowerCase();
  const tables = [
    'songhyeon_feed_posts',
    'songhyeon_feed_post_tasks',
    'songhyeon_feed_post_stakeholders',
    'songhyeon_feed_post_permissions',
    'songhyeon_feed_post_mentions',
    'songhyeon_feed_attachments',
    'songhyeon_feed_comments',
    'songhyeon_feed_reactions',
  ];
  for (const table of tables) {
    assert.match(lower, new RegExp(`create table(?: if not exists)? public\\.${table}`), `원장 테이블 누락: ${table}`);
    assert.match(lower, new RegExp(`alter table public\\.${table} enable row level security`), `RLS 누락: ${table}`);
  }
  assert.doesNotMatch(`${repository}\n${migration}`, /\biota_/i);

  assert.match(lower, /songhyeon_public_feed_posts/);
  assert.match(lower, /grant select on public\.songhyeon_public_feed_/);
  assert.match(lower, /\bto anon\b/);
  assert.match(lower, /not exists[\s\S]{0,500}songhyeon_feed_post_permissions|songhyeon_feed_post_permissions[\s\S]{0,500}not exists/);
  assert.doesNotMatch(lower, /grant (?:insert|update|delete|all)[^;]* to anon/);
  assert.match(lower, /public\.is_songhyeon_member\(\)|member\.is_active/);
  assert.match(lower, /auth\.uid\(\)/);
  assert.match(lower, /author_id[\s\S]{0,500}auth\.uid\(\)|auth\.uid\(\)[\s\S]{0,500}author_id/);
  assert.match(lower, /staff_name\s*=\s*'전기영'/);
  assert.match(lower, /(?:lower\(member\.email\)|member\.email)\s*=\s*'jk\.jeon@igisam\.com'/);
  assert.match(lower, /grant execute on function[\s\S]*to authenticated/);
  for (const mutation of [
    'create_songhyeon_feed_post',
    'update_songhyeon_feed_post',
    'delete_songhyeon_feed_post',
    'add_songhyeon_feed_comment',
    'delete_songhyeon_feed_comment',
    'toggle_songhyeon_feed_reaction',
  ]) {
    assert.match(lower, new RegExp(`grant execute on function public\\.${mutation}\\([^;]+to authenticated`), `${mutation} authenticated grant 누락`);
    assert.doesNotMatch(lower, new RegExp(`grant execute on function public\\.${mutation}\\([^;]+to anon`), `${mutation}을 anon에게 허용하면 안 됩니다.`);
  }
});
