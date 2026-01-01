import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, Package, Plus, Settings, LogOut, 
  TrendingUp, IndianRupee, ShoppingBag, Eye, Edit, Trash2,
  AlertCircle, CheckCircle2
} from "lucide-react";

const SellerDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');

  // Get seller profile
  const { data: seller, isLoading: sellerLoading } = useQuery({
    queryKey: ['seller', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('sellers')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Get seller's products
  const { data: products = [] } = useQuery({
    queryKey: ['seller-products', seller?.id],
    queryFn: async () => {
      if (!seller) return [];
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (name),
          product_images (image_url, is_primary)
        `)
        .eq('seller_id', seller.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!seller,
  });

  // Get seller's orders
  const { data: orderItems = [] } = useQuery({
    queryKey: ['seller-orders', seller?.id],
    queryFn: async () => {
      if (!seller) return [];
      const { data, error } = await supabase
        .from('order_items')
        .select(`
          *,
          orders (
            order_number,
            status,
            created_at,
            shipping_address
          )
        `)
        .eq('seller_id', seller.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!seller,
  });

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl text-foreground mb-4">Seller Dashboard</h1>
            <p className="text-muted-foreground mb-8">Please login to access your seller dashboard.</p>
            <Link to="/auth">
              <Button variant="cultural" size="lg">Login</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (sellerLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-terracotta border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl text-foreground mb-4">Not Registered</h1>
            <p className="text-muted-foreground mb-8">You're not registered as a seller yet.</p>
            <Link to="/seller/register">
              <Button variant="cultural" size="lg">Register as Seller</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const stats = {
    totalProducts: products.length,
    totalOrders: orderItems.length,
    totalEarnings: seller.total_earnings || 0,
    pendingApproval: products.filter(p => !p.is_approved).length,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-terracotta to-vermilion flex items-center justify-center">
                <span className="text-cream font-serif font-bold text-sm">म</span>
              </div>
              <span className="font-serif font-bold text-lg">Seller Dashboard</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:block">
                {seller.business_name}
              </span>
              {!seller.is_approved && (
                <span className="px-3 py-1 bg-golden/20 text-golden-dark text-xs font-medium rounded-full">
                  Pending Approval
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <nav className="bg-background rounded-xl p-4 shadow-soft space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'overview' ? 'bg-terracotta/10 text-terracotta' : 'hover:bg-muted'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'products' ? 'bg-terracotta/10 text-terracotta' : 'hover:bg-muted'
                }`}
              >
                <Package className="w-5 h-5" />
                Products
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'orders' ? 'bg-terracotta/10 text-terracotta' : 'hover:bg-muted'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                Orders
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'settings' ? 'bg-terracotta/10 text-terracotta' : 'hover:bg-muted'
                }`}
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Approval Status */}
                {!seller.is_approved && (
                  <div className="bg-golden/10 border border-golden/30 rounded-xl p-6 flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-golden shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground">Approval Pending</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your seller account is under review. You can add products but they won't be visible until approved.
                      </p>
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-background rounded-xl p-6 shadow-soft">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center">
                        <Package className="w-6 h-6 text-terracotta" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Products</p>
                        <p className="font-serif text-2xl text-foreground">{stats.totalProducts}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-6 shadow-soft">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-sage" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Orders</p>
                        <p className="font-serif text-2xl text-foreground">{stats.totalOrders}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-6 shadow-soft">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-golden/10 flex items-center justify-center">
                        <IndianRupee className="w-6 h-6 text-golden" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Earnings</p>
                        <p className="font-serif text-2xl text-foreground">₹{stats.totalEarnings.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-6 shadow-soft">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-vermilion/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-vermilion" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="font-serif text-2xl text-foreground">{seller.rating || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-background rounded-xl p-6 shadow-soft">
                  <h3 className="font-serif text-lg text-foreground mb-4">Quick Actions</h3>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/seller/products/new">
                      <Button variant="cultural">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Product
                      </Button>
                    </Link>
                    <Button variant="heritage" onClick={() => setActiveTab('orders')}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Orders
                    </Button>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-background rounded-xl p-6 shadow-soft">
                  <h3 className="font-serif text-lg text-foreground mb-4">Recent Orders</h3>
                  {orderItems.length > 0 ? (
                    <div className="space-y-4">
                      {orderItems.slice(0, 5).map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{item.product_name}</p>
                            <p className="text-sm text-muted-foreground">
                              Order #{item.orders?.order_number} • Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">₹{item.total_price}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.status === 'delivered' ? 'bg-sage/20 text-sage' :
                              item.status === 'shipped' ? 'bg-golden/20 text-golden' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No orders yet</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl text-foreground">Your Products</h2>
                  <Link to="/seller/products/new">
                    <Button variant="cultural">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </Link>
                </div>

                {products.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product: any) => {
                      const primaryImage = product.product_images?.find((img: any) => img.is_primary);
                      return (
                        <div key={product.id} className="bg-background rounded-xl overflow-hidden shadow-soft">
                          <div className="aspect-square bg-muted">
                            {primaryImage ? (
                              <img src={primaryImage.image_url} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-medium text-foreground line-clamp-1">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">{product.categories?.name}</p>
                              </div>
                              {product.is_approved ? (
                                <CheckCircle2 className="w-5 h-5 text-sage shrink-0" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-golden shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <span className="font-serif text-lg text-foreground">₹{product.price}</span>
                              <span className="text-sm text-muted-foreground">Stock: {product.stock_quantity}</span>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Link to={`/seller/products/${product.id}/edit`} className="flex-1">
                                <Button variant="heritage" size="sm" className="w-full">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-background rounded-xl p-12 text-center shadow-soft">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-foreground mb-2">No Products Yet</h3>
                    <p className="text-muted-foreground mb-6">Start by adding your first product</p>
                    <Link to="/seller/products/new">
                      <Button variant="cultural">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Product
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-foreground">Orders</h2>
                
                {orderItems.length > 0 ? (
                  <div className="bg-background rounded-xl shadow-soft overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-4 font-medium">Product</th>
                          <th className="text-left p-4 font-medium">Order #</th>
                          <th className="text-left p-4 font-medium">Qty</th>
                          <th className="text-left p-4 font-medium">Amount</th>
                          <th className="text-left p-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems.map((item: any) => (
                          <tr key={item.id} className="border-t border-border">
                            <td className="p-4">{item.product_name}</td>
                            <td className="p-4 text-muted-foreground">{item.orders?.order_number}</td>
                            <td className="p-4">{item.quantity}</td>
                            <td className="p-4 font-medium">₹{item.total_price}</td>
                            <td className="p-4">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                item.status === 'delivered' ? 'bg-sage/20 text-sage' :
                                item.status === 'shipped' ? 'bg-golden/20 text-golden' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-background rounded-xl p-12 text-center shadow-soft">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-foreground mb-2">No Orders Yet</h3>
                    <p className="text-muted-foreground">Orders will appear here when customers purchase your products</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-foreground">Settings</h2>
                
                <div className="bg-background rounded-xl p-6 shadow-soft">
                  <h3 className="font-medium text-foreground mb-4">Business Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Business Name</Label>
                      <p className="text-foreground">{seller.business_name}</p>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <p className="text-foreground">{seller.village}, {seller.district}</p>
                    </div>
                    <div>
                      <Label>Craft Specialty</Label>
                      <p className="text-foreground">{seller.craft_specialty || 'Not specified'}</p>
                    </div>
                    <div>
                      <Label>Experience</Label>
                      <p className="text-foreground">{seller.years_experience} years</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded-xl p-6 shadow-soft">
                  <h3 className="font-medium text-foreground mb-4">Payment Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>UPI ID</Label>
                      <p className="text-foreground">{seller.upi_id || 'Not set'}</p>
                    </div>
                    <div>
                      <Label>Bank Account</Label>
                      <p className="text-foreground">{seller.bank_account_number ? '••••' + seller.bank_account_number.slice(-4) : 'Not set'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
