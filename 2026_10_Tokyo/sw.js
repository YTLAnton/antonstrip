// Sprint-001 PWA Service Worker — 2026_10_Tokyo
// CACHE_VERSION 升版即可作廢舊快取（activate 時清除）。
// 同 origin scope = './'：network-first（繞過 HTTP 快取，成功即更新快取；離線才用快取，
// 導覽請求連快取都沒有則回 index.html）；跨 origin（字型 / 天氣圖示 / 地圖）同為 network-first。

const CACHE_VERSION = 'v1.1.0';
const CACHE_NAME = `pwa-2026-10-tokyo-${CACHE_VERSION}`;

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './itinerary.md',
  './img/icon-192.png',
  './img/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('[SW] precache failed:', err);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('pwa-2026-10-tokyo-') && k !== CACHE_NAME)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (!isSameOrigin) {
    // 跨 origin：network-first with cache fallback（字型 / 天氣 / 地圖）
    event.respondWith(
      fetch(req)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
          return resp;
        })
        .catch(() => caches.match(req).then((cached) => cached || Response.error()))
    );
    return;
  }

  // 同 origin：network-first（no-cache 避開 HTTP 快取拿到舊檔）
  event.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then((resp) => {
        if (resp && resp.status === 200 && resp.type === 'basic') {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return resp;
      })
      .catch(() => caches.match(req).then((cached) => {
        if (cached) return cached;
        if (req.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      }))
  );
});
