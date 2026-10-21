/* Learn Luganda service worker (generated at build time). */
const VERSION = 'd36a912ec3d5';
const CACHE = `learn-luganda-${VERSION}`;
const FONTS = 'learn-luganda-fonts';
const PRECACHE = [
  "./",
  "ads.txt",
  "assets/illustrations-CdARiJv3.css",
  "assets/illustrations-Cr8FpFuX.js",
  "assets/illustrations-Ct7VAUfj.css",
  "assets/illustrations-hR0XIK6T.js",
  "assets/main-B0M_H_za.js",
  "assets/main-BZoh62Y7.css",
  "favicon.svg",
  "icons/apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "index.html",
  "manifest.webmanifest"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('learn-luganda-') && k !== CACHE && k !== FONTS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Google Fonts: serve from cache, refresh in the background.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONTS).then(async (cache) => {
        const cached = await cache.match(request);
        const fresh = fetch(request)
          .then((res) => {
            if (res.ok || res.type === 'opaque') cache.put(request, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached ?? fresh;
      }),
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Pages: network first so a deploy shows up, the cached shell offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put('./', copy));
          return res;
        })
        .catch(() => caches.match('./', { cacheName: CACHE }).then((res) => res ?? caches.match(request))),
    );
    return;
  }

  // Everything else: cache first (assets are content-hashed).
  event.respondWith(caches.match(request).then((cached) => cached ?? fetch(request)));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      const open = list.find((c) => 'focus' in c);
      if (open) return open.focus();
      return self.clients.openWindow('./#/learn');
    }),
  );
});
