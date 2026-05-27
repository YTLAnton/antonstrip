// Sprint-001 PWA Service Worker — 2026_05_Singapore
// 產出於 generator step 5；CACHE_VERSION 升版即可作廢舊快取。
// 同 origin scope = './'，cache-first；跨 origin（字型 / 天氣圖示 / 地圖）= network-first。

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `pwa-2026-05-singapore-${CACHE_VERSION}`;

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './img/1887 by André-2.webp',
  './img/1887 by André.jpg',
  './img/Amara singapore.jpg',
  './img/BON BROTH.jpg',
  './img/BON BROTH2.jpg',
  './img/BR216.jpg',
  './img/BR225.jpg',
  './img/Burnt Ends.jpg',
  './img/Dopamine Land.jpg',
  './img/Harry Potter Visions of Magic.jpg',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/Jewel Changi.png',
  './img/Jewel Changi_waterfall.jpg',
  './img/KeSa House.jpg',
  './img/Le Matin Petit-2.png',
  './img/Le Matin Petit.png',
  './img/Marina Bay Sands Casino-2.webp',
  './img/Marina Bay Sands Casino.webp',
  './img/marinabay.jpg',
  './img/National Gallery Singapore.jpg',
  './img/National Museum of Singapore.jpeg',
  './img/Nutmeg & Clove.jpg',
  './img/OSC.png',
  './img/OSC2.png',
  './img/Raffles boutique.jpg',
  './img/Raffles City Shopping Centre.jpg',
  './img/Raffles History Tour.jpg',
  './img/simplekaffa.jpeg',
  './img/SIN T3.png',
  './img/SIN.png',
  "./img/St Andrew's Cathedral.jpg",
  './img/The Arts House.png',
  './img/The Slide.png',
  './img/the Slide_logo.png',
  './img/YaKun.jpg',
  './img/YY Kafei Dian.jpg'
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
        keys.filter((k) => k.startsWith('pwa-2026-05-singapore-') && k !== CACHE_NAME)
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
