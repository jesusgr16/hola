const CACHE_NAME = 'tutorial-cache-v1';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './service-worker.js',

  // Tus imágenes en raíz
  './hola.jpg',
  './hola2.png',
  './R.jpeg',
  './R.png',
  './OIP.webp',
  './app.webp',
  './hello.avif',
  './htrh.webp',
  './noti.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
