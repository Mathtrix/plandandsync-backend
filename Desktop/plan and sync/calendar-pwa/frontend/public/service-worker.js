self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});

// ✅ Handle incoming push notifications
self.addEventListener('push', function (event) {
  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "Notification", {
    body: data.message || "You have an event!",
    icon: "/icon-192x192.png",
    vibrate: [200, 100, 200],
    tag: "syncandplan-event"
  });
});