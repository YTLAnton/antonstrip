// Sprint-001 PWA Service Worker — 2026_07_AKAME
// 產出於 generator step 5；CACHE_VERSION 升版即可作廢舊快取。
// 同 origin scope = './'，cache-first；跨 origin（字型 / 天氣圖示 / 地圖）= network-first。

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `pwa-2026-07-akame-${CACHE_VERSION}`;

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './img/AKAME.png',
  './img/AKAME_inside.png',
  './img/BENZ.png',
  './img/Dashe.png',
  './img/Dashe_menu.png',
  './img/HSR_KAOSHIONG.png',
  './img/HSR_TAIPEI.png',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/IRIMUMU.png',
  './img/MATHARIRI.png',
  './img/mathariri_inside.png',
  './img/Rinari.png',
  './img/Rinari_front.png',
  './img/Rinari_guide.png',
  './img/Riniri_stay.png',
  './img/Sranger thing dnd.png',
  './img/TRPG.png'
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
        keys.filter((k) => k.startsWith('pwa-2026-07-akame-') && k !== CACHE_NAME)
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

  // 同 origin：cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((resp) => {
          if (resp && resp.status === 200 && resp.type === 'basic') {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return resp;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
