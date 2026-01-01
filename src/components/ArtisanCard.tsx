import { Link } from "react-router-dom";
import { MapPin, Star, Package } from "lucide-react";

interface ArtisanCardProps {
  id: string;
  name: string;
  image: string;
  village: string;
  craft: string;
  story: string;
  productsCount: number;
  rating: number;
  yearsExperience: number;
}

const ArtisanCard = ({
  id,
  name,
  image,
  village,
  craft,
  story,
  productsCount,
  rating,
  yearsExperience,
}: ArtisanCardProps) => {
  return (
    <Link
      to={`/artisan/${id}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-cultural transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth/80 via-earth/20 to-transparent" />
        
        {/* Overlay Content */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className="artisan-badge mb-2 inline-block">
            {craft}
          </span>
          <h3 className="font-serif text-2xl text-cream mb-1">{name}</h3>
          <div className="flex items-center gap-2 text-cream/80 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{village}</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {story}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-golden fill-golden" />
            <span className="font-medium text-foreground">{rating}</span>
            <span className="text-muted-foreground">rating</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Package className="w-4 h-4" />
            <span>{productsCount} products</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{yearsExperience}+</span> years
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtisanCard;
