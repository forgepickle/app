// sw.js — Forge PWA: minimal service worker for Android install eligibility.
// Network-first strategy: always fetches fresh; cache is fallback for offline only.
// No app data is cached — this exists solely so Chrome Android fires
// the beforeinstallprompt event (requires a registered service worker).

const CACHE = 'forge-sw-v1';

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.add('/app/'); }));
});

self.addEventListener('activate', function(e) {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request).catch(function() { return caches.match(e.request); }));
});
