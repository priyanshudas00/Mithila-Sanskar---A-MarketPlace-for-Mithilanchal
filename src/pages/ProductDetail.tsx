import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Share2, Truck, Shield, RotateCcw, Star, MapPin, Minus, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { useProduct } from "@/hooks/useProducts";
import productPainting from "@/assets/product-painting-1.jpg";
import artisanImage from "@/assets/artisan-painting.jpg";
import { getSiteOrigin } from "@/lib/config";
import { useTranslation } from "react-i18next";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: product, isLoading } = useProduct(id || "");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const { t } = useTranslation();

  const handleLike = () => {
    setLiked((v) => !v);
    toast({ title: liked ? t("productDetail.wishlistRemoved") : t("productDetail.wishlistAdded") });
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
      toast({ title: t("productDetail.linkCopied") });
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
            <h1 className="text-2xl font-serif mb-4">{t("productDetail.notFound")}</h1>
            <Link to="/shop">
              <Button variant="heritage">{t("productDetail.backToShop")}</Button>
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
          <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-4 md:mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            <Link to="/" className="hover:text-foreground shrink-0">{t("productDetail.breadcrumb.home")}</Link>
            <span className="shrink-0">/</span>
            <Link to="/shop" className="hover:text-foreground shrink-0">{t("productDetail.breadcrumb.shop")}</Link>
            <span className="shrink-0">/</span>
            <Link to={`/shop?category=${product.category?.id || "all"}`} className="hover:text-foreground shrink-0">{product.category?.name || t("productDetail.breadcrumb.category")}</Link>
            <span className="shrink-0">/</span>
            <span className="text-foreground truncate max-w-[150px] sm:max-w-none">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-3 md:space-y-4">
              {/* Main Image with Swipe Support */}
              <div 
                className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-card shadow-cultural group cursor-grab active:cursor-grabbing -mx-4 sm:mx-0"
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
                
                {/* Navigation Arrows - Always visible on mobile */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-1.5 md:p-2 rounded-full opacity-70 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-md"
                      aria-label={t("productDetail.prevImage")}
                    >
                      <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-1.5 md:p-2 rounded-full opacity-70 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-md"
                      aria-label={t("productDetail.nextImage")}
                    >
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 px-4 sm:px-0 -mx-4 sm:mx-0 scrollbar-hide">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-md md:rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${
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
            <div className="space-y-4 md:space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <span className="artisan-badge">{t("productDetail.handcrafted")}</span>
                {product.is_gi_tagged && (
                  <span className="px-3 py-1 text-xs font-medium bg-sage/20 text-sage rounded-full">
                    {t("productDetail.gi")}
                  </span>
                )}
              </div>

              {/* Title & Category */}
              <div>
                <p className="text-xs md:text-sm text-primary uppercase tracking-wider mb-1 md:mb-2">
                  {product.category?.name || t("productDetail.breadcrumb.category")}
                </p>
                <h1 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <div className="flex items-center gap-0.5 md:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        i < Math.floor(product.seller?.rating || 0)
                          ? "text-golden fill-golden"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-foreground font-medium text-sm md:text-base">{product.seller?.rating || 0}</span>
                <span className="text-muted-foreground text-xs md:text-sm">{t("productDetail.views", { count: product.views_count || 0 })}</span>
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-baseline gap-2 md:gap-4">
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.compare_at_price && (
                  <>
                    <span className="text-base md:text-xl text-muted-foreground line-through">
                      ₹{product.compare_at_price.toLocaleString()}
                    </span>
                    <span className="text-sage font-medium text-sm md:text-base">
                      {Math.round((1 - product.price / product.compare_at_price) * 100)}% {t("productDetail.off")}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {product.description || t("productDetail.descriptionFallback")}
              </p>

              {/* Artisan Card */}
              <Link
                to={`/artisan/${product.seller?.business_name.toLowerCase().replace(/\s/g, "-")}`}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-secondary rounded-lg md:rounded-xl hover:bg-secondary/80 transition-colors"
              >
                <img
                  src={product.seller?.avatar_url || artisanImage}
                  alt={product.seller?.business_name || t("productDetail.unknownArtisan")}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground">{t("productDetail.createdBy")}</p>
                  <p className="font-serif text-base md:text-lg text-foreground truncate">{product.seller?.business_name || t("productDetail.unknownArtisan")}</p>
                  <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{product.seller?.village || t("productDetail.defaultVillage")}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-xs md:text-sm">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-golden fill-golden" />
                    <span className="font-medium">{product.seller?.rating || 0}</span>
                  </div>
                  <p className="text-xs text-muted-foreground hidden sm:block">{t("productDetail.years", { count: product.seller?.years_experience || 0 })}</p>
                </div>
              </Link>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 md:gap-3 bg-secondary rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-muted rounded-md transition-colors"
                  >
                    <Minus className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                  <span className="w-6 md:w-8 text-center font-medium text-sm md:text-base">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-muted rounded-md transition-colors"
                  >
                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </div>
                <Button variant="cultural" size="lg" className="flex-1 min-w-[140px] h-10 md:h-12 text-sm md:text-base" onClick={() => {
                  if (!user) {
                    navigate(`/auth?redirect=/product/${product.id}&addToCart=true`);
                    return;
                  }
                  addToCart.mutate({ productId: product.id, quantity });
                }}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t("productDetail.addToCart")}
                </Button>
                <Button variant="heritage" size="icon" className="shrink-0 w-10 h-10 md:w-12 md:h-12" onClick={handleLike}>
                  <Heart className={`w-4 h-4 md:w-5 md:h-5 ${liked ? 'text-vermilion fill-vermilion' : ''}`} />
                </Button>
                <Button variant="heritage" size="icon" className="shrink-0 w-10 h-10 md:w-12 md:h-12" onClick={handleShare}>
                  <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 pt-4 md:pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 text-primary" />
                  <p className="text-[10px] md:text-xs text-muted-foreground">{t("productDetail.trust.shipping")}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">{t("productDetail.trust.panIndia")}</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 text-primary" />
                  <p className="text-[10px] md:text-xs text-muted-foreground">{t("productDetail.trust.authenticity")}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">{t("productDetail.trust.guaranteed")}</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 text-primary" />
                  <p className="text-[10px] md:text-xs text-muted-foreground">{t("productDetail.trust.days")}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">{t("productDetail.trust.returns")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Story */}
          <div className="mt-8 md:mt-16 grid md:grid-cols-2 gap-6 md:gap-12">
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-foreground mb-3 md:mb-4">{t("productDetail.storyTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">
                {product.story || product.description}
              </p>
              <div className="space-y-3">
                {product.materials && (
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">{t("productDetail.materials")}</span>
                    <span className="font-medium">{Array.isArray(product.materials) ? product.materials.join(", ") : product.materials}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">{t("productDetail.dimensions")}</span>
                    <span className="font-medium">{product.dimensions}</span>
                  </div>
                )}
                {product.craft_time && (
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">{t("productDetail.craftTime")}</span>
                    <span className="font-medium">{product.craft_time}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-secondary rounded-lg md:rounded-xl p-4 md:p-6">
              <h3 className="font-serif text-base md:text-lg text-foreground mb-3 md:mb-4">{t("productDetail.whyTitle")}</h3>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-terracotta" />
                  </span>
                  <span className="text-muted-foreground text-sm md:text-base">{t("productDetail.whyPoints.one")}</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-terracotta" />
                  </span>
                  <span className="text-muted-foreground text-sm md:text-base">{t("productDetail.whyPoints.two")}</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-terracotta" />
                  </span>
                  <span className="text-muted-foreground text-sm md:text-base">{t("productDetail.whyPoints.three")}</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-terracotta" />
                  </span>
                  <span className="text-muted-foreground text-sm md:text-base">{t("productDetail.whyPoints.four")}</span>
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
