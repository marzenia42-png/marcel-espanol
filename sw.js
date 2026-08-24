/* Service worker — ¡Vamos!
   Strategia: precache powłoki aplikacji + cache-first z fallbackiem sieciowym.
   Wersję CACHE podbijamy przy każdym deployu, żeby wymusić odświeżenie.        */
const CACHE = 'vamos-v3';

// Ścieżki względne — działa i na root, i pod /marcel-espanol/ na GitHub Pages.
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './manifest.json',
  './js/app.js',
  './js/dom.js',
  './js/theme.js',
  './js/storage.js',
  './js/srs.js',
  './js/speech.js',
  './js/ai.js',
  './js/exercises.js',
  './js/screens.js',
  './js/lesson.js',
  './data/lessons.js',
  './data/lessons_extra.js',
  './data/vocab_extra.js',
  './data/placement.js',
  './data/vocab.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;

  // Nawigacje: sieć → fallback do index.html (SPA offline).
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Reszta: cache-first, dogrywanie z sieci w tle.
  e.respondWith(
    caches.match(request).then((hit) => {
      if (hit) return hit;
      return fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
        return res;
      }).catch(() => hit);
    })
  );
});
