-- Keep Lee Cheol-seung's Songhyeon organization label and title consistent.
update public.songhyeon_members
set group_name = '부문대표',
    title = '부문대표',
    roles = array['송현 BID TF', '부문대표'],
    updated_at = now()
where lower(btrim(email)) = 'ethan.lee@igisam.com'
  and staff_name = '이철승';

notify pgrst, 'reload schema';
