import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithProvider: (provider: string) => Promise<{ error: any } | undefined>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isSeller: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const checkUserRoles = async (userId: string) => {
    try {
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      
      if (roles) {
        setIsAdmin(roles.some(r => r.role === 'admin'));
        setIsSeller(roles.some(r => r.role === 'seller'));
      }
    } catch (error) {
      console.error('Error checking roles:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Defer role check to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            checkUserRoles(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsSeller(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        checkUserRoles(session.user.id);
      }
    });

    // If user was redirected back from OAuth (access_token in hash), exchange it for a session
    const hash = window.location.hash || window.location.href;
    if (hash.includes('access_token') || hash.includes('provider_token') || hash.includes('refresh_token')) {
      // getSessionFromUrl will parse the URL fragment and set the session
      supabase.auth.getSessionFromUrl().then(({ data, error }) => {
        if (error) {
          console.error('Error processing OAuth redirect:', error);
          return;
        }
        if (data?.session) {
          setSession(data.session);
          setUser(data.session.user ?? null);
          checkUserRoles(data.session.user.id);
          // show success and redirect to home, then clean URL to remove tokens
          try {
            const name = data.session.user.user_metadata?.full_name || data.session.user.email || 'User';
            // Use a toast if available by dispatching a custom event (to avoid coupling here)
            window.dispatchEvent(new CustomEvent('mithila:auth-success', { detail: { name } }));
            // Clean URL and navigate home
            history.replaceState(null, '', window.location.pathname + window.location.search);
            window.location.replace('/');
          } catch (e) { /* ignore */ }
        }
      }).catch((err) => console.error('getSessionFromUrl failed', err));
    }

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signInWithProvider = async (provider: string) => {
    const redirectUrl = `${window.location.origin}/`;
    try {
      const result = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: redirectUrl,
        },
      });
      return { error: (result as any).error };
    } catch (error: any) {
      // Return error object so the UI can surface actionable messages
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setIsSeller(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signInWithProvider,
      signOut,
      isAdmin,
      isSeller,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
