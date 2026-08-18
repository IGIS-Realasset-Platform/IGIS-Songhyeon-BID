-- Connect the tracked Songhyeon member portraits to the live member directory.
-- Existing custom photo paths are preserved, and members without a supplied portrait remain unchanged.

update public.songhyeon_members as member
set photo_path = portrait.photo_path
from (
  values
    ('이시정', 'songhyeon-members/이시정.webp'),
    ('이관용', 'songhyeon-members/이관용.webp'),
    ('전기영', 'songhyeon-members/전기영.webp'),
    ('김민지', 'songhyeon-members/김민지.webp'),
    ('고아라', 'songhyeon-members/고아라.webp'),
    ('김현수', 'songhyeon-members/김현수.webp'),
    ('이가현', 'songhyeon-members/이가현.webp'),
    ('정수명', 'songhyeon-members/정수명.webp'),
    ('임수빈', 'songhyeon-members/임수빈.webp')
) as portrait(staff_name, photo_path)
where member.staff_name = portrait.staff_name
  and trim(coalesce(member.photo_path, '')) = '';
