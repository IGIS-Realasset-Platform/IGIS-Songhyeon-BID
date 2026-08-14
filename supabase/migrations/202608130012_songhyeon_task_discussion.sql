-- SONGHYEON BID task discussion only.
-- This migration intentionally creates and changes only Songhyeon operational objects.

-- Composite keys keep the denormalized task_source_key trustworthy for filtered realtime events.
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.songhyeon_task_comments'::regclass
      and conname = 'songhyeon_task_comments_id_task_key'
  ) then
    alter table public.songhyeon_task_comments
      add constraint songhyeon_task_comments_id_task_key unique (id, task_source_key);
  end if;
end;
$$;

create table if not exists public.songhyeon_task_comment_replies (
  id text primary key,
  comment_id text not null,
  task_source_key text not null,
  body text not null check (length(trim(body)) > 0),
  author_id uuid not null references auth.users(id) on delete restrict,
  author_name text not null check (length(trim(author_name)) > 0),
  author_email text not null check (author_email = lower(trim(author_email))),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint songhyeon_task_comment_replies_id_task_key unique (id, task_source_key),
  constraint songhyeon_task_comment_replies_comment_task_fk
    foreign key (comment_id, task_source_key)
    references public.songhyeon_task_comments(id, task_source_key)
    on update cascade on delete cascade
);

create table if not exists public.songhyeon_task_comment_reactions (
  comment_id text not null,
  task_source_key text not null,
  reaction_type text not null check (reaction_type in ('like', 'check')),
  reactor_id uuid not null references auth.users(id) on delete cascade,
  reactor_name text not null check (length(trim(reactor_name)) > 0),
  reactor_email text not null check (reactor_email = lower(trim(reactor_email))),
  created_at timestamptz not null default now(),
  primary key (comment_id, reaction_type, reactor_id),
  constraint songhyeon_task_comment_reactions_comment_task_fk
    foreign key (comment_id, task_source_key)
    references public.songhyeon_task_comments(id, task_source_key)
    on update cascade on delete cascade
);

create table if not exists public.songhyeon_task_reply_reactions (
  reply_id text not null,
  task_source_key text not null,
  reaction_type text not null check (reaction_type in ('like', 'check')),
  reactor_id uuid not null references auth.users(id) on delete cascade,
  reactor_name text not null check (length(trim(reactor_name)) > 0),
  reactor_email text not null check (reactor_email = lower(trim(reactor_email))),
  created_at timestamptz not null default now(),
  primary key (reply_id, reaction_type, reactor_id),
  constraint songhyeon_task_reply_reactions_reply_task_fk
    foreign key (reply_id, task_source_key)
    references public.songhyeon_task_comment_replies(id, task_source_key)
    on update cascade on delete cascade
);

alter table public.songhyeon_task_comment_replies enable row level security;
alter table public.songhyeon_task_comment_reactions enable row level security;
alter table public.songhyeon_task_reply_reactions enable row level security;

drop policy if exists "songhyeon members read task replies" on public.songhyeon_task_comment_replies;
create policy "songhyeon members read task replies"
on public.songhyeon_task_comment_replies
for select
to authenticated
using (public.is_songhyeon_member());

drop policy if exists "songhyeon members add own task replies" on public.songhyeon_task_comment_replies;
create policy "songhyeon members add own task replies"
on public.songhyeon_task_comment_replies
for insert
to authenticated
with check (
  public.is_songhyeon_member()
  and author_id = auth.uid()
  and exists (
    select 1
    from public.songhyeon_members member
    where member.auth_id = auth.uid()
      and member.is_active
      and member.staff_name = public.songhyeon_task_comment_replies.author_name
      and member.email = lower(trim(public.songhyeon_task_comment_replies.author_email))
  )
  and exists (
    select 1
    from public.songhyeon_task_comments comment
    where comment.id = public.songhyeon_task_comment_replies.comment_id
      and comment.task_source_key = public.songhyeon_task_comment_replies.task_source_key
  )
);

drop policy if exists "task reply authors delete replies" on public.songhyeon_task_comment_replies;
create policy "task reply authors delete replies"
on public.songhyeon_task_comment_replies
for delete
to authenticated
using (
  public.is_songhyeon_member()
  and (author_id = auth.uid() or public.is_songhyeon_admin())
);

drop policy if exists "songhyeon members read comment reactions" on public.songhyeon_task_comment_reactions;
create policy "songhyeon members read comment reactions"
on public.songhyeon_task_comment_reactions
for select
to authenticated
using (public.is_songhyeon_member());

drop policy if exists "songhyeon members read reply reactions" on public.songhyeon_task_reply_reactions;
create policy "songhyeon members read reply reactions"
on public.songhyeon_task_reply_reactions
for select
to authenticated
using (public.is_songhyeon_member());

-- Reactions are mutated only through the atomic functions below. Names and emails are
-- server-side snapshots of the active Songhyeon roster, never trusted client input.
create or replace function public.toggle_songhyeon_task_comment_reaction(
  target_comment_id text,
  target_reaction_type text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_reactor_id uuid := auth.uid();
  current_reactor_name text;
  current_reactor_email text;
  resolved_task_source_key text;
  reaction_is_active boolean;
  reaction_count bigint;
begin
  if current_reactor_id is null then
    raise exception 'AUTH_REQUIRED' using errcode = '42501';
  end if;

  if target_reaction_type is null or target_reaction_type not in ('like', 'check') then
    raise exception 'INVALID_REACTION_TYPE' using errcode = '22023';
  end if;

  select member.staff_name, member.email
  into current_reactor_name, current_reactor_email
  from public.songhyeon_members member
  where member.auth_id = current_reactor_id
    and member.is_active
  limit 1;

  if not found then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;

  -- Protect the parent from deletion while its reaction is toggled.
  select comment.task_source_key
  into resolved_task_source_key
  from public.songhyeon_task_comments comment
  where comment.id = target_comment_id
  for key share;

  if not found then
    raise exception 'COMMENT_NOT_FOUND' using errcode = 'P0002';
  end if;

  -- Serialize double-clicks and duplicate requests by the same reactor.
  perform pg_advisory_xact_lock(
    hashtextextended(
      concat_ws(chr(31), 'songhyeon-comment-reaction', target_comment_id, target_reaction_type, current_reactor_id::text),
      0
    )
  );

  delete from public.songhyeon_task_comment_reactions reaction
  where reaction.comment_id = target_comment_id
    and reaction.reaction_type = target_reaction_type
    and reaction.reactor_id = current_reactor_id;

  if found then
    reaction_is_active := false;
  else
    insert into public.songhyeon_task_comment_reactions (
      comment_id,
      task_source_key,
      reaction_type,
      reactor_id,
      reactor_name,
      reactor_email
    ) values (
      target_comment_id,
      resolved_task_source_key,
      target_reaction_type,
      current_reactor_id,
      current_reactor_name,
      current_reactor_email
    );
    reaction_is_active := true;
  end if;

  select count(*)
  into reaction_count
  from public.songhyeon_task_comment_reactions reaction
  where reaction.comment_id = target_comment_id
    and reaction.reaction_type = target_reaction_type;

  return jsonb_build_object(
    'commentId', target_comment_id,
    'reactionType', target_reaction_type,
    'active', reaction_is_active,
    'count', reaction_count,
    'reactorId', current_reactor_id,
    'reactorName', current_reactor_name,
    'reactorEmail', current_reactor_email
  );
end;
$$;

create or replace function public.toggle_songhyeon_task_reply_reaction(
  target_reply_id text,
  target_reaction_type text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_reactor_id uuid := auth.uid();
  current_reactor_name text;
  current_reactor_email text;
  resolved_task_source_key text;
  reaction_is_active boolean;
  reaction_count bigint;
begin
  if current_reactor_id is null then
    raise exception 'AUTH_REQUIRED' using errcode = '42501';
  end if;

  if target_reaction_type is null or target_reaction_type not in ('like', 'check') then
    raise exception 'INVALID_REACTION_TYPE' using errcode = '22023';
  end if;

  select member.staff_name, member.email
  into current_reactor_name, current_reactor_email
  from public.songhyeon_members member
  where member.auth_id = current_reactor_id
    and member.is_active
  limit 1;

  if not found then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;

  -- Protect the parent from deletion while its reaction is toggled.
  select reply.task_source_key
  into resolved_task_source_key
  from public.songhyeon_task_comment_replies reply
  where reply.id = target_reply_id
  for key share;

  if not found then
    raise exception 'REPLY_NOT_FOUND' using errcode = 'P0002';
  end if;

  perform pg_advisory_xact_lock(
    hashtextextended(
      concat_ws(chr(31), 'songhyeon-reply-reaction', target_reply_id, target_reaction_type, current_reactor_id::text),
      0
    )
  );

  delete from public.songhyeon_task_reply_reactions reaction
  where reaction.reply_id = target_reply_id
    and reaction.reaction_type = target_reaction_type
    and reaction.reactor_id = current_reactor_id;

  if found then
    reaction_is_active := false;
  else
    insert into public.songhyeon_task_reply_reactions (
      reply_id,
      task_source_key,
      reaction_type,
      reactor_id,
      reactor_name,
      reactor_email
    ) values (
      target_reply_id,
      resolved_task_source_key,
      target_reaction_type,
      current_reactor_id,
      current_reactor_name,
      current_reactor_email
    );
    reaction_is_active := true;
  end if;

  select count(*)
  into reaction_count
  from public.songhyeon_task_reply_reactions reaction
  where reaction.reply_id = target_reply_id
    and reaction.reaction_type = target_reaction_type;

  return jsonb_build_object(
    'replyId', target_reply_id,
    'reactionType', target_reaction_type,
    'active', reaction_is_active,
    'count', reaction_count,
    'reactorId', current_reactor_id,
    'reactorName', current_reactor_name,
    'reactorEmail', current_reactor_email
  );
end;
$$;

revoke all on table public.songhyeon_task_comment_replies from public, anon, authenticated;
grant select, insert, delete on table public.songhyeon_task_comment_replies to authenticated;

revoke all on table public.songhyeon_task_comment_reactions from public, anon, authenticated;
grant select on table public.songhyeon_task_comment_reactions to authenticated;

revoke all on table public.songhyeon_task_reply_reactions from public, anon, authenticated;
grant select on table public.songhyeon_task_reply_reactions to authenticated;

revoke all on function public.toggle_songhyeon_task_comment_reaction(text, text) from public, anon, authenticated;
grant execute on function public.toggle_songhyeon_task_comment_reaction(text, text) to authenticated;

revoke all on function public.toggle_songhyeon_task_reply_reaction(text, text) from public, anon, authenticated;
grant execute on function public.toggle_songhyeon_task_reply_reaction(text, text) to authenticated;

create index if not exists songhyeon_task_comment_replies_task_idx
  on public.songhyeon_task_comment_replies(task_source_key, created_at);
create index if not exists songhyeon_task_comment_replies_comment_idx
  on public.songhyeon_task_comment_replies(comment_id, created_at);
create index if not exists songhyeon_task_comment_reactions_task_idx
  on public.songhyeon_task_comment_reactions(task_source_key, comment_id, reaction_type, created_at);
create index if not exists songhyeon_task_comment_reactions_reactor_idx
  on public.songhyeon_task_comment_reactions(reactor_id, created_at desc);
create index if not exists songhyeon_task_reply_reactions_task_idx
  on public.songhyeon_task_reply_reactions(task_source_key, reply_id, reaction_type, created_at);
create index if not exists songhyeon_task_reply_reactions_reactor_idx
  on public.songhyeon_task_reply_reactions(reactor_id, created_at desc);

-- Full row images make task_source_key available to filtered realtime consumers on DELETE.
alter table public.songhyeon_task_comments replica identity full;
alter table public.songhyeon_task_comment_replies replica identity full;
alter table public.songhyeon_task_comment_reactions replica identity full;
alter table public.songhyeon_task_reply_reactions replica identity full;

-- Supabase creates this publication. Guard both its existence and table membership so
-- this migration remains safe to rerun and can also run in a plain PostgreSQL test DB.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'songhyeon_task_comments'
    ) then
      alter publication supabase_realtime add table public.songhyeon_task_comments;
    end if;

    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'songhyeon_task_comment_replies'
    ) then
      alter publication supabase_realtime add table public.songhyeon_task_comment_replies;
    end if;

    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'songhyeon_task_comment_reactions'
    ) then
      alter publication supabase_realtime add table public.songhyeon_task_comment_reactions;
    end if;

    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'songhyeon_task_reply_reactions'
    ) then
      alter publication supabase_realtime add table public.songhyeon_task_reply_reactions;
    end if;
  end if;
end;
$$;
