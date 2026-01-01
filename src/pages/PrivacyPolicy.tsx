import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Database, Users, Bell, Trash2, Mail } from "lucide-react";

const PrivacyPolicy = () => {
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
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl text-foreground">Privacy Policy</h1>
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
                MithilaSanskar ("we," "our," or "us") is committed to protecting your privacy and ensuring the security 
                of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you visit our website and use our services to purchase authentic Mithila handicrafts 
                directly from artisans.
              </p>
            </section>

            {/* Section 1 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">1. Information We Collect</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">1.1 Personal Information You Provide</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Account Information:</strong> Name, email address, phone number, password when you create an account</li>
                    <li><strong>Shipping Information:</strong> Full name, address, city, state, pincode, contact number for order delivery</li>
                    <li><strong>Payment Information:</strong> UPI ID, bank account details (for sellers), payment transaction records</li>
                    <li><strong>Communication Data:</strong> Messages sent through our platform, customer support inquiries, reviews and feedback</li>
                    <li><strong>Seller Information:</strong> Business name, craft specialty, village/location, years of experience, KYC documents, bank details for payments</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">1.2 Information Collected Automatically</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                    <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, search queries</li>
                    <li><strong>Location Data:</strong> Approximate location based on IP address for delivery estimates</li>
                    <li><strong>Cookies and Tracking:</strong> Session cookies, preference cookies, analytics cookies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">2. How We Use Your Information</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Order Processing:</strong> To process and fulfill your orders, including shipping and delivery coordination with artisans</li>
                  <li><strong>Account Management:</strong> To create and manage your account, authenticate your identity, and provide customer support</li>
                  <li><strong>Communication:</strong> To send order confirmations, shipping updates, and respond to your inquiries</li>
                  <li><strong>Personalization:</strong> To recommend products based on your browsing history and preferences</li>
                  <li><strong>Seller Payments:</strong> To process artisan payments and ensure 80% of each sale reaches the craftsperson directly</li>
                  <li><strong>Platform Improvement:</strong> To analyze usage patterns and improve our services, website functionality, and user experience</li>
                  <li><strong>Marketing:</strong> To send promotional offers, newsletters, and updates about new artisans and collections (with your consent)</li>
                  <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                  <li><strong>Fraud Prevention:</strong> To detect and prevent fraudulent transactions and protect our users</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-golden/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-golden" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">3. Information Sharing and Disclosure</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>With Artisans/Sellers:</strong> We share your name, shipping address, and phone number with sellers to fulfill your orders</li>
                  <li><strong>Shipping Partners:</strong> We share delivery information with logistics partners for order shipment</li>
                  <li><strong>Payment Processors:</strong> Transaction details are shared with secure payment gateways for processing</li>
                  <li><strong>Service Providers:</strong> With trusted third parties who assist in operating our platform (hosting, analytics, customer support)</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or government authority</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> With your explicit consent for any other purposes</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">4. Data Security</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>We implement robust security measures to protect your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Encryption:</strong> All data transmission is encrypted using SSL/TLS protocols</li>
                  <li><strong>Secure Storage:</strong> Personal data is stored in encrypted databases with restricted access</li>
                  <li><strong>Access Controls:</strong> Only authorized personnel can access personal information on a need-to-know basis</li>
                  <li><strong>Regular Audits:</strong> We conduct periodic security assessments and vulnerability testing</li>
                  <li><strong>Password Protection:</strong> User passwords are hashed and never stored in plain text</li>
                  <li><strong>Incident Response:</strong> We have procedures in place to respond to data breaches promptly</li>
                </ul>
                <p className="text-sm">
                  While we strive to protect your information, no method of transmission over the Internet is 100% secure. 
                  We cannot guarantee absolute security but are committed to continuously improving our security practices.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-vermilion/10 flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5 text-vermilion" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">5. Your Rights and Choices</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate personal information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal retention requirements)</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                  <li><strong>Data Portability:</strong> Request your data in a structured, commonly used format</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw previously given consent for data processing</li>
                  <li><strong>Cookie Preferences:</strong> Manage your cookie preferences through browser settings</li>
                </ul>
                <p>To exercise these rights, please contact us at privacy@mithilasanskar.com</p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">6. Data Retention</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>We retain your personal information for as long as necessary to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide our services and fulfill your orders</li>
                  <li>Maintain your account and preferences</li>
                  <li>Comply with legal obligations (tax records, transaction history)</li>
                  <li>Resolve disputes and enforce our agreements</li>
                </ul>
                <p>
                  <strong>Retention Periods:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Account data: Until account deletion plus 30 days</li>
                  <li>Transaction records: 7 years (as required by Indian tax laws)</li>
                  <li>Communication logs: 3 years</li>
                  <li>Analytics data: 2 years (anonymized after 90 days)</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">7. Children's Privacy</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  MithilaSanskar is not intended for children under 18 years of age. We do not knowingly collect 
                  personal information from children. If you are a parent or guardian and believe your child has 
                  provided us with personal information, please contact us immediately. If we discover that we 
                  have collected personal information from a child without parental consent, we will delete that 
                  information promptly.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-10 p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-golden/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-golden" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-2">8. Contact Us</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="bg-secondary p-4 rounded-lg">
                  <p><strong>MithilaSanskar Privacy Team</strong></p>
                  <p>Email: privacy@mithilasanskar.com</p>
                  <p>Address: Madhubani, Bihar, India - 847211</p>
                  <p>Phone: +91 XXXXX XXXXX</p>
                </div>
                <p className="text-sm">
                  We will respond to your inquiries within 30 days. For urgent privacy concerns, please mark your 
                  email as "URGENT: Privacy Request."
                </p>
              </div>
            </section>

            {/* Updates Notice */}
            <section className="p-6 bg-secondary rounded-xl">
              <h3 className="font-serif text-lg text-foreground mb-2">Changes to This Policy</h3>
              <p className="text-muted-foreground text-sm">
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new policy on this page and updating the "Last updated" date. We encourage you to 
                review this policy periodically. Your continued use of our services after any changes constitutes 
                your acceptance of the updated policy.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;