-- Keep Songhyeon feed stakeholders in the shared IOTA stakeholder master.
-- Feed posts retain their own historical snapshot, while autocomplete reads the shared master.

create or replace function public.sync_songhyeon_feed_stakeholder_to_master()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  normalized_company text := coalesce(
    nullif(pg_catalog.btrim(new.company_name), ''),
    nullif(pg_catalog.btrim(new.category), '')
  );
  normalized_contact text := nullif(pg_catalog.btrim(new.contact_name), '');
  stakeholder_key text;
begin
  if auth.uid() is null or not public.is_songhyeon_member(auth.uid()) then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;

  if normalized_company is null then
    return new;
  end if;
  if pg_catalog.char_length(normalized_company) > 200
    or pg_catalog.char_length(coalesce(normalized_contact, '')) > 200 then
    raise exception 'INVALID_STAKEHOLDER' using errcode = '22023';
  end if;

  stakeholder_key := pg_catalog.lower(normalized_company)
    || '|'
    || pg_catalog.lower(coalesce(normalized_contact, ''));
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(stakeholder_key, 0));

  insert into public.iota_stakeholder_master(company_name, contact_name, role_category)
  select normalized_company, normalized_contact, null
  where not exists (
    select 1
    from public.iota_stakeholder_master master
    where pg_catalog.lower(pg_catalog.btrim(master.company_name)) = pg_catalog.lower(normalized_company)
      and pg_catalog.lower(pg_catalog.btrim(coalesce(master.contact_name, '')))
        = pg_catalog.lower(coalesce(normalized_contact, ''))
  )
  on conflict do nothing;

  return new;
end;
$$;

revoke all on function public.sync_songhyeon_feed_stakeholder_to_master()
  from public, anon, authenticated;

drop trigger if exists sync_songhyeon_feed_stakeholder_master
  on public.songhyeon_feed_post_stakeholders;
create trigger sync_songhyeon_feed_stakeholder_master
after insert or update of company_name, contact_name, category
on public.songhyeon_feed_post_stakeholders
for each row
execute function public.sync_songhyeon_feed_stakeholder_to_master();

-- Bring previously saved feed values into the same master once.
with normalized as (
  select
    coalesce(
      nullif(pg_catalog.btrim(stakeholder.company_name), ''),
      nullif(pg_catalog.btrim(stakeholder.category), '')
    ) as company_name,
    nullif(pg_catalog.btrim(stakeholder.contact_name), '') as contact_name
  from public.songhyeon_feed_post_stakeholders stakeholder
), candidates as (
  select distinct on (
    pg_catalog.lower(company_name),
    pg_catalog.lower(coalesce(contact_name, ''))
  ) company_name, contact_name
  from normalized
  where company_name is not null
    and pg_catalog.char_length(company_name) <= 200
    and pg_catalog.char_length(coalesce(contact_name, '')) <= 200
  order by
    pg_catalog.lower(company_name),
    pg_catalog.lower(coalesce(contact_name, '')),
    company_name
)
insert into public.iota_stakeholder_master(company_name, contact_name, role_category)
select source.company_name, source.contact_name, null
from candidates source
where not exists (
    select 1
    from public.iota_stakeholder_master master
    where pg_catalog.lower(pg_catalog.btrim(master.company_name)) = pg_catalog.lower(source.company_name)
      and pg_catalog.lower(pg_catalog.btrim(coalesce(master.contact_name, '')))
        = pg_catalog.lower(coalesce(source.contact_name, ''))
  )
on conflict do nothing;

notify pgrst, 'reload schema';
