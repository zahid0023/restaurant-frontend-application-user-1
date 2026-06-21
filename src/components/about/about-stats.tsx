const stats = [
  { value: "8+", label: "Years Brewing" },
  { value: "30+", label: "Coffee Origins" },
  { value: "80k+", label: "Cups Served" },
  { value: "4.9", label: "Average Rating" },
]

export default function AboutStats() {
  return (
    <section className="bg-amber-500 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-white">{stat.value}</p>
              <p className="text-amber-100 text-sm font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
