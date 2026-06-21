import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { getRestaurantInfo, getOperatingSchedule } from "@/services/restaurant"

const EN_LOCALE_ID = 1

const TODAY_INDEX_TO_DAY = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']

export default async function ContactCards() {
  const [restaurantInfo, schedule] = await Promise.all([
    getRestaurantInfo(),
    getOperatingSchedule(),
  ])

  const locale = restaurantInfo?.locales.find(l => l.locale_id === EN_LOCALE_ID) ?? restaurantInfo?.locales[0]

  const phone = restaurantInfo?.phone ?? null
  const email = restaurantInfo?.email ?? null
  const address = locale?.address ?? null

  const todayDay = TODAY_INDEX_TO_DAY[new Date().getDay()]
  let hoursValue = "Hours not available"
  if (schedule) {
    const isClosed = schedule.closing.some(c => c.day_of_week === todayDay)
    if (isClosed) {
      hoursValue = "Closed today"
    } else {
      const slots = (schedule.operating[todayDay] ?? []).filter(s => !s.is_closed)
      hoursValue = slots.length > 0
        ? `Today: ${slots.map(s => `${s.open_time}–${s.close_time}`).join(', ')}`
        : "Hours not available"
    }
  }

  const cards = [
    { icon: Phone, label: "Phone", value: phone ?? "Phone number not found", color: "bg-amber-50 text-amber-600" },
    { icon: Mail, label: "Email", value: email ?? "Email not found", color: "bg-rose-50 text-rose-600" },
    { icon: MapPin, label: "Address", value: address ?? "Address not found", color: "bg-sky-50 text-sky-600" },
    { icon: Clock, label: "Hours", value: hoursValue, color: "bg-green-50 text-green-600" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-stone-100 p-6 shadow-sm">
              <div className={`${card.color} inline-flex rounded-xl p-3 mb-4`}>
                <card.icon className="size-5" />
              </div>
              <p className="font-semibold text-stone-900 text-sm mb-1">{card.label}</p>
              <p className="text-stone-500 text-sm leading-relaxed">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
