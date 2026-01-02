import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const exploreItems = [
    { key: "paintings", label: t("footer.exploreItems.paintings") },
    { key: "textiles", label: t("footer.exploreItems.textiles") },
    { key: "terracotta", label: t("footer.exploreItems.terracotta") },
    { key: "ritual", label: t("footer.exploreItems.ritual") },
    { key: "decor", label: t("footer.exploreItems.decor") },
  ];

  const supportLinks = [
    { to: "/about", label: t("footer.supportLinks.about") },
    { to: "/contact", label: t("footer.supportLinks.contact") },
    { to: "/privacy-policy", label: t("footer.supportLinks.privacy") },
    { to: "/terms-of-service", label: t("footer.supportLinks.terms") },
    { to: "/refund-policy", label: t("footer.supportLinks.refund") },
    { to: "/sellers-agreement", label: t("footer.supportLinks.sellerAgreement") },
    { to: "/seller/register", label: t("footer.supportLinks.becomeSeller") },
    { to: "/orders", label: t("footer.supportLinks.orders") },
  ];

  const handleSocialClick = (e: React.MouseEvent, platform: string) => {
    e.preventDefault();
    toast({ title: t("footer.socialToastTitle"), description: t("footer.socialToastDesc", { platform }) });
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
                  {t("footer.brandTagline")}
                </span>
              </div>
            </Link>
            <p className="text-cream/80 text-sm leading-relaxed">
              {t("footer.description")}
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
            <h4 className="font-serif text-lg text-cream">{t("footer.explore")}</h4>
            <ul className="space-y-3">
              {exploreItems.map((item) => (
                <li key={item.key}>
                  <Link to="/shop" className="text-cream/70 hover:text-terracotta-light transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-cream">{t("footer.support")}</h4>
            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-cream/70 hover:text-terracotta-light transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-cream">{t("footer.getInTouch")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta-light shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">
                  {t("footer.serviceAreaValue")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-terracotta-light" />
                <div className="text-cream/70 text-sm space-y-0.5">
                  <a href="tel:+916205577083" className="hover:text-terracotta-light">+91 62055 77083</a>
                  <p>{t("footer.alt")}: <a href="tel:+919472212825" className="hover:text-terracotta-light">+91 94722 12825</a> · <a href="tel:+919229583900" className="hover:text-terracotta-light">+91 92295 83900</a></p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-terracotta-light" />
                <div className="text-cream/70 text-sm space-y-0.5">
                  <a href="mailto:help.mithilasanskar@gmail.com" className="hover:text-terracotta-light">help.mithilasanskar@gmail.com</a>
                  <p>Alt: <a href="mailto:kalpanarani811@gmail.com" className="hover:text-terracotta-light">kalpanarani811@gmail.com</a></p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 text-terracotta-light font-semibold">⏰</span>
                <span className="text-cream/70 text-sm">{t("footer.hoursValue")}</span>
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
              {t("footer.trust.handcrafted")}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-golden" />
              {t("footer.trust.fairTrade")}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-terracotta-light" />
              {t("footer.trust.artisanDirect")}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vermilion-light" />
              {t("footer.trust.securePayments")}
            </span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/50">
            <p>{t("footer.copyright")}</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-cream transition-colors">{t("footer.supportLinks.privacy")}</Link>
              <Link to="/terms-of-service" className="hover:text-cream transition-colors">{t("footer.supportLinks.terms")}</Link>
              <Link to="/refund-policy" className="hover:text-cream transition-colors">{t("footer.supportLinks.refund")}</Link>
              <Link to="/sellers-agreement" className="hover:text-cream transition-colors">{t("footer.supportLinks.sellerAgreement")}</Link>
            </div>
          </div>
          <div className="text-center mt-4">
            <a 
              href="https://www.linkedin.com/in/priyanshudas00" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cream/10 hover:bg-terracotta text-cream text-sm font-medium rounded-full transition-colors"
            >
              <span>{t("footer.builtByPrefix")}</span>
              <span className="font-semibold">{t("footer.builtByName")}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
