import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  hypothesisPipeline,
  hypothesisRegistrationCriteria,
  participationTracks,
  serviceHypotheses,
} from '../src/data/songhyeonServiceHypotheses.js';

test('서비스·운영 가설은 근거에서 실증까지의 단계와 등록기준을 분리한다', () => {
  assert.deepEqual(
    hypothesisPipeline.map((stage) => stage.id),
    ['evidence', 'opportunity', 'hypothesis', 'feasibility', 'pilot'],
  );
  assert.ok(hypothesisRegistrationCriteria.length >= 5);
  assert.ok(hypothesisRegistrationCriteria.every((criterion) => criterion.required));
  assert.ok(participationTracks.every((track) => track.factStatus && track.nextCheck));
});

test('0단계에서는 승인되지 않은 서비스 가설을 임의로 만들지 않는다', () => {
  assert.equal(serviceHypotheses.length, 0);
});

test('서비스·운영 가설 페이지는 실행 객체와 마일스톤 연결키를 제공한다', async () => {
  const page = await readFile('src/pages/ServiceHypotheses.jsx', 'utf8');
  assert.match(page, /서비스·운영 가설/);
  assert.match(page, /가설 등록 기준/);
  assert.match(page, /가설 레지스터/);
  assert.match(page, /data-task-key/);
  assert.match(page, /sourceKey/);
  assert.match(page, /승인된 가설이 없습니다/);
  assert.doesNotMatch(page, /TEAM CONTRIBUTION|PLANNING OFFICE TRACK|OPERATING ENVIRONMENT/);
});

test('서비스·운영 가설은 IOTA 블랙 워크스페이스의 표면·경계·hover 계약을 사용한다', async () => {
  const page = await readFile('src/pages/ServiceHypotheses.jsx', 'utf8');
  const layout = await readFile('src/components/Layout.jsx', 'utf8');
  const workspaceLayout = await readFile('src/components/workspace/WorkspacePageLayout.jsx', 'utf8');

  assert.match(page, /<WorkspacePageFrame\b/);
  assert.match(workspaceLayout, /mx-auto w-\[1200px\] max-w-full/);
  for (const token of ['text-[#E5E5E5]', 'bg-[#272726]', 'border-[#3c3c3c]', 'hover:bg-[#30302F]', 'rounded-[24px]']) {
    assert.match(page, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), token);
  }
  assert.match(layout, /pathname === '\/hypotheses'/);
  assert.doesNotMatch(page, /bg-white|bg-slate-50|text-slate-950|border-slate-300|shadow-/);
});

test('Data Room과 서비스·운영 가설은 마일스톤의 상단 폭·여백·제목행 계약을 공유한다', async () => {
  const milestones = await readFile('src/components/iota-songhyeon/pmo/SonghyeonScheduleGate.jsx', 'utf8');
  const dataRoom = await readFile('src/pages/DataRoom.jsx', 'utf8');
  const hypotheses = await readFile('src/pages/ServiceHypotheses.jsx', 'utf8');
  const workspaceLayout = await readFile('src/components/workspace/WorkspacePageLayout.jsx', 'utf8');

  assert.match(workspaceLayout, /WorkspacePageFrame[\s\S]*pt-\[28px\]/);
  assert.match(workspaceLayout, /mx-auto w-\[1200px\] max-w-full/);
  assert.match(workspaceLayout, /WorkspacePageHeader[\s\S]*text-\[32px\] font-bold leading-none tracking-tight/);
  for (const source of [milestones, dataRoom, hypotheses]) {
    assert.match(source, /<WorkspacePageFrame\b/);
    assert.match(source, /<WorkspacePageHeader\b/);
  }
});

test('서비스·운영 가설 상단은 마일스톤과 같은 제목행 직후 첫 패널 구조를 사용한다', async () => {
  const page = await readFile('src/pages/ServiceHypotheses.jsx', 'utf8');
  assert.doesNotMatch(page, /현재 운영 원칙/);
  assert.match(page, /<WorkspacePageFrame>\s*<WorkspacePageHeader[\s\S]*?\/>\s*<section className="grid grid-cols-4/);
  assert.doesNotMatch(page, /<WorkspacePageHeader[\s\S]*?\/>\s*<p className="mb-/);
  assert.doesNotMatch(page, /<section className="mb-\[48px\] grid grid-cols-4/);
});

test('서비스·운영 가설 하단 소제목은 설명과 같은 기준선에 놓이고 표까지 12px 간격을 유지한다', async () => {
  const page = await readFile('src/pages/ServiceHypotheses.jsx', 'utf8');
  assert.match(page, /<div className="mb-\[12px\] flex items-end justify-between">\s*<div className="flex items-baseline gap-\[16px\]">\s*<h2[^>]*>\{title\}<\/h2>\s*\{description && <p className="text-\[14px\] leading-none text-\[#86868B\]">\{description\}<\/p>\}/);
  assert.doesNotMatch(page, /description && <p className="mt-/);
  assert.doesNotMatch(page, /<div className="mb-\[12px\] flex items-end justify-between gap-\[24px\]">/);
});

test('서비스·운영 가설의 주요 컴포넌트 간격은 36px 리듬으로 통일한다', async () => {
  const page = await readFile('src/pages/ServiceHypotheses.jsx', 'utf8');
  assert.match(page, /<section className="mt-\[36px\] mb-\[36px\]">/);
  assert.equal((page.match(/<section className="mb-\[36px\]">/g) || []).length, 3);
  assert.doesNotMatch(page, /<section className="(?:mt-\[48px\] )?mb-\[48px\]">/);
});

test('서비스·운영 가설은 홈 작업방식 섹션에 흡수되고 구 주소를 호환한다', async () => {
  const layout = await readFile('src/components/Layout.jsx', 'utf8');
  const app = await readFile('src/App.jsx', 'utf8');
  assert.doesNotMatch(layout, /name: '서비스·운영 가설', path: '\/hypotheses'/);
  assert.doesNotMatch(layout, /\/execution|업무실행계획/);
  assert.equal((layout.match(/name: 'Data Room'/g) || []).length, 1);
  assert.match(app, /path="hypotheses" element=\{<Navigate replace to="\/#how-we-work"/);
  assert.doesNotMatch(app, /ExecutionPlan|path="execution"/);
  assert.match(app, /path="membership" element=\{<Navigate replace to="\/#how-we-work"/);
});
