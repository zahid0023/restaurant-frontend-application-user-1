export const dynamic = "force-dynamic"

import Navbar, { NavigationSection, NavRestaurantInfo } from "@/components/common/Navbar"
import Values from "@/components/landing/values/values1"
import HelpAccess from "@/components/landing/helpaccess/helpaccess1"
import Footer from "@/components/landing/footer/footer1"
import Hero4 from "@/components/landing/hero/hero4"
import Feature4 from "@/components/landing/feature/feature-4"
import { getFeaturedDishes } from "@/services/dishes"
import { getRestaurantInfo, getOperatingSchedule } from "@/services/restaurant"
import { type FeaturedDishData } from "@/components/landing/feature/menu-carousel"

const navigationData: NavigationSection[] = [
  { title: 'Home', href: '/' },
  { title: 'Menu', href: '/menu' },
  { title: 'About Us', href: '/about' },
  { title: 'Contact Us', href: '/contact' },
]

const EN_LOCALE_ID = 1

const TODAY_INDEX_TO_DAY = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']

const DAY_ORDER = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
const DAY_LABELS: Record<string, string> = {
  MONDAY: 'Mon', TUESDAY: 'Tue', WEDNESDAY: 'Wed', THURSDAY: 'Thu',
  FRIDAY: 'Fri', SATURDAY: 'Sat', SUNDAY: 'Sun',
}

export default async function LandingPage() {
  const [dishes, restaurantInfo, schedule] = await Promise.all([
    getFeaturedDishes(),
    getRestaurantInfo(),
    getOperatingSchedule(),
  ])

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

  const infoLocale = restaurantInfo?.locales.find(l => l.locale_id === EN_LOCALE_ID) ?? restaurantInfo?.locales[0]

  // Navbar: today's hours
  const todayDay = TODAY_INDEX_TO_DAY[new Date().getDay()]
  const isTodayClosed = schedule?.closing.some(c => c.day_of_week === todayDay) ?? false
  const todayOpenSlots = schedule?.operating[todayDay]?.filter(s => !s.is_closed) ?? []
  const todayHours = todayOpenSlots.length > 0
    ? todayOpenSlots.map(s => `${s.open_time}–${s.close_time}`).join(', ')
    : null

  const navRestaurantInfo: NavRestaurantInfo = {
    name: infoLocale?.name ?? null,
    logoUrl: restaurantInfo?.logo_url ?? null,
    phone: restaurantInfo?.phone ?? null,
    email: restaurantInfo?.email ?? null,
    address: infoLocale?.address ?? null,
    todayHours,
    isTodayClosed,
  }

  // HelpAccess: full weekly schedule
  const formattedSchedule = schedule
    ? DAY_ORDER.flatMap(day => {
        if (schedule.closing.some(c => c.day_of_week === day)) {
          return [{ day: DAY_LABELS[day], hours: 'Closed' }]
        }
        const slots = (schedule.operating[day] ?? []).filter(s => !s.is_closed)
        if (!slots.length) return []
        return [{ day: DAY_LABELS[day], hours: slots.map(s => `${s.open_time}–${s.close_time}`).join(', ') }]
      })
    : null

  return (
    <>
      <Navbar navigationData={navigationData} restaurantInfo={navRestaurantInfo} />
      <main className="flex flex-col gap-16">
        <Hero4 />
        <Feature4 menudata={featuredDishes} />
        <Values />
        <HelpAccess
          phone={restaurantInfo?.phone ?? null}
          email={restaurantInfo?.email ?? null}
          address={infoLocale?.address ?? null}
          schedule={formattedSchedule}
        />
      </main>
      <Footer />
    </>
  )
}
