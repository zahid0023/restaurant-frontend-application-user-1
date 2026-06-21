import { Sprout, Flame, Gauge, CupSoda } from "lucide-react"

const steps = [
  {
    icon: Sprout,
    step: "01",
    title: "Sourced",
    subtitle: "Direct from farmers",
    description: "We travel to farms in Ethiopia, Colombia, Guatemala & Brazil to handpick lots and build lasting relationships with growers.",
    gradient: "from-green-900 to-green-950",
    accent: "text-green-400",
    border: "border-green-800",
  },
  {
    icon: Flame,
    step: "02",
    title: "Roasted",
    subtitle: "Small-batch, in-house",
    description: "Every batch is roasted to order in our on-site drum roaster — dialled to within seconds to unlock the bean's best character.",
    gradient: "from-orange-900 to-stone-950",
    accent: "text-orange-400",
    border: "border-orange-800",
  },
  {
    icon: Gauge,
    step: "03",
    title: "Dialled",
    subtitle: "Precision extraction",
    description: "Our baristas calibrate grind size, dose, and water temperature daily. No guesswork — just consistent, repeatable excellence.",
    gradient: "from-amber-900 to-stone-950",
    accent: "text-amber-400",
    border: "border-amber-800",
  },
  {
    icon: CupSoda,
    step: "04",
    title: "Served",
    subtitle: "To your hands",
    description: "Whether it's a 9-bar espresso or a slow cold brew, every cup leaves our counter with care — and a smile.",
    gradient: "from-sky-900 to-stone-950",
    accent: "text-sky-400",
    border: "border-sky-800",
  },
]

export default function AboutProcess() {
  return (
    <section className="py-24 bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">
            The Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            From Farm to Cup
          </h2>
          <p className="text-stone-400 text-lg max-w-xl">
            Every great cup is the result of four obsessive steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((p) => (
            <div
              key={p.step}
              className={`group relative overflow-hidden rounded-3xl border ${p.border} bg-gradient-to-b ${p.gradient} p-8 flex flex-col gap-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]`}
            >
              <div className="flex items-start justify-between">
                <p.icon className={`size-8 ${p.accent}`} />
                <span className={`text-5xl font-black ${p.accent} opacity-20 leading-none`}>
                  {p.step}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{p.title}</h3>
                <p className={`text-xs font-semibold uppercase tracking-widest ${p.accent} mb-4`}>{p.subtitle}</p>
                <p className="text-stone-400 text-sm leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
