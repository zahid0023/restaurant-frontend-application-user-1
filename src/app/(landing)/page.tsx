import Navbar, { NavigationSection } from "@/components/common/Navbar"
import Values from "@/components/landing/values/values1"
import BrowseMenuCTA from "@/components/landing/browsemenucta/browsemenucta1"
import HelpAccess from "@/components/landing/helpaccess/helpaccess1"
import Footer from "@/components/landing/footer/footer1"
import Hero4 from "@/components/landing/hero/hero4"
import Feature4 from "@/components/landing/feature/feature-4"
import { getFeaturedDishes } from "@/services/dishes"
import { type MenuData } from "@/components/landing/feature/menu-carousel"

const navigationData: NavigationSection[] = [
  { title: 'Home', href: '#' },
  { title: 'Menu', href: '/menu' },
  { title: 'About Us', href: '#' },
  { title: 'Contact Us', href: '#' },
]

const EN_LOCALE_ID = 1

export default async function LandingPage() {
  const dishes = await getFeaturedDishes()

  const featuredDishes: MenuData[] = dishes.map(dish => {
    const locale =
      dish.locales.find(l => l.locale_id === EN_LOCALE_ID) ?? dish.locales[0]

    return {
      id: dish.id,
      name: locale?.name ?? "",
      img: dish.img,
      imgAlt: dish.img_alt,
      shortDescription: locale?.description ?? "",
      price: `$${Number(dish.price).toFixed(2)}`,
    }
  })

  return (
    <>
      <Navbar navigationData={navigationData} />
      <main className="flex flex-col gap-16">
        <Hero4 />
        <Feature4 menudata={featuredDishes} />
        <Values />
        <HelpAccess />
      </main>
      <Footer />
    </>
  )
}
