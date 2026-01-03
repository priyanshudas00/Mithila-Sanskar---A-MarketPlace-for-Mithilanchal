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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      
      <main className="pt-24 pb-24 md:pb-20">
        {/* Header */}
        <div className="bg-gradient-cultural py-8 md:py-12 mb-6 md:mb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-2 md:mb-4">
                {t("shopPage.title")}
              </h1>
              <p className="text-muted-foreground text-sm md:text-lg">
                {t("shopPage.subtitle")}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("shopPage.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 md:pl-12 h-10 md:h-12 text-sm md:text-base"
              />
            </div>
            <Button
              variant="heritage"
              size="default"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full sm:w-auto h-10 md:h-12"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              {t("shopPage.filters")}
              {(selectedCategories.length > 0 || selectedRegions.length > 0) && (
                <span className="ml-2 w-6 h-6 bg-terracotta text-cream text-xs rounded-full flex items-center justify-center">
                  {selectedCategories.length + selectedRegions.length}
                </span>
              )}
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Filters Sidebar - Mobile Overlay / Desktop Sidebar */}
            <aside className={`
              ${showFilters ? 'fixed inset-0 z-50 bg-background/95 backdrop-blur-sm lg:relative lg:inset-auto lg:z-auto lg:bg-transparent' : 'hidden lg:block'}
              lg:w-72 shrink-0
            `}>
              <div className={`
                bg-card rounded-xl p-4 md:p-6 shadow-soft space-y-4 md:space-y-6
                ${showFilters ? 'h-full overflow-y-auto lg:h-auto lg:sticky lg:top-28' : 'sticky top-28'}
              `}>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg text-foreground">{t("shopPage.filters")}</h3>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedRegions([]);
                        setPriceRange([0, 10000]);
                        setHandmadeOnly(true);
                      }}
                      className="text-sm text-primary hover:underline"
                    >
                      {t("shopPage.clearAll")}
                    </button>
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden p-2 hover:bg-muted rounded-full"
                      aria-label="Close filters"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Mobile Apply Button */}
                <Button 
                  variant="cultural" 
                  className="w-full lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  {t("shopPage.filters")} ({selectedCategories.length + selectedRegions.length})
                </Button>

                {/* Price Range */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground flex items-center justify-between">
                    {t("shopPage.priceRange")}
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
                  <h4 className="font-medium text-foreground">{t("shopPage.categories")}</h4>
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
                  <h4 className="font-medium text-foreground">{t("shopPage.region")}</h4>
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
                  <span className="text-sm font-medium text-foreground">{t("shopPage.handmadeOnly")}</span>
                </label>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 md:mb-6">
                <p className="text-muted-foreground text-sm">
                  {t("shopPage.showing", { count: filteredProducts.length })}
                </p>
                <select className="bg-card border border-input rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm w-full sm:w-auto">
                  <option>{t("shopPage.sort.featured")}</option>
                  <option>{t("shopPage.sort.priceLow")}</option>
                  <option>{t("shopPage.sort.priceHigh")}</option>
                  <option>{t("shopPage.sort.newest")}</option>
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
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.compare_at_price || undefined}
                      image={product.images.find(img => img.is_primary)?.image_url || product.images[0]?.image_url || "/placeholder.svg"}
                      artisan={product.seller?.business_name || t("shopPage.unknownArtisan")}
                      artisanVillage={product.seller?.village || t("shopPage.defaultVillage")}
                      category={product.category?.name || t("shopPage.defaultCategory")}
                      isHandmade={product.is_handmade}
                      isFeatured={product.is_featured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">{t("shopPage.empty")}</p>
                  <Button variant="heritage" onClick={() => {
                    setSelectedCategories([]);
                    setSelectedRegions([]);
                    setSearchQuery("");
                    setPriceRange([0, 10000]);
                  }}>
                    {t("shopPage.clearFilters")}
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