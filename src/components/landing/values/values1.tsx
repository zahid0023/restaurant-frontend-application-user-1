"use client"

import { Leaf, ChefHat, Heart, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import "@/i18n"

const VALUE_ICONS = [Leaf, ChefHat, Heart, Users]
const VALUE_COLORS = [
  "bg-green-50 text-green-600",
  "bg-amber-50 text-amber-600",
  "bg-rose-50 text-rose-600",
  "bg-sky-50 text-sky-600",
]

interface ValueItem {
  title: string
  description: string
}

export default function Values() {
  const { t } = useTranslation()
  const items = t("values.items", { returnObjects: true }) as ValueItem[]

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-amber-600 text-sm font-semibold tracking-widest uppercase mb-3">
            {t("values.overline")}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">{t("values.title")}</h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            {t("values.subtitle")}
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((v, i) => {
            const Icon = VALUE_ICONS[i % VALUE_ICONS.length]
            return (
              <div key={i} className="flex flex-col items-start gap-4">
                <div className={`${VALUE_COLORS[i % VALUE_COLORS.length]} p-4 rounded-2xl`}>
                  <Icon className="size-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 text-lg mb-2">{v.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
