#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { access, mkdir, readFile, readdir, rename, stat, unlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA_ELEMENT_ID = 'dashboard-data';
const DEFAULT_SOURCE_FILE = '260804_songhyeon_bid_dashboard_v1.1.html';
const SCRIPT_PATH = 'scripts/extract-songhyeon-map-activities.mjs';
const DATASET_DIRECTORY = 'references/map-activities/datasets';
const SAFE_DATASET_NAME = /^[A-Za-z0-9_-]+$/;
const sortStrings = (left, right) => (left < right ? -1 : left > right ? 1 : 0);

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');
const outputRoot = path.join(repositoryRoot, 'references', 'map-activities');
const datasetRoot = path.join(outputRoot, 'datasets');

function printHelp() {
  console.log(`Usage: node ${SCRIPT_PATH} [--source <html-path>]

Extracts the JSON embedded in <script id="${DATA_ELEMENT_ID}"> into the fixed,
reference-only staging directory ${DATASET_DIRECTORY}.

Source resolution order:
  1. --source <html-path>
  2. SONGHYEON_MAP_DASHBOARD_SOURCE
  3. ~/Downloads/${DEFAULT_SOURCE_FILE}
`);
}

function parseArguments(argv) {
  let source;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === '--help' || argument === '-h') {
      return { help: true };
    }

    if (argument === '--source') {
      source = argv[index + 1];
      if (!source || source.startsWith('--')) {
        throw new Error('--source requires an HTML file path.');
      }
      index += 1;
      continue;
    }

    if (argument.startsWith('--source=')) {
      source = argument.slice('--source='.length);
      if (!source) {
        throw new Error('--source requires an HTML file path.');
      }
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
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }

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
    const attributes = match[1];
    const idMatch = attributes.match(/\bid\s*=\s*(["'])(.*?)\1/i);
    if (idMatch?.[2] === DATA_ELEMENT_ID) {
      return match[2];
    }
  }

  throw new Error(`Could not find <script id="${DATA_ELEMENT_ID}"> in the source HTML.`);
}

function selectRecords(dataset) {
  if (Array.isArray(dataset)) {
    return { records: dataset, recordPath: '$' };
  }

  if (isPlainObject(dataset) && Array.isArray(dataset.features)) {
    return { records: dataset.features, recordPath: '$.features' };
  }

  if (isPlainObject(dataset) && Array.isArray(dataset.records)) {
    return { records: dataset.records, recordPath: '$.records' };
  }

  if (isPlainObject(dataset)) {
    return { records: Object.values(dataset), recordPath: '$.*' };
  }

  return { records: [], recordPath: '$' };
}

function collectDirectFields(records) {
  const fields = new Set();

  for (const record of records) {
    if (!isPlainObject(record)) continue;
    for (const key of Object.keys(record)) fields.add(key);
  }

  return [...fields].sort(sortStrings);
}

function isIdKey(key) {
  return key.toLowerCase() === 'id' || key.toLowerCase().endsWith('_id');
}

function isPopulatedId(value) {
  return value !== null && value !== undefined && value !== '';
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
      if (!isPopulatedId(value)) continue;

      populatedCount += 1;
      const key = JSON.stringify(value);
      counts.set(key, (counts.get(key) ?? 0) + 1);
      displayValues.set(key, value);
    }

    const duplicates = [...counts.entries()]
      .filter(([, count]) => count > 1)
      .sort(([left], [right]) => sortStrings(left, right))
      .map(([key, count]) => ({ value: displayValues.get(key), count }));

    const duplicateRecordCount = duplicates.reduce((sum, duplicate) => sum + duplicate.count, 0);
    const duplicateExcessCount = duplicates.reduce((sum, duplicate) => sum + duplicate.count - 1, 0);

    return {
      path: fieldPath,
      populatedCount,
      missingCount: records.length - populatedCount,
      uniqueCount: counts.size,
      duplicateValueCount: duplicates.length,
      duplicateRecordCount,
      duplicateExcessCount,
      duplicates,
    };
  });
}

async function atomicWrite(filePath, content) {
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(temporaryPath, content, 'utf8');
  await rename(temporaryPath, filePath);
}

async function removeStaleDatasetFiles(expectedFiles) {
  let entries = [];
  try {
    entries = await readdir(datasetRoot, { withFileTypes: true });
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json') || expectedFiles.has(entry.name)) continue;
    if (!SAFE_DATASET_NAME.test(entry.name.slice(0, -'.json'.length))) continue;
    await unlink(path.join(datasetRoot, entry.name));
  }
}

async function main() {
  const arguments_ = parseArguments(process.argv.slice(2));
  if (arguments_.help) {
    printHelp();
    return;
  }

  const sourcePath = path.resolve(
    arguments_.source
      ?? process.env.SONGHYEON_MAP_DASHBOARD_SOURCE
      ?? path.join(os.homedir(), 'Downloads', DEFAULT_SOURCE_FILE),
  );

  await access(sourcePath);
  const [sourceBuffer, sourceStats] = await Promise.all([readFile(sourcePath), stat(sourcePath)]);
  const sourceHtml = sourceBuffer.toString('utf8');
  const embeddedJson = extractEmbeddedJson(sourceHtml);

  let parsed;
  try {
    parsed = JSON.parse(embeddedJson);
  } catch (error) {
    throw new Error(`The embedded ${DATA_ELEMENT_ID} payload is not valid JSON: ${error.message}`);
  }

  if (!isPlainObject(parsed)) {
    throw new Error(`The embedded ${DATA_ELEMENT_ID} payload must be a top-level JSON object.`);
  }

  const datasetNames = Object.keys(parsed).sort(sortStrings);
  for (const name of datasetNames) {
    if (!SAFE_DATASET_NAME.test(name)) {
      throw new Error(`Unsafe top-level dataset name: ${JSON.stringify(name)}`);
    }
  }

  await mkdir(datasetRoot, { recursive: true });
  const expectedFiles = new Set(datasetNames.map((name) => `${name}.json`));
  await removeStaleDatasetFiles(expectedFiles);

  const datasets = [];
  let totalDatasetBytes = 0;
  let sumOfDatasetRecordCounts = 0;

  for (const name of datasetNames) {
    const dataset = parsed[name];
    const output = serialize(dataset);
    const outputBuffer = Buffer.from(output, 'utf8');
    const fileName = `${name}.json`;
    const { records, recordPath } = selectRecords(dataset);
    const recordCount = records.length;

    await atomicWrite(path.join(datasetRoot, fileName), output);

    totalDatasetBytes += outputBuffer.byteLength;
    sumOfDatasetRecordCounts += recordCount;
    datasets.push({
      name,
      file: `${DATASET_DIRECTORY}/${fileName}`,
      valueType: valueType(dataset),
      recordPath,
      recordCount,
      fields: collectDirectFields(records),
      containerFields: isPlainObject(dataset) ? Object.keys(dataset).sort(sortStrings) : [],
      idFields: summarizeIdFields(records),
      sizeBytes: outputBuffer.byteLength,
      sha256: sha256(outputBuffer),
    });
  }

  const manifest = {
    schemaVersion: 1,
    source: {
      fileName: path.basename(sourcePath),
      sizeBytes: sourceBuffer.byteLength,
      modifiedAt: sourceStats.mtime.toISOString(),
      sha256: sha256(sourceBuffer),
      embeddedJson: {
        elementId: DATA_ELEMENT_ID,
        sizeBytes: Buffer.byteLength(embeddedJson, 'utf8'),
        sha256: sha256(embeddedJson),
      },
    },
    extraction: {
      script: SCRIPT_PATH,
      datasetDirectory: DATASET_DIRECTORY,
      deterministic: true,
    },
    summary: {
      datasetCount: datasets.length,
      sumOfDatasetRecordCounts,
      totalDatasetBytes,
    },
    datasets,
  };

  await atomicWrite(path.join(outputRoot, 'manifest.json'), serialize(manifest));

  console.log(`Extracted ${datasets.length} datasets from ${manifest.source.fileName}.`);
  console.log(`Source SHA256: ${manifest.source.sha256}`);
  console.log(`Manifest: ${path.relative(repositoryRoot, path.join(outputRoot, 'manifest.json'))}`);
}

main().catch((error) => {
  console.error(`Extraction failed: ${error.message}`);
  process.exitCode = 1;
});
