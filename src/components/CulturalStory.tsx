import { Quote } from "lucide-react";
import heroImage from "@/assets/hero-mithila-art.jpg";

const CulturalStory = () => {
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
              Our Heritage
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
              A Living Tradition of
              <span className="text-gradient-cultural block">5000 Years</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Mithila, the ancient kingdom mentioned in the Ramayana, has nurtured an 
                unbroken artistic tradition since the time of King Janaka. The women of 
                this land have passed down the sacred art of Madhubani painting from 
                mother to daughter for over five millennia.
              </p>
              <p className="leading-relaxed">
                Every motif tells a story — the fish symbolizes fertility, the peacock 
                represents love, and the lotus embodies purity. These aren't just 
                decorations; they're prayers painted with natural colors derived from 
                turmeric, indigo, and the sacred earth of Mithila.
              </p>
            </div>
            
            {/* Quote */}
            <blockquote className="relative pl-6 border-l-4 border-terracotta">
              <Quote className="absolute -top-2 -left-3 w-8 h-8 text-terracotta/30" />
              <p className="font-serif text-lg italic text-foreground">
                "When I paint, I don't just create art. I invoke my ancestors, 
                their wisdom, their prayers. Every stroke carries their blessings."
              </p>
              <footer className="mt-3 text-sm text-muted-foreground">
                — Bharti Dayal, National Award Winner, Jitwarpur
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
                <div className="font-serif text-2xl text-foreground">GI Tagged</div>
                <p className="text-sm text-muted-foreground">Protected Cultural Heritage</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-terracotta p-6 rounded-xl text-cream">
                <div className="font-serif text-3xl">50+</div>
                <p className="text-sm text-cream/80">Villages Represented</p>
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
