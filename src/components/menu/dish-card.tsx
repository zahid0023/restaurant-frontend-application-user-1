"use client"

import { useState } from "react"
import { Plus, Check, Flame, Star } from "lucide-react"
import { type Dish } from "@/services/menu"
import { useCart } from "@/context/CartContext"

const EN_LOCALE_ID = 1

type DishCardProps = {
  dish: Dish
}

export default function DishCard({ dish }: DishCardProps) {
  const locale = dish.locales.find((l) => l.locale_id === EN_LOCALE_ID) ?? dish.locales[0]
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [added, setAdded] = useState(false)
  const { addItem, openCart } = useCart()

  const hasVariants = dish.variants.length > 0
  const activeVariant = hasVariants ? dish.variants[selectedIdx] : null
  const activePrice = activeVariant?.price ?? 0
  const activeVariantLocale =
    activeVariant?.locales.find((l) => l.locale_id === EN_LOCALE_ID) ?? activeVariant?.locales[0]

  const handleAdd = () => {
    addItem({
      id: `dish-${dish.id}-var-${activeVariant?.id ?? 0}`,
      dishId: String(dish.id),
      name: locale?.name ?? dish.code,
      variantName: activeVariantLocale?.name ?? activeVariant?.code,
      price: activePrice,
      image: "",
    })
    setAdded(true)
    openCart()
    window.setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article className="group relative w-full max-w-sm overflow-hidden rounded-3xl bg-card shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-2">

      {/* Image area */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <div className="flex h-full w-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-20 text-muted-foreground/40 transition-transform duration-700 ease-out group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 backdrop-blur-md">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-xs font-semibold">4.8</span>
        </div>

        {dish.is_featured && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-accent/90 px-3 py-1.5 backdrop-blur-md">
            <Flame className="h-3.5 w-3.5 text-accent-foreground" />
            <span className="text-xs font-semibold text-accent-foreground">Featured</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="relative space-y-4 p-6 pt-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold leading-tight tracking-tight">
            {locale?.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {locale?.description ?? "No description available"}
          </p>
        </div>

        {hasVariants && (
          <div className="space-y-2">
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Choose size
            </p>
            <div role="radiogroup" aria-label={`${locale?.name} variants`} className="flex flex-wrap gap-2">
              {dish.variants.map((v, i) => {
                const vLocale = v.locales.find((l) => l.locale_id === EN_LOCALE_ID) ?? v.locales[0]
                const active = i === selectedIdx
                return (
                  <button
                    key={v.id}
                    role="radio"
                    aria-checked={active}
                    onClick={() => { setSelectedIdx(i); setAdded(false) }}
                    className={`relative flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all duration-200 ${
                      active
                        ? "border-primary bg-primary/10 shadow-[0_0_0_1px_var(--color-primary)]"
                        : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/60"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                        active ? "border-primary bg-primary text-primary-foreground" : "border-border"
                      }`}
                    >
                      {active && <Check className="h-3 w-3" />}
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-xs font-semibold">{vLocale?.name ?? v.code}</span>
                      <span className="text-[10px] text-muted-foreground">${v.price.toFixed(2)}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="flex items-end justify-between pt-2">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              {hasVariants ? (activeVariantLocale?.name ?? activeVariant?.code) : "Price"}
            </p>
            <p className="text-3xl font-bold tabular-nums text-primary">
              ${activePrice.toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Add ${locale?.name}${hasVariants ? ` (${activeVariantLocale?.name ?? activeVariant?.code})` : ""} to order`}
            className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl transition-all duration-300 ${
              added
                ? "bg-accent text-accent-foreground"
                : "bg-primary text-primary-foreground hover:scale-110"
            }`}
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>
    </article>
  )
}
