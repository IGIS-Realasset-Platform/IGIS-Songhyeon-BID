-- 신규 업무는 활성 업무 목록의 최상단에 배치하고, 전기영 관리자가 업무 순서를 조정한다.

with ordered_tasks as (
  select
    task.id,
    row_number() over (
      order by task.display_order, task.created_at, task.source_key
    ) - 1 as normalized_display_order
  from public.songhyeon_tasks task
  where task.archived_at is null
)
update public.songhyeon_tasks task
set display_order = ordered_tasks.normalized_display_order
from ordered_tasks
where task.id = ordered_tasks.id
  and task.display_order is distinct from ordered_tasks.normalized_display_order;

alter table public.songhyeon_task_activity
  drop constraint if exists songhyeon_task_activity_action_check;
alter table public.songhyeon_task_activity
  add constraint songhyeon_task_activity_action_check check (action in (
    'task_seeded', 'task_updated', 'task_reordered',
    'task_started', 'task_completed', 'task_held', 'task_resumed',
    'task_stopped', 'task_archived',
    'comment_added', 'comment_deleted'
  ));

create or replace function public.create_songhyeon_task_atomic(
  task_id text,
  task_source_key text,
  task_payload jsonb
) returns public.songhyeon_tasks
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  created_task public.songhyeon_tasks;
  actor_name text;
  created_time timestamptz := statement_timestamp();
  canonical_payload jsonb;
  next_display_order integer;
begin
  if not public.is_jeon_giyoung_songhyeon_task_owner() then
    raise exception 'SONGHYEON_TASK_CREATE_FORBIDDEN' using errcode = '42501';
  end if;
  if nullif(trim(task_id), '') is null or nullif(trim(task_source_key), '') is null then
    raise exception 'SONGHYEON_TASK_ID_REQUIRED' using errcode = '22023';
  end if;

  select member.staff_name into actor_name
  from public.songhyeon_members member
  where member.auth_id = auth.uid() and member.is_active
  limit 1;

  perform pg_advisory_xact_lock(hashtextextended('songhyeon_tasks:display_order', 0));
  select coalesce(min(task.display_order), 0) - 1 into next_display_order
  from public.songhyeon_tasks task
  where task.archived_at is null;

  canonical_payload := coalesce(task_payload, '{}'::jsonb)
    || jsonb_build_object(
      'id', task_id,
      'sourceKey', task_source_key,
      'sourceType', coalesce(nullif(task_payload ->> 'sourceType', ''), 'manual'),
      'status', '미착수',
      'createdAt', created_time,
      'updatedAt', created_time
    );

  insert into public.songhyeon_tasks(
    id, source_key, display_order, payload, updated_by, created_at, updated_at
  ) values (
    task_id, task_source_key, next_display_order, canonical_payload,
    auth.uid(), created_time, created_time
  ) returning * into created_task;

  insert into public.songhyeon_task_activity(
    id, task_source_key, action, payload, actor_id, actor_name, created_at
  ) values (
    'activity-' || gen_random_uuid()::text,
    task_source_key,
    'task_seeded',
    jsonb_build_object('source', 'manual'),
    auth.uid(),
    actor_name,
    created_time
  );

  return created_task;
end;
$$;

revoke all on function public.create_songhyeon_task_atomic(text, text, jsonb) from public, anon, authenticated;
grant execute on function public.create_songhyeon_task_atomic(text, text, jsonb) to authenticated;

create or replace function public.reorder_songhyeon_tasks(
  target_source_key text,
  adjacent_source_key text
) returns setof public.songhyeon_tasks
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  target_task public.songhyeon_tasks;
  adjacent_task public.songhyeon_tasks;
  changed_time timestamptz := statement_timestamp();
begin
  if not public.is_jeon_giyoung_songhyeon_task_owner() then
    raise exception 'SONGHYEON_TASK_REORDER_FORBIDDEN' using errcode = '42501';
  end if;
  if nullif(trim(target_source_key), '') is null
    or nullif(trim(adjacent_source_key), '') is null
    or target_source_key = adjacent_source_key then
    raise exception 'SONGHYEON_TASK_REORDER_TARGET_REQUIRED' using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(hashtextextended('songhyeon_tasks:display_order', 0));

  select task.* into target_task
  from public.songhyeon_tasks task
  where task.source_key = target_source_key
    and task.archived_at is null
  for update;

  select task.* into adjacent_task
  from public.songhyeon_tasks task
  where task.source_key = adjacent_source_key
    and task.archived_at is null
  for update;

  if target_task.id is null or adjacent_task.id is null then
    raise exception 'SONGHYEON_TASK_REORDER_NOT_FOUND' using errcode = 'P0002';
  end if;

  update public.songhyeon_tasks task
  set
    display_order = case
      when task.id = target_task.id then adjacent_task.display_order
      else target_task.display_order
    end,
    version = task.version + 1,
    updated_by = auth.uid(),
    updated_at = changed_time
  where task.id in (target_task.id, adjacent_task.id);

  insert into public.songhyeon_task_activity(
    id, task_source_key, action, payload, actor_id, actor_name, created_at
  )
  select
    'activity-' || gen_random_uuid()::text,
    target_task.source_key,
    'task_reordered',
    jsonb_build_object('swappedWith', adjacent_task.source_key),
    auth.uid(),
    member.staff_name,
    changed_time
  from public.songhyeon_members member
  where member.auth_id = auth.uid() and member.is_active
  limit 1;

  return query
  select task.*
  from public.songhyeon_tasks task
  where task.id in (target_task.id, adjacent_task.id)
  order by task.display_order, task.source_key;
end;
$$;

revoke all on function public.reorder_songhyeon_tasks(text, text) from public, anon, authenticated;
grant execute on function public.reorder_songhyeon_tasks(text, text) to authenticated;

notify pgrst, 'reload schema';
