/* ═══════════════════════════════════════════════════
   CASARD — SERVICE WORKER
   Rend l'app installable sur Android et iPhone.
   Cache les fichiers pour fonctionner sans internet.
════════════════════════════════════════════════════ */

const CACHE_NAME = 'casard-v1';

const ARCHIVOS_CACHE = [
  '/',
  '/index.html',
  '/css/variables.css',
  '/css/base.css',
  '/css/components.css',
  '/css/layout.css',
  '/js/firebase.js',
  '/js/utils.js',
  '/js/auth.js',
  '/js/router.js',
  '/js/app.js',
  '/pages/bienvenida.js',
  '/pages/explorar.js',
  '/pages/detalle.js',
  '/pages/publicar.js',
  '/pages/mensajes.js',
  '/pages/chat.js',
  '/pages/perfil.js',
  '/manifest.json',
];

/* Instalar — guardar archivos en caché */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ARCHIVOS_CACHE))
  );
  self.skipWaiting();
});

/* Activar — limpiar caché viejo */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Fetch — responder con caché si no hay internet */
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
