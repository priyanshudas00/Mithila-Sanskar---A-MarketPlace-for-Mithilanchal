import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollText, UserCheck, ShoppingBag, CreditCard, Truck, RotateCcw, AlertTriangle, Scale, Globe } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-24 md:pb-20">
        {/* Header */}
        <div className="bg-gradient-cultural py-12 mb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ScrollText className="w-6 h-6 text-primary" />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl text-foreground">Terms of Service</h1>
              </div>
              <p className="text-muted-foreground">
                Last updated: January 1, 2026
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            
            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Welcome to MithilaSanskar. These Terms of Service ("Terms") govern your access to and use of our 
                website, mobile applications, and services (collectively, the "Platform"). By accessing or using 
                our Platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do 
                not use our Platform.
              </p>
              <p className="text-muted-foreground">
                MithilaSanskar is an online marketplace that connects buyers with authentic Mithila artisans and 
                craftspeople, enabling the purchase of genuine handcrafted products directly from the source.
              </p>
            </section>

            {/* Section 1 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">1. Account Registration and Eligibility</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">1.1 Eligibility</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You must be at least 18 years old to create an account and use our services</li>
                    <li>You must have the legal capacity to enter into binding contracts</li>
                    <li>You must provide accurate and complete registration information</li>
                    <li>Corporate users must have authority to bind their organization to these Terms</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">1.2 Account Responsibilities</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>You are responsible for all activities that occur under your account</li>
                    <li>You must notify us immediately of any unauthorized access to your account</li>
                    <li>One person may not maintain multiple buyer accounts without our permission</li>
                    <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">2. Products and Orders</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">2.1 Product Information</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>All products on MithilaSanskar are handcrafted by verified artisans from the Mithila region</li>
                    <li>Product images are representative; actual products may vary slightly due to the handmade nature</li>
                    <li>We strive for accuracy in product descriptions but do not guarantee complete accuracy</li>
                    <li>Colors may appear differently based on your device settings</li>
                    <li>Product dimensions and weights are approximate</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">2.2 Order Acceptance</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Placing an order constitutes an offer to purchase; acceptance occurs upon order confirmation</li>
                    <li>We reserve the right to refuse or cancel any order for any reason</li>
                    <li>Orders are subject to product availability and artisan confirmation</li>
                    <li>Prices are subject to change without notice until an order is confirmed</li>
                    <li>In case of pricing errors, we will notify you and offer the option to proceed or cancel</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">2.3 Handcrafted Nature</h3>
                  <p>
                    As all products are handcrafted by individual artisans, each piece is unique. Minor variations 
                    in color, pattern, size, and finish are natural characteristics of handmade items and should 
                    not be considered defects. These variations add to the authenticity and value of each piece.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-golden/10 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-golden" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">3. Pricing and Payment</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">3.1 Pricing</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>All prices are displayed in Indian Rupees (INR) and include applicable taxes</li>
                    <li>Shipping charges are calculated separately and displayed at checkout</li>
                    <li>Free shipping is available on orders above ₹1,500 (pan-India)</li>
                    <li>We may offer promotional discounts which are subject to specific terms</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">3.2 Payment Methods</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Cash on Delivery (COD):</strong> Available for most locations; pay upon delivery</li>
                    <li><strong>UPI:</strong> Pay using Google Pay, PhonePe, Paytm, or any UPI-enabled app</li>
                    <li>All online payments are processed through secure, PCI-DSS compliant payment gateways</li>
                    <li>We do not store your complete payment card information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">3.3 Artisan Fair Trade</h3>
                  <p>
                    At MithilaSanskar, we are committed to fair trade practices. <strong>80% of each sale goes 
                    directly to the artisan</strong>, ensuring sustainable livelihoods for craftspeople and their 
                    families. The remaining 20% covers platform operations, logistics, and support services.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">4. Shipping and Delivery</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">4.1 Delivery Timeline</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Standard Delivery:</strong> 5-7 business days for most locations in India</li>
                    <li><strong>Remote Areas:</strong> 10-14 business days for remote or difficult-to-access areas</li>
                    <li><strong>Custom Orders:</strong> Additional crafting time (7-21 days) plus shipping time</li>
                    <li>Delivery times are estimates and may vary due to unforeseen circumstances</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">4.2 Shipping Responsibility</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Risk of loss transfers to you upon delivery to the shipping carrier</li>
                    <li>We partner with reputable logistics providers for safe delivery</li>
                    <li>Tracking information will be provided via email and SMS</li>
                    <li>You are responsible for providing accurate delivery information</li>
                    <li>Additional charges may apply for re-delivery attempts due to incorrect address</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">4.3 Delivery Issues</h3>
                  <p>
                    If your order is lost, damaged during transit, or significantly delayed, please contact our 
                    customer support within 48 hours of expected delivery. We will investigate and provide 
                    appropriate resolution including replacement or refund.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-vermilion/10 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5 text-vermilion" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">5. Returns and Refunds</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">5.1 Return Policy</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Return Window:</strong> 7 days from the date of delivery</li>
                    <li>Products must be unused, unwashed, and in original condition with tags attached</li>
                    <li>Original packaging must be intact for returns</li>
                    <li>Customized or personalized items are non-returnable unless defective</li>
                    <li>Perishable or fragile items may have special return conditions</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">5.2 Non-Returnable Items</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Custom-made or personalized products</li>
                    <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                    <li>Products that have been used, altered, or damaged by the buyer</li>
                    <li>Items returned without original packaging or tags</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">5.3 Refund Process</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Refunds are processed within 7-10 business days after receiving the returned item</li>
                    <li>Refunds are credited to the original payment method</li>
                    <li>Shipping charges are non-refundable unless the return is due to our error</li>
                    <li>For COD orders, refunds are processed via bank transfer (NEFT/IMPS)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">5.4 Defective Products</h3>
                  <p>
                    If you receive a defective product, please contact us within 48 hours with photographs of 
                    the defect. We will arrange for a free replacement or full refund including shipping charges.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">6. Prohibited Activities</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use the Platform for any unlawful purpose or in violation of any laws</li>
                  <li>Impersonate any person or entity or falsely represent your affiliation</li>
                  <li>Submit false, misleading, or fraudulent information</li>
                  <li>Attempt to gain unauthorized access to our systems or user accounts</li>
                  <li>Interfere with or disrupt the Platform or servers</li>
                  <li>Scrape, harvest, or collect information without our consent</li>
                  <li>Use automated systems or bots to access the Platform</li>
                  <li>Post or transmit malicious code, viruses, or harmful content</li>
                  <li>Engage in any activity that could harm the reputation of MithilaSanskar or its artisans</li>
                  <li>Circumvent any security measures or access restrictions</li>
                  <li>Use the Platform to promote competing products or services</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">7. Intellectual Property</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">7.1 Our Intellectual Property</h3>
                  <p>
                    The MithilaSanskar name, logo, website design, content, and software are protected by 
                    copyright, trademark, and other intellectual property laws. You may not use, copy, modify, 
                    or distribute our intellectual property without written permission.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">7.2 Artisan Rights</h3>
                  <p>
                    The designs, patterns, and artistic works created by our artisans are their intellectual 
                    property. Purchasing a product does not grant you rights to reproduce, copy, or commercially 
                    exploit the artistic designs. Traditional Mithila art forms are part of our cultural heritage 
                    and should be respected accordingly.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">7.3 User Content</h3>
                  <p>
                    By posting reviews, images, or other content on our Platform, you grant us a non-exclusive, 
                    royalty-free license to use, display, and distribute such content for marketing and 
                    promotional purposes.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-golden/10 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-golden" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">8. Limitation of Liability</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, MITHILASANSKAR AND ITS OFFICERS, DIRECTORS, EMPLOYEES, 
                  AND AGENTS SHALL NOT BE LIABLE FOR:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Loss of profits, revenue, data, or business opportunities</li>
                  <li>Damages arising from your use or inability to use the Platform</li>
                  <li>Actions or content of third parties, including artisans and shipping partners</li>
                  <li>Errors or inaccuracies in product descriptions or pricing</li>
                </ul>
                <p>
                  Our total liability for any claims arising from your use of the Platform shall not exceed 
                  the amount you paid for the specific product or service giving rise to the claim.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">9. Dispute Resolution</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">9.1 Governing Law</h3>
                  <p>
                    These Terms are governed by and construed in accordance with the laws of India, without 
                    regard to conflict of law principles.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">9.2 Dispute Resolution Process</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Step 1:</strong> Contact our customer support to resolve the issue informally</li>
                    <li><strong>Step 2:</strong> If unresolved, submit a formal complaint to our grievance officer</li>
                    <li><strong>Step 3:</strong> Mediation through a mutually agreed mediator</li>
                    <li><strong>Step 4:</strong> Arbitration in accordance with the Arbitration and Conciliation Act, 1996</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">9.3 Jurisdiction</h3>
                  <p>
                    Any legal proceedings shall be conducted in the courts of Madhubani, Bihar, India. You 
                    consent to the exclusive jurisdiction of these courts.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="p-6 bg-secondary rounded-xl">
              <h3 className="font-serif text-lg text-foreground mb-2">Contact Us</h3>
              <p className="text-muted-foreground text-sm mb-4">
                For questions about these Terms of Service, please contact:
              </p>
              <div className="text-muted-foreground text-sm">
                <p><strong>MithilaSanskar Legal Team</strong></p>
                <p>Email: legal@mithilasanskar.com</p>
                <p>Address: Madhubani, Bihar, India - 847211</p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;