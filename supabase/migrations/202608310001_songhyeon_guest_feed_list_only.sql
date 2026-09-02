-- Guest users may browse the feed index, but feed bodies, task links, mentions,
-- attachments, and comment bodies remain available only to active members.

drop policy if exists "guests read public feed attachment objects" on storage.objects;

revoke all on function public.can_guest_read_songhyeon_feed_attachment(text)
  from public, anon, authenticated;

drop view if exists public.songhyeon_public_feed_post_tasks;
drop view if exists public.songhyeon_public_feed_post_mentions;
drop view if exists public.songhyeon_public_feed_attachments;
drop view if exists public.songhyeon_public_feed_comments;
drop view if exists public.songhyeon_public_feed_reactions;
drop view if exists public.songhyeon_public_feed_post_stakeholders;
drop view if exists public.songhyeon_public_feed_posts;

create view public.songhyeon_public_feed_posts
with (security_barrier = true, security_invoker = false)
as
select
  post.id,
  post.work_date,
  post.title,
  post.project_code,
  post.purpose,
  post.status,
  post.priority,
  post.input_status,
  post.source_system,
  member.id as author_profile_id,
  post.author_name,
  post.author_group_name,
  post.author_photo_path,
  post.created_at,
  post.updated_at
from public.songhyeon_feed_posts post
left join public.songhyeon_members member
  on member.id = post.author_member_id
 and member.is_active
where not exists (
  select 1
  from public.songhyeon_feed_post_permissions permission
  where permission.post_id = post.id
);

create view public.songhyeon_public_feed_post_stakeholders
with (security_barrier = true, security_invoker = false)
as
select
  stakeholder.post_id,
  stakeholder.company_name,
  stakeholder.contact_name,
  stakeholder.category,
  stakeholder.created_at
from public.songhyeon_feed_post_stakeholders stakeholder
join public.songhyeon_public_feed_posts post on post.id = stakeholder.post_id;

-- The index shows only the number of comments and the profile images of people
-- who reacted. No comment body or other detail content is exposed here.
create view public.songhyeon_public_feed_comments
with (security_barrier = true, security_invoker = false)
as
select
  comment.id,
  comment.post_id,
  member.id as author_profile_id,
  comment.author_name,
  comment.author_group_name,
  comment.author_photo_path,
  comment.created_at,
  coalesce(comment.updated_at, comment.created_at) as updated_at
from public.songhyeon_feed_comments comment
join public.songhyeon_public_feed_posts post on post.id = comment.post_id
left join public.songhyeon_members member
  on member.id = comment.author_member_id
 and member.is_active;

create view public.songhyeon_public_feed_reactions
with (security_barrier = true, security_invoker = false)
as
select
  reaction.id,
  reaction.post_id,
  reaction.comment_id,
  reaction.reaction_type,
  member.id as reactor_profile_id,
  reaction.reactor_name,
  reaction.reactor_group_name,
  reaction.reactor_photo_path,
  reaction.created_at
from public.songhyeon_feed_reactions reaction
join public.songhyeon_public_feed_posts post on post.id = reaction.post_id
left join public.songhyeon_members member
  on member.id = reaction.reactor_member_id
 and member.is_active;

revoke all on public.songhyeon_public_feed_posts from public, anon, authenticated;
revoke all on public.songhyeon_public_feed_post_stakeholders from public, anon, authenticated;
revoke all on public.songhyeon_public_feed_comments from public, anon, authenticated;
revoke all on public.songhyeon_public_feed_reactions from public, anon, authenticated;

grant select on public.songhyeon_public_feed_posts to anon;
grant select on public.songhyeon_public_feed_post_stakeholders to anon;
grant select on public.songhyeon_public_feed_comments to anon;
grant select on public.songhyeon_public_feed_reactions to anon;

notify pgrst, 'reload schema';
