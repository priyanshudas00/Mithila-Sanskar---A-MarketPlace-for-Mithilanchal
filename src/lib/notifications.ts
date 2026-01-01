/**
 * PWA Push Notification Service
 * Works even when app is closed/in background
 */

// Notification types for different user roles
export type NotificationType = 
  // User notifications
  | 'order_placed'
  | 'order_shipped'
  | 'order_delivered'
  | 'order_cancelled'
  | 'wishlist_price_drop'
  | 'new_product'
  | 'promotion'
  // Seller notifications
  | 'new_order'
  | 'order_payment_received'
  | 'product_review'
  | 'low_stock'
  | 'product_approved'
  | 'product_rejected'
  // Admin notifications
  | 'new_seller_registration'
  | 'seller_approved'
  | 'new_user_signup'
  | 'high_value_order'
  | 'system_alert';

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  data?: {
    url?: string;
    orderId?: string;
    productId?: string;
    sellerId?: string;
    userId?: string;
    [key: string]: unknown;
  };
  tag?: string;
  requireInteraction?: boolean;
}

// Default notification icons based on type
const getNotificationIcon = (type: NotificationType): string => {
  const iconMap: Record<NotificationType, string> = {
    order_placed: '📦',
    order_shipped: '🚚',
    order_delivered: '✅',
    order_cancelled: '❌',
    wishlist_price_drop: '💰',
    new_product: '🆕',
    promotion: '🎉',
    new_order: '🛒',
    order_payment_received: '💵',
    product_review: '⭐',
    low_stock: '⚠️',
    product_approved: '✅',
    product_rejected: '❌',
    new_seller_registration: '🏪',
    seller_approved: '✅',
    new_user_signup: '👤',
    high_value_order: '💎',
    system_alert: '🔔',
  };
  return iconMap[type] || '🔔';
};

// Check if notifications are supported
export const isNotificationSupported = (): boolean => {
  return 'Notification' in window && 'serviceWorker' in navigator;
};

// Get current notification permission status
export const getNotificationPermission = (): NotificationPermission => {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!isNotificationSupported()) {
    console.warn('Notifications not supported in this browser');
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
};

// Subscribe to push notifications
export const subscribeToPushNotifications = async (): Promise<PushSubscription | null> => {
  if (!isNotificationSupported()) return null;

  try {
    const registration = await navigator.serviceWorker.ready;
    
    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      // VAPID public key - In production, use your own VAPID keys
      // For now, we'll use local notifications only
      const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
      
      if (vapidPublicKey) {
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey as BufferSource,
        });
      }
    }

    return subscription;
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return null;
  }
};

// Convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Show local notification (works immediately)
export const showLocalNotification = async (payload: NotificationPayload): Promise<boolean> => {
  if (!isNotificationSupported()) {
    console.warn('Notifications not supported');
    return false;
  }

  if (Notification.permission !== 'granted') {
    console.warn('Notification permission not granted');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    const emoji = getNotificationIcon(payload.type);
    const title = `${emoji} ${payload.title}`;

    await registration.showNotification(title, {
      body: payload.body,
      icon: payload.icon || '/logo.png',
      badge: payload.badge || '/pwa-192x192.png',
      data: {
        url: payload.data?.url || '/',
        ...payload.data,
      },
      tag: payload.tag || payload.type,
      requireInteraction: payload.requireInteraction ?? false,
      vibrate: [200, 100, 200],
    });

    return true;
  } catch (error) {
    console.error('Error showing notification:', error);
    
    // Fallback to basic Notification API
    try {
      const emoji = getNotificationIcon(payload.type);
      new Notification(`${emoji} ${payload.title}`, {
        body: payload.body,
        icon: payload.icon || '/logo.png',
        tag: payload.tag || payload.type,
      });
      return true;
    } catch (fallbackError) {
      console.error('Fallback notification also failed:', fallbackError);
      return false;
    }
  }
};

// Notification actions interface (for future use with supported platforms)
interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

// Get notification actions based on type (for future use)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _getNotificationActions(type: NotificationType): NotificationAction[] {
  switch (type) {
    case 'order_placed':
    case 'order_shipped':
    case 'order_delivered':
      return [
        { action: 'view', title: 'View Order' },
        { action: 'dismiss', title: 'Dismiss' },
      ];
    case 'new_order':
      return [
        { action: 'view', title: 'View Order' },
        { action: 'process', title: 'Process Now' },
      ];
    case 'product_review':
      return [
        { action: 'view', title: 'View Review' },
        { action: 'reply', title: 'Reply' },
      ];
    case 'low_stock':
      return [
        { action: 'restock', title: 'Update Stock' },
        { action: 'dismiss', title: 'Later' },
      ];
    case 'new_seller_registration':
      return [
        { action: 'review', title: 'Review Application' },
        { action: 'dismiss', title: 'Later' },
      ];
    default:
      return [
        { action: 'view', title: 'View' },
        { action: 'dismiss', title: 'Dismiss' },
      ];
  }
}

// Store notification in localStorage for history
export const storeNotification = (payload: NotificationPayload): void => {
  try {
    const stored = localStorage.getItem('mithila-notifications') || '[]';
    const notifications = JSON.parse(stored);
    
    notifications.unshift({
      ...payload,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    });

    // Keep only last 50 notifications
    const trimmed = notifications.slice(0, 50);
    localStorage.setItem('mithila-notifications', JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error storing notification:', error);
  }
};

// Get stored notifications
export const getStoredNotifications = (): (NotificationPayload & { id: string; timestamp: string; read: boolean })[] => {
  try {
    const stored = localStorage.getItem('mithila-notifications') || '[]';
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

// Mark notification as read
export const markNotificationAsRead = (notificationId: string): void => {
  try {
    const notifications = getStoredNotifications();
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    localStorage.setItem('mithila-notifications', JSON.stringify(updated));
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = (): void => {
  try {
    const notifications = getStoredNotifications();
    const updated = notifications.map(n => ({ ...n, read: true }));
    localStorage.setItem('mithila-notifications', JSON.stringify(updated));
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
  }
};

// Get unread notification count
export const getUnreadCount = (): number => {
  const notifications = getStoredNotifications();
  return notifications.filter(n => !n.read).length;
};

// Clear all notifications
export const clearAllNotifications = (): void => {
  localStorage.removeItem('mithila-notifications');
};

// Predefined notification templates
export const NotificationTemplates = {
  // User notifications
  orderPlaced: (orderId: string): NotificationPayload => ({
    type: 'order_placed',
    title: 'Order Placed Successfully!',
    body: `Your order #${orderId.slice(0, 8)} has been confirmed. We'll notify you when it ships.`,
    data: { url: `/order/${orderId}`, orderId },
    requireInteraction: true,
  }),

  orderShipped: (orderId: string): NotificationPayload => ({
    type: 'order_shipped',
    title: 'Your Order is on the Way!',
    body: `Order #${orderId.slice(0, 8)} has been shipped. Track your delivery in the app.`,
    data: { url: `/order/${orderId}`, orderId },
  }),

  orderDelivered: (orderId: string): NotificationPayload => ({
    type: 'order_delivered',
    title: 'Order Delivered!',
    body: `Your order #${orderId.slice(0, 8)} has been delivered. Enjoy your Mithila crafts!`,
    data: { url: `/order/${orderId}`, orderId },
  }),

  // Seller notifications
  newOrder: (orderId: string, amount: number): NotificationPayload => ({
    type: 'new_order',
    title: 'New Order Received!',
    body: `You have a new order worth ₹${amount.toLocaleString()}. Process it now!`,
    data: { url: '/seller/dashboard', orderId },
    requireInteraction: true,
  }),

  lowStock: (productName: string, quantity: number): NotificationPayload => ({
    type: 'low_stock',
    title: 'Low Stock Alert',
    body: `${productName} has only ${quantity} items left. Consider restocking.`,
    data: { url: '/seller/dashboard' },
  }),

  productReview: (productName: string, rating: number): NotificationPayload => ({
    type: 'product_review',
    title: 'New Product Review',
    body: `${productName} received a ${rating}-star review. Check it out!`,
    data: { url: '/seller/dashboard' },
  }),

  // Admin notifications
  newSellerRegistration: (sellerName: string): NotificationPayload => ({
    type: 'new_seller_registration',
    title: 'New Seller Application',
    body: `${sellerName} has applied to become a seller. Review their application.`,
    data: { url: '/admin' },
    requireInteraction: true,
  }),

  highValueOrder: (orderId: string, amount: number): NotificationPayload => ({
    type: 'high_value_order',
    title: 'High Value Order!',
    body: `A high-value order worth ₹${amount.toLocaleString()} has been placed.`,
    data: { url: '/admin', orderId },
  }),

  // Promotional
  newProductAlert: (productName: string, category: string): NotificationPayload => ({
    type: 'new_product',
    title: 'New Arrival!',
    body: `Check out ${productName} in ${category}. Fresh from Mithila artisans!`,
    data: { url: '/shop' },
  }),

  promotion: (title: string, discount: string): NotificationPayload => ({
    type: 'promotion',
    title: title,
    body: `Get ${discount} off on selected items. Limited time offer!`,
    data: { url: '/shop' },
  }),
};
