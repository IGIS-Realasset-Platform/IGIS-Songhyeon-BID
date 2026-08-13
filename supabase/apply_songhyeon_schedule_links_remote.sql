begin;

create table if not exists public.songhyeon_schedule_task_links (
  id uuid primary key default gen_random_uuid(),
  schedule_source_key text not null,
  task_source_key text not null references public.songhyeon_tasks(source_key) on update cascade on delete cascade,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  unique(schedule_source_key, task_source_key)
);

create table if not exists public.songhyeon_schedule_overrides (
  schedule_source_key text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_by uuid not null references auth.users(id) on delete restrict,
  updated_at timestamptz not null default now()
);

alter table public.songhyeon_schedule_task_links enable row level security;
alter table public.songhyeon_schedule_overrides enable row level security;

drop policy if exists "songhyeon members read schedule links" on public.songhyeon_schedule_task_links;
create policy "songhyeon members read schedule links" on public.songhyeon_schedule_task_links
  for select to authenticated using (public.is_songhyeon_member());

drop policy if exists "songhyeon members add schedule links" on public.songhyeon_schedule_task_links;
create policy "songhyeon members add schedule links" on public.songhyeon_schedule_task_links
  for insert to authenticated with check (public.is_songhyeon_member() and created_by = auth.uid());

drop policy if exists "songhyeon members delete schedule links" on public.songhyeon_schedule_task_links;
create policy "songhyeon members delete schedule links" on public.songhyeon_schedule_task_links
  for delete to authenticated using (public.is_songhyeon_member());

drop policy if exists "songhyeon members read schedule overrides" on public.songhyeon_schedule_overrides;
create policy "songhyeon members read schedule overrides" on public.songhyeon_schedule_overrides
  for select to authenticated using (public.is_songhyeon_member());

drop policy if exists "songhyeon members add schedule overrides" on public.songhyeon_schedule_overrides;
create policy "songhyeon members add schedule overrides" on public.songhyeon_schedule_overrides
  for insert to authenticated with check (public.is_songhyeon_member() and updated_by = auth.uid());

drop policy if exists "songhyeon members update schedule overrides" on public.songhyeon_schedule_overrides;
create policy "songhyeon members update schedule overrides" on public.songhyeon_schedule_overrides
  for update to authenticated using (public.is_songhyeon_member())
  with check (public.is_songhyeon_member() and updated_by = auth.uid());

grant select, insert, delete on public.songhyeon_schedule_task_links to authenticated;
grant select, insert, update on public.songhyeon_schedule_overrides to authenticated;

create index if not exists songhyeon_schedule_links_source_idx
  on public.songhyeon_schedule_task_links(schedule_source_key);

commit;

select
  to_regclass('public.songhyeon_schedule_task_links') as links_table,
  to_regclass('public.songhyeon_schedule_overrides') as overrides_table,
  (select count(*) from pg_policies where schemaname='public' and tablename='songhyeon_schedule_task_links') as links_policies,
  (select count(*) from pg_policies where schemaname='public' and tablename='songhyeon_schedule_overrides') as overrides_policies;
