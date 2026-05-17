/* ═══════════════════════════════════════════════════
   CASARD — SERVICE WORKER
   Hace la app instalable en Android e iPhone.
════════════════════════════════════════════════════ */
var CACHE = 'casard-v2';

var ARCHIVOS = [
  '/',
  '/index.html',
  '/js/datos.js',
  '/js/paginas.js',
  '/js/app.js',
  '/manifest.json',
];

/* Instalar */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ARCHIVOS);
    })
  );
  self.skipWaiting();
});

/* Activar — borrar caché viejo */
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

/* Fetch — caché primero, luego red */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request);
    })
  );
});
