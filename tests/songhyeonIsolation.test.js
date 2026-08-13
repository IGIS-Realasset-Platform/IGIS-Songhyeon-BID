import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const read = (path) => readFile(path, 'utf8');
const exec = promisify(execFile);

test('송현 앱은 레거시 IOTA 앱 라우트를 번들에 포함하지 않는다', async () => {
  const app = await read('src/App.jsx');
  assert.doesNotMatch(app, /LegacyApp|\/sbd-bid/);
});

test('송현 런타임은 IOTA 테이블을 직접 조회하지 않고 승인된 읽기 뷰만 사용한다', async () => {
  const repository = await read('src/lib/songhyeonTaskRepository.js');
  assert.match(repository, /songhyeon_shared_stakeholders/);
  assert.doesNotMatch(repository, /iota_stakeholder_master|iota_v2|iota_stakeholders/);
});

test('공통 외부파트너 경계는 보안 호출자 권한과 SELECT 전용 권한을 사용한다', async () => {
  const migration = await read('supabase/migrations/202608130006_songhyeon_shared_stakeholders.sql');
  assert.match(migration, /security_invoker\s*=\s*true/i);
  assert.match(migration, /grant select on public\.songhyeon_shared_stakeholders to authenticated/i);
  assert.match(migration, /revoke insert, update, delete, truncate, references, trigger/i);
  assert.doesNotMatch(migration, /insert into\s+(public\.)?iota_|update\s+(public\.)?iota_|delete from\s+(public\.)?iota_/i);
});

test('프로덕션 CNAME은 송현 전용 도메인이다', async () => {
  assert.equal((await read('public/CNAME')).trim(), 'songhyeon.iotaseoul.site');
});

test('송현 저장소의 실행 스크립트는 원본 IOTA 작업폴더를 직접 수정하지 않는다', async () => {
  try {
    const { stdout } = await exec('git', [
      'grep', '-n', '-F',
      '/Users/jkjeon2025/Documents/GitHub/IGIS Fund Production DP',
      '--', '*.js', '*.jsx', '*.mjs', '*.cjs',
    ]);
    assert.equal(stdout.trim(), '');
  } catch (error) {
    assert.equal(error.code, 1, error.stderr || error.message);
  }
});
