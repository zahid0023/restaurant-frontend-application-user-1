import { Phone, Mail, MapPin, Clock } from "lucide-react"

const cards = [
  { icon: Phone, label: "Phone", value: "+1 (555) 012-3456", color: "bg-amber-50 text-amber-600" },
  { icon: Mail, label: "Email", value: "hello@labellacucina.com", color: "bg-rose-50 text-rose-600" },
  { icon: MapPin, label: "Address", value: "12 Via Roma, Suite 1, New York, NY", color: "bg-sky-50 text-sky-600" },
  { icon: Clock, label: "Hours", value: "Mon–Sun · 12pm – 11pm", color: "bg-green-50 text-green-600" },
]

export default function ContactCards() {
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
