-- Restore the read-only shared stakeholder contact view in environments where
-- the original additive migration was not applied. Kept as a single statement
-- so it can also be applied through the remote query runner.

do $migration$
begin
  execute $view$
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
      and public.is_songhyeon_member()
  $view$;

  execute 'revoke all on public.songhyeon_shared_stakeholder_contacts from public, anon, authenticated';
  execute 'grant select on public.songhyeon_shared_stakeholder_contacts to authenticated';
  execute $comment$
    comment on view public.songhyeon_shared_stakeholder_contacts is
      'Read-only shared IOTA company/contact directory for authenticated Songhyeon autocomplete.'
  $comment$;
  perform pg_catalog.pg_notify('pgrst', 'reload schema');
end
$migration$;
