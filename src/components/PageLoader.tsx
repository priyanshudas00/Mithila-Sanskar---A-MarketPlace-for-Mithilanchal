import { memo } from 'react';

interface PageLoaderProps {
  message?: string;
}

const PageLoader = memo(function PageLoader({ message = 'Loading...' }: PageLoaderProps) {
  return (
    <div className="min-h-screen bg-mithila-cream flex flex-col items-center justify-center p-4">
      {/* Animated Logo */}
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-mithila-primary/20 rounded-full" />
        <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-mithila-primary rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-mithila-primary rounded-full animate-pulse" />
        </div>
      </div>
      
      {/* Loading Text */}
      <p className="text-mithila-brown/70 text-lg font-medium animate-pulse">
        {message}
      </p>
      
      {/* Progress Bar */}
      <div className="w-48 h-1 bg-mithila-primary/20 rounded-full mt-4 overflow-hidden">
        <div className="h-full bg-mithila-primary rounded-full animate-loading-bar" />
      </div>
    </div>
  );
});

export default PageLoader;
