# 송현 BID 데이터 경계

송현 BID는 IOTA와 동일한 Supabase 프로젝트에서 공통 사용자 계정과 외부파트너 기준정보만 공유합니다.
업무 데이터와 쓰기 권한은 `songhyeon_*` 객체로 격리합니다.

- Auth 사용자와 로그인 자격증명은 IOTA와 공유
- 외부파트너 기준정보는 `songhyeon_shared_stakeholders` 읽기 전용 뷰로만 조회
- IOTA 테이블에 대한 송현 코드의 직접 쓰기 금지
- 송현 업무·댓글·일정·감사 데이터는 `songhyeon_*` 테이블만 사용
- 송현 Storage를 사용할 경우 `songhyeon-` 접두사의 전용 버킷만 사용
- 프런트엔드는 `VITE_SONGHYEON_SUPABASE_URL`, `VITE_SONGHYEON_SUPABASE_ANON_KEY`만 사용
- 승인되지 않은 Supabase 프로젝트는 애플리케이션이 fail-closed로 차단

## 적용 순서

1. 승인된 공통 Supabase 프로젝트에 송현 마이그레이션만 적용
2. `songhyeon_members.auth_id`를 기존 공통 `auth.users.id`와 연결
3. `songhyeon_shared_stakeholders` 뷰에 `authenticated` SELECT만 허용
4. 저장소 루트의 `.env.songhyeon.example`을 참고해 `.env.local` 설정
5. 멤버·비멤버·관리자 계정으로 RLS 및 IOTA 쓰기 금지 경계 검증

Supabase Auth의 기존 Site URL은 변경하지 않고 송현 `/login` 주소만 Redirect URLs에 추가합니다.
