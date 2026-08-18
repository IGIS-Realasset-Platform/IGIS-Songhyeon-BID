-- Connect the newly supplied Songhyeon portraits to the live member directory.
-- These two exact roster entries are intentionally updated to the tracked assets.

update public.songhyeon_members as member
set photo_path = portrait.photo_path,
    updated_at = now()
from (
  values
    ('방채미', 'chaemi.bang@igisam.com', 'songhyeon-members/방채미.webp'),
    ('이지원', 'jiwon.lee@igisam.com', 'songhyeon-members/이지원.webp')
) as portrait(staff_name, email, photo_path)
where member.staff_name = portrait.staff_name
  and lower(member.email) = portrait.email;
