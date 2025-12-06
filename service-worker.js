const CACHE_NAME = 'appmovil-cache-v1';

const FILES_TO_CACHE = [
  '/AppMovil/',
  '/AppMovil/index.html',
  '/AppMovil/styles.css',
  '/AppMovil/script.js',

  // Librerías locales
  '/AppMovil/assets/sqljs/sql-wasm.js',
  '/AppMovil/assets/fontawesome/css/all.min.css',

  // Imágenes
  '/AppMovil/assets/icons/hola.jpg',
  '/AppMovil/assets/icons/hol2.png',
  '/AppMovil/R.jpeg',
  '/AppMovil/noti.webp',
  '/AppMovil/OIP.webp',
  '/AppMovil/htrh.webp',
  '/AppMovil/hello.avif',
  '/AppMovil/app.webp',
  '/AppMovil/APPS.jpg',
  '/AppMovil/compo.webp',
  '/AppMovil/controles.jpg',
  '/AppMovil/datos.jpg',
  '/AppMovil/git.webp',
  '/AppMovil/mul.webp',
  '/AppMovil/pag.png',
  '/AppMovil/partes.jpeg',
  '/AppMovil/sistemas.jpg',
  '/AppMovil/R.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
