const CACHE_NAME = 'hola-cache-v1';

const FILES_TO_CACHE = [
  '/hola/',
  '/hola/index.html',
  '/hola/styles.css',
  '/hola/script.js',

  // Librerías locales
  '/hola/assets/sqljs/sql-wasm.js',
  '/hola/assets/fontawesome/css/all.min.css',

  // Imágenes
  '/hola/assets/icons/hola.jpg',
  '/hola/assets/icons/hol2.png',
  '/hola/R.jpeg',
  '/hola/noti.webp',
  '/hola/OIP.webp',
  '/hola/htrh.webp',
  '/hola/hello.avif',
  '/hola/app.webp',
  '/hola/APPS.jpg',
  '/hola/compo.webp',
  '/hola/controles.jpg',
  '/hola/datos.jpg',
  '/hola/git.webp',
  '/hola/mul.webp',
  '/hola/pag.png',
  '/hola/partes.jpeg',
  '/hola/sistemas.jpg',
  '/hola/R.png'
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
