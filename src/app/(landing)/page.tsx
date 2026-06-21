export const dynamic = "force-dynamic"

import Navbar, { NavigationSection } from "@/components/common/Navbar"
import Values from "@/components/landing/values/values1"
import HelpAccess from "@/components/landing/helpaccess/helpaccess1"
import Footer from "@/components/landing/footer/footer1"
import Hero4 from "@/components/landing/hero/hero4"
import Feature4 from "@/components/landing/feature/feature-4"
import { getFeaturedDishes } from "@/services/dishes"
import { type FeaturedDishData } from "@/components/landing/feature/menu-carousel"

const navigationData: NavigationSection[] = [
  { title: 'Home', href: '/' },
  { title: 'Menu', href: '/menu' },
  { title: 'About Us', href: '/about' },
  { title: 'Contact Us', href: '/contact' },
]

const EN_LOCALE_ID = 1

export default async function LandingPage() {
  const dishes = await getFeaturedDishes()

  const featuredDishes: FeaturedDishData[] = dishes.map(dish => {
    const locale = dish.locales.find(l => l.locale_id === EN_LOCALE_ID) ?? dish.locales[0]
    const defaultVariant = dish.variants?.find(v => v.is_default) ?? dish.variants?.[0]
    const variantLocale = defaultVariant?.locales?.find(l => l.locale_id === EN_LOCALE_ID) ?? defaultVariant?.locales?.[0]
    const firstImage = defaultVariant?.images?.[0]

    return {
      id: dish.id,
      name: locale?.name ?? "",
      img: firstImage?.url ?? "",
      imgAlt: locale?.name ?? "",
      shortDescription: variantLocale?.description || locale?.description || "",
      price: `$${Number(defaultVariant?.price ?? 0).toFixed(2)}`,
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
