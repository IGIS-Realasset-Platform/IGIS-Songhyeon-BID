begin;

-- 송현 BID 통합업무보드 전용: 인증된 송현 멤버의 업무 삭제 허용
drop policy if exists "songhyeon members delete tasks" on public.songhyeon_tasks;
create policy "songhyeon members delete tasks" on public.songhyeon_tasks
  for delete to authenticated
  using (public.is_songhyeon_member());

grant delete on public.songhyeon_tasks to authenticated;

-- 사용자가 생성한 검증 업무 000 삭제
with deleted as (
  delete from public.songhyeon_tasks
  where source_key = 'MANUAL-D2B41089-9E4D-4425-9DD0-67D42A724967'
  returning source_key
)
select count(*)::integer as deleted_count from deleted;

commit;

select count(*)::integer as remaining_count
from public.songhyeon_tasks
where source_key = 'MANUAL-D2B41089-9E4D-4425-9DD0-67D42A724967';
