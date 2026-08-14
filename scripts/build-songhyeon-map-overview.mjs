import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const referenceRoot = resolve(projectRoot, 'references/map-activities');
const sourceManifestPath = resolve(referenceRoot, 'manifest.json');
const outputPath = resolve(projectRoot, 'public/map-activities/songhyeon-map-overview-v1.json');
const runtimeManifestPath = resolve(referenceRoot, 'runtime-map-manifest.json');
const simplificationTolerance = 0.00002;

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const roundCoordinate = (value) => Number(Number(value).toFixed(7));
const isFiniteCoordinate = (value) => typeof value === 'number' && Number.isFinite(value);
const hasPoint = (item) => isFiniteCoordinate(item?.lon) && isFiniteCoordinate(item?.lat);

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function writeAtomic(path, content) {
  await mkdir(dirname(path), { recursive: true });
  const temporaryPath = `${path}.tmp`;
  await writeFile(temporaryPath, content, 'utf8');
  await rename(temporaryPath, path);
}

function squaredSegmentDistance(point, start, end) {
  let x = start[0];
  let y = start[1];
  let dx = end[0] - x;
  let dy = end[1] - y;

  if (dx !== 0 || dy !== 0) {
    const ratio = ((point[0] - x) * dx + (point[1] - y) * dy) / (dx * dx + dy * dy);
    if (ratio > 1) {
      x = end[0];
      y = end[1];
    } else if (ratio > 0) {
      x += dx * ratio;
      y += dy * ratio;
    }
  }

  dx = point[0] - x;
  dy = point[1] - y;
  return dx * dx + dy * dy;
}

function simplifyOpenLine(points, squaredTolerance) {
  if (points.length <= 2) return points;

  let maximumDistance = 0;
  let splitIndex = 0;
  for (let index = 1; index < points.length - 1; index += 1) {
    const distance = squaredSegmentDistance(points[index], points[0], points.at(-1));
    if (distance > maximumDistance) {
      maximumDistance = distance;
      splitIndex = index;
    }
  }

  if (maximumDistance <= squaredTolerance) return [points[0], points.at(-1)];
  const left = simplifyOpenLine(points.slice(0, splitIndex + 1), squaredTolerance);
  const right = simplifyOpenLine(points.slice(splitIndex), squaredTolerance);
  return [...left.slice(0, -1), ...right];
}

function simplifyRing(rawRing) {
  const ring = rawRing.map(([lon, lat]) => [roundCoordinate(lon), roundCoordinate(lat)]);
  const isClosed = ring.length > 2
    && ring[0][0] === ring.at(-1)[0]
    && ring[0][1] === ring.at(-1)[1];
  const openRing = isClosed ? ring.slice(0, -1) : ring;
  const simplified = simplifyOpenLine(openRing, simplificationTolerance ** 2);
  const closed = [...simplified, simplified[0]];
  if (closed.length < 4) throw new Error('A map boundary was simplified below four ring coordinates.');
  return closed;
}

function extentForRings(rings) {
  const points = rings.flat();
  const longitudes = points.map(([lon]) => lon);
  const latitudes = points.map(([, lat]) => lat);
  return [
    Math.min(...longitudes),
    Math.min(...latitudes),
    Math.max(...longitudes),
    Math.max(...latitudes),
  ].map(roundCoordinate);
}

function datasetEntry(manifest, name) {
  const entry = manifest.datasets.find((dataset) => dataset.name === name);
  if (!entry) throw new Error(`Missing dataset manifest entry: ${name}`);
  return entry;
}

async function loadDataset(manifest, name) {
  const entry = datasetEntry(manifest, name);
  const path = resolve(projectRoot, entry.file);
  const content = await readFile(path);
  if (sha256(content) !== entry.sha256) throw new Error(`Dataset SHA-256 mismatch: ${name}`);
  return { entry, value: JSON.parse(content.toString('utf8')) };
}

function mapBoundary(feature, index) {
  if (feature.geometry?.type !== 'Polygon') throw new Error('Only Polygon operating boundaries are supported.');
  const rings = feature.geometry.coordinates.map(simplifyRing);
  const properties = feature.properties || {};
  return {
    featureId: `boundary:${properties.candidate_id}`,
    candidateId: properties.candidate_id,
    title: properties.candidate_label,
    shortTitle: properties.short_label,
    order: index + 1,
    areaHa: Number(Number(properties.area_ha).toFixed(1)),
    storeCount: Number(properties.store_count),
    character: properties.character,
    extent: extentForRings(rings),
    originalPointCount: feature.geometry.coordinates.flat().length,
    simplifiedPointCount: rings.flat().length,
    rings,
  };
}

function mapAsset(marker, index, assetById) {
  const asset = assetById.get(marker.asset_id);
  return {
    featureId: `asset:${marker.asset_id}:${index + 1}`,
    entityId: marker.asset_id,
    layer: 'assets',
    title: marker.name,
    status: marker.status,
    lat: roundCoordinate(marker.lat),
    lon: roundCoordinate(marker.lon),
    address: asset?.address || '',
    role: asset?.role || '',
    current: asset?.current || '',
    floorScale: asset?.floor_scale || '',
    gfaSqm: asset?.gfa_sqm ?? null,
  };
}

function mapPublicSpace(item) {
  return {
    featureId: `public-space:${item.public_space_id}`,
    entityId: item.public_space_id,
    layer: 'publicSpaces',
    title: item.name,
    spaceType: item.space_type,
    operator: item.operator,
    lat: roundCoordinate(item.lat),
    lon: roundCoordinate(item.lon),
    address: item.address,
    summary: item.operation_relevance,
    sourceUrl: item.source_url,
    publishedAt: item.published_at,
    checkedAt: item.checked_at,
  };
}

function mapActivity(item) {
  return {
    featureId: `activity:${item.id}`,
    entityId: item.id,
    layer: 'activities',
    title: item.title,
    activityType: item.type,
    group: item.group,
    organization: item.organization,
    place: item.place,
    lat: roundCoordinate(item.lat),
    lon: roundCoordinate(item.lon),
    date: item.date,
    publishedAt: item.published_at,
    checkedAt: item.checked_at,
    summary: item.summary,
    relevance: item.relevance,
    sourceUrl: item.source_url,
  };
}

function unlocatedItem(item, layer, idKey, titleKey) {
  return {
    featureId: `${layer}:${item[idKey]}`,
    entityId: item[idKey],
    layer,
    title: item[titleKey],
    place: item.place || item.address || '',
    reason: '좌표 미확인',
  };
}

function mapAssetSummary(asset) {
  return {
    id: asset.id,
    name: asset.name,
    type: asset.type,
    status: asset.status,
    address: asset.address,
    role: asset.role,
    current: asset.current,
    primaryUse: asset.primary_use,
    floorScale: asset.floor_scale,
    gfaSqm: asset.gfa_sqm ?? null,
    siteAreaSqm: asset.site_area_sqm ?? null,
    buildingCount: Array.isArray(asset.buildings) ? asset.buildings.length : 0,
    leaseCount: Array.isArray(asset.leases) ? asset.leases.length : 0,
    tenantIndustries: Array.isArray(asset.tenant_industries) ? asset.tenant_industries.slice(0, 8) : [],
  };
}

function mapBoundaryNarrative(item) {
  return {
    id: item.boundary_id,
    alternative: item.alternative,
    name: item.name,
    areaHa: Number(Number(item.area_ha).toFixed(1)),
    areaPyeong: item.area_pyeong,
    storeCount: item.store_count,
    localPopulation: item.estimated_local_population,
    foreignLongPopulation: item.estimated_foreign_long_population,
    foreignShortPopulation: item.estimated_foreign_short_population,
    selectionQuestion: item.selection_question,
    boundaryLogic: item.boundary_logic,
    difference: item.difference,
    incrementNote: item.increment_note,
    recommendedUse: item.recommended_use,
    checkedAt: item.checked_at,
  };
}

function mapPlan(item) {
  return {
    id: item.id,
    title: item.title,
    type: item.type,
    status: item.status,
    scope: item.scope,
    content: item.content,
    impact: item.impact,
    effectiveFrom: item.effective_from || item.effective_year || '',
    feature: item.feature,
    openIssue: item.open_issue,
    checkedAt: item.checked_at,
    sourceUrl: item.source_url,
  };
}

function mapOrganization(item) {
  return {
    id: item.id,
    name: item.name,
    group: item.group,
    scope: item.scope,
    identity: item.identity,
    relevance: item.relevance,
    activitySummary: item.activity_summary,
    activityCount: Array.isArray(item.activities) ? item.activities.length : 0,
    latestActivity: Array.isArray(item.activities) && item.activities.length > 0 ? item.activities[0] : null,
    checkedAt: item.checked_at,
    sourceUrl: item.source_url,
  };
}

function mapRetailCategory(item) {
  return {
    scope: item.scope,
    category: item.category_name,
    storeCount: item.store_count,
    sharePct: item.share_pct,
    locationQuotient: item.location_quotient,
    specialization: item.specialization_flag,
    checkedAt: item.checked_at,
  };
}

function mapInsight(item) {
  return {
    id: item.id,
    title: item.title,
    text: item.text,
    confidence: item.confidence,
  };
}

function mapStrategy(item) {
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    text: item.text,
  };
}

async function main() {
  const sourceManifest = await readJson(sourceManifestPath);
  const [
    boundaryDataset,
    assetMarkerDataset,
    assetDataset,
    publicSpaceDataset,
    activityDataset,
    boundaryNarrativeDataset,
    retailDataset,
    planDataset,
    organizationDataset,
    insightDataset,
    strategyDataset,
  ] = await Promise.all([
    loadDataset(sourceManifest, 'boundary_geojson'),
    loadDataset(sourceManifest, 'asset_markers'),
    loadDataset(sourceManifest, 'assets'),
    loadDataset(sourceManifest, 'public_spaces'),
    loadDataset(sourceManifest, 'activities'),
    loadDataset(sourceManifest, 'boundary_narratives'),
    loadDataset(sourceManifest, 'retail_statistics'),
    loadDataset(sourceManifest, 'plans'),
    loadDataset(sourceManifest, 'organizations'),
    loadDataset(sourceManifest, 'insights'),
    loadDataset(sourceManifest, 'strategies'),
  ]);

  const boundaryFeatures = boundaryDataset.value.features;
  const assets = assetMarkerDataset.value;
  const publicSpaces = publicSpaceDataset.value;
  const activities = activityDataset.value;
  const assetById = new Map(assetDataset.value.map((asset) => [asset.id, asset]));
  const mappedPublicSpaces = publicSpaces.filter(hasPoint);
  const mappedActivities = activities.filter(hasPoint);
  const boundaries = boundaryFeatures.map(mapBoundary);
  const sourceEntries = [
    boundaryDataset,
    assetMarkerDataset,
    assetDataset,
    publicSpaceDataset,
    activityDataset,
    boundaryNarrativeDataset,
    retailDataset,
    planDataset,
    organizationDataset,
    insightDataset,
    strategyDataset,
  ]
    .map(({ entry }) => ({ name: entry.name, recordCount: entry.recordCount, sha256: entry.sha256 }));

  const viewData = {
    schemaVersion: 'songhyeon-map-overview-v1',
    snapshotDate: sourceManifest.source.modifiedAt.slice(0, 10),
    crs: 'OGC:CRS84',
    bounds: [126.9776, 37.5706, 126.99, 37.5844],
    provenance: {
      sourceFile: sourceManifest.source.fileName,
      sourceSha256: sourceManifest.source.sha256,
      embeddedJsonSha256: sourceManifest.source.embeddedJson.sha256,
      generator: 'scripts/build-songhyeon-map-overview.mjs',
      inputs: sourceEntries,
      note: '송현 Map & Activities 렌더 전용 경량 스냅샷',
    },
    boundaries,
    layers: {
      assets: {
        label: '이지스 자산',
        totalCount: assets.length,
        mappedCount: assets.filter(hasPoint).length,
        items: assets.filter(hasPoint).map((item, index) => mapAsset(item, index, assetById)),
      },
      publicSpaces: {
        label: '공공공간',
        totalCount: publicSpaces.length,
        mappedCount: mappedPublicSpaces.length,
        items: mappedPublicSpaces.map(mapPublicSpace),
      },
      activities: {
        label: '활동',
        totalCount: activities.length,
        mappedCount: mappedActivities.length,
        items: mappedActivities.map(mapActivity),
      },
    },
    catalog: {
      assets: assetDataset.value.map(mapAssetSummary),
      boundaryNarratives: boundaryNarrativeDataset.value.map(mapBoundaryNarrative),
      retailCategories: retailDataset.value
        .filter((item) => item.category_level === '대분류')
        .map(mapRetailCategory),
      plans: planDataset.value.map(mapPlan),
      organizations: organizationDataset.value.map(mapOrganization),
      insights: insightDataset.value.map(mapInsight),
      strategies: strategyDataset.value.map(mapStrategy),
    },
    unlocated: [
      ...publicSpaces.filter((item) => !hasPoint(item)).map((item) => unlocatedItem(item, 'publicSpaces', 'public_space_id', 'name')),
      ...activities.filter((item) => !hasPoint(item)).map((item) => unlocatedItem(item, 'activities', 'id', 'title')),
    ],
  };

  const featureIds = [
    ...viewData.boundaries.map((item) => item.featureId),
    ...Object.values(viewData.layers).flatMap((layer) => layer.items.map((item) => item.featureId)),
    ...viewData.unlocated.map((item) => item.featureId),
  ];
  if (new Set(featureIds).size !== featureIds.length) throw new Error('Map featureId values must be globally unique.');

  const output = `${JSON.stringify(viewData, null, 2)}\n`;
  const runtimeManifest = {
    schemaVersion: 1,
    artifact: 'public/map-activities/songhyeon-map-overview-v1.json',
    artifactSha256: sha256(output),
    artifactSizeBytes: Buffer.byteLength(output),
    sourceSha256: sourceManifest.source.sha256,
    inputDatasets: sourceEntries,
    counts: {
      boundaries: viewData.boundaries.length,
      boundaryOriginalPoints: viewData.boundaries.reduce((sum, item) => sum + item.originalPointCount, 0),
      boundarySimplifiedPoints: viewData.boundaries.reduce((sum, item) => sum + item.simplifiedPointCount, 0),
      assets: viewData.layers.assets.mappedCount,
      publicSpaces: viewData.layers.publicSpaces.mappedCount,
      activities: viewData.layers.activities.mappedCount,
      unlocated: viewData.unlocated.length,
      assetSummaries: viewData.catalog.assets.length,
      boundaryNarratives: viewData.catalog.boundaryNarratives.length,
      retailCategories: viewData.catalog.retailCategories.length,
      plans: viewData.catalog.plans.length,
      organizations: viewData.catalog.organizations.length,
      insights: viewData.catalog.insights.length,
      strategies: viewData.catalog.strategies.length,
    },
    simplificationTolerance,
  };

  await writeAtomic(outputPath, output);
  await writeAtomic(runtimeManifestPath, `${JSON.stringify(runtimeManifest, null, 2)}\n`);
  console.log(`Built ${runtimeManifest.artifact} (${runtimeManifest.artifactSizeBytes} bytes).`);
  console.log(`SHA256: ${runtimeManifest.artifactSha256}`);
}

await main();
