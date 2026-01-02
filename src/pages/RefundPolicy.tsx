import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { RotateCcw, ShieldCheck, Wallet } from "lucide-react"

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20">
        <section className="bg-gradient-cultural py-12 mb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-foreground/70">Refund Policy</p>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">Hassle-free returns for handcrafted items</h1>
              <p className="text-muted-foreground">Last updated: January 2, 2026</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <section className="p-6 rounded-2xl bg-card shadow-soft space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <ShieldCheck className="w-4 h-4" />
              Our promise
            </div>
            <p className="text-muted-foreground leading-relaxed">
              MithilaSanskar is a cultural marketplace and handicraft store. Every item is handcrafted, so minor variations are normal. If your order arrives damaged, incorrect, or significantly not as described, we will fix it fast.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-card shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <RotateCcw className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-2xl">Eligibility</h2>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>File a request within 7 days of delivery with photos of the issue.</li>
              <li>Items must be unused, with original tags/packaging when possible.</li>
              <li>Custom-commissioned pieces are non-returnable unless damaged in transit.</li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-card shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <Wallet className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-2xl">How to request a return or refund</h2>
            </div>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>Email <a className="text-primary" href="mailto:help.mithilasanskar@gmail.com">help.mithilasanskar@gmail.com</a> (cc: <a className="text-primary" href="mailto:kalpanarani811@gmail.com">kalpanarani811@gmail.com</a>) or call <a className="text-primary" href="tel:+916205577083">+91 62055 77083</a> with your order ID.</li>
              <li>Share photos/videos of the product and packaging.</li>
              <li>Our team will confirm pickup or replacement within 48 hours.</li>
            </ol>
          </section>

          <section className="p-6 rounded-2xl bg-card shadow-soft space-y-3 text-muted-foreground">
            <h3 className="font-semibold text-foreground">Refund timelines</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prepaid orders: refund to original payment method within 7-10 business days after pickup confirmation.</li>
              <li>COD orders: refund via bank transfer/UPI after pickup confirmation (share UPI ID or account details).</li>
            </ul>

            <h3 className="font-semibold text-foreground mt-4">Replacements</h3>
            <p>Where possible, we prioritize a replacement from the same artisan. If inventory is unavailable, we will process a refund.</p>

            <h3 className="font-semibold text-foreground mt-4">Shipping costs</h3>
            <p>Return shipping for approved cases is covered by MithilaSanskar. For preference-based returns, two-way shipping is chargeable.</p>
          </section>

          <section className="p-6 rounded-2xl bg-muted/80 border border-border text-sm text-muted-foreground">
            <p>Questions? Write to <a className="text-primary" href="mailto:help.mithilasanskar@gmail.com">help.mithilasanskar@gmail.com</a> (cc: <a className="text-primary" href="mailto:kalpanarani811@gmail.com">kalpanarani811@gmail.com</a>) or call <a className="text-primary" href="tel:+916205577083">+91 62055 77083</a> (alts: <a className="text-primary" href="tel:+919472212825">+91 94722 12825</a>, <a className="text-primary" href="tel:+919229583900">+91 92295 83900</a>). We respond within 24 hours on business days.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RefundPolicy
