import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Package, MapPin, Phone, CreditCard, ArrowLeft, Clock, CheckCircle, Truck, XCircle } from "lucide-react";

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: string;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  created_at: string;
  shipping_address: {
    full_name: string;
    phone: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  order_items: OrderItem[];
}

const statusConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string; label: string }> = {
  pending: { icon: Clock, color: "text-golden", bgColor: "bg-golden/10", label: "Pending" },
  confirmed: { icon: CheckCircle, color: "text-primary", bgColor: "bg-primary/10", label: "Confirmed" },
  processing: { icon: Package, color: "text-primary", bgColor: "bg-primary/10", label: "Processing" },
  shipped: { icon: Truck, color: "text-sage", bgColor: "bg-sage/10", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "text-sage", bgColor: "bg-sage/10", label: "Delivered" },
  cancelled: { icon: XCircle, color: "text-vermilion", bgColor: "bg-vermilion/10", label: "Cancelled" },
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (orderId) {
      fetchOrder();
    }
  }, [user, orderId, navigate]);

  const fetchOrder = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        order_number,
        status,
        payment_status,
        payment_method,
        subtotal,
        shipping_cost,
        total,
        created_at,
        shipping_address,
        order_items (
          id,
          product_name,
          product_image,
          quantity,
          unit_price,
          total_price,
          status
        )
      `)
      .eq("id", orderId)
      .eq("user_id", user?.id)
      .maybeSingle();

    if (data) {
      setOrder({
        ...data,
        shipping_address: data.shipping_address as unknown as Order["shipping_address"],
      });
    }
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 max-w-4xl text-center py-20">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="font-serif text-xl text-foreground mb-2">Order not found</h2>
            <p className="text-muted-foreground mb-6">This order doesn't exist or you don't have access to it.</p>
            <Link to="/orders">
              <Button variant="cultural">View All Orders</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const status = statusConfig[order.status] || statusConfig.pending;
  const StatusIcon = status.icon;
  const shippingAddr = order.shipping_address;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Link */}
          <Link to="/orders" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>

          {/* Order Header */}
          <div className="bg-card rounded-xl p-6 shadow-soft mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-serif text-2xl text-foreground mb-1">Order {order.order_number}</h1>
                <p className="text-sm text-muted-foreground">Placed on {formatDate(order.created_at)}</p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${status.bgColor} ${status.color}`}>
                <StatusIcon className="w-5 h-5" />
                <span className="font-medium">{status.label}</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <h2 className="font-serif text-lg text-foreground mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-border last:border-0">
                      <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden shrink-0">
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
                        <p className="font-medium text-foreground">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        <p className="text-sm text-muted-foreground">₹{item.unit_price.toLocaleString()} each</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">₹{item.total_price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              {/* Price Summary */}
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <h3 className="font-serif text-lg text-foreground mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={order.shipping_cost === 0 ? "text-sage" : "text-foreground"}>
                      {order.shipping_cost === 0 ? "FREE" : `₹${order.shipping_cost}`}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="font-serif text-xl text-foreground">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <h3 className="font-serif text-lg text-foreground mb-4">Delivery Address</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{shippingAddr.full_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {shippingAddr.address_line_1}
                        {shippingAddr.address_line_2 && `, ${shippingAddr.address_line_2}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {shippingAddr.city}, {shippingAddr.state} - {shippingAddr.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <p className="text-sm text-muted-foreground">{shippingAddr.phone}</p>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <h3 className="font-serif text-lg text-foreground mb-4">Payment</h3>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">
                      {order.payment_method === "cod" ? "Cash on Delivery" : "UPI Payment"}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      Status: {order.payment_status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetail;