import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const DRAWER_PATH = new URL('../src/components/iota-songhyeon/task-board/SonghyeonTaskDetailDrawer.jsx', import.meta.url);
const REPOSITORY_PATH = new URL('../src/lib/songhyeonTaskRepository.js', import.meta.url);
const readDrawer = () => readFile(DRAWER_PATH, 'utf8');

test('중단 업무 상세는 최신 중단 이력의 사유와 시각을 선택한다', async () => {
  const [drawer, repository] = await Promise.all([
    readDrawer(),
    readFile(REPOSITORY_PATH, 'utf8'),
  ]);

  assert.match(repository, /export async function loadActivity\(sourceKey\)[\s\S]*?order\('created_at', \{ ascending: false \}\)/,
    '변경 이력은 최신순으로 로드되어야 합니다.');
  assert.match(drawer, /const stopActivity = task\.status === '중단'\s*\? activity\.find\(\(item\) => item\.action === 'task_stopped' \|\| item\.action === 'task_held'\)\s*: null/,
    '중단 상태에서 최신 중단 이력과 legacy 보류 이력을 찾아야 합니다.');
  assert.match(drawer, /const stopReason = String\(stopActivity\?\.payload\?\.reason \|\| ''\)\.trim\(\) \|\| '중단 사유가 기록되지 않았습니다\.'/,
    '중단 사유는 이력 payload에서 읽고 공백을 정리해야 합니다.');
});

test('중단 상태 badge와 중단 정보는 사유·처리 시각까지 붉은 계열로 표시한다', async () => {
  const drawer = await readDrawer();

  assert.match(drawer, /task\.status === '중단' \? \(\s*<span className=\{`\$\{taskDetailBadgeClass\} border border-\[#ff453a\]\/35 bg-\[#ff453a\]\/10 text-\[#ff7169\]`\}>\{task\.status\}<\/span>/,
    '중단 상태 badge는 generic blue가 아닌 red tone이어야 합니다.');

  const stopSection = drawer.match(/\{task\.status === '중단' && <section aria-label="중단 정보"[\s\S]*?<\/section>\}/)?.[0] || '';
  assert.ok(stopSection, '중단 정보 section이 있어야 합니다.');
  assert.match(stopSection, /border border-\[#ff453a\]\/25 bg-\[#ff453a\]\/\[0\.06\]/);
  assert.match(stopSection, /<h3[^>]*text-\[#ff7169\][^>]*>중단 정보<\/h3>/);
  assert.match(stopSection, /stopActivity\?\.createdAt/);
  assert.match(stopSection, /<time[^>]*dateTime=\{stopActivity\.createdAt\}>\{new Date\(stopActivity\.createdAt\)\.toLocaleString\('ko-KR'\)\}<\/time>/);
  assert.match(stopSection, /<p[^>]*>\{stopReason\}<\/p>/);
  assert.doesNotMatch(stopSection, /completedAt|completionSummary|completionEvidenceUrl/);
});

test('중단 이력이 없는 legacy 중단 업무도 사유 없음 안내를 표시한다', async () => {
  const drawer = await readDrawer();

  assert.match(drawer, /const stopReason = String\(stopActivity\?\.payload\?\.reason \|\| ''\)\.trim\(\) \|\| '중단 사유가 기록되지 않았습니다\.'/);
  assert.match(drawer, /\{task\.status === '중단' && <section aria-label="중단 정보"/,
    '중단 정보 section을 stopActivity나 stopReason 존재 여부로 숨기면 안 됩니다.');
  assert.match(drawer, /\{stopActivity\?\.createdAt && <time/,
    'legacy row에는 없는 처리 시각만 조건부로 렌더링해야 합니다.');
  assert.doesNotMatch(drawer, /task\.status === '중단' && (?:stopActivity|stopReason) && <section/);
});

test('완료 상태 badge와 완료 정보의 기존 green 계약은 그대로 유지한다', async () => {
  const drawer = await readDrawer();

  assert.match(drawer, /task\.status === '완료' \? \(\s*<span className=\{`\$\{taskDetailBadgeClass\} gap-1 border border-\[#4da566\]\/40 bg-\[#4da566\]\/15 font-black text-\[#8fd19d\][^`]*`\}>[\s\S]*?Task가 완료되었습니다<\/span>/);
  const completionSection = drawer.match(/\{task\.status === '완료' && task\.completionSummary && <section aria-label="완료 정보"[\s\S]*?<\/section>\}/)?.[0] || '';
  assert.ok(completionSection, '기존 완료 정보 section이 유지되어야 합니다.');
  assert.match(completionSection, /border border-\[#4da566\]\/20 bg-\[#4da566\]\/\[0\.04\]/);
  assert.match(completionSection, />완료 정보<\/h3>/);
  assert.match(completionSection, /dateTime=\{task\.completedAt\}/);
  assert.match(completionSection, /\{task\.completionSummary\}/);
  assert.match(completionSection, /href=\{task\.completionEvidenceUrl\}/);
  assert.match(completionSection, /완료 증빙 열기/);
});

test('상태·중요도·회의상정 badge는 모두 같은 26px 높이 계약을 사용한다', async () => {
  const drawer = await readDrawer();
  assert.match(drawer, /const taskDetailBadgeClass = 'inline-flex h-\[26px\] items-center whitespace-nowrap rounded-\[6px\] px-2 text-\[11px\] font-bold leading-none'/);

  const badgesStart = drawer.indexOf('<div className="flex flex-wrap items-center gap-2 pt-[2px]">');
  const badgesEnd = drawer.indexOf('\n              </div>', badgesStart);
  assert.ok(badgesStart >= 0 && badgesEnd > badgesStart, '상세 header badge 행을 찾을 수 없습니다.');
  const badges = drawer.slice(badgesStart, badgesEnd);
  assert.equal((badges.match(/\$\{taskDetailBadgeClass\}/g) || []).length, 6,
    '보관·완료·중단·기본 상태와 중요도·회의상정 badge가 모두 공통 높이 class를 사용해야 합니다.');
  assert.doesNotMatch(badges, /\bh-\[(?!26px)[^\]]+\]/,
    '개별 badge가 공통 높이를 덮어쓰면 안 됩니다.');
});
