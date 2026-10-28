/* CASARD — SW v4: red primero (siempre la versión nueva), caché solo si no hay internet */
var CACHE='casard-v4';
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==CACHE}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(CACHE).then(function(h){h.put(e.request,c)});return r}).catch(function(){return caches.match(e.request)}))});
