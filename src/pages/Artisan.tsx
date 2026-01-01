import { useParams } from "react-router-dom";
import { artisans } from "@/lib/artisans";
import { Link } from "react-router-dom";

const Artisan = () => {
  const { id } = useParams();
  const artisan = artisans.find((a) => a.id === id || a.name.toLowerCase().replace(/\s/g, "-") === id);

  if (!artisan) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h2 className="font-serif text-2xl">Artisan not found</h2>
        <p className="text-muted-foreground mt-2">We couldn't find the artisan you're looking for.</p>
        <Link to="/artisans" className="text-primary hover:underline mt-4 inline-block">Back to artisans</Link>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img src={artisan.image} alt={artisan.name} className="w-full rounded-xl shadow-soft" />
          </div>
          <div className="md:col-span-2">
            <h1 className="font-serif text-3xl mb-2">{artisan.name}</h1>
            <p className="text-muted-foreground mb-4">{artisan.village} • {artisan.craft}</p>
            <p className="leading-relaxed text-muted-foreground mb-6">{artisan.story}</p>
            <div className="flex items-center gap-4">
              <div className="artisan-badge">{artisan.craft}</div>
              <div className="text-sm text-muted-foreground">{artisan.productsCount} products</div>
            </div>

            {/* Placeholder: product listing can be implemented via supabase */}
            <div className="mt-8">
              <h3 className="font-medium text-lg mb-2">Products</h3>
              <p className="text-muted-foreground">Products by this artisan will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Artisan;
