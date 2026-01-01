import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Story = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl text-foreground mb-4">Our Story</h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Mithila Sangam Crafts is a celebration of traditional Mithila arts and the
              artisans who keep these techniques alive. Built with cultural sensitivity and
              a focus on sustainable practices, we work directly with artisans to bring
              their work to appreciative homes.
            </p>
          </div>

          <section className="mt-12 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-serif text-2xl mb-3">Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To create equitable market access for rural artisans, preserve cultural
                heritage, and ensure fair compensation through transparent operations.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-3">Our Values</h2>
              <ul className="text-muted-foreground list-disc list-inside space-y-2">
                <li>Authenticity &amp; craft preservation</li>
                <li>Sustainability &amp; natural materials</li>
                <li>Fair wages &amp; women empowerment</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Story;
