-- Shared reference boundary for Songhyeon BID.
-- The view remains read-only; controlled feed writes use a separate audited sync trigger.

create or replace view public.songhyeon_shared_stakeholders
with (security_invoker = true)
as
select distinct btrim(company_name)::text as stakeholder_name
from public.iota_stakeholder_master
where company_name is not null and btrim(company_name) <> ''
union
select distinct btrim(stakeholder_name)::text as stakeholder_name
from iota_v2.iota_stakeholders
where stakeholder_name is not null and btrim(stakeholder_name) <> '';

revoke all on public.songhyeon_shared_stakeholders from anon;
revoke insert, update, delete, truncate, references, trigger
  on public.songhyeon_shared_stakeholders from authenticated;
grant select on public.songhyeon_shared_stakeholders to authenticated;

comment on view public.songhyeon_shared_stakeholders is
  'Songhyeon read-only boundary over approved shared IOTA stakeholder names.';
