import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Data Room은 문서 추가·수정·삭제와 Supabase 공동 저장을 제공한다', async () => {
  const page = await readFile('src/pages/DataRoom.jsx', 'utf8');
  const layout = await readFile('src/components/Layout.jsx', 'utf8');
  const repository = await readFile('src/lib/songhyeonDataRoomRepository.js', 'utf8');
  const migration = await readFile('supabase/migrations/202608130007_songhyeon_data_room.sql', 'utf8');

  assert.match(page, /import \{ WorkspacePageFrame, WorkspacePageHeader \} from ['"]\.\.\/components\/workspace\/WorkspacePageLayout['"]/);
  assert.match(page, /<WorkspacePageHeader[\s\S]{0,180}?title="Data Room"/);
  assert.match(layout, /name: 'Data Room', path: '\/data'/);
  assert.match(page, /문서 추가/);
  assert.match(page, /문서 수정/);
  assert.match(page, /deleteDocument/);
  assert.doesNotMatch(page, /localStorage|documentStorageKey|defaultDocuments/);
  for (const method of ['loadDataRoomDocuments', 'createDataRoomDocument', 'updateDataRoomDocument', 'deleteDataRoomDocument', 'recordDataRoomView']) {
    assert.match(page, new RegExp(method));
    assert.match(repository, new RegExp(`export async function ${method}`));
  }
  assert.match(repository, /from\('songhyeon_data_room_documents'\)/);
  assert.match(migration, /create table if not exists public\.songhyeon_data_room_documents/);
  assert.match(migration, /enable row level security/);
  assert.match(migration, /public\.is_songhyeon_member\(\)/);
  assert.doesNotMatch(migration, /iota_v2|iota_/);
  assert.match(page, /원본 URL/);
  assert.match(page, /type="url"/);
  assert.doesNotMatch(page, /option value="download"|원본 유형|파일명 \(선택\)|download:/);
  assert.doesNotMatch(page, /크기\/표시|document\.size|draft\.size/);
  assert.match(page, /label="문서명" className="col-span-2"[\s\S]*?label="기준일"[\s\S]*?label="설명" className="col-span-3"/);
});
