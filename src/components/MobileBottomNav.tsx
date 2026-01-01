import { Link, useLocation } from "react-router-dom";
import { Home, Store, ShoppingCart, User, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";

const MobileBottomNav = () => {
  const { user } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Store, path: "/shop", label: "Shop" },
    { icon: ShoppingCart, path: "/cart", label: "Cart", badge: cartCount },
    { icon: Package, path: "/orders", label: "Orders", requiresAuth: true },
    { icon: User, path: user ? "/orders" : "/auth", label: user ? "Account" : "Login" },
  ];

  const filteredItems = navItems.filter(item => !item.requiresAuth || user);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-14">
        {filteredItems.map((item) => (
          <Link
            key={item.path + item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full relative transition-colors ${
              isActive(item.path)
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <div className="relative">
              <item.icon className="w-5 h-5" />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-vermilion text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-medium">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
            {isActive(item.path) && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-terracotta to-vermilion rounded-full" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
