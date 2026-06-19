import Navbar, { NavigationSection } from "@/components/common/Navbar"
import Footer from "@/components/landing/footer/footer1"
import MenuView from "@/components/menu/menu-view"
import { getPublicMenu } from "@/services/menu"

const navigationData: NavigationSection[] = [
  { title: 'Home', href: '/' },
  { title: 'Menu', href: '/menu' },
  { title: 'About Us', href: '#' },
  { title: 'Contact Us', href: '#' },
]

export default async function MenuPage() {
  const menus = await getPublicMenu()

  return (
    <>
      <Navbar navigationData={navigationData} />
      <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
            What we offer
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Menu</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Explore our carefully crafted dishes, made fresh with the finest ingredients.
          </p>
        </div>
        <MenuView menus={menus} />
      </main>
      <Footer />
    </>
  )
}
