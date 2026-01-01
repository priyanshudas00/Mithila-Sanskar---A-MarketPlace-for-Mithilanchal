import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, isLoading, updateQuantity, removeItem } = useCart();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-serif text-3xl text-foreground mb-4">Your Cart</h1>
            <p className="text-muted-foreground mb-8">Please login to view your cart.</p>
            <Link to="/auth">
              <Button variant="cultural" size="lg">Login</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-8">Shopping Cart</h1>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-terracotta border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-serif text-2xl text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Discover handcrafted treasures from Mithila</p>
              <Link to="/shop">
                <Button variant="cultural" size="lg">
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-card rounded-xl p-4 shadow-soft">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                      {item.product_image ? (
                        <img src={item.product_image} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Link to={`/product/${item.product_id}`} className="font-medium text-foreground hover:text-primary">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.product.seller.business_name}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity.mutate({ itemId: item.id, quantity: item.quantity - 1 })}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity.mutate({ itemId: item.id, quantity: item.quantity + 1 })}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-serif text-lg">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                          <button
                            onClick={() => removeItem.mutate(item.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl p-6 shadow-soft sticky top-28">
                  <h3 className="font-serif text-xl text-foreground mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-sage">Free</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span className="font-serif">₹{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link to="/checkout">
                    <Button variant="cultural" size="lg" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    80% of your purchase goes directly to artisans
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
