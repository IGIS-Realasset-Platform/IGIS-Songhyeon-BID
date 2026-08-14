import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_BOUNDS = [
  [37.5706, 126.9776],
  [37.5844, 126.9900],
];

const TILE_LAYERS = {
  voyager: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  },
  positron: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  },
};

const BOUNDARY_STYLES = {
  compact_core: { color: '#bd4f39' },
  songhyeon_bukchon: { color: '#2e7566' },
  insadong_east: { color: '#315f91' },
};

const BOUNDARY_FALLBACK_STYLES = [
  BOUNDARY_STYLES.compact_core,
  BOUNDARY_STYLES.songhyeon_bukchon,
  BOUNDARY_STYLES.insadong_east,
];

const ANALYSIS_STYLES = {
  increments: { color: '#876c49', weight: 1.5, fillColor: '#c2955c', fillOpacity: 0.2 },
  microzones: { color: '#7d6848', weight: 0.8, fillColor: '#c7a66a', fillOpacity: 0.16 },
  living_grid: { color: '#55798f', weight: 0.8, fillColor: '#6d9cb9', fillOpacity: 0.18 },
  walk_edges: { color: '#478876', weight: 1.4, fillOpacity: 0 },
  arterial_edges: { color: '#ad4338', weight: 3, fillOpacity: 0 },
  excluded_offices: { color: '#555e59', weight: 1.6, fillColor: '#777f7b', fillOpacity: 0.24, dashArray: '4 4' },
};

const PLAN_STYLES = {
  district: { color: '#6e5899', weight: 2.2, fillColor: '#6e5899', fillOpacity: 0.14 },
  culture: { color: '#a86820', weight: 2.2, fillColor: '#a86820', fillOpacity: 0.14, dashArray: '6 5' },
  songhyeon: { color: '#3e8063', weight: 2.2, fillColor: '#3e8063', fillOpacity: 0.14 },
  dohwaseo: { color: '#376ba1', weight: 2.2, fillColor: '#376ba1', fillOpacity: 0.14 },
};

const PLAN_AREA_INFO = {
  district: {
    title: '인사동 지구단위계획구역',
    scope: '인사동 일대 124,068㎡',
    summary: '구역별 건축물 용도·높이·용적률과 한옥 보전, 권장용도를 관리하는 공간계획입니다.',
    impact: '자산 리모델링·개발과 저층부 콘텐츠 변경 시 적용 기준을 함께 검토해야 합니다.',
  },
  culture: {
    title: '인사동 문화지구',
    scope: '인사동 일대 175,743㎡',
    summary: '전통문화 업종 보호, 권장시설 육성, 차 없는 거리와 문화행사를 함께 관리하는 제도입니다.',
    impact: '리테일 구성과 행사 운영, 서울시·종로구 협력 구조에 직접 영향을 줍니다.',
  },
  songhyeon: {
    title: '송현문화공원·주차장 조성사업 부지',
    scope: '공원 25,973.3㎡ · 지하공간 50,929.5㎡',
    summary: '열린송현광장을 문화공원과 지하주차장으로 전환하는 서울시 사업입니다.',
    impact: '광장 사용 가능 시기, 공사 중 보행동선, 공공 콘텐츠 협력 일정을 함께 조정해야 합니다.',
  },
  dohwaseo: {
    title: '도화서길 D1·D2 특별계획구역',
    scope: 'D1·D2 합계 3,028.23㎡',
    summary: '높이·용적률과 공공기여, 보행·공개공간 기준을 개별 개발계획으로 구체화하는 구역입니다.',
    impact: '도화서길 자산 개발과 인접 보행공간의 운영 협의에 직접 연결됩니다.',
  },
};

const EMPTY_OBJECT = Object.freeze({});
const EMPTY_ARRAY = Object.freeze([]);
const NOOP = () => {};

const DETAIL_LABELS = {
  address: '주소',
  area_ha: '면적(ha)',
  branch: '지점',
  building: '건물',
  candidate_label: '운영구역',
  category1: '대분류',
  category2: '중분류',
  category3: '소분류',
  character: '범위 설명',
  context: '맥락',
  count: '개수',
  group: '그룹',
  highway: '도로 구분',
  length: '길이',
  office_name: '업무시설',
  organization: '기관·조직',
  operator: '주체',
  place: '장소',
  program: '운영 내용',
  relevance: '관련성',
  role: '역할',
  scale: '규모',
  scope: '적용범위',
  source_url: '원문',
  space_type: '구분',
  status: '상태',
  store_count: '점포 수',
  summary: '내용',
  impact: '사업 영향',
  location_notice: '위치 표시 기준',
  type: '구분',
};

const POPUP_DETAIL_KEYS = new Set(Object.keys(DETAIL_LABELS));

function hasCoordinate(value) {
  return value !== null && value !== undefined && value !== '' && Number.isFinite(Number(value));
}

function toLatLng(value) {
  const latitude = value?.lat ?? value?.latitude;
  const longitude = value?.lon ?? value?.longitude;
  if (!hasCoordinate(latitude) || !hasCoordinate(longitude)) return null;
  return [Number(latitude), Number(longitude)];
}

function asGeoJson(value) {
  if (!value) return null;
  if (value.type === 'FeatureCollection' || value.type === 'Feature') return value;
  if (value.geometry) return { type: 'Feature', properties: value.properties || {}, geometry: value.geometry };
  if (Array.isArray(value.features)) return { type: 'FeatureCollection', features: value.features };
  if (Array.isArray(value)) return { type: 'FeatureCollection', features: value.filter((item) => item?.geometry) };
  return null;
}

function featureLabel(feature, fallback = '지도 객체') {
  const properties = feature?.properties || {};
  return properties.candidate_label
    || properties.short_label
    || properties.label
    || properties.name
    || properties.title
    || properties.office_name
    || properties.zone_id
    || properties.cell_id
    || fallback;
}

function printableValue(value) {
  if (value === null || value === undefined || value === '') return '';
  if (typeof value === 'number') return Number.isFinite(value) ? value.toLocaleString('ko-KR') : String(value);
  if (typeof value === 'boolean') return value ? '예' : '아니오';
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

function detailEntries(record) {
  if (!record || typeof record !== 'object') return [];
  return Object.entries(record).filter(([key, value]) => POPUP_DETAIL_KEYS.has(key) && value !== null && value !== undefined && value !== '');
}

function appendDetailValue(container, key, value) {
  const text = printableValue(value);
  if (!text) return;

  const row = document.createElement('div');
  row.className = 'songhyeon-map-popup__row';

  const term = document.createElement('dt');
  term.textContent = DETAIL_LABELS[key] || key;

  const description = document.createElement('dd');
  if (typeof value === 'string' && /^https?:\/\//i.test(value)) {
    const link = document.createElement('a');
    link.href = value;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = key === 'source_url' ? '원문 열기' : value;
    description.appendChild(link);
  } else {
    description.textContent = text;
  }

  row.append(term, description);
  container.appendChild(row);
}

function appendPopupAction(root, action) {
  if (!action?.label || typeof action.onClick !== 'function') return;
  const actions = document.createElement('div');
  actions.className = 'songhyeon-map-popup__actions';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'songhyeon-map-popup__action';
  button.textContent = action.label;
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    action.onClick();
  });
  actions.appendChild(button);
  root.appendChild(actions);
}

function createPopupContent(title, record, extraRecords, action) {
  const root = document.createElement('section');
  root.className = 'songhyeon-map-popup';

  const heading = document.createElement('h3');
  heading.textContent = title;
  root.appendChild(heading);

  const details = document.createElement('dl');
  detailEntries(record).forEach(([key, value]) => {
    if (key !== 'records' && key !== 'geometry') appendDetailValue(details, key, value);
  });
  root.appendChild(details);

  if (Array.isArray(extraRecords) && extraRecords.length) {
    const recordsTitle = document.createElement('h4');
    recordsTitle.textContent = `포함 점포 ${extraRecords.length.toLocaleString('ko-KR')}개`;
    root.appendChild(recordsTitle);

    const list = document.createElement('ol');
    list.className = 'songhyeon-map-popup__records';
    extraRecords.forEach((item) => {
      const listItem = document.createElement('li');
      const storeName = item?.name || item?.title || item?.id || '이름 없음';
      const category = [item?.category1, item?.category2, item?.category3].filter(Boolean).join(' › ');
      listItem.textContent = category ? `${storeName} · ${category}` : storeName;
      list.appendChild(listItem);
    });
    root.appendChild(list);
  }

  appendPopupAction(root, action);

  return root;
}

function createStorePopupContent(group, onOpenFullTable) {
  const stores = Array.isArray(group?.records) ? group.records : [];
  const count = Number(group?.count || stores.length || 1);
  const first = stores[0] || {};
  const multi = count > 1;
  const title = multi ? `이 위치의 점포 ${count.toLocaleString('ko-KR')}개` : (first.name || '점포명 미확인');
  const root = document.createElement('section');
  root.className = 'songhyeon-map-popup';
  const heading = document.createElement('h3');
  heading.textContent = title;
  root.appendChild(heading);

  const meta = document.createElement('p');
  meta.className = 'songhyeon-map-popup__meta';
  meta.textContent = multi
    ? (first.address || '주소 미확인')
    : [first.category1, first.category2, first.category3].filter(Boolean).join(' · ');
  root.appendChild(meta);

  const body = document.createElement('p');
  body.className = 'songhyeon-map-popup__body';
  if (multi) {
    const counts = new Map();
    stores.forEach((store) => counts.set(store.category1 || '기타', (counts.get(store.category1 || '기타') || 0) + 1));
    body.textContent = [...counts.entries()]
      .sort((left, right) => right[1] - left[1])
      .slice(0, 5)
      .map(([name, value]) => `${name} ${value.toLocaleString('ko-KR')}개`)
      .join(' · ');
  } else {
    body.textContent = first.address || '주소 미확인';
    if (first.segment) {
      const segment = document.createElement('span');
      segment.className = 'songhyeon-map-popup__subtext';
      segment.textContent = first.segment;
      body.appendChild(segment);
    }
  }
  root.appendChild(body);
  if (multi) appendPopupAction(root, { label: '전체 점포 보기', onClick: onOpenFullTable });
  return root;
}

function createPlanTooltipContent(info) {
  const root = document.createElement('span');
  root.className = 'songhyeon-map-tooltip__rich';
  const title = document.createElement('strong');
  title.textContent = info.title;
  const scope = document.createElement('span');
  scope.textContent = `적용범위 · ${info.scope}`;
  const summary = document.createElement('span');
  summary.textContent = info.summary;
  const impact = document.createElement('span');
  impact.textContent = `사업 영향 · ${info.impact}`;
  root.append(title, scope, summary, impact);
  return root;
}

function extendBounds(target, layer) {
  if (typeof layer?.getBounds === 'function') {
    const layerBounds = layer.getBounds();
    if (layerBounds?.isValid()) target.extend(layerBounds);
    return;
  }
  if (typeof layer?.getLatLng === 'function') target.extend(layer.getLatLng());
}

function selectedPathStyle(style) {
  return {
    ...style,
    color: '#f4f4f5',
    weight: Math.max(Number(style.weight || 2) + 2, 4),
    fillOpacity: Math.max(Number(style.fillOpacity || 0), 0.22),
  };
}

function clamp01(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

function analysisStyle(layerName, feature, maximum = 1) {
  const base = ANALYSIS_STYLES[layerName] || ANALYSIS_STYLES.microzones;
  if (layerName === 'microzones') {
    const ratio = clamp01((Number(feature?.properties?.axis_3_content) || 0) / Math.max(maximum, 1));
    return {
      ...base,
      color: '#7b958b',
      weight: 0.6,
      fillColor: ratio > 0.66 ? '#295f50' : ratio > 0.33 ? '#78a18f' : '#d8e5df',
      fillOpacity: 0.34,
    };
  }
  if (layerName === 'living_grid') {
    const population = Math.max(0, Number(feature?.properties?.pop_local_grid_mean) || 0);
    const ratio = Math.sqrt(population / Math.max(maximum, 1));
    return { ...base, color: '#526f9f', weight: 0.7, fillColor: '#587bb3', fillOpacity: 0.08 + (ratio * 0.42) };
  }
  return base;
}

function markerStyle(item, selected) {
  const baseRadius = Number(item.size) || (item.kind === 'asset' ? 10 : 7);
  return {
    radius: selected ? baseRadius + 3 : baseRadius,
    color: selected ? (item.selectedStrokeColor || '#ffffff') : (item.strokeColor || '#1b252d'),
    weight: selected ? (Number(item.selectedStrokeWeight) || Math.max(Number(item.strokeWeight) || 2, 3)) : (Number(item.strokeWeight) || 2),
    fillColor: item.color || '#86a7c0',
    fillOpacity: item.fillOpacity ?? 0.95,
  };
}

function createCountBadgeIcon(marker) {
  const size = Math.max(22, Number(marker.badgeSize) || 22);
  const color = marker.color || '#315f52';
  const noData = marker.badgeText === '–';
  const className = noData ? 'songhyeon-map-count-badge songhyeon-map-count-badge--empty' : 'songhyeon-map-count-badge';
  return L.divIcon({
    className: '',
    html: `<div class="${className}" style="width:${size}px;height:${size}px;background:${color}">${String(marker.badgeText)}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function groupStyle(group, selected) {
  const count = Number(group.count || group.records?.length || 1);
  const radius = count > 1 ? 10 : 4.2;
  return {
    radius,
    color: '#ffffff',
    weight: selected ? 2.6 : 0.8,
    fillColor: group.color || (count > 1 ? '#69736e' : '#818b87'),
    fillOpacity: 0.92,
  };
}

function bindInteraction(layer, {
  key,
  label,
  payload,
  popupRecord,
  popupRecords,
  popupAction,
  popupFactory,
  tooltipContent,
  tooltipClassName = 'songhyeon-map-tooltip',
  showTooltip = false,
  normalStyle,
  selectedStyle,
}, selectableLayers, selectedKey, onSelectRef) {
  const stringKey = String(key);
  const entries = selectableLayers.get(stringKey) || [];
  entries.push({ layer, normalStyle, selectedStyle });
  selectableLayers.set(stringKey, entries);

  if (typeof layer.setStyle === 'function') layer.setStyle(stringKey === String(selectedKey) ? selectedStyle : normalStyle);
  if (showTooltip) {
    layer.bindTooltip(tooltipContent || label, {
      direction: 'top',
      sticky: true,
      opacity: 0.96,
      className: tooltipClassName,
    });
  }
  layer.bindPopup(() => popupFactory ? popupFactory() : createPopupContent(label, popupRecord, popupRecords, popupAction), {
    className: 'songhyeon-map-popup-shell',
    maxWidth: 390,
    minWidth: 260,
    maxHeight: 410,
  });
  layer.on('click', () => onSelectRef.current(payload));
}

function createTileLayer(name) {
  const source = TILE_LAYERS[name] || TILE_LAYERS.voyager;
  return L.tileLayer(source.url, {
    attribution: source.attribution,
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 19,
    maxNativeZoom: 19,
    crossOrigin: true,
  });
}

export default function SonghyeonLeafletMap({
  boundaryGeojson,
  boundaryVisibility = EMPTY_OBJECT,
  boundaryAnalysis,
  analysisVisibility = EMPTY_OBJECT,
  planGeojson,
  showPlanAreas = false,
  markers = EMPTY_ARRAY,
  storeGroups = EMPTY_ARRAY,
  featureLayers = EMPTY_ARRAY,
  selectedKey,
  onSelect = NOOP,
  onStoreGroupAction = NOOP,
  onMarkerAction = NOOP,
  basemap = 'voyager',
  fitVisible = false,
  fitVisibleMaxZoom = 17,
  focusSelected = false,
  focusZoom = 16,
  focusSelectedOnChange = false,
  openSelectedOnChange = false,
  fitVisibleToMarkers = false,
  className = '',
  ariaLabel = '송현·인사동 권역 상세 지도',
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const tileLayerRef = useRef(null);
  const tileLayerNameRef = useRef(null);
  const initialBasemapRef = useRef(basemap);
  const activeBasemapRef = useRef(basemap);
  const deferInitialTileRef = useRef(fitVisible || focusSelected);
  const overlayLayerRef = useRef(null);
  const selectableLayersRef = useRef(new Map());
  const previousSelectedKeyRef = useRef(null);
  const onSelectRef = useRef(onSelect);
  const onStoreGroupActionRef = useRef(onStoreGroupAction);
  const onMarkerActionRef = useRef(onMarkerAction);
  const selectedKeyRef = useRef(selectedKey);

  onSelectRef.current = onSelect;
  onStoreGroupActionRef.current = onStoreGroupAction;
  onMarkerActionRef.current = onMarkerAction;
  selectedKeyRef.current = selectedKey;
  activeBasemapRef.current = basemap;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return undefined;

    const map = L.map(containerRef.current, {
      center: [37.5767, 126.9841],
      zoom: 15,
      minZoom: 13,
      maxZoom: 19,
      zoomControl: true,
      preferCanvas: true,
    });
    if (!deferInitialTileRef.current) {
      map.fitBounds(DEFAULT_BOUNDS, { padding: [18, 18], animate: false });
      tileLayerRef.current = createTileLayer(initialBasemapRef.current).addTo(map);
      tileLayerNameRef.current = initialBasemapRef.current;
    }
    overlayLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    setMapInstance(map);

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(() => map.invalidateSize({ animate: false, pan: false }));
    resizeObserver?.observe(containerRef.current);
    const frame = window.requestAnimationFrame(() => map.invalidateSize({ animate: false }));
    return () => {
      resizeObserver?.disconnect();
      window.cancelAnimationFrame(frame);
      map.remove();
      setMapInstance((current) => current === map ? null : current);
      mapRef.current = null;
      tileLayerRef.current = null;
      tileLayerNameRef.current = null;
      overlayLayerRef.current = null;
      selectableLayersRef.current = new Map();
    };
  }, []);

  useEffect(() => {
    const map = mapInstance;
    if (!map) return;
    if (deferInitialTileRef.current) return;
    if (tileLayerRef.current && tileLayerNameRef.current === basemap) return;
    if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);
    tileLayerRef.current = createTileLayer(basemap).addTo(map);
    tileLayerNameRef.current = basemap;
    tileLayerRef.current.bringToBack();
  }, [basemap, mapInstance]);

  useEffect(() => {
    const map = mapInstance;
    const overlayLayer = overlayLayerRef.current;
    if (!map || !overlayLayer) return;

    overlayLayer.clearLayers();
    const selectableLayers = new Map();
    const visibleBounds = L.latLngBounds([]);
    const markerBounds = L.latLngBounds([]);
    const currentSelectedKey = selectedKeyRef.current;
    const boundaryData = asGeoJson(boundaryGeojson);

    if (boundaryData) {
      let fallbackIndex = 0;
      const boundaryLayer = L.geoJSON(boundaryData, {
        filter: (feature) => boundaryVisibility[feature?.properties?.candidate_id] !== false,
        style: (feature) => {
          const candidateId = feature?.properties?.candidate_id;
          const base = BOUNDARY_STYLES[candidateId] || BOUNDARY_FALLBACK_STYLES[fallbackIndex++ % BOUNDARY_FALLBACK_STYLES.length];
          return { ...base, weight: 3, opacity: 0.95, fillColor: base.color, fillOpacity: 0.08 };
        },
      }).addTo(overlayLayer);
      extendBounds(visibleBounds, boundaryLayer);
    }

    Object.entries(boundaryAnalysis || {}).forEach(([layerName, value]) => {
      if (!analysisVisibility[layerName]) return;
      const analysisData = asGeoJson(value);
      if (!analysisData) return;
      const maximum = Math.max(...(analysisData.features || [analysisData]).map((feature) => Number(
        layerName === 'living_grid'
          ? feature?.properties?.pop_local_grid_mean
          : feature?.properties?.axis_3_content,
      ) || 0), 1);
      const analysisLayer = L.geoJSON(analysisData, {
        style: (feature) => analysisStyle(layerName, feature, maximum),
        pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
          ...analysisStyle(layerName, feature, maximum),
          radius: layerName === 'excluded_offices' ? 7 : 5,
        }),
        onEachFeature: (feature, layer) => {
          const properties = feature?.properties || {};
          const featureNormalStyle = analysisStyle(layerName, feature, maximum);
          const featureId = properties.id || properties.zone_id || properties.cell_id || properties.office_name || featureLabel(feature);
          const key = `analysis-${layerName}-${featureId}`;
          const label = featureLabel(feature, layerName);
          bindInteraction(layer, {
            key,
            label,
            payload: { key, kind: `analysis-${layerName}`, label, record: properties },
            popupRecord: properties,
            normalStyle: featureNormalStyle,
            selectedStyle: selectedPathStyle(featureNormalStyle),
          }, selectableLayers, currentSelectedKey, onSelectRef);
        },
      }).addTo(overlayLayer);
      extendBounds(visibleBounds, analysisLayer);
    });

    if (showPlanAreas) {
      Object.entries(planGeojson || {}).forEach(([groupName, value]) => {
        const planData = asGeoJson(value);
        if (!planData) return;
        const normalStyle = PLAN_STYLES[groupName] || PLAN_STYLES.district;
        const areaInfo = PLAN_AREA_INFO[groupName] || {
          title: value?.dashboard_title || groupName,
          scope: '범위 정보 확인 중',
          summary: '계획·규제 원문과 공간 범위를 함께 확인합니다.',
          impact: '자산·공간 운영에 미치는 영향을 검토합니다.',
        };
        let featureIndex = 0;
        const planLayer = L.geoJSON(planData, {
          style: normalStyle,
          pointToLayer: (feature, latlng) => L.circleMarker(latlng, { ...normalStyle, radius: 7 }),
          onEachFeature: (feature, layer) => {
            const index = featureIndex++;
            const properties = feature?.properties || {};
            const featureName = properties.name || properties.A5 || properties.dashboard_title;
            const label = featureName && String(featureName).length <= 54 ? featureName : areaInfo.title;
            const shownInfo = { ...areaInfo, title: label };
            const key = `plan-${groupName}-${index}`;
            bindInteraction(layer, {
              key,
              label,
              payload: { key, kind: 'plan-area', label, record: { ...properties, ...shownInfo } },
              popupRecord: shownInfo,
              tooltipContent: createPlanTooltipContent(shownInfo),
              tooltipClassName: 'songhyeon-map-tooltip songhyeon-map-tooltip--rich',
              normalStyle,
              selectedStyle: selectedPathStyle(normalStyle),
            }, selectableLayers, currentSelectedKey, onSelectRef);
          },
        }).addTo(overlayLayer);
        extendBounds(visibleBounds, planLayer);
      });
    }

    featureLayers.forEach((featureLayer, featureLayerIndex) => {
      if (featureLayer?.visible === false) return;
      const data = asGeoJson(featureLayer?.data);
      if (!data) return;
      const normalStyle = {
        color: featureLayer.color || '#177c76',
        weight: Number(featureLayer.weight) || 2.4,
        opacity: featureLayer.opacity ?? 0.96,
        fillColor: featureLayer.fillColor || featureLayer.color || '#177c76',
        fillOpacity: featureLayer.fillOpacity ?? 0.2,
        dashArray: featureLayer.dashArray,
      };
      let itemIndex = 0;
      const geometryLayer = L.geoJSON(data, {
        style: normalStyle,
        pointToLayer: (feature, latlng) => L.circleMarker(latlng, { ...normalStyle, radius: featureLayer.radius || 7 }),
        onEachFeature: (feature, layer) => {
          const index = itemIndex++;
          const properties = feature?.properties || {};
          const key = featureLayer.key || properties.feature_id || properties.id || `feature-layer-${featureLayerIndex}-${index}`;
          const label = featureLayer.label || featureLabel(feature, '지도 객체');
          const payload = featureLayer.payload || { key, kind: featureLayer.kind || 'feature', label, record: featureLayer.record || properties };
          bindInteraction(layer, {
            key,
            label,
            payload,
            popupRecord: featureLayer.popupRecord || featureLayer.record || properties,
            popupAction: featureLayer.popupAction,
            normalStyle,
            selectedStyle: selectedPathStyle(normalStyle),
          }, selectableLayers, currentSelectedKey, onSelectRef);
          if (featureLayer.onMouseEnter) layer.on('mouseover', () => featureLayer.onMouseEnter(payload));
          if (featureLayer.onMouseLeave) layer.on('mouseout', () => featureLayer.onMouseLeave(payload));
        },
      }).addTo(overlayLayer);
      extendBounds(visibleBounds, geometryLayer);
    });

    storeGroups.forEach((group, index) => {
      const latlng = toLatLng(group);
      if (!latlng) return;
      const key = group.key || `store-group-${index}`;
      const records = Array.isArray(group.records) ? group.records : [];
      const count = Number(group.count || records.length || 1);
      const first = records[0] || {};
      const multi = count > 1;
      const tooltip = multi
        ? `한 건물·위치의 점포 ${count.toLocaleString('ko-KR')}개`
        : `${first.name || '점포명 미확인'} · ${first.category3 || first.category2 || first.category1 || '업종 미확인'}`;
      const normalStyle = groupStyle(group, false);
      const layer = L.circleMarker(latlng, normalStyle).addTo(overlayLayer);
      bindInteraction(layer, {
        key,
        label: tooltip,
        payload: multi
          ? { ...group, key, kind: 'store-group', count }
          : { ...first, ...group, records, key, kind: 'store-group', count },
        popupFactory: () => createStorePopupContent(
          { ...group, records, count },
          multi ? () => onStoreGroupActionRef.current({ ...group, records, count, key }) : null,
        ),
        showTooltip: true,
        normalStyle,
        selectedStyle: groupStyle(group, true),
      }, selectableLayers, currentSelectedKey, onSelectRef);
      visibleBounds.extend(latlng);
    });

    markers.forEach((marker, index) => {
      const latlng = toLatLng(marker);
      if (!latlng) return;
      const key = marker.key || marker.id || `marker-${index}`;
      const label = marker.label || marker.name || marker.title || '위치';
      const normalStyle = markerStyle(marker, false);
      const layer = marker.badgeText === undefined
        ? L.circleMarker(latlng, normalStyle).addTo(overlayLayer)
        : L.marker(latlng, {
          icon: createCountBadgeIcon(marker),
          opacity: marker.opacity ?? 1,
          zIndexOffset: Number(marker.zIndexOffset) || 700,
        }).addTo(overlayLayer);
      bindInteraction(layer, {
        key,
        label,
        payload: { ...marker, key },
        popupRecord: marker.popupRecord || marker.record || marker,
        popupAction: marker.action ? {
          label: marker.action.label,
          onClick: () => onMarkerActionRef.current({ ...marker, key }),
        } : undefined,
        showTooltip: true,
        normalStyle,
        selectedStyle: markerStyle(marker, true),
        popupFactory: marker.popupFactory,
      }, selectableLayers, currentSelectedKey, onSelectRef);
      (marker.selectionKeys || []).forEach((selectionKey) => {
        selectableLayers.set(String(selectionKey), selectableLayers.get(String(key)) || []);
      });
      if (marker.onMouseEnter) layer.on('mouseover', () => marker.onMouseEnter(marker));
      if (marker.onMouseLeave) layer.on('mouseout', () => marker.onMouseLeave(marker));
      visibleBounds.extend(latlng);
      markerBounds.extend(latlng);
    });

    selectableLayersRef.current = selectableLayers;
    previousSelectedKeyRef.current = currentSelectedKey == null ? null : String(currentSelectedKey);

    const selectedEntry = currentSelectedKey == null
      ? null
      : selectableLayers.get(String(currentSelectedKey))?.[0];
    const selectedCenter = selectedEntry?.layer?.getLatLng?.()
      || selectedEntry?.layer?.getBounds?.()?.getCenter?.();
    const setViewport = (center, zoom) => {
      const currentCenter = map.getCenter();
      if (map.getZoom() === zoom && currentCenter.distanceTo(center) < 0.5) return;
      map.setView(center, zoom, { animate: false, reset: true });
    };
    const applyViewport = () => {
      if (focusSelected && selectedCenter) {
        setViewport(selectedCenter, focusZoom);
      } else if (fitVisible && visibleBounds.isValid()) {
        const targetBounds = fitVisibleToMarkers && markerBounds.isValid() ? markerBounds : visibleBounds;
        const visibleZoom = Math.min(map.getBoundsZoom(targetBounds, false, [24, 24]), fitVisibleMaxZoom);
        setViewport(targetBounds.getCenter(), visibleZoom);
      }
    };
    const viewportFrame = window.requestAnimationFrame(() => {
      map.invalidateSize({ animate: false, pan: false });
      applyViewport();
      if (deferInitialTileRef.current) {
        deferInitialTileRef.current = false;
        const nextBasemap = activeBasemapRef.current;
        tileLayerRef.current = createTileLayer(nextBasemap).addTo(map);
        tileLayerNameRef.current = nextBasemap;
        tileLayerRef.current.bringToBack();
      }
    });
    return () => {
      window.cancelAnimationFrame(viewportFrame);
    };
  }, [analysisVisibility, boundaryAnalysis, boundaryGeojson, boundaryVisibility, featureLayers, fitVisible, fitVisibleMaxZoom, fitVisibleToMarkers, focusSelected, focusZoom, mapInstance, markers, planGeojson, showPlanAreas, storeGroups]);

  useEffect(() => {
    const previousKey = previousSelectedKeyRef.current;
    const nextKey = selectedKey == null ? null : String(selectedKey);

    if (previousKey && previousKey !== nextKey) {
      (selectableLayersRef.current.get(previousKey) || []).forEach(({ layer, normalStyle }) => layer.setStyle?.(normalStyle));
    }
    if (nextKey) {
      const selectedEntries = selectableLayersRef.current.get(nextKey) || [];
      selectedEntries.forEach(({ layer, selectedStyle }) => {
        layer.setStyle?.(selectedStyle);
        layer.bringToFront?.();
      });
      const selectedLayer = selectedEntries[0]?.layer;
      if (focusSelectedOnChange && selectedLayer && mapInstance) {
        const center = selectedLayer.getLatLng?.() || selectedLayer.getBounds?.()?.getCenter?.();
        if (center) mapInstance.setView(center, focusZoom, { animate: false, reset: true });
      }
      if (openSelectedOnChange) selectedLayer?.openPopup?.();
    }
    previousSelectedKeyRef.current = nextKey;
  }, [focusSelectedOnChange, focusZoom, mapInstance, openSelectedOnChange, selectedKey]);

  return (
    <div className={`songhyeon-leaflet-map relative min-h-[420px] overflow-hidden bg-[#202326] ${className}`} role="region" aria-label={ariaLabel}>
      <div ref={containerRef} className="absolute inset-0" />
      <style>{`
        .songhyeon-leaflet-map .leaflet-container {
          height: 100%;
          width: 100%;
          background: #202326;
          font-family: inherit;
          font-size: 14px;
        }
        .songhyeon-leaflet-map .leaflet-control,
        .songhyeon-leaflet-map .leaflet-control a,
        .songhyeon-leaflet-map .leaflet-control-scale-line,
        .songhyeon-leaflet-map .leaflet-control-attribution,
        .songhyeon-leaflet-map .leaflet-popup-content,
        .songhyeon-leaflet-map .leaflet-tooltip {
          font-size: 14px;
        }
        .songhyeon-leaflet-map .leaflet-bar a {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border-color: #414448;
          background: #232527;
          color: #dedee1;
          font-size: 22px;
          line-height: 32px;
        }
        .songhyeon-leaflet-map .leaflet-bar a:hover,
        .songhyeon-leaflet-map .leaflet-bar a:focus {
          background: #303337;
          color: #fff;
        }
        .songhyeon-leaflet-map .leaflet-control-scale-line {
          border-color: #707278;
          background: rgba(28, 30, 32, 0.88);
          color: #e1e1e4;
          line-height: 18px;
          text-shadow: none;
        }
        .songhyeon-leaflet-map .leaflet-control-attribution {
          background: rgba(25, 27, 29, 0.84);
          color: #a8a8ad;
          line-height: 18px;
        }
        .songhyeon-leaflet-map .leaflet-control-attribution a {
          color: #b8ccdc;
        }
        .songhyeon-leaflet-map .songhyeon-map-tooltip {
          border: 1px solid #50545a;
          border-radius: 7px;
          background: rgba(31, 33, 35, 0.96);
          color: #f0f0f2;
          font-weight: 700;
          line-height: 18px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.34);
        }
        .songhyeon-leaflet-map .songhyeon-map-tooltip::before {
          border-top-color: #50545a;
        }
        .songhyeon-leaflet-map .songhyeon-map-count-badge {
          display: grid;
          place-items: center;
          box-sizing: border-box;
          border: 2px solid rgba(255, 255, 255, 0.82);
          border-radius: 999px;
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          line-height: 1;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.5);
        }
        .songhyeon-leaflet-map .songhyeon-map-count-badge--empty {
          border-color: #8a8d91;
          background: #565a5d !important;
          color: #e1e2e4;
          font-size: 18px;
        }
        .songhyeon-leaflet-map .songhyeon-map-tooltip--rich {
          max-width: 340px;
          padding: 10px 12px;
          white-space: normal;
        }
        .songhyeon-leaflet-map .songhyeon-map-tooltip__rich {
          display: grid;
          gap: 5px;
          min-width: 230px;
          color: #c7c8cc;
          font-size: 14px;
          font-weight: 500;
          line-height: 17px;
        }
        .songhyeon-leaflet-map .songhyeon-map-tooltip__rich strong {
          color: #f0f0f2;
          font-size: 15px;
          font-weight: 800;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup-shell .leaflet-popup-content-wrapper,
        .songhyeon-leaflet-map .songhyeon-map-popup-shell .leaflet-popup-tip {
          border: 1px solid #44474b;
          background: #232527;
          color: #d5d5d9;
          box-shadow: 0 16px 38px rgba(0, 0, 0, 0.46);
        }
        .songhyeon-leaflet-map .songhyeon-map-popup-shell .leaflet-popup-content {
          margin: 16px 18px;
          line-height: 18px;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup-shell .leaflet-popup-close-button {
          top: 6px;
          right: 6px;
          width: 28px;
          height: 28px;
          color: #a8a8ad;
          font-size: 22px;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup-shell .leaflet-popup-close-button:hover {
          color: #fff;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup h3 {
          margin: 0 28px 12px 0;
          color: #f1f1f3;
          font-size: 17px;
          font-weight: 800;
          line-height: 21px;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup h4 {
          margin: 14px 0 7px;
          color: #d8d8dc;
          font-size: 15px;
          font-weight: 800;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup dl {
          display: grid;
          gap: 7px;
          margin: 0;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup__row {
          display: grid;
          grid-template-columns: 92px minmax(0, 1fr);
          gap: 10px;
          border-top: 1px solid #373a3d;
          padding-top: 7px;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup__row dt {
          color: #85868b;
          font-size: 14px;
          font-weight: 700;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup__row dd {
          min-width: 0;
          margin: 0;
          overflow-wrap: anywhere;
          white-space: pre-wrap;
          color: #cdcdD1;
          font-size: 14px;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup__row a {
          color: #9fc3df;
          text-decoration: underline;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup__records {
          max-height: 190px;
          margin: 0;
          overflow-y: auto;
          padding: 0 0 0 20px;
          color: #bdbdc2;
          font-size: 14px;
          line-height: 19px;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup__meta,
        .songhyeon-leaflet-map .songhyeon-map-popup__body {
          margin: 0;
          color: #bdbdc2;
          font-size: 14px;
          line-height: 18px;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup__meta {
          margin-bottom: 8px;
          color: #8f9196;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup__subtext {
          display: block;
          margin-top: 5px;
          color: #92949a;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup__actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 14px;
          border-top: 1px solid #373a3d;
          padding-top: 10px;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup__action {
          min-height: 34px;
          border: 1px solid #536b7d;
          border-radius: 7px;
          padding: 6px 11px;
          background: #2a3b48;
          color: #d6e4ee;
          font: inherit;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
        }
        .songhyeon-leaflet-map .songhyeon-map-popup__action:hover,
        .songhyeon-leaflet-map .songhyeon-map-popup__action:focus-visible {
          border-color: #7595ab;
          background: #354d5e;
          color: #fff;
          outline: none;
        }
      `}</style>
    </div>
  );
}
