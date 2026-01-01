import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ArtisanCard from "./ArtisanCard";
import { artisans } from "@/lib/artisans";


const ArtisanStories = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            The Hands Behind the Art
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-2 mb-4">
            Meet Our Artisans
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every purchase directly supports these talented craftspeople and their families, 
            helping preserve traditions that span millennia.
          </p>
        </div>
        
        {/* Artisan Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {artisans.map((artisan) => (
            <ArtisanCard key={artisan.id} {...artisan} />
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Link to="/artisans">
            <Button variant="cultural" size="lg">
              Meet All Artisans
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArtisanStories;
