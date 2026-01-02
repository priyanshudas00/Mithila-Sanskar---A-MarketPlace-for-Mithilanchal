import { Quote } from "lucide-react";
import heroImage from "@/assets/hero-mithila-art.jpg";
import { useTranslation } from "react-i18next";

const CulturalStory = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mithila Art Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <div className="space-y-8">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {t("cultural.label")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
              {t("cultural.headingPrefix")}
              <span className="text-gradient-cultural block">{t("cultural.headingHighlight")}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                {t("cultural.paragraph1")}
              </p>
              <p className="leading-relaxed">
                {t("cultural.paragraph2")}
              </p>
            </div>
            
            {/* Quote */}
            <blockquote className="relative pl-6 border-l-4 border-terracotta">
              <Quote className="absolute -top-2 -left-3 w-8 h-8 text-terracotta/30" />
              <p className="font-serif text-lg italic text-foreground">
                {t("cultural.quote")}
              </p>
              <footer className="mt-3 text-sm text-muted-foreground">
                {t("cultural.quoteBy")}
              </footer>
            </blockquote>
          </div>
          
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-cultural">
                <img
                  src={heroImage}
                  alt="Madhubani Art Detail"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="bg-card p-4 rounded-xl shadow-soft">
                <div className="font-serif text-2xl text-foreground">{t("cultural.giTitle")}</div>
                <p className="text-sm text-muted-foreground">{t("cultural.giSubtitle")}</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-terracotta p-6 rounded-xl text-cream">
                <div className="font-serif text-3xl">50+</div>
                <p className="text-sm text-cream/80">{t("cultural.villages")}</p>
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-cultural">
                <img
                  src={heroImage}
                  alt="Traditional Mithila Motifs"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalStory;
