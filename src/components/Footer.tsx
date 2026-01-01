import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();

  const handleSocialClick = (e: React.MouseEvent, platform: string) => {
    e.preventDefault();
    toast({ title: "Coming Soon", description: `Follow us on ${platform} — link coming soon!` });
  };

  return (
    <footer className="bg-earth text-cream cultural-pattern">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-terracotta to-vermilion flex items-center justify-center">
                <span className="text-cream font-serif font-bold text-xl">म</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-cream">
                  MithilaSanskar
                </span>
                <span className="text-xs text-cream/60 tracking-wider">
                  Preserving Heritage
                </span>
              </div>
            </Link>
            <p className="text-cream/80 text-sm leading-relaxed">
              Connecting artisans of Mithila with the world. Every purchase supports
              a family, preserves a tradition, and carries a story.
            </p>
            <div className="flex gap-4">
              <a href="#" onClick={(e) => handleSocialClick(e, 'Facebook')} className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-terracotta transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" onClick={(e) => handleSocialClick(e, 'Instagram')} className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-terracotta transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" onClick={(e) => handleSocialClick(e, 'Twitter')} className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-terracotta transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" onClick={(e) => handleSocialClick(e, 'YouTube')} className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-terracotta transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-cream">Explore</h4>
            <ul className="space-y-3">
              {["Mithila Paintings", "Handloom Textiles", "Terracotta Art", "Ritual Items", "Home Decor"].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-cream/70 hover:text-terracotta-light transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-cream">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-cream/70 hover:text-terracotta-light transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-cream/70 hover:text-terracotta-light transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/sellers-agreement" className="text-cream/70 hover:text-terracotta-light transition-colors text-sm">
                  Sellers Agreement
                </Link>
              </li>
              <li>
                <Link to="/seller/register" className="text-cream/70 hover:text-terracotta-light transition-colors text-sm">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-cream/70 hover:text-terracotta-light transition-colors text-sm">
                  Track Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-cream">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta-light shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">
                  Madhubani, Bihar - 847211, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-terracotta-light" />
                <span className="text-cream/70 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-terracotta-light" />
                <span className="text-cream/70 text-sm">hello@mithilasanskar.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-cream/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sage" />
              100% Handcrafted
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-golden" />
              Fair Trade Certified
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-terracotta-light" />
              Artisan Direct
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vermilion-light" />
              Secure Payments
            </span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/50">
            <p>© 2024 MithilaSanskar. All rights reserved. Preserving Mithila, one craft at a time.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-cream transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-cream transition-colors">Terms of Service</Link>
              <Link to="/sellers-agreement" className="hover:text-cream transition-colors">Seller Agreement</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
