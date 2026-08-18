-- Correct the two junior TF member titles in the canonical roster.
update public.songhyeon_members
set title = '사원',
    updated_at = now()
where (staff_name = '방채미' and lower(email) = 'chaemi.bang@igisam.com')
   or (staff_name = '이지원' and lower(email) = 'jiwon.lee@igisam.com');
