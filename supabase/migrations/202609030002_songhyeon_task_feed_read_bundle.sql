-- Collapse the authenticated task-feed index from eight PostgREST round trips
-- into one RLS-protected read. The function is SECURITY INVOKER so every
-- underlying table continues to enforce the caller's existing feed visibility.

do $migration$
begin
  execute $function$
    create or replace function public.get_songhyeon_task_feed_bundle(
      filter_purpose text default null,
      filter_status text default null,
      filter_priority text default null
    )
    returns jsonb
    language sql
    stable
    security invoker
    set search_path = ''
    as $body$
      with visible_posts as materialized (
        select post.*
        from public.songhyeon_feed_posts post
        where (filter_purpose is null or post.purpose = filter_purpose)
          and (filter_status is null or post.status = filter_status)
          and (filter_priority is null or post.priority = filter_priority)
      )
      select jsonb_build_object(
        'posts', coalesce((
          select jsonb_agg(to_jsonb(post) order by post.work_date desc, post.created_at desc)
          from visible_posts post
        ), '[]'::jsonb),
        'taskLinks', coalesce((
          select jsonb_agg(to_jsonb(link) order by link.created_at)
          from public.songhyeon_feed_post_tasks link
          where exists (select 1 from visible_posts post where post.id = link.post_id)
        ), '[]'::jsonb),
        'stakeholders', coalesce((
          select jsonb_agg(to_jsonb(stakeholder) order by stakeholder.created_at)
          from public.songhyeon_feed_post_stakeholders stakeholder
          where exists (select 1 from visible_posts post where post.id = stakeholder.post_id)
        ), '[]'::jsonb),
        'permissions', coalesce((
          select jsonb_agg(to_jsonb(permission) order by permission.created_at)
          from public.songhyeon_feed_post_permissions permission
          where exists (select 1 from visible_posts post where post.id = permission.post_id)
        ), '[]'::jsonb),
        'mentions', coalesce((
          select jsonb_agg(to_jsonb(mention) order by mention.created_at)
          from public.songhyeon_feed_post_mentions mention
          where exists (select 1 from visible_posts post where post.id = mention.post_id)
        ), '[]'::jsonb),
        'attachments', coalesce((
          select jsonb_agg(to_jsonb(attachment) order by attachment.created_at)
          from public.songhyeon_feed_attachments attachment
          where exists (select 1 from visible_posts post where post.id = attachment.post_id)
        ), '[]'::jsonb),
        'comments', coalesce((
          select jsonb_agg(to_jsonb(comment) order by comment.created_at)
          from public.songhyeon_feed_comments comment
          where exists (select 1 from visible_posts post where post.id = comment.post_id)
        ), '[]'::jsonb),
        'reactions', coalesce((
          select jsonb_agg(to_jsonb(reaction) order by reaction.created_at)
          from public.songhyeon_feed_reactions reaction
          where exists (select 1 from visible_posts post where post.id = reaction.post_id)
        ), '[]'::jsonb)
      );
    $body$
  $function$;

  execute 'revoke all on function public.get_songhyeon_task_feed_bundle(text,text,text) from public, anon, authenticated';
  execute 'grant execute on function public.get_songhyeon_task_feed_bundle(text,text,text) to authenticated';

  perform pg_notify('pgrst', 'reload schema');
end
$migration$;
