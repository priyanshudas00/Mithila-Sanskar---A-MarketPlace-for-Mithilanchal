import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const GoogleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.5-37-4.6-54.6H272.1v103.4h147.1c-6.4 34.9-25.5 64.5-54.6 84.3v69.9h88.2c51.6-47.5 81-117.7 81-203z"/>
    <path fill="#34A853" d="M272.1 544.3c73.7 0 135.6-24.6 180.8-66.9l-88.2-69.9c-24.6 16.5-56 26.3-92.6 26.3-71 0-131.2-47.9-152.7-112.4H30.1v70.6C75.5 486.6 168.6 544.3 272.1 544.3z"/>
    <path fill="#FBBC05" d="M119.4 324.4c-10.9-32.5-10.9-67.5 0-100l-89.3-70.6C6.2 176.7 0 223.9 0 272c0 48.1 6.2 95.3 30.1 138.2l89.3-70.6z"/>
    <path fill="#EA4335" d="M272.1 107.7c39.9 0 75.8 13.7 104 40.6l78-78C403.7 24.4 341.8 0 272.1 0 168.6 0 75.5 57.7 30.1 144.3l89.3 70.6c21.5-64.5 81.7-112.4 152.7-112.4z"/>
  </svg>
);

const SignInWithGoogle = () => {
  const { signInWithProvider } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Listen for the success event emitted by AuthContext after OAuth redirect
  window.addEventListener('mithila:auth-success', (e: any) => {
    const name = e?.detail?.name || '';
    toast({ title: `Signed in as ${name}`, description: 'Welcome back!', });
  });

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithProvider('google');
      const err = (res as any)?.error;

      if (err) {
        // Supabase returns a 400 with message when provider disabled
        const msg = err?.message || err?.msg || JSON.stringify(err);
        if (msg?.toLowerCase?.().includes('unsupported provider') || (err?.error_code === 'validation_failed')) {
          toast({
            title: 'Google Sign-In not configured',
            description: 'Enable Google provider in Supabase (Auth → Providers → Google) and add Client ID & Secret.',
            variant: 'destructive',
          });
        } else {
          toast({ title: 'Sign in failed', description: msg || 'Unexpected error', variant: 'destructive' });
        }
        setLoading(false);
        return;
      }

      toast({ title: 'Redirecting to Google...', description: 'Complete the sign-in flow in the popup or new window.' });
    } catch (error: any) {
      toast({ title: 'Sign in failed', description: error?.message || 'Unexpected error', variant: 'destructive' });
      setLoading(false);
    }
  };

  const disabled = !googleClientId;

  return (
    <div>
      <button
        aria-label="Sign in with Google"
        onClick={handleGoogleSignIn}
        className={`w-full inline-flex items-center justify-center gap-3 bg-white border border-border text-sm rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all ${loading || disabled ? 'opacity-70 cursor-not-allowed' : 'hover:border-terracotta hover:ring-2 hover:ring-terracotta/20'}`}
        disabled={loading || disabled}
        title={disabled ? 'Google sign-in not configured (set VITE_GOOGLE_CLIENT_ID in .env)' : undefined}
      >
        <GoogleIcon />
        <span className="text-foreground font-medium">Sign in with Google</span>
        {/* subtle Mithila accent on the far right */}
        <span className="ml-auto hidden sm:inline-block w-2 h-2 rounded-full bg-terracotta" />
      </button>
      {disabled && (
        <p className="text-xs text-muted-foreground mt-2">Google sign-in is disabled locally — set <code>VITE_GOOGLE_CLIENT_ID</code> or enable provider in Supabase.</p>
      )}
    </div>
  );
};

export default SignInWithGoogle;
