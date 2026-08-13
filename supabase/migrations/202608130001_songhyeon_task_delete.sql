-- SONGHYEON BID task deletion policy only.
-- Apply to the approved Songhyeon/IFPDP Supabase project after explicit approval.

drop policy if exists "songhyeon members delete tasks" on public.songhyeon_tasks;
create policy "songhyeon members delete tasks" on public.songhyeon_tasks
  for delete to authenticated
  using (public.is_songhyeon_member());

grant delete on public.songhyeon_tasks to authenticated;
