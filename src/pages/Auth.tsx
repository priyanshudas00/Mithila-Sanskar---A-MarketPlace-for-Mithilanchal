import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import heroImage from "@/assets/hero-mithila-art.jpg";
import SignInWithGoogle from "@/components/SignInWithGoogle";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();

  // Handle post-login redirect and auto add-to-cart
  useEffect(() => {
    if (user) {
      const redirectUrl = searchParams.get('redirect');
      const shouldAddToCart = searchParams.get('addToCart') === 'true';
      
      if (redirectUrl && shouldAddToCart) {
        // Extract product ID from redirect URL (e.g., /product/123 -> 123)
        const productId = redirectUrl.split('/').pop();
        if (productId) {
          // Add product to cart
          addToCart(productId, 1);
          // Redirect to product page
          navigate(redirectUrl);
        }
      } else if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate("/");
      }
    }
  }, [user, searchParams, navigate, addToCart]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          // Navigation will be handled by useEffect when user is set
        }
      } else {
        if (!fullName.trim()) {
          toast({
            title: "Name Required",
            description: "Please enter your full name.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Account Exists",
              description: "This email is already registered. Please sign in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign Up Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Welcome to MithilaSanskar!",
            description: "Your account has been created successfully.",
          });
          // Navigation will be handled by useEffect when user is set
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-terracotta to-vermilion flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-xl">म</span>
            </div>
            <div>
              <span className="font-serif font-bold text-2xl text-foreground">MithilaSanskar</span>
            </div>
          </div>
          
          <h1 className="font-serif text-3xl text-foreground mb-2">
            {isLogin ? "Welcome Back" : "Join Our Community"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin 
              ? "Sign in to continue shopping authentic Mithila crafts"
              : "Create an account to discover handcrafted treasures"
            }
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="pl-10 h-12"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              variant="cultural" 
              size="lg" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>

          {/* Social sign-in */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <hr className="flex-1 border-border" />
              <span className="text-sm text-muted-foreground">or continue with</span>
              <hr className="flex-1 border-border" />
            </div>
            <div>
              <SignInWithGoogle />
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
          
          {!isLogin && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Want to sell your crafts?{" "}
              <Link to="/seller/register" className="text-primary hover:underline font-medium">
                Register as a Seller
              </Link>
            </p>
          )}
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="hidden lg:block lg:flex-1 relative">
        <img
          src={heroImage}
          alt="Mithila Art"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-earth/30" />
        <div className="absolute bottom-12 left-12 right-12 bg-background/90 backdrop-blur-sm rounded-xl p-6 shadow-cultural">
          <p className="font-serif text-lg text-foreground italic">
            "When you buy handmade, you're supporting a family, preserving a tradition, 
            and carrying forward a legacy that's thousands of years old."
          </p>
          <p className="mt-3 text-sm text-muted-foreground">— The MithilaSanskar Promise</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
