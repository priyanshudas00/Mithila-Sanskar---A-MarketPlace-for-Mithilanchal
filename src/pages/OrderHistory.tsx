import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from "lucide-react";

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string;
  total: number;
  created_at: string;
  order_items: OrderItem[];
}

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  pending: { icon: Clock, color: "text-golden", label: "Pending" },
  confirmed: { icon: CheckCircle, color: "text-primary", label: "Confirmed" },
  processing: { icon: Package, color: "text-primary", label: "Processing" },
  shipped: { icon: Truck, color: "text-sage", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "text-sage", label: "Delivered" },
  cancelled: { icon: XCircle, color: "text-vermilion", label: "Cancelled" },
};

const OrderHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        order_number,
        status,
        payment_status,
        payment_method,
        total,
        created_at,
        order_items (
          id,
          product_name,
          product_image,
          quantity,
          unit_price,
          total_price
        )
      `)
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (data) {
      setOrders(data as Order[]);
    }
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-24 md:pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl text-foreground mb-8">My Orders</h1>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-xl shadow-soft">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="font-serif text-xl text-foreground mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">
                Start shopping to see your orders here
              </p>
              <Link to="/shop">
                <Button variant="cultural">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const status = statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = status.icon;
                
                return (
                  <div key={order.id} className="bg-card rounded-xl shadow-soft overflow-hidden">
                    {/* Order Header */}
                    <div className="p-4 border-b border-border bg-muted/50">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Order placed</p>
                            <p className="font-medium text-foreground">{formatDate(order.created_at)}</p>
                          </div>
                          <div className="hidden sm:block h-8 w-px bg-border" />
                          <div className="hidden sm:block">
                            <p className="text-sm text-muted-foreground">Order number</p>
                            <p className="font-mono text-sm text-foreground">{order.order_number}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-secondary ${status.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">{status.label}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-4">
                      <div className="space-y-4">
                        {order.order_items.slice(0, 2).map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
                              {item.product_image ? (
                                <img
                                  src={item.product_image}
                                  alt={item.product_name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-6 h-6 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{item.product_name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              <p className="text-sm font-medium text-foreground">₹{item.total_price.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                        {order.order_items.length > 2 && (
                          <p className="text-sm text-muted-foreground">
                            +{order.order_items.length - 2} more items
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Order Footer */}
                    <div className="p-4 border-t border-border flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-serif text-xl text-foreground">₹{order.total.toLocaleString()}</p>
                      </div>
                      <Link to={`/order/${order.id}`}>
                        <Button variant="heritage" size="sm">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderHistory;