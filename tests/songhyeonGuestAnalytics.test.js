import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');

test('비회원은 로그인 세션을 비운 뒤 기기 로컬 게스트로 입장한다', async () => {
  const [context, login, guard] = await Promise.all([
    read('src/context/SonghyeonAuthContext.jsx'),
    read('src/pages/Login.jsx'),
    read('src/components/auth/ProtectedRoute.jsx'),
  ]);

  assert.match(context, /GUEST_MODE_KEY/);
  assert.match(context, /localStorage/);
  assert.match(context, /enterGuestMode\s*=\s*useCallback\(async/);
  assert.match(context, /auth\.getSession\(\)/);
  assert.match(context, /if \(data\.session\)[\s\S]*auth\.signOut\(\{ scope: 'local' \}\)/);
  assert.match(context, /isGuest,\s*isReadOnly:\s*isGuest/);
  assert.match(login, /게스트로 입장/);
  assert.doesNotMatch(login, /로그인 없이 둘러보기/);
  assert.match(login, /await enterGuestMode\(\)/);
  assert.match(guard, /&& !isGuest/);
});

test('관리자 화면은 전기영 exact 계정에만 노출되고 페이지뷰를 집계한다', async () => {
  const [context, app, layout, adminRoute, tracker, page, repository] = await Promise.all([
    read('src/context/SonghyeonAuthContext.jsx'),
    read('src/App.jsx'),
    read('src/components/Layout.jsx'),
    read('src/components/auth/AdminRoute.jsx'),
    read('src/components/analytics/SonghyeonPageViewTracker.jsx'),
    read('src/pages/admin/SonghyeonAnalytics.jsx'),
    read('src/lib/songhyeonAnalyticsRepository.js'),
  ]);

  assert.match(context, /member\?\.staff_name === '전기영'/);
  assert.match(context, /user\.email\?\.toLowerCase\(\) === 'jk\.jeon@igisam\.com'/);
  assert.doesNotMatch(context, /platform_role\?\.toLowerCase\(\) === 'admin'/);
  assert.match(app, /path="admin\/analytics"[\s\S]*<AdminRoute>/);
  assert.match(adminRoute, /if \(!isAdmin\) return <Navigate to="\/tasks" replace/);
  assert.match(layout, /isAdmin &&[\s\S]*이용 현황/);
  assert.match(layout, /<SonghyeonPageViewTracker/);
  assert.match(tracker, /recordSonghyeonPageView\(normalizeSonghyeonAnalyticsPath\(pathname\)\)/);
  for (const text of ['전체 조회', '오늘 조회', '방문자', '세션', '게스트 조회', '회원 조회', '일별 이용 추이', '페이지 순위']) {
    assert.match(page, new RegExp(text));
  }
  assert.match(repository, /track_songhyeon_page_view/);
  assert.match(repository, /get_songhyeon_page_view_analytics/);
  assert.match(repository, /localStorage/);
  assert.match(repository, /sessionStorage/);
  assert.match(repository, /split\('#'/);
  assert.match(repository, /split\('\?'/);
});

test('이용 현황 메뉴는 exact 전기영에게만 사이드바 최하단 사용자 영역 바로 위에 표시된다', async () => {
  const [context, layout, adminRoute, sql] = await Promise.all([
    read('src/context/SonghyeonAuthContext.jsx'),
    read('src/components/Layout.jsx'),
    read('src/components/auth/AdminRoute.jsx'),
    read('supabase/migrations/202608140004_songhyeon_guest_readonly_analytics.sql'),
  ]);

  assert.match(
    context,
    /const isAdmin = Boolean\([\s\S]*user[\s\S]*member\?\.staff_name === '전기영'[\s\S]*user\.email\?\.toLowerCase\(\) === 'jk\.jeon@igisam\.com'[\s\S]*\);/,
  );
  assert.doesNotMatch(context, /platform_role[^\n]*admin/i);
  assert.match(adminRoute, /const \{ isAdmin, loading \} = useSonghyeonAuth\(\)/);
  assert.match(adminRoute, /if \(!isAdmin\) return <Navigate to="\/tasks" replace/);

  const navEnd = layout.indexOf('</nav>');
  const analyticsLink = layout.indexOf("name: '이용 현황'");
  const accountFooter = layout.indexOf('<div className={`border-t border-[#3A3A3C]', navEnd);
  assert.ok(navEnd >= 0, '좌측 스크롤 메뉴의 닫는 태그가 있어야 한다.');
  assert.ok(analyticsLink > navEnd, '이용 현황은 스크롤되는 일반 메뉴 바깥에 있어야 한다.');
  assert.ok(accountFooter > analyticsLink, '이용 현황은 사용자 계정 footer 바로 위에 있어야 한다.');
  assert.equal(layout.match(/이용 현황/g)?.length, 1, '이용 현황 링크는 사이드바에 한 번만 렌더되어야 한다.');
  assert.match(
    layout.slice(navEnd, accountFooter),
    /\{isAdmin && \([\s\S]*<MainLink item=\{\{ name: '이용 현황', path: '\/admin\/analytics', icon: BarChart3 \}\}[\s\S]*\)\}/,
  );

  const analyticsFunction = sql.match(
    /create or replace function public\.get_songhyeon_page_view_analytics\([\s\S]*?\n\$\$;/,
  )?.[0] || '';
  assert.ok(analyticsFunction, '이용 현황 집계 RPC가 있어야 한다.');
  assert.match(analyticsFunction, /auth\.uid\(\) is null or not exists/);
  assert.match(analyticsFunction, /member\.auth_id = auth\.uid\(\)/);
  assert.match(analyticsFunction, /member\.is_active/);
  assert.match(analyticsFunction, /member\.staff_name = '전기영'/);
  assert.match(analyticsFunction, /lower\(member\.email\) = 'jk\.jeon@igisam\.com'/);
  assert.match(analyticsFunction, /raise exception 'SONGHYEON_ANALYTICS_FORBIDDEN'/);
  assert.doesNotMatch(analyticsFunction, /platform_role/);
  assert.match(sql, /revoke all on table public\.songhyeon_page_views from public, anon, authenticated/);
  assert.match(sql, /revoke all on function public\.get_songhyeon_page_view_analytics\(integer\)[\s\S]*from public, anon, authenticated/);
  assert.match(sql, /grant execute on function public\.get_songhyeon_page_view_analytics\(integer\)[\s\S]*to authenticated/);
});

test('게스트 UI는 업무·댓글·일정·Data Room 변경 기능을 렌더링하지 않는다', async () => {
  const [board, drawer, schedule, linkModal, dataRoom] = await Promise.all([
    read('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx'),
    read('src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx'),
    read('src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx'),
    read('src/components/iota-songhyeon/pmo/SonghyeonScheduleTaskLinkModal.jsx'),
    read('src/pages/DataRoom.jsx'),
  ]);

  assert.match(board, /const \{ user, member, isReadOnly \} = useSonghyeonAuth\(\)/);
  assert.match(board, /archived \|\| isReadOnly \|\| task\.status === ['"]완료['"] \? <span[\s\S]*task\.status[\s\S]*: <button/);
  assert.match(board, /isEditorOpen && canCreateAndArchive/);
  assert.match(board, /workflowTask && !isReadOnly/);
  assert.match(drawer, /const workflowActions = detailReadOnly \? \[\] : taskWorkflowActions/);
  assert.match(drawer, /if \(!task \|\| detailReadOnly\) return undefined;[\s\S]*subscribeToTaskDiscussion/);
  assert.match(drawer, /!detailReadOnly && comment\.authorId === actor\.userId/);
  assert.match(drawer, /!detailReadOnly \? <form[\s\S]*게스트는 협업 기록을 읽을 수 있습니다/);
  assert.match(schedule, /if \(isReadOnly\) return;/);
  assert.match(schedule, /readOnly=\{!canManageScheduleLinks\}/);
  assert.match(linkModal, /readOnly = false/);
  assert.match(linkModal, /link && canManageLinks/);
  assert.match(dataRoom, /!isReadOnly && <button[\s\S]*문서 추가/);
  assert.match(dataRoom, /if \(!isReadOnly\) recordView/);
  assert.match(dataRoom, /editingDocument && !isReadOnly/);
});

test('게스트 읽기는 개인정보 없는 송현 public view로만 분기한다', async () => {
  const [taskRepository, scheduleRepository, dataRepository, profilesPage, sessionHelper] = await Promise.all([
    read('src/lib/songhyeonTaskRepository.js'),
    read('src/lib/songhyeonScheduleRepository.js'),
    read('src/lib/songhyeonDataRoomRepository.js'),
    read('src/pages/governance/SonghyeonInternal.jsx'),
    read('src/lib/songhyeonReadSession.js'),
  ]);

  assert.match(sessionHelper, /client\.auth\.getSession\(\)/);
  for (const view of [
    'songhyeon_public_tasks',
    'songhyeon_public_task_comments',
    'songhyeon_public_task_comment_replies',
    'songhyeon_public_task_comment_reactions',
    'songhyeon_public_task_reply_reactions',
    'songhyeon_public_task_activity',
  ]) assert.match(taskRepository, new RegExp(view));
  assert.match(scheduleRepository, /songhyeon_public_schedule_task_links/);
  assert.match(scheduleRepository, /songhyeon_public_schedule_rows/);
  assert.match(dataRepository, /songhyeon_public_data_room_documents/);
  assert.match(profilesPage, /songhyeon_public_profiles/);
  assert.doesNotMatch(profilesPage, /\.select\([^\n]*email/);
});

test('공개 DB 경계는 raw 원장 쓰기를 막고 이메일·auth UUID를 노출하지 않는다', async () => {
  const sql = await read('supabase/migrations/202608140004_songhyeon_guest_readonly_analytics.sql');
  const lower = sql.toLowerCase();
  const viewNames = [
    'songhyeon_public_profiles',
    'songhyeon_public_tasks',
    'songhyeon_public_task_comments',
    'songhyeon_public_task_comment_replies',
    'songhyeon_public_task_comment_reactions',
    'songhyeon_public_task_reply_reactions',
    'songhyeon_public_task_activity',
    'songhyeon_public_schedule_task_links',
    'songhyeon_public_schedule_overrides',
    'songhyeon_public_data_room_documents',
  ];
  for (const view of viewNames) {
    assert.match(lower, new RegExp(`create or replace view public\\.${view}`));
    assert.match(lower, new RegExp(`grant select on public\\.${view} to anon, authenticated`));
  }
  for (const table of [
    'songhyeon_members', 'songhyeon_tasks', 'songhyeon_task_comments',
    'songhyeon_task_comment_replies', 'songhyeon_task_comment_reactions',
    'songhyeon_task_reply_reactions', 'songhyeon_task_activity',
    'songhyeon_schedule_task_links', 'songhyeon_schedule_overrides',
    'songhyeon_data_room_documents',
  ]) assert.match(lower, new RegExp(`'${table}'`));
  assert.match(lower, /to_regclass\(format\('public\.%i', raw_relation\)\)/);
  assert.match(lower, /'revoke all on table public\.%i from public, anon'/);

  const profilesView = lower.match(/create or replace view public\.songhyeon_public_profiles[\s\S]*?from public\.songhyeon_members member[\s\S]*?where member\.is_active;/)?.[0] || '';
  assert.ok(profilesView);
  for (const privateField of ['auth_id', 'email', 'phone', 'platform_role', 'last_login_at']) {
    assert.doesNotMatch(profilesView, new RegExp(`member\\.${privateField}`));
  }
  for (const privateField of ['author_email', 'reactor_email', 'updated_by', 'created_by', 'actor_id']) {
    const projected = [...lower.matchAll(/create or replace view public\.songhyeon_public_[\s\S]*?;/g)].map((match) => match[0]).join('\n');
    assert.doesNotMatch(projected, new RegExp(`\\b${privateField}\\b`));
  }
  assert.doesNotMatch(lower, /grant (?:insert|update|delete|all)[^;]* to anon/);
  assert.match(lower, /alter table public\.songhyeon_auth_settings enable row level security/);
  assert.match(lower, /revoke all on table public\.songhyeon_auth_settings from public, anon, authenticated/);
  assert.doesNotMatch(lower, /iota_/);
});

test('페이지뷰 원장은 최소정보만 저장하고 전기영에게 집계만 제공한다', async () => {
  const sql = await read('supabase/migrations/202608140004_songhyeon_guest_readonly_analytics.sql');
  const table = sql.match(/create table if not exists public\.songhyeon_page_views[\s\S]*?\n\);/)?.[0] || '';
  assert.ok(table);
  for (const field of ['anonymous_visitor_id', 'anonymous_session_id', 'page_path', 'viewer_type', 'viewed_at']) assert.match(table, new RegExp(field));
  // Member attribution is added later as a nullable internal FK for authenticated
  // TF analytics. The original event never stores direct identity or request data.
  for (const privateField of ['email', 'ip_address', 'user_agent', 'referrer', 'auth_id']) assert.doesNotMatch(table, new RegExp(privateField));
  assert.match(sql, /viewer_type in \('guest', 'member'\)/);
  assert.match(sql, /clean_path <> all \(array\[/);
  assert.match(sql, /pg_advisory_xact_lock/);
  assert.match(sql, /interval '5 seconds'/);
  assert.match(sql, /interval '400 days'/);
  assert.match(sql, /interval '1 minute'[\s\S]*offset 119/);
  assert.match(sql, /site_day_start[\s\S]*offset 9999/);
  assert.match(sql, /at time zone 'Asia\/Seoul'/);
  assert.match(sql, /member\.staff_name = '전기영'/);
  assert.match(sql, /lower\(member\.email\) = 'jk\.jeon@igisam\.com'/);
  assert.doesNotMatch(sql, /member\.platform_role = 'admin'/);
  assert.match(sql, /revoke all on table public\.songhyeon_page_views from public, anon, authenticated/);
  assert.match(sql, /grant execute on function public\.track_songhyeon_page_view\(uuid, uuid, text\)[\s\S]*to anon, authenticated/);
  assert.match(sql, /grant execute on function public\.get_songhyeon_page_view_analytics\(integer\)[\s\S]*to authenticated/);
});
