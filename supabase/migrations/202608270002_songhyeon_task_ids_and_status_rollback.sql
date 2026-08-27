-- 신규 업무의 표시 ID를 DB에서 순차 발급하고, 진행중 업무를 미착수로 되돌릴 수 있게 한다.

with current_max as (
  select coalesce(max((substring(task.payload ->> 'displayId' from '^BID-([0-9]+)$'))::integer), 0) as value
  from public.songhyeon_tasks task
  where task.payload ->> 'displayId' ~ '^BID-[0-9]+$'
), missing_ids as (
  select
    task.id,
    current_max.value + row_number() over (order by task.created_at, task.source_key) as display_number
  from public.songhyeon_tasks task
  cross join current_max
  where nullif(btrim(task.payload ->> 'displayId'), '') is null
), assigned_ids as (
  select
    missing_ids.id,
    'BID-' || case
      when missing_ids.display_number < 1000 then lpad(missing_ids.display_number::text, 3, '0')
      else missing_ids.display_number::text
    end as display_id
  from missing_ids
)
update public.songhyeon_tasks task
set
  payload = jsonb_set(coalesce(task.payload, '{}'::jsonb), '{displayId}', to_jsonb(assigned_ids.display_id)),
  version = task.version + 1,
  updated_at = statement_timestamp()
from assigned_ids
where task.id = assigned_ids.id;

alter table public.songhyeon_task_activity
  drop constraint if exists songhyeon_task_activity_action_check;
alter table public.songhyeon_task_activity
  add constraint songhyeon_task_activity_action_check check (action in (
    'task_seeded', 'task_updated', 'task_reordered',
    'task_started', 'task_completed', 'task_held', 'task_resumed',
    'task_stopped', 'task_reverted', 'task_archived',
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
  next_display_number integer;
  generated_display_id text;
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

  select coalesce(max((substring(task.payload ->> 'displayId' from '^BID-([0-9]+)$'))::integer), 0) + 1
  into next_display_number
  from public.songhyeon_tasks task
  where task.payload ->> 'displayId' ~ '^BID-[0-9]+$';

  generated_display_id := 'BID-' || case
    when next_display_number < 1000 then lpad(next_display_number::text, 3, '0')
    else next_display_number::text
  end;

  canonical_payload := coalesce(task_payload, '{}'::jsonb)
    || jsonb_build_object(
      'id', task_id,
      'sourceKey', task_source_key,
      'displayId', generated_display_id,
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
    jsonb_build_object('source', 'manual', 'displayId', generated_display_id),
    auth.uid(),
    actor_name,
    created_time
  );

  return created_task;
end;
$$;

revoke all on function public.create_songhyeon_task_atomic(text, text, jsonb) from public, anon, authenticated;
grant execute on function public.create_songhyeon_task_atomic(text, text, jsonb) to authenticated;

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
  select member.staff_name into actor_name
  from public.songhyeon_members member
  where member.auth_id = auth.uid() and member.is_active
  limit 1;
  if actor_name is null then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;

  select * into current_task
  from public.songhyeon_tasks task
  where task.source_key = target_source_key
  for update;
  if not found or current_task.archived_at is not null then
    raise exception 'SONGHYEON_TASK_NOT_FOUND' using errcode = 'P0002';
  end if;
  if expected_version is null or current_task.version <> expected_version then
    raise exception 'SONGHYEON_TASK_VERSION_CONFLICT' using errcode = '40001';
  end if;

  from_status := case coalesce(nullif(current_task.payload ->> 'status', ''), '미착수')
    when '보류' then '중단'
    when 'on_hold' then '중단'
    else coalesce(nullif(current_task.payload ->> 'status', ''), '미착수')
  end;

  case workflow_action
    when 'start' then
      if from_status <> '미착수' then raise exception 'SONGHYEON_TASK_INVALID_TRANSITION' using errcode = '22023'; end if;
      to_status := '진행중'; activity_action := 'task_started';
    when 'reset' then
      if from_status <> '진행중' then raise exception 'SONGHYEON_TASK_INVALID_TRANSITION' using errcode = '22023'; end if;
      if reason_text = '' then raise exception 'SONGHYEON_TASK_REASON_REQUIRED' using errcode = '22023'; end if;
      to_status := '미착수'; activity_action := 'task_reverted';
    when 'complete' then
      if from_status <> '진행중' then raise exception 'SONGHYEON_TASK_INVALID_TRANSITION' using errcode = '22023'; end if;
      if summary_text = '' then raise exception 'SONGHYEON_TASK_COMPLETION_SUMMARY_REQUIRED' using errcode = '22023'; end if;
      if evidence_url <> '' and evidence_url !~* '^https://' then raise exception 'SONGHYEON_TASK_EVIDENCE_HTTPS_REQUIRED' using errcode = '22023'; end if;
      to_status := '완료'; activity_action := 'task_completed';
    when 'stop' then
      if from_status <> '진행중' then raise exception 'SONGHYEON_TASK_INVALID_TRANSITION' using errcode = '22023'; end if;
      if reason_text = '' then raise exception 'SONGHYEON_TASK_REASON_REQUIRED' using errcode = '22023'; end if;
      to_status := '중단'; activity_action := 'task_stopped';
    when 'resume' then
      if from_status not in ('완료', '중단') then raise exception 'SONGHYEON_TASK_INVALID_TRANSITION' using errcode = '22023'; end if;
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
  elsif workflow_action = 'reset' then
    next_payload := next_payload
      - 'startedAt' - 'startedBy'
      - 'completedAt' - 'completedBy' - 'completionSummary' - 'completionEvidenceUrl';
  end if;

  update public.songhyeon_tasks task
  set
    payload = next_payload,
    updated_by = auth.uid(),
    updated_at = transition_time,
    version = current_task.version + 1,
    started_at = case
      when workflow_action = 'reset' then null
      when workflow_action in ('start', 'resume') then coalesce(current_task.started_at, transition_time)
      else current_task.started_at
    end,
    started_by = case
      when workflow_action = 'reset' then null
      when workflow_action in ('start', 'resume') and current_task.started_at is null then auth.uid()
      else current_task.started_by
    end,
    completed_at = case
      when workflow_action = 'complete' then transition_time
      when workflow_action in ('resume', 'reset') then null
      else current_task.completed_at
    end,
    completed_by = case
      when workflow_action = 'complete' then auth.uid()
      when workflow_action in ('resume', 'reset') then null
      else current_task.completed_by
    end,
    completion_summary = case
      when workflow_action = 'complete' then summary_text
      when workflow_action in ('resume', 'reset') then null
      else current_task.completion_summary
    end,
    completion_evidence_url = case
      when workflow_action = 'complete' then nullif(evidence_url, '')
      when workflow_action in ('resume', 'reset') then null
      else current_task.completion_evidence_url
    end
  where task.source_key = target_source_key
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

revoke all on function public.transition_songhyeon_task_workflow(text, text, jsonb, integer) from public, anon, authenticated;
grant execute on function public.transition_songhyeon_task_workflow(text, text, jsonb, integer) to authenticated;

notify pgrst, 'reload schema';
