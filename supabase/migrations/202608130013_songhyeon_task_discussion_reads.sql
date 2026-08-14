-- SONGHYEON BID per-member discussion read markers only.
-- This migration intentionally creates and changes only Songhyeon operational objects.

create table if not exists public.songhyeon_task_discussion_reads (
  task_source_key text not null
    references public.songhyeon_tasks(source_key)
    on update cascade on delete cascade,
  viewer_id uuid not null
    references auth.users(id)
    on delete cascade,
  last_read_at timestamptz not null,
  primary key (task_source_key, viewer_id)
);

alter table public.songhyeon_task_discussion_reads enable row level security;

drop policy if exists "songhyeon members read own discussion markers"
  on public.songhyeon_task_discussion_reads;
create policy "songhyeon members read own discussion markers"
on public.songhyeon_task_discussion_reads
for select
to authenticated
using (
  viewer_id = auth.uid()
  and public.is_songhyeon_member()
);

-- The client may read only its own marker. Marker timestamps are written solely by the
-- server-time RPC below so callers cannot suppress future unread notifications.
revoke all on table public.songhyeon_task_discussion_reads
  from public, anon, authenticated;
grant select on table public.songhyeon_task_discussion_reads
  to authenticated;

create index if not exists songhyeon_task_discussion_reads_viewer_idx
  on public.songhyeon_task_discussion_reads(viewer_id, task_source_key, last_read_at);

-- Deployment baseline: existing discussion is treated as already read. Existing markers
-- are never moved forward, so rerunning the migration cannot erase legitimate unread state.
insert into public.songhyeon_task_discussion_reads (
  task_source_key,
  viewer_id,
  last_read_at
)
select
  task.source_key,
  member.auth_id,
  statement_timestamp()
from public.songhyeon_tasks task
cross join public.songhyeon_members member
where member.is_active
  and member.auth_id is not null
on conflict (task_source_key, viewer_id) do nothing;

create or replace function public.mark_songhyeon_task_discussion_read(
  target_task_source_key text
)
returns timestamptz
language plpgsql
security definer
set search_path = public
as $$
declare
  current_viewer_id uuid := auth.uid();
  server_read_at timestamptz := clock_timestamp();
  stored_read_at timestamptz;
begin
  if current_viewer_id is null then
    raise exception 'AUTH_REQUIRED' using errcode = '42501';
  end if;

  if not public.is_songhyeon_member() then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;

  if target_task_source_key is null or length(trim(target_task_source_key)) = 0 then
    raise exception 'TASK_SOURCE_KEY_REQUIRED' using errcode = '22023';
  end if;

  -- Hold a key-share lock so the task cannot disappear during the marker upsert.
  perform 1
  from public.songhyeon_tasks task
  where task.source_key = target_task_source_key
  for key share;

  if not found then
    raise exception 'TASK_NOT_FOUND' using errcode = 'P0002';
  end if;

  insert into public.songhyeon_task_discussion_reads as existing_marker (
    task_source_key,
    viewer_id,
    last_read_at
  ) values (
    target_task_source_key,
    current_viewer_id,
    server_read_at
  )
  on conflict (task_source_key, viewer_id)
  do update set
    last_read_at = greatest(
      existing_marker.last_read_at,
      excluded.last_read_at
    )
  returning last_read_at into stored_read_at;

  return stored_read_at;
end;
$$;

-- Returns only tasks that currently have unread discussion entries for this user.
-- A top-level comment and each reply count as one unread entry. The user's own entries
-- never count, even when they are newer than the marker or no marker exists yet.
create or replace function public.get_songhyeon_task_discussion_unread_counts()
returns table (
  task_source_key text,
  unread_count bigint,
  unread_comment_count bigint,
  unread_reply_count bigint,
  latest_unread_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  current_viewer_id uuid := auth.uid();
begin
  if current_viewer_id is null then
    raise exception 'AUTH_REQUIRED' using errcode = '42501';
  end if;

  if not public.is_songhyeon_member() then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;

  return query
  with viewer_markers as (
    select marker.task_source_key, marker.last_read_at
    from public.songhyeon_task_discussion_reads marker
    where marker.viewer_id = current_viewer_id
  ),
  unread_entries as (
    select
      comment.task_source_key,
      comment.created_at,
      true as is_comment
    from public.songhyeon_task_comments comment
    left join viewer_markers marker
      on marker.task_source_key = comment.task_source_key
    where comment.author_id <> current_viewer_id
      and comment.created_at > coalesce(marker.last_read_at, '-infinity'::timestamptz)

    union all

    select
      reply.task_source_key,
      reply.created_at,
      false as is_comment
    from public.songhyeon_task_comment_replies reply
    left join viewer_markers marker
      on marker.task_source_key = reply.task_source_key
    where reply.author_id <> current_viewer_id
      and reply.created_at > coalesce(marker.last_read_at, '-infinity'::timestamptz)
  )
  select
    entry.task_source_key,
    count(*)::bigint as unread_count,
    count(*) filter (where entry.is_comment)::bigint as unread_comment_count,
    count(*) filter (where not entry.is_comment)::bigint as unread_reply_count,
    max(entry.created_at) as latest_unread_at
  from unread_entries entry
  group by entry.task_source_key;
end;
$$;

revoke all on function public.mark_songhyeon_task_discussion_read(text)
  from public, anon, authenticated;
grant execute on function public.mark_songhyeon_task_discussion_read(text)
  to authenticated;

revoke all on function public.get_songhyeon_task_discussion_unread_counts()
  from public, anon, authenticated;
grant execute on function public.get_songhyeon_task_discussion_unread_counts()
  to authenticated;
