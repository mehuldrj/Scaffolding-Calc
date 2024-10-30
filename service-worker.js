const CACHE_NAME = "scaffolding-calculator-cache";
const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./calculator.js",
  "./manifest.json",
  "./Icon/512x512.png"
];

// Install Service Worker and Cache Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch Cached Files
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
