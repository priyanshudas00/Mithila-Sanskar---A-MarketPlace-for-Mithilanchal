import { QueryClient } from '@tanstack/react-query';

/**
 * Production-optimized QueryClient configuration
 * Designed to handle 100K+ concurrent users efficiently
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: 5 minutes - reduces unnecessary refetches
      staleTime: 1000 * 60 * 5,
      
      // Cache time: 30 minutes - keeps data in memory longer
      gcTime: 1000 * 60 * 30,
      
      // Retry logic with exponential backoff
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as { status: number }).status;
          if (status >= 400 && status < 500) {
            return false;
          }
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch settings for better UX
      refetchOnWindowFocus: false, // Reduce unnecessary requests
      refetchOnReconnect: true,
      refetchOnMount: true,
      
      // Network mode
      networkMode: 'offlineFirst', // Support offline via service worker
      
      // Suspense mode disabled for manual loading states
      throwOnError: false,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
      retryDelay: 1000,
      
      // Network mode for mutations
      networkMode: 'online',
      
      // Don't throw errors, handle in mutation callbacks
      throwOnError: false,
    },
  },
});

// Query keys factory for consistent cache management
export const queryKeys = {
  // Products
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    featured: () => [...queryKeys.products.all, 'featured'] as const,
    seller: (sellerId: string) => [...queryKeys.products.all, 'seller', sellerId] as const,
  },
  
  // Orders
  orders: {
    all: ['orders'] as const,
    lists: () => [...queryKeys.orders.all, 'list'] as const,
    list: (userId: string) => [...queryKeys.orders.lists(), userId] as const,
    detail: (orderId: string) => [...queryKeys.orders.all, 'detail', orderId] as const,
    seller: (sellerId: string) => [...queryKeys.orders.all, 'seller', sellerId] as const,
  },
  
  // Cart
  cart: {
    all: ['cart'] as const,
    items: (userId: string) => [...queryKeys.cart.all, userId] as const,
  },
  
  // Wishlist
  wishlist: {
    all: ['wishlist'] as const,
    items: (userId: string) => [...queryKeys.wishlist.all, userId] as const,
  },
  
  // Categories
  categories: {
    all: ['categories'] as const,
  },
  
  // Artisans/Sellers
  artisans: {
    all: ['artisans'] as const,
    detail: (id: string) => [...queryKeys.artisans.all, id] as const,
  },
  
  // User/Profile
  user: {
    profile: (userId: string) => ['user', 'profile', userId] as const,
    seller: (userId: string) => ['user', 'seller', userId] as const,
  },
} as const;

// Prefetch helper for route-level prefetching
export async function prefetchProducts(filters?: Record<string, unknown>) {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.products.list(filters || {}),
    staleTime: 1000 * 60 * 5,
  });
}

export default queryClient;
