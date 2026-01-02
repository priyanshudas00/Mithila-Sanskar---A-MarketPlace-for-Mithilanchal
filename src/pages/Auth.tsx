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
import { useNotifications } from "@/contexts/NotificationContext";
import { NotificationTemplates } from "@/lib/notifications";
import { useTranslation } from "react-i18next";

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
  const { sendNotification, requestPermission } = useNotifications();
  const { t } = useTranslation();

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
            title: t("auth.loginFailedTitle"),
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: t("auth.loginSuccessTitle"),
            description: t("auth.loginSuccessDesc"),
          });
          // Request notification permission and send welcome notification
          await requestPermission();
          await sendNotification(NotificationTemplates.welcome());
          // Navigation will be handled by useEffect when user is set
        }
      } else {
        if (!fullName.trim()) {
          toast({
            title: t("auth.nameRequiredTitle"),
            description: t("auth.nameRequiredDesc"),
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: t("auth.accountExistsTitle"),
              description: t("auth.accountExistsDesc"),
              variant: "destructive",
            });
          } else {
            toast({
              title: t("auth.signupFailedTitle"),
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: t("auth.signupSuccessTitle"),
            description: t("auth.signupSuccessDesc"),
          });
          // Request notification permission and send welcome notification
          await requestPermission();
          await sendNotification(NotificationTemplates.welcome());
          // Navigation will be handled by useEffect when user is set
        }
      }
    } catch (error: any) {
      toast({
        title: t("auth.errorTitle"),
        description: t("auth.errorDesc"),
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
          {t("auth.backHome")}
        </Link>
        
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-terracotta to-vermilion flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-xl">
                म
              </span>
            </div>
            <div>
              <span className="font-serif font-bold text-2xl text-foreground">MithilaSanskar</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl text-foreground mb-2">
            {isLogin ? t("auth.headingLogin") : t("auth.headingSignup")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin ? t("auth.subtextLogin") : t("auth.subtextSignup")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">{t("auth.fullName")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("auth.fullNamePlaceholder")}
                    className="pl-10 h-12"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.emailPlaceholder")}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.passwordPlaceholder")}
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
              {loading ? t("auth.buttonLoading") : (isLogin ? t("auth.buttonLogin") : t("auth.buttonSignup"))}
            </Button>
          </form>

          {/* Social sign-in */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <hr className="flex-1 border-border" />
              <span className="text-sm text-muted-foreground">{t("auth.orContinue")}</span>
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
              {isLogin ? t("auth.toggleSignup") : t("auth.toggleLogin")}
            </button>
          </div>

          {!isLogin && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {t("auth.sellerPrompt")} {" "}
              <Link to="/seller/register" className="text-primary hover:underline font-medium">
                {t("auth.sellerCta")}
              </Link>
            </p>
          )}
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="hidden lg:block lg:flex-1 relative">
        <img
          src={heroImage}
          alt={t("auth.heroAlt")}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-earth/30" />
        <div className="absolute bottom-12 left-12 right-12 bg-background/90 backdrop-blur-sm rounded-xl p-6 shadow-cultural">
          <p className="font-serif text-lg text-foreground italic">
            {t("auth.promiseQuote")}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">— {t("auth.promiseBy")}</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
