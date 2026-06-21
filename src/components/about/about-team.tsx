import { Coffee } from "lucide-react"

const team = [
  { name: "Aiden Park", role: "Head Barista", detail: "World Barista Champion 2021" },
  { name: "Nora Silva", role: "Roast Master", detail: "15 years in specialty coffee" },
  { name: "James Okafor", role: "Brew Lead", detail: "SCA Certified Q Grader" },
  { name: "Mia Chen", role: "Café Manager", detail: "10 years in hospitality" },
]

const gradients = [
  "from-amber-100 to-orange-100",
  "from-yellow-100 to-amber-100",
  "from-stone-100 to-amber-100",
  "from-orange-100 to-rose-100",
]

export default function AboutTeam() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-600 text-sm font-semibold tracking-widest uppercase mb-3">
            The People Behind Your Cup
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Coffee obsessives who pour their heart into every single cup.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div key={member.name} className="rounded-2xl overflow-hidden border border-stone-100 shadow-sm">
              <div className={`h-48 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}>
                <div className="size-20 rounded-full bg-white/60 flex items-center justify-center">
                  <Coffee className="size-9 text-amber-500" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-stone-900 text-base">{member.name}</h3>
                <p className="text-amber-600 text-sm font-medium">{member.role}</p>
                <p className="text-stone-400 text-xs mt-1">{member.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
