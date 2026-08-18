-- Attribute authenticated Songhyeon page views to active TF members.
-- Historical member events remain unattributed because they cannot be safely inferred.

alter table public.songhyeon_page_views
  add column if not exists member_id uuid
  references public.songhyeon_members(id) on delete set null;

create index if not exists songhyeon_page_views_member_viewed_idx
  on public.songhyeon_page_views(member_id, viewed_at desc)
  where member_id is not null;

comment on table public.songhyeon_page_views is
  'Guest events stay pseudonymous; authenticated TF events retain only the internal member profile id for exact-admin reporting.';

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
  resolved_member_id uuid;
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
    '/feed',
    '/map-activities',
    '/map-activities/integrated-map',
    '/map-activities/boundary',
    '/map-activities/assets-leases',
    '/map-activities/igis-retail',
    '/map-activities/market-activities',
    '/map-activities/hotel',
    '/map-activities/institutions-community',
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

  select member.id
  into resolved_member_id
  from public.songhyeon_members member
  where member.auth_id = auth.uid()
    and member.is_active
    and member.roles @> array['송현 BID TF']::text[]
  limit 1;

  delete from public.songhyeon_page_views page_view
  where page_view.viewed_at < event_time - interval '400 days';

  site_day_start := ((event_time at time zone 'Asia/Seoul')::date)::timestamp
    at time zone 'Asia/Seoul';

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
    member_id,
    viewed_at
  )
  select
    input_visitor_id,
    input_session_id,
    clean_path,
    case when resolved_member_id is null then 'guest' else 'member' end,
    resolved_member_id,
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

create or replace function public.get_songhyeon_tf_member_analytics(
  lookback_days integer default 30
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  safe_days integer := greatest(1, least(coalesce(lookback_days, 30), 365));
  site_today date := (statement_timestamp() at time zone 'Asia/Seoul')::date;
  window_start timestamptz;
  tracking_started_at timestamptz;
  unattributed_member_views bigint;
  members_payload jsonb;
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

  window_start := (site_today - (safe_days - 1))::timestamp at time zone 'Asia/Seoul';

  select min(page_view.viewed_at)
  into tracking_started_at
  from public.songhyeon_page_views page_view
  where page_view.member_id is not null;

  select count(*)::bigint
  into unattributed_member_views
  from public.songhyeon_page_views page_view
  where page_view.viewer_type = 'member'
    and page_view.member_id is null
    and page_view.viewed_at >= window_start;

  select coalesce(
    jsonb_agg(to_jsonb(member_usage) - 'display_order' order by member_usage.display_order),
    '[]'::jsonb
  )
  into members_payload
  from (
    select
      member.id,
      member.staff_name as "staffName",
      member.group_name as "groupName",
      member.title,
      member.photo_path as "photoPath",
      member.display_order,
      (
        select count(*)::bigint
        from public.songhyeon_page_views page_view
        where page_view.member_id = member.id
          and page_view.viewed_at >= window_start
      ) as views,
      (
        select count(distinct page_view.anonymous_session_id)::bigint
        from public.songhyeon_page_views page_view
        where page_view.member_id = member.id
          and page_view.viewed_at >= window_start
      ) as sessions,
      (
        select count(distinct (page_view.viewed_at at time zone 'Asia/Seoul')::date)::bigint
        from public.songhyeon_page_views page_view
        where page_view.member_id = member.id
          and page_view.viewed_at >= window_start
      ) as "activeDays",
      (
        select max(page_view.viewed_at)
        from public.songhyeon_page_views page_view
        where page_view.member_id = member.id
          and page_view.viewed_at >= window_start
      ) as "lastViewedAt",
      (
        select ranked_page.page_path
        from (
          select page_view.page_path, count(*) as view_count
          from public.songhyeon_page_views page_view
          where page_view.member_id = member.id
            and page_view.viewed_at >= window_start
          group by page_view.page_path
          order by view_count desc, page_view.page_path
          limit 1
        ) ranked_page
      ) as "topPage"
    from public.songhyeon_members member
    where member.is_active
      and member.roles @> array['송현 BID TF']::text[]
  ) member_usage;

  return jsonb_build_object(
    'periodDays', safe_days,
    'trackingStartedAt', tracking_started_at,
    'unattributedMemberViews', unattributed_member_views,
    'members', members_payload
  );
end;
$$;

create or replace function public.get_songhyeon_tf_member_detail(
  target_member_id uuid,
  lookback_days integer default 30
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  safe_days integer := greatest(1, least(coalesce(lookback_days, 30), 365));
  site_today date := (statement_timestamp() at time zone 'Asia/Seoul')::date;
  window_start timestamptz;
  member_payload jsonb;
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

  window_start := (site_today - (safe_days - 1))::timestamp at time zone 'Asia/Seoul';

  select jsonb_build_object(
    'id', member.id,
    'staffName', member.staff_name,
    'groupName', member.group_name,
    'title', member.title,
    'photoPath', member.photo_path
  )
  into member_payload
  from public.songhyeon_members member
  where member.id = target_member_id
    and member.is_active
    and member.roles @> array['송현 BID TF']::text[];

  if member_payload is null then
    raise exception 'SONGHYEON_ANALYTICS_MEMBER_NOT_FOUND' using errcode = 'P0002';
  end if;

  select jsonb_build_object(
    'views', count(*)::bigint,
    'sessions', count(distinct page_view.anonymous_session_id)::bigint,
    'activeDays', count(distinct (page_view.viewed_at at time zone 'Asia/Seoul')::date)::bigint,
    'firstViewedAt', min(page_view.viewed_at),
    'lastViewedAt', max(page_view.viewed_at)
  )
  into summary_payload
  from public.songhyeon_page_views page_view
  where page_view.member_id = target_member_id
    and page_view.viewed_at >= window_start;

  select coalesce(jsonb_agg(
    jsonb_build_object(
      'date', daily.view_date,
      'views', daily.view_count,
      'sessions', daily.session_count
    ) order by daily.view_date
  ), '[]'::jsonb)
  into daily_payload
  from (
    select
      (site_today - (safe_days - 1) + series.day_offset)::date as view_date,
      count(page_view.id)::bigint as view_count,
      count(distinct page_view.anonymous_session_id)::bigint as session_count
    from generate_series(0, safe_days - 1) as series(day_offset)
    left join public.songhyeon_page_views page_view
      on page_view.member_id = target_member_id
     and page_view.viewed_at >= (
       (site_today - (safe_days - 1) + series.day_offset)::timestamp at time zone 'Asia/Seoul'
     )
     and page_view.viewed_at < (
       (site_today - (safe_days - 1) + series.day_offset + 1)::timestamp at time zone 'Asia/Seoul'
     )
    group by series.day_offset
  ) daily;

  select coalesce(jsonb_agg(
    jsonb_build_object(
      'path', page.page_path,
      'views', page.view_count,
      'sessions', page.session_count,
      'lastViewedAt', page.last_viewed_at
    ) order by page.view_count desc, page.page_path
  ), '[]'::jsonb)
  into pages_payload
  from (
    select
      page_view.page_path,
      count(*)::bigint as view_count,
      count(distinct page_view.anonymous_session_id)::bigint as session_count,
      max(page_view.viewed_at) as last_viewed_at
    from public.songhyeon_page_views page_view
    where page_view.member_id = target_member_id
      and page_view.viewed_at >= window_start
    group by page_view.page_path
    order by view_count desc, page_view.page_path
    limit 100
  ) page;

  select coalesce(jsonb_agg(
    jsonb_build_object(
      'path', recent.page_path,
      'viewedAt', recent.viewed_at
    ) order by recent.viewed_at desc
  ), '[]'::jsonb)
  into recent_payload
  from (
    select page_view.page_path, page_view.viewed_at
    from public.songhyeon_page_views page_view
    where page_view.member_id = target_member_id
      and page_view.viewed_at >= window_start
    order by page_view.viewed_at desc
    limit 100
  ) recent;

  return jsonb_build_object(
    'periodDays', safe_days,
    'member', member_payload,
    'summary', summary_payload,
    'daily', daily_payload,
    'pages', pages_payload,
    'recent', recent_payload
  );
end;
$$;

revoke all on table public.songhyeon_page_views from public, anon, authenticated;

revoke all on function public.track_songhyeon_page_view(uuid, uuid, text)
  from public, anon, authenticated;
grant execute on function public.track_songhyeon_page_view(uuid, uuid, text)
  to anon, authenticated;

revoke all on function public.get_songhyeon_tf_member_analytics(integer)
  from public, anon, authenticated;
grant execute on function public.get_songhyeon_tf_member_analytics(integer)
  to authenticated;

revoke all on function public.get_songhyeon_tf_member_detail(uuid, integer)
  from public, anon, authenticated;
grant execute on function public.get_songhyeon_tf_member_detail(uuid, integer)
  to authenticated;

notify pgrst, 'reload schema';
