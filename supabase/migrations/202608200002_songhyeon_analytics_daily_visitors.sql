-- Add exact daily visitor reporting to the existing admin analytics payload.
-- Guests are de-duplicated by pseudonymous browser id; signed-in TF users by member id.

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

  site_today := (statement_timestamp() at time zone 'Asia/Seoul')::date;
  today_start := site_today::timestamp at time zone 'Asia/Seoul';
  window_start := (site_today - (safe_days - 1))::timestamp
    at time zone 'Asia/Seoul';

  select jsonb_build_object(
    'periodDays', safe_days,
    'totalViews', count(*)::bigint,
    'todayViews', count(*) filter (where page_view.viewed_at >= today_start)::bigint,
    'todayVisitors', count(distinct case
      when page_view.viewed_at < today_start then null
      when page_view.member_id is not null then 'member:' || page_view.member_id::text
      else 'guest:' || page_view.anonymous_visitor_id::text
    end)::bigint,
    'uniqueVisitors', count(distinct case
      when page_view.member_id is not null then 'member:' || page_view.member_id::text
      else 'guest:' || page_view.anonymous_visitor_id::text
    end)::bigint,
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
      count(distinct case
        when page_view.member_id is not null then 'member:' || page_view.member_id::text
        when page_view.id is not null then 'guest:' || page_view.anonymous_visitor_id::text
        else null
      end)::bigint as visitor_count,
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
      count(distinct case
        when page_view.member_id is not null then 'member:' || page_view.member_id::text
        else 'guest:' || page_view.anonymous_visitor_id::text
      end)::bigint as visitor_count,
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

revoke all on function public.get_songhyeon_page_view_analytics(integer)
  from public, anon, authenticated;
grant execute on function public.get_songhyeon_page_view_analytics(integer)
  to authenticated;

notify pgrst, 'reload schema';
