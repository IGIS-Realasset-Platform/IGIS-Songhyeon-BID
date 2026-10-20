/* Songhyeon BID research module. Host shell and account remain owned by the host. */
(function () {
  'use strict';
  const text = value => value == null ? '' : typeof value === 'string' ? value : String(value);
  const arr = value => Array.isArray(value) ? value : [];
  const node = (tag, cls, content) => { const e = document.createElement(tag); if (cls) e.className = cls; if (content != null) e.textContent = text(content); return e; };
  const button = (label, action, cls) => { const b = node('button', cls || 'sr-button', label); b.type = 'button'; if (action) b.addEventListener('click', action); return b; };
  const safeURL = value => { try { const u = new URL(typeof value === 'object' ? value.url : value); return /^(https?:)$/.test(u.protocol) ? u.href : null; } catch (error) { return null; } };
  const link = (label, url) => { const u = safeURL(url); if (!u) return node('span', '', label); const a = node('a', 'sr-link', label); a.href = u; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; };
  const coordinates = site => site && site.mapVisible !== false && typeof site.lat === 'number' && typeof site.lon === 'number' && Number.isFinite(site.lat) && Number.isFinite(site.lon) && Math.abs(site.lat) <= 90 && Math.abs(site.lon) <= 180;
  const shortAddress = address => text(address).replace(/^(대한민국\s*)?(서울특별시|서울시|서울)\s*/, '').replace(/^종로구\s*/, '');
  const date = value => { if (!value) return ''; const d = new Date(value); return Number.isNaN(d.getTime()) ? text(value) : new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeZone: 'Asia/Seoul' }).format(d); };
  const norm = value => text(value).normalize('NFKC').toLowerCase().replace(/\s/g, '');
  const readJSON = (id, fallback) => { try { return JSON.parse(document.getElementById(id)?.textContent || 'null') || fallback; } catch (error) { return fallback; } };
  const labels = { name: '이름', title: '제목', address: '주소', detail: '상세', description: '설명', summary: '요약', reason: '추천 이유', why: '주목한 이유', category: '분야', categories: '분야', website: '홈페이지', url: '원문 링크', link: '링크', source: '출처', sources: '출처', phone: '연락처', instagram: '인스타그램', notes: '조사 메모', note: '조사 메모', history: '이력', products: '주요 제품', product: '제품', features: '특징', strengths: '강점', weaknesses: '한계', heritage: '전문성·역사', story: '이야기', founded: '설립', founder: '설립자', owner: '대표·운영자', contact: '연락처', contacts: '연락처', price: '가격', priceRange: '가격대', businessHours: '영업시간', hours: '영업시간', area: '권역', region: '권역', tags: '분류', evidence: '근거', checkedAt: '확인일', updatedAt: '수정일', date: '날짜', expertise: '전문 분야', craft: '공예 분야', maker: '제작자', artisan: '장인', materials: '재료', techniques: '기법', research: '조사', content: '내용', details: '세부 내용', items: '항목', merchants: '상점', stores: '상점', seminar: '세미나', tour: '투어', program: '프로그램', schedule: '일정', venue: '장소', audience: '대상', implications: '시사점', insights: '시사점', risks: '고려 사항', assessment: '평가', recommendation: '제안', publications: '관련 자료', fair: '공예트렌드페어', organization: '인사전통문화보존회', awards: '수상·인증', certification: '인증', selectionReason: '선정 이유', productSummary: '주요 제품', popularityReason: '인기 이유', priceSummary: '가격대', value: '내용', text: '내용', references: '출처', authors: '작성자', author: '작성자', year: '연도', collaboration: '협업', proposals: '제안', verification: '확인 사항', memo: '메모', raw: '원문', sourceUrl: '출처 링크' };

  function mount(target, options) {
    if (!target || !(target instanceof Element)) throw new Error('화면을 표시할 요소가 필요합니다.');
    if (target.__songhyeonResearch) return target.__songhyeonResearch;
    const opts = options || {}, seed = opts.seed || readJSON('research-seed', { entities: [] });
    const config = Object.assign({}, readJSON('research-config', {}), opts.config || {});
    const embedded = opts.embedded === true;
    const core = ResearchCore.create({ seed, config, adapter: opts.adapter });
    const root = node('div', 'sr-root' + (embedded ? ' sr-embedded' : ' sr-standalone'));
    let currentTab = 'sheet', selected = null, sheet, top10, map = null, layer = null, destroyed = false, drawer = null, drawerReturn = null;
    const mapFilters = { query: '', region: [], category: [], lists: [], recognition: [] }, els = {}, notices = [];
    target.replaceChildren(root);

    function notice(message, type) {
      if (!message || destroyed) return;
      const e = node('div', 'sr-toast ' + (type || ''), message); e.setAttribute('role', type === 'error' ? 'alert' : 'status'); els.toasts.append(e); notices.push(e);
      setTimeout(() => e.remove(), type === 'error' ? 9000 : 4500);
    }
    function navigate(tab) {
      if (!['sheet', 'map', 'top10'].includes(tab)) return;
      currentTab = tab;
      for (const key of ['sheet', 'map', 'top10']) { els.panels[key].hidden = key !== tab; els.tabs[key].classList.toggle('active', key === tab); els.tabs[key].setAttribute('aria-selected', String(key === tab)); }
      if (tab === 'top10') top10?.show?.();
      if (tab === 'map') { if (!map) initMap(); setTimeout(() => { if (!destroyed && map) { map.invalidateSize({ animate: false }); renderMap(); } }, 60); }
    }
    function openSheet(id) { closeDrawer(); navigate('sheet'); if (id) sheet.focusEntity(id); }
    async function toggleStar(id,control) {if(control)control.disabled=true;const result=await core.toggleStar(id);if(!result?.ok)notice(result?.error?.message||result?.error||'선택을 저장하지 못했습니다.','error');if(control?.isConnected){control.disabled=false;setStarAppearance(control,id);}return result;}
    function setStarAppearance(control,id){const active=core.isStarred(id);control.textContent=active?'★':'☆';control.classList.toggle('active',active);control.setAttribute('aria-pressed',String(active));control.setAttribute('aria-label',(core.getEntity(id)?.name||'상점')+(active?' 저장 해제':' 저장'));control.title=active?'저장 해제':'저장';const current=core.getState();control.disabled=!['local','shared'].includes(current.mode)||current.actor?.role==='viewer';}
    function starButton(id,cls='sr-star-button'){const control=button('',()=>toggleStar(id,control),cls);control.dataset.starId=id;setStarAppearance(control,id);return control;}
    function buildShell() {
      let main = root;
      if (!embedded) {
        const side = node('aside', 'sr-platform-sidebar');
        const title = node('div', 'sr-platform-brand', '송현 BID TF');
        const collapse = button('메뉴 접기', () => { root.classList.toggle('sr-sidebar-collapsed'); collapse.textContent = root.classList.contains('sr-sidebar-collapsed') ? '메뉴 펼치기' : '메뉴 접기'; }, 'sr-sidebar-toggle');
        side.append(title, collapse);
        const nav = node('nav', 'sr-platform-nav'); nav.setAttribute('aria-label', '송현 BID TF 메뉴');
        const base = 'https://songhyeon.iotaseoul.site';
        const navLink = (label, path, sub) => { const a = link(label, base + path); a.className = 'sr-nav-link' + (sub ? ' sub' : ''); nav.append(a); };
        navLink('홈', '/'); navLink('통합업무보드', '/tasks');
        nav.append(node('div', 'sr-nav-heading', 'Map & Activities'));
        for (const [label, path] of [['통합지도', '/map-activities/integrated-map'], ['운영구역', '/map-activities/boundary'], ['자산·임차', '/map-activities/assets-leases'], ['이지스 리테일', '/map-activities/igis-retail'], ['상권·활동', '/map-activities/market-activities']]) navLink(label, path, true);
        const active = button('상점 조사', () => navigate('sheet'), 'sr-nav-link sub current'); active.setAttribute('aria-current', 'page'); nav.append(active);
        navLink('인구·이용패턴', '/map-activities/population', true); navLink('호텔', '/map-activities/hotel', true); navLink('제도·공동체', '/map-activities/institutions-community', true);
        navLink('마일스톤 및 R&R', '/milestones'); navLink('업무 피드', '/feed'); navLink('Data Room', '/data');
        side.append(nav); root.append(side);
        main = node('main', 'sr-platform-main');
        const bread = node('header', 'sr-platform-header'); bread.append(node('strong', '', 'Map & Activities'), node('span', '', '/ 상점 조사')); main.append(bread); root.append(main);
      }
      const page = node('section', 'sr-page'); main.append(page);
            const actions = node('div', 'sr-page-actions');
      actions.append(button('공예 행사·기관 조사', openReference, 'sr-button subtle'));
      
      const tabs = node('nav', 'sr-tabs'); tabs.setAttribute('role', 'tablist'); tabs.setAttribute('aria-label', '상점 조사 보기'); els.tabs = {}; els.panels = {};
      const specs = [['sheet', '조사표'], ['map', '상점 지도'], ['top10', '저장 리스트·TOP 10']];
      for (const [key, title, description] of specs) { const b = button('', () => navigate(key), 'sr-tab'); b.id = 'sr-tab-' + key; b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', 'sr-panel-' + key); b.append(node('strong', '', title)); tabs.append(b); els.tabs[key] = b; }
      const tabBar=node('div','sr-tabs-bar');tabBar.append(tabs,actions);page.append(tabBar);
      for (const [key] of specs) { const panel = node('section', 'sr-panel'); panel.id = 'sr-panel-' + key; panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', 'sr-tab-' + key); panel.hidden = key !== 'sheet'; page.append(panel); els.panels[key] = panel; }
      els.toasts = node('div', 'sr-toasts'); root.append(els.toasts);
      buildMapPanel(els.panels.map);
      sheet = ResearchSheet.mount(els.panels.sheet, { core, onOpenEntity: openEntity, onShowMap: showOnMap, onNotice: notice });
      top10 = ResearchTop10.mount(els.panels.top10, { core, config, embedded, onOpenEntity: openEntity, onShowMap: showOnMap, onNotice: notice });
    }
    function updateConnection() {
      const state=core.getState();
      if(state.mode==='error'&&state.connectionError&&els.lastConnectionError!==state.connectionError){els.lastConnectionError=state.connectionError;notice(state.connectionError,'error');}
      else if(state.mode!=='error')els.lastConnectionError='';
    }
    function selectControl(label,key){
      const control=ResearchUI.multiSelect(label,values=>{mapFilters[key]=values;renderMap();});
      els['filter_'+key]=control;return control.root;
    }
    function buildMapPanel(panel){
      const bar=node('div','sr-map-toolbar'),search=node('input','sr-map-search-input');search.type='search';search.placeholder='검색';search.setAttribute('aria-label','지도 검색');search.addEventListener('input',()=>{mapFilters.query=search.value;renderMap();});
      bar.append(search,selectControl('지역','region'),selectControl('업종','category'),selectControl('후보 목록','lists'),selectControl('공식 선정','recognition'),button('초기화',()=>{mapFilters.query='';for(const key of ['region','category','lists','recognition']){mapFilters[key]=[];els['filter_'+key].setValue([]);}search.value='';renderMap();},'sr-button subtle'));panel.append(bar);
      const workspace=node('div','sr-map-workspace'),frame=node('div','sr-map-frame'),mapNode=node('div','sr-map');mapNode.setAttribute('aria-label','상점 위치 지도');els.map=mapNode;
      const controls=node('div','sr-map-controls');controls.append(button('전체 보기',fitPoints));frame.append(mapNode,controls);
      const legend=node('div','sr-map-legend');for(const [label,color] of [['상점·브랜드','#8fb1c5'],['제작자·공방','#c7b383'],['전문가·기관','#baa2c9']]){const part=node('span'),dot=node('i');dot.style.background=color;part.append(dot,document.createTextNode(label));legend.append(part);}const starred=node('span','sr-legend-star','★ 내 저장');legend.append(starred);frame.append(legend);
      const listBox=node('section','sr-map-listbox'),listHead=node('div','sr-map-list-head');els.mapListTitle=node('strong');els.mapList=node('div','sr-map-list');listHead.append(els.mapListTitle);listBox.append(listHead,els.mapList);workspace.append(frame,listBox);panel.append(workspace);fillFilters();
    }
    function fillFilters(){
      const all=core.getState().entities,defs={region:[...new Set(all.map(e=>core.getRegion(e)))],category:[...new Set(all.map(e=>core.getCategory(e)))],lists:[...new Set(all.flatMap(e=>ResearchUI.listGroups(e)))],recognition:['서울 오래가게','백년가게','둘 다 선정']};
      for(const [key,values] of Object.entries(defs)){const control=els['filter_'+key];if(!control)continue;const signature=JSON.stringify(values);if(control.signature!==signature){control.signature=signature;control.setOptions(values);}control.setValue(mapFilters[key]);}
    }
    function mapEntities(){
      const q=norm(mapFilters.query);
      return core.getState().entities.filter(e=>(!q||norm([e.name,...arr(e.aliases),...arr(e.sites).map(s=>s.address),e.reason,e.popularityReason,...arr(e.research).map(r=>r.reason+' '+r.popularityReason)].join(' ')).includes(q))&&(!mapFilters.region.length||mapFilters.region.includes(core.getRegion(e)))&&(!mapFilters.category.length||mapFilters.category.includes(core.getCategory(e)))&&(!mapFilters.lists.length||ResearchUI.listGroups(e).some(v=>mapFilters.lists.includes(v)))&&(!mapFilters.recognition.length||mapFilters.recognition.some(v=>v==='둘 다 선정'?core.getRecognitionNames(e).length===2:core.getRecognitionNames(e).includes(v)))).sort((a,b)=>a.name.localeCompare(b.name,'ko'));
    }
    function initMap() {
      if (!window.L) { els.map.append(node('p', 'sr-map-error', '지도를 불러오지 못했습니다. 조사표에서 모든 기록을 확인할 수 있습니다.')); return; }
      map = L.map(els.map, { zoomControl: true, fadeAnimation: false, zoomAnimation: false, markerZoomAnimation: false }).setView([37.5772,126.9804],15);
      if (config.offlineMap?.image && Array.isArray(config.offlineMap.bounds)) L.imageOverlay(config.offlineMap.image, config.offlineMap.bounds, { pane: 'tilePane', attribution: config.offlineMap.attribution || '© OpenStreetMap contributors © CARTO' }).addTo(map);
      const tiles = config.map?.tileUrl || config.tileUrl || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      if (/^https?:/.test(tiles)) L.tileLayer(tiles, { maxZoom: 19, attribution: config.map?.attribution || '© OpenStreetMap contributors' }).addTo(map);
      layer = L.layerGroup().addTo(map); map.on('zoomend', renderMarkers); renderMap();
    }
    function pointColor(entity) { const type = text(core.getKind(entity)); return /제작|공방/.test(type) ? '#c7b383' : /전문|기관|공간/.test(type) ? '#baa2c9' : '#8fb1c5'; }
    function mapSites() { return mapEntities().flatMap(e => arr(e.sites).filter(coordinates).map(s => ({ e, s }))); }
    function fitPoints() { if (!map) return; const points = mapSites(); if (!points.length) return notice('선택한 목록에서 지도 위치를 찾을 수 없습니다.'); map.fitBounds(L.latLngBounds(points.map(p => [p.s.lat, p.s.lon])), { padding: [45,45], maxZoom: 17, animate: false }); }
    function renderMarkers() {
      if (!map || !layer || destroyed) return; layer.clearLayers();
      const zoom = map.getZoom(), radius = zoom < 17 ? 44 : zoom < 18 ? 32 : 0, groups = [];
      for (const value of mapSites().filter(v=>!core.isStarred(v.e.id))) { const point = map.project([value.s.lat,value.s.lon],zoom); let group = radius ? groups.find(g => Math.hypot(g.x-point.x,g.y-point.y) < radius) : groups.find(g => Math.abs(g.values[0].s.lat-value.s.lat) < 0.000005 && Math.abs(g.values[0].s.lon-value.s.lon) < 0.000005); if (!group) groups.push({x:point.x,y:point.y,values:[value]}); else { const n=group.values.length; group.x=(group.x*n+point.x)/(n+1);group.y=(group.y*n+point.y)/(n+1);group.values.push(value); } }
      for (const group of groups) { const values = group.values, multiple = values.length > 1, first = values[0]; const center = multiple ? map.unproject([group.x,group.y],zoom) : [first.s.lat,first.s.lon];
        if (multiple) { const label = node('div','sr-map-count',values.length); const marker = L.marker(center,{icon:L.divIcon({className:'sr-map-cluster',html:label.outerHTML,iconSize:[34,34],iconAnchor:[17,17]}),title:values.length+'개 지점'}); const popup=node('div','sr-map-popup');popup.append(node('strong','',values.length+'개 지점'));if(zoom<19)popup.append(button('이 구역 확대',()=>map.fitBounds(L.latLngBounds(values.map(v=>[v.s.lat,v.s.lon])),{maxZoom:Math.min(19,zoom+2),padding:[35,35],animate:false}),'sr-button'));for(const v of values)popup.append(button(v.e.name+(v.s.name&&v.s.name!==v.e.name?' · '+v.s.name:''),()=>{map.closePopup();openEntity(v.e.id);},'sr-map-popup-item'));marker.bindPopup(popup,{maxWidth:310});marker.addTo(layer); }
        else { const marker = L.circleMarker(center,{radius:8,color:'#202123',weight:2,fillColor:pointColor(first.e),fillOpacity:1}); marker.bindTooltip(first.e.name,{direction:'top',offset:[0,-10],className:'sr-place-tooltip'});marker.on('click',()=>openEntity(first.e.id));marker.addTo(layer); }
      }
      const starGroups=new Map();for(const value of mapSites().filter(v=>core.isStarred(v.e.id))){const key=value.s.lat.toFixed(6)+','+value.s.lon.toFixed(6);if(!starGroups.has(key))starGroups.set(key,[]);starGroups.get(key).push(value);}
      for(const values of starGroups.values()){const first=values[0],unique=[...new Map(values.map(v=>[v.e.id,v])).values()],label=node('div','sr-map-star','★');if(unique.length>1)label.append(node('span','sr-map-star-number',unique.length));const marker=L.marker([first.s.lat,first.s.lon],{zIndexOffset:1200,icon:L.divIcon({className:'sr-map-star-icon',html:label.outerHTML,iconSize:[24,24],iconAnchor:[12,12]}),title:unique.map(v=>v.e.name).join(' · ')});marker.bindTooltip(unique.map(v=>v.e.name).join(' · '),{direction:'top',offset:[0,-14],className:'sr-place-tooltip'});if(unique.length===1)marker.on('click',()=>openEntity(first.e.id));else{const popup=node('div','sr-map-popup');for(const v of unique)popup.append(button(v.e.name,()=>{map.closePopup();openEntity(v.e.id);},'sr-map-popup-item'));marker.bindPopup(popup,{maxWidth:310});}marker.addTo(layer);}
    }
    function renderMap(){
      if(!els.mapList)return;const list=mapEntities();els.mapListTitle.textContent=list.length+'곳';els.mapList.replaceChildren();
      for(const entity of list){const item=node('div','sr-map-list-entry'),row=button(entity.name,()=>openEntity(entity.id),'sr-map-list-row'+(entity.id===selected?' selected':''));row.title=entity.name;item.append(row,starButton(entity.id));els.mapList.append(item);}renderMarkers();
    }
    function showOnMap(id, siteId) {
      const entity=typeof id==='object'?id:core.getEntity(id);if(!entity)return;const site=typeof siteId==='object'?siteId:arr(entity.sites).find(s=>s.id===siteId&&coordinates(s))||arr(entity.sites).find(coordinates);if(!site)return notice('지도 위치가 아직 없습니다. 조사표의 주소 셀에서 위치를 확인해 주세요.');
      closeDrawer();navigate('map');mapFilters.query='';for(const key of ['region','category','lists','recognition'])mapFilters[key]=[];fillFilters();selected=entity.id;renderMap();setTimeout(()=>{if(map&&!destroyed)map.setView([site.lat,site.lon],18,{animate:false});},80);
    }
    function closeDrawer() { if(!drawer)return;const old=drawer;drawer=null;old.remove();document.body.style.overflow='';if(drawerReturn?.isConnected)drawerReturn.focus({preventScroll:true}); }
    function makeDrawer(title, subtitle) {
      closeDrawer();drawerReturn=document.activeElement;const overlay=node('div','sr-overlay'),pane=node('section','sr-drawer');pane.setAttribute('role','dialog');pane.setAttribute('aria-modal','true');const h=node('h2','',title);h.id='sr-detail-title';pane.setAttribute('aria-labelledby',h.id);const head=node('div','sr-drawer-head'),heading=node('div');heading.append(h);if(subtitle)heading.append(node('p','',subtitle));head.append(heading,button('닫기',closeDrawer,'sr-button subtle'));const body=node('div','sr-drawer-body');pane.append(head,body);overlay.append(pane);overlay.addEventListener('click',ev=>{if(ev.target===overlay)closeDrawer();});overlay.addEventListener('keydown',ev=>{if(ev.key==='Escape')closeDrawer();if(ev.key==='Tab'){const fs=[...pane.querySelectorAll('button,a,input,summary,[tabindex="0"]')].filter(e=>e.offsetParent!==null&&!e.disabled);const first=fs[0],last=fs.at(-1);if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last?.focus();}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first?.focus();}}});root.append(overlay);drawer=overlay;document.body.style.overflow='hidden';head.querySelector('button').focus();return body;
    }
    function section(title, parent) { const s=node('section','sr-detail-section');s.append(node('h3','',title));parent.append(s);return s; }
    function paragraph(parent,label,value) { if(!value)return;const block=node('div','sr-reading');if(label)block.append(node('strong','',label));block.append(node('p','',value));parent.append(block); }
    function rawNode(value, depth) {
      if(value==null)return node('span','','—');if(typeof value!=='object'){const s=text(value);return /^https?:\/\//.test(s)&&safeURL(s)?link(s,s):node('p','sr-raw-value',s);}
      const block=node('div','sr-raw');if(depth>7){block.textContent=JSON.stringify(value);return block;}
      const entries=Array.isArray(value)?value.map((v,i)=>[String(i+1),v]):Object.entries(value);
      for(const [key,v] of entries){if(v==null||v===''||['lat','lon','lng','coordinates','id'].includes(key))continue;const fold=node('details');fold.append(node('summary','',labels[key]||key),rawNode(v,depth+1));block.append(fold);}return block;
    }
    function openEntity(id) {
      const entity=core.getEntity(typeof id==='object'?id.id:id);if(!entity)return;selected=entity.id;const body=makeDrawer(entity.name,core.getKind(entity)+' · '+core.getCategory(entity));
      const actions=node('div','sr-detail-actions');actions.append(button('조사표에서 입력·수정',()=>openSheet(entity.id),'sr-button primary'),starButton(entity.id,'sr-star-button sr-detail-star'));body.append(actions);
      const entityLists=ResearchUI.listGroups(entity);if(entityLists.length)body.append(node('p','sr-detail-source',entityLists.join(' / ')));
      if(arr(entity.recognitions).length){const awards=section('오래가게·백년가게 선정 이력',body);for(const recognition of entity.recognitions){const item=node('div','sr-evidence');item.append(node('strong','',(recognition.program==='오래가게'?'서울 오래가게':recognition.program)+(recognition.designatedYear?' · '+recognition.designatedYear+'년':'')));if(recognition.designationNote)item.append(node('p','',recognition.designationNote));if(safeURL(recognition.designationSourceUrl))item.append(link('공식 선정 근거',recognition.designationSourceUrl));awards.append(item);}}
      const basic=section('위치·연락처',body);
      for(const site of arr(entity.sites)){const box=node('div','sr-detail-site');box.append(node('strong','',site.name||entity.name),node('p','',site.address||''));if(site.detail)box.append(node('p','sr-muted',site.detail));if(site.checkedAt&&['crosschecked','address_matched','building_address'].includes(site.coordinateStatus))box.append(node('small','sr-muted','주소 확인 '+date(site.checkedAt)));if(site.operatingStatus==='closed')box.append(node('small','sr-muted','영업 종료 기록'));const links=node('div','sr-detail-links');if(site.address)links.append(link('네이버 지도 검색','https://map.naver.com/p/search/'+encodeURIComponent(entity.name+' '+site.address)));if(safeURL(site.source))links.append(link('주소 확인 원문',site.source));box.append(links);basic.append(box);}
      const contacts=entity.contacts||{};for(const item of ResearchUI.linksOf(entity))basic.append(link(item.label,item.url));if(contacts.phone)paragraph(basic,'연락처',contacts.phone);
      const product=section('제품·경험',body);paragraph(product,'대표 제품·경험',entity.productSummary);paragraph(product,'가격대',entity.priceSummary);if(!entity.productSummary&&!entity.priceSummary)product.remove();
      const records=section('작성자별 조사기록',body);
      const research=arr(entity.research).slice().sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0));
      if(!research.length){paragraph(records,'추천 이유',entity.reason);paragraph(records,'인기 이유',entity.popularityReason);}
      for(const r of research){const card=node('article','sr-research-record');card.append(node('div','sr-record-author',(r.actor?.name||entity.sourceAuthor||r.author||'기초 조사')+(r.createdAt?' · '+date(r.createdAt):'')));paragraph(card,'추천 이유',r.reason);paragraph(card,'인기 이유',r.popularityReason);paragraph(card,'추가 의견',r.note);paragraph(card,'가격대',r.priceSummary);if(r.visited)card.append(node('small','sr-tag','직접 방문 기록'));if(safeURL(r.evidenceUrl))card.append(link('조사 근거 원문',r.evidenceUrl));for(const activity of arr(r.activities)){paragraph(card,'행사·프로그램',activity.title);paragraph(card,'기간',[activity.startDate,activity.endDate].filter(Boolean).join(' ~ '));if(safeURL(activity.url))card.append(link('행사 안내',activity.url));}records.append(card);}
      const evidence=section('주소·제품 확인에 사용한 출처',body);for(const entry of arr(entity.evidence)){const item=node('div','sr-evidence');item.append(link(entry.title||'원문',entry.url||entry));if(entry.checkedAt)item.append(node('small','sr-muted',date(entry.checkedAt)));if(entry.excerpt)item.append(node('p','',entry.excerpt));evidence.append(item);}if(!arr(entity.evidence).length)evidence.remove();
      if(arr(entity.legacyRefs).length){const raw=node('details','sr-original-fold');raw.append(node('summary','','이전 자료의 세부 내용·원문 보기'));for(const ref of entity.legacyRefs)raw.append(rawNode(ref.raw||ref,0));body.append(raw);}
    }
    function openReference(){
      const body=makeDrawer('공예 행사·기관 조사');drawer.classList.add('sr-reference-overlay');const pane=drawer.querySelector('.sr-drawer');pane.classList.add('sr-reference-dialog');body.classList.add('sr-reference-body');
      const evidence=new Map();function index(value){if(!value||typeof value!=='object')return;if(value.id&&safeURL(value.url))evidence.set(value.id,value);for(const child of Object.values(value))if(child&&typeof child==='object')Array.isArray(child)?child.forEach(index):index(child);}index(seed.sourceArchive);
      const toc=node('nav','sr-reference-toc'),content=node('div','sr-reference-content');toc.setAttribute('aria-label','공예 조사 목차');body.append(toc,content);
      const refs=seed.references||{},sections=[];
      function addSection(title,level=2){const item=node('section','sr-reference-section');item.id='sr-ref-'+sections.length;item.append(node(level===2?'h2':'h3','',title));content.append(item);sections.push({title,id:item.id,level});return item;}
      function cite(parent,ids){const links=node('div','sr-citations');for(const id of [...new Set(arr(ids))]){const ev=evidence.get(id);if(ev)links.append(link(ev.title||'출처',ev.url));}if(links.children.length)parent.append(links);}
      function facts(parent,items){if(!arr(items).length)return;const ul=node('ul','sr-reference-facts');for(const fact of items){const li=node('li');if(typeof fact==='string'){li.textContent=fact;}else{li.append(node('span','',fact.text||fact.summary||''));if(fact.status&&fact.status!=='confirmed')li.append(node('span','sr-fact-status',({reported:'보도',inference:'분석',unverified:'미확인'})[fact.status]||fact.status));cite(li,fact.evidenceIds);}ul.append(li);}parent.append(ul);}
      function dataTable(parent,headers,rows){if(!rows.length)return;const table=node('table','sr-reference-table'),thead=node('thead'),tr=node('tr');headers.forEach(h=>tr.append(node('th','',h)));thead.append(tr);const tbody=node('tbody');rows.forEach(row=>{const r=node('tr');row.forEach(value=>{const td=node('td');if(value instanceof Node)td.append(value);else td.textContent=text(value);r.append(td);});tbody.append(r);});table.append(thead,tbody);parent.append(table);}
      const fair=refs.fair||{};let s=addSection('공예트렌드페어');facts(s,fair.summary);
      s=addSection('주요 변화',3);for(const row of arr(fair.timeline)){const group=node('article','sr-reference-item');group.append(node('h4','',row.year+' · '+row.title));facts(group,row.facts);s.append(group);}
      s=addSection('판매·사업화 근거',3);for(const row of arr(fair.signals)){s.append(node('h4','',row.title));facts(s,row.facts);}
      s=addSection('제작자 후보',3);for(const row of arr(fair.candidates)){const card=node('article','sr-reference-item');card.append(node('h4','',row.name),node('p','sr-reference-product',row.product));paragraph(card,'선정 이유',row.reason);paragraph(card,'2026년 참가',row.status2026);facts(card,row.facts);s.append(card);}facts(s,fair.outlook);
      const org=refs.organization||{};s=addSection(org.name||'인사전통문화보존회');facts(s,org.summary);
      for(const part of arr(org.sections)){const title=({identity:'조직·의사결정',delivery:'주요 운영 실적',finance:'예산·수탁사업',staff:'인력·고용 현황',influence:'지역 내 영향력',reputation:'외부 평가',assessment:'외부 평가'})[part.id]||part.title;s=addSection(title,3);dataTable(s,['항목','확인 내용','기준'],arr(part.rows).map(row=>[row.label,row.value,row.basis]));facts(s,part.facts);}
      s=addSection('협업 역할',3);for(const row of arr(org.collaboration)){const item=node('article','sr-reference-item');item.append(node('h4','',row.role));paragraph(item,'역할',row.scope);paragraph(item,'운영 조건',row.control);cite(item,row.evidenceIds);s.append(item);}facts(s,org.requests);
      const history=org.historicalCase;if(history){s=addSection('1997년 문화장터: 계획과 실행',3);facts(s,history.summary);dataTable(s,['당시 계획','실제 시행','평가'],arr(history.items).map(row=>[row.proposal,row.implementation,row.evaluation]));for(const row of arr(history.items))cite(s,row.evidenceIds);if(safeURL(history.articleUrl))s.append(link('당시 기사',history.articleUrl));facts(s,history.conclusion||history.implications||[]);}
      s=addSection('KCDF 공예문화');const publications=arr(refs.publications);s.append(node('p','sr-reference-product',publications.length+'개 발행 자료'));const years=[...new Set(publications.map(p=>text(p.postedAt||p.publicationDate||'날짜 미상').slice(0,4)))].sort().reverse();for(const year of years){const details=node('details','sr-publication-year');details.open=year===years[0];details.append(node('summary','',year));for(const pub of publications.filter(p=>text(p.postedAt||p.publicationDate||'날짜 미상').slice(0,4)===year)){const row=node('article','sr-publication');row.append(link(pub.title,pub.detailUrl||pub.sourceUrl),node('span','sr-publication-date',text(pub.postedAt||pub.publicationDate)+(pub.pageCount?' · '+pub.pageCount+'쪽':'')));if(safeURL(pub.pdfUrl))row.append(link('PDF',pub.pdfUrl));if(arr(pub.reviewNotes).length){const fold=node('details');fold.append(node('summary','','조사 메모'));facts(fold,pub.reviewNotes);row.append(fold);}details.append(row);}s.append(details);}
      for(const entry of sections){const b=button(entry.title,()=>{content.querySelector('#'+entry.id)?.scrollIntoView({behavior:'smooth',block:'start'});},'sr-reference-toc-link'+(entry.level===3?' sub':''));toc.append(b);}
    }
    buildShell();
    const unsubscribe=core.subscribe((state,info)=>{if(destroyed)return;updateConnection();if(info?.starsChanged)root.querySelectorAll('.sr-star-button[data-star-id]').forEach(b=>setStarAppearance(b,b.dataset.starId));if(info?.entitiesChanged||info?.starsChanged||info?.kind==='star'||info?.kind==='bookmark'){fillFilters();if(currentTab==='map')renderMap();}});
    navigate('sheet');updateConnection();core.start();
    const instance={core,navigate,openEntity,showOnMap,getState:()=>core.getState(),destroy(){if(destroyed)return;destroyed=true;closeDrawer();unsubscribe();sheet.destroy();top10.destroy();for(const key of ['region','category','lists','recognition'])els['filter_'+key]?.destroy();if(map){map.stop();map.remove();}core.destroy();root.remove();delete target.__songhyeonResearch;}};
    target.__songhyeonResearch=instance;return instance;
  }
  window.SonghyeonResearch={mount};
  if(!window.RESEARCH_DISABLE_AUTOMOUNT){const target=document.getElementById('research-app');if(target){const config=readJSON('research-config',{});if(new URLSearchParams(location.search).get('preview')==='local')config.mode='local';window.ResearchApp=mount(target,{config});}}
})();
