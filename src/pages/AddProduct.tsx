import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/contexts/NotificationContext";
import { NotificationTemplates } from "@/lib/notifications";
import { ArrowLeft, Upload, X } from "lucide-react";

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { sendNotification } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    story: "",
    price: "",
    compareAtPrice: "",
    stockQuantity: "1",
    categoryId: "",
    isHandmade: true,
    materials: "",
    dimensions: "",
    craftTime: "",
    isGiTagged: false,
  });

  // Get seller
  const { data: seller } = useQuery({
    queryKey: ['seller', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from('sellers')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  // Get categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      return data || [];
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      toast({
        title: "Too many images",
        description: "Maximum 5 images allowed",
        variant: "destructive",
      });
      return;
    }
    
    setImages([...images, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!seller) {
      toast({
        title: "Not Registered",
        description: "Please register as a seller first.",
        variant: "destructive",
      });
      navigate("/seller/register");
      return;
    }
    
    setLoading(true);
    
    try {
      // Create product
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          seller_id: seller.id,
          category_id: formData.categoryId || null,
          name: formData.name,
          slug: generateSlug(formData.name),
          description: formData.description,
          story: formData.story,
          price: parseFloat(formData.price),
          compare_at_price: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
          stock_quantity: parseInt(formData.stockQuantity),
          is_handmade: formData.isHandmade,
          materials: formData.materials ? formData.materials.split(',').map(m => m.trim()) : null,
          dimensions: formData.dimensions,
          craft_time: formData.craftTime,
          is_gi_tagged: formData.isGiTagged,
          is_approved: false,
          is_active: true,
        })
        .select()
        .single();
      
      if (productError) throw productError;
      
      // Upload images
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${product.id}/${Date.now()}-${i}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          continue;
        }
        
        const { data: publicUrl } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
        
        // Save image record
        await supabase
          .from('product_images')
          .insert({
            product_id: product.id,
            image_url: publicUrl.publicUrl,
            alt_text: formData.name,
            display_order: i,
            is_primary: i === 0,
          });
      }
      
      toast({
        title: "Product Added!",
        description: "Your product has been submitted for approval.",
      });
      
      // Send notification for product submission
      await sendNotification(NotificationTemplates.productSubmitted(formData.name));
      
      navigate("/seller/dashboard");
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!seller) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-24 md:pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl text-foreground mb-4">Not Registered</h1>
            <p className="text-muted-foreground mb-8">Please register as a seller first.</p>
            <Link to="/seller/register">
              <Button variant="cultural" size="lg">Register as Seller</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Link to="/seller/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-28 md:pb-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Add New Product</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Images */}
            <div className="bg-background rounded-xl p-6 shadow-soft">
              <Label className="mb-4 block">Product Images (Max 5)</Label>
              <div className="flex flex-wrap gap-4">
                {imagePreviews.map((preview, idx) => (
                  <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <img src={preview} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-xs text-center py-0.5">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1">Add</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-background rounded-xl p-6 shadow-soft space-y-4">
              <h3 className="font-medium text-foreground">Basic Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Traditional Fish Motif Madhubani Painting"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your product in detail..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="story">Story Behind This Product</Label>
                <Textarea
                  id="story"
                  value={formData.story}
                  onChange={(e) => setFormData({...formData, story: e.target.value})}
                  placeholder="Share the cultural significance, tradition, or your personal story..."
                  rows={4}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-background rounded-xl p-6 shadow-soft space-y-4">
              <h3 className="font-medium text-foreground">Pricing & Inventory</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="e.g., 3500"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compareAtPrice">Compare at Price (₹)</Label>
                  <Input
                    id="compareAtPrice"
                    type="number"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData({...formData, compareAtPrice: e.target.value})}
                    placeholder="Original price if on sale"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({...formData, stockQuantity: e.target.value})}
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-background rounded-xl p-6 shadow-soft space-y-4">
              <h3 className="font-medium text-foreground">Product Details</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="materials">Materials (comma separated)</Label>
                  <Input
                    id="materials"
                    value={formData.materials}
                    onChange={(e) => setFormData({...formData, materials: e.target.value})}
                    placeholder="e.g., Handmade paper, Natural dyes"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                    placeholder="e.g., 15 x 20 inches"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="craftTime">Craft Time</Label>
                <Input
                  id="craftTime"
                  value={formData.craftTime}
                  onChange={(e) => setFormData({...formData, craftTime: e.target.value})}
                  placeholder="e.g., 7-10 days"
                />
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={formData.isHandmade}
                    onCheckedChange={(checked) => setFormData({...formData, isHandmade: checked as boolean})}
                  />
                  <span className="text-sm">100% Handmade</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={formData.isGiTagged}
                    onCheckedChange={(checked) => setFormData({...formData, isGiTagged: checked as boolean})}
                  />
                  <span className="text-sm">GI Tagged</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-4">
              <Button type="submit" variant="cultural" size="lg" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Adding Product..." : "Add Product"}
              </Button>
              <Link to="/seller/dashboard" className="w-full sm:w-auto">
                <Button type="button" variant="heritage" size="lg" className="w-full">Cancel</Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
