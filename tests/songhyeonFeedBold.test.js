import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { splitFeedBold, toggleFeedBold } from '../src/lib/songhyeonFeedBold.js';

test('선택한 한국어 본문에 볼드를 적용하고 같은 선택으로 해제한다', () => {
  const source = '오늘 중요한 내용 공유';
  const next = toggleFeedBold(source, 3, 9);
  assert.equal(next.content, '오늘 **중요한 내용** 공유');
  assert.equal(next.content.slice(next.start, next.end), '중요한 내용');
  assert.deepEqual(toggleFeedBold(next.content, next.start, next.end), { content: source, start: 3, end: 9 });
  assert.deepEqual(toggleFeedBold(next.content, 3, 13), { content: source, start: 3, end: 9 });
});

test('선택이 없으면 교체할 문구를 선택하고 공백만 선택하면 유지한다', () => {
  const next = toggleFeedBold('앞 뒤', 2, 2);
  assert.equal(next.content, '앞 **굵은 글씨**뒤');
  assert.equal(next.content.slice(next.start, next.end), '굵은 글씨');
  assert.deepEqual(toggleFeedBold('앞  뒤', 1, 3), { content: '앞  뒤', start: 1, end: 3 });
});

test('선택 주변 공백과 줄바꿈을 보존한다', () => {
  const next = toggleFeedBold(' 첫째\n둘째 \n', 0, 8);
  assert.equal(next.content, ' **첫째\n둘째** \n');
  assert.deepEqual(splitFeedBold(next.content), [
    { text: ' ', bold: false }, { text: '첫째\n둘째', bold: true }, { text: ' \n', bold: false },
  ]);
});

test('일반 본문, 미완성 표식, 다른 마크다운은 원문 그대로 유지한다', () => {
  for (const source of ['일반 본문\n다음 줄', '**미완성', '****', '** **', '*기울임*', '<script>alert(1)</script>']) {
    assert.deepEqual(splitFeedBold(source), [{ text: source, bold: false }]);
  }
  assert.deepEqual(splitFeedBold(''), []);
});

test('여러 강조 구간과 한 글자 강조, 링크·멘션을 손실 없이 분리한다', () => {
  assert.deepEqual(splitFeedBold('**가** 및 **@임수빈 https://example.com/a?q=1** 끝'), [
    { text: '가', bold: true }, { text: ' 및 ', bold: false },
    { text: '@임수빈 https://example.com/a?q=1', bold: true }, { text: ' 끝', bold: false },
  ]);
});

test('작성·수정 공용 폼에 버튼과 단축키를 연결하고 기존 링크·멘션 렌더러를 재사용한다', async () => {
  const form = await readFile('src/components/iota-songhyeon/task-feed/SonghyeonTaskFeedWriteBox.jsx', 'utf8');
  const feed = await readFile('src/components/iota-songhyeon/task-feed/SonghyeonTaskFeed.jsx', 'utf8');
  assert.match(form, /onClick=\{applyBold\}/);
  assert.match(form, /event\.metaKey \|\| event\.ctrlKey/);
  assert.match(form, /field\.setSelectionRange\(next\.start, next\.end\)/);
  assert.match(feed, /<strong[^>]*className="font-bold">\s*<LinkifiedText text=\{part\.text\} mentions=\{mentions\}/);
  assert.doesNotMatch(feed, /dangerouslySetInnerHTML/);
});
