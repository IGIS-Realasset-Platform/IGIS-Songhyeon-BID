#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_PATH = 'scripts/build-songhyeon-map-data.mjs';
const SOURCE_MANIFEST_PATH = 'references/map-activities/manifest.json';
const OUTPUT_DIRECTORY = 'public/map-activities/data';
const OUTPUT_MANIFEST_PATH = `${OUTPUT_DIRECTORY}/manifest.json`;
const OUTPUT_MANIFEST_DIGEST_PATH = `${OUTPUT_DIRECTORY}/manifest.sha256`;
const PUBLIC_BASE_PATH = '/map-activities/data';
const sortStrings = (left, right) => (left < right ? -1 : left > right ? 1 : 0);

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, '..');
const sourceManifestFile = resolve(repositoryRoot, SOURCE_MANIFEST_PATH);
const outputDirectory = resolve(repositoryRoot, OUTPUT_DIRECTORY);

const bundleDefinitions = [
  {
    id: 'integrated-map',
    label: '통합지도',
    file: 'integrated-map.json',
    datasetNames: ['landmarks', 'activity_markers', 'asset_markers', 'public_spaces'],
  },
  {
    id: 'operating-boundaries',
    label: '운영구역',
    file: 'operating-boundaries.json',
    datasetNames: [
      'boundaries',
      'boundary_analysis',
      'boundary_geojson',
      'boundary_narratives',
      'delivery_parity',
    ],
  },
  {
    id: 'assets-leases',
    label: '자산·임차',
    file: 'assets-leases.json',
    datasetNames: ['assets'],
  },
  {
    id: 'market-activities',
    label: '상권·활동',
    file: 'market-activities.json',
    datasetNames: [
      'activities',
      'igis_retail',
      'program_operations',
      'retail_statistics',
      'store_display_audit',
    ],
  },
  {
    id: 'institutions-community',
    label: '제도·공동체',
    file: 'institutions-community.json',
    datasetNames: ['insights', 'organizations', 'plan_geojson', 'plans', 'strategies'],
  },
  {
    id: 'stores',
    label: '전체 점포',
    file: 'stores.json',
    datasetNames: ['stores'],
    standaloneDataset: true,
  },
];

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

function collectDirectFields(records) {
  const fields = new Set();
  for (const record of records) {
    if (!isPlainObject(record)) continue;
    for (const key of Object.keys(record)) fields.add(key);
  }
  return [...fields].sort(sortStrings);
}

function validateSourceDataset(entry, value, content) {
  const contentDigest = sha256(content);
  if (contentDigest !== entry.sha256) {
    throw new Error(`Source SHA-256 mismatch for ${entry.name}: ${contentDigest} != ${entry.sha256}`);
  }

  const canonicalContent = Buffer.from(serialize(value), 'utf8');
  if (sha256(canonicalContent) !== entry.sha256) {
    throw new Error(`Source dataset ${entry.name} is not in the deterministic canonical format.`);
  }

  if (valueType(value) !== entry.valueType) {
    throw new Error(`Value type mismatch for ${entry.name}.`);
  }

  const records = selectRecords(value, entry.recordPath);
  if (records.length !== entry.recordCount) {
    throw new Error(`Record count mismatch for ${entry.name}: ${records.length} != ${entry.recordCount}`);
  }

  assert.deepStrictEqual(
    collectDirectFields(records),
    entry.fields,
    `Direct field list mismatch for ${entry.name}.`,
  );

  const containerFields = isPlainObject(value) ? Object.keys(value).sort(sortStrings) : [];
  assert.deepStrictEqual(
    containerFields,
    entry.containerFields,
    `Container field list mismatch for ${entry.name}.`,
  );
}

async function writeAtomic(filePath, content) {
  await mkdir(dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(temporaryPath, content);
  await rename(temporaryPath, filePath);
}

function encodeJsonPointerSegment(value) {
  return value.replaceAll('~', '~0').replaceAll('/', '~1');
}

function resolveJsonPointer(document, pointer) {
  if (pointer === '') return document;
  if (!pointer.startsWith('/')) throw new Error(`Invalid JSON Pointer: ${pointer}`);

  return pointer
    .slice(1)
    .split('/')
    .map((segment) => segment.replaceAll('~1', '/').replaceAll('~0', '~'))
    .reduce((value, key) => value?.[key], document);
}

function validateBundleDefinitions(sourceDatasetNames) {
  const assignedNames = bundleDefinitions.flatMap((bundle) => bundle.datasetNames);
  const duplicateNames = assignedNames.filter((name, index) => assignedNames.indexOf(name) !== index);
  if (duplicateNames.length > 0) {
    throw new Error(`Datasets assigned to more than one runtime bundle: ${[...new Set(duplicateNames)].join(', ')}`);
  }

  const expected = [...sourceDatasetNames].sort(sortStrings);
  const actual = [...assignedNames].sort(sortStrings);
  assert.deepStrictEqual(actual, expected, 'Every source dataset must be assigned to exactly one runtime bundle.');

  for (const bundle of bundleDefinitions) {
    if (bundle.standaloneDataset && bundle.datasetNames.length !== 1) {
      throw new Error(`Standalone bundle ${bundle.id} must contain exactly one dataset.`);
    }
  }
}

function makeDatasetManifestEntry(entry, bundle, runtimeValueSha256) {
  const jsonPointer = bundle.standaloneDataset
    ? ''
    : `/datasets/${encodeJsonPointerSegment(entry.name)}`;

  return {
    name: entry.name,
    bundleId: bundle.id,
    file: bundle.file,
    repositoryPath: `${OUTPUT_DIRECTORY}/${bundle.file}`,
    publicPath: `${PUBLIC_BASE_PATH}/${bundle.file}`,
    jsonPointer,
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

async function verifyRuntime(runtimeManifest, sourceByName) {
  assert.equal(runtimeManifest.summary.datasetCount, sourceByName.size);
  const runtimeDocuments = new Map();

  for (const bundle of runtimeManifest.bundles) {
    const outputPath = resolve(repositoryRoot, bundle.repositoryPath);
    const content = await readFile(outputPath);
    assert.equal(content.byteLength, bundle.sizeBytes, `Runtime size mismatch for ${bundle.id}.`);
    assert.equal(sha256(content), bundle.sha256, `Runtime SHA-256 mismatch for ${bundle.id}.`);
    runtimeDocuments.set(bundle.id, JSON.parse(content.toString('utf8')));
  }

  for (const dataset of runtimeManifest.datasets) {
    const source = sourceByName.get(dataset.name);
    if (!source) throw new Error(`Runtime manifest contains unknown dataset ${dataset.name}.`);

    const runtimeDocument = runtimeDocuments.get(dataset.bundleId);
    const runtimeValue = resolveJsonPointer(runtimeDocument, dataset.jsonPointer);
    assert.deepStrictEqual(runtimeValue, source.value, `Runtime data differs from source for ${dataset.name}.`);

    const runtimeDigest = sha256(Buffer.from(serialize(runtimeValue), 'utf8'));
    assert.equal(runtimeDigest, dataset.runtimeValueSha256, `Runtime value SHA mismatch for ${dataset.name}.`);
    assert.equal(runtimeDigest, dataset.sourceSha256, `Source/runtime parity SHA mismatch for ${dataset.name}.`);

    const records = selectRecords(runtimeValue, dataset.recordPath);
    assert.equal(records.length, dataset.recordCount, `Runtime record count mismatch for ${dataset.name}.`);
    assert.deepStrictEqual(
      collectDirectFields(records),
      dataset.fields,
      `Runtime direct fields mismatch for ${dataset.name}.`,
    );
  }
}

async function main() {
  const sourceManifestContent = await readFile(sourceManifestFile);
  const sourceManifestSha256 = sha256(sourceManifestContent);
  const sourceManifest = JSON.parse(sourceManifestContent.toString('utf8'));

  if (!Array.isArray(sourceManifest.datasets)) {
    throw new Error(`${SOURCE_MANIFEST_PATH} does not contain a datasets array.`);
  }

  validateBundleDefinitions(sourceManifest.datasets.map((entry) => entry.name));

  const sourceByName = new Map();
  for (const entry of sourceManifest.datasets) {
    const sourcePath = resolve(repositoryRoot, entry.file);
    const content = await readFile(sourcePath);
    const value = JSON.parse(content.toString('utf8'));
    validateSourceDataset(entry, value, content);
    sourceByName.set(entry.name, { entry, value, content });
  }

  const bundleManifestEntries = [];
  const datasetManifestEntries = [];

  for (const bundle of bundleDefinitions) {
    let content;

    if (bundle.standaloneDataset) {
      content = sourceByName.get(bundle.datasetNames[0]).content;
    } else {
      const datasets = Object.fromEntries(
        bundle.datasetNames.map((name) => [name, sourceByName.get(name).value]),
      );
      content = Buffer.from(serialize({
        schemaVersion: 1,
        bundleId: bundle.id,
        label: bundle.label,
        generatedFrom: {
          sourceManifest: SOURCE_MANIFEST_PATH,
          sourceManifestSha256,
        },
        datasets,
      }), 'utf8');
    }

    const outputPath = resolve(outputDirectory, bundle.file);
    await writeAtomic(outputPath, content);

    const recordCount = bundle.datasetNames.reduce(
      (sum, name) => sum + sourceByName.get(name).entry.recordCount,
      0,
    );

    bundleManifestEntries.push({
      id: bundle.id,
      label: bundle.label,
      file: bundle.file,
      repositoryPath: `${OUTPUT_DIRECTORY}/${bundle.file}`,
      publicPath: `${PUBLIC_BASE_PATH}/${bundle.file}`,
      standaloneDataset: Boolean(bundle.standaloneDataset),
      datasetCount: bundle.datasetNames.length,
      recordCount,
      sizeBytes: content.byteLength,
      sha256: sha256(content),
      datasets: bundle.datasetNames,
    });

    for (const name of bundle.datasetNames) {
      const { entry, value } = sourceByName.get(name);
      const runtimeValueSha256 = sha256(Buffer.from(serialize(value), 'utf8'));
      datasetManifestEntries.push(makeDatasetManifestEntry(entry, bundle, runtimeValueSha256));
    }
  }

  datasetManifestEntries.sort((left, right) => sortStrings(left.name, right.name));

  const runtimeManifest = {
    schemaVersion: 1,
    dataVersion: 'songhyeon-map-activities-extracted-v1',
    generatedBy: SCRIPT_PATH,
    deterministic: true,
    publicBasePath: PUBLIC_BASE_PATH,
    provenance: {
      sourceManifest: {
        repositoryPath: SOURCE_MANIFEST_PATH,
        sha256: sourceManifestSha256,
        schemaVersion: sourceManifest.schemaVersion,
      },
      sourceDashboard: sourceManifest.source,
      extraction: sourceManifest.extraction,
    },
    summary: {
      bundleCount: bundleManifestEntries.length,
      datasetCount: datasetManifestEntries.length,
      sumOfDatasetRecordCounts: datasetManifestEntries.reduce((sum, entry) => sum + entry.recordCount, 0),
      totalSourceDatasetBytes: datasetManifestEntries.reduce((sum, entry) => sum + entry.sourceSizeBytes, 0),
      totalRuntimeDataBytes: bundleManifestEntries.reduce((sum, entry) => sum + entry.sizeBytes, 0),
    },
    bundles: bundleManifestEntries,
    datasets: datasetManifestEntries,
  };

  await verifyRuntime(runtimeManifest, sourceByName);

  const manifestContent = Buffer.from(serialize(runtimeManifest), 'utf8');
  const manifestDigest = sha256(manifestContent);
  await writeAtomic(resolve(repositoryRoot, OUTPUT_MANIFEST_PATH), manifestContent);
  await writeAtomic(
    resolve(repositoryRoot, OUTPUT_MANIFEST_DIGEST_PATH),
    Buffer.from(`${manifestDigest}  manifest.json\n`, 'utf8'),
  );

  const writtenManifest = await readFile(resolve(repositoryRoot, OUTPUT_MANIFEST_PATH));
  assert.equal(sha256(writtenManifest), manifestDigest, 'Written runtime manifest SHA-256 mismatch.');

  console.log(
    `Built ${runtimeManifest.summary.datasetCount} lossless datasets in ${runtimeManifest.summary.bundleCount} runtime files.`,
  );
  console.log(`Records: ${runtimeManifest.summary.sumOfDatasetRecordCounts}`);
  console.log(`Runtime data: ${runtimeManifest.summary.totalRuntimeDataBytes} bytes`);
  console.log(`Manifest SHA-256: ${manifestDigest}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
