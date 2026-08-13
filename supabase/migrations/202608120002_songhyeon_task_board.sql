-- SONGHYEON BID task board only. Shared Auth, isolated operational tables.
-- Depends on 202608120001_songhyeon_auth_governance.sql.

create table if not exists public.songhyeon_tasks (
  id text primary key,
  source_key text not null unique,
  display_order integer not null,
  payload jsonb not null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.songhyeon_task_comments (
  id text primary key,
  task_source_key text not null references public.songhyeon_tasks(source_key) on update cascade on delete cascade,
  body text not null check (length(trim(body)) > 0),
  author_id uuid not null references auth.users(id) on delete restrict,
  author_name text not null,
  author_email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.songhyeon_task_activity (
  id text primary key,
  task_source_key text not null references public.songhyeon_tasks(source_key) on update cascade on delete cascade,
  action text not null check (action in ('task_seeded','task_updated','comment_added','comment_deleted')),
  payload jsonb not null default '{}'::jsonb,
  actor_id uuid not null references auth.users(id) on delete restrict,
  actor_name text not null,
  created_at timestamptz not null default now()
);

alter table public.songhyeon_tasks enable row level security;
alter table public.songhyeon_task_comments enable row level security;
alter table public.songhyeon_task_activity enable row level security;

-- Idempotent single-task seed/upsert boundary. Existing edited payload is never overwritten.
create or replace function public.seed_songhyeon_task(
  seed_id text,
  seed_source_key text,
  seed_display_order integer,
  seed_payload jsonb
) returns public.songhyeon_tasks
language plpgsql security invoker set search_path = public
as $$
declare seeded public.songhyeon_tasks;
begin
  if not public.is_songhyeon_member() then raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED'; end if;
  insert into public.songhyeon_tasks(id, source_key, display_order, payload, updated_by)
  values(seed_id, seed_source_key, seed_display_order, seed_payload, auth.uid())
  on conflict(source_key) do nothing;
  select * into seeded from public.songhyeon_tasks where source_key = seed_source_key;
  return seeded;
end; $$;

revoke all on function public.seed_songhyeon_task(text,text,integer,jsonb) from public;
grant execute on function public.seed_songhyeon_task(text,text,integer,jsonb) to authenticated;

drop policy if exists "songhyeon members read tasks" on public.songhyeon_tasks;
create policy "songhyeon members read tasks" on public.songhyeon_tasks
  for select to authenticated using (public.is_songhyeon_member());
drop policy if exists "songhyeon members seed tasks" on public.songhyeon_tasks;
create policy "songhyeon members seed tasks" on public.songhyeon_tasks
  for insert to authenticated with check (public.is_songhyeon_member() and updated_by = auth.uid());
drop policy if exists "songhyeon members update tasks" on public.songhyeon_tasks;
create policy "songhyeon members update tasks" on public.songhyeon_tasks
  for update to authenticated using (public.is_songhyeon_member())
  with check (public.is_songhyeon_member() and updated_by = auth.uid());

drop policy if exists "songhyeon members read comments" on public.songhyeon_task_comments;
create policy "songhyeon members read comments" on public.songhyeon_task_comments
  for select to authenticated using (public.is_songhyeon_member());
drop policy if exists "songhyeon members add own comments" on public.songhyeon_task_comments;
create policy "songhyeon members add own comments" on public.songhyeon_task_comments
  for insert to authenticated with check (public.is_songhyeon_member() and author_id = auth.uid());
drop policy if exists "comment authors delete comments" on public.songhyeon_task_comments;
create policy "comment authors delete comments" on public.songhyeon_task_comments
  for delete to authenticated using (public.is_songhyeon_member() and (author_id = auth.uid() or public.is_songhyeon_admin()));

drop policy if exists "songhyeon members read activity" on public.songhyeon_task_activity;
create policy "songhyeon members read activity" on public.songhyeon_task_activity
  for select to authenticated using (public.is_songhyeon_member());
drop policy if exists "songhyeon members add own activity" on public.songhyeon_task_activity;
create policy "songhyeon members add own activity" on public.songhyeon_task_activity
  for insert to authenticated with check (public.is_songhyeon_member() and actor_id = auth.uid());

grant select, insert, update on public.songhyeon_tasks to authenticated;
grant select, insert, delete on public.songhyeon_task_comments to authenticated;
grant select, insert on public.songhyeon_task_activity to authenticated;

create index if not exists songhyeon_tasks_order_idx on public.songhyeon_tasks(display_order);
create index if not exists songhyeon_task_comments_task_idx on public.songhyeon_task_comments(task_source_key, created_at);
create index if not exists songhyeon_task_activity_task_idx on public.songhyeon_task_activity(task_source_key, created_at desc);
