-- Restore the Songhyeon first-access contract without exposing the shared code.
-- The code hash is provisioned separately in the production secret operation.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.songhyeon_auth_settings (
  singleton boolean primary key default true check (singleton),
  access_code_hash text not null,
  updated_at timestamptz not null default now()
);

alter table public.songhyeon_auth_settings enable row level security;
revoke all on table public.songhyeon_auth_settings from public, anon, authenticated;

create or replace function public.check_songhyeon_member_email(candidate_email text)
returns table(staff_name text, is_first_time boolean)
language sql
stable
security definer
set search_path = ''
as $$
  select m.staff_name, (m.auth_id is null)
  from public.songhyeon_members m
  where m.email = lower(btrim(candidate_email))
    and m.is_active
  limit 1;
$$;

create or replace function public.claim_songhyeon_membership(candidate_access_code text)
returns public.songhyeon_members
language plpgsql
security definer
set search_path = ''
as $$
declare
  claimed public.songhyeon_members%rowtype;
  stored_hash text;
begin
  if auth.uid() is null then
    raise exception 'AUTH_REQUIRED' using errcode = '42501';
  end if;

  select s.access_code_hash
  into stored_hash
  from public.songhyeon_auth_settings s
  where s.singleton;

  if stored_hash is null then
    raise exception 'ACCESS_CODE_NOT_CONFIGURED' using errcode = '55000';
  end if;

  if candidate_access_code is null
    or stored_hash is distinct from extensions.crypt(btrim(candidate_access_code), stored_hash)
  then
    raise exception 'INVALID_ACCESS_CODE' using errcode = '22023';
  end if;

  update public.songhyeon_members m
  set auth_id = auth.uid(),
      updated_at = now()
  where m.email = lower(btrim(auth.jwt()->>'email'))
    and m.is_active
    and (m.auth_id is null or m.auth_id = auth.uid())
  returning m.* into claimed;

  if not found then
    raise exception 'MEMBERSHIP_NOT_FOUND' using errcode = 'P0002';
  end if;

  return claimed;
end;
$$;

revoke all on function public.check_songhyeon_member_email(text) from public, anon, authenticated;
revoke all on function public.claim_songhyeon_membership(text) from public, anon, authenticated;
grant execute on function public.check_songhyeon_member_email(text) to anon, authenticated;
grant execute on function public.claim_songhyeon_membership(text) to authenticated;

notify pgrst, 'reload schema';
