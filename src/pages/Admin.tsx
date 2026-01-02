import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/contexts/NotificationContext";
import { NotificationTemplates } from "@/lib/notifications";
import { 
  Users, Package, ShoppingBag, TrendingUp, CheckCircle, XCircle, 
  Star, Eye, BarChart3, Power, Trash2, Phone, CreditCard, MapPin, Mail
} from "lucide-react";

interface Seller {
  id: string;
  user_id: string;
  business_name: string;
  village: string;
  district: string;
  craft_specialty: string;
  years_experience: number;
  phone: string;
  upi_id: string;
  bank_account_number: string;
  bank_ifsc: string;
  is_approved: boolean;
  is_verified: boolean;
  created_at: string;
  profiles?: { email: string; full_name: string };
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  stock_quantity: number;
  is_approved: boolean;
  is_featured: boolean;
  is_active: boolean;
  is_handmade: boolean;
  created_at: string;
  sellers?: { business_name: string };
  categories?: { name: string };
  product_images?: { image_url: string; is_primary: boolean }[];
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
  const { sendNotification } = useNotifications();
  
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
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
    
    // Fetch sellers with all details
    const { data: sellersData, error: sellersError } = await supabase
      .from("sellers")
      .select(`
        id,
        user_id,
        business_name,
        village,
        district,
        craft_specialty,
        years_experience,
        phone,
        upi_id,
        bank_account_number,
        bank_ifsc,
        is_approved,
        is_verified,
        created_at
      `)
      .order("created_at", { ascending: false });
    
    if (sellersError) {
      console.error("Error fetching sellers:", sellersError);
    }

    // Fetch profiles to match with sellers
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("user_id, email, full_name");

    // Merge seller and profile data
    if (sellersData && profilesData) {
      const enrichedSellers = sellersData.map(seller => ({
        ...seller,
        profiles: profilesData.find(p => p.user_id === seller.user_id)
      }));
      setSellers(enrichedSellers as unknown as Seller[]);
    }

    // Fetch products
    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select(`
        id,
        name,
        description,
        price,
        original_price,
        stock_quantity,
        is_approved,
        is_featured,
        is_active,
        is_handmade,
        created_at,
        seller_id,
        category_id
      `)
      .order("created_at", { ascending: false });

    // Fetch sellers for product display
    const { data: sellersForProducts } = await supabase
      .from("sellers")
      .select("id, business_name");

    // Fetch categories
    const { data: categoriesData } = await supabase
      .from("categories")
      .select("id, name");

    // Fetch product images
    const { data: productImagesData } = await supabase
      .from("product_images")
      .select("product_id, image_url, is_primary");

    if (productsError) {
      console.error("Error fetching products:", productsError);
    }

    if (productsData && sellersForProducts) {
      const enrichedProducts = productsData.map(product => ({
        ...product,
        sellers: sellersForProducts.find(s => s.id === product.seller_id)
      }));
      setProducts(enrichedProducts as unknown as Product[]);
    }

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
      
      // Send notification for seller approval/rejection
      if (approve) {
        await sendNotification(NotificationTemplates.sellerApproved());
      } else {
        await sendNotification({
          title: "Seller Rejected",
          body: "A seller application has been rejected.",
          icon: "/icon-192x192.png",
          tag: "seller-rejected",
        });
      }
      
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
      
      // Send notification for product approval/rejection
      if (approve) {
        await sendNotification(NotificationTemplates.productApproved("Product"));
      } else {
        await sendNotification({
          title: "Product Rejected",
          body: "A product has been rejected by admin.",
          icon: "/icon-192x192.png",
          tag: "product-rejected",
        });
      }
      
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
      
      // Send notification for product featuring
      if (featured) {
        await sendNotification({
          title: "Product Featured! ⭐",
          body: "A product has been added to featured section.",
          icon: "/icon-192x192.png",
          tag: "product-featured",
        });
      }
      
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
      
      // Send notification for seller verification
      if (verified) {
        await sendNotification({
          title: "Seller Verified! ✓",
          body: "A seller has been verified and marked as trusted.",
          icon: "/icon-192x192.png",
          tag: "seller-verified",
        });
      }
      
      fetchData();
    }
  };

  const handleToggleProduct = async (productId: string, isActive: boolean) => {
    const { error } = await supabase
      .from("products")
      .update({ is_active: isActive })
      .eq("id", productId);

    if (error) {
      toast({ title: "Error", description: "Failed to update product", variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Product ${isActive ? "enabled" : "disabled"} in shop` });
      fetchData();
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    // First delete product images
    await supabase.from("product_images").delete().eq("product_id", productId);
    
    // Then delete the product
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      toast({ title: "Error", description: "Failed to delete product", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Product deleted successfully" });
      setShowProductModal(false);
      fetchData();
    }
  };

  const handleDeleteSeller = async (sellerId: string) => {
    if (!confirm("Are you sure you want to delete this seller? This will also delete all their products.")) {
      return;
    }

    // Get seller's products
    const { data: sellerProducts } = await supabase
      .from("products")
      .select("id")
      .eq("seller_id", sellerId);

    // Delete product images for all seller's products
    if (sellerProducts) {
      for (const product of sellerProducts) {
        await supabase.from("product_images").delete().eq("product_id", product.id);
      }
    }

    // Delete seller's products
    await supabase.from("products").delete().eq("seller_id", sellerId);

    // Delete seller
    const { error } = await supabase
      .from("sellers")
      .delete()
      .eq("id", sellerId);

    if (error) {
      toast({ title: "Error", description: "Failed to delete seller", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Seller and all their products deleted" });
      setShowSellerModal(false);
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
                              {seller.phone && (
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                  <Phone className="w-3 h-3" /> {seller.phone}
                                </p>
                              )}
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {seller.village}, {seller.district}
                            </td>
                            <td className="p-4 text-muted-foreground">
                              <div>
                                {seller.craft_specialty}
                                {seller.years_experience && (
                                  <p className="text-xs text-muted-foreground">
                                    {seller.years_experience} years exp.
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-col items-start gap-1">
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
                              <div className="flex items-center gap-2 flex-wrap">
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
                                    {!seller.is_verified ? (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleVerifySeller(seller.id, true)}
                                        title="Verify Seller"
                                      >
                                        <Star className="w-4 h-4 mr-1" />
                                        Verify
                                      </Button>
                                    ) : (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleVerifySeller(seller.id, false)}
                                        title="Remove Verification"
                                      >
                                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                                      </Button>
                                    )}
                                  </>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => {
                                    setSelectedSeller(seller);
                                    setShowSellerModal(true);
                                  }}
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleDeleteSeller(seller.id)}
                                  title="Delete Seller"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
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
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.description}</p>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {product.sellers?.business_name}
                          </td>
                          <td className="p-4 text-foreground">
                            <div>
                              <span className="font-medium">₹{product.price.toLocaleString()}</span>
                              {product.original_price && product.original_price > product.price && (
                                <span className="text-xs text-muted-foreground line-through ml-2">
                                  ₹{product.original_price.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">Stock: {product.stock_quantity || 0}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col items-start gap-1">
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
                              {product.is_active === false && (
                                <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
                                  Disabled
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 flex-wrap">
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
                                    title={product.is_featured ? "Remove from Featured" : "Add to Featured"}
                                  >
                                    <Star className={`w-4 h-4 ${product.is_featured ? "fill-current" : ""}`} />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant={product.is_active !== false ? "outline" : "secondary"}
                                    onClick={() => handleToggleProduct(product.id, product.is_active === false)}
                                    title={product.is_active !== false ? "Disable in Shop" : "Enable in Shop"}
                                  >
                                    <Power className={`w-4 h-4 ${product.is_active === false ? "text-gray-500" : "text-green-600"}`} />
                                  </Button>
                                </>
                              )}
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setShowProductModal(true);
                                }}
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteProduct(product.id)}
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
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

      {/* Seller Details Modal */}
      <Dialog open={showSellerModal} onOpenChange={setShowSellerModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif">Seller Details</DialogTitle>
          </DialogHeader>
          {selectedSeller && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Business Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Business Name</p>
                    <p className="font-medium">{selectedSeller.business_name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Craft Specialty</p>
                    <p className="font-medium">{selectedSeller.craft_specialty}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Years of Experience</p>
                    <p className="font-medium">{selectedSeller.years_experience || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{(selectedSeller.profiles as any)?.email || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Contact Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedSeller.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Location
                    </p>
                    <p className="font-medium">{selectedSeller.village}, {selectedSeller.district}</p>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Payment Details
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">UPI ID</p>
                    <p className="font-medium font-mono">{selectedSeller.upi_id || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bank Account</p>
                    <p className="font-medium font-mono">{selectedSeller.bank_account_number || "N/A"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">IFSC Code</p>
                    <p className="font-medium font-mono">{selectedSeller.bank_ifsc || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-sm rounded-full ${selectedSeller.is_approved ? "bg-sage/20 text-sage" : "bg-vermilion/20 text-vermilion"}`}>
                  {selectedSeller.is_approved ? "Approved" : "Pending Approval"}
                </span>
                {selectedSeller.is_verified && (
                  <span className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-full">
                    Verified
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t">
                {!selectedSeller.is_approved && (
                  <Button onClick={() => { handleApproveSeller(selectedSeller.id, true); setShowSellerModal(false); }}>
                    <CheckCircle className="w-4 h-4 mr-2" /> Approve Seller
                  </Button>
                )}
                {selectedSeller.is_approved && !selectedSeller.is_verified && (
                  <Button variant="outline" onClick={() => { handleVerifySeller(selectedSeller.id, true); setShowSellerModal(false); }}>
                    <Star className="w-4 h-4 mr-2" /> Verify Seller
                  </Button>
                )}
                <Button 
                  variant="destructive" 
                  onClick={() => handleDeleteSeller(selectedSeller.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Seller
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Product Details Modal */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif">Product Details</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              {/* Product Info */}
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4" /> Product Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Product Name</p>
                    <p className="font-medium text-lg">{selectedProduct.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Description</p>
                    <p className="font-medium">{selectedProduct.description || "No description"}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-medium text-lg">₹{selectedProduct.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Original Price</p>
                      <p className="font-medium">₹{selectedProduct.original_price?.toLocaleString() || selectedProduct.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Stock</p>
                      <p className="font-medium">{selectedProduct.stock_quantity || 0} units</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Seller Information
                </h4>
                <p className="font-medium">{selectedProduct.sellers?.business_name || "Unknown"}</p>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 text-sm rounded-full ${selectedProduct.is_approved ? "bg-sage/20 text-sage" : "bg-vermilion/20 text-vermilion"}`}>
                  {selectedProduct.is_approved ? "Approved" : "Pending Approval"}
                </span>
                {selectedProduct.is_featured && (
                  <span className="px-3 py-1 text-sm bg-golden/20 text-golden rounded-full">
                    Featured
                  </span>
                )}
                <span className={`px-3 py-1 text-sm rounded-full ${selectedProduct.is_active !== false ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                  {selectedProduct.is_active !== false ? "Active in Shop" : "Disabled"}
                </span>
                {selectedProduct.is_handmade && (
                  <span className="px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded-full">
                    Handmade
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t">
                {!selectedProduct.is_approved && (
                  <Button onClick={() => { handleApproveProduct(selectedProduct.id, true); setShowProductModal(false); }}>
                    <CheckCircle className="w-4 h-4 mr-2" /> Approve Product
                  </Button>
                )}
                {selectedProduct.is_approved && (
                  <>
                    <Button 
                      variant={selectedProduct.is_featured ? "cultural" : "outline"}
                      onClick={() => { handleFeatureProduct(selectedProduct.id, !selectedProduct.is_featured); setShowProductModal(false); }}
                    >
                      <Star className={`w-4 h-4 mr-2 ${selectedProduct.is_featured ? "fill-current" : ""}`} />
                      {selectedProduct.is_featured ? "Remove Featured" : "Add to Featured"}
                    </Button>
                    <Button 
                      variant={selectedProduct.is_active !== false ? "outline" : "secondary"}
                      onClick={() => { handleToggleProduct(selectedProduct.id, selectedProduct.is_active === false); setShowProductModal(false); }}
                    >
                      <Power className={`w-4 h-4 mr-2 ${selectedProduct.is_active === false ? "text-gray-500" : "text-green-600"}`} />
                      {selectedProduct.is_active !== false ? "Disable in Shop" : "Enable in Shop"}
                    </Button>
                  </>
                )}
                <Button 
                  variant="destructive" 
                  onClick={() => handleDeleteProduct(selectedProduct.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Product
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;