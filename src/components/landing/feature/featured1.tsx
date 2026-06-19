"use client"

import { useTranslation } from "react-i18next"
import "@/i18n"

const DISH_COLORS = ["bg-amber-100", "bg-orange-100", "bg-stone-100", "bg-rose-100"]

interface Dish {
  name: string
  description: string
  price: string
  badge: string
}

export default function Featured() {
  const { t } = useTranslation()
  const dishes = t("featured.dishes", { returnObjects: true }) as Dish[]

  return (
    <section id="featured" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-amber-600 text-sm font-semibold tracking-widest uppercase mb-3">
            {t("featured.overline")}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            {t("featured.title")}
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            {t("featured.subtitle")}
          </p>
        </div>

        {/* Dish grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish, i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Placeholder image */}
              <div className={`${DISH_COLORS[i % DISH_COLORS.length]} h-48 flex items-center justify-center relative`}>
                <span className="text-5xl select-none">🍽️</span>
                <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {dish.badge}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-stone-900 text-lg leading-snug">
                    {dish.name}
                  </h3>
                  <span className="text-amber-600 font-bold text-lg shrink-0">{dish.price}</span>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
