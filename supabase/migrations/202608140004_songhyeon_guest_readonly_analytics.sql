-- Songhyeon guest read boundary and anonymous page-view analytics.
-- Raw operational tables stay private to anon. Public views expose only the
-- non-sensitive fields required by the read-only guest experience.

-- Explicitly keep every raw Songhyeon relation out of the anon role. The live
-- project predates some optional governance tables, so hardening is conditional
-- and remains safe on both a clean install and the existing production schema.
do $$
declare
  raw_relation text;
begin
  foreach raw_relation in array array[
    'songhyeon_members',
    'songhyeon_login_history',
    'songhyeon_audit_log',
    'songhyeon_tasks',
    'songhyeon_task_comments',
    'songhyeon_task_comment_replies',
    'songhyeon_task_comment_reactions',
    'songhyeon_task_reply_reactions',
    'songhyeon_task_activity',
    'songhyeon_task_discussion_reads',
    'songhyeon_schedule_task_links',
    'songhyeon_schedule_overrides',
    'songhyeon_data_room_documents'
  ]::text[] loop
    if to_regclass(format('public.%I', raw_relation)) is not null then
      execute format(
        'revoke all on table public.%I from public, anon',
        raw_relation
      );
    end if;
  end loop;

  if to_regclass('public.songhyeon_auth_settings') is not null then
    execute 'alter table public.songhyeon_auth_settings enable row level security';
    execute 'revoke all on table public.songhyeon_auth_settings from public, anon, authenticated';
  end if;
end;
$$;

-- Active public profile. Deliberately excludes auth_id, email, phone,
-- platform_role, login timestamps, and all authentication metadata.
create or replace view public.songhyeon_public_profiles
with (security_barrier = true, security_invoker = false)
as
select
  member.id as profile_id,
  member.staff_name,
  member.group_name,
  member.title,
  member.roles,
  member.responsibility,
  member.photo_path,
  member.gate_scope,
  member.display_order
from public.songhyeon_members member
where member.is_active;

-- Only live tasks are public. Auth-user UUID columns are not projected.
create or replace view public.songhyeon_public_tasks
with (security_barrier = true, security_invoker = false)
as
select
  task.id,
  task.source_key,
  task.display_order,
  task.payload,
  task.created_at,
  task.updated_at,
  task.version,
  task.started_at,
  task.completed_at,
  task.completion_summary,
  task.completion_evidence_url
from public.songhyeon_tasks task
where task.archived_at is null;

create or replace view public.songhyeon_public_task_comments
with (security_barrier = true, security_invoker = false)
as
select
  comment.id,
  comment.task_source_key,
  comment.body,
  member.id as author_profile_id,
  comment.author_name,
  coalesce(member.group_name, '송현 BID TF') as author_group_name,
  coalesce(member.photo_path, '') as author_photo_path,
  comment.created_at,
  comment.updated_at,
  comment.edited_at
from public.songhyeon_task_comments comment
join public.songhyeon_tasks task
  on task.source_key = comment.task_source_key
 and task.archived_at is null
left join public.songhyeon_members member
  on member.auth_id = comment.author_id
 and member.is_active;

create or replace view public.songhyeon_public_task_comment_replies
with (security_barrier = true, security_invoker = false)
as
select
  reply.id,
  reply.comment_id,
  reply.task_source_key,
  reply.body,
  member.id as author_profile_id,
  reply.author_name,
  coalesce(member.group_name, '송현 BID TF') as author_group_name,
  coalesce(member.photo_path, '') as author_photo_path,
  reply.created_at,
  reply.updated_at,
  reply.edited_at
from public.songhyeon_task_comment_replies reply
join public.songhyeon_tasks task
  on task.source_key = reply.task_source_key
 and task.archived_at is null
left join public.songhyeon_members member
  on member.auth_id = reply.author_id
 and member.is_active;

create or replace view public.songhyeon_public_task_comment_reactions
with (security_barrier = true, security_invoker = false)
as
select
  reaction.comment_id,
  reaction.task_source_key,
  reaction.reaction_type,
  member.id as reactor_profile_id,
  reaction.reactor_name,
  coalesce(member.group_name, '송현 BID TF') as reactor_group_name,
  coalesce(member.photo_path, '') as reactor_photo_path,
  reaction.created_at
from public.songhyeon_task_comment_reactions reaction
join public.songhyeon_tasks task
  on task.source_key = reaction.task_source_key
 and task.archived_at is null
left join public.songhyeon_members member
  on member.auth_id = reaction.reactor_id
 and member.is_active;

create or replace view public.songhyeon_public_task_reply_reactions
with (security_barrier = true, security_invoker = false)
as
select
  reaction.reply_id,
  reaction.task_source_key,
  reaction.reaction_type,
  member.id as reactor_profile_id,
  reaction.reactor_name,
  coalesce(member.group_name, '송현 BID TF') as reactor_group_name,
  coalesce(member.photo_path, '') as reactor_photo_path,
  reaction.created_at
from public.songhyeon_task_reply_reactions reaction
join public.songhyeon_tasks task
  on task.source_key = reaction.task_source_key
 and task.archived_at is null
left join public.songhyeon_members member
  on member.auth_id = reaction.reactor_id
 and member.is_active;

create or replace view public.songhyeon_public_task_activity
with (security_barrier = true, security_invoker = false)
as
select
  activity.id,
  activity.task_source_key,
  activity.action,
  activity.payload,
  activity.actor_name,
  activity.created_at
from public.songhyeon_task_activity activity
join public.songhyeon_tasks task
  on task.source_key = activity.task_source_key
 and task.archived_at is null;

create or replace view public.songhyeon_public_schedule_task_links
with (security_barrier = true, security_invoker = false)
as
select
  link.id,
  link.schedule_source_key,
  link.task_source_key,
  link.created_at
from public.songhyeon_schedule_task_links link
join public.songhyeon_tasks task
  on task.source_key = link.task_source_key
 and task.archived_at is null;

create or replace view public.songhyeon_public_schedule_overrides
with (security_barrier = true, security_invoker = false)
as
select
  schedule.schedule_source_key,
  schedule.payload,
  schedule.updated_at
from public.songhyeon_schedule_overrides schedule;

create or replace view public.songhyeon_public_data_room_documents
with (security_barrier = true, security_invoker = false)
as
select
  document.id,
  document.title,
  document.description,
  document.category,
  document.document_type,
  document.reference_date,
  document.url,
  document.display_order,
  document.view_count,
  document.created_at,
  document.updated_at
from public.songhyeon_data_room_documents document;

revoke all on public.songhyeon_public_profiles from public, anon, authenticated;
revoke all on public.songhyeon_public_tasks from public, anon, authenticated;
revoke all on public.songhyeon_public_task_comments from public, anon, authenticated;
revoke all on public.songhyeon_public_task_comment_replies from public, anon, authenticated;
revoke all on public.songhyeon_public_task_comment_reactions from public, anon, authenticated;
revoke all on public.songhyeon_public_task_reply_reactions from public, anon, authenticated;
revoke all on public.songhyeon_public_task_activity from public, anon, authenticated;
revoke all on public.songhyeon_public_schedule_task_links from public, anon, authenticated;
revoke all on public.songhyeon_public_schedule_overrides from public, anon, authenticated;
revoke all on public.songhyeon_public_data_room_documents from public, anon, authenticated;

grant select on public.songhyeon_public_profiles to anon, authenticated;
grant select on public.songhyeon_public_tasks to anon, authenticated;
grant select on public.songhyeon_public_task_comments to anon, authenticated;
grant select on public.songhyeon_public_task_comment_replies to anon, authenticated;
grant select on public.songhyeon_public_task_comment_reactions to anon, authenticated;
grant select on public.songhyeon_public_task_reply_reactions to anon, authenticated;
grant select on public.songhyeon_public_task_activity to anon, authenticated;
grant select on public.songhyeon_public_schedule_task_links to anon, authenticated;
grant select on public.songhyeon_public_schedule_overrides to anon, authenticated;
grant select on public.songhyeon_public_data_room_documents to anon, authenticated;

comment on view public.songhyeon_public_profiles is
  'Email-free active Songhyeon profile projection for the read-only guest experience.';
comment on view public.songhyeon_public_tasks is
  'Non-archived Songhyeon task projection without authentication user identifiers.';

-- Page-view events are pseudonymous. No auth user id, email, IP address,
-- referrer, user-agent, query string, or URL fragment is stored.
create table if not exists public.songhyeon_page_views (
  id bigint generated always as identity primary key,
  anonymous_visitor_id uuid not null,
  anonymous_session_id uuid not null,
  page_path text not null check (
    char_length(page_path) between 1 and 300
    and left(page_path, 1) = '/'
    and page_path !~ '[[:cntrl:]]'
    and position('?' in page_path) = 0
    and position('#' in page_path) = 0
  ),
  viewer_type text not null check (viewer_type in ('guest', 'member')),
  viewed_at timestamptz not null default statement_timestamp()
);

alter table public.songhyeon_page_views enable row level security;
revoke all on table public.songhyeon_page_views from public, anon, authenticated;

create index if not exists songhyeon_page_views_viewed_idx
  on public.songhyeon_page_views(viewed_at desc);
create index if not exists songhyeon_page_views_path_viewed_idx
  on public.songhyeon_page_views(page_path, viewed_at desc);
create index if not exists songhyeon_page_views_visitor_viewed_idx
  on public.songhyeon_page_views(anonymous_visitor_id, viewed_at desc);
create index if not exists songhyeon_page_views_session_path_viewed_idx
  on public.songhyeon_page_views(anonymous_session_id, page_path, viewed_at desc);

create or replace function public.track_songhyeon_page_view(
  anonymous_visitor_id uuid,
  anonymous_session_id uuid,
  page_path text
)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  input_visitor_id uuid := anonymous_visitor_id;
  input_session_id uuid := anonymous_session_id;
  clean_path text := split_part(split_part(btrim(coalesce(page_path, '')), '?', 1), '#', 1);
  event_time timestamptz := statement_timestamp();
  site_day_start timestamptz;
begin
  if input_visitor_id is null or input_session_id is null then
    raise exception 'SONGHYEON_ANALYTICS_IDENTIFIER_REQUIRED' using errcode = '22023';
  end if;
  if clean_path = ''
     or char_length(clean_path) > 300
     or left(clean_path, 1) <> '/'
     or clean_path ~ '[[:cntrl:]]' then
    raise exception 'SONGHYEON_ANALYTICS_PATH_INVALID' using errcode = '22023';
  end if;

  if char_length(clean_path) > 1 then
    clean_path := regexp_replace(clean_path, '/+$', '');
  end if;
  if clean_path <> all (array[
    '/',
    '/tasks',
    '/map-activities',
    '/assets',
    '/assets/k-twin',
    '/assets/twin-tree',
    '/assets/ssamzigil',
    '/assets/annyeong',
    '/assets/new-assets',
    '/assets/market-data',
    '/cases/us',
    '/cases/japan',
    '/milestones',
    '/hypotheses',
    '/membership',
    '/data',
    '/governance/internal',
    '/governance/principles',
    '/governance/interfaces',
    '/governance/operations',
    '/admin/analytics'
  ]::text[]) then
    raise exception 'SONGHYEON_ANALYTICS_PATH_NOT_ALLOWED' using errcode = '22023';
  end if;

  -- The indexed retention delete is intentionally cheap when there is no old data.
  delete from public.songhyeon_page_views page_view
  where page_view.viewed_at < event_time - interval '400 days';

  site_day_start := ((event_time at time zone 'Asia/Seoul')::date)::timestamp
    at time zone 'Asia/Seoul';

  -- Serialize the 120/minute and 10000/Seoul-day limits with insertion. This
  -- small site fails closed instead of letting a bot inflate the analytics table.
  perform pg_advisory_xact_lock(
    hashtextextended('songhyeon-page-view-global-rate-limit', 0)
  );
  if exists (
    select 1
    from public.songhyeon_page_views page_view
    where page_view.viewed_at >= event_time - interval '1 minute'
    offset 119
    limit 1
  ) then
    return;
  end if;
  if exists (
    select 1
    from public.songhyeon_page_views page_view
    where page_view.viewed_at >= site_day_start
    offset 9999
    limit 1
  ) then
    return;
  end if;

  -- React StrictMode and rapid duplicate navigation must not inflate page views.
  perform pg_advisory_xact_lock(
    hashtextextended(
      concat_ws(chr(31), 'songhyeon-page-view', input_session_id::text, clean_path),
      0
    )
  );

  insert into public.songhyeon_page_views(
    anonymous_visitor_id,
    anonymous_session_id,
    page_path,
    viewer_type,
    viewed_at
  )
  select
    input_visitor_id,
    input_session_id,
    clean_path,
    case
      when auth.uid() is not null and public.is_songhyeon_member() then 'member'
      else 'guest'
    end,
    event_time
  where not exists (
    select 1
    from public.songhyeon_page_views existing
    where existing.anonymous_session_id = input_session_id
      and existing.page_path = clean_path
      and existing.viewed_at >= event_time - interval '5 seconds'
  );
end;
$$;

create or replace function public.get_songhyeon_page_view_analytics(
  lookback_days integer default 30
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  safe_days integer := greatest(1, least(coalesce(lookback_days, 30), 365));
  site_today date;
  today_start timestamptz;
  window_start timestamptz;
  summary_payload jsonb;
  daily_payload jsonb;
  pages_payload jsonb;
  recent_payload jsonb;
begin
  if auth.uid() is null or not exists (
    select 1
    from public.songhyeon_members member
    where member.auth_id = auth.uid()
      and member.is_active
      and member.staff_name = '전기영'
      and lower(member.email) = 'jk.jeon@igisam.com'
  ) then
    raise exception 'SONGHYEON_ANALYTICS_FORBIDDEN' using errcode = '42501';
  end if;

  -- Reports follow Seoul civil dates rather than the database session timezone.
  site_today := (statement_timestamp() at time zone 'Asia/Seoul')::date;
  today_start := site_today::timestamp at time zone 'Asia/Seoul';
  window_start := (site_today - (safe_days - 1))::timestamp
    at time zone 'Asia/Seoul';

  select jsonb_build_object(
    'periodDays', safe_days,
    'totalViews', count(*)::bigint,
    'todayViews', count(*) filter (where page_view.viewed_at >= today_start)::bigint,
    'uniqueVisitors', count(distinct page_view.anonymous_visitor_id)::bigint,
    'uniqueSessions', count(distinct page_view.anonymous_session_id)::bigint,
    'guestViews', count(*) filter (where page_view.viewer_type = 'guest')::bigint,
    'memberViews', count(*) filter (where page_view.viewer_type = 'member')::bigint
  )
  into summary_payload
  from public.songhyeon_page_views page_view
  where page_view.viewed_at >= window_start;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'date', daily.view_date,
        'views', daily.view_count,
        'visitors', daily.visitor_count,
        'sessions', daily.session_count
      ) order by daily.view_date
    ),
    '[]'::jsonb
  )
  into daily_payload
  from (
    select
      (site_today - (safe_days - 1) + series.day_offset)::date as view_date,
      count(page_view.id)::bigint as view_count,
      count(distinct page_view.anonymous_visitor_id)::bigint as visitor_count,
      count(distinct page_view.anonymous_session_id)::bigint as session_count
    from generate_series(0, safe_days - 1) as series(day_offset)
    left join public.songhyeon_page_views page_view
      on page_view.viewed_at >= (
        (site_today - (safe_days - 1) + series.day_offset)::timestamp
        at time zone 'Asia/Seoul'
      )
     and page_view.viewed_at < (
        (site_today - (safe_days - 1) + series.day_offset + 1)::timestamp
        at time zone 'Asia/Seoul'
      )
    group by series.day_offset
  ) daily;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'path', page.page_path,
        'views', page.view_count,
        'visitors', page.visitor_count,
        'sessions', page.session_count,
        'lastViewedAt', page.last_viewed_at
      ) order by page.view_count desc, page.page_path
    ),
    '[]'::jsonb
  )
  into pages_payload
  from (
    select
      page_view.page_path,
      count(*)::bigint as view_count,
      count(distinct page_view.anonymous_visitor_id)::bigint as visitor_count,
      count(distinct page_view.anonymous_session_id)::bigint as session_count,
      max(page_view.viewed_at) as last_viewed_at
    from public.songhyeon_page_views page_view
    where page_view.viewed_at >= window_start
    group by page_view.page_path
    order by view_count desc, page_view.page_path
    limit 100
  ) page;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'path', recent.page_path,
        'viewerType', recent.viewer_type,
        'viewedAt', recent.viewed_at
      ) order by recent.viewed_at desc
    ),
    '[]'::jsonb
  )
  into recent_payload
  from (
    select page_view.page_path, page_view.viewer_type, page_view.viewed_at
    from public.songhyeon_page_views page_view
    where page_view.viewed_at >= window_start
    order by page_view.viewed_at desc
    limit 50
  ) recent;

  return jsonb_build_object(
    'summary', summary_payload,
    'daily', daily_payload,
    'pages', pages_payload,
    'recent', recent_payload
  );
end;
$$;

revoke all on function public.track_songhyeon_page_view(uuid, uuid, text)
  from public, anon, authenticated;
grant execute on function public.track_songhyeon_page_view(uuid, uuid, text)
  to anon, authenticated;

revoke all on function public.get_songhyeon_page_view_analytics(integer)
  from public, anon, authenticated;
grant execute on function public.get_songhyeon_page_view_analytics(integer)
  to authenticated;

comment on table public.songhyeon_page_views is
  'Pseudonymous Songhyeon page-view events. Raw rows are never exposed to browser roles.';
comment on function public.get_songhyeon_page_view_analytics(integer) is
  'Aggregated analytics available only to the exact active Jeon Giyoung account.';

notify pgrst, 'reload schema';
