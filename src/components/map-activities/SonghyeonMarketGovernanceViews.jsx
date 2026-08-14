import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  Info,
  Layers3,
  ListFilter,
  LocateFixed,
  Map as MapIcon,
  MapPin,
  Search,
  Table2,
  Users,
  X,
} from 'lucide-react';
import SonghyeonLeafletMap from './SonghyeonLeafletMap';

const STORE_PAGE_SIZE = 100;
const STORE_CATEGORY_COLORS = {
  음식: '#d84a3a',
  소매: '#00887a',
  '과학·기술': '#3d63b8',
  '시설관리·임대': '#8b6b32',
  교육: '#7149a8',
  '수리·개인': '#ca4f8d',
  보건의료: '#0086ad',
  숙박: '#ef9b25',
  부동산: '#566270',
  '예술·스포츠': '#9c5a3c',
  기타: '#818b87',
};
const SUBAREA_COLORS = {
  '공통 핵심권': '#bd4f39',
  '북촌 추가권': '#2e7566',
  '대안 3 북측 확장권': '#315f91',
};
const PLAN_LAYER_COLORS = {
  district: '#6e5899',
  songhyeon: '#3e8063',
  dohwaseo: '#376ba1',
  culture: '#a86820',
  boundaries: '#315f91',
};
const ORG_GROUP_ORDER = [
  '서울시·종로구 행정기관',
  '공공 문화·교육기관',
  '지역 기반 공동체·운영조직',
  '종교·역사문화기관',
];
const PROGRAM_GROUP_ORDER = ['서울시·공공기관', '종로구', '지역단체·공동체'];
const PROGRAM_LAYER_BY_GROUP = {
  '서울시·공공기관': 'programSeoul',
  종로구: 'programJongno',
  '지역단체·공동체': 'programCommunity',
};

const rowsOf = (bundle, key) => {
  const value = bundle?.datasets?.[key] ?? bundle?.[key];
  return Array.isArray(value) ? value : [];
};

const objectOf = (bundle, key) => {
  const value = bundle?.datasets?.[key] ?? bundle?.[key];
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
};

const formatNumber = (value) => Number(value || 0).toLocaleString('ko-KR');
const display = (value) => value == null || value === '' ? '-' : String(value);
const formatDate = (value) => value ? String(value).replaceAll('-', '.') : '-';
const normalize = (value) => String(value || '').trim().toLocaleLowerCase('ko-KR');
const unique = (values) => [...new Set(values.filter((value) => value != null && value !== ''))]
  .sort((a, b) => String(a).localeCompare(String(b), 'ko'));

function hasMapPoint(value) {
  const latitude = value?.lat ?? value?.latitude;
  const longitude = value?.lon ?? value?.longitude;
  return latitude !== null
    && latitude !== undefined
    && latitude !== ''
    && longitude !== null
    && longitude !== undefined
    && longitude !== ''
    && Number.isFinite(Number(latitude))
    && Number.isFinite(Number(longitude));
}

function BasemapControl({ value, onChange, label = '배경지도' }) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-8 rounded-[7px] border border-[#44474a] bg-[#242628] px-2.5 text-[14px] font-bold text-[#c1c1c6] shadow-lg outline-none focus:border-[#7299b7]"
    >
      <option value="voyager">Voyager</option>
      <option value="positron">Positron</option>
    </select>
  );
}

function sourceLink(url, label = '원문 열기') {
  if (!url) return null;
  return (
    <a href={url} target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center gap-1.5 rounded-[7px] border border-[#435463] bg-[#273039] px-2.5 py-1.5 text-[14px] font-bold text-[#a9c8df] transition-colors hover:border-[#66849c] hover:text-white">
      {label}<ExternalLink size={13} aria-hidden="true" />
    </a>
  );
}

function Field({ label, children, wide = false }) {
  return (
    <div className={wide ? 'min-[700px]:col-span-2' : ''}>
      <dt className="text-[14px] font-bold text-[#74767b]">{label}</dt>
      <dd className="mt-1 whitespace-pre-line text-[15px] leading-[19px] text-[#c4c5c8]">{children || '-'}</dd>
    </div>
  );
}

function Metric({ label, value, accent = false }) {
  return (
    <div className="rounded-[9px] border border-[#35373a] bg-[#242527] px-3 py-2.5">
      <p className="text-[14px] text-[#77797d]">{label}</p>
      <p className={`${accent ? 'text-[#a6c4d9]' : 'text-[#d2d2d5]'} mt-1 text-[19px] font-bold tabular-nums`}>{value}</p>
    </div>
  );
}

function SelectField({ label, value, onChange, options, allLabel = '전체' }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[14px] font-bold text-[#85878c]">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-9 w-full rounded-[8px] border border-[#3b3d40] bg-[#202123] px-2.5 text-[15px] text-[#d2d2d5] outline-none focus:border-[#6e8ca3]">
        <option value="">{allLabel}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function ModalShell({ title, eyebrow, onClose, children, width = 'max-w-[1440px]' }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <div role="presentation" className="fixed inset-0 z-[2200] grid place-items-center bg-black/75 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-label={title} className={`${width} flex max-h-[calc(100vh-32px)] w-full flex-col overflow-hidden rounded-[14px] border border-[#3b3d40] bg-[#1e1f20] shadow-2xl`}>
        <header className="flex min-h-[64px] shrink-0 items-center justify-between gap-4 border-b border-[#343638] px-5">
          <div className="min-w-0">
            {eyebrow && <p className="text-[14px] font-bold tracking-[0.14em] text-[#7395ae]">{eyebrow}</p>}
            <h2 className="truncate text-[20px] font-bold text-[#e8e8e9]">{title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="닫기" className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border border-[#3b3d40] text-[#98999d] hover:bg-[#292b2d] hover:text-white"><X size={18} /></button>
        </header>
        {children}
      </section>
    </div>
  );
}

function storeInBoundary(store, boundaryMode) {
  if (boundaryMode === 'compact') return Boolean(store.compact);
  if (boundaryMode === 'bukchon') return Boolean(store.bukchon);
  if (boundaryMode === 'east') return Boolean(store.east);
  return true;
}

function boundaryScope(boundaryMode) {
  if (boundaryMode === 'compact') return '대안 1';
  if (boundaryMode === 'bukchon') return '대안 2';
  if (boundaryMode === 'east') return '대안 3';
  return '대안 3';
}

function marketSubareaFeatures(boundaryGeojson, boundaryAnalysis) {
  const compact = (boundaryGeojson.features || [])
    .filter((feature) => feature.properties?.candidate_id === 'compact_core')
    .map((feature) => ({
      ...feature,
      properties: { ...feature.properties, subarea_name: '공통 핵심권' },
    }));
  const additions = (boundaryAnalysis.increments?.features || [])
    .filter((feature) => feature.properties?.candidate_id !== 'compact_core')
    .map((feature) => ({
      ...feature,
      properties: {
        ...feature.properties,
        subarea_name: feature.properties?.candidate_id === 'songhyeon_bukchon'
          ? '북촌 추가권'
          : '대안 3 북측 확장권',
      },
    }));
  return [...compact, ...additions];
}

function StoreMap({ stores, boundaryMode, boundaryData, selectedGroup, onSelectGroup, activeSubarea, onSelectSubarea }) {
  const boundaryGeojson = objectOf(boundaryData, 'boundary_geojson');
  const boundaryAnalysis = objectOf(boundaryData, 'boundary_analysis');
  const [basemap, setBasemap] = useState('voyager');
  const groups = useMemo(() => {
    const map = new Map();
    stores.forEach((store) => {
      if (!Number.isFinite(Number(store.lon)) || !Number.isFinite(Number(store.lat))) return;
      const key = `${Number(store.lon).toFixed(7)}:${Number(store.lat).toFixed(7)}`;
      const group = map.get(key) || {
        id: key,
        key,
        lon: Number(store.lon),
        lat: Number(store.lat),
        count: 0,
        records: [],
      };
      group.count += 1;
      group.records.push(store);
      map.set(key, group);
    });
    return [...map.values()].map((group) => ({
      ...group,
      label: group.count > 1 ? `동일 좌표 점포 ${formatNumber(group.count)}개` : group.records[0]?.name,
      color: group.count > 1 ? '#69736e' : (STORE_CATEGORY_COLORS[group.records[0]?.category1] || '#6f98b8'),
    }));
  }, [stores]);
  const boundaryVisibility = useMemo(() => boundaryMode === 'all'
    ? { compact_core: true, songhyeon_bukchon: true, insadong_east: true }
    : {
      compact_core: boundaryMode === 'compact',
      songhyeon_bukchon: boundaryMode === 'bukchon',
      insadong_east: boundaryMode === 'east',
    }, [boundaryMode]);
  const subareaFeatures = useMemo(
    () => marketSubareaFeatures(boundaryGeojson, boundaryAnalysis),
    [boundaryAnalysis, boundaryGeojson],
  );
  const subareaLayers = useMemo(() => activeSubarea ? subareaFeatures.map((feature) => {
    const name = feature.properties?.subarea_name;
    const color = SUBAREA_COLORS[name] || '#818b87';
    const selected = name === activeSubarea;
    return {
      key: `market-subarea:${name}`,
      label: `${name} · ${(Number(feature.properties?.area_ha) || 0).toFixed(1)}ha`,
      data: feature,
      color,
      weight: selected ? 4.5 : 3,
      fillColor: color,
      fillOpacity: selected ? 0.28 : 0.14,
      dashArray: selected ? undefined : '7 4',
      kind: 'market-subarea',
      record: feature.properties,
      payload: {
        key: `market-subarea:${name}`,
        kind: 'market-subarea',
        name,
        label: name,
        record: feature.properties,
      },
    };
  }) : [], [activeSubarea, subareaFeatures]);

  return (
    <div id="songhyeon-market-map" className="relative h-full min-h-[460px] overflow-hidden bg-[#202224]">
      <SonghyeonLeafletMap
        boundaryGeojson={boundaryGeojson}
        boundaryVisibility={boundaryVisibility}
        featureLayers={subareaLayers}
        storeGroups={groups}
        selectedKey={activeSubarea ? `market-subarea:${activeSubarea}` : selectedGroup?.id}
        onSelect={(item) => {
          if (item.kind === 'market-subarea') {
            onSelectSubarea(item.name);
            return;
          }
          onSelectGroup({ ...item, stores: item.records });
        }}
        fitVisible
        focusSelected={Boolean(activeSubarea)}
        focusZoom={16}
        basemap={basemap}
        className="h-full min-h-[460px]"
        ariaLabel={`필터된 점포 ${formatNumber(stores.length)}개 실제 상세 지도`}
      />
      <div className="absolute left-[56px] top-4 z-[1000]"><BasemapControl value={basemap} onChange={setBasemap} label="상권 배경지도" /></div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-[8px] border border-white/10 bg-[#171819]/90 px-3 py-2 shadow-lg backdrop-blur">
        <p className="text-[14px] font-bold text-[#c8c9cc]">현재 필터</p>
        <p className="mt-1 text-[15px] font-bold tabular-nums text-[#a9c8df]">{formatNumber(stores.length)}개 점포 · {formatNumber(groups.length)}개 좌표 묶음</p>
      </div>
      {activeSubarea && (
        <div className="absolute left-[56px] top-[54px] z-[1000] flex max-w-[calc(100%-72px)] flex-wrap gap-1.5 rounded-[8px] border border-white/10 bg-[#171819]/92 p-2 shadow-lg backdrop-blur">
          {subareaFeatures.map((feature) => {
            const name = feature.properties?.subarea_name;
            const selected = name === activeSubarea;
            return <button key={name} type="button" onClick={() => onSelectSubarea(name)} className={`${selected ? 'border-white/35 bg-white/10 text-white' : 'border-white/10 text-[#a0a1a5] hover:bg-white/5'} inline-flex min-h-8 items-center gap-1.5 rounded-[6px] border px-2.5 text-[14px] font-bold`}><i className="h-2.5 w-2.5 rounded-full" style={{ background: SUBAREA_COLORS[name] }} />{name} · {(Number(feature.properties?.area_ha) || 0).toFixed(1)}ha</button>;
          })}
        </div>
      )}
      <div className="pointer-events-none absolute bottom-8 left-4 right-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-[8px] border border-white/10 bg-[#171819]/90 px-3 py-2 text-[14px] text-[#a0a1a5] shadow-lg backdrop-blur">
        {Object.entries(STORE_CATEGORY_COLORS).map(([label, color]) => <span key={label} className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />{label}</span>)}<span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#69736e]" />다수 점포</span>
      </div>
    </div>
  );
}

export function StoreTableDialog({ stores, title, onClose }) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(stores.length / STORE_PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visibleRows = stores.slice((safePage - 1) * STORE_PAGE_SIZE, safePage * STORE_PAGE_SIZE);
  return (
    <ModalShell title={title} eyebrow={`STORE RAW DATA · ${formatNumber(stores.length)} RECORDS`} onClose={onClose}>
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[1320px] border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-[#262729] text-[14px] text-[#8f9196]">
            <tr>{['점포명', '대분류', '중분류', '세부업종', '주소', '세부권역', '협업·규제 검토'].map((label) => <th key={label} className="border-b border-[#3a3c3f] px-4 py-3 font-bold">{label}</th>)}</tr>
          </thead>
          <tbody>
            {visibleRows.map((store) => (
              <tr key={store.id} className="border-b border-[#303235] align-top text-[14px] text-[#b7b8bc] hover:bg-[#252729]">
                <td className="max-w-[220px] px-4 py-3 font-bold text-[#d7d7d9]">{display(store.name)}</td>
                <td className="px-4 py-3">{display(store.category1)}</td>
                <td className="px-4 py-3">{display(store.category2)}</td>
                <td className="max-w-[250px] px-4 py-3">{display(store.category3)}</td>
                <td className="max-w-[290px] px-4 py-3 leading-[18px]">{display(store.address)}</td>
                <td className="px-4 py-3">{display(store.segment)}</td>
                <td className="max-w-[260px] px-4 py-3 leading-[18px]">{display([store.promotion, store.restriction].filter(Boolean).join(' · '))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!visibleRows.length && <div className="grid min-h-[260px] place-items-center text-[15px] text-[#77797d]">조건에 맞는 점포가 없습니다.</div>}
      </div>
      <footer className="flex min-h-[58px] shrink-0 items-center justify-between gap-4 border-t border-[#343638] bg-[#232426] px-5">
        <p className="text-[14px] text-[#85878c]">{formatNumber((safePage - 1) * STORE_PAGE_SIZE + (visibleRows.length ? 1 : 0))}–{formatNumber((safePage - 1) * STORE_PAGE_SIZE + visibleRows.length)} / {formatNumber(stores.length)}</p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={safePage === 1} className="grid h-8 w-8 place-items-center rounded-[7px] border border-[#3b3d40] text-[#a0a1a5] disabled:opacity-35"><ChevronLeft size={16} /></button>
          <span className="min-w-[94px] text-center text-[14px] font-bold tabular-nums text-[#c8c9cc]">{safePage} / {pageCount}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={safePage === pageCount} className="grid h-8 w-8 place-items-center rounded-[7px] border border-[#3b3d40] text-[#a0a1a5] disabled:opacity-35"><ChevronRight size={16} /></button>
        </div>
      </footer>
    </ModalShell>
  );
}

function StatisticsTable({ rows, title }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#35373a] bg-[#242527]">
      <div className="flex min-h-[46px] items-center justify-between gap-3 border-b border-[#35373a] px-4">
        <p className="text-[16px] font-bold text-[#d6d6d8]">{title}</p>
        <p className="text-[14px] text-[#74767b]">상위 {Math.min(30, rows.length)}개</p>
      </div>
      <div className="max-h-[500px] overflow-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead className="sticky top-0 bg-[#292a2c] text-[14px] text-[#86888d]"><tr><th className="px-4 py-2.5">업종</th><th className="px-3 py-2.5 text-right">점포</th><th className="px-3 py-2.5 text-right">구성비</th><th className="px-3 py-2.5 text-right">기준비</th><th className="px-4 py-2.5 text-right">입지계수</th></tr></thead>
          <tbody>{rows.map((row) => <tr key={`${row.scope}-${row.category_level}-${row.category_name}`} className="border-t border-[#333538] text-[14px] text-[#b8b9bc]"><td className="px-4 py-2.5 font-semibold text-[#d0d0d3]">{row.category_name}</td><td className="px-3 py-2.5 text-right tabular-nums">{formatNumber(row.store_count)}</td><td className="px-3 py-2.5 text-right tabular-nums">{display(row.share_pct)}%</td><td className="px-3 py-2.5 text-right tabular-nums">{display(row.base_share_pct)}%</td><td className={`${row.specialization_flag ? 'text-[#d1b27e]' : ''} px-4 py-2.5 text-right font-bold tabular-nums`}>{Number(row.location_quotient || 0).toFixed(2)}{row.specialization_flag && <span className="ml-1">· 특화</span>}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

function SpecializationTable({ rows, activeSubarea, onFocusSubarea }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#35373a] bg-[#242527]">
      <div className="flex min-h-[46px] items-center justify-between gap-3 border-b border-[#35373a] px-4">
        <p className="text-[16px] font-bold text-[#d6d6d8]">권역별 상대 특화</p>
        <p className="text-[14px] text-[#74767b]">입지계수 1.5 이상 · 점포 5개 이상</p>
      </div>
      <div className="max-h-[500px] overflow-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead className="sticky top-0 bg-[#292a2c] text-[14px] text-[#86888d]"><tr><th className="px-4 py-2.5">세부권역</th><th className="px-4 py-2.5">특화 세부업종</th><th className="px-3 py-2.5 text-right">점포</th><th className="px-4 py-2.5 text-right">입지계수</th></tr></thead>
          <tbody>{rows.map((row) => {
            const active = activeSubarea === row.scope;
            return (
              <tr key={`${row.scope}-${row.category_name}`} className={`${active ? 'bg-[#2b3338]' : ''} border-t border-[#333538] text-[14px] text-[#b8b9bc]`}>
                <td className="px-4 py-2.5"><button type="button" onClick={() => onFocusSubarea(row.scope)} className={`${active ? 'border-[#7397b1] bg-[#2d3b46] text-[#bad7ea]' : 'border-[#45484c] bg-[#292a2c] text-[#aeb0b4] hover:border-[#607b8f] hover:text-white'} inline-flex min-h-8 items-center gap-2 rounded-[7px] border px-2.5 text-left text-[14px] font-bold`}><i className="h-2.5 w-2.5 rounded-full" style={{ background: SUBAREA_COLORS[row.scope] || '#818b87' }} />{row.scope}</button></td>
                <td className="px-4 py-2.5 font-semibold text-[#d0d0d3]">{row.category_name}</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{formatNumber(row.store_count)}</td>
                <td className="px-4 py-2.5 text-right font-bold tabular-nums text-[#d1b27e]">{Number(row.location_quotient || 0).toFixed(2)}</td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </div>
  );
}

function ProgramsPanel({ programs, focusProgramId }) {
  const groups = useMemo(() => {
    const ordered = PROGRAM_GROUP_ORDER.map((group) => ({ group, rows: programs.filter((program) => program.group === group) }));
    const extras = unique(programs.map((program) => program.group).filter((group) => !PROGRAM_GROUP_ORDER.includes(group)))
      .map((group) => ({ group, rows: programs.filter((program) => program.group === group) }));
    return [...ordered, ...extras].filter(({ rows }) => rows.length);
  }, [programs]);

  return (
    <section className="rounded-[10px] border border-[#35373a] bg-[#222325]">
      <header className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#35373a] px-4">
        <div><p className="text-[14px] font-bold tracking-[0.12em] text-[#7b99af]">PROGRAM OPERATIONS</p><h3 className="text-[17px] font-bold text-[#d9d9db]">행사·문화·상권·공간운영 기록</h3></div>
        <span className="rounded-full border border-[#43515c] bg-[#28323a] px-2.5 py-1 text-[14px] font-bold text-[#a9c8df]">{programs.length}건 전체</span>
      </header>
      <div className="space-y-4 p-4">{groups.map(({ group, rows }) => (
        <section key={group} className="overflow-hidden rounded-[9px] border border-[#37393c]">
          <header className="flex min-h-[46px] items-center justify-between gap-3 border-b border-[#37393c] bg-[#28292b] px-4"><h4 className="text-[15px] font-bold text-[#d5d6d8]">{group}</h4><span className="rounded-full border border-[#454b50] bg-[#2b3034] px-2.5 py-1 text-[14px] font-bold text-[#9eb8ca]">{rows.length}건</span></header>
          <div className="grid grid-cols-1 gap-px bg-[#343638] min-[700px]:grid-cols-2 min-[981px]:grid-cols-3">
            {rows.map((program) => {
              const programId = program.program_id || program.id;
              const highlighted = focusProgramId === programId;
              return (
                <article id={`program-record-${program.program_id || program.id}`} key={programId} tabIndex={-1} className={`${highlighted ? 'relative z-[1] bg-[#303a41] ring-2 ring-inset ring-[#78a5c4]' : 'bg-[#242527]'} min-h-[220px] p-4 outline-none transition-[background-color,box-shadow] duration-300`}>
                  <div className="flex items-start justify-between gap-3"><span className="rounded-[6px] border border-[#4c463a] bg-[#302c24] px-2 py-1 text-[14px] font-bold text-[#c3aa7f]">{display(program.program_type || program.type)}</span><span className="text-[14px] tabular-nums text-[#77797d]">{formatDate(program.start_date || program.date)}</span></div>
                  <h5 className="mt-3 text-[16px] font-bold leading-5 text-[#dedee0]">{program.title}</h5>
                  <p className="mt-2 text-[14px] leading-[18px] text-[#9b9ca1]">{display(program.content_and_scale || program.summary)}</p>
                  <dl className="mt-3 space-y-1.5 text-[14px] leading-[17px] text-[#85878c]"><div className="flex gap-2"><dt className="shrink-0 font-bold">운영</dt><dd>{display(program.operator || program.organization)}</dd></div><div className="flex gap-2"><dt className="shrink-0 font-bold">장소</dt><dd>{display(program.place_name || program.place)}</dd></div><div className="flex gap-2"><dt className="shrink-0 font-bold">규모</dt><dd>{display(program.visitor_or_participant_note || program.scale)}</dd></div></dl>
                  <div className="mt-4">{sourceLink(program.source_url, '근거 원문')}</div>
                </article>
              );
            })}
          </div>
        </section>
      ))}</div>
    </section>
  );
}

export function MarketActivitiesWorkspace({ marketData, stores = [], boundaryData, integratedData, focusProgramId = '' }) {
  const retailStatistics = rowsOf(marketData, 'retail_statistics');
  const marketPrograms = rowsOf(marketData, 'program_operations');
  const programs = marketPrograms.length ? marketPrograms : rowsOf(integratedData, 'activity_markers');
  const displayAudit = objectOf(marketData, 'store_display_audit');
  const availableStores = Array.isArray(stores) ? stores : rowsOf(stores, 'stores');

  const [boundaryMode, setBoundaryMode] = useState('east');
  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');
  const [category3, setCategory3] = useState('');
  const [query, setQuery] = useState('');
  const [includeOutside, setIncludeOutside] = useState(false);
  const [statLevel, setStatLevel] = useState('대분류');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [tableDialog, setTableDialog] = useState(null);
  const [activeSubarea, setActiveSubarea] = useState('');

  useEffect(() => {
    if (!focusProgramId) return undefined;
    const timer = window.setTimeout(() => {
      const target = document.getElementById(`program-record-${focusProgramId}`);
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target?.focus({ preventScroll: true });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [focusProgramId]);

  const boundaryStores = useMemo(() => availableStores.filter((store) => includeOutside || storeInBoundary(store, boundaryMode)), [availableStores, boundaryMode, includeOutside]);
  const category1Options = useMemo(() => unique(boundaryStores.map((store) => store.category1)), [boundaryStores]);
  const category2Options = useMemo(() => unique(boundaryStores.filter((store) => !category1 || store.category1 === category1).map((store) => store.category2)), [boundaryStores, category1]);
  const category3Options = useMemo(() => unique(boundaryStores.filter((store) => (!category1 || store.category1 === category1) && (!category2 || store.category2 === category2)).map((store) => store.category3)), [boundaryStores, category1, category2]);

  const filteredStores = useMemo(() => {
    const needle = normalize(query);
    return boundaryStores.filter((store) => {
      if (category1 && store.category1 !== category1) return false;
      if (category2 && store.category2 !== category2) return false;
      if (category3 && store.category3 !== category3) return false;
      if (!needle) return true;
      return normalize(`${store.name} ${store.address} ${store.category1} ${store.category2} ${store.category3} ${store.nearest}`).includes(needle);
    });
  }, [boundaryStores, category1, category2, category3, query]);

  const locationCount = useMemo(() => new Set(filteredStores.filter((store) => Number.isFinite(Number(store.lon)) && Number.isFinite(Number(store.lat))).map((store) => `${Number(store.lon).toFixed(7)}:${Number(store.lat).toFixed(7)}`)).size, [filteredStores]);
  const topCategory = useMemo(() => {
    const counts = new Map();
    filteredStores.forEach((store) => counts.set(store.category1, (counts.get(store.category1) || 0) + 1));
    return [...counts.entries()].sort((left, right) => right[1] - left[1])[0];
  }, [filteredStores]);
  const reviewCount = useMemo(() => filteredStores.filter((store) => store.restriction || store.promotion).length, [filteredStores]);

  const statRows = useMemo(() => retailStatistics
    .filter((row) => row.scope === boundaryScope(boundaryMode) && row.category_level === statLevel)
    .sort((a, b) => Number(b.store_count) - Number(a.store_count))
    .slice(0, 30), [retailStatistics, boundaryMode, statLevel]);
  const specializationRows = useMemo(() => retailStatistics
    .filter((row) => ['공통 핵심권', '북촌 추가권', '대안 3 북측 확장권'].includes(row.scope) && row.category_level === '소분류' && row.specialization_flag)
    .sort((a, b) => Number(b.location_quotient) - Number(a.location_quotient))
    .slice(0, 30), [retailStatistics]);

  const boundaryLabels = [
    { id: 'compact', label: '대안 1', count: displayAudit.compact_store_count },
    { id: 'bukchon', label: '대안 2', count: displayAudit.bukchon_store_count },
    { id: 'east', label: '대안 3', count: displayAudit.east_store_count },
    { id: 'all', label: '전체 수집범위', count: displayAudit.total_store_count || availableStores.length },
  ];

  const dialogStores = tableDialog?.type === 'group' ? tableDialog.group.stores : filteredStores;
  const dialogTitle = tableDialog?.type === 'group' ? `좌표 묶음 점포 ${formatNumber(dialogStores.length)}개` : `현재 필터 점포 ${formatNumber(dialogStores.length)}개`;
  const focusSubarea = (name, scroll = true) => {
    setActiveSubarea(name);
    if (scroll) window.setTimeout(() => document.getElementById('songhyeon-market-map')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
  };

  return (
    <div data-market-activities-workspace className="h-full min-h-0 overflow-y-auto bg-[#1f2021] text-[#d6d6d8]" style={{ containerType: 'inline-size' }}>
      <style>{`
        @container (min-width: 1180px) {
          [data-market-activities-workspace] .market-primary-grid {
            grid-template-columns: 280px minmax(540px, 1fr) 300px;
          }
          [data-market-activities-workspace] .market-summary-panel {
            grid-column: auto;
          }
        }
      `}</style>
      <div className="market-primary-grid grid min-h-[620px] grid-cols-1 border-b border-[#35373a] min-[700px]:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="border-r border-[#35373a] bg-[#232426]">
          <div className="flex min-h-[54px] items-center gap-2 border-b border-[#35373a] px-4"><ListFilter size={16} className="text-[#83a4bb]" /><div><p className="text-[14px] font-bold tracking-[0.12em] text-[#7395ae]">MARKET FILTER</p><h2 className="text-[16px] font-bold text-[#dadadc]">상권 조회조건</h2></div></div>
          <div className="space-y-4 p-4">
            <fieldset><legend className="mb-2 text-[14px] font-bold text-[#85878c]">운영경계</legend><div className="space-y-1.5">{boundaryLabels.map((item) => <button key={item.id} type="button" onClick={() => { setBoundaryMode(item.id); setCategory1(''); setCategory2(''); setCategory3(''); setSelectedGroup(null); }} className={`${boundaryMode === item.id ? 'border-[#607f96] bg-[#29343c] text-[#b2d0e4]' : 'border-[#35373a] bg-[#262729] text-[#a3a4a8] hover:bg-[#2b2c2e]'} flex min-h-9 w-full items-center justify-between gap-2 rounded-[8px] border px-3 text-left text-[14px] font-bold`}><span>{item.label}</span><span className="tabular-nums text-[#77797d]">{formatNumber(item.count)}</span></button>)}</div></fieldset>
            <div className="border-t border-[#35373a] pt-4"><SelectField label="대분류" value={category1} onChange={(value) => { setCategory1(value); setCategory2(''); setCategory3(''); }} options={category1Options} /></div>
            <SelectField label="중분류" value={category2} onChange={(value) => { setCategory2(value); setCategory3(''); }} options={category2Options} />
            <SelectField label="소분류" value={category3} onChange={setCategory3} options={category3Options} />
            <label className="block"><span className="mb-1.5 block text-[14px] font-bold text-[#85878c]">점포 검색</span><span className="relative block"><Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#686a6e]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="점포명·주소 검색" className="h-9 w-full rounded-[8px] border border-[#3b3d40] bg-[#202123] pl-9 pr-3 text-[15px] text-[#d6d6d8] outline-none placeholder:text-[#626468] focus:border-[#6e8ca3]" /></span></label>
            <label className="flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-[8px] border border-[#383a3d] bg-[#262729] px-3"><span className="text-[14px] font-bold text-[#a3a4a8]">선택 경계 밖 점포도 표시</span><input type="checkbox" checked={includeOutside} onChange={(event) => setIncludeOutside(event.target.checked)} className="h-4 w-4 accent-[#779bbc]" /></label>
            <button type="button" onClick={() => { setCategory1(''); setCategory2(''); setCategory3(''); setQuery(''); setIncludeOutside(false); }} className="min-h-9 w-full rounded-[8px] border border-[#3b3d40] text-[14px] font-bold text-[#94969a] hover:bg-[#2b2c2e]">필터 초기화</button>
          </div>
        </aside>

        <main className="min-h-0 bg-[#202224]"><StoreMap stores={filteredStores} boundaryMode={boundaryMode} boundaryData={boundaryData} selectedGroup={selectedGroup} onSelectGroup={(group) => { setSelectedGroup(group); setTableDialog({ type: 'group', group }); }} activeSubarea={activeSubarea} onSelectSubarea={(name) => focusSubarea(name, false)} /></main>

        <aside className="market-summary-panel border-l border-[#35373a] bg-[#232426] min-[700px]:col-span-2">
          <div className="flex min-h-[54px] items-center gap-2 border-b border-[#35373a] px-4"><LocateFixed size={16} className="text-[#83a4bb]" /><div><p className="text-[14px] font-bold tracking-[0.12em] text-[#7395ae]">CURRENT SCOPE</p><h2 className="text-[16px] font-bold text-[#dadadc]">현재 필터 요약</h2></div></div>
          <div className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-2"><Metric label="표시 점포" value={`${formatNumber(filteredStores.length)}개`} accent /><Metric label="지도 위치" value={`${formatNumber(locationCount)}곳`} /><Metric label="가장 많은 대분류" value={topCategory ? `${topCategory[0]} ${formatNumber(topCategory[1])}개` : '-'} /><Metric label="규제·협업 검토" value={`${formatNumber(reviewCount)}개`} /></div>
            <div className="rounded-[9px] border border-[#35373a] bg-[#252628] p-3"><p className="text-[14px] font-bold text-[#85878c]">적용 조건</p><p className="mt-2 text-[15px] leading-[19px] text-[#c2c3c6]">{boundaryLabels.find((item) => item.id === boundaryMode)?.label}</p><p className="mt-1 text-[14px] leading-[18px] text-[#77797d]">{[category1, category2, category3].filter(Boolean).join(' › ') || '업종 전체'}{query ? ` · “${query}”` : ''}</p></div>
            <button type="button" onClick={() => setTableDialog({ type: 'filter' })} className="flex min-h-10 w-full items-center justify-center gap-2 rounded-[8px] border border-[#506879] bg-[#29343c] text-[15px] font-bold text-[#b2d0e4] hover:bg-[#30404b]"><Table2 size={15} /> 점포 상세표 · {formatNumber(filteredStores.length)}건</button>
            <div className="rounded-[9px] border border-[#3a3c3f] bg-[#262729] p-3"><div className="flex items-center gap-2"><Database size={14} className="text-[#8ba7ba]" /><p className="text-[14px] font-bold text-[#a8aaae]">데이터 보존 상태</p></div><p className="mt-2 text-[14px] leading-[18px] text-[#7f8185]">수집 점포 {formatNumber(availableStores.length)}건을 삭제·요약하지 않고 유지합니다. 지도는 좌표 묶음으로 렌더링하고 표에서 모든 행을 조회합니다.</p></div>
          </div>
        </aside>
      </div>

      <section className="space-y-4 p-4">
        <div className="rounded-[10px] border border-[#35373a] bg-[#222325]">
          <header className="flex min-h-[52px] flex-wrap items-center justify-between gap-3 border-b border-[#35373a] px-4"><div><p className="text-[14px] font-bold tracking-[0.12em] text-[#7b99af]">RETAIL STATISTICS</p><h3 className="text-[17px] font-bold text-[#d9d9db]">업종 구성 · 권역별 상대 특화</h3></div><div className="flex items-center gap-1 rounded-[8px] border border-[#3a3c3f] bg-[#202123] p-1">{['대분류', '중분류', '소분류'].map((level) => <button key={level} type="button" onClick={() => setStatLevel(level)} className={`${statLevel === level ? 'bg-[#31404b] text-[#b7d2e5]' : 'text-[#85878c] hover:text-[#c8c9cc]'} min-h-8 rounded-[6px] px-3 text-[14px] font-bold`}>{level}</button>)}</div></header>
          <div className="grid gap-4 p-4 min-[981px]:grid-cols-2"><StatisticsTable title={`${boundaryScope(boundaryMode)} ${statLevel} 구성`} rows={statRows} /><SpecializationTable rows={specializationRows} activeSubarea={activeSubarea} onFocusSubarea={focusSubarea} /></div>
          <p className="border-t border-[#35373a] px-4 py-3 text-[14px] leading-[18px] text-[#77797d]">{retailStatistics[0]?.method_note || '입지계수는 해당 권역 구성비를 비교 기준 권역의 동일 업종 구성비로 나눈 값입니다.'}</p>
        </div>
        <ProgramsPanel programs={programs} focusProgramId={focusProgramId} />
      </section>

      {tableDialog && <StoreTableDialog key={`${tableDialog.type}-${tableDialog.group?.id || 'filter'}`} stores={dialogStores} title={dialogTitle} onClose={() => setTableDialog(null)} />}
    </div>
  );
}

function PlanAccordion({ plan, open, onToggle, onMap, highlighted = false }) {
  return (
    <article id={`plan-record-${plan.id}`} tabIndex={-1} className={`${highlighted ? 'border-[#78a5c4] bg-[#2d373e] ring-1 ring-[#78a5c4]' : 'border-[#383a3d] bg-[#252628]'} overflow-hidden rounded-[9px] border outline-none transition-[background-color,border-color,box-shadow] duration-300`}>
      <button type="button" onClick={onToggle} className="flex w-full items-start justify-between gap-3 p-3 text-left hover:bg-[#292a2c]">
        <div className="min-w-0"><div className="flex max-w-full flex-wrap items-start gap-2"><span className="max-w-full break-words rounded-[5px] border border-[#474b54] bg-[#2b2d33] px-2 py-1 text-[14px] font-bold leading-[17px] text-[#a8aec0]">{display(plan.type)}</span></div><h4 className="mt-2 text-[16px] font-bold leading-5 text-[#d8d8da]">{plan.title}</h4><p className="mt-1 text-[14px] leading-[18px] text-[#7e8084]">{display(plan.scope)}</p></div>
        {open ? <ChevronDown size={17} className="mt-1 shrink-0 text-[#96989c]" /> : <ChevronRight size={17} className="mt-1 shrink-0 text-[#77797d]" />}
      </button>
      {open && <div className="border-t border-[#383a3d] p-4"><dl className="grid grid-cols-1 gap-x-5 gap-y-4 min-[700px]:grid-cols-2"><Field label="공간범위" wide>{display(plan.scope)}</Field><Field label="시행일">{display(plan.effective_from)}</Field><Field label="상태">{display(plan.status)}</Field><Field label="적용 후보">{display(plan.candidate_relevance)}</Field><Field label="확인일">{formatDate(plan.checked_at)}</Field><Field label="핵심 내용" wide>{plan.content}</Field><Field label="송현 영향" wide>{plan.impact}</Field><Field label="추가 확인" wide>{plan.open_issue}</Field></dl><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => onMap(plan)} className="inline-flex min-h-8 items-center gap-1.5 rounded-[7px] border border-[#506879] bg-[#29343c] px-2.5 py-1.5 text-[14px] font-bold text-[#b2d0e4]"><MapPin size={13} /> 관련 공간 지도</button>{sourceLink(plan.source_url)}</div></div>}
    </article>
  );
}

function OrganizationAccordion({ organization, open, onToggle }) {
  return (
    <article className="overflow-hidden rounded-[9px] border border-[#383a3d] bg-[#252628]">
      <button type="button" onClick={onToggle} className="flex w-full items-start justify-between gap-3 p-3 text-left hover:bg-[#292a2c]">
        <div className="min-w-0"><div className="flex items-center gap-2"><Users size={15} className="shrink-0 text-[#9d8dad]" /><span className="text-[14px] text-[#85878c]">{display(organization.scope)}</span></div><h4 className="mt-2 text-[16px] font-bold leading-5 text-[#d8d8da]">{organization.name}</h4><p className="mt-1 text-[14px] leading-[18px] text-[#7e8084]">{display(organization.identity)}</p></div>{open ? <ChevronDown size={17} className="mt-1 shrink-0 text-[#96989c]" /> : <ChevronRight size={17} className="mt-1 shrink-0 text-[#77797d]" />}
      </button>
      {open && <div className="border-t border-[#383a3d] p-4"><dl className="grid grid-cols-1 gap-x-5 gap-y-4 min-[700px]:grid-cols-2"><Field label="확인 역할" wide>{organization.identity}</Field><Field label="연결 가능성" wide>{organization.relevance}</Field><Field label="활동 요약" wide>{organization.activity_summary}</Field><Field label="확인일">{formatDate(organization.checked_at)}</Field><Field label="근거">{sourceLink(organization.source_url)}</Field></dl><div className="mt-4 border-t border-[#36383b] pt-4"><p className="text-[14px] font-bold text-[#8e9095]">확인된 활동 {organization.activities?.length || 0}건</p><div className="mt-2 space-y-2">{(organization.activities || []).map((activity, index) => <div key={`${activity.title}-${activity.date}-${index}`} className="rounded-[8px] border border-[#343638] bg-[#222325] p-3"><div className="flex items-start justify-between gap-3"><p className="text-[15px] font-bold leading-[18px] text-[#cfd0d2]">{activity.title}</p><span className="shrink-0 text-[14px] tabular-nums text-[#77797d]">{formatDate(activity.date)}</span></div><p className="mt-1.5 text-[14px] leading-[18px] text-[#8d8f93]">{activity.summary}</p><div className="mt-2">{sourceLink(activity.source_url, '활동 원문')}</div></div>)}</div></div></div>}
    </article>
  );
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

function spatialFeatureCount(value) {
  if (value?.type === 'Feature') return 1;
  return value?.features?.length || 0;
}

function RelatedSpaceDialog({
  plan,
  plans,
  planGeojson,
  boundaryData,
  programs,
  landmarks,
  publicSpaces,
  onFocusPlan,
  onOpenProgram,
  onClose,
}) {
  const boundaryGeojson = objectOf(boundaryData, 'boundary_geojson');
  const [visible, setVisible] = useState({
    district: true,
    songhyeon: true,
    dohwaseo: true,
    culture: true,
    boundaries: true,
    planReferences: true,
    programSeoul: true,
    programJongno: true,
    programCommunity: true,
  });
  const [basemap, setBasemap] = useState('voyager');
  const [selectedMapItem, setSelectedMapItem] = useState(null);
  const visiblePlanGeojson = useMemo(() => Object.fromEntries(
    Object.entries(planGeojson).filter(([id]) => visible[id]),
  ), [planGeojson, visible]);
  const planReferenceMarkers = useMemo(() => plans.map((item) => {
    const anchor = planAnchor(item, landmarks, publicSpaces);
    if (!anchor || !Number.isFinite(Number(anchor.lat)) || !Number.isFinite(Number(anchor.lon))) return null;
    return {
      ...item,
      key: item.id,
      label: item.title,
      lat: Number(anchor.lat),
      lon: Number(anchor.lon),
      color: '#6e5899',
      size: 7,
      kind: 'plan-reference',
      record: item,
      action: { label: '계획 상세 보기' },
    };
  }).filter(Boolean), [landmarks, plans, publicSpaces]);
  const locatedPrograms = useMemo(() => programs.filter(hasMapPoint), [programs]);
  const unlocatedPrograms = useMemo(() => programs.filter((program) => !hasMapPoint(program)), [programs]);
  const programMarkers = useMemo(() => locatedPrograms.map((program, index) => ({
    ...program,
    key: program.program_id || program.id || `program-${index}`,
    label: program.title,
    lat: Number(program.lat ?? program.latitude),
    lon: Number(program.lon ?? program.longitude),
    layerId: PROGRAM_LAYER_BY_GROUP[program.group] || 'programCommunity',
    color: '#a14d69',
    size: 7,
    kind: 'activity',
    record: program,
    action: { label: '활동 기록 보기' },
  })), [locatedPrograms]);
  const mapMarkers = useMemo(() => [
    ...(visible.planReferences ? planReferenceMarkers : []),
    ...programMarkers.filter((marker) => visible[marker.layerId]),
  ], [planReferenceMarkers, programMarkers, visible]);
  const layers = [
    { id: 'district', label: planGeojson.district?.dashboard_title || '인사동 지구단위계획', count: spatialFeatureCount(planGeojson.district) },
    { id: 'songhyeon', label: planGeojson.songhyeon?.dashboard_title || '송현동 특별계획구역', count: spatialFeatureCount(planGeojson.songhyeon) },
    { id: 'dohwaseo', label: planGeojson.dohwaseo?.dashboard_title || '도화서길 관리구역', count: spatialFeatureCount(planGeojson.dohwaseo) },
    { id: 'culture', label: planGeojson.culture?.dashboard_title || '문화지구', count: spatialFeatureCount(planGeojson.culture) },
    { id: 'boundaries', label: '운영경계 3안', count: boundaryGeojson.features?.length || 0 },
    { id: 'planReferences', label: '관련 위치로 확인하는 계획·규제', count: planReferenceMarkers.length },
    { id: 'programSeoul', label: '서울시·공공기관', count: programMarkers.filter((item) => item.layerId === 'programSeoul').length },
    { id: 'programJongno', label: '종로구', count: programMarkers.filter((item) => item.layerId === 'programJongno').length },
    { id: 'programCommunity', label: '지역단체·공동체', count: programMarkers.filter((item) => item.layerId === 'programCommunity').length },
  ];
  return (
    <ModalShell title={plan ? plan.title : '제도·공동체 관련 공간'} eyebrow="RELATED SPATIAL EVIDENCE" onClose={onClose} width="max-w-[1500px]">
      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto min-[700px]:grid-cols-[230px_minmax(0,1fr)] min-[700px]:grid-rows-[minmax(0,1fr)] min-[700px]:overflow-hidden min-[981px]:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="min-h-0 max-h-[38vh] overflow-y-auto border-b border-[#35373a] bg-[#232426] p-4 min-[700px]:max-h-none min-[700px]:border-b-0 min-[700px]:border-r">
          <div className="flex items-center gap-2"><Layers3 size={16} className="text-[#83a4bb]" /><h3 className="text-[16px] font-bold text-[#d2d2d5]">공간 레이어</h3></div>
          <div className="mt-4 space-y-2">{layers.map((layer) => <label key={layer.id} className={`${visible[layer.id] ? 'border-[#506070] bg-[#293139]' : 'border-[#383a3d] bg-[#252628]'} flex min-h-10 cursor-pointer items-center gap-2.5 rounded-[8px] border px-3`}><input type="checkbox" checked={visible[layer.id]} onChange={() => setVisible((value) => ({ ...value, [layer.id]: !value[layer.id] }))} className="h-4 w-4 accent-[#779bbc]" /><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: layer.id.startsWith('program') ? '#a14d69' : layer.id === 'planReferences' ? '#6e5899' : PLAN_LAYER_COLORS[layer.id] }} /><span className="min-w-0 flex-1 text-[14px] font-bold text-[#b7b8bc]">{layer.label}</span><span className="text-[14px] tabular-nums text-[#77797d]">{layer.count}</span></label>)}</div>
          <div className="mt-4 rounded-[9px] border border-[#3a3c3f] bg-[#262729] p-3">
            <p className="text-[14px] font-bold text-[#aeb0b4]">활동·운영 기록 {programs.length}건</p>
            <p className="mt-1 text-[14px] leading-[18px] text-[#85878c]">지도 위치 {locatedPrograms.length}건 · 위치 미확인 {unlocatedPrograms.length}건</p>
            {unlocatedPrograms.length > 0 && <ul className="mt-2 space-y-1 border-t border-[#37393c] pt-2 text-[14px] leading-[17px] text-[#8d8f93]">{unlocatedPrograms.map((program) => <li key={program.program_id || program.id}>· {program.title}</li>)}</ul>}
          </div>
          {plan && <div className="mt-4 rounded-[9px] border border-[#3a3c3f] bg-[#262729] p-3"><p className="text-[14px] font-bold text-[#85878c]">선택 기록</p><p className="mt-2 text-[15px] font-bold leading-[19px] text-[#d0d0d3]">{plan.title}</p><p className="mt-2 text-[14px] leading-[18px] text-[#85878c]">{plan.scope}</p><div className="mt-3">{sourceLink(plan.source_url)}</div></div>}
        </aside>
        <div className="relative h-full min-h-[320px] bg-[#202224] min-[700px]:min-h-0">
          <SonghyeonLeafletMap
            boundaryGeojson={boundaryGeojson}
            boundaryVisibility={{ compact_core: visible.boundaries, songhyeon_bukchon: visible.boundaries, insadong_east: visible.boundaries }}
            planGeojson={visiblePlanGeojson}
            showPlanAreas={Object.keys(visiblePlanGeojson).length > 0}
            markers={mapMarkers}
            selectedKey={selectedMapItem?.key || plan?.id}
            onSelect={setSelectedMapItem}
            onMarkerAction={(marker) => {
              if (marker.kind === 'activity') onOpenProgram(marker.program_id || marker.id);
              if (marker.kind === 'plan-reference') onFocusPlan(marker.id);
            }}
            basemap={basemap}
            fitVisible
            focusSelected
            focusZoom={16}
            className="h-full min-h-[320px] min-[700px]:min-h-0"
            ariaLabel="계획·규제 공간 원문, 관련 위치, 기관 활동 좌표 상세 지도"
          />
          <div className="absolute left-[56px] top-4 z-[1000]"><BasemapControl value={basemap} onChange={setBasemap} label="제도·공동체 배경지도" /></div>
          <div className="pointer-events-none absolute bottom-8 left-4 rounded-[8px] border border-white/10 bg-[#171819]/90 px-3 py-2 text-[14px] text-[#a0a1a5] shadow-lg backdrop-blur">실제 도로·건물·지명 배경지도 · 계획·규제 원문 공간데이터 · 관련 위치 · 활동 좌표 전체 표시</div>
        </div>
      </div>
    </ModalShell>
  );
}

export function InstitutionsCommunityWorkspace({ institutionData, boundaryData, integratedData, marketData, focusPlanId = '' }) {
  const navigate = useNavigate();
  const plans = rowsOf(institutionData, 'plans');
  const organizations = rowsOf(institutionData, 'organizations');
  const planGeojson = objectOf(institutionData, 'plan_geojson');
  const insights = rowsOf(institutionData, 'insights');
  const strategies = rowsOf(institutionData, 'strategies');
  const integratedPrograms = rowsOf(integratedData, 'activity_markers');
  const landmarks = rowsOf(integratedData, 'landmarks');
  const publicSpaces = rowsOf(integratedData, 'public_spaces');
  const programs = integratedPrograms.length ? integratedPrograms : rowsOf(marketData, 'program_operations');
  const [openPlans, setOpenPlans] = useState(() => new Set());
  const [openOrganizations, setOpenOrganizations] = useState(() => new Set());
  const [mapPlan, setMapPlan] = useState(null);

  useEffect(() => {
    if (!focusPlanId) return undefined;
    const timer = window.setTimeout(() => {
      setOpenPlans((current) => {
        if (current.has(focusPlanId)) return current;
        const next = new Set(current);
        next.add(focusPlanId);
        return next;
      });
      window.setTimeout(() => {
        const target = document.getElementById(`plan-record-${focusPlanId}`);
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target?.focus({ preventScroll: true });
      }, 0);
    }, 100);
    return () => window.clearTimeout(timer);
  }, [focusPlanId]);

  const planGroups = useMemo(() => {
    const grouped = new Map();
    plans.forEach((plan) => {
      const year = String(plan.effective_year || '연도 미상');
      if (!grouped.has(year)) grouped.set(year, []);
      grouped.get(year).push(plan);
    });
    return [...grouped.entries()].sort(([a], [b]) => {
      if (a === '연도 미상') return 1;
      if (b === '연도 미상') return -1;
      return Number(b) - Number(a);
    });
  }, [plans]);

  const organizationGroups = useMemo(() => ORG_GROUP_ORDER.map((group) => ({ group, rows: organizations.filter((organization) => organization.group === group) }))
    .concat(unique(organizations.map((organization) => organization.group).filter((group) => !ORG_GROUP_ORDER.includes(group))).map((group) => ({ group, rows: organizations.filter((organization) => organization.group === group) })))
    .filter((group) => group.rows.length), [organizations]);

  const toggleSet = (setter, id) => setter((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  return (
    <div data-institutions-community-workspace className="h-full min-h-0 overflow-y-auto bg-[#1f2021] p-4 text-[#d6d6d8]">
      <header className="mb-4 flex min-h-[56px] items-center rounded-[11px] border border-[#35373a] bg-[#232426] px-5">
        <h2 className="text-[20px] font-bold text-[#e1e1e3]">계획·제도와 기관·공동체 원문 기록</h2>
      </header>

      <div className="grid grid-cols-1 gap-4 min-[981px]:grid-cols-2">
        <section className="min-w-0 rounded-[11px] border border-[#35373a] bg-[#222325]">
          <header className="sticky top-0 z-10 flex min-h-[56px] items-center rounded-t-[11px] border-b border-[#35373a] bg-[#242527] px-4"><h3 className="text-[17px] font-bold text-[#d9d9db]">계획·제도 {plans.length}건</h3></header>
          <div className="space-y-5 p-4">{planGroups.map(([year, rows]) => <div key={year}><div className="mb-2 flex items-center gap-2"><span className="text-[16px] font-bold tabular-nums text-[#a8c4d7]">{year}</span><span className="h-px flex-1 bg-[#35373a]" /><span className="text-[14px] text-[#77797d]">{rows.length}건</span></div><div className="space-y-2">{rows.map((plan) => <PlanAccordion key={plan.id} plan={plan} open={openPlans.has(plan.id)} onToggle={() => toggleSet(setOpenPlans, plan.id)} onMap={setMapPlan} highlighted={focusPlanId === plan.id} />)}</div></div>)}</div>
        </section>

        <section className="min-w-0 rounded-[11px] border border-[#35373a] bg-[#222325]">
          <header className="sticky top-0 z-10 flex min-h-[56px] items-center rounded-t-[11px] border-b border-[#35373a] bg-[#242527] px-4"><h3 className="text-[17px] font-bold text-[#d9d9db]">공동체·활동 기록 · {organizations.length}곳</h3></header>
          <div className="space-y-5 p-4">{organizationGroups.map(({ group, rows }) => <div key={group}><div className="mb-2 flex items-center gap-2"><span className="text-[15px] font-bold text-[#b3a6be]">{group}</span><span className="h-px flex-1 bg-[#35373a]" /><span className="text-[14px] text-[#77797d]">{rows.length}곳</span></div><div className="space-y-2">{rows.map((organization) => <OrganizationAccordion key={organization.id} organization={organization} open={openOrganizations.has(organization.id)} onToggle={() => toggleSet(setOpenOrganizations, organization.id)} />)}</div></div>)}</div>
        </section>
      </div>

      <section className="mt-4 grid grid-cols-1 gap-4 min-[981px]:grid-cols-2">
        <div className="rounded-[11px] border border-[#35373a] bg-[#232426] p-4"><div className="flex items-center gap-2"><Info size={16} className="text-[#83a4bb]" /><h3 className="text-[16px] font-bold text-[#d4d4d6]">판단 인사이트 {insights.length}건</h3></div><div className="mt-3 space-y-2">{insights.map((insight) => <article key={insight.id} className="rounded-[8px] border border-[#37393c] bg-[#252628] p-3"><div className="flex items-start justify-between gap-3"><p className="text-[15px] font-bold leading-[19px] text-[#ced0d2]">{insight.title}</p><span className="shrink-0 rounded-[5px] border border-[#3f505c] bg-[#28323a] px-2 py-1 text-[14px] font-bold text-[#9dbdd3]">{insight.confidence}</span></div><p className="mt-2 whitespace-pre-line text-[14px] leading-[18px] text-[#898b8f]">{insight.text}</p></article>)}</div></div>
        <div className="rounded-[11px] border border-[#35373a] bg-[#232426] p-4"><div className="flex items-center gap-2"><Check size={16} className="text-[#91a78e]" /><h3 className="text-[16px] font-bold text-[#d4d4d6]">권역 전략 {strategies.length}건</h3></div><div className="mt-3 space-y-2">{strategies.map((strategy) => <article key={strategy.id} className="rounded-[8px] border border-[#37393c] bg-[#252628] p-3"><span className="rounded-[5px] border border-[#465144] bg-[#293029] px-2 py-1 text-[14px] font-bold text-[#a7bea4]">{strategy.type}</span><p className="mt-2 text-[15px] font-bold leading-[19px] text-[#ced0d2]">{strategy.title}</p><p className="mt-2 whitespace-pre-line text-[14px] leading-[18px] text-[#898b8f]">{strategy.text}</p></article>)}</div></div>
      </section>

      {mapPlan && <RelatedSpaceDialog plan={mapPlan} plans={plans} planGeojson={planGeojson} boundaryData={boundaryData} programs={programs} landmarks={landmarks} publicSpaces={publicSpaces} onFocusPlan={(id) => { setMapPlan(null); navigate(`/map-activities/institutions-community?plan=${encodeURIComponent(id)}`); }} onOpenProgram={(id) => { setMapPlan(null); navigate(`/map-activities/market-activities?program=${encodeURIComponent(id)}`); }} onClose={() => setMapPlan(null)} />}
    </div>
  );
}
