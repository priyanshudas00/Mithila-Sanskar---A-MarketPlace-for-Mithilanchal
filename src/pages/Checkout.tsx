import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { useCart, CartItem } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MapPin, CreditCard, Truck, CheckCircle } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

interface Address {
  id: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [isLoading, setIsLoading] = useState(false);
  const [showNewAddress, setShowNewAddress] = useState(false);
  
  const [newAddress, setNewAddress] = useState({
    full_name: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "Bihar",
    pincode: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchAddresses();
  }, [user, navigate]);

  const fetchAddresses = async () => {
    const { data } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user?.id)
      .order("is_default", { ascending: false });
    
    if (data) {
      setAddresses(data);
      const defaultAddr = data.find(a => a.is_default);
      if (defaultAddr) setSelectedAddress(defaultAddr.id);
    }
  };

  const handleAddAddress = async () => {
    if (!user) return;
    
    const { error } = await supabase.from("addresses").insert({
      ...newAddress,
      user_id: user.id,
      is_default: addresses.length === 0,
    });

    if (error) {
      toast({ title: "Error", description: "Failed to add address", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Address added successfully" });
      setShowNewAddress(false);
      setNewAddress({
        full_name: "",
        phone: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "Bihar",
        pincode: "",
      });
      fetchAddresses();
    }
  };

  const handlePlaceOrder = async () => {
    if (!user || !selectedAddress || cartItems.length === 0) return;
    
    setIsLoading(true);
    
    const address = addresses.find(a => a.id === selectedAddress);
    if (!address) return;

    const shippingCost = cartTotal >= 1500 ? 0 : 99;
    const total = cartTotal + shippingCost;

    // Get seller_id for products
    const productIds = cartItems.map(item => item.product_id);
    const { data: productsWithSeller } = await supabase
      .from("products")
      .select("id, seller_id")
      .in("id", productIds);
    
    const sellerMap = new Map(productsWithSeller?.map(p => [p.id, p.seller_id]));

    const shippingAddressData = {
      full_name: address.full_name,
      phone: address.phone,
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    } as unknown as Json;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        address_id: selectedAddress,
        subtotal: cartTotal,
        shipping_cost: shippingCost,
        total,
        payment_method: paymentMethod,
        payment_status: "pending",
        shipping_address: shippingAddressData,
        order_number: "", // Will be overwritten by trigger
      } as any)
      .select()
      .single();

    if (orderError || !order) {
      toast({ title: "Error", description: "Failed to place order", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // Add order items
    const orderItems = cartItems.map((item: CartItem) => ({
      order_id: order.id,
      product_id: item.product_id,
      seller_id: sellerMap.get(item.product_id),
      quantity: item.quantity,
      unit_price: item.product.price,
      total_price: item.product.price * item.quantity,
      product_name: item.product.name,
      product_image: item.product_image || null,
      seller_earning: (item.product.price * item.quantity) * 0.8,
      platform_fee: (item.product.price * item.quantity) * 0.2,
    }));

    await supabase.from("order_items").insert(orderItems);
    clearCart.mutate();
    
    setIsLoading(false);
    navigate(`/order-success/${order.id}`);
  };

  const shippingCost = cartTotal >= 1500 ? 0 : 99;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl text-foreground mb-8">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {[
              { num: 1, label: "Address", icon: MapPin },
              { num: 2, label: "Payment", icon: CreditCard },
              { num: 3, label: "Review", icon: CheckCircle },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <button
                  onClick={() => step > s.num && setStep(s.num)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    step >= s.num
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {idx < 2 && (
                  <div className={`w-12 h-0.5 ${step > s.num ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Address */}
              {step === 1 && (
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <h2 className="font-serif text-xl text-foreground mb-4">Delivery Address</h2>
                  
                  {addresses.length > 0 && !showNewAddress && (
                    <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                      <div className="space-y-4">
                        {addresses.map((addr) => (
                          <label
                            key={addr.id}
                            className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedAddress === addr.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem value={addr.id} className="mt-1" />
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{addr.full_name}</p>
                              <p className="text-sm text-muted-foreground">
                                {addr.address_line_1}
                                {addr.address_line_2 && `, ${addr.address_line_2}`}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {addr.city}, {addr.state} - {addr.pincode}
                              </p>
                              <p className="text-sm text-muted-foreground">Phone: {addr.phone}</p>
                            </div>
                            {addr.is_default && (
                              <span className="text-xs bg-sage/20 text-sage px-2 py-1 rounded">Default</span>
                            )}
                          </label>
                        ))}
                      </div>
                    </RadioGroup>
                  )}

                  {(showNewAddress || addresses.length === 0) && (
                    <div className="space-y-4 mt-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="full_name">Full Name</Label>
                          <Input
                            id="full_name"
                            value={newAddress.full_name}
                            onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address_line_1">Address Line 1</Label>
                        <Input
                          id="address_line_1"
                          value={newAddress.address_line_1}
                          onChange={(e) => setNewAddress({ ...newAddress, address_line_1: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address_line_2">Address Line 2 (Optional)</Label>
                        <Input
                          id="address_line_2"
                          value={newAddress.address_line_2}
                          onChange={(e) => setNewAddress({ ...newAddress, address_line_2: e.target.value })}
                        />
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input
                            id="pincode"
                            value={newAddress.pincode}
                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button onClick={handleAddAddress} variant="cultural">
                          Save Address
                        </Button>
                        {addresses.length > 0 && (
                          <Button variant="outline" onClick={() => setShowNewAddress(false)}>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {addresses.length > 0 && !showNewAddress && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setShowNewAddress(true)}
                    >
                      + Add New Address
                    </Button>
                  )}

                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!selectedAddress}
                      variant="cultural"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <h2 className="font-serif text-xl text-foreground mb-4">Payment Method</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <label
                        className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === "cod"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value="cod" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Cash on Delivery (COD)</p>
                          <p className="text-sm text-muted-foreground">
                            Pay when your order is delivered
                          </p>
                        </div>
                        <Truck className="w-6 h-6 text-primary" />
                      </label>

                      <label
                        className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === "upi"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value="upi" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">UPI Payment</p>
                          <p className="text-sm text-muted-foreground">
                            Pay using any UPI app (Google Pay, PhonePe, Paytm)
                          </p>
                        </div>
                        <CreditCard className="w-6 h-6 text-primary" />
                      </label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "upi" && (
                    <div className="mt-6 p-4 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">
                        UPI ID will be shared after order confirmation. You'll receive payment details via SMS/Email.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} variant="cultural">
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <h2 className="font-serif text-xl text-foreground mb-4">Review Order</h2>
                  
                  {/* Delivery Address */}
                  <div className="mb-6 p-4 bg-secondary rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Delivering to:</h3>
                    {(() => {
                      const addr = addresses.find(a => a.id === selectedAddress);
                      return addr ? (
                        <>
                          <p className="text-foreground">{addr.full_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {addr.address_line_1}, {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          <p className="text-sm text-muted-foreground">Phone: {addr.phone}</p>
                        </>
                      ) : null;
                    })()}
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item: CartItem) => (
                      <div key={item.id} className="flex gap-4 py-4 border-b border-border last:border-0">
                        <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden">
                          {item.product_image && (
                            <img
                              src={item.product_image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-foreground">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Payment Method */}
                  <div className="p-4 bg-secondary rounded-lg mb-6">
                    <h3 className="font-medium text-foreground mb-1">Payment Method</h3>
                    <p className="text-muted-foreground">
                      {paymentMethod === "cod" ? "Cash on Delivery" : "UPI Payment"}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                      variant="cultural"
                      size="lg"
                    >
                      {isLoading ? "Placing Order..." : "Place Order"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-soft sticky top-28">
                <h3 className="font-serif text-lg text-foreground mb-4">Order Summary</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                    <span className="text-foreground">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shippingCost === 0 ? "text-sage" : "text-foreground"}>
                      {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                    </span>
                  </div>
                  {cartTotal < 1500 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{(1500 - cartTotal).toLocaleString()} more for free shipping
                    </p>
                  )}
                </div>

                <div className="border-t border-border mt-4 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="font-serif text-2xl text-foreground">
                      ₹{(cartTotal + shippingCost).toLocaleString()}
                    </span>
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

export default Checkout;