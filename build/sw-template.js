/* Learn Luganda service worker (generated at build time). */
const VERSION = '__VERSION__';
const CACHE = `learn-luganda-${VERSION}`;
const FONTS = 'learn-luganda-fonts';
// Written by the page (src/reminders/reminders.js): the reminder plan and the sent log.
const REMINDERS = 'learn-luganda-reminders';
const PRECACHE = __PRECACHE__;

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
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('learn-luganda-') && k !== CACHE && k !== FONTS && k !== REMINDERS).map((k) => caches.delete(k))))
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

// Word reminders while the app is closed. Installed Chrome/Edge apps wake
// the worker about once a day; it shows today's reminder if its time has
// come and it hasn't gone out yet. The page decides everything else.
const reminderUrl = (name) => new URL(`__reminders/${name}.json`, self.registration.scope).href;

const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

async function sendReminder() {
  const cache = await caches.open(REMINDERS);
  const plan = await (await cache.match(reminderUrl('plan')))?.json();
  const sent = (await (await cache.match(reminderUrl('sent')))?.json())?.days ?? [];
  const now = Date.now();
  const today = dayKey(new Date(now));
  const slot = (plan?.slots ?? []).find((s) => s.day === today && s.from <= now && now < s.latest && !sent.includes(today));
  if (!slot) return;
  // Stay quiet while the app is on screen: the page handles it then.
  const windows = await self.clients.matchAll({ type: 'window' });
  if (windows.some((c) => c.visibilityState === 'visible')) return;
  await self.registration.showNotification(slot.title, { body: slot.body, icon: './icons/icon-192.png', badge: './icons/icon-192.png', tag: 'word-reminder', data: { url: slot.url } });
  await cache.put(reminderUrl('sent'), new Response(JSON.stringify({ days: [...sent, today].slice(-10) }), { headers: { 'content-type': 'application/json' } }));
}

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'learn-luganda-reminder') event.waitUntil(sendReminder());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = `./${event.notification.data?.url ?? '#/learn'}`;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      const open = list.find((c) => 'focus' in c);
      if (open) return open.focus().then((c) => (c ?? open).navigate?.(target)).catch(() => {});
      return self.clients.openWindow(target);
    }),
  );
});
