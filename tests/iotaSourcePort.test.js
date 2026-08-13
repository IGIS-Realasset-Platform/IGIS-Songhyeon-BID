import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const sha256 = async (path) => createHash('sha256').update(await readFile(path)).digest('hex');

const vendored = [
  ['src/vendor/iota-original/PlatformCore.jsx', '95a2fc664d45a79290110dac14d7c22507f5a40e7495fa42aa7603ffd9ab4255'],
  ['src/vendor/iota-original/IotaLeftNav.jsx', 'cb6a540243159f197a7361611e57f37613304a78a53e6280adf216ec788d58c2'],
  ['src/vendor/iota-original/pmo/PmoScheduleGate.jsx', '654d35e90f975fc3127a051b4260e8a0ca17fddb7a9f8fc8ff14b823391c1866'],
  ['src/vendor/iota-original/pmo/PmoDetailedSchedule.jsx', '291b210cd91eb7b720a034cac75e8da27d6064ea81a71267a43cfae9a1be5dea'],
];

test('IOTA 기준 컴포넌트는 바이트 단위 원본 사본으로 보존된다', async () => {
  for (const [path, expected] of vendored) assert.equal(await sha256(path), expected, path);
});

test('송현 어댑터는 IOTA 화면 계약을 유지하고 외부 시스템 의존성을 포함하지 않는다', async () => {
  const gate = await readFile('src/components/iota-songhyeon/pmo/SonghyeonScheduleGate.jsx', 'utf8');
  const detail = await readFile('src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx', 'utf8');
  const combined = `${gate}\n${detail}`;

  for (const contract of ['w-[1200px] mx-auto', 'rounded-[32px]', 'bg-[#272726]', 'timeline-scrollbar', 'w-[1198px]', 'w-[430px]', 'w-[48px]']) {
    assert.match(combined, new RegExp(contract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), contract);
  }
  for (const forbidden of ['supabase', 'useAuth', 'notificationHelpers', 'PmoTaskBoardStaging']) assert.doesNotMatch(combined, new RegExp(forbidden));
});

test('기존 재현 페이지가 아니라 복제본 기반 어댑터가 라우트에 연결된다', async () => {
  const app = await readFile('src/App.jsx', 'utf8');
  assert.match(app, /SonghyeonScheduleGate/);
  assert.doesNotMatch(app, /pages\/Milestones/);
  await stat('src/components/iota-songhyeon/pmo/SonghyeonScheduleGate.jsx');
});
