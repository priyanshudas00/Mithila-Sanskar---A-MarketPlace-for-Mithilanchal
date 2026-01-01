import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Search, User, Heart, LogOut, LayoutDashboard, Package, Store, FileText, Shield, ScrollText, Handshake } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { siteUrlIsMisconfigured } from "@/lib/config";
import Logo from "@/components/Logo";

const Navigation = () => {
  const { user, signOut, isSeller, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();


  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  // Desktop nav links - includes all main pages
  const desktopNavLinks = [
    { name: "🏠 Home", path: "/" },
    { name: "🛍️ Shop", path: "/shop" },
    { name: "👨‍🎨 Artisans", path: "/artisans" },
    { name: "📖 Our Story", path: "/story" },
  ];

  // Mobile nav links - excludes items already in bottom nav (Home, Shop, Cart, Wishlist, Profile)
  const mobileNavLinks = [
    { name: "👨‍🎨 Artisans", path: "/artisans" },
    { name: "📖 Our Story", path: "/story" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy", icon: Shield },
    { name: "Terms of Service", path: "/terms-of-service", icon: ScrollText },
    { name: "Sellers Agreement", path: "/sellers-agreement", icon: Handshake },
  ];

  const showGoogleBanner = !googleClientId && window.location.hostname === 'mithilasanskar.shop';
  const showSiteUrlWarning = siteUrlIsMisconfigured() && window.location.hostname === 'mithilasanskar.shop';

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border madhubani-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo showText={true} size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {desktopNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta to-vermilion rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/shop" className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors" title="Search products">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Link>
            <Link to="/cart" className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors relative">
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-vermilion text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                {isSeller && (
                  <Link to="/seller/dashboard">
                    <Button variant="heritage" size="sm" className="gap-1">
                      <Store className="w-4 h-4" />
                      Run Your Store
                    </Button>
                  </Link>
                )}
                {!isSeller && (
                  <Link to="/seller/register">
                    <Button variant="cultural" size="sm" className="gap-1">
                      <Store className="w-4 h-4" />
                      Become a Seller
                    </Button>
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="gap-1">
                      <LayoutDashboard className="w-4 h-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="heritage" size="sm" className="gap-1">
                    <User className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Cart is in bottom nav, only show menu toggle */}
          <div className="md:hidden flex items-center gap-1">
            <button
              className="p-2.5 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Google sign-in misconfiguration banner for production */}
      {showGoogleBanner && (
        <div className="bg-vermilion/10 border-t border-vermilion/20 text-vermilion text-sm py-2 text-center">
          <div className="container mx-auto px-4">
            Google Sign-In seems to be not configured for this deployment. Set <code>VITE_GOOGLE_CLIENT_ID</code> in Cloudflare Pages environment variables and enable Google in Supabase Auth Providers.
          </div>
        </div>
      )}

      {showSiteUrlWarning && (
        <div className="bg-amber-100 border-t border-amber-200 text-amber-800 text-sm py-2 text-center">
          <div className="container mx-auto px-4">
            The configured <code>VITE_SITE_URL</code> appears to point to <strong>localhost</strong> or does not match the current domain. Update your Supabase Auth "Site URL" and production environment variable to your production domain (e.g., <code>https://mithilasanskar.shop</code>).
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in max-h-[70vh] overflow-y-auto pb-20">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {/* Quick Links - Only items NOT in bottom nav */}
            {mobileNavLinks.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider px-2 pb-1">📍 Quick Links</p>
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block py-3 px-3 rounded-lg font-medium ${
                      isActive(link.path)
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            {/* My Stuff - Wishlist & Orders (not in bottom nav) */}
            <div className="space-y-1 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider px-2 pb-1">❤️ My Stuff</p>
              <Link
                to="/wishlist"
                className="flex items-center gap-3 py-3 px-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg">❤️</span>
                <span>My Wishlist</span>
              </Link>
              {user && (
                <Link
                  to="/orders"
                  className="flex items-center gap-3 py-3 px-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">📦</span>
                  <span>My Orders</span>
                </Link>
              )}
            </div>

            {/* Seller & Admin Actions - Only show relevant buttons */}
            <div className="space-y-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider px-2 pb-1">🏪 Seller Zone</p>
              {user ? (
                <>
                  {isSeller && (
                    <Link to="/seller/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="heritage" size="default" className="w-full justify-start gap-3 h-12">
                        <span className="text-lg">🏪</span>
                        Run Your Store
                      </Button>
                    </Link>
                  )}
                  {!isSeller && (
                    <Link to="/seller/register" onClick={() => setIsOpen(false)}>
                      <Button variant="cultural" size="default" className="w-full justify-start gap-3 h-12">
                        <span className="text-lg">🏪</span>
                        Become a Seller
                      </Button>
                    </Link>
                  )}
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="default" className="w-full justify-start gap-3 h-12">
                        <span className="text-lg">⚙️</span>
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <Link to="/seller/register" onClick={() => setIsOpen(false)}>
                  <Button variant="cultural" size="default" className="w-full justify-start gap-3 h-12">
                    <span className="text-lg">🏪</span>
                    Become a Seller
                  </Button>
                </Link>
              )}
            </div>

            {/* Sign Out - Separate section for logged in users */}
            {user && (
              <div className="pt-2 border-t border-border">
                <Button 
                  variant="ghost" 
                  size="default" 
                  className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10" 
                  onClick={() => { handleSignOut(); setIsOpen(false); }}
                >
                  <span className="text-lg">🚪</span>
                  Sign Out
                </Button>
              </div>
            )}

            {/* Legal Links */}
            <div className="space-y-1 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider px-2 pb-1">📋 Legal & Policies</p>
              <Link
                to="/privacy-policy"
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>🔒</span>
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>📜</span>
                Terms of Service
              </Link>
              <Link
                to="/sellers-agreement"
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>🤝</span>
                Sellers Agreement
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
