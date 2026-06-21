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
    title: "Information We Collect",
    content:
      "We collect information you provide directly to us, such as your name, email address, phone number, and any other details you submit when making a reservation, placing an order, or contacting us. We may also collect usage data such as pages visited and time spent on our site.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use the information we collect to process reservations and orders, respond to your inquiries, send you updates about your bookings, improve our services, and comply with legal obligations. We do not sell or rent your personal information to third parties.",
  },
  {
    title: "Cookies",
    content:
      "Our website uses cookies to enhance your browsing experience, remember your preferences, and analyse site traffic. You can control cookie settings through your browser. Disabling cookies may affect some functionality of the site.",
  },
  {
    title: "Data Sharing",
    content:
      "We may share your information with trusted service providers who assist us in operating our website and delivering our services (e.g. payment processors, delivery partners). All such parties are obligated to keep your information confidential.",
  },
  {
    title: "Data Security",
    content:
      "We take reasonable technical and organisational measures to protect your personal data from unauthorised access, loss, or misuse. However, no method of transmission over the internet is completely secure.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, correct, or delete the personal data we hold about you. To exercise these rights, please contact us using the details on our Contact page. We will respond to your request within a reasonable timeframe.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Continued use of our website after changes constitutes your acceptance of the revised policy.",
  },
]

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-stone-400 text-lg max-w-xl mx-auto leading-relaxed">
              Your privacy matters to us. This policy explains how we collect, use, and protect your information.
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
                If you have any questions about this Privacy Policy, please visit our{" "}
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
