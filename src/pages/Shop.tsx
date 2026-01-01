import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X, ChevronDown, Loader2 } from "lucide-react";
import { useProducts, useCategories } from "@/hooks/useProducts";

const regions = [
  "Madhubani",
  "Darbhanga",
  "Sitamarhi",
  "Samastipur",
  "Begusarai",
];

const Shop = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [handmadeOnly, setHandmadeOnly] = useState(true);

  const { data: products = [], isLoading: productsLoading } = useProducts({
    search: searchQuery || undefined,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
  });

  const { data: categories = [] } = useCategories();

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  // Apply client-side filters for categories and regions
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategories.length === 0 || 
      (product.category && selectedCategories.includes(product.category.id));
    const matchesRegion = selectedRegions.length === 0 || 
      (product.seller?.village && selectedRegions.some(r => 
        product.seller.village?.toLowerCase().includes(r.toLowerCase())
      ));
    const matchesHandmade = !handmadeOnly || product.is_handmade;
    
    return matchesCategory && matchesRegion && matchesHandmade;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="bg-gradient-cultural py-12 mb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                Shop Authentic Mithila Crafts
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover handcrafted treasures made by skilled artisans from the heart of Mithilanchal
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products, artisans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            <Button
              variant="heritage"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
              {(selectedCategories.length > 0 || selectedRegions.length > 0) && (
                <span className="ml-2 w-6 h-6 bg-terracotta text-cream text-xs rounded-full flex items-center justify-center">
                  {selectedCategories.length + selectedRegions.length}
                </span>
              )}
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-72 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-card rounded-xl p-6 shadow-soft sticky top-28 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg text-foreground">Filters</h3>
                  <button 
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedRegions([]);
                      setPriceRange([0, 10000]);
                      setHandmadeOnly(true);
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground flex items-center justify-between">
                    Price Range
                    <ChevronDown className="w-4 h-4" />
                  </h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={10000}
                    step={100}
                    className="mt-2"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Categories</h4>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <span className="text-sm text-muted-foreground">{category.name}</span>
                    </label>
                  ))}
                </div>

                {/* Regions */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Region</h4>
                  {regions.map((region) => (
                    <label key={region} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={selectedRegions.includes(region)}
                        onCheckedChange={() => toggleRegion(region)}
                      />
                      <span className="text-sm text-muted-foreground">{region}</span>
                    </label>
                  ))}
                </div>

                {/* Handmade Only */}
                <label className="flex items-center gap-3 cursor-pointer pt-4 border-t border-border">
                  <Checkbox 
                    checked={handmadeOnly} 
                    onCheckedChange={(checked) => setHandmadeOnly(checked === true)}
                  />
                  <span className="text-sm font-medium text-foreground">Handmade Only</span>
                </label>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
                </p>
                <select className="bg-card border border-input rounded-lg px-4 py-2 text-sm">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 || selectedRegions.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCategories.map((catId) => {
                    const cat = categories.find(c => c.id === catId);
                    return cat ? (
                      <span
                        key={catId}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm"
                      >
                        {cat.name}
                        <button onClick={() => toggleCategory(catId)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ) : null;
                  })}
                  {selectedRegions.map((region) => (
                    <span
                      key={region}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm"
                    >
                      {region}
                      <button onClick={() => toggleRegion(region)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Products */}
              {productsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.compare_at_price || undefined}
                      image={product.images.find(img => img.is_primary)?.image_url || product.images[0]?.image_url || "/placeholder.svg"}
                      artisan={product.seller?.business_name || "Unknown Artisan"}
                      artisanVillage={product.seller?.village || "Mithila"}
                      category={product.category?.name || "Crafts"}
                      isHandmade={product.is_handmade}
                      isFeatured={product.is_featured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">No products found matching your criteria</p>
                  <Button variant="heritage" onClick={() => {
                    setSelectedCategories([]);
                    setSelectedRegions([]);
                    setSearchQuery("");
                    setPriceRange([0, 10000]);
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;