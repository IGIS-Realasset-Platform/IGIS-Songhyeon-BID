#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1ODrn6Vtsh--dpmmkhhNw6VXy3bTbRLTpicBpMWxEsHI/edit?usp=sharing';
const DATASET_PATH = 'references/map-activities/datasets/igis_retail.json';
const MANIFEST_PATH = 'references/map-activities/manifest.json';
const ASSET_ORDER = ['쌈지길', '안녕인사동', '케이트윈타워', '트윈트리타워'];
const LARGE_PARENT_EXCLUSIONS = new Set(['메가커피', 'GDR 아카데미']);
const COLUMNS = [
  '위치', '자산명', '소유', '상점수', '위치 층', '대분류(Category)', '중분류(Category)',
  '브랜드명', '계약면적(평)', '모회사', 'Origin', 'Price Point', '운영상태', '변화유형',
  '조사 기준일', '확인상태', '출처', '공간 ID/호실', '비고',
];
const EXPECTED_STATUS = { '운영 중': 145, '공실': 24, '영업 종료': 3, '지원시설': 3 };
const EXPECTED_CHANGES = { '신규': 5, '위치변경': 6, '영업 종료': 3 };

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, '..');
const inputArgument = process.argv.find((argument) => argument.startsWith('--input='));
const inputPath = resolve(process.cwd(), inputArgument?.slice('--input='.length) || '/private/tmp/songhyeon-retail-sheet.json');

const clean = (value) => String(value ?? '').trim();
const canonicalAsset = (value) => {
  const asset = clean(value);
  if (asset.startsWith('케이트윈')) return '케이트윈타워';
  if (asset.startsWith('트윈트리')) return '트윈트리타워';
  return asset;
};
const numberOrNull = (value) => {
  const normalized = clean(value).replaceAll(',', '');
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
};
const normalizeOrigin = (value) => {
  const origin = clean(value).toLocaleLowerCase('en');
  if (origin === 'local') return 'Local';
  if (origin === 'global') return 'Global';
  return clean(value);
};
const canonicalize = (value) => {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  }
  return value;
};
const serialize = (value) => `${JSON.stringify(canonicalize(value), null, 2)}\n`;
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const countBy = (values) => Object.fromEntries([...new Set(values)].sort().map((value) => [value, values.filter((item) => item === value).length]));
const assertEqual = (actual, expected, label) => {
  if (JSON.stringify(canonicalize(actual)) !== JSON.stringify(canonicalize(expected))) {
    throw new Error(`${label} mismatch: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  }
};
const writeAtomic = async (filePath, content) => {
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(temporaryPath, content);
  await rename(temporaryPath, filePath);
};

const source = JSON.parse(await readFile(inputPath, 'utf8'));
if (!Array.isArray(source.retail) || source.retail.length !== 176) throw new Error('Retail 현황은 헤더 포함 176행이어야 합니다.');
if (!Array.isArray(source.changes) || source.changes.length < 24) throw new Error('변경사항 시트 구조를 확인할 수 없습니다.');

const priorDatasetPath = resolve(repositoryRoot, DATASET_PATH);
const priorDataset = JSON.parse(await readFile(priorDatasetPath, 'utf8'));
const retailRows = source.retail.slice(1);
const assetCounts = countBy(retailRows.map((row) => canonicalAsset(row[2])));
assertEqual(assetCounts, { '쌈지길': 101, '안녕인사동': 49, '케이트윈타워': 18, '트윈트리타워': 7 }, '자산별 행 수');
assertEqual(countBy(retailRows.map((row) => clean(row[13]))), EXPECTED_STATUS, '운영상태 합계');

const records = retailRows.map((row, index) => {
  const rawValues = row.slice(1, 20).map((value) => clean(value) || null);
  const asset = canonicalAsset(row[2]);
  const brand = clean(row[8]);
  const parentCompany = clean(row[10]);
  return {
    normalized: {
      asset,
      asset_detail: clean(row[2]),
      brand,
      category: clean(row[6]),
      change_type: clean(row[14]),
      contract_area_pyeong: numberOrNull(row[9]),
      declared_store_count: assetCounts[asset],
      floor: clean(row[5]),
      has_large_corporate_parent: Boolean(parentCompany) && !LARGE_PARENT_EXCLUSIONS.has(brand),
      has_parent_company: Boolean(parentCompany),
      notes: clean(row[19]),
      operating_status: clean(row[13]),
      origin: normalizeOrigin(row[11]),
      owner: clean(row[3]) === 'IGIS' ? '이지스자산운용' : clean(row[3]),
      parent_company: parentCompany,
      price_point: clean(row[12]),
      source: clean(row[17]),
      space_id: clean(row[18]),
      subcategory: clean(row[7]),
      survey_date: clean(row[15]),
      verification_status: clean(row[16]),
    },
    raw_values: rawValues,
    source_row: index + 2,
  };
});

const changeRows = source.changes.slice(3, 17).map((row, index) => ({
  asset: canonicalAsset(row[0]),
  brand: clean(row[2]),
  change_type: clean(row[4]),
  current_floor: clean(row[1]),
  note: clean(row[6]),
  operating_status: clean(row[3]),
  source_row: index + 4,
}));
assertEqual(countBy(changeRows.map((row) => row.change_type)), EXPECTED_CHANGES, '변경유형 합계');

const byAsset = source.changes.slice(20, 24).map((row) => ({
  active: Number(row[1]),
  asset: canonicalAsset(row[0]),
  closed: Number(row[3]),
  support: Number(row[4]),
  vacant: Number(row[2]),
}));

const mapAssets = priorDataset.map_assets.map((item) => ({
  ...item,
  retail_count: assetCounts[item.asset] || 0,
}));
const dataset = {
  asset_order: ASSET_ORDER,
  change_log: changeRows,
  change_summary: {
    by_asset: byAsset,
    definitions: [
      '위치변경: 기존 대시보드 스태킹 플랜과 현재 위치가 다른 상점',
      '신규: 기존 대시보드 스태킹 플랜에 없었던 상호',
      '영업 종료 상점과 공실은 별도로 집계',
    ],
    new: EXPECTED_CHANGES['신규'],
    relocated: EXPECTED_CHANGES['위치변경'],
    closed: EXPECTED_CHANGES['영업 종료'],
    total: changeRows.length,
  },
  map_assets: mapAssets,
  metadata: {
    columns: COLUMNS,
    imported_on: '2026-08-18',
    large_corporate_parent_excluded_brands: [...LARGE_PARENT_EXCLUSIONS],
    reconciliation_note: '공유 시트의 Retail 현황 175행과 변경사항 14건을 동일 기준으로 반영했습니다.',
    row_count: records.length,
    sheet_name: 'Retail 현황',
    source_title: '송현BID 리테일 리서치_지원_기획추진협력',
    source_url: SHEET_URL,
    change_sheet_name: '변경사항',
  },
  records,
};

const datasetContent = serialize(dataset);
await writeAtomic(priorDatasetPath, datasetContent);

const manifestPath = resolve(repositoryRoot, MANIFEST_PATH);
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const entry = manifest.datasets.find((item) => item.name === 'igis_retail');
if (!entry) throw new Error('source manifest에서 igis_retail을 찾지 못했습니다.');
entry.containerFields = Object.keys(dataset).sort();
entry.fields = ['normalized', 'raw_values', 'source_row'];
entry.recordCount = records.length;
entry.sha256 = sha256(datasetContent);
entry.sizeBytes = Buffer.byteLength(datasetContent);
manifest.summary.sumOfDatasetRecordCounts = manifest.datasets.reduce((sum, item) => sum + item.recordCount, 0);
manifest.summary.totalDatasetBytes = manifest.datasets.reduce((sum, item) => sum + item.sizeBytes, 0);
await writeAtomic(manifestPath, serialize(manifest));

console.log(JSON.stringify({
  assets: assetCounts,
  changes: EXPECTED_CHANGES,
  dataset: DATASET_PATH,
  records: records.length,
  status: EXPECTED_STATUS,
}, null, 2));
