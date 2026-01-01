import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import productPainting from "@/assets/product-painting-1.jpg";
import productTextile from "@/assets/product-textile-1.jpg";
import productTerracotta from "@/assets/product-terracotta-1.jpg";
import productRitual from "@/assets/product-ritual-1.jpg";

const categories = [
  {
    id: "paintings",
    name: "Mithila Paintings",
    description: "Traditional Madhubani art with natural colors",
    image: productPainting,
    productCount: 450,
  },
  {
    id: "textiles",
    name: "Handloom Textiles",
    description: "Hand-embroidered sarees, dupattas & gamchas",
    image: productTextile,
    productCount: 280,
  },
  {
    id: "terracotta",
    name: "Clay & Terracotta",
    description: "Traditional toys and decorative pottery",
    image: productTerracotta,
    productCount: 180,
  },
  {
    id: "ritual",
    name: "Ritual & Cultural",
    description: "Kohbar, Aripan & festival essentials",
    image: productRitual,
    productCount: 120,
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Shop by Category
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-2 mb-4">
            Treasures of Mithila
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each category represents centuries of tradition, passed down through generations 
            of master artisans in the villages of Mithilanchal.
          </p>
        </div>
        
        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-soft hover:shadow-cultural transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-earth via-earth/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-cream/70 text-sm mb-1">
                  {category.productCount} Products
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-cream mb-2">
                  {category.name}
                </h3>
                <p className="text-cream/80 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center text-terracotta-light font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                  Explore
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
