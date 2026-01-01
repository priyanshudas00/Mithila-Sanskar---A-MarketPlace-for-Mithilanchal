import { memo, useEffect, useState } from 'react';
import { Bell, BellRing, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/AuthContext';

const STORAGE_KEY = 'mithila-notification-dialog-dismissed';

const NotificationPermissionDialog = memo(function NotificationPermissionDialog() {
  const { isSupported, permission, requestPermission } = useNotifications();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show dialog only when:
    // 1. User is logged in
    // 2. Notifications are supported
    // 3. Permission is not yet granted
    // 4. Dialog was not dismissed before
    if (
      user &&
      isSupported &&
      permission === 'default' &&
      !localStorage.getItem(STORAGE_KEY)
    ) {
      // Delay showing the dialog for better UX
      const timer = setTimeout(() => {
        setOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user, isSupported, permission]);

  const handleEnable = async () => {
    setLoading(true);
    await requestPermission();
    setLoading(false);
    setOpen(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setOpen(false);
  };

  const handleLater = () => {
    setOpen(false);
    // Don't set dismissed flag, will show again on next session
  };

  // Don't render if not supported or already granted
  if (!isSupported || permission === 'granted') {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-terracotta/20 to-vermilion/20 rounded-full flex items-center justify-center">
            <BellRing className="w-8 h-8 text-terracotta" />
          </div>
          <DialogTitle className="text-xl">Stay Updated!</DialogTitle>
          <DialogDescription className="text-base">
            Enable notifications to receive real-time updates about your orders, 
            new products, and special offers from MithilaSanskar.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <span className="text-2xl">📦</span>
            <div>
              <p className="text-sm font-medium">Order Updates</p>
              <p className="text-xs text-muted-foreground">Track your orders in real-time</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="text-sm font-medium">Special Offers</p>
              <p className="text-xs text-muted-foreground">Get notified about exclusive deals</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <span className="text-2xl">🆕</span>
            <div>
              <p className="text-sm font-medium">New Arrivals</p>
              <p className="text-xs text-muted-foreground">Discover new handcrafted products</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <Button 
            onClick={handleEnable} 
            disabled={loading}
            className="w-full bg-gradient-to-r from-terracotta to-vermilion hover:from-terracotta/90 hover:to-vermilion/90"
          >
            <Bell className="w-4 h-4 mr-2" />
            {loading ? 'Enabling...' : 'Enable Notifications'}
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleLater}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleDismiss}
              className="flex-1 text-muted-foreground"
            >
              Don't Ask Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default NotificationPermissionDialog;
