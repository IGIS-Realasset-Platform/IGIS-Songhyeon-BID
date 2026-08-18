import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');

const APP_PATH = 'src/App.jsx';
const DATA_LIST_PATH = 'src/pages/DataRoom.jsx';
const DATA_DETAIL_PATH = 'src/pages/DataRoomDetail.jsx';
const DATA_REPOSITORY_PATH = 'src/lib/songhyeonDataRoomRepository.js';
const FEED_PATH = 'src/components/iota-songhyeon/task-feed/SonghyeonTaskFeed.jsx';

test('Data Room 목록의 모든 행은 문서 ID 기반 고유 pathname으로 이동하고 행 내부 action을 보존한다', async () => {
  const list = await read(DATA_LIST_PATH);

  assert.match(list, /import\s+\{[^}]*\buseNavigate\b[^}]*\}\s+from\s+['"]react-router-dom['"]/);
  assert.match(list, /const\s+navigate\s*=\s*useNavigate\(\)/);
  assert.match(
    list,
    /const\s+openDocument\s*=\s*\(document\)\s*=>\s*navigate\(`\/data\/\$\{encodeURIComponent\(document\.id\)\}`/,
    '행마다 document.id를 URL-safe pathname segment로 사용해야 합니다.',
  );

  const rowStart = list.indexOf('<tr\n                  key={document.id}');
  const rowEnd = list.indexOf('</tr>', rowStart);
  assert.ok(rowStart >= 0 && rowEnd > rowStart, 'Data Room 문서 행을 찾을 수 없습니다.');
  const row = list.slice(rowStart, rowEnd);
  assert.match(row, /role="link"/);
  assert.match(row, /tabIndex=\{0\}/);
  assert.match(row, /onClick=\{\(\)\s*=>\s*openDocument\(document\)\}/);
  assert.match(row, /event\.key === ['"]Enter['"][\s\S]{0,100}event\.key === ['"] ['"]/,
    '키보드 사용자도 같은 문서 상세 pathname을 열 수 있어야 합니다.');

  const stoppedActions = row.match(/event\.stopPropagation\(\)/g) || [];
  assert.ok(stoppedActions.length >= 3,
    '원문·수정·삭제 action은 행의 상세 이동으로 이벤트가 전파되지 않아야 합니다.');
  assert.match(list, /state:\s*\{\s*dataRoomListSearch:\s*searchParams\.toString\(\)\s*\}/,
    '상세에서 목록으로 돌아올 때 기존 Data Room 검색 상태를 복원할 수 있어야 합니다.');
});

test('Data Room 상세 route는 URL의 ID를 직접 조회하고 미존재 문서와 목록 복귀를 처리한다', async () => {
  const [app, detail, repository] = await Promise.all([
    read(APP_PATH),
    read(DATA_DETAIL_PATH),
    read(DATA_REPOSITORY_PATH),
  ]);

  assert.match(app, /import\s+DataRoomDetail\s+from\s+['"]\.\/pages\/DataRoomDetail['"]/);
  assert.match(app, /<Route\s+path=['"]data\/:documentId['"]\s+element=\{<DataRoomDetail\s*\/>\}\s*\/>/);
  assert.match(detail, /const\s+\{\s*documentId\s*=\s*['"]{2}\s*\}\s*=\s*useParams\(\)/);
  assert.match(detail, /loadDataRoomDocument\(documentId\)/,
    '직접 URL 진입은 목록 state가 아니라 pathname의 documentId로 단건을 조회해야 합니다.');
  assert.doesNotMatch(detail, /loadDataRoomDocuments\(/,
    '상세 직접 진입을 위해 전체 목록을 다시 불러오면 안 됩니다.');

  assert.match(repository, /export\s+async\s+function\s+loadDataRoomDocument\(documentId\)/);
  assert.match(repository, /authenticated\s*\?\s*['"]songhyeon_data_room_documents['"]\s*:\s*['"]songhyeon_public_data_room_documents['"]/,
    '인증·게스트 직접 진입 모두 기존 공개 범위 계약을 유지해야 합니다.');
  assert.match(repository, /\.select\(['"]\*['"]\)\.eq\(['"]id['"],\s*documentId\)\.maybeSingle\(\)/);
  assert.match(repository, /return\s+row\s*\?\s*toDocument\(row\)\s*:\s*null/);

  assert.match(detail, /문서를 찾을 수 없습니다\./);
  assert.match(detail, /const\s+listHref\s*=\s*state\?\.dataRoomListSearch\s*\?\s*`\/data\?\$\{state\.dataRoomListSearch\}`\s*:\s*['"]\/data['"]/);
  assert.ok((detail.match(/<Link\s+to=\{(?:to|listHref)\}/g) || []).length >= 2,
    '정상 상세와 미존재 상세 모두 Data Room 목록으로 복귀할 수 있어야 합니다.');
});

test('업무 피드 행은 다른 게시글 URL을 열고 현재 펼쳐진 행을 다시 누르면 닫는다', async () => {
  const feed = await read(FEED_PATH);

  assert.match(feed, /import\s+\{[^}]*\buseLocation\b[^}]*\buseNavigate\b[^}]*\buseParams\b[^}]*\}\s+from\s+['"]react-router-dom['"]/);
  const openStart = feed.indexOf('const openPostDetail =');
  const openEnd = feed.indexOf('\n\n  useEffect(', openStart);
  assert.ok(openStart >= 0 && openEnd > openStart, '업무 피드 상세 이동 함수를 찾을 수 없습니다.');
  const openPostDetail = feed.slice(openStart, openEnd);
  assert.match(openPostDetail, /navigate\(`\/feed\/\$\{encodeURIComponent\(postId\)\}`/,
    '각 게시글의 ID를 URL-safe pathname segment로 사용해야 합니다.');
  assert.match(openPostDetail, /from:\s*`\$\{location\.pathname\}\$\{location\.search\}`/);
  assert.match(openPostDetail, /feedListState/,
    '검색·필터·보기·페이지 상태를 상세 history entry에 전달해야 합니다.');
  assert.doesNotMatch(openPostDetail, /replace\s*:/,
    '목록→상세 이동은 history를 교체하지 않아야 브라우저 뒤로가기가 동작합니다.');

  const rowLinkPosition = feed.indexOf('data-feed-row-link');
  const rowStart = feed.lastIndexOf('<button type="button"', rowLinkPosition);
  const rowEnd = feed.indexOf('</button>', rowStart);
  assert.ok(rowLinkPosition >= 0 && rowStart >= 0 && rowEnd > rowStart, '업무 피드 목록 행 link를 찾을 수 없습니다.');
  const row = feed.slice(rowStart, rowEnd);
  assert.match(row, /data-feed-row-link/);
  assert.match(row, /cursor-pointer/);
  assert.match(row, /openPostDetail\(post\.id\)/);
  assert.match(row, /aria-expanded=\{isExpanded\}/,
    '현재 URL에 연결된 행의 펼침 상태를 접근성 속성으로 알려야 합니다.');
  assert.match(row, /if\s*\(isExpanded\)\s*closeDetailRoute\(\)\s*;?\s*else\s*openPostDetail\(post\.id\)/,
    '펼쳐진 행 재클릭은 닫고, 다른 행 클릭은 해당 게시글 URL을 열어야 합니다.');

  const closeStart = feed.indexOf('const closeDetailRoute =');
  const closeEnd = feed.indexOf('\n\n  const updateFilter', closeStart);
  assert.ok(closeStart >= 0 && closeEnd > closeStart, '펼쳐진 행 닫기 함수를 찾을 수 없습니다.');
  const closeDetailRoute = feed.slice(closeStart, closeEnd);
  assert.match(closeDetailRoute, /navigate\(['"]\/feed['"],\s*\{\s*replace:\s*true\s*\}\)/,
    '닫기는 새 history entry를 쌓지 않고 /feed로 replace해야 합니다.');
});

test('업무 피드 상세 route는 전체 목록 UI를 유지하고 대상 행만 inline으로 펼친다', async () => {
  const [app, feed] = await Promise.all([read(APP_PATH), read(FEED_PATH)]);

  assert.match(app, /<Route\s+path=['"]feed\/:postId['"]\s+element=\{<TaskFeed\s*\/>\}\s*\/>/);
  assert.match(feed, /const\s+\{\s*postId:\s*routePostId\s*=\s*['"]{2}\s*\}\s*=\s*useParams\(\)/);
  const displayedPostsStart = feed.indexOf('const displayedPosts =');
  const feedListStateStart = feed.indexOf('const feedListState =', displayedPostsStart);
  assert.ok(displayedPostsStart >= 0 && feedListStateStart > displayedPostsStart,
    '업무 피드의 현재 페이지 목록 계산을 찾을 수 없습니다.');
  const displayedPosts = feed.slice(displayedPostsStart, feedListStateStart);
  assert.match(displayedPosts, /filteredPosts\.slice\(/,
    '상세 URL에서도 현재 페이지의 전체 목록 행을 렌더해야 합니다.');
  assert.doesNotMatch(displayedPosts, /isDetailView\s*\?|detailPost\s*\?\s*\[detailPost\]/,
    '상세 URL을 해당 게시글 한 건으로 대체하면 안 됩니다.');

  const rowMapStart = feed.indexOf('{displayedPosts.map((post, index) =>');
  const rowLinkPosition = feed.indexOf('data-feed-row-link', rowMapStart);
  assert.ok(rowMapStart >= 0 && rowLinkPosition > rowMapStart, '업무 피드 행 렌더링을 찾을 수 없습니다.');
  const rowSetup = feed.slice(rowMapStart, rowLinkPosition);
  assert.match(rowSetup, /const\s+isExpanded\s*=\s*Boolean\(routePostId\s*&&\s*String\(post\.id\)\s*===\s*String\(routePostId\)\)/,
    'URL의 postId와 일치하는 행 하나만 본문·댓글·첨부·반응 영역을 펼쳐야 합니다.');

  const headerActionsStart = feed.indexOf('const headerActions =');
  const feedReturnStart = feed.indexOf('\n  return (', headerActionsStart);
  const headerActions = feed.slice(headerActionsStart, feedReturnStart);
  assert.match(headerActions, /<Search\b/,
    '상세 URL에서도 검색·보기 전환을 포함한 페이지 header를 유지해야 합니다.');
  assert.doesNotMatch(headerActions, /isDetailView\s*\?/,
    '상세 URL에서 header action을 목록으로 버튼 하나로 대체하면 안 됩니다.');

  const renderStart = feed.indexOf('<section', feedReturnStart);
  const rowRenderStart = feed.indexOf('{displayedPosts.map', renderStart);
  const listChrome = feed.slice(renderStart, rowRenderStart);
  assert.match(listChrome, /<SonghyeonTaskFeedWriteBox\b/,
    '상세 URL에서도 작성 UI를 계속 보여야 합니다.');
  assert.match(listChrome, /<div className="grid min-w-\[1080px\]/,
    '상세 URL에서도 목록 table header와 필터를 계속 보여야 합니다.');
  assert.doesNotMatch(listChrome, /!isDetailView\s*\?\s*<(?:SonghyeonTaskFeedWriteBox|div className="grid min-w-\[1080px\])/,
    '작성 UI와 table header를 상세 URL에서 숨기면 안 됩니다.');

  const paginationStart = feed.indexOf('<nav className=', rowRenderStart);
  assert.ok(paginationStart >= 0, '업무 피드 pagination을 찾을 수 없습니다.');
  const paginationGuard = feed.slice(Math.max(rowRenderStart, paginationStart - 120), paginationStart);
  assert.doesNotMatch(paginationGuard, /!isDetailView/,
    '상세 URL에서도 전체보기 pagination을 유지해야 합니다.');

  assert.match(feed, /params\.get\(['"]postId['"]\)/,
    '기존 ?postId= 공유 링크도 계속 인식해야 합니다.');
  assert.match(feed, /navigate\(`\/feed\/\$\{encodeURIComponent\(targetPostId\)\}/);
  assert.match(feed, /replace:\s*true/,
    'legacy query 링크는 canonical /feed/:postId URL로 replace해야 합니다.');
});

test('업무 피드 상세 URL은 대상 페이지를 맞춘 뒤 펼쳐진 행을 viewport 최상단으로 옮긴다', async () => {
  const feed = await read(FEED_PATH);

  const pageEffectStart = feed.indexOf('const filteredTargetIndex =');
  const scrollEffectStart = feed.indexOf('const targetIsVisible =', pageEffectStart);
  assert.ok(pageEffectStart >= 0 && scrollEffectStart > pageEffectStart,
    '상세 URL의 대상 페이지·스크롤 처리를 찾을 수 없습니다.');
  const pageEffect = feed.slice(pageEffectStart, scrollEffectStart);
  assert.match(pageEffect, /filteredPosts\.findIndex\(\(post\)\s*=>\s*String\(post\.id\)\s*===\s*String\(routePostId\)\)/,
    '현재 필터 결과에서 대상 게시글의 index를 먼저 찾아야 합니다.');
  assert.match(pageEffect, /Math\.floor\(filteredTargetIndex\s*\/\s*pageSize\)\s*\+\s*1[\s\S]{0,180}?setCurrentPage\(targetPage\)/,
    '대상 index와 현재 page size로 펼쳐진 행이 보일 페이지를 설정해야 합니다.');
  assert.match(pageEffect, /posts\.findIndex\(\(post\)\s*=>\s*String\(post\.id\)\s*===\s*String\(routePostId\)\)/,
    '필터에 가려진 deep link도 전체 게시글에서 다시 찾아야 합니다.');

  assert.match(feed, /const\s+postRefs\s*=\s*useRef\(new Map\(\)\)/,
    '펼쳐진 행의 실제 DOM 위치를 찾을 ref가 필요합니다.');
  assert.match(feed, /ref=\{\(node\)\s*=>\s*\{[\s\S]{0,220}?postRefs\.current\.set\(key,\s*node\)[\s\S]{0,120}?postRefs\.current\.delete\(key\)/,
    '각 행 DOM을 게시글 ID로 ref map에 연결해야 합니다.');
  assert.match(feed, /postRefs\.current\.get\(String\(routePostId\)\)[\s\S]{0,160}?scrollIntoView\(\{\s*behavior:\s*['"]auto['"],\s*block:\s*['"]start['"]\s*\}\)/,
    '펼쳐진 행은 scrollIntoView block:start로 viewport 최상단에 정렬해야 합니다.');
});

test('업무 피드 목록의 내용 열은 제목만 보이고 본문 미리보기를 렌더하지 않는다', async () => {
  const feed = await read(FEED_PATH);
  const rowLinkPosition = feed.indexOf('data-feed-row-link');
  const rowStart = feed.lastIndexOf('<button type="button"', rowLinkPosition);
  const rowEnd = feed.indexOf('</button>', rowStart);
  assert.ok(rowLinkPosition >= 0 && rowStart >= 0 && rowEnd > rowStart,
    '업무 피드 목록 행을 찾을 수 없습니다.');
  const row = feed.slice(rowStart, rowEnd);

  assert.match(row, /\{post\.title\s*\|\|\s*['"]제목 없음['"]\}/,
    '목록 내용 열은 게시글 제목과 제목 fallback만 렌더해야 합니다.');
  assert.doesNotMatch(row, /post\.content/,
    '본문은 펼쳐진 inline 상세 안에서만 보이고 목록 행에서는 미리보기로 노출하면 안 됩니다.');
});

test('펼쳐진 피드에서 검색·필터·보기·페이지를 바꾸면 상세 URL을 닫고 목록 조작을 계속한다', async () => {
  const feed = await read(FEED_PATH);

  const updateFilterStart = feed.indexOf('const updateFilter =');
  const filteredPostsStart = feed.indexOf('const filteredPosts =', updateFilterStart);
  const updateFilter = feed.slice(updateFilterStart, filteredPostsStart);
  assert.match(updateFilter, /closeDetailRoute\(\)[\s\S]{0,100}?setFilters\(/,
    '필터를 바꾸기 전에 펼쳐진 상세 URL을 닫아야 합니다.');

  const headerActionsStart = feed.indexOf('const headerActions =');
  const feedReturnStart = feed.indexOf('\n  return (', headerActionsStart);
  const headerActions = feed.slice(headerActionsStart, feedReturnStart);
  assert.match(headerActions, /onChange=\{\(event\)\s*=>\s*\{\s*closeDetailRoute\(\);\s*setSearchQuery\(event\.target\.value\)/,
    '검색어를 바꾸면 상세 URL을 닫고 검색을 적용해야 합니다.');
  assert.match(headerActions, /onClick=\{\(\)\s*=>\s*\{\s*closeDetailRoute\(\);\s*setViewMode\(/,
    '요약·전체보기 전환은 상세 URL을 닫고 실행해야 합니다.');

  const paginationStart = feed.indexOf('<nav className=', feedReturnStart);
  const paginationEnd = feed.indexOf('</nav>', paginationStart);
  const pagination = feed.slice(paginationStart, paginationEnd);
  assert.match(pagination, /onClick=\{\(\)\s*=>\s*\{\s*closeDetailRoute\(\);\s*setCurrentPage\(page\)/,
    '페이지를 바꾸면 상세 URL을 닫고 선택한 목록 페이지로 이동해야 합니다.');
});
