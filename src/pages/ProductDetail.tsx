import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Share2, Truck, Shield, RotateCcw, Star, MapPin, Minus, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useProduct } from "@/hooks/useProducts";
import productPainting from "@/assets/product-painting-1.jpg";
import artisanImage from "@/assets/artisan-painting.jpg";
import { getSiteOrigin } from "@/lib/config";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id || "");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleLike = () => {
    setLiked((v) => !v);
    toast({ title: liked ? "Removed from wishlist" : "Added to wishlist" });
  };

  const handleShare = async () => {
    const url = `${getSiteOrigin()}${window.location.pathname}${window.location.search}`;
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({ title: product.name, url });
      } catch (e) {
        // ignore
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied to clipboard" });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left - go to next image
        setActiveImage((prev) => (prev + 1) % product.images.length);
      } else {
        // Swiped right - go to previous image
        setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    }
  };

  const goToPrevious = () => {
    setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const goToNext = () => {
    if (!product) return;
    setActiveImage((prev) => (prev + 1) % product.images.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-serif mb-4">Product not found</h1>
            <Link to="/shop">
              <Button variant="heritage">Back to Shop</Button>
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

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-foreground">Shop</Link>
            <span>/</span>
            <Link to={`/shop?category=${product.category?.id || "all"}`} className="hover:text-foreground">{product.category?.name || "Crafts"}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image with Swipe Support */}
              <div 
                className="relative aspect-square rounded-2xl overflow-hidden bg-card shadow-cultural group cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={product.images[activeImage]?.image_url || productPainting}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  draggable={false}
                />
                
                {/* Image Counter */}
                <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {activeImage + 1} / {product.images.length}
                </div>
                
                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${
                        activeImage === idx ? "border-terracotta" : "border-transparent"
                      }`}
                    >
                      <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex items-center gap-3">
                <span className="artisan-badge">Handcrafted</span>
                {product.is_gi_tagged && (
                  <span className="px-3 py-1 text-xs font-medium bg-sage/20 text-sage rounded-full">
                    GI Tagged
                  </span>
                )}
              </div>

              {/* Title & Category */}
              <div>
                <p className="text-sm text-primary uppercase tracking-wider mb-2">
                  {product.category?.name || "Crafts"}
                </p>
                <h1 className="font-serif text-3xl md:text-4xl text-foreground">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.seller?.rating || 0)
                          ? "text-golden fill-golden"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-foreground font-medium">{product.seller?.rating || 0}</span>
                <span className="text-muted-foreground">({product.views_count || 0} views)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-4xl text-foreground">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.compare_at_price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.compare_at_price.toLocaleString()}
                    </span>
                    <span className="text-sage font-medium">
                      {Math.round((1 - product.price / product.compare_at_price) * 100)}% off
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "Authentic handcrafted product from Mithila artisans"}
              </p>

              {/* Artisan Card */}
              <Link
                to={`/artisan/${product.seller?.business_name.toLowerCase().replace(/\s/g, "-")}`}
                className="flex items-center gap-4 p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
              >
                <img
                  src={product.seller?.avatar_url || artisanImage}
                  alt={product.seller?.business_name || "Artisan"}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Created by</p>
                  <p className="font-serif text-lg text-foreground">{product.seller?.business_name || "Unknown Artisan"}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {product.seller?.village || "Mithila"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-golden fill-golden" />
                    <span className="font-medium">{product.seller?.rating || 0}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{product.seller?.years_experience || 0}+ years</p>
                </div>
              </Link>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-md transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button variant="cultural" size="xl" className="flex-1" onClick={() => addToCart.mutate({ productId: product.id, quantity })}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="heritage" size="icon" className="shrink-0 w-12 h-12" onClick={handleLike}>
                  <Heart className={`w-5 h-5 ${liked ? 'text-vermilion fill-vermilion' : ''}`} />
                </Button>
                <Button variant="heritage" size="icon" className="shrink-0 w-12 h-12" onClick={handleShare}>
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">Pan India</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Authenticity</p>
                  <p className="text-xs text-muted-foreground">Guaranteed</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">7 Day</p>
                  <p className="text-xs text-muted-foreground">Returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Story */}
          <div className="mt-16 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">The Story Behind This Art</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {product.story || product.description}
              </p>
              <div className="space-y-3">
                {product.materials && (
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">Materials:</span>
                    <span className="font-medium">{Array.isArray(product.materials) ? product.materials.join(", ") : product.materials}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span className="font-medium">{product.dimensions}</span>
                  </div>
                )}
                {product.craft_time && (
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">Craft Time:</span>
                    <span className="font-medium">{product.craft_time}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-secondary rounded-xl p-6">
              <h3 className="font-serif text-lg text-foreground mb-4">Why This Matters</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-terracotta" />
                  </span>
                  <span className="text-muted-foreground">80% of your purchase goes directly to the artisan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-terracotta" />
                  </span>
                  <span className="text-muted-foreground">Supports preservation of 2,500+ year old art form</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-terracotta" />
                  </span>
                  <span className="text-muted-foreground">Empowers women artisans in rural Bihar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-terracotta" />
                  </span>
                  <span className="text-muted-foreground">100% eco-friendly natural materials</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
