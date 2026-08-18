-- Allow an active Songhyeon member to edit only their own feed comment.

alter table public.songhyeon_feed_comments
  add column if not exists updated_at timestamptz;

update public.songhyeon_feed_comments
set updated_at = created_at
where updated_at is null;

alter table public.songhyeon_feed_comments
  alter column updated_at set default now(),
  alter column updated_at set not null;

create or replace function public.update_songhyeon_feed_comment(
  target_comment_id text,
  comment_body text
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  current_user_id uuid := auth.uid();
  target_comment public.songhyeon_feed_comments;
  normalized_body text := btrim(comment_body);
begin
  if current_user_id is null or not public.is_songhyeon_member() then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;
  if normalized_body is null or normalized_body = '' or char_length(normalized_body) > 10000 then
    raise exception 'INVALID_FEED_COMMENT_BODY' using errcode = '22023';
  end if;

  select comment.* into target_comment
  from public.songhyeon_feed_comments comment
  where comment.id = target_comment_id
  for update;

  if not found then
    raise exception 'FEED_COMMENT_NOT_FOUND' using errcode = 'P0002';
  end if;
  if target_comment.author_id is distinct from current_user_id then
    raise exception 'FEED_COMMENT_AUTHOR_REQUIRED' using errcode = '42501';
  end if;

  update public.songhyeon_feed_comments comment
  set body = normalized_body,
      updated_at = now()
  where comment.id = target_comment_id
  returning comment.* into target_comment;

  return to_jsonb(target_comment);
end;
$$;

create or replace view public.songhyeon_public_feed_comments
with (security_barrier = true, security_invoker = false)
as select
  comment.id, comment.post_id, comment.body, member.id as author_profile_id,
  comment.author_name, comment.author_group_name, comment.author_photo_path,
  comment.created_at, comment.updated_at
from public.songhyeon_feed_comments comment
join public.songhyeon_public_feed_posts post on post.id = comment.post_id
left join public.songhyeon_members member on member.id = comment.author_member_id and member.is_active;

revoke all on function public.update_songhyeon_feed_comment(text,text) from public, anon, authenticated;
grant execute on function public.update_songhyeon_feed_comment(text,text) to authenticated;

notify pgrst, 'reload schema';
