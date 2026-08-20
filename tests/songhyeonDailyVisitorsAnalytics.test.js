import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');

test('오늘 이용자는 게스트 브라우저와 로그인 TF 계정을 각각 중복 제거한다', async () => {
  const migration = await read('supabase/migrations/202608200002_songhyeon_analytics_daily_visitors.sql');
  const lower = migration.toLowerCase();

  assert.match(migration, /'todayVisitors'/);
  assert.match(lower, /when page_view\.member_id is not null then 'member:' \|\| page_view\.member_id::text/);
  assert.match(lower, /else 'guest:' \|\| page_view\.anonymous_visitor_id::text/);
  assert.match(lower, /page_view\.viewed_at < today_start then null/);
  assert.match(lower, /at time zone 'asia\/seoul'/);
  assert.match(lower, /member\.staff_name = '전기영'/);
  assert.match(lower, /lower\(member\.email\) = 'jk\.jeon@igisam\.com'/);
});

test('일별 집계와 화면은 방문자와 페이지뷰를 같은 날짜에 함께 표시한다', async () => {
  const [migration, page] = await Promise.all([
    read('supabase/migrations/202608200002_songhyeon_analytics_daily_visitors.sql'),
    read('src/pages/admin/SonghyeonAnalytics.jsx'),
  ]);

  assert.match(migration, /'views', daily\.view_count/);
  assert.match(migration, /'visitors', daily\.visitor_count/);
  assert.match(migration, /count\(page_view\.id\)::bigint as view_count/);
  assert.match(migration, /::bigint as visitor_count/);
  assert.match(page, /label="오늘 이용자" value=\{summary\.todayVisitors\}/);
  assert.match(page, /일별 방문자·페이지뷰/);
  assert.match(page, /페이지뷰 \{number\(item\.views\)\} · 방문자 \{number\(item\.visitors\)\}/);
  assert.match(page, /style=\{\{ height: viewHeight \}\}/);
  assert.match(page, /style=\{\{ height: visitorHeight \}\}/);
});
