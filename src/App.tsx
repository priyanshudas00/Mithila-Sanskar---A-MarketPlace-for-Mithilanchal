import { Suspense, lazy, memo } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageLoader from "@/components/PageLoader";
import { queryClient } from "@/lib/queryClient";

// Lazy load all page components for code splitting
// Critical pages loaded with prefetch priority
const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Auth = lazy(() => import("./pages/Auth"));
const Cart = lazy(() => import("./pages/Cart"));

// Less critical pages loaded on-demand
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const SellerRegister = lazy(() => import("./pages/SellerRegister"));
const SellerDashboard = lazy(() => import("./pages/SellerDashboard"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const Admin = lazy(() => import("./pages/Admin"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const SellersAgreement = lazy(() => import("./pages/SellersAgreement"));
const Artisans = lazy(() => import("./pages/Artisans"));
const Artisan = lazy(() => import("./pages/Artisan"));
const Story = lazy(() => import("./pages/Story"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const Profile = lazy(() => import("./pages/Profile"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Debug routes only in development
const DebugAuth = lazy(() => import("./pages/DebugAuth"));

// Memoized Mobile Navigation - loaded separately
const MobileBottomNav = lazy(() => import("@/components/MobileBottomNav"));

// Notification Permission Dialog - lazy loaded
const NotificationPermissionDialog = lazy(() => import("@/components/NotificationPermissionDialog"));

// Suspense wrapper for consistent loading experience
const SuspenseWrapper = memo(function SuspenseWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  );
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationProvider>
          <TooltipProvider delayDuration={300}>
            <Toaster />
            <Sonner 
              position="top-center"
              closeButton
              richColors
              duration={4000}
            />
            <BrowserRouter>
            <ErrorBoundary>
              <Routes>
                {/* Public Routes - High Priority */}
                <Route path="/" element={<SuspenseWrapper><Index /></SuspenseWrapper>} />
                <Route path="/shop" element={<SuspenseWrapper><Shop /></SuspenseWrapper>} />
                <Route path="/product/:id" element={<SuspenseWrapper><ProductDetail /></SuspenseWrapper>} />
                <Route path="/auth" element={<SuspenseWrapper><Auth /></SuspenseWrapper>} />
                <Route path="/cart" element={<SuspenseWrapper><Cart /></SuspenseWrapper>} />
                
                {/* Checkout Flow */}
                <Route path="/checkout" element={<SuspenseWrapper><Checkout /></SuspenseWrapper>} />
                <Route path="/order-success/:orderId" element={<SuspenseWrapper><OrderSuccess /></SuspenseWrapper>} />
                
                {/* User Account Routes */}
                <Route path="/orders" element={<SuspenseWrapper><OrderHistory /></SuspenseWrapper>} />
                <Route path="/order/:orderId" element={<SuspenseWrapper><OrderDetail /></SuspenseWrapper>} />
                <Route path="/profile" element={<SuspenseWrapper><Profile /></SuspenseWrapper>} />
                <Route path="/wishlist" element={<SuspenseWrapper><Wishlist /></SuspenseWrapper>} />
                
                {/* Seller Routes */}
                <Route path="/seller/register" element={<SuspenseWrapper><SellerRegister /></SuspenseWrapper>} />
                <Route path="/seller/dashboard" element={<SuspenseWrapper><SellerDashboard /></SuspenseWrapper>} />
                <Route path="/seller/products/new" element={<SuspenseWrapper><AddProduct /></SuspenseWrapper>} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<SuspenseWrapper><Admin /></SuspenseWrapper>} />
                
                {/* Content Pages */}
                <Route path="/artisans" element={<SuspenseWrapper><Artisans /></SuspenseWrapper>} />
                <Route path="/artisan/:id" element={<SuspenseWrapper><Artisan /></SuspenseWrapper>} />
                <Route path="/story" element={<SuspenseWrapper><Story /></SuspenseWrapper>} />
                <Route path="/contact" element={<SuspenseWrapper><Contact /></SuspenseWrapper>} />
                <Route path="/about" element={<SuspenseWrapper><About /></SuspenseWrapper>} />
                
                {/* Legal Pages */}
                <Route path="/privacy-policy" element={<SuspenseWrapper><PrivacyPolicy /></SuspenseWrapper>} />
                <Route path="/terms-of-service" element={<SuspenseWrapper><TermsOfService /></SuspenseWrapper>} />
                <Route path="/sellers-agreement" element={<SuspenseWrapper><SellersAgreement /></SuspenseWrapper>} />
                <Route path="/refund-policy" element={<SuspenseWrapper><RefundPolicy /></SuspenseWrapper>} />
                
                {/* Debug Route - Only in Development */}
                {import.meta.env.DEV && (
                  <Route path="/debug/auth" element={<SuspenseWrapper><DebugAuth /></SuspenseWrapper>} />
                )}
                
                {/* 404 Fallback */}
                <Route path="*" element={<SuspenseWrapper><NotFound /></SuspenseWrapper>} />
              </Routes>
            </ErrorBoundary>
            
            {/* Mobile Navigation - Lazy loaded */}
            <Suspense fallback={null}>
              <MobileBottomNav />
            </Suspense>
            
            {/* Notification Permission Dialog - Lazy loaded */}
            <Suspense fallback={null}>
              <NotificationPermissionDialog />
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
</ErrorBoundary>
);

export default App;
