// Sprint-001 PWA Service Worker — 2026_04_HK
// 產出於 generator step 5；CACHE_VERSION 升版即可作廢舊快取。
// 同 origin scope = './'，cache-first；跨 origin（字型 / 天氣圖示 / 地圖）= network-first。

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `pwa-2026-04-hk-${CACHE_VERSION}`;

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './img/Bar Leone.jpg',
  './img/Horlick(2025).JPG',
  './img/Horlick(light).JPG',
  './img/Horlick.jpg',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/LauSumKee.jpg',
  './img/M+.jpg',
  './img/MORA.jpg',
  './img/前九廣鐵路鐘樓.jpg',
  './img/古埃及文明大展──埃及博物館珍藏.jpg',
  './img/坂本龍一觀音‧聽時.jpg',
  './img/天星小輪.jpg',
  './img/文記車仔麵.jpg',
  './img/新興食家.jpg',
  './img/星光大道.jpg',
  './img/普特曼酒店.jpg',
  './img/維多利亞港.jpg',
  './img/陳意齋.jpg',
  './img/香港故宮.jpg',
  './img/鹽田千春：無限記憶.jpg'
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
        keys.filter((k) => k.startsWith('pwa-2026-04-hk-') && k !== CACHE_NAME)
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
