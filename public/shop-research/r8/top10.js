/* STAR uses shared per-user selections. Examples never enter core state or storage. */
(function () {
  'use strict';
  const mounted = new WeakMap();
  const array = value => Array.isArray(value) ? value : [];
  const el = (tag, cls, text) => { const node = document.createElement(tag); if (cls) node.className = cls; if (text != null) node.textContent = String(text); return node; };
  const button = (label, cls, action, ariaLabel) => { const node = el('button', cls, label); node.type = 'button'; if (ariaLabel) node.setAttribute('aria-label', ariaLabel); if (action) node.addEventListener('click', action); return node; };
  const actorOf = state => state.actor || state.session || { id: '', name: '', role: 'viewer' };
  const mapSite = entity => array(entity?.sites).find(site => site.mapVisible !== false && typeof site.lat === 'number' && typeof site.lon === 'number' && Number.isFinite(site.lat) && Number.isFinite(site.lon) && Math.abs(site.lat) <= 90 && Math.abs(site.lon) <= 180) || null;
  function activeStars(stars, core) {
    const seen = new Set();
    return array(stars).filter(star => { const key = String(star.actor?.id || '') + '\0' + String(star.entityId || ''); if (!star.actor?.id || !core.getEntity(star.entityId) || seen.has(key)) return false; seen.add(key); return true; });
  }
  function aggregate(stars, core) {
    const pool = new Map(), users = new Set();
    for (const star of activeStars(stars, core)) {
      const entity = core.getEntity(star.entityId); users.add(star.actor.id);
      if (!pool.has(entity.id)) pool.set(entity.id, { entityId: entity.id, name: entity.name, count: 0, actors: [] });
      const entry = pool.get(entity.id); entry.count++; entry.actors.push(star.actor);
    }
    const all = [...pool.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ko') || a.entityId.localeCompare(b.entityId));
    all.forEach((entry, index) => { entry.rank = index + 1; });
    return { entries: all.slice(0, 10), all, participants: users.size, selections: [...pool.values()].reduce((sum, entry) => sum + entry.count, 0) };
  }
  function makeDemoStars(entities) {
    const mapped = array(entities).filter(entity => { const site = mapSite(entity); return site && site.lat >= 37.565 && site.lat <= 37.59 && site.lon >= 126.955 && site.lon <= 127.005; });
    const preferred = ['거안', '광주요', '국제자수원', '납청놋전', '노화랑', '아원공방', '온지음', '통인가게', '호호당', '동양한지', '금박연', '동림매듭공방', '북촌목공예공방', '비원떡집', '청원산방', '통문관'];
    const pool = [], seen = new Set();
    for (const name of preferred) { const entity = mapped.find(item => item.name === name); if (entity && !seen.has(entity.id)) { seen.add(entity.id); pool.push(entity); } }
    for (const entity of mapped.slice().sort((a, b) => String(a.id).localeCompare(String(b.id)))) { if (!seen.has(entity.id)) { seen.add(entity.id); pool.push(entity); } if (pool.length >= 22) break; }
    let seed = 20261020;
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
    const shuffle = values => { const next = [...values]; for (let i = next.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [next[i], next[j]] = [next[j], next[i]]; } return next; };
    return ['A', 'B', 'C'].flatMap((letter, index) => {
      const selected = [...pool.slice(0, 4), ...shuffle(pool.slice(4))].slice(0, 12 + index * 2);
      return selected.map(entity => ({ entityId: entity.id, actor: { id: 'demo-star-' + letter.toLowerCase(), name: '예시 팀원 ' + letter, role: 'demo' }, createdAt: null, demo: true }));
    });
  }
  function mount(container, options) {
    if (!container || !options?.core) throw new Error('STAR 화면에 core가 필요합니다.');
    if (mounted.has(container)) mounted.get(container).destroy();
    const core = options.core, config = options.config || {}, embedded = options.embedded === true;
    let state = core.getState(), view = 'mine', selectedPersonId = actorOf(state).id, destroyed = false;
    let map = null, layer = null, mapSignature = '', updateMapFrame = null, demoCache = [], demoPoolSignature = '';
    const refs = {}, modeButtons = {}, busy = new Set(), cleanup = [];
    const notify = text => options.onNotice?.(text, 'error');
    const writable = () => ['local', 'shared'].includes(state.mode) && actorOf(state).role !== 'viewer';
    const metadata = entity => [core.getRegion?.(entity), core.getCategory?.(entity)].filter(Boolean).join(' · ');
    const openEntity = id => options.onOpenEntity?.(id);
    const actualStars = () => activeStars(state.stars, core);
    function displayedStars() {
      const actual = actualStars();
      const allowed = !embedded && config.demoTop10 !== false && config.demoStars !== false && (state.mode === 'local' || state.serverMode === 'local-reference');
      if (actual.length || !allowed) return { stars: actual, demo: false };
      const key = state.entities.map(entity => entity.id).join('|');
      if (key !== demoPoolSignature) { demoPoolSignature = key; demoCache = makeDemoStars(state.entities); }
      return { stars: demoCache, demo: demoCache.length > 0 };
    }
    function peopleOf(stars) {
      const people = new Map();
      for (const star of stars) { if (!people.has(star.actor.id)) people.set(star.actor.id, { actor: star.actor, count: 0 }); people.get(star.actor.id).count++; }
      return [...people.values()].sort((a, b) => (a.actor.id === actorOf(state).id ? -1 : b.actor.id === actorOf(state).id ? 1 : String(a.actor.name).localeCompare(String(b.actor.name), 'ko') || a.actor.id.localeCompare(b.actor.id)));
    }
    function personName(actor, stars) {
      if (!actor) return '팀원';
      let name = actor.name || '작성자 미기록';
      if (new Set(stars.filter(star => star.actor.name === actor.name).map(star => star.actor.id)).size > 1) name += ' · ' + actor.id.slice(-6);
      return name + (actor.id === actorOf(state).id ? ' (나)' : '');
    }
    function selectedPerson(stars) {
      const people = peopleOf(stars);
      if (!people.some(person => person.actor.id === selectedPersonId)) selectedPersonId = people[0]?.actor.id || '';
      return people.find(person => person.actor.id === selectedPersonId) || null;
    }
    function personalEntries(stars, actorId) {
      return stars.filter(star => star.actor.id === actorId).map(star => ({ entityId: star.entityId })).sort((a, b) => core.getEntity(a.entityId).name.localeCompare(core.getEntity(b.entityId).name, 'ko') || a.entityId.localeCompare(b.entityId));
    }
    function viewEntries(source) {
      if (view === 'team') return aggregate(source.stars, core).entries;
      if (view === 'people') return personalEntries(source.stars, selectedPerson(source.stars)?.actor.id);
      return personalEntries(actualStars(), actorOf(state).id);
    }
    async function toggleStar(id) {
      if (!writable() || busy.has(id) || !core.getEntity(id)) return;
      busy.add(id); updateStarButtons();
      try { const result = await core.toggleStar(id); if (!result?.ok) notify(result?.error?.message || '선택을 저장하지 못했습니다.'); }
      catch (error) { notify(error?.message || '선택을 저장하지 못했습니다.'); }
      finally { busy.delete(id); if (!destroyed) { state = core.getState(); render(); } }
    }
    function updateStarButtons() {
      if (destroyed || !refs.list) return;
      for (const node of refs.list.querySelectorAll('.r10-star')) {
        const id = node.dataset.entityId, entity = core.getEntity(id), starred = core.isStarred(id);
        node.textContent = starred ? '★' : '☆'; node.classList.toggle('is-starred', starred); node.disabled = busy.has(id) || !writable(); node.setAttribute('aria-pressed', String(starred)); node.setAttribute('aria-label', (starred ? '저장 해제 · ' : '저장 · ') + (entity?.name || '')); node.title = starred ? '저장 해제' : '저장';
      }
    }
    function renderToolbar(source, entries) {
      for (const key of Object.keys(modeButtons)) { modeButtons[key].classList.toggle('active', view === key); modeButtons[key].setAttribute('aria-pressed', String(view === key)); }
      refs.demo.hidden = view === 'mine' || !source.demo;
      refs.personWrap.hidden = view !== 'people'; refs.person.replaceChildren();
      if (view === 'people') selectedPerson(source.stars);
      for (const person of peopleOf(source.stars)) { const option = el('option', '', personName(person.actor, source.stars) + ' · ' + person.count + '곳'); option.value = person.actor.id; refs.person.append(option); }
      refs.person.value = selectedPersonId;
      refs.title.textContent = view === 'mine' ? '내 저장' : view === 'team' ? '팀 TOP 10' : personName(selectedPerson(source.stars)?.actor, source.stars) + ' 저장';
      refs.count.textContent = view === 'team' ? aggregate(source.stars, core).participants + '명' : entries.length + '곳';
    }
    function renderList(source, entries) {
      refs.list.replaceChildren();
      if (!entries.length) { refs.list.append(el('div', 'r10-empty', '0곳')); return; }
      const list = el('ol', 'r10-list'); list.classList.toggle('is-team', view === 'team');
      for (const entry of entries) {
        const entity = core.getEntity(entry.entityId); if (!entity) continue;
        const row = el('li', 'r10-row'); row.dataset.entityId = entity.id;
        if (view === 'team') row.append(el('span', 'r10-rank', entry.rank));
        const body = el('div', 'r10-row-body'), heading = el('div', 'r10-row-heading');
        heading.append(button(entity.name, 'r10-name', () => openEntity(entity.id)));
        if (view === 'team') heading.append(el('span', 'r10-score', entry.count + '명'));
        body.append(heading, el('div', 'r10-meta', metadata(entity)));
        if (view === 'team') {
          const detail = el('details', 'r10-people'); detail.append(el('summary', '', '팀원'));
          for (const actor of entry.actors.slice().sort((a, b) => String(a.name).localeCompare(String(b.name), 'ko'))) detail.append(el('span', 'r10-person-name', personName(actor, source.stars)));
          body.append(detail);
        }
        const star = button('☆', 'r10-star', () => toggleStar(entity.id)); star.dataset.entityId = entity.id;
        row.append(body, star); list.append(row);
      }
      refs.list.append(list); updateStarButtons();
    }
    function initMap() {
      if (map || destroyed || !window.L) return;
      map = L.map(refs.map, { zoomControl: true, fadeAnimation: false, zoomAnimation: false, markerZoomAnimation: false }).setView([37.5768, 126.9821], 15);
      if (config.offlineMap?.image && Array.isArray(config.offlineMap.bounds)) L.imageOverlay(config.offlineMap.image, config.offlineMap.bounds, { pane: 'tilePane', attribution: config.offlineMap.attribution || '© OpenStreetMap contributors © CARTO' }).addTo(map);
      const tileURL = config.map?.tileUrl || config.tileUrl || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      if (/^https?:/.test(tileURL)) L.tileLayer(tileURL, { maxZoom: 19, attribution: config.map?.attribution || '© OpenStreetMap contributors' }).addTo(map);
      layer = L.layerGroup().addTo(map);
    }
    function renderMap(force) {
      if (destroyed || container.hidden || !container.offsetWidth) return;
      initMap(); if (!map || !layer) return;
      const source = displayedStars(), points = viewEntries(source).map(entry => ({ entry, entity: core.getEntity(entry.entityId), site: mapSite(core.getEntity(entry.entityId)) })).filter(point => point.site);
      const key = JSON.stringify([view, selectedPersonId, points.map(point => [point.entity.id, point.entry.rank, point.site.lat, point.site.lon])]);
      map.invalidateSize({ animate: false });
      if (key === mapSignature && !force) return;
      mapSignature = key; layer.clearLayers();
      const grouped = new Map();
      for (const point of points) { const key = point.site.lat.toFixed(5) + ',' + point.site.lon.toFixed(5); const group = grouped.get(key) || []; group.push(point); grouped.set(key, group); }
      for (const group of grouped.values()) {
        const point = group[0], label = view === 'team' ? String(point.entry.rank) : '★';
        const icon = el('span', 'r10-pin' + (view === 'team' ? '' : ' is-star'), label);
        if (group.length > 1) icon.append(el('span', 'r10-pin-count', String(group.length)));
        const names = group.map(item => (view === 'team' ? item.entry.rank + '위 · ' : '') + item.entity.name);
        const marker = L.marker([point.site.lat, point.site.lon], { icon: L.divIcon({ className: 'r10-map-marker', html: icon.outerHTML, iconSize: [24, 24], iconAnchor: [12, 12] }), title: names.join(' / ') });
        const popup = el('div', 'r10-map-popup');
        group.forEach((value, index) => popup.append(button(names[index], 'r10-popup-name', () => openEntity(value.entity.id))));
        marker.bindPopup(popup); marker.bindTooltip(el('span', '', names.join(' / ')), {direction:'top',offset:[0,-14],className:'sr-place-tooltip'}); marker.addTo(layer);
      }
      refs.mapCount.textContent = points.length + '곳';
      if (points.length) map.fitBounds(L.latLngBounds(points.map(point => [point.site.lat, point.site.lon])), { padding: [40, 40], maxZoom: 17, animate: false });
      else map.setView([37.5768, 126.9821], 15, { animate: false });
    }
    function scheduleMap(force) { if (updateMapFrame) cancelAnimationFrame(updateMapFrame); updateMapFrame = requestAnimationFrame(() => { updateMapFrame = null; if (!destroyed) renderMap(force); }); }
    function render() { if (destroyed) return; const source = displayedStars(), entries = viewEntries(source); renderToolbar(source, entries); renderList(source, entries); scheduleMap(true); }
    function build() {
      container.classList.add('r10-root'); container.replaceChildren();
      const toolbar = el('div', 'r10-toolbar'), modes = el('div', 'r10-mode-buttons'); modes.setAttribute('role', 'group'); modes.setAttribute('aria-label', '저장 목록 보기');
      for (const [key, label] of [['mine', '내 저장'], ['team', '팀 TOP 10'], ['people', '팀원별 저장']]) { const node = button(label, 'r10-mode-button', () => { view = key; render(); }); modeButtons[key] = node; modes.append(node); }
      refs.personWrap = el('label', 'r10-person-select-label'); refs.person = el('select', 'r10-person-select'); refs.person.setAttribute('aria-label', '팀원 선택'); refs.person.addEventListener('change', () => { selectedPersonId = refs.person.value; render(); }); refs.personWrap.append(refs.person);
      refs.demo = el('span', 'r10-demo-label', '예시 데이터'); refs.demo.hidden = true; toolbar.append(modes, refs.personWrap, refs.demo); container.append(toolbar);
      const workspace = el('div', 'r10-workspace'), mapFrame = el('div', 'r10-map-frame'); refs.map = el('div', 'r10-map'); refs.map.setAttribute('aria-label', '저장한 상점 지도'); refs.mapCount = el('span', 'r10-map-count');
      mapFrame.append(refs.map, refs.mapCount, button('전체 보기', 'r10-map-fit', () => renderMap(true)));
      const panel = el('section', 'r10-panel'), head = el('div', 'r10-head'); refs.title = el('h3'); refs.count = el('span', 'r10-count'); head.append(refs.title, refs.count); refs.list = el('div', 'r10-rows'); refs.list.setAttribute('aria-label', '저장 목록'); panel.append(head, refs.list); workspace.append(mapFrame, panel); container.append(workspace);
    }
    build(); const unsubscribe = core.subscribe(() => { state = core.getState(); render(); }); render();
    if (typeof ResizeObserver !== 'undefined') { const observer = new ResizeObserver(() => scheduleMap(false)); observer.observe(refs.map); cleanup.push(() => observer.disconnect()); }
    const api = { show() { if (!destroyed) scheduleMap(true); }, destroy() { if (destroyed) return; destroyed = true; unsubscribe(); cleanup.forEach(fn => fn()); if (updateMapFrame) cancelAnimationFrame(updateMapFrame); if (map) { map.stop(); map.remove(); } container.replaceChildren(); container.classList.remove('r10-root'); mounted.delete(container); } };
    mounted.set(container, api); return api;
  }
  window.ResearchTop10 = { mount, aggregate, makeDemoStars, activeStars };
}());
