#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_PATH = 'scripts/build-songhyeon-hotel-data.mjs';
const DATA_ELEMENT_ID = 'dashboard-data';
const BASE_SOURCE_MANIFEST_PATH = 'references/map-activities/manifest.json';
const HOTEL_REFERENCE_DIRECTORY = 'references/map-activities/hotel';
const HOTEL_DATASET_DIRECTORY = `${HOTEL_REFERENCE_DIRECTORY}/datasets`;
const HOTEL_SOURCE_MANIFEST_PATH = `${HOTEL_REFERENCE_DIRECTORY}/manifest.json`;
const RUNTIME_DIRECTORY = 'public/map-activities/data';
const RUNTIME_MANIFEST_PATH = `${RUNTIME_DIRECTORY}/manifest.json`;
const RUNTIME_MANIFEST_DIGEST_PATH = `${RUNTIME_DIRECTORY}/manifest.sha256`;
const HOTEL_RUNTIME_PATH = `${RUNTIME_DIRECTORY}/hotel.json`;
const PUBLIC_HOTEL_PATH = '/map-activities/data/hotel.json';
const HOTEL_DATASET_NAMES = Object.freeze(['hotel_display_audit', 'hotels']);
const EXPECTED_HOTEL_FIELDS = Object.freeze([
  'address',
  'building',
  'bukchon',
  'classification_basis',
  'compact',
  'east',
  'facility_id',
  'grade',
  'grade_checked_at',
  'grade_source_url',
  'grade_status',
  'homepage',
  'id',
  'lat',
  'lodging_style',
  'lodging_type',
  'lon',
  'name',
  'official_business_type',
  'official_hotel_name',
  'official_record_id',
  'operator_name',
  'rating_decision_date',
  'rating_match_method',
  'room_count',
  'segment',
  'source_category2',
  'source_lodging_type',
  'store_checked_at',
  'store_id',
  'store_published_at',
  'store_source_url',
]);
const EXPECTED_HOTEL_AUDIT = Object.freeze({
  total: 266,
  compact: 24,
  bukchon: 37,
  east: 56,
  official_grade_total: 13,
  official_grade_east: 5,
});
const sortStrings = (left, right) => (left < right ? -1 : left > right ? 1 : 0);

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, '..');

function printHelp() {
  console.log(`Usage: node ${SCRIPT_PATH} [--source <v1.2-html-path>]

Without --source, rebuilds the additive hotel runtime bundle from the tracked
hotel reference datasets. With --source, first extracts only \"hotels\" and
\"hotel_display_audit\" from the supplied v1.2 dashboard after proving that all
21 pre-existing datasets are unchanged.
`);
}

function parseArguments(argv) {
  let source;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--help' || argument === '-h') return { help: true, source };
    if (argument === '--source') {
      source = argv[index + 1];
      if (!source || source.startsWith('--')) throw new Error('--source requires an HTML file path.');
      index += 1;
      continue;
    }
    if (argument.startsWith('--source=')) {
      source = argument.slice('--source='.length);
      if (!source) throw new Error('--source requires an HTML file path.');
      continue;
    }
    throw new Error(`Unknown argument: ${argument}`);
  }

  return { help: false, source };
}

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function valueType(value) {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value === 'object' ? 'object' : typeof value;
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.keys(value)
        .sort(sortStrings)
        .map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

function serialize(value) {
  return `${JSON.stringify(canonicalize(value), null, 2)}\n`;
}

function extractEmbeddedJson(html) {
  const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  let match;

  while ((match = scriptPattern.exec(html)) !== null) {
    const idMatch = match[1].match(/\bid\s*=\s*(["'])(.*?)\1/i);
    if (idMatch?.[2] === DATA_ELEMENT_ID) return match[2];
  }

  throw new Error(`Could not find <script id=\"${DATA_ELEMENT_ID}\"> in the source HTML.`);
}

function selectRecords(dataset, recordPath) {
  if (recordPath === '$') {
    if (!Array.isArray(dataset)) throw new Error('Expected an array at record path $.');
    return dataset;
  }
  if (recordPath === '$.features') {
    if (!Array.isArray(dataset?.features)) throw new Error('Expected an array at record path $.features.');
    return dataset.features;
  }
  if (recordPath === '$.records') {
    if (!Array.isArray(dataset?.records)) throw new Error('Expected an array at record path $.records.');
    return dataset.records;
  }
  if (recordPath === '$.*') {
    if (!isPlainObject(dataset)) throw new Error('Expected an object at record path $.*.');
    return Object.values(dataset);
  }
  throw new Error(`Unsupported record path: ${recordPath}`);
}

function inferRecordPath(dataset) {
  if (Array.isArray(dataset)) return '$';
  if (isPlainObject(dataset) && Array.isArray(dataset.features)) return '$.features';
  if (isPlainObject(dataset) && Array.isArray(dataset.records)) return '$.records';
  if (isPlainObject(dataset)) return '$.*';
  return '$';
}

function collectDirectFields(records) {
  const fields = new Set();
  for (const record of records) {
    if (!isPlainObject(record)) continue;
    for (const field of Object.keys(record)) fields.add(field);
  }
  return [...fields].sort(sortStrings);
}

function isIdKey(key) {
  return key.toLowerCase() === 'id' || key.toLowerCase().endsWith('_id');
}

function summarizeIdFields(records) {
  const paths = new Set();
  for (const record of records) {
    if (!isPlainObject(record)) continue;
    for (const [key, value] of Object.entries(record)) {
      if (isIdKey(key) && (value === null || ['string', 'number', 'boolean'].includes(typeof value))) {
        paths.add(key);
      }
    }
  }

  return [...paths].sort(sortStrings).map((fieldPath) => {
    const counts = new Map();
    const displayValues = new Map();
    let populatedCount = 0;

    for (const record of records) {
      const value = isPlainObject(record) ? record[fieldPath] : undefined;
      if (value === null || value === undefined || value === '') continue;
      populatedCount += 1;
      const key = JSON.stringify(value);
      counts.set(key, (counts.get(key) ?? 0) + 1);
      displayValues.set(key, value);
    }

    const duplicates = [...counts.entries()]
      .filter(([, count]) => count > 1)
      .sort(([left], [right]) => sortStrings(left, right))
      .map(([key, count]) => ({ value: displayValues.get(key), count }));

    return {
      path: fieldPath,
      populatedCount,
      missingCount: records.length - populatedCount,
      uniqueCount: counts.size,
      duplicateValueCount: duplicates.length,
      duplicateRecordCount: duplicates.reduce((sum, duplicate) => sum + duplicate.count, 0),
      duplicateExcessCount: duplicates.reduce((sum, duplicate) => sum + duplicate.count - 1, 0),
      duplicates,
    };
  });
}

async function writeAtomic(filePath, content) {
  await mkdir(dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(temporaryPath, content);
  await rename(temporaryPath, filePath);
}

function makeSourceDatasetEntry(name, value) {
  const recordPath = inferRecordPath(value);
  const records = selectRecords(value, recordPath);
  const content = Buffer.from(serialize(value), 'utf8');
  return {
    name,
    file: `${HOTEL_DATASET_DIRECTORY}/${name}.json`,
    valueType: valueType(value),
    recordPath,
    recordCount: records.length,
    fields: collectDirectFields(records),
    containerFields: isPlainObject(value) ? Object.keys(value).sort(sortStrings) : [],
    idFields: summarizeIdFields(records),
    sizeBytes: content.byteLength,
    sha256: sha256(content),
  };
}

function validateHotelSemantics(hotels, audit) {
  assert.ok(Array.isArray(hotels), 'hotels must be an array.');
  assert.equal(hotels.length, 266, 'Expected all 266 hotel facilities.');
  assert.deepStrictEqual(collectDirectFields(hotels), [...EXPECTED_HOTEL_FIELDS], 'Hotel fields changed.');
  assert.deepStrictEqual(audit, EXPECTED_HOTEL_AUDIT, 'Hotel display audit changed.');

  const facilityIds = new Set();
  const referencedStoreIds = new Set();
  let officialGradeCount = 0;

  for (const hotel of hotels) {
    assert.ok(isPlainObject(hotel), 'Every hotel record must be an object.');
    assert.equal(hotel.id, hotel.facility_id, `Hotel id/facility_id mismatch: ${hotel.id}`);
    assert.ok(!facilityIds.has(hotel.facility_id), `Duplicate hotel facility_id: ${hotel.facility_id}`);
    facilityIds.add(hotel.facility_id);
    assert.equal(typeof hotel.lon, 'number', `Hotel ${hotel.facility_id} has no numeric lon.`);
    assert.equal(typeof hotel.lat, 'number', `Hotel ${hotel.facility_id} has no numeric lat.`);
    if (hotel.grade_status === '공식 확인') officialGradeCount += 1;
    for (const storeId of String(hotel.store_id || '').split(' | ').filter(Boolean)) {
      assert.ok(!referencedStoreIds.has(storeId), `Store id is linked more than once: ${storeId}`);
      referencedStoreIds.add(storeId);
    }
  }

  assert.equal(officialGradeCount, 13, 'Expected 13 officially graded hotels.');
  assert.equal(referencedStoreIds.size, 269, 'Expected all 269 source lodging-store ids.');
  assert.equal(hotels.filter((hotel) => hotel.compact).length, audit.compact);
  assert.equal(hotels.filter((hotel) => hotel.bukchon).length, audit.bukchon);
  assert.equal(hotels.filter((hotel) => hotel.east).length, audit.east);
  assert.equal(hotels.filter((hotel) => hotel.grade_status === '공식 확인' && hotel.east).length, audit.official_grade_east);

  return referencedStoreIds;
}

async function validateBaseDatasets(payload, baseSourceManifest) {
  assert.equal(baseSourceManifest.datasets.length, 21, 'The base source manifest must remain at 21 datasets.');
  const baseNames = baseSourceManifest.datasets.map((entry) => entry.name).sort(sortStrings);
  const sourceNames = Object.keys(payload).sort(sortStrings);
  assert.deepStrictEqual(
    sourceNames,
    [...baseNames, ...HOTEL_DATASET_NAMES].sort(sortStrings),
    'The v1.2 payload must contain exactly the unchanged 21 base datasets plus the two hotel datasets.',
  );

  for (const entry of baseSourceManifest.datasets) {
    const trackedContent = await readFile(resolve(repositoryRoot, entry.file));
    assert.equal(sha256(trackedContent), entry.sha256, `Tracked base SHA mismatch for ${entry.name}.`);
    const sourceContent = Buffer.from(serialize(payload[entry.name]), 'utf8');
    assert.equal(sha256(sourceContent), entry.sha256, `v1.2 changed base dataset ${entry.name}.`);
  }

  const stores = payload.stores;
  assert.ok(Array.isArray(stores), 'The unchanged stores dataset is required for hotel link validation.');
  return new Set(stores.map((store) => store.id));
}

async function extractHotelReferences(sourcePath) {
  const [sourceContent, baseManifestContent] = await Promise.all([
    readFile(sourcePath),
    readFile(resolve(repositoryRoot, BASE_SOURCE_MANIFEST_PATH)),
  ]);
  const embeddedJson = extractEmbeddedJson(sourceContent.toString('utf8'));
  const payload = JSON.parse(embeddedJson);
  assert.ok(isPlainObject(payload), `The embedded ${DATA_ELEMENT_ID} payload must be an object.`);

  const baseSourceManifest = JSON.parse(baseManifestContent.toString('utf8'));
  const existingStoreIds = await validateBaseDatasets(payload, baseSourceManifest);
  const referencedStoreIds = validateHotelSemantics(payload.hotels, payload.hotel_display_audit);
  for (const storeId of referencedStoreIds) {
    assert.ok(existingStoreIds.has(storeId), `Hotel references unknown store id ${storeId}.`);
  }

  const entries = HOTEL_DATASET_NAMES.map((name) => makeSourceDatasetEntry(name, payload[name]));
  for (const entry of entries) {
    await writeAtomic(
      resolve(repositoryRoot, entry.file),
      Buffer.from(serialize(payload[entry.name]), 'utf8'),
    );
  }

  const manifest = {
    schemaVersion: 1,
    source: {
      fileName: basename(sourcePath),
      sizeBytes: sourceContent.byteLength,
      sha256: sha256(sourceContent),
      embeddedJson: {
        elementId: DATA_ELEMENT_ID,
        sizeBytes: Buffer.byteLength(embeddedJson, 'utf8'),
        sha256: sha256(embeddedJson),
      },
    },
    extraction: {
      script: SCRIPT_PATH,
      datasetDirectory: HOTEL_DATASET_DIRECTORY,
      selectedDatasetNames: HOTEL_DATASET_NAMES,
      deterministic: true,
    },
    isolation: {
      baseSourceManifest: BASE_SOURCE_MANIFEST_PATH,
      baseSourceManifestSha256: sha256(baseManifestContent),
      verifiedUnchangedDatasetCount: baseSourceManifest.datasets.length,
      verifiedUnchangedDatasetNames: baseSourceManifest.datasets.map((entry) => entry.name).sort(sortStrings),
      resolvedStoreReferenceCount: referencedStoreIds.size,
    },
    summary: {
      datasetCount: entries.length,
      sumOfDatasetRecordCounts: entries.reduce((sum, entry) => sum + entry.recordCount, 0),
      totalDatasetBytes: entries.reduce((sum, entry) => sum + entry.sizeBytes, 0),
    },
    datasets: entries,
  };

  await writeAtomic(
    resolve(repositoryRoot, HOTEL_SOURCE_MANIFEST_PATH),
    Buffer.from(serialize(manifest), 'utf8'),
  );

  console.log(`Extracted ${payload.hotels.length} hotel facilities without changing the 21 base datasets.`);
}

function validateSourceDataset(entry, value, content) {
  assert.equal(sha256(content), entry.sha256, `Source SHA mismatch for ${entry.name}.`);
  assert.equal(serialize(value), content.toString('utf8'), `${entry.name} is not canonical JSON.`);
  assert.equal(valueType(value), entry.valueType, `Value type mismatch for ${entry.name}.`);
  const records = selectRecords(value, entry.recordPath);
  assert.equal(records.length, entry.recordCount, `Record count mismatch for ${entry.name}.`);
  assert.deepStrictEqual(collectDirectFields(records), entry.fields, `Fields mismatch for ${entry.name}.`);
  assert.deepStrictEqual(
    isPlainObject(value) ? Object.keys(value).sort(sortStrings) : [],
    entry.containerFields,
    `Container fields mismatch for ${entry.name}.`,
  );
}

function makeRuntimeDatasetEntry(entry, runtimeValueSha256) {
  return {
    name: entry.name,
    bundleId: 'hotel',
    file: 'hotel.json',
    repositoryPath: HOTEL_RUNTIME_PATH,
    publicPath: PUBLIC_HOTEL_PATH,
    jsonPointer: `/datasets/${entry.name}`,
    valueType: entry.valueType,
    recordPath: entry.recordPath,
    recordCount: entry.recordCount,
    fields: entry.fields,
    containerFields: entry.containerFields,
    idFields: entry.idFields,
    sourceFile: entry.file,
    sourceSizeBytes: entry.sizeBytes,
    sourceSha256: entry.sha256,
    runtimeValueSha256,
  };
}

function stripHotelAddition(manifest) {
  const additions = isPlainObject(manifest.additions) ? { ...manifest.additions } : {};
  delete additions.hotel;
  const baseManifest = { ...manifest };
  delete baseManifest.additions;
  return { baseManifest, otherAdditions: additions };
}

async function buildHotelRuntime() {
  const [sourceManifestContent, runtimeManifestContent] = await Promise.all([
    readFile(resolve(repositoryRoot, HOTEL_SOURCE_MANIFEST_PATH)),
    readFile(resolve(repositoryRoot, RUNTIME_MANIFEST_PATH)),
  ]);
  const sourceManifest = JSON.parse(sourceManifestContent.toString('utf8'));
  assert.equal(sourceManifest.summary.datasetCount, 2, 'Hotel source manifest must contain exactly two datasets.');
  assert.deepStrictEqual(
    sourceManifest.datasets.map((entry) => entry.name).sort(sortStrings),
    [...HOTEL_DATASET_NAMES],
  );

  const sourceByName = new Map();
  for (const entry of sourceManifest.datasets) {
    const content = await readFile(resolve(repositoryRoot, entry.file));
    const value = JSON.parse(content.toString('utf8'));
    validateSourceDataset(entry, value, content);
    sourceByName.set(entry.name, { entry, value });
  }

  const hotels = sourceByName.get('hotels').value;
  const audit = sourceByName.get('hotel_display_audit').value;
  validateHotelSemantics(hotels, audit);

  const sourceManifestSha256 = sha256(sourceManifestContent);
  const runtimeBundle = {
    schemaVersion: 1,
    bundleId: 'hotel',
    label: '호텔',
    provenance: {
      sourceManifest: HOTEL_SOURCE_MANIFEST_PATH,
      sourceManifestSha256,
    },
    datasets: Object.fromEntries(
      HOTEL_DATASET_NAMES.map((name) => [name, sourceByName.get(name).value]),
    ),
  };
  const runtimeBundleContent = Buffer.from(serialize(runtimeBundle), 'utf8');
  await writeAtomic(resolve(repositoryRoot, HOTEL_RUNTIME_PATH), runtimeBundleContent);

  const currentManifest = JSON.parse(runtimeManifestContent.toString('utf8'));
  const { baseManifest, otherAdditions } = stripHotelAddition(currentManifest);
  assert.equal(baseManifest.bundles.length, 6, 'The existing runtime must retain exactly six base bundles.');
  assert.equal(baseManifest.datasets.length, 21, 'The existing runtime must retain exactly 21 base datasets.');
  assert.equal(baseManifest.summary.bundleCount, 6, 'The existing base summary bundle count changed.');
  assert.equal(baseManifest.summary.datasetCount, 21, 'The existing base summary dataset count changed.');

  const runtimeDatasetEntries = sourceManifest.datasets
    .map((entry) => makeRuntimeDatasetEntry(entry, entry.sha256))
    .sort((left, right) => sortStrings(left.name, right.name));
  const hotelBundleEntry = {
    id: 'hotel',
    label: '호텔',
    file: 'hotel.json',
    repositoryPath: HOTEL_RUNTIME_PATH,
    publicPath: PUBLIC_HOTEL_PATH,
    standaloneDataset: false,
    datasetCount: runtimeDatasetEntries.length,
    recordCount: runtimeDatasetEntries.reduce((sum, entry) => sum + entry.recordCount, 0),
    sizeBytes: runtimeBundleContent.byteLength,
    sha256: sha256(runtimeBundleContent),
    datasets: HOTEL_DATASET_NAMES,
  };
  const hotelAddition = {
    generatedBy: SCRIPT_PATH,
    deterministic: true,
    provenance: {
      sourceManifest: {
        repositoryPath: HOTEL_SOURCE_MANIFEST_PATH,
        sha256: sourceManifestSha256,
        schemaVersion: sourceManifest.schemaVersion,
      },
      sourceDashboard: sourceManifest.source,
      extraction: sourceManifest.extraction,
      isolation: sourceManifest.isolation,
      baseRuntimeManifestSha256: sha256(Buffer.from(serialize(baseManifest), 'utf8')),
    },
    summary: {
      bundleCount: 1,
      datasetCount: runtimeDatasetEntries.length,
      sumOfDatasetRecordCounts: runtimeDatasetEntries.reduce((sum, entry) => sum + entry.recordCount, 0),
      totalSourceDatasetBytes: runtimeDatasetEntries.reduce((sum, entry) => sum + entry.sourceSizeBytes, 0),
      totalRuntimeDataBytes: runtimeBundleContent.byteLength,
    },
    bundle: hotelBundleEntry,
    datasets: runtimeDatasetEntries,
  };

  const outputManifest = {
    ...baseManifest,
    additions: {
      ...otherAdditions,
      hotel: hotelAddition,
    },
  };

  assert.deepStrictEqual(outputManifest.bundles, currentManifest.bundles, 'Base bundle entries changed.');
  assert.deepStrictEqual(outputManifest.datasets, currentManifest.datasets, 'Base dataset entries changed.');
  assert.deepStrictEqual(outputManifest.summary, currentManifest.summary, 'Base summary changed.');

  const outputManifestContent = Buffer.from(serialize(outputManifest), 'utf8');
  const outputManifestDigest = sha256(outputManifestContent);
  await writeAtomic(resolve(repositoryRoot, RUNTIME_MANIFEST_PATH), outputManifestContent);
  await writeAtomic(
    resolve(repositoryRoot, RUNTIME_MANIFEST_DIGEST_PATH),
    Buffer.from(`${outputManifestDigest}  manifest.json\n`, 'utf8'),
  );

  const [writtenBundle, writtenManifest] = await Promise.all([
    readFile(resolve(repositoryRoot, HOTEL_RUNTIME_PATH)),
    readFile(resolve(repositoryRoot, RUNTIME_MANIFEST_PATH)),
  ]);
  assert.equal(sha256(writtenBundle), hotelBundleEntry.sha256, 'Written hotel bundle SHA mismatch.');
  assert.equal(sha256(writtenManifest), outputManifestDigest, 'Written manifest SHA mismatch.');
  const writtenPayload = JSON.parse(writtenBundle.toString('utf8'));
  assert.deepStrictEqual(writtenPayload.datasets.hotels, hotels, 'Runtime hotels differ from the source.');
  assert.deepStrictEqual(writtenPayload.datasets.hotel_display_audit, audit, 'Runtime hotel audit differs from the source.');

  console.log(`Built additive hotel bundle: ${hotels.length} facilities, ${hotelBundleEntry.recordCount} total records.`);
  console.log(`Hotel bundle SHA-256: ${hotelBundleEntry.sha256}`);
  console.log(`Manifest SHA-256: ${outputManifestDigest}`);
}

async function main() {
  const arguments_ = parseArguments(process.argv.slice(2));
  if (arguments_.help) {
    printHelp();
    return;
  }

  if (arguments_.source) await extractHotelReferences(resolve(arguments_.source));
  await buildHotelRuntime();
}

main().catch((error) => {
  console.error(`Hotel data build failed: ${error.message}`);
  process.exitCode = 1;
});
