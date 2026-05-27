"""
Generate sw.js for each of the 4 trips.

For each trip:
- Enumerate img/*.{jpg,jpeg,png,webp} under the trip folder
- Build precache manifest: ['./', './index.html', './manifest.json', './img/icon-192.png',
                             './img/icon-512.png', plus all enumerated images]
- Emit ./<trip>/sw.js with CACHE_VERSION = 'v1.0.0'

Strategy:
- install: addAll(PRECACHE)
- activate: delete caches not matching current CACHE_VERSION
- fetch:
    - non-GET → bypass
    - cross-origin → network-first, fallback to cache, fallback to opaque error
    - same-origin within scope → cache-first; on miss, network + put-to-cache
"""
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[5]
TRIPS = ["2026_04_HK", "2026_04_MO", "2026_05_Singapore", "2026_07_AKAME"]
IMG_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"}
CACHE_VERSION = "v1.0.0"


SW_TEMPLATE = """// Sprint-001 PWA Service Worker — {trip}
// 產出於 generator step 5；CACHE_VERSION 升版即可作廢舊快取。
// 同 origin scope = './'，cache-first；跨 origin（字型 / 天氣圖示 / 地圖）= network-first。

const CACHE_VERSION = '{cache_version}';
const CACHE_NAME = `pwa-{slug}-${{CACHE_VERSION}}`;

const PRECACHE = {precache_list};

self.addEventListener('install', (event) => {{
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch((err) => {{
        console.warn('[SW] precache failed:', err);
      }})
  );
}});

self.addEventListener('activate', (event) => {{
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('pwa-{slug}-') && k !== CACHE_NAME)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
}});

self.addEventListener('fetch', (event) => {{
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (!isSameOrigin) {{
    // 跨 origin：network-first with cache fallback（字型 / 天氣 / 地圖）
    event.respondWith(
      fetch(req)
        .then((resp) => {{
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {{}});
          return resp;
        }})
        .catch(() => caches.match(req).then((cached) => cached || Response.error()))
    );
    return;
  }}

  // 同 origin：cache-first
  event.respondWith(
    caches.match(req).then((cached) => {{
      if (cached) return cached;
      return fetch(req)
        .then((resp) => {{
          if (resp && resp.status === 200 && resp.type === 'basic') {{
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {{}});
          }}
          return resp;
        }})
        .catch(() => caches.match('./index.html'));
    }})
  );
}});
"""


def slugify(trip: str) -> str:
    return trip.lower().replace("_", "-")


def build_precache(trip_dir: Path) -> list[str]:
    items: list[str] = ["./", "./index.html", "./manifest.json"]
    img_dir = trip_dir / "img"
    if img_dir.exists():
        for f in sorted(img_dir.iterdir()):
            if f.is_file() and f.suffix.lower() in IMG_EXT:
                items.append(f"./img/{f.name}")
    return items


def format_list(items: list[str]) -> str:
    inner = ",\n  ".join(f"'{x}'" for x in items)
    return f"[\n  {inner}\n]"


def main():
    for trip in TRIPS:
        trip_dir = PROJECT_ROOT / trip
        precache = build_precache(trip_dir)
        sw = SW_TEMPLATE.format(
            trip=trip,
            slug=slugify(trip),
            cache_version=CACHE_VERSION,
            precache_list=format_list(precache),
        )
        out = trip_dir / "sw.js"
        out.write_text(sw, encoding="utf-8")
        print(f"[OK] {trip}/sw.js written ({len(precache)} precache items)")


if __name__ == "__main__":
    main()
