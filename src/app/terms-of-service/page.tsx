import Navbar, { NavigationSection } from "@/components/common/Navbar"
import Footer from "@/components/common/footer1"

const navigationData: NavigationSection[] = [
  { title: 'Home', href: '/' },
  { title: 'Menu', href: '/menu' },
  { title: 'About Us', href: '/about' },
  { title: 'Contact Us', href: '/contact' },
]

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using our website, making a reservation, or placing an order, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.",
  },
  {
    title: "Use of Our Services",
    content:
      "You agree to use our website and services only for lawful purposes. You must not misuse our services, attempt to gain unauthorised access, or engage in any conduct that could damage, disable, or impair our systems or reputation.",
  },
  {
    title: "Reservations & Orders",
    content:
      "Reservations are subject to availability and are not confirmed until you receive a confirmation from us. We reserve the right to cancel or modify reservations in exceptional circumstances. Menu items and prices are subject to change without notice.",
  },
  {
    title: "Payments",
    content:
      "All payments are processed securely through our payment partners. By providing your payment details, you authorise us to charge the amount due. Refunds or cancellations are handled in accordance with our cancellation policy.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content on this website — including text, images, logos, and design — is owned by or licensed to us and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our prior written consent.",
  },
  {
    title: "Disclaimer of Warranties",
    content:
      "Our website and services are provided on an 'as is' basis without warranties of any kind, either express or implied. We do not guarantee that the site will be uninterrupted, error-free, or free of viruses or other harmful components.",
  },
  {
    title: "Limitation of Liability",
    content:
      "To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services, even if we have been advised of the possibility of such damages.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Your continued use of our services after changes constitutes acceptance of the revised terms.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms of Service shall be governed by and construed in accordance with applicable local laws. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the relevant courts.",
  },
]

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar navigationData={navigationData} />
      <main>
        {/* Hero */}
        <section className="bg-stone-950 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Legal
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-stone-400 text-lg max-w-xl mx-auto leading-relaxed">
              Please read these terms carefully before using our website or services.
            </p>
            <p className="text-stone-500 text-sm mt-6">Effective date: January 1, 2025</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-semibold text-stone-900 mb-3">{section.title}</h2>
                <p className="text-stone-600 leading-relaxed">{section.content}</p>
              </div>
            ))}

            <div>
              <h2 className="text-xl font-semibold text-stone-900 mb-3">Contact Us</h2>
              <p className="text-stone-600 leading-relaxed">
                If you have any questions about these Terms of Service, please visit our{" "}
                <a href="/contact" className="text-amber-600 hover:underline">Contact page</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
