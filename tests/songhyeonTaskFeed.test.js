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

  assert.match(feed, />송현 BID 업무 메시지</, '원본의 workspace 업무 메시지 제목을 송현 이름으로 표시해야 합니다.');
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

test('피드 목록은 원본의 검색·5개 요약·20개 전체보기와 다섯 필터를 실제 데이터에 적용한다', async () => {
  const [feed, repository] = await Promise.all([read(FEED_PATH), read(REPOSITORY_PATH)]);

  assert.match(feed, /loadTaskFeedPosts/);
  assert.match(feed, /loadTaskFeedOptions/);
  assert.match(repository, exportedFunction(repository, 'loadTaskFeedPosts'));
  assert.match(repository, exportedFunction(repository, 'loadTaskFeedOptions'));
  assert.match(feed, /(?:SUMMARY_PAGE_SIZE|summaryPageSize|summary[^\n]{0,40})\s*=\s*5/i);
  assert.match(feed, /(?:FULL_PAGE_SIZE|fullPageSize|full[^\n]{0,40})\s*=\s*20/i);
  assert.match(feed, /전체보기/);
  assert.match(feed, /간략히 보기/);
  assert.match(feed, /검색어 입력/);

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
