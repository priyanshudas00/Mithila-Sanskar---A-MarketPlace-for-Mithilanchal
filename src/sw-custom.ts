/// <reference lib="webworker" />

// Custom service worker additions for push notifications
// This file will be merged with the auto-generated service worker

declare const self: ServiceWorkerGlobalScope;

// Bypass cache for auth-related requests and OAuth callbacks
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const requestUrl = event.request.url;
  
  // CRITICAL: Skip service worker entirely for OAuth callbacks
  // These URLs contain access_token in hash fragment
  if (
    requestUrl.includes('access_token') ||
    requestUrl.includes('refresh_token') ||
    requestUrl.includes('provider_token') ||
    requestUrl.includes('error_description') ||
    url.hash.includes('access_token')
  ) {
    // Let browser handle OAuth redirect without SW interference
    return;
  }
  
  // Always bypass cache for Supabase auth and session endpoints
  if (
    url.pathname.includes('/auth/') ||
    url.pathname.includes('/session') ||
    url.pathname.includes('/token') ||
    url.hostname.includes('supabase.co')
  ) {
    event.respondWith(
      fetch(event.request.clone()).catch(() => {
        // If offline, return cached response or error
        return caches.match(event.request) as any;
      })
    );
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    
    const options: NotificationOptions = {
      body: data.body || 'New notification from MithilaSanskar',
      icon: data.icon || '/logo.png',
      badge: data.badge || '/pwa-192x192.png',
      data: data.data || {},
      tag: data.tag || 'mithila-notification',
      vibrate: [200, 100, 200],
      requireInteraction: data.requireInteraction || false,
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'MithilaSanskar', options)
    );
  } catch (error) {
    console.error('Error showing push notification:', error);
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  const data = event.notification.data || {};

  let targetUrl = '/';

  if (action === 'view' || action === '') {
    // Navigate to the URL specified in notification data
    targetUrl = data.url || '/';
  } else if (action === 'process') {
    targetUrl = '/seller/dashboard';
  } else if (action === 'restock') {
    targetUrl = '/seller/products/new';
  } else if (action === 'review') {
    targetUrl = '/admin';
  } else if (action === 'reply') {
    targetUrl = '/seller/dashboard';
  }

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Try to focus an existing window
      for (const client of clientList) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // Open a new window if none found
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  // Log or track dismissed notifications if needed
  console.log('Notification dismissed:', event.notification.tag);
});

// Sync event for background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notifications') {
    event.waitUntil(syncNotifications());
  }
});

async function syncNotifications() {
  // This could be used to sync offline notifications when back online
  console.log('Syncing notifications...');
}

// Periodic background sync for notifications (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-notifications') {
    event.waitUntil(checkForNewNotifications());
  }
});

async function checkForNewNotifications() {
  // This could poll the server for new notifications
  console.log('Checking for new notifications...');
}

export {};
