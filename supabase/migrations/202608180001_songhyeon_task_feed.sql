-- Songhyeon BID task feed only. This migration is additive and never changes shared operational objects.
-- Depends on Songhyeon auth governance, task board, and guest read-only migrations.

create table if not exists public.songhyeon_feed_posts (
  id text primary key,
  work_date date not null default current_date,
  title text not null check (length(trim(title)) > 0),
  body text not null check (length(trim(body)) > 0),
  project_code text not null default 'SONGHYEON_BID',
  purpose text not null default '공유' check (purpose in ('공유', '협업', '리스크 판단', '의사결정')),
  status text not null default '검토중' check (status in ('신규', '검토중', '진행중', '중단', '완료')),
  priority text not null default '중간' check (priority in ('높음', '중간', '낮음')),
  input_status text not null default 'submitted' check (input_status = 'submitted'),
  source_system text not null default 'songhyeon_task_feed' check (source_system = 'songhyeon_task_feed'),
  author_member_id uuid not null references public.songhyeon_members(id) on delete restrict,
  author_id uuid not null references auth.users(id) on delete restrict,
  author_name text not null,
  author_email text not null check (author_email = lower(trim(author_email))),
  author_group_name text not null,
  author_photo_path text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.songhyeon_feed_post_tasks (
  post_id text not null references public.songhyeon_feed_posts(id) on update cascade on delete cascade,
  task_source_key text not null references public.songhyeon_tasks(source_key) on update cascade on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, task_source_key)
);

create table if not exists public.songhyeon_feed_post_stakeholders (
  post_id text primary key references public.songhyeon_feed_posts(id) on update cascade on delete cascade,
  company_name text not null default '',
  contact_name text not null default '',
  category text not null default '',
  created_at timestamptz not null default now(),
  check (length(trim(company_name)) > 0 or length(trim(contact_name)) > 0 or length(trim(category)) > 0)
);

create table if not exists public.songhyeon_feed_post_permissions (
  id uuid primary key default gen_random_uuid(),
  post_id text not null references public.songhyeon_feed_posts(id) on update cascade on delete cascade,
  grantee_type text not null check (grantee_type in ('group', 'member')),
  group_name text,
  member_id uuid references public.songhyeon_members(id) on delete cascade,
  created_at timestamptz not null default now(),
  check (
    (grantee_type = 'group' and length(trim(group_name)) > 0 and member_id is null)
    or (grantee_type = 'member' and group_name is null and member_id is not null)
  )
);

create unique index if not exists songhyeon_feed_permissions_group_unique
  on public.songhyeon_feed_post_permissions(post_id, group_name)
  where grantee_type = 'group';
create unique index if not exists songhyeon_feed_permissions_member_unique
  on public.songhyeon_feed_post_permissions(post_id, member_id)
  where grantee_type = 'member';

create table if not exists public.songhyeon_feed_post_mentions (
  id uuid primary key default gen_random_uuid(),
  post_id text not null references public.songhyeon_feed_posts(id) on update cascade on delete cascade,
  mention_type text not null check (mention_type in ('department', 'person')),
  label text not null check (length(trim(label)) > 0),
  member_id uuid references public.songhyeon_members(id) on delete set null,
  group_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.songhyeon_feed_attachments (
  id text primary key,
  post_id text not null references public.songhyeon_feed_posts(id) on update cascade on delete cascade,
  file_name text not null check (length(trim(file_name)) > 0),
  object_path text not null unique check (length(trim(object_path)) > 0),
  mime_type text not null default 'application/octet-stream',
  size_bytes bigint not null check (size_bytes >= 0 and size_bytes <= 52428800),
  uploaded_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.songhyeon_feed_comments (
  id text primary key,
  post_id text not null references public.songhyeon_feed_posts(id) on update cascade on delete cascade,
  body text not null check (length(trim(body)) > 0),
  author_member_id uuid not null references public.songhyeon_members(id) on delete restrict,
  author_id uuid not null references auth.users(id) on delete restrict,
  author_name text not null,
  author_email text not null check (author_email = lower(trim(author_email))),
  author_group_name text not null,
  author_photo_path text not null default '',
  created_at timestamptz not null default now(),
  constraint songhyeon_feed_comments_id_post_key unique (id, post_id)
);

create table if not exists public.songhyeon_feed_reactions (
  id uuid primary key default gen_random_uuid(),
  post_id text not null references public.songhyeon_feed_posts(id) on update cascade on delete cascade,
  comment_id text,
  reaction_type text not null check (reaction_type in ('like', 'check')),
  reactor_member_id uuid not null references public.songhyeon_members(id) on delete restrict,
  reactor_id uuid not null references auth.users(id) on delete cascade,
  reactor_name text not null,
  reactor_email text not null check (reactor_email = lower(trim(reactor_email))),
  reactor_group_name text not null,
  reactor_photo_path text not null default '',
  created_at timestamptz not null default now(),
  constraint songhyeon_feed_reactions_comment_post_fk
    foreign key (comment_id, post_id)
    references public.songhyeon_feed_comments(id, post_id)
    on update cascade on delete cascade
);

create unique index if not exists songhyeon_feed_post_reactions_unique
  on public.songhyeon_feed_reactions(post_id, reaction_type, reactor_id)
  where comment_id is null;
create unique index if not exists songhyeon_feed_comment_reactions_unique
  on public.songhyeon_feed_reactions(comment_id, reaction_type, reactor_id)
  where comment_id is not null;

create index if not exists songhyeon_feed_posts_order_idx
  on public.songhyeon_feed_posts(work_date desc, created_at desc);
create index if not exists songhyeon_feed_posts_filter_idx
  on public.songhyeon_feed_posts(project_code, purpose, status, priority);
create index if not exists songhyeon_feed_post_tasks_task_idx
  on public.songhyeon_feed_post_tasks(task_source_key, created_at desc);
create index if not exists songhyeon_feed_comments_post_idx
  on public.songhyeon_feed_comments(post_id, created_at);
create index if not exists songhyeon_feed_reactions_post_idx
  on public.songhyeon_feed_reactions(post_id, comment_id, reaction_type, created_at);
create index if not exists songhyeon_feed_permissions_post_idx
  on public.songhyeon_feed_post_permissions(post_id, grantee_type);

alter table public.songhyeon_feed_posts enable row level security;
alter table public.songhyeon_feed_post_tasks enable row level security;
alter table public.songhyeon_feed_post_stakeholders enable row level security;
alter table public.songhyeon_feed_post_permissions enable row level security;
alter table public.songhyeon_feed_post_mentions enable row level security;
alter table public.songhyeon_feed_attachments enable row level security;
alter table public.songhyeon_feed_comments enable row level security;
alter table public.songhyeon_feed_reactions enable row level security;

create or replace function public.is_songhyeon_feed_moderator(target_user uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.songhyeon_members member
    where member.auth_id = target_user
      and member.is_active
      and member.staff_name = '전기영'
      and member.email = 'jk.jeon@igisam.com'
  );
$$;

create or replace function public.can_read_songhyeon_feed_post(
  target_post_id text,
  target_user uuid default auth.uid()
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.songhyeon_feed_posts post
    where post.id = target_post_id
      and (
        not exists (
          select 1 from public.songhyeon_feed_post_permissions permission
          where permission.post_id = post.id
        )
        or post.author_id = target_user
        or public.is_songhyeon_feed_moderator(target_user)
        or exists (
          select 1
          from public.songhyeon_members viewer
          join public.songhyeon_feed_post_permissions permission
            on permission.post_id = post.id
           and (
             (permission.grantee_type = 'member' and permission.member_id = viewer.id)
             or (permission.grantee_type = 'group' and permission.group_name = viewer.group_name)
           )
          where viewer.auth_id = target_user and viewer.is_active
        )
      )
  );
$$;

create or replace function public.can_guest_read_songhyeon_feed_attachment(target_object_path text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.songhyeon_feed_attachments attachment
    where attachment.object_path = target_object_path
      and not exists (
        select 1
        from public.songhyeon_feed_post_permissions permission
        where permission.post_id = attachment.post_id
      )
  );
$$;

drop policy if exists "songhyeon members read feed posts" on public.songhyeon_feed_posts;
create policy "songhyeon members read feed posts" on public.songhyeon_feed_posts
  for select to authenticated
  using (public.is_songhyeon_member() and public.can_read_songhyeon_feed_post(id));

drop policy if exists "songhyeon members read feed task links" on public.songhyeon_feed_post_tasks;
create policy "songhyeon members read feed task links" on public.songhyeon_feed_post_tasks
  for select to authenticated
  using (public.is_songhyeon_member() and public.can_read_songhyeon_feed_post(post_id));

drop policy if exists "songhyeon members read feed stakeholders" on public.songhyeon_feed_post_stakeholders;
create policy "songhyeon members read feed stakeholders" on public.songhyeon_feed_post_stakeholders
  for select to authenticated
  using (public.is_songhyeon_member() and public.can_read_songhyeon_feed_post(post_id));

drop policy if exists "songhyeon members read feed permissions" on public.songhyeon_feed_post_permissions;
create policy "songhyeon members read feed permissions" on public.songhyeon_feed_post_permissions
  for select to authenticated
  using (public.is_songhyeon_member() and public.can_read_songhyeon_feed_post(post_id));

drop policy if exists "songhyeon members read feed mentions" on public.songhyeon_feed_post_mentions;
create policy "songhyeon members read feed mentions" on public.songhyeon_feed_post_mentions
  for select to authenticated
  using (public.is_songhyeon_member() and public.can_read_songhyeon_feed_post(post_id));

drop policy if exists "songhyeon members read feed attachments" on public.songhyeon_feed_attachments;
create policy "songhyeon members read feed attachments" on public.songhyeon_feed_attachments
  for select to authenticated
  using (public.is_songhyeon_member() and public.can_read_songhyeon_feed_post(post_id));

drop policy if exists "songhyeon members read feed comments" on public.songhyeon_feed_comments;
create policy "songhyeon members read feed comments" on public.songhyeon_feed_comments
  for select to authenticated
  using (public.is_songhyeon_member() and public.can_read_songhyeon_feed_post(post_id));

drop policy if exists "songhyeon members read feed reactions" on public.songhyeon_feed_reactions;
create policy "songhyeon members read feed reactions" on public.songhyeon_feed_reactions
  for select to authenticated
  using (public.is_songhyeon_member() and public.can_read_songhyeon_feed_post(post_id));

-- Every mutation below derives the active author snapshot from the Songhyeon roster.
create or replace function public.create_songhyeon_feed_post(
  post_id text,
  post_work_date date,
  post_title text,
  post_body text,
  post_project_code text,
  post_purpose text,
  post_status text,
  post_priority text,
  post_task_source_keys text[] default '{}'::text[],
  post_stakeholder jsonb default '{}'::jsonb,
  post_permissions jsonb default '{}'::jsonb,
  post_mentions jsonb default '[]'::jsonb,
  post_attachments jsonb default '[]'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  current_member public.songhyeon_members;
  created public.songhyeon_feed_posts;
begin
  if current_user_id is null then raise exception 'AUTH_REQUIRED' using errcode = '42501'; end if;
  select * into current_member from public.songhyeon_members member
  where member.auth_id = current_user_id and member.is_active limit 1;
  if not found then raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501'; end if;
  if length(trim(coalesce(post_id, ''))) = 0 then raise exception 'INVALID_POST_ID' using errcode = '22023'; end if;

  insert into public.songhyeon_feed_posts (
    id, work_date, title, body, project_code, purpose, status, priority,
    author_member_id, author_id, author_name, author_email, author_group_name, author_photo_path
  ) values (
    post_id, coalesce(post_work_date, current_date), trim(post_title), trim(post_body),
    coalesce(nullif(trim(post_project_code), ''), 'SONGHYEON_BID'), post_purpose, post_status, post_priority,
    current_member.id, current_user_id, current_member.staff_name, current_member.email,
    current_member.group_name, current_member.photo_path
  ) returning * into created;

  insert into public.songhyeon_feed_post_tasks(post_id, task_source_key)
  select post_id, key from (
    select distinct trim(value) as key from unnest(coalesce(post_task_source_keys, '{}'::text[])) value
  ) task_keys where length(key) > 0;

  if length(trim(coalesce(post_stakeholder->>'companyName', ''))) > 0
     or length(trim(coalesce(post_stakeholder->>'contactName', ''))) > 0
     or length(trim(coalesce(post_stakeholder->>'category', ''))) > 0 then
    insert into public.songhyeon_feed_post_stakeholders(post_id, company_name, contact_name, category)
    values (
      post_id,
      trim(coalesce(post_stakeholder->>'companyName', '')),
      trim(coalesce(post_stakeholder->>'contactName', '')),
      trim(coalesce(post_stakeholder->>'category', ''))
    );
  end if;

  insert into public.songhyeon_feed_post_permissions(post_id, grantee_type, group_name)
  select post_id, 'group', group_name
  from (
    select distinct trim(value) as group_name
    from jsonb_array_elements_text(coalesce(post_permissions->'groups', '[]'::jsonb)) value
  ) groups where length(group_name) > 0;

  insert into public.songhyeon_feed_post_permissions(post_id, grantee_type, member_id)
  select post_id, 'member', member.id
  from (
    select distinct value::uuid as member_id
    from jsonb_array_elements_text(coalesce(post_permissions->'memberIds', '[]'::jsonb)) value
  ) permitted
  join public.songhyeon_members member on member.id = permitted.member_id and member.is_active;

  insert into public.songhyeon_feed_post_mentions(post_id, mention_type, label, member_id, group_name)
  select
    post_id,
    case when mention->>'type' = 'department' then 'department' else 'person' end,
    trim(mention->>'label'),
    case when nullif(mention->>'memberId', '') is null then null else (mention->>'memberId')::uuid end,
    nullif(trim(coalesce(mention->>'groupName', '')), '')
  from jsonb_array_elements(coalesce(post_mentions, '[]'::jsonb)) mention
  where length(trim(coalesce(mention->>'label', ''))) > 0;

  insert into public.songhyeon_feed_attachments(
    id, post_id, file_name, object_path, mime_type, size_bytes, uploaded_by
  )
  select
    coalesce(nullif(trim(attachment->>'id'), ''), 'feed-attachment-' || gen_random_uuid()::text),
    post_id,
    trim(attachment->>'name'),
    trim(attachment->>'path'),
    coalesce(nullif(trim(attachment->>'mimeType'), ''), 'application/octet-stream'),
    coalesce((attachment->>'size')::bigint, 0),
    current_user_id
  from jsonb_array_elements(coalesce(post_attachments, '[]'::jsonb)) attachment
  where length(trim(coalesce(attachment->>'name', ''))) > 0
    and trim(coalesce(attachment->>'path', '')) like current_user_id::text || '/%';

  return to_jsonb(created);
end;
$$;

create or replace function public.update_songhyeon_feed_post(
  target_post_id text,
  post_work_date date,
  post_title text,
  post_body text,
  post_project_code text,
  post_purpose text,
  post_status text,
  post_priority text,
  post_task_source_keys text[] default '{}'::text[],
  post_stakeholder jsonb default '{}'::jsonb,
  post_permissions jsonb default '{}'::jsonb,
  post_mentions jsonb default '[]'::jsonb,
  post_attachments jsonb default '[]'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  current_post public.songhyeon_feed_posts;
  updated public.songhyeon_feed_posts;
begin
  if not public.is_songhyeon_member() then raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501'; end if;
  select * into current_post from public.songhyeon_feed_posts where id = target_post_id for update;
  if not found then raise exception 'FEED_POST_NOT_FOUND' using errcode = 'P0002'; end if;
  if current_post.author_id <> current_user_id then
    raise exception 'FEED_POST_AUTHOR_REQUIRED' using errcode = '42501';
  end if;

  update public.songhyeon_feed_posts set
    work_date = coalesce(post_work_date, work_date),
    title = trim(post_title), body = trim(post_body),
    project_code = coalesce(nullif(trim(post_project_code), ''), 'SONGHYEON_BID'),
    purpose = post_purpose, status = post_status, priority = post_priority, updated_at = now()
  where id = target_post_id returning * into updated;

  delete from public.songhyeon_feed_post_tasks where post_id = target_post_id;
  insert into public.songhyeon_feed_post_tasks(post_id, task_source_key)
  select target_post_id, key from (
    select distinct trim(value) as key from unnest(coalesce(post_task_source_keys, '{}'::text[])) value
  ) task_keys where length(key) > 0;

  delete from public.songhyeon_feed_post_stakeholders where post_id = target_post_id;
  if length(trim(coalesce(post_stakeholder->>'companyName', ''))) > 0
     or length(trim(coalesce(post_stakeholder->>'contactName', ''))) > 0
     or length(trim(coalesce(post_stakeholder->>'category', ''))) > 0 then
    insert into public.songhyeon_feed_post_stakeholders(post_id, company_name, contact_name, category)
    values (
      target_post_id,
      trim(coalesce(post_stakeholder->>'companyName', '')),
      trim(coalesce(post_stakeholder->>'contactName', '')),
      trim(coalesce(post_stakeholder->>'category', ''))
    );
  end if;

  delete from public.songhyeon_feed_post_permissions where post_id = target_post_id;
  insert into public.songhyeon_feed_post_permissions(post_id, grantee_type, group_name)
  select target_post_id, 'group', group_name
  from (
    select distinct trim(value) as group_name
    from jsonb_array_elements_text(coalesce(post_permissions->'groups', '[]'::jsonb)) value
  ) groups where length(group_name) > 0;
  insert into public.songhyeon_feed_post_permissions(post_id, grantee_type, member_id)
  select target_post_id, 'member', member.id
  from (
    select distinct value::uuid as member_id
    from jsonb_array_elements_text(coalesce(post_permissions->'memberIds', '[]'::jsonb)) value
  ) permitted
  join public.songhyeon_members member on member.id = permitted.member_id and member.is_active;

  delete from public.songhyeon_feed_post_mentions where post_id = target_post_id;
  insert into public.songhyeon_feed_post_mentions(post_id, mention_type, label, member_id, group_name)
  select
    target_post_id,
    case when mention->>'type' = 'department' then 'department' else 'person' end,
    trim(mention->>'label'),
    case when nullif(mention->>'memberId', '') is null then null else (mention->>'memberId')::uuid end,
    nullif(trim(coalesce(mention->>'groupName', '')), '')
  from jsonb_array_elements(coalesce(post_mentions, '[]'::jsonb)) mention
  where length(trim(coalesce(mention->>'label', ''))) > 0;

  delete from public.songhyeon_feed_attachments where post_id = target_post_id;
  insert into public.songhyeon_feed_attachments(
    id, post_id, file_name, object_path, mime_type, size_bytes, uploaded_by
  )
  select
    coalesce(nullif(trim(attachment->>'id'), ''), 'feed-attachment-' || gen_random_uuid()::text),
    target_post_id,
    trim(attachment->>'name'), trim(attachment->>'path'),
    coalesce(nullif(trim(attachment->>'mimeType'), ''), 'application/octet-stream'),
    coalesce((attachment->>'size')::bigint, 0), current_post.author_id
  from jsonb_array_elements(coalesce(post_attachments, '[]'::jsonb)) attachment
  where length(trim(coalesce(attachment->>'name', ''))) > 0
    and trim(coalesce(attachment->>'path', '')) like current_post.author_id::text || '/%';

  return to_jsonb(updated);
end;
$$;

create or replace function public.delete_songhyeon_feed_post(target_post_id text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  target_author_id uuid;
begin
  if not public.is_songhyeon_member() then raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501'; end if;
  select author_id into target_author_id from public.songhyeon_feed_posts where id = target_post_id for update;
  if not found then raise exception 'FEED_POST_NOT_FOUND' using errcode = 'P0002'; end if;
  if target_author_id <> current_user_id and not public.is_songhyeon_feed_moderator(current_user_id) then
    raise exception 'FEED_POST_AUTHOR_REQUIRED' using errcode = '42501';
  end if;
  delete from public.songhyeon_feed_posts where id = target_post_id;
  return target_post_id;
end;
$$;

create or replace function public.add_songhyeon_feed_comment(target_post_id text, comment_body text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  current_member public.songhyeon_members;
  created public.songhyeon_feed_comments;
begin
  select * into current_member from public.songhyeon_members member
  where member.auth_id = current_user_id and member.is_active limit 1;
  if not found then raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501'; end if;
  if not public.can_read_songhyeon_feed_post(target_post_id, current_user_id) then
    raise exception 'FEED_POST_ACCESS_REQUIRED' using errcode = '42501';
  end if;
  insert into public.songhyeon_feed_comments(
    id, post_id, body, author_member_id, author_id, author_name, author_email,
    author_group_name, author_photo_path
  ) values (
    'feed-comment-' || gen_random_uuid()::text, target_post_id, trim(comment_body),
    current_member.id, current_user_id, current_member.staff_name, current_member.email,
    current_member.group_name, current_member.photo_path
  ) returning * into created;
  return to_jsonb(created);
end;
$$;

create or replace function public.delete_songhyeon_feed_comment(target_comment_id text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  target_author_id uuid;
begin
  if not public.is_songhyeon_member() then raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501'; end if;
  select author_id into target_author_id from public.songhyeon_feed_comments where id = target_comment_id for update;
  if not found then raise exception 'FEED_COMMENT_NOT_FOUND' using errcode = 'P0002'; end if;
  if target_author_id <> current_user_id and not public.is_songhyeon_feed_moderator(current_user_id) then
    raise exception 'FEED_COMMENT_AUTHOR_REQUIRED' using errcode = '42501';
  end if;
  delete from public.songhyeon_feed_comments where id = target_comment_id;
  return target_comment_id;
end;
$$;

create or replace function public.toggle_songhyeon_feed_reaction(
  target_post_id text,
  target_reaction_type text,
  target_comment_id text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  current_member public.songhyeon_members;
  reaction_is_active boolean;
  reaction_count bigint;
begin
  if target_reaction_type not in ('like', 'check') then raise exception 'INVALID_REACTION_TYPE' using errcode = '22023'; end if;
  select * into current_member from public.songhyeon_members member
  where member.auth_id = current_user_id and member.is_active limit 1;
  if not found then raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501'; end if;
  if not public.can_read_songhyeon_feed_post(target_post_id, current_user_id) then
    raise exception 'FEED_POST_ACCESS_REQUIRED' using errcode = '42501';
  end if;
  if target_comment_id is not null and not exists (
    select 1 from public.songhyeon_feed_comments comment
    where comment.id = target_comment_id and comment.post_id = target_post_id
  ) then raise exception 'FEED_COMMENT_NOT_FOUND' using errcode = 'P0002'; end if;

  perform pg_advisory_xact_lock(hashtextextended(concat_ws(chr(31), target_post_id, target_comment_id, target_reaction_type, current_user_id::text), 0));
  delete from public.songhyeon_feed_reactions reaction
  where reaction.post_id = target_post_id
    and reaction.comment_id is not distinct from target_comment_id
    and reaction.reaction_type = target_reaction_type
    and reaction.reactor_id = current_user_id;
  if found then reaction_is_active := false;
  else
    insert into public.songhyeon_feed_reactions(
      post_id, comment_id, reaction_type, reactor_member_id, reactor_id, reactor_name,
      reactor_email, reactor_group_name, reactor_photo_path
    ) values (
      target_post_id, target_comment_id, target_reaction_type, current_member.id,
      current_user_id, current_member.staff_name, current_member.email,
      current_member.group_name, current_member.photo_path
    );
    reaction_is_active := true;
  end if;

  select count(*) into reaction_count from public.songhyeon_feed_reactions reaction
  where reaction.post_id = target_post_id
    and reaction.comment_id is not distinct from target_comment_id
    and reaction.reaction_type = target_reaction_type;
  return jsonb_build_object(
    'postId', target_post_id, 'commentId', target_comment_id,
    'reactionType', target_reaction_type, 'active', reaction_is_active, 'count', reaction_count
  );
end;
$$;

-- Guest projections expose only posts with no group/member visibility restriction.
create or replace view public.songhyeon_public_feed_posts
with (security_barrier = true, security_invoker = false)
as
select
  post.id, post.work_date, post.title, post.body, post.project_code, post.purpose,
  post.status, post.priority, post.input_status, post.source_system,
  member.id as author_profile_id, post.author_name, post.author_group_name,
  post.author_photo_path, post.created_at, post.updated_at
from public.songhyeon_feed_posts post
left join public.songhyeon_members member on member.id = post.author_member_id and member.is_active
where not exists (
  select 1 from public.songhyeon_feed_post_permissions permission where permission.post_id = post.id
);

create or replace view public.songhyeon_public_feed_post_tasks
with (security_barrier = true, security_invoker = false)
as select link.post_id, link.task_source_key, link.created_at
from public.songhyeon_feed_post_tasks link
join public.songhyeon_public_feed_posts post on post.id = link.post_id;

create or replace view public.songhyeon_public_feed_post_stakeholders
with (security_barrier = true, security_invoker = false)
as select stakeholder.post_id, stakeholder.company_name, stakeholder.contact_name,
  stakeholder.category, stakeholder.created_at
from public.songhyeon_feed_post_stakeholders stakeholder
join public.songhyeon_public_feed_posts post on post.id = stakeholder.post_id;

create or replace view public.songhyeon_public_feed_post_mentions
with (security_barrier = true, security_invoker = false)
as select mention.id, mention.post_id, mention.mention_type, mention.label,
  member.id as mentioned_profile_id, mention.group_name, mention.created_at
from public.songhyeon_feed_post_mentions mention
join public.songhyeon_public_feed_posts post on post.id = mention.post_id
left join public.songhyeon_members member on member.id = mention.member_id and member.is_active;

create or replace view public.songhyeon_public_feed_attachments
with (security_barrier = true, security_invoker = false)
as select attachment.id, attachment.post_id, attachment.file_name, attachment.object_path,
  attachment.mime_type, attachment.size_bytes, attachment.created_at
from public.songhyeon_feed_attachments attachment
join public.songhyeon_public_feed_posts post on post.id = attachment.post_id;

create or replace view public.songhyeon_public_feed_comments
with (security_barrier = true, security_invoker = false)
as select
  comment.id, comment.post_id, comment.body, member.id as author_profile_id,
  comment.author_name, comment.author_group_name, comment.author_photo_path, comment.created_at
from public.songhyeon_feed_comments comment
join public.songhyeon_public_feed_posts post on post.id = comment.post_id
left join public.songhyeon_members member on member.id = comment.author_member_id and member.is_active;

create or replace view public.songhyeon_public_feed_reactions
with (security_barrier = true, security_invoker = false)
as select
  reaction.id, reaction.post_id, reaction.comment_id, reaction.reaction_type,
  member.id as reactor_profile_id, reaction.reactor_name, reaction.reactor_group_name,
  reaction.reactor_photo_path, reaction.created_at
from public.songhyeon_feed_reactions reaction
join public.songhyeon_public_feed_posts post on post.id = reaction.post_id
left join public.songhyeon_members member on member.id = reaction.reactor_member_id and member.is_active;

revoke all on table public.songhyeon_feed_posts from public, anon, authenticated;
revoke all on table public.songhyeon_feed_post_tasks from public, anon, authenticated;
revoke all on table public.songhyeon_feed_post_stakeholders from public, anon, authenticated;
revoke all on table public.songhyeon_feed_post_permissions from public, anon, authenticated;
revoke all on table public.songhyeon_feed_post_mentions from public, anon, authenticated;
revoke all on table public.songhyeon_feed_attachments from public, anon, authenticated;
revoke all on table public.songhyeon_feed_comments from public, anon, authenticated;
revoke all on table public.songhyeon_feed_reactions from public, anon, authenticated;

grant select on table public.songhyeon_feed_posts to authenticated;
grant select on table public.songhyeon_feed_post_tasks to authenticated;
grant select on table public.songhyeon_feed_post_stakeholders to authenticated;
grant select on table public.songhyeon_feed_post_permissions to authenticated;
grant select on table public.songhyeon_feed_post_mentions to authenticated;
grant select on table public.songhyeon_feed_attachments to authenticated;
grant select on table public.songhyeon_feed_comments to authenticated;
grant select on table public.songhyeon_feed_reactions to authenticated;

revoke all on public.songhyeon_public_feed_posts from public, anon, authenticated;
revoke all on public.songhyeon_public_feed_post_tasks from public, anon, authenticated;
revoke all on public.songhyeon_public_feed_post_stakeholders from public, anon, authenticated;
revoke all on public.songhyeon_public_feed_post_mentions from public, anon, authenticated;
revoke all on public.songhyeon_public_feed_attachments from public, anon, authenticated;
revoke all on public.songhyeon_public_feed_comments from public, anon, authenticated;
revoke all on public.songhyeon_public_feed_reactions from public, anon, authenticated;

grant select on public.songhyeon_public_feed_posts to anon, authenticated;
grant select on public.songhyeon_public_feed_post_tasks to anon, authenticated;
grant select on public.songhyeon_public_feed_post_stakeholders to anon, authenticated;
grant select on public.songhyeon_public_feed_post_mentions to anon, authenticated;
grant select on public.songhyeon_public_feed_attachments to anon, authenticated;
grant select on public.songhyeon_public_feed_comments to anon, authenticated;
grant select on public.songhyeon_public_feed_reactions to anon, authenticated;

revoke all on function public.is_songhyeon_feed_moderator(uuid) from public, anon, authenticated;
revoke all on function public.can_read_songhyeon_feed_post(text, uuid) from public, anon, authenticated;
revoke all on function public.can_guest_read_songhyeon_feed_attachment(text) from public, anon, authenticated;
grant execute on function public.is_songhyeon_feed_moderator(uuid) to authenticated;
grant execute on function public.can_read_songhyeon_feed_post(text, uuid) to authenticated;
grant execute on function public.can_guest_read_songhyeon_feed_attachment(text) to anon, authenticated;

revoke all on function public.create_songhyeon_feed_post(text,date,text,text,text,text,text,text,text[],jsonb,jsonb,jsonb,jsonb) from public, anon, authenticated;
revoke all on function public.update_songhyeon_feed_post(text,date,text,text,text,text,text,text,text[],jsonb,jsonb,jsonb,jsonb) from public, anon, authenticated;
revoke all on function public.delete_songhyeon_feed_post(text) from public, anon, authenticated;
revoke all on function public.add_songhyeon_feed_comment(text,text) from public, anon, authenticated;
revoke all on function public.delete_songhyeon_feed_comment(text) from public, anon, authenticated;
revoke all on function public.toggle_songhyeon_feed_reaction(text,text,text) from public, anon, authenticated;
grant execute on function public.create_songhyeon_feed_post(text,date,text,text,text,text,text,text,text[],jsonb,jsonb,jsonb,jsonb) to authenticated;
grant execute on function public.update_songhyeon_feed_post(text,date,text,text,text,text,text,text,text[],jsonb,jsonb,jsonb,jsonb) to authenticated;
grant execute on function public.delete_songhyeon_feed_post(text) to authenticated;
grant execute on function public.add_songhyeon_feed_comment(text,text) to authenticated;
grant execute on function public.delete_songhyeon_feed_comment(text) to authenticated;
grant execute on function public.toggle_songhyeon_feed_reaction(text,text,text) to authenticated;

-- Private post attachments use the same 50 MB / signed-link workflow as the source board.
insert into storage.buckets (id, name, public, file_size_limit)
values ('songhyeon-feed-attachments', 'songhyeon-feed-attachments', false, 52428800)
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit;

drop policy if exists "songhyeon members upload feed attachments" on storage.objects;
create policy "songhyeon members upload feed attachments" on storage.objects
for insert to authenticated with check (
  bucket_id = 'songhyeon-feed-attachments'
  and public.is_songhyeon_member()
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "songhyeon members read feed attachment objects" on storage.objects;
create policy "songhyeon members read feed attachment objects" on storage.objects
for select to authenticated using (
  bucket_id = 'songhyeon-feed-attachments'
  and (
    (storage.foldername(name))[1] = auth.uid()::text
    or exists (
      select 1 from public.songhyeon_feed_attachments attachment
      where attachment.object_path = name
        and public.can_read_songhyeon_feed_post(attachment.post_id)
    )
  )
);

drop policy if exists "guests read public feed attachment objects" on storage.objects;
create policy "guests read public feed attachment objects" on storage.objects
for select to anon using (
  bucket_id = 'songhyeon-feed-attachments'
  and public.can_guest_read_songhyeon_feed_attachment(name)
);

drop policy if exists "feed attachment owners delete objects" on storage.objects;
create policy "feed attachment owners delete objects" on storage.objects
for delete to authenticated using (
  bucket_id = 'songhyeon-feed-attachments'
  and public.is_songhyeon_member()
  and (
    (storage.foldername(name))[1] = auth.uid()::text
    or public.is_songhyeon_feed_moderator()
  )
);
