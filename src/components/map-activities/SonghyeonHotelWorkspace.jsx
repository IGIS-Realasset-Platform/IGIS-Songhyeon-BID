import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ExternalLink,
  Info,
  Search,
  Table2,
  X,
} from 'lucide-react';
import SonghyeonLeafletMap from './SonghyeonLeafletMap';

const nf = new Intl.NumberFormat('ko-KR');
const EMPTY_HOTELS = Object.freeze([]);

const HOTEL_TYPE_GUIDE = [
  ['호텔', '공식 호텔현황에 등재되었거나 원천 업종·상호에서 호텔 또는 리조트로 확인된 시설'],
  ['레지던스·서비스드 숙소', '가족호텔업 또는 레지던스·서비스드 아파트 운영형태가 확인된 시설'],
  ['여관·모텔', '원천 세부업종이나 상호에서 여관·모텔로 확인된 시설'],
  ['게스트하우스·호스텔', '상호에 게스트하우스 또는 호스텔 운영형태가 명시된 시설'],
  ['펜션·스테이', '원천 세부업종이 펜션이거나 상호에 펜션·스테이가 명시된 시설'],
  ['고시원·기숙사', '고시원·고시텔·원룸텔·리빙텔·기숙사로 확인된 장기체류형 시설'],
  ['기타 숙박', '위 유형을 확정할 정보가 부족한 숙박 사업체'],
];

const HOTEL_TYPE_COLORS = {
  호텔: '#315f91',
  '레지던스·서비스드 숙소': '#7d4f8e',
  '여관·모텔': '#bd4f39',
  '게스트하우스·호스텔': '#2e7566',
  '펜션·스테이': '#a86820',
  '고시원·기숙사': '#69736e',
  '기타 숙박': '#8a918d',
};

const HOTEL_GRADE_ORDER = ['5성', '4성', '3성', '2성', '1성', '성급 미확인'];
const HOTEL_GRADE_COLORS = {
  '5성': '#b07a14',
  '4성': '#7d4f8e',
  '3성': '#315f91',
  '2성': '#2e7566',
  '1성': '#69736e',
  '성급 미확인': '#ffffff',
};

const BOUNDARY_OPTIONS = [
  ['compact', '대안 1'],
  ['bukchon', '대안 2'],
  ['east', '대안 3'],
  ['all', '전체 수집범위'],
];

const BOUNDARY_VISIBILITY = {
  compact: { compact_core: true, songhyeon_bukchon: false, insadong_east: false },
  bukchon: { compact_core: false, songhyeon_bukchon: true, insadong_east: false },
  east: { compact_core: false, songhyeon_bukchon: false, insadong_east: true },
  all: { compact_core: true, songhyeon_bukchon: true, insadong_east: true },
};

function hasCoordinate(item) {
  return item?.lat !== null && item?.lat !== undefined && item?.lat !== ''
    && item?.lon !== null && item?.lon !== undefined && item?.lon !== ''
    && Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lon));
}

function insideBoundary(item, boundary) {
  return boundary === 'all' || Boolean(item?.[boundary]);
}

function filterHotels(rows, state, ignoredFacet = '') {
  return rows.filter((item) => (
    insideBoundary(item, state.boundary)
    && (ignoredFacet === 'type' || state.type === 'all' || item.lodging_type === state.type)
    && (ignoredFacet === 'grade' || state.grade === 'all' || item.grade === state.grade)
    && (!state.query || `${item.name} ${item.operator_name} ${item.address} ${item.lodging_type} ${item.source_lodging_type}`.toLocaleLowerCase('ko').includes(state.query))
  ));
}

function groupByLocation(rows) {
  const groups = new Map();
  rows.forEach((item) => {
    if (!hasCoordinate(item)) return;
    const id = `${Number(item.lat).toFixed(7)}:${Number(item.lon).toFixed(7)}`;
    if (!groups.has(id)) groups.set(id, { id, lat: Number(item.lat), lon: Number(item.lon), rows: [] });
    groups.get(id).rows.push(item);
  });
  return [...groups.values()];
}

function aggregate(rows, key) {
  const total = rows.length || 1;
  const counts = new Map();
  rows.forEach((item) => {
    const label = item?.[key] || '미분류';
    counts.set(label, (counts.get(label) || 0) + 1);
  });
  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'ko'))
    .map(([label, count]) => ({ label, count, share: (count / total) * 100 }));
}

function orderedAggregate(rows, key, order) {
  const byLabel = new Map(aggregate(rows, key).map((item) => [item.label, item]));
  return order.map((label) => byLabel.get(label)).filter(Boolean);
}

function addPopupRow(list, label, value) {
  if (value === null || value === undefined || value === '') return;
  const row = document.createElement('div');
  row.className = 'songhyeon-map-popup__row';
  const term = document.createElement('dt');
  term.textContent = label;
  const description = document.createElement('dd');
  description.textContent = String(value);
  row.append(term, description);
  list.appendChild(row);
}

function addPopupLink(container, url, label) {
  if (!url) return;
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = label;
  link.className = 'font-bold text-[#9fc3df] underline underline-offset-2 hover:text-white';
  container.appendChild(link);
}

function hotelPopup(item) {
  const root = document.createElement('section');
  root.className = 'songhyeon-map-popup';
  const heading = document.createElement('h3');
  heading.textContent = item.name || '숙박시설명 미확인';
  root.appendChild(heading);
  const details = document.createElement('dl');
  addPopupRow(details, '숙박 유형', [item.lodging_type, item.lodging_style].filter(Boolean).join(' · '));
  addPopupRow(details, '주소', item.address || '주소 미확인');
  addPopupRow(details, '운영사·상호', item.operator_name);
  addPopupRow(details, '성급', item.grade_status === '공식 확인' ? item.grade : '공식 성급 미확인');
  if (item.grade_status === '공식 확인') {
    addPopupRow(details, '공식 시설명', item.official_hotel_name);
    addPopupRow(details, '공식 업종', item.official_business_type);
    addPopupRow(details, '등급 결정일', item.rating_decision_date);
    addPopupRow(details, '객실', item.room_count === null ? null : `${nf.format(item.room_count)}실`);
  }
  root.appendChild(details);
  if (item.grade_source_url || item.homepage) {
    const actions = document.createElement('div');
    actions.className = 'songhyeon-map-popup__actions gap-3';
    addPopupLink(actions, item.grade_source_url, '성급 원문');
    addPopupLink(actions, item.homepage, '호텔 홈페이지');
    root.appendChild(actions);
  }
  return root;
}

function hotelGroupPopup(group, onOpen) {
  const root = document.createElement('section');
  root.className = 'songhyeon-map-popup';
  const heading = document.createElement('h3');
  heading.textContent = `이 위치의 숙박시설 ${nf.format(group.rows.length)}개`;
  root.appendChild(heading);
  const address = document.createElement('p');
  address.className = 'songhyeon-map-popup__meta';
  address.textContent = group.rows[0]?.address || '주소 미확인';
  root.appendChild(address);
  const list = document.createElement('ol');
  list.className = 'songhyeon-map-popup__records';
  group.rows.forEach((item) => {
    const row = document.createElement('li');
    row.textContent = `${item.name} · ${item.lodging_type} · ${item.grade}`;
    list.appendChild(row);
  });
  root.appendChild(list);
  const actions = document.createElement('div');
  actions.className = 'songhyeon-map-popup__actions';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'songhyeon-map-popup__action';
  button.textContent = '전체 시설 보기';
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    onOpen(group.rows, `${group.rows[0]?.address || '주소 미확인'} · ${nf.format(group.rows.length)}개 숙박시설`);
  });
  actions.appendChild(button);
  root.appendChild(actions);
  return root;
}

function WorkspaceButton({ children, primary = false, ...props }) {
  return (
    <button
      type="button"
      className={`${primary ? 'border-[#557895] bg-[#30495d] text-[#d8e7f1] hover:bg-[#395970]' : 'border-[#44474a] bg-[#292b2d] text-[#c5c6ca] hover:bg-[#34373a]'} inline-flex min-h-9 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border px-3 text-[13px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#82a7c2]`}
      {...props}
    >
      {children}
    </button>
  );
}

function ModalShell({ title, subtitle, onClose, children, compact = false }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[3000] grid place-items-center bg-black/70 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-label={title} className={`${compact ? 'max-w-[820px]' : 'max-w-[1500px]'} flex max-h-[calc(100vh-32px)] w-full flex-col overflow-hidden rounded-[14px] border border-[#45484c] bg-[#222426] shadow-2xl`}>
        <header className="flex min-h-[62px] shrink-0 items-center justify-between gap-4 border-b border-[#3b3e42] px-5 py-3">
          <div className="min-w-0">
            <h2 className="text-[19px] font-bold text-[#f0f0f2]">{title}</h2>
            {subtitle && <p className="mt-1 text-[13px] text-[#8f9196]">{subtitle}</p>}
          </div>
          <button type="button" onClick={onClose} aria-label="닫기" className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border border-[#404348] text-[#a5a7ac] hover:bg-[#303337] hover:text-white"><X size={20} /></button>
        </header>
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </section>
    </div>
  );
}

function TypeGuideModal({ onClose }) {
  return (
    <ModalShell title="숙박 유형 구분" onClose={onClose} compact>
      <div className="p-5">
        <p className="text-[14px] leading-6 text-[#aeb0b5]">한 시설은 아래 7개 유형 중 하나에만 포함합니다. 공식 성급과 한옥형·독채형 같은 공간 특성은 숙박 유형과 별도로 관리합니다.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
          {HOTEL_TYPE_GUIDE.map(([type, description]) => (
            <article key={type} className="rounded-[9px] border border-[#3b3e42] bg-[#282a2c] p-4">
              <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#e0e1e4]"><i className="h-3 w-3 shrink-0 rounded-full" style={{ background: HOTEL_TYPE_COLORS[type] }} />{type}</h3>
              <p className="mt-2 text-[13px] leading-5 text-[#9b9da2]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </ModalShell>
  );
}

function HotelDetailTable({ rows, subtitle, onClose }) {
  return (
    <ModalShell title="숙박 상세표" subtitle={subtitle} onClose={onClose}>
      <table className="w-full min-w-[1280px] border-collapse text-left text-[13px]">
        <thead className="sticky top-0 z-[1] bg-[#292b2d] text-[#a3a5aa]">
          <tr>{['숙박시설', '숙박 유형', '운영사·원천 상호', '성급', '주소', '세부권역', '공식 확인 내용'].map((label) => <th key={label} className="border-b border-[#45484c] px-4 py-3 font-bold">{label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((item) => (
            <tr key={item.facility_id} className="border-b border-[#36393d] align-top text-[#c2c4c8] hover:bg-[#292b2e]">
              <td className="px-4 py-3"><strong className="text-[14px] text-[#e0e1e4]">{item.name}</strong></td>
              <td className="px-4 py-3 leading-5">{item.lodging_type}{item.lodging_style && <span className="block text-[12px] text-[#85888d]">{item.lodging_style}</span>}</td>
              <td className="px-4 py-3">{item.operator_name || '—'}</td>
              <td className={`${item.grade_status === '공식 확인' ? 'font-bold text-[#d0aa62]' : 'text-[#96989d]'} px-4 py-3 whitespace-nowrap`}>{item.grade}</td>
              <td className="px-4 py-3 leading-5">{item.address}</td>
              <td className="px-4 py-3">{item.segment}</td>
              <td className="px-4 py-3 leading-5">
                {item.grade_status === '공식 확인' ? (
                  <>
                    <span>{item.official_business_type} · {item.rating_decision_date}</span>
                    <span className="block">객실 {item.room_count === null ? '—' : `${nf.format(item.room_count)}실`}</span>
                    {item.grade_source_url && <a href={item.grade_source_url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 font-bold text-[#9fc3df] hover:text-white">성급 원문 <ExternalLink size={12} /></a>}
                  </>
                ) : '성급 미확인'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ModalShell>
  );
}

function SummaryMetrics({ rows }) {
  const locations = groupByLocation(rows).length;
  const official = rows.filter((item) => item.grade_status === '공식 확인').length;
  const topType = aggregate(rows, 'lodging_type')[0];
  const items = [
    ['숙박시설', `${nf.format(rows.length)}개`],
    ['지도 위치', `${nf.format(locations)}곳`],
    ['공식 성급 확인', `${nf.format(official)}개`],
    ['가장 많은 유형', topType ? `${topType.label} ${nf.format(topType.count)}개` : '—'],
  ];
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-[9px] border border-[#3b3e42]">
      {items.map(([label, value], index) => (
        <div key={label} className={`${index % 2 === 0 ? 'border-r' : ''} ${index < 2 ? 'border-b' : ''} border-[#3b3e42] bg-[#26282a] p-3`}>
          <span className="block text-[12px] font-semibold text-[#7f8186]">{label}</span>
          <strong className="mt-1 block text-[14px] leading-5 text-[#d7d8db]">{value}</strong>
        </div>
      ))}
    </div>
  );
}

function AnalysisChart({ title, rows, activeValue, onSelect, colors }) {
  const maximum = Math.max(...rows.map((item) => item.count), 1);
  return (
    <section className="rounded-[12px] border border-[#373a3d] bg-[#232527] p-5">
      <h2 className="text-[18px] font-bold text-[#ececef]">{title}</h2>
      <div className="mt-4 grid gap-2">
        {rows.map((item) => (
          <button key={item.label} type="button" onClick={() => onSelect(item.label)} aria-pressed={activeValue === item.label} className={`${activeValue === item.label ? 'border-[#60798c] bg-[#2d353b]' : 'border-transparent hover:bg-[#292c2e]'} grid min-h-10 grid-cols-[minmax(170px,0.8fr)_minmax(180px,1.2fr)_90px] items-center gap-3 rounded-[8px] border px-3 py-2 text-left transition-colors`}>
            <span className="truncate text-[14px] font-semibold text-[#c8c9cd]">{item.label}</span>
            <span className="h-2.5 overflow-hidden rounded-full bg-[#34373a]"><i className="block h-full rounded-full" style={{ width: `${Math.max((item.count / maximum) * 100, 2)}%`, background: colors[item.label] || '#69736e' }} /></span>
            <span className="text-right text-[13px] tabular-nums text-[#96989d]">{nf.format(item.count)} · {item.share.toFixed(1)}%</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function HotelLegend({ typeRows, gradeRows, type, grade, onType, onGrade }) {
  return (
    <div className="absolute bottom-6 left-4 right-4 z-[1000] rounded-[9px] border border-white/10 bg-[#171819]/90 p-2.5 text-[12px] shadow-xl backdrop-blur">
      <div className="flex flex-wrap items-center gap-1.5"><strong className="mr-1 text-[#8e9095]">유형</strong>{typeRows.map((item) => <button key={item.label} type="button" onClick={() => onType(item.label)} className={`${type === item.label ? 'border-[#738797] bg-[#313a41] text-white' : 'border-transparent text-[#b7b9bd] hover:bg-[#292c2e]'} inline-flex min-h-7 items-center gap-1.5 rounded-[6px] border px-1.5`}><i className="h-2.5 w-2.5 rounded-full" style={{ background: HOTEL_TYPE_COLORS[item.label] }} />{item.label}</button>)}</div>
      <div className="mt-1 flex flex-wrap items-center gap-1.5"><strong className="mr-1 text-[#8e9095]">성급</strong>{gradeRows.map((item) => <button key={item.label} type="button" onClick={() => onGrade(item.label)} className={`${grade === item.label ? 'border-[#738797] bg-[#313a41] text-white' : 'border-transparent text-[#b7b9bd] hover:bg-[#292c2e]'} inline-flex min-h-7 items-center gap-1.5 rounded-[6px] border px-1.5`}><i className="h-2.5 w-2.5 rounded-full" style={{ background: item.label === '성급 미확인' ? '#232527' : HOTEL_GRADE_COLORS[item.label], border: `2px solid ${HOTEL_GRADE_COLORS[item.label] || '#69736e'}` }} />{item.label}</button>)}</div>
    </div>
  );
}

export default function SonghyeonHotelWorkspace({ hotelData, boundaryData }) {
  const hotels = hotelData?.datasets?.hotels || EMPTY_HOTELS;
  const [boundary, setBoundary] = useState('east');
  const [type, setType] = useState('all');
  const [grade, setGrade] = useState('all');
  const [query, setQuery] = useState('');
  const [basemap, setBasemap] = useState('voyager');
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);
  const [viewportTarget, setViewportTarget] = useState('boundary');
  const [modal, setModal] = useState(null);

  const state = useMemo(() => ({ boundary, type, grade, query: query.trim().toLocaleLowerCase('ko') }), [boundary, grade, query, type]);
  const filteredHotels = useMemo(() => filterHotels(hotels, state), [hotels, state]);
  const typeFacetRows = useMemo(() => filterHotels(hotels, state, 'type'), [hotels, state]);
  const gradeFacetRows = useMemo(() => filterHotels(hotels, state, 'grade'), [hotels, state]);
  const typeRows = useMemo(() => orderedAggregate(typeFacetRows, 'lodging_type', HOTEL_TYPE_GUIDE.map(([label]) => label)), [typeFacetRows]);
  const gradeRows = useMemo(() => orderedAggregate(gradeFacetRows, 'grade', HOTEL_GRADE_ORDER), [gradeFacetRows]);
  const sortedHotels = useMemo(() => [...filteredHotels].sort((left, right) => Number(right.grade_status === '공식 확인') - Number(left.grade_status === '공식 확인') || left.name.localeCompare(right.name, 'ko')), [filteredHotels]);
  const boundaryVisibility = useMemo(() => BOUNDARY_VISIBILITY[boundary], [boundary]);

  const openTable = useCallback((rows, subtitle) => {
    setModal({ type: 'table', rows, subtitle });
  }, []);

  const markers = useMemo(() => groupByLocation(filteredHotels).map((group) => {
    if (group.rows.length > 1) {
      return {
        key: `hotel-location-${group.id}`,
        selectionKeys: group.rows.map((item) => item.facility_id),
        facilityId: group.rows[0].facility_id,
        label: `같은 위치의 숙박시설 ${nf.format(group.rows.length)}개`,
        lat: group.lat,
        lon: group.lon,
        kind: 'hotel-group',
        color: '#69736e',
        size: 5.4,
        strokeColor: '#ffffff',
        strokeWeight: 1.2,
        facilities: group.rows,
        popupFactory: () => hotelGroupPopup(group, openTable),
      };
    }
    const item = group.rows[0];
    const official = item.grade_status === '공식 확인';
    return {
      key: item.facility_id,
      facilityId: item.facility_id,
      label: `${item.name} · ${item.lodging_type} · ${item.grade}`,
      lat: Number(item.lat),
      lon: Number(item.lon),
      kind: 'hotel',
      color: HOTEL_TYPE_COLORS[item.lodging_type] || HOTEL_TYPE_COLORS['기타 숙박'],
      size: official ? 6 : 4.8,
      strokeColor: official ? (HOTEL_GRADE_COLORS[item.grade] || '#69736e') : '#ffffff',
      strokeWeight: official ? 3 : 0.9,
      record: item,
      popupFactory: () => hotelPopup(item),
    };
  }), [filteredHotels, openTable]);

  const activeSelectedFacilityId = selectedFacilityId && filteredHotels.some((item) => item.facility_id === selectedFacilityId)
    ? selectedFacilityId
    : null;

  const setFacet = (kind, value) => {
    setViewportTarget('markers');
    if (kind === 'type') setType((current) => current === value ? 'all' : value);
    if (kind === 'grade') setGrade((current) => current === value ? 'all' : value);
  };

  const boundaryRows = useMemo(() => BOUNDARY_OPTIONS.slice(0, 3).map(([key, label]) => {
    const rows = hotels.filter((item) => item[key]);
    return {
      key,
      label,
      count: rows.length,
      locations: groupByLocation(rows).length,
      official: rows.filter((item) => item.grade_status === '공식 확인').length,
      types: aggregate(rows, 'lodging_type').map((item) => `${item.label} ${nf.format(item.count)}개`).join(' · '),
    };
  }), [hotels]);

  const selectionScope = [type !== 'all' ? type : '', grade !== 'all' ? grade : ''].filter(Boolean).join(' · ') || '전체';
  const boundaryGeojson = boundaryData?.boundary_geojson;

  return (
    <div data-hotel-workspace className="h-full overflow-y-auto overscroll-contain bg-[#1f1f1e]">
      <section data-hotel-primary-workspace className="grid h-[610px] min-h-[610px] grid-cols-[230px_minmax(0,1fr)_280px] overflow-hidden border-b border-[#373a3d] 2xl:grid-cols-[260px_minmax(0,1fr)_320px] max-[980px]:grid-cols-[220px_minmax(0,1fr)_240px] max-[700px]:h-auto max-[700px]:min-h-0 max-[700px]:grid-cols-1">
        <aside className="min-h-0 overflow-y-auto border-r border-[#373a3d] bg-[#232527] p-4">
          <div className="grid gap-2">
            <WorkspaceButton onClick={() => setModal({ type: 'guide' })}><Info size={15} />숙박 유형 안내</WorkspaceButton>
            <WorkspaceButton primary onClick={() => openTable(filteredHotels, `현재 필터 ${nf.format(filteredHotels.length)}개 숙박시설`)}><Table2 size={15} />숙박 상세표</WorkspaceButton>
          </div>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-1.5">
              <span className="text-[12px] font-bold text-[#85878c]">운영구역</span>
              <select value={boundary} onChange={(event) => { setBoundary(event.target.value); setViewportTarget('boundary'); }} className="h-10 w-full rounded-[8px] border border-[#44474a] bg-[#292b2d] px-3 text-[14px] font-semibold text-[#d1d2d5] outline-none focus:border-[#7299b7]">
                {BOUNDARY_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label className="grid gap-1.5">
              <span className="text-[12px] font-bold text-[#85878c]">숙박 유형</span>
              <select value={type} onChange={(event) => { setType(event.target.value); setViewportTarget('markers'); }} className="h-10 w-full rounded-[8px] border border-[#44474a] bg-[#292b2d] px-3 text-[14px] font-semibold text-[#d1d2d5] outline-none focus:border-[#7299b7]">
                <option value="all">전체 숙박 유형</option>
                {HOTEL_TYPE_GUIDE.map(([value]) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
            <label className="grid gap-1.5">
              <span className="text-[12px] font-bold text-[#85878c]">성급</span>
              <select value={grade} onChange={(event) => { setGrade(event.target.value); setViewportTarget('markers'); }} className="h-10 w-full rounded-[8px] border border-[#44474a] bg-[#292b2d] px-3 text-[14px] font-semibold text-[#d1d2d5] outline-none focus:border-[#7299b7]">
                <option value="all">전체 성급</option>
                {HOTEL_GRADE_ORDER.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
            <label className="grid gap-1.5">
              <span className="text-[12px] font-bold text-[#85878c]">시설 검색</span>
              <span className="relative"><Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#777a7f]" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="시설명·주소 검색" className="h-10 w-full rounded-[8px] border border-[#44474a] bg-[#292b2d] pl-9 pr-3 text-[14px] text-[#d1d2d5] outline-none placeholder:text-[#6f7277] focus:border-[#7299b7]" /></span>
            </label>
          </div>
          <div className="mt-4"><SummaryMetrics rows={filteredHotels} /></div>
          <p className="mt-4 text-[12px] leading-5 text-[#888a8f]">공식 성급 호텔은 시설명을 우선 표시하고, 원천의 운영사 상호는 별도 정보로 분리했습니다.</p>
        </aside>

        <div className="relative min-h-[610px] overflow-hidden border-r border-[#373a3d] bg-[#202326] max-[700px]:h-[480px] max-[700px]:min-h-[480px]">
          <SonghyeonLeafletMap
            boundaryGeojson={boundaryGeojson}
            boundaryVisibility={boundaryVisibility}
            markers={markers}
            selectedKey={activeSelectedFacilityId}
            onSelect={(marker) => setSelectedFacilityId(marker.facilityId || marker.selectionKeys?.[0] || marker.key)}
            basemap={basemap}
            fitVisible
            fitVisibleToMarkers={viewportTarget === 'markers'}
            fitVisibleMaxZoom={17}
            focusSelectedOnChange
            openSelectedOnChange
            focusZoom={17}
            className="h-full min-h-[610px] max-[700px]:min-h-[480px]"
            ariaLabel={`송현 권역 숙박시설 ${nf.format(filteredHotels.length)}개 상세 지도`}
          />
          <div className="absolute left-[56px] top-4 z-[1000]">
            <select aria-label="배경지도" value={basemap} onChange={(event) => setBasemap(event.target.value)} className="h-8 rounded-[7px] border border-[#44474a] bg-[#242628] px-2.5 text-[13px] font-bold text-[#c1c1c6] outline-none focus:border-[#7299b7]"><option value="voyager">Voyager</option><option value="positron">Positron</option></select>
          </div>
          <HotelLegend typeRows={typeRows} gradeRows={gradeRows} type={type} grade={grade} onType={(value) => setFacet('type', value)} onGrade={(value) => setFacet('grade', value)} />
        </div>

        <section className="flex min-h-0 flex-col overflow-hidden bg-[#232527] max-[700px]:h-[480px]">
          <div className="flex min-h-[58px] shrink-0 items-center border-b border-[#373a3d] px-4">
            <h2 className="text-[16px] font-bold text-[#e3e4e6]">{selectionScope} 숙박시설 <span className="text-[#8f9196]">{nf.format(filteredHotels.length)}개</span></h2>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {sortedHotels.length ? sortedHotels.map((item) => (
              <button key={item.facility_id} data-hotel-facility-id={item.facility_id} type="button" onClick={() => setSelectedFacilityId(item.facility_id)} className={`${activeSelectedFacilityId === item.facility_id ? 'bg-[#30383e]' : 'hover:bg-[#292c2e]'} grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 border-b border-[#35383b] px-4 py-3 text-left transition-colors`}>
                <strong className="min-w-0 text-[14px] leading-5 text-[#dedfe2]">{item.name}</strong>
                <span className="whitespace-nowrap text-[12px] text-[#92949a]">{item.lodging_type} · {item.grade}{item.lodging_style ? ` · ${item.lodging_style}` : ''}</span>
                <span className="col-span-2 text-[12px] leading-5 text-[#85878c]">{item.address}</span>
              </button>
            )) : <div className="grid min-h-[220px] place-items-center px-6 text-center text-[14px] text-[#86888d]">선택 조건에 해당하는 숙박시설이 없습니다.</div>}
          </div>
        </section>
      </section>

      <div data-hotel-analysis className="grid grid-cols-2 gap-4 p-4 max-[980px]:grid-cols-1">
        <AnalysisChart title="숙박 유형 구성" rows={typeRows} activeValue={type} onSelect={(value) => setFacet('type', value)} colors={HOTEL_TYPE_COLORS} />
        <AnalysisChart title="공식 성급 구성" rows={gradeRows} activeValue={grade} onSelect={(value) => setFacet('grade', value)} colors={HOTEL_GRADE_COLORS} />
      </div>

      <section data-hotel-boundary-distribution className="mx-4 mb-4 overflow-hidden rounded-[12px] border border-[#373a3d] bg-[#232527]">
        <div className="border-b border-[#373a3d] p-5"><h2 className="text-[18px] font-bold text-[#ececef]">운영구역별 숙박 분포</h2><p className="mt-1 text-[13px] text-[#8f9196]">대안 1 ⊂ 대안 2 ⊂ 대안 3의 누적 시설 수입니다.</p></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-[13px]">
            <thead className="bg-[#292b2d] text-[#97999e]"><tr>{['운영구역', '숙박시설', '지도 위치', '공식 성급 호텔', '숙박 유형 구성'].map((label) => <th key={label} className="border-b border-[#414448] px-4 py-3 font-bold">{label}</th>)}</tr></thead>
            <tbody>{boundaryRows.map((row) => <tr key={row.key} className="border-b border-[#35383b] last:border-b-0 text-[#bec0c4]"><td className="px-4 py-3 font-bold text-[#e0e1e4]">{row.label}</td><td className="px-4 py-3">{nf.format(row.count)}개</td><td className="px-4 py-3">{nf.format(row.locations)}곳</td><td className="px-4 py-3">{nf.format(row.official)}개</td><td className="px-4 py-3 leading-5">{row.types}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      {modal?.type === 'guide' && <TypeGuideModal onClose={() => setModal(null)} />}
      {modal?.type === 'table' && <HotelDetailTable rows={modal.rows} subtitle={modal.subtitle} onClose={() => setModal(null)} />}
    </div>
  );
}
