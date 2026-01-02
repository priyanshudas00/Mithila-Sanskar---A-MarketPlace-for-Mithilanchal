import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { getSiteOrigin } from "@/lib/config";

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
    let retries = 0;
    const maxRetries = 3;
    const sessionCheckInterval = setInterval(async () => {
      if (retries < maxRetries) {
        try {
          // Force session check bypass cache
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && !user) {
            // Session recovered from storage
            setSession(session);
            setUser(session.user);
            setLoading(false);
            checkUserRoles(session.user.id);
            clearInterval(sessionCheckInterval);
          }
        } catch (error) {
          retries++;
          console.log(`Session recovery attempt ${retries}/${maxRetries}`);
        }
      } else {
        clearInterval(sessionCheckInterval);
      }
    }, 1000);

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
        
        // Clear retry interval once auth state changes
        clearInterval(sessionCheckInterval);
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
      clearInterval(sessionCheckInterval);
    }).catch(error => {
      console.error('Session check error:', error);
    });

    // If user was redirected back from OAuth (access_token in hash), the onAuthStateChange
    // listener above will automatically pick up the session. We just need to clean up the URL
    // and show a success message once the session is set.
    const hash = window.location.hash || window.location.href;
    if (hash.includes('access_token') || hash.includes('provider_token') || hash.includes('refresh_token')) {
      // The supabase-js v2 client auto-parses the hash and fires onAuthStateChange.
      // Wait briefly then clean URL and redirect (the listener above sets state).
      setTimeout(() => {
        try {
          // Clean URL to remove tokens
          history.replaceState(null, '', window.location.pathname + window.location.search);
          // Redirect to home if not already there
          if (window.location.pathname !== '/') {
            window.location.replace('/');
          }
        } catch (e) { /* ignore */ }
      }, 500);
    }

    return () => {
      subscription.unsubscribe();
      clearInterval(sessionCheckInterval);
    };
  }, []);


  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${getSiteOrigin()}/`;
    
    try {
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
      
      // Force session sync after sign up
      if (!error) {
        setTimeout(() => {
          supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
              setSession(session);
              setUser(session.user);
              checkUserRoles(session.user.id);
            }
          });
        }, 100);
      }
      
      return { error };
    } catch (err) {
      return { error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      // Force session sync after sign in
      if (!error) {
        setTimeout(() => {
          supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
              setSession(session);
              setUser(session.user);
              checkUserRoles(session.user.id);
            }
          });
        }, 100);
      }
      
      return { error };
    } catch (err) {
      return { error: err };
    }
  };

  const signInWithProvider = async (provider: string) => {
    const redirectUrl = `${getSiteOrigin()}/`;
    try {
      const result = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: redirectUrl,
        },
      });
      
      // Force session sync after OAuth redirect
      setTimeout(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            setSession(session);
            setUser(session.user);
            checkUserRoles(session.user.id);
          }
        });
      }, 100);
      
      return { error: (result as any).error };
    } catch (error: any) {
      // Return error object so the UI can surface actionable messages
      return { error };
    }
  };

  const signOut = async () => {
    // Clear local state first
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setIsSeller(false);
    
    // Then sign out from Supabase
    try {
      await supabase.auth.signOut();
      // Clear all auth-related localStorage keys
      localStorage.removeItem('mithila-sanskar-auth');
      localStorage.removeItem('supabase.auth.token');
    } catch (error) {
      console.error('Sign out error:', error);
    }
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
