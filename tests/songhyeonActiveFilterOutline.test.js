import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

test('마일스톤의 활성 셀렉트와 검색 필터는 파란 외곽선으로 구분된다', () => {
  const source = read('src/components/iota-songhyeon/pmo/SonghyeonDetailedSchedule.jsx');
  assert.match(source, /const isActive = value !== options\[0\]\?\.value/u);
  assert.match(source, /data-filter-active=\{isActive \? 'true' : undefined\}/u);
  assert.match(source, /isActive \? 'border-\[#2997ff\] bg-\[#334155\]/u);
  assert.match(source, /data-filter-active=\{searchTerm \? 'true' : undefined\}/u);
});

test('통합업무보드의 활성 헤더 셀렉트와 검색 필터도 같은 외곽선을 사용한다', () => {
  const source = read('src/components/iota-songhyeon/task-board/SonghyeonTaskBoard.jsx');
  assert.match(source, /const isActive = value !== ALL/u);
  assert.match(source, /data-filter-active=\{isActive \? 'true' : undefined\}/u);
  assert.match(source, /isActive \? 'border-\[#2997ff\] bg-\[#334155\]/u);
  assert.match(source, /data-filter-active=\{searchQuery \? 'true' : undefined\}/u);
});
