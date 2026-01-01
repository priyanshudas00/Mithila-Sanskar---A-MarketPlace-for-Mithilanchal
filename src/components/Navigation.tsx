import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Search, User, Heart, LogOut, LayoutDashboard, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";

const Navigation = () => {
  const { user, signOut, isSeller, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Artisans", path: "/artisans" },
    { name: "Our Story", path: "/story" },
  ];

  const showGoogleBanner = !googleClientId && window.location.hostname === 'mithilasanskar.shop';

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
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-terracotta to-vermilion flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">म</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-foreground leading-tight">
                MithilaSanskar
              </span>
              <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
                Culture · Craft · Community
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
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
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <Link to="/cart" className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-vermilion text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <>
                <Link to="/orders" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Package className="w-5 h-5" />
                </Link>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      <LayoutDashboard className="w-4 h-4 mr-1" />
                      Admin
                    </Button>
                  </Link>
                )}
                {isSeller && (
                  <Link to="/seller/dashboard">
                    <Button variant="heritage" size="sm">
                      <LayoutDashboard className="w-4 h-4 mr-1" />
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="heritage" size="sm">
                    <User className="w-4 h-4 mr-1" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/seller/register">
                  <Button variant="cultural" size="sm">
                    Sell With Us
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Hidden since we use bottom nav */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/cart" className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-vermilion text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 font-medium ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="block py-2 font-medium text-muted-foreground"
              onClick={() => setIsOpen(false)}
            >
              Cart ({cartCount})
            </Link>
            <div className="flex gap-4 pt-4 border-t border-border">
              {user ? (
                <>
                  {isSeller && (
                    <Link to="/seller/dashboard" className="flex-1" onClick={() => setIsOpen(false)}>
                      <Button variant="heritage" size="sm" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  {isAdmin && (
                    <Link to="/admin" className="flex-1" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => { handleSignOut(); setIsOpen(false); }}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="heritage" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/seller/register" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="cultural" size="sm" className="w-full">
                      Sell With Us
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
