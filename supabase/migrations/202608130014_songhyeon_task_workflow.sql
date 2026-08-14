-- Songhyeon task workflow, completion evidence, and recoverable archive.
-- Task creation/archive is reserved for Jeon Giyoung. Active members may edit
-- existing tasks and use the controlled workflow transitions below.

alter table public.songhyeon_tasks
  add column if not exists version integer not null default 1,
  add column if not exists started_at timestamptz,
  add column if not exists started_by uuid references auth.users(id) on delete set null,
  add column if not exists completed_at timestamptz,
  add column if not exists completed_by uuid references auth.users(id) on delete set null,
  add column if not exists completion_summary text,
  add column if not exists completion_evidence_url text,
  add column if not exists archived_at timestamptz,
  add column if not exists archived_by uuid references auth.users(id) on delete set null,
  add column if not exists archive_reason text;

alter table public.songhyeon_tasks
  drop constraint if exists songhyeon_tasks_completion_evidence_url_check;
alter table public.songhyeon_tasks
  add constraint songhyeon_tasks_completion_evidence_url_check
  check (completion_evidence_url is null or completion_evidence_url ~* '^https://');

alter table public.songhyeon_task_activity
  drop constraint if exists songhyeon_task_activity_action_check;
alter table public.songhyeon_task_activity
  add constraint songhyeon_task_activity_action_check check (action in (
    'task_seeded', 'task_updated',
    'task_started', 'task_completed', 'task_held', 'task_resumed',
    'task_stopped', 'task_archived',
    'comment_added', 'comment_deleted'
  ));

create or replace function public.is_jeon_giyoung_songhyeon_task_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.songhyeon_members m
    where m.auth_id = auth.uid()
      and m.is_active
      and m.staff_name = '전기영'
      and m.email = 'jk.jeon@igisam.com'
  );
$$;

revoke all on function public.is_jeon_giyoung_songhyeon_task_owner() from public;
grant execute on function public.is_jeon_giyoung_songhyeon_task_owner() to authenticated;

-- Existing initial-data seeding remains idempotent, but only the designated
-- task owner can create a missing row.
create or replace function public.seed_songhyeon_task(
  seed_id text,
  seed_source_key text,
  seed_display_order integer,
  seed_payload jsonb
) returns public.songhyeon_tasks
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  seeded public.songhyeon_tasks;
  actor_name text;
  inserted_count integer := 0;
begin
  if not public.is_jeon_giyoung_songhyeon_task_owner() then
    raise exception 'SONGHYEON_TASK_CREATE_FORBIDDEN' using errcode = '42501';
  end if;

  select m.staff_name into actor_name
  from public.songhyeon_members m
  where m.auth_id = auth.uid() and m.is_active
  limit 1;

  seed_payload := coalesce(seed_payload, '{}'::jsonb)
    || jsonb_build_object(
      'id', seed_id,
      'sourceKey', seed_source_key,
      'status', case
        when seed_payload ->> 'status' in ('미착수', '진행중') then seed_payload ->> 'status'
        else '미착수'
      end
    );

  insert into public.songhyeon_tasks(
    id, source_key, display_order, payload, updated_by
  ) values (
    seed_id, seed_source_key, seed_display_order, seed_payload, auth.uid()
  ) on conflict(source_key) do nothing;
  get diagnostics inserted_count = row_count;

  select * into seeded
  from public.songhyeon_tasks
  where source_key = seed_source_key;

  if inserted_count = 1 then
    insert into public.songhyeon_task_activity(
      id, task_source_key, action, payload, actor_id, actor_name
    ) values (
      'activity-' || gen_random_uuid()::text,
      seed_source_key,
      'task_seeded',
      jsonb_build_object('source', 'initial'),
      auth.uid(),
      actor_name
    );
  end if;

  return seeded;
end;
$$;

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

  select m.staff_name into actor_name
  from public.songhyeon_members m
  where m.auth_id = auth.uid() and m.is_active
  limit 1;

  perform pg_advisory_xact_lock(hashtextextended('songhyeon_tasks:display_order', 0));
  select coalesce(max(t.display_order), -1) + 1 into next_display_order
  from public.songhyeon_tasks t;

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

create or replace function public.update_songhyeon_task_atomic(
  target_source_key text,
  task_patch jsonb,
  expected_version integer
) returns public.songhyeon_tasks
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  current_task public.songhyeon_tasks;
  updated_task public.songhyeon_tasks;
  actor_name text;
  updated_time timestamptz := statement_timestamp();
  current_status text;
  requested_status text;
  clean_patch jsonb;
  changes jsonb;
begin
  select m.staff_name into actor_name
  from public.songhyeon_members m
  where m.auth_id = auth.uid() and m.is_active
  limit 1;
  if actor_name is null then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;

  select * into current_task
  from public.songhyeon_tasks t
  where t.source_key = target_source_key
  for update;
  if not found or current_task.archived_at is not null then
    raise exception 'SONGHYEON_TASK_NOT_FOUND' using errcode = 'P0002';
  end if;
  if expected_version is null or current_task.version <> expected_version then
    raise exception 'SONGHYEON_TASK_VERSION_CONFLICT' using errcode = '40001';
  end if;

  current_status := coalesce(nullif(current_task.payload ->> 'status', ''), '미착수');
  requested_status := coalesce(nullif(task_patch ->> 'status', ''), current_status);
  if requested_status <> current_status then
    raise exception 'SONGHYEON_TASK_WORKFLOW_REQUIRED' using errcode = '22023';
  end if;

  clean_patch := coalesce(task_patch, '{}'::jsonb)
    - 'id' - 'sourceKey' - 'sourceType' - 'createdAt' - 'updatedAt'
    - 'status' - 'startedAt' - 'startedBy'
    - 'completedAt' - 'completedBy' - 'completionSummary' - 'completionEvidenceUrl'
    - 'archivedAt' - 'archivedBy' - 'archiveReason' - 'version'
    - 'displayOrder';

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'field', entry.key,
        'oldValue', current_task.payload -> entry.key,
        'newValue', entry.value
      ) order by entry.key
    ),
    '[]'::jsonb
  ) into changes
  from jsonb_each(clean_patch) entry
  where (current_task.payload -> entry.key) is distinct from entry.value;

  if jsonb_array_length(changes) = 0 then
    return current_task;
  end if;

  update public.songhyeon_tasks t
  set payload = current_task.payload || clean_patch || jsonb_build_object('updatedAt', updated_time),
      updated_by = auth.uid(),
      updated_at = updated_time,
      version = current_task.version + 1
  where t.source_key = target_source_key
  returning * into updated_task;

  insert into public.songhyeon_task_activity(
    id, task_source_key, action, payload, actor_id, actor_name, created_at
  ) values (
    'activity-' || gen_random_uuid()::text,
    target_source_key,
    'task_updated',
    jsonb_build_object('changes', changes),
    auth.uid(), actor_name, updated_time
  );

  return updated_task;
end;
$$;

create or replace function public.transition_songhyeon_task_workflow(
  target_source_key text,
  workflow_action text,
  workflow_details jsonb,
  expected_version integer
) returns public.songhyeon_tasks
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  current_task public.songhyeon_tasks;
  updated_task public.songhyeon_tasks;
  actor_name text;
  transition_time timestamptz := statement_timestamp();
  from_status text;
  to_status text;
  reason_text text := trim(coalesce(workflow_details ->> 'reason', ''));
  summary_text text := trim(coalesce(workflow_details ->> 'summary', ''));
  evidence_url text := trim(coalesce(workflow_details ->> 'evidenceUrl', ''));
  activity_action text;
  activity_payload jsonb;
  next_payload jsonb;
begin
  select m.staff_name into actor_name
  from public.songhyeon_members m
  where m.auth_id = auth.uid() and m.is_active
  limit 1;
  if actor_name is null then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;

  select * into current_task
  from public.songhyeon_tasks t
  where t.source_key = target_source_key
  for update;
  if not found or current_task.archived_at is not null then
    raise exception 'SONGHYEON_TASK_NOT_FOUND' using errcode = 'P0002';
  end if;
  if expected_version is null or current_task.version <> expected_version then
    raise exception 'SONGHYEON_TASK_VERSION_CONFLICT' using errcode = '40001';
  end if;

  from_status := coalesce(nullif(current_task.payload ->> 'status', ''), '미착수');
  case workflow_action
    when 'start' then
      if from_status <> '미착수' then raise exception 'SONGHYEON_TASK_INVALID_TRANSITION' using errcode = '22023'; end if;
      to_status := '진행중'; activity_action := 'task_started';
    when 'complete' then
      if from_status <> '진행중' then raise exception 'SONGHYEON_TASK_INVALID_TRANSITION' using errcode = '22023'; end if;
      if summary_text = '' then raise exception 'SONGHYEON_TASK_COMPLETION_SUMMARY_REQUIRED' using errcode = '22023'; end if;
      if evidence_url <> '' and evidence_url !~* '^https://' then raise exception 'SONGHYEON_TASK_EVIDENCE_HTTPS_REQUIRED' using errcode = '22023'; end if;
      to_status := '완료'; activity_action := 'task_completed';
    when 'hold' then
      if from_status <> '진행중' then raise exception 'SONGHYEON_TASK_INVALID_TRANSITION' using errcode = '22023'; end if;
      if reason_text = '' then raise exception 'SONGHYEON_TASK_REASON_REQUIRED' using errcode = '22023'; end if;
      to_status := '보류'; activity_action := 'task_held';
    when 'stop' then
      if from_status not in ('진행중', '보류') then raise exception 'SONGHYEON_TASK_INVALID_TRANSITION' using errcode = '22023'; end if;
      if reason_text = '' then raise exception 'SONGHYEON_TASK_REASON_REQUIRED' using errcode = '22023'; end if;
      to_status := '중단'; activity_action := 'task_stopped';
    when 'resume' then
      if from_status not in ('보류', '완료', '중단') then raise exception 'SONGHYEON_TASK_INVALID_TRANSITION' using errcode = '22023'; end if;
      if reason_text = '' then raise exception 'SONGHYEON_TASK_REASON_REQUIRED' using errcode = '22023'; end if;
      to_status := '진행중'; activity_action := 'task_resumed';
    else
      raise exception 'SONGHYEON_TASK_UNKNOWN_WORKFLOW_ACTION' using errcode = '22023';
  end case;

  next_payload := current_task.payload || jsonb_build_object(
    'status', to_status,
    'updatedAt', transition_time
  );

  if workflow_action in ('start', 'resume') then
    next_payload := next_payload || jsonb_build_object(
      'startedAt', coalesce(current_task.started_at, transition_time)
    );
  end if;
  if workflow_action = 'complete' then
    next_payload := next_payload || jsonb_build_object(
      'completedAt', transition_time,
      'completionSummary', summary_text,
      'completionEvidenceUrl', evidence_url
    );
  elsif workflow_action = 'resume' then
    next_payload := next_payload
      - 'completedAt' - 'completedBy' - 'completionSummary' - 'completionEvidenceUrl';
  end if;

  update public.songhyeon_tasks t
  set payload = next_payload,
      updated_by = auth.uid(),
      updated_at = transition_time,
      version = current_task.version + 1,
      started_at = case
        when workflow_action in ('start', 'resume') then coalesce(current_task.started_at, transition_time)
        else current_task.started_at
      end,
      started_by = case
        when workflow_action in ('start', 'resume') and current_task.started_at is null then auth.uid()
        else current_task.started_by
      end,
      completed_at = case
        when workflow_action = 'complete' then transition_time
        when workflow_action = 'resume' then null
        else current_task.completed_at
      end,
      completed_by = case
        when workflow_action = 'complete' then auth.uid()
        when workflow_action = 'resume' then null
        else current_task.completed_by
      end,
      completion_summary = case
        when workflow_action = 'complete' then summary_text
        when workflow_action = 'resume' then null
        else current_task.completion_summary
      end,
      completion_evidence_url = case
        when workflow_action = 'complete' then nullif(evidence_url, '')
        when workflow_action = 'resume' then null
        else current_task.completion_evidence_url
      end
  where t.source_key = target_source_key
  returning * into updated_task;

  activity_payload := jsonb_build_object(
    'fromStatus', from_status,
    'toStatus', to_status,
    'reason', reason_text
  );
  if workflow_action = 'complete' then
    activity_payload := activity_payload || jsonb_build_object(
      'summary', summary_text,
      'evidenceUrl', evidence_url
    );
  end if;

  insert into public.songhyeon_task_activity(
    id, task_source_key, action, payload, actor_id, actor_name, created_at
  ) values (
    'activity-' || gen_random_uuid()::text,
    target_source_key,
    activity_action,
    activity_payload,
    auth.uid(), actor_name, transition_time
  );

  return updated_task;
end;
$$;

create or replace function public.archive_songhyeon_task(
  target_source_key text,
  archive_reason_text text,
  expected_version integer
) returns public.songhyeon_tasks
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  current_task public.songhyeon_tasks;
  archived_task public.songhyeon_tasks;
  actor_name text;
  archive_time timestamptz := statement_timestamp();
  clean_reason text := trim(coalesce(archive_reason_text, ''));
begin
  if not public.is_jeon_giyoung_songhyeon_task_owner() then
    raise exception 'SONGHYEON_TASK_ARCHIVE_FORBIDDEN' using errcode = '42501';
  end if;
  if clean_reason = '' then
    raise exception 'SONGHYEON_TASK_ARCHIVE_REASON_REQUIRED' using errcode = '22023';
  end if;

  select m.staff_name into actor_name
  from public.songhyeon_members m
  where m.auth_id = auth.uid() and m.is_active
  limit 1;

  select * into current_task
  from public.songhyeon_tasks t
  where t.source_key = target_source_key
  for update;
  if not found or current_task.archived_at is not null then
    raise exception 'SONGHYEON_TASK_NOT_FOUND' using errcode = 'P0002';
  end if;
  if expected_version is null or current_task.version <> expected_version then
    raise exception 'SONGHYEON_TASK_VERSION_CONFLICT' using errcode = '40001';
  end if;

  update public.songhyeon_tasks t
  set archived_at = archive_time,
      archived_by = auth.uid(),
      archive_reason = clean_reason,
      updated_by = auth.uid(),
      updated_at = archive_time,
      version = current_task.version + 1,
      payload = current_task.payload || jsonb_build_object('updatedAt', archive_time)
  where t.source_key = target_source_key
  returning * into archived_task;

  insert into public.songhyeon_task_activity(
    id, task_source_key, action, payload, actor_id, actor_name, created_at
  ) values (
    'activity-' || gen_random_uuid()::text,
    target_source_key,
    'task_archived',
    jsonb_build_object(
      'fromStatus', coalesce(nullif(current_task.payload ->> 'status', ''), '미착수'),
      'toStatus', coalesce(nullif(current_task.payload ->> 'status', ''), '미착수'),
      'reason', clean_reason
    ),
    auth.uid(), actor_name, archive_time
  );

  return archived_task;
end;
$$;

revoke all on function public.seed_songhyeon_task(text, text, integer, jsonb) from public;
revoke all on function public.create_songhyeon_task_atomic(text, text, jsonb) from public;
revoke all on function public.update_songhyeon_task_atomic(text, jsonb, integer) from public;
revoke all on function public.transition_songhyeon_task_workflow(text, text, jsonb, integer) from public;
revoke all on function public.archive_songhyeon_task(text, text, integer) from public;

grant execute on function public.seed_songhyeon_task(text, text, integer, jsonb) to authenticated;
grant execute on function public.create_songhyeon_task_atomic(text, text, jsonb) to authenticated;
grant execute on function public.update_songhyeon_task_atomic(text, jsonb, integer) to authenticated;
grant execute on function public.transition_songhyeon_task_workflow(text, text, jsonb, integer) to authenticated;
grant execute on function public.archive_songhyeon_task(text, text, integer) to authenticated;

drop policy if exists "songhyeon members seed tasks" on public.songhyeon_tasks;
drop policy if exists "songhyeon members update tasks" on public.songhyeon_tasks;
drop policy if exists "songhyeon members delete tasks" on public.songhyeon_tasks;
drop policy if exists "jeon giyoung creates songhyeon tasks" on public.songhyeon_tasks;
drop policy if exists "songhyeon members update existing tasks" on public.songhyeon_tasks;
drop policy if exists "jeon giyoung archives songhyeon tasks" on public.songhyeon_tasks;

-- Mutations must use the RPCs so the task row and its activity record commit
-- together. Direct table mutation is intentionally unavailable.
revoke insert, update, delete on public.songhyeon_tasks from authenticated;
grant select on public.songhyeon_tasks to authenticated;

-- Clients may create only discussion audit rows directly. Task audit rows are
-- inserted by the controlled RPCs above.
drop policy if exists "songhyeon members add own activity" on public.songhyeon_task_activity;
drop policy if exists "songhyeon members add own discussion activity" on public.songhyeon_task_activity;
create policy "songhyeon members add own discussion activity"
on public.songhyeon_task_activity
for insert to authenticated
with check (
  public.is_songhyeon_member()
  and actor_id = auth.uid()
  and action in ('comment_added', 'comment_deleted')
);

create index if not exists songhyeon_tasks_active_order_idx
  on public.songhyeon_tasks(archived_at, display_order);

alter table public.songhyeon_tasks replica identity full;
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1
       from pg_publication_tables
       where pubname = 'supabase_realtime'
         and schemaname = 'public'
         and tablename = 'songhyeon_tasks'
     ) then
    alter publication supabase_realtime add table public.songhyeon_tasks;
  end if;
end;
$$;
