import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Package, MapPin, Phone } from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  total: number;
  status: string;
  payment_method: string;
  payment_status: string;
  shipping_address: {
    full_name: string;
    phone: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  created_at: string;
}

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();
    
    if (data) {
      setOrder({
        ...data,
        shipping_address: data.shipping_address as unknown as Order["shipping_address"],
      });
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const shippingAddr = order.shipping_address;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-24 md:pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-sage" />
            </div>
            <h1 className="font-serif text-3xl text-foreground mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground">
              Thank you for supporting Mithila artisans. Your order has been confirmed.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-card rounded-xl p-6 shadow-soft mb-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-mono text-lg font-semibold text-foreground">{order.order_number}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-serif text-2xl text-foreground">₹{order.total.toLocaleString()}</p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Delivery Address</p>
                  <p className="text-muted-foreground">
                    {shippingAddr.full_name}<br />
                    {shippingAddr.address_line_1}
                    {shippingAddr.address_line_2 && `, ${shippingAddr.address_line_2}`}<br />
                    {shippingAddr.city}, {shippingAddr.state} - {shippingAddr.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Contact</p>
                  <p className="text-muted-foreground">{shippingAddr.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Payment Method</p>
                  <p className="text-muted-foreground">
                    {order.payment_method === "cod" ? "Cash on Delivery" : "UPI Payment"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-secondary rounded-xl p-6 mb-8">
            <h3 className="font-serif text-lg text-foreground mb-4">What happens next?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-terracotta">1</span>
                </span>
                <span className="text-muted-foreground">
                  You'll receive an order confirmation email with tracking details
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-terracotta">2</span>
                </span>
                <span className="text-muted-foreground">
                  Our artisans will carefully prepare your handcrafted items
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-terracotta">3</span>
                </span>
                <span className="text-muted-foreground">
                  Estimated delivery: 5-7 business days
                </span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button variant="cultural" size="lg">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="heritage" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccess;