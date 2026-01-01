import { Link, useLocation } from "react-router-dom";
import { Home, Store, ShoppingCart, User, Palette, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";

const MobileBottomNav = () => {
  const { user, isSeller } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, path: "/", label: "🏠 Home", emoji: "🏠" },
    { icon: Store, path: "/shop", label: "🛍️ Shop", emoji: "🛍️" },
    { icon: Palette, path: "/artisans", label: "👨‍🎨 Artisans", emoji: "👨‍🎨" },
    { icon: ShoppingCart, path: "/cart", label: "🛒 Cart", emoji: "🛒", badge: cartCount },
    { icon: User, path: user ? "/profile" : "/auth", label: user ? "👤 Profile" : "🔐 Login", emoji: user ? "👤" : "🔐" },
  ];

  const filteredItems = navItems.filter(item => !item.requiresAuth || user);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/98 backdrop-blur-lg border-t border-border shadow-lg safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {filteredItems.map((item) => (
          <Link
            key={item.path + item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full relative transition-all duration-200 ${
              isActive(item.path)
                ? "text-primary scale-105"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="relative">
              <span className="text-xl">{item.emoji}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-2 -right-3 w-5 h-5 bg-gradient-to-r from-terracotta to-vermilion text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-md animate-pulse">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </div>
            <span className={`text-[10px] mt-1 font-medium transition-all ${
              isActive(item.path) ? "font-bold" : ""
            }`}>
              {item.label.replace(/^[^\s]+\s/, "")}
            </span>
            {isActive(item.path) && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-terracotta via-vermilion to-terracotta rounded-full" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
