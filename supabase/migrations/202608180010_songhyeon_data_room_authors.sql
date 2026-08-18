-- Preserve a server-derived display name for every Data Room document author.
-- Existing active-member read/write policies remain unchanged; guests only see
-- the safe public projection and cannot mutate the source table.

alter table public.songhyeon_data_room_documents
  add column if not exists created_by_name text not null default '송현 BID TF';

update public.songhyeon_data_room_documents as document
set created_by_name = member.staff_name
from public.songhyeon_members as member
where document.created_by = member.auth_id
  and length(btrim(member.staff_name)) > 0;

update public.songhyeon_data_room_documents
set created_by_name = '송현 BID TF'
where length(btrim(coalesce(created_by_name, ''))) = 0;

create or replace function public.set_songhyeon_data_room_author()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  current_member public.songhyeon_members%rowtype;
begin
  if tg_op = 'UPDATE' then
    new.created_by := old.created_by;
    new.created_by_name := old.created_by_name;
    if auth.uid() is not null then
      select member.*
      into current_member
      from public.songhyeon_members as member
      where member.auth_id = auth.uid()
        and member.is_active
      limit 1;
      if not found then
        raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
      end if;
      new.updated_by := auth.uid();
    end if;
    return new;
  end if;

  if auth.uid() is null then
    new.created_by_name := coalesce(nullif(btrim(new.created_by_name), ''), '송현 BID TF');
    return new;
  end if;

  select member.*
  into current_member
  from public.songhyeon_members as member
  where member.auth_id = auth.uid()
    and member.is_active
  limit 1;

  if not found then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;

  new.created_by := auth.uid();
  new.updated_by := auth.uid();
  new.created_by_name := current_member.staff_name;
  return new;
end;
$$;

revoke all on function public.set_songhyeon_data_room_author() from public, anon, authenticated;

drop trigger if exists set_songhyeon_data_room_author
  on public.songhyeon_data_room_documents;
create trigger set_songhyeon_data_room_author
before insert or update on public.songhyeon_data_room_documents
for each row execute function public.set_songhyeon_data_room_author();

create or replace view public.songhyeon_public_data_room_documents
with (security_barrier = true, security_invoker = false)
as
select
  document.id,
  document.title,
  document.description,
  document.category,
  document.document_type,
  document.reference_date,
  document.url,
  document.display_order,
  document.view_count,
  document.created_at,
  document.updated_at,
  document.created_by_name
from public.songhyeon_data_room_documents as document;

revoke all on public.songhyeon_public_data_room_documents from public, anon, authenticated;
grant select on public.songhyeon_public_data_room_documents to anon, authenticated;

notify pgrst, 'reload schema';
