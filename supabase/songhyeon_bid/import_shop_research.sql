-- After importing the one-row .local/shop-research/seed.csv into
-- songhyeon_shop_research_seed via the authenticated admin Table Editor.
-- Safe to re-run: never replace user-created rows, events, or soft deletions.
begin;
do $$
declare s jsonb;
begin
  select document into s from public.songhyeon_shop_research_seed
    where id=1 and seed_hash='57dea8e8e5a177e9d6a2e572f5b0d43ce545b6e3638e50e70e78f5fb4cdf4177'
    for update;
  if s is null or jsonb_array_length(s->'entities')<>373 then raise exception '원본 자료 버전 또는 건수가 다릅니다.'; end if;
  insert into public.songhyeon_shop_research_entities(id)
    select e->>'id' from jsonb_array_elements(s->'entities') e on conflict(id) do nothing;
  insert into public.songhyeon_shop_research_sites(id,entity_id)
    select site->>'id', e->>'id' from jsonb_array_elements(s->'entities') e,
      lateral jsonb_array_elements(e->'sites') site on conflict(id) do nothing;
end $$;
commit;
select (select jsonb_array_length(document->'entities') from public.songhyeon_shop_research_seed where id=1) as source_entities,
  (select count(*) from public.songhyeon_shop_research_entities) as registered_entities,
  (select count(*) from public.songhyeon_shop_research_sites) as registered_sites,
  (select count(*) from public.songhyeon_shop_research_events) as saved_events;
