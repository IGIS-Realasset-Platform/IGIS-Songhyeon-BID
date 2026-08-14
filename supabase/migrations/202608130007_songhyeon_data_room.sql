-- SONGHYEON BID Data Room only. URL metadata is shared by active Songhyeon members.
-- Depends on 202608120001_songhyeon_auth_governance.sql.

create table if not exists public.songhyeon_data_room_documents (
  id text primary key,
  title text not null check (length(trim(title)) > 0),
  description text not null default '',
  category text not null check (length(trim(category)) > 0),
  document_type text not null check (length(trim(document_type)) > 0),
  reference_date date not null,
  url text not null check (url ~* '^https://'),
  display_order integer not null default 0,
  view_count integer not null default 0 check (view_count >= 0),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.songhyeon_data_room_documents enable row level security;

drop policy if exists "songhyeon members read data room" on public.songhyeon_data_room_documents;
create policy "songhyeon members read data room" on public.songhyeon_data_room_documents
  for select to authenticated using (public.is_songhyeon_member());

drop policy if exists "songhyeon members add data room documents" on public.songhyeon_data_room_documents;
create policy "songhyeon members add data room documents" on public.songhyeon_data_room_documents
  for insert to authenticated with check (
    public.is_songhyeon_member()
    and created_by = auth.uid()
    and updated_by = auth.uid()
  );

drop policy if exists "songhyeon members update data room documents" on public.songhyeon_data_room_documents;
create policy "songhyeon members update data room documents" on public.songhyeon_data_room_documents
  for update to authenticated using (public.is_songhyeon_member())
  with check (public.is_songhyeon_member() and updated_by = auth.uid());

drop policy if exists "songhyeon members delete data room documents" on public.songhyeon_data_room_documents;
create policy "songhyeon members delete data room documents" on public.songhyeon_data_room_documents
  for delete to authenticated using (public.is_songhyeon_member());

revoke all on table public.songhyeon_data_room_documents from anon;
revoke all on table public.songhyeon_data_room_documents from public;
grant select, insert, update, delete on public.songhyeon_data_room_documents to authenticated;

create or replace function public.record_songhyeon_data_room_view(document_id text)
returns integer
language plpgsql security definer set search_path = public
as $$
declare next_count integer;
begin
  if not public.is_songhyeon_member() then raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED'; end if;
  update public.songhyeon_data_room_documents
  set view_count = view_count + 1
  where id = document_id
  returning view_count into next_count;
  if next_count is null then raise exception 'SONGHYEON_DATA_ROOM_DOCUMENT_NOT_FOUND'; end if;
  return next_count;
end; $$;

revoke all on function public.record_songhyeon_data_room_view(text) from public;
grant execute on function public.record_songhyeon_data_room_view(text) to authenticated;

insert into public.songhyeon_data_room_documents (
  id, title, description, category, document_type, reference_date, url, display_order
) values
  (
    'SH-BID-PREREAD-260728',
    '송현 BID 사전공유자료 : SBD 기반 BID 개념과 송현 BID의 관계',
    'IOTA SEOUL 기반 SBD 전략과 BID 개념, 송현 BID의 실증 역할을 정리한 최초 사전공유자료',
    '배경·개념',
    'Notion',
    '2026-07-28',
    'https://app.notion.com/p/BID-SBD-BID-BID-_260728-2398ced43c47839c9742018aa51cc7d3?source=copy_link',
    0
  ),
  (
    'SH-BID-STRATEGY-260811',
    '송현 BID 프로젝트 방향 및 실행계획',
    '송현 BID의 프로젝트 방향, 추진 구조 및 실행계획을 정리한 기준 문서',
    '전략·실행계획',
    'PDF',
    '2026-08-11',
    'https://raw.githubusercontent.com/IGIS-Realasset-Platform/IGIS-Songhyeon-BID/5dd18169813f710b04f88a945a63722b246ca527/public/documents/songhyeon_bid_strategy_execution_plan_260811.pdf',
    1
  )
on conflict (id) do nothing;

create index if not exists songhyeon_data_room_order_idx
  on public.songhyeon_data_room_documents(display_order, created_at desc);
