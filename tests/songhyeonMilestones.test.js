import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  milestoneStages,
  milestoneTimelineRows,
  responsibilityMatrix,
  organizationDirectory,
  milestoneWeeks,
  getSonghyeonTodayMarker,
} from '../src/data/songhyeonMilestones.js';
import { songhyeonDetailedScheduleItems } from '../src/data/songhyeonDetailedSchedule.js';

const expectedTitles = [
  '기준선·근거 확보',
  '문제·기회 정의 및 사전 인터뷰',
  '서비스 가설 설계',
  '실행조건 검증',
  'MVP·협력구조 확정',
  '최종 실행준비',
  '실증·평가·학습',
];

test('송현 BID 마일스톤은 확정된 7단계 단일체계를 유지한다', () => {
  assert.equal(milestoneStages.length, 7);
  assert.deepEqual(milestoneStages.map((stage) => stage.title), expectedTitles);
  assert.deepEqual(milestoneStages.map((stage) => stage.code), ['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6']);
});

test('운영파트너는 초기 비구속 인터뷰 후 실행조건 검증을 거쳐 확정한다', () => {
  const discovery = milestoneStages[1];
  const validation = milestoneStages[3];
  const confirmation = milestoneStages[4];

  assert.match(discovery.activities.join(' '), /비구속.*인터뷰/);
  assert.doesNotMatch(discovery.outputs.join(' '), /선정|계약 확정/);
  assert.match(validation.activities.join(' '), /실행성.*공동검증/);
  assert.match(confirmation.outputs.join(' '), /MVP.*협력구조/);
});

test('모든 Gate의 최종 단계전환 결정은 송현 BID TF가 담당한다', () => {
  assert.ok(milestoneStages.every((stage) => stage.accountable === '송현 BID TF'));
  assert.ok(milestoneStages.every((stage) => stage.gateDecision.includes('진입') || stage.gateDecision.includes('전환') || stage.gateDecision.includes('결정')));
});

test('공간솔루션센터와 총괄 운영파트너의 역할을 분리한다', () => {
  const space = organizationDirectory.find((item) => item.name === '공간솔루션센터');
  const operator = organizationDirectory.find((item) => item.name === '총괄 운영파트너');

  assert.match(space.role, /설계.*실무협의.*성과관리/);
  assert.doesNotMatch(space.role, /현장 인력.*통합/);
  assert.match(operator.role, /현장 인력.*일정.*안전.*품질.*원가/);
});

test('기업마케팅센터 최초접점 이후 공간솔루션센터로 인계한다', () => {
  const partnerRow = responsibilityMatrix.find((row) => row.id === 'RR-03');
  assert.equal(partnerRow.responsible, '기업마케팅센터');
  assert.match(partnerRow.task, /최초 접점.*인계/);
  assert.ok(partnerRow.consulted.includes('공간솔루션센터'));
});

test('타임라인은 7개 Gate와 실행업무를 모두 포함한다', () => {
  const gates = milestoneTimelineRows.filter((row) => row.type === 'Gate');
  assert.equal(gates.length, 7);
  assert.deepEqual(gates.map((row) => row.stage), ['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6']);
});

test('표준 실행기간은 단계별 2·2·2·3·2·2·3주, 총 16주다', () => {
  assert.deepEqual(milestoneStages.map((stage) => stage.durationWeeks), [2, 2, 2, 3, 2, 2, 3]);
  assert.equal(milestoneWeeks.length, 16);
  assert.equal(milestoneWeeks[0].week, 1);
  assert.equal(milestoneWeeks.at(-1).week, 16);
});

test('8월 10일 상세 실행계획은 Milestone → Workstream → Task 3단 구조를 보존한다', () => {
  const milestones = songhyeonDetailedScheduleItems.filter((item) => item.itemType === 'lv1');
  const workstreams = songhyeonDetailedScheduleItems.filter((item) => item.itemType === 'lv2');
  const tasks = songhyeonDetailedScheduleItems.filter((item) => item.itemType === 'task');
  const byKey = new Map(songhyeonDetailedScheduleItems.map((item) => [item.sourceKey, item]));

  assert.equal(milestones.length, 7);
  assert.equal(workstreams.length, 21);
  assert.equal(tasks.length, 76);
  assert.ok(workstreams.every((item) => byKey.get(item.parentSourceKey)?.itemType === 'lv1'));
  assert.ok(tasks.every((item) => byKey.get(item.parentSourceKey)?.itemType === 'lv2'));
  assert.ok(tasks.every((item) => item.displayName && item.leadLabel && item.stage));
});

test('상세 일정 요약카드는 하나만 활성화되고 업무 제목은 한 줄 최대폭으로 표시한다', async () => {
  const page = await readFile(new URL('../src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx', import.meta.url), 'utf8');

  assert.match(page, /const \[metricFilter, setMetricFilter\]/);
  assert.match(page, /aria-pressed=\{metricFilter === metricValue\}/);
  assert.doesNotMatch(page, /w-\[108px\] shrink-0 text-right/);
  assert.match(page, /truncate whitespace-nowrap/);
});

test('상세 일정 1·2·3단 행 배경과 구분선은 IOTA 원본 토큰을 그대로 사용한다', async () => {
  const page = await readFile(new URL('../src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx', import.meta.url), 'utf8');

  assert.match(page, /border-b border-\[#393939\]/);
  assert.match(page, /bg-\[#2c3440\] hover:bg-\[#343e4d\]/);
  assert.match(page, /bg-\[#2d2d2c\] hover:bg-\[#363635\]/);
  assert.match(page, /bg-\[#272726\] hover:bg-\[#30302f\]/);
  assert.match(page, /bg-\[#2c3440\] group-hover:bg-\[#343e4d\]/);
  assert.match(page, /bg-\[#2d2d2c\] group-hover:bg-\[#363635\]/);
  assert.doesNotMatch(page, /isMilestone \? 'bg-\[#3c3c3c\]/);
  assert.doesNotMatch(page, /isWorkstream \? 'bg-\[#30302f\]/);
});

test('상세 일정의 업무 제목은 한 줄 업무명형으로 표시하고 필터 결과의 상위 계층을 보존한다', async () => {
  const page = await readFile(new URL('../src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx', import.meta.url), 'utf8');
  const tasks = songhyeonDetailedScheduleItems.filter((item) => item.itemType === 'task');

  assert.ok(tasks.every((item) => item.sourceText === item.sourceText.trim()));
  assert.ok(tasks.every((item) => !/[한된되는]+다\.$/.test(item.displayName)));
  assert.ok(tasks.every((item) => item.sourceText.length >= item.displayName.length));
  assert.match(page, /truncate whitespace-nowrap/);
  assert.match(page, /title=\{item\.sourceText \|\| item\.displayName\}/);
  assert.match(page, /getAncestors/);
  assert.match(page, /keys\.add\(ancestorKey\)/);
});

test('상세 일정은 8월 1주부터 11월말까지 월별 4주로 표시한다', () => {
  assert.equal(milestoneWeeks.length, 16);
  assert.deepEqual(
    milestoneWeeks.slice(0, 4).map(({ month, weekOfMonth, startDate }) => ({ month, weekOfMonth, startDate })),
    [
      { month: 8, weekOfMonth: 1, startDate: '2026-08-01' },
      { month: 8, weekOfMonth: 2, startDate: '2026-08-08' },
      { month: 8, weekOfMonth: 3, startDate: '2026-08-15' },
      { month: 8, weekOfMonth: 4, startDate: '2026-08-22' },
    ],
  );
  assert.equal(milestoneWeeks.at(-1).endDate, '2026-11-30');
  assert.deepEqual(
    Object.fromEntries([8, 9, 10, 11].map((month) => [month, milestoneWeeks.filter((week) => week.month === month).length])),
    { 8: 4, 9: 4, 10: 4, 11: 4 },
  );
});

test('오늘 표시는 서울 기준 날짜를 실제 일정축 좌표로 환산한다', () => {
  const marker = getSonghyeonTodayMarker(new Date('2026-08-12T09:00:00+09:00'));
  assert.equal(marker.dateLabel, '오늘 8.12');
  assert.equal(marker.periodIndex, 1);
  assert.ok(marker.left > 478 && marker.left < 526);
  assert.equal(getSonghyeonTodayMarker(new Date('2026-07-31T09:00:00+09:00')), null);
});

test('중복 일정등록 카드는 일정 지연 0으로 교체하고 IOTA 오늘선을 표시한다', async () => {
  const page = await readFile(new URL('../src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(page, /'일정 등록'/);
  assert.match(page, /'일정 지연', statistics\.delayed/);
  assert.match(page, /delayed: 0/);
  assert.match(page, /todayMarker\.dateLabel/);
  assert.match(page, /bg-\[#F59E0B\]/);
  assert.doesNotMatch(page, /\[1, 2, 3, 4\]\.map/);
});

test('월말 굵은선은 헤더와 본문에서 동일한 4주 경계를 사용한다', async () => {
  const page = await readFile(new URL('../src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx', import.meta.url), 'utf8');
  assert.match(page, /const isMonthEnd = \(index\) =>/);
  assert.match(page, /isMonthEnd\(index\)/);
  assert.match(page, /isMonthEnd\(periodIndex\)/);
});

test('Task 제목은 핵심 주제만 표시하고 행 전체 클릭으로 상세와 연결키를 제공한다', async () => {
  const page = await readFile(new URL('../src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx', import.meta.url), 'utf8');
  const modal = await readFile(new URL('../src/components/iota-songhyeon/pmo/SonghyeonScheduleTaskLinkModal.jsx', import.meta.url), 'utf8');
  const tasks = songhyeonDetailedScheduleItems.filter((item) => item.itemType === 'task');
  const facilities = tasks.find((item) => item.sourceText.startsWith('공용공간·공개공간'));
  assert.equal(facilities.displayName, '공용·공개공간·리테일 운영 확인');
  assert.ok(tasks.every((item) => !/를 (확인|검토|조사|정리|비교)$/.test(item.displayName)));
  assert.ok(tasks.every((item) => item.displayName.length <= 38));
  assert.match(page, /<tr[\s\S]*?onClick=\{\(\) => \{[\s\S]*?setSelectedItem\(item\)/);
  assert.match(page, /data-task-link-source=\{item\.itemType === 'task' \? item\.sourceKey : undefined\}/);
  assert.match(page, /data-task-key=\{item\.itemType === 'task' \? item\.sourceKey : undefined\}/);
  assert.match(page, /item\.itemType === 'task' \? 'cursor-pointer'/);
  assert.doesNotMatch(page, /<button[^>]*data-task-key=\{item\.sourceKey\}/);
  assert.match(page, /item=\{selectedItem\}/);
  assert.match(modal, /taskPurpose: item\.sourceText \|\| ''/);
  assert.match(modal, /onOpenTask\(task\.sourceKey\)/);
  assert.match(modal, /상세보기 →/);
});

test('일정은 8월 2주에 시작해 주제별로 병렬 진행하고 11월 말까지 종료한다', () => {
  const tasks = songhyeonDetailedScheduleItems.filter((item) => item.itemType === 'task');
  const groups = songhyeonDetailedScheduleItems.filter((item) => item.itemType !== 'task');
  assert.equal(Math.min(...tasks.map((item) => item.startIndex)), 1);
  assert.ok(tasks.every((item) => item.startIndex >= 1));
  const workstreams = songhyeonDetailedScheduleItems.filter((item) => item.itemType === 'lv2');
  assert.ok(workstreams.every((workstream) => {
    const firstTask = tasks.find((task) => task.parentSourceKey === workstream.sourceKey);
    return firstTask?.startIndex === 1;
  }));
  assert.ok(tasks.every((item) => item.endIndex <= 15));
  assert.ok(tasks.some((item) => item.endIndex === 15));
  assert.ok(new Set(tasks.map((item) => item.startIndex)).size >= 8);
  assert.ok(tasks.some((item, index) => tasks.slice(index + 1).some((other) => (
    item.parentSourceKey !== other.parentSourceKey
    && item.startIndex <= other.endIndex
    && other.startIndex <= item.endIndex
  ))));
  assert.ok(groups.every((group) => {
    const descendants = tasks.filter((task) => task.sourceKey.startsWith(group.sourceKey));
    return descendants.length
      && group.startIndex === Math.min(...descendants.map((task) => task.startIndex))
      && group.endIndex === Math.max(...descendants.map((task) => task.endIndex));
  }));
});

test('마일스톤 페이지는 1200px 고정폭으로 타 페이지와 동일하게 중앙정렬한다', async () => {
  const page = await readFile(new URL('../src/components/iota-songhyeon/pmo/SonghyeonScheduleGate.jsx', import.meta.url), 'utf8');
  const detail = await readFile(new URL('../src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx', import.meta.url), 'utf8');
  const workspaceLayout = await readFile(new URL('../src/components/workspace/WorkspacePageLayout.jsx', import.meta.url), 'utf8');

  assert.match(page, /<WorkspacePageFrame\b/);
  assert.match(workspaceLayout, /mx-auto w-\[1200px\] max-w-full/);
  assert.match(page, /w-\[1198px\] min-w-\[1198px\] max-w-\[1198px\]/);
  assert.doesNotMatch(page, /w-\[1290px\]/);
  assert.doesNotMatch(page, /w-\[1375px\]/);
  assert.match(detail, /SCHEDULE_LABEL_COLUMN_WIDTH = 430/);
  assert.match(detail, /min-w-\[1198px\]/);
  assert.doesNotMatch(detail, /min-w-\[1218px\]/);
});
