/*
 * Native-host loader for the supplied classic IIFE modules.
 * This file is an ES module for the host bundler. No React dependency.
 * See HOST_INTEGRATION.md before use.
 */

const scriptLoads = new Map();
const styleLoads = new Map();
const mountedElements = new WeakMap();

function checkCancelled(signal) {
  if (signal?.aborted) throw new DOMException('화면 연결이 취소되었습니다.', 'AbortError');
}

function getAssetBase(value) {
  if (!value) throw new Error('상점 조사 파일을 제공할 호스트 경로 assetBase가 필요합니다.');
  const base = new URL(value.endsWith('/') ? value : `${value}/`, window.location.href);
  if (!/^https?:$/.test(base.protocol) || base.origin !== window.location.origin) {
    throw new Error('assetBase는 기존 TF 사이트와 같은 origin의 HTTP(S) 경로여야 합니다.');
  }
  return base;
}

function loadStyle(url) {
  const href = String(url);
  if (styleLoads.has(href)) return styleLoads.get(href);
  const existing = [...document.querySelectorAll('link[rel="stylesheet"]')]
    .find(link => link.href === href);
  if (existing?.sheet) return Promise.resolve();
  const promise = new Promise((resolve, reject) => {
    const link = existing || document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener('error', () => {
      styleLoads.delete(href);
      if (!existing) link.remove();
      reject(new Error(`상점 조사 스타일을 불러오지 못했습니다: ${new URL(href).pathname}`));
    }, { once: true });
    if (!existing) document.head.append(link);
  });
  styleLoads.set(href, promise);
  return promise;
}

function loadScript(url) {
  const src = String(url);
  if (scriptLoads.has(src)) return scriptLoads.get(src);
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.charset = 'utf-8';
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => {
      scriptLoads.delete(src);
      script.remove();
      reject(new Error(`상점 조사 코드를 불러오지 못했습니다: ${new URL(src).pathname}`));
    }, { once: true });
    document.head.append(script);
  });
  scriptLoads.set(src, promise);
  return promise;
}

async function readJSON(url) {
  const response = await fetch(url, { credentials: 'same-origin', cache: 'no-cache' });
  if (!response.ok) throw new Error(`상점 조사 파일을 읽지 못했습니다: ${response.status}`);
  return response.json();
}

async function readSeed(url) {
  const response = await fetch(url, { credentials: 'same-origin', cache: 'no-cache' });
  if (!response.ok) throw new Error(`최초 조사자료를 읽지 못했습니다: ${response.status}`);
  const bytes = await response.arrayBuffer();
  if (!window.crypto?.subtle) {
    throw new Error('자료 버전 확인에는 HTTPS 또는 localhost 실행 환경이 필요합니다.');
  }
  const digest = new Uint8Array(await window.crypto.subtle.digest('SHA-256', bytes));
  const seedHash = [...digest].map(value => value.toString(16).padStart(2, '0')).join('');
  return { seed: JSON.parse(new TextDecoder().decode(bytes)), seedHash };
}

/**
 * @param {HTMLElement} container Existing host layout's content element.
 * @param {object} options
 * @param {string} options.assetBase Same-origin path serving this package's assets.
 * @param {object=} options.seed Optional already-loaded seed. Requires config.seedHash.
 * @param {object=} options.config apiBase, seedHash, pollMs, offlineMap, etc.
 * @param {object=} options.adapter Existing host service adapter; see API_AND_DATA.md.
 * @param {boolean=} options.includeVendorStyles False only if host supplies font/Leaflet CSS.
 * @param {AbortSignal=} options.signal Cancels a route mount before it touches the content DOM.
 * @returns {Promise<{core: object, navigate: Function, openEntity: Function, destroy: Function}>}
 */
export async function mountResearchInHost(container, options = {}) {
  checkCancelled(options.signal);
  if (!(container instanceof HTMLElement)) {
    throw new Error('기존 TF 레이아웃의 콘텐츠 element를 전달해야 합니다.');
  }
  if (mountedElements.has(container)) {
    throw new Error('이 콘텐츠 element에는 상점 조사 화면이 이미 연결되어 있습니다.');
  }
  const base = getAssetBase(options.assetBase);
  const config = { apiBase: '/api/insadong-research', pollMs: 8000, mode: 'auto', ...options.config, demoStars: false, demoTop10: false };
  // app.js must not auto-mount the standalone shell when used in an existing host.
  window.RESEARCH_DISABLE_AUTOMOUNT = true;
  const styles = options.includeVendorStyles === false ? [] : ['vendor.css'];
  styles.push('app.css', 'sheet.css', 'top10.css');

  const seedPromise = options.seed
    ? Promise.resolve({ seed: options.seed, seedHash: config.seedHash })
    : readSeed(new URL('seed.json', base));
  const mapPromise = config.offlineMap
    ? Promise.resolve(config.offlineMap)
    : readJSON(new URL('offline-map.json', base));
  const loaded = await Promise.all([
    seedPromise,
    mapPromise,
    Promise.all(styles.map(file => loadStyle(new URL(file, base))))
  ]);
  checkCancelled(options.signal);
  const { seed, seedHash } = loaded[0];
  if (!seedHash) {
    throw new Error('이미 읽은 seed를 전달할 때는 같은 원본 파일의 config.seedHash도 필요합니다.');
  }
  if (config.seedHash && config.seedHash !== seedHash) {
    throw new Error('설정한 seedHash와 최초 조사자료 버전이 일치하지 않습니다.');
  }
  config.seedHash = seedHash;
  config.offlineMap = loaded[1];

  if (!window.L) await loadScript(new URL('vendor.js', base));
  for (const file of ['domain.js', 'core.js', 'sheet.js', 'top10.js', 'app.js']) {
    checkCancelled(options.signal);
    await loadScript(new URL(file, base));
  }
  checkCancelled(options.signal);
  if (!window.SonghyeonResearch?.mount) {
    throw new Error('SonghyeonResearch.mount를 불러오지 못했습니다. 파일 버전과 실행 순서를 확인하세요.');
  }
  // The same container may have been mounted while assets were loading.
  if (mountedElements.has(container)) {
    throw new Error('이 콘텐츠 element에 중복 mount 요청이 발생했습니다.');
  }
  const instance = window.SonghyeonResearch.mount(container, {
    seed, config, embedded: true, adapter: options.adapter
  });
  let destroyed = false;
  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    instance.destroy();
    mountedElements.delete(container);
  };
  const view = { ...instance, destroy };
  mountedElements.set(container, view);
  return view;
}
