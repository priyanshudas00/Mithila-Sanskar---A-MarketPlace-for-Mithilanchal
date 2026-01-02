import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { HeartHandshake, Globe2, Users, MapPin, Phone, Mail, Clock } from "lucide-react"

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="bg-gradient-cultural py-12 mb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-foreground/70">About MithilaSanskar</p>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">Cultural Marketplace rooted in Mithila</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                MithilaSanskar is a cultural marketplace and handicraft store dedicated to authentic Mithila art. We exist to put fair earnings directly into artisan hands while bringing heritage products to homes worldwide.
              </p>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <MapPin className="w-4 h-4" />
                <span>Madhubani, Bihar · Serving pan-India</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-5xl space-y-12">
          {/* Business snapshot for GBP */}
          <section className="p-6 rounded-2xl bg-card shadow-soft space-y-4">
            <h2 className="font-serif text-2xl text-foreground">Business snapshot</h2>
            <p className="text-muted-foreground text-sm">MithilaSanskar · Cultural Marketplace / Handicraft Store · Authentic Mithila cultural products marketplace</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="space-y-1">
                <p className="text-foreground font-medium">Name</p>
                <p>MithilaSanskar</p>
              </div>
              <div className="space-y-1">
                <p className="text-foreground font-medium">Service area</p>
                <p>Madhubani, Bihar 847211 · Serving pan-India</p>
              </div>
              <div className="flex flex-col gap-1 text-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href="tel:+916205577083" className="hover:text-primary">+91 62055 77083</a>
                </div>
                <p className="text-xs text-muted-foreground">Alt: <a href="tel:+919472212825" className="hover:text-primary">+91 94722 12825</a> · <a href="tel:+919229583900" className="hover:text-primary">+91 92295 83900</a></p>
              </div>
              <div className="flex flex-col gap-1 text-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href="mailto:help.mithilasanskar@gmail.com" className="hover:text-primary">help.mithilasanskar@gmail.com</a>
                </div>
                <p className="text-xs text-muted-foreground">Alt: <a href="mailto:kalpanarani811@gmail.com" className="hover:text-primary">kalpanarani811@gmail.com</a></p>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>Mon-Sat: 9:00 AM – 7:00 PM IST</span>
              </div>
            </div>
          </section>

          {/* Mission */}
          <section className="grid md:grid-cols-2 gap-8 items-start">
            <div className="p-6 rounded-2xl bg-card shadow-soft space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <HeartHandshake className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="font-serif text-2xl text-foreground">Support artisans, safeguard heritage</h2>
              <p className="text-muted-foreground leading-relaxed">
                We partner directly with Mithila artisans so 80%+ of every sale reaches the craftsperson. By removing middlemen, we create sustainable livelihoods, preserve traditional techniques, and ensure every product tells an honest story of its maker.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card shadow-soft space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                <Users className="w-4 h-4" />
                Who We Serve
              </div>
              <h3 className="font-serif text-xl text-foreground">Homes, collectors, and conscious buyers</h3>
              <p className="text-muted-foreground leading-relaxed">
                From hand-painted Madhubani art to handloom textiles and terracotta decor, our catalog is curated for people who value authenticity, fair trade, and cultural continuity.
              </p>
            </div>
          </section>

          {/* What we offer */}
          <section className="grid md:grid-cols-3 gap-6">
            {[{
              title: "Handcrafted originals",
              copy: "Certified Mithila paintings, handloom textiles, terracotta, and ritual items made by verified artisans.",
              icon: Globe2,
            }, {
              title: "Fair trade pricing",
              copy: "Transparent payouts to artisans, ethical sourcing, and no mass-produced replicas.",
              icon: HeartHandshake,
            }, {
              title: "Cultural storytelling",
              copy: "Every piece carries its village, motif, and artist narrative so you know its origin.",
              icon: Users,
            }].map(({ title, copy, icon: Icon }) => (
              <div key={title} className="p-6 rounded-2xl bg-card shadow-soft space-y-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-foreground">{title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{copy}</p>
              </div>
            ))}
          </section>

          {/* Who runs the business */}
          <section className="p-6 rounded-2xl bg-card shadow-soft space-y-3">
            <h3 className="font-serif text-2xl text-foreground">Who runs MithilaSanskar</h3>
            <p className="text-muted-foreground leading-relaxed">
              We are a Madhubani-based team collaborating with local artisan collectives. From curation to quality checks and shipping coordination, operations are managed in Bihar with partners across India to ensure timely, safe delivery.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 text-foreground"><MapPin className="w-4 h-4" />Madhubani, Bihar</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 text-foreground">Serving pan-India</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 text-foreground">Hybrid warehouse-partner model</span>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default About
