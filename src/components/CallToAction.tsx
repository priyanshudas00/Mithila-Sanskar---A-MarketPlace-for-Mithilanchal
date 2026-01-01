import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-terracotta via-terracotta-dark to-earth relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 cultural-pattern opacity-10" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream mb-6">
            Ready to Bring Mithila Home?
          </h2>
          <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Every purchase tells a story. Every product preserves a tradition. 
            Join thousands who have brought a piece of Mithila into their lives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button 
                size="xl" 
                className="bg-cream text-earth hover:bg-cream/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/seller/register">
              <Button 
                size="xl" 
                variant="outline"
                className="border-cream/30 text-cream bg-transparent hover:bg-cream/10"
              >
                Become a Seller
              </Button>
            </Link>
          </div>
          
          {/* Impact Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-cream/20">
            <div>
              <div className="font-serif text-4xl md:text-5xl text-golden-light">₹2Cr+</div>
              <p className="text-cream/70 text-sm mt-1">Paid to Artisans</p>
            </div>
            <div>
              <div className="font-serif text-4xl md:text-5xl text-golden-light">10K+</div>
              <p className="text-cream/70 text-sm mt-1">Happy Customers</p>
            </div>
            <div>
              <div className="font-serif text-4xl md:text-5xl text-golden-light">500+</div>
              <p className="text-cream/70 text-sm mt-1">Families Supported</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
