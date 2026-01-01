import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Store, MapPin, Clock, FileText } from "lucide-react";

const SellerRegister = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    story: "",
    village: "",
    district: "Madhubani",
    craftSpecialty: "",
    yearsExperience: "",
    upiId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login or create an account first.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    setLoading(true);
    
    try {
      // Check if already a seller
      const { data: existingSeller } = await supabase
        .from('sellers')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (existingSeller) {
        toast({
          title: "Already Registered",
          description: "You are already registered as a seller.",
        });
        navigate("/seller/dashboard");
        return;
      }
      
      // Create seller profile
      const { error: sellerError } = await supabase
        .from('sellers')
        .insert({
          user_id: user.id,
          business_name: formData.businessName,
          description: formData.description,
          story: formData.story,
          village: formData.village,
          district: formData.district,
          craft_specialty: formData.craftSpecialty,
          years_experience: parseInt(formData.yearsExperience) || 0,
          upi_id: formData.upiId,
          is_approved: false,
          is_verified: false,
        });
      
      if (sellerError) throw sellerError;
      
      // Add seller role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: 'seller',
        });
      
      if (roleError && !roleError.message.includes('duplicate')) {
        console.error('Role error:', roleError);
      }
      
      toast({
        title: "Registration Submitted!",
        description: "Your seller application has been submitted. We'll review and approve it soon.",
      });
      
      navigate("/seller/dashboard");
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl text-foreground mb-4">Join as a Seller</h1>
            <p className="text-muted-foreground mb-8">Please login or create an account to register as a seller.</p>
            <Link to="/auth">
              <Button variant="cultural" size="lg">Login / Sign Up</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-terracotta to-vermilion flex items-center justify-center">
                <Store className="w-8 h-8 text-cream" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
                Become a Seller
              </h1>
              <p className="text-muted-foreground">
                Share your craft with the world. Join 500+ artisans preserving Mithila's heritage.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-xl p-8 shadow-soft">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Business / Artisan Name *
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  placeholder="e.g., Sunita Devi Arts"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="village" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Village *
                  </Label>
                  <Input
                    id="village"
                    value={formData.village}
                    onChange={(e) => setFormData({...formData, village: e.target.value})}
                    placeholder="e.g., Ranti"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                    placeholder="e.g., Madhubani"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="craftSpecialty">Craft Specialty *</Label>
                  <Input
                    id="craftSpecialty"
                    value={formData.craftSpecialty}
                    onChange={(e) => setFormData({...formData, craftSpecialty: e.target.value})}
                    placeholder="e.g., Madhubani Painting"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Years of Experience
                  </Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData({...formData, yearsExperience: e.target.value})}
                    placeholder="e.g., 15"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Short Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Briefly describe your craft and what you create..."
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="story">Your Story</Label>
                <Textarea
                  id="story"
                  value={formData.story}
                  onChange={(e) => setFormData({...formData, story: e.target.value})}
                  placeholder="Tell us your journey - how did you learn this craft? What inspires you?..."
                  rows={5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID (for payments)</Label>
                <Input
                  id="upiId"
                  value={formData.upiId}
                  onChange={(e) => setFormData({...formData, upiId: e.target.value})}
                  placeholder="yourname@upi"
                />
                <p className="text-xs text-muted-foreground">You can add bank details later from your dashboard</p>
              </div>
              
              <div className="bg-secondary rounded-lg p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-2">What happens next?</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Our team will review your application within 24-48 hours</li>
                  <li>Once approved, you can start listing your products</li>
                  <li>You'll receive 80% of each sale directly to your account</li>
                </ul>
              </div>
              
              <Button 
                type="submit" 
                variant="cultural" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerRegister;
