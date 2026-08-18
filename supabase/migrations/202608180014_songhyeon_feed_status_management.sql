-- Keep full post editing author-only while allowing the exact Songhyeon owner
-- to update only a post's workflow status.

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
set search_path = pg_catalog, public
as $$
declare
  current_user_id uuid := auth.uid();
  current_post public.songhyeon_feed_posts;
  updated public.songhyeon_feed_posts;
begin
  if not public.is_songhyeon_member() then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;

  select * into current_post
  from public.songhyeon_feed_posts
  where id = target_post_id
  for update;

  if not found then raise exception 'FEED_POST_NOT_FOUND' using errcode = 'P0002'; end if;
  if current_post.author_id is distinct from current_user_id then
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

create or replace function public.update_songhyeon_feed_post_status(
  target_post_id text,
  post_status text
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  current_user_id uuid := auth.uid();
  normalized_status text := btrim(post_status);
  updated public.songhyeon_feed_posts;
begin
  if current_user_id is null or not public.is_songhyeon_member() then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;
  if not public.is_songhyeon_feed_moderator(current_user_id) then
    raise exception 'SONGHYEON_FEED_STATUS_OWNER_REQUIRED' using errcode = '42501';
  end if;
  if normalized_status is null or normalized_status not in ('신규', '검토중', '진행중', '중단', '완료') then
    raise exception 'INVALID_FEED_STATUS' using errcode = '22023';
  end if;

  update public.songhyeon_feed_posts post
  set status = normalized_status,
      updated_at = now()
  where post.id = target_post_id
  returning post.* into updated;

  if not found then raise exception 'FEED_POST_NOT_FOUND' using errcode = 'P0002'; end if;
  return to_jsonb(updated);
end;
$$;

revoke all on function public.update_songhyeon_feed_post_status(text,text) from public, anon, authenticated;
grant execute on function public.update_songhyeon_feed_post_status(text,text) to authenticated;

notify pgrst, 'reload schema';
