import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  buildTaskFeedStakeholderFilterOptions,
  formatTaskFeedStakeholder,
} from '../src/lib/songhyeonTaskFeedStakeholders.js';

test('회사·담당자 객체를 필터에 표시하고 비교할 문자열로 변환한다', () => {
  assert.deepEqual(buildTaskFeedStakeholderFilterOptions([
    { companyName: '서울시', contactName: '담당자' },
    { companyName: '이지스', contactName: '' },
    { companyName: '', contactName: '담당자만' },
  ]), ['서울시 - 담당자', '이지스', '담당자만']);
});

test('기존 문자열·DB 필드·분류 형식도 동일한 표시 규칙을 사용한다', () => {
  assert.equal(formatTaskFeedStakeholder(' 서울시 '), '서울시');
  assert.equal(formatTaskFeedStakeholder({ company_name: ' 서울시 ', contact_name: ' 담당자 ' }), '서울시 - 담당자');
  assert.equal(formatTaskFeedStakeholder({ name: '이지스' }), '이지스');
  assert.equal(formatTaskFeedStakeholder({ category: '공공기관' }), '공공기관');
});

test('빈 항목과 중복은 제거하되 같은 회사의 다른 담당자는 유지한다', () => {
  assert.deepEqual(buildTaskFeedStakeholderFilterOptions([
    null, undefined, {}, '', ' ',
    { companyName: '서울시', contactName: '담당자 A' },
    { company_name: '서울시', contact_name: '담당자 A' },
    '서울시 - 담당자 A',
    { companyName: '서울시', contactName: '담당자 B' },
  ]), ['서울시 - 담당자 A', '서울시 - 담당자 B']);
});

test('마스터에 없어도 열람 가능한 게시글의 이해관계자를 선택할 수 있다', () => {
  const posts = [
    { id: 'a', stakeholderLabel: '서울시 - 담당자' },
    { id: 'b', stakeholderLabel: '이전 등록 기관' },
    { id: 'c', stakeholderLabel: '' },
  ];
  const options = buildTaskFeedStakeholderFilterOptions([
    { companyName: '서울시', contactName: '담당자' },
  ], posts);
  assert.deepEqual(options, ['서울시 - 담당자', '이전 등록 기관']);
  for (const selected of options) {
    assert.equal(posts.filter((post) => post.stakeholderLabel === selected).length, 1);
  }
  assert.deepEqual(buildTaskFeedStakeholderFilterOptions([], posts), options);
  assert.deepEqual(buildTaskFeedStakeholderFilterOptions(), []);
});

test('테이블 필터만 문자열 목록을 사용하고 작성 폼은 원래 객체를 유지한다', async () => {
  const source = await readFile('src/components/iota-songhyeon/task-feed/SonghyeonTaskFeed.jsx', 'utf8');
  assert.match(source, /buildTaskFeedStakeholderFilterOptions\(options\.stakeholders, posts\)/);
  assert.match(source, /<FilterSelect label="이해관계자"[^\n]*options=\{stakeholderFilterOptions\}/);
  assert.match(source, /post\.stakeholderLabel === filters\.stakeholder/);
  assert.match(source, /<SonghyeonTaskFeedWriteBox[^\n]*options=\{options\}/);
});
