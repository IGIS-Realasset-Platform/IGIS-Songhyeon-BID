-- 송현 BID 초기계획 업무분류 직관화
-- 범위: 초기 계획서 기반 G0~G6 업무만 변경. 수동 등록 업무는 보존.

with mapped(source_key, category_main) as (
  values
    ('G0-WS01', '사례조사·현장질문'),
    ('G0-WS02', '자료전수조사'),
    ('G1-WS01', '이용자경험·문제도출'),
    ('G1-WS02', '현장 운영 관련'),
    ('G1-WS03', '기회영역'),
    ('G2-WS01', '서비스 가설설계'),
    ('G2-WS02', 'BID 공공가치'),
    ('G2-WS03', '서비스 가설설계'),
    ('G3-WS01', '운영모델·파트너 검토'),
    ('G3-WS02', '운영모델·파트너 검토'),
    ('G3-WS04', '최소실행조건 판단'),
    ('G4-WS01', '현장 실행안'),
    ('G4-WS02', '지원·운영조건'),
    ('G4-WS03', 'MVP 패키지'),
    ('G5-WS01', '실행 최종판단'),
    ('G5-WS02', '운영모델·파트너 검토'),
    ('G5-WS03', '현장 운영 관련'),
    ('G5-WS04', '공공정합성'),
    ('G6-WS01', '실증·평가')
), task_overrides(source_key, category_main) as (
  values
    ('G0-WS03-T01', '자료전수조사'),
    ('G0-WS03-T02', '자료전수조사'),
    ('G0-WS03-T03', '기회영역'),
    ('G3-WS03-T01', '공공정합성'),
    ('G3-WS03-T02', '지원·운영조건'),
    ('G3-WS03-T03', '공공정합성'),
    ('G3-WS03-T04', '공공정합성')
), resolved as (
  select
    t.source_key,
    coalesce(o.category_main, m.category_main) as category_main
  from public.songhyeon_tasks t
  left join task_overrides o on o.source_key = t.source_key
  left join mapped m on left(t.source_key, 7) = m.source_key
  where t.source_key ~ '^G[0-6]-WS[0-9]{2}-T[0-9]{2}$'
)
update public.songhyeon_tasks t
set payload = jsonb_set(t.payload, '{categoryMain}', to_jsonb(r.category_main), true),
    updated_at = now()
from resolved r
where t.source_key = r.source_key
  and r.category_main is not null
  and t.payload ->> 'categoryMain' is distinct from r.category_main;

-- 검증
select payload ->> 'categoryMain' as category_main, count(*) as task_count
from public.songhyeon_tasks
where source_key ~ '^G[0-6]-WS[0-9]{2}-T[0-9]{2}$'
group by payload ->> 'categoryMain'
order by payload ->> 'categoryMain';
