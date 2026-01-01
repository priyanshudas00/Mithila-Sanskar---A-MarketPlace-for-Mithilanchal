import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import productPainting from "@/assets/product-painting-1.jpg";
import productTextile from "@/assets/product-textile-1.jpg";
import productTerracotta from "@/assets/product-terracotta-1.jpg";
import productRitual from "@/assets/product-ritual-1.jpg";

const featuredProducts = [
  {
    id: "1",
    name: "Traditional Fish Motif Madhubani Painting",
    price: 3500,
    originalPrice: 4500,
    image: productPainting,
    artisan: "Sunita Devi",
    artisanVillage: "Ranti Village",
    category: "Mithila Paintings",
    isHandmade: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Hand-Embroidered Cotton Gamcha with Traditional Patterns",
    price: 1200,
    image: productTextile,
    artisan: "Meera Kumari",
    artisanVillage: "Madhubani",
    category: "Handloom Textiles",
    isHandmade: true,
    isFeatured: false,
  },
  {
    id: "3",
    name: "Painted Terracotta Elephant & Horse Set",
    price: 850,
    originalPrice: 1000,
    image: productTerracotta,
    artisan: "Ram Kumar",
    artisanVillage: "Sitamarhi",
    category: "Clay & Terracotta",
    isHandmade: true,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Kohbar Wedding Art - Lotus & Bamboo",
    price: 5500,
    image: productRitual,
    artisan: "Bharti Dayal",
    artisanVillage: "Jitwarpur",
    category: "Ritual & Cultural",
    isHandmade: true,
    isFeatured: false,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-background cultural-pattern">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Handpicked for You
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-2">
              Featured Creations
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Each piece is a labor of love, taking days or weeks to complete using 
              traditional techniques and natural materials.
            </p>
          </div>
          <Link to="/shop">
            <Button variant="heritage" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
        
        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
