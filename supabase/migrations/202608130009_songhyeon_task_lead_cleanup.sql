-- 송현 BID 통합업무 실행주관 명칭을 현행 조직명으로 흡수한다.
-- IOTA 원장과 테이블은 조회하거나 변경하지 않는다.

update public.songhyeon_tasks
set payload = jsonb_set(
      coalesce(payload, '{}'::jsonb),
      '{leadDept}',
      to_jsonb(
        case trim(coalesce(payload ->> 'leadDept', ''))
          when '기획추진실' then '기획추진센터'
          when '자산·현장 지원조직' then '자산·운영 담당조직'
          else trim(coalesce(payload ->> 'leadDept', ''))
        end
      ),
      true
    ),
    updated_at = now()
where trim(coalesce(payload ->> 'leadDept', '')) in ('기획추진실', '자산·현장 지원조직');

select payload ->> 'leadDept' as lead_department, count(*) as task_count
from public.songhyeon_tasks
group by payload ->> 'leadDept'
order by task_count desc, lead_department;
