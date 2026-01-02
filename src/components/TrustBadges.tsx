import { CheckCircle2, Truck, Shield, Heart, Recycle, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const values = [
  {
    icon: CheckCircle2,
    titleKey: "trust.authentic",
    descriptionKey: "trust.authenticDesc",
  },
  {
    icon: Users,
    titleKey: "trust.artisan",
    descriptionKey: "trust.artisanDesc",
  },
  {
    icon: Heart,
    titleKey: "trust.fair",
    descriptionKey: "trust.fairDesc",
  },
  {
    icon: Recycle,
    titleKey: "trust.eco",
    descriptionKey: "trust.ecoDesc",
  },
  {
    icon: Truck,
    titleKey: "trust.delivery",
    descriptionKey: "trust.deliveryDesc",
  },
  {
    icon: Shield,
    titleKey: "trust.quality",
    descriptionKey: "trust.qualityDesc",
  },
];

const TrustBadges = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center group-hover:bg-terracotta/10 transition-colors duration-300">
                <value.icon className="w-7 h-7 text-primary group-hover:text-terracotta transition-colors duration-300" />
              </div>
              <h4 className="font-medium text-foreground mb-1">{t(value.titleKey)}</h4>
              <p className="text-sm text-muted-foreground">{t(value.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
