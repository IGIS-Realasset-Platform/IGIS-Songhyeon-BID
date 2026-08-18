-- Canonical Songhyeon milestone leaf rows.
-- Schedule rows are independent from integrated tasks. Their only relationship
-- is the existing explicit 1:N songhyeon_schedule_task_links ledger.

create table if not exists public.songhyeon_schedule_rows (
  id uuid primary key default gen_random_uuid(),
  source_key text not null unique check (length(trim(source_key)) > 0),
  parent_source_key text not null check (length(trim(parent_source_key)) > 0),
  display_name text not null check (length(trim(display_name)) between 1 and 300),
  source_text text not null default '' check (length(source_text) <= 4000),
  lead_label text not null check (length(trim(lead_label)) between 1 and 120),
  category_main text not null check (length(trim(category_main)) between 1 and 200),
  stage text not null check (stage in ('G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6')),
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'completed', 'delayed', 'cancelled')),
  start_date date not null,
  end_date date not null,
  sort_order integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (start_date <= end_date)
);

alter table public.songhyeon_schedule_rows enable row level security;

drop policy if exists "songhyeon members read schedule rows"
  on public.songhyeon_schedule_rows;
create policy "songhyeon members read schedule rows"
on public.songhyeon_schedule_rows
for select to authenticated
using (public.is_songhyeon_member());

revoke all on table public.songhyeon_schedule_rows from public, anon, authenticated;
grant select on table public.songhyeon_schedule_rows to authenticated;

create index if not exists songhyeon_schedule_rows_parent_order_idx
  on public.songhyeon_schedule_rows(parent_source_key, sort_order, source_key);

-- Snapshot the 76 reviewed static leaf rows from their already-seeded
-- Songhyeon task payloads. Existing production edits and legacy schedule
-- overrides are preserved. ON CONFLICT keeps this migration rerunnable without
-- overwriting later canonical-row edits.
with legacy_rows as (
  select
    task.source_key,
    coalesce(
      nullif(trim(task.payload ->> 'parentSourceKey'), ''),
      regexp_replace(task.source_key, '-T[0-9]+$', '')
    ) as parent_source_key,
    coalesce(
      nullif(trim(schedule.payload ->> 'displayName'), ''),
      nullif(trim(task.payload ->> 'taskName'), ''),
      task.source_key
    ) as display_name,
    coalesce(
      schedule.payload ->> 'sourceText',
      task.payload ->> 'sourceText',
      ''
    ) as source_text,
    coalesce(
      nullif(trim(schedule.payload ->> 'leadLabel'), ''),
      nullif(trim(task.payload ->> 'leadDept'), ''),
      '미정'
    ) as lead_label,
    coalesce(
      nullif(trim(schedule.payload ->> 'categoryMain'), ''),
      nullif(trim(task.payload ->> 'categoryMain'), ''),
      '미분류'
    ) as category_main,
    substring(task.source_key from '^(G[0-6])') as stage,
    case coalesce(nullif(task.payload ->> 'status', ''), schedule.payload ->> 'status', '미착수')
      when '진행중' then 'in_progress'
      when 'in_progress' then 'in_progress'
      when '완료' then 'completed'
      when 'completed' then 'completed'
      when '지연' then 'delayed'
      when 'delayed' then 'delayed'
      when '중단' then 'cancelled'
      when '보류' then 'cancelled'
      when 'on_hold' then 'cancelled'
      when 'cancelled' then 'cancelled'
      else 'not_started'
    end as status,
    coalesce(
      case when schedule.payload ->> 'startDate' ~ '^\d{4}-\d{2}-\d{2}$'
        then (schedule.payload ->> 'startDate')::date end,
      case when task.payload ->> 'startDate' ~ '^\d{4}-\d{2}-\d{2}$'
        then (task.payload ->> 'startDate')::date end,
      date '2026-08-10'
    ) as start_date,
    coalesce(
      case when task.payload ->> 'dueDate' ~ '^\d{4}-\d{2}-\d{2}$'
        then (task.payload ->> 'dueDate')::date end,
      case when schedule.payload ->> 'endDate' ~ '^\d{4}-\d{2}-\d{2}$'
        then (schedule.payload ->> 'endDate')::date end,
      date '2026-08-10'
    ) as raw_end_date,
    task.display_order as sort_order,
    task.updated_by,
    task.created_at,
    greatest(task.updated_at, coalesce(schedule.updated_at, task.updated_at)) as updated_at
  from public.songhyeon_tasks task
  left join public.songhyeon_schedule_overrides schedule
    on schedule.schedule_source_key = task.source_key
  where task.source_key ~ '^G[0-6]-WS[0-9]{2}-T[0-9]{2}$'
    and coalesce(task.payload ->> 'sourceType', 'milestone') in ('milestone', 'platform-build')
)
insert into public.songhyeon_schedule_rows (
  source_key, parent_source_key, display_name, source_text, lead_label,
  category_main, stage, status, start_date, end_date, sort_order,
  created_by, updated_by, created_at, updated_at
)
select
  source_key, parent_source_key, display_name, source_text, lead_label,
  category_main, stage, status, start_date, greatest(start_date, raw_end_date),
  sort_order, updated_by, updated_by, created_at, updated_at
from legacy_rows
on conflict (source_key) do nothing;

-- Convert the former implicit source-key equality into explicit link rows.
-- This normally backfills 76 relationships. If the exact owner Auth row is not
-- present, the insert intentionally produces zero rows and the migration still
-- succeeds; active members can link existing tasks later.
with exact_owner as (
  select member.auth_id
  from public.songhyeon_members member
  where member.auth_id is not null
    and member.is_active
    and member.staff_name = '전기영'
    and member.email = 'jk.jeon@igisam.com'
  limit 1
)
insert into public.songhyeon_schedule_task_links (
  schedule_source_key, task_source_key, created_by
)
select schedule.source_key, task.source_key, owner.auth_id
from public.songhyeon_schedule_rows schedule
join public.songhyeon_tasks task
  on task.source_key = schedule.source_key
 and task.archived_at is null
cross join exact_owner owner
on conflict (schedule_source_key, task_source_key) do nothing;

-- Preserve existing orphan links without weakening new writes. PostgreSQL
-- NOT VALID skips the historical scan but still enforces every future insert
-- and update; ON DELETE CASCADE closes the row-delete/link-insert race without
-- ever touching the linked integrated task.
do $$
begin
  if not exists (
    select 1
    from pg_catalog.pg_constraint constraint_row
    where constraint_row.conrelid = 'public.songhyeon_schedule_task_links'::regclass
      and constraint_row.conname = 'songhyeon_schedule_links_schedule_row_fk'
  ) then
    alter table public.songhyeon_schedule_task_links
      add constraint songhyeon_schedule_links_schedule_row_fk
      foreign key (schedule_source_key)
      references public.songhyeon_schedule_rows(source_key)
      on update cascade
      on delete cascade
      not valid;
  end if;
end;
$$;

-- New links also pass the active-member and canonical-row RLS checks.
drop policy if exists "songhyeon members add schedule links"
  on public.songhyeon_schedule_task_links;
create policy "songhyeon members add schedule links"
on public.songhyeon_schedule_task_links
for insert to authenticated
with check (
  public.is_songhyeon_member()
  and created_by = auth.uid()
  and exists (
    select 1
    from public.songhyeon_schedule_rows schedule
    where schedule.source_key = songhyeon_schedule_task_links.schedule_source_key
  )
);

create or replace function public.create_songhyeon_schedule_row(
  row_parent_source_key text,
  row_display_name text,
  row_source_text text,
  row_lead_label text,
  row_category_main text,
  row_stage text,
  row_status text,
  row_start_date date,
  row_end_date date
)
returns public.songhyeon_schedule_rows
language plpgsql
security definer
set search_path = pg_catalog, public, extensions
as $$
declare
  clean_parent text := trim(coalesce(row_parent_source_key, ''));
  clean_name text := trim(coalesce(row_display_name, ''));
  clean_source_text text := trim(coalesce(row_source_text, ''));
  clean_lead text := trim(coalesce(row_lead_label, ''));
  clean_category text := trim(coalesce(row_category_main, ''));
  clean_stage text := trim(coalesce(row_stage, ''));
  clean_status text := trim(coalesce(row_status, 'not_started'));
  created public.songhyeon_schedule_rows;
  next_order integer;
begin
  if not public.is_jeon_giyoung_songhyeon_task_owner() then
    raise exception 'SONGHYEON_SCHEDULE_ROW_CREATE_FORBIDDEN' using errcode = '42501';
  end if;
  if clean_parent = '' or clean_name = '' or clean_lead = '' or clean_category = '' then
    raise exception 'SONGHYEON_SCHEDULE_ROW_REQUIRED_FIELDS' using errcode = '22023';
  end if;
  if clean_parent not in (
       'G0-WS01', 'G0-WS02', 'G0-WS03',
       'G1-WS01', 'G1-WS02', 'G1-WS03',
       'G2-WS01', 'G2-WS02', 'G2-WS03',
       'G3-WS01', 'G3-WS02', 'G3-WS03', 'G3-WS04',
       'G4-WS01', 'G4-WS02', 'G4-WS03',
       'G5-WS01', 'G5-WS02', 'G5-WS03', 'G5-WS04',
       'G6-WS01'
     )
     or clean_stage not in ('G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6')
     or split_part(clean_parent, '-', 1) <> clean_stage then
    raise exception 'SONGHYEON_SCHEDULE_ROW_STAGE_INVALID' using errcode = '22023';
  end if;
  if clean_status not in ('not_started', 'in_progress', 'completed', 'delayed', 'cancelled') then
    raise exception 'SONGHYEON_SCHEDULE_ROW_STATUS_INVALID' using errcode = '22023';
  end if;
  if row_start_date is null or row_end_date is null or row_start_date > row_end_date then
    raise exception 'SONGHYEON_SCHEDULE_ROW_DATES_INVALID' using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(hashtextextended('songhyeon_schedule_rows:' || clean_parent, 0));
  select coalesce(max(schedule.sort_order), -1) + 1
  into next_order
  from public.songhyeon_schedule_rows schedule
  where schedule.parent_source_key = clean_parent;

  insert into public.songhyeon_schedule_rows (
    source_key, parent_source_key, display_name, source_text, lead_label,
    category_main, stage, status, start_date, end_date, sort_order,
    created_by, updated_by
  ) values (
    'SCHEDULE-' || upper(replace(gen_random_uuid()::text, '-', '')),
    clean_parent, clean_name, clean_source_text, clean_lead,
    clean_category, clean_stage, clean_status, row_start_date, row_end_date,
    next_order, auth.uid(), auth.uid()
  )
  returning * into created;

  return created;
end;
$$;

create or replace function public.update_songhyeon_schedule_row(
  target_source_key text,
  schedule_patch jsonb
)
returns public.songhyeon_schedule_rows
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  current_row public.songhyeon_schedule_rows;
  updated_row public.songhyeon_schedule_rows;
  next_name text;
  next_source_text text;
  next_lead text;
  next_category text;
  next_status text;
  next_start date;
  next_end date;
begin
  if not public.is_jeon_giyoung_songhyeon_task_owner() then
    raise exception 'SONGHYEON_SCHEDULE_ROW_UPDATE_FORBIDDEN' using errcode = '42501';
  end if;
  if schedule_patch is null or jsonb_typeof(schedule_patch) <> 'object' then
    raise exception 'SONGHYEON_SCHEDULE_ROW_PATCH_REQUIRED' using errcode = '22023';
  end if;
  if exists (
    select 1
    from jsonb_object_keys(schedule_patch) as patch_key(key_name)
    where key_name not in (
      'displayName', 'sourceText', 'leadLabel', 'categoryMain',
      'status', 'startDate', 'endDate'
    )
  ) then
    raise exception 'SONGHYEON_SCHEDULE_ROW_PATCH_FIELD_FORBIDDEN' using errcode = '22023';
  end if;

  select * into current_row
  from public.songhyeon_schedule_rows schedule
  where schedule.source_key = target_source_key
  for update;
  if not found then
    raise exception 'SONGHYEON_SCHEDULE_ROW_NOT_FOUND' using errcode = 'P0002';
  end if;

  next_name := case when schedule_patch ? 'displayName'
    then trim(coalesce(schedule_patch ->> 'displayName', '')) else current_row.display_name end;
  next_source_text := case when schedule_patch ? 'sourceText'
    then trim(coalesce(schedule_patch ->> 'sourceText', '')) else current_row.source_text end;
  next_lead := case when schedule_patch ? 'leadLabel'
    then trim(coalesce(schedule_patch ->> 'leadLabel', '')) else current_row.lead_label end;
  next_category := case when schedule_patch ? 'categoryMain'
    then trim(coalesce(schedule_patch ->> 'categoryMain', '')) else current_row.category_main end;
  next_status := case when schedule_patch ? 'status'
    then trim(coalesce(schedule_patch ->> 'status', '')) else current_row.status end;

  if next_name = '' or next_lead = '' or next_category = '' then
    raise exception 'SONGHYEON_SCHEDULE_ROW_REQUIRED_FIELDS' using errcode = '22023';
  end if;
  if next_status not in ('not_started', 'in_progress', 'completed', 'delayed', 'cancelled') then
    raise exception 'SONGHYEON_SCHEDULE_ROW_STATUS_INVALID' using errcode = '22023';
  end if;
  if schedule_patch ? 'startDate'
     and coalesce(schedule_patch ->> 'startDate', '') !~ '^\d{4}-\d{2}-\d{2}$' then
    raise exception 'SONGHYEON_SCHEDULE_ROW_DATES_INVALID' using errcode = '22023';
  end if;
  if schedule_patch ? 'endDate'
     and coalesce(schedule_patch ->> 'endDate', '') !~ '^\d{4}-\d{2}-\d{2}$' then
    raise exception 'SONGHYEON_SCHEDULE_ROW_DATES_INVALID' using errcode = '22023';
  end if;

  next_start := case when schedule_patch ? 'startDate'
    then (schedule_patch ->> 'startDate')::date else current_row.start_date end;
  next_end := case when schedule_patch ? 'endDate'
    then (schedule_patch ->> 'endDate')::date else current_row.end_date end;
  if next_start > next_end then
    raise exception 'SONGHYEON_SCHEDULE_ROW_DATES_INVALID' using errcode = '22023';
  end if;

  update public.songhyeon_schedule_rows schedule
  set display_name = next_name,
      source_text = next_source_text,
      lead_label = next_lead,
      category_main = next_category,
      status = next_status,
      start_date = next_start,
      end_date = next_end,
      updated_by = auth.uid(),
      updated_at = statement_timestamp()
  where schedule.source_key = target_source_key
  returning * into updated_row;

  return updated_row;
end;
$$;

create or replace function public.delete_songhyeon_schedule_row(
  target_source_key text
)
returns text
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  deleted_key text;
begin
  if not public.is_jeon_giyoung_songhyeon_task_owner() then
    raise exception 'SONGHYEON_SCHEDULE_ROW_DELETE_FORBIDDEN' using errcode = '42501';
  end if;

  -- Delete only relationship/override records owned by this schedule row.
  -- The integrated task ledger is deliberately never mutated here.
  delete from public.songhyeon_schedule_task_links
  where schedule_source_key = target_source_key;
  delete from public.songhyeon_schedule_overrides
  where schedule_source_key = target_source_key;
  delete from public.songhyeon_schedule_rows
  where source_key = target_source_key
  returning source_key into deleted_key;

  if deleted_key is null then
    raise exception 'SONGHYEON_SCHEDULE_ROW_NOT_FOUND' using errcode = 'P0002';
  end if;
  return deleted_key;
end;
$$;

revoke all on function public.create_songhyeon_schedule_row(
  text, text, text, text, text, text, text, date, date
) from public, anon, authenticated;
revoke all on function public.update_songhyeon_schedule_row(text, jsonb)
  from public, anon, authenticated;
revoke all on function public.delete_songhyeon_schedule_row(text)
  from public, anon, authenticated;
grant execute on function public.create_songhyeon_schedule_row(
  text, text, text, text, text, text, text, date, date
) to authenticated;
grant execute on function public.update_songhyeon_schedule_row(text, jsonb)
  to authenticated;
grant execute on function public.delete_songhyeon_schedule_row(text)
  to authenticated;

create or replace view public.songhyeon_public_schedule_rows
with (security_barrier = true, security_invoker = false)
as
select
  schedule.id,
  schedule.source_key,
  schedule.parent_source_key,
  schedule.display_name,
  schedule.source_text,
  schedule.lead_label,
  schedule.category_main,
  schedule.stage,
  schedule.status,
  schedule.start_date,
  schedule.end_date,
  schedule.sort_order,
  schedule.created_at,
  schedule.updated_at
from public.songhyeon_schedule_rows schedule;

revoke all on table public.songhyeon_public_schedule_rows
  from public, anon, authenticated;
grant select on table public.songhyeon_public_schedule_rows
  to anon, authenticated;

comment on table public.songhyeon_schedule_rows is
  'Canonical Songhyeon milestone leaf rows, independent from integrated tasks.';
comment on view public.songhyeon_public_schedule_rows is
  'Guest-safe canonical Songhyeon milestone leaf rows without Auth user IDs.';

do $$
declare
  canonical_count integer;
  explicit_same_key_count integer;
begin
  select count(*) into canonical_count
  from public.songhyeon_schedule_rows;
  select count(*) into explicit_same_key_count
  from public.songhyeon_schedule_task_links link
  where link.schedule_source_key = link.task_source_key;
  raise notice 'Songhyeon canonical schedule rows: %, explicit same-key links: %',
    canonical_count, explicit_same_key_count;
end;
$$;

notify pgrst, 'reload schema';
