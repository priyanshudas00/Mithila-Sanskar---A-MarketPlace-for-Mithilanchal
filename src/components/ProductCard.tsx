import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  artisan: string;
  artisanVillage: string;
  category: string;
  isHandmade?: boolean;
  isFeatured?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  artisan,
  artisanVillage,
  category,
  isHandmade = true,
  isFeatured = false,
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked((v) => !v);
    toast({ title: liked ? "Removed from wishlist" : "Added to wishlist" });
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-cultural transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-earth/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button variant="warm" size="sm" className="flex-1" onClick={() => addToCart.mutate({ productId: id, quantity: 1 })}>
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
          <Button variant="warm" size="icon" className="shrink-0" onClick={handleLike}>
            <Heart className={`w-4 h-4 ${liked ? 'text-vermilion fill-vermilion' : ''}`} />
          </Button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isHandmade && (
            <span className="px-2 py-1 text-xs font-medium bg-golden/90 text-earth rounded-full">
              Handcrafted
            </span>
          )}
          {isFeatured && (
            <span className="px-2 py-1 text-xs font-medium bg-vermilion text-cream rounded-full">
              Featured
            </span>
          )}
        </div>
        
        {/* Quick View */}
        <Link
          to={`/product/${id}`}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
        >
          <Eye className="w-4 h-4 text-foreground" />
        </Link>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {category}
        </span>
        
        {/* Product Name */}
        <Link to={`/product/${id}`}>
          <h3 className="font-serif text-lg text-foreground leading-snug hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        
        {/* Artisan Info */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">By</span>
          <Link to={`/artisan/${artisan.toLowerCase().replace(/\s/g, '-')}`} className="text-primary hover:underline font-medium">
            {artisan}
          </Link>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{artisanVillage}</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <span className="font-serif text-xl text-foreground">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
          {originalPrice && (
            <span className="text-xs font-medium text-sage px-2 py-0.5 bg-sage/10 rounded-full">
              {Math.round((1 - price / originalPrice) * 100)}% off
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
