-- Fix comment/reply editing against the deployed no-argument membership helper.
-- Keep authorship checks and direct table UPDATE restrictions unchanged.

create or replace function public.update_songhyeon_task_comment(
  target_comment_id text,
  target_body text
)
returns public.songhyeon_task_comments
language plpgsql
security definer
set search_path = public
as $$
declare
  current_actor_id uuid := auth.uid();
  current_comment public.songhyeon_task_comments;
  cleaned_body text := btrim(coalesce(target_body, ''));
  edit_timestamp timestamptz := statement_timestamp();
begin
  if current_actor_id is null then
    raise exception 'AUTH_REQUIRED' using errcode = '42501';
  end if;

  if not public.is_songhyeon_member() then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;

  if cleaned_body = '' then
    raise exception 'COMMENT_BODY_REQUIRED' using errcode = '22023';
  end if;

  select comment.*
  into current_comment
  from public.songhyeon_task_comments comment
  where comment.id = target_comment_id
  for update;

  if not found then
    raise exception 'COMMENT_NOT_FOUND' using errcode = 'P0002';
  end if;

  if current_comment.author_id is distinct from current_actor_id then
    raise exception 'COMMENT_EDIT_FORBIDDEN' using errcode = '42501';
  end if;

  update public.songhyeon_task_comments comment
  set body = cleaned_body,
      updated_at = edit_timestamp,
      edited_at = edit_timestamp
  where comment.id = target_comment_id
  returning comment.* into current_comment;

  return current_comment;
end;
$$;

create or replace function public.update_songhyeon_task_reply(
  target_reply_id text,
  target_body text
)
returns public.songhyeon_task_comment_replies
language plpgsql
security definer
set search_path = public
as $$
declare
  current_actor_id uuid := auth.uid();
  current_reply public.songhyeon_task_comment_replies;
  cleaned_body text := btrim(coalesce(target_body, ''));
  edit_timestamp timestamptz := statement_timestamp();
begin
  if current_actor_id is null then
    raise exception 'AUTH_REQUIRED' using errcode = '42501';
  end if;

  if not public.is_songhyeon_member() then
    raise exception 'SONGHYEON_MEMBERSHIP_REQUIRED' using errcode = '42501';
  end if;

  if cleaned_body = '' then
    raise exception 'REPLY_BODY_REQUIRED' using errcode = '22023';
  end if;

  select reply.*
  into current_reply
  from public.songhyeon_task_comment_replies reply
  where reply.id = target_reply_id
  for update;

  if not found then
    raise exception 'REPLY_NOT_FOUND' using errcode = 'P0002';
  end if;

  if current_reply.author_id is distinct from current_actor_id then
    raise exception 'REPLY_EDIT_FORBIDDEN' using errcode = '42501';
  end if;

  update public.songhyeon_task_comment_replies reply
  set body = cleaned_body,
      updated_at = edit_timestamp,
      edited_at = edit_timestamp
  where reply.id = target_reply_id
  returning reply.* into current_reply;

  return current_reply;
end;
$$;

revoke all on function public.update_songhyeon_task_comment(text, text) from public, anon, authenticated;
grant execute on function public.update_songhyeon_task_comment(text, text) to authenticated;

revoke all on function public.update_songhyeon_task_reply(text, text) from public, anon, authenticated;
grant execute on function public.update_songhyeon_task_reply(text, text) to authenticated;
