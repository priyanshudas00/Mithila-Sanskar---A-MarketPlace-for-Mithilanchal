/**
 * Production-ready API utilities
 * Handles retries, rate limiting, and error handling
 */

// Rate limiting with token bucket algorithm
class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private readonly maxTokens: number;
  private readonly refillRate: number; // tokens per second

  constructor(maxTokens: number = 100, refillRate: number = 10) {
    this.maxTokens = maxTokens;
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
    this.refillRate = refillRate;
  }

  private refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }

  canProceed(): boolean {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }

  getWaitTime(): number {
    this.refill();
    if (this.tokens >= 1) return 0;
    return Math.ceil((1 - this.tokens) / this.refillRate * 1000);
  }
}

// Global rate limiter instance
export const apiRateLimiter = new RateLimiter(100, 10);

// Request queue for handling rate limits
class RequestQueue {
  private queue: Array<{
    execute: () => Promise<unknown>;
    resolve: (value: unknown) => void;
    reject: (error: unknown) => void;
  }> = [];
  private processing = false;

  async add<T>(execute: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        execute: execute as () => Promise<unknown>,
        resolve: resolve as (value: unknown) => void,
        reject,
      });
      this.process();
    });
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const waitTime = apiRateLimiter.getWaitTime();
      if (waitTime > 0) {
        await new Promise(r => setTimeout(r, waitTime));
      }
      
      if (apiRateLimiter.canProceed()) {
        const item = this.queue.shift();
        if (item) {
          try {
            const result = await item.execute();
            item.resolve(result);
          } catch (error) {
            item.reject(error);
          }
        }
      }
    }
    
    this.processing = false;
  }
}

export const requestQueue = new RequestQueue();

// Retry utility with exponential backoff
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
    shouldRetry?: (error: unknown) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    backoffMultiplier = 2,
    shouldRetry = () => true,
  } = options;

  let lastError: unknown;
  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries || !shouldRetry(error)) {
        throw error;
      }

      // Check for rate limit response (429)
      if (error instanceof Response && error.status === 429) {
        const retryAfter = error.headers.get('Retry-After');
        if (retryAfter) {
          delay = parseInt(retryAfter) * 1000;
        }
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * backoffMultiplier, maxDelay);
    }
  }

  throw lastError;
}

// Performance monitoring
export const performanceMonitor = {
  marks: new Map<string, number>(),
  
  start(label: string) {
    this.marks.set(label, performance.now());
  },
  
  end(label: string): number | null {
    const start = this.marks.get(label);
    if (start === undefined) return null;
    
    const duration = performance.now() - start;
    this.marks.delete(label);
    
    // Log slow operations in development
    if (import.meta.env.DEV && duration > 100) {
      console.warn(`Slow operation: ${label} took ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  },
  
  measure(label: string, fn: () => void): number {
    this.start(label);
    fn();
    return this.end(label) ?? 0;
  },
  
  async measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label);
    try {
      return await fn();
    } finally {
      this.end(label);
    }
  },
};

// Memory usage monitoring
export function getMemoryUsage(): { used: number; total: number } | null {
  // @ts-expect-error - memory is non-standard
  const memory = performance.memory;
  if (!memory) return null;
  
  return {
    used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
    total: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
  };
}

// Connection quality detection
export function getConnectionQuality(): 'slow' | 'medium' | 'fast' | 'unknown' {
  // @ts-expect-error - connection is non-standard
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) return 'unknown';
  
  const { effectiveType, downlink } = connection;
  
  if (effectiveType === '4g' && downlink >= 10) return 'fast';
  if (effectiveType === '4g' || effectiveType === '3g') return 'medium';
  return 'slow';
}

// Preload critical resources
export function preloadResource(href: string, as: 'script' | 'style' | 'image' | 'font') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }
  document.head.appendChild(link);
}

// Prefetch for navigation
export function prefetchPage(href: string) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}
