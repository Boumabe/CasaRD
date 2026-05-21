/* ═══════════════════════════════════════════════════
   CASARD — SERVICE WORKER v3
   Hace la app instalable y funciona sin internet.
════════════════════════════════════════════════════ */
var CACHE = 'casard-v3';
var FILES = [
  '/',
  '/index.html',
  '/js/datos.js',
  '/js/paginas.js',
  '/js/app.js',
  '/manifest.json',
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(FILES); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k)   { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  /* Firebase y CDN siempre desde la red */
  var url = e.request.url;
  if (url.indexOf('firebasejs') >= 0 ||
      url.indexOf('googleapis') >= 0 ||
      url.indexOf('firestore')  >= 0 ||
      url.indexOf('firebase')   >= 0) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request);
    })
  );
});
