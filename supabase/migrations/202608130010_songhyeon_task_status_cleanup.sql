-- 송현 BID 통합업무 상태에서 지연을 제거하고 진행중으로 흡수한다.
-- IOTA 원장과 테이블은 조회하거나 변경하지 않는다.

update public.songhyeon_tasks
set payload = jsonb_set(coalesce(payload, '{}'::jsonb), '{status}', to_jsonb('진행중'::text), true),
    updated_at = now()
where trim(coalesce(payload ->> 'status', '')) = '지연';

select payload ->> 'status' as task_status, count(*) as task_count
from public.songhyeon_tasks
group by payload ->> 'status'
order by task_count desc, task_status;
