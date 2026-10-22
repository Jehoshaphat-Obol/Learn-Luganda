/* Learn Luganda service worker (generated at build time). */
const VERSION = '72d9c51f6dc2';
const CACHE = `learn-luganda-${VERSION}`;
const FONTS = 'learn-luganda-fonts';
// Written by the page (src/reminders/reminders.js): the reminder plan and the sent log.
const REMINDERS = 'learn-luganda-reminders';
const PRECACHE = [
  "./",
  "ads.txt",
  "assets/course-BfOtwENq.js",
  "assets/course-CNf6sPzL.js",
  "assets/course-Cdw7cYFA.js",
  "assets/course-CiEu7oSD.js",
  "assets/course-UPEBcs5B.js",
  "assets/en-CPU22sH5.js",
  "assets/en-CyeRzzdK.js",
  "assets/en-xJ3kYRFA.js",
  "assets/illustrations-Ct7VAUfj.css",
  "assets/illustrations-DtpbPOmb.css",
  "assets/illustrations-Wp6qqPt8.js",
  "assets/illustrations-zkF5YppP.js",
  "assets/lg-BQ2VmP_b.js",
  "assets/lg-BTHN9XOo.js",
  "assets/lg-CSaW_E4y.js",
  "assets/lg-D-0Vk17W.js",
  "assets/lg-bCOR69zL.js",
  "assets/main-8EaD6wmS.css",
  "assets/main-wnvO5nPc.js",
  "assets/pt-DZ2ADgIR.svg",
  "assets/sw-BS9YUUMG.js",
  "assets/sw-C2UOGUQZ.js",
  "assets/sw-C2yDP8YU.js",
  "assets/sw-RvKvnnqB.js",
  "assets/u1-BE5wgxZL.js",
  "assets/u1-DMeTBt7N.js",
  "assets/u1-GiE9xdew.js",
  "assets/u1-JhZZwgoz.js",
  "assets/u1-kGcjFqOY.js",
  "assets/u10-BCYfAs4o.js",
  "assets/u10-BE7_dolO.js",
  "assets/u10-CT0mPcZM.js",
  "assets/u10-DYrXLXLm.js",
  "assets/u10-XZrPb-Ji.js",
  "assets/u11-CSOudtpm.js",
  "assets/u11-D763kg7L.js",
  "assets/u11-DAZeEAVC.js",
  "assets/u11-DnfJclkZ.js",
  "assets/u11-m6zI07xF.js",
  "assets/u12-Bjy7gTk8.js",
  "assets/u12-BwwhegyJ.js",
  "assets/u12-DgN-qIM7.js",
  "assets/u12-Dz5-7sRN.js",
  "assets/u12-HXZYOMSh.js",
  "assets/u13-CJGvDG2d.js",
  "assets/u13-CdYy_Dya.js",
  "assets/u13-CiMiI2yM.js",
  "assets/u13-D9Ud7sJV.js",
  "assets/u13-SNPKPqyP.js",
  "assets/u14-B6i38byn.js",
  "assets/u14-BO4wKxL_.js",
  "assets/u14-ClXkk0Yj.js",
  "assets/u14-DHWqMkDJ.js",
  "assets/u14-QulD9nR6.js",
  "assets/u15-BMVK0P-4.js",
  "assets/u15-ByvIrpCR.js",
  "assets/u15-CJRgee16.js",
  "assets/u15-CzQGoEuh.js",
  "assets/u15-D0_DFai6.js",
  "assets/u16-BxTmga-K.js",
  "assets/u16-CZrb6xya.js",
  "assets/u16-Cqy088v7.js",
  "assets/u16-DtaMPpY2.js",
  "assets/u16-Pt5mmmC7.js",
  "assets/u17-Bc29Njdv.js",
  "assets/u17-DJHA3xsb.js",
  "assets/u17-RfGhEoaC.js",
  "assets/u17-_rpwXV9h.js",
  "assets/u17-lZdXHnP9.js",
  "assets/u18-BWIsv5sG.js",
  "assets/u18-BafnesuU.js",
  "assets/u18-BgoA-EYd.js",
  "assets/u18-D2slfQZ4.js",
  "assets/u18-kHnHaqL1.js",
  "assets/u19-B7QsjbeJ.js",
  "assets/u19-Be4IkOO0.js",
  "assets/u19-CWzX89KY.js",
  "assets/u19-D1-n4qdZ.js",
  "assets/u19-cgQTqazt.js",
  "assets/u2-Bm66tJzi.js",
  "assets/u2-CHbMmr9Y.js",
  "assets/u2-DCB4VM9W.js",
  "assets/u2-YcpoDx-3.js",
  "assets/u2-wkoTOkZq.js",
  "assets/u20-B5ClY7oL.js",
  "assets/u20-BDuyS5P1.js",
  "assets/u20-Bv549OxW.js",
  "assets/u20-C3MXH4HN.js",
  "assets/u20-DUXQLv_X.js",
  "assets/u21-B4D11OnO.js",
  "assets/u21-C6b3nP_T.js",
  "assets/u21-CrrdwHWL.js",
  "assets/u21-DhA5UXpA.js",
  "assets/u21-joFO0UeX.js",
  "assets/u22-CCjshgPw.js",
  "assets/u22-PqAk2V-F.js",
  "assets/u22-YADlVEsE.js",
  "assets/u22-u48Q9i9h.js",
  "assets/u22-zqsabSBV.js",
  "assets/u23-B04MRnjp.js",
  "assets/u23-BKP37vMA.js",
  "assets/u23-BO0pk1Ut.js",
  "assets/u23-CgcvitgE.js",
  "assets/u23-Dp5jZPIH.js",
  "assets/u24-6gBzCqqr.js",
  "assets/u24-CZ8EIv-5.js",
  "assets/u24-Cgp-Frc-.js",
  "assets/u24-D8pdKVQH.js",
  "assets/u24-DQx_sfEi.js",
  "assets/u25-B6aw8iod.js",
  "assets/u25-JZWc2F_i.js",
  "assets/u25-STW-2rDV.js",
  "assets/u25-Ux0v4cxc.js",
  "assets/u25-_CuijkYQ.js",
  "assets/u26-BwY3yDEw.js",
  "assets/u26-COT8g-qL.js",
  "assets/u26-CTpK5XZt.js",
  "assets/u26-Cdo4sAPn.js",
  "assets/u26-DCQ1dvcT.js",
  "assets/u27-Bco96pd6.js",
  "assets/u27-C20Xefkq.js",
  "assets/u27-CA0OF1JV.js",
  "assets/u27-Cjf3nP3n.js",
  "assets/u27-DYVZphbg.js",
  "assets/u28-BCpP8Xe_.js",
  "assets/u28-BnwymQb6.js",
  "assets/u28-DK4ER20Q.js",
  "assets/u28-DNjjpY5_.js",
  "assets/u28-cgwLXLHz.js",
  "assets/u29-B2N0LIY2.js",
  "assets/u29-Bj8TCwd8.js",
  "assets/u29-CGb6PncP.js",
  "assets/u29-Ddz-5Ecu.js",
  "assets/u29-zeUu9Su0.js",
  "assets/u3-0h1FOcFY.js",
  "assets/u3-530PcLx-.js",
  "assets/u3-CUsJSVkh.js",
  "assets/u3-CXYebWu0.js",
  "assets/u3-D9Z6fxoF.js",
  "assets/u30-B4lQoaCe.js",
  "assets/u30-B7GuB7Ax.js",
  "assets/u30-D00XzEsc.js",
  "assets/u30-kp7cq8S9.js",
  "assets/u30-wbd8QAZd.js",
  "assets/u31-BDASx12m.js",
  "assets/u31-BEoqASFQ.js",
  "assets/u31-BswfjXUG.js",
  "assets/u31-C0S1VuL5.js",
  "assets/u31-DOt9zmG8.js",
  "assets/u32-CWEqItlD.js",
  "assets/u32-CnKN78ko.js",
  "assets/u32-D6nVwTzZ.js",
  "assets/u32-DPGFQzlp.js",
  "assets/u32-DjaPoXk6.js",
  "assets/u33-Br-NZsNY.js",
  "assets/u33-ByPohh4Z.js",
  "assets/u33-DXgz9xHA.js",
  "assets/u33-DtBBQboa.js",
  "assets/u33-DuEmAFk7.js",
  "assets/u34-BUIPh6BR.js",
  "assets/u34-BfEDWz15.js",
  "assets/u34-D6ytb3Ul.js",
  "assets/u34-JRAmrOPi.js",
  "assets/u34-kvDSPo0s.js",
  "assets/u35-Bn4YUmUX.js",
  "assets/u35-BwErC47u.js",
  "assets/u35-CDmI1GAE.js",
  "assets/u35-DFFTOTf9.js",
  "assets/u35-rlaIFWIT.js",
  "assets/u36-B01ctGkI.js",
  "assets/u36-B6zjVjCn.js",
  "assets/u36-CdYqkKhs.js",
  "assets/u36-CphcNscI.js",
  "assets/u36-hvVmRJeb.js",
  "assets/u37-BuSfxDXi.js",
  "assets/u37-C695jaJh.js",
  "assets/u37-CVksBhIU.js",
  "assets/u37-D267A3FD.js",
  "assets/u37-xENFPAHs.js",
  "assets/u38-BfTmUebs.js",
  "assets/u38-BhbsQh4p.js",
  "assets/u38-C04RgJy5.js",
  "assets/u38-Cva5Wo95.js",
  "assets/u38-ejIt7G0e.js",
  "assets/u39-Bb5c_N4C.js",
  "assets/u39-C88n3F63.js",
  "assets/u39-DHwQcyAk.js",
  "assets/u39-WrLNddYY.js",
  "assets/u39-hYPByrr3.js",
  "assets/u4-6rmVVz8R.js",
  "assets/u4-Bdd9wEVp.js",
  "assets/u4-Ce_M0-XH.js",
  "assets/u4-DpI2oh_t.js",
  "assets/u4-DsHBkKV9.js",
  "assets/u40-D3RJF279.js",
  "assets/u40-DtcF9tuW.js",
  "assets/u40-QJRUoGQR.js",
  "assets/u40-oa-jL6Eo.js",
  "assets/u40-sA0HEbYC.js",
  "assets/u5-B-PK-EdF.js",
  "assets/u5-BeRSipKv.js",
  "assets/u5-CQB8TdD6.js",
  "assets/u5-DBZ0f43H.js",
  "assets/u5-ccHt1gdU.js",
  "assets/u6-7epv8qgv.js",
  "assets/u6-BqslFedL.js",
  "assets/u6-D-GiIse8.js",
  "assets/u6-DV5F6f1d.js",
  "assets/u6-lNkO8Cr5.js",
  "assets/u7-7U-NgXuW.js",
  "assets/u7-B01WHk-3.js",
  "assets/u7-Ckwv0ZuZ.js",
  "assets/u7-Cvbr3BCx.js",
  "assets/u7-XEwDlELw.js",
  "assets/u8-94rUOrkK.js",
  "assets/u8-B8hoOw_M.js",
  "assets/u8-Bf1HvzZB.js",
  "assets/u8-BlHsDQC3.js",
  "assets/u8-CIzkOB7p.js",
  "assets/u9--rATNTXc.js",
  "assets/u9-Cvgu7u1k.js",
  "assets/u9-D9bYOiG2.js",
  "assets/u9-DD2wU7qb.js",
  "assets/u9-w1RBkutH.js",
  "assets/zw-U0m7oJ5e.svg",
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
