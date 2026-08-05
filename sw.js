/**
 * sw.js — minimal offline support for the birthday website.
 *
 * Strategy: cache the core "app shell" (HTML/CSS/JS/icons) on install,
 * then serve from cache first and fall back to the network. This keeps
 * the site installable and usable even with a flaky connection.
 *
 * Bump CACHE_NAME whenever you change any cached file so old caches
 * get cleaned up automatically.
 */
const CACHE_NAME = "kuchupuchuu-birthday-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/apple-touch-icon.png",
  "./favicon.ico"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // only handle same-origin GET requests; let everything else (fonts, CDN
  // libraries, analytics, etc.) go straight to the network as usual
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          // opportunistically cache newly-requested same-origin assets
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
