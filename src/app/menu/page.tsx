export const dynamic = "force-dynamic"

import Navbar, { NavigationSection } from "@/components/common/Navbar"
import Footer from "@/components/landing/footer/footer1"
import MenuView from "@/components/menu/menu-view"
import { getPublicMenuTypes } from "@/services/menu"

const navigationData: NavigationSection[] = [
  { title: 'Home', href: '/' },
  { title: 'Menu', href: '/menu' },
  { title: 'About Us', href: '/about' },
  { title: 'Contact Us', href: '/contact' },
]

export default async function MenuPage() {
  const menuTypes = await getPublicMenuTypes()

  return (
    <>
      <Navbar navigationData={navigationData} />
      <header className="relative overflow-hidden border-b border-border">
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            La Bella Cucina · Fine Dining
          </p>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            A menu built around{" "}
            <span className="italic">fresh ingredients</span> and passion.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Explore our carefully crafted dishes, made fresh with the finest ingredients.
          </p>
        </div>
      </header>
      <section className="mx-auto w-full max-w-6xl py-10">
        <MenuView initialMenuTypes={menuTypes} />
      </section>
      <Footer />
    </>
  )
}
