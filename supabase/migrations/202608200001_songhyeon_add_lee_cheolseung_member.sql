-- Link Lee Cheol-seung's existing shared IOTA Auth account to Songhyeon.
-- This migration never creates or changes an auth.users account.

do $$
declare
  existing_auth_id uuid;
begin
  select account.id
    into existing_auth_id
  from auth.users as account
  where lower(btrim(account.email)) = 'ethan.lee@igisam.com'
  limit 1;

  if existing_auth_id is null then
    raise exception 'IOTA_AUTH_ACCOUNT_NOT_FOUND: ethan.lee@igisam.com'
      using errcode = 'P0002';
  end if;

  insert into public.songhyeon_members (
    auth_id,
    email,
    staff_name,
    group_name,
    title,
    roles,
    responsibility,
    photo_path,
    gate_scope,
    platform_role,
    display_order,
    is_active
  ) values (
    existing_auth_id,
    'ethan.lee@igisam.com',
    '이철승',
    '부문대표',
    '부문대표',
    array['송현 BID TF', '부문대표'],
    '통합 의사결정 총괄',
    '/이철승.webp',
    array['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6'],
    'manager',
    0,
    true
  )
  on conflict (email) do update set
    auth_id = excluded.auth_id,
    staff_name = excluded.staff_name,
    group_name = excluded.group_name,
    title = excluded.title,
    roles = excluded.roles,
    responsibility = excluded.responsibility,
    photo_path = excluded.photo_path,
    gate_scope = excluded.gate_scope,
    platform_role = excluded.platform_role,
    display_order = excluded.display_order,
    is_active = true,
    updated_at = now();
end;
$$;

notify pgrst, 'reload schema';
