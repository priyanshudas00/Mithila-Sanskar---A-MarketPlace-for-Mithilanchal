import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import ArtisanStories from "@/components/ArtisanStories";
import CulturalStory from "@/components/CulturalStory";
import TrustBadges from "@/components/TrustBadges";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <TrustBadges />
        <Categories />
        <FeaturedProducts />
        <CulturalStory />
        <ArtisanStories />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
