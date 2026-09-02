import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');

test('이지스 자산 화면은 활성 멤버 전용 라우트이며 게스트 메뉴와 홈에서 숨긴다', async () => {
  const [app, memberRoute, layout, dashboard] = await Promise.all([
    read('src/App.jsx'),
    read('src/components/auth/MemberRoute.jsx'),
    read('src/components/Layout.jsx'),
    read('src/pages/Dashboard.jsx'),
  ]);

  assert.match(memberRoute, /guestRedirect\s*=\s*['"]\/['"]/);
  assert.match(memberRoute, /if\s*\(isGuest\)\s*return\s*<Navigate\s+to=\{guestRedirect\}\s+replace/);
  assert.match(memberRoute, /if\s*\(!user\s*\|\|\s*!member\)/);
  for (const path of [
    'assets', 'assets/k-twin', 'assets/twin-tree', 'assets/ssamzigil',
    'assets/annyeong', 'assets/new-assets', 'assets/market-data',
    'assets-leases', 'igis-retail',
  ]) {
    assert.match(app, new RegExp(`path="${path.replace('/', '\\/')}"[^\n]*<MemberRoute>`), `멤버 전용 라우트 누락: ${path}`);
  }
  assert.match(layout, /memberOnly:\s*true/);
  assert.match(layout, /children\.filter\(\(child\)\s*=>\s*!isGuest\s*\|\|\s*!child\.memberOnly\)/);
  assert.match(layout, /!isGuest\s*\?\s*<Section\s+label="이지스 주요 자산"/);
  assert.match(dashboard, /mapViews\.filter\(\(item\)\s*=>\s*!isGuest\s*\|\|\s*!item\.memberOnly\)/);
});

test('업무피드 게스트는 목록만 보고 상세 URL·본문·댓글·첨부에는 접근하지 못한다', async () => {
  const [app, feed, repository, migration, dashboard] = await Promise.all([
    read('src/App.jsx'),
    read('src/components/iota-songhyeon/task-feed/SonghyeonTaskFeed.jsx'),
    read('src/lib/songhyeonTaskFeedRepository.js'),
    read('supabase/migrations/202608310001_songhyeon_guest_feed_list_only.sql'),
    read('src/pages/Dashboard.jsx'),
  ]);
  const sql = migration.toLowerCase();

  assert.match(app, /path="feed"\s+element=\{<TaskFeed\s*\/>\}/);
  assert.match(app, /path="feed\/:postId"[^\n]*<MemberRoute\s+guestRedirect="\/feed"><TaskFeed\s*\/><\/MemberRoute>/);
  assert.match(feed, /if\s*\(isReadOnly\)\s*return;[\s\S]{0,200}navigate\(`\/feed\/\$\{encodeURIComponent\(postId\)\}`/);
  assert.match(feed, /disabled=\{isReadOnly\}/);
  assert.match(feed, /상세 내용은 멤버 로그인 후 확인할 수 있습니다\./);
  assert.match(dashboard, /to=\{isGuest\s*\?\s*'\/feed'\s*:\s*`\/feed\/\$\{encodeURIComponent\(post\.id\)\}`\}/);

  assert.match(repository, /authenticated\s*\?\s*client\.from\(table\('attachments'\)\)[\s\S]{0,100}Promise\.resolve/);
  assert.match(repository, /authenticated\s*\?\s*loadTasks\(\)\s*:\s*Promise\.resolve\(\[\]\)/);
  assert.match(sql, /create view public\.songhyeon_public_feed_posts/);
  const publicPosts = sql.slice(sql.indexOf('create view public.songhyeon_public_feed_posts'), sql.indexOf('create view public.songhyeon_public_feed_post_stakeholders'));
  assert.doesNotMatch(publicPosts, /post\.body|\bbody\b/);
  const publicComments = sql.slice(sql.indexOf('create view public.songhyeon_public_feed_comments'), sql.indexOf('create view public.songhyeon_public_feed_reactions'));
  assert.doesNotMatch(publicComments, /comment\.body|\bbody\b/);
  assert.match(sql, /drop policy if exists "guests read public feed attachment objects"/);
  assert.doesNotMatch(sql, /grant select on public\.songhyeon_public_feed_(?:post_tasks|post_mentions|attachments) to anon/);
});
