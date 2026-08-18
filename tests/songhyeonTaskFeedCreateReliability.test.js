import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const WRITE_BOX_PATH = 'src/components/iota-songhyeon/task-feed/SonghyeonTaskFeedWriteBox.jsx';
const REPOSITORY_PATH = 'src/lib/songhyeonTaskFeedRepository.js';
const MIGRATION_PATH = 'supabase/migrations/202608180001_songhyeon_task_feed.sql';
const STAKEHOLDER_SYNC_MIGRATION_PATH = 'supabase/migrations/202608180005_songhyeon_feed_stakeholder_master_sync.sql';

const read = (path) => readFile(path, 'utf8');

const regionBetween = (source, startNeedle, endNeedle) => {
  const start = source.indexOf(startNeedle);
  const end = source.indexOf(endNeedle, start + startNeedle.length);
  assert.ok(start >= 0 && end > start, `${startNeedle} 구간을 찾을 수 없습니다.`);
  return source.slice(start, end);
};

const cleanupExportName = (repository) => {
  const exportPattern = /export\s+(?:async\s+function|const)\s+([A-Za-z_$][\w$]*)/gu;
  return [...repository.matchAll(exportPattern)]
    .map((match) => match[1])
    .find((name) => /(?:delete|remove|rollback|cleanup)/i.test(name)
      && /taskfeed/i.test(name)
      && /attachment/i.test(name)) || '';
};

test('이해관계자 동기화 trigger는 배포 DB와 호환되는 무인자 멤버십 함수를 호출한다', async () => {
  const [cleanInstallMigration, migrationNames] = await Promise.all([
    read(STAKEHOLDER_SYNC_MIGRATION_PATH),
    readdir('supabase/migrations'),
  ]);
  const repairNames = migrationNames.filter((name) => /^202608180011.*\.sql$/i.test(name));
  assert.equal(repairNames.length, 1,
    '이미 배포된 잘못된 trigger function을 교체하는 202608180011 repair migration이 하나 필요합니다.');
  const repairMigration = await read(`supabase/migrations/${repairNames[0]}`);

  for (const [label, migration] of [
    ['clean install', cleanInstallMigration],
    ['deployed DB repair', repairMigration],
  ]) {
    const functionStart = migration.toLowerCase().indexOf(
      'create or replace function public.sync_songhyeon_feed_stakeholder_to_master()',
    );
    assert.ok(functionStart >= 0, `${label} migration에 이해관계자 동기화 trigger function이 필요합니다.`);
    const functionEnd = migration.toLowerCase().indexOf('revoke all on function', functionStart);
    assert.ok(functionEnd > functionStart, `${label} trigger function 경계를 찾을 수 없습니다.`);
    const triggerFunction = migration.slice(functionStart, functionEnd);

    assert.match(triggerFunction, /not\s+public\.is_songhyeon_member\s*\(\s*\)/i,
      `${label} trigger는 배포 DB에 존재하는 public.is_songhyeon_member()를 호출해야 합니다.`);
    assert.doesNotMatch(triggerFunction, /public\.is_songhyeon_member\s*\(\s*auth\.uid\s*\(\s*\)\s*\)/i,
      `${label} trigger가 배포 DB에 없는 is_songhyeon_member(uuid)를 호출하면 게시글 전체가 42883으로 rollback됩니다.`);
  }
});

test('URL이 포함된 신규글 본문은 HTML·링크 객체로 바꾸지 않고 원문 문자열로 저장한다', async () => {
  const [writeBox, repository, migration] = await Promise.all([
    read(WRITE_BOX_PATH),
    read(REPOSITORY_PATH),
    read(MIGRATION_PATH),
  ]);

  const formPayload = regionBetween(writeBox, 'const payload = {', 'const savedPost =');
  assert.match(formPayload, /content:\s*content\.trim\(\)/,
    '작성창은 URL이 포함되어도 사용자가 입력한 본문 문자열을 그대로 payload에 넣어야 합니다.');
  assert.doesNotMatch(formPayload, /new\s+URL\s*\(|URL_CANDIDATE_PATTERN|dangerouslySetInnerHTML|<a\b/,
    'URL 링크화는 표시 단계에서만 수행하고 저장 payload를 변환하면 안 됩니다.');

  const rpcPayload = regionBetween(repository, 'const postRpcPayload =', 'export async function createTaskFeedPost');
  assert.match(rpcPayload, /post_body:\s*valid\.content/,
    'repository는 URL 포함 본문 원문을 post_body로 전달해야 합니다.');
  assert.doesNotMatch(rpcPayload, /new\s+URL\s*\(|encodeURI(?:Component)?\s*\(|replace\s*\([^)]*https?/i,
    'repository에서 URL을 재인코딩하거나 제거하면 안 됩니다.');

  const createSql = regionBetween(
    migration,
    'create or replace function public.create_songhyeon_feed_post',
    'create or replace function public.update_songhyeon_feed_post',
  );
  assert.match(createSql, /title\s*,\s*body[\s\S]{0,500}trim\(post_title\)\s*,\s*trim\(post_body\)/i,
    'DB RPC도 URL 포함 post_body를 일반 text 본문으로 저장해야 합니다.');
  assert.doesNotMatch(createSql, /regexp_replace\s*\(\s*post_body|replace\s*\(\s*post_body/i,
    'DB 저장 단계에서 URL 문자열을 지우거나 치환하면 안 됩니다.');
});

test('게시글 저장 실패 시 이번 시도에서 업로드한 첨부만 rollback하고 기존 첨부는 보존한다', async () => {
  const [writeBox, repository] = await Promise.all([
    read(WRITE_BOX_PATH),
    read(REPOSITORY_PATH),
  ]);
  const cleanupName = cleanupExportName(repository);
  assert.ok(cleanupName,
    '게시글 RPC 실패 후 Storage 객체를 지울 수 있는 task-feed attachment cleanup API가 필요합니다.');

  const cleanupStart = repository.search(new RegExp(`export\\s+(?:async\\s+function|const)\\s+${cleanupName}\\b`));
  const cleanupEnd = repository.indexOf('\nexport ', cleanupStart + 1);
  const cleanupFunction = repository.slice(cleanupStart, cleanupEnd < 0 ? repository.length : cleanupEnd);
  assert.match(cleanupFunction,
    /\.storage\s*\.from\((?:SONGHYEON_FEED_ATTACHMENT_BUCKET|['"]songhyeon-feed-attachments['"])\)[\s\S]{0,500}?\.remove\s*\(/,
    'cleanup API는 private bucket에서 전달받은 업로드 경로를 삭제해야 합니다.');
  assert.match(cleanupFunction, /actor\.userId[\s\S]{0,300}\.startsWith\s*\(\s*ownerPrefix\s*\)/,
    'cleanup API는 현재 사용자의 Storage prefix 아래 경로만 rollback 대상으로 허용해야 합니다.');

  const saveFunction = regionBetween(writeBox, 'const save = async () => {', 'const requestSave = () => {');
  const tryStart = saveFunction.indexOf('try {');
  const uploadedLedger = saveFunction.search(/(?:const|let)\s+uploaded(?:Attachments|Files|Paths)\s*=\s*\[\]/);
  assert.ok(uploadedLedger >= 0 && uploadedLedger < tryStart,
    '업로드 성공 목록은 create/update 실패 catch에서도 접근할 수 있도록 try 바깥에 두어야 합니다.');

  const outerCatch = saveFunction.match(/catch\s*\(\s*([A-Za-z_$][\w$]*)\s*\)\s*\{/);
  assert.ok(outerCatch?.index >= 0, '게시글 저장 오류 catch를 찾을 수 없습니다.');
  const finallyStart = saveFunction.indexOf('finally', outerCatch.index);
  const catchRegion = saveFunction.slice(outerCatch.index, finallyStart < 0 ? saveFunction.length : finallyStart);
  assert.match(catchRegion, new RegExp(`\\b${cleanupName}\\s*\\(`),
    '게시글 create/update가 실패하면 attachment cleanup API를 호출해야 합니다.');
  assert.match(catchRegion, /uploaded(?:Attachments|Files|Paths)/,
    'rollback 대상은 현재 저장 시도에서 업로드에 성공한 파일 목록이어야 합니다.');
  assert.doesNotMatch(catchRegion, /existingAttachments/,
    '수정 화면에서 이미 존재하던 첨부파일은 실패 rollback 대상으로 넘기면 안 됩니다.');
});

test('첨부 rollback 실패는 최초 게시글 저장 오류를 덮지 않고 DB 진단은 actionable message에 남긴다', async () => {
  const [writeBox, repository] = await Promise.all([
    read(WRITE_BOX_PATH),
    read(REPOSITORY_PATH),
  ]);
  const cleanupName = cleanupExportName(repository);
  assert.ok(cleanupName, 'attachment cleanup API가 필요합니다.');

  const saveFunction = regionBetween(writeBox, 'const save = async () => {', 'const requestSave = () => {');
  const outerCatch = saveFunction.match(/catch\s*\(\s*([A-Za-z_$][\w$]*)\s*\)\s*\{/);
  assert.ok(outerCatch?.index >= 0, '게시글 저장 오류 catch를 찾을 수 없습니다.');
  const originalError = outerCatch[1];
  const finallyStart = saveFunction.indexOf('finally', outerCatch.index);
  const catchRegion = saveFunction.slice(outerCatch.index, finallyStart < 0 ? saveFunction.length : finallyStart);
  const cleanupCall = catchRegion.search(new RegExp(`\\b${cleanupName}\\s*\\(`));
  const originalErrorDisplay = catchRegion.search(new RegExp(`setError\\s*\\([\\s\\S]{0,220}\\b${originalError}\\b`));
  assert.ok(cleanupCall >= 0 && originalErrorDisplay > cleanupCall,
    'rollback을 시도한 뒤에도 최초 create/update 오류를 사용자에게 표시해야 합니다.');

  const rollbackGuard = catchRegion.slice(0, originalErrorDisplay);
  assert.match(rollbackGuard, /Promise\.allSettled\s*\(|\.catch\s*\(|\btry\s*\{[\s\S]*\bcatch\s*(?:\([^)]*\))?\s*\{/,
    'Storage 정리 실패는 별도로 흡수해 최초 게시글 저장 오류를 덮지 않아야 합니다.');

  const errorClassStart = repository.indexOf('export class SonghyeonTaskFeedRepositoryError');
  const runEnd = repository.indexOf('const array =', errorClassStart);
  assert.ok(errorClassStart >= 0 && runEnd > errorClassStart, 'repository 오류 래퍼 구간을 찾을 수 없습니다.');
  const errorHandling = repository.slice(0, runEnd);
  const classRegion = repository.slice(errorClassStart, repository.indexOf('const requireSupabase', errorClassStart));
  const runRegion = regionBetween(repository, 'const run = async', 'const array =');
  const superArgument = classRegion.match(/super\(([\s\S]*?)\);/)?.[1]?.trim() || '';
  const throwArgument = runRegion.match(/throw\s+new\s+SonghyeonTaskFeedRepositoryError\(([\s\S]*?)\);/)?.[1]?.trim() || '';
  const enrichesInClass = superArgument !== 'message' && /cause|format|diagnostic|detail|hint|code/i.test(superArgument);
  const enrichesInRun = !/^message\s*,\s*error$/.test(throwArgument) && /error|format|diagnostic|detail|hint|code/i.test(throwArgument);
  assert.ok(enrichesInClass || enrichesInRun,
    '고정 문구만 던지지 말고 Supabase 원인의 안전한 진단을 오류 message에 포함해야 합니다.');
  for (const diagnostic of ['code', 'message', 'details', 'hint']) {
    assert.match(errorHandling, new RegExp(`(?:cause|error)\\?*\\.${diagnostic}|(?:cause|error)\\[['"]${diagnostic}['"]\\]`),
      `actionable 오류 구성에서 Supabase ${diagnostic} 진단을 보존해야 합니다.`);
  }

  const mutationMessage = regionBetween(repository, 'const mutationErrorMessage', 'const run = async');
  assert.match(mutationMessage, /code\s*===\s*['"]42883['"][\s\S]{0,180}is_songhyeon_member/i,
    '실제 장애 코드 42883과 누락된 is_songhyeon_member 함수 진단을 식별해야 합니다.');
  assert.match(mutationMessage, /이해관계자[\s\S]{0,120}(?:다시\s*시도|새로고침)/,
    'DB 함수 불일치를 사용자가 조치할 수 있는 이해관계자 저장 안내로 바꿔야 합니다.');
});
