-- 송현 BID 통합업무 중요도를 핵심·중간·낮음으로 통일한다.
-- IOTA 원장과 테이블은 조회하거나 변경하지 않는다.

update public.songhyeon_tasks
set payload = jsonb_set(
      coalesce(payload, '{}'::jsonb),
      '{importanceLevel}',
      to_jsonb(
        case trim(coalesce(payload ->> 'importanceLevel', ''))
          when '핵심' then '핵심'
          when '주요' then '중간'
          when '중간' then '중간'
          when '일반' then '낮음'
          when '낮음' then '낮음'
          else '낮음'
        end
      ),
      true
    ),
    updated_at = now()
where payload ->> 'importanceLevel' is distinct from
      case trim(coalesce(payload ->> 'importanceLevel', ''))
        when '핵심' then '핵심'
        when '주요' then '중간'
        when '중간' then '중간'
        when '일반' then '낮음'
        when '낮음' then '낮음'
        else '낮음'
      end;

select payload ->> 'importanceLevel' as importance_level, count(*) as task_count
from public.songhyeon_tasks
group by payload ->> 'importanceLevel'
order by case payload ->> 'importanceLevel'
  when '핵심' then 1
  when '중간' then 2
  when '낮음' then 3
  else 4
end;
