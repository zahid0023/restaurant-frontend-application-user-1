import Link from "next/link"
import { UtensilsCrossed, Rss, Globe, Share2 } from "lucide-react"
import { getRestaurantInfo, getOperatingSchedule } from "@/services/restaurant"

const EN_LOCALE_ID = 1

const DAY_ORDER = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
const DAY_LABELS: Record<string, string> = {
  MONDAY: 'Monday', TUESDAY: 'Tuesday', WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday', FRIDAY: 'Friday', SATURDAY: 'Saturday', SUNDAY: 'Sunday',
}

const quickLinks = [
  { label: 'Menu', href: '/menu' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default async function Footer() {
  const [restaurantInfo, schedule] = await Promise.all([
    getRestaurantInfo(),
    getOperatingSchedule(),
  ])

  const locale = restaurantInfo?.locales.find(l => l.locale_id === EN_LOCALE_ID) ?? restaurantInfo?.locales[0]

  const name = locale?.name ?? null
  const address = locale?.address ?? null
  const phone = restaurantInfo?.phone ?? null
  const email = restaurantInfo?.email ?? null

  const hours: { day: string; time: string }[] = schedule
    ? DAY_ORDER.flatMap(day => {
        if (schedule.closing.some(c => c.day_of_week === day)) {
          return [{ day: DAY_LABELS[day], time: 'Closed' }]
        }
        const slots = (schedule.operating[day] ?? []).filter(s => !s.is_closed)
        if (!slots.length) return []
        return [{ day: DAY_LABELS[day], time: slots.map(s => `${s.open_time}–${s.close_time}`).join(', ') }]
      })
    : []

  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <UtensilsCrossed className="size-5 text-amber-500" />
              {name ?? 'Restaurant'}
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Authentic fine dining experience. A passion for food, a love for people.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="RSS Feed" className="hover:text-amber-400 transition-colors">
                <Rss className="size-5" />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-amber-400 transition-colors">
                <Globe className="size-5" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-amber-400 transition-colors">
                <Share2 className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-white font-semibold mb-5">Opening Hours</h4>
            {hours.length > 0 ? (
              <ul className="space-y-3 text-sm">
                {hours.map((h, i) => (
                  <li key={i}>
                    <span className="text-stone-300">{h.day}</span>
                    <br />
                    <span className="text-amber-400 font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-stone-500 italic">Opening hours not available</p>
            )}
          </div>

          {/* Visit Us */}
          <div>
            <h4 className="text-white font-semibold mb-5">Visit Us</h4>
            <address className="not-italic text-sm space-y-2">
              {address ? (
                <p>{address}</p>
              ) : (
                <p className="text-stone-500 italic">Address not found</p>
              )}
              <p className="mt-4">
                {phone ? (
                  <a href={`tel:${phone}`} className="hover:text-amber-400 transition-colors">
                    {phone}
                  </a>
                ) : (
                  <span className="text-stone-500 italic">Phone number not found</span>
                )}
              </p>
              <p>
                {email ? (
                  <a href={`mailto:${email}`} className="hover:text-amber-400 transition-colors">
                    {email}
                  </a>
                ) : (
                  <span className="text-stone-500 italic">Email not found</span>
                )}
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} {name ?? 'Restaurant'}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
