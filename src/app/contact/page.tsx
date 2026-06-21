import Navbar, { NavigationSection } from "@/components/common/Navbar"
import Footer from "@/components/common/footer1"
import ContactHero from "@/components/contact/contact-hero"
import ContactCards from "@/components/contact/contact-cards"
import ContactForm from "@/components/contact/contact-form"

const navigationData: NavigationSection[] = [
  { title: 'Home', href: '/' },
  { title: 'Menu', href: '/menu' },
  { title: 'About Us', href: '/about' },
  { title: 'Contact Us', href: '/contact' },
]

export default function ContactPage() {
  return (
    <>
      <Navbar navigationData={navigationData} />
      <main>
        <ContactHero />
        <ContactCards />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
