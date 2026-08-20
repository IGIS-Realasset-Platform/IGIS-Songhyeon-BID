-- Attribute the two initial Data Room documents to their actual uploader.
-- Future documents already receive their author from auth.uid() through
-- set_songhyeon_data_room_author().

alter table public.songhyeon_data_room_documents
  disable trigger set_songhyeon_data_room_author;

update public.songhyeon_data_room_documents as document
set
  created_by = coalesce(document.created_by, author.auth_id),
  created_by_name = author.staff_name
from public.songhyeon_members as author
where document.id in (
    'SH-BID-PREREAD-260728',
    'SH-BID-STRATEGY-260811'
  )
  and lower(author.email) = 'jk.jeon@igisam.com'
  and author.staff_name = '전기영'
  and author.is_active;

alter table public.songhyeon_data_room_documents
  enable trigger set_songhyeon_data_room_author;

notify pgrst, 'reload schema';
