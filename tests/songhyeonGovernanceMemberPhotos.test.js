import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const INTERNAL_PAGE = 'src/pages/governance/SonghyeonInternal.jsx';
const MEMBER_AVATAR = 'src/components/iota-songhyeon/SonghyeonMemberAvatar.jsx';

const read = (path) => readFile(path, 'utf8');

test('송현 Member DB 사진 경로는 공용 helper로 배포 루트 URL을 만든다', async () => {
  const [page, avatar] = await Promise.all([read(INTERNAL_PAGE), read(MEMBER_AVATAR)]);

  assert.match(
    page,
    /import\s+\{\s*songhyeonMemberPhotoSource\s*\}\s+from\s+['"][^'"]*SonghyeonMemberAvatar(?:\.jsx)?['"];/,
    '상대 DB 경로를 governance/internal 하위 URL로 해석하지 않도록 공용 경로 helper를 써야 합니다.',
  );
  assert.match(
    page,
    /photoPath:\s*songhyeonMemberPhotoSource\(\{[\s\S]{0,160}name:\s*row\.staff_name\s*\|\|\s*row\.name,[\s\S]{0,160}photoPath:\s*row\.photo_path\s*\|\|\s*row\.photoPath,[\s\S]{0,40}\}\)/,
    'DB 상대 경로와 이름 fallback을 normalize 단계에서 하나의 안전한 URL로 확정해야 합니다.',
  );

  assert.match(avatar, /const\s+withBaseUrl\s*=/);
  assert.match(avatar, /import\.meta\.env\.BASE_URL\s*\|\|\s*['"]\/['"]/);
  assert.ok(avatar.includes("replace(/^\\/+/, '')"), '선행 slash 유무와 무관하게 배포 루트 기준 URL을 만들어야 합니다.');
  assert.match(avatar, /\^\(\?:https\?:\|data:\|blob:\)/, '이미 완성된 외부·data·blob URL은 변형하지 않아야 합니다.');
  assert.match(avatar, /songhyeon-members\/\$\{encodeURIComponent\(memberName\)\}\.webp/);
});

test('송현 Member 사진 실패 시 이니셜을 유지하고 실패한 확대 이미지는 열지 않는다', async () => {
  const page = await read(INTERNAL_PAGE);

  assert.match(page, /const\s+\[failed,\s*setFailed\]\s*=\s*useState\(false\)/);
  assert.match(page, /member\.name\.slice\(-2\)/, '사진이 없는 멤버도 이름 이니셜을 보여야 합니다.');
  assert.match(page, /!failed\s*&&\s*member\.photoPath\s*&&\s*<img/);
  assert.match(page, /onError=\{\(\)\s*=>\s*setFailed\(true\)\}/);
  assert.match(page, /onMouseEnter=\{\(\)\s*=>\s*!failed\s*&&\s*onPreview\(member\)\}/);
  assert.match(page, /src=\{member\.photoPath\}/, '명단 사진은 normalize된 URL을 사용해야 합니다.');
  assert.match(page, /src=\{hoveredMember\.photoPath\}/, '확대 사진도 명단과 동일한 normalize URL을 사용해야 합니다.');
  assert.match(page, /src=\{hoveredMember\.photoPath\}[\s\S]{0,160}onError=\{\(\)\s*=>\s*setHoveredMember\(null\)\}/,
    '확대 이미지까지 실패하면 깨진 이미지 대신 확대를 닫아야 합니다.');
});

test('이름 fallback이 가리키는 송현 원본 인물사진 9개가 실제 배포 자산에 존재한다', async () => {
  const portraitNames = ['이시정', '이관용', '전기영', '김민지', '고아라', '김현수', '이가현', '정수명', '임수빈'];
  await Promise.all(portraitNames.map((name) => access(`public/songhyeon-members/${name}.webp`)));
});
