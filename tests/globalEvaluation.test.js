import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  GLOBAL_EVALUATION_CASES,
  GLOBAL_EVALUATION_DEEP_DIVE_IDS,
  GLOBAL_EVALUATION_METHOD,
} from '../src/data/globalEvaluationCases.js';
import {
  BREAKDOWN_PATTERNS,
  DECISION_CHECKPOINTS,
  FIELD_TEST_CHECKS,
  FOLLOW_UP_RESEARCH_CRITERIA,
  FUNDING_LAYERS,
  OPERATING_MECHANISMS,
  PERFORMANCE_STAGES,
  REPEATED_PROBLEMS,
  RESEARCH_SCOPE,
  RESULT_DISTRIBUTION,
  ROLE_SPLIT,
  SUCCESS_CONDITIONS,
  WEAKENING_OPERATION_FLOW,
  WORKING_OPERATION_FLOW,
} from '../src/data/operatingInsightsReport.js';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const scoreValue = (verdict) => Number.parseInt(String(verdict).match(/[+-]?\d+/)?.[0] || '0', 10);

test('02 보고서는 이전 버전의 75개 사례 원자료와 20개 평가 필드를 그대로 복구한다', () => {
  assert.equal(GLOBAL_EVALUATION_CASES.length, 75);
  assert.equal(new Set(GLOBAL_EVALUATION_CASES.map((item) => item.id)).size, 75);
  assert.deepEqual(
    [...new Set(GLOBAL_EVALUATION_CASES.map((item) => item.region))].sort(),
    ['미국·캐나다', '아시아', '영국', '유럽 대륙', '일본', '한국', '호주'].sort(),
  );

  for (const item of GLOBAL_EVALUATION_CASES) {
    assert.deepEqual(Object.keys(item), [
      'id', 'region', 'name', 'why', 'what', 'who', 'where', 'when', 'how', 'cost', 'howWell',
      'context', 'mechanism', 'outcome', 'experienceEvidence', 'publicEvidence', 'verdict',
      'judgment', 'evidenceGap', 'sources',
    ]);
    assert.ok(item.id && item.region && item.name && item.verdict && item.judgment);
    assert.ok(item.sources.length > 0, `${item.id}는 확인 출처를 가져야 합니다.`);
  }
});

test('02 보고서는 이전 판정 분포와 심층조사·검색·상세 근거 화면을 유지한다', async () => {
  const counts = GLOBAL_EVALUATION_CASES.reduce((acc, item) => {
    const value = scoreValue(item.verdict);
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  const page = await read('src/pages/cases/GlobalEvaluation.jsx');

  assert.deepEqual(counts, { 0: 53, 1: 11, 2: 8, '-2': 3 });
  assert.equal(GLOBAL_EVALUATION_DEEP_DIVE_IDS.length, 6);
  assert.deepEqual(GLOBAL_EVALUATION_METHOD.sequence, ['5W3H 사실 확인', 'CMO 작동원리 정리', '검증된 체감성과 판정']);
  for (const text of ['국내외 민관협력 75개 사례', '평가의 기준과 순서', '단일기준 판정 결과', '후속 심층조사', '전체 분석자료', '이용자·이해관계자 체감근거', '공개검증·인지도 근거', '근거 공백']) {
    assert.match(page, new RegExp(text));
  }
  assert.match(page, /GLOBAL_EVALUATION_CASES\.filter/);
  assert.match(page, /target="_blank" rel="noopener noreferrer"/);
  assert.match(page, /<CaseReportFrame current="evidence">/);
});

test('PDF Summary & Insight의 조사범위와 판정 분포를 정확히 유지한다', () => {
  assert.deepEqual(RESEARCH_SCOPE.map((item) => item[1]), ['75개', '149개', '7개 지역군', '5W3H + CMO']);
  assert.deepEqual(RESULT_DISTRIBUTION.map((item) => item[1]), [8, 11, 53, 3]);
  assert.equal(REPEATED_PROBLEMS.length, 7);
});

test('결론은 성공 판정이 아니라 반복 문제·작동장치·약화원인을 중심으로 구성한다', () => {
  assert.equal(OPERATING_MECHANISMS.length, 6);
  assert.equal(BREAKDOWN_PATTERNS.length, 5);
  assert.equal(FOLLOW_UP_RESEARCH_CRITERIA.length, 8);
  assert.deepEqual(FOLLOW_UP_RESEARCH_CRITERIA.map((item) => item[0]), ['문제', '이용자', '일상서비스', '운영주체', '공공·민간 역할', '재원', '실증', '단계전환']);
  assert.deepEqual(WORKING_OPERATION_FLOW, ['문제 정의', '운영 실증', '이용자 반응 확인', '역할·재원 조정', '참여자의 재선택', '단계적 제도화']);
  assert.equal(WEAKENING_OPERATION_FLOW.length, 6);
  assert.equal(SUCCESS_CONDITIONS.length, 6);
  assert.equal(FIELD_TEST_CHECKS.length, 8);
  assert.equal(ROLE_SPLIT.length, 4);
  assert.equal(FUNDING_LAYERS.length, 3);
  assert.equal(PERFORMANCE_STAGES.length, 4);
  assert.equal(DECISION_CHECKPOINTS.length, 8);
});

test('핵심 사례의 공개 근거와 수치를 보고서에 보존한다', () => {
  const text = `${OPERATING_MECHANISMS.map((item) => item.evidence).join(' ')} ${BREAKDOWN_PATTERNS.map((item) => item.evidence).join(' ')}`;

  for (const evidence of ['91%', '96%', '8.7만명', '749명', '90%', '71%', '62%', '64%', '67%', '84개', '26개', '최소 10곳', '42%', '30%']) {
    assert.match(text, new RegExp(evidence.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('03 보고서는 PDF Summary & Insight 맥락과 후속 연구의 발판을 명확히 한다', async () => {
  const page = await read('src/pages/cases/OperatingInsights.jsx');

  assert.match(page, /75개 사례에서 도출한/);
  assert.match(page, /7가지 공통 문제|일곱 가지/);
  assert.match(page, /53개는 실패 사례가 아니다/);
  assert.match(page, /성과가 축적된 사례는 여섯 가지 운영조건/);
  assert.match(page, /실증은 행사 동원력이 아니라 일상 운영의 지속성/);
  assert.match(page, /재원은 세 층으로 분리한다/);
  assert.match(page, /네 단계의 결과/);
  assert.match(page, /특정 BID의 외형이 아니라 검증 가능한 운영방식/);
  assert.doesNotMatch(page, /확정된 마스터플랜|Place Thesis|Working Thesis/);
});

test('보고서 문체는 제작 설명형 존댓말 대신 현재형 분석 문장으로 유지한다', async () => {
  const sources = await Promise.all([
    read('src/pages/cases/OperatingInsights.jsx'),
    read('src/data/operatingInsightsReport.js'),
  ]);

  for (const source of sources) {
    assert.doesNotMatch(source, /습니다|했습니다|였습니다|합니다|입니다|수 있습니다/);
  }
});
