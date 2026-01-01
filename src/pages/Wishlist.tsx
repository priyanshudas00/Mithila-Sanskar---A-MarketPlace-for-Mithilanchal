import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, ShoppingCart, ArrowRight, Search, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { wishlistItems, wishlistLoading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream to-background flex flex-col">
        <Navigation />
        <main className="container mx-auto px-4 py-20 flex-1 flex flex-col items-center justify-center text-center">
          <Heart className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
          <h1 className="text-3xl font-serif font-bold mb-2">Sign in to View Wishlist</h1>
          <p className="text-muted-foreground mb-6">Please sign in to save and view your favorite products</p>
          <Button onClick={() => navigate("/auth")} size="lg" variant="heritage" className="gap-2">
            Sign In Now
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredItems = wishlistItems.filter((item: any) =>
    item.products?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item: any) => {
    if (item.products?.stock_quantity > 0) {
      addToCart(item.product_id, 1);
      toast({ title: "Added to cart" });
    } else {
      toast({ title: "Product out of stock", variant: "destructive" });
    }
  };

  const handleRemoveFromWishlist = (wishlistId: string) => {
    removeFromWishlist(wishlistId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-28 pb-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-vermilion" />
            <h1 className="text-4xl font-serif font-bold">My Wishlist</h1>
          </div>
          <p className="text-muted-foreground">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {/* Search */}
        {wishlistItems.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search your wishlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Empty State */}
        {!wishlistLoading && wishlistItems.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-serif font-bold mb-2">Your Wishlist is Empty</h2>
              <p className="text-muted-foreground mb-6">
                Start adding products to your wishlist by clicking the heart icon
              </p>
              <Link to="/shop">
                <Button size="lg" variant="heritage" className="gap-2">
                  <Search className="w-4 h-4" />
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Wishlist Items Grid */}
        {wishlistItems.length > 0 && (
          <>
            {filteredItems.length === 0 ? (
              <Card className="text-center py-8">
                <CardContent>
                  <p className="text-muted-foreground">No items match your search</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item: any) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative bg-muted h-48 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎨</div>
                        <p className="text-sm text-muted-foreground">{item.products?.name?.substring(0, 30)}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-muted transition-colors"
                        title="Remove from wishlist"
                      >
                        <Heart className="w-5 h-5 text-vermilion fill-vermilion" />
                      </button>
                    </div>

                    <CardContent className="pt-4">
                      <Link to={`/product/${item.product_id}`}>
                        <h3 className="font-medium hover:text-primary transition-colors truncate">
                          {item.products?.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2 truncate">
                        {item.products?.sellers?.business_name}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-vermilion">
                          ₹{item.products?.price}
                        </span>
                        {item.products?.compare_at_price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{item.products?.compare_at_price}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/product/${item.product_id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            View
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleAddToCart(item)}
                          size="sm"
                          variant="heritage"
                          disabled={!item.products?.stock_quantity}
                          className="flex-1 gap-1"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Cart
                        </Button>
                      </div>

                      {!item.products?.stock_quantity && (
                        <p className="text-xs text-destructive mt-2">Out of Stock</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Continue Shopping */}
            {filteredItems.length > 0 && (
              <div className="mt-8 text-center">
                <Link to="/shop">
                  <Button variant="ghost" className="gap-2">
                    Continue Shopping
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
