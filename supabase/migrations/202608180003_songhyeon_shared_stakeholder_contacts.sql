-- Songhyeon feed contact autocomplete reads the approved shared stakeholder master.
-- This view is read-only; controlled feed writes use a separate audited sync trigger.

create or replace view public.songhyeon_shared_stakeholder_contacts
with (security_invoker = true)
as
select distinct
  btrim(coalesce(company_name, ''))::text as company_name,
  btrim(coalesce(contact_name, ''))::text as contact_name
from public.iota_stakeholder_master
where (
    btrim(coalesce(company_name, '')) <> ''
    or btrim(coalesce(contact_name, '')) <> ''
  )
  and public.is_songhyeon_member()
union
select distinct
  btrim(stakeholder_name)::text as company_name,
  ''::text as contact_name
from iota_v2.iota_stakeholders
where stakeholder_name is not null
  and btrim(stakeholder_name) <> ''
  and public.is_songhyeon_member();

revoke all on public.songhyeon_shared_stakeholder_contacts
  from public, anon, authenticated;
grant select on public.songhyeon_shared_stakeholder_contacts to authenticated;

comment on view public.songhyeon_shared_stakeholder_contacts is
  'Read-only shared IOTA company/contact directory for authenticated Songhyeon autocomplete.';

notify pgrst, 'reload schema';
