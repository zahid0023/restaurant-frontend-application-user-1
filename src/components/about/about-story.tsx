import { Award, Star, Clock, MapPin } from "lucide-react"

const tiles = [
  { icon: Award, label: "Best Specialty Coffee 2023", color: "bg-amber-50" },
  { icon: Star, label: "SCA Certified Roastery", color: "bg-stone-50" },
  { icon: Clock, label: "Open Every Day 7am – 9pm", color: "bg-rose-50" },
  { icon: MapPin, label: "3 Locations & Growing", color: "bg-sky-50" },
]

export default function AboutStory() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-600 text-sm font-semibold tracking-widest uppercase mb-3">
              How It Started
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
              From a Single Bag of Beans to a Beloved Café
            </h2>
            <div className="space-y-4 text-stone-500 text-base leading-relaxed">
              <p>
                It started with a bag of Ethiopian Yirgacheffe and a hand grinder. Our founder,
                Aiden Park, spent two years travelling through coffee-growing regions — learning
                from farmers, roasters, and baristas — before opening our first location.
              </p>
              <p>
                What we found along the way was that the best coffee tells a story. The soil,
                the altitude, the harvest season — every variable shapes the cup. We wanted to
                bring those stories directly to you.
              </p>
              <p>
                Today we're still obsessed with those details. Same hand-selection process, same
                small-batch roasting, same commitment to the farmers who make it all possible.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {tiles.map((item) => (
              <div key={item.label} className={`${item.color} rounded-2xl p-6 flex flex-col gap-3`}>
                <item.icon className="size-7 text-amber-600" />
                <p className="text-stone-700 text-sm font-medium leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
