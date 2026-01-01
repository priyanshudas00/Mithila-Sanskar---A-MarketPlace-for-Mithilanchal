import { CheckCircle2, Truck, Shield, Heart, Recycle, Users } from "lucide-react";

const values = [
  {
    icon: CheckCircle2,
    title: "100% Authentic",
    description: "Every product verified by our cultural experts",
  },
  {
    icon: Users,
    title: "Artisan Direct",
    description: "80% of sale goes directly to creators",
  },
  {
    icon: Heart,
    title: "Fair Trade",
    description: "Ethical pricing that respects the craft",
  },
  {
    icon: Recycle,
    title: "Eco-Friendly",
    description: "Natural dyes and sustainable materials",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Safe shipping with tracking",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "7-day return on all products",
  },
];

const TrustBadges = () => {
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
              <h4 className="font-medium text-foreground mb-1">{value.title}</h4>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
