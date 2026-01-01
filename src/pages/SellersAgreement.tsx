import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Handshake, UserCheck, Package, Wallet, Camera, Shield, 
  Clock, AlertTriangle, Award, FileText, Ban, HeartHandshake 
} from "lucide-react";

const SellersAgreement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="bg-gradient-cultural py-12 mb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-primary" />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl text-foreground">Sellers Agreement</h1>
              </div>
              <p className="text-muted-foreground">
                Partnership Terms for Mithila Artisans · Last updated: January 1, 2026
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            
            {/* Introduction */}
            <section className="mb-12 p-6 bg-terracotta/5 rounded-xl border border-terracotta/20">
              <h2 className="font-serif text-xl text-foreground mb-4 flex items-center gap-2">
                <HeartHandshake className="w-6 h-6 text-terracotta" />
                Our Commitment to Artisans
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                MithilaSanskar is built on the principle of empowering Mithila artisans and preserving our rich 
                cultural heritage. This agreement establishes a partnership where <strong>80% of every sale goes 
                directly to you, the artisan</strong>. We handle marketing, technology, customer service, and 
                logistics so you can focus on what you do best — creating beautiful art.
              </p>
              <p className="text-muted-foreground">
                By registering as a seller on MithilaSanskar, you agree to the following terms which are designed 
                to ensure a fair, transparent, and mutually beneficial partnership.
              </p>
            </section>

            {/* Section 1 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">1. Seller Eligibility and Registration</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">1.1 Who Can Sell</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Artisans from the Mithila region (Madhubani, Darbhanga, Sitamarhi, Samastipur, and surrounding areas)</li>
                    <li>Practitioners of traditional Mithila art forms including Madhubani painting, Sujni embroidery, Sikki grass craft, and terracotta work</li>
                    <li>Individuals aged 18 years or above with valid identity proof</li>
                    <li>Artisan cooperatives and self-help groups (SHGs) with authorized representatives</li>
                    <li>Family members of artisans who directly participate in the craft</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">1.2 Registration Requirements</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Identity Proof:</strong> Aadhaar Card, Voter ID, or Passport</li>
                    <li><strong>Address Proof:</strong> Utility bill, bank statement, or ration card</li>
                    <li><strong>Bank Details:</strong> Account number, IFSC code, and account holder name for direct payments</li>
                    <li><strong>Craft Documentation:</strong> Photos/videos demonstrating your craft skills</li>
                    <li><strong>Experience Details:</strong> Years of experience and training background</li>
                    <li><strong>Optional:</strong> GI Tag certification, awards, or recognition certificates</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">1.3 Verification Process</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>All applications are reviewed by our artisan relations team</li>
                    <li>We may conduct video calls or in-person visits to verify craft authenticity</li>
                    <li>Approval typically takes 3-7 business days</li>
                    <li>You will be notified of approval status via SMS and email</li>
                    <li>Rejected applications can be appealed with additional documentation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">2. Product Listings and Quality Standards</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">2.1 Eligible Products</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Handcrafted items made primarily by traditional methods</li>
                    <li>Products that reflect authentic Mithila art traditions</li>
                    <li>Items made with eco-friendly and traditional materials preferred</li>
                    <li>Original designs or traditional motifs (no copies of copyrighted works)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">2.2 Prohibited Products</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Machine-made or factory-produced items</li>
                    <li>Products containing harmful chemicals or banned substances</li>
                    <li>Counterfeit or replica items</li>
                    <li>Products that infringe on intellectual property rights</li>
                    <li>Items that do not represent authentic Mithila craftsmanship</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">2.3 Quality Requirements</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>All products must meet our quality standards for durability and finish</li>
                    <li>Colors must be as vibrant and long-lasting as traditional methods allow</li>
                    <li>Products must be free from defects, stains, and damage</li>
                    <li>Packaging must protect the product during transit</li>
                    <li>We reserve the right to return substandard products for rework</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">2.4 Product Listing Requirements</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Clear, high-quality photos from multiple angles (minimum 3 images)</li>
                    <li>Accurate product title and detailed description</li>
                    <li>Correct dimensions, materials, and care instructions</li>
                    <li>Honest representation of the product and crafting time</li>
                    <li>Story behind the art (cultural significance, personal journey)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-golden/10 flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5 text-golden" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">3. Pricing and Commission Structure</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div className="bg-sage/10 p-4 rounded-lg border border-sage/20">
                  <h3 className="font-medium text-foreground mb-2">Fair Trade Commission</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-background rounded-lg">
                      <p className="text-3xl font-serif text-sage">80%</p>
                      <p className="text-sm text-foreground">Goes to You (Artisan)</p>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <p className="text-3xl font-serif text-terracotta">20%</p>
                      <p className="text-sm text-foreground">Platform Fee</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">3.1 What the Platform Fee Covers</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Website hosting and maintenance</li>
                    <li>Marketing and promotion of your products</li>
                    <li>Customer service and support</li>
                    <li>Payment processing and security</li>
                    <li>Photography and listing optimization support</li>
                    <li>Packaging materials (optional)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">3.2 Pricing Guidelines</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You set your own prices based on materials, time, and skill</li>
                    <li>Prices should reflect the true value of handcrafted work</li>
                    <li>We may suggest pricing based on market research</li>
                    <li>Prices can be updated anytime through your seller dashboard</li>
                    <li>Special pricing for bulk or custom orders can be negotiated</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">4. Payments and Settlements</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">4.1 Payment Schedule</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Standard Settlement:</strong> Weekly payouts every Monday</li>
                    <li><strong>Minimum Payout:</strong> ₹500 (amounts below this roll over to next cycle)</li>
                    <li><strong>Payment Method:</strong> Direct bank transfer (NEFT/IMPS) to your registered account</li>
                    <li><strong>Settlement Period:</strong> 7 days after order delivery confirmation</li>
                    <li>COD orders are settled after successful delivery and payment collection</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">4.2 Payment Transparency</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>View all earnings in real-time on your seller dashboard</li>
                    <li>Detailed breakdown of each order (sale price, commission, net earnings)</li>
                    <li>Monthly statements sent via email</li>
                    <li>Annual earnings summary for tax purposes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">4.3 Deductions and Adjustments</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Returns and refunds: Corresponding amount deducted from pending settlements</li>
                    <li>Damaged products due to poor packaging: Replacement cost may be deducted</li>
                    <li>Chargebacks: Amount held pending investigation</li>
                    <li>All deductions will be communicated with detailed reasons</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-vermilion/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-vermilion" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">5. Order Fulfillment Responsibilities</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">5.1 Order Processing</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Confirmation:</strong> Accept or decline orders within 24 hours</li>
                    <li><strong>Ready-to-Ship:</strong> Hand over packaged product within 2-3 business days</li>
                    <li><strong>Custom Orders:</strong> Clearly communicate expected crafting time (typically 7-21 days)</li>
                    <li>Update order status regularly through the seller dashboard</li>
                    <li>Notify us immediately if you cannot fulfill an order</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">5.2 Packaging Standards</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use sturdy packaging to prevent damage during transit</li>
                    <li>Wrap delicate items (paintings, terracotta) with protective materials</li>
                    <li>Include care instructions and thank you note (we provide templates)</li>
                    <li>Use eco-friendly packaging materials where possible</li>
                    <li>MithilaSanskar branding materials will be provided</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">5.3 Shipping Coordination</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Our logistics partner will arrange pickup from your location</li>
                    <li>Ensure someone is available during scheduled pickup times</li>
                    <li>Provide accurate product weight and dimensions for shipping labels</li>
                    <li>Keep products ready and properly labeled for pickup</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">6. Intellectual Property and Content Rights</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">6.1 Your Rights</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You retain full ownership of your original designs and artistic works</li>
                    <li>Traditional Mithila motifs remain part of our shared cultural heritage</li>
                    <li>You retain copyright to any original photography you provide</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">6.2 License to MithilaSanskar</h3>
                  <p>
                    By listing products, you grant MithilaSanskar a non-exclusive, royalty-free license to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Display and promote your products and profile on our platform</li>
                    <li>Use product images in marketing materials (social media, advertisements)</li>
                    <li>Feature your story and craft in blog posts and press releases</li>
                    <li>Include your products in curated collections and recommendations</li>
                  </ul>
                  <p className="text-sm mt-2">
                    This license ends 30 days after you remove products or close your seller account.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">6.3 Attribution</h3>
                  <p>
                    We will always attribute products to you by name and location. Your artisan story and 
                    profile will be prominently displayed alongside your products to help buyers connect 
                    with the person behind the art.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">7. Seller Benefits and Support</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">7.1 What We Provide</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Free Photography:</strong> Professional product photography for new sellers</li>
                    <li><strong>Listing Support:</strong> Help with product descriptions and translations</li>
                    <li><strong>Marketing:</strong> Promotion through social media, email, and search optimization</li>
                    <li><strong>Training:</strong> Workshops on product photography, packaging, and online selling</li>
                    <li><strong>Customer Service:</strong> We handle all buyer inquiries and complaints</li>
                    <li><strong>Packaging Materials:</strong> Branded packaging available at subsidized rates</li>
                    <li><strong>Analytics:</strong> Sales reports, popular products, and customer insights</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">7.2 Featured Artisan Program</h3>
                  <p>
                    Top-performing and verified artisans may be selected for our Featured Artisan program, 
                    which includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Homepage and collection page featured placement</li>
                    <li>Dedicated artisan profile with video interview</li>
                    <li>Priority customer support</li>
                    <li>Early access to new features and opportunities</li>
                    <li>Participation in exhibitions and cultural events</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-vermilion/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-vermilion" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">8. Violations and Account Suspension</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">8.1 Policy Violations</h3>
                  <p>The following may result in warnings, suspension, or termination:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Selling non-handmade or factory-produced items</li>
                    <li>Misrepresenting product materials, origin, or quality</li>
                    <li>Consistently failing to fulfill orders on time</li>
                    <li>Poor quality products resulting in high return rates</li>
                    <li>Rude or unprofessional behavior with customers or staff</li>
                    <li>Attempting to contact buyers directly to circumvent the platform</li>
                    <li>Providing false information during registration</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">8.2 Enforcement Actions</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Warning:</strong> First violation (minor issues)</li>
                    <li><strong>Temporary Suspension:</strong> 7-30 days for repeated or serious violations</li>
                    <li><strong>Permanent Ban:</strong> Fraud, counterfeit products, or egregious violations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">8.3 Appeal Process</h3>
                  <p>
                    If you believe an action was taken in error, you may appeal within 14 days by contacting 
                    our artisan relations team. We will review your case and respond within 7 business days.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-golden/10 flex items-center justify-center shrink-0">
                  <Ban className="w-5 h-5 text-golden" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">9. Termination</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">9.1 Voluntary Termination</h3>
                  <p>
                    You may close your seller account at any time by providing 30 days notice. During this period:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Complete all pending orders or arrange for cancellation</li>
                    <li>Outstanding payments will be settled within 14 days of account closure</li>
                    <li>Your products will be delisted from the platform</li>
                    <li>Your artisan profile will be archived (not publicly visible)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">9.2 Termination by MithilaSanskar</h3>
                  <p>
                    We may terminate your account for serious violations or prolonged inactivity (no sales 
                    for 12+ months). We will provide 30 days notice except in cases of fraud or illegal activity.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">9.3 Post-Termination</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You retain ownership of your intellectual property</li>
                    <li>We will remove your content within 30 days</li>
                    <li>Final payment settlement within 14 days</li>
                    <li>You may reapply after 6 months (except permanent bans)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="p-8 bg-gradient-to-br from-terracotta/10 to-golden/10 rounded-xl border border-terracotta/20 text-center">
              <h3 className="font-serif text-2xl text-foreground mb-4">Ready to Join Our Artisan Community?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Share your craft with the world and earn 80% of every sale. We handle marketing, 
                logistics, and customer service — you focus on creating beautiful art.
              </p>
              <Link to="/seller/register">
                <Button variant="cultural" size="lg">
                  <FileText className="w-5 h-5 mr-2" />
                  Register as a Seller
                </Button>
              </Link>
            </section>

            {/* Contact */}
            <section className="mt-8 p-6 bg-secondary rounded-xl">
              <h3 className="font-serif text-lg text-foreground mb-2">Questions?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Our artisan relations team is here to help. Contact us for any questions about this agreement 
                or the seller registration process.
              </p>
              <div className="text-muted-foreground text-sm">
                <p><strong>MithilaSanskar Artisan Relations</strong></p>
                <p>Email: artisans@mithilasanskar.com</p>
                <p>WhatsApp: +91 XXXXX XXXXX</p>
                <p>Available: Monday-Saturday, 10 AM - 6 PM IST</p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellersAgreement;