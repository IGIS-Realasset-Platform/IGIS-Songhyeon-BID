import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('공통 지도는 OpenStreetMap 기본 스타일과 올바른 출처·Referer를 사용한다', async () => {
  const source = await readFile('src/components/map-activities/SonghyeonLeafletMap.jsx', 'utf8');
  assert.match(source, /export const DEFAULT_BASEMAP = 'standard'/);
  assert.match(source, /standard:\s*\{\s*url: 'https:\/\/tile\.openstreetmap\.org\/\{z\}\/\{x\}\/\{y\}\.png'/);
  assert.match(source, /https:\/\/www\.openstreetmap\.org\/copyright/);
  assert.match(source, /const source = TILE_LAYERS\[name\] \|\| TILE_LAYERS\[DEFAULT_BASEMAP\]/);
  assert.match(source, /basemap = DEFAULT_BASEMAP/);
  assert.match(source, /referrerPolicy: 'strict-origin-when-cross-origin'/);
});

test('통합·운영구역·자산·리테일·상권·제도·호텔 7개 지도 모두 동일한 기본값으로 열린다', async () => {
  const views = [
    ['src/pages/MapActivities.jsx', 2],
    ['src/components/map-activities/SonghyeonAssetRetailViews.jsx', 2],
    ['src/components/map-activities/SonghyeonMarketGovernanceViews.jsx', 2],
    ['src/components/map-activities/SonghyeonHotelWorkspace.jsx', 1],
  ];
  for (const [path, mapCount] of views) {
    const source = await readFile(path, 'utf8');
    assert.equal([...source.matchAll(/const \[basemap, setBasemap\] = useState\(DEFAULT_BASEMAP\)/g)].length, mapCount, path);
    assert.match(source, /<option value=\{DEFAULT_BASEMAP\}>기본 지도<\/option>/, path);
    assert.doesNotMatch(source, /useState\('(?:voyager|positron)'\)/, path);
    assert.match(source, /<option value="voyager">Voyager<\/option>/, '기존 스타일은 선택 사항으로 유지');
    assert.match(source, /<option value="positron">Positron<\/option>/);
  }
});
