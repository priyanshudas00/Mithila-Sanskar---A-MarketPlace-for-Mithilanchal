import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const DebugAuth = () => {
  const { signInWithProvider } = useAuth();
  const [output, setOutput] = useState<string | null>(null);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const runTest = async () => {
    setOutput('Running test...');
    try {
      const res = await signInWithProvider('google');
      if (res?.error) {
        setOutput(`Error: ${res.error?.message || JSON.stringify(res.error)}`);
      } else {
        setOutput('Redirect initiated (check browser popup or window).');
      }
    } catch (e: any) {
      setOutput(`Exception: ${e?.message || String(e)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-2xl mb-4">Auth Debug</h1>
          <p className="text-muted-foreground mb-4">This page helps diagnose Google OAuth configuration issues.</p>

          <div className="bg-card rounded-xl p-6 mb-4">
            <div className="mb-3">
              <strong>Supabase URL:</strong> <span className="text-sm text-muted-foreground">{supabaseUrl || 'Not set'}</span>
            </div>
            <div className="mb-3">
              <strong>VITE_GOOGLE_CLIENT_ID:</strong> <span className="text-sm text-muted-foreground">{googleClientId ? 'Present' : 'Missing'}</span>
            </div>
            <div className="flex gap-3">
              <Button variant="cultural" onClick={runTest} disabled={!googleClientId}>Test Google Provider</Button>
              <a className={`inline-flex items-center px-4 py-2 rounded-lg bg-ghost text-sm ${googleClientId ? '' : 'opacity-50 cursor-not-allowed'}`} href="#" onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(supabaseUrl || ''); }}>Copy Supabase URL</a>
            </div>
          </div>

          <div className="bg-secondary rounded-xl p-6">
            <h2 className="font-medium mb-2">Result</h2>
            <pre className="text-sm text-muted-foreground">{output || 'No test run'}</pre>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DebugAuth;
