/* Learn Luganda service worker (generated at build time). */
const VERSION = '3e1107b43dce';
const CACHE = `learn-luganda-${VERSION}`;
const FONTS = 'learn-luganda-fonts';
// Written by the page (src/reminders/reminders.js): the reminder plan and the sent log.
const REMINDERS = 'learn-luganda-reminders';
const PRECACHE = [
  "./",
  "ads.txt",
  "assets/course-CUio-yjR.js",
  "assets/illustrations-Ct7VAUfj.css",
  "assets/illustrations-DtpbPOmb.css",
  "assets/illustrations-Wp6qqPt8.js",
  "assets/illustrations-zkF5YppP.js",
  "assets/main-59pOjXCB.js",
  "assets/main-DUIjvF20.css",
  "assets/u1-GiE9xdew.js",
  "assets/u10-BE7_dolO.js",
  "assets/u11-CSOudtpm.js",
  "assets/u12-HXZYOMSh.js",
  "assets/u13-D9Ud7sJV.js",
  "assets/u14-DHWqMkDJ.js",
  "assets/u15-BMVK0P-4.js",
  "assets/u16-BxTmga-K.js",
  "assets/u17-lZdXHnP9.js",
  "assets/u18-BafnesuU.js",
  "assets/u19-D1-n4qdZ.js",
  "assets/u2-CHbMmr9Y.js",
  "assets/u20-DUXQLv_X.js",
  "assets/u21-CrrdwHWL.js",
  "assets/u22-YADlVEsE.js",
  "assets/u23-CgcvitgE.js",
  "assets/u24-DQx_sfEi.js",
  "assets/u25-Ux0v4cxc.js",
  "assets/u26-DCQ1dvcT.js",
  "assets/u27-Cjf3nP3n.js",
  "assets/u28-DK4ER20Q.js",
  "assets/u29-B2N0LIY2.js",
  "assets/u3-0h1FOcFY.js",
  "assets/u30-wbd8QAZd.js",
  "assets/u31-BEoqASFQ.js",
  "assets/u32-DPGFQzlp.js",
  "assets/u33-Br-NZsNY.js",
  "assets/u34-BUIPh6BR.js",
  "assets/u35-rlaIFWIT.js",
  "assets/u36-CphcNscI.js",
  "assets/u37-xENFPAHs.js",
  "assets/u38-BfTmUebs.js",
  "assets/u39-DHwQcyAk.js",
  "assets/u4-6rmVVz8R.js",
  "assets/u40-QJRUoGQR.js",
  "assets/u5-CQB8TdD6.js",
  "assets/u6-lNkO8Cr5.js",
  "assets/u7-B01WHk-3.js",
  "assets/u8-B8hoOw_M.js",
  "assets/u9-DD2wU7qb.js",
  "audio/CREDITS.md",
  "audio/music/amadinda-loop.mp3",
  "audio/sfx/LICENSE.txt",
  "audio/sfx/playful/achievement.mp3",
  "audio/sfx/playful/back.mp3",
  "audio/sfx/playful/complete.mp3",
  "audio/sfx/playful/error.mp3",
  "audio/sfx/playful/level-up.mp3",
  "audio/sfx/playful/press.mp3",
  "audio/sfx/playful/reward.mp3",
  "audio/sfx/playful/select.mp3",
  "audio/sfx/playful/start.mp3",
  "audio/sfx/playful/streak.mp3",
  "audio/sfx/playful/success.mp3",
  "audio/sfx/playful/toggle-on.mp3",
  "audio/sfx/playful/unlock.mp3",
  "audio/sfx/soft/achievement.mp3",
  "audio/sfx/soft/back.mp3",
  "audio/sfx/soft/complete.mp3",
  "audio/sfx/soft/error.mp3",
  "audio/sfx/soft/level-up.mp3",
  "audio/sfx/soft/press.mp3",
  "audio/sfx/soft/reward.mp3",
  "audio/sfx/soft/select.mp3",
  "audio/sfx/soft/start.mp3",
  "audio/sfx/soft/streak.mp3",
  "audio/sfx/soft/success.mp3",
  "audio/sfx/soft/toggle-on.mp3",
  "audio/sfx/soft/unlock.mp3",
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
