import ArtisanCard from "@/components/ArtisanCard";
import { artisans } from "@/lib/artisans";

const Artisans = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-foreground">Our Artisans</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
            Discover the talented craftspeople behind Mithila Sangam. Click any profile to view
            their story and products.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((a) => (
            <ArtisanCard key={a.id} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Artisans;
