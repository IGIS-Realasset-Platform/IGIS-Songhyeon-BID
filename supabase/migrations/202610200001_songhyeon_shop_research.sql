begin;

-- Original source stays private. Frontend assets contain no seed or member data.
create table if not exists public.songhyeon_shop_research_seed (
  id integer primary key check (id = 1),
  seed_hash text not null,
  document jsonb not null,
  imported_at timestamptz not null default now()
);
create table if not exists public.songhyeon_shop_research_entities (
  id text primary key,
  created_by uuid,
  deleted_at timestamptz,
  deleted_by uuid
);
create table if not exists public.songhyeon_shop_research_sites (
  id text primary key,
  entity_id text not null references public.songhyeon_shop_research_entities(id)
);
create table if not exists public.songhyeon_shop_research_events (
  revision bigint generated always as identity primary key,
  id uuid not null default gen_random_uuid() unique,
  actor_id uuid not null,
  client_event_id text not null,
  request jsonb not null,
  event jsonb not null,
  unique(actor_id, client_event_id)
);
alter table public.songhyeon_shop_research_seed enable row level security;
alter table public.songhyeon_shop_research_entities enable row level security;
alter table public.songhyeon_shop_research_sites enable row level security;
alter table public.songhyeon_shop_research_events enable row level security;
revoke all on public.songhyeon_shop_research_seed,
  public.songhyeon_shop_research_entities, public.songhyeon_shop_research_sites,
  public.songhyeon_shop_research_events from public, anon, authenticated;
revoke all on sequence public.songhyeon_shop_research_events_revision_seq from public, anon, authenticated;

create or replace function public.songhyeon_shop_research_initialize()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.seed_hash <> '57dea8e8e5a177e9d6a2e572f5b0d43ce545b6e3638e50e70e78f5fb4cdf4177'
    or jsonb_typeof(new.document->'entities') is distinct from 'array'
    or jsonb_array_length(new.document->'entities')<>373 then
    raise exception '원본 자료 버전 또는 건수가 다릅니다.';
  end if;
  insert into public.songhyeon_shop_research_entities(id)
    select e->>'id' from jsonb_array_elements(new.document->'entities') e;
  insert into public.songhyeon_shop_research_sites(id,entity_id)
    select site->>'id',e->>'id' from jsonb_array_elements(new.document->'entities') e,
      lateral jsonb_array_elements(e->'sites') site;
  return new;
end $$;
revoke all on function public.songhyeon_shop_research_initialize() from public, anon, authenticated;
create or replace trigger songhyeon_shop_research_seed_initialize
  after insert on public.songhyeon_shop_research_seed
  for each row execute function public.songhyeon_shop_research_initialize();

create or replace function public.songhyeon_shop_research_validate(kind text, doc jsonb)
returns void language plpgsql set search_path = '' as $$
declare
  allowed text[];
  k text;
  v jsonb;
  entry jsonb;
begin
  if jsonb_typeof(doc) is distinct from 'object' or octet_length(doc::text) > 65536 then
    raise exception '입력 형식 또는 길이를 확인해 주세요.' using errcode = '22023';
  end if;
  allowed := case kind
    when 'create' then array['id','name','entityType','categories','contacts','sites','research','sourceTags']
    when 'fields' then array['name','entityType','categories','contacts','assignee']
    when 'site' then array['id','name','address','detail','lat','lon','coordinateStatus','operatingStatus',
      'source','coordinateSource','checkedAt','mapVisible','provider','sourceUrl']
    when 'research' then array['reason','popularityReason']
    when 'contacts' then array['phone','email','website','instagram','youtube','blog','links']
    when 'link' then array['label','url']
    else null end;
  if allowed is null then raise exception '지원하지 않는 입력 형식입니다.' using errcode = '22023'; end if;
  for k, v in select * from jsonb_each(doc) loop
    if not (k = any(allowed)) then
      raise exception '허용되지 않는 입력 항목: %', k using errcode = '22023';
    end if;
    if k in ('contacts') then
      perform public.songhyeon_shop_research_validate('contacts',v);
    elsif k in ('categories','sourceTags') then
      if jsonb_typeof(v) is distinct from 'array' then
        raise exception '분류는 목록이어야 합니다.' using errcode = '22023';
      end if;
      if jsonb_array_length(v)>100 or exists (
        select 1 from jsonb_array_elements(v) x where jsonb_typeof(x)<>'string' or length(x#>>'{}')>300
      ) then raise exception '분류 내용을 확인해 주세요.' using errcode = '22023'; end if;
    elsif k in ('sites','research','links') then
      if jsonb_typeof(v) is distinct from 'array' then
        raise exception '입력 항목은 목록이어야 합니다.' using errcode = '22023';
      end if;
      if jsonb_array_length(v) > (case when k='research' then 1 else 30 end) then
        raise exception '입력 항목이 너무 많습니다.' using errcode = '22023';
      end if;
      for entry in select * from jsonb_array_elements(v) loop
        perform public.songhyeon_shop_research_validate(
          case k when 'sites' then 'site' when 'links' then 'link' else 'research' end, entry);
      end loop;
    elsif k in ('lat','lon') then
      if jsonb_typeof(v) not in ('number','null') then
        raise exception '좌표는 숫자 또는 빈 값이어야 합니다.' using errcode = '22023';
      end if;
    elsif k='mapVisible' then
      if jsonb_typeof(v) is distinct from 'boolean' then
        raise exception '지도 표시 여부를 확인해 주세요.' using errcode = '22023';
      end if;
    else
      if jsonb_typeof(v) is distinct from 'string' and not
        (kind='site' and k in ('source','coordinateSource','checkedAt','provider','sourceUrl') and v='null'::jsonb)
      then raise exception '텍스트 입력을 확인해 주세요: %',k using errcode = '22023'; end if;
      if length(v#>>'{}')>12000 then raise exception '텍스트가 너무 깁니다.' using errcode = '22023'; end if;
      if k in ('url','website','instagram','youtube','blog','sourceUrl') and coalesce(v#>>'{}','')<>'' then
        if (v#>>'{}') !~ '^https?://[^[:space:]/@]+([/:?#]|$)' or (v#>>'{}') ~ '[[:space:]\\]' then
          raise exception '링크는 올바른 http/https 주소여야 합니다.' using errcode = '22023';
        end if;
      end if;
    end if;
  end loop;
  if kind in ('create','site') and (coalesce(doc->>'id','') !~ '^[A-Za-z0-9_.:-]{1,160}$') then
    raise exception 'ID 형식을 확인해 주세요.' using errcode = '22023';
  end if;
  if (kind='create' or (kind='fields' and doc?'name'))
    and (length(btrim(coalesce(doc->>'name','')))=0 or length(doc->>'name')>300) then
    raise exception '상점 이름을 입력해 주세요.' using errcode = '22023';
  end if;
  if kind='site' then
    if ((doc->>'lat') is null) <> ((doc->>'lon') is null)
      or abs((doc->>'lat')::numeric)>90 or abs((doc->>'lon')::numeric)>180 then
      raise exception '위도·경도 범위를 확인해 주세요.' using errcode = '22023';
    end if;
  end if;
end $$;
revoke all on function public.songhyeon_shop_research_validate(text,jsonb) from public, anon, authenticated;

create or replace function public.songhyeon_shop_research_state(include_seed boolean default false)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare actor jsonb; dataset public.songhyeon_shop_research_seed; events jsonb; latest bigint;
begin
  select jsonb_build_object('id',m.auth_id,'name',m.staff_name,'role','reviewer') into actor
  from public.songhyeon_members m where m.auth_id=auth.uid() and m.is_active limit 1;
  if actor is null then raise exception '활성 송현 멤버만 접근할 수 있습니다.' using errcode='42501'; end if;
  select * into dataset from public.songhyeon_shop_research_seed where id=1;
  if not found then raise exception '최초 상점 조사자료가 아직 등록되지 않았습니다.'; end if;
  select coalesce(jsonb_agg(e.event || jsonb_build_object('revision',e.revision) order by e.revision),'[]'::jsonb),
    coalesce(max(e.revision),0) into events, latest from public.songhyeon_shop_research_events e;
  return jsonb_build_object('events',events,'revision',latest,'session',actor,
    'mode','shared','seedHash',dataset.seed_hash) ||
    case when include_seed then jsonb_build_object('seed',dataset.document) else '{}'::jsonb end;
end $$;
revoke all on function public.songhyeon_shop_research_state(boolean) from public, anon, authenticated;
grant execute on function public.songhyeon_shop_research_state(boolean) to authenticated;

create or replace function public.songhyeon_shop_research_save(request jsonb, expected_seed_hash text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  actor jsonb; uid uuid := auth.uid(); actor_name text;
  event_type text := request->>'type'; eid text := request->>'entityId';
  cid text := request->>'clientEventId'; payload jsonb := request->'payload';
  original public.songhyeon_shop_research_events;
  entity public.songhyeon_shop_research_entities;
  event_id uuid := gen_random_uuid(); saved_at timestamptz := clock_timestamp();
  saved_event jsonb; rev bigint; site jsonb; research jsonb; site_owner text; current_hash text;
begin
  select m.staff_name into actor_name from public.songhyeon_members m
    where m.auth_id=uid and m.is_active limit 1;
  if actor_name is null then raise exception '활성 송현 멤버만 저장할 수 있습니다.' using errcode='42501'; end if;
  actor := jsonb_build_object('id',uid,'name',actor_name,'role','reviewer');
  if jsonb_typeof(request) is distinct from 'object' or octet_length(request::text)>65536
    or exists(select 1 from jsonb_object_keys(request) k where k not in ('type','entityId','payload','clientEventId'))
    or jsonb_typeof(payload) is distinct from 'object'
    or coalesce(eid,'') !~ '^[A-Za-z0-9_.:-]{1,160}$'
    or coalesce(cid,'') !~ '^[A-Za-z0-9_.:-]{1,160}$' then
    raise exception '저장 요청 형식을 확인해 주세요.' using errcode='22023';
  end if;
  if event_type is null or event_type not in ('entity.create','sheet.row.save','entity.delete','star.set') then
    raise exception '지원하지 않는 수정 요청입니다.' using errcode='22023';
  end if;
  -- One commit order for concurrent writers; also makes idempotent retry atomic.
  select seed_hash into current_hash from public.songhyeon_shop_research_seed where id=1 for update;
  if not found or expected_seed_hash is distinct from current_hash then
    raise exception '조사자료 버전이 다릅니다. 화면을 새로고침해 주세요.' using errcode='22023';
  end if;
  select * into original from public.songhyeon_shop_research_events
    where actor_id=uid and client_event_id=cid;
  if found then
    if original.request <> request then
      raise exception '같은 저장 요청 ID에 다른 내용이 전달되었습니다.' using errcode='22023';
    end if;
    return jsonb_build_object('event',original.event || jsonb_build_object('revision',original.revision),'revision',original.revision);
  end if;
  select * into entity from public.songhyeon_shop_research_entities where id=eid;
  if event_type='entity.create' then
    if found then raise exception '이미 존재하는 상점 ID입니다.' using errcode='23505'; end if;
    perform public.songhyeon_shop_research_validate('create',payload);
    if payload->>'id' is distinct from eid then raise exception '상점 ID가 일치하지 않습니다.' using errcode='22023'; end if;
    insert into public.songhyeon_shop_research_entities(id,created_by) values(eid,uid);
    for site in select * from jsonb_array_elements(coalesce(payload->'sites','[]'::jsonb)) loop
      insert into public.songhyeon_shop_research_sites(id,entity_id) values(site->>'id',eid);
    end loop;
    if jsonb_array_length(coalesce(payload->'research','[]'::jsonb))>0 then
      research := (payload->'research'->0) || jsonb_build_object('id',event_id::text || '-research','actor',actor,'createdAt',saved_at);
      payload := jsonb_set(payload,'{research}',jsonb_build_array(research));
    end if;
  else
    if not found or entity.deleted_at is not null then
      raise exception '상점이 없거나 삭제되었습니다.' using errcode='22023';
    end if;
    if event_type='entity.delete' then
      if entity.created_by is distinct from uid then
        raise exception '본인이 추가한 상점만 삭제할 수 있습니다.' using errcode='42501';
      end if;
      if payload<>'{}'::jsonb then raise exception '삭제 요청 형식이 올바르지 않습니다.' using errcode='22023'; end if;
      update public.songhyeon_shop_research_entities set deleted_at=saved_at,deleted_by=uid where id=eid;
    elsif event_type='star.set' then
      if jsonb_typeof(payload->'active') is distinct from 'boolean'
        or exists(select 1 from jsonb_object_keys(payload) k where k<>'active') then
        raise exception '저장 선택 형식이 올바르지 않습니다.' using errcode='22023';
      end if;
    else
      if payload='{}'::jsonb or exists(select 1 from jsonb_object_keys(payload) k where k not in ('fields','site','research')) then
        raise exception '행 수정 항목을 확인해 주세요.' using errcode='22023';
      end if;
      if payload?'fields' then perform public.songhyeon_shop_research_validate('fields',payload->'fields'); end if;
      if payload?'site' then
        site := payload->'site';
        perform public.songhyeon_shop_research_validate('site',site);
        select entity_id into site_owner from public.songhyeon_shop_research_sites where id=site->>'id';
        if found and site_owner<>eid then raise exception '다른 상점의 위치 ID입니다.' using errcode='22023'; end if;
        insert into public.songhyeon_shop_research_sites(id,entity_id) values(site->>'id',eid) on conflict(id) do nothing;
      end if;
      if payload?'research' then
        perform public.songhyeon_shop_research_validate('research',payload->'research');
        research := (payload->'research') || jsonb_build_object('id',event_id::text || '-research','actor',actor,'createdAt',saved_at);
        payload := jsonb_set(payload,'{research}',research);
      end if;
    end if;
  end if;
  saved_event := jsonb_build_object('id',event_id,'clientEventId',cid,'type',event_type,
    'entityId',eid,'payload',payload,'actor',actor,'createdAt',saved_at);
  insert into public.songhyeon_shop_research_events(id,actor_id,client_event_id,request,event)
    values(event_id,uid,cid,request,saved_event) returning revision into rev;
  return jsonb_build_object('event',saved_event || jsonb_build_object('revision',rev),'revision',rev);
end $$;
revoke all on function public.songhyeon_shop_research_save(jsonb,text) from public, anon, authenticated;
grant execute on function public.songhyeon_shop_research_save(jsonb,text) to authenticated;

notify pgrst, 'reload schema';
commit;
