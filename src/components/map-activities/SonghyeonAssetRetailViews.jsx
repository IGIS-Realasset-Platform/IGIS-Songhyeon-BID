import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  Search,
  X,
} from 'lucide-react';
import SonghyeonLeafletMap from './SonghyeonLeafletMap';

const nf = new Intl.NumberFormat('ko-KR');
const ASSET_COLORS = {
  '쌈지길': '#789f91',
  '안녕인사동': '#7d91aa',
  '케이트윈타워': '#a08d72',
  '트윈트리타워': '#907e9c',
  '도화서길': '#74787d',
};
const ASSET_BOUNDARY_VISIBILITY = Object.freeze({
  compact_core: false,
  songhyeon_bukchon: false,
  insadong_east: true,
});

function MapBasemapSelect({ value, onChange }) {
  return (
    <select aria-label="배경지도" value={value} onChange={(event) => onChange(event.target.value)} className="h-8 rounded-[7px] border border-[#44474a] bg-[#242628] px-2.5 text-[14px] font-bold text-[#c1c1c6] outline-none focus:border-[#7299b7]">
      <option value="voyager">Voyager</option>
      <option value="positron">Positron</option>
    </select>
  );
}
function valueOrDash(value) {
  return value === null || value === undefined || value === '' ? '—' : String(value);
}

function formatArea(value) {
  return value === null || value === undefined || value === ''
    ? '—'
    : `${nf.format(Math.round(Number(value) * 10) / 10)}㎡`;
}

function formatPyeong(value) {
  return value === null || value === undefined || value === ''
    ? '—'
    : `${nf.format(Math.round(Number(value) * 10) / 10)}평`;
}

function displayFloor(value) {
  const floor = String(value || '');
  if (/^\d+$/.test(floor)) return `${floor}F`;
  if (floor === 'M') return 'MF';
  return floor || '층 미제공';
}

function floorWeight(value) {
  const floor = String(value || '');
  if (!floor) return -999;
  if (/^B/i.test(floor)) return -Number((floor.match(/\d+/) || [0])[0]);
  if (/^M/i.test(floor)) return 0.5;
  const numbers = floor.match(/\d+/g);
  return numbers ? Math.max(...numbers.map(Number)) : 0;
}

function orderedUnique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), 'ko'));
}

function useModalControls(open, onClose, initialFocusRef) {
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const focusTimer = window.setTimeout(() => initialFocusRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      previous?.focus?.();
    };
  }, [initialFocusRef, onClose, open]);
}

function AssetLocationPlot({ assets, markers, landmarks, boundaryData, onOpen }) {
  const [basemap, setBasemap] = useState('voyager');
  const assetById = useMemo(() => new Map(assets.map((asset) => [asset.id, asset])), [assets]);
  const mapMarkers = useMemo(() => [
    ...markers.map((marker, index) => ({
      ...marker,
      key: `${marker.asset_id || 'asset'}-${marker.name || index}`,
      label: marker.name,
      kind: 'asset',
      color: '#177c76',
      size: 10,
      record: marker,
    })),
    ...landmarks.map((marker, index) => ({
      ...marker,
      key: `landmark-${marker.id || index}`,
      label: marker.name,
      kind: 'landmark',
      color: '#9a7129',
      size: 8,
      record: marker,
    })),
  ], [landmarks, markers]);
  const boundaryGeojson = boundaryData?.datasets?.boundary_geojson || boundaryData?.boundary_geojson;
  return (
    <div data-asset-location-plot className="relative h-full min-h-[520px] overflow-hidden bg-[#202224]">
      <SonghyeonLeafletMap
        boundaryGeojson={boundaryGeojson}
        boundaryVisibility={ASSET_BOUNDARY_VISIBILITY}
        markers={mapMarkers}
        onSelect={(marker) => {
          if (marker.kind !== 'asset') return;
          const linkedAsset = assetById.get(marker.asset_id);
          if (linkedAsset) onOpen(linkedAsset);
        }}
        basemap={basemap}
        className="h-full min-h-[520px]"
        ariaLabel={`송현 권역 이지스 자산 ${markers.length}개 상세 지도`}
      />
      <div className="absolute left-[56px] top-4 z-[1000]"><MapBasemapSelect value={basemap} onChange={setBasemap} /></div>
      <div className="pointer-events-none absolute bottom-8 left-4 rounded-[9px] border border-white/10 bg-[#171819]/90 px-3 py-2 text-[14px] text-[#A1A1AA] shadow-lg backdrop-blur">
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#177c76]" />자산 위치 {markers.length}개 · 자산 기준정보 {assets.length}개</span>
        <span className="ml-3 inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#9a7129]" />핵심 랜드마크 {landmarks.length}개</span>
      </div>
      <div className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-2 rounded-[8px] border border-white/10 bg-[#171819]/90 px-3 py-2 text-[14px] font-bold text-[#A1A1AA] shadow-lg backdrop-blur">
        실제 도로·건물·지명 배경지도 · 확대·이동 가능
      </div>
    </div>
  );
}

function TenantChip({ asset, name, areaValue, areaLabel, industryFallback }) {
  const industry = asset.tenant_industries?.[name] || industryFallback || '업종 미확인';
  const place = asset.tenant_places?.[name];
  const verified = place?.status === 'verified_exact' && place?.url;
  const details = [
    `업종: ${industry}`,
    areaValue !== null && areaValue !== undefined && areaValue !== ''
      ? `${areaLabel || '임차인 면적'}: ${formatPyeong(areaValue)}`
      : '임차인별 면적: 원자료 미제공',
    verified ? `네이버 플레이스: ${place.place_name}` : '네이버 플레이스: 확인되지 않음',
    place?.note,
  ].filter(Boolean).join('\n');
  const classes = "inline-flex min-h-8 items-center rounded-[7px] border border-[#3a3d40] bg-[#292b2d] px-2.5 py-1.5 text-[14px] font-semibold leading-4 text-[#c8cbd0] outline-none transition-colors hover:border-[#637d91] hover:bg-[#2c3339] focus-visible:border-[#8fb4cf]";
  if (verified) {
    return (
      <a className={classes} href={place.url} target="_blank" rel="noreferrer" title={details} aria-label={`${name}. ${details.replaceAll('\n', '. ')}`}>
        {name || '공간'} <ExternalLink size={12} className="ml-1.5 shrink-0 text-[#83a9c5]" aria-hidden="true" />
      </a>
    );
  }
  return <span className={classes} tabIndex={0} title={details}>{name || '공간'}</span>;
}

function LayoutStacking({ asset }) {
  const layout = asset.stacking_layouts;
  return (
    <div data-stacking-layout className="space-y-4">
      {layout.source_label && <p className="rounded-[8px] border border-[#3a3c3f] bg-[#252729] px-3 py-2 text-[14px] leading-5 text-[#8c8f93]">출처 · {layout.source_label}</p>}
      <div className={`grid gap-3 ${layout.buildings.length > 1 ? 'xl:grid-cols-2' : 'grid-cols-1'}`}>
        {layout.buildings.map((building, buildingIndex) => (
          <section key={`${building.name}-${buildingIndex}`} className="overflow-hidden rounded-[10px] border border-[#3a3c3f] bg-[#222426]">
            <h3 className="border-b border-[#3a3c3f] bg-[#292b2d] px-3 py-2.5 text-[16px] font-bold text-[#e0e2e5]">{building.name}</h3>
            <div>
              {building.floors.map((row, floorIndex) => (
                <div key={`${row.floor}-${floorIndex}`} className="grid grid-cols-[72px_minmax(0,1fr)] border-b border-[#343638] last:border-b-0">
                  <div className="border-r border-[#343638] bg-[#252729] px-2 py-3 text-center">
                    <strong className="block text-[15px] text-[#aac1d2]">{displayFloor(row.floor)}</strong>
                    {(row.area_pyeong || row.gla_pyeong || row.nla_pyeong || row.store_count) && (
                      <span className="mt-1 block text-[14px] leading-4 text-[#74777b]">
                        {row.area_pyeong ? formatPyeong(row.area_pyeong) : ''}
                        {row.gla_pyeong ? `G ${formatPyeong(row.gla_pyeong)}` : ''}
                        {row.nla_pyeong ? ` · N ${formatPyeong(row.nla_pyeong)}` : ''}
                        {row.store_count ? ` · ${nf.format(row.store_count)}곳` : ''}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap content-start gap-1.5 p-2.5">
                    {(row.tenants || []).map((tenant, tenantIndex) => (
                      <TenantChip key={`${tenant}-${tenantIndex}`} asset={asset} name={tenant} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function LeaseStacking({ asset }) {
  const rows = asset.leases || [];
  if (!rows.length) {
    return <div className="grid min-h-[220px] place-items-center rounded-[10px] border border-dashed border-[#3c3e41] text-[15px] text-[#7f8286]">제공된 자료에 임차인·층별 공간 정보가 없습니다.</div>;
  }
  const floored = rows.filter((row) => row.floor);
  if (floored.length < Math.max(3, rows.length * 0.45)) {
    return (
      <div data-lease-table className="overflow-auto rounded-[10px] border border-[#3a3c3f]">
        <table className="w-full min-w-[780px] border-collapse text-left text-[14px]">
          <thead className="sticky top-0 z-[1] bg-[#292b2d] text-[#9b9ea2]">
            <tr>{['임차인·공간', '업종·시설유형', '구역', '층', '면적', '상태·비고'].map((heading) => <th key={heading} className="border-b border-[#3a3c3f] px-3 py-2.5 font-bold">{heading}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const area = asset.id === 'AST-SSAMZIGIL' ? row.contract_area_pyeong : row.area_pyeong;
              return (
                <tr key={`${row.tenant}-${row.floor}-${row.shop}-${index}`} className="border-b border-[#343638] align-top last:border-b-0 hover:bg-[#282a2c]">
                  <td className="px-3 py-2.5"><TenantChip asset={asset} name={row.tenant || row.shop || '미제공'} areaValue={area} areaLabel={row.area_label} industryFallback={row.industry_display} /></td>
                  <td className="px-3 py-2.5 leading-5 text-[#b2b5b9]">{row.industry_display || row.industry || '업종 미확인'}</td>
                  <td className="px-3 py-2.5 leading-5 text-[#9b9ea2]">{row.shop || row.building || '—'}</td>
                  <td className="px-3 py-2.5 text-[#9b9ea2]">{displayFloor(row.floor)}</td>
                  <td className="px-3 py-2.5 tabular-nums text-[#c5c8cc]">{area === null || area === undefined ? '면적 미제공' : `${row.area_label || '면적'} ${formatPyeong(area)}`}</td>
                  <td className="max-w-[260px] px-3 py-2.5 leading-5 text-[#85888c]">{[row.occupancy, row.notes].filter(Boolean).join(' · ') || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  const groups = new Map();
  rows.forEach((row) => {
    const building = row.building || asset.name;
    const floor = row.floor || '층 미제공';
    if (!groups.has(building)) groups.set(building, new Map());
    if (!groups.get(building).has(floor)) groups.get(building).set(floor, []);
    groups.get(building).get(floor).push(row);
  });
  return (
    <div data-lease-stacking className={`grid gap-3 ${groups.size > 1 ? 'xl:grid-cols-2' : 'grid-cols-1'}`}>
      {[...groups.entries()].map(([building, floors]) => (
        <section key={building} className="overflow-hidden rounded-[10px] border border-[#3a3c3f] bg-[#222426]">
          <h3 className="border-b border-[#3a3c3f] bg-[#292b2d] px-3 py-2.5 text-[16px] font-bold text-[#e0e2e5]">{building}</h3>
          {[...floors.entries()].sort((a, b) => floorWeight(b[0]) - floorWeight(a[0])).map(([floor, floorRows]) => (
            <div key={floor} className="grid grid-cols-[64px_minmax(0,1fr)] border-b border-[#343638] last:border-b-0">
              <div className="border-r border-[#343638] bg-[#252729] px-2 py-3 text-center text-[15px] font-bold text-[#aac1d2]">{displayFloor(floor)}</div>
              <div className="flex flex-wrap content-start gap-1.5 p-2.5">
                {floorRows.map((row, index) => {
                  const area = asset.id === 'AST-SSAMZIGIL' ? row.contract_area_pyeong : row.area_pyeong;
                  return <TenantChip key={`${row.tenant}-${row.shop}-${index}`} asset={asset} name={row.tenant || row.shop || '공간'} areaValue={area} areaLabel={row.area_label} industryFallback={row.industry_display} />;
                })}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

function AssetDialog({ asset, onClose }) {
  const closeRef = useRef(null);
  const open = Boolean(asset);
  useModalControls(open, onClose, closeRef);
  if (!asset) return null;
  const facts = [
    ['자산명', asset.name],
    ['주소', asset.address],
    ['보유·검토 상태', asset.status],
    ['자산 유형', asset.type],
    ['대지면적', formatArea(asset.site_area_sqm)],
    ['연면적', formatArea(asset.gfa_sqm)],
    ['층 규모', asset.floor_scale],
    ['주용도', asset.primary_use],
    ['건물·구역', asset.buildings?.map((building) => building.name).join(' · ')],
  ];
  return (
    <div
      data-asset-dialog={asset.id}
      role="dialog"
      aria-modal="true"
      aria-labelledby="asset-dialog-title"
      className="fixed inset-0 z-[2200] grid place-items-center bg-black/70 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="flex h-[min(92vh,900px)] w-[min(96vw,1560px)] flex-col overflow-hidden rounded-[14px] border border-[#45474a] bg-[#1f2022] shadow-2xl">
        <header className="flex min-h-[64px] items-center justify-between gap-4 border-b border-[#383a3d] px-5">
          <div className="min-w-0">
            <h2 id="asset-dialog-title" className="truncate text-[22px] font-bold text-[#eceef0]">{asset.name}</h2>
            <p className="mt-1 text-[14px] text-[#8d9094]">{asset.type} · {asset.status}</p>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="grid h-10 w-10 cursor-pointer place-items-center rounded-[9px] border border-[#3d3f42] text-[#a9acb0] hover:bg-[#2a2c2e] hover:text-white" aria-label="자산 상세 닫기"><X size={20} /></button>
        </header>
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(280px,28%)_minmax(0,72%)]">
          <aside className="overflow-y-auto border-r border-[#383a3d] p-4">
            <table className="w-full border-collapse text-left text-[14px]">
              <tbody>{facts.map(([label, value]) => <tr key={label} className="border-b border-[#343638]"><th className="w-[42%] px-2 py-3 font-semibold text-[#85888c]">{label}</th><td className="px-2 py-3 leading-5 text-[#d0d3d6]">{valueOrDash(value)}</td></tr>)}</tbody>
            </table>
            <div className="mt-4 rounded-[10px] border border-[#3a3c3f] bg-[#27292b] p-3">
              <strong className="text-[15px] text-[#d2d5d8]">현재 운영 정보</strong>
              <p className="mt-1.5 text-[14px] leading-5 text-[#9a9da1]">{asset.current || '제공된 운영정보 없음'}</p>
            </div>
            <div className="mt-3 rounded-[10px] border border-[#3a3c3f] bg-[#27292b] p-3">
              <strong className="text-[15px] text-[#d2d5d8]">Area Management 역할</strong>
              <p className="mt-1.5 text-[14px] leading-5 text-[#9a9da1]">{asset.role || '추가 검토 필요'}</p>
            </div>
          </aside>
          <section className="min-w-0 overflow-y-auto p-4">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div><h3 className="text-[19px] font-bold text-[#e2e4e7]">층별 임차·공간</h3><p className="mt-1 text-[14px] text-[#85888c]">임차·공간 {nf.format(asset.leases?.length || 0)}건 · 확인된 전체 층 구성</p></div>
              <span className="rounded-[7px] border border-[#3b4c58] bg-[#28323a] px-2.5 py-1.5 text-[14px] font-bold text-[#9fc3df]">{asset.floor_scale || '층 규모 미제공'}</span>
            </div>
            {asset.stacking_layouts ? <LayoutStacking asset={asset} /> : <LeaseStacking asset={asset} />}
          </section>
        </div>
      </div>
    </div>
  );
}

export function AssetLeaseWorkspace({ assets = [], assetMarkers = [], landmarks = [], boundaryData, focusAssetId }) {
  const [selectedAsset, setSelectedAsset] = useState(null);
  useEffect(() => {
    if (!focusAssetId) return;
    const focused = assets.find((asset) => String(asset.id) === String(focusAssetId));
    if (!focused) return;
    const frame = window.requestAnimationFrame(() => setSelectedAsset(focused));
    return () => window.cancelAnimationFrame(frame);
  }, [assets, focusAssetId]);
  return (
    <section data-map-activities-view="assets-leases" className="flex h-full min-h-[610px] flex-col bg-[#1f2022] text-[14px]">
      <div className="grid min-h-0 flex-1 grid-cols-1 min-[701px]:grid-cols-[230px_minmax(0,1fr)] min-[981px]:grid-cols-[330px_minmax(0,1fr)] max-[700px]:grid-rows-[minmax(0,260px)_minmax(420px,1fr)] max-[700px]:overflow-y-auto">
        <aside aria-label="자산 목록" className="min-h-0 overflow-y-auto border-r border-[#383a3d] bg-[#232426] max-[700px]:max-h-[260px] max-[700px]:border-b max-[700px]:border-r-0">
          <div className="border-b border-[#343638] px-4 py-3 text-[14px] font-bold tracking-[0.12em] text-[#748fa5]">PORTFOLIO · {nf.format(assets.length)}</div>
          {assets.map((asset) => (
            <article
              key={asset.id}
              data-asset-card={asset.id}
              role="button"
              tabIndex={0}
              aria-label={`${asset.name} 상세 열기`}
              className="cursor-pointer border-b border-[#343638] p-4 outline-none transition-colors hover:bg-[#292b2d] focus-visible:bg-[#2a3238]"
              onClick={() => setSelectedAsset(asset)}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                setSelectedAsset(asset);
              }}
            >
              <div className="flex items-start justify-between gap-3"><h2 className="text-[17px] font-bold text-[#dcdee1]">{asset.name}</h2><span className="shrink-0 rounded-[6px] border border-[#3d4c58] bg-[#283039] px-2 py-1 text-[14px] font-bold text-[#9ab7cb]">{asset.status}</span></div>
              <p className="mt-1.5 text-[14px] leading-5 text-[#8f9296]">{asset.type}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5"><span className="rounded-[6px] border border-[#3a3c3f] bg-[#27292b] px-2 py-1 text-[14px] text-[#9b9ea2]">{asset.buildings?.length > 1 ? `동·구역 ${asset.buildings.length}개` : '단일 자산'}</span><span className="rounded-[6px] border border-[#3a3c3f] bg-[#27292b] px-2 py-1 text-[14px] text-[#9b9ea2]">임차·공간 {nf.format(asset.leases?.length || 0)}건</span></div>
              <p className="mt-3 text-[14px] leading-[18px] text-[#828589]">{asset.role || asset.current}</p>
            </article>
          ))}
        </aside>
        <AssetLocationPlot assets={assets} markers={assetMarkers} landmarks={landmarks} boundaryData={boundaryData} onOpen={setSelectedAsset} />
      </div>
      <AssetDialog asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
    </section>
  );
}

function aggregateRetail(records, key, assetOrder, limit = 0) {
  const counts = new Map();
  records.forEach((record) => {
    const label = record.normalized?.[key] || '미분류';
    const asset = record.normalized?.asset || '미분류';
    if (!counts.has(label)) counts.set(label, { label, count: 0, assetCounts: new Map() });
    const item = counts.get(label);
    item.count += 1;
    item.assetCounts.set(asset, (item.assetCounts.get(asset) || 0) + 1);
  });
  let items = [...counts.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'ko'));
  if (limit && items.length > limit) {
    const kept = items.slice(0, limit);
    const rest = { label: kept.some((item) => item.label === '기타') ? '기타(그 외)' : '기타', count: 0, assetCounts: new Map() };
    items.slice(limit).forEach((item) => {
      rest.count += item.count;
      item.assetCounts.forEach((count, asset) => rest.assetCounts.set(asset, (rest.assetCounts.get(asset) || 0) + count));
    });
    items = [...kept, rest];
  }
  const total = records.length || 1;
  return items.map((item) => ({
    ...item,
    share: item.count / total * 100,
    segments: assetOrder.map((asset) => ({ asset, count: item.assetCounts.get(asset) || 0 })).filter((segment) => segment.count),
  }));
}

function RetailChart({ title, rows, segmented = false, valueFormatter, highlightedAsset, onAssetHighlight }) {
  return (
    <section data-retail-chart={title} className="flex min-h-[250px] min-w-0 flex-col overflow-hidden rounded-[11px] border border-[#393b3e] bg-[#242527]">
      <header className="border-b border-[#393b3e] px-4 py-3"><h2 className="text-[16px] font-bold text-[#d9dbde]">{title}</h2></header>
      <div className="custom-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        {rows.length ? rows.map((row) => (
          <div
            key={row.label}
            data-chart-row={row.label}
            data-retail-asset={row.asset}
            className={`${highlightedAsset && row.asset && highlightedAsset !== row.asset ? 'opacity-35' : 'opacity-100'} min-w-0 transition-opacity`}
            title={row.tooltip}
            tabIndex={row.asset ? 0 : undefined}
            onMouseEnter={() => row.asset && onAssetHighlight?.(row.asset)}
            onMouseLeave={() => row.asset && onAssetHighlight?.(null)}
            onFocus={() => row.asset && onAssetHighlight?.(row.asset)}
            onBlur={() => row.asset && onAssetHighlight?.(null)}
          >
            <div className="mb-1.5 flex items-center justify-between gap-3 text-[14px]"><span className="truncate text-[#b5b8bc]" title={row.label}>{row.label}</span><span className="shrink-0 tabular-nums text-[#d2d5d8]">{valueFormatter ? valueFormatter(row) : `${nf.format(row.count)} · ${row.share.toFixed(1)}%`}</span></div>
            <div className="flex h-2.5 overflow-hidden rounded-full bg-[#343638]" title={`${row.label} · ${nf.format(row.count)}개 · ${row.share.toFixed(1)}%`}>
              {segmented && row.segments?.length ? row.segments.map((segment) => (
                <span
                  key={segment.asset}
                  data-retail-asset={segment.asset}
                  role="img"
                  tabIndex={0}
                  aria-label={`${row.label} · ${segment.asset} · ${nf.format(segment.count)}개`}
                  className={`${highlightedAsset && highlightedAsset !== segment.asset ? 'opacity-25' : 'opacity-100'} outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-white/80`}
                  style={{ width: `${segment.count / row.count * row.share}%`, backgroundColor: ASSET_COLORS[segment.asset] || '#7d96aa' }}
                  title={`${row.label} · ${segment.asset} · ${nf.format(segment.count)}개`}
                  onMouseEnter={() => onAssetHighlight?.(segment.asset)}
                  onMouseLeave={() => onAssetHighlight?.(null)}
                  onFocus={() => onAssetHighlight?.(segment.asset)}
                  onBlur={() => onAssetHighlight?.(null)}
                />
              )) : <span className="rounded-full bg-[#7897ad]" style={{ width: `${row.share}%` }} />}
            </div>
          </div>
        )) : <p className="grid h-full place-items-center text-[15px] text-[#7f8286]">표시할 데이터가 없습니다.</p>}
      </div>
    </section>
  );
}

function RetailMap({ items, records, selectedAsset, highlightedAsset, onSelect, onAssetHighlight }) {
  const [basemap, setBasemap] = useState('voyager');
  const featureLayers = useMemo(() => items.map((item) => {
    const color = ASSET_COLORS[item.asset] || '#315f52';
    const selected = selectedAsset === '전체' || selectedAsset === item.asset;
    const dimmed = selectedAsset !== '전체' && !selected;
    const assetRecords = records.filter((record) => record.normalized?.asset === item.asset);
    const category = aggregateRetail(assetRecords, 'category', [])[0];
    const local = assetRecords.filter((record) => record.normalized?.origin === 'Local').length;
    const parent = assetRecords.filter((record) => record.normalized?.has_large_corporate_parent).length;
    return {
      key: item.id,
      label: `${item.label} · ${item.retail_count ? `${nf.format(item.retail_count)}개 브랜드` : '리테일 자료 미제공'}`,
      data: {
        type: 'Feature',
        properties: {
          id: item.id,
          asset: item.asset,
          label: item.label,
          status: item.status,
          retail_count: item.retail_count,
          data_state: item.data_state,
          source_id: item.source_id,
          source_note: item.source_note,
        },
        geometry: item.geometry,
      },
      color,
      weight: selected ? 3 : 1.5,
      opacity: dimmed ? 0.28 : (selected ? 1 : 0.42),
      fillOpacity: item.retail_count ? (selected ? 0.22 : 0.06) : 0.08,
      dashArray: item.retail_count ? undefined : '7 6',
      record: item,
      popupRecord: item.retail_count ? {
        status: item.status,
        count: `${nf.format(assetRecords.length)}개 브랜드`,
        summary: `${category?.label || '미분류'} ${nf.format(category?.count || 0)}개 · Local ${nf.format(local)}개`,
        relevance: `대기업 모회사 ${nf.format(parent)} / ${nf.format(assetRecords.length)}개`,
      } : { status: item.status, summary: '리테일 자료 미제공' },
      popupAction: item.retail_count ? { label: '이 자산 분석', onClick: () => onSelect(item.asset) } : undefined,
      payload: item,
      kind: 'igis-retail-asset',
      onMouseEnter: () => onAssetHighlight(item.asset),
      onMouseLeave: () => onAssetHighlight(null),
    };
  }), [items, onAssetHighlight, onSelect, records, selectedAsset]);
  const badgeMarkers = useMemo(() => items.map((item) => {
    const selected = selectedAsset === '전체' || selectedAsset === item.asset;
    const dimmed = selectedAsset !== '전체' && !selected;
    return {
      ...item,
      key: item.id,
      label: `${item.label} · ${item.retail_count ? `${nf.format(item.retail_count)}개 브랜드` : '리테일 자료 미제공'}`,
      color: ASSET_COLORS[item.asset] || '#315f52',
      badgeText: item.retail_count ? String(item.retail_count) : '–',
      badgeSize: item.retail_count ? Math.round(25 + Math.sqrt(item.retail_count) * 2) : 22,
      opacity: dimmed ? 0.28 : (selected ? 1 : 0.42),
      kind: 'igis-retail-badge',
      record: item,
      action: item.retail_count ? { type: 'retail-analysis', id: item.id, label: '이 자산 분석' } : null,
      onMouseEnter: () => onAssetHighlight(item.asset),
      onMouseLeave: () => onAssetHighlight(null),
    };
  }), [items, onAssetHighlight, selectedAsset]);
  const activeMapKey = items.find((item) => item.asset === (highlightedAsset || selectedAsset))?.id;
  return (
    <div data-igis-retail-map className="relative h-full min-h-[360px] overflow-hidden bg-[#202224]">
      <SonghyeonLeafletMap
        featureLayers={featureLayers}
        markers={badgeMarkers}
        selectedKey={activeMapKey}
        onSelect={(item) => item.retail_count && onSelect(item.asset)}
        onMarkerAction={(item) => item.retail_count && onSelect(item.asset)}
        basemap={basemap}
        fitVisible
        fitVisibleMaxZoom={18}
        className="h-full min-h-[360px]"
        ariaLabel={`이지스 리테일 자산 ${items.length}개 실제 건물 형상 상세 지도`}
      />
      <div className="absolute left-[56px] top-4 z-[1000]"><MapBasemapSelect value={basemap} onChange={setBasemap} /></div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-[8px] border border-white/10 bg-[#171819]/90 px-3 py-2 text-[14px] font-bold text-[#A1A1AA] shadow-lg backdrop-blur">
        실제 건물 형상 · 도로·건물·지명 배경지도 · 확대·이동 가능
      </div>
      <div className="pointer-events-none absolute bottom-8 left-4 flex max-w-[calc(100%-32px)] flex-wrap items-center gap-x-3 gap-y-1.5 rounded-[9px] border border-white/10 bg-[#171819]/90 px-3 py-2 text-[14px] text-[#A1A1AA] shadow-lg backdrop-blur">
        {orderedUnique(items.map((item) => item.asset)).map((asset) => <span key={asset} className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ASSET_COLORS[asset] || '#74787d' }} />{asset}</span>)}
        {items.some((item) => item.data_state === 'not_provided') && <span className="text-[#777a7e]">점선 · 자료 미제공</span>}
      </div>
    </div>
  );
}

function RetailSummary({ scope, records }) {
  const top = (key) => aggregateRetail(records, key, [], 0)[0] || { label: '—', count: 0 };
  const category = top('category');
  const subcategory = top('subcategory');
  const local = records.filter((record) => record.normalized?.origin === 'Local').length;
  const parent = records.filter((record) => record.normalized?.has_large_corporate_parent).length;
  const metrics = [
    ['대표 대분류', `${category.label} · ${nf.format(category.count)}개`],
    ['대표 중분류', `${subcategory.label} · ${nf.format(subcategory.count)}개`],
    ['Origin', `Local ${nf.format(local)} · Global ${nf.format(records.length - local)}`],
    ['대기업 모회사', `${nf.format(parent)} / ${nf.format(records.length)} · ${records.length ? (parent / records.length * 100).toFixed(1) : '0.0'}%`],
  ];
  return (
    <aside data-retail-summary aria-live="polite" className="overflow-y-auto border-l border-[#393b3e] bg-[#242527] p-5">
      <h2 className="text-[21px] font-bold text-[#e4e6e8]">{scope === '전체' ? '전체 포트폴리오' : scope}</h2>
      <p className="mt-1 text-[15px] text-[#8e9195]">{nf.format(records.length)}개 브랜드</p>
      <div className="mt-5 space-y-2.5">
        {metrics.map(([label, value]) => <div key={label} className="rounded-[9px] border border-[#393b3e] bg-[#292a2c] p-3"><span className="text-[14px] text-[#85888c]">{label}</span><strong className="mt-1 block text-[15px] leading-5 text-[#d0d3d6]">{value}</strong></div>)}
      </div>
    </aside>
  );
}

function RetailRawDialog({ onClose, igisRetail, initialAsset }) {
  const closeRef = useRef(null);
  const records = useMemo(() => igisRetail?.records || [], [igisRetail?.records]);
  const columns = igisRetail?.metadata?.columns || [];
  const [query, setQuery] = useState('');
  const [asset, setAsset] = useState(initialAsset === '전체' ? 'all' : initialAsset);
  const [category, setCategory] = useState('all');
  const [subcategory, setSubcategory] = useState('all');
  const [origin, setOrigin] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 25;
  useModalControls(true, onClose, closeRef);
  const options = useMemo(() => ({
    assets: orderedUnique(records.map((record) => record.normalized?.asset)),
    categories: orderedUnique(records.map((record) => record.normalized?.category)),
    subcategories: orderedUnique(records.map((record) => record.normalized?.subcategory)),
    origins: orderedUnique(records.map((record) => record.normalized?.origin)),
  }), [records]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('ko');
    return records.filter((record) => {
      const normalized = record.normalized || {};
      const haystack = [...(record.raw_values || []), normalized.asset].filter((value) => value !== null && value !== undefined).join(' ').toLocaleLowerCase('ko');
      return (!needle || haystack.includes(needle))
        && (asset === 'all' || normalized.asset === asset)
        && (category === 'all' || normalized.category === category)
        && (subcategory === 'all' || normalized.subcategory === subcategory)
        && (origin === 'all' || normalized.origin === origin);
    });
  }, [asset, category, origin, query, records, subcategory]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const updateFilter = (setter) => (event) => { setter(event.target.value); setPage(1); };
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="retail-raw-title" data-retail-raw-dialog className="fixed inset-0 z-[2200] bg-black/75 p-3 backdrop-blur-[2px]" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[13px] border border-[#45474a] bg-[#1f2022] shadow-2xl">
        <header className="flex min-h-[64px] items-center justify-between gap-4 border-b border-[#393b3e] px-5">
          <div><h2 id="retail-raw-title" className="text-[22px] font-bold text-[#eceef0]">RAW DATA</h2><p className="mt-1 text-[14px] text-[#8e9195]">{nf.format(filtered.length)}개 행 · 전체 {nf.format(records.length)}개</p></div>
          <button ref={closeRef} type="button" onClick={onClose} className="grid h-10 w-10 cursor-pointer place-items-center rounded-[9px] border border-[#3d3f42] text-[#a9acb0] hover:bg-[#2a2c2e] hover:text-white" aria-label="RAW DATA 닫기"><X size={20} /></button>
        </header>
        <div className="grid grid-cols-[minmax(240px,1.4fr)_repeat(4,minmax(145px,0.8fr))] gap-2 border-b border-[#393b3e] bg-[#242527] p-3">
          <label className="relative"><Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#74777b]" /><input value={query} onChange={updateFilter(setQuery)} type="search" placeholder="브랜드·모회사·비고 검색" className="h-10 w-full rounded-[8px] border border-[#3d3f42] bg-[#1f2022] pl-9 pr-3 text-[15px] text-[#e0e2e5] outline-none placeholder:text-[#676a6e] focus:border-[#6d8ca3]" /></label>
          <RawSelect label="자산" value={asset} options={options.assets} onChange={updateFilter(setAsset)} />
          <RawSelect label="대분류" value={category} options={options.categories} onChange={updateFilter(setCategory)} />
          <RawSelect label="중분류" value={subcategory} options={options.subcategories} onChange={updateFilter(setSubcategory)} />
          <RawSelect label="Origin" value={origin} options={options.origins} onChange={updateFilter(setOrigin)} />
        </div>
        <div className="custom-scrollbar min-h-0 flex-1 overflow-auto">
          <table data-retail-raw-table className="w-full min-w-[1450px] border-collapse text-left text-[14px]">
            <thead className="sticky top-0 z-[2] bg-[#292b2d] text-[#a5a8ac]"><tr>{columns.map((column) => <th key={column} className="whitespace-nowrap border-b border-r border-[#414346] px-3 py-3 font-bold last:border-r-0">{column}</th>)}</tr></thead>
            <tbody>{visible.map((record) => <tr key={record.source_row} data-source-row={record.source_row} className="border-b border-[#343638] align-top hover:bg-[#292b2d]">{columns.map((column, index) => <td key={`${record.source_row}-${column}`} className="max-w-[320px] border-r border-[#343638] px-3 py-2.5 leading-5 text-[#b8bbc0] last:border-r-0">{valueOrDash(record.raw_values?.[index])}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <footer className="flex min-h-[56px] items-center justify-between gap-4 border-t border-[#393b3e] bg-[#242527] px-4">
          <p className="text-[14px] text-[#898c90]">{filtered.length ? `${nf.format((safePage - 1) * pageSize + 1)}–${nf.format(Math.min(safePage * pageSize, filtered.length))}` : '0'} / {nf.format(filtered.length)}개 행</p>
          <div className="flex items-center gap-2"><button type="button" disabled={safePage <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="grid h-9 w-9 cursor-pointer place-items-center rounded-[8px] border border-[#414346] text-[#b0b3b7] disabled:cursor-not-allowed disabled:opacity-35" aria-label="이전 페이지"><ChevronLeft size={17} /></button><span className="min-w-[90px] text-center text-[14px] font-bold text-[#c4c7ca]">{safePage} / {pageCount}</span><button type="button" disabled={safePage >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))} className="grid h-9 w-9 cursor-pointer place-items-center rounded-[8px] border border-[#414346] text-[#b0b3b7] disabled:cursor-not-allowed disabled:opacity-35" aria-label="다음 페이지"><ChevronRight size={17} /></button></div>
        </footer>
      </div>
    </div>
  );
}

function RawSelect({ label, value, options, onChange }) {
  return <select aria-label={label} value={value} onChange={onChange} className="h-10 min-w-0 rounded-[8px] border border-[#3d3f42] bg-[#1f2022] px-3 text-[15px] text-[#d5d7da] outline-none focus:border-[#6d8ca3]"><option value="all">전체 {label}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>;
}

const CHANGE_BADGE_CLASSES = {
  '신규': 'border-[#315f4b] bg-[#233c32] text-[#83c9a6]',
  '위치변경': 'border-[#4c5871] bg-[#293243] text-[#9cb7e4]',
  '영업 종료': 'border-[#71433f] bg-[#442b29] text-[#ef9c94]',
};

function RetailChanges({ changeLog, changeSummary, scope }) {
  const changes = useMemo(
    () => scope === '전체' ? changeLog : changeLog.filter((item) => item.asset === scope),
    [changeLog, scope],
  );
  const counts = useMemo(() => ({
    '신규': changes.filter((item) => item.change_type === '신규').length,
    '위치변경': changes.filter((item) => item.change_type === '위치변경').length,
    '영업 종료': changes.filter((item) => item.change_type === '영업 종료').length,
  }), [changes]);
  const assetStatus = useMemo(
    () => (changeSummary?.by_asset || []).filter((item) => scope === '전체' || item.asset === scope),
    [changeSummary?.by_asset, scope],
  );
  return (
    <div data-retail-changes className="min-h-0 flex-1 overflow-y-auto p-4 min-[901px]:p-6">
      <section className="grid grid-cols-2 gap-3 min-[761px]:grid-cols-4">
        {[
          ['총 변경', changes.length, 'text-[#e4e6e8]'],
          ['신규', counts['신규'], 'text-[#83c9a6]'],
          ['위치변경', counts['위치변경'], 'text-[#9cb7e4]'],
          ['영업 종료', counts['영업 종료'], 'text-[#ef9c94]'],
        ].map(([label, value, tone]) => (
          <article key={label} className="rounded-[11px] border border-[#393b3e] bg-[#242527] p-4">
            <p className="text-[14px] font-bold text-[#8e9195]">{label}</p>
            <strong className={`mt-2 block text-[28px] tabular-nums ${tone}`}>{nf.format(value)}</strong>
          </article>
        ))}
      </section>
      <section className="mt-4 overflow-hidden rounded-[11px] border border-[#393b3e] bg-[#242527]">
        <header className="flex flex-wrap items-end justify-between gap-3 border-b border-[#393b3e] px-4 py-3.5">
          <div><h2 className="text-[18px] font-bold text-[#e2e4e7]">변경 상점</h2><p className="mt-1 text-[14px] text-[#85888c]">{scope === '전체' ? '전체 자산' : scope} · 현재 층과 운영상태 기준</p></div>
          <span className="text-[14px] font-bold text-[#a4a7ab]">{nf.format(changes.length)}건</span>
        </header>
        {changes.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-[#292a2c] text-[14px] text-[#8f9296]"><tr><th className="px-4 py-3">자산</th><th className="px-4 py-3">현재 층</th><th className="px-4 py-3">브랜드명</th><th className="px-4 py-3">운영상태</th><th className="px-4 py-3">변화유형</th></tr></thead>
              <tbody>{changes.map((item) => <tr key={`${item.asset}-${item.current_floor}-${item.brand}`} className="border-t border-[#343638] text-[15px] text-[#bdc0c4]"><td className="px-4 py-3.5 font-bold text-[#d4d6d9]">{item.asset}</td><td className="px-4 py-3.5">{item.current_floor}</td><td className="px-4 py-3.5 font-bold text-[#d4d6d9]">{item.brand}</td><td className="px-4 py-3.5">{item.operating_status}</td><td className="px-4 py-3.5"><span className={`${CHANGE_BADGE_CLASSES[item.change_type] || 'border-[#47494c] bg-[#2d2f31] text-[#a6a9ad]'} inline-flex rounded-[6px] border px-2 py-1 text-[14px] font-bold`}>{item.change_type}</span></td></tr>)}</tbody>
            </table>
          </div>
        ) : <p className="px-4 py-12 text-center text-[15px] text-[#7f8286]">선택한 자산의 변경사항이 없습니다.</p>}
      </section>
      <div className="mt-4 grid gap-4 min-[901px]:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <section className="overflow-hidden rounded-[11px] border border-[#393b3e] bg-[#242527]">
          <header className="border-b border-[#393b3e] px-4 py-3.5"><h2 className="text-[18px] font-bold text-[#e2e4e7]">자산별 운영 현황</h2></header>
          <div className="overflow-x-auto"><table className="w-full min-w-[560px] border-collapse text-center text-[14px]"><thead className="bg-[#292a2c] text-[#8f9296]"><tr><th className="px-3 py-3 text-left">자산</th><th className="px-3 py-3">운영 중</th><th className="px-3 py-3">공실</th><th className="px-3 py-3">영업 종료</th><th className="px-3 py-3">지원시설</th></tr></thead><tbody>{assetStatus.map((item) => <tr key={item.asset} className="border-t border-[#343638] text-[#bdc0c4]"><td className="px-3 py-3.5 text-left font-bold text-[#d4d6d9]">{item.asset}</td><td>{nf.format(item.active)}</td><td>{nf.format(item.vacant)}</td><td>{nf.format(item.closed)}</td><td>{nf.format(item.support)}</td></tr>)}</tbody></table></div>
        </section>
        <aside className="rounded-[11px] border border-[#393b3e] bg-[#242527] p-4">
          <h2 className="text-[18px] font-bold text-[#e2e4e7]">변경 표기 기준</h2>
          <ul className="mt-3 space-y-2.5 text-[14px] leading-6 text-[#a0a3a7]">{(changeSummary?.definitions || []).map((item) => <li key={item} className="border-l-2 border-[#526879] pl-3">{item}</li>)}</ul>
        </aside>
      </div>
    </div>
  );
}

export function IgisRetailWorkspace({ igisRetail = {} }) {
  const records = useMemo(() => igisRetail.records || [], [igisRetail.records]);
  const mapAssets = igisRetail.map_assets || [];
  const presentAssets = useMemo(() => orderedUnique(records.map((record) => record.normalized?.asset)), [records]);
  const assetOrder = useMemo(() => {
    const preferred = igisRetail.asset_order || [];
    return [...preferred.filter((asset) => presentAssets.includes(asset)), ...presentAssets.filter((asset) => !preferred.includes(asset))];
  }, [igisRetail.asset_order, presentAssets]);
  const scopes = useMemo(() => ['전체', ...assetOrder], [assetOrder]);
  const [scope, setScope] = useState('전체');
  const [view, setView] = useState('status');
  const [highlightedAsset, setHighlightedAsset] = useState(null);
  const [rawOpen, setRawOpen] = useState(false);
  const scopedRecords = useMemo(() => scope === '전체' ? records : records.filter((record) => record.normalized?.asset === scope), [records, scope]);
  const categories = useMemo(() => aggregateRetail(scopedRecords, 'category', assetOrder), [assetOrder, scopedRecords]);
  const subcategories = useMemo(() => aggregateRetail(scopedRecords, 'subcategory', assetOrder, 12), [assetOrder, scopedRecords]);
  const origins = useMemo(() => aggregateRetail(scopedRecords, 'origin', assetOrder), [assetOrder, scopedRecords]);
  const parentRows = useMemo(() => (scope === '전체' ? assetOrder : [scope]).map((asset) => {
    const source = records.filter((record) => record.normalized?.asset === asset);
    const parentRecords = source.filter((record) => record.normalized?.has_large_corporate_parent);
    const tenantLines = parentRecords.length
      ? parentRecords.map((record) => `• ${record.normalized?.brand || '브랜드 미기재'} — ${String(record.normalized?.parent_company || '모회사 미기재').replace(/\s*\n\s*/g, ' / ')}`).join('\n')
      : '• 해당 임차인 없음';
    const share = source.length ? parentRecords.length / source.length * 100 : 0;
    return {
      asset,
      label: asset,
      count: parentRecords.length,
      denominator: source.length,
      share,
      tooltip: `${asset}\n• 대기업 모회사 비율: ${nf.format(parentRecords.length)} / ${nf.format(source.length)}개 · ${share.toFixed(1)}%\n• 대기업 모회사 대상 임차인\n${tenantLines}`,
    };
  }), [assetOrder, records, scope]);
  const selectScope = useCallback((asset) => setScope((current) => asset === current && asset !== '전체' ? '전체' : asset), []);
  const highlightAsset = useCallback((asset) => setHighlightedAsset(asset), []);
  return (
    <section data-map-activities-view="igis-retail" className="flex h-full min-h-[610px] flex-col overflow-y-auto bg-[#1f2022] text-[14px]">
      <div className="flex min-h-[54px] flex-wrap items-center justify-between gap-3 border-b border-[#383a3d] bg-[#202123] px-4 py-2.5">
        <div role="tablist" aria-label="이지스 리테일 보기" className="inline-flex rounded-[9px] border border-[#3d3f42] bg-[#191a1b] p-1">
          {[['status', 'Retail 현황'], ['changes', '변경사항']].map(([value, label]) => <button key={value} type="button" role="tab" aria-selected={view === value} onClick={() => setView(value)} className={`${view === value ? 'bg-[#324757] text-[#b8daf1]' : 'text-[#85888c] hover:text-[#c3c6ca]'} h-8 cursor-pointer rounded-[6px] px-3.5 text-[14px] font-bold transition-colors`}>{label}</button>)}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <a href={igisRetail.metadata?.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[8px] border border-[#3d3f42] px-3 text-[14px] font-bold text-[#9da0a4] hover:border-[#596068] hover:text-[#d0d3d6]">원본 시트 <ExternalLink size={14} /></a>
          <button type="button" onClick={() => setRawOpen(true)} className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-[8px] border border-[#51697a] bg-[#2b3943] px-3 text-[14px] font-bold text-[#abd0e8] hover:border-[#7897ad] hover:bg-[#30424f]"><Database size={15} />RAW DATA · {nf.format(records.length)}</button>
        </div>
      </div>
      <div className="flex min-h-[50px] flex-wrap items-center justify-between gap-3 border-b border-[#383a3d] bg-[#232426] px-4 py-2">
        <div role="tablist" aria-label="리테일 자산 선택" className="flex flex-wrap items-center gap-1.5">
          {scopes.map((asset, index) => (
            <button
              key={asset}
              type="button"
              role="tab"
              aria-selected={scope === asset}
              tabIndex={scope === asset ? 0 : -1}
              data-retail-scope={asset}
              onClick={() => selectScope(asset)}
              onKeyDown={(event) => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                event.preventDefault();
                const next = event.key === 'Home' ? 0 : event.key === 'End' ? scopes.length - 1 : event.key === 'ArrowRight' ? (index + 1) % scopes.length : (index - 1 + scopes.length) % scopes.length;
                setScope(scopes[next]);
                event.currentTarget.parentElement?.querySelectorAll('[role="tab"]')[next]?.focus();
              }}
              className={`${scope === asset ? 'border-[#69879d] bg-[#2b3842] text-[#afd0e6]' : 'border-[#3a3c3f] bg-[#28292b] text-[#999ca0] hover:bg-[#2d2f31]'} min-h-9 cursor-pointer rounded-[8px] border px-3 text-[14px] font-bold`}
            >{asset}</button>
          ))}
        </div>
        <div aria-label="자산 색상 범례" className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-[#8d9094]">{assetOrder.map((asset) => <span key={asset} className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ASSET_COLORS[asset] || '#74787d' }} />{asset}</span>)}</div>
      </div>
      {view === 'status' ? <>
        <div className="grid min-h-[420px] grid-cols-1 border-b border-[#383a3d] min-[701px]:grid-cols-[minmax(0,1fr)_230px] min-[981px]:grid-cols-[minmax(0,1fr)_290px] max-[700px]:grid-rows-[minmax(420px,1fr)_minmax(0,260px)]">
          <RetailMap items={mapAssets} records={records} selectedAsset={scope} highlightedAsset={highlightedAsset} onSelect={selectScope} onAssetHighlight={highlightAsset} />
          <div className="min-h-0 max-[700px]:max-h-[260px] max-[700px]:overflow-y-auto"><RetailSummary scope={scope} records={scopedRecords} /></div>
        </div>
        <div className="grid grid-cols-1 gap-3 p-3 min-[701px]:grid-cols-2">
          <RetailChart title="대분류 구성" rows={categories} segmented={scope === '전체'} highlightedAsset={highlightedAsset} onAssetHighlight={highlightAsset} />
          <RetailChart title="중분류 구성" rows={subcategories} segmented={scope === '전체'} highlightedAsset={highlightedAsset} onAssetHighlight={highlightAsset} />
          <RetailChart title="Origin 구성" rows={origins} segmented={scope === '전체'} highlightedAsset={highlightedAsset} onAssetHighlight={highlightAsset} />
          <RetailChart title="자산별 대기업 모회사 비율" rows={parentRows} highlightedAsset={highlightedAsset} onAssetHighlight={highlightAsset} valueFormatter={(row) => `${nf.format(row.count)} / ${nf.format(row.denominator)} · ${row.share.toFixed(1)}%`} />
        </div>
      </> : <RetailChanges changeLog={igisRetail.change_log || []} changeSummary={igisRetail.change_summary || {}} scope={scope} />}
      {rawOpen && <RetailRawDialog onClose={() => setRawOpen(false)} igisRetail={igisRetail} initialAsset={scope} />}
    </section>
  );
}
