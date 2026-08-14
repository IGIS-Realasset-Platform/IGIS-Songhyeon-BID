-- 송현 BID 변경 이력은 전기영 계정만 개별 삭제할 수 있다.
-- 이력 작성자나 다른 관리자에게는 삭제 권한을 부여하지 않는다.
-- IOTA 원장과 테이블은 조회하거나 변경하지 않는다.

create or replace function public.can_jeon_giyoung_delete_songhyeon_activity()
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

revoke all on function public.can_jeon_giyoung_delete_songhyeon_activity() from public;
grant execute on function public.can_jeon_giyoung_delete_songhyeon_activity() to authenticated;

drop policy if exists "activity authors delete own activity" on public.songhyeon_task_activity;
drop policy if exists "jeon giyoung deletes songhyeon activity" on public.songhyeon_task_activity;
drop function if exists public.can_jeon_giyoung_delete_songhyeon_activity(uuid);
create policy "jeon giyoung deletes songhyeon activity"
on public.songhyeon_task_activity
for delete
to authenticated
using (public.can_jeon_giyoung_delete_songhyeon_activity());

revoke delete on public.songhyeon_task_activity from anon;
grant delete on public.songhyeon_task_activity to authenticated;

select
  has_table_privilege('authenticated', 'public.songhyeon_task_activity', 'delete') as authenticated_has_delete_grant,
  has_table_privilege('anon', 'public.songhyeon_task_activity', 'delete') as anon_can_delete,
  to_regprocedure('public.can_jeon_giyoung_delete_songhyeon_activity()') is not null as exact_identity_function_exists,
  to_regprocedure('public.can_jeon_giyoung_delete_songhyeon_activity(uuid)') is null as legacy_parameter_function_removed,
  exists (
    select 1
    from public.songhyeon_members m
    where m.staff_name = '전기영'
      and m.email = 'jk.jeon@igisam.com'
      and m.is_active
      and m.auth_id is not null
  ) as jeon_giyoung_account_linked,
  exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'songhyeon_task_activity'
      and policyname = 'jeon giyoung deletes songhyeon activity'
      and cmd = 'DELETE'
  ) as jeon_giyoung_policy_exists;
