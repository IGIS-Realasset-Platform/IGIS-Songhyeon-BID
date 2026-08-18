-- SONGHYEON BID operational objects only.
-- Auth is intentionally shared with IOTA; this migration must not alter IOTA objects.

create extension if not exists pgcrypto;

create table if not exists public.songhyeon_members (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid unique references auth.users(id) on delete set null,
  email text not null unique check (email = lower(email)),
  staff_name text not null,
  group_name text not null,
  title text not null default '',
  roles text[] not null default '{}',
  responsibility text not null default '',
  phone text not null default '',
  photo_path text not null default '',
  gate_scope text[] not null default '{}',
  platform_role text not null default 'member' check (platform_role in ('admin','manager','member','viewer')),
  display_order integer not null default 999,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.songhyeon_login_history (
  id bigint generated always as identity primary key,
  auth_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  login_time timestamptz not null default now()
);

create table if not exists public.songhyeon_audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.songhyeon_auth_settings (
  singleton boolean primary key default true check (singleton),
  access_code_hash text not null,
  updated_at timestamptz not null default now()
);

alter table public.songhyeon_members enable row level security;
alter table public.songhyeon_login_history enable row level security;
alter table public.songhyeon_audit_log enable row level security;
alter table public.songhyeon_auth_settings enable row level security;
revoke all on table public.songhyeon_auth_settings from public, anon, authenticated;

create or replace function public.is_songhyeon_member(target_user uuid default auth.uid())
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.songhyeon_members m where m.auth_id = target_user and m.is_active); $$;

create or replace function public.is_songhyeon_admin(target_user uuid default auth.uid())
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.songhyeon_members m where m.auth_id = target_user and m.is_active and m.platform_role = 'admin'); $$;

create or replace function public.check_songhyeon_member_email(candidate_email text)
returns table(staff_name text, is_first_time boolean)
language sql stable security definer set search_path = ''
as $$
  select m.staff_name, (m.auth_id is null)
  from public.songhyeon_members m
  where m.email = lower(btrim(candidate_email)) and m.is_active
  limit 1;
$$;

create or replace function public.claim_songhyeon_membership(candidate_access_code text)
returns public.songhyeon_members
language plpgsql security definer set search_path = ''
as $$
declare
  claimed public.songhyeon_members%rowtype;
  stored_hash text;
begin
  if auth.uid() is null then raise exception 'AUTH_REQUIRED' using errcode = '42501'; end if;
  select s.access_code_hash into stored_hash
  from public.songhyeon_auth_settings s where s.singleton;
  if stored_hash is null then raise exception 'ACCESS_CODE_NOT_CONFIGURED' using errcode = '55000'; end if;
  if candidate_access_code is null
    or stored_hash is distinct from extensions.crypt(btrim(candidate_access_code), stored_hash)
  then raise exception 'INVALID_ACCESS_CODE' using errcode = '22023'; end if;
  update public.songhyeon_members m
  set auth_id = auth.uid(), updated_at = now()
  where m.email = lower(btrim(auth.jwt()->>'email')) and m.is_active
    and (m.auth_id is null or m.auth_id = auth.uid())
  returning m.* into claimed;
  if not found then raise exception 'MEMBERSHIP_NOT_FOUND' using errcode = 'P0002'; end if;
  return claimed;
end; $$;

revoke all on function public.is_songhyeon_member(uuid) from public;
revoke all on function public.is_songhyeon_admin(uuid) from public;
revoke all on function public.check_songhyeon_member_email(text) from public, anon, authenticated;
revoke all on function public.claim_songhyeon_membership(text) from public, anon, authenticated;
grant execute on function public.is_songhyeon_member(uuid), public.is_songhyeon_admin(uuid) to authenticated;
grant execute on function public.check_songhyeon_member_email(text) to anon, authenticated;
grant execute on function public.claim_songhyeon_membership(text) to authenticated;

drop policy if exists "members read active roster" on public.songhyeon_members;
create policy "members read active roster" on public.songhyeon_members for select to authenticated using (public.is_songhyeon_member() and is_active);
drop policy if exists "admins manage roster" on public.songhyeon_members;
create policy "admins manage roster" on public.songhyeon_members for all to authenticated using (public.is_songhyeon_admin()) with check (public.is_songhyeon_admin());

drop policy if exists "users insert own login history" on public.songhyeon_login_history;
create policy "users insert own login history" on public.songhyeon_login_history for insert to authenticated with check (auth_id = auth.uid() and public.is_songhyeon_member());
drop policy if exists "admins read login history" on public.songhyeon_login_history;
create policy "admins read login history" on public.songhyeon_login_history for select to authenticated using (public.is_songhyeon_admin());

drop policy if exists "admins read audit log" on public.songhyeon_audit_log;
create policy "admins read audit log" on public.songhyeon_audit_log for select to authenticated using (public.is_songhyeon_admin());
drop policy if exists "admins insert audit log" on public.songhyeon_audit_log;
create policy "admins insert audit log" on public.songhyeon_audit_log for insert to authenticated with check (public.is_songhyeon_admin() and actor_id = auth.uid());

grant select on public.songhyeon_members to authenticated;
grant insert, select on public.songhyeon_login_history to authenticated;
grant insert, select on public.songhyeon_audit_log to authenticated;

create index if not exists songhyeon_members_active_order_idx on public.songhyeon_members(is_active, display_order);
create index if not exists songhyeon_login_history_auth_idx on public.songhyeon_login_history(auth_id, login_time desc);
create index if not exists songhyeon_audit_log_created_idx on public.songhyeon_audit_log(created_at desc);
