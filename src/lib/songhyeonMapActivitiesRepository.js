const MAP_OVERVIEW_URL = '/map-activities/songhyeon-map-overview-v1.json';
const MAP_DATA_BASE_URL = '/map-activities/data';
const MAP_DATA_MANIFEST_URL = `${MAP_DATA_BASE_URL}/manifest.json`;

const BUNDLE_URLS = Object.freeze({
  integratedMap: `${MAP_DATA_BASE_URL}/integrated-map.json`,
  operatingBoundaries: `${MAP_DATA_BASE_URL}/operating-boundaries.json`,
  assetsLeases: `${MAP_DATA_BASE_URL}/assets-leases.json`,
  marketActivities: `${MAP_DATA_BASE_URL}/market-activities.json`,
  hotel: `${MAP_DATA_BASE_URL}/hotel.json`,
  institutionsCommunity: `${MAP_DATA_BASE_URL}/institutions-community.json`,
  stores: `${MAP_DATA_BASE_URL}/stores.json`,
});

let overviewPromise;
let manifestPromise;
const bundlePromises = new Map();

function fetchJson(url, errorMessage) {
  return fetch(url, { credentials: 'same-origin' }).then((response) => {
    if (!response.ok) throw new Error(errorMessage);
    return response.json();
  });
}

function validateOverview(value) {
  if (!value || value.schemaVersion !== 'songhyeon-map-overview-v1') {
    throw new Error('Map & Activities 데이터 형식이 올바르지 않습니다.');
  }
  if (!Array.isArray(value.boundaries) || !value.layers || !value.catalog) {
    throw new Error('Map & Activities 필수 데이터가 없습니다.');
  }
  return value;
}

export async function loadSonghyeonMapActivitiesOverview() {
  if (!overviewPromise) {
    overviewPromise = fetchJson(MAP_OVERVIEW_URL, 'Map & Activities 데이터를 불러오지 못했습니다.')
      .then(validateOverview)
      .catch((error) => {
        overviewPromise = undefined;
        throw error;
      });
  }
  return overviewPromise;
}

export async function loadSonghyeonMapActivitiesManifest() {
  if (!manifestPromise) {
    manifestPromise = fetchJson(MAP_DATA_MANIFEST_URL, 'Map & Activities 데이터 목록을 불러오지 못했습니다.')
      .then((manifest) => {
        if (manifest?.summary?.datasetCount !== 21) {
          throw new Error('Map & Activities 전체 데이터 목록이 올바르지 않습니다.');
        }
        return manifest;
      })
      .catch((error) => {
        manifestPromise = undefined;
        throw error;
      });
  }
  return manifestPromise;
}

export async function loadSonghyeonMapActivitiesBundle(bundleName) {
  const url = BUNDLE_URLS[bundleName];
  if (!url) throw new Error(`알 수 없는 Map & Activities 데이터 묶음입니다: ${bundleName}`);

  if (!bundlePromises.has(bundleName)) {
    const pending = fetchJson(url, `${bundleName} 데이터를 불러오지 못했습니다.`)
      .then((bundle) => {
        if (bundleName === 'stores') {
          if (!Array.isArray(bundle) || bundle.length !== 10571) {
            throw new Error('점포 전체 데이터 10,571건을 확인하지 못했습니다.');
          }
          return bundle;
        }
        if (!bundle?.datasets || !bundle.bundleId) {
          throw new Error(`${bundleName} 데이터 형식이 올바르지 않습니다.`);
        }
        return bundle;
      })
      .catch((error) => {
        bundlePromises.delete(bundleName);
        throw error;
      });
    bundlePromises.set(bundleName, pending);
  }

  return bundlePromises.get(bundleName);
}

export const loadSonghyeonIntegratedMapData = () => loadSonghyeonMapActivitiesBundle('integratedMap');
export const loadSonghyeonOperatingBoundaryData = () => loadSonghyeonMapActivitiesBundle('operatingBoundaries');
export const loadSonghyeonAssetsLeaseData = () => loadSonghyeonMapActivitiesBundle('assetsLeases');
export const loadSonghyeonMarketActivitiesData = () => loadSonghyeonMapActivitiesBundle('marketActivities');
export const loadSonghyeonHotelData = () => loadSonghyeonMapActivitiesBundle('hotel');
export const loadSonghyeonInstitutionsCommunityData = () => loadSonghyeonMapActivitiesBundle('institutionsCommunity');
export const loadSonghyeonStores = () => loadSonghyeonMapActivitiesBundle('stores');

export { BUNDLE_URLS, MAP_DATA_MANIFEST_URL, MAP_OVERVIEW_URL };
