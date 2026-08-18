import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');

const readMemberAnalyticsMigration = async () => {
  const files = await readdir('supabase/migrations');
  const file = files.find((name) => /songhyeon_tf_member_analytics\.sql$/.test(name));
  assert.ok(file, 'TF 구성원 상세 트래킹 migration이 있어야 한다.');
  return read(`supabase/migrations/${file}`);
};

test('회원 페이지뷰는 클라이언트가 아닌 인증된 활성 멤버로 서버에서 귀속한다', async () => {
  const [memberSql, originalSql] = await Promise.all([
    readMemberAnalyticsMigration(),
    read('supabase/migrations/202608140004_songhyeon_guest_readonly_analytics.sql'),
  ]);
  const sql = memberSql.toLowerCase();
  const analyticsMigrations = `${originalSql}\n${memberSql}`.toLowerCase();
  const tracker = sql.match(
    /create or replace function public\.track_songhyeon_page_view\([\s\S]*?\n\$\$;/,
  )?.[0] || '';

  assert.match(sql, /add column if not exists member_id uuid/);
  assert.match(sql, /references public\.songhyeon_members\s*\(id\) on delete set null/);
  assert.match(sql, /songhyeon_page_views_member_viewed_idx/);
  assert.doesNotMatch(sql, /update public\.songhyeon_page_views[\s\S]*set\s+member_id/);
  assert.ok(tracker, '기존 페이지뷰 기록 RPC를 member_id 귀속 방식으로 갱신해야 한다.');
  assert.match(tracker, /track_songhyeon_page_view\(\s*anonymous_visitor_id uuid,\s*anonymous_session_id uuid,\s*page_path text\s*\)/);
  assert.match(tracker, /member\.auth_id = auth\.uid\(\)/);
  assert.match(tracker, /member\.is_active/);
  assert.match(tracker, /member\.roles @> array\['송현 bid tf'\]::text\[\]/);
  assert.match(tracker, /insert into public\.songhyeon_page_views\([\s\S]*member_id/);
  assert.match(tracker, /resolved_member_id/);
  assert.match(tracker, /case when resolved_member_id is null then 'guest' else 'member' end[\s\S]*resolved_member_id/);
  assert.match(sql, /revoke all on table public\.songhyeon_page_views from public, anon, authenticated/);
  assert.match(analyticsMigrations, /grant execute on function public\.track_songhyeon_page_view\(uuid, uuid, text\)[\s\S]*to anon, authenticated/);
});

test('TF 목록과 선택 인원의 상세 집계는 exact 전기영 관리자 RPC에서만 제공한다', async () => {
  const sql = (await readMemberAnalyticsMigration()).toLowerCase();
  const listFunction = sql.match(
    /create or replace function public\.get_songhyeon_tf_member_analytics\([\s\S]*?\n\$\$;/,
  )?.[0] || '';
  const detailFunction = sql.match(
    /create or replace function public\.get_songhyeon_tf_member_detail\([\s\S]*?\n\$\$;/,
  )?.[0] || '';

  assert.ok(listFunction, 'TF 구성원별 이용 현황 목록 RPC가 있어야 한다.');
  assert.ok(detailFunction, '선택한 TF 구성원의 상세 이용 RPC가 있어야 한다.');
  assert.match(listFunction, /lookback_days integer default 30/);
  assert.match(detailFunction, /target_member_id uuid/);
  assert.match(detailFunction, /lookback_days integer default 30/);
  for (const analyticsFunction of [listFunction, detailFunction]) {
    assert.match(analyticsFunction, /security definer/);
    assert.match(analyticsFunction, /set search_path = pg_catalog, public/);
    assert.match(analyticsFunction, /greatest\(1, least\(coalesce\(lookback_days, 30\), 365\)\)/);
    assert.match(analyticsFunction, /auth\.uid\(\) is null or not exists/);
    assert.match(analyticsFunction, /member\.auth_id = auth\.uid\(\)/);
    assert.match(analyticsFunction, /member\.is_active/);
    assert.match(analyticsFunction, /member\.staff_name = '전기영'/);
    assert.match(analyticsFunction, /lower\(member\.email\) = 'jk\.jeon@igisam\.com'/);
    assert.match(analyticsFunction, /raise exception 'songhyeon_analytics_forbidden'/);
    assert.doesNotMatch(analyticsFunction, /platform_role/);
  }

  assert.match(listFunction, /member\.roles @> array\['송현 bid tf'\]::text\[\]/);
  assert.match(listFunction, /from public\.songhyeon_members member/);
  assert.match(listFunction, /page_view\.member_id = member\.id/);
  assert.match(listFunction, /member\.id/);
  assert.match(listFunction, /member\.staff_name as "staffname"/);
  assert.match(listFunction, /member\.group_name as "groupname"/);
  assert.match(listFunction, /member\.photo_path as "photopath"/);
  for (const field of ['views', 'sessions', 'activedays', 'lastviewedat']) assert.match(listFunction, new RegExp(field));
  for (const key of ['trackingStartedAt', 'unattributedMemberViews', 'members']) {
    assert.match(listFunction, new RegExp(`'${key.toLowerCase()}'`));
  }
  for (const key of ['member', 'summary', 'daily', 'pages', 'recent']) {
    assert.match(detailFunction, new RegExp(`'${key}'`));
  }
  assert.match(detailFunction, /at time zone 'asia\/seoul'/);
  assert.match(detailFunction, /target_member_id[\s\S]*member\.id/);
  assert.match(detailFunction, /member\.roles @> array\['송현 bid tf'\]::text\[\]/);
  assert.match(detailFunction, /raise exception 'songhyeon_analytics_member_not_found'/);

  for (const privateKey of ['email', 'authid', 'auth_id', 'phone', 'ipaddress', 'ip_address', 'useragent', 'user_agent', 'referrer']) {
    assert.doesNotMatch(listFunction, new RegExp(`'${privateKey}'`));
    assert.doesNotMatch(detailFunction, new RegExp(`'${privateKey}'`));
  }
  assert.match(sql, /revoke all on function public\.get_songhyeon_tf_member_analytics\(integer\)[\s\S]*from public, anon, authenticated/);
  assert.match(sql, /grant execute on function public\.get_songhyeon_tf_member_analytics\(integer\)[\s\S]*to authenticated/);
  assert.match(sql, /revoke all on function public\.get_songhyeon_tf_member_detail\(uuid, integer\)[\s\S]*from public, anon, authenticated/);
  assert.match(sql, /grant execute on function public\.get_songhyeon_tf_member_detail\(uuid, integer\)[\s\S]*to authenticated/);
  assert.doesNotMatch(sql, /grant select on public\.songhyeon_page_views/);
});

test('상세 경로는 개인정보 없는 페이지 단위로 정규화해서 집계한다', async () => {
  const [repository, sqlSource] = await Promise.all([
    read('src/lib/songhyeonAnalyticsRepository.js'),
    readMemberAnalyticsMigration(),
  ]);
  const sql = sqlSource.toLowerCase();
  const tracker = sql.match(
    /create or replace function public\.track_songhyeon_page_view\([\s\S]*?\n\$\$;/,
  )?.[0] || '';

  assert.match(repository, /export const normalizeSonghyeonAnalyticsPath/);
  assert.match(repository, /pathname === ['"]\/feed['"] \|\| pathname\.startsWith\(['"]\/feed\/['"]\)[\s\S]*return ['"]\/feed['"]/);
  assert.match(repository, /pathname === ['"]\/data['"] \|\| pathname\.startsWith\(['"]\/data\/['"]\)[\s\S]*return ['"]\/data['"]/);
  assert.match(repository, /split\(['"]#['"]/);
  assert.match(repository, /split\(['"]\?['"]/);
  for (const mapPath of [
    '/map-activities/integrated-map',
    '/map-activities/boundary',
    '/map-activities/assets-leases',
    '/map-activities/igis-retail',
    '/map-activities/market-activities',
    '/map-activities/hotel',
    '/map-activities/institutions-community',
  ]) {
    assert.match(tracker, new RegExp(mapPath.replaceAll('/', '\\/')));
  }
  assert.doesNotMatch(repository, /memberId[\s\S]*recordSonghyeonPageView/);
});

test('analytics repository는 TF 목록 조회와 선택 인원 상세 조회를 같은 기간 기준으로 분리한다', async () => {
  const repository = await read('src/lib/songhyeonAnalyticsRepository.js');

  assert.match(repository, /export async function loadSonghyeonTfMemberAnalytics\(days = 30\)/);
  assert.match(repository, /get_songhyeon_tf_member_analytics/);
  assert.match(repository, /lookback_days:\s*safeLookbackDays\(days\)/);
  assert.match(repository, /export async function loadSonghyeonTfMemberDetail\(memberId, days = 30\)/);
  assert.match(repository, /get_songhyeon_tf_member_detail/);
  assert.match(repository, /target_member_id:\s*targetMemberId/);
  assert.match(repository, /TF 인원별 이용 현황을 불러오지 못했습니다/);
  assert.match(repository, /TF 인원 상세 트래킹을 불러오지 못했습니다/);
});

test('이용 현황 화면은 TF 인원 목록에서 선택한 사람의 상세 트래킹을 펼친다', async () => {
  const page = await read('src/pages/admin/SonghyeonAnalytics.jsx');

  assert.match(page, /loadSonghyeonTfMemberAnalytics/);
  assert.match(page, /loadSonghyeonTfMemberDetail/);
  assert.match(page, /selectedMemberId/);
  for (const text of ['TF 인원별 이용', 'TF 인원 상세 트래킹', '조회', '세션', '활동일', '최근 이용', '페이지별 이용', '일별 이용 추이', '최근 활동']) {
    assert.match(page, new RegExp(text));
  }
  assert.match(page, /members\.map\(/);
  assert.match(page, /<button[^>]*type="button"[\s\S]*setSelectedMemberId/);
  assert.match(page, /searchParams/);
  assert.match(page, /setSearchParams/);
  assert.match(page, /searchParams\.get\(['"]member['"]\)/);
  assert.match(page, /setSearchParams\([\s\S]*member/);
  assert.match(page, /memberDetail/);
  assert.doesNotMatch(page, /member\.(?:email|authId|auth_id|phone)/);
});
