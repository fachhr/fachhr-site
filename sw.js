// sw.js - Service Worker for FACH HR

const CACHE_NAME = 'fach-hr-cache-v1';
const OFFLINE_URL = 'offline.html';

// Assets to cache immediately on install
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/fonts/Gilroy-Light.otf',
  '/fonts/Gilroy-ExtraBold.otf',
  '/images/Asset11.png',
  '/images/Asset15.png',
  '/images/desk.jpg',
  '/images/desk.webp',
  '/offline.html',
  '/manifest.json',
  '/images/app-icon-192.png',
  '/images/app-icon-512.png'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
  );
  
  // Force the waiting service worker to become active
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache or network with cache update strategy
self.addEventListener('fetch', event => {
  // Skip non-GET requests and browser extension requests
  if (
    event.request.method !== 'GET' ||
    event.request.url.startsWith('chrome-extension') ||
    event.request.url.includes('extension') ||
    // Skip cross-origin requests
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if available
        if (cachedResponse) {
          // In background, try to update the cache
          fetch(event.request)
            .then(response => {
              // Only cache valid responses
              if (response && response.status === 200) {
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, response);
                  });
              }
              return response;
            })
            .catch(err => console.log('Cache update failed:', err));
            
          return cachedResponse;
        }
        
        // If not in cache, fetch from network
        return fetch(event.request)
          .then(response => {
            // Clone the response so we can return one and cache one
            const responseToCache = response.clone();
            
            // Only cache successful responses
            if (response && response.status === 200) {
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            
            return response;
          })
          .catch(error => {
            console.log('Network fetch failed:', error);
            
            // For navigation requests, show the offline page
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            
            // For image requests, return a placeholder
            if (event.request.destination === 'image') {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="180" viewBox="0 0 200 180"><rect width="100%" height="100%" fill="#EEEEEE"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#999999">Image Offline</text></svg>',
                { 
                  headers: {'Content-Type': 'image/svg+xml'} 
                }
              );
            }
            
            // Return an empty response for other resource types
            return new Response('', { 
              status: 408,
              statusText: 'Request timed out.' 
            });
          });
      })
  );
});

// Handle push notifications
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const notification = event.data.json();
  const options = {
    body: notification.body,
    icon: '/images/app-icon-192.png',
    badge: '/images/app-icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      url: notification.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('FACH HR', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
