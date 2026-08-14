-- Remove the Songhyeon-only hold state. Existing hold rows become stopped,
-- and all future status changes remain behind the controlled workflow RPC.

update public.songhyeon_tasks t
set payload = t.payload || jsonb_build_object(
      'status', '중단',
      'updatedAt', statement_timestamp()
    ),
    updated_at = statement_timestamp(),
    version = t.version + 1
where trim(coalesce(t.payload ->> 'status', '')) in ('보류', 'on_hold');

update public.songhyeon_schedule_overrides o
set payload = o.payload || jsonb_build_object('status', 'cancelled'),
    updated_at = statement_timestamp()
where trim(coalesce(o.payload ->> 'status', '')) in ('보류', 'on_hold');

alter table public.songhyeon_tasks
  drop constraint if exists songhyeon_tasks_status_check;
alter table public.songhyeon_tasks
  add constraint songhyeon_tasks_status_check check (
    payload ->> 'status' is null
    or payload ->> 'status' in ('미착수', '진행중', '완료', '중단')
  );

alter table public.songhyeon_schedule_overrides
  drop constraint if exists songhyeon_schedule_overrides_status_check;
alter table public.songhyeon_schedule_overrides
  add constraint songhyeon_schedule_overrides_status_check check (
    payload ->> 'status' is null
    or payload ->> 'status' in ('not_started', 'in_progress', 'completed', 'delayed', 'cancelled')
  );

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

  from_status := case coalesce(nullif(current_task.payload ->> 'status', ''), '미착수')
    when '보류' then '중단'
    when 'on_hold' then '중단'
    else coalesce(nullif(current_task.payload ->> 'status', ''), '미착수')
  end;

  case workflow_action
    when 'start' then
      if from_status <> '미착수' then raise exception 'SONGHYEON_TASK_INVALID_TRANSITION' using errcode = '22023'; end if;
      to_status := '진행중'; activity_action := 'task_started';
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

revoke all on function public.transition_songhyeon_task_workflow(text, text, jsonb, integer) from public;
grant execute on function public.transition_songhyeon_task_workflow(text, text, jsonb, integer) to authenticated;
