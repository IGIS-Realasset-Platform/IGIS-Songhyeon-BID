import test from 'node:test';
import assert from 'node:assert/strict';

import {
  projectContext,
  stages,
  evidenceCategories,
  assetBaseline,
  immediateBacklog,
  ecosystemGroups,
  organizationRoles,
  workPlanPhases,
  decisionBoundaries,
} from '../src/data/songhyeonTfData.js';

test('홈은 0단계 근거기반 구축을 현재 단계로 정의한다', () => {
  assert.equal(projectContext.currentStage.id, 0);
  assert.match(projectContext.currentStage.name, /근거기반 구축/);
  assert.match(projectContext.definition, /자산·공간·관계/);
  assert.match(projectContext.nextGate, /현장기회/);
});

test('TF 공동가치는 플레이스메이킹·에리어매니지먼트 환경 구축이며 서울시 협업은 기획추진 업무로 분리한다', () => {
  assert.match(projectContext.coreValue, /플레이스메이킹·에리어매니지먼트/);
  assert.equal(projectContext.cityCollaboration.owner, '기획추진실');
  assert.equal(projectContext.cityCollaboration.scope, '전담 업무흐름');
  assert.ok(organizationRoles.length >= 3);

  const planning = organizationRoles.find((role) => role.organization === '기획추진실');
  const sharedRoles = organizationRoles.filter((role) => role.organization !== '기획추진실');
  assert.match(planning.responsibilities.join(' '), /서울시/);
  assert.ok(sharedRoles.every((role) => !role.responsibilities.join(' ').includes('서울시')));
});

test('업무실행계획은 장소·운영환경 구축을 중심축으로 두고 대외협력을 지원축으로 배치한다', () => {
  assert.ok(workPlanPhases.length >= 5);
  assert.match(workPlanPhases.map((phase) => phase.title).join(' '), /플레이스메이킹|에리어매니지먼트/);

  const externalAlignment = workPlanPhases.find((phase) => phase.id === 'WP-04B');
  assert.equal(externalAlignment.owner, '기획추진실');
  assert.equal(externalAlignment.track, '기획추진 전담');
  assert.ok(workPlanPhases.filter((phase) => phase.id !== 'WP-04B').every((phase) => phase.track !== '서울시 협업'));
});

test('실행순서는 0단계부터 6단계까지 빠짐없이 이어진다', () => {
  assert.equal(stages.length, 7);
  assert.deepEqual(stages.map((stage) => stage.id), [0, 1, 2, 3, 4, 5, 6]);
  assert.equal(stages[0].status, '현재');
  assert.ok(stages.slice(1).every((stage) => stage.status === '후속'));
});

test('근거기반 항목은 임의 수치 대신 집계 전 상태와 다음 확인행동을 가진다', () => {
  assert.ok(evidenceCategories.length >= 6);
  for (const category of evidenceCategories) {
    assert.equal(category.count, '집계 전');
    assert.ok(category.factStatus);
    assert.ok(category.nextAction);
  }
});

test('모든 자산 항목은 관계유형·사실상태·기준일·출처·상세 경로를 가진다', () => {
  assert.ok(assetBaseline.length >= 5);
  for (const asset of assetBaseline) {
    assert.ok(asset.relationType);
    assert.ok(asset.factStatus);
    assert.ok(asset.asOf);
    assert.ok(asset.source);
    assert.match(asset.path, /^\/assets\//);
  }
});

test('즉시 실행업무는 데이터·생태계·다음 단계 준비의 세 우선순위로 구성된다', () => {
  assert.deepEqual(immediateBacklog.map((group) => group.id), ['data', 'ecosystem', 'next']);
  for (const group of immediateBacklog) {
    assert.ok(group.items.length > 0);
    for (const item of group.items) {
      assert.ok(item.requiredData);
      assert.ok(item.nextAction);
      assert.ok(item.completionEvidence);
    }
  }
});

test('생태계 지도와 결정 유보 항목은 확정 구조로 오인되지 않게 상태를 명시한다', () => {
  assert.ok(ecosystemGroups.length >= 3);
  assert.ok(ecosystemGroups.every((group) => group.factStatus));
  assert.ok(decisionBoundaries.length >= 6);
  assert.ok(decisionBoundaries.every((item) => item.availableStage));
});
