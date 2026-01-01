import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  ShoppingCart, 
  Store, 
  LayoutDashboard, 
  Heart, 
  Settings, 
  LogOut, 
  ChevronRight,
  User,
  CreditCard,
  MapPin,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  Handshake
} from "lucide-react";

const Profile = () => {
  const { user, signOut, isSeller, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const userInitials = user.email?.substring(0, 2).toUpperCase() || "U";
  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

  const menuSections = [
    {
      title: "🛒 Orders & Shopping",
      items: [
        { icon: Package, label: "My Orders", description: "Track your orders", path: "/orders", emoji: "📦" },
        { icon: ShoppingCart, label: "Cart", description: "View your cart", path: "/cart", emoji: "🛒" },
        { icon: Heart, label: "Wishlist", description: "Saved items", path: "/shop", emoji: "❤️" },
      ]
    },
    {
      title: "🏪 Seller",
      items: isSeller ? [
        { icon: Store, label: "Seller Dashboard", description: "Manage your store", path: "/seller/dashboard", emoji: "🏪" },
        { icon: Package, label: "Add Product", description: "List new products", path: "/seller/products/new", emoji: "➕" },
      ] : [
        { icon: Store, label: "Become a Seller", description: "Start selling on MithilaSanskar", path: "/seller/register", emoji: "🏪" },
      ],
      show: true
    },
    {
      title: "⚙️ Admin",
      items: [
        { icon: LayoutDashboard, label: "Admin Panel", description: "Manage platform", path: "/admin", emoji: "⚙️" },
      ],
      show: isAdmin
    },
    {
      title: "📋 Legal & Policies",
      items: [
        { icon: Shield, label: "Privacy Policy", description: "How we protect your data", path: "/privacy-policy", emoji: "🔒" },
        { icon: FileText, label: "Terms of Service", description: "Terms & conditions", path: "/terms-of-service", emoji: "📜" },
        { icon: Handshake, label: "Sellers Agreement", description: "For sellers", path: "/sellers-agreement", emoji: "🤝" },
      ]
    },
    {
      title: "❓ Help & Support",
      items: [
        { icon: HelpCircle, label: "Help Center", description: "Get help with your account", path: "/story", emoji: "❓" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-28 pb-24">
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-terracotta via-vermilion to-saffron"></div>
          <CardContent className="relative pt-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-10">
              <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-terracotta to-vermilion text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left pb-2">
                <h1 className="text-2xl font-bold font-serif">{userName}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex gap-2 mt-2 flex-wrap justify-center sm:justify-start">
                  {isSeller && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-heritage/10 text-heritage text-xs font-medium rounded-full">
                      🏪 Seller
                    </span>
                  )}
                  {isAdmin && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-vermilion/10 text-vermilion text-xs font-medium rounded-full">
                      ⚙️ Admin
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-full">
                    ✓ Verified
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card className="text-center p-4 hover:shadow-md transition-shadow">
            <p className="text-3xl mb-1">📦</p>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Orders</p>
          </Card>
          <Card className="text-center p-4 hover:shadow-md transition-shadow">
            <p className="text-3xl mb-1">❤️</p>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Wishlist</p>
          </Card>
          <Card className="text-center p-4 hover:shadow-md transition-shadow">
            <p className="text-3xl mb-1">🛒</p>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">In Cart</p>
          </Card>
          <Card className="text-center p-4 hover:shadow-md transition-shadow">
            <p className="text-3xl mb-1">⭐</p>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Reviews</p>
          </Card>
        </div>

        {/* Menu Sections */}
        <div className="space-y-4">
          {menuSections.map((section, sectionIndex) => (
            section.show !== false && (
              <Card key={sectionIndex} className="overflow-hidden">
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-lg font-medium">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors border-t border-border first:border-t-0"
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )
          ))}

          {/* Sign Out Button */}
          <Card className="overflow-hidden">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-destructive/5 transition-colors text-destructive"
            >
              <span className="text-2xl">🚪</span>
              <div className="flex-1 text-left">
                <p className="font-medium">Sign Out</p>
                <p className="text-sm opacity-70">Log out of your account</p>
              </div>
              <ChevronRight className="w-5 h-5 opacity-50 flex-shrink-0" />
            </button>
          </Card>
        </div>

        {/* App Version */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          MithilaSanskar v1.0.0 • Made with ❤️ in Mithilanchal
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
