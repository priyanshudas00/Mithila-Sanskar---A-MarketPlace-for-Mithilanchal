import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  NotificationPayload,
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  subscribeToPushNotifications,
  showLocalNotification,
  storeNotification,
  getStoredNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadCount,
  clearAllNotifications,
} from '@/lib/notifications';
import { toast } from 'sonner';

interface StoredNotification extends NotificationPayload {
  id: string;
  timestamp: string;
  read: boolean;
}

interface NotificationContextType {
  // Permission & Support
  isSupported: boolean;
  permission: NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
  
  // Notifications
  notifications: StoredNotification[];
  unreadCount: number;
  
  // Actions
  sendNotification: (payload: NotificationPayload) => Promise<boolean>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  refreshNotifications: () => void;
  
  // Loading state
  loading: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { user, isSeller, isAdmin } = useAuth();
  const [isSupported] = useState(isNotificationSupported());
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [notifications, setNotifications] = useState<StoredNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Initialize notification state
  useEffect(() => {
    if (isSupported) {
      setPermission(getNotificationPermission());
    }
    refreshNotifications();
    setLoading(false);
  }, [isSupported]);

  // Subscribe to push notifications when user is logged in and permission is granted
  useEffect(() => {
    if (user && permission === 'granted') {
      subscribeToPushNotifications().then((subscription) => {
        if (subscription) {
          // In production, send subscription to server
          console.log('Push subscription active');
        }
      });
    }
  }, [user, permission]);

  // Refresh notifications from storage
  const refreshNotifications = useCallback(() => {
    const stored = getStoredNotifications();
    setNotifications(stored);
    setUnreadCount(getUnreadCount());
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    const newPermission = await requestNotificationPermission();
    setPermission(newPermission);
    
    if (newPermission === 'granted') {
      toast.success('Notifications enabled! You\'ll receive updates about your orders.');
    } else if (newPermission === 'denied') {
      toast.error('Notification permission denied. You can enable it in browser settings.');
    }
    
    return newPermission;
  }, []);

  // Send a notification
  const sendNotification = useCallback(async (payload: NotificationPayload): Promise<boolean> => {
    // Always store the notification for history
    storeNotification(payload);
    refreshNotifications();

    // Show toast notification in-app
    const emoji = getNotificationEmoji(payload.type);
    toast(`${emoji} ${payload.title}`, {
      description: payload.body,
      duration: 5000,
      action: payload.data?.url ? {
        label: 'View',
        onClick: () => {
          if (payload.data?.url) {
            window.location.href = payload.data.url;
          }
        },
      } : undefined,
    });

    // If permission granted, show push notification
    if (permission === 'granted') {
      return await showLocalNotification(payload);
    }

    return true;
  }, [permission, refreshNotifications]);

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    markNotificationAsRead(id);
    refreshNotifications();
  }, [refreshNotifications]);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    markAllNotificationsAsRead();
    refreshNotifications();
    toast.success('All notifications marked as read');
  }, [refreshNotifications]);

  // Clear all notifications
  const clearAll = useCallback(() => {
    clearAllNotifications();
    refreshNotifications();
    toast.success('All notifications cleared');
  }, [refreshNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        isSupported,
        permission,
        requestPermission,
        notifications,
        unreadCount,
        sendNotification,
        markAsRead,
        markAllAsRead,
        clearAll,
        refreshNotifications,
        loading,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Helper function for emoji
function getNotificationEmoji(type: string): string {
  const emojiMap: Record<string, string> = {
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
  return emojiMap[type] || '🔔';
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
