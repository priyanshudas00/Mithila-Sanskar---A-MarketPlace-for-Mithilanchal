import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, Package, ShoppingBag, TrendingUp, CheckCircle, XCircle, 
  Star, Eye, BarChart3
} from "lucide-react";

interface Seller {
  id: string;
  user_id: string;
  business_name: string;
  village: string;
  district: string;
  craft_specialty: string;
  is_approved: boolean;
  is_verified: boolean;
  created_at: string;
  profiles?: { email: string; full_name: string };
}

interface Product {
  id: string;
  name: string;
  price: number;
  is_approved: boolean;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  sellers?: { business_name: string };
}

interface DashboardStats {
  totalSellers: number;
  pendingSellers: number;
  totalProducts: number;
  pendingProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalSellers: 0,
    pendingSellers: 0,
    totalProducts: 0,
    pendingProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!isAdmin) {
      navigate("/");
      toast({ title: "Access Denied", description: "Admin privileges required", variant: "destructive" });
      return;
    }
    fetchData();
  }, [user, isAdmin, navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    
    // Fetch sellers
    const { data: sellersData, error: sellersError } = await supabase
      .from("sellers")
      .select(`
        id,
        user_id,
        business_name,
        village,
        district,
        craft_specialty,
        is_approved,
        is_verified,
        created_at,
        profiles:user_id(email, full_name)
      `)
      .order("created_at", { ascending: false });
    
    if (sellersError) {
      console.error("Error fetching sellers:", sellersError);
    } else if (sellersData) {
      setSellers(sellersData as unknown as Seller[]);
    }

    // Fetch products
    const { data: productsData } = await supabase
      .from("products")
      .select("*, sellers(business_name)")
      .order("created_at", { ascending: false });
    
    if (productsData) setProducts(productsData as unknown as Product[]);

    // Fetch orders for stats
    const { data: ordersData } = await supabase
      .from("orders")
      .select("total");
    
    const totalRevenue = ordersData?.reduce((sum, o) => sum + (o.total || 0), 0) || 0;

    setStats({
      totalSellers: sellersData?.length || 0,
      pendingSellers: sellersData?.filter(s => !s.is_approved).length || 0,
      totalProducts: productsData?.length || 0,
      pendingProducts: productsData?.filter(p => !p.is_approved).length || 0,
      totalOrders: ordersData?.length || 0,
      totalRevenue,
    });

    setIsLoading(false);
  };

  const handleApproveSeller = async (sellerId: string, approve: boolean) => {
    const { error } = await supabase
      .from("sellers")
      .update({ is_approved: approve })
      .eq("id", sellerId);

    if (error) {
      toast({ title: "Error", description: "Failed to update seller", variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Seller ${approve ? "approved" : "rejected"}` });
      
      // Add seller role if approving
      if (approve) {
        const seller = sellers.find(s => s.id === sellerId);
        if (seller) {
          await supabase.from("user_roles").insert({
            user_id: seller.user_id,
            role: "seller",
          });
        }
      }
      
      fetchData();
    }
  };

  const handleApproveProduct = async (productId: string, approve: boolean) => {
    const { error } = await supabase
      .from("products")
      .update({ is_approved: approve })
      .eq("id", productId);

    if (error) {
      toast({ title: "Error", description: "Failed to update product", variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Product ${approve ? "approved" : "rejected"}` });
      fetchData();
    }
  };

  const handleFeatureProduct = async (productId: string, featured: boolean) => {
    const { error } = await supabase
      .from("products")
      .update({ is_featured: featured })
      .eq("id", productId);

    if (error) {
      toast({ title: "Error", description: "Failed to update product", variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Product ${featured ? "featured" : "unfeatured"}` });
      fetchData();
    }
  };

  const handleVerifySeller = async (sellerId: string, verified: boolean) => {
    const { error } = await supabase
      .from("sellers")
      .update({ is_verified: verified })
      .eq("id", sellerId);

    if (error) {
      toast({ title: "Error", description: "Failed to update seller", variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Seller ${verified ? "verified" : "unverified"}` });
      fetchData();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl text-foreground mb-8">Admin Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Sellers</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalSellers}</p>
                  {stats.pendingSellers > 0 && (
                    <p className="text-xs text-vermilion">{stats.pendingSellers} pending</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-sage" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalProducts}</p>
                  {stats.pendingProducts > 0 && (
                    <p className="text-xs text-vermilion">{stats.pendingProducts} pending</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-golden/10 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-golden" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-terracotta" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="sellers" className="space-y-6">
            <TabsList>
              <TabsTrigger value="sellers">
                <Users className="w-4 h-4 mr-2" />
                Sellers
              </TabsTrigger>
              <TabsTrigger value="products">
                <Package className="w-4 h-4 mr-2" />
                Products
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Sellers Tab */}
            <TabsContent value="sellers">
              <div className="bg-card rounded-xl shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-medium text-foreground">Seller</th>
                        <th className="text-left p-4 font-medium text-foreground">Location</th>
                        <th className="text-left p-4 font-medium text-foreground">Specialty</th>
                        <th className="text-left p-4 font-medium text-foreground">Status</th>
                        <th className="text-left p-4 font-medium text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sellers.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-muted-foreground">
                            No seller requests found
                          </td>
                        </tr>
                      ) : (
                        sellers.map((seller) => (
                          <tr key={seller.id} className="border-t border-border">
                            <td className="p-4">
                              <p className="font-medium text-foreground">{seller.business_name}</p>
                              <p className="text-sm text-muted-foreground">
                                {(seller.profiles as any)?.email || "N/A"}
                              </p>
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {seller.village}, {seller.district}
                            </td>
                            <td className="p-4 text-muted-foreground">{seller.craft_specialty}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {seller.is_approved ? (
                                  <span className="px-2 py-1 text-xs bg-sage/20 text-sage rounded-full">
                                    Approved
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 text-xs bg-vermilion/20 text-vermilion rounded-full">
                                    Pending
                                  </span>
                                )}
                                {seller.is_verified && (
                                  <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                                    Verified
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {!seller.is_approved ? (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleApproveSeller(seller.id, true)}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleApproveSeller(seller.id, false)}
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    {!seller.is_verified && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleVerifySeller(seller.id, true)}
                                      >
                                        <Star className="w-4 h-4 mr-1" />
                                        Verify
                                      </Button>
                                    )}
                                    <Button size="sm" variant="ghost">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products">
              <div className="bg-card rounded-xl shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-medium text-foreground">Product</th>
                        <th className="text-left p-4 font-medium text-foreground">Seller</th>
                        <th className="text-left p-4 font-medium text-foreground">Price</th>
                        <th className="text-left p-4 font-medium text-foreground">Status</th>
                        <th className="text-left p-4 font-medium text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-muted-foreground">
                            No products found
                          </td>
                        </tr>
                      ) : (
                        products.map((product) => (
                        <tr key={product.id} className="border-t border-border">
                          <td className="p-4">
                            <p className="font-medium text-foreground">{product.name}</p>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {product.sellers?.business_name}
                          </td>
                          <td className="p-4 text-foreground">₹{product.price.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {product.is_approved ? (
                                <span className="px-2 py-1 text-xs bg-sage/20 text-sage rounded-full">
                                  Approved
                                </span>
                              ) : (
                                <span className="px-2 py-1 text-xs bg-vermilion/20 text-vermilion rounded-full">
                                  Pending
                                </span>
                              )}
                              {product.is_featured && (
                                <span className="px-2 py-1 text-xs bg-golden/20 text-golden rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {!product.is_approved ? (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleApproveProduct(product.id, true)}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleApproveProduct(product.id, false)}
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    size="sm"
                                    variant={product.is_featured ? "cultural" : "outline"}
                                    onClick={() => handleFeatureProduct(product.id, !product.is_featured)}
                                  >
                                    <Star className={`w-4 h-4 mr-1 ${product.is_featured ? "fill-current" : ""}`} />
                                    {product.is_featured ? "Unfeature" : "Feature"}
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <h3 className="font-serif text-lg text-foreground mb-4">Revenue Overview</h3>
                  <div className="h-48 flex items-center justify-center bg-muted rounded-lg">
                    <p className="text-muted-foreground">Revenue chart coming soon</p>
                  </div>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <h3 className="font-serif text-lg text-foreground mb-4">Top Categories</h3>
                  <div className="h-48 flex items-center justify-center bg-muted rounded-lg">
                    <p className="text-muted-foreground">Category breakdown coming soon</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;