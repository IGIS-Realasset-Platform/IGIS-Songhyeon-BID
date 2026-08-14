import { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Map as MapIcon,
} from 'lucide-react';
import SonghyeonLeafletMap from '../components/map-activities/SonghyeonLeafletMap';
import SonghyeonHotelWorkspace from '../components/map-activities/SonghyeonHotelWorkspace';
import {
  AssetLeaseWorkspace,
  IgisRetailWorkspace,
} from '../components/map-activities/SonghyeonAssetRetailViews';
import {
  InstitutionsCommunityWorkspace,
  MarketActivitiesWorkspace,
  StoreTableDialog,
} from '../components/map-activities/SonghyeonMarketGovernanceViews';
import {
  loadSonghyeonAssetsLeaseData,
  loadSonghyeonInstitutionsCommunityData,
  loadSonghyeonIntegratedMapData,
  loadSonghyeonHotelData,
  loadSonghyeonMapActivitiesManifest,
  loadSonghyeonMarketActivitiesData,
  loadSonghyeonOperatingBoundaryData,
  loadSonghyeonStores,
} from '../lib/songhyeonMapActivitiesRepository';

const SECTIONS = [
  { id: 'integrated-map', label: '통합지도' },
  { id: 'boundary', label: '운영구역' },
  { id: 'assets-leases', label: '자산·임차' },
  { id: 'igis-retail', label: '이지스 리테일' },
  { id: 'market-activities', label: '상권·활동' },
  { id: 'hotel', label: '호텔' },
  { id: 'institutions-community', label: '제도·공동체' },
];

const BOUNDARY_IDS = ['compact_core', 'songhyeon_bukchon', 'insadong_east'];
const BOUNDARY_COLORS = ['#bd4f39', '#2e7566', '#315f91'];
const STORE_CATEGORY_LEGEND = [
  ['과학·기술', '#3d63b8'],
  ['교육', '#7149a8'],
  ['보건의료', '#0086ad'],
  ['부동산', '#566270'],
  ['소매', '#00887a'],
  ['수리·개인', '#ca4f8d'],
  ['숙박', '#ef9b25'],
  ['시설관리·임대', '#8b6b32'],
  ['예술·스포츠', '#9c5a3c'],
  ['음식', '#d84a3a'],
];
const STORE_CATEGORY_COLORS = Object.fromEntries(STORE_CATEGORY_LEGEND);
const MULTI_STORE_COLOR = '#69736e';
const STORE_FALLBACK_COLOR = '#818b87';

const formatNumber = (value) => Number(value || 0).toLocaleString('ko-KR');
const formatArea = (sqm, pyeong) => {
  const area = Number(sqm);
  if (!Number.isFinite(area)) return '-';
  const py = Number.isFinite(Number(pyeong)) ? Number(pyeong) : area / 3.305785;
  return `${formatNumber(Math.round(area))}㎡ · ${formatNumber(Math.round(py))}평`;
};

function hasCoordinate(value) {
  return value !== null && value !== undefined && value !== '' && Number.isFinite(Number(value));
}

function validPoint(value) {
  return hasCoordinate(value?.lon ?? value?.longitude) && hasCoordinate(value?.lat ?? value?.latitude);
}

function markerFromRecord(record, kind, index = 0) {
  const label = record.name || record.title || record.place_name || record.public_space_id || `${kind} ${index + 1}`;
  const key = record.id || record.program_id || record.public_space_id || record.asset_id || `${kind}-${index}`;
  const styles = {
    asset: { color: '#177c76', kindLabel: '이지스 자산', size: 10, actionLabel: '자산·임차 상세' },
    landmark: { color: '#9a7129', kindLabel: '핵심 랜드마크', size: 8 },
    public: { color: '#627f45', kindLabel: '공공공간', size: 7 },
    program: { color: '#a14d69', kindLabel: '활동', size: 7, actionLabel: '활동 기록 보기' },
    plan: { color: '#6e5899', kindLabel: '계획·규제', size: 7, actionLabel: '계획 상세 보기' },
  };
  const style = styles[kind];
  const actionId = kind === 'asset'
    ? (record.asset_id || record.id)
    : kind === 'program'
      ? (record.program_id || record.id)
      : kind === 'plan'
        ? record.id
        : null;
  const popupRecord = kind === 'asset'
    ? { status: record.status, type: record.type, address: record.address, role: record.role }
    : kind === 'landmark'
      ? { type: record.type, address: record.address, summary: [record.role, record.context, record.program].filter(Boolean).join('\n') }
      : kind === 'public'
        ? { type: record.space_type, address: record.address, organization: record.operator, summary: record.operation_relevance, source_url: record.source_url }
    : kind === 'program'
      ? { group: record.group, organization: record.organization, summary: record.summary || record.content_and_scale, source_url: record.source_url }
      : kind === 'plan'
        ? { scope: record.scope, impact: record.impact, location_notice: record.location_notice, source_url: record.source_url }
        : record;
  return {
    key: `${kind}-${key}-${index}`,
    kind,
    label,
    lon: Number(record.lon ?? record.longitude),
    lat: Number(record.lat ?? record.latitude),
    record,
    popupRecord,
    action: actionId && style?.actionLabel ? { type: kind, id: actionId, label: style.actionLabel } : null,
    ...style,
  };
}

function groupStores(stores) {
  const grouped = new Map();
  stores.forEach((store) => {
    if (!validPoint(store)) return;
    const key = `${Number(store.lon).toFixed(7)}:${Number(store.lat).toFixed(7)}`;
    if (!grouped.has(key)) grouped.set(key, { key: `stores-${key}`, lon: Number(store.lon), lat: Number(store.lat), records: [] });
    grouped.get(key).records.push(store);
  });
  return [...grouped.values()].map((group) => ({
    ...group,
    count: group.records.length,
    label: group.records.length === 1 ? group.records[0].name : `${group.records[0].name} 외 ${formatNumber(group.records.length - 1)}개`,
    color: group.records.length > 1
      ? MULTI_STORE_COLOR
      : (STORE_CATEGORY_COLORS[group.records[0]?.category1] || STORE_FALLBACK_COLOR),
  }));
}

function locationSummary(rows) {
  const located = rows.filter(validPoint).length;
  return { located, unlocated: rows.length - located };
}

function planAnchor(plan, landmarks, publicSpaces) {
  const text = `${plan?.title || ''} ${plan?.scope || ''}`;
  const landmark = (id) => landmarks.find((item) => item.id === id);
  const publicSpace = (id) => publicSpaces.find((item) => item.public_space_id === id);
  if (text.includes('송현')) return landmark('LMK-SONGHYEON');
  if (text.includes('조계사')) return landmark('LMK-JOGYESA');
  if (text.includes('삼청정독') || text.includes('골목형상점가') || text.includes('북촌')) {
    return publicSpace('PUB-JEONGDOK') || landmark('LMK-SONGHYEON');
  }
  if (text.includes('서울도심')) return landmark('LMK-SONGHYEON');
  return landmark('LMK-INSADONG-STREET');
}

function LoadingWorkspace({ error }) {
  return (
    <div className="grid h-full min-h-[620px] place-items-center bg-[#1F1F1E] px-8 text-center">
      <div className="max-w-[460px]">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-[14px] border border-[#3a3c3f] bg-[#262729] text-[#7da8cc]"><MapIcon size={22} /></span>
        <p className="mt-4 text-[19px] font-bold text-[#E5E5E5]">{error ? '데이터를 열지 못했습니다' : '전체 데이터를 불러오는 중입니다'}</p>
        <p className="mt-2 text-[15px] leading-5 text-[#86868B]">{error || '원본 21개 데이터셋을 화면별로 나누어 불러오고 있습니다.'}</p>
      </div>
    </div>
  );
}

class MapWorkspaceErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Map & Activities workspace error', error, info);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div role="alert" className="grid h-full min-h-[420px] place-items-center bg-[#1F1F1E] px-8 text-center">
        <div className="max-w-[520px] rounded-[12px] border border-[#4b3e3e] bg-[#292324] p-6">
          <p className="text-[19px] font-bold text-[#E5E5E5]">지도 화면을 표시하지 못했습니다</p>
          <p className="mt-2 text-[15px] leading-5 text-[#aaa0a1]">데이터를 줄이거나 건너뛰지 않았습니다. 화면을 다시 불러와 전체 레이어 연결을 복구할 수 있습니다.</p>
          <button type="button" onClick={() => window.location.reload()} className="mt-4 min-h-9 rounded-[8px] border border-[#596d7b] bg-[#2a353d] px-4 text-[14px] font-bold text-[#b9d1e1] hover:bg-[#33434e]">전체 지도 다시 불러오기</button>
        </div>
      </div>
    );
  }
}

function Header({ section }) {
  return (
    <header data-map-activities-header className="flex h-[58px] shrink-0 items-center border-b border-[#303235] bg-[#222325] px-5">
      <div className="flex min-w-0 items-center gap-2"><h1 className="text-[22px] font-bold tracking-tight text-white">Map & Activities</h1><span className="text-[16px] text-[#606165]">/</span><span className="text-[17px] font-bold text-[#B8C3CB]">{section.label}</span></div>
    </header>
  );
}

function LayerCluster({ title, items, state, onChange, defaultOpen = false }) {
  const checkboxRef = useRef(null);
  const enabled = items.filter((item) => state[item.id]).length;
  useEffect(() => {
    if (checkboxRef.current) checkboxRef.current.indeterminate = enabled > 0 && enabled < items.length;
  }, [enabled, items.length]);
  const allEnabled = enabled === items.length;
  return (
    <details open={defaultOpen} className="group border-b border-[#343638]">
      <summary className="map-layer-group-title flex min-h-[44px] cursor-pointer list-none items-center gap-2 px-4 text-[15px] font-bold text-[#D1D1D6] marker:hidden">
        <ChevronDown size={14} className="shrink-0 text-[#737479] transition-transform group-open:rotate-180" />
        <span className="min-w-0 flex-1">{title}</span>
        <label className="map-layer-toggle-all inline-flex cursor-pointer items-center gap-1.5 text-[14px] font-semibold text-[#8d8e93]" onClick={(event) => event.stopPropagation()}>
          <input ref={checkboxRef} type="checkbox" checked={allEnabled} onChange={() => onChange(items.map((item) => item.id), !allEnabled)} className="h-4 w-4 accent-[#7299b7]" />전체
        </label>
      </summary>
      <div className="space-y-1 px-3 pb-3">
        {items.map((item) => (
          <label key={item.id} className={`${state[item.id] ? 'border-[#46545e] bg-[#292f33] text-[#D1D1D6]' : 'border-transparent text-[#87888d] hover:bg-[#292a2c]'} ${BOUNDARY_IDS.includes(item.id) ? 'map-boundary-option' : ''} map-layer-item flex min-h-9 cursor-pointer items-center gap-2 rounded-[8px] border px-2.5 text-[14px]`}>
            <input type="checkbox" checked={Boolean(state[item.id])} onChange={() => onChange([item.id], !state[item.id])} className="h-4 w-4 accent-[#7299b7]" />
            <span className="min-w-0 flex-1 whitespace-nowrap leading-4">{item.label}</span>
          </label>
        ))}
      </div>
    </details>
  );
}

function BasemapSelect({ value, onChange }) {
  return (
    <select aria-label="배경지도" value={value} onChange={(event) => onChange(event.target.value)} className="h-8 rounded-[7px] border border-[#44474a] bg-[#242628] px-2.5 text-[14px] font-bold text-[#C1C1C6] outline-none focus:border-[#7299b7]">
      <option value="voyager">Voyager</option>
      <option value="positron">Positron</option>
    </select>
  );
}

function IntegratedWorkspace({ data, stores, loadStores, loadingStores }) {
  const navigate = useNavigate();
  const { integratedMap, operatingBoundaries, assetsLeases, marketActivities, institutionsCommunity } = data;
  const integrated = integratedMap.datasets;
  const boundary = operatingBoundaries.datasets;
  const assets = assetsLeases.datasets.assets;
  const market = marketActivities.datasets;
  const institutions = institutionsCommunity.datasets;
  const [basemap, setBasemap] = useState('voyager');
  const [storeDialog, setStoreDialog] = useState(null);
  const [layers, setLayers] = useState({
    compact_core: true,
    songhyeon_bukchon: true,
    insadong_east: true,
    assets: true,
    landmarks: true,
    publicSpaces: false,
    storesEast: false,
    programSeoul: false,
    programJongno: false,
    programCommunity: false,
    planAreas: false,
    planReferences: false,
    microzones: false,
    living_grid: false,
    walk_edges: false,
    arterial_edges: false,
  });

  const changeLayers = (ids, enabled) => {
    setLayers((current) => ({ ...current, ...Object.fromEntries(ids.map((id) => [id, enabled])) }));
    if (ids.includes('storesEast') && enabled && !stores) loadStores();
  };
  const handleMarkerAction = useCallback((marker) => {
    const action = marker?.action;
    if (!action?.id) return;
    if (action.type === 'asset') navigate(`/map-activities/assets-leases?asset=${encodeURIComponent(action.id)}`);
    if (action.type === 'program') navigate(`/map-activities/market-activities?program=${encodeURIComponent(action.id)}`);
    if (action.type === 'plan') navigate(`/map-activities/institutions-community?plan=${encodeURIComponent(action.id)}`);
  }, [navigate]);
  const handleStoreGroupAction = useCallback((group) => setStoreDialog(group), []);
  const assetById = useMemo(() => Object.fromEntries(assets.map((asset) => [asset.id, asset])), [assets]);
  const showAssets = layers.assets;
  const showLandmarks = layers.landmarks;
  const showPublicSpaces = layers.publicSpaces;
  const showProgramSeoul = layers.programSeoul;
  const showProgramJongno = layers.programJongno;
  const showProgramCommunity = layers.programCommunity;
  const showPlanReferences = layers.planReferences;
  const markers = useMemo(() => {
    const result = [];
    if (showAssets) result.push(...integrated.asset_markers.map((item, index) => markerFromRecord({ ...assetById[item.asset_id], ...item }, 'asset', index)));
    if (showLandmarks) result.push(...integrated.landmarks.map((item, index) => markerFromRecord(item, 'landmark', index)));
    if (showPublicSpaces) result.push(...integrated.public_spaces.filter(validPoint).map((item, index) => markerFromRecord(item, 'public', index)));
    const groupLayer = { '서울시·공공기관': 'programSeoul', 종로구: 'programJongno', '지역단체·공동체': 'programCommunity' };
    const enabledProgramLayers = { programSeoul: showProgramSeoul, programJongno: showProgramJongno, programCommunity: showProgramCommunity };
    result.push(...integrated.activity_markers.filter((item) => enabledProgramLayers[groupLayer[item.group]] && validPoint(item)).map((item, index) => markerFromRecord(item, 'program', index)));
    if (showPlanReferences) {
      result.push(...institutions.plans.map((item, index) => {
        const anchor = planAnchor(item, integrated.landmarks, integrated.public_spaces);
        return markerFromRecord({
          ...item,
          lon: anchor?.lon,
          lat: anchor?.lat,
          location_notice: '전체 적용경계가 아닌 관련 위치로 표시했습니다.',
        }, 'plan', index);
      }).filter(validPoint));
    }
    return result;
  }, [assetById, institutions.plans, integrated, showAssets, showLandmarks, showPlanReferences, showProgramCommunity, showProgramJongno, showProgramSeoul, showPublicSpaces]);
  const storeGroups = useMemo(() => layers.storesEast && stores ? groupStores(stores.filter((item) => item.east)) : [], [layers.storesEast, stores]);
  const boundaryVisibility = useMemo(() => Object.fromEntries(BOUNDARY_IDS.map((id) => [id, layers[id]])), [layers]);
  const analysisVisibility = useMemo(() => ({
    microzones: layers.microzones,
    living_grid: layers.living_grid,
    walk_edges: layers.walk_edges,
    arterial_edges: layers.arterial_edges,
  }), [layers.arterial_edges, layers.living_grid, layers.microzones, layers.walk_edges]);
  const publicSpaceLocations = locationSummary(integrated.public_spaces);
  const programLocationByGroup = Object.fromEntries(['서울시·공공기관', '종로구', '지역단체·공동체'].map((group) => [group, locationSummary(integrated.activity_markers.filter((item) => item.group === group))]));
  const sortedDialogStores = useMemo(() => storeDialog ? [...(storeDialog.records || [])].sort((left, right) => String(left.category1 || '').localeCompare(String(right.category1 || ''), 'ko') || String(left.name || '').localeCompare(String(right.name || ''), 'ko')) : [], [storeDialog]);
  const layerGroups = [
    { title: '운영구역', open: true, items: boundary.boundary_geojson.features.map((feature) => ({ id: feature.properties.candidate_id, label: feature.properties.candidate_label, count: feature.properties.store_count })) },
    { title: '자산·공공공간', open: true, items: [{ id: 'assets', label: '이지스 자산', count: integrated.asset_markers.length }, { id: 'landmarks', label: '핵심 랜드마크', count: integrated.landmarks.length }, { id: 'publicSpaces', label: `공공공간·보행축 ${publicSpaceLocations.located}곳 · 위치 미확인 ${publicSpaceLocations.unlocated}곳` }] },
    { title: '상권·활동', items: [{ id: 'storesEast', label: `상점·점포 ${formatNumber(market.store_display_audit.east_store_count)}개 · ${formatNumber(market.store_display_audit.east_location_count)}곳${loadingStores ? ' · 불러오는 중' : ''}` }, { id: 'programSeoul', label: `서울시·공공기관 ${programLocationByGroup['서울시·공공기관'].located}곳 · 위치 미확인 ${programLocationByGroup['서울시·공공기관'].unlocated}건` }, { id: 'programJongno', label: `종로구 ${programLocationByGroup.종로구.located}곳 · 위치 미확인 ${programLocationByGroup.종로구.unlocated}건` }, { id: 'programCommunity', label: `지역단체·공동체 ${programLocationByGroup['지역단체·공동체'].located}곳 · 위치 미확인 ${programLocationByGroup['지역단체·공동체'].unlocated}건` }] },
    { title: '계획·규제', items: [{ id: 'planAreas', label: '공간범위가 확인된 계획·사업', count: Object.keys(institutions.plan_geojson).length }, { id: 'planReferences', label: '관련 위치로 확인하는 계획·규제', count: institutions.plans.length }] },
    { title: '경계 분석자료', items: [{ id: 'microzones', label: '운영 미세구역', count: boundary.boundary_analysis.microzones.features.length }, { id: 'living_grid', label: '생활인구 격자', count: boundary.boundary_analysis.living_grid.features.length }, { id: 'walk_edges', label: '보행로', count: boundary.boundary_analysis.walk_edges.features.length }, { id: 'arterial_edges', label: '간선도로', count: boundary.boundary_analysis.arterial_edges.features.length }] },
  ];

  return (
    <div data-original-view="overview" className="grid h-full min-h-0 grid-cols-1 overflow-hidden min-[701px]:grid-cols-[230px_minmax(0,1fr)] min-[981px]:grid-cols-[270px_minmax(0,1fr)] max-[700px]:grid-rows-[minmax(0,260px)_minmax(420px,1fr)] max-[700px]:overflow-y-auto">
      <aside data-map-controls aria-label="통합지도 레이어" className="min-h-0 overflow-y-auto border-r border-[#303235] bg-[#232426] max-[700px]:max-h-[260px] max-[700px]:border-b max-[700px]:border-r-0">
        <div className="map-layer-panel-title flex h-12 items-center border-b border-[#343638] px-4 text-[16px] font-bold text-[#E0E0E3]">지도 레이어</div>
        {layerGroups.map((group) => <LayerCluster key={group.title} title={group.title} items={group.items} state={layers} onChange={changeLayers} defaultOpen={group.open} />)}
      </aside>
      <section data-map-canvas aria-label="통합지도" className="relative h-full min-h-0 bg-[#202123]">
        <SonghyeonLeafletMap
          boundaryGeojson={boundary.boundary_geojson}
          boundaryVisibility={boundaryVisibility}
          boundaryAnalysis={boundary.boundary_analysis}
          analysisVisibility={analysisVisibility}
          planGeojson={institutions.plan_geojson}
          showPlanAreas={layers.planAreas}
          markers={markers}
          storeGroups={storeGroups}
          onStoreGroupAction={handleStoreGroupAction}
          onMarkerAction={handleMarkerAction}
          basemap={basemap}
          className="h-full"
          ariaLabel="운영구역, 자산, 공공공간, 상권, 활동, 계획, 분석자료 통합지도"
        />
        <div className="absolute left-[56px] top-4 z-[1000]"><BasemapSelect value={basemap} onChange={setBasemap} /></div>
        {layers.storesEast && (
          <div data-store-category-legend aria-label="점포 업종 범례" className="pointer-events-none absolute bottom-[58px] left-4 z-[1000] flex max-w-[calc(100%-32px)] flex-wrap gap-x-3 gap-y-2 rounded-[9px] border border-white/10 bg-[#171819]/92 px-3 py-2 text-[14px] text-[#B1B1B6] shadow-lg backdrop-blur">
            {STORE_CATEGORY_LEGEND.map(([label, color]) => <span key={label} className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />{label}</span>)}
            <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full" style={{ background: MULTI_STORE_COLOR }} />다수 점포</span>
          </div>
        )}
        <div className="pointer-events-none absolute bottom-4 left-4 z-[1000] flex max-w-[calc(100%-32px)] flex-wrap gap-3 rounded-[9px] border border-white/10 bg-[#171819]/92 px-3 py-2 text-[14px] text-[#B1B1B6] shadow-lg backdrop-blur">
          {[['이지스 자산', '#177c76'], ['랜드마크', '#9a7129'], ['공공공간', '#627f45'], ['활동', '#a14d69'], ['계획', '#6e5899']].map(([label, color]) => <span key={label} className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />{label}</span>)}
        </div>
      </section>
      {storeDialog && <StoreTableDialog stores={sortedDialogStores} title={`${storeDialog.records?.[0]?.address || '주소 미확인'} · ${formatNumber(sortedDialogStores.length)}개 점포`} onClose={() => setStoreDialog(null)} />}
    </div>
  );
}

function BoundaryWorkspace({ operatingBoundaries, integratedMap }) {
  const navigate = useNavigate();
  const boundary = operatingBoundaries.datasets;
  const integrated = integratedMap.datasets;
  const [basemap, setBasemap] = useState('voyager');
  const [layers, setLayers] = useState({
    compact_core: true,
    songhyeon_bukchon: true,
    insadong_east: true,
    increments: false,
    assets: true,
    landmarks: true,
    arterial_edges: true,
    excluded_offices: true,
  });
  const changeLayers = (ids, enabled) => setLayers((current) => ({ ...current, ...Object.fromEntries(ids.map((id) => [id, enabled])) }));
  const handleMarkerAction = useCallback((marker) => {
    if (marker?.action?.type === 'asset' && marker.action.id) navigate(`/map-activities/assets-leases?asset=${encodeURIComponent(marker.action.id)}`);
  }, [navigate]);
  const markers = useMemo(() => [
    ...(layers.assets ? integrated.asset_markers.map((item, index) => markerFromRecord(item, 'asset', index)) : []),
    ...(layers.landmarks ? integrated.landmarks.map((item, index) => markerFromRecord(item, 'landmark', index)) : []),
  ], [integrated, layers.assets, layers.landmarks]);
  const boundaryItems = boundary.boundary_geojson.features.map((feature) => ({ id: feature.properties.candidate_id, label: feature.properties.candidate_label }));
  const evidenceItems = [
    { id: 'assets', label: '이지스 자산', count: integrated.asset_markers.length },
    { id: 'landmarks', label: '핵심 거점', count: integrated.landmarks.length },
    { id: 'arterial_edges', label: '간선도로', count: boundary.boundary_analysis.arterial_edges.features.length },
    { id: 'excluded_offices', label: 'CBD 제외 기준점', count: boundary.boundary_analysis.excluded_offices.features.length },
  ];
  return (
    <div data-original-view="boundary" className="h-full overflow-y-auto bg-[#1F1F1E] p-4">
      <div className="overflow-hidden rounded-[12px] border border-[#343638] bg-[#222325]">
        <div className="grid min-h-[610px] grid-cols-[270px_minmax(0,1fr)]">
          <aside className="overflow-y-auto border-r border-[#343638] bg-[#232426]"><div className="map-layer-panel-title flex h-12 items-center border-b border-[#343638] px-4 text-[16px] font-bold">경계 비교</div><LayerCluster title="운영구역" items={[...boundaryItems, { id: 'increments', label: '순증가 영역', count: boundary.boundary_analysis.increments.features.length }]} state={layers} onChange={changeLayers} defaultOpen /><LayerCluster title="판단 근거" items={evidenceItems} state={layers} onChange={changeLayers} defaultOpen /></aside>
          <section className="relative min-h-[610px]"><SonghyeonLeafletMap boundaryGeojson={boundary.boundary_geojson} boundaryVisibility={Object.fromEntries(BOUNDARY_IDS.map((id) => [id, layers[id]]))} boundaryAnalysis={boundary.boundary_analysis} analysisVisibility={layers} markers={markers} onMarkerAction={handleMarkerAction} basemap={basemap} className="h-full min-h-[610px]" ariaLabel="운영구역 세 대안과 판단근거 지도" /><div className="absolute left-[56px] top-4 z-[1000]"><BasemapSelect value={basemap} onChange={setBasemap} /></div></section>
        </div>
      </div>

      <section className="mt-4 overflow-hidden rounded-[12px] border border-[#343638] bg-[#232426]">
        <div className="border-b border-[#343638] p-5"><h2 className="text-[21px] font-bold text-[#ECECEF]">왜 세 개의 대안을 함께 보는가</h2><p className="mt-2 text-[16px] leading-6 text-[#A0A0A5]">세 안은 서로 경쟁하는 임의의 경계가 아니라, 같은 핵심권에서 운영 목적과 협력범위를 단계적으로 넓히는 선택지입니다. 대안 1 ⊂ 대안 2 ⊂ 대안 3의 포함관계를 유지하므로, 어느 수준까지 직접 운영할지 선택할 수 있습니다.</p></div>
        <div className="divide-y divide-[#343638]">{boundary.boundary_narratives.map((item, index) => (
          <article key={item.boundary_id} className="grid grid-cols-[minmax(260px,0.8fr)_minmax(0,2.2fr)] gap-6 p-5">
            <div><div className="flex items-start gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[15px] font-black text-white" style={{ background: BOUNDARY_COLORS[index] }}>{index + 1}</span><div><h3 className="text-[19px] font-bold leading-6 text-[#E0E0E3]">{item.alternative} · {item.name}</h3><p className="mt-1 text-[15px] leading-5 text-[#8f9095]">{item.recommended_use}</p></div></div></div>
            <div><div className="grid grid-cols-2 gap-x-6 gap-y-4"><div><p className="text-[14px] font-bold text-[#76777c]">선택 질문</p><p className="mt-1 text-[15px] leading-5 text-[#B7B7BC]">{item.selection_question}</p></div><div><p className="text-[14px] font-bold text-[#76777c]">경계를 이렇게 잡은 이유</p><p className="mt-1 text-[15px] leading-5 text-[#B7B7BC]">{item.boundary_logic}</p></div><div><p className="text-[14px] font-bold text-[#76777c]">다른 안과의 차이</p><p className="mt-1 text-[15px] leading-5 text-[#B7B7BC]">{item.difference}</p></div><div><p className="text-[14px] font-bold text-[#76777c]">누적 구조</p><p className="mt-1 text-[15px] leading-5 text-[#B7B7BC]">{item.increment_note}</p></div></div>
              <div className="mt-4 grid grid-cols-4 gap-2">{[['면적', formatArea(item.area_sqm, item.area_pyeong)], ['점포', `${formatNumber(item.store_count)}개`], ['내국인 생활인구 추정', `${formatNumber(item.estimated_local_population)}명`], ['외국인 생활인구 추정', `${formatNumber(item.estimated_foreign_long_population + item.estimated_foreign_short_population)}명`]].map(([label, value]) => <div key={label} className="rounded-[8px] border border-[#393b3e] bg-[#28292b] p-3"><p className="text-[14px] text-[#77787d]">{label}</p><p className="mt-1 text-[16px] font-bold text-[#D1D1D6]">{value}</p></div>)}</div>
            </div>
          </article>
        ))}</div>
      </section>

      <section className="mt-4 rounded-[12px] border border-[#343638] bg-[#232426] p-5"><div><h2 className="text-[21px] font-bold text-[#ECECEF]">대안별 수치 비교</h2><p className="mt-1 text-[15px] text-[#85868b]">생활인구는 250m 격자 관측총량을 미세구역에 배분한 추정값입니다.</p></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[980px] border-collapse text-left text-[15px]"><thead><tr className="border-y border-[#414347] bg-[#292a2c] text-[#919297]">{['대안', '성격', '면적', '점포', '내국인 추정', '장기 외국인 추정', '단기 외국인 추정', '적합한 운영범위'].map((label) => <th key={label} className="px-3 py-3 font-bold">{label}</th>)}</tr></thead><tbody>{boundary.boundary_narratives.map((item) => <tr key={item.boundary_id} className="border-b border-[#343638] text-[#BDBDC2]"><td className="px-3 py-3 font-bold text-[#D6D6DA]">{item.alternative}</td><td className="px-3 py-3">{item.name}</td><td className="px-3 py-3">{formatArea(item.area_sqm, item.area_pyeong)}</td><td className="px-3 py-3">{formatNumber(item.store_count)}개</td><td className="px-3 py-3">{formatNumber(item.estimated_local_population)}명</td><td className="px-3 py-3">{formatNumber(item.estimated_foreign_long_population)}명</td><td className="px-3 py-3">{formatNumber(item.estimated_foreign_short_population)}명</td><td className="px-3 py-3 leading-5">{item.recommended_use}</td></tr>)}</tbody></table></div></section>
    </div>
  );
}

function useMapData(sectionId) {
  const [state, setState] = useState({ sectionId: null, loading: true, error: '', manifest: null, data: {}, stores: null, loadingStores: false });
  useEffect(() => {
    let active = true;
    const required = {
      'integrated-map': ['integratedMap', 'operatingBoundaries', 'assetsLeases', 'marketActivities', 'institutionsCommunity'],
      boundary: ['integratedMap', 'operatingBoundaries'],
      'assets-leases': ['integratedMap', 'operatingBoundaries', 'assetsLeases'],
      'igis-retail': ['integratedMap', 'operatingBoundaries', 'assetsLeases', 'marketActivities'],
      'market-activities': ['integratedMap', 'operatingBoundaries', 'marketActivities', 'stores'],
      hotel: ['operatingBoundaries', 'hotel'],
      'institutions-community': ['integratedMap', 'operatingBoundaries', 'marketActivities', 'institutionsCommunity'],
    }[sectionId] || [];
    const loaders = {
      integratedMap: loadSonghyeonIntegratedMapData,
      operatingBoundaries: loadSonghyeonOperatingBoundaryData,
      assetsLeases: loadSonghyeonAssetsLeaseData,
      marketActivities: loadSonghyeonMarketActivitiesData,
      hotel: loadSonghyeonHotelData,
      institutionsCommunity: loadSonghyeonInstitutionsCommunityData,
      stores: loadSonghyeonStores,
    };
    Promise.all([loadSonghyeonMapActivitiesManifest(), ...required.map((name) => loaders[name]())])
      .then(([manifest, ...values]) => {
        if (!active) return;
        const loaded = Object.fromEntries(required.map((name, index) => [name, values[index]]));
        setState((current) => ({ ...current, sectionId, loading: false, error: '', manifest, data: { ...current.data, ...loaded }, stores: loaded.stores || current.stores }));
      })
      .catch((error) => active && setState((current) => ({ ...current, sectionId, loading: false, error: error.message || '데이터를 불러오지 못했습니다.' })));
    return () => { active = false; };
  }, [sectionId]);
  const loadStores = () => {
    if (state.stores || state.loadingStores) return;
    setState((current) => ({ ...current, loadingStores: true }));
    loadSonghyeonStores().then((stores) => setState((current) => ({ ...current, stores, loadingStores: false }))).catch((error) => setState((current) => ({ ...current, loadingStores: false, error: error.message })));
  };
  return { ...state, loading: state.sectionId !== sectionId || state.loading, error: state.sectionId === sectionId ? state.error : '', loadStores };
}

export default function MapActivities() {
  const { pathname, search } = useLocation();
  const slug = pathname.split('/').filter(Boolean).at(-1);
  const section = SECTIONS.find((item) => item.id === slug) || SECTIONS[0];
  const state = useMapData(section.id);
  const focusParams = useMemo(() => new URLSearchParams(search), [search]);
  let workspace = null;

  if (!state.loading && !state.error) {
    if (section.id === 'integrated-map') workspace = <IntegratedWorkspace data={state.data} stores={state.stores} loadStores={state.loadStores} loadingStores={state.loadingStores} />;
    if (section.id === 'boundary') workspace = <BoundaryWorkspace operatingBoundaries={state.data.operatingBoundaries} integratedMap={state.data.integratedMap} />;
    if (section.id === 'assets-leases') workspace = <AssetLeaseWorkspace assets={state.data.assetsLeases.datasets.assets} assetMarkers={state.data.integratedMap.datasets.asset_markers} landmarks={state.data.integratedMap.datasets.landmarks} boundaryData={state.data.operatingBoundaries.datasets} focusAssetId={focusParams.get('asset')} />;
    if (section.id === 'igis-retail') workspace = <IgisRetailWorkspace igisRetail={state.data.marketActivities.datasets.igis_retail} assets={state.data.assetsLeases.datasets.assets} assetMarkers={state.data.integratedMap.datasets.asset_markers} boundaryData={state.data.operatingBoundaries.datasets} />;
    if (section.id === 'market-activities') workspace = <MarketActivitiesWorkspace marketData={state.data.marketActivities.datasets} stores={state.stores} boundaryData={state.data.operatingBoundaries.datasets} integratedData={state.data.integratedMap.datasets} focusProgramId={focusParams.get('program')} />;
    if (section.id === 'hotel') workspace = <SonghyeonHotelWorkspace hotelData={state.data.hotel} boundaryData={state.data.operatingBoundaries.datasets} />;
    if (section.id === 'institutions-community') workspace = <InstitutionsCommunityWorkspace institutionData={state.data.institutionsCommunity.datasets} marketData={state.data.marketActivities.datasets} boundaryData={state.data.operatingBoundaries.datasets} integratedData={state.data.integratedMap.datasets} focusPlanId={focusParams.get('plan')} />;
  }

  return (
    <div data-map-activities-workspace data-active-section={section.id} className="flex h-full min-h-0 flex-col overflow-hidden bg-[#1F1F1E] text-[14px] text-[#E5E5E5]">
      <Header section={section} />
      <main className="min-h-0 flex-1 overflow-hidden">{state.loading || state.error ? <LoadingWorkspace error={state.error} /> : <MapWorkspaceErrorBoundary resetKey={`${section.id}:${search}`}>{workspace}</MapWorkspaceErrorBoundary>}</main>
    </div>
  );
}
