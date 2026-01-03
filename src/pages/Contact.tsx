import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-24 md:pb-20">
        {/* Header */}
        <section className="bg-gradient-cultural py-12 mb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-foreground/70">Contact MithilaSanskar</p>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">We’re here to help</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Cultural marketplace & handicraft store for authentic Mithila products. Reach out for orders, partnerships, or artisan onboarding.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-5xl grid lg:grid-cols-2 gap-10">
          {/* Info card */}
          <div className="p-6 rounded-2xl bg-card shadow-soft space-y-4">
            <h2 className="font-serif text-2xl text-foreground">Business details</h2>
            <div className="p-3 rounded-xl bg-muted/60 border border-border text-sm text-muted-foreground space-y-1">
              <p className="text-foreground font-semibold">MithilaSanskar</p>
              <p>Cultural Marketplace / Handicraft Store</p>
              <p>Authentic Mithila traditional & cultural products marketplace</p>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">Service area</p>
                  <p>Madhubani, Bihar 847211 · Serving pan-India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-foreground font-medium">Phone</p>
                  <a href="tel:+916205577083" className="hover:text-primary">+91 62055 77083</a>
                  <p className="text-xs">Alt: <a href="tel:+919472212825" className="hover:text-primary">+91 94722 12825</a> · <a href="tel:+919229583900" className="hover:text-primary">+91 92295 83900</a></p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">Email</p>
                  <a href="mailto:help.mithilasanskar@gmail.com" className="hover:text-primary">help.mithilasanskar@gmail.com</a>
                  <p className="text-xs">Alt: <a href="mailto:kalpanarani811@gmail.com" className="hover:text-primary">kalpanarani811@gmail.com</a></p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">Hours</p>
                  <p>Mon-Sat: 9:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="mt-4 rounded-xl overflow-hidden border border-border">
              <iframe
                title="MithilaSanskar Service Area"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.597030469237!2d86.0917!3d25.9957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edb873d24e8a4f%3A0x1c2d8c759cea90c7!2sMadhubani%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="p-6 rounded-2xl bg-card shadow-soft">
            <h2 className="font-serif text-2xl text-foreground mb-4">Send a message</h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full name</label>
                  <input type="text" required className="w-full rounded-lg border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input type="email" required className="w-full rounded-lg border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone</label>
                <input type="tel" className="w-full rounded-lg border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+91" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">How can we help?</label>
                <textarea required rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Share details about your query" />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-colors">
                <Send className="w-4 h-4" />
                Submit
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">By submitting, you consent to contact for order support and artisan onboarding. We reply within 24 hours.</p>
          </div>
        </div>

        {/* FAQ for trust signals */}
        <div className="container mx-auto px-4 max-w-5xl mt-12">
          <div className="p-6 rounded-2xl bg-card shadow-soft space-y-4">
            <h2 className="font-serif text-2xl text-foreground">FAQs</h2>
            <div className="space-y-3 text-muted-foreground text-sm">
              <div>
                <p className="text-foreground font-medium">Do you ship pan-India?</p>
                <p>Yes, we ship across India from our Madhubani operations hub with trusted logistics partners.</p>
              </div>
              <div>
                <p className="text-foreground font-medium">Are products authentic?</p>
                <p>All items are handcrafted by verified Mithila artisans. Each purchase supports fair payouts to the craftsperson.</p>
              </div>
              <div>
                <p className="text-foreground font-medium">How do refunds work?</p>
                <p>For damaged/incorrect items, email help.mithilasanskar@gmail.com (cc: kalpanarani811@gmail.com) within 7 days. See our refund policy for full steps.</p>
              </div>
              <div>
                <p className="text-foreground font-medium">Want to onboard as an artisan?</p>
                <p>Call +91 62055 77083 (alts: +91 94722 12825, +91 92295 83900) or email help.mithilasanskar@gmail.com with your craft details. We onboard artisans directly.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Contact
