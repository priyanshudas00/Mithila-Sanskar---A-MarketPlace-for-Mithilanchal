import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-mithila-art.jpg";

const Hero = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 cultural-pattern opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-32 right-10 w-72 h-72 bg-terracotta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-golden/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 stagger-children">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
              <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse-soft" />
              <span className="text-sm font-medium text-muted-foreground">
                {t("hero.badge")}
              </span>
            </div>
            
            {/* Heading */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-foreground">
              {t("hero.headingPrefix")} {" "}
              <span className="text-gradient-cultural">{t("hero.headingHighlight")}</span>
              <br />
              {t("hero.headingSuffix")}
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {t("hero.description")}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button variant="cultural" size="xl">
                  {t("hero.explore")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button 
                variant="heritage" 
                size="xl" 
                className="gap-2"
                onClick={() => toast({ title: t("footer.socialToastTitle"), description: t("hero.storyComingSoon") })}
              >
                <Play className="w-5 h-5" />
                {t("hero.watchStory")}
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="font-serif text-3xl md:text-4xl text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">{t("hero.statsArtisans")}</div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-foreground">2000+</div>
                <div className="text-sm text-muted-foreground">{t("hero.statsProducts")}</div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">{t("hero.statsVillages")}</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-cultural">
              <img
                src={heroImage}
                alt="Traditional Mithila Madhubani Art featuring fish, peacock and lotus motifs"
                className="w-full h-auto"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-medium border border-border max-w-xs animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-vermilion to-terracotta flex items-center justify-center shrink-0">
                      <Palette className="w-6 h-6 text-cream" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-foreground">{t("hero.cardTitle")}</p>
                    <p className="text-sm text-muted-foreground">{t("hero.cardSubtitle")}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Border */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-terracotta/30 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
