import Navbar, { NavigationSection } from "@/components/common/Navbar"
import Footer from "@/components/landing/footer/footer1"
import AboutHero from "@/components/about/about-hero"
import AboutStats from "@/components/about/about-stats"
import AboutStory from "@/components/about/about-story"
import AboutProcess from "@/components/about/about-process"
import AboutTeam from "@/components/about/about-team"

const navigationData: NavigationSection[] = [
  { title: 'Home', href: '/' },
  { title: 'Menu', href: '/menu' },
  { title: 'About Us', href: '/about' },
  { title: 'Contact Us', href: '/contact' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar navigationData={navigationData} />
      <main>
        <AboutHero />
        <AboutStats />
        <AboutStory />
        <AboutProcess />
        <AboutTeam />
      </main>
      <Footer />
    </>
  )
}
